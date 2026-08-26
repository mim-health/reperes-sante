/* MACA V2 browser entrypoint — deterministic corpus loading + existing UI. */
(function(){
  'use strict';
  function load(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=()=>reject(new Error('Unable to load UI script: '+src));document.body.appendChild(s);});}
  function exposeCanonical(){
    if(typeof window.MACA_BUILD_CANONICAL_CORPUS!=='function') throw new Error('MACA canonicalizer missing');
    let canonical=window.MACA_BUILD_CANONICAL_CORPUS();
    if(!Array.isArray(canonical)||!canonical.length) throw new Error('MACA canonical corpus empty');
    if(typeof window.MACA_ADD_MULTI_SECTIONS==='function') canonical=window.MACA_ADD_MULTI_SECTIONS(canonical);
    window.healthQuestions=canonical.slice();
    window.extraAuditedQuestions=[];
    window.MACA_UI_CORPUS_V2=true;
  }
  const page=document.body.classList.contains('library-page')?'library':'home';
  const commonBeforeApp=['search-v1-aliases.js?v=20260823-1'];
  const homeAfter=['scoped-category-search-v1.js?v=20260823-2','alphabetical-categories-v1.js?v=20260823-2','category-query-routing-v1.js?v=20260823-1','maca-eight-categories-v1.js?v=20260823-1','vrai-faux-ui.js','source-ui.js','maca-daily-editorial-data.js?v=20260825-1','maca-daily-editorial.js?v=20260825-1'];
  const libraryAfter=['category-navigation-hardfix.js?v=20260823-3','maca-eight-categories-v1.js?v=20260824-1','source-ui.js','search-v1-engine.js?v=20260826-2'];
  window.MACA_CORPUS_READY.then(()=>load('maca-multi-sections.js?v=20260825-1')).then(()=>{exposeCanonical();return commonBeforeApp.reduce((p,src)=>p.then(()=>load(src)),Promise.resolve());}).then(()=>load('app.js?v=20260825-corpusv3')).then(()=>((page==='library'?libraryAfter:homeAfter).reduce((p,src)=>p.then(()=>load(src)),Promise.resolve()))).then(()=>window.dispatchEvent(new CustomEvent('maca:v2-ui-ready'))).catch(err=>{console.error('[MACA V2 browser entry]',err);window.MACA_V2_UI_ERROR=String(err&&err.message||err);});
})();