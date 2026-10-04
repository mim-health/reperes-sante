'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict'),os=require('os');
const {execFileSync}=require('child_process');
const root=path.resolve(__dirname,'..');
const s={console,setTimeout,clearTimeout,addEventListener(){},document:{readyState:'loading',addEventListener(){}}};s.window=s;s.globalThis=s;vm.createContext(s);
const run=file=>vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),s,{filename:file});
run('corpus-manifest.js');
const files=Array.from(s.MACA_CORPUS_MANIFEST,x=>String(x).split('?')[0]);
files.forEach(run);run('corpus-canonicalizer.js');s.MACA_BUILD_CANONICAL_CORPUS();
const exported=JSON.parse(fs.readFileSync(path.join(root,'assistant-v2/corpus.json'),'utf8'));
assert.deepEqual(exported.cards.map(c=>c.id),Array.from(s.MACA_CANONICAL_CORPUS,c=>c.id));
for(const id of ['piqure-guepe-abeille-que-faire','brulure-domestique-premiers-gestes','morsure-chien-chat-que-faire']){
  const card=exported.cards.find(c=>c.id===id);assert(card,id);assert.equal(card.metadata.validationStatus,'VALIDATED');assert(card.content.answer);assert(card.sources.length);
}
['maca-category-access.js','search-v2-referential-p0.js','search-v2-engine.js','search-v2-pqm-retrieval-fix.js','search-v2-tests-p0.js','search-v2-regression-runner.js'].forEach(run);
const report=s.MACA_SEARCH_V2_RUN_REGRESSION();
assert(report.total>=132);assert.equal(report.failed,0,JSON.stringify(report.failures));
['search-v2-corpus-fallback.js','search-v2-fatigue-fix.js','search-v2-harcelement-fix.js','search-v2-retrouvabilite-pilot-fix.js','search-v2-pqm-retrieval-fix.js'].forEach(run);
// Add a validated fixture only through the manifest, without touching the exporter or Worker.
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'maca-canonical-'));
try{
  for(const file of [...files,'corpus-canonicalizer.js','maca-category-access.js','scripts/build-assistant-v2-corpus.js']){
    fs.mkdirSync(path.dirname(path.join(temp,file)),{recursive:true});fs.copyFileSync(path.join(root,file),path.join(temp,file));
  }
  const fixture={id:'test-corpus-vivant',title:'Test corpus vivant zeflorium',category:'Santé au quotidien',validationStatus:'VALIDATED',answer:'Contenu de test sans information médicale.',detail:'Détail de test.',keywords:['zeflorium'],sources:[{label:'Source de test',url:'https://example.com/test'}]};
  fs.writeFileSync(path.join(temp,'test-fixture.js'),'window.extraAuditedQuestions.push('+JSON.stringify(fixture)+');');
  fs.writeFileSync(path.join(temp,'corpus-manifest.js'),'window.MACA_CORPUS_MANIFEST='+JSON.stringify([...files,'test-fixture.js'])+';');
  execFileSync(process.execPath,[path.join(temp,'scripts/build-assistant-v2-corpus.js')],{stdio:'pipe'});
  const fresh=JSON.parse(fs.readFileSync(path.join(temp,'assistant-v2/corpus.json'),'utf8'));
  assert.equal(fresh.cardCount,exported.cardCount+1);assert(fresh.cards.some(c=>c.id===fixture.id));assert.notEqual(fresh.fingerprint,exported.fingerprint);
  s.MACA_CANONICAL_CORPUS=[...s.MACA_CANONICAL_CORPUS,fixture];assert.equal(s.MACA_SEARCH_V2.rank('zeflorium')[0].q.id,fixture.id);
}finally{fs.rmSync(temp,{recursive:true,force:true});}
console.log(JSON.stringify({ok:true,cards:exported.cardCount,regression:report.total,newValidatedFixture:true}));
