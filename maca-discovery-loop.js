/* MACA Santé — boucle de découverte J+15. Déterministe, corpus validé uniquement. */
(function(root){
  'use strict';

  const RELATED=Object.freeze({
    'fatigue-causes':['ferritine-basse-carence-fer','tsh-haute-basse-thyroide'],
    'vertiges-causes':['vertiges-adulte'],
    'vertiges-adulte':['vertiges-causes'],
    'palpitations-adulte':['palpitations-quand-consulter'],
    'palpitations-quand-consulter':['palpitations-adulte'],
    'migraine-que-faire':['migraine-adulte'],
    'migraine-adulte':['migraine-que-faire'],
    'tique':['maca-tique-conduite'],
    'maca-tique-conduite':['tique'],
    'menopause':['maca-menopause-bouffees','perimenopause-signes-quand-consulter'],
    'maca-menopause-bouffees':['menopause','perimenopause-signes-quand-consulter'],
    'perimenopause-signes-quand-consulter':['menopause','maca-menopause-bouffees']
  });

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clean=s=>String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  function corpus(){
    if(Array.isArray(root.MACA_CANONICAL_CORPUS)&&root.MACA_CANONICAL_CORPUS.length)return root.MACA_CANONICAL_CORPUS;
    if(typeof root.MACA_BUILD_CANONICAL_CORPUS==='function'){
      const built=root.MACA_BUILD_CANONICAL_CORPUS();
      if(Array.isArray(built))return built;
    }
    return Array.isArray(root.healthQuestions)?root.healthQuestions:[];
  }
  function directUrl(q){return `https://macasante.fr/fiche.html?id=${encodeURIComponent(q.id)}`;}
  function copyLink(url,status){
    const done=()=>{if(status)status.textContent='Lien copié.';};
    if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(url).then(done).catch(()=>legacyCopy(url,done));
    return Promise.resolve(legacyCopy(url,done));
  }
  function legacyCopy(url,done){
    const ta=document.createElement('textarea');ta.value=url;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();
    try{document.execCommand('copy');done();}finally{ta.remove();}
  }
  async function share(q,status){
    const url=directUrl(q),title=`${clean(q.title)} — MACA Santé`,text='Une réponse santé vérifiée et sourcée.';
    if(navigator.share){
      try{await navigator.share({title,text,url});if(status)status.textContent='Fiche partagée.';return;}catch(error){if(error&&error.name==='AbortError')return;}
    }
    await copyLink(url,status);
  }
  function relatedFor(q,items){
    const ids=RELATED[q.id]||[];
    const map=new Map(items.filter(x=>x&&x.id).map(x=>[String(x.id),x]));
    return ids.map(id=>map.get(id)).filter(Boolean).slice(0,2);
  }
  function ensureStyle(){
    if(document.getElementById('maca-discovery-style'))return;
    const style=document.createElement('style');style.id='maca-discovery-style';style.textContent=`
      .maca-discovery{margin:22px 0 4px;padding-top:18px;border-top:1px solid #ded8cc}.maca-related{margin:0 0 16px}.maca-related h3{margin:0 0 9px;font-size:16px;color:#263936}.maca-related-links{display:grid;gap:8px}.maca-related-links a{display:block;padding:10px 12px;border:1px solid #d7e2dd;border-radius:13px;background:#f8fbfa;color:#315c53;text-decoration:none;font-weight:650;line-height:1.35}.maca-discovery-actions{display:flex;flex-wrap:wrap;gap:8px}.maca-discovery-actions button{border:1px solid #b9c8c3;background:#fff;color:#263936;border-radius:999px;padding:9px 13px;font:700 13px/1.2 system-ui,-apple-system,Segoe UI,sans-serif;cursor:pointer}.maca-discovery-actions button:first-child{background:#66745a;border-color:#66745a;color:#fff}.maca-discovery-status{min-height:18px;margin:7px 0 0;color:#687873;font-size:12px}@media(max-width:640px){.maca-discovery-actions{display:grid;grid-template-columns:1fr}.maca-discovery-actions button{width:100%;min-height:43px}}
    `;document.head.appendChild(style);
  }
  function openAssistant(){const launcher=document.getElementById('maca-assistant-launcher');if(launcher)launcher.click();}
  function decorate(container,q,items){
    if(!container||!q||!q.id||container.querySelector('.maca-discovery'))return;
    ensureStyle();
    const related=relatedFor(q,items||corpus());
    const section=document.createElement('section');section.className='maca-discovery';section.setAttribute('aria-label','Découvrir, rechercher ou partager');
    const relatedHtml=related.length?`<div class="maca-related"><h3>Vous vous posez peut-être aussi ces questions</h3><div class="maca-related-links">${related.map(item=>`<a href="fiche.html?id=${encodeURIComponent(item.id)}">${esc(clean(item.title||item.question||''))}</a>`).join('')}</div></div>`:'';
    const shareLabel=navigator.share?'Partager cette fiche':'Copier le lien';
    section.innerHTML=`${relatedHtml}<div class="maca-discovery-actions"><button type="button" data-maca-share>${shareLabel}</button><button type="button" data-maca-assistant>Rechercher avec l’Assistant MACA</button></div><p class="maca-discovery-status" aria-live="polite"></p>`;
    container.appendChild(section);
    const status=section.querySelector('.maca-discovery-status');
    section.querySelector('[data-maca-share]').addEventListener('click',()=>share(q,status));
    section.querySelector('[data-maca-assistant]').addEventListener('click',openAssistant);
  }
  function findByTitle(title,items){const t=clean(title);return items.find(q=>clean(q.title||q.question||'')===t)||null;}
  function scan(){
    const items=corpus();if(!items.length)return;
    const standalone=document.getElementById('seo-fiche');
    if(standalone){const h=standalone.querySelector('h1');const q=h&&findByTitle(h.textContent,items);if(q)decorate(standalone,q,items);}
    const modal=document.getElementById('modal-content');
    if(modal){const h=modal.querySelector('h2');const q=h&&findByTitle(h.textContent,items);if(q)decorate(modal,q,items);}
  }
  function observe(target){if(!target)return;new MutationObserver(scan).observe(target,{childList:true,subtree:true});}
  function init(){scan();observe(document.getElementById('seo-fiche'));observe(document.getElementById('modal-content'));}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  root.MACA_DISCOVERY={decorate,relatedFor,directUrl};
})(typeof window!=='undefined'?window:globalThis);
