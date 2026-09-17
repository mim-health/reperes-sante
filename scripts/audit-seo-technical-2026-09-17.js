#!/usr/bin/env node
'use strict';
const fs=require('fs');
const read=p=>fs.readFileSync(p,'utf8');
const index=read('index.html');
const fiche=read('fiche.html');
const library=read('fiches.html');
const renderer=read('fiche-corpus-v2.js');
const app=read('app.js');
const robots=read('robots.txt');
const sitemap=read('sitemap.xml');
const publicHtml=['fiche.html','fiches.html','notre-histoire.html','mentions-legales.html','confidentialite.html','contact.html','daily.html'];
const indexHtmlLinks=publicHtml.flatMap(file=>{
  const html=read(file);
  return [...html.matchAll(/href=["']index\.html(?:#[^"']*)?["']/g)].map(m=>({file,href:m[0]}));
});
const locs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const duplicateLocs=locs.filter((loc,i)=>locs.indexOf(loc)!==i);
const sitemapLines=robots.split(/\r?\n/).filter(line=>/^Sitemap:/i.test(line.trim()));
const checks={
  homepageCanonical:/<link\s+rel=["']canonical["']\s+href=["']https:\/\/macasante\.fr\/["']/i.test(index),
  homepageInSitemap:sitemap.includes('<loc>https://macasante.fr/</loc>'),
  indexHtmlAbsentFromSitemap:!sitemap.includes('https://macasante.fr/index.html'),
  canonicalHomeInternalLinks:indexHtmlLinks.length===0,
  robotsAllowsPublic:/User-agent:\s*\*/i.test(robots)&&/Allow:\s*\//i.test(robots),
  robotsOneCanonicalSitemap:sitemapLines.length===1&&sitemapLines[0].trim()==='Sitemap: https://macasante.fr/sitemap.xml',
  sitemapNoDuplicateLocs:duplicateLocs.length===0,
  sampleEcransInSitemap:sitemap.includes('<loc>https://macasante.fr/fiche.html?id=ecrans-petit</loc>'),
  sampleConstipationInSitemap:sitemap.includes('<loc>https://macasante.fr/fiche.html?id=constipation-adulte</loc>'),
  ficheRuntimeTitle:/document\.title=title/.test(renderer),
  ficheRuntimeDescription:/upsertMeta\('description',desc\)/.test(renderer),
  ficheRuntimeCanonical:/document\.querySelector\('link\[rel="canonical"\]'\)/.test(renderer)&&/link\.href=canonical/.test(renderer),
  ficheRuntimeH1:/<h1>\$\{esc\(q\.title\)\}<\/h1>/.test(renderer),
  ficheRuntimeOpenGraph:/upsertProperty\('og:title',title\)/.test(renderer)&&/upsertProperty\('og:url',canonical\)/.test(renderer),
  ficheRuntimeSchema:/MedicalWebPage/.test(renderer),
  missingFicheNoindex:/noindex,follow/.test(renderer)
};
const warnings={
  ficheMetadataClientRendered:!/<link\s+rel=["']canonical["']/i.test(fiche)&&/<title>Fiche santé — MACA Santé<\/title>/.test(fiche),
  libraryCardsNotCrawlableAnchors:/function questionCard\(q\)\{return `<article/.test(app)&&/openQuestion\(c\.dataset\.qid\)/.test(app),
  relatedFichesAreCrawlable:/maca-fv2-related-link[\s\S]*?fiche\.html\?id=/.test(renderer)
};
const failed=Object.entries(checks).filter(([,ok])=>!ok).map(([name])=>name);
const result={ok:failed.length===0,checks,warnings,details:{indexHtmlLinks,duplicateLocs,sitemapUrlCount:locs.length,robotsSitemaps:sitemapLines}};
console.log(JSON.stringify(result,null,2));
if(failed.length){console.error('SEO technical audit failed: '+failed.join(', '));process.exit(1);}
