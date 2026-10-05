'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');
const policy=require(path.join(root,'assistant-v2/patient-language-retrieval.js'));
const registry=JSON.parse(fs.readFileSync(path.join(root,'assistant-v2/patient-language-aliases.json'),'utf8'));
const corpus=JSON.parse(fs.readFileSync(path.join(root,'assistant-v2/corpus.json'),'utf8'));
const cards=corpus.cards;
const cases=[
  ['nycturie','nycturie-levers-nocturnes-uriner',1],
  ['se lever la nuit pour uriner','nycturie-levers-nocturnes-uriner',2],
  ['uriner plusieurs fois la nuit','nycturie-levers-nocturnes-uriner',2],
  ['sciatique IRM','sciatique-irm-quand',1],
  ['faut-il une IRM pour une sciatique ?','sciatique-irm-quand',2],
  ['saignement après ménopause','saignement-apres-menopause',1],
  ['pertes de sang après la ménopause','saignement-apres-menopause',2]
];
for(const [question,id,level] of cases){
  const match=policy.selectValidatedLanguageMatch(question,cards,registry);
  assert(match,question);assert.equal(match.targetId,id,question);assert.equal(match.level,level,question);
}
for(const question of ['douleur au genou irm','migraine irm','saignement de nez enfant','quel protocole pour zeflorium']){
  const match=policy.selectValidatedLanguageMatch(question,cards,registry);
  assert(!match,question);
}
for(const entry of registry.entries)assert(cards.some(card=>card.id===entry.targetId),`Alias target absent: ${entry.targetId}`);
assert.equal(corpus.patientLanguageAliases.version,registry.version);
console.log(JSON.stringify({ok:true,total:cases.length,negative:4,registryVersion:registry.version}));
