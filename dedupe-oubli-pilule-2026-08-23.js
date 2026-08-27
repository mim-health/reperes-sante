/* MACA Santé V1 — dédoublonnage oubli de pilule et classement Santé des femmes. */
(function(){
  if(!Array.isArray(window.extraAuditedQuestions)) return;
  let kept=false;
  const out=[];
  for(let i=window.extraAuditedQuestions.length-1;i>=0;i--){
    const q=window.extraAuditedQuestions[i];
    if(q && q.id==='oubli-pilule'){
      if(kept) continue;
      kept=true;
      q.category='Santé des femmes';
    }
    out.push(q);
  }
  window.extraAuditedQuestions=out.reverse();
})();
