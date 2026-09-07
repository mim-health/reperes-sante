#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');const ROOT=path.resolve(__dirname,'..');const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
function ctx(){const c={console,setTimeout,clearTimeout,setInterval,clearInterval,CustomEvent:function(){},MutationObserver:function(){this.observe=()=>{};}};c.window=c;c.globalThis=c;c.addEventListener=()=>{};c.document={readyState:'complete',body:null,getElementById:()=>null,querySelector:()=>null};return vm.createContext(c);}function run(c,p){vm.runInContext(read(p),c,{filename:p});}
const m={window:{}};vm.runInNewContext(read('corpus-manifest.js'),m);const files=m.window.MACA_CORPUS_MANIFEST.map(x=>String(x).split('?')[0]);const c=ctx();files.forEach(f=>run(c,f));run(c,'corpus-canonicalizer.js');c.MACA_CANONICAL_CORPUS=Array.from(c.MACA_BUILD_CANONICAL_CORPUS());c.healthQuestions=c.MACA_CANONICAL_CORPUS.slice();['search-v2-referential-p0.js','search-v2-engine.js','search-v2-corpus-fallback.js','search-v2-fatigue-fix.js','search-v2-harcelement-fix.js','search-v2-retrouvabilite-pilot-fix.js','search-v15-lab-candidate.js'].forEach(f=>run(c,f));
const checks=[
 {q:'mon estomac me brule et ca remonte',want:'reflux-adulte'},
 {q:'ca brule quand je fais pipi',want:'maca-cystite-reperes'},
 {q:'quel antibiotique prendre pour une infection',want:null}
];
const rows=checks.map(x=>{const before=c.MACA_SEARCH_V2.rank(x.q).map(r=>r.q.id);const after=c.MACA_SEARCH_V15_LAB.rank(x.q).map(r=>r.q.id);const pass=x.want?after.includes(x.want):after.length===0;return {...x,before,after,pass,afterReason:c.MACA_SEARCH_V15_LAB.resolve(x.q).reason};});
const suggestionQueries=['j ai des remontees acides','j ai mal a la tete','j ai des bourdonnements et des vertiges','mon coeur s emballe','diabete type 2'];
const suggestions=suggestionQueries.map(q=>{const ids=c.MACA_SEARCH_V2.rank(q).map(r=>r.q.id);return {q,rankedIds:ids,currentComplementCount:Math.max(0,Math.min(2,ids.length-1))};});
const ok=rows.every(x=>x.pass);console.log(JSON.stringify({ok,labVersion:c.MACA_SEARCH_V15_LAB.version,rows,suggestions,observation:'Current Assistant UI can only show complements already returned by rank(); rank() usually returns one item except explicit allowMultiWith pairs.'},null,2));if(!ok)process.exit(1);
