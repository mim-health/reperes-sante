/* MACA Santé — strict metadata fallback for Search/Assistant V2.
 * Runs after MACA_SEARCH_V2. Uses canonical title/question + keywords only.
 * Never scores answer/watch/source content. Explicit P0 abstention and ambiguity remain authoritative,
 * except that an exact canonical title of a routable fiche is always addressable.
 */
(function(root){
  'use strict';
  const base=root.MACA_SEARCH_V2;
  if(!base||typeof base.resolve!=='function'||typeof base.rank!=='function')throw new Error('MACA_SEARCH_V2 required before corpus fallback');

  const baseResolve=base.resolve.bind(base);
  const STOPWORDS=new Set(['a','ai','au','aux','avec','ce','ces','dans','de','des','du','elle','en','est','et','fait','faire','faut','il','je','j','la','le','les','ma','mais','me','mes','mon','ne','nous','on','ou','par','pas','pour','que','quel','quelle','quels','quelles','qui','sa','se','ses','son','sur','un','une','vous','votre','depuis','quand','comment','pourquoi','peut','peux','dois','doit','jai','cest','estce','avoir','chez']);
  const GENERIC_SINGLE=new Set(['douleur','mal','fatigue','malaise','sang','bouton','boutons','traitement','symptome','symptomes','adulte','enfant','femme','homme','senior','sante']);
  const ANCHORS=[
    {terms:['vaccin','vaccins','vaccination'],id:'vaccins-adulte'},
    {terms:['tension','hypertension','hta'],id:'hta'},
    {terms:['avc','accident vasculaire cerebral'],id:'avc-signes-risque-apres-50'}
  ];

  function norm(value){return base.normalize?base.normalize(value):String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/œ/g,'oe').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();}
  function words(value){return norm(value).split(' ').filter(w=>w.length>1&&!STOPWORDS.has(w));}
  function stem(value){return value.length>=5?value.replace(/(es|s)$/,''):value;}
  function tokenEq(a,b){return a===b||stem(a)===stem(b);}
  function sameWordSet(a,b){return a.length===b.length&&a.every(x=>b.some(y=>tokenEq(x,y)))&&b.every(x=>a.some(y=>tokenEq(x,y)));}
  function corpus(){return Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:(Array.isArray(root.healthQuestions)?root.healthQuestions:[]);}
  function excludedIds(){return new Set((root.MACA_V2_REFERENTIAL_P0&&root.MACA_V2_REFERENTIAL_P0.excludedIds)||[]);}
  function keywordText(q){return Array.isArray(q&&q.keywords)?q.keywords.join(' '):String(q&&q.keywords||'');}
  function titleText(q){return String(q&&(q.title||q.question)||'');}
  function contextAllows(q,ctx){
    const title=norm(titleText(q));
    const explicitlyBaby=/\b(bebe|nourrisson)\b/.test(title);
    const explicitlyChild=/\b(enfant|chez l enfant|mon enfant)\b/.test(title);
    const explicitlyAdolescent=/\b(ado|adolescent|adolescente)\b/.test(title);
    if(explicitlyBaby&&!(ctx.has('baby')||ctx.has('child')))return false;
    if(explicitlyChild&&!(ctx.has('baby')||ctx.has('child')||ctx.has('adolescent')))return false;
    if(explicitlyAdolescent&&ctx.size&&!(ctx.has('adolescent')||ctx.has('child')))return false;
    return true;
  }
  function resultFor(q,ctx,reason,score,matchedAlias,matchType){
    return {status:'match',reason,matches:[{intentKey:`canonical:${q.id}`,id:q.id,score,confidence:'high',matchedAlias:matchedAlias||null,matchType}],context:[...ctx]};
  }
  function exactTitleResolve(query,options={}){
    const nq=norm(query);if(!nq)return null;
    const ctx=base.detectContext?base.detectContext(query,options):new Set();
    const excluded=excludedIds();
    const matches=corpus().filter(q=>q&&q.id&&!excluded.has(q.id)&&norm(titleText(q))===nq);
    if(matches.length!==1)return null;
    return resultFor(matches[0],ctx,'canonical-title-exact',1400,nq,'canonical-title-exact');
  }
  function anchorMatch(query,map,ctx){
    const nq=norm(query),qWords=words(query);
    for(const anchor of ANCHORS){
      const exact=anchor.terms.some(t=>nq===norm(t));
      const single=qWords.length===1&&anchor.terms.some(t=>tokenEq(qWords[0],words(t)[0]||''));
      if(!exact&&!single)continue;
      const found=map.get(anchor.id);if(!found||!contextAllows(found.q,ctx))continue;
      return resultFor(found.q,ctx,'canonical-anchor',1120,nq,'canonical-anchor');
    }
    return null;
  }
  function metadataResolve(query,options={}){
    const qWords=words(query);if(!qWords.length)return null;
    const ctx=base.detectContext?base.detectContext(query,options):new Set();
    const excluded=excludedIds();
    const items=corpus(),map=new Map(items.filter(q=>q&&q.id&&!excluded.has(q.id)).map((q,index)=>[q.id,{q,index}]));
    const anchored=anchorMatch(query,map,ctx);if(anchored)return anchored;
    if(qWords.length===1&&GENERIC_SINGLE.has(qWords[0]))return null;

    const candidates=[];
    for(let index=0;index<items.length;index++){
      const q=items[index];if(!q||!q.id||excluded.has(q.id)||!contextAllows(q,ctx))continue;
      const title=titleText(q),keys=keywordText(q);
      const titleWords=words(title),keyWords=words(keys),metaWords=[...new Set([...titleWords,...keyWords])];
      if(!metaWords.length)continue;
      const matched=qWords.filter(qw=>metaWords.some(mw=>tokenEq(qw,mw)));
      if(matched.length!==qWords.length)continue;
      const titleHits=qWords.filter(qw=>titleWords.some(tw=>tokenEq(qw,tw))).length;
      const keywordHits=qWords.filter(qw=>keyWords.some(kw=>tokenEq(qw,kw))).length;
      const significantTitleExact=sameWordSet(qWords,titleWords);
      let score=760+(qWords.length*55)+(titleHits*55)+(keywordHits*10);
      const nq=norm(query),nt=norm(title);
      if(nq&&nt===nq)score=1390;
      else if(significantTitleExact)score=1360;
      else if(nq.length>=4&&nt.includes(nq))score+=170;
      if(qWords.length===1)score=titleHits?1080:840;
      candidates.push({q,index,score,titleHits,keywordHits,significantTitleExact});
    }
    candidates.sort((a,b)=>b.score-a.score||Number(b.significantTitleExact)-Number(a.significantTitleExact)||b.titleHits-a.titleHits||b.keywordHits-a.keywordHits||a.index-b.index);
    if(!candidates.length)return null;
    const top=candidates[0],second=candidates[1];
    const exactSpecificityWins=Boolean(top.significantTitleExact&&(!second||!second.significantTitleExact));
    if(second&&!exactSpecificityWins&&(top.score-second.score<150||second.score/top.score>0.88))return null;
    return {status:'match',reason:'canonical-metadata',matches:[{intentKey:`canonical:${top.q.id}`,id:top.q.id,score:Math.round(top.score),confidence:top.score>=1000?'high':'medium',matchedAlias:norm(query),matchType:top.significantTitleExact?'canonical-title-significant':'canonical-metadata'}],context:[...ctx]};
  }
  function isExplicitAbstention(result){return result&&(/^abstain:/.test(result.reason||'')||result.reason==='empty-query');}
  function mayOverrideBase(metadata,query){
    if(!metadata||metadata.status!=='match'||metadata.reason!=='canonical-metadata')return false;
    const m=metadata.matches&&metadata.matches[0];
    if(!m)return false;
    const qWords=words(query);
    return qWords.length>=3&&m.score>=1080;
  }

  function resolve(query,options={}){
    const exact=exactTitleResolve(query,options);
    if(exact)return exact;
    const first=baseResolve(query,options);
    if(isExplicitAbstention(first))return first;
    const metadata=metadataResolve(query,options);
    if(first&&first.status==='match'){
      if(mayOverrideBase(metadata,query))return metadata;
      return first;
    }
    if(first&&first.reason==='ambiguous')return metadata&&mayOverrideBase(metadata,query)?metadata:first;
    return metadata||first;
  }
  function rank(query,options={}){
    const resolved=resolve(query,options);if(!resolved||resolved.status!=='match')return [];
    const map=new Map(corpus().map((q,index)=>[q.id,{q,index}]));
    return resolved.matches.map(m=>{const found=map.get(m.id);return found?{q:found.q,index:found.index,score:m.score,coverage:1,directCoverage:1,confidence:m.confidence,intentKey:m.intentKey,matchedAlias:m.matchedAlias}:null;}).filter(Boolean);
  }

  root.MACA_SEARCH_V2={...base,version:'2026-09-01-p0-corpus4',resolve,rank};
})(typeof window!=='undefined'?window:globalThis);
