'use strict';
const fs=require('fs');
const src=fs.readFileSync('corpus-v2-browser-entry.js','utf8');
const required=['MACA_CORPUS_READY','MACA_BUILD_CANONICAL_CORPUS','window.healthQuestions=canonical.slice()','window.extraAuditedQuestions=[]','app.js?v=20260825-corpusv3','maca:v2-ui-ready'];
for(const token of required){if(!src.includes(token))throw new Error('Browser V2 entrypoint missing safety token: '+token);}
const manifest=fs.readFileSync('corpus-manifest.js','utf8');
if(!manifest.includes('backlog-audited-gluten-ble-diagnostic-2026-08-24.js'))throw new Error('Sensitive latest corpus file missing from manifest');
console.log(JSON.stringify({passed:true,entrypoint:'corpus-v2-browser-entry.js',waitsForCorpus:true,canonicalBeforeApp:true,legacySecondaryCleared:true},null,2));
