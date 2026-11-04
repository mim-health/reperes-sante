'use strict';
// P2 observational SEO link graph of the public sitemap; no content edits.
// Node 22. Intentionally informational: a linkless page is not automatically bad.
const fs=require('node:fs');
const BASE='https://macasante.fr';
const agent={'User-Agent':'MACASANTE-SEO-Link-Audit/1.0 (+https://macasante.fr/)'};
const htmlDecode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
async function get(u){const r=await fetch(u,{signal:AbortSignal.timeout(20000),headers:agent});if(!r.ok)throw new Error('HTTP '+r.status+' '+u);return r.text();}
function links(html,base){
 const out=[];
 for(const m of html.matchAll(/<a\b[^>]*\bhref\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)){
  try{const u=new URL(htmlDecode(m[1]||m[2]),base);if(u.origin!==BASE)continue;u.hash='';out.push(u);}catch{}
 }
 return out;
}
(async()=>{
 const sm=await get(BASE+'/sitemap.xml');
 const urls=[...sm.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(x=>htmlDecode(x[1].trim()));
 if(!urls.length)throw new Error('No sitemap entries');
 const set=new Set(urls), incoming=new Map(urls.map(u=>[u,new Set()])), missing=new Map(),dyn=new Map();
 const failed=[];let checked=0;
 const concurrency=12,workers=[];
 async function worker(start){
  for(let i=start;i<urls.length;i+=concurrency){
   const source=urls[i];let html;
   try{html=await get(source);}catch(e){failed.push({url:source,error:String(e.message)});continue;}
   checked++;
   for(const u of links(html,source)){
    const target=u.href,clean=target.split('?')[0];
    if(set.has(target)){if(target!==source)incoming.get(target).add(source);continue;}
    if(clean===BASE+'/fiche.html' && u.searchParams.has('id')){
      const id=u.searchParams.get('id');
      const canonical=BASE+'/fiches-seo/'+encodeURIComponent(id)+'.html';
      if(!dyn.has(canonical))dyn.set(canonical,new Set());dyn.get(canonical).add(source);
      continue;
    }
    if(clean.endsWith('.html')&&!set.has(clean)&&!missing.has(clean))missing.set(clean,new Set());
    if(missing.has(clean))missing.get(clean).add(source);
   }
  }
 }
 for(let i=0;i<concurrency;i++)workers.push(worker(i));
 await Promise.all(workers);
 const type=u=>u.includes('/fiches-seo/')?'fiche':u.includes('/magazine.html')?'mag-index':/(article-|mag-|vrai-faux-|video-)/.test(u)?'mag':'general';
 const rows=urls.map(u=>({url:u,type:type(u),directInternalLinks:incoming.get(u).size,dynamicFicheLinks:(dyn.get(u)||new Set()).size}));
 const byType={};
 for(const row of rows){const t=byType[row.type]||(byType[row.type]={total:0,withoutDirectLinks:0,withDynamicFicheLinks:0});t.total++;if(!row.directInternalLinks)t.withoutDirectLinks++;if(row.dynamicFicheLinks)t.withDynamicFicheLinks++;}
 const report={date:new Date().toISOString(),site:BASE,sitemapCount:urls.length,pagesFetched:checked,failed,byType,unlinked:rows.filter(x=>!x.directInternalLinks),missingTargets:[...missing].map(([url,sources])=>({url,sources:[...sources].slice(0,5)})),rows};
 fs.mkdirSync('seo-reports',{recursive:true});
 fs.writeFileSync('seo-reports/maillage-latest.json',JSON.stringify(report,null,2)+'\n');
 console.log('P2 LINK AUDIT '+JSON.stringify({sitemapCount:urls.length,pagesFetched:checked,failed:failed.length,byType,missingTargets:report.missingTargets.length},null,2));
 if(failed.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
