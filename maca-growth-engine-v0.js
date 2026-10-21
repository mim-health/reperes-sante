/* MACA Growth Engine V0 — isolated acquisition logic. No publishing, no medical-engine mutation. */
(function (global) {
  "use strict";

  const clamp = (n, min, max) => Math.max(min, Math.min(max, Number(n) || 0));
  const normalize = (s) => String(s || "").trim().replace(/\s+/g, " ");

  function scoreOpportunity(input) {
    const scores = {
      intent: clamp(input.intent, 0, 25),
      macaFit: clamp(input.macaFit, 0, 25),
      corpusFit: clamp(input.corpusFit, 0, 25),
      distributionFit: clamp(input.distributionFit, 0, 25)
    };
    return { scores, growthScore: Object.values(scores).reduce((a, b) => a + b, 0) };
  }

  function classifyMacaTest(test) {
    if (!test) return "UNTESTED";
    if (test.unsafe || test.badGrounding || test.incorrect) return "RED";
    if (test.abstained || test.coverageInsufficient) return "GAP";
    if (test.answerUseful && test.sourcesPresent) return "GREEN";
    return "RED";
  }

  function fingerprint(question) {
    return normalize(question).toLocaleLowerCase("fr-FR")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "");
  }

  function buildDigest(items, limit) {
    const seen = new Set();
    return (items || [])
      .map((item) => {
        const question = normalize(item.question);
        const scored = scoreOpportunity(item);
        return {
          source: normalize(item.source),
          sourceUrl: normalize(item.sourceUrl),
          question,
          detectedAt: item.detectedAt || null,
          ...scored,
          status: classifyMacaTest(item.macaTest),
          macaTest: item.macaTest || null
        };
      })
      .filter((x) => {
        if (!x.question) return false;
        const key = fingerprint(x.question);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => b.growthScore - a.growthScore)
      .slice(0, clamp(limit || 10, 1, 50));
  }

  function inferScores(item) {
    const q = normalize(item.question);
    const source = normalize(item.source).toLowerCase();
    const isQuestion = /[?]|\b(comment|pourquoi|est-ce|est ce|peut-on|peut on|dois-je|dois je|normal|grave|risque|quand|combien)\b/i.test(q);
    const healthTerms = /\b(sante|medecin|traitement|cancer|douleur|fievre|sommeil|grossesse|bebe|enfant|vaccin|diabete|coeur|tension|medicament|fatigue|alimentation|allerg|asthme|bronch|depistage|menopause|alzheimer)\b/i.test(q);
    return {
      intent: isQuestion ? 25 : 15,
      macaFit: healthTerms ? 25 : 12,
      corpusFit: healthTerms ? 20 : 10,
      distributionFit: /reddit|forum|facebook-public/.test(source) ? 20 : 15
    };
  }

  function prepare(items) {
    return (items || []).map(item => {
      const inferred = inferScores(item);
      return {...inferred, ...item};
    });
  }

  global.MACAGrowthEngineV0 = Object.freeze({
    version: "0.2.0",
    scoreOpportunity,
    classifyMacaTest,
    inferScores,
    prepare,
    buildDigest: (items, limit) => buildDigest(prepare(items), limit)
  });
})(typeof window !== "undefined" ? window : globalThis);
