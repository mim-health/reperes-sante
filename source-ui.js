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

/* MACA Stabilisation 2026-08-22: local search confidence + keyboard accessibility.
   No AI/API call: all matching remains local in the browser. */
(() => {
  const fold = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9%+\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  const stop = new Set(['a','ai','au','aux','avec','ce','ces','dans','de','des','du','elle','en','est','et','fait','faire','faut','il','je','la','le','les','ma','mais','me','mes','mon','ne','nous','on','ou','par','pas','pour','que','quel','quelle','qui','sa','se','ses','son','sur','un','une','vous','votre','depuis','quand','comment','pourquoi','peut','peux','dois','doit','jai','cest','estce']);
  const concepts = [
    ['fievre','temperature','febrile'], ['diarrhee','selles liquides','gastro'], ['vomissement','vomissements','vomit','gastro'],
    ['toux','tousser','respiration','respiratoire'], ['essoufflement','essouffle','souffle','respiration'],
    ['bebe','nourrisson'], ['enfant','pediatrie'], ['tete','cephalee','migraine'], ['ventre','abdominal','abdomen','estomac'],
    ['bouton','boutons','eruption','rash','peau'], ['demangeaison','demange','prurit'], ['sommeil','dormir','dort','insomnie'],
    ['tension','hypertension','hta','pression arterielle'], ['coeur','cardiaque','palpitation','palpitations'],
    ['jambe','jambes','mollet','veine','veineux','circulation'], ['tique','lyme'], ['urine','urinaire','pipi','cystite'],
    ['brulure','brule','bruler'], ['paracetamol','doliprane'], ['ibuprofene','advil','nurofen'],
    ['antibiotique','antibiotiques'], ['sport','course','courir','running','marche','activite physique'],
    ['ecran','ecrans','tablette','telephone','television'], ['sel','sodium'], ['acouphene','acouphenes','bourdonnement','bourdonnements','sifflement','sifflements']
  ].map(group => group.map(fold));

  function words(value) { return fold(value).split(' ').filter(w => w.length > 1 && !stop.has(w)); }
  function editDistance(a,b) {
    if (Math.abs(a.length-b.length) > 2) return 99;
    const row = Array.from({length:b.length+1},(_,i)=>i);
    for (let i=1;i<=a.length;i++) {
      let prev=row[0]; row[0]=i;
      for (let j=1;j<=b.length;j++) { const old=row[j]; row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(a[i-1]===b[j-1]?0:1)); prev=old; }
    }
    return row[b.length];
  }
  function expand(tokens) {
    const out = new Set(tokens);
    tokens.forEach(token => concepts.forEach(group => {
      if (group.some(term => term===token || term.split(' ').includes(token))) group.forEach(term => term.split(' ').forEach(w => out.add(w)));
    }));
    return [...out];
  }
  function tokenMatch(token, hayWords) {
    if (hayWords.some(w => w===token || (token.length>=5 && (w.startsWith(token) || token.startsWith(w))))) return true;
    if (token.length>=5 && hayWords.some(w => w.length>=5 && editDistance(token,w)<=1)) return true;
    return false;
  }

  window.scoreQuestion = function(q, term) {
    const query = fold(term); if (!query) return 1;
    const title = fold(q.title), keywords = fold(q.keywords), category = fold(q.category), answer = fold(q.answer);
    const titleWords=words(title), keywordWords=words(keywords), categoryWords=words(category), answerWords=words(answer);
    const base = words(query);
    if (!base.length) return 0;
    const expanded = expand(base);
    let score = 0, directConcepts = 0;
    if (title.includes(query)) score += 28;
    if (keywords.includes(query)) score += 22;
    base.forEach(t => {
      let matched = false;
      if (tokenMatch(t,titleWords)) { score += 10; matched=true; }
      if (tokenMatch(t,keywordWords)) { score += 8; matched=true; }
      if (tokenMatch(t,categoryWords)) { score += 3; matched=true; }
      if (tokenMatch(t,answerWords)) { score += 1; matched=true; }
      if (matched) directConcepts++;
    });
    expanded.filter(t=>!base.includes(t)).forEach(t => {
      if (tokenMatch(t,titleWords)) score += 4;
      if (tokenMatch(t,keywordWords)) score += 3;
    });
    if (directConcepts >= 2) score += 12 + (directConcepts-2)*4;
    const coverage = directConcepts / Math.max(1,base.length);
    if (base.length >= 2 && coverage < 0.34) return 0;
    if (directConcepts === 0) return 0;
    return score >= 8 ? score : 0;
  };

  let previousFocus = null;
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const qa = e.target.closest?.('.qa-card');
    const editorial = e.target.closest?.('.card');
    if (!qa && !editorial) return;
    e.preventDefault();
    previousFocus = e.target;
    if (qa?.dataset?.qid && typeof window.openQuestion === 'function') window.openQuestion(qa.dataset.qid);
    else if (editorial?.dataset?.id && typeof window.openArticle === 'function') window.openArticle(editorial.dataset.id);
    requestAnimationFrame(() => document.querySelector('#article-modal .close')?.focus());
  });
  document.addEventListener('click', e => {
    if (e.target.closest?.('.qa-card,.card')) previousFocus = e.target.closest('.qa-card,.card');
  }, true);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && previousFocus && document.querySelector('#article-modal')?.getAttribute('aria-hidden') === 'false') {
      setTimeout(() => previousFocus?.focus?.(), 0);
    }
  });
})();