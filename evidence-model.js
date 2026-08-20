window.santeJusteEvidenceModel = {
  version: '1.0',
  verifiedAt: '2026-08-20',
  commonRules: [
    'Définir précisément la question avant la recherche.',
    'Construire la réponse à partir des sources, jamais l’inverse.',
    'Privilégier les recommandations françaises et organismes publics.',
    'Croiser les sources lorsque la réponse est controversée, chiffrée ou dépend d’un contexte.',
    'Dater la vérification et signaler toute incertitude ou divergence.',
    'Aucune donnée chiffrée, posologie, seuil d’âge, délai ou contre-indication sans source identifiable.',
    'Rédiger en langage grand public sans transformer l’information en diagnostic personnalisé.'
  ],
  themes: {
    'Enfants & parents': {primary:['HAS','Santé publique France','Assurance Maladie'],secondary:['Société Française de Pédiatrie','sociétés pédiatriques spécialisées']},
    'Médicaments': {primary:['ANSM','HAS','Base de données publique des médicaments'],secondary:['RCP','CRAT pour grossesse/allaitement','sociétés savantes']},
    'Symptômes': {primary:['HAS','Assurance Maladie'],secondary:['société savante concernée','recommandations internationales si nécessaire']},
    'Prévention': {primary:['HAS','Santé publique France','Ministère de la Santé'],secondary:['INCa','calendrier vaccinal','sociétés savantes']},
    'Nutrition': {primary:['Anses','Santé publique France'],secondary:['PNNS','revues systématiques ou méta-analyses si nécessaire']},
    'Après 60 ans': {primary:['HAS','Santé publique France','Assurance Maladie'],secondary:['SFGG','ANSM','sociétés savantes']},
    'Santé des femmes': {primary:['HAS','CNGOF','ANSM','Assurance Maladie'],secondary:['CRAT','Santé publique France','INCa']},
    'Santé mentale': {primary:['HAS','Santé publique France','Assurance Maladie'],secondary:['sociétés savantes','revues systématiques si nécessaire']},
    'Vrai / Faux': {primary:['Source institutionnelle correspondant au thème'],secondary:['recommandation de société savante','revue systématique ou méta-analyse']}
  }
};

window.extraAuditedQuestions = [
  {
    id:'depistage-col-uterus',
    category:'Santé des femmes',
    title:'Dépistage du col de l’utérus : faut-il continuer même si on est vaccinée contre le HPV ?',
    keywords:'femme col utérus frottis HPV vaccin dépistage 25 65 cytologie test HPV',
    answer:'Oui. La vaccination contre les HPV réduit le risque mais ne protège pas contre toutes les infections à HPV. En France, le dépistage reste recommandé de 25 à 65 ans selon des modalités qui varient avec l’âge : cytologie entre 25 et 29 ans, puis test HPV-HR entre 30 et 65 ans.',
    watch:'Un saignement inhabituel, notamment après un rapport ou après la ménopause, ne relève pas du dépistage de routine et doit conduire à un avis médical.',
    source:'Assurance Maladie · HAS',
    url:'https://www.ameli.fr/assure/sante/themes/cancer-col-uterus/depistage-organise-cancer-col-uterus',
    verifiedAt:'20/08/2026',
    evidenceStatus:'Sources croisées'
  },
  {
    id:'deprime-ou-depression',
    category:'Santé mentale',
    title:'Baisse de moral ou dépression : comment faire la différence ?',
    keywords:'dépression déprime tristesse moral perte plaisir fatigue sommeil santé mentale',
    answer:'Une baisse de moral passagère n’est pas forcément une dépression. Un épisode dépressif se caractérise par plusieurs symptômes présents presque chaque jour pendant au moins deux semaines, avec une souffrance ou un retentissement sur la vie quotidienne. La tristesse durable ou la perte d’intérêt et de plaisir font partie des signes principaux.',
    watch:'Des idées suicidaires, un sentiment d’impasse ou une incapacité à assurer les activités essentielles nécessitent une évaluation rapide par un professionnel de santé.',
    source:'HAS · Assurance Maladie',
    url:'https://www.has-sante.fr/jcms/c_1739917/fr/episode-depressif-caracterise-de-l-adulte-prise-en-charge-en-premier-recours',
    verifiedAt:'20/08/2026',
    evidenceStatus:'Sources croisées'
  },
  {
    id:'vf-10000-pas',
    category:'Vrai / Faux',
    title:'« Il faut absolument faire 10 000 pas par jour » : vrai ou faux ?',
    keywords:'vrai faux 10000 10 000 pas marche 7000 activité physique',
    answer:'À NUANCER. 10 000 pas n’est pas un seuil biologique obligatoire. Une méta-analyse publiée en 2025 retrouve déjà des bénéfices importants autour de 7 000 pas par jour par rapport à des niveaux beaucoup plus faibles. Le bénéfice dépend surtout d’une augmentation progressive de l’activité.',
    watch:'En cas de symptômes à l’effort ou de maladie cardiovasculaire connue, la reprise d’activité peut nécessiter une adaptation avec un professionnel de santé.',
    source:'The Lancet Public Health · méta-analyse 2025',
    url:'https://doi.org/10.1016/S2468-2667(25)00164-1',
    verifiedAt:'20/08/2026',
    evidenceStatus:'Méta-analyse'
  }
];