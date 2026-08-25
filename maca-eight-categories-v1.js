/* MACA Santé — deterministic home category routing. */
(function(){
  'use strict';
  const PUBLIC=['Santé au quotidien','Cœur & prévention','Digestion & urinaire','Santé des femmes & grossesse','Enfants & parents','Ados','Santé mentale','Seniors'];
  function init(){
    if(!document.querySelector('#category-filters')||!document.querySelector('#qa-grid'))return;
    const box=document.querySelector('#category-filters');
    box.addEventListener('click',e=>{
      const b=e.target.closest('.filter-chip');if(!b)return;
      const wanted=b.dataset.category||b.textContent.trim();
      if(wanted==='Toutes')return;
      if(!PUBLIC.includes(wanted))return;
      e.preventDefault();e.stopImmediatePropagation();
      location.href=`fiches.html?category=${encodeURIComponent(wanted)}#questions`;
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
