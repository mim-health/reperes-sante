/* MACA Santé — validation documentaire lot I, 22/08/2026.
   Lot J est déjà explicitement VALIDATED dans son fichier source. */
(function(){
  const ids=['rgo-adulte','lombalgie-adulte','toux-prolongee-adulte','insomnie-adulte','palpitations-adulte','running-prolapsus-femme'];
  const set=new Set(ids);
  function apply(items){return Array.isArray(items)?items.map(item=>set.has(item.id)?{...item,validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3}:item):items;}
  window.auditedQuestionOverrides=apply(window.auditedQuestionOverrides);
  window.extraAuditedQuestions=apply(window.extraAuditedQuestions);
})();
