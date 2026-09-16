/* MACA Santé — canonical category navigation guard. */
(function(){
  'use strict';
  const access=window.MACA_CATEGORY_ACCESS;
  const PUBLIC=access?access.PUBLIC:['Ados','Cancer','Cœur & circulation','Digestion & urinaire','Enfants & parents','Os & articulations','Prévention & dépistage','Santé au quotidien','Santé des femmes & grossesse','Santé mentale','Seniors'];
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const canonical=Array.isArray(window.MACA_CANONICAL_CORPUS)&&window.MACA_CANONICAL_CORPUS.length?window.MACA_CANONICAL_CORPUS:(window.healthQuestions||[]);
  const canonicalById=new Map(canonical.map(q=>[norm(q.id),q]));
  const canonicalByTitle=new Map(canonical.map(q=>[norm(q.title||q.question),q]));
  function questionOf(card){return canonicalById.get(norm(card.dataset.qid))||canonicalByTitle.get(norm(card.querySelector('h3')?.textContent))||null;}
  function categoryOf(card){
    const q=questionOf(card);
    if(access&&q)return access.primaryCategoryOf(q);
    return q?.publicCategory||q?.category||null;
  }
  function canonicalizeCards(){document.querySelectorAll('#qa-grid .qa-card').forEach(card=>{const cat=card.querySelector('.qa-category'),value=categoryOf(card);if(cat&&value)cat.textContent=value;});}
  function markup(active){return ['Toutes',...PUBLIC].map(c=>`<button class="filter-chip ${c===active?'active':''}" data-category="${c}">${c==='Toutes'?'Toutes les fiches':c}</button>`).join('');}
  function init(){
    const box=document.querySelector('#category-filters'),grid=document.querySelector('#qa-grid'),input=document.querySelector('#search-input');if(!box||!grid)return;
    const requestedRaw=new URLSearchParams(location.search).get('category');
    const requested=access?access.canonicalName(requestedRaw):requestedRaw;
    let active=PUBLIC.includes(requested)?requested:'Toutes';
    const apply=()=>{box.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('active',x.dataset.category===active));canonicalizeCards();grid.querySelectorAll('.qa-card').forEach(card=>{const cat=categoryOf(card);card.style.display=(active==='Toutes'||cat===active)?'':'none';});if(input){input.dataset.scope=active;input.placeholder=active==='Toutes'?'Rechercher une question santé…':`Rechercher dans « ${active} »…`;}};
    box.innerHTML=markup(active);apply();
    box.addEventListener('click',e=>{const b=e.target.closest('.filter-chip');if(!b)return;const wanted=b.dataset.category;if(!['Toutes',...PUBLIC].includes(wanted))return;e.preventDefault();e.stopImmediatePropagation();if(wanted==='Toutes'&&!document.body.classList.contains('library-page')){location.href='fiches.html';return;}active=wanted;if(input)input.value='';if(window.MACA_SEARCH_V2_UI?.showAll)window.MACA_SEARCH_V2_UI.showAll();apply();document.querySelector('#questions')?.scrollIntoView({behavior:'smooth',block:'start'});},true);
    new MutationObserver(apply).observe(grid,{childList:true});
    if(active!=='Toutes')requestAnimationFrame(()=>document.querySelector('#questions')?.scrollIntoView({block:'start'}));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
(()=>{const s=document.createElement('script');s.src='seo-links.js?v=20260824-1';s.defer=true;document.head.appendChild(s);})();