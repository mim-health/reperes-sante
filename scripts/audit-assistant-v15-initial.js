#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
function ctx(){
  const c={console,setTimeout,clearTimeout,setInterval,clearInterval,CustomEvent:function(){},MutationObserver:function(){this.observe=()=>{};}};
  c.window=c;c.globalThis=c;c.addEventListener=()=>{};c.document={readyState:'complete',body:null,getElementById:()=>null,querySelector:()=>null};
  return vm.createContext(c);
}
function run(c,p){vm.runInContext(read(p),c,{filename:p});}
function loadCurrent(){
  const m={window:{}};vm.runInNewContext(read('corpus-manifest.js'),m);
  const files=m.window.MACA_CORPUS_MANIFEST.map(x=>String(x).split('?')[0]);
  const c=ctx();files.forEach(f=>run(c,f));run(c,'corpus-canonicalizer.js');
  c.MACA_CANONICAL_CORPUS=Array.from(c.MACA_BUILD_CANONICAL_CORPUS());c.healthQuestions=c.MACA_CANONICAL_CORPUS.slice();
  ['search-v2-referential-p0.js','search-v2-engine.js','search-v2-corpus-fallback.js','search-v2-fatigue-fix.js','search-v2-harcelement-fix.js','search-v2-retrouvabilite-pilot-fix.js'].forEach(f=>run(c,f));
  return c;
}
const cases=[
 ['mal au ventre',['douleur-abdominale']],['j ai mal au ventre depuis ce matin',['douleur-abdominale']],['maux de ventre',['douleur-abdominale']],
 ['j ai des remontees acides',['reflux-adulte']],['rgo',['reflux-adulte']],['mon estomac me brule et ca remonte',['reflux-adulte']],
 ['j ai des crampes la nuit',['crampes-musculaires-causes']],['je perds beaucoup mes cheveux',['alopecie-causes-pelade-traitement']],
 ['mon enfant saigne du nez',['saignement-nez-enfant']],['je saigne du nez',['saignement-nez-adulte']],
 ['j ai les yeux rouges',['oeil-rouge-adulte']],['mon enfant a l oeil rouge',['oeil-rouge-enfant']],['j ai les yeux secs',['yeux-secs-larmes-artificielles']],
 ['mal au genou dans les escaliers',['douleur-genou-escaliers']],['douleur tendon d achille',['tendon-achille-repos-sport']],
 ['j ai des bourdonnements dans les oreilles',['acouphenes-adulte']],['j ai la tete qui tourne',['vertiges-causes','vertiges-adulte']],
 ['je dors mal',['insomnie-adulte']],['je n arrive plus a m endormir',['insomnie-adulte']],
 ['rapport sans preservatif',['rapport-non-protege-ist']],['pilule du lendemain',['contraception-urgence']],
 ['j ai une toux seche',['toux-seche-que-faire']],['je tousse depuis longtemps',['toux-prolongee-adulte']],['j ai mal a la gorge',['mal-gorge-adulte-antibiotiques']],
 ['je suis vite essouffle',['essoufflement-adulte']],['mon coeur s emballe',['palpitations-adulte','palpitations-quand-consulter']],
 ['ca brule quand je fais pipi',['brulures-urinaires-adulte']],['brulures quand j urine',['brulures-urinaires-adulte']],['infection urinaire',['brulures-urinaires-adulte']],
 ['j ai mal a la tete',['maux-tete']],['migraine avec aura',['migraine-que-faire','migraine-adulte']],
 ['une jambe gonflee',['jambe-gonflee-adulte']],['j ai les jambes lourdes',['jambes-lourdes-varices']],
 ['mon enfant tousse',['toux-enfant']],['mon bebe a de la fievre',['fievre-enfant']],['j ai de la fievre',['fievre-adulte-quand-sinquieter']],
 ['bouffees de chaleur menopause',['maca-menopause-bouffees']],['je suis en premenopause',['perimenopause-signes-quand-consulter']],
 ['diabete',['diabete-type-2-depistage-complications']],['diabete type 2',['diabete-type-2-depistage-complications']],['diabete chez un ado',['diabete-type-2-jeunes-adolescents']],
 ['harcelement scolaire',['harcelement-scolaire-signes-que-faire']],['mon enfant est harcele a l ecole',['harcelement-scolaire-signes-que-faire']],
 ['j ai du sang dans les urines',['sang-dans-urines-hematurie']],['je prends omeprazole depuis longtemps',['ipp-long-cours-omeprazole']],
 ['je veux savoir si j ai une appendicite',[]],['quelle dose de paracetamol pour moi',[]],['j ai mal a la poitrine depuis 10 minutes que dois je faire',[]],['quel antibiotique prendre pour une infection',[]],['est ce que ce bouton est un cancer',[]]
].map((x,i)=>({n:i+1,query:x[0],expected:x[1]}));
const c=loadCurrent();
function classify(tc,ids){
  if(tc.expected.length){if(ids.some(id=>tc.expected.includes(id)))return 'A';return ids.length?'B':'C';}
  return ids.length?'B':'D';
}
const rows=cases.map(tc=>{const resolved=c.MACA_SEARCH_V2.resolve(tc.query);const ranked=c.MACA_SEARCH_V2.rank(tc.query);const ids=ranked.map(x=>x.q&&x.q.id).filter(Boolean);return {...tc,class:classify(tc,ids),resultIds:ids,reason:resolved.reason||'',version:c.MACA_SEARCH_V2.version};});
const counts=rows.reduce((a,r)=>(a[r.class]=(a[r.class]||0)+1,a),{});
console.log(JSON.stringify({ok:true,engineVersion:c.MACA_SEARCH_V2.version,canonicalCount:c.MACA_CANONICAL_CORPUS.length,total:rows.length,counts,rows},null,2));
