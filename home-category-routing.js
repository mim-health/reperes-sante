/* MACA Santé — single home category routing contract. */
(function(){
  'use strict';
  const PUBLIC=['Ados','Cancer','Cœur & prévention','Digestion & urinaire','Enfants & parents','Santé au quotidien','Santé des femmes & grossesse','Santé mentale','Seniors'];
  window.MACA_HOME_CATEGORY_PARAM='category';
  window.MACA_HOME_PUBLIC_CATEGORIES=PUBLIC.slice();
  function init(){
    if(document.body.classList.contains('library-page'))return;
    const box=document.querySelector('#category-filters');if(!box)return;
    box.addEventListener('click',e=>{
      const b=e.target.closest('.filter-chip');if(!b)return;
      const wanted=b.dataset.category||b.textContent.trim();
      if(wanted==='Toutes'||!PUBLIC.includes(wanted))return;
      e.preventDefault();e.stopImmediatePropagation();
      location.assign(`fiches.html?category=${encodeURIComponent(wanted)}#questions`);
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();