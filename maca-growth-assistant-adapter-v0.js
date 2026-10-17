/* MACA Growth Engine V0 — adapter for the public Assistant V2 endpoint.
   Manual/controlled use only. Does not publish content or alter the medical engine. */
(function (global) {
  "use strict";
  const DEFAULT_ENDPOINT = "https://purple-voice-a8e3.dr-beddok.workers.dev/";

  async function testQuestion(question, options) {
    const q = String(question || "").trim().slice(0, 600);
    if (!q) throw new Error("question-required");
    const endpoint = (options && options.endpoint) || DEFAULT_ENDPOINT;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({question: q})
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error("assistant-http-" + response.status);

    const cards = Array.isArray(data.cards_used) ? data.cards_used : [];
    const answered = data.status === "answer" && Boolean(data.answer);
    const abstained = data.status !== "answer";
    return {
      rawStatus: data.status || "unknown",
      answerUseful: answered,
      sourcesPresent: answered && cards.length > 0,
      abstained,
      coverageInsufficient: data.status === "category_only",
      cardsUsed: cards.map(c => ({id: c.id || null, title: c.title || null})),
      scopeNote: data.scope_note || ""
    };
  }

  async function testBatch(items, options) {
    const out = [];
    for (const item of items || []) {
      try {
        out.push({...item, macaTest: await testQuestion(item.question, options)});
      } catch (error) {
        out.push({...item, macaTest: {incorrect: true, error: String(error && error.message || error)}});
      }
    }
    return out;
  }

  global.MACAGrowthAssistantAdapterV0 = Object.freeze({testQuestion, testBatch});
})(typeof window !== "undefined" ? window : globalThis);
