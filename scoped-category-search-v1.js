/* MACA Santé V1 — recherche contextuelle par rubrique.
   La recherche reste limitée à la rubrique active, mais un clic sur une autre rubrique
   doit toujours permettre de changer directement de rubrique sans repasser par l'accueil. */
(function(){
  function enhance(){
    const filters=document.querySelector('#category-filters');
    const input=document.querySelector('#search-input');
    const grid=document.querySelector('#qa-grid');
    if(!filters||!input||!grid)return;
    let selected='Toutes';

    const activeCategory=()=>{
      const active=filters.querySelector('.filter-chip.active');
      return active?.dataset.category||active?.textContent.trim()||selected||'Toutes';
    };
    const sync=()=>{
      selected=activeCategory();
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
      [...grid.querySelectorAll('.search-related-intro')].forEach(block=>{
        const wrapper=block.parentElement;
        if(wrapper&&wrapper!==grid) wrapper.remove(); else block.remove();
      });
    };

    filters.addEventListener('click',e=>{
      const chip=e.target.closest('.filter-chip');
      if(!chip)return;
      /* Important : ne pas appliquer l'ancien filtre au rendu déclenché par app.js.
         On mémorise immédiatement la nouvelle rubrique puis on laisse app.js refaire
         le rendu avant de réappliquer la portée de recherche. */
      selected=chip.dataset.category||chip.textContent.trim()||'Toutes';
      input.dataset.scope=selected;
      setTimeout(()=>{
        const active=filters.querySelector('.filter-chip.active');
        selected=active?.dataset.category||active?.textContent.trim()||selected;
        enforceScope();
      },20);
    });
    input.addEventListener('input',()=>setTimeout(enforceScope,0));

    /* Observer uniquement les changements issus d'une recherche/rendu, et toujours
       utiliser la rubrique réellement active. */
    let pending=false;
    const observer=new MutationObserver(()=>{
      if(pending)return;
      pending=true;
      setTimeout(()=>{
        pending=false;
        const cat=activeCategory();
        if(cat!=='Toutes')enforceScope();
      },0);
    });
    observer.observe(grid,{childList:true,subtree:true});
    sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);else enhance();
})();
