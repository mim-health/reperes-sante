window.santeJusteEvidenceModel = {
  version: '1.2',
  verifiedAt: '2026-08-20',
  auditPolicy: {
    frequency: 'quarterly',
    intervalMonths: 3,
    nextGlobalReviewBy: '2026-11-20',
    scope: 'Toutes les fiches publiées et leurs sources',
    checks: [
      'Vérifier si une recommandation française plus récente a été publiée.',
      'Vérifier si la société savante française pertinente a actualisé son référentiel.',
      'Contrôler que chaque lien source fonctionne et pointe toujours vers le document cité.',
      'Réexaminer tous les chiffres, seuils, posologies, délais, contre-indications et critères de recours aux soins.',
      'Mettre à jour la date de vérification de la fiche après revue.',
      'Retirer ou corriger immédiatement une fiche si une recommandation importante change avant l’audit trimestriel.'
    ]
  },
  commonRules: [
    'Définir précisément la question avant la recherche.',
    'Construire la réponse à partir des sources, jamais l’inverse.',
    'Rechercher d’abord les autorités sanitaires françaises pertinentes, puis systématiquement la société savante française du domaine lorsqu’elle dispose d’une recommandation, d’un référentiel ou d’une mise au point applicable.',
    'Croiser en priorité une source institutionnelle française et une source de société savante pertinente lorsque les deux existent.',
    'Ne jamais ajouter une société savante uniquement pour enrichir la liste : seules les sources réellement consultées et contributives sont affichées.',
    'Compléter par une revue systématique, une méta-analyse ou une recommandation internationale récente lorsque les références françaises sont absentes, incomplètes, anciennes ou discordantes.',
    'Dater la vérification et signaler toute incertitude ou divergence.',
    'Réauditer chaque fiche au minimum une fois par trimestre, et immédiatement si une nouvelle recommandation importante est publiée entre deux audits.',
    'Aucune donnée chiffrée, posologie, seuil d’âge, délai ou contre-indication sans source identifiable.',
    'Rédiger en langage grand public sans transformer l’information en diagnostic personnalisé.'
  ],
  sourceHierarchy: [
    '1. Autorités sanitaires et organismes publics français pertinents : HAS, ANSM, Santé publique France, Assurance Maladie, Ministère de la Santé, Anses, INCa, Base de données publique des médicaments.',
    '2. Société savante française correspondant précisément au thème et, si nécessaire, société spécialisée.',
    '3. Littérature scientifique de haut niveau : recommandations fondées sur les preuves, revues systématiques et méta-analyses récentes.',
    '4. Références internationales reconnues lorsqu’elles apportent une information absente ou insuffisante dans les sources françaises.'
  ],
  themes: {
    'Enfants & parents': {primary:['HAS','Santé publique France','Assurance Maladie','Société Française de Pédiatrie'],secondary:['sociétés pédiatriques spécialisées selon le sujet','littérature scientifique de haut niveau']},
    'Médicaments': {primary:['ANSM','HAS','Base de données publique des médicaments','société savante française du domaine clinique concerné'],secondary:['RCP','CRAT pour grossesse/allaitement','littérature scientifique de haut niveau']},
    'Symptômes': {primary:['HAS','Assurance Maladie','société savante française du domaine concerné'],secondary:['recommandations internationales et littérature scientifique si nécessaire']},
    'Prévention': {primary:['HAS','Santé publique France','Ministère de la Santé','société savante française concernée'],secondary:['INCa','calendrier vaccinal','littérature scientifique de haut niveau']},
    'Nutrition': {primary:['Anses','Santé publique France','société savante française pertinente selon le sujet'],secondary:['PNNS','revues systématiques ou méta-analyses']},
    'Après 60 ans': {primary:['HAS','Santé publique France','Assurance Maladie','Société Française de Gériatrie et Gérontologie'],secondary:['ANSM','société savante de spécialité selon le sujet','littérature scientifique']},
    'Santé des femmes': {primary:['HAS','CNGOF','ANSM','Assurance Maladie'],secondary:['CRAT','Santé publique France','INCa','autre société savante française pertinente']},
    'Santé mentale': {primary:['HAS','Santé publique France','Assurance Maladie','société savante française pertinente'],secondary:['revues systématiques et recommandations internationales si nécessaire']},
    'Vrai / Faux': {primary:['autorité sanitaire française correspondant au thème','société savante française correspondante'],secondary:['revue systématique ou méta-analyse récente','recommandation internationale si nécessaire']}
  },
  specialtyExamples: {
    pediatrie:['Société Française de Pédiatrie','sociétés pédiatriques spécialisées'],
    cardiologie:['Société Française de Cardiologie'],
    vasculaire:['Société Française de Médecine Vasculaire','Société Française de Phlébologie'],
    gastroenterologie:['Société Nationale Française de Gastro-Entérologie'],
    dermatologie:['Société Française de Dermatologie'],
    gynecologie:['Collège National des Gynécologues et Obstétriciens Français'],
    geriatrie:['Société Française de Gériatrie et Gérontologie'],
    diabetologie:['Société Francophone du Diabète']
  }
};

