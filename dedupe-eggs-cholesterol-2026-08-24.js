/* MACA Santé V1 — anti-doublon ciblé : œufs et cholestérol.
   Conserve une seule occurrence dans chaque store avant agrégation par app.js. */
(function(){
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const isEggCholesterol=q=>{const t=norm(q&&q.title);return t.includes('oeuf')&&t.includes('cholesterol');};
  const dedupeLocal=list=>{
    if(!Array.isArray(list)) return list;
    let seen=false;
    return list.filter(q=>{if(!isEggCholesterol(q))return true;if(seen)return false;seen=true;return true;});
  };
  window.healthQuestions=dedupeLocal(window.healthQuestions);
  window.extraAuditedQuestions=dedupeLocal(window.extraAuditedQuestions);
  /* Si la même fiche existe dans les deux stores, priorité à extraAuditedQuestions (version auditée). */
  if(Array.isArray(window.extraAuditedQuestions)&&window.extraAuditedQuestions.some(isEggCholesterol)&&Array.isArray(window.healthQuestions)){
    window.healthQuestions=window.healthQuestions.filter(q=>!isEggCholesterol(q));
  }
})();
