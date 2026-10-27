/* MACA SEO enhancement — expose crawlable fiche links without changing the current card UX. */
(function(){
  'use strict';

  const grid=document.getElementById('qa-grid');
  if(!grid)return;

  function ensureStyle(){
    if(document.getElementById('maca-seo-fiche-link-style'))return;
    const style=document.createElement('style');
    style.id='maca-seo-fiche-link-style';
    style.textContent='.maca-seo-fiche-link{color:inherit;text-decoration:none}.maca-seo-fiche-link:focus-visible{outline:2px solid currentColor;outline-offset:3px;border-radius:3px}';
    document.head.appendChild(style);
  }

  function decorateCards(){
    grid.querySelectorAll('.qa-card[data-qid]').forEach(card=>{
      const h3=card.querySelector('h3');
      const id=String(card.dataset.qid||'').trim();
      if(!h3||!id||h3.querySelector('a.maca-seo-fiche-link'))return;
      if(h3.querySelector('a[href]')){const existing=h3.querySelector('a[href]');existing.classList.add('maca-seo-fiche-link');return;}

      const link=document.createElement('a');
      link.className='maca-seo-fiche-link';
      link.href=`fiches-seo/${encodeURIComponent(id)}.html`;
      while(h3.firstChild)link.appendChild(h3.firstChild);
      h3.appendChild(link);
    });
  }

  ensureStyle();
  decorateCards();

  // Native links must navigate even when legacy card handlers are still installed.
  grid.addEventListener('click',event=>{
    if(event.target.closest('a.maca-seo-fiche-link'))event.stopPropagation();
  },true);

  const observer=new MutationObserver(decorateCards);
  observer.observe(grid,{childList:true,subtree:true});
  window.addEventListener('maca:v2-ui-ready',decorateCards);
})();