window.extraAuditedQuestions = [
  {
    id:'depistage-col-uterus', category:'Santé des femmes', title:'Dépistage du col de l’utérus : faut-il continuer même si on est vaccinée contre le HPV ?', keywords:'femme col utérus frottis HPV vaccin dépistage 25 65 cytologie test HPV',
    answer:'Oui. La vaccination contre les HPV réduit le risque mais ne protège pas contre toutes les infections à HPV. En France, le dépistage reste recommandé de 25 à 65 ans selon des modalités qui varient avec l’âge : cytologie entre 25 et 29 ans, puis test HPV-HR entre 30 et 65 ans.',
    watch:'Un saignement inhabituel, notamment après un rapport ou après la ménopause, ne relève pas du dépistage de routine et doit conduire à un avis médical.', source:'Assurance Maladie · HAS', url:'https://www.ameli.fr/assure/sante/themes/cancer-col-uterus/depistage-organise-cancer-col-uterus', verifiedAt:'20/08/2026', evidenceStatus:'Sources croisées'
  },
  {
    id:'deprime-ou-depression', category:'Santé mentale', title:'Baisse de moral ou dépression : comment faire la différence ?', keywords:'dépression déprime tristesse moral perte plaisir fatigue sommeil santé mentale',
    answer:'Une baisse de moral passagère n’est pas forcément une dépression. Un épisode dépressif se caractérise par plusieurs symptômes présents presque chaque jour pendant au moins deux semaines, avec une souffrance ou un retentissement sur la vie quotidienne. La tristesse durable ou la perte d’intérêt et de plaisir font partie des signes principaux.',
    watch:'Des idées suicidaires, un sentiment d’impasse ou une incapacité à assurer les activités essentielles nécessitent une évaluation rapide par un professionnel de santé.', source:'HAS · Assurance Maladie', url:'https://www.has-sante.fr/jcms/c_1739917/fr/episode-depressif-caracterise-de-l-adulte-prise-en-charge-en-premier-recours', verifiedAt:'20/08/2026', evidenceStatus:'Sources croisées'
  },
  {
    id:'vf-10000-pas', category:'Vrai / Faux', title:'« Il faut absolument faire 10 000 pas par jour » : vrai ou faux ?', keywords:'vrai faux 10000 10 000 pas marche 7000 activité physique',
    answer:'À NUANCER. 10 000 pas n’est pas un seuil biologique obligatoire. Une méta-analyse publiée en 2025 retrouve déjà des bénéfices importants autour de 7 000 pas par jour par rapport à des niveaux beaucoup plus faibles. Le bénéfice dépend surtout d’une augmentation progressive de l’activité.',
    watch:'En cas de symptômes à l’effort ou de maladie cardiovasculaire connue, la reprise d’activité peut nécessiter une adaptation avec un professionnel de santé.', source:'The Lancet Public Health · méta-analyse 2025', url:'https://doi.org/10.1016/S2468-2667(25)00164-1', verifiedAt:'20/08/2026', evidenceStatus:'Méta-analyse'
  }
];