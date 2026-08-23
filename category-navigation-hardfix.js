/* MACA Santé — correctif robuste navigation inter-rubriques.
   Chaque clic change directement la rubrique via ?rubrique=, sans retour à l'accueil.
   Le rechargement garantit que l'ancien état JS ne peut plus bloquer la nouvelle rubrique. */
(function(){
  const box=document.getElementById('category-filters');
  if(!box)return;
  const params=new URLSearchParams(location.search);
  const requested=params.get('rubrique');

  box.addEventListener('click',function(e){
    const b=e.target.closest('.filter-chip');
    if(!b)return;
    const cat=b.dataset.category||b.textContent.trim()||'Toutes';
    e.preventDefault();
    e.stopImmediatePropagation();
    const u=new URL(location.href);
    if(cat==='Toutes')u.searchParams.delete('rubrique');
    else u.searchParams.set('rubrique',cat);
    location.href=u.pathname+u.search+'#questions';
  },true);

  if(requested){
    setTimeout(function(){
      const buttons=[...box.querySelectorAll('.filter-chip')];
      const target=buttons.find(b=>(b.dataset.category||b.textContent.trim())===requested);
      if(!target)return;
      /* Après chargement neuf, app.js est dans l'état Toutes : un seul clic suffit. */
      target.click();
    },100);
  }
})();