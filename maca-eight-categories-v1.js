/* MACA Santé — CANONICAL PUBLIC LIBRARY GUARD.
   Emergency anti-regression guard: the public taxonomy has 8 rubriques.
   IMPORTANT: category filtering is handled here from the already-rendered full corpus so
   legacy keyword heuristics in app.js cannot re-render an incorrect subset. */
(function(){
  const PUBLIC=['Santé au quotidien','Cœur & prévention','Médicaments','Santé des femmes & grossesse','Enfants & parents','Ados','Après 60 ans','Santé mentale'];
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const key=card=>norm(card.querySelector('h3')?.textContent||'');

  /* Never use free-text keywords to move a card between rubriques.
     Strong subject signals come only from the visible title + stable qid.
     This specifically prevents sleep/stress keywords from moving baby or menopause cards
     into Santé mentale. Existing public category is kept when no strong subject signal exists. */
  function target(card){
    const old=(card.querySelector('.qa-category')?.textContent||'').trim();
    const title=norm(card.querySelector('h3')?.textContent||'');
    const qid=norm(card.dataset.qid||'');
    const subject=`${qid} ${title}`;
    if(/bebe|nourrisson|enfant|parent|pediatr/.test(subject))return'Enfants & parents';
    if(/grossesse|menopause|perimenopause|fertilit|contracept|pilule|gyneco|cmv|femme/.test(subject))return'Santé des femmes & grossesse';
    if(/ado|adolesc/.test(subject))return'Ados';
    if(/senior|apres 60|vieill|memoire|chute/.test(subject))return'Après 60 ans';
    if(/depression|anxiet|angoisse|stress|psych|suicid|moral|sommeil|insom/.test(subject))return'Santé mentale';
    if(PUBLIC.includes(old))return old;
    if(/medicament|paracetamol|ibuprofene|antibiot|statine|levure de riz rouge/.test(subject))return'Médicaments';
    if(/coeur|cardio|tension|hypertension|cholesterol|circulation|veine|thromb|phleb|varice|prevention/.test(subject))return'Cœur & prévention';
    return'Santé au quotidien';
  }

  function canonicalizeCards(){
    const seen=new Set();
    document.querySelectorAll('#qa-grid .qa-card').forEach(card=>{
      const cat=card.querySelector('.qa-category');if(cat)cat.textContent=target(card);
      const k=key(card);if(k&&seen.has(k)){card.remove();return;}if(k)seen.add(k);
    });
  }
  function canonicalFilterMarkup(active='Toutes'){
    return ['Toutes',...PUBLIC].map(c=>`<button class="filter-chip ${c===active?'active':''}" data-category="${c}">${c}</button>`).join('');
  }
  let rebuilding=false,publicActive='Toutes';
  function enforceFilters(){
    const box=document.querySelector('#category-filters');if(!box||rebuilding)return;
    const expected=['Toutes',...PUBLIC];
    const current=[...box.querySelectorAll('.filter-chip')].map(x=>x.dataset.category||x.textContent.trim());
    if(current.length!==expected.length||current.some((c,i)=>c!==expected[i])){
      rebuilding=true;box.innerHTML=canonicalFilterMarkup(publicActive);rebuilding=false;
    }
  }
  function filterVisible(category){
    canonicalizeCards();
    document.querySelectorAll('#qa-grid .qa-card').forEach(card=>{
      const c=card.querySelector('.qa-category')?.textContent.trim();
      card.style.display=(category==='Toutes'||c===category)?'':'none';
    });
  }
  function stabilize(){
    if(document.getElementById('maca-canonical-library-style'))return;
    const style=document.createElement('style');style.id='maca-canonical-library-style';style.textContent='@media(max-width:800px){.search-hub{contain:layout style}.search-box{position:relative;transform:translateZ(0)}.search-box input{font-size:16px!important;line-height:1.3}.filter-chips{min-height:57px;scrollbar-width:none}.filter-chips::-webkit-scrollbar{display:none}#qa-grid{overflow-anchor:none}.qa-card{contain:layout style}}';document.head.appendChild(style);
  }
  function init(){
    stabilize();
    const box=document.querySelector('#category-filters'),input=document.querySelector('#search-input'),grid=document.querySelector('#qa-grid');if(!box)return;
    box.innerHTML=canonicalFilterMarkup(publicActive);canonicalizeCards();

    /* Capture + stopImmediatePropagation is intentional: app.js previously re-rendered a
       keyword-derived subset after our filter, which caused cross-category leakage. */
    box.addEventListener('click',e=>{
      const b=e.target.closest('.filter-chip');if(!b)return;
      const wanted=b.dataset.category||'Toutes';if(!['Toutes',...PUBLIC].includes(wanted))return;
      e.preventDefault();e.stopImmediatePropagation();
      publicActive=wanted;
      enforceFilters();
      box.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('active',x.dataset.category===wanted));
      filterVisible(wanted);
      if(input){input.dataset.scope=wanted;input.placeholder=wanted==='Toutes'?'Rechercher une question santé…':`Rechercher dans « ${wanted} »…`;}
    },true);

    if(grid)new MutationObserver(()=>{canonicalizeCards();filterVisible(publicActive);}).observe(grid,{childList:true});
    new MutationObserver(()=>enforceFilters()).observe(box,{childList:true,subtree:true});
    setTimeout(()=>{enforceFilters();canonicalizeCards();filterVisible(publicActive);},50);
    setTimeout(()=>{enforceFilters();canonicalizeCards();filterVisible(publicActive);},500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
/* SEO links are deliberately isolated from taxonomy/search behavior. */
(()=>{const s=document.createElement('script');s.src='seo-links.js?v=20260824-1';s.defer=true;document.head.appendChild(s);})();