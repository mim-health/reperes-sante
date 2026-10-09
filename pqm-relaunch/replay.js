'use strict';
const fs=require('fs'),path=require('path');
const root=__dirname,cases=JSON.parse(fs.readFileSync(path.join(root,'cases.json'),'utf8'));
const results=[];
(async()=>{
for(let i=0;i<cases.length;i++){
 const c={...cases[i]},t=Date.now();
 try{
  const r=await fetch('https://purple-voice-a8e3.dr-beddok.workers.dev/',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:c.question}),signal:AbortSignal.timeout(45000)});
  const raw=await r.text();let d;try{d=JSON.parse(raw)}catch{d={}}
  c.status=r.ok?(d.status||'unknown'):'technical_error';c.cards=d.cards_used||[];c.answer=d.answer||'';c.meta=d.meta||{};c.technical_error=r.ok?null:('HTTP '+r.status+': '+raw.slice(0,500));
 }catch(e){c.status='technical_error';c.cards=[];c.answer='';c.technical_error=String(e);}
 c.elapsed=(Date.now()-t)/1000;results.push(c);
 fs.writeFileSync(path.join(root,'replay-2026-10-09.json'),JSON.stringify({generated_at:new Date().toISOString(),cases:results},null,2));
 console.log((i+1)+'/'+cases.length+' '+c.intent+' '+c.status+' '+JSON.stringify(c.cards.map(x=>x.id||x))+' '+(c.technical_error||''));
 if(i===2&&results.every(x=>x.status==='technical_error'))throw Error('Endpoint unavailable; stopping');
 await new Promise(r=>setTimeout(r,Math.max(0,3200-(Date.now()-t))));
}
console.log('PQM_RESULTS_JSON='+JSON.stringify({generated_at:new Date().toISOString(),cases:results}));
})().catch(e=>{console.log('PQM_RESULTS_JSON='+JSON.stringify({cases:results}));console.error(e);process.exitCode=1});
