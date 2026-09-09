/* MACA Santé — collecte V1 des recherches réelles. Périphérique au moteur, opt-in, sans identifiant utilisateur. */
(function(root){
  'use strict';
  if(root.MACA_QUERY_COLLECTOR)return;

  const VERSION='2026-09-09-v1';
  const ENDPOINT=String(root.MACA_QUERY_COLLECTION_ENDPOINT||'https://collecte.macasante.fr/v1/event');
  const CONSENT_KEY='maca_query_collection_consent_v1';
  const MAX_QUERY_LENGTH=250;
  const MAX_PROPOSED=20;
  const DEDUPE_MS=5000;
  const recent=new Map();

  function safeStorageGet(){try{return localStorage.getItem(CONSENT_KEY)==='yes';}catch(_){return false;}}
  function safeStorageSet(value){try{localStorage.setItem(CONSENT_KEY,value?'yes':'no');}catch(_){/* preference non persistée */}}
  function hasConsent(){return safeStorageGet();}
  function setConsent(value){safeStorageSet(Boolean(value));root.dispatchEvent(new CustomEvent('maca:query-consent-change',{detail:{consent:Boolean(value)}}));}

  function sanitizeQuery(value){
    let text=String(value||'').replace(/\s+/g,' ').trim().slice(0,MAX_QUERY_LENGTH);
    text=text.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,'[email]');
    text=text.replace(/(?:\+33|0)[\s.\-]?[1-9](?:[\s.\-]?\d{2}){4}/g,'[telephone]');
    text=text.replace(/\b\d{1,2}[/.\-]\d{1,2}[/.\-]\d{2,4}\b/g,'[date]');
    text=text.replace(/\b\d{6,}\b/g,'[nombre]');
    return text;
  }

  function cleanIds(values){
    return [...new Set((Array.isArray(values)?values:[]).map(v=>String(v||'').trim()).filter(Boolean).slice(0,MAX_PROPOSED))];
  }

  function uuid(){
    if(root.crypto&&typeof root.crypto.randomUUID==='function')return root.crypto.randomUUID();
    const bytes=new Uint8Array(16);if(root.crypto&&root.crypto.getRandomValues)root.crypto.getRandomValues(bytes);else for(let i=0;i<16;i++)bytes[i]=Math.floor(Math.random()*256);
    bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
    const hex=[...bytes].map(b=>b.toString(16).padStart(2,'0')).join('');
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  }

  function send(payload){
    if(!hasConsent())return;
    try{
      fetch(ENDPOINT,{method:'POST',mode:'cors',credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(()=>{});
    }catch(_){/* collecte fail-open */}
  }

  function recordQuery(input){
    if(!hasConsent())return null;
    const surface=input&&input.surface==='assistant'?'assistant':'search';
    const query=sanitizeQuery(input&&input.query_text);
    if(!query)return null;
    const proposed=cleanIds(input&&input.proposed_ids);
    const result=(input&&input.result)==='no_result'?'no_result':'result';
    const route=(input&&input.route_kind)==='category'?'category':'engine';
    const engineVersion=String(input&&input.engine_version||'').slice(0,120);
    const key=[surface,query,result,route,proposed.join(',')].join('|');
    const now=Date.now();
    const previous=recent.get(key);
    if(previous&&now-previous.at<DEDUPE_MS)return previous.event_id;
    const eventId=uuid();
    recent.set(key,{at:now,event_id:eventId});
    if(recent.size>60){for(const [k,v] of recent){if(now-v.at>DEDUPE_MS*2)recent.delete(k);}}
    send({event_type:'query',event_id:eventId,surface,query_text:query,result,proposed_ids:proposed,proposed_count:proposed.length,engine_version:engineVersion,route_kind:route,collector_version:VERSION});
    return eventId;
  }

  function recordOpen(queryEventId,ficheId){
    if(!hasConsent())return false;
    const eventId=String(queryEventId||'').trim();
    const id=String(ficheId||'').trim().slice(0,120);
    if(!eventId||!id)return false;
    send({event_type:'open',query_event_id:eventId,fiche_id:id,collector_version:VERSION});
    return true;
  }

  function ensureStyle(){
    if(document.getElementById('maca-query-consent-style'))return;
    const style=document.createElement('style');style.id='maca-query-consent-style';style.textContent='.maca-query-consent{margin:10px 0 0;color:#687873;font:500 11px/1.4 system-ui,-apple-system,Segoe UI,sans-serif}.maca-query-consent label{display:flex;align-items:flex-start;gap:8px;cursor:pointer}.maca-query-consent input{margin-top:2px;flex:0 0 auto}.maca-query-consent a{color:#5e6c51;text-decoration:underline;text-underline-offset:2px}';document.head.appendChild(style);
  }

  function mountConsent(container){
    if(!container||container.querySelector('.maca-query-consent'))return;
    ensureStyle();
    const wrap=document.createElement('div');wrap.className='maca-query-consent';
    const label=document.createElement('label');const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.checked=hasConsent();checkbox.setAttribute('aria-label','Autoriser MACA à conserver cette recherche pour améliorer le site');
    const span=document.createElement('span');span.innerHTML='Améliorer MACA : j’accepte que mes recherches soient conservées sans identifiant utilisateur pendant 90 jours. Ne saisissez pas de nom ni de coordonnées. <a href="confidentialite.html" target="_top">Confidentialité</a>.';
    label.append(checkbox,span);wrap.appendChild(label);container.appendChild(wrap);
    checkbox.addEventListener('change',()=>setConsent(checkbox.checked));
    root.addEventListener('maca:query-consent-change',e=>{checkbox.checked=Boolean(e.detail&&e.detail.consent);});
  }

  root.MACA_QUERY_COLLECTOR={version:VERSION,endpoint:ENDPOINT,hasConsent,setConsent,sanitizeQuery,recordQuery,recordOpen,mountConsent};
})(typeof window!=='undefined'?window:globalThis);
