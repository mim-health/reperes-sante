/* MACA Santé — validation finale des fiches isolées auditées, 22/08/2026.
   Les fiches du lot K sont déjà explicitement VALIDATED dans leur fichier source. */
(function(){
  const ids=new Set([
    'magnesium-sante',
    'projet-grossesse-quand-consulter',
    'perimenopause-signes-quand-consulter',
    'voyage-trousse-pharmacie',
    'alcool-vin-arteres',
    'alcool-vin-vieillissement'
  ]);
  function validate(item){
    if(!item||!ids.has(item.id)) return item;
    return {...item,validationStatus:'VALIDATED',auditIntervalMonths:3};
  }
  if(Array.isArray(window.SANTEJUSTE_BACKLOG_AUDITED)) window.SANTEJUSTE_BACKLOG_AUDITED=window.SANTEJUSTE_BACKLOG_AUDITED.map(validate);
  if(Array.isArray(window.extraAuditedQuestions)) window.extraAuditedQuestions=window.extraAuditedQuestions.map(item=>{
    if(!ids.has(item.id)) return item;
    return {...item,validationStatus:'VALIDATED',auditIntervalMonths:3,nextAuditAt:item.nextAuditAt||'20/11/2026'};
  });
})();
