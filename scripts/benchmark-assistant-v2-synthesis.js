#!/usr/bin/env node
'use strict';

const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const semantic=require(path.join(ROOT,'assistant-v2','semantic-retrieval.js'));
const contract=require(path.join(ROOT,'assistant-v2','contract.js'));
const synthesis=require(path.join(ROOT,'assistant-v2','synthesis.js'));
const corpus=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','corpus.json'),'utf8'));
const embeddingIndexPayload=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','embeddings.index.json'),'utf8'));
const calibration=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','retrieval.calibration-cases.json'),'utf8'));
const safety=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','synthesis.safety-cases.json'),'utf8'));

const EMBEDDINGS_URL='https://api.openai.com/v1/embeddings';
const RESPONSES_URL='https://api.openai.com/v1/responses';
const MODEL=process.env.MACA_SYNTHESIS_MODEL||'gpt-5.6-terra';
const TOP_K=Math.max(1,Math.min(8,Number(process.env.MACA_SYNTHESIS_TOP_K)||5));
const MIN_GATE=Number(process.env.MACA_SYNTHESIS_MIN_SIMILARITY||0.30);
const CONCURRENCY=Math.max(1,Math.min(5,Number(process.env.MACA_SYNTHESIS_CONCURRENCY)||3));

function round(value){return Number(Number(value||0).toFixed(4));}
function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
function expectedIds(item){return [...(item.expectedAny||[]),...(item.expectedAll||[])];}

async function apiFetch(url,body,label){
  const apiKey=process.env.OPENAI_API_KEY;
  if(!apiKey)throw new Error('OPENAI_API_KEY absent');
  let last='';
  for(let attempt=0;attempt<4;attempt++){
    const response=await fetch(url,{
      method:'POST',
      headers:{'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json'},
      body:JSON.stringify(body)
    });
    if(response.ok)return response.json();
    last=(await response.text()).slice(0,1200);
    if(response.status!==429&&response.status<500)break;
    await sleep(700*Math.pow(2,attempt));
  }
  throw new Error(`${label} en échec: ${last}`);
}

async function embedQueries(queries){
  return apiFetch(EMBEDDINGS_URL,{
    model:embeddingIndexPayload.model,
    input:queries,
    dimensions:embeddingIndexPayload.dimensions,
    encoding_format:'float'
  },'OpenAI embeddings');
}

function evaluateExpectedSources(item,usedIds){
  const any=item.expectedAny||[];
  const all=item.expectedAll||[];
  return (!any.length||any.some(id=>usedIds.includes(id)))&&(!all.length||all.every(id=>usedIds.includes(id)));
}

function evaluate(item,result,contractOk){
  if(!contractOk||!result)return {ok:false,statusOk:false,sourceOk:false,personalizationOk:false};
  let expectedStatus=item.expectedStatus||null;
  if(!expectedStatus){
    if(item.class==='abstain')expectedStatus='abstain';
    else expectedStatus='answer';
  }
  const statusOk=result.status===expectedStatus;
  const sourceOk=expectedStatus==='answer'?evaluateExpectedSources(item,result.cards_used):result.cards_used.length===0;
  const shouldPersonalize=item.expectPersonalized===true||item.class==='personalized';
  const personalizationOk=shouldPersonalize
    ? result.personalized_request===true&&Boolean(result.scope_note)
    : true;
  return {ok:statusOk&&sourceOk&&personalizationOk,statusOk,sourceOk,personalizationOk};
}

async function callSynthesis(question,cards){
  const request=synthesis.buildRequest(question,cards,{model:MODEL,reasoningEffort:'none',maxOutputTokens:700});
  const response=await apiFetch(RESPONSES_URL,request,'OpenAI Responses');
  const raw=synthesis.parseResponse(response);
  const checked=contract.validate(raw,cards,{rejectDirectPersonalAdvice:true});
  const usage=response.usage||{};
  return {
    checked,
    usage:{
      input_tokens:Number(usage.input_tokens||0),
      output_tokens:Number(usage.output_tokens||0),
      total_tokens:Number(usage.total_tokens||0)
    }
  };
}

async function mapLimit(items,limit,fn){
  const out=new Array(items.length);
  let cursor=0;
  async function worker(){
    while(true){
      const index=cursor++;
      if(index>=items.length)return;
      out[index]=await fn(items[index],index);
    }
  }
  await Promise.all(Array.from({length:Math.min(limit,items.length)},()=>worker()));
  return out;
}

