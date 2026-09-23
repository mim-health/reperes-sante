#!/usr/bin/env node
'use strict';

/**
 * MACA Santé — Assistant IA V2 (prototype isolé)
 *
 * Construit un artefact JSON dédié à l'Assistant V2 à partir du corpus
 * canonique déjà utilisé par MACA. Ce script ne modifie aucun fichier médical,
 * aucun moteur de recherche et aucun composant de l'Assistant V1.6.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assistant-v2');
const OUT_CORPUS = path.join(OUT_DIR, 'corpus.json');
const OUT_REPORT = path.join(OUT_DIR, 'corpus.report.json');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function createContext() {
  const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    CustomEvent: function CustomEvent() {}
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  return vm.createContext(sandbox);
}

function manifestFiles() {
  const sandbox = { window: {} };
  vm.runInNewContext(read('corpus-manifest.js'), sandbox, { filename: 'corpus-manifest.js' });
  if (!Array.isArray(sandbox.window.MACA_CORPUS_MANIFEST)) {
    throw new Error('MACA_CORPUS_MANIFEST introuvable ou invalide');
  }
  return sandbox.window.MACA_CORPUS_MANIFEST.map(value => String(value).split('?')[0]);
}

function runFile(context, rel) {
  vm.runInContext(read(rel), context, { filename: rel });
}

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function cleanStringArray(value) {
  if (Array.isArray(value)) {
    return [...new Set(value.map(cleanString).filter(Boolean))];
  }
  if (typeof value === 'string') {
    return [...new Set(value.split(/[,;|]/).map(cleanString).filter(Boolean))];
  }
  return [];
}

function cleanSources(card) {
  const out = [];
  const seen = new Set();
  const candidates = [];

  if (Array.isArray(card.sources)) candidates.push(...card.sources);
  if (card.source) candidates.push(card.source);

  for (const item of candidates) {
    let source = null;
    if (typeof item === 'string') {
      source = { label: cleanString(item), url: '' };
    } else if (item && typeof item === 'object') {
      source = {
        label: cleanString(item.label || item.title || item.name || item.source || item.text),
        url: cleanString(item.url || item.href || item.link)
      };
    }
    if (!source || (!source.label && !source.url)) continue;
    const key = `${source.label}\n${source.url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(source);
  }

  return out;
}

function compactJoin(parts) {
  return parts.map(cleanString).filter(Boolean).join('\n\n');
}

function build() {
  const files = manifestFiles();
  const context = createContext();

  for (const file of files) runFile(context, file);
  runFile(context, 'corpus-canonicalizer.js');

  if (typeof context.MACA_BUILD_CANONICAL_CORPUS !== 'function') {
    throw new Error('MACA_BUILD_CANONICAL_CORPUS indisponible');
  }

  const canonical = Array.from(context.MACA_BUILD_CANONICAL_CORPUS());

  runFile(context, 'maca-category-access.js');
  const categoryAccess = context.MACA_CATEGORY_ACCESS;
  if (!categoryAccess || !Array.isArray(categoryAccess.PUBLIC)) {
    throw new Error('MACA_CATEGORY_ACCESS indisponible');
  }

  const activeCategories = Array.from(categoryAccess.PUBLIC);
  const activeSet = new Set(activeCategories);

  const cards = canonical.map(card => {
    const id = cleanString(card.id);
    const title = cleanString(card.title || card.question);
    const categories = Array.from(categoryAccess.categoriesOf(card));
    const primaryCategory = cleanString(categoryAccess.primaryCategoryOf(card));
    const keywords = cleanStringArray(card.keywords);
    const answer = cleanString(card.answer);
    const detail = cleanString(card.detail || card.explanation);
    const usefulInfo = cleanString(card.usefulInfo || card.useful || card.practical);
    const watch = cleanString(card.watch || card.vigilance);
    const url = cleanString(card.url);
    const sources = cleanSources(card);

    return {
      id,
      title,
      primaryCategory,
      categories,
      keywords,
      content: {
        answer,
        detail,
        usefulInfo,
        watch
      },
      sources,
      url,
      metadata: {
        validationStatus: cleanString(card.validationStatus),
        editorialStatus: cleanString(card.editorialStatus),
        evidenceStatus: cleanString(card.evidenceStatus),
        verifiedAt: cleanString(card.verifiedAt),
        nextAuditAt: cleanString(card.nextAuditAt),
        auditIntervalMonths: Number.isFinite(Number(card.auditIntervalMonths)) ? Number(card.auditIntervalMonths) : null
      },
      retrievalText: compactJoin([
        title,
        keywords.length ? `Mots-clés : ${keywords.join(', ')}` : '',
        answer,
        detail,
        usefulInfo,
        watch
      ])
    };
  });

  const duplicateIds = [];
  const seenIds = new Set();
  const missingId = [];
  const missingTitle = [];
  const missingRetrievalText = [];
  const invalidPrimaryCategory = [];
  const noRecognizedCategory = [];
  const noAnswer = [];
  const noDetail = [];
  const noSources = [];

  cards.forEach((card, index) => {
    if (!card.id) missingId.push(index);
    else if (seenIds.has(card.id)) duplicateIds.push(card.id);
    else seenIds.add(card.id);

    if (!card.title) missingTitle.push(card.id || index);
    if (!card.retrievalText) missingRetrievalText.push(card.id || index);
    if (!activeSet.has(card.primaryCategory)) invalidPrimaryCategory.push({ id: card.id, primaryCategory: card.primaryCategory });
    if (!card.categories.some(category => activeSet.has(category))) noRecognizedCategory.push(card.id || index);
    if (!card.content.answer) noAnswer.push(card.id || index);
    if (!card.content.detail) noDetail.push(card.id || index);
    if (!card.sources.length) noSources.push(card.id || index);
  });

  const fatal = {
    missingId,
    duplicateIds: [...new Set(duplicateIds)],
    missingTitle,
    missingRetrievalText
  };

  const warnings = {
    invalidPrimaryCategory,
    noRecognizedCategory,
    noAnswer,
    noDetail,
    noSources
  };

  const payloadCore = {
    schemaVersion: 1,
    source: 'MACA_CANONICAL_CORPUS',
    manifestEntries: files.length,
    activeCategories,
    cardCount: cards.length,
    cards
  };

  const fingerprint = crypto
    .createHash('sha256')
    .update(JSON.stringify(payloadCore))
    .digest('hex');

  const payload = {
    ...payloadCore,
    fingerprint
  };

  const fatalCount = Object.values(fatal).reduce((sum, list) => sum + list.length, 0);
  const warningCount = Object.values(warnings).reduce((sum, list) => sum + list.length, 0);

  const report = {
    ok: fatalCount === 0,
    schemaVersion: 1,
    source: 'MACA_CANONICAL_CORPUS',
    manifestEntries: files.length,
    canonicalCardCount: canonical.length,
    exportedCardCount: cards.length,
    activeCategories,
    fingerprint,
    fatalCount,
    warningCount,
    fatal,
    warnings,
    fieldCoverage: {
      answer: cards.length - noAnswer.length,
      detail: cards.length - noDetail.length,
      sources: cards.length - noSources.length,
      recognizedCategory: cards.length - noRecognizedCategory.length
    }
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_CORPUS, `${JSON.stringify(payload, null, 2)}\n`);
  fs.writeFileSync(OUT_REPORT, `${JSON.stringify(report, null, 2)}\n`);

  console.log(JSON.stringify(report, null, 2));

  if (!report.ok) {
    process.exitCode = 1;
  }
}

build();
