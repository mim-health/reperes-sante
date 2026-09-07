#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
function ctx(){const c={console,setTimeout,clearTimeout,setInterval,clearInterval,CustomEvent:function(){},MutationObserver:function(){this.observe=()=>{};}};c.window=c;c.globalThis=c;c.addEventListener=()=>{};c.document={readyState:'complete',body:null,getElementById:()=>null,querySelector:()=>null};return vm.createContext(c)}function run(c,p){vm.runInContext(read(p),c,{filename:p})}
const m={window:{}};vm.runInNewContext(read('corpus-manifest.js'),m);const c=ctx();m.window.MACA_CORPUS_MANIFEST.map(x=>String(x).split('?')[0]).forEach(f=>run(c,f));run(c,'corpus-canonicalizer.js');c.MACA_CANONICAL_CORPUS=Array.from(c.MACA_BUILD_CANONICAL_CORPUS());c.healthQuestions=c.MACA_CANONICAL_CORPUS.slice();['search-v2-referential-p0.js','search-v2-engine.js','search-v2-corpus-fallback.js','search-v2-fatigue-fix.js','search-v2-harcelement-fix.js','search-v2-retrouvabilite-pilot-fix.js','search-v15-lab-candidate.js','assistant-v15-viewmodel-candidate.js'].forEach(f=>run(c,f));
const checks=[
 {q:'j ai des remontees acides',status:'match',primary:'reflux-adulte',complements:['douleur-abdominale']},
 {q:'ca brule quand je fais pipi',status:'match',primary:'maca-cystite-reperes',complements:[]},
 {q:'quel antibiotique prendre pour une infection',status:'none'},
 {q:'je ne me sens pas bien',status:'none'}
];
const rows=checks.map(x=>{const v=c.MACA_ASSISTANT_V15_VIEWMODEL.build(x.q);const gotPrimary=v.primary&&v.primary.id||null;const gotComplements=(v.complements||[]).map(q=>q.id);let pass=v.status===x.status;if(x.primary)pass=pass&&gotPrimary===x.primary&&JSON.stringify(gotComplements)===JSON.stringify(x.complements);if(x.status==='none')pass=pass&&v.proposeLabel==='Proposer cette question à MACA'&&v.exactQuestion===x.q;return {...x,gotPrimary,gotComplements,message:v.message,pass};});
const productionFiles=['assistant-alpha.html','maca-assistant-widget.js','index.html','fiches.html'];const accidental=productionFiles.filter(f=>{const s=read(f);return s.includes('search-v15-lab-candidate.js')||s.includes('assistant-v15-viewmodel-candidate.js')||s.includes('MACA_SEARCH_V15_LAB')||s.includes('MACA_ASSISTANT_V15_VIEWMODEL');});
const ok=rows.every(r=>r.pass)&&accidental.length===0;console.log(JSON.stringify({ok,rows,accidentalProductionWiring:accidental,viewModelVersion:c.MACA_ASSISTANT_V15_VIEWMODEL.version},null,2));if(!ok)process.exit(1);
