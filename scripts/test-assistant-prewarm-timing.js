'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const source=fs.readFileSync('assistant-v2/cloudflare-worker-public.js','utf8');
const original=execFileSync('git',['show','17cbe7a816320efd2fa99d4237368a0bfef21ef5:assistant-v2/cloudflare-worker-public.js'],{encoding:'utf8'});
const version='a'.repeat(64);
const card={id:'fixture',title:'Fiche de test',primaryCategory:'Seniors',content:{answer:'Information de test issue de la fiche.',detail:'Détail de test.'}};
function sandbox(code,{raw,rawSequence,supported=true,vector=[1,0],failArtifacts=false}={}){
  const calls=[];
  const c={console,Request,Response,Headers,URL,TextEncoder,Uint8Array,performance,crypto:crypto.webcrypto,setTimeout,clearTimeout};
  c.fetch=async(url,options)=>{
    calls.push({url,body:options?.body?JSON.parse(options.body):null});
    if(failArtifacts&&!String(url).includes('openai'))return new Response('',{status:503});
    let body;
    if(String(url).includes('latest.json'))body={version};
    else if(String(url).endsWith('/corpus.json'))body={fingerprint:version,cardCount:1,cards:[card]};
    else if(String(url).endsWith('/embeddings.index.json'))body={corpusFingerprint:version,cardCount:1,model:'embedding-fixture',dimensions:2,vectors:[{id:card.id,vector}]};
    else if(String(url).endsWith('/embeddings'))body={data:[{embedding:[1,0]}]};
    else if(options?.body&&JSON.parse(options.body).text.format.name==='maca_grounding')body={output_text:JSON.stringify({supported})};
    else body={output_text:JSON.stringify((rawSequence?.length?rawSequence.shift():raw)||{status:'answer',coverage:'sufficient',blocks:[{text:card.content.answer,card_ids:[card.id]}],category:null,personalized_request:false,scope_note:'',reason:''})};
    return new Response(JSON.stringify(body),{headers:{'content-type':'application/json'}});
  };
  vm.createContext(c);
  vm.runInContext(code.replace(/^import .*?;\n/,'').replace('export default {','globalThis.worker={')+'\nglobalThis.policy={rank,norm,SYSTEM_PROMPT,GROUNDING_PROMPT,OUTPUT_SCHEMA,TOP_K,MIN_GATE};',c);
  return {c,calls};
}
const env={OPENAI_API_KEY:'fixture-not-a-secret',RATE_LIMIT_SALT:'fixture',RATE_LIMITER:{limit:async()=>({success:true})}};
const request=()=>new Request('https://example.test/',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://macasante.fr'},body:JSON.stringify({question:'Question synthétique de test ?'})});
(async()=>{
  const before=sandbox(original),after=sandbox(source);
  for(const key of ['SYSTEM_PROMPT','GROUNDING_PROMPT','OUTPUT_SCHEMA','TOP_K','MIN_GATE'])assert.equal(JSON.stringify(before.c.policy[key]),JSON.stringify(after.c.policy[key]),key);
  const warmed=[];
  const readiness=await after.c.worker.fetch(new Request('https://example.test/?maca_public_ready=1'),env,{waitUntil:p=>warmed.push(p)});
  assert.equal(readiness.status,200);await Promise.all(warmed);
  assert.equal(after.calls.length,3);assert(after.calls.every(x=>!x.url.includes('openai')));
  const oldBody=await (await before.c.worker.fetch(request(),env)).json();
  const newResponse=await after.c.worker.fetch(request(),env);const newBody=await newResponse.json();
  assert(newResponse.headers.get('Server-Timing').includes('grounding;dur='));
  for(const stage of ['artifacts','embedding','retrieval','synthesis','grounding','total'])assert(Number.isFinite(newBody.meta.timings_ms[stage]),stage);
  delete newBody.meta.timings_ms;assert.deepEqual(newBody,oldBody);
  assert.equal(after.calls.filter(x=>x.url.includes('latest.json')).length,1,'Prewarm is reused by the subsequent request');
  for(const mode of [
    {supported:false,expected:'rejected'},
    {raw:{status:'answer',coverage:'sufficient',blocks:[{text:'Test',card_ids:['foreign']}],personalized_request:false},expected:'contract_rejected'},
    {vector:[0,1],expected:'not_applicable'}
  ]){
    const s=sandbox(source,mode);const r=await s.c.worker.fetch(request(),env);const b=await r.json();
    assert.equal(b.status,'abstain');assert.equal(b.meta.grounding,mode.expected);assert.equal(b.cards_used.length,0);
  }
  const valid={status:'answer',coverage:'sufficient',blocks:[{text:card.content.answer,card_ids:[card.id]}],category:null,personalized_request:false,scope_note:'',reason:''};
  const malformed={...valid,blocks:[]};
  const repaired=sandbox(source,{rawSequence:[malformed,valid]});
  const repairedBody=await (await repaired.c.worker.fetch(request(),env)).json();
  assert.equal(repairedBody.status,'answer');assert.equal(repairedBody.meta.grounding,'supported');
  assert(Number.isFinite(repairedBody.meta.timings_ms.contract_repair));
  assert.equal(repaired.calls.filter(x=>x.body?.text?.format?.name==='maca_assistant_v2_answer').length,2);
  const persistent=sandbox(source,{raw:malformed});
  const persistentBody=await (await persistent.c.worker.fetch(request(),env)).json();
  assert.equal(persistentBody.meta.grounding,'contract_rejected');assert.equal(persistentBody.meta.repair_attempted,true);
  assert.equal(persistent.calls.filter(x=>x.body?.text?.format?.name==='maca_assistant_v2_answer').length,2);
  const foreign=sandbox(source,{raw:{...valid,blocks:[{text:'Test',card_ids:['foreign']}]}});
  const foreignBody=await (await foreign.c.worker.fetch(request(),env)).json();
  assert.equal(foreignBody.meta.repair_attempted,false);
  assert.equal(foreign.calls.filter(x=>x.body?.text?.format?.name==='maca_assistant_v2_answer').length,1);
  const unavailable=sandbox(source,{failArtifacts:true});const pending=[];
  assert.equal((await unavailable.c.worker.fetch(new Request('https://example.test/?maca_public_ready=1'),env,{waitUntil:p=>pending.push(p)})).status,200);
  await Promise.all(pending);assert.equal((await unavailable.c.worker.fetch(request(),env)).status,503);
  const vectors=Array.from({length:355},(_,i)=>({id:String(i),vector:[Math.sin(i),Math.cos(i),i/355]}));
  vectors.forEach(v=>{v.vectorNorm=after.c.policy.norm(v.vector)});
  for(const q of [[1,0,0],[0,0,0],[.1,.7,.5]])assert.equal(JSON.stringify(after.c.policy.rank(vectors,q)),JSON.stringify(before.c.policy.rank(vectors,q)));
  console.log('PASS: artifact-only prewarm, reuse, unchanged medical prompts/schema/ranking, timing without question logs, rejection gates and 503 fallback.');
})().catch(e=>{console.error(e);process.exitCode=1;});
