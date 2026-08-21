// Correctif d'affichage éditorial + mobile — 21/08/2026
(function(){
  const modal = document.querySelector('#article-modal');
  const modalContent = document.querySelector('#modal-content');

  function openModal(){
    if(!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function closeModal(){
    if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  // Sécurise la fermeture des modales même si app.js s'est interrompu plus tôt.
  const closeBtn=document.querySelector('.close');
  if(closeBtn) closeBtn.addEventListener('click',closeModal);
  if(modal) modal.addEventListener('click',e=>{if(e.target===modal) closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});

  // Navigation mobile visible en permanence : Recherche · À la une · Vrai/Faux · Sources.
  const style=document.createElement('style');
  style.textContent=`
  @media(max-width:800px){
    .site-header{height:auto!important;min-height:66px;flex-wrap:wrap;padding:10px 18px 9px!important}
    .site-header nav{display:flex!important;position:static!important;order:3;width:100%;flex-direction:row!important;gap:8px!important;overflow-x:auto;padding:8px 0 0!important;background:transparent!important;border:0!important;box-shadow:none!important;scrollbar-width:none}
    .site-header nav::-webkit-scrollbar{display:none}
    .site-header nav a{font-size:12px!important;padding:8px 12px!important;border:1px solid var(--line)!important;border-radius:999px;background:#fff;white-space:nowrap}
    .menu{display:none!important}
    .intro{padding-top:42px!important}
  }`;
  document.head.appendChild(style);
  const navLinks=document.querySelectorAll('.site-header nav a');
  if(navLinks[0]) navLinks[0].textContent='Recherche';

  // Contenus éditoriaux explicitement validés les 20-21 août 2026.
  const validatedArticles=[
    {
      id:'cmv-grossesse-2026',category:'À LA UNE',icon:'CMV',
      title:'CMV pendant la grossesse : que se passe-t-il après un dépistage positif ?',
      excerpt:'La HAS, le CNGOF et la Société Française de Pédiatrie convergent sur une prise en charge spécialisée, nuancée et fondée sur le risque réel pour le fœtus et l’enfant.',
      source:'HAS · CNGOF · Société Française de Pédiatrie · 2025-2026',
      url:'https://www.has-sante.fr/jcms/p_3748990/fr/depistage-du-cytomegalovirus-au-1er-trimestre-de-la-grossesse-prise-en-charge-et-suivi',
      sources:[
        {label:'Haute Autorité de Santé — Dépistage du CMV au 1er trimestre : prise en charge et suivi',url:'https://www.has-sante.fr/jcms/p_3748990/fr/depistage-du-cytomegalovirus-au-1er-trimestre-de-la-grossesse-prise-en-charge-et-suivi'},
        {label:'CNGOF — Dépistage systématique du cytomégalovirus : en pratique',url:'https://cngof.fr/actualite/depistage-systematique-du-cytomegalovirus-cmv-en-pratique/'},
        {label:'Société Française de Pédiatrie — veille et perfectionnement pédiatrique sur le CMV congénital',url:'https://www.sfpediatrie.com/ressources/veille-bibliographique-congres/larticle-du-trimestre-perfectionnement-pediatrie'}
      ],
      body:'Le CMV est une infection fréquente et souvent silencieuse. La HAS recommande un dépistage au premier trimestre chez les femmes enceintes séronégatives ou dont le statut est inconnu, avec répétition de la sérologie jusqu’à 13–14 SA si elle reste négative. En cas de primo-infection périconceptionnelle ou au premier trimestre, une confirmation diagnostique et un avis spécialisé sont nécessaires ; un traitement par valaciclovir peut être discuté et une amniocentèse peut être proposée à partir de 18 SA dans un cadre spécialisé. Le CNGOF rappelle qu’une infection maternelle ne signifie pas automatiquement infection fœtale : la transmission au premier trimestre est de l’ordre de 20 à 35 %, et une infection fœtale n’entraîne pas nécessairement de séquelles. Le suivi repose sur l’échographie spécialisée et, selon le contexte, le CPDPN. La Société Française de Pédiatrie complète ce cadre par le versant néonatal : lorsqu’une infection congénitale est confirmée, un suivi pédiatrique, notamment auditif et neurologique, est important car certaines séquelles peuvent apparaître secondairement, y compris chez des nouveau-nés initialement peu symptomatiques. Le message essentiel est donc d’éviter à la fois la banalisation et l’alarmisme : un résultat positif nécessite une prise en charge structurée, mais ne préjuge pas à lui seul du devenir de l’enfant.'
    },
    {
      id:'pneumocoque-2026',category:'À LA UNE',icon:'VPC',
      title:'Pneumocoque : PREVENAR 20 et CAPVAXIVE changent la stratégie vaccinale',
      excerpt:'La HAS recommande désormais PREVENAR 20 chez les nourrissons et enfants à risque, et CAPVAXIVE préférentiellement chez certains adultes.',
      source:'Haute Autorité de Santé · 30 juillet 2026',
      url:'https://www.has-sante.fr/jcms/p_3601959/fr/revision-de-la-strategie-de-vaccination-contre-les-infections-invasives-a-pneumocoques-place-des-vaccins-a-haute-valence-prevenar-20-chez-les-nourrissons-les-enfants-et-les-adultes-et-capvaxive-chez-les-adultes',
      body:'La stratégie française de vaccination contre les infections à pneumocoques a été actualisée. La HAS recommande désormais PREVENAR 20 chez les nourrissons et les enfants à risque. Chez les adultes à risque et les personnes âgées de 65 ans et plus, elle recommande un recours préférentiel au vaccin 21-valent CAPVAXIVE. Ces recommandations tiennent compte des sérotypes circulants en France et de l’arrivée de vaccins à plus haute valence.'
    },
    {
      id:'coeliaque-2026',category:'À LA UNE',icon:'GLU',
      title:'Maladie cœliaque : ne pas arrêter le gluten avant le diagnostic',
      excerpt:'La HAS rappelle qu’un régime sans gluten commencé trop tôt peut fausser les examens diagnostiques.',
      source:'Haute Autorité de Santé · 28 juillet 2026',
      url:'https://www.has-sante.fr/jcms/p_4231687/fr/maladie-coeliaque-diagnostic-chez-l-enfant-et-l-adulte',
      body:'La HAS a publié en juillet 2026 une recommandation sur le diagnostic de la maladie cœliaque chez l’enfant et l’adulte. Point important : un régime sans gluten ne doit pas être débuté avant la confirmation diagnostique, car il peut rendre les examens faussement négatifs. En première intention, la sérologie repose notamment sur les anticorps IgA anti-transglutaminase associés au dosage des IgA totales.'
    },
    {
      id:'acouphenes-chiffre-2026',category:'LE CHIFFRE',icon:'1/5',
      title:'Acouphènes : environ une personne sur cinq est concernée',
      excerpt:'La HAS estime qu’environ un adulte sur cinq présente des acouphènes, parfois avec un retentissement important au quotidien.',
      source:'Haute Autorité de Santé · 16 juillet 2026',
      url:'https://www.has-sante.fr/',
      body:'Les acouphènes — sifflements, bourdonnements ou autres sons perçus sans source extérieure — concernent environ une personne sur cinq. Chez certaines personnes, ils deviennent invalidants et peuvent perturber le sommeil, la concentration, la vie sociale ou favoriser l’anxiété. La HAS a publié en juillet 2026 des recommandations visant à améliorer le diagnostic et la prise en charge des adultes présentant des acouphènes chroniques invalidants.'
    },
    {
      id:'cortisol-2026',category:'VRAI OU FAUX',icon:'FAUX',
      title:'Stress ou fatigue : faut-il faire baisser son cortisol ?',
      excerpt:'Faux : le cortisol est une hormone indispensable et le stress ou la fatigue ne prouvent pas un excès pathologique.',
      source:'Inserm · Société Française d’Endocrinologie · 2026',
      url:'https://presse.inserm.fr/canal-detox/faut-il-vraiment-reguler-son-cortisol/?theme=sante-mentale',
      body:'FAUX. Le cortisol n’est pas une hormone toxique qu’il faudrait systématiquement faire baisser. Il participe notamment à l’adaptation au stress, au métabolisme et au rythme veille-sommeil. Un véritable hypercortisolisme existe dans certaines maladies endocriniennes, mais fatigue, stress ou prise de poids ne suffisent pas à le diagnostiquer et ne justifient pas un dosage systématique.'
    },
    {
      id:'gluten-diagnostic-2026',category:'VRAI OU FAUX',icon:'FAUX',
      title:'Pour rechercher une maladie cœliaque, faut-il supprimer le gluten avant la prise de sang ?',
      excerpt:'Faux : supprimer le gluten avant les examens peut rendre les tests faussement négatifs.',
      source:'Haute Autorité de Santé · 28 juillet 2026',
      url:'https://www.has-sante.fr/jcms/p_4231687/fr/maladie-coeliaque-diagnostic-chez-l-enfant-et-l-adulte',
      body:'FAUX. La HAS recommande de ne pas débuter un régime sans gluten avant confirmation du diagnostic de maladie cœliaque. La diminution ou l’arrêt du gluten peut faire baisser les marqueurs biologiques et rendre les examens faussement négatifs, ce qui complique le diagnostic.'
    }
  ];

  const grid=document.querySelector('#article-grid');
  if(grid){
    grid.innerHTML=validatedArticles.map(a=>`<article class="card" data-editorial-id="${a.id}" tabindex="0"><div class="card-art">${a.icon}</div><span class="category">${a.category}</span><h3>${a.title}</h3><p>${a.excerpt}</p><small>${a.source}</small></article>`).join('');
    const openEditorial=(id)=>{
      const a=validatedArticles.find(x=>x.id===id); if(!a||!modalContent) return;
      const sourceBlock=(a.sources&&a.sources.length)
        ? `<div class="source-box"><strong>Sources vérifiées</strong><ul>${a.sources.map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join('')}</ul></div>`
        : `<div class="source-box"><strong>Source vérifiée</strong><br>${a.source}<br><a href="${a.url}" target="_blank" rel="noopener">Consulter la source originale →</a></div>`;
      modalContent.innerHTML=`<span class="pill">${a.category}</span><h2>${a.title}</h2><p>${a.body}</p>${sourceBlock}`;
      openModal();
    };
    grid.addEventListener('click',e=>{const c=e.target.closest('[data-editorial-id]');if(c)openEditorial(c.dataset.editorialId);});
    grid.addEventListener('keydown',e=>{const c=e.target.closest('[data-editorial-id]');if(c&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openEditorial(c.dataset.editorialId);}});
    const countBtn=document.querySelector('#comprendre .text-button');
    if(countBtn) countBtn.textContent=`${validatedArticles.length} sujets vérifiés →`;
  }

  // Met à jour le chiffre du jour avec le contenu validé sur les acouphènes.
  const hero=document.querySelector('#chiffre-du-jour .hero-copy');
  if(hero){
    hero.innerHTML=`<span class="pill">LE CHIFFRE DU JOUR</span><p class="big-number">1 sur 5</p><h2>adultes environ sont concernés par les acouphènes</h2><p>Chez certaines personnes, ces sons perçus sans source extérieure deviennent invalidants et peuvent perturber le sommeil, la concentration ou la vie sociale.</p><div class="source-line"><span>Source vérifiée</span> Haute Autorité de Santé · 16 juillet 2026</div>`;
  }
  const rings=document.querySelector('#chiffre-du-jour .rings');
  if(rings) rings.innerHTML='<b>1/5</b><small>adultes</small>';

  // Met en avant le Vrai/Faux running/prolapsus validé, sinon le dernier audité.
  const items=window.SANTEJUSTE_VRAI_FAUX||[];
  if(items.length){
    const featured=items.find(x=>x.id==='running-prolapsus-2026-08') || [...items].sort((a,b)=>String(b.reviewedAt||'').localeCompare(String(a.reviewedAt||'')))[0];
    const section=document.querySelector('#verifier');
    if(section){
      section.innerHTML=`<div><span class="pill light">VRAI OU FAUX ?</span><h2>« ${featured.question} »</h2></div><div class="verdict"><span>${featured.verdict}</span><p>${featured.essential}</p><button class="read-more" id="latest-vrai-faux-more">Voir ce que disent les données →</button></div>`;
      const btn=document.querySelector('#latest-vrai-faux-more');
      if(btn&&modalContent){
        btn.addEventListener('click',()=>{
          const sources=(featured.sources||[]).map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join('');
          modalContent.innerHTML=`<span class="pill">VRAI OU FAUX ? · ${featured.verdict}</span><h2>${featured.question}</h2><div class="answer-block"><strong>Réponse courte</strong><p>${featured.essential}</p></div><p>${featured.explanation||''}</p>${featured.practical?`<div class="watch-block"><strong>À retenir</strong><p>${featured.practical}</p></div>`:''}<div class="source-box"><strong>Sources vérifiées</strong><ul>${sources}</ul><div class="evidence-meta"><span>Vérifié le ${featured.reviewedAt||''}</span></div></div>`;
          openModal();
        });
      }
    }
  }
})();
