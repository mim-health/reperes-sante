/* MACA Santé V1 — garde-fou anti-doublons public.
   Le corpus historique provient de plusieurs stores. On dédoublonne d'abord
   les stores connus, puis le rendu public par titre normalisé afin qu'aucun
   doublon ne puisse réapparaître lors d'un re-render de la bibliothèque. */
(function(){
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const isEggCholesterol=q=>{const t=norm(q&&q.title);return t.includes('oeuf')&&t.includes('cholesterol');};
  const dedupeLocal=list=>{
    if(!Array.isArray(list)) return list;
    let seen=false;
    return list.filter(q=>{if(!isEggCholesterol(q))return true;if(seen)return false;seen=true;return true;});
  };
  window.healthQuestions=dedupeLocal(window.healthQuestions);
  window.extraAuditedQuestions=dedupeLocal(window.extraAuditedQuestions);
  if(Array.isArray(window.extraAuditedQuestions)&&window.extraAuditedQuestions.some(isEggCholesterol)&&Array.isArray(window.healthQuestions)){
    window.healthQuestions=window.healthQuestions.filter(q=>!isEggCholesterol(q));
  }

  function dedupeRenderedCards(){
    const grid=document.querySelector('#qa-grid');
    if(!grid) return;
    const seen=new Set();
    grid.querySelectorAll('.qa-card').forEach(card=>{
      const title=norm(card.querySelector('h3')?.textContent||'');
      if(!title) return;
      if(seen.has(title)) card.remove();
      else seen.add(title);
    });
  }

  function installGuard(){
    const grid=document.querySelector('#qa-grid');
    if(!grid) return;
    dedupeRenderedCards();
    let running=false;
    new MutationObserver(()=>{
      if(running) return;
      running=true;
      requestAnimationFrame(()=>{dedupeRenderedCards();running=false;});
    }).observe(grid,{childList:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installGuard,{once:true});
  else installGuard();
})();
