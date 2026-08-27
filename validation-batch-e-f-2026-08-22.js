/* MACA Santé — validation ciblée lots E/F, 22/08/2026. */
(function(){
 const ids=['vaccins-adulte','depistages-organises-adulte','insomnie-adulte','menopause','oubli-pilule','constipation-adulte','vertiges-adulte','acouphenes-adulte','jambes-sans-repos','anxiete-adulte'];
 const notes={
  'vaccins-adulte':'Calendrier vaccinal français 2026 contrôlé · recommandations dépendantes de l’âge et du contexte',
  'depistages-organises-adulte':'Programmes nationaux de dépistage organisé contrôlés · sein, colorectal et col de l’utérus',
  'insomnie-adulte':'Sources françaises concordantes · mesures comportementales et TCC-I pour l’insomnie chronique',
  'menopause':'Références gynécologiques françaises · THM individualisé après balance bénéfices-risques et contre-indications',
  'oubli-pilule':'Conduite dépendante du contraceptif · notice spécifique prioritaire et contraception d’urgence selon situation',
  'constipation-adulte':'Assurance Maladie · références gastro-entérologiques françaises · mesures simples et signes d’alerte concordants',
  'vertiges-adulte':'Source institutionnelle française · signes neurologiques associés nécessitant une évaluation urgente',
  'acouphenes-adulte':'HAS 2026 · recommandation de bonne pratique adoptée en juin 2026',
  'jambes-sans-repos':'Assurance Maladie 2026 · repères symptomatiques et nécessité de rechercher les facteurs associés',
  'anxiete-adulte':'Sources françaises · retentissement fonctionnel comme repère de recours aux soins'
 };
 function apply(items){return Array.isArray(items)?items.map(item=>ids.includes(item.id)?{...item,validationStatus:'VALIDATED',verifiedAt:'22/08/2026',nextAuditAt:'22/11/2026',auditIntervalMonths:3,evidenceStatus:notes[item.id]}:item):items;}
 window.auditedQuestionOverrides=apply(window.auditedQuestionOverrides);
 window.extraAuditedQuestions=apply(window.extraAuditedQuestions);
})();
