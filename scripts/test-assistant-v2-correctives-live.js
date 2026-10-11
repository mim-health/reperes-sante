'use strict';
const assert=require('assert/strict');
const endpoint='https://purple-voice-a8e3.dr-beddok.workers.dev/';
const revision='2026-10-11-ipp-grounding1';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function ask(question){
 for(let attempt=0;attempt<3;attempt++){
  const r=await fetch(endpoint,{method:'POST',headers:{Origin:'https://macasante.fr','Content-Type':'application/json'},body:JSON.stringify({question}),signal:AbortSignal.timeout(90000)});
  if(r.status===429&&attempt<2){await sleep(55000);continue;}
  assert(r.ok,'Assistant HTTP '+r.status);const data=await r.json();assert.equal(data.meta?.worker_revision,revision,'Worker code has not been deployed');return data;
 }
}
(async()=>{
 const ready=await fetch(endpoint+'?maca_public_ready=1');assert(ready.ok);assert.equal((await ready.json()).worker_revision,revision,'Worker code has not been deployed');
 for(const [question,id] of [['Oméprazole depuis longtemps','ipp-long-cours-omeprazole'],['Puis-je arrêter mon oméprazole ?','arreter-omeprazole-pantoprazole-ipp']]){
  const d=await ask(question);assert.equal(d.selected_cards[0].id,id);assert.equal(d.selected_cards[0].retrieval_reason,'ipp-intent');assert.equal(d.status,'answer',JSON.stringify(d));assert.equal(d.meta.grounding,'supported');assert(d.cards_used.length);for(const c of d.cards_used)assert(c.url.startsWith('https://macasante.fr/'));console.log(JSON.stringify({test:id,status:d.status,revision:d.meta.worker_revision,sources:d.cards_used.map(c=>c.id)}));await sleep(4000);
 }
 const d=await ask('Qu’a montré l’essai NHS-Galleri sur les cancers aux stades III et IV réunis ?');assert.equal(d.status,'answer');assert.equal(d.meta.grounding,'supported');assert(d.cards_used.some(c=>c.id==='mag-daily-galleri-20261011'&&c.url==='https://macasante.fr/article-depistage-multicancer-galleri.html'));assert(/pas|non|aucun|sans|échou|echec|échec/i.test(d.answer),'The unmet primary endpoint must be preserved');console.log(JSON.stringify({test:'galleri-primary-endpoint',status:d.status,answer:d.answer}));await sleep(4000);
 const outside=await ask('Quel est le traitement du syndrome médical fictif Zeflorium ?');assert.notEqual(outside.status,'answer');assert(!outside.answer);console.log(JSON.stringify({test:'outside-corpus',status:outside.status}));
 console.log(JSON.stringify({ok:true,revision,liveChecks:5}));
})().catch(e=>{console.error(e);process.exitCode=1;});
