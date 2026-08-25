/* MACA individual fiche renderer — canonical corpus V2 only. */
(function(){
  'use strict';
  const root=document.querySelector('#seo-fiche');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const strip=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  function fail(){document.title='Fiche introuvable — MACA Santé';const robots=document.querySelector('meta[name="robots"]');if(robots)robots.content='noindex,follow';root.innerHTML='<p class="eyebrow">MACA SANTÉ</p><h1>Fiche introuvable</h1><p><a href="fiches.html">Retour à toutes les fiches →</a></p>';}
  function render(q){
    const canonical=`https://macasante.fr/fiche.html?id=${encodeURIComponent(q.id)}`;
    document.title=`${q.title} — MACA Santé`;
    const desc=strip(q.answer||'Réponse santé claire et sourcée sur MACA Santé.').slice(0,155);
    const meta=document.querySelector('meta[name="description"]');if(meta)meta.content=desc;
    let link=document.querySelector('link[rel="canonical"]');if(!link){link=document.createElement('link');link.rel='canonical';document.head.appendChild(link);}link.href=canonical;
    const schema=document.createElement('script');schema.type='application/ld+json';schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'MedicalWebPage',headline:q.title,description:desc,url:canonical,inLanguage:'fr-FR',publisher:{'@type':'Organization',name:'MACA Santé',url:'https://macasante.fr/'},dateModified:q.verifiedAt||q.updatedAt||'2026-08-25'});document.head.appendChild(schema);
    const sourceUrl=q.url&&/^https?:\/\//i.test(q.url)?q.url:'';
    root.innerHTML=`<p class="eyebrow">${esc(q.category||'QUESTION SANTÉ')}</p><h1>${esc(q.title)}</h1><div class="answer-block"><strong>Réponse courte</strong><p>${esc(strip(q.answer||''))}</p></div>${q.watch?`<div class="watch-block"><strong>À retenir</strong><p>${esc(strip(q.watch))}</p></div>`:''}<div class="source-box"><strong>Sources</strong><p>${esc(strip(q.source||''))}</p>${q.verifiedAt?`<p><small>Vérifié le ${esc(q.verifiedAt)}</small></p>`:''}${sourceUrl?`<a href="${esc(sourceUrl)}" target="_blank" rel="noopener">Consulter la source →</a>`:''}</div><p><a href="fiches.html">← Toutes les fiches MACA Santé</a></p>`;
  }
  const id=new URLSearchParams(location.search).get('id');
  if(!id){fail();return;}
  if(!window.MACA_CORPUS_READY||typeof window.MACA_CORPUS_READY.then!=='function'){fail();return;}
  window.MACA_CORPUS_READY.then(()=>{if(typeof window.MACA_BUILD_CANONICAL_CORPUS!=='function')throw new Error('canonicalizer missing');const items=window.MACA_BUILD_CANONICAL_CORPUS();const q=items.find(x=>String(x.id)===String(id));if(!q){fail();return;}render(q);}).catch(err=>{console.error('[MACA fiche V2]',err);fail();});
})();
