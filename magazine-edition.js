(function(){
 'use strict';
 const data=window.MACA_DAILY_EDITORIAL;if(!data||!Array.isArray(data.articles))return;
 const registry=window.MACA_MAGAZINE_ARTICLES||[];
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const complete=x=>registry.find(a=>a.id===x.id&&a.url===x.articleUrl&&a.status==='PUBLISHED');
 function card(x,feature=false){const url=x.articleUrl||x.url;return `<article class="magazine-article ${feature?'mag-feature':''}">${x.image?`<a href="${esc(url)}"><img src="${esc(x.image)}" alt="${esc(x.imageAlt)}" ${feature?'':'loading="lazy"'}></a>`:''}<div class="magazine-article-copy"><p class="eyebrow">${esc(x.icon||x.category||'LE MAG')}</p><h3><a href="${esc(url)}">${esc(x.title)}</a></h3><p>${esc(x.excerpt)}</p><a class="magazine-read" href="${esc(url)}">${x.format==='video'?'Voir la vidéo':'Lire le décryptage'} →</a></div></article>`;}
 const headline=data.articles.find(x=>x.category==='À LA UNE'&&complete(x)),reads=data.articles.filter(x=>x.category==='À LIRE EN 3 MIN'&&complete(x)).slice(0,3),fact=data.articles.find(x=>x.category==='VRAI OU FAUX'&&complete(x));
 document.getElementById('mag-current-heading').textContent='À la une · édition du '+data.date;
 if(headline)document.getElementById('mag-headline').innerHTML=card(headline,true);else document.getElementById('mag-current').hidden=true;
 document.getElementById('mag-read-grid').innerHTML=reads.map(x=>card(x)).join('');if(!reads.length)document.getElementById('mag-reads').hidden=true;
 if(fact)document.getElementById('mag-fact-card').innerHTML=`<article class="mag-fact"><p class="eyebrow">VRAI / FAUX · ÉDITION DU ${esc(data.date)}</p><h3><a href="${esc(fact.articleUrl)}">${esc(fact.title)}</a></h3><p>${esc(fact.excerpt)}</p><a class="magazine-read" href="${esc(fact.articleUrl)}">Comprendre la réponse →</a></article>`;else document.getElementById('mag-fact').hidden=true;
 const videos=(window.MACA_MAGAZINE_VIDEOS||[]).filter(x=>x.status==='PUBLISHED'&&x.id.startsWith('max-')).sort((a,b)=>b.date.localeCompare(a.date));
 document.getElementById('max-grid').innerHTML=videos.map(x=>card(x)).join('');if(!videos.length)document.getElementById('max-library').hidden=true;
})();
