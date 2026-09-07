#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.resolve(__dirname,'..');
function manifest(){const s={window:{}};vm.runInNewContext(fs.readFileSync(path.join(ROOT,'corpus-manifest.js'),'utf8'),s);return s.window.MACA_CORPUS_MANIFEST.map(x=>String(x).split('?')[0]);}
function ctx(){const s={console,setTimeout,clearTimeout,CustomEvent:function(){}};s.window=s;s.globalThis=s;return vm.createContext(s);}
function runFiles(c,files){for(const f of files)vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),c,{filename:f});}
function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
const files=manifest(), c=ctx();runFiles(c,files);
const raw=[...(Array.isArray(c.healthQuestions)?c.healthQuestions:[]),...(Array.isArray(c.extraAuditedQuestions)?c.extraAuditedQuestions:[])];
const byId=new Map();raw.forEach((x,i)=>{const id=String(x&&x.id||'').trim();if(id){if(!byId.has(id))byId.set(id,[]);byId.get(id).push({i,title:x.title||x.question,category:x.publicCategory||x.category});}});
const dup=[...byId].filter(([,v])=>v.length>1).map(([id,v])=>({id,count:v.length,occurrences:v}));
runFiles(c,['corpus-canonicalizer.js']);const canonical=Array.from(c.MACA_BUILD_CANONICAL_CORPUS());
const targets=['Moustique tigre : quelles maladies peut-il transmettre en France ?','West Nile : peut-on l’attraper en France ?','Fumées d’incendie : comment protéger sa santé ?'];
const targetStatus=targets.map(title=>({title,rawMatches:raw.filter(x=>norm(x.title||x.question)===norm(title)).map(x=>x.id),canonicalMatches:canonical.filter(x=>norm(x.title||x.question)===norm(title)).map(x=>x.id)}));
const counts={};canonical.forEach(x=>{const k=x.publicCategory||x.category||'';counts[k]=(counts[k]||0)+1;});
console.log(JSON.stringify({ok:true,manifestCount:files.length,rawCount:raw.length,rawUniqueIds:byId.size,duplicateStableIds:dup.length,duplicateDetails:dup,canonicalCount:canonical.length,categoryCounts:counts,targetStatus,migrationCoeurPrevention:c.MACA_COEUR_PREVENTION_MIGRATION||null,preventionV2Lot1:c.MACA_PREVENTION_V2_LOT1||null,preventionV2Lot2:c.MACA_PREVENTION_V2_LOT2||null},null,2));
