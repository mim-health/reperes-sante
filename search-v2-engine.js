/* MACA Santé — Search/Assistant V2 deterministic referential engine. No answer-body scoring. */
(function(root){
  'use strict';
  const ref = root.MACA_V2_REFERENTIAL_P0;
  if(!ref) throw new Error('MACA V2 referential missing');

  const STOPWORDS = new Set(['a','ai','au','aux','avec','ce','ces','dans','de','des','du','elle','en','est','et','fait','faire','faut','il','je','j','la','le','les','ma','mais','me','mes','mon','ne','nous','on','ou','par','pas','pour','que','quel','quelle','qui','sa','se','ses','son','sur','un','une','vous','votre','depuis','quand','comment','pourquoi','peut','peux','dois','doit','jai','cest','estce','avoir','chez']);
  function norm(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/œ/g,'oe').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();}
  function tokens(value){return norm(value).split(' ').filter(w=>w.length>1&&!STOPWORDS.has(w));}
  function phraseIn(text,phrase){const t=` ${norm(text)} `,p=` ${norm(phrase)} `;return p.trim().length>0&&t.includes(p);}
  function editDistance(a,b){if(a===b)return 0;if(Math.abs(a.length-b.length)>1)return 2;const prev=Array.from({length:b.length+1},(_,i)=>i),cur=new Array(b.length+1);for(let i=1;i<=a.length;i++){cur[0]=i;let rowMin=i;for(let j=1;j<=b.length;j++){cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));rowMin=Math.min(rowMin,cur[j]);}if(rowMin>1)return 2;for(let j=0;j<=b.length;j++)prev[j]=cur[j];}return prev[b.length];}
  function tokenEq(a,b){if(a===b)return true;if(a.length>=7&&b.length>=7&&editDistance(a,b)<=1)return true;const strip=x=>x.length>=5?x.replace(/(es|s)$/,''):x;return strip(a)===strip(b);}
  function phraseCoverage(query,phrase){const q=tokens(query),p=tokens(phrase);if(!q.length||!p.length)return 0;let hits=0;for(const pt of p){if(q.some(qt=>tokenEq(qt,pt)))hits++;}return hits/p.length;}
  function detectContext(query,options={}){
    const q=norm(query),ctx=new Set();
    const population=norm(options.population||'');
    if(population)ctx.add(population);
    if(/\b(bebe|nourrisson)\b/.test(q))ctx.add('baby');
    if(/\b(enfant|mon fils|ma fille|chez l enfant)\b/.test(q))ctx.add('child');
    if(/\b(ado|adolescent|adolescente)\b/.test(q))ctx.add('adolescent');
    if(/\b(femme|chez la femme)\b/.test(q))ctx.add('female');
    if(/\b(homme|chez l homme)\b/.test(q))ctx.add('male');
    if(/\b(adulte|chez l adulte)\b/.test(q))ctx.add('adult');
    if(/\b(senior|personne agee|apres 60 ans|apres 65 ans)\b/.test(q))ctx.add('senior');
    return ctx;
  }
  function hasPopulation(ctx,list){return (list||[]).some(p=>ctx.has(p)||(p==='child'&&ctx.has('baby'))||(p==='child'&&ctx.has('adolescent')));}
  function noResultRule(query,ctx){for(const rule of ref.abstainRules||[]){if(rule.unlessPopulation&&hasPopulation(ctx,rule.unlessPopulation))continue;if((rule.phrases||[]).some(p=>phraseIn(query,p)))return rule;}return null;}
  function anyPhrase(query,list){return (list||[]).some(p=>phraseIn(query,p));}
  function bestAliasScore(query,aliases){let best=0,bestAlias=null,bestType=null;for(const alias of aliases||[]){const nq=norm(query),na=norm(alias);let score=0,type=null;if(nq===na){score=1200+Math.min(100,na.length);type='exact';}else if(phraseIn(query,alias)){score=1000+Math.min(80,na.length);type='phrase';}else{const coverage=phraseCoverage(query,alias),pTokens=tokens(alias);if(pTokens.length===1&&coverage===1){score=780;type='token';}else if(pTokens.length>=2&&coverage===1){score=760+Math.min(60,pTokens.length*10);type='coverage-full';}else if(pTokens.length>=3&&coverage>=0.75){score=640+Math.round(coverage*80);type='coverage';}}if(score>best){best=score;bestAlias=alias;bestType=type;}}return {score:best,alias:bestAlias,type:bestType};}
  function intentScore(intent,query,ctx){
    if(intent.requirePopulation&&!hasPopulation(ctx,intent.requirePopulation))return {score:0,excluded:'population-required'};
    if(intent.excludePopulations&&hasPopulation(ctx,intent.excludePopulations))return {score:0,excluded:'population-excluded'};
    const positive=bestAliasScore(query,intent.aliases);
    const association=bestAliasScore(query,intent.associationAliases);
    const hasPositive=positive.score>0;
    if(intent.requiredAny&&!anyPhrase(query,intent.requiredAny)&&!((intent.aliases||[]).some(a=>norm(query)===norm(a))))return {score:0,excluded:'required-context'};
    if(intent.hardVeto&&anyPhrase(query,intent.hardVeto))return {score:0,excluded:'hard-veto'};
    if(intent.hardVetoUnlessPositive&&anyPhrase(query,intent.hardVetoUnlessPositive)&&!hasPositive)return {score:0,excluded:'soft-veto'};
    let score=Math.max(positive.score,association.score?association.score-260:0);
    if(!score)return {score:0};
    if(intent.preferIf&&anyPhrase(query,intent.preferIf))score+=100;
    return {score,alias:positive.score>=association.score?positive.alias:association.alias,matchType:positive.score>=association.score?positive.type:'association'};
  }
  function chooseTarget(intent,query){return intent.secondaryId&&anyPhrase(query,intent.secondaryTriggers)?intent.secondaryId:intent.primaryId;}
  function corpusMap(){const corpus=Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:(Array.isArray(root.healthQuestions)?root.healthQuestions:[]);return new Map(corpus.map((q,i)=>[q.id,{q,index:i}]));}
  function applyPreferOver(scored){const byKey=new Map(scored.map(x=>[x.intent.key,x]));for(const item of scored){for(const otherKey of item.intent.preferOver||[]){const other=byKey.get(otherKey);if(other&&item.score>0)other.score-=220;}}return scored;}
  function multiAllowed(a,b,query){
    if(!a||!b)return false;
    const allowA=(a.intent.allowMultiWith||[]).includes(b.intent.key),allowB=(b.intent.allowMultiWith||[]).includes(a.intent.key);
    if(!(allowA||allowB))return false;
    if((a.intent.key==='tinnitus'&&b.intent.key==='vertigo')||(a.intent.key==='vertigo'&&b.intent.key==='tinnitus'))return anyPhrase(query,ref.intents.find(x=>x.key==='tinnitus').aliases)&&anyPhrase(query,ref.intents.find(x=>x.key==='vertigo').aliases);
    if((a.intent.key==='abdominal-pain'&&b.intent.key==='reflux')||(a.intent.key==='reflux'&&b.intent.key==='abdominal-pain'))return a.score>=550&&b.score>=550;
    if((a.intent.key==='headache-general'&&b.intent.key==='migraine')||(a.intent.key==='migraine'&&b.intent.key==='headache-general'))return a.score>=500&&b.score>=500;
    if((a.intent.key==='unprotected-sex'&&b.intent.key==='emergency-contraception')||(a.intent.key==='emergency-contraception'&&b.intent.key==='unprotected-sex'))return a.score>=600&&b.score>=600;
    return false;
  }
  function resolve(query,options={}){
    const nq=norm(query);if(!nq)return {status:'none',reason:'empty-query',matches:[],context:[]};
    const ctx=detectContext(query,options);
    const abstain=noResultRule(query,ctx);if(abstain)return {status:'none',reason:`abstain:${abstain.key}`,matches:[],context:[...ctx]};
    let scored=ref.intents.map(intent=>({intent,...intentScore(intent,query,ctx)})).filter(x=>x.score>0);
    scored=applyPreferOver(scored).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.intent.key.localeCompare(b.intent.key));
    if(!scored.length||scored[0].score<620)return {status:'none',reason:'below-threshold',matches:[],context:[...ctx]};
    const top=scored[0],second=scored[1];
    const ambiguous=second&&second.score>=620&&!multiAllowed(top,second,query)&&(top.score-second.score<130||second.score/top.score>0.88);
    if(ambiguous)return {status:'none',reason:'ambiguous',matches:[],candidates:scored.slice(0,3).map(x=>({intentKey:x.intent.key,id:chooseTarget(x.intent,query),score:x.score})),context:[...ctx]};
    const selected=[top];if(second&&multiAllowed(top,second,query))selected.push(second);
    return {status:'match',reason:'validated-referential',matches:selected.map(x=>({intentKey:x.intent.key,id:chooseTarget(x.intent,query),score:Math.round(x.score),confidence:x.score>=1000?'high':'medium',matchedAlias:x.alias||null,matchType:x.matchType||null})),context:[...ctx]};
  }
  function rank(query,options={}){
    const resolved=resolve(query,options);if(resolved.status!=='match')return [];
    const map=corpusMap();return resolved.matches.map(m=>{const found=map.get(m.id);return found?{q:found.q,index:found.index,score:m.score,coverage:1,directCoverage:1,confidence:m.confidence,intentKey:m.intentKey,matchedAlias:m.matchedAlias}:null;}).filter(Boolean);
  }
  root.MACA_SEARCH_V2={version:ref.version,resolve,rank,normalize:norm,detectContext};
})(typeof window!=='undefined'?window:globalThis);
