/* MACA Santé — Référentiel exécutable V2 P0 — validé médicalement, actualisé 01/09/2026. */
(function(root){
  'use strict';
  const intents = [
    {key:'abdominal-pain',primaryId:'douleur-abdominale',aliases:['mal au ventre','douleur au ventre','douleur abdominale','ventre douloureux','mon ventre me fait mal','mal d estomac'],associationAliases:['brulures d estomac','remontees acides'],allowMultiWith:['reflux']},
    {key:'reflux',primaryId:'reflux-adulte',aliases:['reflux','reflux gastrique','rgo','reflux gastro oesophagien','remontees acides','brulures d estomac','acide qui remonte','pyrosis'],excludePopulations:['baby','child'],allowMultiWith:['abdominal-pain']},
    {key:'cramps',primaryId:'crampes-musculaires-causes',aliases:['crampes','crampe','crampes nocturnes','crampes la nuit','crampe au mollet','muscle qui se contracte'],hardVeto:['jambe gonflee','mollet gonfle','jambe rouge','douleur unilaterale avec gonflement','palpitations']},
    {key:'alopecia',primaryId:'alopecie-causes-pelade-traitement',aliases:['perte de cheveux','chute de cheveux','cheveux qui tombent','je perds mes cheveux','je perds beaucoup de cheveux','alopecie','pelade','plaque sans cheveux'],hardVetoUnlessPositive:['cholesterol','poux','lentes']},
    {key:'child-nosebleed',primaryId:'saignement-nez-enfant',aliases:['mon enfant saigne du nez','nez qui saigne chez mon enfant','epistaxis enfant','saignement de nez enfant','nez qui saigne enfant'],requirePopulation:['child','baby']},
    {key:'adult-nosebleed',primaryId:'saignement-nez-adulte',aliases:['saignement de nez','nez qui saigne','epistaxis','je saigne du nez'],excludePopulations:['child','baby']},
    {key:'eczema',primaryId:'eczema-que-faire',aliases:['eczema','dermatite atopique','plaques rouges qui demangent','peau seche qui gratte','plaques qui grattent'],hardVetoUnlessPositive:['jambes lourdes','varices']},
    {key:'generalized-pruritus',primaryId:'prurit-generalise-causes',aliases:['je me gratte partout','demangeaisons partout','prurit generalise','peau qui gratte sans boutons','je me gratte partout sans boutons'],excludePopulations:['baby','child']},
    {key:'child-red-eye',primaryId:'oeil-rouge-enfant',aliases:['mon enfant a l oeil rouge','mon enfant a les yeux rouges','yeux rouges chez mon enfant','oeil rouge enfant','oeil qui coule enfant','paupières collees','paupiere collee','conjonctivite enfant'],requirePopulation:['child','baby']},
    {key:'adult-red-eye',primaryId:'oeil-rouge-adulte',aliases:['oeil rouge','yeux rouges','j ai l oeil rouge','j ai les yeux rouges','conjonctivite adulte','oeil rouge douloureux','oeil rouge et douleur'],excludePopulations:['baby','child']},
    {key:'dry-eye',primaryId:'yeux-secs-larmes-artificielles',aliases:['yeux secs','oeil sec','secheresse oculaire','j ai les yeux secs','j ai l oeil sec','sable dans les yeux'],excludePopulations:['baby','child']},
    {key:'knee-pain',primaryId:'douleur-genou-escaliers',aliases:['mal au genou','douleur du genou','douleur au genou','douleur dans les escaliers','douleur genou escaliers','douleur autour de la rotule','douleur derriere la rotule','mal derriere la rotule'],hardVeto:['traumatisme important','traumatisme recent important','genou rouge et tres gonfle']},
    {key:'achilles-tendinopathy',primaryId:'tendon-achille-repos-sport',aliases:['tendon d achille','tendon achille','douleur tendon achille','tendinite achille','tendinopathie achille','douleur derriere talon'],excludePopulations:['baby','child']},
    {key:'gout',primaryId:'goutte-alimentation',aliases:['goutte','crise de goutte','acide urique goutte','goutte gros orteil','alimentation goutte','alcool goutte','biere goutte']},
    {key:'shingles',primaryId:'zona-vesicules-douloureuses',aliases:['zona','plaque douloureuse avec vesicules','vesicules douloureuses','boutons douloureux d un cote','zona oeil'],excludePopulations:['baby','child']},
    {key:'tinnitus',primaryId:'acouphenes-adulte',aliases:['acouphenes','acouphene','bourdonnements','bourdonnement','oreilles qui sifflent','oreille qui siffle','sifflement dans l oreille','sifflement dans les oreilles','bruit dans l oreille'],allowMultiWith:['vertigo']},
    {key:'vertigo',primaryId:'vertiges-causes',secondaryId:'vertiges-adulte',secondaryTriggers:['quand consulter','dois je consulter','signes d alerte','dangereux','urgence','inquietant'],aliases:['vertige','vertiges','tete qui tourne','tout tourne','sensation de tourner','perte d equilibre avec sensation de tourner'],allowMultiWith:['tinnitus']},
    {key:'low-back-pain',primaryId:'lombalgie-adulte',aliases:['mal en bas du dos','lombalgie','lumbago','tour de rein','dos bloque','mal au dos'],hardVeto:['douleur cervicale','mal aux cervicales','douleur d epaule','mal a l epaule','douleur thoracique','douleur dorsale haute']},
    {key:'insomnia',primaryId:'insomnie-adulte',aliases:['je dors mal','difficulte a m endormir','difficulte d endormissement','je n arrive pas a dormir','je n arrive pas a m endormir','reveils nocturnes','je me reveille la nuit','insomnie'],excludePopulations:['baby','child','adolescent'],hardVeto:['ronflement','ronfle','ronfler','apnee du sommeil','apnee']},
    {key:'unprotected-sex',primaryId:'rapport-non-protege-ist',aliases:['rapport non protege','rapport sans preservatif','preservatif craque','risque d ist apres un rapport','risque ist apres un rapport'],allowMultiWith:['emergency-contraception']},
    {key:'emergency-contraception',primaryId:'contraception-urgence',aliases:['contraception d urgence','pilule du lendemain','pilule du surlendemain','jusqu a quand contraception urgence','levonorgestrel','ulipristal'],preferOver:['unprotected-sex']},
    {key:'dry-cough',primaryId:'toux-seche-que-faire',aliases:['toux seche','toux sans crachat','toux irritative','j ai une toux seche'],excludePopulations:['baby','child']},
    {key:'prolonged-cough',primaryId:'toux-prolongee-adulte',aliases:['toux qui dure','je tousse depuis longtemps','toux persistante','toux chronique','toux prolongee'],excludePopulations:['baby','child'],requiredAny:['dure','depuis longtemps','persistante','chronique','prolongee']},
    {key:'adult-sore-throat',primaryId:'mal-gorge-adulte-antibiotiques',aliases:['mal a la gorge','mal de gorge adulte','angine adulte','gorge rouge adulte','antibiotiques angine','trod angine'],excludePopulations:['baby','child']},
    {key:'breathlessness',primaryId:'essoufflement-adulte',aliases:['essoufflement','essouffle','souffle court','manque d air','vite essouffle','dyspnee'],excludePopulations:['baby','child']},
    {key:'palpitations',primaryId:'palpitations-adulte',secondaryId:'palpitations-quand-consulter',secondaryTriggers:['quand consulter','dois je consulter','dangereux','urgence','inquietant','grave'],aliases:['palpitations','palpitation','coeur qui s emballe','coeur qui bat fort','battements irreguliers','coeur qui saute','extrasystoles','extrasystole'],excludePopulations:['baby','child']},
    {key:'cystitis',primaryId:'maca-cystite-reperes',aliases:['cystite','infection urinaire','brulures en urinant','brulure en urinant','envie frequente d uriner','envie de faire pipi souvent','envie de faire pipi tout le temps'],hardVetoUnlessPositive:['pertes vaginales']},
    {key:'thyroid-nodule',primaryId:'nodule-thyroide-inquietant',aliases:['nodule thyroide','nodule thyroidien','boule thyroide','tirads','eu tirads','cytoponction thyroide']},
    {key:'headache-general',primaryId:'maux-tete',aliases:['mal de tete','maux de tete','cephalee','cephalees'],allowMultiWith:['migraine']},
    {key:'migraine',primaryId:'migraine-que-faire',secondaryId:'migraine-adulte',secondaryTriggers:['traitement de fond','crises frequentes','migraine frequente','migraines frequentes','trop de crises'],aliases:['migraine','migraines','crise de migraine','migraine avec aura','aura migraineuse'],associationAliases:['mal de tete','maux de tete','cephalee','cephalees'],allowMultiWith:['headache-general']},
    {key:'changing-mole',primaryId:'grain-beaute-change-melanome',aliases:['grain de beaute qui change','grain de beaute bicolore','naevus qui change','nevus qui change','grain de beaute qui grossit','grain de beaute qui evolue'],hardVetoUnlessPositive:['taches brunes diffuses','lentigos','lentigo','bouton isole']},
    {key:'heavy-legs',primaryId:'jambes-lourdes-varices',aliases:['jambes lourdes','varices','veines apparentes','jambes qui gonflent le soir'],hardVeto:['une jambe brutalement gonflee','une jambe gonflee','mollet rouge','mollet douloureux','phlebite','thrombose veineuse']},
    {key:'swollen-leg',primaryId:'jambe-gonflee-adulte',aliases:['une jambe gonflee','mollet gonfle','jambe rouge et douloureuse','phlebite','thrombose veineuse','thrombose veineuse profonde','tvp'],excludePopulations:['baby','child']},
    {key:'child-cough',primaryId:'toux-enfant',aliases:['mon enfant tousse','bebe tousse','toux chez l enfant','toux enfant'],requirePopulation:['child','baby']},
    {key:'child-fever',primaryId:'fievre-enfant',aliases:['mon enfant a de la fievre','bebe a de la fievre','temperature chez l enfant','fievre enfant'],requirePopulation:['child','baby']},
    {key:'adult-fever',primaryId:'fievre-adulte-quand-sinquieter',aliases:['fievre adulte','j ai de la fievre','forte fievre adulte','temperature adulte','fievre plusieurs jours adulte'],excludePopulations:['baby','child','adolescent']},
    {key:'school-fatigue',primaryId:'fatigue-enfant-rentree',aliases:['mon enfant est fatigue depuis la rentree','fatigue enfant rentree','mon ado est epuise depuis la reprise des cours','fatigue depuis la rentree','epuise apres l ecole'],requirePopulation:['child','adolescent'],requiredAny:['rentree','ecole','cours','reprise']},
    {key:'tick-immediate',primaryId:'maca-tique-conduite',aliases:['morsure de tique que faire','tique que faire','retirer une tique','retirer la tique','tire tique'],preferIf:['que faire','retirer','tout de suite']},
    {key:'tick-watch',primaryId:'tique',aliases:['piqure de tique','morsure de tique','surveiller apres morsure de tique','erytheme migrant','maladie de lyme apres tique'],preferIf:['surveiller','apres','erytheme','lyme']},
    {key:'lice',primaryId:'poux-enfant-traitement',aliases:['poux enfant','mon enfant a des poux','lentes enfant','traitement poux','quel traitement poux'],requirePopulation:['child','baby']},
    {key:'weaning',primaryId:'diversification-alimentaire',aliases:['diversification alimentaire','diversification bebe','quand commencer la diversification','par quoi commencer diversification'],requirePopulation:['baby','child']},
    {key:'menopause-general',primaryId:'menopause',aliases:['menopause','symptomes menopause','traitement menopause']},
    {key:'menopause-hot-flashes',primaryId:'maca-menopause-bouffees',aliases:['bouffees de chaleur menopause','bouffees de chaleur a la menopause','bouffees de chaleur'],preferOver:['menopause-general']},
    {key:'perimenopause',primaryId:'perimenopause-signes-quand-consulter',aliases:['premenopause','perimenopause','regles irregulieres perimenopause','suis je en premenopause'],preferOver:['menopause-general']},
    {key:'cancer-liquid-biopsy',primaryId:'cancer-biopsie-liquide-ctdna',aliases:['biopsie liquide','ctdna','adn tumoral circulant','prise de sang detecter cancer','prise de sang surveiller cancer','maladie residuelle cancer']},
    {key:'cancer-adc',primaryId:'cancer-adc-anticorps-conjugues',aliases:['adc cancer','anticorps conjugues','anticorps conjugue cancer','antibody drug conjugate','chimiotherapie ciblee adc']},
    {key:'cancer-genetics',primaryId:'cancer-oncogenetique-famille',aliases:['cancer hereditaire','oncogenetique','test genetique cancer','plusieurs cancers dans ma famille','cancer dans ma famille test genetique','brca famille','lynch famille']},
    {key:'cancer-remission',primaryId:'cancer-remission-guerison',aliases:['remission cancer','remission complete cancer','cancer en remission','cancer gueri remission','remission complete cancer gueri']},
    {key:'cancer-metastasis',primaryId:'cancer-metastases-definition',aliases:['metastase','metastases','cancer metastatique','cancer avec metastases','stade 4 cancer','cancer propage']}
  ];

  const abstainRules = [
    {key:'adult-eye-irritation-ambiguous',phrases:['les yeux me piquent','yeux qui piquent','oeil qui pique','picotement des yeux'],unlessPopulation:['child','baby']},
    {key:'hemoptysis',phrases:['je tousse du sang','tousse du sang','hemoptysie']},
    {key:'tongue-tingling',phrases:['la langue me pique','langue qui pique','picotement de la langue','picotements de la langue']},
    {key:'isolated-neck-itch',phrases:['demangeaisons de la nuque','nuque qui gratte']}
  ];

  root.MACA_V2_REFERENTIAL_P0 = {
    version:'2026-09-01-p0-lot5',
    validationStatus:'VALIDATED_MEDICAL_P0',
    source:'docs/MACA_V2_P0_VALIDATION_2026-08-31.md',
    excludedIds:['rgo-adulte','cystite-femme','essoufflement-causes-signes-alerte','palpitations','poux-enfant','diversification-alimentaire-bebe'],
    intents,
    abstainRules
  };
})(typeof window!=='undefined'?window:globalThis);
