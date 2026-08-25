/* MACA corpus integrity gate — migration branch only.
 * Run after MACA_CORPUS_READY. It never mutates medical cards.
 */
(function () {
  'use strict';
  const allowedCategories = new Set([
    'Santé au quotidien',
    'Cœur & prévention',
    'Digestion & urinaire',
    'Santé des femmes & grossesse',
    'Enfants & parents',
    'Ados',
    'Santé mentale',
    'Seniors'
  ]);

  const normalize = (value) => String(value || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

  function collectCards() {
    const sources = [];
    if (Array.isArray(window.healthQuestions)) sources.push(...window.healthQuestions);
    if (Array.isArray(window.extraAuditedQuestions)) sources.push(...window.extraAuditedQuestions);
    return sources.filter(Boolean);
  }

  function audit() {
    const cards = collectCards();
    const ids = new Map();
    const titles = new Map();
    const duplicateIds = [];
    const duplicateTitles = [];
    const invalidCategories = [];

    cards.forEach((card, index) => {
      const id = String(card.id || '').trim();
      const title = normalize(card.title || card.question);
      const category = String(card.publicCategory || card.category || '').trim();

      if (id) {
        if (ids.has(id)) duplicateIds.push({ id, first: ids.get(id), duplicate: index });
        else ids.set(id, index);
      }
      if (title) {
        if (titles.has(title)) duplicateTitles.push({ title: card.title || card.question, first: titles.get(title), duplicate: index });
        else titles.set(title, index);
      }
      if (category && !allowedCategories.has(category)) {
        invalidCategories.push({ id, title: card.title || card.question, category });
      }
    });

    const report = Object.freeze({
      totalRawCards: cards.length,
      uniqueIds: ids.size,
      uniqueNormalizedTitles: titles.size,
      duplicateIds,
      duplicateTitles,
      invalidCategories,
      passed: duplicateIds.length === 0 && duplicateTitles.length === 0 && invalidCategories.length === 0
    });
    window.MACA_CORPUS_INTEGRITY = report;
    window.dispatchEvent(new CustomEvent('maca:corpus-audited', { detail: report }));
    if (!report.passed) console.warn('[MACA corpus] integrity issues found', report);
    else console.info('[MACA corpus] integrity gate passed', report);
    return report;
  }

  window.MACA_AUDIT_CORPUS = audit;
  if (window.MACA_CORPUS_READY && typeof window.MACA_CORPUS_READY.then === 'function') {
    window.MACA_CORPUS_READY.then(audit).catch((error) => console.error('[MACA corpus] audit skipped', error));
  }
})();
