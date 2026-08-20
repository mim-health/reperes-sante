const articles = [
  {id:'barometre',category:'DONNÉES',icon:'34k',title:'Comment sait-on ce que les Français pensent de leur santé ?',excerpt:'Derrière les statistiques de santé se cachent de grandes enquêtes de population.',source:'Santé publique France · Baromètre 2024',body:'Le Baromètre de Santé publique France est une enquête nationale qui documente les comportements, connaissances et opinions de la population en matière de santé. L’édition 2024 a interrogé 34 940 personnes. Ce type de dispositif permet de suivre les évolutions dans le temps et d’éclairer les politiques de prévention.'},
  {id:'sommeil',category:'COMPRENDRE',icon:'7–9',title:'Sommeil : pourquoi un chiffre unique ne convient pas à tout le monde',excerpt:'Le besoin de sommeil évolue avec l’âge et varie aussi d’une personne à l’autre.',source:'Contenu de démonstration · source définitive à valider avant publication',body:'Les besoins de sommeil ne sont pas identiques pour tous. L’âge, le rythme de vie et l’état de santé comptent. Repères Santé distinguera toujours un repère général d’une recommandation individuelle et indiquera la source utilisée.'},
  {id:'pas',category:'VRAI OU FAUX',icon:'10k',title:'Faut-il vraiment atteindre 10 000 pas chaque jour ?',excerpt:'Un objectif devenu célèbre, mais qui ne constitue pas une frontière entre activité utile et inutile.',source:'Contenu de démonstration · revue de sources à finaliser',body:'Le chiffre de 10 000 pas est facile à mémoriser, mais il ne faut pas l’interpréter comme un seuil biologique. Les études observationnelles retrouvent des bénéfices à des niveaux inférieurs, avec une relation progressive entre activité et santé. La prochaine version citera directement la publication retenue.'}
];

const grid=document.querySelector('#article-grid');
const modal=document.querySelector('#article-modal');
const modalContent=document.querySelector('#modal-content');

function renderCards(){
  grid.innerHTML=articles.map(a=>`<article class="card" data-id="${a.id}" tabindex="0"><div class="card-art">${a.icon}</div><span class="category">${a.category}</span><h3>${a.title}</h3><p>${a.excerpt}</p><small>${a.source}</small></article>`).join('');
}
function openArticle(id){
  const a=articles.find(x=>x.id===id); if(!a)return;
  modalContent.innerHTML=`<span class="pill">${a.category}</span><h2>${a.title}</h2><p>${a.body}</p><div class="source-box"><strong>Source</strong><br>${a.source}</div>`;
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
renderCards();
grid.addEventListener('click',e=>{const c=e.target.closest('.card');if(c)openArticle(c.dataset.id)});
grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('.card'))openArticle(e.target.closest('.card').dataset.id)});
document.querySelector('[data-article="pas"]').addEventListener('click',()=>openArticle('pas'));
document.querySelector('.close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});