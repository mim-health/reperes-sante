const articles = [
  {id:'pas',category:'VRAI OU FAUX',icon:'7k',title:'Faut-il vraiment faire 10 000 pas par jour ?',excerpt:'Non : 10 000 n’est pas un seuil magique. Une grande méta-analyse récente observe déjà des bénéfices importants autour de 7 000 pas par jour.',source:'The Lancet Public Health · méta-analyse · 2025',url:'https://doi.org/10.1016/S2468-2667(25)00164-1',body:'À NUANCER. Une revue systématique et méta-analyse publiée en 2025 a étudié les liens entre nombre de pas et plusieurs résultats de santé. Comparativement à 2 000 pas par jour, environ 7 000 pas étaient associés à des réductions importantes de plusieurs risques.'},
  {id:'hta',category:'LE CHIFFRE',icon:'22%',title:'Hypertension : combien d’adultes français se savent concernés ?',excerpt:'En 2024, 22 % des 18–79 ans déclarent avoir une hypertension.',source:'Santé publique France · Baromètre 2024 · publié en 2025',url:'https://www.santepubliquefrance.fr/hypertension-arterielle/donnees',body:'En 2024, 22 % des adultes de 18 à 79 ans déclarent avoir une hypertension artérielle.'},
  {id:'sommeil',category:'DONNÉES',icon:'7h32',title:'Sommeil : combien dorment réellement les Français ?',excerpt:'Le Baromètre 2024 mesure 7 h 32 de sommeil moyen sur 24 heures chez les adultes de 18 à 79 ans.',source:'Santé publique France · Baromètre 2024 · publié en 2025',url:'https://www.santepubliquefrance.fr/sommeil/donnees',body:'En 2024, les adultes de 18 à 79 ans déclarent dormir en moyenne 7 h 32 sur 24 heures.'},
  {id:'fibres',category:'NUTRITION',icon:'18g',title:'Fibres : les Français en mangent-ils assez ?',excerpt:'Les apports moyens sont d’environ 18 g par jour, nettement sous le repère de 30 g par jour chez l’adulte.',source:'Anses · repères alimentaires',url:'https://www.anses.fr/',body:'Les apports moyens en fibres sont insuffisants chez beaucoup d’adultes.'},
  {id:'ecrans',category:'PARENTS',icon:'0–3',title:'Écrans avant 3 ans : que disent aujourd’hui les repères français ?',excerpt:'Le repère public est clair : avant 3 ans, pas d’écran, même en bruit de fond.',source:'Ministère de la Santé · 2025',url:'https://sante.gouv.fr/',body:'Les repères français recommandent avant 3 ans de ne pas exposer l’enfant aux écrans.'},
  {id:'sucres',category:'PARENTS · NUTRITION',icon:'60g',title:'Boissons sucrées chez l’enfant : pourquoi sont-elles particulièrement ciblées ?',excerpt:'L’Anses appelle à réduire les sucres chez les enfants.',source:'Anses · repères nutritionnels enfants',url:'https://www.anses.fr/',body:'Les boissons sucrées font partie des leviers prioritaires de réduction des sucres.'}
];

const auditOverrides = new Map((window.auditedQuestionOverrides || []).map(item => [item.id, item]));
const baseQuestions = (window.healthQuestions || []).map(q => ({...q, ...(auditOverrides.get(q.id) || {})}));
const rawHealthQuestions = [...baseQuestions, ...(window.extraAuditedQuestions || [])];

function normalizeText(value=''){
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}
function clean(value=''){
  return normalizeText(value).replace(/[^a-z0-9%+\s-]/g,' ').replace(/\s+/g,' ').trim();
}
function publicCategory(q){
  const text=normalizeText(`${q.id} ${q.title} ${q.keywords||''}`);
  if(q.category!=='Symptômes') return q.category;
  if(/palpitation|tension|hypertension|jambe|mollet|phleb|thromb|varice|veine|circulation|oedeme/.test(text)) return 'Cœur & circulation';
  if(/reflux|rgo|estomac|ventre|abdomin|diarrh|constip|digest|vom/.test(text)) return 'Digestion & ventre';
  if(/toux|respir|essouff|gorge|nez|rhume|oreille|orl/.test(text)) return 'Respiration & ORL';
  if(/urine|urinaire|cystite|brulure urin/.test(text)) return 'Santé urinaire';
  if(/oeil|oculaire|conjonctiv|vision/.test(text)) return 'Yeux & vision';
  if(/peau|dermat|tique|bouton|demange|prurit|rash/.test(text)) return 'Peau & dermatologie';
  return 'Santé au quotidien';
}
function iconForQuestion(q){
  const text=normalizeText(`${q.id} ${q.title} ${q.keywords||''} ${q.category||''}`);
  if(/course|running|marche|sport|activite physique/.test(text)) return '🏃';
  if(/coeur|tension|hypertension|circulation|veine|thromb|palpitation/.test(text)) return '♡';
  if(/sommeil|dorm|insom/.test(text)) return '☾';
  if(/urine|cystite|urinaire/.test(text)) return '◇';
  if(/tique|peau|dermat|bouton|rash/.test(text)) return '✦';
  if(/medicament|paracetamol|ibuprofene|antibiot/.test(text)) return '💊';
  if(/enfant|bebe|nourrisson|parent/.test(text)) return '◡';
  if(/nutrition|aliment|fibre|sucre|hydrat/.test(text)) return '◌';
  if(/respir|toux|orl|gorge|nez/.test(text)) return '≈';
  return '＋';
}

