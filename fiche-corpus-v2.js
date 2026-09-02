/* MACA individual fiche renderer — canonical corpus V2 only. */
(function(){
  'use strict';
  const root=document.querySelector('#seo-fiche');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const strip=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const upsertMeta=(name,content)=>{let el=document.querySelector(`meta[name="${name}"]`);if(!el){el=document.createElement('meta');el.name=name;document.head.appendChild(el);}el.content=content;};
  const upsertProperty=(property,content)=>{let el=document.querySelector(`meta[property="${property}"]`);if(!el){el=document.createElement('meta');el.setAttribute('property',property);document.head.appendChild(el);}el.content=content;};
  function fail(){document.title='Fiche introuvable — MACA Santé';upsertMeta('robots','noindex,follow');root.innerHTML='<p class="eyebrow">MACA SANTÉ</p><h1>Fiche introuvable</h1><p><a href="fiches.html">Retour à toutes les fiches →</a></p>';}
  function resolvedSources(q){
    const direct=Array.isArray(q.sources)?q.sources.filter(s=>s&&/^https?:\/\//i.test(String(s.url||''))):[];
    if(direct.length)return direct;
    const registry=window.SANTEJUSTE_SOURCE_REGISTRY||{};
    return (Array.isArray(q.sourceIds)?q.sourceIds:[]).map(id=>{const s=registry[id];return s&&/^https?:\/\//i.test(String(s.url||''))?{org:s.type||s.name||'Source',title:s.name||id,url:s.url,year:''}:null;}).filter(Boolean);
  }
  function sourcesHtml(q){
    const sources=resolvedSources(q);
    if(sources.length){
      const rows=sources.map((s,i)=>`<div style="padding:${i?'12px 0 0':'8px 0 0'};${i?'border-top:1px solid #dce7e3;margin-top:12px;':''}"><div style="font-weight:700;color:#203631">${esc(s.org||s.label||'Source')}</div><div style="margin-top:3px;line-height:1.45">${esc(s.title||s.label||'')}${s.year?` · ${esc(s.year)}`:''}</div><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:5px">Consulter cette source →</a></div>`).join('');
      return `<div class="source-box"><strong>Sources utilisées</strong>${rows}${q.evidenceStatus?`<p><small>${esc(q.evidenceStatus)}</small></p>`:''}${q.verifiedAt?`<p><small>Vérifié le ${esc(q.verifiedAt)}</small></p>`:''}</div>`;
    }
    const sourceUrl=q.url&&/^https?:\/\//i.test(q.url)?q.url:'';
    return `<div class="source-box"><strong>Sources</strong><p>${esc(strip(q.source||''))}</p>${q.verifiedAt?`<p><small>Vérifié le ${esc(q.verifiedAt)}</small></p>`:''}${sourceUrl?`<a href="${esc(sourceUrl)}" target="_blank" rel="noopener noreferrer">Consulter la source →</a>`:''}</div>`;
  }
  function render(q){
    const canonical=`https://macasante.fr/fiche.html?id=${encodeURIComponent(q.id)}`;
    const title=`${strip(q.title)} — MACA Santé`;
    const desc=strip(q.answer||'Réponse santé claire et sourcée sur MACA Santé.').slice(0,155);
    const modified=q.verifiedAt||q.updatedAt||'2026-08-25';
    document.title=title;
    upsertMeta('description',desc);upsertMeta('robots','index,follow');
    upsertProperty('og:type','article');upsertProperty('og:site_name','MACA Santé');upsertProperty('og:locale','fr_FR');upsertProperty('og:title',title);upsertProperty('og:description',desc);upsertProperty('og:url',canonical);
    upsertMeta('twitter:card','summary');upsertMeta('twitter:title',title);upsertMeta('twitter:description',desc);
    let link=document.querySelector('link[rel="canonical"]');if(!link){link=document.createElement('link');link.rel='canonical';document.head.appendChild(link);}link.href=canonical;
    document.querySelectorAll('script[data-maca-schema="fiche"]').forEach(el=>el.remove());
    const schema=document.createElement('script');schema.type='application/ld+json';schema.dataset.macaSchema='fiche';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'MedicalWebPage',headline:strip(q.title),description:desc,url:canonical,inLanguage:'fr-FR',isPartOf:{'@type':'WebSite',name:'MACA Santé',url:'https://macasante.fr/'},publisher:{'@type':'Organization',name:'MACA Santé',url:'https://macasante.fr/'},dateModified:modified,mainEntity:{'@type':'MedicalEntity',name:strip(q.title)}});document.head.appendChild(schema);
    root.innerHTML=`<p class="eyebrow">${esc(q.category||'QUESTION SANTÉ')}</p><h1>${esc(q.title)}</h1><div class="answer-block"><strong>Réponse courte</strong><p>${esc(strip(q.answer||''))}</p></div>${q.watch?`<div class="watch-block"><strong>À retenir</strong><p>${esc(strip(q.watch))}</p></div>`:''}${sourcesHtml(q)}<p><a href="fiches.html">← Toutes les fiches MACA Santé</a></p>`;
  }
  const id=new URLSearchParams(location.search).get('id');
  if(!id){fail();return;}
  if(!window.MACA_CORPUS_READY||typeof window.MACA_CORPUS_READY.then!=='function'){fail();return;}
  window.MACA_CORPUS_READY.then(()=>{if(typeof window.MACA_BUILD_CANONICAL_CORPUS!=='function')throw new Error('canonicalizer missing');const items=window.MACA_BUILD_CANONICAL_CORPUS();const q=items.find(x=>String(x.id)===String(id));if(!q){fail();return;}render(q);}).catch(err=>{console.error('[MACA fiche V2]',err);fail();});
})();
