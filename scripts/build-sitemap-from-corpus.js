#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.resolve(__dirname,'..');
function read(p){return fs.readFileSync(path.join(ROOT,p),'utf8');}
function ctx(){const c={console,setTimeout,clearTimeout,CustomEvent:function(){}};c.window=c;c.globalThis=c;return vm.createContext(c);}
const m={window:{}};vm.runInNewContext(read('corpus-manifest.js'),m);
const files=m.window.MACA_CORPUS_MANIFEST.map(x=>String(x).split('?')[0]);
const c=ctx();for(const f of files)vm.runInContext(read(f),c,{filename:f});vm.runInContext(read('corpus-canonicalizer.js'),c,{filename:'corpus-canonicalizer.js'});
const canonical=Array.from(c.MACA_BUILD_CANONICAL_CORPUS()).map(x=>JSON.parse(JSON.stringify(x))).filter(x=>x&&x.id);
const ids=canonical.map(x=>String(x.id));
if(new Set(ids).size!==ids.length)throw new Error('Duplicate canonical IDs');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
const today=new Date().toISOString().slice(0,10);
const staticUrls=[
 ['https://macasante.fr/',today,'daily','1.0'],
 ['https://macasante.fr/fiches.html',today,'daily','0.9'],
 ['https://macasante.fr/mentions-legales.html','2026-08-21','yearly','0.2'],
 ['https://macasante.fr/confidentialite.html','2026-08-21','yearly','0.2'],
 ['https://macasante.fr/contact.html','2026-08-21','yearly','0.3']
];
const lines=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
for(const [loc,lastmod,changefreq,priority] of staticUrls)lines.push(`  <url><loc>${esc(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`);
for(const q of canonical){
 const raw=String(q.verifiedAt||q.updatedAt||today).slice(0,10);
 const lastmod=/^\d{4}-\d{2}-\d{2}$/.test(raw)?raw:today;
 const loc=`https://macasante.fr/fiche.html?id=${encodeURIComponent(q.id)}`;
 lines.push(`  <url><loc>${esc(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
}
lines.push('</urlset>','');
fs.writeFileSync(path.join(ROOT,'sitemap.xml'),lines.join('\n'));
console.log(JSON.stringify({ok:true,canonicalCount:canonical.length,urlCount:canonical.length+staticUrls.length,lastmodDefault:today},null,2));
