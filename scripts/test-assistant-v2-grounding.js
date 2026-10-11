'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const {webcrypto}=require('crypto');
const {evidenceValid,verdictsValid}=require('../assistant-v2/grounding-contract');
const card={id:'a',title:'Titre non documentaire : réduit de 99 %',primaryCategory:'Cancer',url:'https://macasante.fr/a.html',content:{answer:'L’étude n’a pas atteint son objectif principal.',detail:'Une association a été observée chez 20 adultes.',usefulInfo:'',watch:''}};
const good={text:card.content.answer,card_ids:['a'],evidence:[{card_id:'a',quote:card.content.answer}]};
assert(evidenceValid(good,[card]));
assert(!evidenceValid({...good,evidence:[{card_id:'a',quote:'Cet extrait est inventé.'}]},[card]));
assert(!evidenceValid({...good,evidence:[{card_id:'b',quote:card.content.answer}]},[card]));
assert(!evidenceValid({...good,card_ids:['a','b']},[card]));
assert(!evidenceValid({...good,text:'Le risque baisse de 99 %.'},[card]));
assert(!evidenceValid({...good,evidence:[{card_id:'a',quote:card.title}]},[card]));
assert(verdictsValid({verdicts:[{block_index:0,supported:true,unsupported_claims:[]}]},1));
assert(!verdictsValid({verdicts:[]},1));
assert(!verdictsValid({verdicts:[{block_index:1,supported:true,unsupported_claims:[]}]},1));
assert(!verdictsValid({verdicts:[{block_index:0,supported:true,unsupported_claims:['Ajout non sourcé']}]},1));
assert(!verdictsValid({verdicts:[{block_index:0,supported:false,unsupported_claims:[]}]},1));
const workerCode=fs.readFileSync('assistant-v2/cloudflare-worker-public.js','utf8').replace(/^import .*;\n/gm,'').replace('export default {','globalThis.worker = {');
async function simulate(raw,verdicts){
 const calls=[];const version='a'.repeat(64);
 const s={console,Response,Request,URL,TextEncoder,crypto:webcrypto,MACA_GROUNDING_CONTRACT:{evidenceValid,verdictsValid}};
 s.fetch=async(url,options={})=>{calls.push({url,body:options.body&&JSON.parse(options.body)});let data;
  if(url.includes('latest.json'))data={version};
  else if(url.endsWith('corpus.json'))data={fingerprint:version,cardCount:1,cards:[card]};
  else if(url.endsWith('embeddings.index.json'))data={corpusFingerprint:version,cardCount:1,vectors:[{id:'a',vector:[1,0]}],model:'test',dimensions:2};
  else if(url.endsWith('/embeddings'))data={data:[{embedding:[1,0]}]};
  else {const request=JSON.parse(options.body);data={output_text:JSON.stringify(request.text.format.name==='maca_grounding'?{verdicts}:raw)};}
  return new Response(JSON.stringify(data),{status:200});
 };
 vm.createContext(s);vm.runInContext(workerCode,s);
 const r=await s.worker.fetch(new Request('https://worker.test/',{method:'POST',headers:{Origin:'https://macasante.fr','Content-Type':'application/json','CF-Connecting-IP':'test'},body:JSON.stringify({question:'Que montre cette étude ?'})}),{OPENAI_API_KEY:'test',RATE_LIMIT_SALT:'test',RATE_LIMITER:{limit:async()=>({success:true})}});
 assert.equal(r.status,200);return {data:await r.json(),calls};
}
(async()=>{
 const raw={status:'answer',coverage:'sufficient',blocks:[good],category:'Cancer',personalized_request:false,scope_note:'Une dose inventée de 900 mg guérit le cancer.',reason:''};
 let r=await simulate(raw,[{block_index:0,supported:true,unsupported_claims:[]}]);assert.equal(r.data.status,'answer');assert(!r.data.scope_note.includes('900'));assert.equal(r.data.meta.grounding,'supported');assert.equal(r.data.cards_used[0].url,card.url);
 const payload=r.calls.find(c=>c.body?.text?.format?.name==='maca_grounding').body;assert.equal(payload.reasoning.effort,'low');const proof=JSON.parse(payload.input[1].content);assert.equal(proof.blocks[0].evidence.length,1);assert(!payload.input[1].content.includes('20 adultes'),'Other source fields cannot rescue an unsupported block');
 r=await simulate({...raw,blocks:[{...good,text:'Le risque baisse de 99 %.'}]},[{block_index:0,supported:true,unsupported_claims:[]}]);assert.equal(r.data.status,'abstain');assert.equal(r.data.meta.grounding,'contract_rejected');assert(!r.calls.some(c=>c.body?.text?.format?.name==='maca_grounding'));
 r=await simulate({...raw,blocks:[{...good,text:'L’étude prouve la guérison du cancer.'}]},[{block_index:0,supported:false,unsupported_claims:['Causalité ajoutée']}]);assert.equal(r.data.status,'abstain');assert.equal(r.data.meta.grounding,'rejected');
 r=await simulate(raw,[]);assert.equal(r.data.status,'abstain');
 r=await simulate({...raw,blocks:[{...good,text:'Prenez ce médicament.'}]},[{block_index:0,supported:true,unsupported_claims:[]}]);assert.equal(r.data.status,'abstain','Advice blocked even when personalization flag is false');
 console.log(JSON.stringify({ok:true,mechanicalChecks:11,workerFlows:5,scopeNoteAndPerBlockEvidence:true}));
})().catch(e=>{console.error(e);process.exitCode=1;});
