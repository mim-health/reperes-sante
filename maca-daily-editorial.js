// MACA daily editorial layer
// Single source of truth for the homepage daily rotation.
// Update ONLY DAILY_EDITORIAL for a new validated day; do not edit app.js/search engine.
const DAILY_EDITORIAL = {
  date: '22/08/2026',
  articles: [
    {id:'daily-rougeole',category:'À LA UNE',icon:'112',title:'Rougeole : où en est-on en France cet été ?',excerpt:'Depuis janvier 2026 : 112 cas signalés, 40 hospitalisations et 17 complications. Parmi les cas documentés, 53 % n’étaient pas à jour de leur vaccination.',source:'Santé publique France · 2026',body:'La rougeole continue de circuler en France. Depuis janvier 2026, 112 cas ont été signalés, avec 40 hospitalisations et 17 complications. Parmi les cas dont le statut vaccinal était documenté, 53 % n’étaient pas à jour de leur vaccination.'},
    {id:'daily-sel',category:'VRAI OU FAUX',icon:'VRAI',title:'Le sel fait-il vraiment monter la tension ?',excerpt:'Vrai. Une consommation élevée de sel favorise l’augmentation de la pression artérielle.',source:'OMS · recommandations sur le sodium',body:'VRAI. Une consommation élevée de sel favorise l’augmentation de la pression artérielle. L’OMS recommande moins de 5 g de sel par jour chez l’adulte.'},
    {id:'daily-sommeil',category:'LE CHIFFRE',icon:'7h32',title:'Sommeil : combien dorment réellement les Français ?',excerpt:'Le Baromètre 2024 mesure 7 h 32 de sommeil moyen sur 24 heures chez les adultes de 18 à 79 ans.',source:'Santé publique France · Baromètre 2024',body:'Les adultes de 18 à 79 ans déclarent dormir en moyenne 7 h 32 sur 24 heures.'},
    {id:'daily-hta',category:'DONNÉES',icon:'22%',title:'Hypertension : combien d’adultes français se savent concernés ?',excerpt:'En 2024, 22 % des 18–79 ans déclarent avoir une hypertension artérielle.',source:'Santé publique France · Baromètre 2024',body:'En 2024, 22 % des adultes de 18 à 79 ans déclarent avoir une hypertension artérielle.'},
    {id:'daily-courts-dormeurs',category:'DONNÉES',icon:'21,5%',title:'Sommeil : quelle part des adultes sont de courts dormeurs ?',excerpt:'21,5 % des adultes sont des courts dormeurs.',source:'Santé publique France',body:'21,5 % des adultes sont considérés comme de courts dormeurs.'}
  ]
};
(function(){
  const grid=document.querySelector('#article-grid');
  if(!grid)return;

  // The current homepage has no modal markup. Create it here so the daily layer
  // stays self-contained and every editorial card remains clickable after rotation.
  let modal=document.querySelector('#article-modal');
  if(!modal){
    modal=document.createElement('div');
    modal.id='article-modal';
    modal.className='modal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="daily-modal-title"><button class="close" type="button" aria-label="Fermer">×</button><div id="modal-content"></div></div>';
    document.body.appendChild(modal);
  }
  const content=modal.querySelector('#modal-content');
  const closeBtn=modal.querySelector('.close');
  const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
  closeBtn?.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});

  const render=()=>{grid.innerHTML=DAILY_EDITORIAL.articles.map(a=>`<article class="card" data-daily-id="${a.id}" tabindex="0" role="button" aria-label="Lire : ${a.title}"><div class="card-art">${a.icon}</div><span class="category">${a.category}</span><h3>${a.title}</h3><p>${a.excerpt}</p><small>${a.source}</small></article>`).join('');};
  const openDaily=(id)=>{
    const a=DAILY_EDITORIAL.articles.find(x=>x.id===id);
    if(!a||!content)return;
    content.innerHTML=`<span class="pill">${a.category}</span><h2 id="daily-modal-title">${a.title}</h2><p>${a.body}</p><div class="source-box"><strong>Source vérifiée</strong><br>${a.source}</div>`;
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';closeBtn?.focus();
  };
  render();
  grid.addEventListener('click',e=>{const c=e.target.closest('[data-daily-id]');if(c){e.preventDefault();e.stopImmediatePropagation();openDaily(c.dataset.dailyId);}},true);
  grid.addEventListener('keydown',e=>{const c=e.target.closest('[data-daily-id]');if(c&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.stopImmediatePropagation();openDaily(c.dataset.dailyId);}},true);
})();
