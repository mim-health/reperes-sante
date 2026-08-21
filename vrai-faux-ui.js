// MACA Santé — rendez-vous éditoriaux quotidiens
// Règle validée le 21/08/2026 : un seul Vrai/Faux + un seul Chiffre du jour visibles.
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

  const closeBtn=document.querySelector('.close');
  if(closeBtn) closeBtn.addEventListener('click',closeModal);
  if(modal) modal.addEventListener('click',e=>{if(e.target===modal) closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});

  // Navigation mobile + retour visuel discret sur les cartes cliquables.
  const style=document.createElement('style');
  style.textContent=`
  @media(max-width:800px){
    .site-header{height:auto!important;min-height:66px;flex-wrap:wrap;padding:10px 18px 9px!important}
    .site-header nav{display:flex!important;position:static!important;order:3;width:100%;flex-direction:row!important;gap:8px!important;overflow-x:auto;padding:8px 0 0!important;background:transparent!important;border:0!important;box-shadow:none!important;scrollbar-width:none}
    .site-header nav::-webkit-scrollbar{display:none}
    .site-header nav a{font-size:12px!important;padding:8px 12px!important;border:1px solid var(--line)!important;border-radius:999px;background:#fff;white-space:nowrap}
    .menu{display:none!important}
    .intro{padding-top:42px!important}
  }
  #chiffre-du-jour[data-clickable="true"], .numbers article[data-clickable="true"]{cursor:pointer}
  #chiffre-du-jour[data-clickable="true"]:focus-visible, .numbers article[data-clickable="true"]:focus-visible{outline:3px solid #2f7d6b;outline-offset:4px}
  `;
  document.head.appendChild(style);
  const navLinks=document.querySelectorAll('.site-header nav a');
  if(navLinks[0]) navLinks[0].textContent='Recherche';

  // À la une reste une sélection éditoriale permanente : aucun ancien Vrai/Faux ou Chiffre n'y est archivé publiquement.
  const validatedArticles=[
    {
      id:'cmv-grossesse-2026',category:'À LA UNE',icon:'CMV',
      title:'CMV pendant la grossesse : que se passe-t-il après un dépistage positif ?',
      excerpt:'La HAS, le CNGOF et la Société Française de Pédiatrie convergent sur une prise en charge spécialisée, nuancée et fondée sur le risque réel pour le fœtus et l’enfant.',
      source:'HAS · CNGOF · Société Française de Pédiatrie · 2025-2026',
      url:'https://www.has-sante.fr/jcms/p_3748990/fr/depistage-du-cytomegalovirus-au-1er-trimestre-de-la-grossesse-prise-en-charge-et-suivi',
      body:'Le CMV est une infection fréquente et souvent silencieuse. En cas de primo-infection périconceptionnelle ou au premier trimestre, une confirmation diagnostique et un avis spécialisé sont nécessaires. Le message essentiel est d’éviter à la fois la banalisation et l’alarmisme : un résultat positif nécessite une prise en charge structurée, mais ne préjuge pas à lui seul du devenir de l’enfant.'
    },
    {
      id:'pneumocoque-2026',category:'À LA UNE',icon:'VPC',
      title:'Pneumocoque : PREVENAR 20 et CAPVAXIVE changent la stratégie vaccinale',
      excerpt:'La HAS recommande désormais PREVENAR 20 chez les nourrissons et enfants à risque, et CAPVAXIVE préférentiellement chez certains adultes.',
      source:'Haute Autorité de Santé · 30 juillet 2026',
      url:'https://www.has-sante.fr/jcms/p_3601959/fr/revision-de-la-strategie-de-vaccination-contre-les-infections-invasives-a-pneumocoques-place-des-vaccins-a-haute-valence-prevenar-20-chez-les-nourrissons-les-enfants-et-les-adultes-et-capvaxive-chez-les-adultes',
      body:'La stratégie française de vaccination contre les infections à pneumocoques a été actualisée. La HAS recommande désormais PREVENAR 20 chez les nourrissons et les enfants à risque. Chez les adultes à risque et les personnes âgées de 65 ans et plus, elle recommande un recours préférentiel au vaccin 21-valent CAPVAXIVE.'
    },
    {
      id:'coeliaque-2026',category:'À LA UNE',icon:'GLU',
      title:'Maladie cœliaque : ne pas arrêter le gluten avant le diagnostic',
      excerpt:'La HAS rappelle qu’un régime sans gluten commencé trop tôt peut fausser les examens diagnostiques.',
      source:'Haute Autorité de Santé · 28 juillet 2026',
      url:'https://www.has-sante.fr/jcms/p_4231687/fr/maladie-coeliaque-diagnostic-chez-l-enfant-et-l-adulte',
      body:'La HAS a publié en juillet 2026 une recommandation sur le diagnostic de la maladie cœliaque chez l’enfant et l’adulte. Un régime sans gluten ne doit pas être débuté avant la confirmation diagnostique, car il peut rendre les examens faussement négatifs.'
    }
  ];

  const grid=document.querySelector('#article-grid');
  if(grid){
    grid.innerHTML=validatedArticles.map(a=>`<article class="card" data-editorial-id="${a.id}" tabindex="0"><div class="card-art">${a.icon}</div><span class="category">${a.category}</span><h3>${a.title}</h3><p>${a.excerpt}</p><small>${a.source}</small></article>`).join('');
    const openEditorial=(id)=>{
      const a=validatedArticles.find(x=>x.id===id); if(!a||!modalContent) return;
      modalContent.innerHTML=`<span class="pill">${a.category}</span><h2>${a.title}</h2><p>${a.body}</p><div class="source-box"><strong>Source vérifiée</strong><br>${a.source}<br><a href="${a.url}" target="_blank" rel="noopener">Consulter la source originale →</a></div>`;
      openModal();
    };
    grid.addEventListener('click',e=>{const c=e.target.closest('[data-editorial-id]');if(c)openEditorial(c.dataset.editorialId);});
    grid.addEventListener('keydown',e=>{const c=e.target.closest('[data-editorial-id]');if(c&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openEditorial(c.dataset.editorialId);}});
  }

  function makeClickable(element, label, handler){
    if(!element) return;
    element.dataset.clickable='true';
    element.setAttribute('role','button');
    element.setAttribute('tabindex','0');
    element.setAttribute('aria-label',label);
    element.addEventListener('click',handler);
    element.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();handler();}
    });
  }

  // CHIFFRE DU JOUR — un seul visible ; le prochain remplace celui-ci sans créer d'archive publique.
  const heroSection=document.querySelector('#chiffre-du-jour');
  const hero=document.querySelector('#chiffre-du-jour .hero-copy');
  if(hero){
    hero.innerHTML=`<span class="pill">LE CHIFFRE DU JOUR</span><p class="big-number">1 sur 5</p><h2>adultes environ sont concernés par les acouphènes</h2><p>Chez certaines personnes, ces sons perçus sans source extérieure deviennent invalidants et peuvent perturber le sommeil, la concentration ou la vie sociale.</p><div class="source-line"><span>Source vérifiée</span> Haute Autorité de Santé · 16 juillet 2026</div>`;
  }
  const rings=document.querySelector('#chiffre-du-jour .rings');
  if(rings) rings.innerHTML='<b>1/5</b><small>adultes</small>';

  makeClickable(heroSection,'En savoir plus sur le chiffre du jour : les acouphènes',()=>{
    if(!modalContent) return;
    modalContent.innerHTML=`<span class="pill">LE CHIFFRE DU JOUR</span><h2>Combien de personnes sont concernées par les acouphènes ?</h2><div class="answer-block"><strong>Réponse courte</strong><p>Environ un adulte sur cinq est concerné par des acouphènes.</p></div><p>Les acouphènes correspondent à la perception de sons sans source sonore extérieure. Leur retentissement est très variable : chez certaines personnes ils restent discrets, tandis que chez d’autres ils peuvent perturber le sommeil, la concentration ou la qualité de vie.</p><div class="watch-block"><strong>À retenir</strong><p>Des acouphènes persistants, unilatéraux, pulsatiles ou associés à une baisse auditive justifient une évaluation médicale adaptée.</p></div><div class="source-box"><strong>Source vérifiée</strong><br>Haute Autorité de Santé · 16 juillet 2026<br><a href="https://www.has-sante.fr/" target="_blank" rel="noopener">Consulter la source →</a></div>`;
    openModal();
  });

  // Les trois données à retenir deviennent elles aussi des portes d'entrée vers une explication sourcée.
  const statDetails=[
    {
      title:'Hypertension : combien d’adultes se déclarent concernés ?',
      short:'En 2024, 22 % des adultes de 18 à 79 ans déclarent avoir une hypertension artérielle.',
      body:'La fréquence augmente fortement avec l’âge. Ce chiffre correspond à une hypertension déclarée : il ne mesure pas à lui seul l’ensemble des personnes hypertendues, car une partie de l’HTA reste méconnue.',
      source:'Santé publique France · Baromètre 2024',
      url:'https://www.santepubliquefrance.fr/hypertension-arterielle/donnees'
    },
    {
      title:'Combien de temps dorment en moyenne les adultes en France ?',
      short:'Le Baromètre 2024 rapporte 7 h 32 de sommeil moyen sur 24 heures chez les adultes de 18 à 79 ans.',
      body:'Une moyenne ne décrit pas toutes les situations : certaines personnes dorment nettement moins, d’autres davantage. La qualité du sommeil, les horaires et le retentissement dans la journée comptent autant que la durée brute.',
      source:'Santé publique France · Baromètre 2024',
      url:'https://www.santepubliquefrance.fr/sommeil/donnees'
    },
    {
      title:'Les Français consomment-ils assez de fibres ?',
      short:'Les apports moyens sont d’environ 18 g de fibres par jour, pour un repère de 30 g par jour chez l’adulte.',
      body:'Les fruits et légumes, les légumes secs et les produits céréaliers complets ou peu raffinés sont les principales pistes pour augmenter les apports. L’objectif est la diversité alimentaire plutôt qu’un aliment miracle.',
      source:'Anses · repères nutritionnels',
      url:'https://www.anses.fr/fr/content/nutrition-et-cancers-quelles-recommandations'
    }
  ];

  document.querySelectorAll('.numbers .stat-grid article').forEach((card,index)=>{
    const detail=statDetails[index];
    if(!detail) return;
    makeClickable(card,`En savoir plus : ${detail.title}`,()=>{
      if(!modalContent) return;
      modalContent.innerHTML=`<span class="pill">DONNÉE À RETENIR</span><h2>${detail.title}</h2><div class="answer-block"><strong>Réponse courte</strong><p>${detail.short}</p></div><p>${detail.body}</p><div class="source-box"><strong>Source vérifiée</strong><br>${detail.source}<br><a href="${detail.url}" target="_blank" rel="noopener">Consulter la source →</a></div>`;
      openModal();
    });
  });

  // VRAI/FAUX DU JOUR — un seul visible ; aujourd'hui : cortisol.
  const section=document.querySelector('#verifier');
  if(section){
    const question='Quand on est stressé ou fatigué, faut-il faire baisser son cortisol ?';
    const essential='Non. Le cortisol est une hormone indispensable et le stress ou la fatigue ne prouvent pas un excès pathologique.';
    const explanation='Le cortisol participe notamment à l’adaptation au stress, au métabolisme et au rythme veille-sommeil. Un véritable hypercortisolisme existe dans certaines maladies endocriniennes, mais fatigue, stress ou prise de poids ne suffisent pas à le diagnostiquer et ne justifient pas un dosage systématique.';
    section.innerHTML=`<div><span class="pill light">VRAI OU FAUX ?</span><h2>« ${question} »</h2></div><div class="verdict"><span>FAUX</span><p>${essential}</p><button class="read-more" id="daily-vrai-faux-more">Voir ce que disent les données →</button></div>`;
    const btn=document.querySelector('#daily-vrai-faux-more');
    if(btn&&modalContent){
      btn.addEventListener('click',()=>{
        modalContent.innerHTML=`<span class="pill">VRAI OU FAUX ? · FAUX</span><h2>${question}</h2><div class="answer-block"><strong>Réponse courte</strong><p>${essential}</p></div><p>${explanation}</p><div class="source-box"><strong>Sources vérifiées</strong><br>Inserm · Société Française d’Endocrinologie · 2026<br><a href="https://presse.inserm.fr/canal-detox/faut-il-vraiment-reguler-son-cortisol/?theme=sante-mentale" target="_blank" rel="noopener">Consulter la source →</a></div>`;
        openModal();
      });
    }
  }
})();
