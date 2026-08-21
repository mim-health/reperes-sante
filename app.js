const articles = [
  {id:'pas',category:'VRAI OU FAUX',icon:'7k',title:'Faut-il vraiment faire 10 000 pas par jour ?',excerpt:'Non : 10 000 n’est pas un seuil magique. Une grande méta-analyse récente observe déjà des bénéfices importants autour de 7 000 pas par jour.',source:'The Lancet Public Health · méta-analyse · 2025',url:'https://doi.org/10.1016/S2468-2667(25)00164-1',body:'À NUANCER. Une revue systématique et méta-analyse publiée en 2025 a étudié les liens entre nombre de pas et plusieurs résultats de santé. Comparativement à 2 000 pas par jour, environ 7 000 pas étaient associés à des réductions importantes de plusieurs risques. Les auteurs précisent que 10 000 pas reste un objectif valable pour les personnes plus actives, mais que 7 000 peut constituer une cible plus réaliste. Il s’agit surtout d’associations issues d’études observationnelles : ce chiffre n’est donc ni une prescription individuelle ni une frontière biologique.'},
  {id:'hta',category:'LE CHIFFRE',icon:'22%',title:'Hypertension : combien d’adultes français se savent concernés ?',excerpt:'En 2024, 22 % des 18–79 ans déclarent avoir une hypertension. Et parmi ceux qui se déclarent hypertendus, un sur quatre rapporte ne pas avoir reçu de traitement antihypertenseur dans l’année.',source:'Santé publique France · Baromètre 2024 · publié en 2025',url:'https://www.santepubliquefrance.fr/hypertension-arterielle/donnees',body:'En 2024, 22 % des adultes de 18 à 79 ans déclarent avoir une hypertension artérielle. La fréquence augmente fortement avec l’âge : elle passe de 4,3 % chez les 18–29 ans à plus de la moitié chez les 70–79 ans. Attention : il s’agit ici d’hypertension déclarée. D’autres études reposant sur des mesures de pression artérielle montrent qu’une partie importante de l’HTA reste méconnue.'},
  {id:'sommeil',category:'DONNÉES',icon:'7h32',title:'Sommeil : combien dorment réellement les Français ?',excerpt:'Le Baromètre 2024 mesure 7 h 32 de sommeil moyen sur 24 heures chez les adultes de 18 à 79 ans.',source:'Santé publique France · Baromètre 2024 · publié en 2025',url:'https://www.santepubliquefrance.fr/sommeil/donnees',body:'En 2024, les adultes de 18 à 79 ans déclarent dormir en moyenne 7 h 32 sur 24 heures. Mais la moyenne masque de fortes différences : 21,5 % dorment 6 heures ou moins et environ un tiers rapporte une plainte d’insomnie. Les 50–59 ans ont le temps de sommeil moyen le plus court, à 7 h 16. Santé Juste préfère donc montrer la distribution et le contexte plutôt qu’un seul chiffre idéal.'},
  {id:'fibres',category:'NUTRITION',icon:'18g',title:'Fibres : les Français en mangent-ils assez ?',excerpt:'Les apports moyens sont d’environ 18 g par jour, nettement sous le repère de 30 g par jour chez l’adulte.',source:'Anses · Nutrition et cancers / repères alimentaires',url:'https://www.anses.fr/fr/content/nutrition-et-cancers-quelles-recommandations',body:'L’Anses indique des apports moyens en fibres d’environ 18 g par jour en France, alors que le repère chez l’adulte est de 30 g par jour. Les fruits et légumes, légumes secs et produits céréaliers complets ou peu raffinés contribuent à augmenter les apports. Le message utile n’est donc pas de chercher un aliment miracle, mais de diversifier les sources de fibres au quotidien.'},
  {id:'ecrans',category:'PARENTS',icon:'0–3',title:'Écrans avant 3 ans : que disent aujourd’hui les repères français ?',excerpt:'Le repère public est clair : avant 3 ans, pas d’écran, même en bruit de fond.',source:'Ministère de la Santé · repères intégrés au carnet de santé · 2025',url:'https://sante.gouv.fr/prevention-en-sante/sante-des-populations/enfants/exposition-aux-ecrans/article/enfants-et-ecrans-des-risques-sanitaires-reels-un-accompagnement-necessaire',body:'Les repères français intégrés au carnet de santé depuis 2025 recommandent avant 3 ans de ne pas exposer l’enfant aux écrans, même en bruit de fond. Entre 3 et 6 ans, l’usage doit rester exceptionnel, avec des contenus de qualité, accompagné par un adulte et sans remplacer le jeu, les interactions ou le sommeil. Dans les lieux d’accueil de la petite enfance, l’usage des écrans est désormais interdit pour les moins de 3 ans.'},
  {id:'sucres',category:'PARENTS · NUTRITION',icon:'60g',title:'Boissons sucrées chez l’enfant : pourquoi sont-elles particulièrement ciblées ?',excerpt:'L’Anses appelle à réduire les sucres chez les enfants et identifie les boissons sucrées comme un levier prioritaire.',source:'Anses · repères nutritionnels enfants',url:'https://www.anses.fr/fr/content/nutrition-des-enfants-des-personnes-agees-et-des-femmes-enceintes-ou-allaitantes-lanses',body:'L’Anses alerte sur les apports excessifs en sucres chez les enfants et cite les boissons sucrées parmi les leviers prioritaires de réduction. Elle recommande de privilégier l’eau et, pour les 4–7 ans, fixe à 60 g par jour le repère maximal de sucres totaux hors lactose et galactose. Ce repère ne signifie pas qu’une boisson contenant 60 g de sucre serait acceptable : il concerne l’ensemble de la journée et toutes les sources alimentaires.'}
];
const auditOverrides = new Map((window.auditedQuestionOverrides || []).map(item => [item.id, item]));
const baseQuestions = (window.healthQuestions || []).map(q => ({...q, ...(auditOverrides.get(q.id) || {})}));
const rawHealthQuestions = [...baseQuestions, ...(window.extraAuditedQuestions || [])];
function normalizeText(value=''){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
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
  if(/medicament|paracetamol|ibuprofene|antibiot/.test(text)) return 'Rx';
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
function renderCards(){if(!grid)return;grid.innerHTML=articles.map(a=>`<article class="card" data-id="${a.id}" tabindex="0"><div class="card-art">${a.icon}</div><span class="category">${a.category}</span><h3>${a.title}</h3><p>${a.excerpt}</p><small>${a.source}</small></article>`).join('');}
function openArticle(id){const a=articles.find(x=>x.id===id);if(!a)return;modalContent.innerHTML=`<span class="pill">${a.category}</span><h2>${a.title}</h2><p>${a.body}</p><div class="source-box"><strong>Source vérifiée</strong><br>${a.source}<br><a href="${a.url}" target="_blank" rel="noopener">Consulter la source originale →</a></div>`;openModal();}
function openQuestion(id){const q=healthQuestions.find(x=>x.id===id);if(!q)return;const evidenceMeta=(q.verifiedAt||q.evidenceStatus)?`<div class="evidence-meta">${q.evidenceStatus?`<span>${q.evidenceStatus}</span>`:''}${q.verifiedAt?`<span>Vérifié le ${q.verifiedAt}</span>`:''}</div>`:'';modalContent.innerHTML=`<span class="pill">${q.category}</span><h2>${q.title}</h2><div class="answer-block"><strong>Réponse courte</strong><p>${q.answer}</p></div>${q.watch?`<div class="watch-block"><strong>À surveiller</strong><p>${q.watch}</p></div>`:''}<div class="source-box"><strong>Sources</strong><br>${q.source}<br>${evidenceMeta}<a href="${q.url}" target="_blank" rel="noopener">Consulter la source →</a></div>`;openModal();}
function openModal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
function renderFilters(){const preferred=['Enfants & parents','Cœur & circulation','Digestion & ventre','Respiration & ORL','Santé au quotidien','Santé urinaire','Yeux & vision','Peau & dermatologie','Prévention & bien-être','Prévention','Médicaments','Santé des femmes','Après 60 ans','Santé mentale','Nutrition','Vrai / Faux'];const present=[...new Set(healthQuestions.map(q=>q.category))];const categories=['Toutes',...preferred.filter(c=>present.includes(c)),...present.filter(c=>!preferred.includes(c))];filters.innerHTML=categories.map(c=>`<button class="filter-chip ${c===activeCategory?'active':''}" data-category="${c}">${c}</button>`).join('');}
function filteredQuestions(){const term=normalizeText(searchInput?.value.trim()||'');return healthQuestions.filter(q=>{const categoryOk=activeCategory==='Toutes'||q.category===activeCategory;const haystack=normalizeText(`${q.title} ${q.keywords} ${q.category} ${q.answer}`);return categoryOk&&(!term||haystack.includes(term));});}
function renderQuestions(){if(!qaGrid)return;const items=filteredQuestions();qaGrid.innerHTML=items.map(q=>`<article class="qa-card" data-qid="${q.id}" tabindex="0"><div class="qa-icon" aria-hidden="true">${iconForQuestion(q)}</div><div><span class="qa-category">${q.category}</span><h3>${q.title}</h3><p>${q.answer}</p><small>${q.source}${q.verifiedAt?` · Vérifié le ${q.verifiedAt}`:''}</small></div><span class="qa-arrow" aria-hidden="true">→</span></article>`).join('');if(noResults)noResults.hidden=items.length!==0;if(clearSearch)clearSearch.hidden=!searchInput.value;}
renderCards();renderFilters();renderQuestions();
if(grid){grid.addEventListener('click',e=>{const c=e.target.closest('.card');if(c)openArticle(c.dataset.id)});grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('.card'))openArticle(e.target.closest('.card').dataset.id)});}
if(qaGrid){qaGrid.addEventListener('click',e=>{const c=e.target.closest('.qa-card');if(c)openQuestion(c.dataset.qid)});qaGrid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('.qa-card')){e.preventDefault();openQuestion(e.target.closest('.qa-card').dataset.qid)}});}
if(filters)filters.addEventListener('click',e=>{const b=e.target.closest('.filter-chip');if(!b)return;activeCategory=b.dataset.category;renderFilters();renderQuestions();});
if(searchInput)searchInput.addEventListener('input',renderQuestions);
if(clearSearch)clearSearch.addEventListener('click',()=>{searchInput.value='';searchInput.focus();renderQuestions();});
const pasLink=document.querySelector('[data-article="pas"]');if(pasLink)pasLink.addEventListener('click',()=>openArticle('pas'));
const closeButton=document.querySelector('.close');if(closeButton)closeButton.addEventListener('click',closeModal);
if(modal)modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const menuButton=document.querySelector('.menu');const mobileNav=document.querySelector('.site-header nav');if(menuButton&&mobileNav){menuButton.setAttribute('aria-expanded','false');menuButton.addEventListener('click',()=>{const isOpen=mobileNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen));menuButton.textContent=isOpen?'×':'☰';});mobileNav.addEventListener('click',e=>{if(e.target.closest('a')){mobileNav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}});}
