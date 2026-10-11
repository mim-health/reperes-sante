/* Anonymous pilot metrics: local tab only, no network transport or question text. */
(function(root){
'use strict';
const key='maca-assistant-pilot-v1';
let events=[],start=Date.now();
try{const saved=JSON.parse(root.sessionStorage?.getItem(key)||'null');if(saved&&Array.isArray(saved.events)&&Number.isFinite(saved.start)){events=saved.events.slice(-200);start=saved.start;}}catch{}
const allowed=new Set(['open','question_sent','answer','abstain','error','source_click','feedback']);
function clean(name,fields={}){
 if(!allowed.has(name))return null;
 const e={event:name,elapsedSeconds:Number.isFinite(fields.elapsedSeconds)?Math.max(0,Math.floor(fields.elapsedSeconds)):Math.floor((Date.now()-start)/1000)};
 if(Number.isFinite(fields.durationMs))e.durationMs=Math.max(0,Math.min(120000,Math.round(fields.durationMs)));
 if(['useful','not_useful'].includes(fields.value))e.value=fields.value;
 if(['network','timeout','rate_limit','server','invalid_response','input_length'].includes(fields.error))e.error=fields.error;
 if(['fiche','magazine'].includes(fields.sourceType))e.sourceType=fields.sourceType;
 if(/^[a-f0-9]{64}$/.test(fields.corpusVersion||''))e.corpusVersion=fields.corpusVersion;
 return e;
}
events=events.map(e=>clean(e.event,e)).filter(Boolean);
const api={
 record(name,fields={}){
  const e=clean(name,fields);if(!e)return;
  events.push(e);if(events.length>200)events.shift();
  try{root.sessionStorage?.setItem(key,JSON.stringify({start,events}));}catch{}
 },
 snapshot(){return {schemaVersion:1,mode:'local-manual-export',events:events.map(e=>({...e}))};},
 download(){const blob=new Blob([JSON.stringify(api.snapshot(),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='maca-assistant-test.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
};
root.MACA_ASSISTANT_METRICS=api;
})(typeof window==='undefined'?globalThis:window);
