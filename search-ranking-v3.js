/* MACA Santé — deterministic Search V1 ranking. Library only. */
(function(){
'use strict';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const stop=new Set(['a','au','aux','avec','ce','ces','dans','de','des','du','en','est','et','faire','faut','il','je','la','le','les','ma','mes','mon','ne','nous','on','ou','par','pas','pour','que','qui','sa','se','ses','son','sur','un','une','vous','votre','jai','cest','estce','dois','doit','peut']);
const concepts={
 tension:['tension','hypertension','hta','pression','arterielle','cardiovasculaire'],
 sommeil:['sommeil','dormir','dors','dort','endormir','endormissement','insomnie','apnee'],
 'sang selles':['sang','selles','rectorragie','saignement','digestif','coloscopie'],
 'tete tourne':['vertige','vertiges','malaise','etourdissement','etourdissements'],
 aphte:['aphte','aphtes','ulcere','bouche']
};
const aliases=[[/\btete\s+(qui\s+)?tourne\b/,'tete tourne'],[/\bsang\s+(dans\s+les\s+)?selles\b/,'sang selles']];
function canonicalQuery(q){let n=norm(q);aliases.forEach(([re,to])=>{if(re.test(n))n=to;});return n;}
function toks(s){return norm(s).split(' ').filter(x=>x.length>1&&!stop.has(x));}
function conceptFor(q){const cq=canonicalQuery(q);if(concepts[cq])return concepts[cq];if(cq.includes('sommeil'))return concepts.sommeil;if(cq.includes('tension'))return concepts.tension;if(cq.includes('aphte'))return concepts.aphte;return [];}
function score(q,term){const cq=canonicalQuery(term),base=toks(cq),title=norm(q.title),keys=norm(q.keywords),ans=norm(q.answer),cat=norm(q.category);if(!base.length)return 1;let s=0,hits=0;if(title===cq)s+=1000;if(title.includes(cq))s+=500;base.forEach(t=>{let hit=false;if(title.includes(t)){s+=120;hit=true;}if(keys.includes(t)){s+=70;hit=true;}if(cat.includes(t)){s+=12;hit=true;}if(ans.includes(t)){s+=4;hit=true;}if(hit)hits++;});if(base.length>1&&hits===base.length)s+=300;conceptFor(cq).forEach(t=>{if(base.includes(t))return;if(title.includes(t))s+=45;else if(keys.includes(t))s+=25;else if(ans.includes(t))s+=1;});return s;}
function card(q){return `<article class="qa-card" data-qid="${q.id}" tabindex="0"><div class="qa-icon" aria-hidden="true">＋</div><div><span class="qa-category">${q.category||''}</span><h3>${q.title||''}</h3><p>${q.answer||''}</p><small>${q.source||''}${q.verifiedAt?` · Vérifié le ${q.verifiedAt}`:''}</small></div><span class="qa-arrow" aria-hidden="true">→</span></article>`;}
function render(){const input=document.querySelector('#search-input'),grid=document.querySelector('#qa-grid'),empty=document.querySelector('#no-results');if(!input||!grid||!Array.isArray(window.healthQuestions))return;const term=input.value.trim();if(!term)return;const ranked=window.healthQuestions.map((q,i)=>({q,i,s:score(q,term)})).filter(x=>x.s>=20).sort((a,b)=>b.s-a.s||a.i-b.i);grid.innerHTML=ranked.map(x=>card(x.q)).join('');if(empty){empty.hidden=ranked.length>0;empty.innerHTML=ranked.length?'':`<strong>MaCaSanté n’a pas encore de fiche répondant précisément à cette recherche.</strong><p>Essayez un autre mot-clé ou explorez les rubriques. Cette recherche pourra aussi aider à enrichir le corpus.</p>`;}}
function init(){const input=document.querySelector('#search-input');if(!input)return;input.addEventListener('input',e=>{e.stopImmediatePropagation();render();},true);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();e.stopImmediatePropagation();render();}},true);if(input.value)render();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();