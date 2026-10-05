#!/usr/bin/env node
/* MACA Growth Engine V0 — daily digest builder.
   Input: JSON array at GROWTH_INPUT_PATH (default growth-input.json).
   Output: growth-digest-latest.json + growth-digest-latest.md.
   Intentionally does NOT scrape, publish, or persist author identity. */
const fs=require("fs");
const {scoreOpportunity}=require("../growth-engine/opportunity-score.js");
const inputPath=process.env.GROWTH_INPUT_PATH||"growth-input.json";
const endpoint=process.env.MACA_ASSISTANT_ENDPOINT||"https://purple-voice-a8e3.dr-beddok.workers.dev/";
const limit=Math.max(1,Math.min(20,Number(process.env.GROWTH_LIMIT||10)));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const norm=s=>String(s||"").trim().replace(/\s+/g," ");
const fp=s=>norm(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g,"");

function infer(q,source){
  const question=/[?]|\b(comment|pourquoi|est-ce|peut-on|dois-je|normal|grave|risque|quand|combien)\b/i.test(q);
  const health=/\b(sante|medecin|traitement|cancer|douleur|fievre|sommeil|grossesse|bebe|enfant|vaccin|diabete|coeur|tension|medicament|fatigue|alimentation|allerg|asthme|bronch|depistage|menopause|alzheimer)\b/i.test(q.normalize("NFD").replace(/[\u0300-\u036f]/g,""));
  return{
    intent:question?25:15,
    macaFit:health?25:12,
    corpusFit:health?20:10,
    distributionFit:/reddit|forum|facebook-public/.test(source)?20:15
  };
}

function scoreItem(x,question){
  const hasOpportunityFields=["demand","freshness","corpusFit","seoPotential","socialPotential","competitionEase"]
    .every(k=>Number.isFinite(Number(x[k])));
  if(hasOpportunityFields){
    const s=scoreOpportunity(x);
    return {
      growthScore:s.score,
      scores:s.components,
      action:s.action,
      scoringModel:"opportunity-v0"
    };
  }
  const s=infer(question,String(x.source||"public-web"));
  return {
    growthScore:s.intent+s.macaFit+s.corpusFit+s.distributionFit,
    scores:s,
    action:"TEST",
    scoringModel:"question-v0"
  };
}

async function ask(question){
  const r=await fetch(endpoint,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({question})});
  const d=await r.json().catch(()=>({}));
  if(!r.ok)return{status:"RED",rawStatus:"http-"+r.status,cards:[]};
  const cards=Array.isArray(d.cards_used)?d.cards_used:[];
  if(d.status==="answer"&&d.answer&&cards.length)return{status:"GREEN",rawStatus:d.status,cards:cards.map(x=>({id:x.id||null,title:x.title||null}))};
  if(d.status==="answer")return{status:"RED",rawStatus:d.status,cards:[]};
  return{status:"GAP",rawStatus:d.status||"unknown",cards};
}

(async()=>{
  if(!fs.existsSync(inputPath)){
    console.error("No growth input:",inputPath);
    process.exit(2);
  }
  const raw=JSON.parse(fs.readFileSync(inputPath,"utf8"));
  if(!Array.isArray(raw)||!raw.length){
    console.error("Growth input is empty.");
    process.exit(3);
  }
  const seen=new Set();
  let items=[];
  for(const x of raw){
    const question=norm(x.question).slice(0,600);
    const key=fp(question);
    if(!question||seen.has(key))continue;
    seen.add(key);
    const scored=scoreItem(x,question);
    items.push({
      source:x.source||"public-web",
      sourceUrl:x.sourceUrl||"",
      question,
      detectedAt:x.detectedAt||null,
      gsc:x.gsc||undefined,
      scores:scored.scores,
      growthScore:scored.growthScore,
      action:scored.action,
      scoringModel:scored.scoringModel
    });
  }
  items.sort((a,b)=>b.growthScore-a.growthScore);
  items=items.slice(0,limit);
  if(!items.length){console.error("No usable growth opportunities after normalization.");process.exit(4)}
  for(const item of items){item.macaTest=await ask(item.question);await sleep(1200)}
  fs.writeFileSync("growth-digest-latest.json",JSON.stringify(items,null,2)+"\n");
  const lines=["# MACA Growth — Digest","",`Généré: ${new Date().toISOString()} — ${items.length} opportunité(s).`,""];
  items.forEach((x,i)=>{
    const g=x.gsc? `GSC: ${x.gsc.impressions} impressions · ${x.gsc.clicks} clics · CTR ${(Number(x.gsc.ctr||0)*100).toFixed(1)}% · position ${Number(x.gsc.position||0).toFixed(1)}` : null;
    lines.push(
      `## ${i+1}. [${x.macaTest.status}] ${x.growthScore}/100 — ${x.action}`,
      "",
      x.question,
      "",
      `Source: ${x.source}${x.sourceUrl?" — "+x.sourceUrl:""}`,
      ...(g?[g]:[]),
      `Fiches MACA: ${x.macaTest.cards.map(c=>c.title||c.id).filter(Boolean).join(", ")||"aucune"}`,
      ""
    );
  });
  fs.writeFileSync("growth-digest-latest.md",lines.join("\n")+"\n");
})().catch(e=>{console.error(e);process.exit(1)});
