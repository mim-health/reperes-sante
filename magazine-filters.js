(function(){
 'use strict';
 const archive=document.querySelector('.magazine-archive'),cards=Array.from(archive.querySelectorAll('.magazine-article')),buttons=Array.from(document.querySelectorAll('[data-format-filter]'));
 const category=document.getElementById('magazine-category'),theme=document.getElementById('magazine-theme'),date=document.getElementById('magazine-date');
 let format='all';
 cards.sort((a,b)=>(b.dataset.date||'').localeCompare(a.dataset.date||'')).forEach(c=>archive.appendChild(c));
 function options(select,values,label){values.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=label?label(v):v;select.appendChild(o);});}
 options(theme,[...new Set(cards.map(x=>x.dataset.theme).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'fr')));
 options(date,[...new Set(cards.map(x=>x.dataset.date).filter(Boolean))].sort().reverse(),v=>new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(v+'T12:00:00Z')));
 function update(){let count=0;cards.forEach(c=>{c.hidden=!((format==='all'||c.dataset.format===format)&&(category.value==='all'||c.dataset.category===category.value)&&(theme.value==='all'||c.dataset.theme===theme.value)&&(date.value==='all'||c.dataset.date===date.value));if(!c.hidden)count++;});document.getElementById('magazine-count').textContent=count+' contenu'+(count>1?'s':'');document.getElementById('magazine-empty').hidden=count!==0;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.formatFilter===format)));}
 buttons.forEach(b=>b.addEventListener('click',()=>{format=b.dataset.formatFilter;update();}));
 [category,theme,date].forEach(x=>x.addEventListener('change',update));
 document.getElementById('magazine-reset').addEventListener('click',()=>{format='all';category.value=theme.value=date.value='all';update();});
 update();
})();

