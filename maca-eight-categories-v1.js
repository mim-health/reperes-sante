/* MACA Santé V1 — navigation publique simplifiée à 8 rubriques.
   Les catégories éditoriales fines restent dans les données source ; cette couche
   regroupe uniquement leur présentation publique, sans supprimer aucune fiche. */
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
  function buildFilters(){
    const box=document.querySelector('#category-filters'); if(!box)return;
    const current=box.querySelector('.filter-chip.active')?.dataset.category||'Toutes';
    box.innerHTML=['Toutes',...PUBLIC].map(c=>`<button class="filter-chip ${c===current?'active':''}" data-category="${c}">${c}</button>`).join('');
  }
  function filterVisible(category){remapCards();document.querySelectorAll('#qa-grid .qa-card').forEach(card=>{const c=card.querySelector('.qa-category')?.textContent.trim();card.style.display=(category==='Toutes'||c===category)?'':'none';});}
  function init(){
    const box=document.querySelector('#category-filters'), input=document.querySelector('#search-input'); if(!box)return;
    buildFilters(); remapCards();
    box.addEventListener('click',e=>{
      const b=e.target.closest('.filter-chip');if(!b)return;
      e.stopImmediatePropagation();
      box.querySelectorAll('.filter-chip').forEach(x=>x.classList.toggle('active',x===b));
      filterVisible(b.dataset.category||'Toutes');
      if(input){input.dataset.scope=b.dataset.category||'Toutes';input.placeholder=(b.dataset.category==='Toutes')?'Rechercher : fièvre, sommeil, paracétamol, tique…':`Rechercher dans « ${b.dataset.category} »…`;}
    },true);
    const observer=new MutationObserver(()=>{const active=box.querySelector('.filter-chip.active')?.dataset.category||'Toutes';remapCards();filterVisible(active);});
    const grid=document.querySelector('#qa-grid');if(grid)observer.observe(grid,{childList:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();