/* MACA Santé — P0 retrieval fix 02/09/2026.
 * Restores the obvious generic fatigue intent while preserving explicit population routing
 * and the existing abstention behavior for unrelated generic terms.
 */
(function(root){
  'use strict';
  const base=root.MACA_SEARCH_V2;
  if(!base||typeof base.resolve!=='function'||typeof base.rank!=='function')throw new Error('MACA_SEARCH_V2 required before fatigue fix');
  const baseResolve=base.resolve.bind(base),baseRank=base.rank.bind(base);
  function norm(v){return base.normalize?base.normalize(v):String(v||'').toLowerCase();}
  function isGenericFatigue(query){
    const q=' '+norm(query)+' ';
    if(/\b(enfant|bebe|nourrisson|ado|adolescent|fils|fille|rentree|ecole|cours)\b/.test(q))return false;
    return /\b(fatigue|fatiguee|fatigues|epuise|epuisee|epuisement)\b/.test(q)&&!(/\b(cancer|traitement cancer|cortisol|burn out|burnout)\b/.test(q));
  }
  function target(){
    const corpus=Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:(Array.isArray(root.healthQuestions)?root.healthQuestions:[]);
    return corpus.find(q=>q&&q.id==='fatigue-causes')||null;
  }
  function resolve(query,options={}){
    const first=baseResolve(query,options);
    if(first&&first.status==='match')return first;
    if(first&&/^abstain:/.test(first.reason||''))return first;
    if(!isGenericFatigue(query))return first;
    const q=target();if(!q)return first;
    return {status:'match',reason:'p0-fatigue-anchor',matches:[{intentKey:'fatigue-general',id:q.id,score:1180,confidence:'high',matchedAlias:norm(query),matchType:'p0-anchor'}],context:first&&first.context||[]};
  }
  function rank(query,options={}){
    const r=resolve(query,options);
    if(!r||r.status!=='match'||r.reason!=='p0-fatigue-anchor')return baseRank(query,options);
    const q=target();if(!q)return [];
    const corpus=Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:(root.healthQuestions||[]);
    return [{q,index:corpus.findIndex(x=>x&&x.id===q.id),score:1180,coverage:1,directCoverage:1,confidence:'high',intentKey:'fatigue-general',matchedAlias:norm(query)}];
  }
  root.MACA_SEARCH_V2={...base,version:'2026-09-02-p0-fatigue1',resolve,rank};
})(typeof window!=='undefined'?window:globalThis);
