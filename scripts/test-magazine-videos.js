'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');const ctx={window:{}};
for(const f of ['magazine-articles.js','magazine-videos.js'])vm.runInNewContext(fs.readFileSync(f,'utf8'),ctx);
const all=[...ctx.window.MACA_MAGAZINE_ARTICLES,...ctx.window.MACA_MAGAZINE_VIDEOS];
assert.equal(new Set(all.map(x=>x.id)).size,all.length);
for(const a of all){assert(['article','video'].includes(a.format));assert(a.keywords.length);assert(/^\d{4}-\d{2}-\d{2}$/.test(a.date));assert(fs.readFileSync('magazine.html','utf8').includes('href="'+a.url+'"'));assert(fs.readFileSync('sitemap.xml','utf8').includes(a.url));if(a.format==='video'){const page=fs.readFileSync(a.url,'utf8');assert(page.includes(a.transcript));assert(page.includes('fiche.html?id='+a.source));assert(fs.existsSync('fiches-seo/'+a.source+'.html'));assert(fs.statSync(a.video).size>100000);assert(!page.includes('Expires='));}}
assert(fs.readFileSync('index.html','utf8').includes('href="video-max-cortisol.html"'));console.log('PASS: archive metadata, exact scripts, local MP4, permanent pages, validated fiche links, sitemap.');
