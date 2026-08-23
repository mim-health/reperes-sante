/* MACA Santé V1 — recherche strictement contextuelle par rubrique.
   Une recherche saisie dans une rubrique ne peut afficher que des fiches de cette rubrique.
   Seul un clic explicite sur « Toutes » rétablit la recherche globale. */
(function(){
  function enhance(){
    const filters=document.querySelector('#category-filters');
    const input=document.querySelector('#search-input');
    const grid=document.querySelector('#qa-grid');
    if(!filters||!input||!grid)return;
    let selected='Toutes';

    const currentCategory=()=>{
      const active=filters.querySelector('.filter-chip.active');
      return active?.dataset.category||selected||'Toutes';
    };
    const sync=()=>{
      selected=currentCategory();
      input.dataset.scope=selected;
      input.setAttribute('aria-description',selected==='Toutes'?'Recherche dans toutes les fiches':`Recherche uniquement dans la rubrique ${selected}`);
      input.placeholder=selected==='Toutes'?'Rechercher : fièvre, sommeil, paracétamol, tique…':`Rechercher dans « ${selected} »…`;
    };
    const enforceScope=()=>{
      sync();
      if(selected==='Toutes')return;
      [...grid.querySelectorAll('.qa-card')].forEach(card=>{
        const cat=card.querySelector('.qa-category')?.textContent.trim();
        if(cat!==selected)card.remove();
      });
      /* Supprime aussi les suggestions globales éventuelles lorsqu'une rubrique est active. */
      [...grid.querySelectorAll('.search-related-intro')].forEach(block=>{
        const wrapper=block.parentElement;
        if(wrapper&&wrapper!==grid) wrapper.remove(); else block.remove();
      });
    };

    filters.addEventListener('click',e=>{
      const chip=e.target.closest('.filter-chip');
      if(!chip)return;
      selected=chip.dataset.category||chip.textContent.trim()||'Toutes';
      setTimeout(enforceScope,0);
    });
    input.addEventListener('input',()=>setTimeout(enforceScope,0));

    /* Filet de sécurité : même si app.js réaffiche des résultats globaux après la saisie,
       ils sont immédiatement retirés tant que la rubrique reste active. */
    const observer=new MutationObserver(()=>{
      if(currentCategory()!=='Toutes')setTimeout(enforceScope,0);
    });
    observer.observe(grid,{childList:true,subtree:true});
    sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);else enhance();
})();
