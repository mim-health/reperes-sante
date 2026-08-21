// Affichage automatique du dernier Vrai/Faux audité
(function(){
  const items = window.SANTEJUSTE_VRAI_FAUX || [];
  if(!items.length) return;
  const latest = [...items].sort((a,b)=>String(b.reviewedAt||'').localeCompare(String(a.reviewedAt||'')))[0];
  const section = document.querySelector('#verifier');
  if(!section) return;
  section.innerHTML = `
    <div>
      <span class="pill light">VRAI OU FAUX ?</span>
      <h2>« ${latest.question} »</h2>
    </div>
    <div class="verdict">
      <span>${latest.verdict}</span>
      <p>${latest.essential}</p>
      <button class="read-more" id="latest-vrai-faux-more">Voir ce que disent les données →</button>
    </div>`;

  const btn = document.querySelector('#latest-vrai-faux-more');
  const modal = document.querySelector('#article-modal');
  const modalContent = document.querySelector('#modal-content');
  if(!btn || !modal || !modalContent) return;

  btn.addEventListener('click',()=>{
    const sources = (latest.sources||[]).map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join('');
    modalContent.innerHTML = `
      <span class="pill">VRAI OU FAUX ? · ${latest.verdict}</span>
      <h2>${latest.question}</h2>
      <div class="answer-block"><strong>Réponse courte</strong><p>${latest.essential}</p></div>
      <p>${latest.explanation||''}</p>
      ${latest.practical?`<div class="watch-block"><strong>À retenir</strong><p>${latest.practical}</p></div>`:''}
      <div class="source-box"><strong>Sources vérifiées</strong><ul>${sources}</ul><div class="evidence-meta"><span>Vérifié le ${latest.reviewedAt||''}</span></div></div>`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
})();
