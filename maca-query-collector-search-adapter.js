/* MACA Santé — adaptateur collecte V1 pour la barre de recherche. N'altère ni MACA_SEARCH_V2 ni son rendu. */
(function(root){
  'use strict';
  function init(){
    const collector=root.MACA_QUERY_COLLECTOR;
    const ui=root.MACA_SEARCH_V2_UI;
    const input=ui&&ui.input;
    const grid=document.getElementById('qa-grid');
    if(!collector||!ui||!input||!grid)return;
    collector.mountConsent(document.querySelector('.search-hub')||input.parentElement);

    let timer=null;
    let lastEventId=null;
    let lastSnapshotKey='';

    function snapshot(){
      const query=input.value.trim();
      if(!query)return null;
      const ids=ui.getVisibleIds().slice(0,20);
      const category=root.MACA_CATEGORY_ACCESS&&root.MACA_CATEGORY_ACCESS.matchQuery?root.MACA_CATEGORY_ACCESS.matchQuery(query):null;
      return {
        surface:'search',
        query_text:query,
        result:ids.length?'result':'no_result',
        proposed_ids:ids,
        engine_version:root.MACA_SEARCH_V2&&root.MACA_SEARCH_V2.version||'',
        route_kind:category?'category':'engine'
      };
    }

    function commit(){
      clearTimeout(timer);timer=null;
      const data=snapshot();
      if(!data){lastEventId=null;lastSnapshotKey='';return null;}
      const key=[data.query_text,data.result,data.route_kind,data.proposed_ids.join(',')].join('|');
      const id=collector.recordQuery(data);
      if(id){lastEventId=id;lastSnapshotKey=key;}
      return id;
    }

    function schedule(){
      clearTimeout(timer);timer=null;lastEventId=null;lastSnapshotKey='';
      if(!input.value.trim())return;
      timer=setTimeout(commit,1000);
    }

    input.addEventListener('input',schedule,{passive:true});
    input.addEventListener('keydown',event=>{if(event.key==='Enter')setTimeout(commit,0);});
    const go=document.getElementById('search-go');if(go)go.addEventListener('click',()=>setTimeout(commit,0));
    const clear=document.getElementById('clear-search');if(clear)clear.addEventListener('click',()=>{clearTimeout(timer);lastEventId=null;lastSnapshotKey='';});
    const filters=document.getElementById('category-filters');if(filters)filters.addEventListener('click',()=>{clearTimeout(timer);lastEventId=null;lastSnapshotKey='';});

    grid.addEventListener('click',event=>{
      const card=event.target.closest('.qa-card');if(!card)return;
      const data=snapshot();if(!data)return;
      const key=[data.query_text,data.result,data.route_kind,data.proposed_ids.join(',')].join('|');
      const eventId=(lastEventId&&lastSnapshotKey===key)?lastEventId:commit();
      if(eventId)collector.recordOpen(eventId,card.dataset.qid);
    });

    root.MACA_QUERY_COLLECTION_SEARCH={version:collector.version,commit,snapshot};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});else setTimeout(init,0);
  root.addEventListener('maca:v2-ui-ready',init,{once:true});
})(typeof window!=='undefined'?window:globalThis);
