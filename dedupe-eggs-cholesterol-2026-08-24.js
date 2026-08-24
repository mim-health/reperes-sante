/* MACA Santé V1 — anti-doublon ciblé : œufs et cholestérol.
   Conserve une seule occurrence quel que soit le lot source. */
(function(){
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const isEggCholesterol=q=>{const t=norm(q&&q.title);return t.includes('oeuf')&&t.includes('cholesterol');};
  let seen=false;
  const dedupe=list=>Array.isArray(list)?list.filter(q=>{if(!isEggCholesterol(q))return true;if(seen)return false;seen=true;return true;}):list;
  window.healthQuestions=dedupe(window.healthQuestions);
  window.extraAuditedQuestions=dedupe(window.extraAuditedQuestions);
})();
