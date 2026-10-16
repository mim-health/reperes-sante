/* MACASANTE — 14 fiches validées par Dr Romain BEDDOK le 16 octobre 2026.
 * 7 révisions à identifiant stable et 7 nouvelles questions ; publication Ados.
 * Aucun script vidéo ni note éditoriale de travail dans le corpus médical. */
(function(){
'use strict';
const revisions=[
  {
    "id": "ado-sommeil-endormissement",
    "title": "Je n’arrive pas à m’endormir le soir : que faire ?",
    "answer": "À l’adolescence, l’horloge du sommeil se décale souvent vers des horaires plus tardifs. Mais les cours commencent toujours tôt : le sommeil peut devenir insuffisant. Les écrans, les horaires irréguliers et la caféine peuvent accentuer ce décalage. Une somnolence importante ou persistante mérite un avis médical.",
    "detail": "Le soir, tu retrouves de l’énergie alors que tu étais presque endormi en cours quelques heures plus tôt. Ce contraste peut donner l’impression que ton corps se contredit. À l’adolescence, l’horloge interne évolue : l’envie de dormir apparaît souvent plus tard. Cette tendance biologique ne signifie pas que tu as besoin de moins dormir : le consensus AASM recommande habituellement huit à dix heures par vingt-quatre heures entre treize et dix-huit ans.\n\nLe problème vient souvent de la rencontre entre cette tendance et les contraintes du lendemain. Si tu t’endors tard et dois te lever tôt, la nuit raccourcit. Au fil de la semaine, la fatigue peut s’accumuler. Dormir davantage le week-end peut soulager momentanément, mais des levers très décalés peuvent aussi compliquer le retour au rythme scolaire. Le but n’est pas de supprimer les loisirs : c’est de protéger une place suffisante pour dormir.\n\nIl faut aussi regarder ce qui occupe la soirée. Une conversation, une partie ou une vidéo supplémentaire peut repousser le coucher sans qu’on s’en rende compte. Le contenu stimulant, la lumière et les notifications interviennent ensemble. Accuser uniquement la lumière bleue serait trop simple : même avec un filtre, une discussion prenante peut maintenir éveillé. La caféine peut également gêner le sommeil, y compris quand elle ne donne pas l’impression d’exciter.\n\nPour comprendre ton rythme, note pendant quelques jours l’heure du coucher, l’endormissement approximatif, le lever, les siestes et ton état dans la journée. Tu peux ajouter les soirées particulièrement stressantes ou les boissons caféinées. Cet agenda sert à observer, pas à te noter. Il permet aussi d’expliquer concrètement le problème à tes parents ou au médecin, plutôt que de rester dans le débat « tu te couches trop tard ».\n\nQuelques ajustements peuvent être essayés progressivement : des levers assez réguliers, de la lumière naturelle le matin, une activité physique dans la journée et une transition plus calme avant le coucher. Si tu modifies tes horaires, avance par étapes réalistes. Une règle familiale sur les messages tardifs peut aider davantage qu’un affrontement quotidien. Une longue sieste tardive peut, chez certaines personnes, rendre l’endormissement du soir plus difficile : observe comment tu réagis.\n\nIl n’est pas utile de te procurer seul un produit pour dormir. Les compléments à la mélatonine ne sont pas une réponse automatique au décalage des adolescents. Un professionnel peut rechercher les facteurs en cause et discuter d’une prise en charge adaptée. Dormir mal peut aussi être associé à une anxiété, une baisse de moral, un problème respiratoire nocturne ou un autre trouble du sommeil.\n\nEnfin, la fatigue et la somnolence ne sont pas exactement la même chose. Tu peux manquer d’énergie sans t’endormir, ou lutter pour rester éveillé même après une nuit apparemment longue. Précise ce que tu ressens et les situations où cela arrive. Si tu t’endors régulièrement en classe, pendant les transports ou lors d’activités habituelles, il faut en parler. Tu n’as pas à attendre que les résultats scolaires chutent pour demander de l’aide.\n\nTu peux demander à tes parents de réfléchir avec toi à un changement concret, plutôt qu’à une règle générale. Un seul objectif réaliste pour la semaine permet de voir ce qui aide vraiment, sans transformer chaque soirée en contrôle.",
    "watch": "Consulte si la somnolence perturbe les cours ou la sécurité, si les difficultés durent malgré des ajustements, ou en cas de ronflements avec pauses respiratoires, d’endormissements incontrôlables ou de changement marqué de l’humeur.",
    "headingTitle": "Pourquoi je suis crevé le matin et réveillé le soir ?",
    "question": "Je n’arrive pas à m’endormir le soir : que faire ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "AASM",
        "title": "Paruthi et al., 2016. Consensus sur la durée du sommeil pédiatrique. J Clin Sleep Med. DOI : 10.5664/jcsm.5866. Type : consensus de société savante.",
        "label": "AASM — Paruthi et al., 2016. Consensus sur la durée du sommeil pédiatrique. J Clin Sleep Med. DOI : 10.5664/jcsm.5866. Type : consensus de société savante.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27250809/"
      },
      {
        "org": "Assurance Maladie",
        "title": "Particularités du sommeil adolescent",
        "label": "Assurance Maladie — Particularités du sommeil adolescent",
        "url": "https://www.ameli.fr/assure/sante/themes/adolescents-sommeil/sommeil-de-l-adolescent-quelles-particularites"
      },
      {
        "org": "Assurance Maladie",
        "title": "Mieux dormir",
        "label": "Assurance Maladie — Mieux dormir",
        "url": "https://www.ameli.fr/assure/sante/themes/adolescents-sommeil/comment-mieux-dormir-l-adolescence"
      },
      {
        "org": "Assurance Maladie",
        "title": "Consultation",
        "label": "Assurance Maladie — Consultation",
        "url": "https://www.ameli.fr/assure/sante/themes/adolescents-sommeil/du-mal-dormir-l-adolescence-en-parler-son-medecin"
      },
      {
        "org": "Anses",
        "title": "Mélatonine et populations à risque",
        "label": "Anses — Mélatonine et populations à risque",
        "url": "https://www.anses.fr/fr/content/anses-recommande-certaines-populations-deviter-la-consommation-de-complements"
      },
      {
        "org": "Assurance Maladie",
        "title": "Usage des écrans chez l'enfant et l'adolescent",
        "url": "https://www.ameli.fr/assure/sante/themes/ecrans-enfance-adolescence/usage-ecran-age"
      }
    ],
    "source": "AASM · Assurance Maladie · Anses",
    "url": "https://pubmed.ncbi.nlm.nih.gov/27250809/",
    "keywords": "ado adolescent sommeil endormissement dormir écrans téléphone portable réseaux sociaux coucher fatigue caféine rythme Pourquoi je suis crevé le matin et réveillé le soir ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-porno-corps-envies-normes",
      "ado-ventre-gargouille",
      "transpiration-excessive-hyperhidrose"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "73e83ee72fe41e2600062e7fc0c32510c4755aa9a3a66f29f5fcf43410bcfa56"
    }
  },
  {
    "id": "ado-ventre-gargouille",
    "title": "Pourquoi mon ventre gargouille quand tout le monde se tait ?",
    "answer": "Les gargouillements correspondent généralement au déplacement de gaz et de liquides dans le tube digestif. Ils peuvent se produire quand tu as faim, mais aussi pendant la digestion. Un bruit isolé n’est pas un signe de maladie. Ce sont les douleurs et les autres symptômes associés qui comptent.",
    "detail": "Ton ventre fait soudain beaucoup de bruit pendant un contrôle ou dans une salle silencieuse. Ce moment peut être embarrassant, mais le tube digestif travaille aussi quand tu n’y penses pas. Les contractions qui font avancer son contenu déplacent des liquides et des gaz. Elles peuvent produire des sons appelés borborygmes. Un ventre audible ne veut pas dire qu’il fonctionne mal ni que tu manques d’hygiène.\n\nOn associe souvent ces bruits à la faim. Ils peuvent effectivement être remarqués lorsque l’estomac est vide, mais ils ne permettent pas de savoir exactement quand tu dois manger. Ils existent également après les repas. Leur intensité varie au cours de la journée. Et le silence de la pièce change surtout la facilité avec laquelle tu les entends : ton ventre n’a pas choisi ce moment pour attirer l’attention.\n\nDes gaz peuvent venir de l’air avalé et du travail des bactéries intestinales sur certains aliments. Manger très vite, boire beaucoup de boissons gazeuses ou mâcher du chewing-gum peut favoriser l’air avalé chez certaines personnes. Cela ne signifie pas que ces habitudes expliquent tous les symptômes. Si tu remarques un lien régulier, tu peux essayer une modification simple, puis observer si elle améliore réellement ton confort.\n\nLe stress peut aussi s’accompagner de sensations digestives et rendre plus attentif à ce qui se passe dans le ventre. Pendant un oral, tu peux surveiller chaque mouvement et craindre qu’il se reproduise. Cette inquiétude ajoute de la gêne, sans rendre la sensation imaginaire. Se rappeler qu’un bruit digestif est banal peut aider à ne pas transformer un incident de quelques secondes en preuve que tout le monde te juge.\n\nEn revanche, des gargouillements ne suffisent pas à diagnostiquer un syndrome de l’intestin irritable. Ce trouble est évalué à partir d’un ensemble de symptômes, notamment des douleurs répétées et des modifications du transit. Une vidéo, un questionnaire ou le bruit de ton ventre ne permettent pas de conclure. Si tu as surtout des douleurs, il faut les décrire, préciser leur fréquence et leur lien éventuel avec les repas ou les selles.\n\nPour un bruit isolé, tu n’as pas besoin de te lancer dans un régime ou de prendre un complément pour « réparer » ton intestin. Garde des repas réguliers adaptés à ton appétit, prends le temps de manger et bois de l’eau. Ne supprime pas d’emblée le gluten, les produits laitiers ou plusieurs familles d’aliments : à ton âge, les restrictions peuvent compliquer l’alimentation sans régler le problème.\n\nSi la gêne se répète, note ce qui l’accompagne : douleur, constipation, diarrhée, ballonnement, changement d’alimentation ou période de stress. Ces informations sont plus utiles qu’une liste de produits achetés au hasard. Tu peux en parler au médecin même si cela te semble peu sérieux : la consultation sert aussi à comprendre les symptômes du quotidien et à éviter que la peur d’un bruit t’empêche de participer aux cours.\n\nDans la vidéo, on peut sourire de la situation sans promettre de faire taire le ventre. Le repère médical reste simple : on évalue surtout l’inconfort et les symptômes associés, pas le volume sonore ni les réactions des camarades.",
    "watch": "Demande un avis si les bruits s’accompagnent de douleurs répétées, de diarrhée persistante, d’amaigrissement ou de sang dans les selles. Une douleur intense avec vomissements, ventre très gonflé ou altération de l’état général nécessite une évaluation rapide.",
    "headingTitle": "Pourquoi mon ventre gargouille quand tout le monde se tait ?",
    "question": "Pourquoi mon ventre gargouille quand tout le monde se tait ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "NASPGHAN / GIKids",
        "title": "Gastrointestinal Gas. Type : information patient produite par une société savante, pas une recommandation graduée.",
        "label": "NASPGHAN / GIKids — Gastrointestinal Gas. Type : information patient produite par une société savante, pas une recommandation graduée.",
        "url": "https://gikids.org/digestive-topics/gastrointestinal-gas/"
      },
      {
        "org": "Assurance Maladie",
        "title": "Symptômes digestifs et borborygmes",
        "label": "Assurance Maladie — Symptômes digestifs et borborygmes",
        "url": "https://www.ameli.fr/assure/sante/themes/syndrome-intestin-irritable/reconnaitre-syndrome-intestin-irritable"
      },
      {
        "org": "Assurance Maladie",
        "title": "Mesures et consultation",
        "label": "Assurance Maladie — Mesures et consultation",
        "url": "https://www.ameli.fr/assure/sante/themes/syndrome-intestin-irritable/que-faire-quand-consulter"
      },
      {
        "org": "Assurance Maladie",
        "title": "Évaluation et traitement",
        "label": "Assurance Maladie — Évaluation et traitement",
        "url": "https://www.ameli.fr/assure/sante/themes/syndrome-intestin-irritable/consultation-medicale-traitement"
      }
    ],
    "source": "NASPGHAN / GIKids · Assurance Maladie",
    "url": "https://gikids.org/digestive-topics/gastrointestinal-gas/",
    "keywords": "Pourquoi mon ventre gargouille quand tout le monde se tait ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-sommeil-endormissement",
      "transpiration-excessive-hyperhidrose",
      "ado-rougissement-regard-autres"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "d694bfac85c9d413384a86bc75a01e7df769f90312dd3514475b54120b0214e7"
    }
  },
  {
    "id": "transpiration-excessive-hyperhidrose",
    "title": "Je transpire beaucoup : est-ce normal ?",
    "answer": "On peut transpirer sans faire de sport : la chaleur et les émotions stimulent aussi la transpiration. À la puberté, l’odeur corporelle peut changer. Si les sueurs sont très abondantes, nouvelles, nocturnes ou gênantes au quotidien, un professionnel peut rechercher une cause et proposer une aide.",
    "detail": "Tu es assis avant un oral et tes mains deviennent humides. Ou tu découvres des auréoles alors que tu n’as presque pas bougé. La transpiration ne dépend pas uniquement de l’effort : elle participe à la régulation de la température et peut aussi être déclenchée par une émotion. Avoir chaud, être impressionné ou anticiper une situation gênante peut donc suffire à la faire apparaître.\n\nÀ la puberté, le corps et les sécrétions changent. L’odeur qui apparaît au niveau des aisselles n’est pas simplement une mesure de la quantité de sueur. Elle dépend notamment de la transformation de certaines sécrétions par les bactéries présentes sur la peau. Deux personnes qui transpirent autant peuvent ne pas sentir la même chose. Une odeur corporelle n’est donc pas une preuve que quelqu’un se lave mal.\n\nIl existe aussi une transpiration excessive, appelée hyperhidrose. Elle peut surtout concerner les mains, les pieds ou les aisselles et devenir très gênante : cahier mouillé, difficulté à tenir un objet ou vêtements changés plusieurs fois. Elle peut s’entretenir avec la peur de transpirer. Pour autant, on ne doit pas tout attribuer au stress : un médecin peut préciser le type de transpiration et rechercher ce qui nécessite un bilan.\n\nPour commencer, choisis des vêtements adaptés à la chaleur et change ceux qui sont humides. Après une toilette douce, sèche bien les plis et les pieds. Une accumulation de parfums ne réduit pas forcément l’odeur et peut irriter. Si tes chaussures restent humides, laisser le temps de les sécher et changer de chaussettes peut améliorer le confort. L’objectif est pratique, sans transformer ton corps en problème à cacher toute la journée.\n\nDéodorant et antitranspirant n’ont pas exactement le même rôle. Le premier agit surtout sur les odeurs ; le second vise à diminuer la transpiration. Si tu veux utiliser un produit contre des sueurs importantes, demande conseil au pharmacien et respecte sa notice. Un produit très irritant n’est pas plus efficace parce qu’il brûle. N’applique pas plusieurs traitements sur une peau déjà douloureuse ou abîmée.\n\nUn rendez-vous est utile dès que cela perturbe ta vie, même si tu n’as pas d’autres symptômes. Tu peux expliquer les zones concernées, depuis quand cela dure, si cela arrive pendant ton sommeil et les produits déjà essayés. Selon la situation, des traitements existent. Il n’est pas nécessaire de passer directement à une technique vue sur Internet : le choix dépend de l’importance du problème et de ses caractéristiques.\n\nLa façon dont les autres réagissent compte aussi. Une remarque répétée sur l’odeur ou les auréoles peut devenir humiliante. Tu n’as pas à accepter les moqueries pour montrer que tu as de l’humour. Si cela t’empêche d’aller en cours, de prendre la parole ou de voir tes amis, parles-en à un adulte de confiance. On peut chercher à la fois une solution pour la transpiration et un soutien face aux réactions des autres.\n\nSi tu préfères, prépare une phrase écrite avant le rendez-vous. Montrer que cela te gêne pour écrire, serrer une main ou choisir tes vêtements suffit à expliquer le retentissement. Tu n’as pas besoin d’attendre un épisode spectaculaire pour consulter.",
    "watch": "Consulte si les sueurs apparaissent brutalement, surviennent surtout la nuit, deviennent généralisées ou s’accompagnent de fièvre, amaigrissement ou palpitations. Douleur thoracique, difficulté respiratoire ou malaise important : aide médicale urgente.",
    "headingTitle": "Pourquoi je transpire alors que je ne fais rien ?",
    "question": "Je transpire beaucoup : est-ce normal ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "American Academy of Dermatology",
        "title": "Hyperhidrosis: Causes. Type : information médicale patient de société savante.",
        "label": "American Academy of Dermatology — Hyperhidrosis: Causes. Type : information médicale patient de société savante.",
        "url": "https://www.aad.org/public/diseases/a-z/hyperhidrosis-causes"
      },
      {
        "org": "American Academy of Dermatology",
        "title": "Hyperhidrosis: Diagnosis and treatment. Type : information médicale patient ; modalités américaines non transposées automatiquement en France.",
        "label": "American Academy of Dermatology — Hyperhidrosis: Diagnosis and treatment. Type : information médicale patient ; modalités américaines non transposées automatiquement en France.",
        "url": "https://www.aad.org/public/diseases/a-z/hyperhidrosis-treatment"
      },
      {
        "org": "Assurance Maladie",
        "title": "Que faire et quand consulter",
        "label": "Assurance Maladie — Que faire et quand consulter",
        "url": "https://www.ameli.fr/assure/sante/themes/hypersudation/que-faire-quand-consulter"
      },
      {
        "org": "Assurance Maladie",
        "title": "Traitements",
        "label": "Assurance Maladie — Traitements",
        "url": "https://www.ameli.fr/assure/sante/themes/hypersudation/soins-proposes-traitement"
      },
      {
        "org": "Assurance Maladie",
        "title": "Puberté",
        "label": "Assurance Maladie — Puberté",
        "url": "https://www.ameli.fr/assure/sante/themes/puberte/comprendre-mecanismes-puberte"
      },
      {
        "label": "Dermato-Info — Hyperhidrose / transpiration excessive",
        "url": "https://dermato-info.fr/videotheque/toute-savoir-sur-lhyperhidrose-transpiration-excessive"
      },
      {
        "label": "Société Française de Dermatologie — Hyperhidrose",
        "url": "https://www.sfdermato.org/media/pdf/fmc/1-s2-0-s0151963814012848-main-eade25db48a99b70498569572e6ce330.pdf"
      }
    ],
    "source": "American Academy of Dermatology · Assurance Maladie · Dermato-Info · Société Française de Dermatologie",
    "url": "https://www.aad.org/public/diseases/a-z/hyperhidrosis-causes",
    "keywords": "transpiration excessive hyperhidrose sueur aisselles mains pieds nuit antitranspirant dermatologue Pourquoi je transpire alors que je ne fais rien ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-ventre-gargouille",
      "ado-rougissement-regard-autres",
      "ado-acne"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "2fb01b7c55c9356708b78f02423b5f3d5fe23d24caf8205ee9302224bf5ae793"
    }
  },
  {
    "id": "ado-rougissement-regard-autres",
    "title": "Pourquoi je rougis dès qu’on me parle ?",
    "answer": "Rougir est une réaction involontaire qui peut accompagner la gêne, la surprise ou une émotion. Cela ne prouve pas que tu mens ou que tu es amoureux. Si la peur de rougir te conduit à éviter les autres, les cours ou les prises de parole, tu peux demander de l’aide.",
    "detail": "Quelqu’un te regarde, te pose une question ou prononce ton nom et tu sens ton visage chauffer. Le rougissement correspond à une modification du flux sanguin dans la peau du visage. Il peut survenir très vite et ne se commande pas comme un mouvement du bras. Se dire « surtout, ne rougis pas » ne suffit donc pas à l’arrêter et peut même te pousser à surveiller davantage ton visage.\n\nUne rougeur n’est pas un message précis sur ce que tu penses. On peut rougir par embarras, sous l’effet d’une surprise ou simplement parce qu’on se sent observé. Les autres ne peuvent pas lire ton attirance ou tes intentions à partir de la couleur de tes joues. La chaleur, l’effort ou certaines particularités de la peau peuvent aussi produire des rougeurs qui n’ont pas le même mécanisme.\n\nLe problème devient parfois la peur du prochain épisode. Après une remarque gênante, tu anticipes que cela va recommencer, tu évites de parler et tu scrutes le regard des autres. Cette boucle peut être pénible. Elle ne signifie pas automatiquement que tu as une maladie, mais elle mérite une attention si elle réduit progressivement ta liberté : ne plus participer, renoncer à une sortie ou éviter les rencontres.\n\nSur le moment, il n’est pas obligatoire d’expliquer ta rougeur ou de réussir à la cacher. Tu peux essayer de ramener ton attention vers la conversation et de respirer calmement, sans chercher une technique parfaite. Une phrase courte comme « oui, je rougis vite » peut parfois désamorcer une remarque, si tu te sens à l’aise pour la dire. Ce n’est pas un devoir ni une solution universelle.\n\nÀ distance de la situation, demande-toi surtout ce qui te fait peur : qu’on se moque, qu’on devine une émotion, qu’on pense que tu manques d’assurance ? Mettre des mots sur cette crainte aide à en parler. Tu peux aussi repérer les situations que tu continues à faire malgré la gêne. L’objectif n’est pas de ne plus jamais rougir, mais que cette réaction ne décide pas de ta vie à ta place.\n\nQuand la peur du jugement est forte et durable, un professionnel peut évaluer une anxiété sociale. Cela ne se résume pas à « être timide ». Le retentissement, les évitements et la souffrance comptent. Les thérapies cognitives et comportementales font partie des prises en charge recommandées par l’AACAP pour les troubles anxieux des jeunes ; elles s’adaptent après évaluation, pas au seul fait de rougir. Il n’est pas utile de commencer seul un médicament, un complément ou un traitement proposé pour bloquer les réactions physiques.\n\nEnfin, rougir ne donne à personne le droit de te provoquer exprès. Si des camarades cherchent à obtenir ta réaction et recommencent malgré ton malaise, le sujet n’est plus seulement ton rougissement. Un adulte de confiance ou l’équipe scolaire peut aider à faire cesser ces comportements. Tu peux avoir besoin d’un soutien même si tu arrives encore à sourire devant les autres et à faire comme si cela ne te touchait pas.\n\nTu peux choisir une personne avec qui en parler d’abord, sans annoncer le sujet à tout un groupe. Être soutenu dans une situation précise est parfois un premier pas plus accessible que vouloir devenir soudain très à l’aise partout.",
    "watch": "Parles-en si la peur te fait éviter durablement les autres, l’école ou les activités. Des rougeurs persistantes, douloureuses ou associées à des lésions cutanées méritent aussi un avis pour ne pas tout attribuer aux émotions.",
    "headingTitle": "Pourquoi je rougis dès qu’on me parle ?",
    "question": "Pourquoi je rougis dès qu’on me parle ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "AACAP",
        "title": "Walter et al., 2020. Assessment and Treatment of Children and Adolescents With Anxiety Disorders. DOI : 10.1016/j.jaac.2020.05.005. Type : recommandation de pratique clinique ; résumé consulté.",
        "label": "AACAP — Walter et al., 2020. Assessment and Treatment of Children and Adolescents With Anxiety Disorders. DOI : 10.1016/j.jaac.2020.05.005. Type : recommandation de pratique clinique ; résumé consulté.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32439401/"
      },
      {
        "org": "Assurance Maladie",
        "title": "Anxiété et phobie sociale chez les jeunes",
        "label": "Assurance Maladie — Anxiété et phobie sociale chez les jeunes",
        "url": "https://www.ameli.fr/assure/sante/jeunes-16-25-ans/souffrance-psychique/troubles-psychiques"
      },
      {
        "org": "Assurance Maladie",
        "title": "Comprendre les troubles anxieux",
        "label": "Assurance Maladie — Comprendre les troubles anxieux",
        "url": "https://www.ameli.fr/assure/sante/themes/troubles-anxieux-anxiete/comprendre-troubles-anxieux-anxiete"
      },
      {
        "org": "Assurance Maladie",
        "title": "Symptômes et diagnostic",
        "label": "Assurance Maladie — Symptômes et diagnostic",
        "url": "https://www.ameli.fr/assure/sante/themes/troubles-anxieux-anxiete/symptomes-diagnostic"
      }
    ],
    "source": "AACAP · Assurance Maladie",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32439401/",
    "keywords": "Pourquoi je rougis dès qu’on me parle ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "transpiration-excessive-hyperhidrose",
      "ado-acne",
      "ado-ruminations-coucher"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "2160b658db9fc8f86cb31be97d639eacac7a4cb2583866a0c58894fed0f20dba"
    }
  },
  {
    "id": "ado-acne",
    "title": "Acné : que faire quand les boutons deviennent gênants ?",
    "answer": "L’acné est fréquente à l’adolescence et n’est pas causée par un manque de propreté. Un bouton peut sembler particulièrement visible avant une photo ou un rendez-vous, sans qu’on puisse attribuer chaque poussée à un événement. Des soins doux et un traitement adapté valent mieux que les recettes agressives.",
    "detail": "Un bouton apparaît avant une photo, une fête ou un rendez-vous et tu as l’impression qu’il a choisi son moment. En réalité, les lésions d’acné se développent avant de devenir visibles. Le fait de surveiller davantage ton visage à l’approche d’un événement peut aussi rendre le bouton plus présent dans tes pensées. On ne peut pas déduire, à partir d’un épisode, ce qui a précisément déclenché la poussée.\n\nL’acné concerne le follicule pilosébacé, associé à une glande qui produit le sébum. Pendant l’adolescence, les changements hormonaux favorisent une peau plus grasse ; le follicule peut s’obstruer et s’enflammer. Les lésions n’ont pas toutes la même profondeur : points noirs, petits boutons inflammatoires ou lésions plus profondes. Cette diversité explique pourquoi le même produit ne convient pas forcément à tout le monde.\n\nFrotter plus fort n’est pas une manière de nettoyer l’acné. Les gommages répétés, l’alcool, les mélanges maison et les produits irritants peuvent abîmer la peau. Percer un bouton peut augmenter l’inflammation et favoriser des marques. L’objectif est de soigner une peau qui a besoin de douceur, pas de lui faire subir une punition. Un nettoyage adapté et des produits non comédogènes constituent une base plus raisonnable.\n\nLe maquillage n’est pas interdit par principe. Si tu en utilises, choisis des produits adaptés et retire-les doucement. Tu n’es pas obligé de cacher tes boutons pour aller en cours, mais tu peux souhaiter les rendre moins visibles. La décision t’appartient. En revanche, masquer une lésion ne remplace pas une consultation lorsqu’elle est profonde, douloureuse ou laisse des cicatrices.\n\nIl n’existe pas de produit sérieux qui garantisse de faire disparaître toute acné en une nuit. Les traitements s’évaluent généralement dans la durée, et certains irritent au début. Un pharmacien ou un médecin peut t’expliquer comment les utiliser, quand réévaluer et ce qu’il faut éviter d’associer. Si tu appliques plusieurs actifs en même temps, signale-le : une peau irritée peut compliquer l’appréciation du résultat.\n\nNe transforme pas non plus un bouton en raison de supprimer seul des aliments ou de prendre des compléments. Les liens entre alimentation et acné ne permettent pas de déclarer un aliment responsable de chaque lésion. Une restriction stricte peut prendre trop de place dans la vie quotidienne. Si tu repères une association qui t’inquiète, discute-en plutôt que d’adopter un régime trouvé dans une vidéo.\n\nEnfin, la gravité ne se mesure pas uniquement au nombre de boutons. Tu peux en avoir peu et être très affecté par ton reflet, des remarques ou la peur des photos. Cela mérite d’être entendu. Tu peux demander un traitement pour améliorer la peau, mais aussi parler de ce que cela change dans ta vie. Le but n’est pas d’obtenir une peau de filtre : c’est de limiter les lésions, les cicatrices et la souffrance.\n\nPour suivre l’évolution, évite de vérifier ton visage à chaque passage devant un miroir. Une observation espacée peut être plus utile qu’une inspection permanente. Signale surtout les douleurs, les nouvelles cicatrices et la gêne vécue, plutôt qu’une comparaison avec une photo retouchée ou une publicité.",
    "watch": "Consulte si les lésions sont profondes ou douloureuses, laissent des cicatrices, s’aggravent ou résistent aux soins conseillés. Une souffrance importante, même avec peu de boutons, justifie aussi d’en parler.",
    "headingTitle": "Pourquoi un bouton arrive toujours au pire moment ?",
    "question": "Acné : que faire quand les boutons deviennent gênants ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "Société française de dermatologie",
        "title": "Recommandations acné 2015 ; publication française multidisciplinaire en 2017. Type : recommandation de pratique clinique. La date de consultation du site ne constitue pas une actualisation scientifique.",
        "label": "Société française de dermatologie — Recommandations acné 2015 ; publication française multidisciplinaire en 2017. Type : recommandation de pratique clinique. La date de consultation du site ne constitue pas une actualisation scientifique.",
        "url": "https://cdp.sfdermato.org/recommandation-cdp/44-acne"
      },
      {
        "org": "American Academy of Dermatology",
        "title": "Reynolds et al., 2024. Guidelines of care for the management of acne vulgaris. DOI : 10.1016/j.jaad.2023.12.017. Type : recommandation clinique ; résumé consulté.",
        "label": "American Academy of Dermatology — Reynolds et al., 2024. Guidelines of care for the management of acne vulgaris. DOI : 10.1016/j.jaad.2023.12.017. Type : recommandation clinique ; résumé consulté.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38300170/"
      },
      {
        "org": "Assurance Maladie",
        "title": "Définition et évolution",
        "label": "Assurance Maladie — Définition et évolution",
        "url": "https://www.ameli.fr/assure/sante/themes/acne/definition-symptomes-evolution"
      },
      {
        "org": "Assurance Maladie",
        "title": "Bons gestes",
        "label": "Assurance Maladie — Bons gestes",
        "url": "https://www.ameli.fr/assure/sante/themes/acne/bons-reflexes-bons-gestes"
      },
      {
        "org": "Assurance Maladie",
        "title": "Traitement",
        "label": "Assurance Maladie — Traitement",
        "url": "https://www.ameli.fr/assure/sante/themes/acne/traitement"
      }
    ],
    "source": "Société française de dermatologie · American Academy of Dermatology · Assurance Maladie",
    "url": "https://cdp.sfdermato.org/recommandation-cdp/44-acne",
    "keywords": "ado adolescent acné boutons peau visage comédons peroxyde benzoyle adapalène rétinoïde cicatrices dermatologue Pourquoi un bouton arrive toujours au pire moment ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-rougissement-regard-autres",
      "ado-ruminations-coucher",
      "ado-boissons-energisantes"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "1552c0435946da428d1a25d94270d36456bb917adee35f977b7e269783e805b5"
    }
  },
  {
    "id": "ado-ruminations-coucher",
    "title": "Pourquoi je repense à un moment gênant quand je veux dormir ?",
    "answer": "Quand tout se calme, certaines pensées deviennent plus présentes. Rejouer une scène gênante peut arriver sans traduire un trouble. Si ces pensées tournent en boucle, perturbent souvent ton sommeil ou s’accompagnent d’une anxiété importante, il est utile d’en parler plutôt que de rester seul avec elles.",
    "detail": "Tu éteins la lumière et ton cerveau ressort une phrase maladroite dite trois jours plus tôt. Puis il ajoute ce que tu aurais dû répondre. Le contraste avec le calme de la chambre peut donner l’impression qu’il démarre au mauvais moment. Une pensée pénible au coucher peut survenir ponctuellement. Elle ne signifie pas, à elle seule, que tu souffres d’un trouble anxieux ou que tu vas forcément passer une mauvaise nuit.\n\nIl faut distinguer réfléchir à un événement et tourner autour sans avancer. Dans une réflexion utile, tu peux comprendre ce qui s’est passé ou décider d’une action. Dans une rumination, tu reviens surtout aux mêmes questions : « pourquoi j’ai dit ça ? », « qu’est-ce qu’ils pensent ? ». Le sentiment d’urgence peut être fort alors qu’aucune réponse fiable n’est disponible à cette heure-là.\n\nLa peur de ne pas dormir peut ajouter une seconde couche. Tu vérifies l’heure, tu calcules ce qu’il reste de nuit et tu t’énerves de penser encore. Ce contrôle permanent rend le coucher plus pénible. Le problème n’est pas un manque d’effort : essayer de commander brutalement son sommeil ou d’interdire toute pensée est souvent difficile. Il est plus réaliste de chercher une manière moins conflictuelle de traverser ce moment.\n\nTu peux essayer de noter, avant le coucher, une inquiétude précise et une éventuelle action pour le lendemain. Par exemple : parler à une amie plutôt que relire mentalement la conversation. Si aucune action n’est nécessaire, le reconnaître peut suffire à remettre le sujet à plus tard. Cette habitude n’efface pas toutes les pensées ; elle évite surtout de traiter chaque souvenir comme un problème à résoudre immédiatement.\n\nUne transition calme peut aussi aider : activité tranquille, notifications coupées et horaires assez réguliers. Une conversation qui repart dans le groupe ou une vidéo très stimulante peut te ramener dans une nouvelle boucle. Tu peux convenir avec tes proches que les messages tardifs n’attendent pas de réponse. Le but est de protéger ton repos, pas de prouver que tu sais parfaitement te déconnecter.\n\nSi cela revient souvent, observe aussi le reste de la journée. As-tu peur d’être jugé, une difficulté au collège, une rupture, un conflit ou une charge de travail inhabituelle ? Une consultation peut explorer ces éléments ainsi que les habitudes de sommeil. Il n’est pas nécessaire de chercher seul une étiquette psychologique à partir d’un contenu en ligne. Des difficultés différentes peuvent produire des nuits qui se ressemblent.\n\nEnfin, tu peux demander de l’aide avant d’être épuisé. Dire « j’ai du mal à arrêter de rejouer certaines scènes et ça m’empêche de dormir » est une explication suffisante. Un adulte de confiance, un médecin ou un psychologue peut t’aider à préciser ce qui entretient le problème. Si les pensées sont liées à des humiliations ou à un événement subi, on doit aussi prendre en compte cette situation, pas seulement améliorer ton coucher.\n\nTu peux aussi demander à tes proches de ne pas relancer les conflits juste au moment du coucher. Prévoir un autre temps de discussion ne règle pas tout, mais évite de transformer le lit en endroit où chaque problème doit être résolu immédiatement.",
    "watch": "Demande un avis si le sommeil est régulièrement perturbé, si la peur du jugement provoque des évitements, ou si ton moral se dégrade. Si tu te sens en danger ou as peur de te faire du mal, cherche immédiatement une personne présente et une aide médicale urgente.",
    "headingTitle": "Pourquoi je repense à un moment gênant quand je veux dormir ?",
    "question": "Pourquoi je repense à un moment gênant quand je veux dormir ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "AACAP",
        "title": "Walter et al., 2020. Assessment and Treatment of Children and Adolescents With Anxiety Disorders. DOI : 10.1016/j.jaac.2020.05.005. Type : recommandation de pratique clinique ; résumé consulté.",
        "label": "AACAP — Walter et al., 2020. Assessment and Treatment of Children and Adolescents With Anxiety Disorders. DOI : 10.1016/j.jaac.2020.05.005. Type : recommandation de pratique clinique ; résumé consulté.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32439401/"
      },
      {
        "org": "AASM",
        "title": "Paruthi et al., 2016. Consensus sur la durée du sommeil pédiatrique. J Clin Sleep Med. DOI : 10.5664/jcsm.5866. Type : consensus de société savante.",
        "label": "AASM — Paruthi et al., 2016. Consensus sur la durée du sommeil pédiatrique. J Clin Sleep Med. DOI : 10.5664/jcsm.5866. Type : consensus de société savante.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27250809/"
      },
      {
        "org": "Assurance Maladie",
        "title": "Mieux dormir à l’adolescence",
        "label": "Assurance Maladie — Mieux dormir à l’adolescence",
        "url": "https://www.ameli.fr/assure/sante/themes/adolescents-sommeil/comment-mieux-dormir-l-adolescence"
      },
      {
        "org": "Assurance Maladie",
        "title": "Consultation sommeil",
        "label": "Assurance Maladie — Consultation sommeil",
        "url": "https://www.ameli.fr/assure/sante/themes/adolescents-sommeil/du-mal-dormir-l-adolescence-en-parler-son-medecin"
      },
      {
        "org": "Assurance Maladie",
        "title": "Souffrance psychique des jeunes",
        "label": "Assurance Maladie — Souffrance psychique des jeunes",
        "url": "https://www.ameli.fr/assure/sante/jeunes-16-25-ans/souffrance-psychique/troubles-psychiques"
      }
    ],
    "source": "AACAP · AASM · Assurance Maladie",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32439401/",
    "keywords": "Pourquoi je repense à un moment gênant quand je veux dormir ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-acne",
      "ado-boissons-energisantes",
      "ado-ecrans-reseaux"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "6f899ae9f9440d1874d60f1852881f3cd023723257a7dbf23aaab3cd0c72f6f2"
    }
  },
  {
    "id": "ado-boissons-energisantes",
    "title": "Boissons énergisantes : quels risques chez les adolescents ?",
    "answer": "La caféine peut diminuer temporairement la sensation de fatigue, mais elle ne remplace pas le sommeil. Les boissons énergisantes peuvent provoquer des effets indésirables, notamment sur le sommeil et le cœur. Les recommandations françaises conseillent aux enfants et aux adolescents de les éviter.",
    "detail": "Une canette promet de l’énergie avant un contrôle, une soirée ou une séance de sport. Le mot est séduisant, surtout quand tu es fatigué. Pourtant, ressentir moins de somnolence pendant un moment ne signifie pas avoir récupéré. La caféine peut stimuler l’éveil, mais elle ne réalise pas le travail du sommeil. Le lendemain, la dette de repos peut toujours être là, même si tu as réussi à rester debout plus longtemps.\n\nLes boissons dites énergisantes ne doivent pas être confondues avec les boissons destinées à certains efforts sportifs. Elles contiennent souvent de la caféine et, selon les produits, du sucre et d’autres substances. Une version sans sucre n’est donc pas une version sans stimulant. Pour savoir ce que tu consommes, il faut regarder la composition et le volume total de la canette, pas uniquement une image sportive ou une promesse commerciale.\n\nLes effets varient selon les personnes, la quantité prise et les autres sources de caféine. Café, thé, cola et certains produits peuvent s’ajouter dans la journée. Le fait qu’un ami ne ressente rien ne démontre pas que la boisson sera sans effet pour toi. Des palpitations, une agitation, des tremblements ou des difficultés à dormir peuvent survenir. Certains effets rapportés sont plus sérieux et justifient de ne pas banaliser ces produits.\n\nLe piège peut être progressif : tu dors peu, tu prends une boisson pour tenir, puis tu t’endors plus difficilement et tu recommences. Ce scénario n’arrive pas à tout le monde, mais il explique pourquoi lutter contre la fatigue uniquement avec des stimulants peut entretenir le problème. Si tu es régulièrement épuisé, la question utile est d’abord de comprendre ton sommeil et ce qui le raccourcit.\n\nMélanger une boisson énergisante à de l’alcool n’est pas une protection. Se sentir plus éveillé ne veut pas dire que l’alcool a disparu ou que tes capacités sont redevenues normales. Les recommandations déconseillent cette association. Les boissons énergisantes sont également déconseillées avant ou pendant une activité physique. Une mise en scène avec un sportif ne constitue pas une indication médicale ou une preuve de sécurité pour l’entraînement.\n\nAu quotidien, l’eau reste la boisson de base. Pour préparer un examen, des pauses, des repas réguliers et un temps de sommeil protégé sont plus utiles qu’une stratégie construite autour des canettes. Si tu en prends déjà souvent, tu peux en parler sans craindre d’être jugé. Un professionnel aidera à faire le point sur la quantité, les symptômes et la façon de réduire la consommation si nécessaire.\n\nIl est important de ne pas transformer la discussion en concours de résistance : supporter une grande quantité de caféine n’est pas une performance. Tu peux refuser une boisson proposée par des amis sans te justifier médicalement. Et si tu as besoin de stimulants pour réussir une journée ordinaire, cela mérite une conversation sur ta fatigue, ton rythme ou ton moral, plutôt qu’une nouvelle marque à essayer.\n\nUne marque connue ou une vente libre ne signifie pas qu’un produit convient à tous les âges. La question utile n’est pas de savoir si la canette est populaire, mais si elle est adaptée à ta situation et aux recommandations pour les adolescents.",
    "watch": "Après consommation, une douleur thoracique, un malaise, des palpitations importantes ou une difficulté respiratoire nécessitent une aide médicale rapide. Signale toute consommation au professionnel qui t’évalue. Consulte aussi si fatigue ou insomnie deviennent régulières.",
    "headingTitle": "Les boissons énergisantes m’aident-elles vraiment à tenir ?",
    "question": "Boissons énergisantes : quels risques chez les adolescents ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "Société canadienne de pédiatrie",
        "title": "Les boissons pour sportifs et les boissons énergisantes chez les enfants et les adolescents, 2017. Type : document de principes de société savante.",
        "label": "Société canadienne de pédiatrie — Les boissons pour sportifs et les boissons énergisantes chez les enfants et les adolescents, 2017. Type : document de principes de société savante.",
        "url": "https://cps.ca/fr/documents/position/les-boissons-pour-sportifs-et-les-boissons-energisantes"
      },
      {
        "org": "Assurance Maladie",
        "title": "Caféine et recommandations",
        "label": "Assurance Maladie — Caféine et recommandations",
        "url": "https://www.ameli.fr/assure/sante/themes/alimentation/boissons-energisantes/boissons-energisantes-et-cafeine-quelle-consommation-se-tenir"
      },
      {
        "org": "Assurance Maladie",
        "title": "Effets sur la santé",
        "label": "Assurance Maladie — Effets sur la santé",
        "url": "https://www.ameli.fr/assure/sante/themes/alimentation/boissons-energisantes/boissons-energisantes-et-effets-sur-la-sante"
      },
      {
        "org": "Anses",
        "title": "Recommandations boissons énergisantes",
        "label": "Anses — Recommandations boissons énergisantes",
        "url": "https://www.anses.fr/system/files/Recommandations_boissons_%C3%A9nergisantes_0.pdf"
      },
      {
        "label": "ANSES — évaluation des risques liés aux boissons dites énergisantes et à la caféine chez les enfants et adolescents",
        "url": "https://www.anses.fr/system/files/PRES2013CPA15.pdf?download=1"
      },
      {
        "label": "Assurance Maladie — sommeil de l’adolescent",
        "url": "https://www.ameli.fr/assure/sante/themes/adolescents-sommeil/sommeil-de-l-adolescent-quelles-particularites"
      }
    ],
    "source": "Société canadienne de pédiatrie · Assurance Maladie · Anses · ANSES",
    "url": "https://cps.ca/fr/documents/position/les-boissons-pour-sportifs-et-les-boissons-energisantes",
    "keywords": "ado adolescent boisson énergisante energy drink caféine taurine red bull monster sport alcool palpitations sommeil Les boissons énergisantes m’aident-elles vraiment à tenir ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-ruminations-coucher",
      "ado-ecrans-reseaux",
      "regles-douloureuses-dysmenorrhee"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "14b4d22bb0f1c82ba1aff97fd2dd8119e333c4e1b3a7d73855166cff9b2611ae"
    }
  },
  {
    "id": "ado-ecrans-reseaux",
    "title": "Écrans et réseaux sociaux : combien de temps par jour ?",
    "answer": "L’attente d’une réponse peut donner envie de vérifier souvent son téléphone, surtout quand la relation compte pour toi. Ce comportement ne suffit pas à parler d’addiction. Il devient préoccupant lorsqu’il prend le dessus sur le sommeil, les cours, les relations ou ton bien-être.",
    "detail": "Tu regardes ton téléphone, tu le poses, puis tu le reprends alors qu’il n’a pas sonné. Tu sais qu’une nouvelle vérification ne fera pas arriver la réponse plus vite, mais l’envie revient. Quand un message touche à l’amitié, à l’attirance ou à une dispute, l’attente peut prendre beaucoup de place. Ce n’est pas une preuve que tu es faible, ni une raison de te coller immédiatement une étiquette d’addiction.\n\nLes applications rendent certains signes très visibles : présence en ligne, message lu, indicateur de saisie ou nombre de réactions. Ces informations peuvent déclencher des interprétations. Pourtant, elles ne donnent pas un accès fiable aux pensées de l’autre. Une personne peut avoir ouvert l’application sans être disponible pour répondre. Le délai ne mesure pas précisément ton importance à ses yeux, même si tu le ressens ainsi sur le moment.\n\nIl faut distinguer l’habitude de vérifier et ce qu’elle provoque. Un épisode d’attente avant une réponse importante n’est pas la même chose qu’un contrôle permanent qui coupe toutes les activités. Demande-toi si tu arrives encore à laisser ton téléphone pendant un repas, un cours, une sortie ou la nuit. Observe aussi ce que tu ressens : curiosité, peur de déplaire, colère, besoin d’être rassuré ou impression d’être obligé de répondre immédiatement.\n\nUne première étape peut être de réduire les sollicitations choisies par l’application : certaines notifications, les aperçus ou les alertes de groupe. Tu peux tester une courte période avec le téléphone hors de portée pendant une activité, puis regarder si cela te libère un peu. Ce n’est pas un concours d’abstinence numérique. Une mesure modeste que tu gardes vaut mieux qu’une coupure spectaculaire suivie d’un sentiment d’échec.\n\nOn peut aussi agir sur les règles relationnelles. Avec des amis, dire qu’une réponse peut attendre évite parfois un malentendu. En couple, la disponibilité permanente ne devrait pas devenir une preuve d’amour. Si quelqu’un exige de connaître tes mots de passe, ta localisation ou de vérifier tes échanges, il faut prendre la situation au sérieux. Ce n’est pas simplement un problème de temps d’écran.\n\nComme le souligne l’avis de l’APA, les réseaux peuvent apporter du soutien ; leurs effets dépendent notamment de la personne, des contenus et du contexte. Les présenter comme uniquement mauvais ferait manquer cette réalité. L’enjeu est de voir ce que ton usage apporte et ce qu’il prend : repos, concentration, plaisir ou liberté. Une baisse du moral et un usage envahissant peuvent s’entremêler ; il serait trop rapide de conclure que l’un explique toujours l’autre.\n\nSi tu n’arrives plus à modifier une habitude qui te fait souffrir, un médecin, un psychologue ou un lieu d’accueil pour les jeunes peut t’aider. Tu peux venir avec un exemple précis : « je vérifie jusque dans la nuit et je panique quand on ne répond pas ». Cela permet de travailler sur l’usage du téléphone et sur l’inquiétude relationnelle qui l’accompagne. Tu n’as pas à choisir seul entre tout accepter et supprimer toute ta vie sociale en ligne.\n\nSi tu testes un changement, observe aussi ton confort et ta disponibilité pour autre chose. Une baisse du nombre de vérifications n’est pas le seul indicateur : retrouver une soirée tranquille ou un repas sans surveillance permanente est déjà un résultat concret.",
    "watch": "Parles-en si tu perds régulièrement du sommeil, évites les activités ou te sens très anxieux. Menaces, chantage, diffusion d’images ou contrôle par un partenaire nécessitent une aide et ne doivent pas être présentés comme une simple addiction au téléphone.",
    "headingTitle": "Pourquoi je vérifie tout le temps si on m’a répondu ?",
    "question": "Écrans et réseaux sociaux : combien de temps par jour ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "American Psychological Association",
        "title": "Health advisory on social media use in adolescence, 2023. Type : avis scientifique professionnel fondé sur la littérature, pas un essai clinique.",
        "label": "American Psychological Association — Health advisory on social media use in adolescence, 2023. Type : avis scientifique professionnel fondé sur la littérature, pas un essai clinique.",
        "url": "https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use?os=0"
      },
      {
        "org": "Assurance Maladie",
        "title": "Écrans et santé des jeunes",
        "label": "Assurance Maladie — Écrans et santé des jeunes",
        "url": "https://www.ameli.fr/assure/sante/themes/ecrans-enfance-adolescence/ecran-sante-enfant-adolescent"
      },
      {
        "org": "Assurance Maladie",
        "title": "Adapter les usages",
        "label": "Assurance Maladie — Adapter les usages",
        "url": "https://www.ameli.fr/assure/sante/themes/ecrans-enfance-adolescence/usage-ecran-age"
      },
      {
        "org": "Assurance Maladie",
        "title": "Où trouver de l’aide",
        "label": "Assurance Maladie — Où trouver de l’aide",
        "url": "https://www.ameli.fr/assure/sante/themes/ecrans-enfance-adolescence/ecrans-information"
      },
      {
        "org": "OnSEXprime",
        "title": "Consentement",
        "label": "OnSEXprime — Consentement",
        "url": "https://www.onsexprime.fr/la-sexualite/ok-ou-pas-ok/ok-pas-ok-le-consentement-c-est-obligatoire"
      }
    ],
    "source": "American Psychological Association · Assurance Maladie · OnSEXprime",
    "url": "https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use?os=0",
    "keywords": "ado adolescent écrans écran téléphone smartphone tiktok instagram youtube réseaux sociaux temps sommeil addiction usage problématique Pourquoi je vérifie tout le temps si on m’a répondu ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-boissons-energisantes",
      "regles-douloureuses-dysmenorrhee",
      "pertes-vaginales-2026-08-27"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "3029650b4710fb9c8b8edea49ed1ca2b8a03b9fd97993a7bee8619abf07e5153"
    }
  },
  {
    "id": "regles-douloureuses-dysmenorrhee",
    "title": "Règles douloureuses : est-ce normal et quand faut-il en parler ?",
    "answer": "Les douleurs de règles sont fréquentes, mais une douleur qui t’empêche d’aller en cours, de dormir ou de vivre normalement mérite une consultation. Des traitements existent. Une douleur importante ou persistante peut justifier de rechercher une cause, notamment une endométriose, sans que toutes les règles douloureuses en soient le signe.",
    "detail": "Tu annules une sortie, tu restes pliée sur une chaise et on te répond que les règles font mal à tout le monde. Cette phrase ne permet pas d’évaluer ce que tu vis. Une douleur peut être fréquente sans devoir être supportée en silence. Le retentissement est essentiel : manquer régulièrement les cours, vomir de douleur ou ne pas pouvoir dormir sont des informations à transmettre au professionnel de santé.\n\nPendant les règles, l’utérus se contracte pour évacuer une partie de sa muqueuse. Des substances appelées prostaglandines participent aux contractions et peuvent contribuer aux douleurs. Chez certaines adolescentes, il s’agit de douleurs menstruelles sans maladie pelvienne identifiée. Mais on ne doit pas présumer que toutes les douleurs viennent de ce mécanisme : l’histoire, les symptômes associés et leur évolution orientent l’évaluation.\n\nPour préparer la consultation, note quand la douleur commence, sa durée, son intensité et ce qu’elle t’empêche de faire. Ajoute les saignements très abondants, les malaises, les douleurs pour aller à la selle ou les troubles urinaires s’ils surviennent. Indique aussi les médicaments essayés et leur effet réel. Il n’est pas nécessaire de remplir un dossier parfait : quelques exemples concrets valent mieux qu’un simple « ça fait mal ».\n\nEn attendant un avis, une chaleur douce sur le ventre peut soulager certaines personnes. Choisis une température confortable pour éviter la brûlure. Une activité adaptée ou le repos peuvent aider selon le moment ; tu n’as pas à faire du sport pour prouver ta volonté. Pour les médicaments, demande conseil et respecte la notice. Ne mélange pas plusieurs anti-inflammatoires et ne prends pas le traitement prescrit à une amie.\n\nLe médecin peut proposer une prise en charge selon ton âge, les contre-indications et tes besoins. Une contraception hormonale peut parfois être discutée pour contrôler les symptômes, même si l’objectif n’est pas d’éviter une grossesse. Cette proposition doit être expliquée et tenir compte de tes préférences. Elle ne remplace pas une réévaluation lorsque les douleurs restent importantes ou changent.\n\nUne endométriose peut débuter à l’adolescence, mais toutes les douleurs de règles ne signifient pas qu’on en a une. À l’inverse, être jeune ne suffit pas à écarter cette possibilité. La démarche dépend des symptômes et de leur réponse aux traitements. L’examen et les éventuelles explorations doivent être expliqués ; poser une question ou demander un temps d’échange seule avec le professionnel est légitime.\n\nEnfin, le sujet ne concerne pas uniquement une conversation entre filles. Des amis informés peuvent aider sans minimiser, sans plaisanter sur la fragilité et sans annoncer à tout le monde que tu as tes règles. Tu peux décider de ce que tu souhaites partager. À l’école, une personne de confiance peut aider pour les protections ou l’organisation d’une consultation. Chercher une solution n’est pas exagérer : c’est prendre au sérieux un symptôme qui modifie ta vie.\n\nTu peux demander que le professionnel reformule les options et t’explique ce qu’il cherche. Comprendre le plan, les effets attendus et le moment de réévaluation aide à ne pas rester seule avec une ordonnance ou une inquiétude. Une douleur persistante mérite un nouveau point.",
    "watch": "Consulte pour des douleurs qui empêchent les activités, persistent malgré un traitement adapté ou s’aggravent. Une douleur brutale inhabituelle, un malaise, une fièvre, un saignement très important ou une douleur avec possibilité de grossesse nécessitent une évaluation rapide.",
    "headingTitle": "Mes règles me plient en deux : je dois juste supporter ?",
    "question": "Règles douloureuses : est-ce normal et quand faut-il en parler ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "CNGOF–HAS",
        "title": "Sauvan et al., 2018. Traitement de l’endométriose douloureuse chez l’adolescente, RPC 2017. DOI : 10.1016/j.gofs.2018.02.029. Type : recommandation et revue de littérature ; résumé consulté. Porte sur l’endométriose, pas toutes les douleurs de règles.",
        "label": "CNGOF–HAS — Sauvan et al., 2018. Traitement de l’endométriose douloureuse chez l’adolescente, RPC 2017. DOI : 10.1016/j.gofs.2018.02.029. Type : recommandation et revue de littérature ; résumé consulté. Porte sur l’endométriose, pas toutes les douleurs de règles.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29519595/"
      },
      {
        "org": "NASPAG",
        "title": "Painful Periods (Dysmenorrhea), 2020. Type : fiche patient spécialisée en gynécologie pédiatrique et adolescente.",
        "label": "NASPAG — Painful Periods (Dysmenorrhea), 2020. Type : fiche patient spécialisée en gynécologie pédiatrique et adolescente.",
        "url": "https://www.naspag.org/assets/docs/dysmenorrhea_2020.pdf"
      },
      {
        "org": "Assurance Maladie",
        "title": "Règles à l’adolescence",
        "label": "Assurance Maladie — Règles à l’adolescence",
        "url": "https://www.ameli.fr/assure/sante/themes/puberte/informations-conseils-regles"
      },
      {
        "org": "Assurance Maladie",
        "title": "Consultation et traitement",
        "label": "Assurance Maladie — Consultation et traitement",
        "url": "https://www.ameli.fr/assure/sante/themes/regles-douloureuses/consultation-traitement"
      },
      {
        "org": "Assurance Maladie",
        "title": "Causes des douleurs",
        "label": "Assurance Maladie — Causes des douleurs",
        "url": "https://www.ameli.fr/assure/sante/themes/regles-douloureuses/douleurs-regles"
      },
      {
        "org": "Assurance Maladie",
        "title": "Douleurs pendant les règles : que faire et quand consulter ?",
        "year": "2025",
        "url": "https://www.ameli.fr/assure/sante/themes/regles-douloureuses/que-faire-quand-consulter"
      },
      {
        "org": "HAS / SIFEM / SFR / CNGOF",
        "title": "Actualisation de la place des différents examens d’imagerie pour le diagnostic d’endométriose",
        "year": "2024–2025",
        "url": "https://www.has-sante.fr/jcms/p_3524940/fr/actualisation-de-la-place-des-differents-examens-d-imagerie-pour-le-diagnostic-d-endometriose"
      },
      {
        "org": "EMC - AKOS",
        "title": "Dysménorrhée",
        "year": "2025",
        "url": "https://www.em-consulte.com/article/1749310/dysmenorrhee"
      }
    ],
    "source": "CNGOF–HAS · NASPAG · Assurance Maladie · HAS / SIFEM / SFR / CNGOF · EMC - AKOS",
    "url": "https://pubmed.ncbi.nlm.nih.gov/29519595/",
    "keywords": "règles douloureuses douleur règles dysménorrhée dysmenorrhee mal pendant règles menstruations douloureuses douleurs menstruelles endométriose adolescente absentéisme école travail AINS Mes règles me plient en deux : je dois juste supporter ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-ecrans-reseaux",
      "pertes-vaginales-2026-08-27",
      "ado-premiere-fois-pression-retard"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "c0ced3fd1bf0cb449873314387249eb2a57c63e28b881de2f182f0c288e43856"
    }
  },
  {
    "id": "pertes-vaginales-2026-08-27",
    "title": "Pertes vaginales : quand sont-elles normales et quand consulter ?",
    "answer": "Des pertes transparentes ou blanchâtres, sans douleur, démangeaison ni odeur inhabituelle, peuvent être normales, y compris avant toute relation sexuelle. Leur quantité et leur aspect varient. Elles ne signifient pas que tu es sale. Un changement associé à des symptômes mérite un avis plutôt qu’un traitement acheté au hasard.",
    "detail": "Découvrir une trace dans sa culotte peut faire peur si personne n’a expliqué les sécrétions vaginales. Des pertes peuvent apparaître avec les changements de la puberté et faire partie du fonctionnement habituel du corps. Elles ne nécessitent pas d’avoir eu une relation sexuelle. Elles ne permettent pas non plus de conclure à une infection ou de juger l’hygiène d’une personne.\n\nLe vagin produit des sécrétions qui participent à son équilibre et à sa protection. Leur quantité et leur consistance peuvent changer au cours du cycle. Une personne peut en remarquer davantage qu’une autre sans qu’il y ait nécessairement un problème. Ce qui compte est notamment un changement inhabituel pour toi et la présence de symptômes associés. Une description isolée ou une photo trouvée en ligne ne permet pas un diagnostic fiable.\n\nSi les pertes s’accompagnent de démangeaisons, de brûlures, d’une odeur inhabituelle ou d’une douleur, demande un avis. Plusieurs causes sont possibles : irritation, déséquilibre de la flore, mycose ou certaines infections. Elles n’ont pas toutes le même traitement. Une mycose ne se diagnostique pas uniquement parce que les pertes sont blanches. Répéter seul un antifongique peut retarder l’identification du véritable problème.\n\nPour la toilette, il faut distinguer vulve et vagin. La vulve est la partie externe ; le vagin est interne et ne doit pas être lavé avec une douche vaginale. Une toilette externe douce suffit. Les produits parfumés, déodorants intimes et lavages répétés peuvent irriter ou déséquilibrer la flore. Chercher à supprimer toute sécrétion ou toute odeur naturelle peut donc aggraver la gêne au lieu de la résoudre.\n\nLes sous-vêtements doivent surtout être confortables et changés selon les besoins. Si un produit ou une protection provoque une irritation, arrête de l’utiliser et demande conseil. Tu n’es pas obligée d’acheter toute une gamme d’hygiène intime parce qu’une publicité présente les pertes comme un défaut. Le corps n’a pas à sentir le parfum pour être propre, et les sécrétions normales ne sont pas un échec de ta toilette.\n\nLors d’une consultation, le professionnel peut poser des questions sur les produits utilisés, le cycle, les douleurs et, si cela aide à l’évaluation, les contacts sexuels. Tu peux demander pourquoi une question est posée et parler sans accompagnant pendant une partie du rendez-vous. Un examen n’est pas automatiquement identique pour toutes les personnes ; les gestes proposés doivent être expliqués et nécessitent ton accord.\n\nSi tu as eu un contact sexuel, indique-le sans penser que cela transforme automatiquement les pertes en infection sexuellement transmissible. Certaines infections peuvent aussi ne provoquer aucun symptôme ; le dépistage se discute selon les expositions. L’objectif de la consultation est de comprendre et de traiter, pas de juger. Tu peux commencer simplement par dire que tu as remarqué un changement et que tu voudrais savoir s’il est habituel.\n\nUne question intime peut être écrite sur ton téléphone et montrée au professionnel si tu es gênée pour la prononcer. Il n’est pas nécessaire d’utiliser le vocabulaire médical. Décrire ce qui a changé, depuis quand et ce que tu ressens constitue un très bon début.",
    "watch": "Demande un avis pour pertes inhabituelles avec démangeaisons, brûlures, mauvaise odeur, douleurs ou saignements inexpliqués. Fièvre et douleur du bas-ventre, douleur intense ou possibilité de grossesse avec douleur justifient une évaluation rapide.",
    "headingTitle": "J’ai des pertes blanches : c’est normal ou je suis sale ?",
    "question": "Pertes vaginales : quand sont-elles normales et quand consulter ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "NASPAG",
        "title": "Vaginal Discharge, 2020. Type : fiche patient spécialisée de société savante.",
        "label": "NASPAG — Vaginal Discharge, 2020. Type : fiche patient spécialisée de société savante.",
        "url": "https://www.naspag.org/assets/docs/vaginal_discharge_2020.pdf"
      },
      {
        "org": "NASPAG",
        "title": "Vulvar & Vaginal Hygiene, 2020. Type : fiche patient spécialisée de société savante.",
        "label": "NASPAG — Vulvar & Vaginal Hygiene, 2020. Type : fiche patient spécialisée de société savante.",
        "url": "https://www.naspag.org/assets/docs/vulvar_hygiene_2020.pdf"
      },
      {
        "org": "Santé publique France / OnSEXprime",
        "title": "Pertes blanches",
        "label": "Santé publique France / OnSEXprime — Pertes blanches",
        "url": "https://www.onsexprime.fr/vos-questions/regles-et-pertes-blanches"
      },
      {
        "org": "Assurance Maladie",
        "title": "Toilette intime",
        "label": "Assurance Maladie — Toilette intime",
        "url": "https://www.ameli.fr/assure/sante/bons-gestes/quotidien/faire-toilette-intime"
      },
      {
        "org": "Assurance Maladie",
        "title": "Vaginite",
        "label": "Assurance Maladie — Vaginite",
        "url": "https://www.ameli.fr/assure/sante/themes/vaginite/definition-symptomes-facteurs-favorisants"
      }
    ],
    "source": "NASPAG · Santé publique France / OnSEXprime · Assurance Maladie",
    "url": "https://www.naspag.org/assets/docs/vaginal_discharge_2020.pdf",
    "keywords": "pertes vaginales pertes blanches infection mycose J’ai des pertes blanches : c’est normal ou je suis sale ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "regles-douloureuses-dysmenorrhee",
      "ado-premiere-fois-pression-retard",
      "ado-premiere-fois-douleur-saignement"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "de21c6bd548d02003731a74eee407c4ba7050d6b79440f197ed574d6215b9a43"
    }
  },
  {
    "id": "ado-premiere-fois-pression-retard",
    "title": "Tout le monde dit l’avoir déjà fait : suis-je en retard ?",
    "answer": "Non. Il n’existe pas de calendrier personnel à respecter pour embrasser quelqu’un, avoir une relation ou commencer une vie sexuelle. Les récits des autres ne sont pas des preuves et ne créent aucune obligation. Ton envie, ton accord libre et ta sécurité comptent davantage qu’une comparaison.",
    "detail": "Dans un groupe, les histoires de relations peuvent vite donner l’impression que tout le monde a de l’expérience. Les personnes qui parlent le plus ne représentent pas forcément toutes les situations. Certaines exagèrent, d’autres restent discrètes, et la même expression peut désigner des expériences différentes. Tu n’as pas à vérifier leurs récits pour avoir le droit d’avancer à ton rythme.\n\nLa sexualité n’est pas une série d’épreuves à réussir dans un ordre obligatoire. Être attiré par quelqu’un, vouloir embrasser, rechercher une proximité ou souhaiter une relation sexuelle ne se produit pas nécessairement au même moment. On peut être curieux sans se sentir prêt. On peut aussi ne pas en avoir envie actuellement. Cela ne suffit pas à conclure à un problème médical, à une immaturité ou à une identité particulière.\n\nIl est utile de distinguer l’envie et la pression. Imagine que personne ne devait connaître ton choix : aurais-tu encore envie de cette expérience avec cette personne, maintenant ? Cette question ne donne pas une réponse parfaite, mais elle peut aider à repérer un besoin de prouver quelque chose. Avoir peur d’être quitté, ridiculisé ou comparé n’est pas une bonne raison d’accepter une situation intime.\n\nUn partenaire respectueux doit pouvoir entendre un refus ou une hésitation sans insister. Être en couple, avoir déjà embrassé ou avoir accepté une autre fois ne crée pas de dette. Tu peux également changer d’avis pendant un moment intime. Si tu te sens obligé de négocier ta tranquillité en acceptant, parle de cette pression à une personne de confiance. Le problème n’est pas que tu serais trop lent.\n\nSe préparer peut passer par une conversation sur les envies, les limites, la protection contre les infections et la contraception lorsqu’une grossesse est possible. Ces sujets concernent les deux partenaires. Une première expérience ne protège pas des risques : l’absence d’expérience ne remplace ni un préservatif ni les autres mesures utiles. Un médecin, une sage-femme ou un centre de santé sexuelle peut répondre aux questions avant toute relation.\n\nLes comparaisons sur le corps ou la performance compliquent aussi les choses. Les images en ligne ne montrent pas une norme à atteindre et les récits entre amis ne disent pas toujours les hésitations, les discussions ou les maladresses. Une expérience n’a pas besoin de ressembler à un scénario pour être respectueuse. Il n’y a pas de résultat à fournir à un groupe, ni de preuve à envoyer à quelqu’un.\n\nSi cette question te pèse, tu peux en parler même sans partenaire. Une consultation peut servir à mieux comprendre ton corps, tes émotions et les possibilités de protection. Tu peux dire que tu ne souhaites pas encore de relation sexuelle et demander simplement des informations. Si tu as au contraire un désir important, cela ne dispense jamais d’écouter l’autre. Ton rythme compte, et celui de l’autre aussi : aucun des deux ne se décide sous la pression.\n\nLa confidentialité des échanges et ses limites peuvent être expliquées au début du rendez-vous. Demander ces précisions est possible avant d’aborder une question intime. Cela aide à choisir ce que tu veux dire et à identifier la personne avec qui tu te sens en confiance.",
    "watch": "Demande de l’aide en cas de pression, menace, chantage affectif ou sexuel, peur d’un partenaire ou humiliation répétée. Si une situation non consentie s’est produite, tu peux être accompagné même si tu ne sais pas encore comment la nommer.",
    "headingTitle": "Tout le monde dit l’avoir déjà fait : suis-je en retard ?",
    "question": "Tout le monde dit l’avoir déjà fait : suis-je en retard ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "Society for Adolescent Health and Medicine",
        "title": "Promoting Sexual Consent Principles in the Sexual and Reproductive Health Care of Adolescents and Young Adults, 2023. J Adolesc Health 73:205–209. DOI : 10.1016/j.jadohealth.2023.04.002. Type : prise de position professionnelle.",
        "label": "Society for Adolescent Health and Medicine — Promoting Sexual Consent Principles in the Sexual and Reproductive Health Care of Adolescents and Young Adults, 2023. J Adolesc Health 73:205–209. DOI : 10.1016/j.jadohealth.2023.04.002. Type : prise de position professionnelle.",
        "url": "https://adolescenthealth.org/wp-content/uploads/2023/05/Promoting-Sexual-Consent-Principles-in-h-Care-of-Adolescents-and-Young-Adults.pdf"
      },
      {
        "org": "OnSEXprime",
        "title": "Première fois : questions",
        "label": "OnSEXprime — Première fois : questions",
        "url": "https://www.onsexprime.fr/la-sexualite/par-ou-commencer/la-premiere-fois-en-10-questions"
      },
      {
        "org": "QuestionSexualité",
        "title": "Premières fois et idées reçues",
        "label": "QuestionSexualité — Premières fois et idées reçues",
        "url": "https://www.questionsexualite.fr/connaitre-son-corps-et-sa-sexualite/la-sexualite-au-cours-de-la-vie/zoom-sur-les-premieres-fois"
      },
      {
        "org": "OnSEXprime",
        "title": "Stéréotypes et normes",
        "label": "OnSEXprime — Stéréotypes et normes",
        "url": "https://www.onsexprime.fr/vos-questions/stereotypes-et-normes"
      },
      {
        "org": "OnSEXprime",
        "title": "Le porno est une mise en scène",
        "label": "OnSEXprime — Le porno est une mise en scène",
        "url": "https://www.onsexprime.fr/les-criteres-qu-on-nous-impose/le-porno/le-porno-c-est-du-mytho"
      }
    ],
    "source": "Society for Adolescent Health and Medicine · OnSEXprime · QuestionSexualité",
    "url": "https://adolescenthealth.org/wp-content/uploads/2023/05/Promoting-Sexual-Consent-Principles-in-h-Care-of-Adolescents-and-Young-Adults.pdf",
    "keywords": "Tout le monde dit l’avoir déjà fait : suis-je en retard ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "pertes-vaginales-2026-08-27",
      "ado-premiere-fois-douleur-saignement",
      "ado-consentement-changer-avis"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "910b19006c62d53a0e248c5808d7762d85bfcb2f1a08957063437959c0fc9130"
    }
  },
  {
    "id": "ado-premiere-fois-douleur-saignement",
    "title": "La première fois doit-elle faire mal ou faire saigner ?",
    "answer": "Non. Une première pénétration n’impose ni douleur ni saignement, et leur présence ou leur absence ne prouve pas l’histoire sexuelle d’une personne. Si tu as mal, tu peux demander d’arrêter. Une douleur persistante, répétée ou importante mérite un avis médical ; tu n’as pas à la supporter pour réussir une première fois.",
    "detail": "On entend parfois qu’une première fois doit forcément faire mal et que le saignement serait une étape normale ou une preuve. Ces idées peuvent créer beaucoup d’appréhension et conduire à accepter une douleur qu’on voudrait interrompre. La sexualité ne commence pas obligatoirement par une pénétration, et une relation intime n’a pas à franchir une étape douloureuse pour être considérée comme réelle ou réussie.\n\nLa présence ou l’absence de saignement ne permet pas d’établir si une personne a déjà eu une relation sexuelle. Les corps sont différents et l’hymen n’est pas un certificat d’histoire intime. Une demande de preuve à ce sujet n’a pas de valeur médicale. Tu n’as pas à raconter ton passé ni à produire un signe corporel pour rassurer un partenaire ou répondre à une attente familiale.\n\nUne gêne peut être ressentie lors d’une expérience nouvelle, mais elle ne doit pas être traitée comme une consigne de continuer. Une douleur peut être associée à différents facteurs, notamment une tension, une irritation ou une lubrification insuffisante. D’autres causes existent. À distance, on ne peut pas déterminer ce qui se passe seulement à partir de la peur de la première fois ou d’un commentaire sur les réseaux.\n\nSi un geste fait mal, on s’arrête et on en parle. Tu n’as pas à terminer pour ne pas décevoir, ni à utiliser un produit anesthésiant pour masquer un signal gênant. La personne avec toi doit respecter l’arrêt sans discuter ta douleur. Changer d’avis ne signifie pas avoir trompé l’autre : le consentement reste nécessaire tout au long du moment partagé, même si vous aviez prévu quelque chose auparavant.\n\nLa protection se prépare indépendamment du fait que ce soit la première expérience. Une grossesse peut être possible dès un premier rapport exposant à ce risque, et certaines infections peuvent se transmettre dès les premiers contacts sexuels. Les préservatifs réduisent les risques d’infections et de grossesse selon les pratiques ; une autre contraception peut aussi être nécessaire ou souhaitée. Un professionnel peut expliquer les options et la conduite à tenir après un incident.\n\nSi une douleur se répète, un médecin ou une sage-femme peut rechercher la cause. Tu peux décrire ce que tu ressens sans devoir donner des détails que tu ne comprends pas toi-même. Un examen n’est pas un passage obligatoire imposé sans explication ; les gestes envisagés doivent être discutés et consentis. Tu peux demander un temps pour poser tes questions, ou signaler que tu as peur d’avoir mal.\n\nEnfin, il ne faut pas confondre information et obligation de commencer. Lire une fiche sur la première fois ne veut pas dire que tu dois la vivre bientôt. Tu peux vouloir comprendre à l’avance, attendre ou ne pas souhaiter de pénétration. Ce qui compte est une situation librement choisie, respectueuse et suffisamment sûre. Ni une douleur, ni un saignement, ni une performance ne constituent un objectif à atteindre.\n\nSi tu as entendu une affirmation inquiétante, apporte-la en consultation et demande ce qui est vrai. Tu n’as pas à choisir entre croire un groupe d’amis et rester sans réponse. Une information claire peut réduire la pression, sans décider à ta place du moment ou de tes choix.",
    "watch": "Consulte pour douleurs persistantes ou répétées, brûlures, pertes inhabituelles ou saignements inexpliqués. Douleur intense, saignement important, malaise ou fièvre : avis urgent. Après rapport à risque de grossesse ou d’infection, demande rapidement conseil, sans attendre des symptômes.",
    "headingTitle": "La première fois doit-elle faire mal ou faire saigner ?",
    "question": "La première fois doit-elle faire mal ou faire saigner ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "RCOG / BritSPAG / BSUG / BSGE",
        "title": "Virginity testing and hymenoplasty, août 2021. Type : prise de position conjointe ; utilisée pour le constat médical sur l’hymen et le saignement, pas pour transposer le droit britannique.",
        "label": "RCOG / BritSPAG / BSUG / BSGE — Virginity testing and hymenoplasty, août 2021. Type : prise de position conjointe ; utilisée pour le constat médical sur l’hymen et le saignement, pas pour transposer le droit britannique.",
        "url": "https://www.rcog.org.uk/media/qlxh3wro/rcog-virginity-testing-hymenoplasty-position-statement-august-2021.pdf"
      },
      {
        "org": "Society for Adolescent Health and Medicine",
        "title": "Promoting Sexual Consent Principles in the Sexual and Reproductive Health Care of Adolescents and Young Adults, 2023. J Adolesc Health 73:205–209. DOI : 10.1016/j.jadohealth.2023.04.002. Type : prise de position professionnelle.",
        "label": "Society for Adolescent Health and Medicine — Promoting Sexual Consent Principles in the Sexual and Reproductive Health Care of Adolescents and Young Adults, 2023. J Adolesc Health 73:205–209. DOI : 10.1016/j.jadohealth.2023.04.002. Type : prise de position professionnelle.",
        "url": "https://adolescenthealth.org/wp-content/uploads/2023/05/Promoting-Sexual-Consent-Principles-in-h-Care-of-Adolescents-and-Young-Adults.pdf"
      },
      {
        "org": "QuestionSexualité",
        "title": "Premières fois et douleur",
        "label": "QuestionSexualité — Premières fois et douleur",
        "url": "https://www.questionsexualite.fr/connaitre-son-corps-et-sa-sexualite/la-sexualite-au-cours-de-la-vie/zoom-sur-les-premieres-fois"
      },
      {
        "org": "OnSEXprime",
        "title": "Première fois : questions",
        "label": "OnSEXprime — Première fois : questions",
        "url": "https://www.onsexprime.fr/la-sexualite/par-ou-commencer/la-premiere-fois-en-10-questions"
      },
      {
        "org": "OnSEXprime",
        "title": "Consentement",
        "label": "OnSEXprime — Consentement",
        "url": "https://www.onsexprime.fr/la-sexualite/ok-ou-pas-ok/ok-pas-ok-le-consentement-c-est-obligatoire"
      },
      {
        "org": "Assurance Maladie",
        "title": "Entrée dans la vie sexuelle",
        "label": "Assurance Maladie — Entrée dans la vie sexuelle",
        "url": "https://www.ameli.fr/assure/sante/themes/puberte/entree-vie-sexuelle-contraception-adolescence"
      }
    ],
    "source": "RCOG / BritSPAG / BSUG / BSGE · Society for Adolescent Health and Medicine · QuestionSexualité · OnSEXprime · Assurance Maladie",
    "url": "https://www.rcog.org.uk/media/qlxh3wro/rcog-virginity-testing-hymenoplasty-position-statement-august-2021.pdf",
    "keywords": "La première fois doit-elle faire mal ou faire saigner ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-premiere-fois-pression-retard",
      "ado-consentement-changer-avis",
      "ado-porno-corps-envies-normes"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "f45152a5fffbd09eb836c4469440d39995c3a4babc69574ba62773aa36b5d5e6"
    }
  },
  {
    "id": "ado-consentement-changer-avis",
    "title": "J’ai dit oui, mais je n’ai plus envie : je peux changer d’avis ?",
    "answer": "Oui. Tu peux changer d’avis à tout moment, même en couple, même après avoir accepté, embrassé ou commencé un moment intime. L’autre personne doit respecter ton arrêt. Le silence, la peur ou le fait de se figer ne doivent pas être interprétés comme un accord.",
    "detail": "Dire oui à un moment ne signifie pas donner une autorisation générale pour la suite. L’envie peut changer, une gêne peut apparaître ou tu peux simplement ne plus vouloir continuer. Tu n’as pas besoin de fournir une raison convaincante pour que ton choix soit respecté. Cela vaut pour les filles et les garçons, quelle que soit la relation avec l’autre personne ou son expérience.\n\nLa SAHM place le consentement mutuel et la communication au cœur d’une relation respectueuse. L’accord concerne un moment et ce que vous choisissez de partager. Accepter un baiser ne veut pas dire accepter tout autre geste. Avoir déjà eu une relation sexuelle avec quelqu’un ne permet pas de présumer son accord la fois suivante. Être en couple ne crée pas davantage d’obligation. Une personne peut aimer son partenaire, être attirée par lui et ne pas souhaiter de relation sexuelle ce jour-là.\n\nDans une situation où l’on se sent en sécurité, on peut exprimer un arrêt avec des mots simples : « je ne veux plus », « on s’arrête » ou « je ne suis pas à l’aise ». Mais tout le monde n’arrive pas à parler dans un moment de peur. On peut se figer, ne pas savoir comment réagir ou craindre la réponse de l’autre. L’absence de résistance n’est pas une preuve de volonté.\n\nLa responsabilité de respecter l’autre ne repose donc pas uniquement sur sa capacité à prononcer un refus parfait. Si ton partenaire hésite, se retire, semble mal à l’aise ou ne participe plus, il faut s’arrêter et vérifier ce qu’il souhaite. Une question attentive n’est pas une formalité qui ralentit tout : elle permet de ne pas décider à la place de l’autre.\n\nL’insistance peut prendre des formes banales en apparence : bouder, rappeler ce qu’on a payé, demander une preuve d’amour ou menacer de rompre. Cela peut rendre très difficile un choix libre. Le fait de céder pour retrouver la paix ne doit pas être présenté comme une envie spontanée. Si tu reconnais ce fonctionnement, tu peux en parler à un proche fiable ou à un professionnel, même sans savoir quel mot employer.\n\nL’alcool et d’autres substances peuvent compliquer l’évaluation de la situation. Une personne qui ne peut pas comprendre ou exprimer librement son choix ne doit pas être considérée comme disponible pour un acte sexuel. Si tu as un doute, la bonne réaction est de ne pas poursuivre. Il ne s’agit pas de chercher un détail qui autoriserait à continuer, mais de s’assurer que la situation est réellement voulue.\n\nAprès une expérience qui te met mal à l’aise, demander de l’aide n’impose pas de raconter immédiatement toute l’histoire. Tu peux commencer par dire que tu n’étais plus d’accord ou que tu n’as pas réussi à réagir. Un professionnel peut écouter et discuter des soins, de la protection et des démarches possibles. Selon les expositions, certaines mesures médicales doivent être envisagées rapidement : il vaut mieux demander conseil sans attendre d’avoir des symptômes.\n\nSi tu te reproches de ne pas avoir crié ou d’avoir changé d’avis trop tard, rappelle-toi que l’autre devait respecter ta volonté. Tu peux chercher du soutien même si tu connais bien cette personne, si tu lui as reparlé ensuite ou si tes souvenirs sont confus. Le soutien ne dépend pas de ta capacité à présenter un récit parfaitement organisé.",
    "watch": "Si tu es en danger immédiat, cherche un lieu sûr et une aide urgente. Après une situation non consentie ou une exposition à un risque de grossesse ou d’infection, demande rapidement un avis médical. Menaces et chantage nécessitent aussi un soutien, même sans contact physique.",
    "headingTitle": "J’ai dit oui, mais je n’ai plus envie : je peux changer d’avis ?",
    "question": "J’ai dit oui, mais je n’ai plus envie : je peux changer d’avis ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "Society for Adolescent Health and Medicine",
        "title": "Promoting Sexual Consent Principles in the Sexual and Reproductive Health Care of Adolescents and Young Adults, 2023. J Adolesc Health 73:205–209. DOI : 10.1016/j.jadohealth.2023.04.002. Type : prise de position professionnelle.",
        "label": "Society for Adolescent Health and Medicine — Promoting Sexual Consent Principles in the Sexual and Reproductive Health Care of Adolescents and Young Adults, 2023. J Adolesc Health 73:205–209. DOI : 10.1016/j.jadohealth.2023.04.002. Type : prise de position professionnelle.",
        "url": "https://adolescenthealth.org/wp-content/uploads/2023/05/Promoting-Sexual-Consent-Principles-in-h-Care-of-Adolescents-and-Young-Adults.pdf"
      },
      {
        "org": "OnSEXprime",
        "title": "Consentement",
        "label": "OnSEXprime — Consentement",
        "url": "https://www.onsexprime.fr/la-sexualite/ok-ou-pas-ok/ok-pas-ok-le-consentement-c-est-obligatoire"
      },
      {
        "org": "OnSEXprime",
        "title": "Couple et absence d’obligation",
        "label": "OnSEXprime — Couple et absence d’obligation",
        "url": "https://www.onsexprime.fr/vos-questions/stereotypes-et-normes"
      },
      {
        "org": "OnSEXprime",
        "title": "Premières fois et protection",
        "label": "OnSEXprime — Premières fois et protection",
        "url": "https://www.onsexprime.fr/la-sexualite/par-ou-commencer/la-premiere-fois-en-10-questions"
      }
    ],
    "source": "Society for Adolescent Health and Medicine · OnSEXprime",
    "url": "https://adolescenthealth.org/wp-content/uploads/2023/05/Promoting-Sexual-Consent-Principles-in-h-Care-of-Adolescents-and-Young-Adults.pdf",
    "keywords": "J’ai dit oui, mais je n’ai plus envie : je peux changer d’avis ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-premiere-fois-douleur-saignement",
      "ado-porno-corps-envies-normes",
      "ado-sommeil-endormissement"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "134ff2b887c285dd6ddd32d766193fe0f63ddb5163129ec3d19848036ff5f5a0"
    }
  },
  {
    "id": "ado-porno-corps-envies-normes",
    "title": "Mon corps et mes envies doivent-ils ressembler à ce qu’on voit dans le porno ?",
    "answer": "Non. La pornographie met en scène des actes et des corps ; elle ne constitue ni un mode d’emploi ni une norme de ce que tu dois aimer. Les limites, le consentement et la protection restent essentiels. Se sentir différent de ces images ne suffit pas à conclure à un problème.",
    "detail": "Une image peut donner l’impression que tout le monde a le même corps, les mêmes envies ou les mêmes réactions. La pornographie sélectionne des personnes, des situations et une mise en scène pour produire un effet. Elle ne montre pas de manière fiable ce que vivent les gens dans leur intimité. Tu n’as pas à comparer ton apparence ou ton expérience à un contenu construit pour être regardé.\n\nLa diversité des corps ne se réduit pas aux personnes les plus visibles à l’écran. Forme des seins, apparence de la vulve, taille du pénis, pilosité ou silhouette varient. Une différence d’aspect par rapport à une image ne permet pas de diagnostiquer un trouble. Si tu as une douleur ou un changement inhabituel, c’est une question médicale différente, qui se discute à partir de tes symptômes plutôt que d’un modèle esthétique.\n\nLes envies ne sont pas non plus un programme à remplir. Tu peux souhaiter certaines choses, en refuser d’autres ou ne pas savoir encore ce qui t’intéresse. Le fait qu’une pratique soit montrée souvent ne la rend pas obligatoire ou attendue. Une personne ne devrait pas utiliser une vidéo pour faire pression sur toi. La phrase « tout le monde fait ça » ne remplace pas ton accord.\n\nLes contenus mis en scène montrent rarement tout ce qui permet une relation respectueuse : échanges sur les limites, choix de protection, pauses, questions ou gestes interrompus parce qu’ils ne conviennent pas. Leur absence à l’image ne signifie pas qu’ils sont inutiles. Dans la vraie vie, une douleur doit être entendue et une hésitation appelle un arrêt ou une discussion. La performance n’a pas à passer avant le confort.\n\nIl faut également éviter de mesurer la réussite par un résultat obligatoire. Le plaisir varie selon les personnes et les circonstances. Ne pas ressentir ce qu’on croyait devoir ressentir pendant une expérience ne suffit pas à conclure que le corps fonctionne mal. Si une difficulté persiste ou te fait souffrir, un professionnel peut aider à comprendre sans te demander de ressembler à une scène ou à une durée prétendument normale.\n\nSi tu as vu une image qui t’a choqué, qui revient dans tes pensées ou qui t’a été envoyée sans que tu le souhaites, tu peux en parler. Tu n’es pas obligé de la montrer à des amis pour faire semblant d’être à l’aise. Demander qu’on cesse de t’envoyer des contenus intimes est légitime. Une diffusion utilisée pour humilier ou faire pression ne relève pas d’une simple plaisanterie.\n\nSi tu consultes des contenus de façon répétée et que tu n’arrives plus à t’en détacher malgré une gêne, regarde ce que cela change : sommeil, concentration, relations, temps disponible ou anxiété. On ne pose pas une étiquette à partir d’une seule habitude ou d’un nombre de visionnages. Tu peux demander une aide pour retrouver un usage choisi et comprendre ce qui accompagne cette consommation.\n\nEnfin, chercher une information de santé sexuelle peut se faire sans regarder de pornographie. Des ressources destinées aux jeunes et des professionnels répondent sur le corps, la contraception, les infections, les émotions et le consentement. L’objectif est de te donner des repères fiables, pas de décider de tes goûts ou d’accélérer tes expériences. Tu peux poser une question précise sans avoir à raconter toute ta vie intime.",
    "watch": "Parles-en si des images provoquent une détresse persistante, si la consultation devient incontrôlable ou si quelqu’un impose des contenus ou des pratiques. Douleurs, violences, menaces ou diffusion d’images sans accord nécessitent une aide adaptée.",
    "headingTitle": "Mon corps et mes envies doivent-ils ressembler à ce qu’on voit dans le porno ?",
    "question": "Mon corps et mes envies doivent-ils ressembler à ce qu’on voit dans le porno ?",
    "category": "Ados",
    "publicCategory": "Ados",
    "usefulInfo": "",
    "watchTitle": "Signaux d’alerte — quand demander de l’aide ?",
    "sources": [
      {
        "org": "Society for Adolescent Health and Medicine",
        "title": "Promoting Sexual Consent Principles in the Sexual and Reproductive Health Care of Adolescents and Young Adults, 2023. J Adolesc Health 73:205–209. DOI : 10.1016/j.jadohealth.2023.04.002. Type : prise de position professionnelle.",
        "label": "Society for Adolescent Health and Medicine — Promoting Sexual Consent Principles in the Sexual and Reproductive Health Care of Adolescents and Young Adults, 2023. J Adolesc Health 73:205–209. DOI : 10.1016/j.jadohealth.2023.04.002. Type : prise de position professionnelle.",
        "url": "https://adolescenthealth.org/wp-content/uploads/2023/05/Promoting-Sexual-Consent-Principles-in-h-Care-of-Adolescents-and-Young-Adults.pdf"
      },
      {
        "org": "American Psychological Association",
        "title": "Health advisory on social media use in adolescence, 2023. Type : avis scientifique professionnel fondé sur la littérature, pas un essai clinique.",
        "label": "American Psychological Association — Health advisory on social media use in adolescence, 2023. Type : avis scientifique professionnel fondé sur la littérature, pas un essai clinique.",
        "url": "https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use?os=0"
      },
      {
        "org": "OnSEXprime",
        "title": "Mise en scène pornographique",
        "label": "OnSEXprime — Mise en scène pornographique",
        "url": "https://www.onsexprime.fr/les-criteres-qu-on-nous-impose/le-porno/le-porno-c-est-du-mytho"
      },
      {
        "org": "OnSEXprime",
        "title": "Normes imposées",
        "label": "OnSEXprime — Normes imposées",
        "url": "https://www.onsexprime.fr/les-criteres-qu-on-nous-impose"
      },
      {
        "org": "OnSEXprime",
        "title": "Consentement",
        "label": "OnSEXprime — Consentement",
        "url": "https://www.onsexprime.fr/la-sexualite/ok-ou-pas-ok/ok-pas-ok-le-consentement-c-est-obligatoire"
      },
      {
        "org": "OnSEXprime",
        "title": "Plaisir",
        "label": "OnSEXprime — Plaisir",
        "url": "https://www.onsexprime.fr/la-sexualite/c-est-quoi-le-plaisir"
      }
    ],
    "source": "Society for Adolescent Health and Medicine · American Psychological Association · OnSEXprime",
    "url": "https://adolescenthealth.org/wp-content/uploads/2023/05/Promoting-Sexual-Consent-Principles-in-h-Care-of-Adolescents-and-Young-Adults.pdf",
    "keywords": "Mon corps et mes envies doivent-ils ressembler à ce qu’on voit dans le porno ? adolescent adolescente ados puberte corps relations sexualite",
    "relatedIds": [
      "ado-consentement-changer-avis",
      "ado-sommeil-endormissement",
      "ado-ventre-gargouille"
    ],
    "verifiedAt": "16/10/2026",
    "nextAuditAt": "16/01/2027",
    "validationStatus": "VALIDATED",
    "editorialStatus": "PUBLISHED",
    "evidenceStatus": "Références de sociétés savantes et sources institutionnelles ; validation médicale explicite du 16/10/2026",
    "auditIntervalMonths": 3,
    "medicalValidation": {
      "validator": "Dr Romain BEDDOK",
      "validatedAt": "2026-10-16T15:21:48+02:00",
      "evidence": "Validation explicite et autorisation de publication dans Ados : « parfait validation et mise en ligne ds section ados ». Lot de 14 fiches révisé avec sociétés savantes.",
      "approvedDraftSha256": "6b7ca1786a5a281800dd29f77e63c5389f227d67c9c69ba569b3506077d32886",
      "contentHash": "1c905940a0452df262dbc791fcf80dd7a8d021d59971fa0b20a42ebc3aae8a72"
    }
  }
];
window.extraAuditedQuestions=window.extraAuditedQuestions||[];
for(const revision of revisions){
 const cards=[].concat(window.healthQuestions||[],window.extraAuditedQuestions||[]);
 const matches=cards.filter(card=>card.id===revision.id);
 if(matches.length) Object.assign(matches[matches.length-1],revision);
 else window.extraAuditedQuestions.push(revision);
}
})();
