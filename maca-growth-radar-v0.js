/* MACA Growth Radar V0 — public-source feed adapter.
   Accepts structured public search results. No login, no private groups, no author data. */
(function(global){"use strict";
function reddit(result){
 if(!result) return null;
 const title=String(result.title||"").trim();
 const body=String(result.body||result.snippet||"").trim();
 const question=(title+(body?" — "+body:"")).slice(0,600);
 if(!question) return null;
 return {source:"reddit-public",sourceUrl:String(result.url||""),question,detectedAt:result.publishedAt||new Date().toISOString()};
}
function generic(result){
 if(!result) return null;
 const question=String(result.question||result.title||result.snippet||"").trim().slice(0,600);
 return question?{source:String(result.source||"public-web"),sourceUrl:String(result.url||""),question,detectedAt:result.publishedAt||new Date().toISOString()}:null;
}
function importResults(results,type){
 const fn=type==="reddit"?reddit:generic;
 return (results||[]).map(fn).filter(Boolean);
}
global.MACAGrowthRadarV0=Object.freeze({reddit,generic,importResults});
})(typeof window!=="undefined"?window:globalThis);