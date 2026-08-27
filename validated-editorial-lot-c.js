/* MACA Santé — lot C de validation éditoriale, 22/08/2026.
   Validation documentaire ciblée de contenus déjà audités. */
(function(){
  const validated={
    'pas-jour':{
      validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,
      source:'The Lancet Public Health · méta-analyse 2025',
      url:'https://doi.org/10.1016/S2468-2667(25)00164-1',
      evidenceStatus:'Méta-analyse récente · message éditorial nuancé : 7 000 pas n’est pas une prescription universelle'
    },
    'antibiotiques':{
      validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,
      source:'Assurance Maladie · Santé publique France · SPILF',
      url:'https://www.santepubliquefrance.fr/les-antibiotiques-des-medicaments-essentiels-a-preserver',
      evidenceStatus:'Sources concordantes · antibiotiques inefficaces sur les infections virales banales'
    },
    'boissons-sucrees':{
      validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,
      source:'Anses · Haut Conseil de la santé publique · ressources pédiatriques françaises',
      url:'https://www.anses.fr/fr/content/nutrition-des-enfants-des-personnes-agees-et-des-femmes-enceintes-ou-allaitantes-lanses',
      evidenceStatus:'Sources nationales concordantes · eau comme boisson de référence'
    }
  };
  function apply(items){return Array.isArray(items)?items.map(item=>validated[item.id]?{...item,...validated[item.id]}:item):items;}
  window.auditedQuestionOverrides=apply(window.auditedQuestionOverrides);
  window.extraAuditedQuestions=apply(window.extraAuditedQuestions);
})();
