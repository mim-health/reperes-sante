/* MACA individual fiche renderer — shared UX V2 over canonical corpus only. */
(function(){
  'use strict';
  const root=document.querySelector('#seo-fiche');
  const OFFICIAL_LOGO='logo-maca-v3.svg?v=20260908-logo3';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
  const strip=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const paragraphs=s=>String(s||'').split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join('');
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const STOP=new Set('a au aux avec ce ces cette dans de des du elle en est et faire faut il je la le les ma mais me mes mon ne nos notre nous on ou par pas pour pourquoi que quel quelle quels quelles qui sa se ses son sur un une vos votre vous adulte adultes enfant enfants femme femmes homme hommes sante'.split(' '));
  const tokens=s=>[...new Set(norm(s).split(/\s+/).filter(t=>t.length>=4&&!STOP.has(t)))];
  const overlap=(a,b)=>{const set=new Set(b);return a.filter(x=>set.has(x));};
  const upsertMeta=(name,content)=>{let el=document.querySelector(`meta[name="${name}"]`);if(!el){el=document.createElement('meta');el.name=name;document.head.appendChild(el);}el.content=content;};
  const upsertProperty=(property,content)=>{let el=document.querySelector(`meta[property="${property}"]`);if(!el){el=document.createElement('meta');el.setAttribute('property',property);document.head.appendChild(el);}el.content=content;};
  function failNotFound(){document.title='Fiche introuvable — MACA Santé';upsertMeta('robots','noindex,follow');root.innerHTML='<p class="eyebrow">MACA SANTÉ</p><h1>Fiche introuvable</h1><p><a href="fiches.html">Retour à toutes les fiches →</a></p>';}
  function failTemporary(){document.title='Fiche temporairement indisponible — MACA Santé';root.innerHTML='<p class="eyebrow">MACA SANTÉ</p><h1>Cette fiche est temporairement indisponible</h1><p>Le contenu n’a pas pu être chargé. Vous pouvez réessayer dans quelques instants.</p><p><a href="fiches.html">Retour à toutes les fiches →</a></p>';}
  function resolvedSources(q){
    const direct=Array.isArray(q.sources)?q.sources.filter(s=>s&&/^https?:\/\//i.test(String(s.url||''))):[];
    if(direct.length)return direct;
    const registry=window.SANTEJUSTE_SOURCE_REGISTRY||{};
    return (Array.isArray(q.sourceIds)?q.sourceIds:[]).map(id=>{const s=registry[id];return s&&/^https?:\/\//i.test(String(s.url||''))?{org:s.type||s.name||'Source',title:s.name||id,url:s.url,year:''}:null;}).filter(Boolean);
  }
  function sourcesSection(q){
    const sources=resolvedSources(q);
    if(sources.length){
      const rows=sources.map(s=>`<div class="maca-fv2-source"><div class="maca-fv2-source-org">${esc(s.org||s.label||'Source')}</div><div class="maca-fv2-source-title">${esc(s.title||s.label||'')}${s.year?` · ${esc(s.year)}`:''}</div><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Consulter la source →</a></div>`).join('');
      return `<section class="maca-fv2-card maca-fv2-sources"><h2>Sources</h2>${rows}${q.verifiedAt?`<p class="maca-fv2-verified">Vérifié le ${esc(q.verifiedAt)}</p>`:''}</section>`;
    }
    const sourceText=strip(q.source||'');
    const sourceUrl=q.url&&/^https?:\/\//i.test(String(q.url||''))?q.url:'';
    if(!sourceText&&!sourceUrl&&!q.verifiedAt)return '';
    return `<section class="maca-fv2-card maca-fv2-sources"><h2>Sources</h2>${sourceText?`<div class="maca-fv2-source"><div class="maca-fv2-source-title">${esc(sourceText)}</div>${sourceUrl?`<a href="${esc(sourceUrl)}" target="_blank" rel="noopener noreferrer">Consulter la source →</a>`:''}</div>`:''}${q.verifiedAt?`<p class="maca-fv2-verified">Vérifié le ${esc(q.verifiedAt)}</p>`:''}</section>`;
  }
  function relatedFiches(q,items){
    const byId=new Map(items.map(x=>[String(x&&x.id||''),x]));
    const explicit=(Array.isArray(q.relatedIds)?q.relatedIds:[]).map(id=>byId.get(String(id))).filter(x=>x&&String(x.id)!==String(q.id)).slice(0,3);
    if(explicit.length)return explicit;
    const baseTitle=tokens(q.title);const baseKeywords=tokens(q.keywords);if(!baseTitle.length)return [];
    return items.filter(x=>x&&String(x.id)!==String(q.id)&&String(x.category||'')===String(q.category||''))
      .map(x=>{const ct=tokens(x.title);const ck=tokens(x.keywords);const titleShared=overlap(baseTitle,ct);const keywordShared=overlap([...baseTitle,...baseKeywords],[...ct,...ck]);const longShared=titleShared.some(t=>t.length>=7);const eligible=titleShared.length>=2||(titleShared.length===1&&longShared&&keywordShared.length>=3);const score=titleShared.length*10+Math.min(keywordShared.length,6);return {x,eligible,score};})
      .filter(r=>r.eligible).sort((a,b)=>b.score-a.score||String(a.x.title).localeCompare(String(b.x.title),'fr')).slice(0,3).map(r=>r.x);
  }
  function relatedSection(q,items){
    const related=relatedFiches(q,items);if(!related.length)return '';
    const cards=related.map(x=>`<a class="maca-fv2-related-link" href="fiche.html?id=${encodeURIComponent(x.id)}"><span class="maca-fv2-related-category">${esc(x.category||'Question santé')}</span><span class="maca-fv2-related-title">${esc(x.title)}</span></a>`).join('');
    return `<section class="maca-fv2-card maca-fv2-related"><h2>À lire aussi</h2><p class="maca-fv2-related-intro">D’autres fiches MACA proches de ce sujet.</p><div class="maca-fv2-related-grid">${cards}</div></section>`;
  }
  function attachShare(q,canonical){
    const button=document.querySelector('#maca-fv2-share-button');const status=document.querySelector('#maca-fv2-share-status');if(!button)return;
    const text=`${strip(q.title)} — MACA Santé\nUne réponse santé vérifiée et sourcée.`;
    button.addEventListener('click',async()=>{if(status)status.textContent='';try{if(navigator.share){await navigator.share({title:`${strip(q.title)} — MACA Santé`,text,url:canonical});if(status)status.textContent='Partage ouvert.';return;}if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(canonical);}else{const area=document.createElement('textarea');area.value=canonical;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();}if(status)status.textContent='Lien copié.';}catch(error){if(error&&error.name==='AbortError')return;if(status)status.textContent='Le partage n’a pas pu être ouvert.';}});
  }
  function renderFiche(q,canonical,items){
    document.body.classList.add('maca-fiche-v2');
    document.querySelectorAll('.site-header .brand img, footer .brand img').forEach(img=>{img.src=OFFICIAL_LOGO;});
    const detail=q.detail?`<section class="maca-fv2-card maca-fv2-detail"><h2>Pour mieux comprendre</h2>${paragraphs(q.detail)}</section>`:'';
    const vigilance=q.watch?`<section class="maca-fv2-card maca-fv2-vigilance"><h2>${esc(q.watchTitle||'Point de vigilance')}</h2>${paragraphs(q.watch)}</section>`:'';
    const verified=q.verifiedAt?`<div class="maca-fv2-sidecard"><strong>Contenu vérifié</strong><p>Vérifié le ${esc(q.verifiedAt)}.</p></div>`:'';
    root.innerHTML=`<article class="maca-fv2-page"><a class="maca-fv2-back" href="fiches.html">← Toutes les fiches MACA Santé</a><header class="maca-fv2-hero"><div class="maca-fv2-brandline"><img src="${OFFICIAL_LOGO}" alt=""><span>MACA Santé</span></div><div class="maca-fv2-meta"><span class="maca-fv2-category">${esc(q.category||'Question santé')}</span><span class="maca-fv2-readtime">À lire en 3 min</span></div><h1>${esc(q.title)}</h1><div class="maca-fv2-accent" aria-hidden="true"></div></header><div class="maca-fv2-grid"><div class="maca-fv2-main"><section class="maca-fv2-card maca-fv2-short"><div class="maca-fv2-kicker">Réponse courte</div>${paragraphs(q.answer||'')}</section>${detail}${vigilance}${sourcesSection(q)}${relatedSection(q,items)}<section class="maca-fv2-share"><div><strong>Partager cette fiche</strong><p>Une réponse santé vérifiée et sourcée.</p><p id="maca-fv2-share-status" class="maca-fv2-share-status" aria-live="polite"></p></div><button id="maca-fv2-share-button" type="button">Partager</button></section></div><aside class="maca-fv2-side" aria-label="Repères sur la fiche">${verified}<div class="maca-fv2-sidecard"><strong>Information générale</strong><p>MACA Santé informe et ne remplace pas un avis médical.</p></div></aside></div></article>`;
    attachShare(q,canonical);
  }
  function render(q,items){
    const canonical=`https://macasante.fr/fiche.html?id=${encodeURIComponent(q.id)}`;const title=`${strip(q.title)} — MACA Santé`;const desc=strip(q.answer||'Réponse santé claire et sourcée sur MACA Santé.').slice(0,155);const modified=q.verifiedAt||q.updatedAt||'2026-08-25';
    document.title=title;upsertMeta('description',desc);upsertMeta('robots','index,follow');upsertProperty('og:type','article');upsertProperty('og:site_name','MACA Santé');upsertProperty('og:locale','fr_FR');upsertProperty('og:title',title);upsertProperty('og:description',desc);upsertProperty('og:url',canonical);upsertMeta('twitter:card','summary');upsertMeta('twitter:title',title);upsertMeta('twitter:description',desc);
    let link=document.querySelector('link[rel="canonical"]');if(!link){link=document.createElement('link');link.rel='canonical';document.head.appendChild(link);}link.href=canonical;
    document.querySelectorAll('script[data-maca-schema="fiche"]').forEach(el=>el.remove());const schema=document.createElement('script');schema.type='application/ld+json';schema.dataset.macaSchema='fiche';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'MedicalWebPage',headline:strip(q.title),description:desc,url:canonical,inLanguage:'fr-FR',isPartOf:{'@type':'WebSite',name:'MACA Santé',url:'https://macasante.fr/'},publisher:{'@type':'Organization',name:'MACA Santé',url:'https://macasante.fr/'},dateModified:modified,mainEntity:{'@type':'MedicalEntity',name:strip(q.title)}});document.head.appendChild(schema);
    renderFiche(q,canonical,items);
  }
  const id=new URLSearchParams(location.search).get('id');if(!id){failNotFound();return;}if(!window.MACA_CORPUS_READY||typeof window.MACA_CORPUS_READY.then!=='function'){failTemporary();return;}
  window.MACA_CORPUS_READY.then(()=>{if(typeof window.MACA_BUILD_CANONICAL_CORPUS!=='function')throw new Error('canonicalizer missing');const items=window.MACA_BUILD_CANONICAL_CORPUS();const q=items.find(x=>String(x.id)===String(id));if(!q){failNotFound();return;}render(q,items);}).catch(err=>{console.error('[MACA fiche V2]',err);failTemporary();});
  window.MACA_FICHE_V2_UI={version:'2026-09-08-global1',relatedFiches};
})();
