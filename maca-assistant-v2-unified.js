/* MACA Santé — Assistant IA V2 single public entrypoint. */
(function(){
'use strict';
const ENDPOINT='https://purple-voice-a8e3.dr-beddok.workers.dev/';
const READY_URL=ENDPOINT+'?maca_public_ready=1';
const supported=document.body.classList.contains('library-page')||document.body.classList.contains('maca-magazine-v1');
if(!supported||document.getElementById('maca-v2-launcher'))return;
async function publicReady(){try{const r=await fetch(READY_URL,{method:'GET',cache:'no-store'});const d=await r.json();return r.ok&&d&&d.service==='maca-assistant-v2'&&d.public_ready===true}catch{return false}}
publicReady().then(ready=>{if(ready)activate();else if(typeof window.dispatchEvent==='function')window.dispatchEvent(new Event('maca:assistant-unavailable'));});
const metrics=()=>window.MACA_ASSISTANT_METRICS;
const record=(name,fields)=>metrics()?.record(name,fields);
function activate(){
const css=document.createElement('style');
css.textContent=`
.maca-v2-launcher{position:fixed;right:22px;bottom:22px;z-index:1100;border:0;border-radius:999px;background:#173c33;color:#fff;padding:15px 21px;font:800 15px/1.2 'DM Sans',system-ui,sans-serif;box-shadow:0 14px 38px rgba(38,57,54,.28);cursor:pointer;display:inline-flex;align-items:center;gap:9px}.maca-v2-launcher:before{content:'✦';font-size:16px}.maca-v2-launcher:hover{transform:translateY(-1px);box-shadow:0 17px 42px rgba(38,57,54,.32)}
.maca-v2-panel{position:fixed;right:22px;bottom:86px;z-index:1099;width:min(460px,calc(100vw - 44px));height:min(690px,calc(100vh - 120px));background:#fff;border:1px solid #ded8cc;border-radius:24px;box-shadow:0 22px 65px rgba(38,57,54,.22);display:flex;flex-direction:column;overflow:hidden;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(10px);transition:.18s}.maca-v2-panel[data-open="true"]{opacity:1;visibility:visible;pointer-events:auto;transform:none}
.maca-v2-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:#faf7ef;border-bottom:1px solid #e7e1d7}.maca-v2-head strong{color:#263936}.maca-v2-close{border:0;background:transparent;font-size:25px;cursor:pointer}.maca-v2-body{padding:16px;overflow:auto;flex:1}.maca-v2-note{font-size:12px;color:#687873;line-height:1.45;margin:0 0 14px}.maca-v2-form{display:flex;gap:8px;align-items:flex-end}.maca-v2-form textarea{flex:1;min-height:72px;max-height:150px;resize:vertical;border:1px solid #c7d0ca;border-radius:14px;padding:11px;font:inherit}.maca-v2-send{border:0;border-radius:999px;background:#173c33;color:#fff;padding:11px 14px;font-weight:700;cursor:pointer}.maca-v2-send:disabled{opacity:.55}.maca-v2-result{margin-top:16px;padding-top:16px;border-top:1px solid #e7e1d7}.maca-v2-status{font-size:12px;color:#687873;margin-bottom:8px}.maca-v2-answer{font-size:16px;line-height:1.55;white-space:pre-wrap;color:#263936}.maca-v2-sources{margin-top:14px;font-size:12px;line-height:1.55}.maca-v2-sources a{color:#315b50}.maca-v2-scope{margin-top:10px;font-size:12px;color:#687873}.maca-v2-error{color:#8b3524}.maca-v2-feedback{margin-top:14px;font-size:13px}.maca-v2-feedback button,.maca-v2-export{padding:9px 12px;margin:4px;border:1px solid #c7d0ca;border-radius:12px;background:#faf7ef;color:#263936;cursor:pointer}.maca-v2-pilot-note{font-size:11px;color:#687873;margin-top:12px}
.search-box{display:none!important}.magazine-library-link{display:none!important}.maca-v2-entry{margin:10px 0 12px;padding:18px 20px;border:1px solid #c8d6cf;border-radius:20px;background:linear-gradient(135deg,#f7f3e8 0%,#eef3e8 100%);display:flex;align-items:center;justify-content:space-between;gap:18px}.maca-v2-entry-copy strong{display:block;color:#263936;font-size:18px;margin-bottom:4px}.maca-v2-entry-copy span{display:block;color:#687873;font-size:13px;line-height:1.4}.maca-v2-entry-button{flex:0 0 auto;border:0;border-radius:999px;background:#173c33;color:#fff;padding:12px 17px;font-weight:800;cursor:pointer;white-space:nowrap}.maca-v2-entry-button:hover{background:#315b50}
@media(max-width:640px){body.maca-v2-open{overflow:hidden}.maca-v2-launcher{right:14px;bottom:14px;padding:14px 18px;font-size:14px}.maca-v2-panel{inset:0;width:100vw;height:100dvh;border:0;border-radius:0}.maca-v2-head{padding-top:max(14px,env(safe-area-inset-top))}.maca-v2-entry{align-items:flex-start;flex-direction:column;padding:16px}.maca-v2-entry-button{width:100%}}
`;document.head.appendChild(css);
const duplicateLibraryLink=document.querySelector('.magazine-library-link');if(duplicateLibraryLink)duplicateLibraryLink.remove();
const launcher=document.createElement('button');launcher.id='maca-v2-launcher';launcher.className='maca-v2-launcher';launcher.type='button';launcher.textContent='Poser une question';launcher.setAttribute('aria-expanded','false');
const panel=document.createElement('section');panel.className='maca-v2-panel';panel.id='maca-v2-panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Assistant MACA');panel.dataset.open='false';
panel.innerHTML=`<header class="maca-v2-head"><div><strong>Assistant MACA</strong><div style="font-size:11px;color:#687873;margin-top:2px">Réponses issues des fiches et du Mag validés</div></div><button class="maca-v2-close" aria-label="Fermer">×</button></header><div class="maca-v2-body"><p class="maca-v2-note">Posez votre question avec vos mots. MACA recherche dans son corpus fermé et s’abstient lorsque l’information disponible n’est pas suffisante. Information générale, sans diagnostic ni conseil médical individualisé.</p><div class="maca-v2-form"><textarea maxlength="600" aria-label="Votre question" placeholder="Ex. : Le magnésium aide-t-il vraiment à dormir ?"></textarea><button class="maca-v2-send">Interroger</button></div><div class="maca-v2-result" hidden><div class="maca-v2-status" role="status" aria-live="polite"></div><div class="maca-v2-answer"></div><div class="maca-v2-scope"></div><div class="maca-v2-sources"></div><div class="maca-v2-feedback" hidden>Cette réponse est-elle utile ? <button type="button" data-vote="useful">Utile</button><button type="button" data-vote="not_useful">Pas utile</button><span class="maca-v2-vote-status" role="status"></span></div></div><p class="maca-v2-pilot-note">Les mesures de ce test restent dans cet onglet jusqu’à sa fermeture, sans texte de question ni identité. Vous pouvez les télécharger pour les transmettre volontairement au responsable du test.</p><button class="maca-v2-export" type="button">Télécharger les mesures du test</button></div>`;
const inlineHost=document.getElementById('home-assistant-results');
if(inlineHost){inlineHost.appendChild(panel);panel.setAttribute('role','region');}else document.body.append(panel,launcher);
const close=panel.querySelector('.maca-v2-close'),textarea=panel.querySelector('textarea'),send=panel.querySelector('.maca-v2-send'),result=panel.querySelector('.maca-v2-result'),status=panel.querySelector('.maca-v2-status'),answer=panel.querySelector('.maca-v2-answer'),scope=panel.querySelector('.maca-v2-scope'),sources=panel.querySelector('.maca-v2-sources');
const feedback=panel.querySelector('.maca-v2-feedback');
let lastVersion='',busy=false;
panel.querySelector('.maca-v2-export').onclick=()=>metrics()?.download();
feedback.querySelectorAll('button').forEach(b=>b.onclick=()=>{record('feedback',{value:b.dataset.vote,corpusVersion:lastVersion});feedback.querySelectorAll('button').forEach(x=>x.disabled=true);panel.querySelector('.maca-v2-vote-status').textContent='Merci, retour enregistré dans cet onglet.';});

function open(q){if(panel.dataset.open!=='true')record('open');panel.dataset.open='true';launcher.setAttribute('aria-expanded','true');if(!inlineHost)document.body.classList.add('maca-v2-open');if(q)textarea.value=q;if(!inlineHost)setTimeout(()=>textarea.focus(),30)}
function shut(){panel.dataset.open='false';launcher.setAttribute('aria-expanded','false');document.body.classList.remove('maca-v2-open')}
launcher.onclick=()=>panel.dataset.open==='true'?shut():open();close.onclick=shut;document.addEventListener('keydown',e=>{if(e.key==='Escape')shut()});
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
async function ask(q){
 if(busy)return;
 q=String(q||textarea.value).trim();if(!q)return;open(q);
 if(q.length>600){result.hidden=false;status.textContent='Question trop longue';answer.textContent='Limitez votre question à 600 caractères.';scope.textContent='';sources.textContent='';feedback.hidden=true;record('error',{error:'input_length'});return;}
 busy=true;send.disabled=true;send.textContent='Analyse…';result.hidden=false;feedback.hidden=true;
 status.textContent='Recherche dans les fiches et Le Mag…';answer.classList.remove('maca-v2-error');answer.textContent='';scope.textContent='';sources.textContent='';
 const started=Date.now(),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),45000);lastVersion='';record('question_sent');
 try{
  let r;
  for(let attempt=0;attempt<2;attempt++){
   r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q}),signal:controller.signal});
   if(attempt||![502,503,504].includes(r.status))break;
   record('error',{error:'server',durationMs:Date.now()-started});
   status.textContent='Service momentanément indisponible ; nouvelle tentative…';
   await new Promise(resolve=>setTimeout(resolve,400));
  }
  if(!r.ok){const e=new Error(r.status===429?'Trop de demandes successives. Réessayez dans un instant.':'Assistant momentanément indisponible. Réessayez.');e.code=r.status===429?'rate_limit':r.status>=500?'server':'invalid_response';throw e;}
  let data;try{data=await r.json();}catch{const e=new Error('Réponse illisible. Réessayez.');e.code='invalid_response';throw e;}
  if(!data||!['answer','category_only','abstain'].includes(data.status)||(data.status==='answer'&&!data.answer)||!Array.isArray(data.cards_used)){const e=new Error('Réponse incomplète. Réessayez.');e.code='invalid_response';throw e;}
  lastVersion=data.meta?.artifact_version||'';
  if(data.status==='answer'){status.textContent='Réponse issue du corpus MACA';answer.textContent=data.answer;}
  else if(data.status==='category_only'&&data.category){status.textContent='Information insuffisante pour une réponse précise';answer.textContent='La rubrique « '+data.category+' » est la plus proche dans le corpus MACA.';}
  else if(['contract_rejected','rejected'].includes(data.meta?.grounding)){status.textContent='Réponse non validée';answer.textContent='Je n’ai pas pu produire une réponse suffisamment fidèle aux sources. Vous pouvez consulter directement les fiches proposées ci-dessous ou reformuler votre question.';}
  else{status.textContent='Aucun résultat suffisamment solide';answer.textContent='Le corpus MACA ne contient pas actuellement de contenu suffisamment pertinent pour répondre à cette question.';}
  scope.textContent=data.scope_note||'';
  const suggestions=data.status!=='answer'&&['contract_rejected','rejected'].includes(data.meta?.grounding)?(data.selected_cards||[]).filter(c=>/^[a-z0-9][a-z0-9-]*$/i.test(c.id||'')&&!c.id.startsWith('mag-')).slice(0,3):[];
  const linkedCards=data.cards_used.length?data.cards_used:suggestions;
  sources.innerHTML=linkedCards.length?'<b>'+(data.cards_used.length?'Sources MACASANTÉ utilisées':'Fiches à consulter — aucune réponse validée')+'</b><br>'+linkedCards.map(c=>{
   const mag=String(c.id||'').startsWith('mag-');
   const href=mag&&/^https:\/\/macasante\.fr\/[a-z0-9-]+\.html$/.test(c.url||'')?c.url:(!mag&&c.id&&/^[a-z0-9][a-z0-9-]*$/i.test(c.id))?'fiche.html?id='+encodeURIComponent(c.id):'';
   const type=mag?'Actualité — Le Mag':'Fiche de référence';
   return '<span>'+type+'</span> · '+(href?'<a data-source-type="'+(mag?'magazine':'fiche')+'" href="'+esc(href)+'">'+esc(c.title)+'</a>':esc(c.title));
  }).join('<br>'):'';
  sources.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>record('source_click',{sourceType:a.dataset.sourceType,corpusVersion:lastVersion})));
  record(data.status==='answer'?'answer':'abstain',{durationMs:Date.now()-started,corpusVersion:lastVersion});
  feedback.hidden=false;feedback.querySelectorAll('button').forEach(b=>b.disabled=false);panel.querySelector('.maca-v2-vote-status').textContent='';
 }catch(e){status.textContent='';answer.classList.add('maca-v2-error');answer.textContent=e.name==='AbortError'?'Le délai de réponse est dépassé. Réessayez.':e.code?e.message:'Connexion impossible. Vérifiez votre connexion puis réessayez.';record('error',{error:e.name==='AbortError'?'timeout':e.code||'network',durationMs:Date.now()-started});}
 finally{clearTimeout(timer);busy=false;send.disabled=false;send.textContent='Interroger';}
}
send.onclick=()=>ask();textarea.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ask()}});
const oldSearch=document.querySelector('.search-box');if(oldSearch)oldSearch.setAttribute('aria-hidden','true');
const guide=document.querySelector('.search-guide');if(guide){const entry=document.createElement('div');entry.className='maca-v2-entry';entry.innerHTML='<div class="maca-v2-entry-copy"><strong>Posez votre question à l’Assistant MACA</strong><span>Une seule entrée pour rechercher dans les fiches validées et obtenir une réponse claire, sourcée et limitée au corpus MACA.</span></div><button type="button" class="maca-v2-entry-button">Ouvrir l’Assistant</button>';guide.replaceWith(entry);entry.querySelector('button').addEventListener('click',()=>open())}
window.MACA_ASSISTANT_V2={ask,open};
if(typeof window.dispatchEvent==='function')window.dispatchEvent(new Event('maca:assistant-ready'));
}
})();
