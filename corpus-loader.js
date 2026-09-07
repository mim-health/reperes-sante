/* Deterministic MACA corpus loader. Migration branch only.
 * Fast path: one generated corpus bundle preserving exact manifest order.
 * Safe fallback: legacy sequential loading if the bundle cannot be loaded or fails V2 sentinels.
 */
(function () {
  'use strict';
  const manifest = window.MACA_CORPUS_MANIFEST;
  if (!Array.isArray(manifest)) {
    console.error('[MACA corpus] manifest missing');
    window.MACA_CORPUS_READY = Promise.reject(new Error('MACA corpus manifest missing'));
    return;
  }

  const seen = new Set();
  const files = manifest.filter((src) => {
    const key = String(src).split('?')[0];
    if (seen.has(key)) {
      console.warn('[MACA corpus] duplicate manifest entry ignored:', src);
      return false;
    }
    seen.add(key);
    return true;
  });

  const initialHealthQuestions = Array.isArray(window.healthQuestions) ? window.healthQuestions.slice() : [];
  const initialExtraAuditedQuestions = Array.isArray(window.extraAuditedQuestions) ? window.extraAuditedQuestions.slice() : [];

  function load(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => resolve(src);
      script.onerror = () => reject(new Error('Unable to load corpus file: ' + src));
      document.head.appendChild(script);
    });
  }

  function loadSequential() {
    return files.reduce(
      (chain, src) => chain.then(() => load(src)),
      Promise.resolve()
    );
  }

  function latestCard(id) {
    const all = []
      .concat(Array.isArray(window.healthQuestions) ? window.healthQuestions : [])
      .concat(Array.isArray(window.extraAuditedQuestions) ? window.extraAuditedQuestions : []);
    for (let i = all.length - 1; i >= 0; i -= 1) {
      if (String(all[i] && all[i].id || '') === id) return all[i];
    }
    return null;
  }

  function assertBundleSentinels() {
    const expectedDetailed = [
      'cancer-immunotherapie-comment-ca-marche',
      'cancer-therapies-ciblees-biomarqueurs',
      'cancer-intelligence-artificielle-usages-reels',
      'cancer-radiotherapie-moderne-precision-reirradiation',
      'moustique-tigre-maladies-france-20260824',
      'west-nile-france-20260825',
      'fumees-incendie-protection-20260825'
    ];
    const missing = expectedDetailed.filter((id) => {
      const card = latestCard(id);
      return !card || !String(card.detail || '').trim();
    });
    if (missing.length) {
      throw new Error('Corpus bundle V2 stale/incomplete: ' + missing.join(', '));
    }
  }

  function restoreInitialGlobals() {
    window.healthQuestions = initialHealthQuestions.slice();
    window.extraAuditedQuestions = initialExtraAuditedQuestions.slice();
  }

  function ready(mode) {
    window.MACA_CORPUS_LOAD_MODE = mode;
    window.dispatchEvent(new CustomEvent('maca:corpus-ready', {
      detail: { files: files.slice(), mode }
    }));
    return files.slice();
  }

  window.MACA_CORPUS_READY = load('corpus-production.js?v=20260907-bundle3')
    .then(() => {
      assertBundleSentinels();
      return ready('bundle');
    })
    .catch((bundleError) => {
      console.warn('[MACA corpus] bundle unavailable or stale, fallback sequential', bundleError);
      restoreInitialGlobals();
      return loadSequential().then(() => ready('sequential-fallback'));
    })
    .catch((error) => {
      console.error('[MACA corpus]', error);
      throw error;
    });
})();
