/* MACA Santé — anti-doublon cystite, 23/08/2026.
   Conserve la fiche canonique `brulures-urinaires-adulte` et retire les anciennes variantes redondantes.
   Chargé juste avant app.js afin de couvrir toutes les sources de données de fiches. */
(function(){
  const canonicalId='brulures-urinaires-adulte';
  const duplicateIds=new Set([
    'cystite-adulte',
    'cystite-femme',
    'brulures-urinaires-cystite',
    'brulures-urinaires-quand-penser-cystite'
  ]);
  const duplicateTitles=[
    'brulures urinaires quand penser a une cystite'
  ];
  function norm(value=''){
    return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  }
  function keep(item){
    if(!item) return false;
    if(item.id===canonicalId) return true;
    if(duplicateIds.has(item.id)) return false;
    const title=norm(item.title||item.question||'');
    return !duplicateTitles.some(t=>title===t);
  }
  if(Array.isArray(window.healthQuestions)) window.healthQuestions=window.healthQuestions.filter(keep);
  if(Array.isArray(window.extraAuditedQuestions)) window.extraAuditedQuestions=window.extraAuditedQuestions.filter(keep);
  if(Array.isArray(window.auditedQuestionOverrides)) window.auditedQuestionOverrides=window.auditedQuestionOverrides.filter(keep);
  if(Array.isArray(window.SANTEJUSTE_BACKLOG_AUDITED)) window.SANTEJUSTE_BACKLOG_AUDITED=window.SANTEJUSTE_BACKLOG_AUDITED.filter(keep);
})();
