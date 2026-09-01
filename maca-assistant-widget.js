/* MACA SANTE — assistant V2 floating entrypoint for the library page. */
(function(){
  'use strict';

  if(!document.body || !document.body.classList.contains('library-page')) return;
  if(document.getElementById('maca-assistant-launcher')) return;

  const style=document.createElement('style');
  style.textContent=`
    .maca-assistant-launcher{position:fixed;right:22px;bottom:22px;z-index:1100;display:inline-flex;align-items:center;gap:9px;border:0;border-radius:999px;background:#66745a;color:#fff;box-shadow:0 12px 34px rgba(38,57,54,.22);padding:13px 17px;font:700 14px/1.2 'DM Sans',system-ui,-apple-system,Segoe UI,sans-serif;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease}.maca-assistant-launcher:hover{transform:translateY(-2px);box-shadow:0 16px 38px rgba(38,57,54,.27)}.maca-assistant-launcher:focus-visible,.maca-assistant-close:focus-visible{outline:3px solid rgba(124,174,164,.45);outline-offset:3px}.maca-assistant-launcher-icon{font-size:18px;line-height:1}.maca-assistant-launcher-badge{font-size:10px;letter-spacing:.08em;text-transform:uppercase;background:rgba(255,255,255,.18);border-radius:999px;padding:4px 7px}.maca-assistant-panel{position:fixed;right:22px;bottom:78px;z-index:1099;width:min(430px,calc(100vw - 44px));height:min(680px,calc(100vh - 112px));background:#fff;border:1px solid #ded8cc;border-radius:24px;box-shadow:0 22px 65px rgba(38,57,54,.22);overflow:hidden;display:flex;flex-direction:column;opacity:0;transform:translateY(12px) scale(.985);pointer-events:none;visibility:hidden;transition:opacity .18s ease,transform .18s ease,visibility .18s ease}.maca-assistant-panel[data-open="true"]{opacity:1;transform:none;pointer-events:auto;visibility:visible}.maca-assistant-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 15px;border-bottom:1px solid #e7e1d7;background:#faf7ef}.maca-assistant-head-copy{min-width:0}.maca-assistant-head-title{display:block;color:#263936;font:800 15px/1.2 'DM Sans',system-ui,-apple-system,Segoe UI,sans-serif}.maca-assistant-head-subtitle{display:block;margin-top:2px;color:#687873;font:500 11px/1.3 'DM Sans',system-ui,-apple-system,Segoe UI,sans-serif}.maca-assistant-close{flex:0 0 auto;width:36px;height:36px;border:0;border-radius:50%;background:#fff;color:#263936;font:500 24px/1 system-ui;cursor:pointer}.maca-assistant-frame{display:block;width:100%;height:100%;min-height:0;flex:1;border:0;background:#faf7ef}.maca-assistant-screen-reader{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}@media(max-width:640px){body.maca-assistant-open{overflow:hidden}.maca-assistant-launcher{right:14px;bottom:14px;padding:13px 15px}.maca-assistant-launcher-badge{display:none}.maca-assistant-panel{inset:0;width:100vw;height:100dvh;max-width:none;border:0;border-radius:0;transform:none;z-index:1200}.maca-assistant-head{padding:12px 14px;padding-top:max(12px,env(safe-area-inset-top))}.maca-assistant-frame{background:#fff}}
  `;
  document.head.appendChild(style);

  const launcher=document.createElement('button');
  launcher.id='maca-assistant-launcher';
  launcher.className='maca-assistant-launcher';
  launcher.type='button';
  launcher.setAttribute('aria-haspopup','dialog');
  launcher.setAttribute('aria-expanded','false');
  launcher.setAttribute('aria-controls','maca-assistant-panel');
  launcher.innerHTML='<span class="maca-assistant-launcher-icon" aria-hidden="true">💬</span><span>Posez votre question</span><span class="maca-assistant-launcher-badge">Bêta</span>';

  const panel=document.createElement('section');
  panel.id='maca-assistant-panel';
  panel.className='maca-assistant-panel';
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-modal','false');
  panel.setAttribute('aria-labelledby','maca-assistant-title');
  panel.setAttribute('data-open','false');
  panel.innerHTML=`<header class="maca-assistant-head"><div class="maca-assistant-head-copy"><strong class="maca-assistant-head-title" id="maca-assistant-title">Assistant MACA</strong><span class="maca-assistant-head-subtitle">Recherche dans nos fiches santé vérifiées</span></div><button class="maca-assistant-close" type="button" aria-label="Fermer l’assistant">×</button></header><iframe class="maca-assistant-frame" title="Assistant MACA" src="assistant-alpha.html?v=20260901-catfix1"></iframe><span class="maca-assistant-screen-reader" aria-live="polite" id="maca-assistant-status"></span>`;

  document.body.appendChild(panel);
  document.body.appendChild(launcher);

  const closeButton=panel.querySelector('.maca-assistant-close');
  const frame=panel.querySelector('.maca-assistant-frame');
  const status=panel.querySelector('#maca-assistant-status');

  function setOpen(open){
    panel.setAttribute('data-open',open?'true':'false');
    launcher.setAttribute('aria-expanded',open?'true':'false');
    document.body.classList.toggle('maca-assistant-open',open);
    status.textContent=open?'Assistant MACA ouvert':'Assistant MACA fermé';
    if(open){
      window.setTimeout(()=>{
        try{frame.contentDocument && frame.contentDocument.getElementById('alpha-query')?.focus();}catch(e){}
      },80);
    }else launcher.focus();
  }

  launcher.addEventListener('click',()=>setOpen(panel.getAttribute('data-open')!=='true'));
  closeButton.addEventListener('click',()=>setOpen(false));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&panel.getAttribute('data-open')==='true')setOpen(false);});

  frame.addEventListener('load',()=>{
    try{
      const href=frame.contentWindow.location.href;
      const parsed=new URL(href,window.location.href);
      if(parsed.pathname.endsWith('/fiches.html')||parsed.pathname.endsWith('fiches.html')){
        window.location.href=parsed.href;
        return;
      }
      const doc=frame.contentDocument;
      if(!doc) return;
      const brand=doc.querySelector('.brand');
      const lab=doc.querySelector('.lab');
      const wrap=doc.querySelector('.wrap');
      const card=doc.querySelector('.card');
      if(brand) brand.style.display='none';
      if(lab) lab.style.display='none';
      if(wrap){wrap.style.maxWidth='none';wrap.style.padding='0';}
      if(card){card.style.marginTop='0';card.style.border='0';card.style.borderRadius='0';card.style.boxShadow='none';card.style.minHeight='100vh';}
      doc.body.style.background='#fff';
      const openLink=doc.getElementById('open');
      if(openLink) openLink.setAttribute('target','_top');
    }catch(error){
      console.warn('[MACA assistant widget] iframe adaptation unavailable',error);
    }
  });
})();
