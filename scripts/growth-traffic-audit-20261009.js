#!/usr/bin/env node
/* MACA Growth Engine V0 — Google Search Console live fetcher.
   Uses the official Search Console API in read-only mode.
   Required env:
     GSC_SERVICE_ACCOUNT_JSON  full service-account JSON
     GSC_SITE_URL              exact Search Console property, e.g. sc-domain:macasante.fr
   Optional:
     GSC_DAYS                  lookback window, default 28
     GSC_ROW_LIMIT             max query rows, default 1000
     GSC_OUTPUT                output JSON, default growth-input.json
*/
const fs=require("fs");
const crypto=require("crypto");

const serviceRaw=process.env.GSC_SERVICE_ACCOUNT_JSON||"";
const siteUrl=process.env.GSC_SITE_URL||"";
const days=Math.max(3,Math.min(90,Number(process.env.GSC_DAYS||28)));
const rowLimit=Math.max(10,Math.min(25000,Number(process.env.GSC_ROW_LIMIT||1000)));
const output=process.env.GSC_OUTPUT||"growth-input.json";

if(!serviceRaw){console.error("Missing GSC_SERVICE_ACCOUNT_JSON");process.exit(2)}
if(!siteUrl){console.error("Missing GSC_SITE_URL");process.exit(2)}

let service;
try{service=JSON.parse(serviceRaw)}catch(e){console.error("Invalid GSC_SERVICE_ACCOUNT_JSON");process.exit(2)}
if(!service.client_email||!service.private_key){console.error("Service account JSON missing client_email/private_key");process.exit(2)}

const b64=x=>Buffer.from(typeof x==="string"?x:JSON.stringify(x)).toString("base64url");
const now=Math.floor(Date.now()/1000);
const header={alg:"RS256",typ:"JWT"};
const payload={
  iss:service.client_email,
  scope:"https://www.googleapis.com/auth/webmasters.readonly",
  aud:"https://oauth2.googleapis.com/token",
  iat:now,
  exp:now+3600
};
const unsigned=b64(header)+"."+b64(payload);
const signature=crypto.sign("RSA-SHA256",Buffer.from(unsigned),service.private_key).toString("base64url");
const assertion=unsigned+"."+signature;

const iso=d=>d.toISOString().slice(0,10);
const end=new Date();
end.setUTCDate(end.getUTCDate()-2); // Search Console data is not fully real-time.
const start=new Date(end);
start.setUTCDate(start.getUTCDate()-(days-1));

function scoreRow(row,maxImp){
  const q=String((row.keys&&row.keys[0])||"").trim();
  const clicks=Number(row.clicks||0), impressions=Number(row.impressions||0), position=Number(row.position||0), ctr=Number(row.ctr||0);
  const demand=Math.round(Math.min(100,25+75*Math.log1p(impressions)/Math.log1p(Math.max(1,maxImp))));
  const pos=position||100;
  const seoPotential=Math.round(pos>=8&&pos<=30?95:pos<8?65:pos<=50?75:45);
  return {
    source:"google-search-console",
    sourceUrl:"",
    question:q,
    detectedAt:new Date().toISOString(),
    gsc:{clicks,impressions,position,ctr},
    demand,
    freshness:90,
    seoPotential,
    socialPotential:20,
    competitionEase:Math.max(10,Math.round(100-Math.min(90,pos))),
    corpusFit:70,
    coverage:"match"
  };
}

(async()=>{
  const tokenRes=await fetch("https://oauth2.googleapis.com/token",{
    method:"POST",
    headers:{"content-type":"application/x-www-form-urlencoded"},
    body:new URLSearchParams({
      grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });
  const tokenJson=await tokenRes.json().catch(()=>({}));
  if(!tokenRes.ok||!tokenJson.access_token){
    console.error("GSC OAuth token request failed:",tokenRes.status,tokenJson.error||"unknown");
    process.exit(3);
  }

  const endpoint="https://www.googleapis.com/webmasters/v3/sites/"+encodeURIComponent(siteUrl)+"/searchAnalytics/query";
  const results={site:siteUrl,startDate:iso(start),endDate:iso(end)};
  for(const dimension of ["total","page"]){
    const r=await fetch(endpoint,{method:"POST",headers:{authorization:"Bearer "+tokenJson.access_token,"content-type":"application/json"},body:JSON.stringify({startDate:iso(start),endDate:iso(end),dimensions:dimension==="total"?[]:["page"],rowLimit:25000,dataState:"final",type:"web"})});
    const data=await r.json();
    if(!r.ok)throw new Error("GSC "+dimension+" HTTP "+r.status);
    results[dimension]=data.rows||[];
  }
  fs.writeFileSync("growth-traffic-audit.json",JSON.stringify(results,null,2));
  console.log("GSC_TRAFFIC_AUDIT="+JSON.stringify(results));

})().catch(e=>{console.error(e);process.exit(1)});
