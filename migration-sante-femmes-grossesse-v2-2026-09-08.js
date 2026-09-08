/* MACA Santé — migration V2 Santé des femmes & grossesse — 08/09/2026
 * Migration non destructive de toutes les fiches canoniques de la catégorie publique.
 * Préserve answer/watch/sources/IDs/URLs/keywords et n'affecte pas la recherche.
 */
(function(){
'use strict';
const pools=[window.healthQuestions||[],window.extraAuditedQuestions||[]];
const LEGACY=new Set(['Santé des femmes & grossesse','Santé des femmes','Grossesse & santé des femmes','Grossesse','Fertilité & contraception']);
const SPECIAL={
 'endometriose':`L’endométriose correspond à la présence de tissu ressemblant à l’endomètre en dehors de la cavité utérine. Elle peut provoquer des douleurs de règles importantes, des douleurs pendant les rapports, des douleurs pelviennes chroniques ou parfois des difficultés à concevoir. L’intensité des symptômes ne reflète pas toujours l’étendue des lésions. Le diagnostic repose d’abord sur l’histoire des symptômes et l’examen, puis sur une imagerie adaptée lorsque cela est nécessaire. Le traitement dépend du retentissement, du projet de grossesse et des caractéristiques de la maladie : antalgiques, traitements hormonaux et, dans certaines situations, chirurgie. L’objectif est de contrôler les symptômes et de préserver au mieux la qualité de vie ; toutes les patientes n’ont pas besoin du même parcours.`,
 'perimenopause':`La périménopause est la période de transition qui précède la ménopause. Les cycles peuvent devenir plus courts, plus longs ou irréguliers, avec des règles parfois plus abondantes. Bouffées de chaleur, troubles du sommeil, variations de l’humeur, sécheresse vaginale ou modifications du désir peuvent apparaître, mais leur intensité varie beaucoup d’une femme à l’autre. Ces symptômes ne doivent pas automatiquement être attribués aux hormones : selon l’âge et le contexte, d’autres causes peuvent être recherchées. La ménopause est définie rétrospectivement après douze mois sans règles en l’absence d’une autre cause. La prise en charge est individualisée selon les symptômes, les facteurs de risque et les préférences de chaque femme.`,
 'cmv-grossesse':`Le cytomégalovirus (CMV) est un virus très fréquent, souvent peu ou pas symptomatique chez l’adulte. Pendant la grossesse, une infection maternelle peut parfois être transmise au fœtus ; toutes les infections maternelles ne conduisent cependant pas à une infection fœtale et toutes les infections congénitales n’entraînent pas de séquelles. Les jeunes enfants sont une source fréquente d’exposition, notamment par la salive et les urines. Les mesures d’hygiène simples — lavage des mains après les changes ou le mouchage, éviter de partager couverts ou aliments et éviter le contact direct avec la salive — permettent de réduire le risque. Lorsqu’une infection est suspectée ou documentée pendant la grossesse, l’interprétation des examens et le suivi relèvent d’une équipe médicale habituée à cette situation.`,
 'running-prolapsus-femme':`Le prolapsus correspond à la descente d’un ou plusieurs organes pelviens vers le vagin. Courir n’est pas, à lui seul, synonyme de prolapsus et l’activité physique reste bénéfique pour la santé. Le risque dépend plutôt d’un ensemble de facteurs : grossesses et accouchements, âge, ménopause, surpoids, constipation chronique, toux répétée, certaines activités imposant des pressions importantes et caractéristiques individuelles du plancher pelvien. Une sensation de pesanteur, de boule vaginale ou des troubles urinaires apparaissant ou s’aggravant pendant l’effort méritent une évaluation. L’objectif n’est généralement pas d’interdire le sport mais d’adapter les contraintes, de traiter les facteurs favorisants et, lorsque cela est utile, de travailler le plancher pelvien avec un professionnel formé.`
};
function clean(s){return String(s||'').replace(/\s+/g,' ').trim();}
function detail(q){
 if(SPECIAL[q.id]) return SPECIAL[q.id];
 const a=clean(q.answer), w=clean(q.watch);
 if(!a)return '';
 let t=`${a}\n\nPour mieux comprendre, la santé gynécologique et la grossesse doivent toujours être interprétées selon l’âge, le moment du cycle, une éventuelle grossesse, les traitements utilisés et l’évolution des symptômes. Un même signe peut avoir plusieurs explications et sa signification dépend beaucoup du contexte.`;
 t+=`\n\nLes examens ou traitements ne sont donc pas systématiques : ils sont choisis selon la question posée, le retentissement, les facteurs de risque et les recommandations. L’objectif est d’éviter à la fois de banaliser un symptôme inhabituel et de médicaliser inutilement une variation physiologique.`;
 if(w)t+=`\n\nLe repère pratique de cette fiche est : ${w}`;
 t+=`\n\nEn cas de doute persistant, de modification récente ou de symptôme qui gêne la vie quotidienne, un échange avec un médecin ou une sage-femme permet de décider si une surveillance, un examen ou une prise en charge spécifique est utile.`;
 return t;
}
let candidates=0,enriched=0,already=0;
pools.forEach(pool=>pool.forEach(q=>{
 if(!q||!q.id)return;
 const cat=q.publicCategory||q.category||'';
 if(cat!=='Santé des femmes & grossesse'&&!(!q.publicCategory&&LEGACY.has(q.category)))return;
 candidates++;
 if(clean(q.detail)){already++;return;}
 const d=detail(q); if(d){q.detail=d;enriched++;}
}));
window.MACA_SANTE_FEMMES_GROSSESSE_V2_20260908={candidates,enriched,already};
})();
