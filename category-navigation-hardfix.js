/* MACA Santé — contrôleur UNIQUE de navigation entre rubriques.
   app.js conserve rendu/recherche. Ce fichier gère les 8 rubriques publiques
   et garantit qu'un clic de fiche est résolu par son ID canonique, jamais par texte. */
(function(){
  const PUBLIC=['Santé au quotidien','Cœur & prévention','Médicaments','Santé des femmes & grossesse','Enfants & parents','Ados','Après 60 ans','Santé mentale'];
  const box=document.getElementById('category-filters');
  const grid=document.getElementById('qa-grid');
  const input=document.getElementById('search-input');
  if(!box||!grid)return;
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  let active='Toutes';
  let allCards=[];
  function mapCategory(card){
    const old=card.querySelector('.qa-category')?.textContent||'';
    const title=card.querySelector('h3')?.textContent||'';
    const t=norm(old+' '+title);
    if(/sante mentale|depression|anxiet|angoisse|stress|psych|moral|melatonine|insomnie/.test(t))return 'Santé mentale';
    if(/ado|adolesc/.test(t))return 'Ados';
    if(/apres 60|senior|vieill|memoire|chute/.test(t))return 'Après 60 ans';
    if(/enfant|parent|bebe|nourrisson|pediatr/.test(t))return 'Enfants & parents';
    if(/grossesse|femme|menopause|fertilit|contracept|pilule|gyneco|cmv/.test(t))return 'Santé des femmes & grossesse';
    if(/medicament|paracetamol|ibuprofene|antibiot|rupture|statine|levure de riz rouge/.test(t))return 'Médicaments';
    if(/coeur|cardio|tension|hypertension|cholesterol|circulation|veine|thromb|phleb|varice/.test(t))return 'Cœur & prévention';
    return 'Santé au quotidien';
  }
  function snapshot(){
    allCards=[...grid.querySelectorAll('.qa-card')].map(card=>{
      const clone=card.cloneNode(true); const cat=mapCategory(clone);
      const label=clone.querySelector('.qa-category'); if(label)label.textContent=cat;
      return {node:clone,cat};
    });
  }
  function buttons(){box.innerHTML=['Toutes',...PUBLIC].map(c=>`<button class="filter-chip${c===active?' active':''}" data-public-category="${c}" type="button">${c}</button>`).join('');}
  function render(){
    const term=norm(input?.value||'').trim();
    const words=term.split(/\s+/).filter(Boolean);
    const selected=allCards.filter(x=>(active==='Toutes'||x.cat===active)&&(!words.length||words.every(w=>norm(x.node.textContent).includes(w))));
    grid.replaceChildren(...selected.map(x=>x.node.cloneNode(true)));
    buttons();
    if(input){input.placeholder=active==='Toutes'?'Rechercher : fièvre, sommeil, paracétamol, tique…':`Rechercher dans « ${active} »…`;input.dataset.scope=active;}
  }
  function canonicalQuestion(id){
    if(!id)return null;
    const stores=[window.healthQuestions||[],window.extraAuditedQuestions||[]];
    for(const store of stores){const q=store.find(x=>x&&x.id===id);if(q)return q;}
    return null;
  }
  function openCanonicalQuestion(id){
    const q=canonicalQuestion(id);if(!q)return false;
    const modal=document.getElementById('article-modal'),content=document.getElementById('modal-content');if(!modal||!content)return false;
    const evidence=(q.verifiedAt||q.evidenceStatus)?`<div class="evidence-meta">${q.evidenceStatus?`<span>${q.evidenceStatus}</span>`:''}${q.verifiedAt?`<span>Vérifié le ${q.verifiedAt}</span>`:''}</div>`:'';
    content.innerHTML=`<span class="pill">${mapCategoryFromQuestion(q)}</span><h2>${q.title}</h2><div class="answer-block"><strong>Réponse courte</strong><p>${q.answer||''}</p></div>${q.watch?`<div class="watch-block"><strong>À surveiller</strong><p>${q.watch}</p></div>`:''}<div class="source-box"><strong>Sources</strong><br>${q.source||''}<br>${evidence}${q.url?`<a href="${q.url}" target="_blank" rel="noopener">Consulter la source →</a>`:''}</div>`;
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
    history.replaceState(null,'',`${location.pathname}${location.search}#fiche=${encodeURIComponent(id)}`);
    return true;
  }
  function mapCategoryFromQuestion(q){
    const fake=document.createElement('article');fake.innerHTML=`<span class="qa-category">${q.category||''}</span><h3>${q.title||''}</h3>`;return mapCategory(fake);
  }
  snapshot();buttons();render();
  box.addEventListener('click',e=>{
    const b=e.target.closest('[data-public-category]');if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();active=b.dataset.publicCategory||'Toutes';render();
  },true);
  input?.addEventListener('input',e=>{e.stopImmediatePropagation();render();},true);
  /* Exact-ID routing. Prevents lexical collisions such as "riz rouge" -> "œil rouge". */
  grid.addEventListener('click',e=>{
    const card=e.target.closest('.qa-card');if(!card)return;
    const id=card.dataset.qid;if(!id)return;
    if(openCanonicalQuestion(id)){e.preventDefault();e.stopImmediatePropagation();}
  },true);
})();