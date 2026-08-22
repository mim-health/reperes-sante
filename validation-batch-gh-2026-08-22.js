/* MACA Santé — validation documentaire lots G/H, 22/08/2026. */
(function(){
  const ids=['convulsion-febrile-enfant','boiterie-enfant','diversification-alimentaire','ingestion-produit-toxique-enfant','poux-enfant','oubli-pilule','diarrhee-adulte','perte-poids-involontaire','pleurs-nourrisson','regles-abondantes-saignements'];
  const set=new Set(ids);
  function apply(items){return Array.isArray(items)?items.map(item=>set.has(item.id)?{...item,validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3}:item):items;}
  window.auditedQuestionOverrides=apply(window.auditedQuestionOverrides);
  window.extraAuditedQuestions=apply(window.extraAuditedQuestions);
})();
