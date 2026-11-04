'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {THEMES}=require('./theme-taxonomy');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const counts=JSON.parse(read('seo-reports/theme-inventory.json'));
assert.equal(THEMES.length,11,'Eleven theme hubs expected');
assert(counts.fiches>400&&counts.mag>200,'Corpus counts unexpectedly low');
assert.equal(Object.values(counts.topics).reduce((n,x)=>n+x.fiches,0),counts.fiches);
assert.equal(Object.values(counts.topics).reduce((n,x)=>n+x.mag,0),counts.mag);
const index=read('themes/index.html'), sitemap=read('sitemap.xml');
for(const t of THEMES){
 const html=read('themes/'+t.slug+'.html');
 assert(html.includes('rel="canonical" href="https://macasante.fr/themes/'+t.slug+'.html"'));
 assert(html.includes('Fiches santé ('+counts.topics[t.slug].fiches+')'));
 assert(html.includes('Le Mag ('+counts.topics[t.slug].mag+')'));
 assert(index.includes('href="'+t.slug+'.html"'));
 assert(sitemap.includes('<loc>https://macasante.fr/themes/'+t.slug+'.html</loc>'));
}
assert(sitemap.includes('<loc>https://macasante.fr/themes/index.html</loc>'));
const files=fs.readdirSync(path.join(__dirname,'..','fiches-data')).filter(f=>f.endsWith('.json'));
assert.equal(files.length,counts.fiches);
for(const file of files){
 const id=file.slice(0,-5);
 const html=read('fiches-seo/'+id+'.html');
 assert(html.includes('MACA_THEME_NAV_START')&&html.includes('href="../themes/'),id+' missing topic navigation');
}
const mag=read('magazine-articles.js');
assert(read('magazine.html').includes('href="themes/index.html"'));
assert(read('annuaire-fiches.html').includes('href="themes/index.html"'));
console.log('PASS theme hub integrity: '+THEMES.length+' hubs, '+counts.fiches+' fiches, '+counts.mag+' Mag contents.');
