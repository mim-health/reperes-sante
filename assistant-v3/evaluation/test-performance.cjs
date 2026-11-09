'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const corpus=require('../../assistant-v2/corpus.json'),retrieval=require('../retrieval');
let clock=Date.now(),loads=0;
class TestDate extends Date{static now(){return clock;}}
const box={Date:TestDate,Response,TextEncoder,TextDecoder,MACA_V3_RETRIEVAL:retrieval};
box.fetch=async url=>{loads++;if(url.includes('latest.json'))return Response.json({version:corpus.fingerprint});if(url.endsWith('corpus.json'))return Response.json(corpus);if(url.endsWith('embeddings.index.json'))return Response.json({corpusFingerprint:corpus.fingerprint,cardCount:corpus.cardCount,vectors:corpus.cards.map(c=>({id:c.id,vector:[1,0]}))});throw Error('Unexpected network request');};
vm.createContext(box);vm.runInContext(fs.readFileSync('assistant-v3/worker-experimental.js','utf8').replace(/^import .*;\n/gm,'').replace('export default {','globalThis.worker = {'),box);
(async()=>{
 const before=fs.readFileSync('assistant-v3/evaluation/baseline-worker.js','utf8').replace(/^import .*;\n/gm,'').replace('export default {','globalThis.worker = {');
 const base={};vm.createContext(base);vm.runInContext(before,base);
 let changed=0,saved=0;
 for(const card of corpus.cards){const a=base.compactCard(card),b=box.compactCard(card);for(const key of Object.keys(a))if(key!=='detail')assert.equal(b[key],a[key]);assert.equal(b.detail,a.detail,'Rejected context compression must stay disabled');}
 const [a,b]=await Promise.all([box.getData(),box.getData()]);assert.equal(a,b);assert.equal(loads,3,'Cold parallel callers share one manifest and artifact load');
 clock+=120000;await box.getData();assert.equal(loads,3,'Pinned immutable corpus is reused without manifest polling');
 console.log(JSON.stringify({ok:true,documents:corpus.cardCount,deduplicatedCards:changed,removedRepeatedCharacters:saved,concurrentColdLoads:3,warmNetworkLoadsAfterTwoMinutes:0,modelSpeedupNotMeasuredHere:true}));
})().catch(e=>{console.error(e);process.exitCode=1;});
