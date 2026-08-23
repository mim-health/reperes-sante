/* MACA Santé V1 — recherche contextuelle par rubrique.
   Lorsqu'une rubrique est sélectionnée, toute saisie reste strictement dans cette rubrique.
   Seul un clic explicite sur « Toutes » rétablit la recherche globale. */
(function(){
  function enhance(){
    const filters=document.querySelector('#category-filters');
    const input=document.querySelector('#search-input');
    if(!filters||!input)return;
    let selected='Toutes';
    const sync=()=>{
      const active=filters.querySelector('.filter-chip.active');
      if(active) selected=active.dataset.category||active.textContent.trim()||'Toutes';
      input.dataset.scope=selected;
      input.setAttribute('aria-description',selected==='Toutes'?'Recherche dans toutes les fiches':`Recherche uniquement dans la rubrique ${selected}`);
      input.placeholder=selected==='Toutes'?'Rechercher : fièvre, sommeil, paracétamol, tique…':`Rechercher dans « ${selected} »…`;
    };
    filters.addEventListener('click',e=>{
      const chip=e.target.closest('.filter-chip');
      if(!chip)return;
      selected=chip.dataset.category||'Toutes';
      setTimeout(sync,0);
    });
    input.addEventListener('input',()=>{
      /* app.js conserve activeCategory ; ce module garantit que l'interface ne suggère jamais un retour global implicite. */
      setTimeout(sync,0);
    });
    sync();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',enhance); else enhance();
})();
