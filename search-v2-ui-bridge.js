/* MACA Santé — bridge UI de recherche vers MACA_SEARCH_V2. Conserve le rendu et la navigation existants. */
(function(root){
  'use strict';

  function init(){
    const engine=root.MACA_SEARCH_V2;
    const categories=root.MACA_CATEGORY_ACCESS;
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

    function showAll(){renderIds(initialOrder);setNoResults(false);return initialOrder.slice();}

    function activateAllFilter(){
      if(!filters)return;
      const all=[...filters.querySelectorAll('.filter-chip')].find(b=>(b.dataset.category||b.textContent.trim())==='Toutes');
      if(all&&!all.classList.contains('active')){
        internalFilterChange=true;
        all.click();
        internalFilterChange=false;
      }
    }

    function categoryIds(term){
      if(!categories)return null;
      const category=categories.matchQuery(term);
      if(!category)return null;
      return {category,ids:categories.idsFor(category,root.MACA_CANONICAL_CORPUS||root.healthQuestions||[])};
    }

    function runSearch(options={}){
      const term=input.value.trim();
      if(clear)clear.hidden=!term;
      if(!term){
        activateAllFilter();
        return showAll();
      }
      activateAllFilter();

      /* Un nom exact de rubrique est une navigation, pas une requête médicale :
         on affiche toutes les fiches de la rubrique avant tout scoring. */
      const categoryMatch=categoryIds(term);
      if(categoryMatch){
        renderIds(categoryMatch.ids);
        setNoResults(categoryMatch.ids.length===0);
        return categoryMatch.ids;
      }

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
      showAll,
      getVisibleIds(){return [...grid.querySelectorAll('.qa-card')].filter(card=>card.style.display!=='none').map(card=>card.dataset.qid);}
    };
    document.documentElement.dataset.macaSearchEngine='v2';
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(typeof window!=='undefined'?window:globalThis);
