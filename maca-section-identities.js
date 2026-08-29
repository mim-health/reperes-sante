// MACA Santé — visual identity only. Does not alter corpus taxonomy or routing.
(function(){
 const sectionMap={
  'Santé au quotidien':'daily','Cœur & prévention':'heart','Médicaments':'meds','Digestion & urinaire':'digestion','Santé des femmes & grossesse':'women','Enfants & parents':'children','Ados':'teens','Après 60 ans':'seniors','Seniors':'seniors','Santé mentale':'mental','Cancer':'cancer'
 };
 const identities={
  daily:{tone:'#d7e8df',ink:'#557060',soft:'#eef6f1',mark:'✦'},
  heart:{tone:'#e7a58b',ink:'#a24f3f',soft:'#fbefea',mark:'♡'},
  meds:{tone:'#b8d6d8',ink:'#507d80',soft:'#eaf5f5',mark:'+'},
  digestion:{tone:'#e7d7a8',ink:'#796b3e',soft:'#faf5e6',mark:'◌'},
  women:{tone:'#dbc9dc',ink:'#816985',soft:'#f5edf5',mark:'◇'},
  children:{tone:'#efd38e',ink:'#94722f',soft:'#fcf5df',mark:'◡'},
  teens:{tone:'#bfc9df',ink:'#617092',soft:'#eef1f8',mark:'↗'},
  seniors:{tone:'#d5c5a6',ink:'#7c6b4f',soft:'#f5f0e6',mark:'∞'},
  mental:{tone:'#c7d9c4',ink:'#60795d',soft:'#eef5ec',mark:'≈'},
  cancer:{tone:'#d8d3e3',ink:'#655d78',soft:'#f2f0f7',mark:'◎'}
 };
 function decorateCard(card){
  const label=card.querySelector('.qa-category')?.textContent?.trim();const key=sectionMap[label],id=identities[key];if(!key||!id)return;
  card.dataset.section=key;card.style.setProperty('--maca-section-tone',id.tone);card.style.setProperty('--maca-section-ink',id.ink);card.style.setProperty('--maca-section-soft',id.soft);card.style.setProperty('--maca-section-mark',id.mark);
 }
 function applyCards(){document.querySelectorAll('.qa-card').forEach(decorateCard);}
 function applyFilters(){document.querySelectorAll('#category-filters .filter-chip').forEach(chip=>{const key=sectionMap[chip.dataset.category||chip.textContent.trim()],id=identities[key];if(!id)return;chip.style.setProperty('--maca-chip-tone',id.tone);chip.style.setProperty('--maca-chip-ink',id.ink);});}
 function applyOpenedCard(){const panel=document.querySelector('.modal-panel'),content=document.querySelector('#modal-content');if(!panel||!content)return;const label=content.querySelector('.pill')?.textContent?.trim(),key=sectionMap[label],id=identities[key];if(!id)return;panel.dataset.section=key;panel.style.setProperty('--maca-section-tone',id.tone);panel.style.setProperty('--maca-section-ink',id.ink);panel.style.setProperty('--maca-section-soft',id.soft);panel.style.setProperty('--maca-section-mark',id.mark);}
 function ensureStyle(){if(document.querySelector('#maca-section-magazine-style'))return;const style=document.createElement('style');style.id='maca-section-magazine-style';style.textContent=`
 .qa-card[data-section]{border-top:5px solid var(--maca-section-tone)!important;background:linear-gradient(145deg,#fffdf8 0%,var(--maca-section-soft) 145%)!important;position:relative}
 .qa-card[data-section]::after{content:var(--maca-section-mark);position:absolute;right:17px;top:14px;width:38px;height:38px;display:grid;place-items:center;border-radius:50%;background:var(--maca-section-soft);color:var(--maca-section-ink);font-size:21px;font-weight:700;border:1px solid var(--maca-section-tone);opacity:.88}
 .qa-card[data-section] .qa-category{color:var(--maca-section-ink)!important;padding-right:42px}.qa-card[data-section] .qa-arrow{color:var(--maca-section-ink)!important}
 #category-filters .filter-chip[style*="--maca-chip-tone"]{border-bottom:3px solid var(--maca-chip-tone)!important}#category-filters .filter-chip[style*="--maca-chip-tone"].active{background:var(--maca-chip-ink)!important;border-color:var(--maca-chip-ink)!important;color:#fff!important}
 .modal-panel[data-section]{border-top:8px solid var(--maca-section-tone);position:relative;background:linear-gradient(180deg,#fffdf8 0%,var(--maca-section-soft) 160%)}.modal-panel[data-section]::before{content:var(--maca-section-mark);position:absolute;right:66px;top:24px;width:42px;height:42px;display:grid;place-items:center;border-radius:50%;background:var(--maca-section-soft);color:var(--maca-section-ink);border:1px solid var(--maca-section-tone);font-size:22px}.modal-panel[data-section] #modal-content>.pill{background:var(--maca-section-tone);color:var(--maca-section-ink);border:0}
 @media(max-width:800px){.qa-card[data-section]::after{right:13px;top:12px;width:34px;height:34px;font-size:18px}.modal-panel[data-section]::before{right:58px;top:19px;width:36px;height:36px;font-size:19px}}
 `;document.head.appendChild(style);}
 function apply(){ensureStyle();applyCards();applyFilters();applyOpenedCard();}
 apply();
 const grid=document.querySelector('#qa-grid');if(grid)new MutationObserver(applyCards).observe(grid,{childList:true,subtree:true});
 const filters=document.querySelector('#category-filters');if(filters)new MutationObserver(applyFilters).observe(filters,{childList:true,subtree:true});
 const modalContent=document.querySelector('#modal-content');if(modalContent)new MutationObserver(applyOpenedCard).observe(modalContent,{childList:true,subtree:true});
 window.addEventListener('maca:v2-ui-ready',apply);
})();