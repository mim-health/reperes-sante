'use strict';
const fs=require('fs'),assert=require('assert/strict');
const endpoint='https://purple-voice-a8e3.dr-beddok.workers.dev/';
const latest=JSON.parse(fs.readFileSync('assistant-v2/latest.json','utf8'));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function ask(question){
  const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://macasante.fr'},body:JSON.stringify({question}),signal:AbortSignal.timeout(90000)});
  const d=await r.json();assert(r.ok,`HTTP ${r.status}: ${d.error||''}`);return d;
}
async function main(){
  const cases=[
    ['Guêpe','piqure-guepe-abeille-que-faire'],
    ['Que faire après une piqûre de guêpe ?','piqure-guepe-abeille-que-faire'],
    ['Brûlure','brulure-domestique-premiers-gestes'],
    ['Morsure de chien','morsure-chien-chat-que-faire'],
    ['Le magnésium aide-t-il vraiment à dormir ?',null],
    ['Quel protocole médical appliquer à un extraterrestre de la planète Zeflorium ?',false]
  ];
  let first;
  for(let attempt=0;attempt<7;attempt++){
    first=await ask(cases[0][0]);
    if(first.meta?.artifact_version===latest.version)break;
    if(attempt===6)throw new Error(`CORPUS_DESYNCHRONISE: Worker=${first.meta?.artifact_version}, canonical=${latest.version}`);
    await sleep(12000);
  }
  for(let i=0;i<cases.length;i++){
    if(i)await sleep(12000);
    const [question,id]=cases[i];const d=i?await ask(question):first;
    assert.equal(d.meta?.artifact_version,latest.version,'CORPUS_DESYNCHRONISE');
    assert.equal(d.meta?.corpus_cards,latest.cardCount);
    if(id===false){assert.equal(d.status,'abstain');assert.equal(d.cards_used?.length,0);}
    else{
      if(id)assert(d.selected_cards?.some(c=>c.id===id),`Retrieval missing ${id}`);
      assert.equal(d.status,'answer',question);assert.equal(d.meta.grounding,'supported');assert(d.cards_used?.length);
      if(id)assert(d.cards_used.some(c=>c.id===id),`Source missing ${id}`);
    }
    console.log(JSON.stringify({test:i+1,status:d.status,grounding:d.meta?.grounding,version:d.meta?.artifact_version,cardIds:d.cards_used?.map(c=>c.id)}));
  }
  console.log('PASS: live canonical corpus, four retrieval cases, sourced answers, legacy answer and abstention.');
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
