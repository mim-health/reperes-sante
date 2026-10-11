(function(){
'use strict';
const id=new URLSearchParams(location.search).get('id');
const root=document.getElementById('seo-fiche');if(!root||!id)return;
function render(){const body=root.querySelector('.maca-fv2-main');if(!body||body.querySelector('[data-mag-related]'))return;const all=[...(window.MACA_MAGAZINE_ARTICLES||[]),...(window.MACA_MAGAZINE_VIDEOS||[])];const linked=all.filter(c=>c.status==='PUBLISHED'&&c.referenceFicheId===id&&/^[a-z0-9-]+\.html$/.test(c.url));if(!linked.length)return;const section=document.createElement('section');section.className='maca-fv2-card';section.dataset.magRelated='true';const heading=document.createElement('h2');heading.textContent='Pour approfondir dans Le Mag';section.appendChild(heading);for(const c of linked){const p=document.createElement('p'),a=document.createElement('a');a.href=c.url;a.textContent=c.title+' · '+c.date.split('-').reverse().join('/');p.appendChild(a);section.appendChild(p);}body.appendChild(section);}
new MutationObserver(render).observe(root,{childList:true,subtree:true});render();
})();