const healthQuestions = rawHealthQuestions.map(q=>({...q,category:publicCategory(q)}));
const grid=document.querySelector('#article-grid');
const qaGrid=document.querySelector('#qa-grid');
const modal=document.querySelector('#article-modal');
const modalContent=document.querySelector('#modal-content');
const searchInput=document.querySelector('#search-input');
const clearSearch=document.querySelector('#clear-search');
const filters=document.querySelector('#category-filters');
const noResults=document.querySelector('#no-results');
let activeCategory='Toutes';

const STOPWORDS = new Set(['a','ai','au','aux','avec','ce','ces','dans','de','des','du','elle','en','est','et','fait','faire','faut','il','je','la','le','les','ma','mais','me','mes','mon','ne','nous','on','ou','par','pas','pour','que','quel','quelle','qui','sa','se','ses','son','sur','un','une','vous','votre','depuis','quand','comment','pourquoi','peut','peux','dois','doit','jai','cest']);
const SYNONYMS = {
  ventre:['abdominal','abdomen','digestif','digestion','estomac'], mal:['douleur','douloureux'],
  coeur:['cardiaque','palpitation','palpitations'], tension:['hypertension','pression','arterielle'],
  bouton:['boutons','eruption','rash','peau'], demange:['demangeaison','prurit','peau'],
  toux:['tousser','respiratoire','respiration'], rhume:['nez','nasal','orl'], gorge:['angine','orl'],
  pipi:['urine','urinaire','cystite'], urine:['urinaire','cystite','brulure'], brule:['brulure','brulures'],
  dormir:['sommeil','insomnie'], dort:['sommeil','insomnie'], fatigue:['fatiguee','epuisement'],
  bebe:['nourrisson','enfant'], enfant:['bebe','nourrisson','pediatrie'],
  sport:['activite','physique','course','running','marche'], courir:['course','running','sport'],
  medicament:['traitement','paracetamol','ibuprofene'], doliprane:['paracetamol'], advil:['ibuprofene'],
  tique:['lyme','peau'], diarrhee:['selles','liquides','digestif'], constipation:['selles','transit','digestif'],
  vomit:['vomissement','vomissements','digestif'], essouffle:['essoufflement','respiration','respiratoire'],
  migraine:['tete','cephalee'], tete:['cephalee','migraine']
};
function stem(word){
  if(word.length<5) return word;
  return word.replace(/(ements|ement|ations|ation|iques|ique|istes|iste)$/,'').replace(/(es|s)$/,'');
}
function queryTokens(value){
  const base=clean(value).split(' ').filter(w=>w.length>1&&!STOPWORDS.has(w));
  const expanded=new Set();
  base.forEach(w=>{expanded.add(w);expanded.add(stem(w));(SYNONYMS[w]||[]).forEach(s=>{expanded.add(s);expanded.add(stem(s));});});
  return [...expanded].filter(Boolean);
}
function scoreQuestion(q,term){
  const original=clean(term); if(!original) return 1;
  const title=clean(q.title||''), keywords=clean(q.keywords||''), category=clean(q.category||''), answer=clean(q.answer||'');
  const all=`${title} ${keywords} ${category} ${answer}`;
  let score=0;
  if(title.includes(original)) score+=20;
  if(keywords.includes(original)) score+=14;
  queryTokens(term).forEach(t=>{
    const s=stem(t);
    if(title.includes(t)||title.includes(s)) score+=7;
    if(keywords.includes(t)||keywords.includes(s)) score+=6;
    if(category.includes(t)||category.includes(s)) score+=3;
    if(answer.includes(t)||answer.includes(s)) score+=1;
  });
  const base=clean(term).split(' ').filter(w=>w.length>2&&!STOPWORDS.has(w));
  const matches=base.filter(w=>all.includes(w)||all.includes(stem(w))).length;
  if(matches>=2) score+=matches*4;
  return score;
}

