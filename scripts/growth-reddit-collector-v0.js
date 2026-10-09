#!/usr/bin/env node
/* MACA Growth Radar V0 — public Reddit question collector.
   Public listings only. Stores no author/user identifiers. Read-only requests only. */
const fs=require("fs");
const subs=(process.env.GROWTH_SUBREDDITS||"ParentingFR,AskFrance").split(",").map(x=>x.trim()).filter(Boolean);
const limit=Math.max(5,Math.min(100,Number(process.env.GROWTH_REDDIT_LIMIT||50)));
const ua=process.env.GROWTH_USER_AGENT||"MACASante-GrowthRadar/0.3";
const healthTerms=[
 "santé","sante","médecin","medecin","pédiatre","pediatre","traitement","cancer","douleur","fièvre","fievre","sommeil",
 "grossesse","bébé","bebe","enfant","vaccin","diabète","diabete","coeur","tension","médicament","medicament","fatigue",
 "alimentation","allerg","asthme","bronch","dépistage","depistage","ménopause","menopause","alzheimer","poids","reflux",
 "rhume","crèche","creche","vitamine","fer","constipation","diarrh","urine","uriner","règles","regles","cholestérol",
 "cholesterol","palpitation","vertige","migraine","mal de tête","mal de tete","infection","toux","eczéma","eczema"
];
const questionTerms=["comment","pourquoi","est-ce","est ce","peut-on","peut on","dois-je","dois je","normal","grave","risque","quand","combien","conseil","avis","que faire"];
const fold=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const looksHealth=s=>{const x=fold(s);return healthTerms.some(t=>x.includes(fold(t)))};
const looksQuestion=s=>{const x=fold(s);return s.includes("?")||questionTerms.some(t=>x.includes(fold(t)))};

async function fetchListing(sub){
  const encoded=encodeURIComponent(sub);
  const candidates=[
    `https://api.reddit.com/r/${encoded}/new?limit=${limit}&raw_json=1`,
    `https://www.reddit.com/r/${encoded}/new.json?limit=${limit}&raw_json=1`
  ];
  const errors=[];
  for(const url of candidates){
    try{
      const r=await fetch(url,{headers:{"User-Agent":ua,"Accept":"application/json"}});
      if(!r.ok){errors.push(`${new URL(url).host}:${r.status}`);continue}
      const d=await r.json();
      const posts=d&&d.data&&Array.isArray(d.data.children)?d.data.children:null;
      if(posts) return {posts,url};
      errors.push(`${new URL(url).host}:invalid-json-shape`);
    }catch(e){
      errors.push(`${new URL(url).host}:${e&&e.message?e.message:String(e)}`);
    }
  }
  throw new Error(`Reddit listing unavailable for r/${sub}: ${errors.join(", ")}`);
}

(async()=>{
 const out=[];
 let successfulListings=0;
 const failures=[];
 for(const sub of subs){
   try{
     const {posts}=await fetchListing(sub);
     successfulListings++;
     for(const p of posts){
       const x=p.data||{};
       if(x.over_18||x.removed_by_category)continue;
       const text=(String(x.title||"")+" — "+String(x.selftext||"")).trim().replace(/\s+/g," ").slice(0,600);
       if(!looksHealth(text)||!looksQuestion(text))continue;
       out.push({
         source:"reddit-public:"+sub,
         sourceUrl:x.permalink?"https://www.reddit.com"+x.permalink:"",
         question:text,
         detectedAt:x.created_utc?new Date(x.created_utc*1000).toISOString():null
       });
     }
   }catch(e){
     failures.push(String(e&&e.message?e.message:e));
   }
 }
 if(successfulListings===0){
   throw new Error("No Reddit listing could be read. "+failures.join(" | "));
 }
 fs.writeFileSync("growth-input.json",JSON.stringify(out,null,2)+"\n");
 console.log(`Collected ${out.length} public health-question candidates from ${successfulListings}/${subs.length} readable subreddit listings.`);
 if(failures.length) console.error("Partial Reddit read failures:",failures.join(" | "));
})().catch(e=>{console.error(e);process.exit(1)});
