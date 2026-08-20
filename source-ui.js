(() => {
  const registry = window.santeJusteSourceRegistry || {};
  let activeQuestionId = null;

  function escapeHtml(value='') {
    return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  function renderSources(id) {
    const sources = registry[id];
    if (!sources || !sources.length) return;
    const box = document.querySelector('#modal-content .source-box');
    if (!box) return;
    const rows = sources.map((s, i) => `
      <div style="padding:${i ? '12px 0 0' : '8px 0 0'};${i ? 'border-top:1px solid #dce7e3;margin-top:12px;' : ''}">
        <div style="font-weight:700;color:#203631">${escapeHtml(s.org)}</div>
        <div style="margin-top:3px;line-height:1.45">${escapeHtml(s.title)}${s.year ? ` · ${escapeHtml(s.year)}` : ''}</div>
        <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener" style="display:inline-block;margin-top:5px">Consulter cette source →</a>
      </div>`).join('');
    box.innerHTML = `<strong>Sources utilisées</strong>${rows}<div style="margin-top:14px;padding-top:12px;border-top:1px solid #dce7e3;color:#667873">Vérifiées le 20/08/2026</div>`;
  }

  function scheduleRender(id) {
    activeQuestionId = id;
    requestAnimationFrame(() => renderSources(activeQuestionId));
  }

  document.addEventListener('click', e => {
    const card = e.target.closest('.qa-card');
    if (card?.dataset?.qid) scheduleRender(card.dataset.qid);
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest?.('.qa-card');
    if (card?.dataset?.qid) scheduleRender(card.dataset.qid);
  });
})();