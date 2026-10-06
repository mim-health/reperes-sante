#!/usr/bin/env node
'use strict';

/*
 * MACA SEO static fiche generator.
 * Produces one crawlable HTML document per canonical fiche while keeping
 * fiche.html?id=... as the current interactive/user-facing URL.
 */
const fs=require('fs'),path=require('path'),vm=require('vm');
const seo=require('../fiche-seo-metadata.js');
const ROOT=path.resolve(__dirname,'..');
const OUT=path.join(ROOT,'fiches-seo');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const strip=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const isoDate=s=>{const v=String(s||'');let m=v.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return m[0];m=v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);return m?`${m[3]}-${m[2]}-${m[1]}`:'2026-10-02';};
const paras=s=>String(s||'').split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean).map(x=>`<p>${esc(x)}</p>`).join('');
const manifestCtx={window:{}};vm.runInNewContext(read('corpus-manifest.js'),manifestCtx);
const ctx={console,setTimeout,clearTimeout,CustomEvent:function(){}};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
for(const raw of manifestCtx.window.MACA_CORPUS_MANIFEST){const f=String(raw).split('?')[0];vm.runInContext(read(f),ctx,{filename:f});}
vm.runInContext(read('corpus-canonicalizer.js'),ctx,{filename:'corpus-canonicalizer.js'});
const items=Array.from(ctx.MACA_BUILD_CANONICAL_CORPUS()).map(x=>JSON.parse(JSON.stringify(x)));
fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});
for(const q of items){
  const id=String(q.id); const canonical=`https://macasante.fr/fiches-seo/${encodeURIComponent(id)}.html`;
  const title=strip(seo.title(q)); const desc=seo.description(q);
  const related=seo.relatedIds(q).map(id=>items.find(item=>item.id===id)).filter(item=>item&&item.id!==q.id).slice(0,3);
  const relatedHtml=related.length?`<section class="maca-fv2-card maca-fv2-related"><h2>À lire aussi</h2><ul>${related.map(item=>`<li><a href="${encodeURIComponent(item.id)}.html">${esc(item.title)}</a></li>`).join('')}</ul></section>`:'';
  const sources=(Array.isArray(q.sources)?q.sources:[]).filter(s=>s&&/^https?:\/\//.test(String(s.url||''))).map(s=>`<li><a href="${esc(s.url)}" rel="noopener noreferrer">${esc(s.label||s.title||s.org||'Source')}</a></li>`).join('');
  const schema=JSON.stringify({'@context':'https://schema.org','@type':'MedicalWebPage',headline:title,description:desc,url:canonical,inLanguage:'fr-FR',isPartOf:{'@type':'WebSite',name:'MACA Santé',url:'https://macasante.fr/'},publisher:{'@type':'Organization',name:'MACA Santé',url:'https://macasante.fr/'},dateModified:isoDate(q.verifiedAt||q.updatedAt)});
  const html=`<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} — MACA Santé</title><meta name="description" content="${esc(desc)}"><meta property="og:type" content="article"><meta property="og:title" content="${esc(title)} — MACASANTÉ"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canonical}"><meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"><link rel="canonical" href="${canonical}"><link rel="stylesheet" href="../styles-v2.css?v=20260822-1"><link rel="stylesheet" href="../maca-mediterranean-theme.css?v=20260824-4"><link rel="stylesheet" href="../maca-fiche-v2.css?v=20260908-global1"><script type="application/ld+json">${schema.replace(/</g,'\\u003c')}</script></head><body class="library-page maca-fiche-v2"><header class="site-header"><a class="brand" href="/"><img src="../logo-maca-officiel.svg?v=20260913-logo-officiel1" alt="Logo MACA Santé"><span class="brand-word">MACA Santé</span></a><nav><a href="/">Accueil</a><a href="../fiches.html">Toutes les fiches</a></nav></header><main><section class="section library-section standalone-library"><article class="maca-fv2-page"><a class="maca-fv2-back" href="../fiches.html">← Toutes les fiches MACA Santé</a><header class="maca-fv2-hero"><p class="eyebrow">${esc(q.category||'QUESTION SANTÉ')}</p><h1>${esc(title)}</h1></header><div class="maca-fv2-main"><section class="maca-fv2-card maca-fv2-short"><div class="maca-fv2-kicker">Réponse courte</div>${paras(q.answer||'')}</section>${q.detail?`<section class="maca-fv2-card maca-fv2-detail"><h2>Pour mieux comprendre</h2>${paras(q.detail)}</section>`:''}${q.watch?`<section class="maca-fv2-card maca-fv2-vigilance"><h2>${esc(q.watchTitle||'Point de vigilance')}</h2>${paras(q.watch)}</section>`:''}${relatedHtml}${sources?`<section class="maca-fv2-card maca-fv2-sources"><h2>Sources</h2><ul>${sources}</ul></section>`:''}</div></article></section></main><footer><p>MACA Santé — information générale en santé, ne remplace pas un avis médical.</p></footer></body></html>`;
  fs.writeFileSync(path.join(OUT,`${id}.html`),html);
}
console.log(`Generated ${items.length} static SEO fiche pages in fiches-seo/`);
