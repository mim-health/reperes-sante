'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const entries=fs.readdirSync('fiches-data').filter(x=>x.endsWith('.json'));
assert(entries.length>300);
for(const file of entries){const p=JSON.parse(fs.readFileSync('fiches-data/'+file));assert.strictEqual(p.fiche.id,file.slice(0,-5));assert(p.fiche.title);assert(Array.isArray(p.related));assert(!p.related.some(x=>x.id===p.fiche.id));}
async function loadIndividual(ok=true){
 const calls=[],scripts=[];
 const context={console:{warn(){},error(){}},setTimeout,clearTimeout,URLSearchParams,AbortController,CustomEvent:function(){},location:{search:'?id=piqure-guepe-abeille-que-faire'},document:{querySelector:()=>({}),head:{appendChild(s){scripts.push(s.src);s.onerror();}},createElement:()=>({})},fetch:async url=>{calls.push(url);return {ok,status:ok?200:404,json:async()=>JSON.parse(fs.readFileSync('fiches-data/piqure-guepe-abeille-que-faire.json'))};}};
 context.window=context;context.MACA_CORPUS_MANIFEST=['qa-data.js'];context.dispatchEvent=()=>{};
 vm.runInNewContext(fs.readFileSync('corpus-loader.js','utf8'),context);
 if(ok){await context.MACA_CORPUS_READY;assert.strictEqual(context.MACA_CORPUS_LOAD_MODE,'individual-fiche');assert.strictEqual(calls.length,1);assert.strictEqual(scripts.length,0);assert(context.healthQuestions.some(q=>q.id==='piqure-guepe-abeille-que-faire'&&q.detail));}
 else {await assert.rejects(context.MACA_CORPUS_READY);assert(scripts.some(x=>x.startsWith('corpus-production.js?v=')));}
}
(async()=>{await loadIndividual();await loadIndividual(false);console.log('PASS: '+entries.length+' individual fiches; one request, no full corpus; safe fallback on missing payload.');})().catch(e=>{console.error(e);process.exitCode=1;});
