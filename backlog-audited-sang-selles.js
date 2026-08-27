/* MACA Santé — ajout issu des tests utilisateurs V1 — 23/08/2026 */
(function(){
  const item={
    id:'sang-dans-les-selles-que-faire',
    category:'Santé au quotidien',
    question:'J’ai du sang dans mes selles : que faire ?',
    shortAnswer:'Du sang dans les selles mérite un avis médical pour en rechercher la cause. Une petite quantité de sang rouge peut notamment venir d’hémorroïdes ou d’une fissure anale, mais d’autres causes digestives sont possibles. Si le saignement est très abondant ou s’accompagne de malaise, pâleur, sueurs, respiration ou cœur rapides, il faut contacter sans tarder les urgences médicales.',
    answer:'La couleur, la quantité et les circonstances du saignement sont utiles à préciser. Du sang rouge peut provenir de l’anus, du rectum ou du côlon ; les hémorroïdes et les fissures anales font partie des causes fréquentes, mais un polype, une maladie inflammatoire digestive ou plus rarement un cancer colorectal peuvent aussi être en cause. Des selles noires peuvent correspondre à du sang digéré et doivent également conduire à un avis médical. Si le saignement est peu abondant, prenez rendez-vous avec votre médecin. Notez sa fréquence, sa couleur, sa quantité, les douleurs, diarrhée ou constipation associées et les médicaments pris, notamment anticoagulants ou anti-inflammatoires. En cas de saignement très abondant avec altération de l’état général, contactez les urgences médicales (15 ou 112 en France).',
    keywords:['sang selles','sang dans les selles','selles sang','rectorragie','rectorragies','sang anus','saignement anus','saignement anal','sang rouge selles','selles noires','melena','méléna','hemorroides','hémorroïdes','fissure anale'],
    sources:['Assurance Maladie — Rectorragie : définition et causes (19/02/2026)','Assurance Maladie — Sang dans les selles : que faire ? (19/02/2026)','Société française d’endoscopie digestive — Hémorragie digestive basse : conduite à tenir (2024)'],
    sourceUrls:['https://www.ameli.fr/assure/sante/themes/rectorragie-sang-dans-les-selles/definition-causes','https://www.ameli.fr/assure/sante/themes/rectorragie-sang-dans-les-selles/que-faire-quand-consulter'],
    verifiedAt:'23/08/2026',
    nextAuditAt:'23/11/2026'
  };
  const lists=['QA_DATA','qaData','BACKLOG_AUDITED','backlogAudited'];
  let added=false;
  for(const key of lists){if(Array.isArray(window[key])){if(!window[key].some(x=>x&&(x.id===item.id||x.question===item.question)))window[key].push(item);added=true;}}
  if(!added){window.MACA_EXTRA_QA=window.MACA_EXTRA_QA||[];window.MACA_EXTRA_QA.push(item);}
})();