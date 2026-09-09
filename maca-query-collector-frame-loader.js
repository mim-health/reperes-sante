/* MACA Santé — injecte le même collecteur V1 dans l'iframe Assistant, sans modifier son moteur. */
(function(){
  'use strict';
  let wiredFrame=null;
  function inject(frame){
    try{
      const doc=frame&&frame.contentDocument;if(!doc||!doc.body)return;
      if(doc.getElementById('maca-query-collector-script'))return;
      const collector=doc.createElement('script');collector.id='maca-query-collector-script';collector.src='maca-query-collector.js?v=20260909-v1';collector.onload=()=>{
        if(doc.getElementById('maca-query-collector-assistant-script'))return;
        const adapter=doc.createElement('script');adapter.id='maca-query-collector-assistant-script';adapter.src='maca-query-collector-assistant-adapter.js?v=20260909-v1';doc.body.appendChild(adapter);
      };doc.body.appendChild(collector);
    }catch(_){/* même origine attendue ; collecte fail-open */}
  }
  function wire(){
    const frame=document.querySelector('.maca-assistant-frame');if(!frame)return false;
    if(wiredFrame!==frame){wiredFrame=frame;frame.addEventListener('load',()=>inject(frame));}
    inject(frame);return true;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire,{once:true});else wire();
  window.addEventListener('maca:v2-ui-ready',wire);
  setTimeout(wire,500);setTimeout(wire,1500);
})();
