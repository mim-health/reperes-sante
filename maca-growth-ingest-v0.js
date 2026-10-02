/* MACA Growth Engine V0 — privacy-safe manual ingestion helpers. */
(function(global){"use strict";
function cleanQuestion(value){
 let q=String(value||"").trim().replace(/\s+/g," ");
 q=q.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/ig,"[email]");
 q=q.replace(/(?:\+33|0)[1-9](?:[ .-]?\d{2}){4}/g,"[telephone]");
 q=q.replace(/https?:\/\/\S+/ig,"[url]");
 return q.slice(0,600);
}
function fromLines(text,source){
 return String(text||"").split(/\n+/).map(cleanQuestion).filter(q=>q.length>=8).map(question=>({source:source||"manual-public",question,detectedAt:new Date().toISOString(),intent:25,macaFit:25,corpusFit:20,distributionFit:15}));
}
global.MACAGrowthIngestV0=Object.freeze({cleanQuestion,fromLines});
})(typeof window!=="undefined"?window:globalThis);