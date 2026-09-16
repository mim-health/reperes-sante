#!/usr/bin/env node
'use strict';

const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const semantic=require(path.join(ROOT,'assistant-v2','semantic-retrieval.js'));
const lexical=require(path.join(ROOT,'assistant-v2','retrieval.js'));
const corpus=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','corpus.json'),'utf8'));
const embeddingIndexPayload=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','embeddings.index.json'),'utf8'));
const cases=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','retrieval.calibration-cases.json'),'utf8'));
const API_URL='https://api.openai.com/v1/embeddings';

function round(v){return Number(Number(v||0).toFixed(4));}
function avg(a){return a.length?a.reduce((x,y)=>x+y,0)/a.length:0;}
function min(a){return a.length?Math.min(...a):0;}
function max(a){return a.length?Math.max(...a):0;}

async function embedQueries(input){
  const apiKey=process.env.OPENAI_API_KEY;
  if(!apiKey)throw new Error('OPENAI_API_KEY absent');
  const response=await fetch(API_URL,{
    method:'POST',
    headers:{'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json'},
    body:JSON.stringify({
      model:embeddingIndexPayload.model,
      input,
      dimensions:embeddingIndexPayload.dimensions,
      encoding_format:'float'
    })
  });
  if(!response.ok)throw new Error(`OpenAI embeddings ${response.status}: ${(await response.text()).slice(0,500)}`);
  return response.json();
}

function evaluateIds(item,ids){
  if(item.class==='abstain')return null;
  const any=Array.isArray(item.expectedAny)?item.expectedAny:[];
  const all=Array.isArray(item.expectedAll)?item.expectedAll:[];
  return (!any.length||any.some(id=>ids.includes(id)))&&(!all.length||all.every(id=>ids.includes(id)));
}

function summary(rows,key){
  const relevant=rows.filter(r=>r.class!=='abstain');
  const hits=relevant.filter(r=>r[key]).length;
  const byClass={};
  for(const cls of ['answer','multi','personalized']){
    const group=relevant.filter(r=>r.class===cls);
    byClass[cls]={count:group.length,hits:group.filter(r=>r[key]).length,hitRate:round(group.length?group.filter(r=>r[key]).length/group.length:0)};
  }
  return {relevantCaseCount:relevant.length,hits,misses:relevant.length-hits,hitRate:round(relevant.length?hits/relevant.length:0),byClass};
}

function thresholdCandidates(rows){
  const relevant=rows.filter(r=>r.class!=='abstain');
  const abstain=rows.filter(r=>r.class==='abstain');
  const candidates=[];
  for(let t=0.15;t<=0.85;t+=0.005){
    let tp=0,fn=0,tn=0,fp=0;
    for(const row of rows){
      const accept=row.topSimilarity>=t;
      const positive=row.class!=='abstain';
      if(positive&&accept)tp++; else if(positive)fn++; else if(!accept)tn++; else fp++;
    }
    const sensitivity=tp/(tp+fn||1),specificity=tn/(tn+fp||1);
    candidates.push({threshold:round(t),sensitivity:round(sensitivity),specificity:round(specificity),balancedAccuracy:round((sensitivity+specificity)/2),tp,fn,tn,fp});
  }
  candidates.sort((a,b)=>b.balancedAccuracy-a.balancedAccuracy||b.specificity-a.specificity||b.sensitivity-a.sensitivity||b.threshold-a.threshold);
  const strict=candidates.filter(c=>c.specificity===1).sort((a,b)=>b.sensitivity-a.sensitivity||b.balancedAccuracy-a.balancedAccuracy||b.threshold-a.threshold);
  return {
    relevantTopSimilarity:{min:round(min(relevant.map(r=>r.topSimilarity))),mean:round(avg(relevant.map(r=>r.topSimilarity))),max:round(max(relevant.map(r=>r.topSimilarity)))},
    abstainTopSimilarity:{min:round(min(abstain.map(r=>r.topSimilarity))),mean:round(avg(abstain.map(r=>r.topSimilarity))),max:round(max(abstain.map(r=>r.topSimilarity)))},
    suggestedStrict:strict[0]||candidates[0],
    best:candidates.slice(0,12)
  };
}

