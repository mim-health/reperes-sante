(function (root) {
  'use strict';
  const clamp = (n, min, max) => Math.max(min, Math.min(max, Number(n) || 0));
  function scoreOpportunity(input) {
    const x = input || {};
    const demand = clamp(x.demand,0,100), freshness=clamp(x.freshness,0,100), corpusFit=clamp(x.corpusFit,0,100);
    const seoPotential=clamp(x.seoPotential,0,100), socialPotential=clamp(x.socialPotential,0,100), competitionEase=clamp(x.competitionEase,0,100);
    const score=Math.round(demand*.25+freshness*.15+corpusFit*.25+seoPotential*.15+socialPotential*.10+competitionEase*.10);
    let action='WATCH';
    if(x.coverage==='problem') action='FIX_PRODUCT';
    else if(x.coverage==='gap') action='EDITORIAL_GAP';
    else if(x.coverage==='match'&&score>=70) action='DISTRIBUTE_NOW';
    else if(x.coverage==='match'&&score>=50) action='TEST';
    return {score,action,components:{demand,freshness,corpusFit,seoPotential,socialPotential,competitionEase}};
  }
  const api={scoreOpportunity};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
  root.MACAGrowthOpportunityScore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
