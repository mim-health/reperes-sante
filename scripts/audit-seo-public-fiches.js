#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.resolve(__dirname,'..');
function read(p){return fs.readFileSync(path.join(ROOT,p),'utf8');}
function ctx(){const c={console,setTimeout,clearTimeout,CustomEvent:function(){}};c.window=c;c.globalThis=c;return vm.createContext(c);}
const m={window:{}};vm.runInNewContext(read('corpus-manifest.js'),m);const files=m.window.MACA_CORPUS_MANIFEST.map(x=>String(x).split('?')[0]);
const c=ctx();for(const f of files)vm.runInContext(read(f),c,{filename:f});vm.runInContext(read('corpus-canonicalizer.js'),c,{filename:'corpus-canonicalizer.js'});
const canonical=Array.from(c.MACA_BUILD_CANONICAL_CORPUS()).map(x=>JSON.parse(JSON.stringify(x)));
const sitemap=read('sitemap.xml');
const ids=['varices-contention-disparaitre','syndrome-premenstruel-que-faire','cancer-intelligence-artificielle-usages-reels','obesite-nouveaux-traitements-securite','troubles-erection-age-cardio','ipp-long-cours-omeprazole','sang-dans-urines-hematurie','fuites-urinaires-age','antihistaminique-tous-les-jours','fievre-adulte-quand-sinquieter'];
const rows=ids.map(id=>{const q=canonical.find(x=>String(x.id)===id);const url=`https://macasante.fr/fiche.html?id=${id}`;return {id,inCanonical:!!q,title:q&&(q.title||q.question),category:q&&(q.publicCategory||q.category),inSitemap:sitemap.includes(`<loc>${url}</loc>`)};});
const missingSitemap=canonical.filter(q=>!sitemap.includes(`<loc>https://macasante.fr/fiche.html?id=${q.id}</loc>`)).map(q=>q.id);
console.log(JSON.stringify({canonicalCount:canonical.length,examples:rows,sitemapMissingCount:missingSitemap.length,sitemapMissingIds:missingSitemap,rendererFailSetsNoindex:/function fail\(\).*noindex,follow/.test(read('fiche-corpus-v2.js').replace(/\s+/g,' '))},null,2));
