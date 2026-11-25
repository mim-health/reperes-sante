/* MACA Santé — normalisation de la traçabilité éditoriale.
   Cette couche n'accorde JAMAIS à elle seule une validation médicale.
   VALIDATED doit être porté explicitement par la fiche après contrôle conforme
   au cahier des charges éditorial médical. */
(function(){
  function parseFrDate(value){
    const m=String(value||'').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if(m)return new Date(Date.UTC(+m[3],+m[2]-1,+m[1]));
    const iso=String(value||'').match(/^(\d{4})-(\d{2})-(\d{2})(?:T|$)/);
    return iso?new Date(Date.UTC(+iso[1],+iso[2]-1,+iso[3])):null;
  }
  function formatFrDate(date){
    return String(date.getUTCDate()).padStart(2,'0')+'/'+String(date.getUTCMonth()+1).padStart(2,'0')+'/'+date.getUTCFullYear();
  }
  function plusThreeMonths(value){
    const d=parseFrDate(value); if(!d)return null;
    const day=d.getUTCDate(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth()+3); d.setUTCDate(Math.min(day,new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate())); return formatFrDate(d);
  }
  function complete(item){
    if(!item||!item.verifiedAt)return item;
    return {...item,
      nextAuditAt:item.nextAuditAt||plusThreeMonths(item.verifiedAt),
      auditIntervalMonths:item.auditIntervalMonths||3,
      validationStatus:item.validationStatus||'AUDITED_LEGACY'
    };
  }
  if(Array.isArray(window.auditedQuestionOverrides)) window.auditedQuestionOverrides=window.auditedQuestionOverrides.map(complete);
  if(Array.isArray(window.extraAuditedQuestions)) window.extraAuditedQuestions=window.extraAuditedQuestions.map(complete);
  window.macaCompleteAuditMetadata=complete;
})();
