#!/usr/bin/env node
/* MACA Growth Radar V0 — Reddit public listing collector.
   Reads public subreddit JSON listings only; stores no author/user identifiers. */
const fs=require("fs");
const subs=(process.env.GROWTH_SUBREDDITS||"ParentingFR,AskFrance").split(",").map(x=>x.trim()).filter(Boolean);
const limit=Math.max(5,Math.min(100,Number(process.env.GROWTH_REDDIT_LIMIT||50)));
const ua=process.env.GROWTH_USER_AGENT||"MACASante-GrowthRadar/0.1";
const health=/\b(sante|médecin|medecin|pédiatre|pediatre|traitement|cancer|douleur|fièvre|fievre|sommeil|grossesse|bébé|bebe|enfant|vaccin|diabète|diabete|coeur|tension|médicament|medicament|fatigue|alimentation|allerg|asthme|bronch|dépistage|depistage|ménopause|menopause|alzheimer|poids|reflux|rhume|crèche|creche|vitamine|fer)\b/i;
const looksQuestion=s=>/[?]|\b(comment|pourquoi|est-ce|est ce|peut-on|peut on|dois-je|dois je|normal|grave|risque|quand|combien|conseil|avis)\b/i.test(s);
(async()=>{
 const out=[];
 for(const sub of subs){
   const url=`https://www.reddit.com/r/${encodeURIComponent(sub)}/new.json?limit=${limit}&raw_json=1`;
   const r=await fetch(url,{headers:{"User-Agent":ua,"Accept":"application/json"}});
   if(!r.ok){console.error("Reddit",sub,r.status);continue}
   const d=await r.json(); const posts=d&&d.data&&Array.isArray(d.data.children)?d.data.children:[];
   for(const p of posts){const x=p.data||{};if(x.over_18||x.removed_by_category)continue;
     const text=(String(x.title||"")+" — "+String(x.selftext||"")).trim().slice(0,600);
     if(!health.test(text)||!looksQuestion(text))continue;
     out.push({source:"reddit-public:"+sub,sourceUrl:x.permalink?"https://www.reddit.com"+x.permalink:"",question:text,detectedAt:x.created_utc?new Date(x.created_utc*1000).toISOString():null});
   }
 }
 fs.writeFileSync("growth-input.json",JSON.stringify(out,null,2)+"\n");
 console.log(`Collected ${out.length} public health-question candidates.`);
})().catch(e=>{console.error(e);process.exit(1)});