async function main(){
  if(embeddingIndexPayload.corpusFingerprint!==corpus.fingerprint)throw new Error('Index embeddings obsolète');
  const allCases=[...calibration,...safety];
  const sIndex=semantic.buildIndex(embeddingIndexPayload);
  const cardById=new Map(corpus.cards.map(card=>[card.id,card]));
  const queryPayload=await embedQueries(allCases.map(item=>item.query));
  const queryData=[...(queryPayload.data||[])].sort((a,b)=>a.index-b.index);
  if(queryData.length!==allCases.length)throw new Error('Embeddings requêtes incomplets');

  const prepared=allCases.map((item,index)=>{
    const ranked=semantic.search(sIndex,queryData[index].embedding,{topK:TOP_K});
    const cards=ranked.map(row=>cardById.get(row.id)).filter(Boolean);
    return {item,ranked,cards,topSimilarity:ranked[0]?ranked[0].similarity:0};
  });

  const rows=await mapLimit(prepared,CONCURRENCY,async prep=>{
    const {item,ranked,cards,topSimilarity}=prep;
    const selectedIds=cards.map(card=>card.id);
    const retrievalHasExpected=expectedIds(item).length?evaluateExpectedSources(item,selectedIds):true;
    let normalized=null,contractOk=true,contractErrors=[],usage={input_tokens:0,output_tokens:0,total_tokens:0},mode='model',error='';

    if(topSimilarity<MIN_GATE){
      mode='semantic_gate';
      normalized={status:'abstain',coverage:'insufficient',answer:'',blocks:[],cards_used:[],category:null,personalized_request:item.class==='personalized'||item.expectPersonalized===true,scope_note:'',reason:'Correspondance insuffisante avec le corpus MACA.'};
    }else{
      try{
        const live=await callSynthesis(item.query,cards);
        contractOk=live.checked.ok;
        contractErrors=live.checked.errors;
        normalized=live.checked.normalized;
        usage=live.usage;
      }catch(err){
        contractOk=false;
        contractErrors=[err.message||String(err)];
        error=err.message||String(err);
      }
    }

    const evalResult=evaluate(item,normalized,contractOk);
    return {
      class:item.class,
      query:item.query,
      expectedStatus:item.expectedStatus||((item.class==='abstain')?'abstain':'answer'),
      expectedAny:item.expectedAny||[],
      expectedAll:item.expectedAll||[],
      topSimilarity,
      selectedTop5:ranked.map(row=>({id:row.id,similarity:row.similarity})),
      retrievalHasExpected,
      mode,
      contractOk,
      contractErrors,
      result:normalized,
      evaluation:evalResult,
      usage,
      error
    };
  });

  const total=rows.length;
  const passed=rows.filter(row=>row.evaluation.ok).length;
  const contractValid=rows.filter(row=>row.contractOk).length;
  const modelRows=rows.filter(row=>row.mode==='model');
  const hardGate=rows.filter(row=>row.mode==='semantic_gate').length;
  const byClass={};
  for(const cls of [...new Set(rows.map(row=>row.class))]){
    const group=rows.filter(row=>row.class===cls);
    byClass[cls]={count:group.length,passed:group.filter(row=>row.evaluation.ok).length,passRate:round(group.filter(row=>row.evaluation.ok).length/(group.length||1))};
  }
  const usage=modelRows.reduce((acc,row)=>{
    acc.input_tokens+=row.usage.input_tokens;
    acc.output_tokens+=row.usage.output_tokens;
    acc.total_tokens+=row.usage.total_tokens;
    return acc;
  },{input_tokens:0,output_tokens:0,total_tokens:0});

  const report={
    ok:passed===total&&contractValid===total,
    phase:'4-closed-corpus-synthesis',
    corpusFingerprint:corpus.fingerprint,
    corpusCardCount:corpus.cardCount,
    retrieval:{type:'pure-semantic',embeddingModel:embeddingIndexPayload.model,dimensions:embeddingIndexPayload.dimensions,topK:TOP_K,minSimilarityGate:MIN_GATE},
    synthesis:{model:MODEL,structuredOutput:true,webTools:false,externalMedicalSources:false},
    caseCount:total,
    calibrationCaseCount:calibration.length,
    safetyCaseCount:safety.length,
    passed,
    failed:total-passed,
    passRate:round(passed/(total||1)),
    contractValid,
    hardGateAbstains:hardGate,
    liveModelCalls:modelRows.length,
    byClass,
    usage,
    failures:rows.filter(row=>!row.evaluation.ok),
    contractFailures:rows.filter(row=>!row.contractOk),
    rows
  };

  fs.writeFileSync(path.join(ROOT,'assistant-v2','synthesis.report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({
    ok:report.ok,
    model:MODEL,
    caseCount:total,
    passed:report.passed,
    failed:report.failed,
    passRate:report.passRate,
    contractValid:report.contractValid,
    hardGateAbstains:report.hardGateAbstains,
    liveModelCalls:report.liveModelCalls,
    byClass:report.byClass,
    usage:report.usage,
    failures:report.failures.map(row=>({class:row.class,query:row.query,contractErrors:row.contractErrors,evaluation:row.evaluation,result:row.result}))
  },null,2));

  if(!report.ok)process.exitCode=2;
}

main().catch(error=>{console.error(error.stack||error.message||String(error));process.exitCode=1;});
