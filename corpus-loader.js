/* Deterministic MACA corpus loader. Migration branch only.
 * Starts canonical corpus downloads in parallel while preserving script execution order.
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

  window.MACA_CORPUS_READY = Promise.all(files.map(load)).then(() => {
    window.dispatchEvent(new CustomEvent('maca:corpus-ready', { detail: { files: files.slice() } }));
    return files.slice();
  }).catch((error) => {
    console.error('[MACA corpus]', error);
    throw error;
  });
})();
