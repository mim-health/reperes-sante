/* MACA Santé — bridge UI de recherche vers MACA_SEARCH_V2. Conserve le rendu et la navigation existants. */
(function(root){
  'use strict';

  function init(){
    const engine=root.MACA_SEARCH_V2;
    const grid=document.getElementById('qa-grid');
    const originalInput=document.getElementById('search-input');
    const originalClear=document.getElementById('clear-search');
    const originalGo=document.getElementById('search-go');
    const filters=document.getElementById('category-filters');
    const noResults=document.getElementById('no-results');
    if(!engine||!grid||!originalInput)return;

    /* Conserver exactement les cartes générées par l'UI actuelle. */
    const templates=new Map();
    [...grid.querySelectorAll('.qa-card')].forEach(card=>templates.set(card.dataset.qid,card.cloneNode(true)));
    const initialOrder=[...templates.keys()];

    /* Neutraliser les listeners de recherche V1 enfermés dans app.js sans toucher au DOM visuel. */
    const input=originalInput.cloneNode(true);
    originalInput.replaceWith(input);
    let clear=null;
    if(originalClear){clear=originalClear.cloneNode(true);originalClear.replaceWith(clear);}
    let go=null;
    if(originalGo){go=originalGo.cloneNode(true);originalGo.replaceWith(go);}

    let internalFilterChange=false;

    function setNoResults(show){
      if(!noResults)return;
      noResults.hidden=!show;
      if(show)noResults.innerHTML='<strong>MaCaSanté n’a pas encore de fiche répondant précisément à cette question.</strong><p>Cette question pourra nous aider à enrichir nos prochaines fiches après vérification des sources.</p>';
    }

    function renderIds(ids){
      grid.innerHTML='';
      ids.forEach(id=>{const tpl=templates.get(id);if(tpl)grid.appendChild(tpl.cloneNode(true));});
    }

    function activateAllFilter(){
      if(!filters)return;
      const all=[...filters.querySelectorAll('.filter-chip')].find(b=>(b.dataset.category||b.textContent.trim())==='Toutes');
      if(all&&!all.classList.contains('active')){
        internalFilterChange=true;
        all.click();
        internalFilterChange=false;
      }
    }

    function runSearch(options={}){
      const term=input.value.trim();
      if(clear)clear.hidden=!term;
      if(!term){
        activateAllFilter();
        renderIds(initialOrder);
        setNoResults(false);
        return [];
      }
      activateAllFilter();
      const ranked=engine.rank(term,options);
      const ids=ranked.map(item=>item.q&&item.q.id).filter(Boolean);
      renderIds(ids);
      setNoResults(ids.length===0);
      return ids;
    }

    input.addEventListener('input',()=>runSearch());
    input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();runSearch();document.querySelector('.library-section')?.scrollIntoView({behavior:'smooth',block:'start'});}});
    if(go)go.addEventListener('click',()=>{runSearch();document.querySelector('.library-section')?.scrollIntoView({behavior:'smooth',block:'start'});});
    if(clear)clear.addEventListener('click',()=>{input.value='';runSearch();input.focus();});

    /* Les filtres restent ceux de l'UI actuelle. Une recherche V2 repart toujours de « Toutes ». */
    if(filters)filters.addEventListener('click',()=>{
      if(internalFilterChange)return;
      setTimeout(()=>{input.value='';if(clear)clear.hidden=true;setNoResults(false);},0);
    });

    root.MACA_SEARCH_V2_UI={
      version:engine.version,
      run(query,options={}){input.value=String(query||'');return runSearch(options);},
      input,
      getVisibleIds(){return [...grid.querySelectorAll('.qa-card')].map(card=>card.dataset.qid);}
    };
    document.documentElement.dataset.macaSearchEngine='v2';
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(typeof window!=='undefined'?window:globalThis);
