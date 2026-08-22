// MACA daily editorial layer
// SINGLE SOURCE OF TRUTH: visible daily homepage content + destination.
// RULE: every daily homepage card opens the validated daily editorial page for that SAME item.
const DAILY_EDITORIAL = {
  date: '22/08/2026',
  articles: [
    {id:'daily-rougeole',category:'À LA UNE',icon:'112',title:'Rougeole : où en est-on en France cet été ?',excerpt:'Depuis janvier 2026 : 112 cas signalés, 40 hospitalisations et 17 complications. Parmi les cas documentés, 53 % n’étaient pas à jour de leur vaccination.',source:'Santé publique France · 2026',body:'La rougeole continue de circuler en France. Depuis janvier 2026, 112 cas ont été signalés, avec 40 hospitalisations et 17 complications. Parmi les cas dont le statut vaccinal était documenté, 53 % n’étaient pas à jour de leur vaccination.'},
    {id:'daily-sel',category:'VRAI OU FAUX',icon:'VRAI',title:'Le sel fait-il vraiment monter la tension ?',excerpt:'Vrai. Une consommation élevée de sel favorise l’augmentation de la pression artérielle.',source:'OMS · recommandations sur le sodium',body:'VRAI. Une consommation élevée de sel favorise l’augmentation de la pression artérielle. L’OMS recommande moins de 5 g de sel par jour chez l’adulte.'},
    {id:'daily-acouphenes',category:'LE CHIFFRE DU JOUR',icon:'1 sur 5',title:'Acouphènes : combien d’adultes sont concernés ?',excerpt:'Environ 1 adulte sur 5 est concerné par des acouphènes.',source:'Haute Autorité de Santé · 16 juillet 2026',body:'Environ un adulte sur cinq est concerné par des acouphènes. Chez certaines personnes, ces sons perçus sans source extérieure deviennent invalidants et peuvent perturber le sommeil, la concentration ou la vie sociale.'},
    {id:'daily-hta',category:'DONNÉES',icon:'22 %',title:'Hypertension : combien d’adultes français se savent concernés ?',excerpt:'En 2024, 22 % des 18–79 ans déclarent avoir une hypertension artérielle.',source:'Santé publique France · Baromètre 2024',body:'En 2024, 22 % des adultes de 18 à 79 ans déclarent avoir une hypertension artérielle.'},
    {id:'daily-sommeil',category:'DONNÉES',icon:'7 h 32',title:'Sommeil : combien dorment réellement les Français ?',excerpt:'Les adultes de 18 à 79 ans déclarent dormir en moyenne 7 h 32 sur 24 heures.',source:'Santé publique France · Baromètre 2024',body:'Les adultes de 18 à 79 ans déclarent dormir en moyenne 7 h 32 sur 24 heures.'},
    {id:'daily-courts-dormeurs',category:'DONNÉES',icon:'21,5 %',title:'Sommeil : quelle part des adultes sont de courts dormeurs ?',excerpt:'21,5 % des adultes sont des courts dormeurs.',source:'Santé publique France',body:'21,5 % des adultes sont considérés comme de courts dormeurs.'}
  ]
};
(function(){
  const byId=id=>DAILY_EDITORIAL.articles.find(x=>x.id===id);
  const dailyUrl=id=>`daily.html?id=${encodeURIComponent(id)}`;
  const goDaily=id=>{if(byId(id)) window.location.href=dailyUrl(id);};
  const makeClickable=(el,id)=>{if(!el)return;el.dataset.dailyPage=id;el.setAttribute('role','link');el.setAttribute('tabindex','0');el.setAttribute('aria-label','Lire la page validée : '+(byId(id)?.title||'contenu éditorial'));el.style.cursor='pointer';};
  const comprendre=document.querySelector('#comprendre'), rougeole=byId('daily-rougeole');
  if(comprendre&&rougeole){const eye=comprendre.querySelector('.eyebrow'),h=comprendre.querySelector('h3'),p=comprendre.querySelector('p:not(.eyebrow)');if(eye)eye.textContent='À LA UNE · 22/08';if(h)h.textContent=rougeole.title;if(p)p.textContent=rougeole.excerpt;makeClickable(comprendre,rougeole.id);}
  const verifier=document.querySelector('#verifier'), sel=byId('daily-sel');
  if(verifier&&sel){const h=verifier.querySelector('h2'),v=verifier.querySelector('.verdict span'),p=verifier.querySelector('.verdict p');if(h)h.textContent=sel.title;if(v)v.textContent='VRAI';if(p)p.textContent='Une consommation élevée de sel favorise l’augmentation de la pression artérielle. L’OMS recommande moins de 5 g de sel par jour chez l’adulte.';makeClickable(verifier,sel.id);}
  const chiffre=document.querySelector('#chiffre-du-jour'), ac=byId('daily-acouphenes');
  if(chiffre&&ac){const n=chiffre.querySelector('.big-number'),h=chiffre.querySelector('h2'),p=chiffre.querySelector('.hero-copy > p:not(.big-number)'),src=chiffre.querySelector('.source-line'),ring=chiffre.querySelector('.rings b'),small=chiffre.querySelector('.rings small');if(n)n.textContent='1 sur 5';if(h)h.textContent='adultes environ sont concernés par les acouphènes';if(p)p.textContent='Chez certaines personnes, ces sons perçus sans source extérieure deviennent invalidants et peuvent perturber le sommeil, la concentration ou la vie sociale.';if(src)src.innerHTML='<span>Source vérifiée</span> Haute Autorité de Santé · 16 juillet 2026';if(ring)ring.textContent='1/5';if(small)small.textContent='acouphènes';makeClickable(chiffre,ac.id);}
  const stats=['daily-hta','daily-sommeil','daily-courts-dormeurs'];
  document.querySelectorAll('#prevenir .stat-grid article').forEach((el,i)=>{const a=byId(stats[i]);if(!a)return;const strong=el.querySelector('strong'),p=el.querySelector('p'),small=el.querySelector('small');if(strong)strong.textContent=a.icon;if(p)p.textContent=a.excerpt;if(small)small.textContent=a.source;makeClickable(el,a.id);});
  const grid=document.querySelector('#article-grid');
  if(grid){grid.innerHTML=DAILY_EDITORIAL.articles.slice(0,3).map(a=>`<article class="card" data-daily-page="${a.id}" tabindex="0" role="link" aria-label="Lire la page validée : ${a.title}"><div class="card-art">${a.icon}</div><span class="category">${a.category}</span><h3>${a.title}</h3><p>${a.excerpt}</p><small>${a.source}</small></article>`).join('');}
  document.addEventListener('click',e=>{const target=e.target.closest('[data-daily-page]');if(!target)return;e.preventDefault();e.stopImmediatePropagation();goDaily(target.dataset.dailyPage);},true);
  document.addEventListener('keydown',e=>{const target=e.target.closest('[data-daily-page]');if(target&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.stopImmediatePropagation();goDaily(target.dataset.dailyPage);}},true);
})();
