// MACA Santé — rendu de l'éditorial quotidien.
// Les DONNÉES sont exclusivement dans maca-daily-editorial-data.js.
// Ce fichier ne contient aucun sujet quotidien en dur.
(function(){
  const data=window.MACA_DAILY_EDITORIAL;
  if(!data||!Array.isArray(data.articles)){console.error('MACA: données éditoriales quotidiennes absentes');return;}
  const byId=id=>data.articles.find(x=>x.id===id);
  const byCategory=category=>data.articles.find(x=>x.category===category);
  const dailyUrl=id=>`daily.html?id=${encodeURIComponent(id)}`;
  const goDaily=id=>{if(byId(id)) window.location.href=dailyUrl(id);};
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const makeClickable=(el,item)=>{if(!el||!item)return;el.dataset.dailyPage=item.id;el.setAttribute('role','link');el.setAttribute('tabindex','0');el.setAttribute('aria-label','Lire la page validée : '+item.title);el.style.cursor='pointer';};
  const visualMarkup=item=>item&&item.image?`<img class="daily-topic-image" src="${esc(item.image)}" alt="${esc(item.imageAlt)}" loading="lazy" decoding="async">`:`<div class="daily-topic-placeholder" role="img" aria-label="${esc(item&&item.imageAlt||'Illustration MACA en préparation')}"><span>MACA</span><small>illustration éditoriale</small></div>`;

  const headline=byCategory('À LA UNE');
  const comprendre=document.querySelector('#comprendre');
  if(comprendre&&headline){const eye=comprendre.querySelector('.eyebrow'),h=comprendre.querySelector('h3'),p=comprendre.querySelector('p:not(.eyebrow)'),art=comprendre.querySelector('.rail-icon');if(eye)eye.textContent=`À LA UNE · ${data.date.slice(0,5)}`;if(h)h.textContent=headline.title;if(p)p.textContent=headline.excerpt;if(art){art.classList.add('daily-topic-visual');art.innerHTML=visualMarkup(headline);art.style.backgroundImage='none';}makeClickable(comprendre,headline);}

  const fact=byCategory('VRAI OU FAUX');
  const verifier=document.querySelector('#verifier');
  if(verifier&&fact){const h=verifier.querySelector('h2'),v=verifier.querySelector('.verdict span'),p=verifier.querySelector('.verdict p');if(h)h.textContent=fact.title;if(v)v.textContent=fact.icon||'';if(p)p.textContent=fact.excerpt;makeClickable(verifier,fact);}

  const number=byCategory('LE CHIFFRE DU JOUR');
  const chiffre=document.querySelector('#chiffre-du-jour');
  if(chiffre&&number){const n=chiffre.querySelector('.big-number'),h=chiffre.querySelector('h2'),p=chiffre.querySelector('.hero-copy > p:not(.big-number)'),src=chiffre.querySelector('.source-line'),ring=chiffre.querySelector('.rings b'),small=chiffre.querySelector('.rings small');if(n)n.textContent=number.icon||'';if(h)h.textContent=number.title;if(p)p.textContent=number.excerpt;if(src)src.innerHTML=`<span>Source vérifiée</span> ${esc(number.source)}`;if(ring)ring.textContent=number.icon||'';if(small)small.textContent='chiffre du jour';makeClickable(chiffre,number);}

  const stats=data.articles.filter(x=>x.category==='DONNÉES');
  document.querySelectorAll('#prevenir .stat-grid article').forEach((el,i)=>{const item=stats[i];if(!item)return;const strong=el.querySelector('strong'),p=el.querySelector('p'),small=el.querySelector('small');if(strong)strong.textContent=item.icon||'';if(p)p.textContent=item.excerpt;if(small)small.textContent=item.source;makeClickable(el,item);});

  const grid=document.querySelector('#article-grid');
  const featured=[headline,fact,number].filter(Boolean);
  if(grid){grid.innerHTML=featured.map(item=>`<article class="card ${item.category==='À LA UNE'?'card-with-topic-visual':''}" data-daily-page="${esc(item.id)}" tabindex="0" role="link" aria-label="Lire la page validée : ${esc(item.title)}">${item.category==='À LA UNE'?`<div class="card-topic-visual">${visualMarkup(item)}</div>`:`<div class="card-art">${esc(item.icon)}</div>`}<span class="category">${esc(item.category)}</span><h3>${esc(item.title)}</h3><p>${esc(item.excerpt)}</p><small>${esc(item.source)}</small></article>`).join('');}

  document.addEventListener('click',e=>{const target=e.target.closest('[data-daily-page]');if(!target)return;e.preventDefault();e.stopImmediatePropagation();goDaily(target.dataset.dailyPage);},true);
  document.addEventListener('keydown',e=>{const target=e.target.closest('[data-daily-page]');if(target&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.stopImmediatePropagation();goDaily(target.dataset.dailyPage);}},true);
})();
