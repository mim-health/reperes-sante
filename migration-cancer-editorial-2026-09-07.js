/* MACA Santé — migration éditoriale Cancer validée médicalement le 07/09/2026.
 * Mise à jour stricte des fiches existantes : aucun ajout, aucun changement d'ID, catégorie ou métadonnée d'audit.
 */
(function(){
  'use strict';
  const updates={
    'cancer-biopsie-liquide-ctdna':{
      answer:"Dans la plupart des situations, une simple prise de sang ne permet pas de savoir à elle seule si une personne a un cancer.\n\nIl existe cependant des analyses particulières, appelées « biopsies liquides », capables de rechercher dans le sang des éléments provenant de la tumeur, notamment de l’ADN tumoral circulant. Elles sont déjà utiles dans certaines situations chez des patients ayant un cancer connu.",
      detail:"Une tumeur peut libérer de très petites quantités d’ADN dans le sang. Leur analyse peut parfois rechercher certaines anomalies moléculaires et aider à choisir un traitement ciblé.\n\nCela ne fonctionne cependant pas pour tous les cancers ni dans toutes les situations. Une biopsie classique de la tumeur reste souvent nécessaire.\n\nCes techniques sont également étudiées pour détecter très précocement une récidive ou une maladie résiduelle après traitement.",
      watchTitle:"À ne pas confondre",
      watch:"Une biopsie liquide n’est pas aujourd’hui un « test sanguin universel du cancer ». Un résultat négatif ne permet donc pas, à lui seul, d’exclure un cancer.",
      source:"HAS — ADN tumoral circulant et cancer du poumon. GFCO — recommandations françaises 2026. ASCO — recommandations 2026. ESMO — recommandations sur l’ADN tumoral circulant."
    },
    'cancer-adc-anticorps-conjugues':{
      answer:"On peut les comprendre comme une manière de transporter un médicament anticancéreux plus directement vers certaines cellules tumorales.\n\nUn ADC associe un anticorps qui reconnaît une cible présente sur la cellule cancéreuse et une substance capable de la détruire.",
      detail:"L’anticorps joue en quelque sorte le rôle de véhicule : il reconnaît une cible particulière et transporte avec lui une molécule cytotoxique.\n\nLes ADC sont aujourd’hui utilisés dans plusieurs cancers, notamment certains cancers du sein, du poumon, gynécologiques, digestifs ou de la vessie.\n\nIls illustrent l’évolution vers des traitements de plus en plus adaptés aux caractéristiques biologiques des tumeurs.",
      watchTitle:"À savoir",
      watch:"« Ciblé » ne veut pas dire sans effets indésirables. Les ADC peuvent également atteindre des tissus sains et chaque médicament possède ses propres toxicités.\n\nLa présence d’une cible sur la tumeur ne garantit pas non plus que le traitement sera efficace.",
      source:"ESMO Open — données et recommandations 2026. Cancer — synthèse ADC 2026. Cancer Cell — ADC et oncologie de précision 2026."
    },
    'cancer-oncogenetique-famille':{
      answer:"Pas forcément. La plupart des cancers ne sont pas dus à une prédisposition génétique héréditaire.\n\nMais certains antécédents familiaux peuvent justifier une consultation d’oncogénétique : plusieurs proches atteints, cancers survenus jeunes ou association de certains types de cancers dans une même famille.",
      detail:"Lors d’une consultation d’oncogénétique, on reconstitue notamment l’histoire des cancers dans la famille : qui a été malade, de quel cancer et à quel âge.\n\nCela permet d’évaluer s’il existe suffisamment d’arguments pour proposer un test génétique.\n\nLorsqu’une prédisposition héréditaire est identifiée, cela peut modifier la surveillance de la personne concernée et parfois celle de certains membres de sa famille.",
      watchTitle:"Un point important",
      watch:"Une anomalie génétique trouvée uniquement dans une tumeur n’est pas nécessairement héréditaire. Un test réalisé sur la tumeur et un test génétique recherchant une prédisposition familiale ne répondent donc pas exactement à la même question.",
      source:"INCa — oncogénétique. ESMO — recommandations 2025. ASCO — recommandations 2024."
    },
    'cancer-remission-guerison':{
      answer:"Pas exactement.\n\nUne rémission complète signifie que les examens disponibles ne retrouvent plus de signe détectable du cancer. C’est une excellente nouvelle, mais cela ne permet pas toujours de parler immédiatement de guérison.",
      detail:"Après les traitements, une surveillance est maintenue car des cellules cancéreuses peuvent parfois persister sans être détectables par les examens disponibles.\n\nAvec le temps, si le cancer ne réapparaît pas, le risque de récidive diminue généralement et il peut devenir possible de parler de guérison.\n\nCe délai dépend beaucoup du type de cancer, de son stade et de ses caractéristiques.",
      watchTitle:"À savoir",
      watch:"La fameuse règle des « cinq ans » n’est pas une frontière valable pour tous les cancers.\n\nLe suivi recommandé reste donc important même lorsqu’une rémission complète a été obtenue.",
      source:"Institut national du cancer — Cancer Info. Gustave Roussy."
    },
    'cancer-metastases-definition':{
      answer:"Une métastase est un nouveau foyer de cellules cancéreuses qui s’est développé à distance du cancer d’origine.\n\nPar exemple, si un cancer du sein se propage dans un os, il s’agit d’une métastase du cancer du sein dans l’os et non d’un nouveau « cancer de l’os ».",
      detail:"Certaines cellules cancéreuses peuvent quitter la tumeur d’origine, circuler par le sang ou la lymphe puis s’implanter dans un autre organe.\n\nTous les cancers n’ont pas le même risque de produire des métastases et les organes concernés varient selon le cancer d’origine.\n\nLa présence de métastases modifie généralement le stade de la maladie et la stratégie thérapeutique. Mais les possibilités de traitement sont très différentes selon le cancer, sa biologie, le nombre et la localisation des métastases.",
      watchTitle:"À savoir",
      watch:"Le mot « métastatique » décrit donc une extension du cancer. Il ne permet pas, à lui seul, de prévoir précisément l’évolution d’une personne.",
      source:"Institut national du cancer — Cancer Info. ESMO — information destinée aux patients."
    },
    'cancer-nouveaux-traitements-2026':{
      answer:"Il n’existe pas un nouveau traitement unique qui remplacerait les autres.\n\nLa chirurgie, la radiothérapie et la chimiothérapie restent essentielles, mais l’oncologie dispose aujourd’hui de traitements supplémentaires : thérapies ciblées, immunothérapies, anticorps conjugués, anticorps bispécifiques et certaines thérapies cellulaires, selon les cancers.",
      detail:"Deux cancers situés dans le même organe peuvent être biologiquement différents.\n\nL’analyse de la tumeur permet parfois d’identifier une caractéristique — appelée biomarqueur — qui aide à choisir un traitement particulier.\n\nC’est l’un des principes de la médecine de précision : ne plus déterminer le traitement uniquement à partir de l’organe atteint et du stade, mais aussi, lorsque cela est utile, des caractéristiques biologiques de la tumeur.\n\nLes nouveaux traitements peuvent être utilisés seuls, associés aux traitements classiques ou à différents moments de la maladie.",
      watchTitle:"À savoir",
      watch:"Un traitement innovant n’est pas nécessairement meilleur pour chaque patient. Son intérêt dépend du cancer, de son stade, de ses caractéristiques et des résultats des études cliniques.",
      source:"Institut national du cancer — médecine de précision, thérapies ciblées et immunothérapie. ESMO. EMA."
    },
    'cancer-immunotherapie-comment-ca-marche':{
      answer:"Certaines immunothérapies permettent au système immunitaire de mieux reconnaître ou combattre les cellules cancéreuses.\n\nElles ont profondément modifié le traitement de plusieurs cancers, mais elles ne fonctionnent pas chez tous les patients.",
      detail:"Notre système immunitaire possède naturellement des mécanismes qui l’empêchent de s’activer excessivement.\n\nCertaines cellules cancéreuses utilisent ces « freins » pour échapper aux défenses immunitaires. Des médicaments appelés inhibiteurs de points de contrôle peuvent bloquer certains de ces mécanismes et permettre aux cellules immunitaires d’attaquer plus efficacement la tumeur.\n\nIl existe également d’autres formes d’immunothérapie.",
      watchTitle:"Quels effets indésirables ?",
      watch:"En stimulant l’immunité, certains traitements peuvent provoquer une réaction contre des organes sains.\n\nPeau, intestin, foie, poumons ou thyroïde peuvent notamment être concernés. Un symptôme nouveau pendant une immunothérapie doit donc être signalé à l’équipe qui suit le traitement.",
      source:"Institut national du cancer — immunothérapie. ESMO — recommandations et information patient. EMA."
    },
    'cancer-therapies-ciblees-biomarqueurs':{
      answer:"Une thérapie ciblée agit sur une caractéristique particulière de certaines cellules cancéreuses ou sur un mécanisme dont elles ont besoin pour se développer.\n\nIl faut donc parfois analyser la tumeur pour vérifier si la cible recherchée est présente.",
      detail:"Des anomalies ou caractéristiques comme HER2, EGFR, ALK ou BRAF peuvent, dans certains cancers, permettre d’utiliser un traitement particulier.\n\nC’est pourquoi deux personnes ayant un cancer du même organe ne reçoivent pas nécessairement le même traitement.\n\nAu cours du temps, les cellules cancéreuses peuvent également évoluer et devenir résistantes à un traitement.",
      watchTitle:"À savoir",
      watch:"« Thérapie ciblée » ne signifie ni traitement sans toxicité, ni traitement efficace à coup sûr.\n\nLa pertinence d’une cible dépend toujours du cancer et de la situation précise.",
      source:"Institut national du cancer — thérapies ciblées et médecine de précision. ESMO. EMA."
    },
    'cancer-intelligence-artificielle-usages-reels':{
      answer:"L’intelligence artificielle peut aider les professionnels dans certaines tâches : analyser des images, étudier des prélèvements, préparer une radiothérapie ou exploiter de grandes quantités de données.\n\nElle ne remplace pas le médecin et toutes les applications annoncées ne sont pas encore utilisées en pratique courante.",
      detail:"En imagerie ou en anatomopathologie, certains outils peuvent aider à repérer ou caractériser des anomalies.\n\nEn radiothérapie, l’IA peut notamment aider à délimiter certaines zones sur les images ou accélérer certaines étapes de préparation du traitement.\n\nD’autres modèles sont étudiés pour exploiter des données biologiques ou tenter de mieux prévoir l’évolution ou la réponse aux traitements.\n\nMais obtenir de bons résultats lors d’une étude informatique ne suffit pas : il faut vérifier que l’outil fonctionne réellement et de façon sûre chez les patients auxquels il sera destiné.",
      watchTitle:"Pourquoi rester prudent ?",
      watch:"Les performances peuvent varier selon les populations et les données utilisées. Biais, protection des données, reproductibilité et contrôle humain restent essentiels.",
      source:"Institut national du cancer — recherche et médecine de précision. ESMO — travaux sur l’IA et les données en oncologie. Littérature scientifique 2024-2026 déjà validée dans MACA."
    },
    'cancer-radiotherapie-moderne-precision-reirradiation':{
      answer:"La radiothérapie cherche à délivrer une dose suffisante à la tumeur tout en protégeant autant que possible les tissus sains autour.\n\nLes progrès de l’imagerie et des appareils permettent aujourd’hui d’adapter beaucoup plus précisément la forme et la délivrance des rayonnements.",
      detail:"Avant le traitement, les médecins déterminent précisément la zone à traiter et les organes voisins à protéger.\n\nDes techniques comme la modulation d’intensité ou la radiothérapie stéréotaxique permettent de mieux conformer la dose à la cible.\n\nDans certaines situations, le traitement peut aussi être adapté en fonction de changements observés au cours des séances.\n\nCes progrès permettent également, chez certains patients soigneusement sélectionnés, d’envisager une nouvelle irradiation d’une zone déjà traitée.",
      watchTitle:"À savoir",
      watch:"Plus précis ne signifie pas sans risque.\n\nLa dose déjà reçue, le volume à traiter et la proximité d’organes sensibles restent déterminants, notamment lorsqu’une réirradiation est envisagée.",
      source:"Institut national du cancer — principes de la radiothérapie. ESTRO/EORTC — consensus sur la réirradiation. Beddok A. et al. — CA Cancer Journal for Clinicians, 2025. Beddok A. et al. — Cancer Radiothérapie, 2024."
    }
  };

  const pools=[window.healthQuestions,window.extraAuditedQuestions].filter(Array.isArray);
  const found=new Set();
  pools.forEach(pool=>pool.forEach(card=>{
    const patch=card&&updates[card.id];
    if(!patch)return;
    Object.assign(card,patch);
    found.add(card.id);
  }));
  const missing=Object.keys(updates).filter(id=>!found.has(id));
  if(missing.length) console.error('[MACA Cancer migration] fiches existantes introuvables :',missing);
})();
