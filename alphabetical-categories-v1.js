/* MACA Santé V1 — ordre alphabétique des rubriques.
   « Toutes » reste en tête, puis rubriques triées selon la locale française. */
(function(){
  function sortCategories(){
    const container=document.querySelector('#category-filters');
    if(!container)return;
    const buttons=[...container.querySelectorAll('.filter-chip')];
    if(buttons.length<2)return;
    const all=buttons.find(b=>(b.dataset.category||b.textContent.trim())==='Toutes');
    const rest=buttons.filter(b=>b!==all).sort((a,b)=>(a.dataset.category||a.textContent.trim()).localeCompare((b.dataset.category||b.textContent.trim()),'fr',{sensitivity:'base'}));
    if(all)container.appendChild(all);
    rest.forEach(b=>container.appendChild(b));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(sortCategories,0));else setTimeout(sortCategories,0);
})();
