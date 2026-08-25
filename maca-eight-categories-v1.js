/* MACA Santé — V2 canonical category navigation guard. */
(function(){
  'use strict';
  const PUBLIC=['Santé au quotidien','Cœur & prévention','Digestion & urinaire','Santé des femmes & grossesse','Enfants & parents','Ados','Santé mentale','Seniors'];
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const canonicalById=new Map((window.MACA_CANONICAL_CORPUS||[]).map(q=>[norm(q.id),q.publicCategory]));
  const canonicalByTitle=new Map((window.MACA_CANONICAL_CORPUS||[]).map(q=>[norm(q.title||q.question),q.publicCategory]));
  function categoryOf(card){
    return canonicalById.get(norm(card.dataset.qid))||canonicalByTitle.get(norm(card.querySelector('h3')?.textContent))||'Santé au quotidien';
  }
  function canonicalizeCards(){
    document.querySelectorAll('#qa-grid .qa-card').forEach(card=>{
      const cat=card.querySelector('.qa-category');if(cat)cat.textContent=categoryOf(card);
    });
  }
  function markup(active){return ['Toutes',...PUBLIC].map(c=>`<button class="filter-chip ${c===active?'active':''}" data-category="${c}">${c}</button>`).join('');}
  function init(){
    const box=document.querySelector('#category-filters'),grid=document.querySelector('#qa-grid'),input=document.querySelector('#search-input');if(!box||!grid)return;
    let active='Toutes';
    box.innerHTML=markup(active);canonicalizeCards();
    box.addEventListener('click',e=>{
      const b=e.target.closest('.filter-chip');if(!b)return;
      const wanted=b.dataset.category;if(!['Toutes',...PUBLIC].includes(wanted))return;
      e.preventDefault();e.stopImmediatePropagation();active=wanted;
      box.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('active',x.dataset.category===active));
      canonicalizeCards();
      grid.querySelectorAll('.qa-card').forEach(card=>card.style.display=(active==='Toutes'||categoryOf(card)===active)?'':'none');
      if(input){input.dataset.scope=active;input.placeholder=active==='Toutes'?'Rechercher une question santé…':`Rechercher dans « ${active} »…`;}
      document.querySelector('#questions')?.scrollIntoView({behavior:'smooth',block:'start'});
    },true);
    new MutationObserver(()=>{canonicalizeCards();grid.querySelectorAll('.qa-card').forEach(card=>card.style.display=(active==='Toutes'||categoryOf(card)===active)?'':'none');}).observe(grid,{childList:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
(()=>{const s=document.createElement('script');s.src='seo-links.js?v=20260824-1';s.defer=true;document.head.appendChild(s);})();