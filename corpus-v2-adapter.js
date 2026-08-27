/* MACA V2 UI adapter — migration branch only.
 * Run after legacy corpus files + corpus-canonicalizer.js and before app.js.
 * Exposes exactly the canonical corpus to the existing UI without rewriting medical source files.
 */
(function(){
  'use strict';
  if (typeof window.MACA_BUILD_CANONICAL_CORPUS !== 'function') {
    throw new Error('MACA canonicalizer missing before V2 adapter');
  }
  const canonical = window.MACA_BUILD_CANONICAL_CORPUS();
  if (!Array.isArray(canonical) || !canonical.length) {
    throw new Error('MACA canonical corpus is empty');
  }
  // Existing app.js consumes healthQuestions + extraAuditedQuestions.
  // Put the complete canonical view in one input and empty the second one,
  // preventing the legacy app merge from re-introducing duplicates.
  window.healthQuestions = canonical.slice();
  window.extraAuditedQuestions = [];
  window.MACA_UI_CORPUS_V2 = true;
})();
