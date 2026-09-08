/* MACA Santé — migration V2 Santé au quotidien — 08/09/2026
 * Enrichissement éditorial non destructif : ajoute un « Pour mieux comprendre »
 * aux fiches restant dans la catégorie publique Santé au quotidien après le
 * rééquilibrage. Ne modifie ni answer, watch, sources, ID, URL, keywords,
 * MACA_SEARCH_V2, seuils ou Assistant.
 */
(function(){
'use strict';
const pools=[window.healthQuestions||[],window.extraAuditedQuestions||[]];
const LEGACY_DAILY=new Set(['Santé au quotidien','Symptômes','Médicaments','Nutrition','Respiration','Peau & dermatologie','ORL','Ophtalmologie','Douleurs & articulations']);
const moved=(window.MACA_CATEGORY_REBALANCE_20260908&&window.MACA_CATEGORY_REBALANCE_20260908.found)||[];
const movedSet=new Set(moved);
const SPECIAL={
  'paracetamol':`Le paracétamol est présent dans de nombreux médicaments contre la douleur, la fièvre ou les symptômes du rhume. Le principal piège est donc le cumul involontaire de plusieurs spécialités contenant la même molécule. La dose doit être adaptée à l’âge, au poids et au contexte, et les prises doivent rester espacées conformément à la notice ou à la prescription. Une dose plus élevée n’améliore pas forcément l’efficacité mais augmente le risque de toxicité, notamment pour le foie. En cas de maladie du foie, de consommation importante d’alcool, de dénutrition ou de poids très faible, les précautions peuvent être différentes. L’idée simple est de vérifier la composition de chaque médicament avant de les associer et de demander conseil en cas de doute.`,
  'antibiotiques':`Un rhume est le plus souvent provoqué par un virus. Les antibiotiques ciblent des bactéries : ils ne raccourcissent donc pas un rhume viral et n’empêchent pas automatiquement une complication. Les prendre sans indication expose en revanche à des effets indésirables et favorise l’antibiorésistance, c’est-à-dire la capacité des bactéries à devenir moins sensibles aux traitements. Une évolution prolongée ou une aggravation ne signifie pas qu’il faut commencer soi-même un antibiotique : elle peut simplement justifier une nouvelle évaluation pour rechercher une complication ou une autre cause. Le bon réflexe est donc de traiter les symptômes de façon adaptée et de réserver l’antibiotique aux situations où une infection bactérienne est suffisamment probable ou démontrée.`,
  'tique':`Après une piqûre de tique, le risque dépend notamment de la durée d’attachement et du contexte géographique. Le retrait mécanique rapide avec un tire-tique est le geste essentiel. Une petite rougeur immédiate autour du point de morsure est fréquente et ne correspond pas forcément à une maladie de Lyme. Le signe classique à connaître est l’érythème migrant : une plaque rouge qui s’étend progressivement, généralement dans les jours ou semaines suivant la piqûre. Il n’est pas nécessaire de surveiller chaque piqûre par une prise de sang systématique. L’important est surtout d’observer la peau et l’apparition éventuelle de symptômes inhabituels pendant les semaines suivantes, puis de consulter si un signe évocateur apparaît.`,
  'brulure':`La gravité d’une brûlure ne dépend pas seulement de la douleur. Elle tient aussi à sa profondeur, à son étendue, à sa localisation et à l’âge de la personne. Pour une brûlure thermique récente, refroidir rapidement sous une eau tempérée aide à limiter la poursuite de l’atteinte des tissus et à diminuer la douleur. La glace, les corps gras ou les produits appliqués au hasard peuvent au contraire compliquer la situation. Une petite brûlure superficielle peut souvent être surveillée après refroidissement et protection simple. Les brûlures étendues, profondes, circulaires ou situées sur des zones sensibles, ainsi que celles touchant un nourrisson ou une personne fragile, nécessitent davantage de prudence.`,
  'douleur-abdominale':`Le « mal au ventre » recouvre de très nombreuses situations : digestion difficile, infection digestive, constipation, problème urinaire, cause gynécologique ou parfois affection nécessitant une prise en charge rapide. Un seul symptôme ne permet donc pas d’en connaître la cause. Ce qui aide à s’orienter est l’évolution : où la douleur se situe, si elle se déplace, depuis combien de temps elle dure, si elle augmente, et si elle s’accompagne de fièvre, vomissements, diarrhée, saignement ou malaise. Une douleur modérée qui s’améliore n’a pas la même signification qu’une douleur brutale ou croissante. Chez une personne susceptible d’être enceinte, cette possibilité doit également être prise en compte.`,
  'bouche-seche-xerostomie':`La salive protège la bouche, facilite la mastication et la déglutition et participe à la protection des dents. Une sensation persistante de bouche sèche peut donc devenir plus qu’un simple inconfort. Elle peut être favorisée par une hydratation insuffisante, mais aussi par de nombreux médicaments. Certaines maladies et certains traitements peuvent également diminuer la production de salive. Lorsque le problème dure, le risque de caries, d’irritations, d’infections buccales ou de difficultés à avaler augmente. Le bilan consiste notamment à revoir les médicaments et le contexte médical, sans interrompre seul un traitement. Une bonne hydratation et une hygiène bucco-dentaire régulière restent particulièrement importantes.`
};
function clean(s){return String(s||'').replace(/\s+/g,' ').trim();}
function makeDetail(q){
  if(SPECIAL[q.id]) return SPECIAL[q.id];
  const a=clean(q.answer), w=clean(q.watch);
  if(!a) return '';
  let text=`Cette fiche répond à une situation fréquente de santé quotidienne. ${a}`;
  text+=`\n\nPour l’interpréter correctement, il faut surtout regarder le contexte, l’évolution dans le temps et les signes associés plutôt qu’un symptôme isolé. Deux personnes présentant le même symptôme peuvent avoir des causes et des niveaux de gravité très différents. L’objectif n’est donc pas de poser soi-même un diagnostic, mais de comprendre les repères utiles, ce qui peut être surveillé et ce qui mérite un avis professionnel.`;
  if(w) text+=`\n\nLe point pratique à retenir est le suivant : ${w}`;
  text+=`\n\nLorsque les symptômes persistent, se répètent, s’aggravent ou deviennent difficiles à expliquer, une évaluation permet de remettre le problème dans son contexte et d’éviter aussi bien la banalisation que l’inquiétude inutile.`;
  return text;
}
let candidates=0, enriched=0, already=0;
pools.forEach(pool=>pool.forEach(q=>{
  if(!q||!q.id||movedSet.has(q.id)) return;
  const cat=q.publicCategory||q.category||'';
  const isDaily=cat==='Santé au quotidien'||(!q.publicCategory&&LEGACY_DAILY.has(q.category));
  if(!isDaily) return;
  candidates++;
  if(clean(q.detail)){already++;return;}
  const detail=makeDetail(q);
  if(detail){q.detail=detail;enriched++;}
}));
window.MACA_SANTE_QUOTIDIEN_V2_20260908={candidates,enriched,already};
})();
