/* MACA Santé — Assistant IA V2 unified entrypoint: search bar + floating assistant. */
(function(){
'use strict';
const ENDPOINT='https://voix-violette-a8e3.dr-beddok.workers.dev/';
// Public activation is fail-closed: production keeps V1 until the Worker advertises public readiness.
const READY_URL=ENDPOINT+'?maca_public_ready=1';
const supported=document.body.classList.contains('library-page')||document.body.classList.contains('maca-magazine-v1');
if(!supported||document.getElementById('maca-v2-launcher'))return;

async function publicReady(){try{const r=await fetch(READY_URL,{method:'GET',cache:'no-store'});const d=await r.json();return r.ok&&d&&d.service==='maca-assistant-v2'&&d.public_ready===true}catch{return false}}
publicReady().then(ready=>{if(!ready)return;activate();});
function activate(){

const css=document.createElement('style');
css.textContent=`
.maca-v2-launcher{position:fixed;right:22px;bottom:22px;z-index:1100;border:0;border-radius:999px;background:#66745a;color:#fff;padding:12px 17px;font:700 14px/1.2 'DM Sans',system-ui,sans-serif;box-shadow:0 12px 34px rgba(38,57,54,.22);cursor:pointer}
.maca-v2-panel{position:fixed;right:22px;bottom:78px;z-index:1099;width:min(460px,calc(100vw - 44px));height:min(690px,calc(100vh - 112px));background:#fff;border:1px solid #ded8cc;border-radius:24px;box-shadow:0 22px 65px rgba(38,57,54,.22);display:flex;flex-direction:column;overflow:hidden;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(10px);transition:.18s}
.maca-v2-panel[data-open="true"]{opacity:1;visibility:visible;pointer-events:auto;transform:none}
.maca-v2-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:#faf7ef;border-bottom:1px solid #e7e1d7}.maca-v2-head strong{color:#263936}.maca-v2-close{border:0;background:transparent;font-size:25px;cursor:pointer}
.maca-v2-body{padding:16px;overflow:auto;flex:1}.maca-v2-note{font-size:12px;color:#687873;line-height:1.45;margin:0 0 14px}.maca-v2-form{display:flex;gap:8px;align-items:flex-end}.maca-v2-form textarea{flex:1;min-height:72px;max-height:150px;resize:vertical;border:1px solid #c7d0ca;border-radius:14px;padding:11px;font:inherit}.maca-v2-send{border:0;border-radius:999px;background:#173c33;color:#fff;padding:11px 14px;font-weight:700;cursor:pointer}.maca-v2-send:disabled{opacity:.55}.maca-v2-result{margin-top:16px;padding-top:16px;border-top:1px solid #e7e1d7}.maca-v2-status{font-size:12px;color:#687873;margin-bottom:8px}.maca-v2-answer{font-size:16px;line-height:1.55;white-space:pre-wrap;color:#263936}.maca-v2-sources{margin-top:14px;font-size:12px;line-height:1.55}.maca-v2-sources a{color:#315b50}.maca-v2-scope{margin-top:10px;font-size:12px;color:#687873}.maca-v2-error{color:#8b3524}
.search-box{display:flex!important}
@media(max-width:640px){.maca-v2-launcher{right:14px;bottom:14px}.maca-v2-panel{inset:0;width:100vw;height:100dvh;border:0;border-radius:0}.maca-v2-head{padding-top:max(14px,env(safe-area-inset-top))}}
`;document.head.appendChild(css);

const launcher=document.createElement('button');launcher.id='maca-v2-launcher';launcher.className='maca-v2-launcher';launcher.type='button';launcher.textContent='Assistant MACA';launcher.setAttribute('aria-expanded','false');
const panel=document.createElement('section');panel.className='maca-v2-panel';panel.id='maca-v2-panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Assistant MACA');panel.dataset.open='false';
panel.innerHTML=`<header class="maca-v2-head"><div><strong>Assistant MACA</strong><div style="font-size:11px;color:#687873;margin-top:2px">Réponses issues des fiches MACA validées</div></div><button class="maca-v2-close" aria-label="Fermer">×</button></header><div class="maca-v2-body"><p class="maca-v2-note">Posez votre question avec vos mots. MACA recherche dans son corpus fermé et s’abstient lorsque l’information disponible n’est pas suffisante. Information générale, sans diagnostic ni conseil médical individualisé.</p><div class="maca-v2-form"><textarea maxlength="600" aria-label="Votre question" placeholder="Ex. : Le magnésium aide-t-il vraiment à dormir ?"></textarea><button class="maca-v2-send">Interroger</button></div><div class="maca-v2-result" hidden><div class="maca-v2-status"></div><div class="maca-v2-answer"></div><div class="maca-v2-scope"></div><div class="maca-v2-sources"></div></div></div>`;
document.body.append(panel,launcher);
const close=panel.querySelector('.maca-v2-close'),textarea=panel.querySelector('textarea'),send=panel.querySelector('.maca-v2-send'),result=panel.querySelector('.maca-v2-result'),status=panel.querySelector('.maca-v2-status'),answer=panel.querySelector('.maca-v2-answer'),scope=panel.querySelector('.maca-v2-scope'),sources=panel.querySelector('.maca-v2-sources');
function open(q){panel.dataset.open='true';launcher.setAttribute('aria-expanded','true');if(q)textarea.value=q;setTimeout(()=>textarea.focus(),30)}
function shut(){panel.dataset.open='false';launcher.setAttribute('aria-expanded','false')}
launcher.onclick=()=>panel.dataset.open==='true'?shut():open();close.onclick=shut;document.addEventListener('keydown',e=>{if(e.key==='Escape')shut()});
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
async function ask(q){
q=String(q||textarea.value).trim();if(!q)return;open(q);send.disabled=true;send.textContent='Analyse…';result.hidden=false;status.textContent='Recherche dans les fiches MACA…';answer.textContent='';scope.textContent='';sources.textContent='';
try{
const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q})});
const data=await r.json().catch(()=>({}));
if(!r.ok)throw new Error(r.status===429?'Trop de demandes successives. Réessayez dans un instant.':'Assistant momentanément indisponible.');
if(data.status==='answer'&&data.answer){status.textContent='Réponse issue du corpus MACA';answer.textContent=data.answer}
else if(data.status==='category_only'&&data.category){status.textContent='Information insuffisante pour une réponse précise';answer.textContent='La rubrique « '+data.category+' » est la plus proche dans le corpus MACA.'}
else{status.textContent='Aucun résultat suffisamment solide';answer.textContent='Le corpus MACA ne contient pas actuellement de fiche suffisamment pertinente pour répondre à cette question.'}
scope.textContent=data.scope_note||'';
const cards=data.cards_used||[];sources.innerHTML=cards.length?'<b>Fiches MACA utilisées</b><br>'+cards.map(c=>c.url?'<a href="'+esc(c.url)+'">'+esc(c.title)+'</a>':esc(c.title)).join('<br>'):'';
}catch(e){status.textContent='';answer.classList.add('maca-v2-error');answer.textContent=e.message||'Assistant momentanément indisponible.'}
finally{send.disabled=false;send.textContent='Interroger'}
}
send.onclick=()=>ask();textarea.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ask()}});
function bindSearch(){
const old=document.getElementById('search-input');if(!old)return;
const input=old.cloneNode(true);old.replaceWith(input);input.value='';
const oldGo=document.getElementById('search-go');let go=oldGo;
if(oldGo){go=oldGo.cloneNode(true);oldGo.replaceWith(go)}else{go=document.createElement('button');go.id='search-go';go.className='search-go';go.type='button';go.textContent='GO';input.parentNode.appendChild(go)}
const clear=document.getElementById('clear-search');if(clear)clear.hidden=true;
function submit(){const q=input.value.trim();if(q)ask(q)}
go.addEventListener('click',submit);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();e.stopImmediatePropagation();submit()}},true);
input.setAttribute('aria-label','Poser une question à l’Assistant MACA');input.placeholder='Posez votre question de santé…';
}
bindSearch();
window.MACA_ASSISTANT_V2={ask,open};
}
})();