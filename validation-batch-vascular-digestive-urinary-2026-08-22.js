/* MACA Santé — validation ciblée lot vasculaire / digestif / urinaire, 22/08/2026. */
(function(){
  const validated={
    'jambe-gonflee-adulte':{validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,evidenceStatus:'Sources françaises concordantes · suspicion de TVP à confirmer par évaluation médicale et écho-Doppler selon le contexte'},
    'jambes-lourdes-varices':{validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,evidenceStatus:'Société Française de Phlébologie · Assurance Maladie · mesures physiques et compression selon indication'},
    'voyage-thrombose':{validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,evidenceStatus:'Recommandations voyageurs françaises · prévention adaptée au niveau de risque · pas d’automédication anticoagulante'},
    'reflux-adulte':{validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,evidenceStatus:'Assurance Maladie · références gastro-entérologiques françaises · mesures hygiéno-diététiques et signes d’alerte concordants'},
    'brulures-urinaires-adulte':{validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,evidenceStatus:'Assurance Maladie · recommandations françaises d’infections urinaires · distinction cystite simple / situation à risque'}
  };
  function apply(items){return Array.isArray(items)?items.map(item=>validated[item.id]?{...item,...validated[item.id]}:item):items;}
  window.auditedQuestionOverrides=apply(window.auditedQuestionOverrides);
  window.extraAuditedQuestions=apply(window.extraAuditedQuestions);
})();
