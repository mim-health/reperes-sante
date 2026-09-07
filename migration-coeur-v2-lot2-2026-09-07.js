/* MACA Santé — Cœur & circulation V2 — lot 2/3. Enrichissement pédagogique à fond constant. */
(function(){'use strict';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const updates={
[norm('Les œufs font-ils monter le cholestérol ?')]:`Les œufs contiennent du cholestérol alimentaire, mais le taux de cholestérol mesuré dans le sang ne dépend pas uniquement de la quantité de cholestérol présente dans les aliments. L’organisme a besoin de cholestérol pour fonctionner et le foie en fabrique lui-même une quantité importante.

Cela explique pourquoi la relation entre un aliment contenant du cholestérol et le LDL-cholestérol sanguin n’est pas aussi directe qu’on pourrait l’imaginer. La qualité globale de l’alimentation compte davantage qu’un aliment considéré isolément.

Les recommandations cardiovasculaires insistent notamment sur la qualité des graisses consommées. Réduire les graisses saturées et les remplacer par des graisses insaturées est plus important que d’interdire systématiquement tous les aliments contenant du cholestérol.

Plus largement, une alimentation favorable à la santé cardiovasculaire privilégie les légumes et fruits, les légumineuses, les céréales complètes, les fruits à coque et d’autres aliments peu transformés, avec une qualité adaptée des matières grasses.

Le risque cardiovasculaire ne se résume pas non plus au contenu d’une assiette. Le taux de LDL-cholestérol, la tension artérielle, le tabac, le diabète, les antécédents et d’autres facteurs participent à l’évaluation globale.

Chez la majorité des personnes, il n’y a donc pas lieu de considérer l’œuf comme un aliment systématiquement interdit. La situation peut toutefois nécessiter une individualisation chez certaines personnes ayant un trouble important du cholestérol ou un risque cardiovasculaire élevé.

L’objectif est de raisonner sur l’ensemble de l’alimentation et sur le niveau de risque de la personne plutôt que de chercher un unique aliment responsable du cholestérol.`,
[norm('Le sel fait-il monter la tension artérielle ?')]:`Le sel alimentaire contient du sodium. Lorsque les apports sont élevés, différents mécanismes favorisent une augmentation de la pression artérielle. Toutes les personnes ne réagissent pas avec la même intensité, mais à l’échelle de la population une consommation excessive de sel contribue à l’hypertension.

Réduire les apports en sel fait donc partie des mesures reconnues de prévention et de prise en charge de l’hypertension. L’effet peut être particulièrement utile chez les personnes hypertendues et chez celles qui sont plus sensibles aux effets du sodium.

Le principal piège consiste à penser que le sel consommé vient uniquement de la salière. En réalité, une grande partie du sodium est déjà présente dans les aliments. Pains, charcuteries, fromages, plats préparés, sauces, soupes industrielles ou produits apéritifs peuvent en apporter des quantités importantes.

Réduire le sel signifie donc aussi repérer les aliments très salés, comparer les étiquettes lorsque cela est utile et s’habituer progressivement à cuisiner moins salé.

L’OMS recommande aux adultes de consommer moins de 5 grammes de sel par jour, soit environ 2 grammes de sodium. Ce repère ne signifie pas qu’il faut peser chaque gramme au quotidien : il rappelle surtout que l’ensemble des sources de sel compte.

La relation entre sel et tension s’inscrit enfin dans une approche plus large : l’alimentation, l’activité physique, le poids, l’alcool, le tabac et, lorsqu’ils sont nécessaires, les traitements médicamenteux participent ensemble à la prise en charge du risque cardiovasculaire.`,
[norm('Comment réduire mon cholestérol sans médicament ?')]:`Le LDL-cholestérol participe au développement de l’athérosclérose. Réduire son niveau peut donc contribuer à diminuer le risque d’infarctus, d’AVC et d’autres complications cardiovasculaires. Le mode de vie peut agir à la fois sur le LDL et sur plusieurs autres facteurs de risque.

Sur le plan alimentaire, l’un des objectifs est d’améliorer la qualité des graisses consommées. Limiter les graisses saturées et privilégier les graisses insaturées peut aider. Les aliments riches en fibres, notamment certaines fibres solubles, ont également leur place dans une alimentation favorable à la santé cardiovasculaire.

L’activité physique régulière apporte des bénéfices qui dépassent largement le chiffre du cholestérol. Elle peut contribuer à améliorer la tension artérielle, le métabolisme du glucose, la condition physique et le poids lorsqu’il existe un excès pondéral.

L’arrêt du tabac est également essentiel car le risque cardiovasculaire ne dépend pas uniquement du LDL. De la même façon, deux personnes ayant le même taux de cholestérol ne présentent pas forcément le même risque d’accident cardiovasculaire.

L’âge, la tension artérielle, le tabac, le diabète, les antécédents cardiovasculaires et d’autres facteurs modifient l’évaluation globale. C’est pour cela que la question « puis-je éviter un médicament ? » ne peut pas être tranchée seulement à partir d’un chiffre de LDL.

Chez une personne à haut risque cardiovasculaire, les mesures de mode de vie restent indispensables mais peuvent ne pas remplacer un traitement médicamenteux lorsqu’il est indiqué.

Le véritable objectif n’est donc pas uniquement de faire baisser un chiffre sur une prise de sang. Il est de réduire la probabilité qu’un événement cardiovasculaire survienne au cours du temps.`,
[norm('La levure de riz rouge est-elle vraiment efficace contre le cholestérol ?')]:`La levure de riz rouge est obtenue par fermentation du riz par certaines levures. Certaines préparations contiennent de la monacoline K, une substance chimiquement identique à la lovastatine, qui appartient à la famille des statines.

Cette particularité explique pourquoi certaines préparations peuvent faire baisser le LDL-cholestérol. L’effet n’est pas celui d’un aliment neutre : il repose sur une substance ayant une véritable activité pharmacologique.

C’est précisément pour cela que l’expression « complément naturel » peut être trompeuse. Une substance biologiquement active peut avoir des effets indésirables, des interactions et des contre-indications. Le fait qu’un produit soit vendu comme complément alimentaire ne signifie donc pas qu’il est dépourvu de risques.

Un autre point important est que les préparations ne sont pas toutes identiques. Leur composition et la quantité de substance active peuvent varier. On ne peut donc pas raisonner comme si tous les produits correspondaient à une dose médicamenteuse parfaitement standardisée.

Il faut également distinguer deux questions : faire baisser le LDL-cholestérol et démontrer une réduction du risque cardiovasculaire. Une diminution d’un marqueur biologique ne suffit pas, à elle seule, à établir que tous les produits procurent le même bénéfice clinique qu’un médicament dont l’efficacité cardiovasculaire a été établie.

La levure de riz rouge ne doit donc pas être considérée comme une façon simple d’obtenir « l’effet d’une statine sans médicament ». Son action pharmacologique explique à la fois son effet sur le cholestérol et la nécessité de prudence.

Elle ne doit pas remplacer de sa propre initiative un traitement prescrit contre le cholestérol.`,
[norm('L’athérome, c’est quoi ?')]:`Une artère saine permet au sang de circuler vers les organes et les muscles. Avec les années, certaines zones de sa paroi peuvent progressivement se modifier. Des lipides, dont du cholestérol, s’y accumulent et une réaction inflammatoire se met en place : c’est la formation d’une plaque d’athérome.

L’athérome n’est donc pas simplement du « gras qui bouche les tuyaux ». Il s’agit d’une transformation complexe de la paroi artérielle elle-même.

À mesure qu’une plaque se développe, elle peut réduire progressivement l’espace disponible pour le passage du sang. Si ce rétrécissement devient important, l’organe ou le muscle situé en aval peut recevoir moins d’oxygène, notamment lorsqu’il a besoin de davantage de sang pendant un effort.

Mais un accident cardiovasculaire ne survient pas uniquement lorsqu’une artère se bouche lentement jusqu’à devenir complètement fermée. Une plaque peut se compliquer brutalement et favoriser la formation d’un caillot. Celui-ci peut alors interrompre rapidement la circulation et provoquer notamment un infarctus ou certains AVC.

L’athérome se développe généralement sur de nombreuses années. Il peut rester silencieux longtemps avant de provoquer des symptômes ou un événement. C’est pourquoi la prévention intervient bien avant qu’une artère soit fortement rétrécie.

Le tabac, l’hypertension artérielle, un LDL-cholestérol élevé, le diabète et la sédentarité font partie des facteurs importants sur lesquels il est possible d’agir.

La prévention consiste donc à réduire le risque cardiovasculaire dans son ensemble : arrêt du tabac, activité physique, contrôle de la tension et du diabète, alimentation adaptée et traitement du cholestérol lorsqu’il est indiqué.`};
const pools=[window.healthQuestions,window.extraAuditedQuestions].filter(Array.isArray);const found=[];pools.forEach(pool=>pool.forEach(card=>{const d=card&&updates[norm(card.title)];if(d){card.detail=d;found.push(card.id);}}));window.MACA_COEUR_V2_LOT2={expected:5,matchedIds:[...new Set(found)],matchedCount:new Set(found).size};if(new Set(found).size!==5)console.error('[MACA Cœur V2 lot2]',found);})();