async function main(){
  if(embeddingIndexPayload.corpusFingerprint!==corpus.fingerprint)throw new Error('Index embeddings obsolète : fingerprint corpus différent');
  const sIndex=semantic.buildIndex(embeddingIndexPayload);
  const lIndex=lexical.buildIndex(corpus);
  const cardById=new Map(corpus.cards.map(c=>[c.id,c]));
  const qPayload=await embedQueries(cases.map(c=>c.query));
  const qData=[...(qPayload.data||[])].sort((a,b)=>a.index-b.index);
  if(qData.length!==cases.length)throw new Error('Embeddings requêtes incomplets');

  const rows=cases.map((item,i)=>{
    const semantic20=semantic.search(sIndex,qData[i].embedding,{topK:20});
    const semantic5=semantic20.slice(0,5);
    const lexical20=lexical.search(lIndex,item.query,{topK:20}).results;
    const hybrid5=semantic.reciprocalRankFusion([semantic20,lexical20],{topK:5,k:60});
    const semanticIds=semantic5.map(x=>x.id);
    const hybridIds=hybrid5.map(x=>x.id);
    return {
      class:item.class,
      query:item.query,
      expectedAny:item.expectedAny||[],
      expectedAll:item.expectedAll||[],
      semanticOk:evaluateIds(item,semanticIds),
      hybridOk:evaluateIds(item,hybridIds),
      topSimilarity:semantic5[0]?semantic5[0].similarity:0,
      semanticTop5:semantic5.map(x=>({id:x.id,title:(cardById.get(x.id)||{}).title||'',similarity:x.similarity})),
      hybridTop5:hybrid5.map(x=>({id:x.id,title:(cardById.get(x.id)||{}).title||'',rrfScore:x.rrfScore}))
    };
  });

  const pureSemantic=summary(rows,'semanticOk');
  const hybrid=summary(rows,'hybridOk');
  const thresholds=thresholdCandidates(rows);
  const lexicalReportPath=path.join(ROOT,'assistant-v2','retrieval.calibration.report.json');
  const lexicalReport=fs.existsSync(lexicalReportPath)?JSON.parse(fs.readFileSync(lexicalReportPath,'utf8')):null;
  const report={
    ok:true,
    phase:'3-semantic-retrieval',
    corpusFingerprint:corpus.fingerprint,
    corpusCardCount:corpus.cardCount,
    embedding:{model:embeddingIndexPayload.model,dimensions:embeddingIndexPayload.dimensions,queryTokens:Number(qPayload.usage&&qPayload.usage.total_tokens||0)},
    caseCount:cases.length,
    baselineLexical:lexicalReport?lexicalReport.retrieval:null,
    pureSemantic,
    hybrid,
    semanticThresholdCalibration:thresholds,
    semanticMisses:rows.filter(r=>r.class!=='abstain'&&!r.semanticOk),
    hybridMisses:rows.filter(r=>r.class!=='abstain'&&!r.hybridOk),
    hardestAbstain:[...rows.filter(r=>r.class==='abstain')].sort((a,b)=>b.topSimilarity-a.topSimilarity).slice(0,8),
    notes:[
      'Les seuils sont exploratoires et ne sont pas branchés à la production.',
      'Le benchmark compare exactement le même jeu 2B que le baseline lexical.',
      'Le retrieval sémantique ne génère aucun contenu médical : il classe uniquement les fiches MACA.'
    ],
    rows
  };
  fs.writeFileSync(path.join(ROOT,'assistant-v2','semantic.report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({ok:true,embedding:report.embedding,baselineLexical:report.baselineLexical,pureSemantic,hybrid,semanticThresholdCalibration:thresholds},null,2));
}

main().catch(error=>{console.error(error.stack||error.message||String(error));process.exitCode=1;});
