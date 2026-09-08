/* MACA Santé — audit / rééquilibrage des catégories publiques — 08/09/2026
 * Classement éditorial uniquement. Aucun contenu médical, ID, slug, URL, source,
 * keyword, moteur de recherche ou logique Assistant n'est modifié.
 *
 * Principe : une fiche quitte « Santé au quotidien » seulement lorsqu'une des
 * catégories publiques existantes correspond clairement mieux à l'intention.
 */
(function(){
'use strict';
const pools=[window.healthQuestions||[],window.extraAuditedQuestions||[]];
const TARGETS={
  // Enfants & parents
  'ibuprofene-enfant':'Enfants & parents',
  'boissons-sucrees':'Enfants & parents',

  // Cancer
  'activite-physique-traitement-cancer':'Cancer',

  // Digestion & urinaire
  'sang-dans-les-selles':'Digestion & urinaire',
  'syndrome-intestin-irritable-que-faire':'Digestion & urinaire',
  'transaminases-elevees':'Digestion & urinaire',
  'intolerance-lactose':'Digestion & urinaire',
  'fibres':'Digestion & urinaire',

  // Prévention & dépistage
  'marche-30-minutes':'Prévention & dépistage',
  '50-ans-coloscopie-depistage-colorectal':'Prévention & dépistage',
  'rapport-non-protege-ist':'Prévention & dépistage',
  'mpox-transmission-prevention-20260827':'Prévention & dépistage',
  'moustique-tigre-dengue-transmission-locale-20260829':'Prévention & dépistage',
  'grain-beaute-change-melanome':'Prévention & dépistage',

  // Cœur & circulation
  'oeufs-cholesterol':'Cœur & circulation',
  'aliments-augmentent-ldl-cholesterol':'Cœur & circulation',
  'tour-de-taille-risque-cardiovasculaire':'Cœur & circulation',

  // Santé des femmes & grossesse
  'running-prolapsus-femme':'Santé des femmes & grossesse'
};
let hits=0;
const found=new Set();
pools.forEach(pool=>pool.forEach(card=>{
  if(!card||!card.id||!TARGETS[card.id]) return;
  card.publicCategory=TARGETS[card.id];
  found.add(card.id); hits++;
}));
window.MACA_CATEGORY_REBALANCE_20260908={expected:Object.keys(TARGETS).length,found:[...found],hits};
const missing=Object.keys(TARGETS).filter(id=>!found.has(id));
if(missing.length) console.warn('[MACA category audit] IDs non trouvés:',missing);
})();
