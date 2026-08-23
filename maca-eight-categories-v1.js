/* MACA Santé V1 — navigation publique simplifiée à 8 rubriques.
   Correction 23/08 : un changement de rubrique relance le rendu complet avant filtrage,
   afin de pouvoir passer directement d'une rubrique à l'autre. */
(function(){
  const PUBLIC=['Santé au quotidien','Cœur & prévention','Médicaments','Santé des femmes & grossesse','Enfants & parents','Ados','Après 60 ans','Santé mentale'];
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function target(card){
    const old=(card.querySelector('.qa-category')?.textContent||'').trim();
    const text=norm(`${old} ${card.querySelector('h3')?.textContent||''}`);
    if(/sante mentale|depression|anxiet|angoisse|stress|psych|suicid|moral/.test(text)) return 'Santé mentale';
    if(/ados?|adolesc/.test(text)) return 'Ados';
    if(/apres 60|senior|vieill|memoire|chute/.test(text)) return 'Après 60 ans';
    if(/enfant|parent|bebe|nourrisson|pediatr/.test(text)) return 'Enfants & parents';
    if(/grossesse|femme|feminin|menopause|fertilit|contracept|gyneco|cmv/.test(text)) return 'Santé des femmes & grossesse';
    if(/medicament|paracetamol|ibuprofene|antibiot|traitement|rupture/.test(text)) return 'Médicaments';
    if(/coeur|circulation|cardio|tension|hypertension|cholesterol|veine|thromb|phleb|varice|tour de taille|prevention|bien-etre|sport|activite physique/.test(text)) return 'Cœur & prévention';
    return 'Santé au quotidien';
  }
  function remapCards(){document.querySelectorAll('#qa-grid .qa-card').forEach(card=>{const cat=card.querySelector('.qa-category');if(cat)cat.textContent=target(card);});}
  function buildFilters(){const box=document.querySelector('#category-filters');if(!box)return;box.innerHTML=['Toutes',...PUBLIC].map(c=>`<button class="filter-chip" data-category="${c}">${c}</button>`).join('');}
  function filterVisible(category){remapCards();document.querySelectorAll('#qa-grid .qa-card').forEach(card=>{const c=card.querySelector('.qa-category')?.textContent.trim();card.style.display=(category==='Toutes'||c===category)?'':'none';});}
  function init(){
    const box=document.querySelector('#category-filters'),input=document.querySelector('#search-input');if(!box)return;
    buildFilters();
    let publicActive='Toutes';
    function select(category){
      publicActive=category||'Toutes';
      /* app.js avait éventuellement déjà réduit le DOM à l'ancienne catégorie.
         On force d'abord son état interne sur Toutes et son rendu de la bibliothèque complète. */
      const all=box.querySelector('[data-category="Toutes"]');
      if(all){all.click();}
      setTimeout(()=>{
        box.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('active',x.dataset.category===publicActive));
        filterVisible(publicActive);
        if(input){input.dataset.scope=publicActive;input.placeholder=publicActive==='Toutes'?'Rechercher : fièvre, sommeil, paracétamol, tique…':`Rechercher dans « ${publicActive} »…`;}
      },0);
    }
    box.addEventListener('click',e=>{
      const b=e.target.closest('.filter-chip');if(!b||b.dataset.internalRefresh==='1')return;
      const wanted=b.dataset.category||'Toutes';
      if(wanted==='Toutes'){publicActive='Toutes';setTimeout(()=>{remapCards();box.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('active',x.dataset.category==='Toutes'));},0);return;}
      e.preventDefault();e.stopImmediatePropagation();
      /* Déclenche explicitement le filtre Toutes d'app.js sans laisser l'ancienne rubrique bloquer le DOM. */
      const all=box.querySelector('[data-category="Toutes"]');
      if(all){all.dataset.internalRefresh='1';all.dispatchEvent(new MouseEvent('click',{bubbles:true}));delete all.dataset.internalRefresh;}
      publicActive=wanted;
      setTimeout(()=>{box.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('active',x.dataset.category===wanted));filterVisible(wanted);if(input){input.dataset.scope=wanted;input.placeholder=`Rechercher dans « ${wanted} »…`; }},20);
    },true);
    const grid=document.querySelector('#qa-grid');if(grid)new MutationObserver(()=>{remapCards();if(publicActive!=='Toutes')filterVisible(publicActive);}).observe(grid,{childList:true});
    remapCards();select('Toutes');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();