/* MACA Assistant V1.5 — LAB ONLY. Never wired to production pages. */
(function(root){
  'use strict';
  const base=root.MACA_SEARCH_V2;
  if(!base)throw new Error('MACA_SEARCH_V2 required');
  const norm=base.normalize||function(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();};
  const corpus=()=>Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:[];
  const byId=id=>corpus().find(q=>q&&q.id===id)||null;
  const baseResolve=base.resolve.bind(base);
  function direct(id,intentKey,query,reason){const q=byId(id);if(!q)return null;return {status:'match',reason,matches:[{intentKey,id,score:1180,confidence:'high',matchedAlias:norm(query),matchType:'v15-targeted-language'}],context:[]};}
  function safetyAbstain(query){const q=norm(query);return /\b(quel|quelle|quels|quelles)\b.*\bantibiotique/.test(q)&&!/(gorge|angine|trod)/.test(q);}
  function targeted(query){
    const q=norm(query);
    if(/\b(estomac|ventre)\b/.test(q)&&/\b(brule|brulure|brulures)\b/.test(q)&&/\b(remonte|remontee|remontees|acide)\b/.test(q))return direct('reflux-adulte','reflux',query,'v15-reflux-language');
    if(/\b(brule|brulure|brulures)\b/.test(q)&&(/\bpipi\b/.test(q)||/\b(urin|urine|uriner|urinant)\b/.test(q)))return direct('maca-cystite-reperes','cystitis',query,'v15-cystitis-colloquial');
    if(/\bimmunotherapie\b/.test(q)&&/\bcancer\b/.test(q))return direct('cancer-immunotherapie-comment-ca-marche','cancer-immunotherapy',query,'v15-cancer-immunotherapy-language');
    if(/\bvarice|varices\b/.test(q)&&/\bcontention|compression|bas\b/.test(q))return direct('varices-contention-disparaitre','varices-compression',query,'v15-varices-compression-language');
    return null;
  }
  function resolve(query,options={}){if(safetyAbstain(query))return {status:'none',reason:'v15-safety-generic-antibiotic',matches:[],context:[]};return targeted(query)||baseResolve(query,options);}
  function rank(query,options={}){const r=resolve(query,options);if(!r||r.status!=='match')return [];const map=new Map(corpus().map((q,index)=>[q.id,{q,index}]));return r.matches.map(m=>{const f=map.get(m.id);return f?{q:f.q,index:f.index,score:m.score,coverage:1,directCoverage:1,confidence:m.confidence,intentKey:m.intentKey,matchedAlias:m.matchedAlias}:null;}).filter(Boolean);}
  const complementRules=[
    {when:/\b(remontee|remontees|reflux|rgo|acide|acides)\b/,primary:'reflux-adulte',ids:['douleur-abdominale']},
    {when:/\b(mal|maux|douleur)\b.*\b(tete)\b/,primary:'maux-tete',ids:['migraine-que-faire']},
    {when:/\b(bourdonnement|bourdonnements|acouphene|acouphenes)\b.*\b(vertige|vertiges|tourne)\b|\b(vertige|vertiges|tourne)\b.*\b(bourdonnement|bourdonnements|acouphene|acouphenes)\b/,primary:'acouphenes-adulte',ids:['vertiges-causes']}
  ];
  function select(query,options={}){
    const primary=rank(query,options)[0]||null;if(!primary)return {primary:null,complements:[],reason:'no-primary'};
    const q=norm(query);const rule=complementRules.find(r=>r.primary===primary.q.id&&r.when.test(q));
    if(!rule)return {primary,complements:[],reason:'primary-only'};
    const complements=rule.ids.map(byId).filter(Boolean).filter(x=>x.id!==primary.q.id).slice(0,2);
    return {primary,complements,reason:complements.length?'v15-explicit-complements':'primary-only'};
  }
  root.MACA_SEARCH_V15_LAB={...base,version:String(base.version||'')+'-v15lab3',resolve,rank,select};
})(typeof window!=='undefined'?window:globalThis);
