#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
function ctx(){const c={console,setTimeout,clearTimeout,setInterval,clearInterval,CustomEvent:function(){},MutationObserver:function(){this.observe=()=>{};}};c.window=c;c.globalThis=c;c.addEventListener=()=>{};c.document={readyState:'complete',body:null,getElementById:()=>null,querySelector:()=>null};return vm.createContext(c)}function run(c,p){vm.runInContext(read(p),c,{filename:p})}
const m={window:{}};vm.runInNewContext(read('corpus-manifest.js'),m);const c=ctx();m.window.MACA_CORPUS_MANIFEST.map(x=>String(x).split('?')[0]).forEach(f=>run(c,f));run(c,'corpus-canonicalizer.js');c.MACA_CANONICAL_CORPUS=Array.from(c.MACA_BUILD_CANONICAL_CORPUS());c.healthQuestions=c.MACA_CANONICAL_CORPUS.slice();['search-v2-referential-p0.js','search-v2-engine.js','search-v2-corpus-fallback.js','search-v2-fatigue-fix.js','search-v2-harcelement-fix.js','search-v2-retrouvabilite-pilot-fix.js','search-v15-lab-candidate.js','assistant-v15-viewmodel-candidate.js'].forEach(f=>run(c,f));
const checks=[
 {q:'j ai des remontees acides',status:'match',primary:'reflux-adulte',complements:['douleur-abdominale']},
 {q:'ca brule quand je fais pipi',status:'match',primary:'cystite-femme',complements:[]},
 {q:'quel antibiotique prendre pour une infection',status:'none'},
 {q:'je ne me sens pas bien',status:'none'}
];
const rows=checks.map(x=>{const v=c.MACA_ASSISTANT_V15_VIEWMODEL.build(x.q);const gotPrimary=v.primary&&v.primary.id||null;const gotComplements=(v.complements||[]).map(q=>q.id);let pass=v.status===x.status;if(x.primary)pass=pass&&gotPrimary===x.primary&&JSON.stringify(gotComplements)===JSON.stringify(x.complements);if(x.status==='none')pass=pass&&v.proposeLabel==='Proposer cette question à MACA'&&v.exactQuestion===x.q;return {...x,gotPrimary,gotComplements,message:v.message,pass};});
const assistant=read('assistant-alpha.html'),widget=read('maca-assistant-widget.js'),library=read('fiches.html'),entry=read('corpus-v2-browser-entry.js'),home=read('index.html');
const productionWiring={
 assistantLoadsSearch:assistant.includes("load('search-v15-lab-candidate.js?v=20260908-v15-1')"),
 assistantLoadsViewModel:assistant.includes("load('assistant-v15-viewmodel-candidate.js?v=20260908-v15-1')"),
 assistantUsesViewModel:assistant.includes('MACA_ASSISTANT_V15_VIEWMODEL.build(query)'),
 widgetVersion:widget.includes('assistant-alpha.html?v=20260908-v15-1'),
 libraryVersion:library.includes('maca-assistant-widget.js?v=20260908-v15-1')&&library.includes('assistant-alpha.html?v=20260908-v15-1')&&library.includes('corpus-v2-browser-entry.js?v=20260908-v15-1'),
 homeVersion:entry.includes('maca-assistant-widget.js?v=20260908-v15-1')&&home.includes('corpus-v2-browser-entry.js?v=20260908-v15-1')
};
const officialGate=c.MACA_SEARCH_V2.__macaV15LanguageFix===true;const wiringOk=Object.values(productionWiring).every(Boolean);const ok=rows.every(r=>r.pass)&&officialGate&&wiringOk;console.log(JSON.stringify({ok,rows,officialGate,productionWiring,viewModelVersion:c.MACA_ASSISTANT_V15_VIEWMODEL.version},null,2));if(!ok)process.exit(1);
