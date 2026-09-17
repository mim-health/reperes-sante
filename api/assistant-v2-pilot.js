'use strict';

const corpus = require('../assistant-v2/corpus.json');
const embeddingsPayload = require('../assistant-v2/embeddings.index.json');
const semantic = require('../assistant-v2/semantic-retrieval.js');
const synthesis = require('../assistant-v2/synthesis.js');
const contract = require('../assistant-v2/contract.js');

const EMBEDDINGS_URL = 'https://api.openai.com/v1/embeddings';
const RESPONSES_URL = 'https://api.openai.com/v1/responses';
const SYNTHESIS_MODEL = process.env.MACA_SYNTHESIS_MODEL || 'gpt-5.6-terra';
const TOP_K = 5;
const MIN_GATE = 0.30;
const MAX_QUESTION_CHARS = 600;

const GROUNDING_SCHEMA = {
  type: 'object',
  properties: {
    supported: { type: 'boolean' },
    reason: { type: 'string' }
  },
  required: ['supported', 'reason'],
  additionalProperties: false
};

const GROUNDING_PROMPT = `Tu es un vérificateur de fidélité documentaire pour MACA Santé.
Vérifie la réponse UNIQUEMENT contre les fiches MACA citées.
N'utilise aucune connaissance extérieure ni recherche web.
Retourne supported=true seulement si toutes les affirmations factuelles de la réponse sont explicitement soutenues par les fiches fournies ou en sont une reformulation prudente et fidèle.
Si une affirmation factuelle dépasse les fiches, supported=false.`;

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function openai(url, body) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('Configuration serveur incomplète');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const text = (await response.text()).slice(0, 500);
    throw new Error(`Service IA indisponible (${response.status}): ${text}`);
  }
  return response.json();
}

function extractText(response) {
  if (response && typeof response.output_text === 'string' && response.output_text.trim()) {
    return response.output_text.trim();
  }
  const chunks = [];
  for (const item of (response && Array.isArray(response.output) ? response.output : [])) {
    for (const part of (item && Array.isArray(item.content) ? item.content : [])) {
      if (part && part.type === 'output_text' && typeof part.text === 'string') chunks.push(part.text);
    }
  }
  return chunks.join('').trim();
}

async function groundingCheck(result, cardById) {
  if (!result || result.status !== 'answer') return { supported: true, reason: 'Pas de réponse médicale à vérifier.' };
  const citedIds = [...new Set((result.blocks || []).flatMap(block => block.card_ids || []))];
  const cited = citedIds.map(id => cardById.get(id)).filter(Boolean).map(synthesis.compactCard);
  const payload = {
    answer: result.answer,
    blocks: result.blocks,
    cited_cards: cited
  };
  const response = await openai(RESPONSES_URL, {
    model: SYNTHESIS_MODEL,
    reasoning: { effort: 'none' },
    input: [
      { role: 'system', content: GROUNDING_PROMPT },
      { role: 'user', content: JSON.stringify(payload) }
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'maca_pilot_grounding',
        strict: true,
        schema: GROUNDING_SCHEMA
      }
    },
    max_output_tokens: 180,
    store: false
  });
  const raw = extractText(response);
  if (!raw) throw new Error('Contrôle documentaire indisponible');
  return JSON.parse(raw);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'method_not_allowed' });

  const configuredCode = String(process.env.PILOT_ACCESS_CODE || '');
  const suppliedCode = String(req.headers['x-maca-pilot-code'] || '');
  if (!configuredCode || suppliedCode !== configuredCode) {
    return json(res, 401, { error: 'pilot_access_denied' });
  }

  const question = String(req.body && req.body.question || '').trim();
  if (!question || question.length > MAX_QUESTION_CHARS) {
    return json(res, 400, { error: 'invalid_question', maxChars: MAX_QUESTION_CHARS });
  }

  try {
    if (embeddingsPayload.corpusFingerprint !== corpus.fingerprint) {
      throw new Error('Index sémantique obsolète');
    }

    const cardById = new Map(corpus.cards.map(card => [card.id, card]));
    const sIndex = semantic.buildIndex(embeddingsPayload);
    const embedResponse = await openai(EMBEDDINGS_URL, {
      model: embeddingsPayload.model,
      input: [question],
      dimensions: embeddingsPayload.dimensions,
      encoding_format: 'float'
    });
    const vector = embedResponse.data && embedResponse.data[0] && embedResponse.data[0].embedding;
    if (!vector) throw new Error('Embedding de requête absent');

    const ranked = semantic.search(sIndex, vector, { topK: TOP_K });
    const topSimilarity = ranked[0] ? ranked[0].similarity : 0;
    const selectedCards = ranked.map(row => cardById.get(row.id)).filter(Boolean);

    if (topSimilarity < MIN_GATE) {
      return json(res, 200, {
        status: 'abstain',
        answer: '',
        category: null,
        cards_used: [],
        selected_cards: ranked.map(row => ({ id: row.id, title: cardById.get(row.id)?.title || row.id, similarity: Number(row.similarity.toFixed(4)) })),
        scope_note: '',
        pilot_meta: { grounding: 'not_applicable' }
      });
    }

    const synthResponse = await openai(RESPONSES_URL, synthesis.buildRequest(question, selectedCards, {
      model: SYNTHESIS_MODEL,
      reasoningEffort: 'none',
      maxOutputTokens: 700
    }));
    const rawResult = synthesis.parseResponse(synthResponse);
    const checked = contract.validate(rawResult, selectedCards, { rejectDirectPersonalAdvice: true });

    if (!checked.ok || !checked.normalized) {
      return json(res, 200, {
        status: 'abstain',
        answer: '',
        category: null,
        cards_used: [],
        selected_cards: ranked.map(row => ({ id: row.id, title: cardById.get(row.id)?.title || row.id, similarity: Number(row.similarity.toFixed(4)) })),
        scope_note: '',
        pilot_meta: { grounding: 'contract_rejected' }
      });
    }

    const result = checked.normalized;
    const grounding = await groundingCheck(result, cardById);
    if (result.status === 'answer' && !grounding.supported) {
      return json(res, 200, {
        status: 'abstain',
        answer: '',
        category: null,
        cards_used: [],
        selected_cards: ranked.map(row => ({ id: row.id, title: cardById.get(row.id)?.title || row.id, similarity: Number(row.similarity.toFixed(4)) })),
        scope_note: '',
        pilot_meta: { grounding: 'rejected' }
      });
    }

    const usedCards = (result.cards_used || []).map(id => {
      const card = cardById.get(id);
      return card ? { id, title: card.title, url: card.url || '' } : { id, title: id, url: '' };
    });

    // Aucun texte de question ni donnée de santé n'est écrit dans les logs applicatifs.
    console.log(JSON.stringify({ event: 'maca_pilot_5b', status: result.status, topSimilarity: Number(topSimilarity.toFixed(4)), cardsUsed: usedCards.map(c => c.id) }));

    return json(res, 200, {
      status: result.status,
      answer: result.answer,
      category: result.category,
      cards_used: usedCards,
      selected_cards: ranked.map(row => ({ id: row.id, title: cardById.get(row.id)?.title || row.id, similarity: Number(row.similarity.toFixed(4)) })),
      scope_note: result.scope_note || '',
      pilot_meta: { grounding: grounding.supported ? 'supported' : 'not_applicable' }
    });
  } catch (error) {
    console.error(JSON.stringify({ event: 'maca_pilot_5b_error', message: String(error && error.message || error).slice(0, 240) }));
    return json(res, 503, { error: 'pilot_temporarily_unavailable' });
  }
};
