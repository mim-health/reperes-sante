/* MACA Santé V1 — dédoublonnage de la fiche rupture de médicament.
   Conserve une seule occurrence, quelle que soit la source historique. */
(function(){
  const canonicalId='rupture-medicament-que-faire';
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const isTarget=q=>q && (q.id===canonicalId || (norm(q.category).includes('medicament') && norm(q.title).includes('medicament est en rupture')));
  let kept=false;
  const dedupe=list=>Array.isArray(list)?list.filter(q=>{
    if(!isTarget(q)) return true;
    if(kept) return false;
    kept=true;
    return true;
  }):list;
  window.healthQuestions=dedupe(window.healthQuestions);
  window.extraAuditedQuestions=dedupe(window.extraAuditedQuestions);
})();
