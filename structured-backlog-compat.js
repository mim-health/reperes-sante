// Compatibility bridge: converts structured audited cards into the legacy question shape used by app.js.
(() => {
  const structured = window.SANTEJUSTE_BACKLOG_AUDITED || [];
  if (!structured.length) return;
  const sourceRegistry = window.SANTEJUSTE_SOURCE_REGISTRY || {};
  const existing = new Set((window.extraAuditedQuestions || []).map(q => q.id));
  const converted = structured.filter(q => !existing.has(q.id)).map(q => {
    const sources = (q.sourceIds || []).map(id => sourceRegistry[id]).filter(Boolean);
    const sourceLabel = sources.map(s => s.name).join(' · ') || 'Sources vérifiées';
    const firstUrl = sources[0]?.url || '#';
    const verified = q.verifiedAt ? q.verifiedAt.split('-').reverse().join('/') : '20/08/2026';
    return {
      id: q.id,
      category: q.category,
      title: q.question || q.title,
      keywords: Array.isArray(q.keywords) ? q.keywords.join(' ') : (q.keywords || ''),
      answer: q.shortAnswer || q.answer || '',
      watch: Array.isArray(q.practical) ? q.practical.join(' ') : (q.watch || ''),
      source: sourceLabel,
      url: firstUrl,
      verifiedAt: verified,
      evidenceStatus: q.evidenceSummary || 'Sources croisées'
    };
  });
  window.extraAuditedQuestions = [...(window.extraAuditedQuestions || []), ...converted];
})();
