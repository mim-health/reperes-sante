'use strict';
const fs=require('fs'),vm=require('vm');
const ms={window:{}};vm.createContext(ms);vm.runInContext(fs.readFileSync('corpus-manifest.js','utf8'),ms);const files=ms.window.MACA_CORPUS_MANIFEST.map(x=>String(x).split('?')[0]);
const s={window:{},console};s.window.window=s.window;vm.createContext(s);for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),s,{filename:f});vm.runInContext(fs.readFileSync('corpus-canonicalizer.js','utf8'),s);vm.runInContext(fs.readFileSync('corpus-v2-adapter.js','utf8'),s);
const w=s.window;if(w.MACA_UI_CORPUS_V2!==true)throw new Error('V2 adapter flag missing');if(!Array.isArray(w.healthQuestions)||w.healthQuestions.length!==118)throw new Error('UI does not receive exactly 118 canonical cards');if(!Array.isArray(w.extraAuditedQuestions)||w.extraAuditedQuestions.length!==0)throw new Error('legacy secondary corpus still populated');
const ids=w.healthQuestions.map(c=>String(c.id||''));if(new Set(ids).size!==118)throw new Error('UI adapter reintroduced duplicate IDs');
console.log(JSON.stringify({passed:true,uiCanonicalCards:w.healthQuestions.length,secondaryLegacyCards:w.extraAuditedQuestions.length,uniqueIds:new Set(ids).size},null,2));
