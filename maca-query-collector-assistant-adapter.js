/* MACA Santé — adaptateur collecte V1 pour l'Assistant. Observe le viewmodel sans modifier le moteur. */
(function(root){
  'use strict';
  let initialized=false;
  function init(){
    if(initialized)return;
    const collector=root.MACA_QUERY_COLLECTOR;
    const form=document.getElementById('form');
    const input=document.getElementById('alpha-query');
    const openLink=document.getElementById('open');
    if(!collector||!form||!input||!openLink)return;
    initialized=true;
    collector.mountConsent(form.parentElement||form);

    let lastEventId=null;
    let lastQuery='';

    function categorySnapshot(query){
      const access=root.MACA_CATEGORY_ACCESS;
      if(!access||typeof access.matchQuery!=='function')return null;
      const category=access.matchQuery(query);if(!category)return null;
      const corpus=root.MACA_CANONICAL_CORPUS||root.healthQuestions||[];
      let ids=[];
      if(typeof access.idsFor==='function')ids=access.idsFor(category,corpus)||[];
      else if(typeof access.itemsFor==='function')ids=(access.itemsFor(category,corpus)||[]).map(q=>q&&q.id).filter(Boolean);
      ids=ids.slice(0,20);
      return {surface:'assistant',query_text:query,result:ids.length?'result':'no_result',proposed_ids:ids,engine_version:root.MACA_SEARCH_V2&&root.MACA_SEARCH_V2.version||'',route_kind:'category'};
    }

    function engineSnapshot(query){
      const vm=root.MACA_ASSISTANT_V15_VIEWMODEL;
      if(!vm||typeof vm.build!=='function')return null;
      const result=vm.build(query);
      let ids=[];
      if(result&&result.status==='choices')ids=(result.choices||[]).map(q=>q&&q.id).filter(Boolean);
      else if(result&&result.primary)ids=[result.primary,...(result.complements||[])].map(q=>q&&q.id).filter(Boolean);
      return {surface:'assistant',query_text:query,result:ids.length?'result':'no_result',proposed_ids:ids.slice(0,20),engine_version:root.MACA_SEARCH_V2&&root.MACA_SEARCH_V2.version||'',route_kind:'engine'};
    }

    function commit(query){
      const value=String(query||'').trim();if(!value)return null;
      const data=categorySnapshot(value)||engineSnapshot(value);if(!data)return null;
      lastQuery=value;
      lastEventId=collector.recordQuery(data);
      return lastEventId;
    }

    form.addEventListener('submit',()=>{
      const query=input.value.trim();
      setTimeout(()=>commit(query),0);
    });

    openLink.addEventListener('click',()=>{
      if(!lastEventId||!lastQuery)return;
      try{
        const url=new URL(openLink.getAttribute('href')||'',location.href);
        const ficheId=url.searchParams.get('id');
        if(ficheId)collector.recordOpen(lastEventId,ficheId);
      }catch(_){/* collecte fail-open */}
    });

    root.MACA_QUERY_COLLECTION_ASSISTANT={version:collector.version,commit};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(typeof window!=='undefined'?window:globalThis);
