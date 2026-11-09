/* Real-model evaluation; no mocked embeddings or generated responses. Synthetic data only. */
'use strict';
const fs=require('fs'),vm=require('vm'),{webcrypto}=require('crypto'),{performance}=require('perf_hooks');
const suite=require('./questions.json'),latest=require('../../assistant-v2/latest.json');
const root='assistant-v2/public-artifacts/'+suite.corpusFingerprint;
if(latest.version!==suite.corpusFingerprint)throw Error('Benchmark corpus mismatch');
const corpus=JSON.parse(fs.readFileSync(root+'/corpus.json')),embeddings=JSON.parse(fs.readFileSync(root+'/embeddings.index.json'));
if(corpus.fingerprint!==suite.corpusFingerprint||embeddings.corpusFingerprint!==suite.corpusFingerprint)throw Error('Atomic corpus mismatch');
const output={mode:'full-real-model',corpusFingerprint:suite.corpusFingerprint,medicalReview:'pending',rows:[]};
const baseFetch=globalThis.fetch;
function instance(path){
 const box={AbortController,setTimeout,clearTimeout,Response,Request,URL,TextEncoder,TextDecoder,crypto:webcrypto};
 for(const path of ['ipp-retrieval-policy.js','assistant-v2/patient-language-retrieval.js','assistant-v2/grounding-contract.js','assistant-v3/retrieval.js','assistant-v3/safety.js','assistant-v3/safety-sources.js']){vm.createContext(box);vm.runInContext(fs.readFileSync(path,'utf8'),box,{filename:path});}
 let providerCalls=0;
 box.fetch=async(url,opt)=>{if(url.includes('latest.json'))return Response.json({version:suite.corpusFingerprint});if(url.endsWith('/corpus.json'))return Response.json(corpus);if(url.endsWith('/embeddings.index.json'))return Response.json(embeddings);if(url==='https://api.openai.com/v1/embeddings'||url==='https://api.openai.com/v1/responses'){providerCalls++;if(providerCalls>700)throw Error('Evaluation request cap');const response=await baseFetch(url,opt);if([401,403,404].includes(response.status))output.providerConfigurationError=response.status;return response;}throw Error('Unexpected destination');};
 vm.runInContext(fs.readFileSync(path,'utf8').replace(/^import .*;\n/gm,'').replace('export default {','globalThis.worker = {'),box);
 return {worker:box.worker,calls:()=>providerCalls};
}
async function main(){
 if(!process.env.OPENAI_API_KEY){output.mode='blocked-no-api-key';output.rows=suite.cases.map(t=>({id:t.id,category:t.category,question:t.question,context:t.history,expectedDocumentIds:t.expectedDocumentIds,v2:{result:'not_executed'},v3:{result:'not_executed'},humanReview:'pending'}));fs.writeFileSync('assistant-v3/evaluation/full-results.json',JSON.stringify(output,null,2)+'\n');console.error('Full model comparison blocked: OPENAI_API_KEY unavailable. No provider requests sent.');process.exitCode=2;return;}
 const workers={v2:instance('assistant-v2/cloudflare-worker-public.js'),v3:instance('assistant-v3/worker-experimental.js')};
 const env={OPENAI_API_KEY:process.env.OPENAI_API_KEY,RATE_LIMIT_SALT:'synthetic-evaluation-only',RATE_LIMITER:{limit:async()=>({success:true})}};
 for(const t of suite.cases){const row={id:t.id,category:t.category,question:t.question,context:t.history,expectedDocumentIds:t.expectedDocumentIds,expectedEvidence:t.expectedEvidence,humanReview:'pending'};
  for(const [version,w]of Object.entries(workers)){const started=performance.now(),count=w.calls();try{const res=await w.worker.fetch(new Request('https://evaluation.local/',{method:'POST',headers:{Origin:'https://macasante.fr','Content-Type':'application/json'},body:JSON.stringify({question:t.question,history:t.history})}),env);const data=await res.json(),retrieved=(data.selected_cards||data.cards_used||[]).map(x=>x.id),relevant=t.expectedDocumentIds.some(id=>retrieved.includes(id));const mechanicalResult=res.status!==200?'error':t.expectedMode==='urgent'?(data.meta?.safety_rule?'pass':'human_review_required'):t.expectedMode==='abstain'?(data.status==='abstain'?'pass':'fail'):relevant?'pass':'fail';row[version]={http:res.status,response:data,retrievedDocumentIds:retrieved,sources:data.cards_used||[],durationMs:performance.now()-started,providerCalls:w.calls()-count,mechanicalResult,medicalAccuracy:'human_review_pending'};}catch{row[version]={mechanicalResult:'error',durationMs:performance.now()-started,medicalAccuracy:'not_evaluated'};}}
  output.rows.push(row);fs.writeFileSync('assistant-v3/evaluation/full-results.json',JSON.stringify(output,null,2)+'\n');console.log(t.id+' completed');if(output.providerConfigurationError){output.mode='blocked-provider-configuration';fs.writeFileSync('assistant-v3/evaluation/full-results.json',JSON.stringify(output,null,2)+'\n');process.exitCode=2;return;}
 }
}
main().catch(()=>{console.error('Evaluation failed; see saved synthetic checkpoints.');process.exitCode=1;});
