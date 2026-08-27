/* Multi-section UI adapter — changes display membership only, never duplicates corpus objects. */
(function(){
'use strict';
function patch(){
 const cards=[...document.querySelectorAll('.qa-card[data-qid]')];
 cards.forEach(card=>{
  const q=(window.healthQuestions||[]).find(x=>String(x.id)===String(card.dataset.qid));
  if(q?.sections) card.dataset.sections=q.sections.join('|');
 });
}
function selectedCategory(){return document.querySelector('.filter-chip.active')?.dataset?.category||'Toutes';}
function applySecondaryVisibility(){
 const category=selectedCategory();
 if(category==='Toutes'){patch();return;}
 document.querySelectorAll('.qa-card[data-qid]').forEach(card=>{
  const q=(window.healthQuestions||[]).find(x=>String(x.id)===String(card.dataset.qid));
  if(q?.sections?.includes(category)) card.hidden=false;
 });
 patch();
}
const root=document.querySelector('#qa-grid');
if(root)new MutationObserver(()=>{patch();requestAnimationFrame(applySecondaryVisibility)}).observe(root,{childList:true});
document.addEventListener('click',e=>{if(e.target.closest('.filter-chip'))setTimeout(applySecondaryVisibility,0)});
window.addEventListener('maca:v2-ui-ready',()=>{patch();applySecondaryVisibility()});
})();