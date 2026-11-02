'use strict';
// MACASANTE: deterministic, offline SEO inventory. Never edits editorial content.
const fs=require('fs'),vm=require('vm');
const BASE='https://macasante.fr/';
const read=p=>fs.readFileSync(p,'utf8');
const problems=[];
const warn=(url,code,detail)=>problems.push({url,code,detail});
const context={window:{}};vm.createContext(context);
for(const path of ['magazine-articles.js','magazine-videos.js'])vm.runInContext(read(path),context,{filename:path});
const published=[...context.window.MACA_MAGAZINE_ARTICLES,...context.window.MACA_MAGAZINE_VIDEOS].filter(x=>x.status==='PUBLISHED');
const archive=read('magazine.html');
const sitemap=read('sitemap.xml');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1].replace(/&amp;/g,'&'));
const seen=new Set();
function attr(html,tag,key){const match=html.match(/href=["']([^"']+)["']/i);return match?.[1]||''}
function canonical(html){const match=[...html.matchAll(/<link\b[^>]*>/gi)].find(x=>/rel=["']canonical["']/i.test(x[0]));return match?attr(match[0],'link','href'):''}
for(const x of published){
 const url=x.url,absolute=BASE+url;
 if(!url||url.includes('..')||!/^[-a-zA-Z0-9_/]+\.html$/.test(url)){warn(url,'invalid_url','Unsafe or missing URL');continue}
 if(seen.has(url))warn(url,'duplicate_registry_url','Repeated published URL');seen.add(url);
 if(!fs.existsSync(url)){warn(url,'missing_html','Published document absent');continue}
 const html=read(url);
 if(!urls.includes(absolute))warn(url,'missing_sitemap','Published URL absent from sitemap');
 // Require an actual archive anchor, not only a script or data attribute.
 if(!archive.includes('href="'+url+'"')&&!archive.includes("href='"+url+"'"))warn(url,'orphan_archive','No HTML archive anchor');
 const c=canonical(html);if(c!==absolute)warn(url,'bad_canonical',c||'Missing canonical');
 if(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html))warn(url,'noindex','Robots meta excludes index');
 if(!/<a\b[^>]*href=["'](?:\.\/|\/)?magazine\.html(?:#[^"']*)?["']/i.test(html))warn(url,'no_mag_return','Missing HTML return to Mag');
 if(!/<title>[^<]+<\/title>/i.test(html))warn(url,'missing_title','Missing title');
 if(!/<meta\b[^>]*name=["']description["']/i.test(html))warn(url,'missing_description','Missing meta description');
}
const duplicates=urls.filter((x,i)=>urls.indexOf(x)!==i);
for(const u of new Set(duplicates))warn(u,'duplicate_sitemap_url','Duplicate loc');
const counts={published:published.length,archiveLinks:published.length-problems.filter(x=>x.code==='orphan_archive').length,sitemapEntries:urls.length,issues:problems.length};
const report={generatedAt:new Date().toISOString(),scope:'repository-static',counts,problems,limitations:['No Google Search Console export is available to this script','HTTP production responses and Google crawling status are not inferred from repository files']};
fs.mkdirSync('seo-reports',{recursive:true});
fs.writeFileSync('seo-reports/magazine-latest.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(counts));
for(const p of problems)console.error(p.code+': '+p.url+' — '+p.detail);
if(process.argv.includes('--check')&&problems.length)process.exitCode=1;
