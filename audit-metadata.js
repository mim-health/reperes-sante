/* MACA Santé — normalisation de la traçabilité éditoriale.
   Cette couche n'accorde pas une validation médicale : elle complète uniquement
   les métadonnées des contenus qui portent déjà une date de vérification. */
(function(){
  function parseFrDate(value){
    const m=String(value||'').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    return m?new Date(Date.UTC(+m[3],+m[2]-1,+m[1])):null;
  }
  function formatFrDate(date){
    return String(date.getUTCDate()).padStart(2,'0')+'/'+String(date.getUTCMonth()+1).padStart(2,'0')+'/'+date.getUTCFullYear();
  }
  function plusThreeMonths(value){
    const d=parseFrDate(value); if(!d)return null;
    d.setUTCMonth(d.getUTCMonth()+3); return formatFrDate(d);
  }
  function complete(item){
    if(!item||!item.verifiedAt)return item;
    return {...item,
      nextAuditAt:item.nextAuditAt||plusThreeMonths(item.verifiedAt),
      auditIntervalMonths:item.auditIntervalMonths||3,
      validationStatus:item.validationStatus||'VALIDATED'
    };
  }
  if(Array.isArray(window.auditedQuestionOverrides)) window.auditedQuestionOverrides=window.auditedQuestionOverrides.map(complete);
  if(Array.isArray(window.extraAuditedQuestions)) window.extraAuditedQuestions=window.extraAuditedQuestions.map(complete);
  window.macaCompleteAuditMetadata=complete;
})();
