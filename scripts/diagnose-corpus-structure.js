#!/usr/bin/env node
'use strict';
// Revalidation CI after manifest ordering correction.
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.resolve(__dirname,'..');
function manifest(){const s={window:{}};vm.runInNewContext(fs.readFileSync(path.join(ROOT,'corpus-manifest.js'),'utf8'),s);return s.window.MACA_CORPUS_MANIFEST.map(x=>String(x).split('?')[0]);}
function ctx(){const s={console,setTimeout,clearTimeout,CustomEvent:function(){}};s.window=s;s.globalThis=s;return vm.createContext(s);}
function runFiles(c,files){for(const f of files)vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),c,{filename:f});}
function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
function snapshot(files){const c=ctx();runFiles(c,files);const raw=[...(Array.isArray(c.healthQuestions)?c.healthQuestions:[]),...(Array.isArray(c.extraAuditedQuestions)?c.extraAuditedQuestions:[])];runFiles(c,['corpus-canonicalizer.js']);const canonical=Array.from(c.MACA_BUILD_CANONICAL_CORPUS()).map(x=>JSON.parse(JSON.stringify(x)));return {c,raw,canonical};}
function byId(arr){return new Map(arr.map(x=>[String(x.id||''),x]));}
const files=manifest();
const current=snapshot(files);
const compat='structured-backlog-compat.js';
const migrations=files.filter(f=>/^migration-/.test(f));
const base=files.filter(f=>f!==compat&&!/^migration-/.test(f));
const candidate=[...base,compat,...migrations];
const proposed=snapshot(candidate);
const targets=['Moustique tigre : quelles maladies peut-il transmettre en France ?','West Nile : peut-on l’attraper en France ?','Fumées d’incendie : comment protéger sa santé ?'];
const currentMap=byId(current.canonical), proposedMap=byId(proposed.canonical);
const changed=[];for(const [id,a] of currentMap){const b=proposedMap.get(id);if(JSON.stringify(a)!==JSON.stringify(b))changed.push({id,currentTitle:a.title||a.question,proposedTitle:b&& (b.title||b.question),currentCategory:a.publicCategory||a.category,proposedCategory:b&&(b.publicCategory||b.category)});}
const targetStatus=targets.map(title=>({title,current:current.canonical.filter(x=>norm(x.title||x.question)===norm(title)).map(x=>({id:x.id,category:x.publicCategory||x.category,hasDetail:!!x.detail})),proposed:proposed.canonical.filter(x=>norm(x.title||x.question)===norm(title)).map(x=>({id:x.id,category:x.publicCategory||x.category,hasDetail:!!x.detail}))}));
console.log(JSON.stringify({ok:true,currentCanonicalCount:current.canonical.length,proposedCanonicalCount:proposed.canonical.length,changedCanonicalCards:changed.length,changed,targetStatus,currentMigration:current.c.MACA_COEUR_PREVENTION_MIGRATION||null,proposedMigration:proposed.c.MACA_COEUR_PREVENTION_MIGRATION||null,currentPreventionLot2:current.c.MACA_PREVENTION_V2_LOT2||null,proposedPreventionLot2:proposed.c.MACA_PREVENTION_V2_LOT2||null,candidateOrder:{compatIndex:candidate.indexOf(compat),firstMigrationIndex:candidate.findIndex(f=>/^migration-/.test(f)),lastMigrationIndex:candidate.map((f,i)=>/^migration-/.test(f)?i:-1).filter(i=>i>=0).pop()}},null,2));
