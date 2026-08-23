/* MACA Santé — contrôleur UNIQUE de navigation entre rubriques.
   app.js conserve rendu/recherche/modal. Ce fichier seul gère les 8 rubriques publiques.
   Aucun rechargement, aucun autre script de filtre concurrent. */
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
    if(/medicament|paracetamol|ibuprofene|antibiot|rupture|statine/.test(t))return 'Médicaments';
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
  function buttons(){
    box.innerHTML=['Toutes',...PUBLIC].map(c=>`<button class="filter-chip${c===active?' active':''}" data-public-category="${c}" type="button">${c}</button>`).join('');
  }
  function render(){
    const term=norm(input?.value||'').trim();
    const words=term.split(/\s+/).filter(Boolean);
    const selected=allCards.filter(x=>(active==='Toutes'||x.cat===active)&&(!words.length||words.every(w=>norm(x.node.textContent).includes(w))));
    grid.replaceChildren(...selected.map(x=>x.node.cloneNode(true)));
    buttons();
    if(input){input.placeholder=active==='Toutes'?'Rechercher : fièvre, sommeil, paracétamol, tique…':`Rechercher dans « ${active} »…`;input.dataset.scope=active;}
  }
  /* Capture initiale après le rendu complet produit par app.js. */
  snapshot(); buttons(); render();
  /* Remplace les anciens listeners : les boutons sont recréés par ce contrôleur,
     et le listener en capture bloque app.js avant qu'il ne modifie son ancien état. */
  box.addEventListener('click',e=>{
    const b=e.target.closest('[data-public-category]'); if(!b)return;
    e.preventDefault(); e.stopImmediatePropagation();
    active=b.dataset.publicCategory||'Toutes'; render();
  },true);
  input?.addEventListener('input',e=>{e.stopImmediatePropagation();render();},true);
  grid.addEventListener('click',e=>{
    const card=e.target.closest('.qa-card'); if(!card)return;
    /* app.js reçoit toujours ce clic et ouvre la fiche. */
  });
})();