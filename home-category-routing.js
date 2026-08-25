/* MACA Santé — single home category routing contract. */
(function(){
  'use strict';
  const PUBLIC=['Santé au quotidien','Cœur & prévention','Digestion & urinaire','Santé des femmes & grossesse','Enfants & parents','Ados','Santé mentale','Seniors'];
  window.MACA_HOME_CATEGORY_PARAM='cat';
  window.MACA_HOME_PUBLIC_CATEGORIES=PUBLIC.slice();
  function init(){
    if(document.body.classList.contains('library-page'))return;
    const box=document.querySelector('#category-filters');if(!box)return;
    box.addEventListener('click',e=>{
      const b=e.target.closest('.filter-chip');if(!b)return;
      const wanted=b.dataset.category||b.textContent.trim();
      if(wanted==='Toutes'||!PUBLIC.includes(wanted))return;
      e.preventDefault();e.stopImmediatePropagation();
      location.assign(`fiches.html?cat=${encodeURIComponent(wanted)}#questions`);
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();