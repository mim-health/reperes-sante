#!/usr/bin/env node
'use strict';
// Read-only Search Console snapshot. Site totals are queried independently:
// query/page tables omit anonymised queries and must never be summed as totals.
const fs=require('node:fs');
const crypto=require('node:crypto');

function windowDates(endDate,days,offset=0){
  const end=new Date(endDate+'T00:00:00Z');end.setUTCDate(end.getUTCDate()-offset);
  const start=new Date(end);start.setUTCDate(start.getUTCDate()-days+1);
  return {startDate:start.toISOString().slice(0,10),endDate:end.toISOString().slice(0,10)};
}
function metrics(row={}){
  return {clicks:Number(row.clicks||0),impressions:Number(row.impressions||0),ctr:Number(row.ctr||0),position:Number(row.position||0)};
}
function compare(current,previous){
  const delta={};
  for(const key of ['clicks','impressions'])delta[key]={absolute:current[key]-previous[key],percent:previous[key]?(current[key]/previous[key]-1)*100:null};
  delta.ctrPoints=(current.ctr-previous.ctr)*100;
  delta.position=current.impressions&&previous.impressions?current.position-previous.position:null;
  return delta;
}
function md(report){
  const fmt=n=>Number(n).toLocaleString('fr-FR',{maximumFractionDigits:1});
  const change=n=>n===null?'base précédente nulle':`${n>=0?'+':''}${fmt(n)} %`;
  const lines=['# MACASANTÉ — Audience Google',`Généré : ${report.generatedAt}`,`Données finales demandées jusqu’au ${report.dataThrough}. Search Console n’est pas en temps réel.`,
    '', '**Périmètre : recherche Google Web uniquement. Ces clics ne sont ni des visiteurs uniques ni l’audience totale du site.**','',
    '| Période | Dates | Clics | Impressions | CTR | Position | Évolution clics |',
    '|---|---|---:|---:|---:|---:|---|'];
  for(const name of ['recent7','previous7','recent28','previous28']){
    const x=report.periods[name];const d=name==='recent7'?report.comparisons.week:name==='recent28'?report.comparisons.month:null;
    lines.push(`| ${name} | ${x.startDate} → ${x.endDate} | ${fmt(x.clicks)} | ${fmt(x.impressions)} | ${fmt(x.ctr*100)} % | ${x.impressions?fmt(x.position):'—'} | ${d?change(d.clicks.percent):'—'} |`);
  }
  lines.push('','## Requêtes et pages à examiner','',
    'Classement indicatif : impressions, position et CTR. Les petits volumes restent exploratoires.',
    '', '| Requête | Page | Clics | Impressions | CTR | Position |','|---|---|---:|---:|---:|---:|');
  const safe=s=>String(s).replace(/\|/g,'/').replace(/[\r\n]/g,' ');
  for(const x of report.opportunities.slice(0,20))lines.push(`| ${safe(x.query)} | ${safe(x.page)} | ${x.clicks} | ${x.impressions} | ${fmt(x.ctr*100)} % | ${fmt(x.position)} |`);
  lines.push('',`Tables détaillées : ${report.queryPages.length} couples requête/page ; ${report.pages.length} pages.`,
    'Les totaux du tableau principal proviennent de requêtes globales distinctes, pas de la somme des requêtes visibles.',
    'Aucun nouvel outil de suivi des internautes n’est ajouté au site.');
  if(report.truncated)lines.push('ATTENTION : au moins une table atteint la limite de collecte ; elle peut être incomplète.');
  return lines.join('\n')+'\n';
}
async function collect({service,siteUrl,fetchImpl=fetch,now=new Date()}){
  if(!service?.client_email||!service?.private_key)throw new Error('Compte de service GSC incomplet');
  const unix=Math.floor(now.getTime()/1000),b64=x=>Buffer.from(JSON.stringify(x)).toString('base64url');
  const unsigned=b64({alg:'RS256',typ:'JWT'})+'.'+b64({iss:service.client_email,scope:'https://www.googleapis.com/auth/webmasters.readonly',aud:'https://oauth2.googleapis.com/token',iat:unix,exp:unix+3600});
  const assertion=unsigned+'.'+crypto.sign('RSA-SHA256',Buffer.from(unsigned),service.private_key).toString('base64url');
  const tokenRes=await fetchImpl('https://oauth2.googleapis.com/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion}),signal:AbortSignal.timeout(30000)});
  const token=await tokenRes.json();if(!tokenRes.ok||!token.access_token)throw new Error(`GSC OAuth HTTP ${tokenRes.status}`);
  const query=async body=>{
    const r=await fetchImpl('https://www.googleapis.com/webmasters/v3/sites/'+encodeURIComponent(siteUrl)+'/searchAnalytics/query',{method:'POST',headers:{authorization:'Bearer '+token.access_token,'content-type':'application/json'},body:JSON.stringify({type:'web',dataState:'final',...body}),signal:AbortSignal.timeout(45000)});
    if(!r.ok)throw new Error(`GSC Search Analytics HTTP ${r.status}`);
    return r.json();
  };
  // A conservative three-day delay avoids implying that yesterday's data is final.
  const end=new Date(now);end.setUTCDate(end.getUTCDate()-3);const dataThrough=end.toISOString().slice(0,10);
  const report={generatedAt:now.toISOString(),property:siteUrl,dataThrough,periods:{},comparisons:{},truncated:false};
  for(const [name,days,offset] of [['recent7',7,0],['previous7',7,7],['recent28',28,0],['previous28',28,28]]){
    const dates=windowDates(dataThrough,days,offset);
    const data=await query({...dates,aggregationType:'byProperty'});
    report.periods[name]={...dates,...metrics(data.rows?.[0])};
  }
  report.comparisons.week=compare(report.periods.recent7,report.periods.previous7);
  report.comparisons.month=compare(report.periods.recent28,report.periods.previous28);
  const range=windowDates(dataThrough,28);
  async function table(dimensions){
    const all=[];
    for(let startRow=0;startRow<25000;startRow+=1000){
      const data=await query({...range,dimensions,rowLimit:1000,startRow});
      const rows=data.rows||[];all.push(...rows);if(rows.length<1000)return all;
    }
    report.truncated=true;return all;
  }
  report.pages=(await table(['page'])).map(x=>({page:x.keys[0],...metrics(x)}));
  report.queryPages=(await table(['query','page'])).map(x=>({query:x.keys[0],page:x.keys[1],...metrics(x)}));
  report.daily=(await table(['date'])).map(x=>({date:x.keys[0],...metrics(x)}));
  report.opportunities=report.queryPages.map(x=>({...x,evidence:x.impressions<20?'exploratory':'observed',priority:x.impressions*(1-x.ctr)*(x.position>=5&&x.position<=30?2:1)})).sort((a,b)=>b.priority-a.priority);
  return report;
}
if(require.main===module)(async()=>{
  if(!process.env.GSC_SERVICE_ACCOUNT_JSON)throw new Error('GSC_SERVICE_ACCOUNT_JSON manquant');
  const report=await collect({service:JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON),siteUrl:process.env.GSC_SITE_URL||'sc-domain:macasante.fr'});
  fs.writeFileSync('audience-google-latest.json',JSON.stringify(report,null,2)+'\n');
  fs.writeFileSync('audience-google-latest.md',md(report));
  console.log(`Audience Google : ${report.periods.recent7.clicks} clics / ${report.periods.recent7.impressions} impressions sur 7 jours ; ${report.queryPages.length} couples requête/page.`);
})().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={windowDates,metrics,compare,md,collect};
