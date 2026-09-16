#!/usr/bin/env node
'use strict';

const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const engine=require(path.join(ROOT,'assistant-v2','retrieval.js'));
const corpus=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','corpus.json'),'utf8'));
const cases=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','retrieval.calibration-cases.json'),'utf8'));
const index=engine.buildIndex(corpus);

function avg(values){return values.length?values.reduce((a,b)=>a+b,0)/values.length:0;}
function min(values){return values.length?Math.min(...values):0;}
function max(values){return values.length?Math.max(...values):0;}
function round(v){return Number(Number(v||0).toFixed(4));}

const rows=[];
for(const item of cases){
  const result=engine.search(index,item.query,{topK:5});
  const ids=result.results.map(x=>x.id);
  const expectedAny=Array.isArray(item.expectedAny)?item.expectedAny:[];
  const expectedAll=Array.isArray(item.expectedAll)?item.expectedAll:[];
  const anyOk=!expectedAny.length||expectedAny.some(id=>ids.includes(id));
  const allOk=!expectedAll.length||expectedAll.every(id=>ids.includes(id));
  const retrievalOk=item.class==='abstain'?null:(anyOk&&allOk);
  const top=result.results[0]||null;
  const second=result.results[1]||null;
  rows.push({
    class:item.class,
    query:item.query,
    retrievalOk,
    expectedAny,
    expectedAll,
    topScore:top?top.score:0,
    topCoverage:top?top.coverage:0,
    margin:top?round(top.score-(second?second.score:0)):0,
    top5:result.results.map(x=>({id:x.id,title:x.title,score:x.score,coverage:x.coverage}))
  });
}

const relevant=rows.filter(r=>r.class!=='abstain');
const abstain=rows.filter(r=>r.class==='abstain');
const hitCount=relevant.filter(r=>r.retrievalOk).length;
const hitRate=relevant.length?hitCount/relevant.length:0;

const byClass={};
for(const cls of [...new Set(rows.map(r=>r.class))]){
  const group=rows.filter(r=>r.class===cls);
  byClass[cls]={
    count:group.length,
    retrievalHitRate:cls==='abstain'?null:round(group.filter(r=>r.retrievalOk).length/group.length),
    topScore:{min:round(min(group.map(r=>r.topScore))),mean:round(avg(group.map(r=>r.topScore))),max:round(max(group.map(r=>r.topScore)))},
    topCoverage:{min:round(min(group.map(r=>r.topCoverage))),mean:round(avg(group.map(r=>r.topCoverage))),max:round(max(group.map(r=>r.topCoverage)))}
  };
}

const candidates=[];
const coverages=[0,0.25,0.34,0.5,0.67,0.75,1];
for(let score=0;score<=160;score+=2.5){
  for(const coverage of coverages){
    let tp=0,fn=0,tn=0,fp=0;
    for(const row of rows){
      const accept=row.topScore>=score&&row.topCoverage>=coverage;
      const positive=row.class!=='abstain';
      if(positive&&accept)tp++;
      else if(positive&&!accept)fn++;
      else if(!positive&&!accept)tn++;
      else fp++;
    }
    const sensitivity=tp/(tp+fn||1);
    const specificity=tn/(tn+fp||1);
    const balancedAccuracy=(sensitivity+specificity)/2;
    candidates.push({score,coverage,sensitivity:round(sensitivity),specificity:round(specificity),balancedAccuracy:round(balancedAccuracy),tp,fn,tn,fp});
  }
}

candidates.sort((a,b)=>b.balancedAccuracy-a.balancedAccuracy||b.specificity-a.specificity||b.sensitivity-a.sensitivity||a.score-b.score||a.coverage-b.coverage);
const strict=candidates.filter(c=>c.specificity===1).sort((a,b)=>b.sensitivity-a.sensitivity||b.balancedAccuracy-a.balancedAccuracy||a.score-b.score||a.coverage-b.coverage);
const suggestedBaseline=(strict[0]||candidates[0]||null);

const report={
  ok:true,
  phase:'2B-calibration',
  engine:'maca-v2-local-hybrid-bm25-v1',
  corpusFingerprint:corpus.fingerprint||'',
  corpusCardCount:corpus.cardCount,
  caseCount:rows.length,
  classCounts:Object.fromEntries(Object.entries(byClass).map(([k,v])=>[k,v.count])),
  retrieval:{relevantCaseCount:relevant.length,hitCount,missCount:relevant.length-hitCount,hitRate:round(hitRate)},
  byClass,
  scoreSeparation:{
    relevantTopScoreMin:round(min(relevant.map(r=>r.topScore))),
    relevantTopScoreMean:round(avg(relevant.map(r=>r.topScore))),
    abstainTopScoreMax:round(max(abstain.map(r=>r.topScore))),
    abstainTopScoreMean:round(avg(abstain.map(r=>r.topScore)))
  },
  suggestedBaselineRule:suggestedBaseline,
  bestThresholdCandidates:candidates.slice(0,12),
  notes:[
    'Le seuil proposé est exploratoire et ne doit pas être appliqué en production.',
    'Les cas personalized restent des cas de retrieval pertinent mais nécessiteront un garde-barrière séparé côté réponse.',
    'Les cas abstain incluent des requêtes non médicales et des sujets médicaux absents du corpus afin de tester la séparation corpus/hors corpus.'
  ],
  rows
};

const out=path.join(ROOT,'assistant-v2','retrieval.calibration.report.json');
fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({
  ok:report.ok,
  caseCount:report.caseCount,
  classCounts:report.classCounts,
  retrieval:report.retrieval,
  byClass:report.byClass,
  scoreSeparation:report.scoreSeparation,
  suggestedBaselineRule:report.suggestedBaselineRule
},null,2));

// Calibration is observational: do not fail CI because a difficult case misses.
// Only structural corruption should fail the workflow.
if(rows.length<50)process.exitCode=1;
