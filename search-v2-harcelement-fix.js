/* MACA Santé — bug pilote 03/09/2026 — retrieval harcèlement scolaire.
 * Correction ciblée : la fiche existe dans le corpus mais n'a pas d'intent P0.
 * Ne modifie ni le seuil global ni le scoring des autres requêtes.
 */
(function(root){
  'use strict';
  const base=root.MACA_SEARCH_V2;
  if(!base||typeof base.resolve!=='function'||typeof base.rank!=='function')throw new Error('MACA_SEARCH_V2 required before harcelement fix');
  const baseResolve=base.resolve.bind(base),baseRank=base.rank.bind(base);
  const TARGET_ID='harcelement-scolaire-signes-que-faire';
  function norm(v){return base.normalize?base.normalize(v):String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  function corpus(){return Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:(Array.isArray(root.healthQuestions)?root.healthQuestions:[]);}
  function isHarcelementQuery(query){
    const q=' '+norm(query)+' ';
    return /\b(harcelement|harcele|harcelee|harceler|cyberharcelement)\b/.test(q);
  }
  function target(){return corpus().find(q=>q&&q.id===TARGET_ID)||null;}
  function resolve(query,options={}){
    if(!isHarcelementQuery(query))return baseResolve(query,options);
    const q=target();if(!q)return {status:'none',reason:'harcelement-target-missing',matches:[],context:[]};
    return {status:'match',reason:'p0-harcelement-direct',matches:[{intentKey:'school-bullying',id:TARGET_ID,score:1180,confidence:'high',matchedAlias:norm(query),matchType:'direct-topic'}],context:[]};
  }
  function rank(query,options={}){
    if(!isHarcelementQuery(query))return baseRank(query,options);
    const q=target();if(!q)return [];
    const items=corpus(),index=items.findIndex(x=>x&&x.id===TARGET_ID);
    return [{q,index,score:1180,coverage:1,directCoverage:1,confidence:'high',intentKey:'school-bullying',matchedAlias:norm(query)}];
  }
  root.MACA_SEARCH_V2={...base,version:'2026-09-03-p0-harcelement1',resolve,rank};
})(typeof window!=='undefined'?window:globalThis);
