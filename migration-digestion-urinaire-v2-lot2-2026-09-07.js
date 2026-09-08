/* MACA Santé — Digestion & urinaire V2 — lot 2/2.
 * Enrichissement pédagogique à fond médical constant + fusion du doublon cystite validée Pilotage.
 * Ne modifie ni MACA_SEARCH_V2 ni ses seuils/intents.
 */
(function(){
'use strict';
const details={
"J’ai des brûlures d’estomac ou des remontées acides : que faire ?":`Les brûlures derrière le sternum et les remontées acides sont des manifestations fréquentes du reflux gastro-œsophagien. Le reflux survient lorsqu’une partie du contenu de l’estomac remonte vers l’œsophage. Comme la muqueuse de l’œsophage est moins protégée contre l’acidité que celle de l’estomac, cette remontée peut provoquer une sensation de brûlure ou un goût acide dans la bouche.

Les symptômes sont souvent favorisés par les repas copieux, certains aliments ou boissons propres à chaque personne, la position allongée peu après le repas ou certaines situations augmentant la pression abdominale. Il n’existe cependant pas une liste universelle d’aliments interdits : mieux vaut identifier ce qui déclenche réellement les symptômes chez soi plutôt que supprimer de nombreux aliments sans raison.

Des mesures simples peuvent aider : repas moins volumineux si nécessaire, éviter de s’allonger juste après avoir mangé, adapter les horaires du dîner et agir sur les facteurs déclenchants identifiés. Lorsqu’un excès de poids contribue au reflux, une diminution pondérale peut aussi améliorer les symptômes.

Des médicaments réduisant ou neutralisant l’acidité peuvent être utilisés selon la fréquence et l’intensité des symptômes. Ils ne répondent toutefois pas tous au même besoin, et des symptômes persistants malgré un traitement méritent une réévaluation plutôt qu’une automédication prolongée.

Il faut aussi distinguer un reflux typique d’autres causes de douleur thoracique ou de gêne digestive. Une douleur thoracique nouvelle, intense ou associée à un malaise, un essoufflement ou d’autres signes inhabituels ne doit pas être automatiquement attribuée à l’estomac.

Une difficulté à avaler, des aliments qui semblent se bloquer, des vomissements répétés, un amaigrissement inexpliqué, un saignement digestif ou une anémie sont également des éléments qui conduisent à rechercher une autre cause ou une complication.

Le reflux est donc le plus souvent bénin, mais sa fréquence, son retentissement et les signes associés déterminent s’il suffit d’adapter les habitudes ou s’il faut une évaluation médicale plus poussée.`,
"Brûlures urinaires et envies fréquentes : est-ce une cystite ?":`La cystite est une infection de la vessie, le plus souvent bactérienne. Chez une femme, l’association de brûlures ou douleurs en urinant avec des envies fréquentes et parfois urgentes d’uriner est très évocatrice, surtout lorsqu’il n’existe ni fièvre ni douleur lombaire.

Les envies peuvent survenir alors que la vessie contient peu d’urine. Une gêne du bas-ventre ou des urines inhabituelles peuvent parfois être associées, mais aucun symptôme pris isolément ne suffit dans toutes les situations.

Toutes les brûlures urinaires ne sont pas des cystites. Une irritation locale, une infection génitale ou sexuellement transmissible et d’autres problèmes urinaires peuvent provoquer des symptômes proches. Le contexte, le sexe, l’âge, une grossesse éventuelle, les antécédents et les signes associés comptent donc beaucoup.

La présence de fièvre, de frissons, d’une douleur dans le dos ou sur le côté, de nausées ou d’un mauvais état général fait envisager une infection plus haute, notamment rénale, et change la conduite à tenir. Il ne s’agit alors plus de considérer la situation comme une simple cystite habituelle.

Selon le profil et la situation, le diagnostic peut être clinique ou nécessiter une bandelette urinaire et parfois un examen cytobactériologique des urines. L’objectif est d’identifier les situations où un traitement peut être proposé simplement et celles qui nécessitent de documenter davantage l’infection ou de rechercher une complication.

Les cystites peuvent récidiver chez certaines personnes. Lorsqu’elles deviennent répétées, il est utile de vérifier qu’il s’agit bien d’infections urinaires et d’examiner les facteurs favorisants plutôt que d’enchaîner des traitements sans réévaluation.

Le message pratique est donc simple : brûlures et envies fréquentes évoquent souvent une cystite chez la femme, mais la présence de fièvre, douleur lombaire, altération de l’état général ou d’un contexte particulier doit conduire à une évaluation adaptée.`,
"Comment prendre soin de son microbiote intestinal ?":`Le microbiote intestinal désigne l’ensemble des micro-organismes qui vivent dans notre tube digestif. Il participe à de nombreuses fonctions, notamment à la transformation de certains composants alimentaires et aux interactions avec le système immunitaire. Sa composition varie naturellement d’une personne à l’autre et au cours de la vie.

Cette diversité explique pourquoi il est trompeur de parler d’un microbiote « parfait » qu’il faudrait mesurer, nettoyer ou rééquilibrer régulièrement. Les tests commerciaux et les programmes de « détox du microbiote » ne constituent pas une démarche de santé universelle.

L’alimentation est l’un des facteurs qui influencent le microbiote. Une alimentation variée, faisant une place importante aux aliments végétaux et donc à différentes sources de fibres, fournit aux bactéries intestinales des substrats variés. Fruits, légumes, légumineuses, céréales complètes, noix et graines peuvent y contribuer selon la tolérance et les habitudes de chacun.

Cela ne signifie pas qu’il faille modifier brutalement son alimentation. Une augmentation très rapide des fibres peut provoquer davantage de gaz et de ballonnements, surtout chez les personnes ayant un intestin sensible. Les changements progressifs sont souvent mieux tolérés.

Les aliments fermentés peuvent faire partie d’une alimentation variée, mais ils ne doivent pas être présentés comme un traitement universel du microbiote. De même, un probiotique n’est pas simplement « une bonne bactérie » interchangeable avec une autre : ses effets éventuels dépendent de la souche, de la dose, du contexte et de l’indication étudiée.

Les antibiotiques peuvent modifier temporairement le microbiote, mais lorsqu’ils sont médicalement nécessaires, la priorité reste de traiter correctement l’infection. L’objectif n’est donc pas d’éviter un antibiotique utile pour « protéger le microbiote », mais d’éviter les prescriptions inutiles.

En pratique, prendre soin de son microbiote revient surtout à prendre soin de sa santé digestive et générale : alimentation variée, activité physique, absence de tabagisme et usage raisonné des médicaments. Il n’existe pas de cure périodique obligatoire permettant de remettre le microbiote à zéro ou de garantir une composition idéale.`,
"J’ai le ventre gonflé : pourquoi et que faire ?":`La sensation de ventre gonflé est très fréquente. Elle peut correspondre à une impression de tension ou de distension, avec ou sans augmentation réellement visible du volume abdominal. Elle ne signifie pas nécessairement qu’il existe une quantité anormalement importante de gaz.

Les gaz digestifs proviennent notamment de l’air avalé et de la fermentation de certains aliments par les bactéries intestinales. La manière dont l’intestin se contracte, la sensibilité digestive et la constipation jouent également un rôle. C’est pourquoi deux personnes ayant une quantité comparable de gaz peuvent ressentir des symptômes très différents.

Les repas copieux, manger rapidement, certaines boissons gazeuses ou certains aliments peuvent favoriser les ballonnements chez certaines personnes. Il n’existe toutefois pas une liste d’aliments à supprimer systématiquement. Tenir compte du contexte des symptômes est souvent plus utile que commencer d’emblée un régime très restrictif.

La constipation est une cause fréquente de gonflement. Améliorer le transit peut alors réduire les symptômes. Les troubles fonctionnels digestifs, notamment le syndrome de l’intestin irritable, peuvent également associer ballonnements, douleurs et modifications du transit sans lésion digestive identifiable par les examens habituels.

Des intolérances ou malabsorptions peuvent parfois intervenir, mais un ventre gonflé ne permet pas à lui seul de conclure à une intolérance au lactose, au gluten ou à un autre aliment. Supprimer plusieurs groupes alimentaires sans diagnostic peut compliquer l’alimentation sans résoudre le problème.

En pratique, manger plus lentement, observer les aliments ou situations qui déclenchent réellement les symptômes, maintenir une activité physique et traiter une constipation éventuelle sont des premières pistes raisonnables. Si les symptômes sont importants ou persistants, l’évaluation vise surtout à rechercher les signes associés et à éviter les exclusions alimentaires inutiles.

Un gonflement récent et persistant associé à un amaigrissement, du sang dans les selles, des vomissements, une douleur importante, de la fièvre ou une modification inhabituelle du transit mérite un avis médical.`,
"Pourquoi l’alcool peut-il perturber le transit et la digestion ?":`L’alcool peut agir à plusieurs niveaux du tube digestif. Ses effets varient selon la quantité consommée, la fréquence, le type de boisson, le repas associé et la sensibilité individuelle. Une même consommation ne provoque donc pas les mêmes symptômes chez tout le monde.

Au niveau de l’estomac et de l’œsophage, l’alcool peut favoriser ou aggraver des brûlures et des remontées acides chez certaines personnes. Il peut également irriter la muqueuse digestive et modifier la manière dont l’estomac se vide.

Plus bas dans l’intestin, l’alcool peut influencer la motricité et les échanges d’eau, ce qui contribue chez certaines personnes à des selles plus molles ou à une diarrhée, notamment après une consommation importante. Les boissons alcoolisées contiennent aussi d’autres composants — sucres, gaz, composés fermentescibles — susceptibles de participer aux symptômes selon la boisson choisie.

L’alcool peut également favoriser la déshydratation dans certaines circonstances. Lorsqu’il est associé à des vomissements ou à une diarrhée, la perte de liquide peut devenir plus importante.

Ces effets digestifs ne doivent pas faire oublier que les conséquences de l’alcool dépassent largement le système digestif. Les recommandations de santé publique visent à réduire la consommation globale et à éviter les épisodes de consommation importante ; il n’existe pas de consommation d’alcool pouvant être présentée comme bénéfique pour la digestion.

Lorsqu’une personne constate régulièrement reflux, douleurs abdominales, diarrhée ou autre symptôme après avoir bu, observer la relation entre consommation et symptômes peut aider. Réduire ou interrompre l’alcool permet parfois de vérifier si cette relation est réelle.

Des symptômes digestifs persistants, un saignement, des vomissements répétés, une perte de poids ou une douleur importante ne doivent cependant pas être attribués automatiquement à l’alcool : ils nécessitent une évaluation propre.`,
"Je pense être intolérant au gluten : quels tests faut-il faire ?":`Le mot « intolérance au gluten » recouvre souvent plusieurs situations différentes. Avant de supprimer le gluten, il est important de distinguer notamment la maladie cœliaque, l’allergie au blé et les symptômes attribués au gluten ou au blé sans maladie cœliaque démontrée.

La maladie cœliaque est une maladie auto-immune déclenchée par le gluten chez des personnes prédisposées. Elle peut provoquer des symptômes digestifs — diarrhée, ballonnements, douleurs — mais aussi des manifestations moins évidentes, comme une carence en fer ou d’autres anomalies. Les symptômes seuls ne permettent donc pas de confirmer ou d’exclure le diagnostic.

Le point essentiel est de ne pas commencer un régime sans gluten avant le bilan lorsqu’une maladie cœliaque est recherchée. En effet, diminuer ou supprimer le gluten peut faire baisser les anticorps recherchés et modifier la muqueuse intestinale, rendant les examens plus difficiles à interpréter.

Le bilan initial repose habituellement sur une sérologie adaptée, avec notamment la recherche d’anticorps IgA anti-transglutaminase et l’évaluation des IgA totales. Selon les résultats et le contexte, d’autres examens peuvent être nécessaires. Chez l’adulte, une endoscopie avec biopsies du duodénum peut notamment faire partie de la confirmation diagnostique.

L’allergie au blé relève d’un mécanisme différent et se recherche dans un contexte allergologique. Quant à la sensibilité au gluten ou au blé non cœliaque, elle ne dispose pas d’un test sanguin unique permettant de la confirmer : il faut d’abord écarter les diagnostics pour lesquels des examens spécifiques existent.

Un régime sans gluten strict est indispensable lorsqu’une maladie cœliaque est confirmée, mais il est contraignant et ne devrait pas être entrepris à l’aveugle comme test diagnostique.

Ainsi, lorsqu’on pense mal tolérer le gluten, la meilleure première étape est de poursuivre une alimentation contenant du gluten jusqu’au bilan et de discuter des examens appropriés avec un professionnel de santé.`,
"Microbiote : les probiotiques sont-ils utiles pour tout le monde ?":`Les probiotiques sont des micro-organismes vivants qui, lorsqu’ils sont administrés dans des conditions précises, peuvent avoir un effet bénéfique dans certaines situations. Cette définition ne signifie pas que tous les produits contenant des bactéries ont les mêmes effets ni qu’un probiotique est utile à tout le monde.

Le point central est la notion de souche. Deux bactéries appartenant à la même espèce peuvent ne pas avoir été étudiées dans les mêmes indications. Les résultats obtenus avec une souche donnée ne peuvent donc pas être automatiquement transposés à un autre produit simplement parce que son étiquette mentionne « probiotiques ».

L’indication compte également. Certaines souches ont fait l’objet d’études dans des situations digestives particulières, avec des niveaux de preuve variables. Cela ne permet pas de conclure qu’elles améliorent globalement l’immunité, « rééquilibrent » tous les microbiotes ou préviennent toutes les maladies.

Le microbiote intestinal est par ailleurs un écosystème complexe et variable. Il n’existe pas, en pratique courante, une composition idéale unique que l’on pourrait mesurer puis corriger avec un complément standard. Cette idée est différente de l’utilisation ciblée d’une souche ayant été évaluée pour une indication précise.

Chez la plupart des personnes en bonne santé, les probiotiques sont généralement bien tolérés, mais cela ne signifie pas qu’ils soient indispensables. Certaines situations médicales particulières nécessitent davantage de prudence et justifient un avis professionnel avant l’utilisation de micro-organismes vivants.

Pour le grand public, le bon réflexe est donc de regarder la question posée : quel symptôme ou quelle indication cherche-t-on à améliorer ? Quelle souche a été étudiée ? Le produit correspond-il réellement aux données disponibles ? Sans réponse claire à ces questions, l’étiquette « probiotique » ne suffit pas à prédire un bénéfice.

Une alimentation variée et riche en aliments végétaux reste une approche générale de santé digestive ; elle ne doit pas être confondue avec la prise d’un complément probiotique destiné à une indication particulière.`
};
const duplicateTitles=new Set(['Brûlures urinaires : quand penser à une cystite ?']);
const duplicateIds=new Set(['cystite-adulte','brulures-urinaires-cystite','brulures-urinaires-quand-penser-cystite']);
function keep(card){if(!card)return false;if(card.id==='cystite-femme')return true;return !duplicateIds.has(card.id)&&!duplicateTitles.has(card.title||card.question||'');}
['healthQuestions','extraAuditedQuestions','auditedQuestionOverrides','SANTEJUSTE_BACKLOG_AUDITED'].forEach(k=>{if(Array.isArray(window[k]))window[k]=window[k].filter(keep);});
const pools=[window.healthQuestions,window.extraAuditedQuestions].filter(Array.isArray);const found=[];
pools.forEach(pool=>pool.forEach(card=>{const d=details[card&&card.title];if(!d)return;card.detail=d;found.push(card.id||card.title);}));
window.MACA_DIGESTION_URINAIRE_V2_LOT2={expected:7,matchedCount:new Set(found).size,matchedIds:[...new Set(found)],cystitisCanonical:'cystite-femme'};
if(new Set(found).size!==7)console.error('[MACA Digestion & urinaire V2 lot2] correspondances inattendues',found);
})();