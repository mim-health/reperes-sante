'use strict';
const fs=require('fs'),vm=require('vm');
const strip=s=>String(s).split('?')[0];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
const ctx={window:{},console};ctx.window.window=ctx.window;vm.createContext(ctx);
const manifestCtx={window:{}};vm.createContext(manifestCtx);vm.runInContext(fs.readFileSync('corpus-manifest.js','utf8'),manifestCtx,{filename:'corpus-manifest.js'});
const files=manifestCtx.window.MACA_CORPUS_MANIFEST.map(strip);
for(const f of files) vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
vm.runInContext(fs.readFileSync('corpus-canonicalizer.js','utf8'),ctx,{filename:'corpus-canonicalizer.js'});
const cards=ctx.window.MACA_BUILD_CANONICAL_CORPUS();
const ids=cards.map(c=>String(c.id||'').trim());
const missing=ids.map((id,i)=>id?null:(cards[i].title||cards[i].question||`card ${i}`)).filter(Boolean);
if(missing.length) throw new Error('Canonical cards without stable ID: '+missing.join(' | '));
if(new Set(ids).size!==ids.length) throw new Error('Duplicate canonical IDs prevent sitemap generation');
const today=process.env.SITEMAP_DATE||new Date().toISOString().slice(0,10);
const staticUrls=[['https://macasante.fr/',today,'daily','1.0'],['https://macasante.fr/fiches.html',today,'daily','0.9'],['https://macasante.fr/mentions-legales.html','2026-08-21','yearly','0.2'],['https://macasante.fr/confidentialite.html','2026-08-21','yearly','0.2'],['https://macasante.fr/contact.html','2026-08-21','yearly','0.3']];
const ficheUrls=ids.map(id=>[`https://macasante.fr/fiche.html?id=${encodeURIComponent(id)}`,today,'monthly','0.8']);
const all=staticUrls.concat(ficheUrls);const rows=all.map(([loc,lastmod,changefreq,priority])=>`  <url><loc>${esc(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`);
const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`;
if(process.argv.includes('--check')){
  if(!fs.existsSync('sitemap.xml'))throw new Error('sitemap.xml missing');
  const sitemapFiles=['sitemap.xml','sitemap-corpus-extra.xml'].filter(f=>fs.existsSync(f));
  const combined=sitemapFiles.map(f=>fs.readFileSync(f,'utf8')).join('\n');
  const missingUrls=all.map(([loc])=>loc).filter(loc=>!combined.includes(`<loc>${esc(loc)}</loc>`));
  if(missingUrls.length){console.error(`sitemap set out of sync: ${missingUrls.length} canonical URLs missing`);process.exit(1);}
  const listed=[...combined.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  if(new Set(listed).size!==all.length){console.error(`sitemap set out of sync: expected ${all.length} unique URLs (${ids.length} canonical fiches), found ${new Set(listed).size}`);process.exit(1);}
  console.log(`Sitemap PASS: ${all.length} URLs, ${ids.length} canonical fiches across ${sitemapFiles.length} sitemap file(s)`);
}else{fs.writeFileSync('sitemap.xml',xml);console.log(`Generated sitemap.xml: ${all.length} URLs, ${ids.length} canonical fiches`);}
