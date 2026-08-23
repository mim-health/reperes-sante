/* MACA Santé V1 — CMV grossesse : une seule fiche canonique.
   Le même id `cmv-grossesse` est actuellement chargé depuis maca-extra-five.js et lot L.
   On conserve la dernière version chargée (lot L), plus complète. */
(function(){
  function dedupe(list){
    if(!Array.isArray(list)) return list;
    let seen=false;
    const out=[];
    for(let i=list.length-1;i>=0;i--){
      const q=list[i];
      if(q && q.id==='cmv-grossesse'){
        if(seen) continue;
        seen=true;
      }
      out.push(q);
    }
    return out.reverse();
  }
  window.healthQuestions=dedupe(window.healthQuestions);
  window.extraAuditedQuestions=dedupe(window.extraAuditedQuestions);
})();
