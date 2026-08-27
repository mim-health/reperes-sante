/* MACA Santé V1 — dédoublonnage des fiches mémoire / Après 60 ans.
   Conserve une seule fiche de référence : `trous-memoire-age` (lot L), plus récente
   et explicitement auditée. Retire les anciennes fiches mémoire équivalentes. */
(function(){
  const canonical='trous-memoire-age';
  const normalize=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const isMemoryDuplicate=q=>{
    if(!q) return false;
    if(q.id===canonical) return false;
    const c=normalize(q.category), t=normalize(q.title), k=normalize(q.keywords);
    if(!c.includes('apres 60')) return false;
    return t.includes('memoire') || t.includes('trous de memoire') || k.includes('memoire');
  };
  if(Array.isArray(window.healthQuestions)) window.healthQuestions=window.healthQuestions.filter(q=>!isMemoryDuplicate(q));
  if(Array.isArray(window.extraAuditedQuestions)){
    let canonicalSeen=false;
    window.extraAuditedQuestions=window.extraAuditedQuestions.filter(q=>{
      if(q && q.id===canonical){ if(canonicalSeen) return false; canonicalSeen=true; return true; }
      return !isMemoryDuplicate(q);
    });
  }
})();