function renderCards(){if(!grid)return;grid.innerHTML=articles.map(a=>`<article class="card" data-id="${a.id}" tabindex="0"><div class="card-art">${a.icon}</div><span class="category">${a.category}</span><h3>${a.title}</h3><p>${a.excerpt}</p><small>${a.source}</small></article>`).join('');}
function openArticle(id){const a=articles.find(x=>x.id===id);if(!a||!modalContent)return;modalContent.innerHTML=`<span class="pill">${a.category}</span><h2>${a.title}</h2><p>${a.body}</p><div class="source-box"><strong>Source vérifiée</strong><br>${a.source}<br><a href="${a.url}" target="_blank" rel="noopener">Consulter la source originale →</a></div>`;openModal();}
function openQuestion(id){const q=healthQuestions.find(x=>x.id===id);if(!q||!modalContent)return;const evidenceMeta=(q.verifiedAt||q.evidenceStatus)?`<div class="evidence-meta">${q.evidenceStatus?`<span>${q.evidenceStatus}</span>`:''}${q.verifiedAt?`<span>Vérifié le ${q.verifiedAt}</span>`:''}</div>`:'';modalContent.innerHTML=`<span class="pill">${q.category}</span><h2>${q.title}</h2><div class="answer-block"><strong>Réponse courte</strong><p>${q.answer||''}</p></div>${q.watch?`<div class="watch-block"><strong>À surveiller</strong><p>${q.watch}</p></div>`:''}<div class="source-box"><strong>Sources</strong><br>${q.source||''}<br>${evidenceMeta}<a href="${q.url||'#'}" target="_blank" rel="noopener">Consulter la source →</a></div>`;openModal();}
function openModal(){if(!modal)return;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeModal(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}

function renderFilters(){
  if(!filters)return;
  const preferred=['Enfants & parents','Cœur & circulation','Digestion & ventre','Respiration & ORL','Santé au quotidien','Santé urinaire','Yeux & vision','Peau & dermatologie','Prévention & bien-être','Prévention','Médicaments','Santé des femmes','Après 60 ans','Santé mentale','Nutrition','Vrai / Faux'];
  const present=[...new Set(healthQuestions.map(q=>q.category).filter(Boolean))];
  const categories=['Toutes',...preferred.filter(c=>present.includes(c)),...present.filter(c=>!preferred.includes(c))];
  filters.innerHTML=categories.map(c=>`<button type="button" class="filter-chip ${c===activeCategory?'active':''}" data-category="${c}">${c}</button>`).join('');
}
function filteredQuestions(){
  const term=searchInput?.value.trim()||'';
  const categoryItems=healthQuestions.filter(q=>activeCategory==='Toutes'||q.category===activeCategory);
  if(!term) return categoryItems;
  return categoryItems.map(q=>({q,score:scoreQuestion(q,term)})).filter(x=>x.score>=3).sort((a,b)=>b.score-a.score).map(x=>x.q);
}
function renderQuestions(){
  if(!qaGrid)return;
  const items=filteredQuestions();
  qaGrid.innerHTML=items.map(q=>`<article class="qa-card" data-qid="${q.id}" tabindex="0"><div class="qa-icon" aria-hidden="true">${iconForQuestion(q)}</div><div><span class="qa-category">${q.category}</span><h3>${q.title}</h3><p>${q.answer||''}</p><small>${q.source||''}${q.verifiedAt?` · Vérifié le ${q.verifiedAt}`:''}</small></div><span class="qa-arrow" aria-hidden="true">→</span></article>`).join('');
  if(noResults){
    noResults.hidden=items.length!==0;
    if(items.length===0) noResults.innerHTML='<strong>MACA n’a pas encore trouvé de réponse proche.</strong><p>Essayez un mot plus simple ou un synonyme.</p>';
  }
  if(clearSearch)clearSearch.hidden=!searchInput?.value;
}
function runSearch(){
  activeCategory='Toutes';
  renderFilters();
  renderQuestions();
  const library=document.querySelector('.library-section');
  if(library) library.scrollIntoView({behavior:'smooth',block:'start'});
}

renderCards();renderFilters();renderQuestions();

if(grid){grid.addEventListener('click',e=>{const c=e.target.closest('.card');if(c)openArticle(c.dataset.id)});}
if(qaGrid){qaGrid.addEventListener('click',e=>{const c=e.target.closest('.qa-card');if(c)openQuestion(c.dataset.qid)});}
if(filters)filters.addEventListener('click',e=>{const b=e.target.closest('.filter-chip');if(!b)return;activeCategory=b.dataset.category||'Toutes';if(searchInput)searchInput.value='';renderFilters();renderQuestions();document.querySelector('.library-section')?.scrollIntoView({behavior:'smooth',block:'start'});});
if(searchInput){
  searchInput.addEventListener('input',runSearch);
  searchInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();runSearch();}});
}
if(clearSearch)clearSearch.addEventListener('click',()=>{searchInput.value='';activeCategory='Toutes';renderFilters();renderQuestions();searchInput.focus();});
const searchNav=document.querySelector('.site-header nav a[href="#questions"]');
if(searchNav)searchNav.addEventListener('click',()=>setTimeout(()=>{searchInput?.focus();document.querySelector('#questions')?.scrollIntoView({behavior:'smooth',block:'start'});},0));
const pasLink=document.querySelector('[data-article="pas"]');if(pasLink)pasLink.addEventListener('click',()=>openArticle('pas'));
const closeButton=document.querySelector('.close');if(closeButton)closeButton.addEventListener('click',closeModal);
if(modal)modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
