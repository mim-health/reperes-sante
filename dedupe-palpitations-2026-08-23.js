/* MACA Santé — anti-doublon palpitations, 23/08/2026.
   Conserve la fiche canonique historique `palpitations` lorsqu'elle existe et retire les variantes éditoriales redondantes. */
(function(){
  const preferredIds=['palpitations','palpitations-adulte'];
  function norm(value=''){
    return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  }
  function isPalpitation(item){
    const text=norm((item&&((item.title||item.question||'')+' '+(item.keywords||'')))||'');
    return text.includes('palpitation') || (text.includes('coeur') && text.includes('irregulier'));
  }
  const pools=['healthQuestions','extraAuditedQuestions','auditedQuestionOverrides','SANTEJUSTE_BACKLOG_AUDITED'];
  let canonical=null;
  for(const key of pools){
    const arr=window[key];
    if(!Array.isArray(arr)) continue;
    canonical=arr.find(x=>preferredIds.includes(x&&x.id))||canonical;
  }
  if(!canonical){
    for(const key of pools){
      const arr=window[key];
      if(!Array.isArray(arr)) continue;
      canonical=arr.find(isPalpitation)||canonical;
    }
  }
  if(!canonical) return;
  for(const key of pools){
    const arr=window[key];
    if(!Array.isArray(arr)) continue;
    window[key]=arr.filter(item=>!isPalpitation(item)||item.id===canonical.id);
  }
})();
