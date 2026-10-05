'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');
const policy=require(path.join(root,'assistant-v2/patient-language-retrieval.js'));
const registry=JSON.parse(fs.readFileSync(path.join(root,'assistant-v2/patient-language-aliases.json'),'utf8'));
const suite=JSON.parse(fs.readFileSync(path.join(root,'assistant-v2/patient-language-regression-cases.json'),'utf8'));
const corpus=JSON.parse(fs.readFileSync(path.join(root,'assistant-v2/corpus.json'),'utf8'));
const cards=corpus.cards;

for(const test of suite.cases){
  const match=policy.selectValidatedLanguageMatch(test.question,cards,registry);
  assert(match,test.question);
  assert.equal(match.targetId,test.expectedId,test.question);
  assert(!(test.forbiddenIds||[]).includes(match.targetId),`Forbidden target selected: ${test.question}`);
}
for(const question of ['douleur au genou irm','migraine irm','saignement de nez enfant','quel protocole pour zeflorium']){
  const match=policy.selectValidatedLanguageMatch(question,cards,registry);
  assert(!match,question);
}
for(const entry of registry.entries)assert(cards.some(card=>card.id===entry.targetId),`Alias target absent: ${entry.targetId}`);
assert.equal(corpus.patientLanguageAliases.version,registry.version);
console.log(JSON.stringify({ok:true,total:suite.cases.length,negative:4,registryVersion:registry.version}));
