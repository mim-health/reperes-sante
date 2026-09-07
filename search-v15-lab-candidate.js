/* MACA Assistant V1.5 — LAB ONLY. Never wired to production pages. */
(function(root){
  'use strict';
  const base=root.MACA_SEARCH_V2;
  if(!base)throw new Error('MACA_SEARCH_V2 required');
  const norm=base.normalize||function(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();};
  const corpus=()=>Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:[];
  const byId=id=>corpus().find(q=>q&&q.id===id)||null;
  const baseResolve=base.resolve.bind(base),baseRank=base.rank.bind(base);
  function direct(id,intentKey,query,reason){const q=byId(id);if(!q)return null;return {status:'match',reason,matches:[{intentKey,id,score:1180,confidence:'high',matchedAlias:norm(query),matchType:'v15-targeted-language'}],context:[]};}
  function safetyAbstain(query){const q=norm(query);return /\b(quel|quelle|quels|quelles)\b.*\bantibiotique/.test(q)&&!/(gorge|angine|trod)/.test(q);}
  function targeted(query){
    const q=norm(query);
    if(/\b(estomac|ventre)\b/.test(q)&&/\b(brule|brulure|brulures)\b/.test(q)&&/\b(remonte|remontee|remontees|acide)\b/.test(q))return direct('reflux-adulte','reflux',query,'v15-reflux-language');
    if(/\b(brule|brulure|brulures)\b/.test(q)&&(/\b(pipi)\b/.test(q)||/\b(urin|urine|uriner|urinant)\b/.test(q)))return direct('maca-cystite-reperes','cystitis',query,'v15-cystitis-colloquial');
    return null;
  }
  function resolve(query,options={}){if(safetyAbstain(query))return {status:'none',reason:'v15-safety-generic-antibiotic',matches:[],context:[]};return targeted(query)||baseResolve(query,options);}
  function rank(query,options={}){const r=resolve(query,options);if(!r||r.status!=='match')return [];const map=new Map(corpus().map((q,index)=>[q.id,{q,index}]));return r.matches.map(m=>{const f=map.get(m.id);return f?{q:f.q,index:f.index,score:m.score,coverage:1,directCoverage:1,confidence:m.confidence,intentKey:m.intentKey,matchedAlias:m.matchedAlias}:null;}).filter(Boolean);}
  root.MACA_SEARCH_V15_LAB={...base,version:String(base.version||'')+'-v15lab1',resolve,rank};
})(typeof window!=='undefined'?window:globalThis);
