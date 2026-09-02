/* MACA Santé — P0 retrieval fix 02/09/2026.
 * Generic fatigue is a broad discovery query: keep the validated fatigue card first,
 * then return other canonical cards whose title/keywords explicitly mention fatigue.
 * Population-specific child/adolescent cards remain gated by explicit context.
 */
(function(root){
  'use strict';
  const base=root.MACA_SEARCH_V2;
  if(!base||typeof base.resolve!=='function'||typeof base.rank!=='function')throw new Error('MACA_SEARCH_V2 required before fatigue fix');
  const baseResolve=base.resolve.bind(base),baseRank=base.rank.bind(base);
  function norm(v){return base.normalize?base.normalize(v):String(v||'').toLowerCase();}
  function corpus(){return Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:(Array.isArray(root.healthQuestions)?root.healthQuestions:[]);}
  function isGenericFatigue(query){
    const q=' '+norm(query)+' ';
    if(/\b(enfant|bebe|nourrisson|ado|adolescent|fils|fille|rentree|ecole|cours)\b/.test(q))return false;
    return /\b(fatigue|fatiguee|fatigues|epuise|epuisee|epuisement)\b/.test(q)&&!(/\b(cancer|traitement cancer|cortisol|burn out|burnout)\b/.test(q));
  }
  function target(){return corpus().find(q=>q&&q.id==='fatigue-causes')||null;}
  function fatigueCandidates(query){
    const items=corpus(), nq=norm(query), out=[];
    for(let index=0;index<items.length;index++){
      const q=items[index];if(!q||!q.id)continue;
      const title=norm(q.title||q.question||''), keys=norm(Array.isArray(q.keywords)?q.keywords.join(' '):(q.keywords||''));
      if(/\b(enfant|bebe|nourrisson|ado|adolescent|rentree|ecole|college)\b/.test(title+' '+keys))continue;
      const titleHit=/\b(fatigue|fatiguee|fatigues|epuise|epuisee|epuisement)\b/.test(title);
      const keyHit=/\b(fatigue|fatiguee|fatigues|epuise|epuisee|epuisement)\b/.test(keys);
      if(!titleHit&&!keyHit)continue;
      let score=titleHit?1060:760;
      if(q.id==='fatigue-causes')score=1180;
      if(/burn.?out|epuisement professionnel/.test(title)&&!/(travail|professionnel|burn)/.test(nq))score-=80;
      out.push({q,index,score,coverage:1,directCoverage:titleHit?1:0.7,confidence:titleHit?'high':'medium',intentKey:q.id==='fatigue-causes'?'fatigue-general':`fatigue-related:${q.id}`,matchedAlias:nq});
    }
    return out.sort((a,b)=>b.score-a.score||a.index-b.index).slice(0,10);
  }
  function resolve(query,options={}){
    const first=baseResolve(query,options);
    if(first&&/^abstain:/.test(first.reason||''))return first;
    if(!isGenericFatigue(query))return first;
    const ranked=fatigueCandidates(query);if(!ranked.length)return first;
    return {status:'match',reason:'p0-fatigue-broad',matches:ranked.map(r=>({intentKey:r.intentKey,id:r.q.id,score:r.score,confidence:r.confidence,matchedAlias:r.matchedAlias,matchType:r.q.id==='fatigue-causes'?'p0-anchor':'canonical-fatigue-related'})),context:first&&first.context||[]};
  }
  function rank(query,options={}){
    if(!isGenericFatigue(query))return baseRank(query,options);
    const r=resolve(query,options);
    if(!r||r.status!=='match'||r.reason!=='p0-fatigue-broad')return baseRank(query,options);
    return fatigueCandidates(query);
  }
  root.MACA_SEARCH_V2={...base,version:'2026-09-02-p0-fatigue2',resolve,rank};
})(typeof window!=='undefined'?window:globalThis);
