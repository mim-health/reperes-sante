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

  global.MACAGrowthEngineV0 = Object.freeze({
    version: "0.1.0",
    scoreOpportunity,
    classifyMacaTest,
    buildDigest
  });
})(typeof window !== "undefined" ? window : globalThis);
