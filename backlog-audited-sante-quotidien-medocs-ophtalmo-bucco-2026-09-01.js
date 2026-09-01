// MACA Santé — mini-lot santé au quotidien validé Pilotage 01/09/2026
// Antihistaminiques / IPP au long cours / mouches volantes / gencives qui saignent.
window.healthQuestions = window.healthQuestions || [];
window.healthQuestions.push(
  {
    id:"antihistaminique-tous-les-jours",
    category:"Santé au quotidien",
    title:"Puis-je prendre un antihistaminique tous les jours ?",
    keywords:"antihistaminique tous les jours antihistaminiques quotidien cetirizine loratadine desloratadine allergie rhinite urticaire somnolence traitement allergie long terme",
    answer:"Oui, dans certaines situations allergiques, notamment une rhinite persistante ou une urticaire chronique, un antihistaminique de deuxième génération peut être utilisé chaque jour pendant une période prolongée. Ces molécules sont privilégiées car elles provoquent globalement moins de somnolence et d’effets anticholinergiques que les antihistaminiques de première génération. Cela ne signifie toutefois pas qu’il faut poursuivre automatiquement le même traitement sans réévaluer la cause des symptômes, la molécule utilisée et son efficacité.",
    watch:"Même avec un antihistaminique de deuxième génération, une somnolence peut survenir chez certaines personnes, notamment avec la cétirizine. Si un traitement quotidien reste nécessaire pendant des semaines ou des mois, si les symptômes restent mal contrôlés ou si un asthme est associé, une réévaluation médicale est utile ; les antihistaminiques ne traitent pas l’asthme lui-même.",
    source:"Assurance Maladie · guideline internationale urticaire",
    url:"https://www.ameli.fr/assure/sante/themes/allergie/traitement-allergie",
    sources:[
      {org:"Assurance Maladie",title:"Traitement de l’allergie",year:"2026",url:"https://www.ameli.fr/assure/sante/themes/allergie/traitement-allergie"},
      {org:"Assurance Maladie",title:"Rhinite allergique et rhume des foins : diagnostic et traitement",year:"2026",url:"https://www.ameli.fr/assure/sante/themes/rhinite-allergique-et-rhume-des-foins/rhinite-allergique-et-rhume-des-foins-diagnostic-et-traitement"},
      {org:"EAACI / GA²LEN / EuroGuiDerm / APAAACI",title:"International guideline for urticaria",year:"2026",url:"https://pubmed.ncbi.nlm.nih.gov/41649409/"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Références françaises + guideline internationale récente"
  },
  {
    id:"ipp-long-cours-omeprazole",
    category:"Santé au quotidien",
    title:"Je prends de l’oméprazole depuis longtemps : est-ce dangereux ?",
    keywords:"omeprazole long terme ipp inhibiteur pompe protons esomeprazole pantoprazole reflux traitement long cours arrêter ipp rebond acide sécurité ipp",
    answer:"Pas forcément. Les inhibiteurs de la pompe à protons, ou IPP, sont globalement des médicaments bien tolérés lorsqu’ils sont utilisés pour une indication claire. Certaines situations peuvent justifier un traitement prolongé, par exemple une œsophagite sévère, un œsophage de Barrett ou un risque élevé de saignement digestif. En revanche, les IPP sont souvent poursuivis plus longtemps que nécessaire : dans un reflux simple, le traitement initial est généralement limité puis réévalué. Lorsqu’un IPP reste nécessaire au long cours, la dose minimale efficace est recherchée.",
    watch:"Il ne faut pas arrêter seul un IPP prescrit pour une indication à risque ou après une complication digestive. Après un traitement prolongé, l’arrêt peut provoquer temporairement un rebond d’acidité et le retour de brûlures, ce qui ne signifie pas forcément que le médicament doit être repris définitivement. Les nombreux risques parfois attribués aux IPP au long cours reposent souvent sur des associations observées et ne prouvent pas toujours un lien de causalité.",
    source:"HAS · Assurance Maladie · AGA",
    url:"https://www.has-sante.fr/jcms/p_3372966/fr/fiche-bon-usage-des-inhibiteurs-de-la-pompe-a-protons-ipp",
    sources:[
      {org:"HAS",title:"Bon usage des inhibiteurs de la pompe à protons (IPP)",year:"2022",url:"https://www.has-sante.fr/jcms/p_3372966/fr/fiche-bon-usage-des-inhibiteurs-de-la-pompe-a-protons-ipp"},
      {org:"Assurance Maladie",title:"Diagnostic et traitement du reflux gastro-œsophagien de l’adulte",year:"2026",url:"https://www.ameli.fr/assure/sante/themes/rgo-adulte/diagnostic-traitements"},
      {org:"American Gastroenterological Association",title:"Clinical Practice Update on De-Prescribing of Proton Pump Inhibitors",year:"2022",url:"https://pubmed.ncbi.nlm.nih.gov/35183361/"},
      {org:"Clinical Gastroenterology and Hepatology",title:"Long-Term Proton Pump Inhibitor Use: Review of Indications and Special Considerations",year:"2024",url:"https://pubmed.ncbi.nlm.nih.gov/38471653/"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"HAS + Assurance Maladie + littérature gastroentérologique récente"
  },
  {
    id:"mouches-volantes-quand-consulter",
    category:"Santé au quotidien",
    title:"Je vois des mouches volantes devant les yeux : est-ce normal ?",
    keywords:"mouches volantes yeux corps flottants myodesopsies points noirs oeil éclairs flash voile noir vitré décollement rétine ophtalmologue",
    answer:"Les « mouches volantes » ou corps flottants sont de petites ombres, filaments ou points qui se déplacent avec le regard. Elles sont très fréquentes, notamment après 40 ans, chez les personnes myopes ou après certaines interventions oculaires, et sont souvent liées au vieillissement du vitré. Lorsqu’elles sont anciennes et stables, elles sont le plus souvent bénignes. Une apparition récente ou une augmentation brutale doit cependant être évaluée car elle peut accompagner un décollement postérieur du vitré et parfois une déchirure de la rétine.",
    watch:"L’apparition soudaine de nombreuses mouches volantes, surtout avec des éclairs lumineux, justifie un avis ophtalmologique rapide. Une baisse de vision, un voile ou un rideau noir dans une partie du champ visuel nécessite une consultation ophtalmologique dans la journée car un décollement de rétine doit être éliminé.",
    source:"Assurance Maladie · littérature ophtalmologique",
    url:"https://www.ameli.fr/assure/sante/urgence/pathologies/decollement-retine",
    sources:[
      {org:"Assurance Maladie",title:"Décollement de rétine : symptômes et urgence",year:"2025",url:"https://www.ameli.fr/assure/sante/urgence/pathologies/decollement-retine"},
      {org:"Current Opinion in Ophthalmology",title:"Management of vitreous floaters: a review",year:"2024",url:"https://pubmed.ncbi.nlm.nih.gov/39046174/"},
      {org:"Acta Ophthalmologica",title:"Symptoms related to posterior vitreous detachment and risk of retinal tears — systematic review",year:"2019",url:"https://pubmed.ncbi.nlm.nih.gov/30632695/"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Référence française + revue récente"
  },
  {
    id:"gencives-saignent-brossage",
    category:"Santé au quotidien",
    title:"Mes gencives saignent quand je me brosse les dents : est-ce normal ?",
    keywords:"gencives saignent brossage saignement gencives gingivite parodontite plaque dentaire détartrage mauvaise haleine dentiste",
    answer:"Un saignement des gencives au brossage est fréquent, mais il ne doit pas être considéré comme normal. Le plus souvent, il traduit une gingivite liée à l’accumulation de plaque dentaire au bord des gencives. Il ne faut pas arrêter de se brosser les dents parce qu’elles saignent : un brossage soigneux au moins deux fois par jour et le nettoyage des espaces interdentaires contribuent au contraire à réduire l’inflammation. Au stade de la gingivite, la maladie est généralement réversible si elle est prise en charge.",
    watch:"Des saignements répétés justifient un contrôle chez le chirurgien-dentiste afin de vérifier l’état des gencives et de réaliser si besoin un détartrage. Une gencive qui se rétracte, des dents qui bougent, du pus, une mauvaise haleine persistante ou des poches parodontales peuvent évoquer une parodontite, qui peut entraîner une perte du soutien des dents si elle n’est pas traitée.",
    source:"Assurance Maladie · European Federation of Periodontology",
    url:"https://www.ameli.fr/assure/sante/themes/maladie-gencives/definition-causes-symptomes",
    sources:[
      {org:"Assurance Maladie",title:"Comprendre la maladie des gencives : gingivite et parodontite",year:"2025",url:"https://www.ameli.fr/assure/sante/themes/maladie-gencives/definition-causes-symptomes"},
      {org:"Assurance Maladie",title:"Que faire en cas de gingivite ?",year:"2026",url:"https://www.ameli.fr/assure/sante/themes/maladie-gencives/bons-reflexes-gingivite"},
      {org:"European Federation of Periodontology",title:"S3 clinical practice guideline for treatment of stage I–III periodontitis",year:"2020",url:"https://pubmed.ncbi.nlm.nih.gov/32383274/"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Assurance Maladie + recommandation européenne S3"
  }
);
