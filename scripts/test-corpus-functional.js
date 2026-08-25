'use strict';
const fs=require('fs'),vm=require('vm');
const CATS=['Santé au quotidien','Cœur & prévention','Digestion & urinaire','Santé des femmes & grossesse','Enfants & parents','Ados','Santé mentale','Seniors'];
const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function die(m,d){console.error('FAIL:',m,d||'');process.exitCode=1;}
const ms={window:{}};vm.createContext(ms);vm.runInContext(fs.readFileSync('corpus-manifest.js','utf8'),ms);const files=ms.window.MACA_CORPUS_MANIFEST.map(x=>String(x).split('?')[0]);
const s={window:{},console};s.window.window=s.window;vm.createContext(s);for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),s,{filename:f});vm.runInContext(fs.readFileSync('corpus-canonicalizer.js','utf8'),s);const cards=s.window.MACA_BUILD_CANONICAL_CORPUS();
if(cards.length!==118)die('canonical parity count changed',{expected:118,actual:cards.length});
for(const cat of CATS){const n=cards.filter(c=>c.publicCategory===cat).length;if(!n)die('empty canonical category',cat);}
function find(term){const t=norm(term);return cards.filter(c=>norm([c.id,c.title,c.question,(c.keywords||[]).join(' '),c.answer].join(' ')).includes(t));}
const cases=['gluten','blé','cholestérol','levure de riz rouge'];for(const term of cases){if(!find(term).length)die('sensitive search has no result',term);}
const mental=cards.filter(c=>c.publicCategory==='Santé mentale'),children=cards.filter(c=>c.publicCategory==='Enfants & parents'),ados=cards.filter(c=>c.publicCategory==='Ados');if(!mental.length||!children.length||!ados.length)die('sensitive categories missing');
const ids=new Set(cards.map(c=>String(c.id||'')).filter(Boolean));if(ids.size!==cards.length)die('individual URL key parity failed: IDs not one-to-one',{ids:ids.size,cards:cards.length});
// Representative URL-resolvable records: every canonical stable ID must resolve exactly once.
for(const id of ids){if(cards.filter(c=>String(c.id||'')===id).length!==1)die('ID cannot resolve exactly once',id);}
console.log(JSON.stringify({passed:process.exitCode!==1,canonicalCards:cards.length,categories:Object.fromEntries(CATS.map(cat=>[cat,cards.filter(c=>c.publicCategory===cat).length])),sensitiveSearch:Object.fromEntries(cases.map(t=>[t,find(t).length])),stableUrlKeys:ids.size},null,2));if(process.exitCode===1)process.exit(1);
