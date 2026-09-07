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
const selectionChecks=[
 {q:'j ai des remontees acides',primary:'reflux-adulte',complements:['douleur-abdominale']},
 {q:'j ai mal a la tete',primary:'maux-tete',complements:['migraine-que-faire']},
 {q:'j ai des bourdonnements et des vertiges',primary:'acouphenes-adulte',complements:['vertiges-causes']},
 {q:'mon coeur s emballe',primary:'palpitations-adulte',complements:[]},
 {q:'diabete type 2',primary:'diabete-type-2-depistage-complications',complements:[]},
 {q:'ca brule quand je fais pipi',primary:'maca-cystite-reperes',complements:[]}
];
const selections=selectionChecks.map(x=>{const s=c.MACA_SEARCH_V15_LAB.select(x.q);const gotPrimary=s.primary&&s.primary.q.id;const gotComplements=s.complements.map(q=>q.id);return {...x,gotPrimary,gotComplements,pass:gotPrimary===x.primary&&JSON.stringify(gotComplements)===JSON.stringify(x.complements),reason:s.reason};});
const ok=rows.every(x=>x.pass)&&selections.every(x=>x.pass);console.log(JSON.stringify({ok,labVersion:c.MACA_SEARCH_V15_LAB.version,rows,selections,observation:'Primary decision remains separate; complements are explicit and capped at two.'},null,2));if(!ok)process.exit(1);
