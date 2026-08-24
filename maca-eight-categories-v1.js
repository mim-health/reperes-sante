/* MACA Santé — CANONICAL PUBLIC LIBRARY GUARD.
   Single public taxonomy (8 rubriques) + deterministic title deduplication.
   Historical/internal categories may exist in source data but must never leak to UI. */
(function(){
  const PUBLIC=['Santé au quotidien','Cœur & prévention','Médicaments','Santé des femmes & grossesse','Enfants & parents','Ados','Après 60 ans','Santé mentale'];
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const key=card=>norm(card.querySelector('h3')?.textContent||'');
  function target(card){
    const old=(card.querySelector('.qa-category')?.textContent||'').trim();
    const text=norm(`${old} ${card.querySelector('h3')?.textContent||''}`);
    if(/sante mentale|depression|anxiet|angoisse|stress|psych|suicid|moral|sommeil/.test(text))return'Santé mentale';
    if(/ados?|adolesc/.test(text))return'Ados';
    if(/apres 60|senior|vieill|memoire|chute/.test(text))return'Après 60 ans';
    if(/enfant|parent|bebe|nourrisson|pediatr/.test(text))return'Enfants & parents';
    if(/grossesse|femme|feminin|menopause|fertilit|contracept|gyneco|cmv/.test(text))return'Santé des femmes & grossesse';
    if(/medicament|paracetamol|ibuprofene|antibiot|traitement|rupture|statine/.test(text))return'Médicaments';
    if(/coeur|circulation|cardio|tension|hypertension|cholesterol|veine|thromb|phleb|varice|tour de taille|prevention|bien etre|sport|activite physique|nutrition/.test(text))return'Cœur & prévention';
    return'Santé au quotidien';
  }
  function canonicalizeCards(){
    const seen=new Set();
    document.querySelectorAll('#qa-grid .qa-card').forEach(card=>{
      const cat=card.querySelector('.qa-category'); if(cat)cat.textContent=target(card);
      const k=key(card); if(k&&seen.has(k)){card.remove();return;} if(k)seen.add(k);
    });
  }
  function canonicalFilterMarkup(active='Toutes'){
    return ['Toutes',...PUBLIC].map(c=>`<button class="filter-chip ${c===active?'active':''}" data-category="${c}">${c}</button>`).join('');
  }
  let rebuilding=false, publicActive='Toutes';
  function enforceFilters(){
    const box=document.querySelector('#category-filters');if(!box||rebuilding)return;
    const current=[...box.querySelectorAll('.filter-chip')].map(x=>x.dataset.category||x.textContent.trim());
    const expected=['Toutes',...PUBLIC];
    if(current.length!==expected.length||current.some((c,i)=>c!==expected[i])){
      rebuilding=true;box.innerHTML=canonicalFilterMarkup(publicActive);rebuilding=false;
    }
  }
  function filterVisible(category){
    canonicalizeCards();
    document.querySelectorAll('#qa-grid .qa-card').forEach(card=>{const c=card.querySelector('.qa-category')?.textContent.trim();card.style.display=(category==='Toutes'||c===category)?'':'none';});
  }
  function stabilize(){
    if(document.getElementById('maca-canonical-library-style'))return;
    const style=document.createElement('style');style.id='maca-canonical-library-style';style.textContent='@media(max-width:800px){.search-hub{contain:layout style}.search-box{position:relative;transform:translateZ(0)}.search-box input{font-size:16px!important;line-height:1.3}.filter-chips{min-height:57px;scrollbar-width:none}.filter-chips::-webkit-scrollbar{display:none}#qa-grid{overflow-anchor:none}.qa-card{contain:layout style}}';document.head.appendChild(style);
  }
  function init(){
    stabilize();const box=document.querySelector('#category-filters'),input=document.querySelector('#search-input'),grid=document.querySelector('#qa-grid');if(!box)return;
    box.innerHTML=canonicalFilterMarkup(publicActive);canonicalizeCards();
    box.addEventListener('click',e=>{
      const b=e.target.closest('.filter-chip');if(!b)return;
      const wanted=b.dataset.category||'Toutes';
      if(!['Toutes',...PUBLIC].includes(wanted))return;
      publicActive=wanted;
      setTimeout(()=>{enforceFilters();box.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('active',x.dataset.category===wanted));filterVisible(wanted);if(input){input.dataset.scope=wanted;input.placeholder=wanted==='Toutes'?'Rechercher une question santé…':`Rechercher dans « ${wanted} »…`; }},0);
    },true);
    if(grid)new MutationObserver(()=>{canonicalizeCards();if(publicActive!=='Toutes')filterVisible(publicActive);}).observe(grid,{childList:true});
    new MutationObserver(()=>enforceFilters()).observe(box,{childList:true,subtree:true});
    /* Final guard after all legacy scripts have initialized. */
    setTimeout(()=>{enforceFilters();canonicalizeCards();},50);
    setTimeout(()=>{enforceFilters();canonicalizeCards();},500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();