/* MACA Santé — CANONICAL PUBLIC LIBRARY GUARD.
   Emergency anti-regression guard: the public taxonomy has 8 rubriques.
   Category filtering is handled here from the already-rendered corpus so legacy
   keyword heuristics in app.js cannot leak cards into the wrong rubrique. */
(function(){
  const PUBLIC=['Santé au quotidien','Cœur & prévention','Médicaments','Santé des femmes & grossesse','Enfants & parents','Ados','Après 60 ans','Santé mentale'];
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const titleKey=card=>norm(card.querySelector('h3')?.textContent||'');
  const idKey=card=>norm(card.dataset.qid||'');

  /* IMPORTANT: classification uses only the visible subject (title + stable qid).
     Never use free-text keywords. Strong medical subjects are resolved BEFORE the
     already-rendered category, because app.js may already have misclassified it. */
  function target(card){
    const old=(card.querySelector('.qa-category')?.textContent||'').trim();
    const title=titleKey(card),qid=idKey(card),subject=`${qid} ${title}`;

    if(/bebe|nourrisson|enfant|parent|pediatr|allait|biberon|poussee dentaire|bronchiolit/.test(subject))return'Enfants & parents';
    if(/grossesse|enceinte|menopause|perimenopause|fertilit|contracept|pilule|gyneco|cmv|endometr|regles|femme/.test(subject))return'Santé des femmes & grossesse';
    if(/\bado\b|adolesc/.test(subject))return'Ados';
    if(/senior|apres 60|vieill|memoire|chute|osteopor/.test(subject))return'Après 60 ans';
    if(/depression|depressif|anxiet|angoisse|attaque de panique|psych|suicid|moral|burn out|epuisement psych/.test(subject))return'Santé mentale';
    if(/medicament|paracetamol|ibuprofene|antibiot|statine|levure de riz rouge|ordonnance|pharmaci/.test(subject))return'Médicaments';
    if(/coeur|artere|cardio|tension|hypertension|cholesterol|circulation|veine|thromb|phleb|varice|avc|infarct|prevention cardiovascul/.test(subject))return'Cœur & prévention';

    /* Sleep alone is not sufficient to classify a general-health card as mental health. */
    if(/sommeil|dormir|insomnie/.test(subject))return'Santé au quotidien';
    if(PUBLIC.includes(old))return old;
    return'Santé au quotidien';
  }

  function canonicalizeCards(){
    const seenTitles=new Set(),seenIds=new Set();
    document.querySelectorAll('#qa-grid .qa-card').forEach(card=>{
      const cat=card.querySelector('.qa-category');if(cat)cat.textContent=target(card);
      const t=titleKey(card),id=idKey(card);
      /* Remove duplicate cards by stable id OR normalized title. This fixes repeated
         child cards without deleting anything from the medical source corpus. */
      if((id&&seenIds.has(id))||(t&&seenTitles.has(t))){card.remove();return;}
      if(id)seenIds.add(id);if(t)seenTitles.add(t);
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
    box.addEventListener('click',e=>{
      const b=e.target.closest('.filter-chip');if(!b)return;
      const wanted=b.dataset.category||'Toutes';if(!['Toutes',...PUBLIC].includes(wanted))return;
      e.preventDefault();e.stopImmediatePropagation();publicActive=wanted;enforceFilters();
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