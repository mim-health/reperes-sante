#!/usr/bin/env node
/* MACA Growth Engine V0 — daily digest builder.
   Input: JSON array at GROWTH_INPUT_PATH (default growth-input.json).
   Output: growth-digest-latest.json + growth-digest-latest.md.
   Intentionally does NOT scrape, publish, or persist author identity. */
const fs=require("fs");
const path=require("path");
const inputPath=process.env.GROWTH_INPUT_PATH||"growth-input.json";
const endpoint=process.env.MACA_ASSISTANT_ENDPOINT||"https://purple-voice-a8e3.dr-beddok.workers.dev/";
const limit=Math.max(1,Math.min(20,Number(process.env.GROWTH_LIMIT||10)));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const norm=s=>String(s||"").trim().replace(/\s+/g," ");
const fp=s=>norm(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g,"");
function infer(q,source){const question=/[?]|\b(comment|pourquoi|est-ce|peut-on|dois-je|normal|grave|risque|quand|combien)\b/i.test(q);const health=/\b(sante|medecin|traitement|cancer|douleur|fievre|sommeil|grossesse|bebe|enfant|vaccin|diabete|coeur|tension|medicament|fatigue|alimentation|allerg|asthme|bronch|depistage|menopause|alzheimer)\b/i.test(q);return{intent:question?25:15,macaFit:health?25:12,corpusFit:health?20:10,distributionFit:/reddit|forum|facebook-public/.test(source)?20:15}}
async function ask(question){const r=await fetch(endpoint,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({question})});const d=await r.json().catch(()=>({}));if(!r.ok)return{status:"RED",rawStatus:"http-"+r.status,cards:[]};const cards=Array.isArray(d.cards_used)?d.cards_used:[];if(d.status==="answer"&&d.answer&&cards.length)return{status:"GREEN",rawStatus:d.status,cards:cards.map(x=>({id:x.id||null,title:x.title||null}))};if(d.status==="answer")return{status:"RED",rawStatus:d.status,cards:[]};return{status:"GAP",rawStatus:d.status||"unknown",cards};}
(async()=>{if(!fs.existsSync(inputPath)){console.log("No growth input; writing empty digest.");fs.writeFileSync("growth-digest-latest.json","[]\n");fs.writeFileSync("growth-digest-latest.md","# MACA Growth — Digest\n\nAucune question fournie à cette exécution.\n");return}
const raw=JSON.parse(fs.readFileSync(inputPath,"utf8"));const seen=new Set();let items=[];
for(const x of raw){const question=norm(x.question).slice(0,600);const key=fp(question);if(!question||seen.has(key))continue;seen.add(key);const s=infer(question,String(x.source||"public-web"));const growthScore=s.intent+s.macaFit+s.corpusFit+s.distributionFit;items.push({source:x.source||"public-web",sourceUrl:x.sourceUrl||"",question,detectedAt:x.detectedAt||null,scores:s,growthScore});}
items.sort((a,b)=>b.growthScore-a.growthScore);items=items.slice(0,limit);
for(const item of items){item.macaTest=await ask(item.question);await sleep(1200)}
fs.writeFileSync("growth-digest-latest.json",JSON.stringify(items,null,2)+"\n");
const lines=["# MACA Growth — Digest","",`Généré: ${new Date().toISOString()} — ${items.length} opportunité(s).`,""];
items.forEach((x,i)=>{lines.push(`## ${i+1}. [${x.macaTest.status}] ${x.growthScore}/100`, "", x.question, "", `Source: ${x.source}${x.sourceUrl?" — "+x.sourceUrl:""}`, `Fiches MACA: ${x.macaTest.cards.map(c=>c.title||c.id).filter(Boolean).join(", ")||"aucune"}`, "")});
fs.writeFileSync("growth-digest-latest.md",lines.join("\n")+"\n");
})().catch(e=>{console.error(e);process.exit(1)});
