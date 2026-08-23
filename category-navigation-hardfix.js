/* MACA Santé — navigation inter-rubriques robuste.
   Un clic utilisateur recharge directement fiches.html avec la rubrique demandée.
   Au chargement neuf, le clic d'initialisation traverse normalement les filtres existants. */
(function(){
  const box=document.getElementById('category-filters');
  if(!box)return;
  const requested=new URLSearchParams(location.search).get('rubrique');
  let applying=false;

  box.addEventListener('click',function(e){
    if(applying)return;
    const b=e.target.closest('.filter-chip');
    if(!b)return;
    const cat=b.dataset.category||b.textContent.trim()||'Toutes';
    e.preventDefault();e.stopImmediatePropagation();
    const u=new URL(location.href);
    if(cat==='Toutes')u.searchParams.delete('rubrique'); else u.searchParams.set('rubrique',cat);
    location.href=u.pathname+u.search+'#questions';
  },true);

  if(requested){
    setTimeout(function(){
      const target=[...box.querySelectorAll('.filter-chip')].find(b=>(b.dataset.category||b.textContent.trim())===requested);
      if(!target)return;
      applying=true;
      target.click();
      applying=false;
    },120);
  }
})();