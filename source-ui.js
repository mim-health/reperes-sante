(() => {
  const registry = window.santeJusteSourceRegistry || {};
  let activeQuestionId = null;
  function escapeHtml(value=''){return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}
  function renderSources(id){const sources=registry[id];if(!sources||!sources.length)return;const box=document.querySelector('#modal-content .source-box');if(!box)return;const rows=sources.map((s,i)=>`<div style="padding:${i?'12px 0 0':'8px 0 0'};${i?'border-top:1px solid #dce7e3;margin-top:12px;':''}"><div style="font-weight:700;color:#203631">${escapeHtml(s.org)}</div><div style="margin-top:3px;line-height:1.45">${escapeHtml(s.title)}${s.year?` · ${escapeHtml(s.year)}`:''}</div><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener" style="display:inline-block;margin-top:5px">Consulter cette source →</a></div>`).join('');box.innerHTML=`<strong>Sources utilisées</strong>${rows}<div style="margin-top:14px;padding-top:12px;border-top:1px solid #dce7e3;color:#667873">Vérifiées le 20/08/2026</div>`;}
  function scheduleRender(id){activeQuestionId=id;requestAnimationFrame(()=>renderSources(activeQuestionId));}
  document.addEventListener('click',e=>{const card=e.target.closest('.qa-card');if(card?.dataset?.qid)scheduleRender(card.dataset.qid);});
  document.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const card=e.target.closest?.('.qa-card');if(card?.dataset?.qid)scheduleRender(card.dataset.qid);});
})();

(() => {
  let previousFocus=null;const modal=document.querySelector('#article-modal');
  function rememberCard(target){const card=target?.closest?.('.qa-card,.card');if(card)previousFocus=card;return card;}
  function restoreFocusAfterClose(){if(!previousFocus)return;setTimeout(()=>{if(modal?.getAttribute('aria-hidden')==='true'&&document.contains(previousFocus))previousFocus.focus();},0);}
  document.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const card=rememberCard(e.target);if(!card)return;e.preventDefault();card.click();requestAnimationFrame(()=>document.querySelector('#article-modal .close')?.focus());});
  document.addEventListener('click',e=>{rememberCard(e.target);if(e.target.closest?.('#article-modal .close'))restoreFocusAfterClose();else if(modal&&e.target===modal)restoreFocusAfterClose();},true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal?.getAttribute('aria-hidden')==='false')restoreFocusAfterClose();});
})();

/* Homepage is intentionally light: search + themes lead to the dedicated library. */
(() => {
  if(document.body.classList.contains('library-page')) return;
  const input=document.querySelector('#search-input');
  const filters=document.querySelector('#category-filters');
  const hub=document.querySelector('.search-hub');
  const goToLibrary=params=>{location.href=`fiches.html${params?`?${params}`:''}`;};
  if(hub&&!hub.querySelector('.all-cards-link')){
    const wrap=document.createElement('div');wrap.className='all-cards-link';wrap.innerHTML='<a href="fiches.html">Voir toutes les fiches →</a>';hub.appendChild(wrap);
  }
  input?.addEventListener('input',e=>{e.stopImmediatePropagation();},true);
  input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();e.stopImmediatePropagation();const q=input.value.trim();goToLibrary(q?`q=${encodeURIComponent(q)}`:'');}},true);
  filters?.addEventListener('click',e=>{const b=e.target.closest('.filter-chip');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const cat=b.dataset.category||'Toutes';goToLibrary(cat==='Toutes'?'':`cat=${encodeURIComponent(cat)}`);},true);
})();

/* Dedicated library: restore search/category passed by the home page.
   This replaces the former window.searchInput check, because app.js uses lexical globals. */
(() => {
  if(!document.body.classList.contains('library-page')) return;
  const params=new URLSearchParams(location.search);
  const q=params.get('q');
  const cat=params.get('cat');
  const input=document.querySelector('#search-input');
  const filters=document.querySelector('#category-filters');
  if(q&&input){
    input.value=q;
    input.dispatchEvent(new Event('input',{bubbles:true}));
    requestAnimationFrame(()=>input.focus());
    return;
  }
  if(cat&&filters){
    requestAnimationFrame(()=>{
      const target=[...filters.querySelectorAll('.filter-chip')].find(b=>b.dataset.category===cat);
      target?.click();
    });
  }
})();
