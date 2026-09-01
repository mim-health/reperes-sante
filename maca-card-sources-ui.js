/* MACA Santé — multi-source UI for canonical health cards. */
(function(){
  'use strict';
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function findCard(id){return (window.healthQuestions||[]).find(q=>String(q.id)===String(id));}
  function render(id){
    const q=findCard(id);
    if(!q||!Array.isArray(q.sources)||!q.sources.length)return;
    const box=document.querySelector('#modal-content .source-box');
    if(!box)return;
    const rows=q.sources.filter(s=>s&&/^https?:\/\//i.test(String(s.url||''))).map((s,i)=>`<div style="padding:${i?'12px 0 0':'8px 0 0'};${i?'border-top:1px solid #dce7e3;margin-top:12px;':''}"><div style="font-weight:700;color:#203631">${esc(s.org||'Source')}</div><div style="margin-top:3px;line-height:1.45">${esc(s.title||'')}${s.year?` · ${esc(s.year)}`:''}</div><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:5px">Consulter cette source →</a></div>`).join('');
    if(!rows)return;
    const meta=[];
    if(q.evidenceStatus)meta.push(esc(q.evidenceStatus));
    if(q.verifiedAt)meta.push(`Vérifié le ${esc(q.verifiedAt)}`);
    box.innerHTML=`<strong>Sources utilisées</strong>${rows}${meta.length?`<div style="margin-top:14px;padding-top:12px;border-top:1px solid #dce7e3;color:#667873">${meta.join(' · ')}</div>`:''}`;
  }
  function schedule(id){requestAnimationFrame(()=>render(id));}
  document.addEventListener('click',e=>{const card=e.target.closest?.('.qa-card');if(card?.dataset?.qid)schedule(card.dataset.qid);});
  document.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const card=e.target.closest?.('.qa-card');if(card?.dataset?.qid)schedule(card.dataset.qid);});
})();
