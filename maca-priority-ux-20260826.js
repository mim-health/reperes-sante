/* MACA Santé — 26/08 priority UX: mobile hierarchy, one featured block, section identity in opened cards. */
(function(){
 'use strict';
 const sectionMap={
  'Santé au quotidien':'daily','Cœur & prévention':'heart','Médicaments':'meds','Digestion & urinaire':'daily',
  'Santé des femmes & grossesse':'women','Enfants & parents':'children','Ados':'teens','Après 60 ans':'seniors','Seniors':'seniors','Santé mentale':'mental'
 };
 const tones={daily:['#d7e8df','#557060'],heart:['#e7a58b','#a24f3f'],meds:['#b8d6d8','#507d80'],women:['#dbc9dc','#816985'],children:['#efd38e','#94722f'],teens:['#bfc9df','#617092'],seniors:['#d5c5a6','#7c6b4f'],mental:['#c7d9c4','#60795d']};
 function applyModalIdentity(){
  const panel=document.querySelector('.modal-panel'),content=document.querySelector('#modal-content');if(!panel||!content)return;
  const label=content.querySelector('.pill')?.textContent?.trim(),key=sectionMap[label];
  if(!key)return;
  panel.dataset.section=key;const [tone,ink]=tones[key];panel.style.setProperty('--section-tone',tone);panel.style.setProperty('--section-ink',ink);
 }
 function consolidateFeatured(){
  const comprendre=document.querySelector('#comprendre'),verifier=document.querySelector('#verifier'),news=document.querySelector('.rail-news');
  if(comprendre)comprendre.hidden=true;if(verifier)verifier.hidden=true;
  if(news){news.setAttribute('aria-label','À la une et vrai ou faux');const h=news.querySelector('h2');if(h)h.textContent='À la une';}
 }
 function mobileOrder(){
  if(!matchMedia('(max-width:800px)').matches)return;
  const layout=document.querySelector('.magazine-layout'),main=document.querySelector('.main-feed'),rail=document.querySelector('.editorial-rail');
  const library=document.querySelector('.library-section'),number=document.querySelector('#chiffre-du-jour'),news=document.querySelector('.rail-news'),stats=document.querySelector('#prevenir');
  if(!layout||!main||!rail)return;
  /* Search hub is already before magazine-layout. Keep library available but place daily content first on mobile. */
  if(number)main.insertBefore(number,main.firstChild);
  if(news)main.insertBefore(news,number?number.nextSibling:main.firstChild);
  if(library)main.insertBefore(library,news?news.nextSibling:(number?number.nextSibling:main.firstChild));
  if(stats)main.appendChild(stats);
  rail.style.display='none';
 }
 function addStyle(){if(document.querySelector('#maca-priority-ux-style'))return;const s=document.createElement('style');s.id='maca-priority-ux-style';s.textContent=`
  .modal-panel[data-section]{position:relative;overflow:hidden;border-top:7px solid var(--section-tone)}
  .modal-panel[data-section]::after{content:'';position:absolute;right:-34px;top:-38px;width:120px;height:120px;border:1px solid color-mix(in srgb,var(--section-ink) 22%,transparent);border-radius:50%;pointer-events:none}
  .modal-panel[data-section] #modal-content>.pill{background:var(--section-tone);color:var(--section-ink);border:0}
  @media(max-width:800px){body:not(.library-page) .main-feed>.hero-card{order:1}body:not(.library-page) .main-feed>.rail-news{order:2;margin-top:24px}body:not(.library-page) .main-feed>.library-section{order:3}body:not(.library-page) .main-feed>.home-stats{order:4}.main-feed{display:flex;flex-direction:column}}
 `;document.head.appendChild(s);}
 function init(){addStyle();consolidateFeatured();mobileOrder();const c=document.querySelector('#modal-content');if(c)new MutationObserver(applyModalIdentity).observe(c,{childList:true,subtree:true});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 window.addEventListener('maca:v2-ui-ready',init);
})();