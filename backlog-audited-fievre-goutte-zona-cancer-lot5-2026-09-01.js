// MACA Santé — lot 5 validé Pilotage 01/09/2026
// Fièvre adulte / goutte / zona / cancérologie patient / ORL / dermatologie.
window.healthQuestions = window.healthQuestions || [];
window.healthQuestions.push(
  {
    id:"fievre-adulte-quand-sinquieter",
    category:"Santé au quotidien",
    title:"J’ai de la fièvre : quand faut-il s’inquiéter chez l’adulte ?",
    keywords:"fièvre adulte temperature adulte 39 adulte forte fièvre plusieurs jours fièvre quand consulter paracétamol infection adulte",
    answer:"La fièvre est un symptôme, pas une maladie en elle-même. Chez l’adulte, elle accompagne très souvent une infection virale ou bactérienne, mais son importance ne se juge pas seulement sur le chiffre indiqué par le thermomètre. Il faut surtout tenir compte de sa durée, de l’état général et des symptômes associés. Repos et hydratation sont importants. Lorsque la fièvre est mal tolérée, le paracétamol peut être utilisé en respectant les doses recommandées et les contre-indications.",
    watch:"Une fièvre associée notamment à une difficulté à respirer, une confusion, une somnolence inhabituelle, une raideur de nuque, des taches violacées ne s’effaçant pas à la pression, une douleur thoracique importante ou une altération marquée de l’état général nécessite une évaluation rapide. Une vigilance particulière est également nécessaire chez une personne immunodéprimée ou traitée pour un cancer.",
    source:"CMIT / SPILF · HAS",
    url:"https://www.infectiologie.com/fr/pilly-etudiant-2023-disponible-a-la-vente-et-en-ligne.html",
    sources:[
      {org:"CMIT / SPILF",title:"PILLY étudiant — Fièvre aiguë chez l’enfant et l’adulte",year:"2023",url:"https://www.infectiologie.com/fr/pilly-etudiant-2023-disponible-a-la-vente-et-en-ligne.html"},
      {org:"HAS",title:"Paracétamol — douleur et/ou fièvre chez l’adulte et l’enfant de plus de 50 kg",year:"2026",url:"https://www.has-sante.fr/jcms/p_4016918/fr/paracetamol-benta-paracetamol-douleur-et/ou-fievre-chez-l-adulte-et-l-enfant-de-plus-de-50-kg"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Références françaises croisées"
  },
  {
    id:"goutte-alimentation",
    category:"Santé au quotidien",
    title:"J’ai une crise de goutte : faut-il arrêter la viande, le fromage et l’alcool ?",
    keywords:"goutte crise de goutte acide urique gros orteil viande goutte fromage goutte alcool goutte bière goutte purines hyperuricemie",
    answer:"Il n’est pas nécessaire de supprimer tous ces aliments. La goutte est liée à l’accumulation de cristaux d’urate dans les articulations. L’alimentation peut influencer le risque de crise, mais la goutte ne se résume pas à un problème alimentaire. Les excès de viande, d’abats, de certains poissons et fruits de mer, de bière, d’alcools forts et de boissons très riches en fructose peuvent favoriser l’hyperuricémie et les crises. Il n’y a en revanche aucune raison de supprimer les produits laitiers ; les purines des légumes et légumineuses ne justifient pas non plus leur exclusion.",
    watch:"La goutte est une maladie chronique : traiter uniquement les crises sans contrôler l’uricémie peut laisser persister les dépôts de cristaux. Une alimentation adaptée complète la prise en charge mais ne remplace pas, lorsqu’il est indiqué, un traitement permettant de diminuer durablement l’uricémie.",
    source:"Assurance Maladie · Société Française de Rhumatologie",
    url:"https://www.ameli.fr/assure/sante/themes/goutte/definition-facteurs-favorisants",
    sources:[
      {org:"Assurance Maladie",title:"Goutte : définition et facteurs favorisants",year:"2025",url:"https://www.ameli.fr/assure/sante/themes/goutte/definition-facteurs-favorisants"},
      {org:"Assurance Maladie",title:"Goutte : traitement",year:"2025",url:"https://www.ameli.fr/assure/sante/themes/goutte/traitement"},
      {org:"Société Française de Rhumatologie",title:"Recommandations françaises pour la prise en charge de la goutte",year:"2020",url:"https://pubmed.ncbi.nlm.nih.gov/32422339/"},
      {org:"PubMed",title:"Revue des recommandations internationales sur alimentation et goutte",year:"2025",url:"https://pubmed.ncbi.nlm.nih.gov/40517745/"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Références françaises + littérature récente"
  },
  {
    id:"zona-vesicules-douloureuses",
    category:"Santé au quotidien",
    title:"J’ai une plaque douloureuse avec des petites vésicules : est-ce un zona ?",
    keywords:"zona vésicules douloureuses boutons douleur plaque brûlante varicelle adulte douleur après zona zona oeil antiviraux 72 heures",
    answer:"Cela peut être un zona. Le zona correspond à la réactivation du virus de la varicelle. Il provoque généralement une douleur, des brûlures ou des picotements suivis d’une éruption faite de petites vésicules regroupées sur une zone limitée du corps, souvent d’un seul côté. Le diagnostic est habituellement clinique. Certaines personnes peuvent conserver des douleurs nerveuses après la disparition des lésions : ce sont les douleurs post-zostériennes. Dans certaines situations, un traitement antiviral peut être proposé et, lorsqu’il est indiqué, il est d’autant plus utile qu’il est commencé précocement, idéalement dans les 72 heures après le début de l’éruption.",
    watch:"Une éruption sur le front, autour de l’œil ou sur le nez doit faire rechercher rapidement une atteinte ophtalmique. Une paralysie du visage ou des symptômes de l’oreille constituent également des localisations particulières qui nécessitent un avis rapide.",
    source:"Assurance Maladie",
    url:"https://www.ameli.fr/assure/sante/themes/zona/consultation-traitement-zona",
    sources:[
      {org:"Assurance Maladie",title:"Zona : consultation, traitement et prévention",year:"2026",url:"https://www.ameli.fr/assure/sante/themes/zona/consultation-traitement-zona"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Référence française actuelle"
  },
  {
    id:"cancer-biopsie-liquide-ctdna",
    category:"Cancer",
    title:"Une prise de sang peut-elle détecter ou surveiller un cancer ?",
    keywords:"prise de sang cancer biopsie liquide ADN tumoral ctDNA ADN circulant maladie résiduelle détecter récidive cancer biomarqueur moléculaire",
    answer:"Dans la plupart des situations, une simple prise de sang ne permet pas à elle seule de dire si une personne a ou non un cancer. Mais une technique appelée biopsie liquide permet aujourd’hui de rechercher dans le sang de petites quantités d’ADN provenant de cellules tumorales : l’ADN tumoral circulant, ou ctDNA. Chez certains patients ayant déjà un cancer, cette analyse peut identifier des anomalies moléculaires utiles pour choisir une thérapie ciblée, notamment lorsque la biopsie de la tumeur est difficile à réaliser. Un résultat négatif n’exclut cependant pas une anomalie tumorale et peut nécessiter une analyse du tissu.",
    watch:"Le ctDNA peut parfois révéler une maladie résiduelle moléculaire avant qu’elle ne soit visible par l’imagerie, mais son utilisation pour dépister tous les cancers chez des personnes sans symptôme ou pour guider systématiquement les traitements après chirurgie n’est pas généralisable à tous les cancers. Il ne s’agit pas d’un test sanguin universel contre le cancer.",
    source:"GFCO · ASCO · ESMO",
    url:"https://pubmed.ncbi.nlm.nih.gov/42493294/",
    sources:[
      {org:"GFCO",title:"Recommandations nationales françaises sur l’ADN tumoral circulant",year:"2026",url:"https://pubmed.ncbi.nlm.nih.gov/42493294/"},
      {org:"ASCO",title:"Guideline sur l’utilisation du ctDNA",year:"2026",url:"https://pubmed.ncbi.nlm.nih.gov/42314080/"},
      {org:"ESMO Precision Medicine Working Group",title:"Recommendations on circulating tumour DNA assays",year:"2022",url:"https://pubmed.ncbi.nlm.nih.gov/35809752/"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Recommandations françaises et internationales"
  },
  {
    id:"cancer-adc-anticorps-conjugues",
    category:"Cancer",
    title:"Anticorps conjugués (ADC) : est-ce une chimiothérapie ciblée ?",
    keywords:"ADC cancer anticorps conjugué antibody drug conjugate chimiothérapie ciblée trastuzumab deruxtecan sacituzumab nouveau traitement cancer oncologie",
    answer:"C’est une bonne façon de comprendre leur principe, même si le fonctionnement est un peu plus complexe. Un ADC associe un anticorps capable de reconnaître une cible présente sur certaines cellules tumorales, un système de liaison et une molécule cytotoxique. L’anticorps sert donc en quelque sorte de véhicule pour transporter le médicament vers les cellules exprimant la cible. Les ADC sont désormais de véritables traitements standards dans plusieurs cancers, notamment certains cancers du sein, du poumon, gynécologiques, digestifs ou urothéliaux.",
    watch:"Ciblé ne signifie pas sans effets secondaires. Une partie du médicament peut également affecter des tissus sains et les toxicités dépendent de l’ADC utilisé. La présence de la cible sur la tumeur ne garantit pas non plus à elle seule que le traitement fonctionnera : la biologie tumorale, la quantité de cible et les mécanismes de résistance jouent également un rôle.",
    source:"Cancer · Cancer Cell · ESMO Open",
    url:"https://pubmed.ncbi.nlm.nih.gov/42225587/",
    sources:[
      {org:"Cancer",title:"Standards actuels des antibody-drug conjugates",year:"2026",url:"https://pubmed.ncbi.nlm.nih.gov/42225587/"},
      {org:"Cancer Cell",title:"ADC et oncologie de précision",year:"2026",url:"https://pubmed.ncbi.nlm.nih.gov/42259248/"},
      {org:"ESMO Open",title:"Position statement sur les ADC",year:"2026",url:"https://pubmed.ncbi.nlm.nih.gov/42431135/"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Littérature oncologique récente croisée"
  },
  {
    id:"cancer-oncogenetique-famille",
    category:"Cancer",
    title:"Plusieurs personnes de ma famille ont eu un cancer : dois-je faire un test génétique ?",
    keywords:"cancer famille cancer héréditaire génétique cancer oncogénétique BRCA Lynch test génétique cancer plusieurs cancers famille prédisposition",
    answer:"Pas forcément, mais certaines histoires familiales justifient une consultation d’oncogénétique. La très grande majorité des cancers apparaissent au cours de la vie sans qu’une prédisposition héréditaire soit transmise dans la famille. Dans certaines familles cependant, une variation génétique constitutionnelle augmente fortement le risque de développer certains cancers. Le nombre de personnes touchées, leur lien de parenté, le type de cancers et surtout l’âge auquel ils sont apparus permettent d’évaluer la probabilité d’une prédisposition.",
    watch:"Il faut distinguer une mutation somatique, présente seulement dans les cellules de la tumeur, d’une mutation constitutionnelle ou germinale, présente dans les cellules de l’organisme et susceptible d’être transmise. Un test moléculaire effectué sur la tumeur ne remplace donc pas automatiquement un test génétique constitutionnel. Un résultat peut modifier la surveillance de la personne testée et avoir des conséquences pour certains membres de sa famille.",
    source:"Institut national du cancer · ASCO · ESMO",
    url:"https://www.e-cancer.fr/content/download/438119/6620140/file/Oncog%C3%A9n%C3%A9tique%20synth%C3%A8se%202020%20_DEF.pdf",
    sources:[
      {org:"Institut national du cancer",title:"Oncogénétique — dispositif français",year:"2020",url:"https://www.e-cancer.fr/content/download/438119/6620140/file/Oncog%C3%A9n%C3%A9tique%20synth%C3%A8se%202020%20_DEF.pdf"},
      {org:"ASCO",title:"Germline genetic testing guideline",year:"2024",url:"https://pubmed.ncbi.nlm.nih.gov/38759122/"},
      {org:"ESMO",title:"Recommandations génétiques en oncologie",year:"2025",url:"https://pubmed.ncbi.nlm.nih.gov/40523834/"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"INCa + recommandations internationales"
  },
  {
    id:"cancer-remission-guerison",
    category:"Cancer",
    title:"Mon cancer est en rémission complète : est-ce que cela veut dire que je suis guéri ?",
    keywords:"rémission cancer rémission complète cancer guéri guérison cancer récidive rechute cancer cinq ans cancer suivi oncologique",
    answer:"Pas exactement. Une rémission complète signifie qu’avec les examens disponibles, il n’existe plus de signe détectable du cancer. Cela ne signifie pas nécessairement qu’il est possible d’affirmer immédiatement que toutes les cellules cancéreuses ont disparu. C’est pourquoi une surveillance est maintenue après les traitements. Le mot guérison est généralement utilisé lorsque le recul devient suffisamment important pour que le risque de récidive soit devenu très faible.",
    watch:"Il n’existe pas un délai identique pour tous les cancers : le risque de récidive dépend du type de cancer, de son stade, de sa biologie et de la réponse obtenue au traitement. La règle souvent évoquée des cinq ans est un repère statistique historique, pas une frontière universelle. Une rémission complète est donc une excellente nouvelle mais n’interrompt pas immédiatement le suivi oncologique.",
    source:"Institut national du cancer · Gustave Roussy",
    url:"https://pediatrie.e-cancer.fr/parent/parcours/quand-parle-t-on-de-guerison/remission-et-guerison",
    sources:[
      {org:"Institut national du cancer",title:"Rémission et guérison",year:"2026",url:"https://pediatrie.e-cancer.fr/parent/parcours/quand-parle-t-on-de-guerison/remission-et-guerison"},
      {org:"Gustave Roussy",title:"Programme après-cancer InterVAL",year:"2026",url:"https://www.gustaveroussy.fr/fr/programme-apres-cancer-interval"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Références françaises"
  },
  {
    id:"cancer-metastases-definition",
    category:"Cancer",
    title:"On m’a parlé de métastases : qu’est-ce que cela signifie exactement ?",
    keywords:"métastase cancer métastatique stade 4 cancer propagé cancer secondaire tumeur secondaire métastases os foie poumon cancer primitif",
    answer:"Une métastase est une localisation cancéreuse formée lorsque des cellules provenant d’un cancer d’origine, appelé cancer primitif, se déplacent et se développent dans une autre partie de l’organisme. Par exemple, un cancer du sein qui se propage dans un os reste biologiquement un cancer du sein métastatique : ce n’est pas un nouveau cancer primitif de l’os. Les cellules tumorales peuvent se déplacer notamment par le sang ou par le système lymphatique.",
    watch:"Métastatique ne signifie pas la même chose pour tous les cancers. Les possibilités de traitement et l’évolution diffèrent selon l’origine du cancer, les organes atteints, le nombre et la localisation des métastases, les caractéristiques moléculaires de la tumeur et sa sensibilité aux traitements. Dans certains cancers, les traitements modernes permettent de contrôler une maladie métastatique pendant des périodes prolongées. Il n’est donc pas pertinent de déduire un pronostic individuel du seul mot métastase.",
    source:"Institut national du cancer · ESMO",
    url:"https://www.e-cancer.fr/content/download/63213/569013/file/GUIRAD09.pdf",
    sources:[
      {org:"Institut national du cancer",title:"Définition et principes des métastases",year:"2026",url:"https://www.e-cancer.fr/content/download/63213/569013/file/GUIRAD09.pdf"},
      {org:"ESMO",title:"Recommandations contemporaines de prise en charge des cancers métastatiques",year:"2026",url:"https://pubmed.ncbi.nlm.nih.gov/42217581/"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"INCa + littérature oncologique récente"
  },
  {
    id:"mal-gorge-adulte-antibiotiques",
    category:"Santé au quotidien",
    title:"J’ai mal à la gorge : faut-il prendre des antibiotiques ?",
    keywords:"mal de gorge adulte angine antibiotique angine amoxicilline gorge streptocoque TROD angine gorge rouge infection ORL adulte",
    answer:"Le plus souvent, non. La majorité des maux de gorge et des angines sont liés à des infections virales. Les antibiotiques n’agissent pas sur les virus et n’accélèrent donc pas leur guérison. Lorsqu’une angine bactérienne à streptocoque est possible, un test rapide d’orientation diagnostique — TROD angine — permet de rechercher la bactérie. Chez l’adulte, les symptômes permettent d’estimer la probabilité d’une angine à streptocoque et de décider si le test est utile. En cas de TROD négatif, un antibiotique n’est généralement pas indiqué.",
    watch:"Une difficulté importante à respirer ou avaler, une voix très modifiée, un gonflement important du cou ou une altération marquée de l’état général nécessitent une évaluation médicale.",
    source:"Assurance Maladie · HAS / SPILF",
    url:"https://www.ameli.fr/assure/sante/themes/angine/definition-symptomes-diagnostic",
    sources:[
      {org:"Assurance Maladie",title:"Angine : définition, symptômes et diagnostic",year:"2026",url:"https://www.ameli.fr/assure/sante/themes/angine/definition-symptomes-diagnostic"},
      {org:"Assurance Maladie / HAS",title:"TROD angine et bon usage des antibiotiques",year:"2026",url:"https://www.ameli.fr/medecin/exercice-liberal/memos/pathologies-orl/depistage-prevention/test-diagnostic-rapide-trod-angine"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Références françaises actuelles"
  },
  {
    id:"prurit-generalise-causes",
    category:"Santé au quotidien",
    title:"Je me gratte partout sans avoir forcément de boutons : quelles peuvent être les causes ?",
    keywords:"démangeaisons partout je me gratte prurit peau qui gratte sans boutons démangeaisons senior prurit nocturne sécheresse peau médicaments foie rein thyroïde",
    answer:"Les démangeaisons généralisées, ou prurit, peuvent avoir de nombreuses origines. La cause la plus fréquente reste la peau elle-même : sécheresse cutanée, eczéma, urticaire, psoriasis, réaction à un produit ou à un médicament. La sécheresse de la peau est particulièrement fréquente avec l’âge. Lorsqu’un prurit est généralisé et persiste sans lésion cutanée évidente, le médecin peut parfois rechercher une autre cause : anomalie du foie ou des voies biliaires, maladie rénale chronique, problème thyroïdien, carence en fer, diabète ou plus rarement certaines maladies du sang.",
    watch:"Cela ne signifie pas qu’un prurit banal est le signe d’une maladie grave : les causes dermatologiques et la sécheresse sont de loin les plus fréquentes. Les antihistaminiques ne sont pas efficaces contre toutes les formes de prurit. Un prurit persistant pendant plusieurs semaines, très gênant la nuit, associé à une perte de poids, une jaunisse ou d’autres symptômes généraux mérite une évaluation.",
    source:"Assurance Maladie · Société Française de Dermatologie",
    url:"https://www.ameli.fr/assure/sante/themes/demangeaisons-peau/definition-causes",
    sources:[
      {org:"Assurance Maladie",title:"Démangeaisons de la peau : définition et causes",year:"2026",url:"https://www.ameli.fr/assure/sante/themes/demangeaisons-peau/definition-causes"},
      {org:"Société Française de Dermatologie",title:"Prurit et prurigo — référence française",year:"2026",url:"https://www.sfdermato.org/"}
    ],
    verifiedAt:"01/09/2026",nextAuditAt:"01/12/2026",validationStatus:"VALIDATED",evidenceStatus:"Références françaises croisées"
  }
);