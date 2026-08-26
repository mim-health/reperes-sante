/* MACA Santé — Search V1 relevance layer. Library only; no chatbot. */
(function(){
'use strict';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const stop=new Set(['a','au','aux','avec','ce','ces','dans','de','des','du','en','est','et','faire','il','je','la','le','les','ma','mes','mon','ne','nous','on','ou','par','pas','pour','que','qui','sa','se','ses','son','sur','un','une','vous','votre','jai','cest','estce']);
const groups=[
 ['tension','hypertension','hta','pression arterielle'],
 ['sommeil','dormir','dors','dort','endormir','endormissement','insomnie'],
 ['sang selles','sang dans les selles','rectorragie','saignement digestif'],
 ['tete tourne','tete qui tourne','vertige','vertiges','malaise'],
 ['aphte','aphtes','ulcere bouche']
].map(g=>g.map(norm));
function tokens(s){return norm(s).split(' ').filter(x=>x.length>1&&!stop.has(x));}
function expanded(q){const base=tokens(q),out=new Set(base);groups.forEach(g=>{if(g.some(x=>base.some(t=>x.split(' ').includes(t))||norm(q).includes(x)))g.forEach(x=>tokens(x).forEach(t=>out.add(t)));});return {base,all:[...out]};}
function score(card,q){const title=norm(card.querySelector('h3')?.textContent),body=norm(card.querySelector('p')?.textContent),cat=norm(card.querySelector('.qa-category')?.textContent),query=norm(q),{base,all}=expanded(q);if(!base.length)return 1;let s=0,baseHits=0;if(title===query)s+=200;else if(title.includes(query))s+=120;base.forEach(t=>{if(title.split(' ').includes(t)||title.includes(t)){s+=35;baseHits++;}else if(cat.includes(t)){s+=5;baseHits++;}else if(body.includes(t)){s+=2;baseHits++;}});all.filter(t=>!base.includes(t)).forEach(t=>{if(title.includes(t))s+=24;else if(body.includes(t))s+=1;});if(base.length>1&&baseHits===base.length)s+=60;return s;}
function run(){const input=document.querySelector('#search-input'),grid=document.querySelector('#qa-grid'),empty=document.querySelector('#no-results');if(!input||!grid)return;const q=input.value.trim();if(!q)return;const cards=[...grid.querySelectorAll('.qa-card')];const ranked=cards.map((c,i)=>({c,i,s:score(c,q)})).filter(x=>x.s>=8).sort((a,b)=>b.s-a.s||a.i-b.i);cards.forEach(c=>c.style.display='none');ranked.forEach(x=>{x.c.style.display='';grid.appendChild(x.c);});if(empty){empty.hidden=ranked.length>0;empty.textContent=ranked.length?'':`Nous n’avons pas encore de fiche correspondant à « ${q} ». Essayez un autre mot-clé ou explorez les rubriques.`;}}
function init(){const input=document.querySelector('#search-input');if(!input)return;input.addEventListener('input',()=>setTimeout(run,0));input.addEventListener('search',()=>setTimeout(run,0));setTimeout(()=>{if(input.value)run();},50);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();