#!/usr/bin/env node
/* MACA Growth Engine V0 — Search Console export adapter.
   Input: CSV export from Google Search Console (queries table).
   No health-question text is sent to Analytics. */
const fs=require("fs");
const input=process.env.GSC_EXPORT||"search-console-queries.csv";
const output=process.env.GROWTH_INPUT_PATH||"growth-input.json";
if(!fs.existsSync(input)){console.error("Missing Search Console export:",input);process.exit(2)}
const raw=fs.readFileSync(input,"utf8").replace(/^\uFEFF/,"");
const lines=raw.split(/\r?\n/).filter(Boolean);
function csv(line){const out=[];let s="",q=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'&&line[i+1]==='"'){s+='"';i++;}else if(c==='"')q=!q;else if(c===','&&!q){out.push(s);s="";}else s+=c}out.push(s);return out}
const head=csv(lines.shift()).map(x=>x.trim().toLowerCase());
const idx=(...names)=>names.map(n=>head.indexOf(n)).find(i=>i>=0);
const iq=idx("top queries","requêtes les plus fréquentes","query","requête"), ic=idx("clicks","clics"), ii=idx("impressions"), ip=idx("position");
if(iq<0||ii<0){console.error("Unsupported Search Console CSV headers:",head.join(", "));process.exit(3)}
const num=x=>Number(String(x||"0").replace(/\s/g,"").replace(",", "."))||0;
const rows=lines.map(csv).map(r=>({question:(r[iq]||"").trim(),clicks:ic>=0?num(r[ic]):0,impressions:num(r[ii]),position:ip>=0?num(r[ip]):0})).filter(x=>x.question&&x.impressions>0);
const maxImp=Math.max(1,...rows.map(x=>x.impressions));
const items=rows.map(x=>{
 const demand=Math.round(Math.min(100,25+75*Math.log1p(x.impressions)/Math.log1p(maxImp)));
 const pos=x.position||100;
 const seoPotential=Math.round(pos>=8&&pos<=30?95:pos<8?65:pos<=50?75:45);
 const ctr=x.impressions?x.clicks/x.impressions:0;
 return {source:"google-search-console",question:x.question,detectedAt:new Date().toISOString(),gsc:{clicks:x.clicks,impressions:x.impressions,position:x.position,ctr},demand,freshness:80,seoPotential,socialPotential:20,competitionEase:Math.max(10,Math.round(100-Math.min(90,pos))),corpusFit:70,coverage:"match"};
}).sort((a,b)=>(b.impressions*(b.seoPotential/100)*(1-b.gsc.ctr))-(a.impressions*(a.seoPotential/100)*(1-a.gsc.ctr)));
fs.writeFileSync(output,JSON.stringify(items,null,2)+"\n");
console.log(`Imported ${items.length} Search Console queries into ${output}`);
