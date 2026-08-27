/* MACA Santé — navigation catégories v2.
   Corrige le conflit avec le listener historique d'app.js : le clic sur une rubrique
   est converti en un nouveau rendu à partir de Toutes, puis filtré sur le DOM complet. */
(function(){
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const box=document.getElementById('category-filters');
  const input=document.getElementById('search-input');
  const grid=document.getElementById('qa-grid');
  if(!box||!grid)return;
  let wanted='Toutes',busy=false;
  function remap(card){
    const label=card.querySelector('.qa-category'); if(!label)return '';
    const old=label.textContent.trim(), text=norm(old+' '+(card.querySelector('h3')?.textContent||''));
    let c='Santé au quotidien';
    if(/sante mentale|depression|anxiet|angoisse|stress|psych|suicid|moral/.test(text))c='Santé mentale';
    else if(/ados?|adolesc/.test(text))c='Ados';
    else if(/apres 60|senior|vieill|memoire|chute/.test(text))c='Après 60 ans';
    else if(/enfant|parent|bebe|nourrisson|pediatr/.test(text))c='Enfants & parents';
    else if(/grossesse|femme|feminin|menopause|fertilit|contracept|gyneco|cmv/.test(text))c='Santé des femmes & grossesse';
    else if(/medicament|paracetamol|ibuprofene|antibiot|traitement|rupture/.test(text))c='Médicaments';
    else if(/coeur|circulation|cardio|tension|hypertension|cholesterol|veine|thromb|phleb|varice|tour de taille|prevention/.test(text))c='Cœur & prévention';
    label.textContent=c; return c;
  }
  function apply(){
    grid.querySelectorAll('.qa-card').forEach(card=>{const c=remap(card);card.hidden=!(wanted==='Toutes'||c===wanted);card.style.display=(wanted==='Toutes'||c===wanted)?'':'none';});
    box.querySelectorAll('.filter-chip').forEach(b=>b.classList.toggle('active',b.dataset.category===wanted));
    if(input){input.dataset.scope=wanted;input.placeholder=wanted==='Toutes'?'Rechercher : fièvre, sommeil, paracétamol, tique…':`Rechercher dans « ${wanted} »…`;}
  }
  box.addEventListener('click',function(e){
    const b=e.target.closest('.filter-chip'); if(!b||busy)return;
    const next=b.dataset.category||'Toutes';
    if(next==='Toutes'){wanted='Toutes';setTimeout(apply,0);return;}
    e.preventDefault();e.stopImmediatePropagation();wanted=next;
    /* Le listener d'app.js sait reconstruire la collection entière quand on clique Toutes. */
    const all=box.querySelector('[data-category="Toutes"]');
    if(all){busy=true;all.click();busy=false;}
    setTimeout(apply,0);
  },true);
  new MutationObserver(()=>{if(!busy)setTimeout(apply,0);}).observe(grid,{childList:true});
})();
