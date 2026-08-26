// MACA Santé — visual identity only. Does not alter corpus taxonomy or routing.
(function(){
 const sectionMap={
  'Santé au quotidien':'daily',
  'Cœur & prévention':'heart',
  'Médicaments':'meds',
  'Digestion & urinaire':'daily',
  'Santé des femmes & grossesse':'women',
  'Enfants & parents':'children',
  'Ados':'teens',
  'Après 60 ans':'seniors',
  'Seniors':'seniors',
  'Santé mentale':'mental'
 };
 const tones={
  daily:['#d7e8df','#557060'],heart:['#e7a58b','#a24f3f'],meds:['#b8d6d8','#507d80'],women:['#dbc9dc','#816985'],children:['#efd38e','#94722f'],teens:['#bfc9df','#617092'],seniors:['#d5c5a6','#7c6b4f'],mental:['#c7d9c4','#60795d']
 };
 function applyCards(){
  document.querySelectorAll('.qa-card').forEach(card=>{
   const label=card.querySelector('.qa-category')?.textContent?.trim();
   if(sectionMap[label]) card.dataset.section=sectionMap[label];
  });
 }
 function applyOpenedCard(){
  const panel=document.querySelector('.modal-panel'),content=document.querySelector('#modal-content');
  if(!panel||!content)return;
  const label=content.querySelector('.pill')?.textContent?.trim();
  const key=sectionMap[label];
  if(!key||!tones[key])return;
  const [tone,ink]=tones[key];
  panel.dataset.section=key;
  panel.style.setProperty('--maca-section-tone',tone);
  panel.style.setProperty('--maca-section-ink',ink);
 }
 function ensureStyle(){
  if(document.querySelector('#maca-open-card-section-style'))return;
  const style=document.createElement('style');
  style.id='maca-open-card-section-style';
  style.textContent='.modal-panel[data-section]{border-top:7px solid var(--maca-section-tone);position:relative}.modal-panel[data-section] #modal-content>.pill{background:var(--maca-section-tone);color:var(--maca-section-ink);border:0}';
  document.head.appendChild(style);
 }
 function apply(){ensureStyle();applyCards();applyOpenedCard();}
 apply();
 const grid=document.querySelector('#qa-grid');
 if(grid)new MutationObserver(applyCards).observe(grid,{childList:true,subtree:true});
 const modalContent=document.querySelector('#modal-content');
 if(modalContent)new MutationObserver(applyOpenedCard).observe(modalContent,{childList:true,subtree:true});
 window.addEventListener('maca:v2-ui-ready',apply);
})();