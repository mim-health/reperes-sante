/* Homepage presentation and handoff to the existing closed-corpus Assistant. */
(function(){
'use strict';
const root=document.body;if(!root.classList.contains('maca-home-assistant'))return;
const sidebar=document.getElementById('home-sidebar'),toggle=document.querySelector('.home-menu-toggle'),backdrop=document.querySelector('.home-menu-backdrop'),close=document.querySelector('.home-menu-close');
let previousFocus=null;
function setMenu(open){sidebar.dataset.open=String(open);toggle.setAttribute('aria-expanded',String(open));backdrop.hidden=!open;root.classList.toggle('home-menu-open',open);if(open){previousFocus=document.activeElement;close.focus();}else if(previousFocus){previousFocus.focus();previousFocus=null;}}
toggle.addEventListener('click',()=>setMenu(sidebar.dataset.open!=='true'));close.addEventListener('click',()=>setMenu(false));backdrop.addEventListener('click',()=>setMenu(false));
sidebar.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});
document.addEventListener('keydown',e=>{if(sidebar.dataset.open!=='true')return;if(e.key==='Escape'){e.preventDefault();setMenu(false);}if(e.key==='Tab'){const nodes=[...sidebar.querySelectorAll('a,button')].filter(n=>n.getClientRects().length);const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
const form=document.getElementById('home-question-form'),input=document.getElementById('home-question'),send=document.getElementById('home-question-send'),status=document.getElementById('home-assistant-status');
let busy=false;
function ready(){send.disabled=false;status.textContent='';}
function unavailable(){send.disabled=true;status.replaceChildren(document.createTextNode('Assistant momentanément indisponible. '));const a=document.createElement('a');a.href='fiches.html';a.textContent='Consulter les fiches santé';status.append(a);}
window.addEventListener('maca:assistant-ready',ready);window.addEventListener('maca:assistant-unavailable',unavailable);if(window.MACA_ASSISTANT_V2)ready();
setTimeout(()=>{if(!window.MACA_ASSISTANT_V2)unavailable();},20000);
async function submit(){if(busy)return;if(!input.reportValidity())return;if(!window.MACA_ASSISTANT_V2){unavailable();return;}busy=true;send.disabled=true;form.setAttribute('aria-busy','true');try{await window.MACA_ASSISTANT_V2.ask(input.value);document.getElementById('home-assistant-results').scrollIntoView({block:'nearest',behavior:'auto'});}finally{busy=false;send.disabled=false;form.removeAttribute('aria-busy');}}
form.addEventListener('submit',e=>{e.preventDefault();submit();});input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();submit();}});
document.querySelectorAll('[data-home-question]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.homeQuestion;input.focus();}));
document.querySelector('.home-new-question').addEventListener('click',()=>{input.value='';const panel=document.getElementById('maca-v2-panel');if(panel)panel.dataset.open='false';input.focus();});
// The existing daily data file remains the single source; only presentation changes.
const data=window.MACA_DAILY_EDITORIAL,archive=window.MACA_MAGAZINE_ARTICLES||[];
if(data&&Array.isArray(data.articles)){
 const daily=data.articles.find(a=>a.category==='FICHE DU JOUR'&&/^[a-z0-9-]+$/.test(a.corpusId||''));
 const headline=data.articles.find(a=>a.category==='À LA UNE'&&archive.some(p=>p.id===a.id&&p.status==='PUBLISHED'&&p.url===a.articleUrl));
 const item=daily||headline;if(item){const href=daily?'fiche.html?id='+encodeURIComponent(item.corpusId):item.articleUrl;
 document.getElementById('home-daily-link').textContent=item.title;document.getElementById('home-daily-excerpt').textContent=item.excerpt;
 document.querySelectorAll('#home-daily-link,#home-daily-cta,.home-daily-image-link').forEach(a=>a.href=href);
 document.getElementById('home-daily-label').textContent=daily?'La fiche du jour':'À la une · Le Mag';
 document.getElementById('home-daily-cta').textContent=daily?'Lire la fiche →':'Lire l’article →';document.getElementById('home-edition-date').textContent='Édition du '+data.date;
 const image=document.getElementById('home-daily-image');if(item.image&&/^(assets\/|https:\/\/images\.pexels\.com\/)/.test(item.image)){image.src=item.image;image.alt=item.imageAlt||'';}else{image.src='assets/home/olive.webp';image.alt='';}
 }
}
})();
