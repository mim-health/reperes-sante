// MACA Santé — visual identity only. Does not alter corpus taxonomy or routing.
(function(){
 const sectionMap={
  'Santé au quotidien':'daily',
  'Cœur & prévention':'heart',
  'Médicaments':'meds',
  'Santé des femmes & grossesse':'women',
  'Enfants & parents':'children',
  'Ados':'teens',
  'Après 60 ans':'seniors',
  'Santé mentale':'mental'
 };
 function apply(){
  document.querySelectorAll('.qa-card').forEach(card=>{
   const label=card.querySelector('.qa-category')?.textContent?.trim();
   if(sectionMap[label]) card.dataset.section=sectionMap[label];
  });
 }
 apply();
 const grid=document.querySelector('#qa-grid');
 if(grid)new MutationObserver(apply).observe(grid,{childList:true,subtree:true});
 window.addEventListener('maca:v2-ui-ready',apply);
})();