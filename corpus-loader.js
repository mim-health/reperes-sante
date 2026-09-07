/* Deterministic MACA corpus loader. Migration branch only.
 * Fast path: one generated corpus bundle preserving exact manifest order.
 * Safe fallback: legacy sequential loading if the bundle cannot be loaded.
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

  function ready(mode) {
    window.MACA_CORPUS_LOAD_MODE = mode;
    window.dispatchEvent(new CustomEvent('maca:corpus-ready', {
      detail: { files: files.slice(), mode }
    }));
    return files.slice();
  }

  window.MACA_CORPUS_READY = load('corpus-production.js?v=20260907-bundle1')
    .then(() => ready('bundle'))
    .catch((bundleError) => {
      console.warn('[MACA corpus] bundle unavailable, fallback sequential', bundleError);
      return loadSequential().then(() => ready('sequential-fallback'));
    })
    .catch((error) => {
      console.error('[MACA corpus]', error);
      throw error;
    });
})();
