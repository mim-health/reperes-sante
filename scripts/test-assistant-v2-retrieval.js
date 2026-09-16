#!/usr/bin/env node
'use strict';
const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const engine=require(path.join(ROOT,'assistant-v2','retrieval.js'));
const corpus=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','corpus.json'),'utf8'));
const cases=JSON.parse(fs.readFileSync(path.join(ROOT,'assistant-v2','retrieval.test-cases.json'),'utf8'));
const index=engine.buildIndex(corpus);
const rows=[];
let passed=0;
for(const item of cases){
  const result=engine.search(index,item.query,{topK:5});
  const ids=result.results.map(x=>x.id);
  const expectedAny=Array.isArray(item.expectedAny)?item.expectedAny:[];
  const expectedAll=Array.isArray(item.expectedAll)?item.expectedAll:[];
  const anyOk=!expectedAny.length||expectedAny.some(id=>ids.includes(id));
  const allOk=!expectedAll.length||expectedAll.every(id=>ids.includes(id));
  const ok=anyOk&&allOk;
  if(ok)passed++;
  rows.push({
    query:item.query,
    ok,
    expectedAny,
    expectedAll,
    top5:result.results.map(x=>({id:x.id,title:x.title,score:x.score,coverage:x.coverage}))
  });
}
const passRate=cases.length?passed/cases.length:0;
const report={
  ok:passRate>=0.8,
  engine:'maca-v2-local-hybrid-bm25-v1',
  corpusFingerprint:corpus.fingerprint||'',
  corpusCardCount:corpus.cardCount,
  testCount:cases.length,
  passed,
  failed:cases.length-passed,
  passRate:Number(passRate.toFixed(4)),
  rows
};
const out=path.join(ROOT,'assistant-v2','retrieval.report.json');
fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(!report.ok)process.exitCode=1;
