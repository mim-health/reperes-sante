'use strict';
// Exercise the candidate Worker against the real generation/verification API,
// with repository artifacts injected locally. This does not prove deployment.
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const {webcrypto}=require('crypto');
const contract=require('../assistant-v2/grounding-contract');
require('../ipp-retrieval-policy');
const patient=require('../assistant-v2/patient-language-retrieval');
const corpus=JSON.parse(fs.readFileSync('assistant-v2/corpus.json','utf8'));
const latest=JSON.parse(fs.readFileSync('assistant-v2/latest.json','utf8'));
const embeddings=JSON.parse(fs.readFileSync('assistant-v2/public-artifacts/'+latest.version+'/embeddings.index.json','utf8'));
assert.equal(corpus.cardCount,embeddings.cardCount,'Build embeddings before testing if document count changed');
embeddings.corpusFingerprint=corpus.fingerprint;
const code=fs.readFileSync('assistant-v2/cloudflare-worker-public.js','utf8').replace(/^import .*;\n/gm,'').replace('export default {','globalThis.worker = {').replace('catch(e){return response','catch(e){console.error(\'TEST_ONLY_ERROR\',e.message);return response');
const s={console,AbortController,setTimeout,clearTimeout,Response,Request,URL,TextEncoder,crypto:webcrypto,MACA_GROUNDING_CONTRACT:contract,MACA_PATIENT_LANGUAGE_RETRIEVAL:patient,MACA_IPP_RETRIEVAL:globalThis.MACA_IPP_RETRIEVAL};
const traces=[];
s.fetch=async(url,options)=>{
 if(url.includes('latest.json'))return Response.json({version:corpus.fingerprint});
 if(url.endsWith('/corpus.json'))return Response.json(corpus);
 if(url.endsWith('/embeddings.index.json'))return Response.json(embeddings);
 const response=await fetch(url,{...options,signal:AbortSignal.timeout(120000)});
 if(!response.ok)console.error('TEST_ONLY_API_ERROR',url,response.status);
 if(url.endsWith('/responses')){const output=await response.clone().json();traces.push({format:JSON.parse(options.body).text.format.name,input:JSON.parse(options.body).text.format.name==='maca_grounding'?JSON.parse(JSON.parse(options.body).input[1].content):null,output});}
 return response;
};
vm.createContext(s);vm.runInContext(code,s);
const env={OPENAI_API_KEY:process.env.OPENAI_API_KEY,RATE_LIMIT_SALT:'local-validation-only',RATE_LIMITER:{limit:async()=>({success:true})}};
(async()=>{
 assert(env.OPENAI_API_KEY,'OPENAI_API_KEY required for real model verification');
 for(const [question,expectedId] of [['Oméprazole depuis longtemps','ipp-long-cours-omeprazole'],['Puis-je arrêter mon oméprazole ?','arreter-omeprazole-pantoprazole-ipp'],['Comment gérer le diabète au quotidien selon son traitement ?','diabete-organisation-traitement'],['Comment faire face à l’annonce et à l’après-diagnostic d’Alzheimer ?','alzheimer-apres-diagnostic'],['Comment gérer les médicaments de l’insuffisance cardiaque au quotidien ?','insuffisance-cardiaque-medicaments-quotidien'],['Que faire après une piqûre de guêpe ?','piqure-guepe-abeille-que-faire'],['Qu’a montré l’essai NHS-Galleri sur les cancers aux stades III et IV réunis ?','mag-daily-galleri-20261011']]){
  const r=await s.worker.fetch(new Request('https://worker.test/',{method:'POST',headers:{Origin:'https://macasante.fr','Content-Type':'application/json','CF-Connecting-IP':'local-test'},body:JSON.stringify({question})}),env);const d=await r.json();assert.equal(r.status,200);if(d.status!=='answer')console.log(JSON.stringify({failedCase:expectedId,traces}));traces.length=0;assert.equal(d.status,'answer',JSON.stringify(d));assert.equal(d.meta.grounding,'supported');assert(d.cards_used.some(c=>c.id===expectedId));if(expectedId.includes('galleri'))assert(/pas|non|aucun|sans|échou|échec/i.test(d.answer));console.log(JSON.stringify({source:expectedId,status:d.status,grounding:d.meta.grounding,workerRevision:d.meta.worker_revision}));
 }
 const r=await s.worker.fetch(new Request('https://worker.test/',{method:'POST',headers:{Origin:'https://macasante.fr','Content-Type':'application/json'},body:JSON.stringify({question:'Quel traitement guérit le syndrome médical fictif Zeflorium ?'})}),env);const d=await r.json();assert.equal(r.status,200);assert.notEqual(d.status,'answer');assert(!d.answer);console.log(JSON.stringify({ok:true,realModelChecks:8,productionDeployment:false}));
})().catch(e=>{console.error(e);process.exitCode=1;});
