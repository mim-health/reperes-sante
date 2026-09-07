/* MACA Santé — Santé mentale V2 — 07/09/2026.
 * Enrichissement pédagogique à fond médical constant. Aucun changement du moteur.
 * Matching par titre afin de préserver IDs, slugs, URLs, réponses courtes et sources existantes.
 */
(function(){
'use strict';
const details={
"Stress ou anxiété : à partir de quand faut-il en parler ?":`Le stress est une réaction normale d’adaptation lorsqu’une situation demande un effort particulier : examen, changement professionnel, conflit, problème familial ou événement imprévu. Il peut provoquer accélération du cœur, tension musculaire, troubles digestifs, difficultés de concentration ou sommeil moins bon. Lorsque la situation se résout, ces manifestations diminuent généralement.

L’anxiété est proche du stress mais peut devenir plus autonome. Elle correspond à une inquiétude, une appréhension ou un sentiment de menace qui peut persister même lorsque le danger n’est pas immédiat. Elle n’est pas forcément pathologique : tout le monde peut traverser une période anxieuse. Ce sont surtout son intensité, sa durée et son retentissement qui comptent.

Il devient utile d’en parler lorsque les inquiétudes prennent beaucoup de place, reviennent presque quotidiennement, deviennent difficiles à contrôler ou conduisent à éviter des situations auparavant habituelles. Le retentissement peut concerner le sommeil, les études, le travail, les relations, les loisirs ou simplement la capacité à profiter de moments ordinaires.

L’anxiété peut aussi s’exprimer par le corps : palpitations, oppression, sensation de souffle court, tremblements, vertiges, tensions, douleurs ou troubles digestifs. Ces symptômes sont réels. Lorsqu’ils sont nouveaux ou inhabituels, il ne faut toutefois pas conclure automatiquement qu’ils sont dus à l’anxiété sans tenir compte du contexte médical.

En parler ne signifie pas nécessairement commencer un médicament. Une première évaluation permet de préciser ce qui se passe, de rechercher les facteurs qui entretiennent les symptômes et d’identifier un éventuel trouble anxieux, une dépression, un problème de sommeil ou une autre difficulté. Selon la situation, information, mesures sur le mode de vie, soutien psychologique ou psychothérapie peuvent être proposés ; un traitement médicamenteux n’est discuté que lorsqu’il est pertinent.

Le bon repère est donc moins « suis-je stressé ? » que « est-ce que cette anxiété commence à diriger ma vie ? ». Lorsque la réponse devient oui, demander de l’aide permet d’éviter que l’évitement et l’inquiétude ne s’installent durablement.`,
"Je dors mal : que peut-on vraiment faire contre l’insomnie ?":`Une insomnie ne se définit pas seulement par un nombre d’heures de sommeil. Elle associe une difficulté à s’endormir, des réveils nocturnes ou un réveil trop précoce à un retentissement pendant la journée : fatigue, irritabilité, somnolence, difficultés d’attention ou impression de ne pas récupérer.

Une mauvaise nuit occasionnelle est banale. Le problème est différent lorsque les difficultés se répètent et s’installent. Stress, anxiété, douleur, horaires irréguliers, écrans tardifs, caféine, alcool, certains médicaments ou d’autres troubles du sommeil peuvent participer au problème. Rechercher ce contexte est souvent plus utile que de chercher immédiatement un produit pour dormir.

Les premières mesures visent à renforcer les signaux qui organisent le sommeil. Une heure de lever relativement régulière aide l’horloge biologique. L’activité physique et l’exposition à la lumière pendant la journée participent également à cette synchronisation. Le soir, diminuer progressivement les stimulations et éviter de transformer le lit en lieu de travail, de télévision ou de navigation prolongée sur le téléphone peut aider.

Passer beaucoup plus de temps au lit pour « récupérer » peut parfois entretenir l’insomnie : on reste éveillé plus longtemps dans le lit, ce qui renforce l’association entre lit et éveil. De même, regarder l’heure à répétition augmente souvent la pression autour du sommeil.

Lorsque l’insomnie devient chronique, les approches cognitives et comportementales de l’insomnie occupent une place importante. Elles travaillent notamment sur les horaires, les comportements qui entretiennent l’éveil et les pensées anxieuses autour du sommeil. Leur objectif n’est pas de forcer le sommeil mais de restaurer progressivement un fonctionnement plus stable.

Les somnifères peuvent avoir une place dans certaines situations, mais ils ne constituent pas une solution automatique à toute insomnie et leur utilisation doit tenir compte de leurs effets indésirables et de la durée de traitement.

Enfin, ronflements importants avec pauses respiratoires, impatiences dans les jambes, somnolence marquée dans la journée, symptômes dépressifs ou consommation de substances peuvent orienter vers un autre problème. Une insomnie persistante mérite donc une évaluation globale plutôt qu’une succession d’essais en automédication.`,
"La mélatonine en complément alimentaire est-elle sans risque ?":`La mélatonine est une hormone produite naturellement par l’organisme. Sa sécrétion augmente le soir et participe à la synchronisation de l’horloge biologique avec l’alternance jour-nuit. Le fait qu’une substance existe naturellement dans le corps ne signifie cependant pas qu’un complément qui en contient soit anodin.

Les produits à base de mélatonine sont souvent présentés comme une aide simple au sommeil. Leur intérêt dépend pourtant du problème rencontré. Une difficulté d’endormissement liée à un rythme décalé n’est pas la même chose qu’une insomnie entretenue par l’anxiété, une douleur, une apnée du sommeil ou un autre trouble. Prendre de la mélatonine sans comprendre la cause peut donc ne pas répondre au problème.

Des effets indésirables ont été rapportés, notamment somnolence, maux de tête, vertiges ou troubles digestifs. Une somnolence résiduelle peut être gênante lorsqu’il faut conduire ou réaliser une activité nécessitant une vigilance importante.

Il faut également tenir compte du terrain et des autres traitements. Certaines situations nécessitent une prudence particulière et des interactions médicamenteuses sont possibles. C’est pourquoi la mélatonine ne doit pas être considérée comme un simple produit alimentaire que l’on peut utiliser indéfiniment sans se poser de question.

La qualité du sommeil dépend aussi fortement des horaires, de l’exposition à la lumière, de l’activité physique, des écrans, de la caféine et des habitudes de coucher. Lorsque ces éléments entretiennent le décalage, les corriger reste une partie essentielle de la prise en charge.

Chez une personne qui dort mal depuis plusieurs semaines ou plusieurs mois, l’enjeu est donc d’identifier le type de trouble du sommeil avant de multiplier les compléments. Une discussion avec un médecin ou un pharmacien est particulièrement utile en présence d’une maladie chronique, de plusieurs médicaments, d’une grossesse, d’un âge avancé ou lorsqu’il s’agit d’un enfant ou d’un adolescent.

Le message pratique est simple : « naturel » ne signifie pas « sans risque », et la mélatonine n’est pas une réponse universelle à toutes les difficultés de sommeil.`,
"Anxiété : quand n’est-ce plus simplement du stress ?":`Stress et anxiété se ressemblent mais ne décrivent pas exactement la même chose. Le stress est généralement une réponse à une contrainte identifiable. Il prépare l’organisme à réagir et peut être utile à court terme. L’anxiété correspond davantage à une anticipation inquiète et peut persister ou se généraliser au-delà de la situation qui l’a déclenchée.

Une anxiété ponctuelle n’est pas une maladie. Avant un examen, un entretien, un voyage ou une décision importante, il est normal de ressentir une tension. Le caractère préoccupant apparaît lorsque l’inquiétude devient disproportionnée, persistante, difficile à contrôler ou qu’elle modifie le fonctionnement quotidien.

Les manifestations ne sont pas seulement psychologiques. Palpitations, tensions musculaires, gêne respiratoire, nausées, troubles digestifs, vertiges, fatigue ou difficultés de sommeil peuvent accompagner l’anxiété. Certaines personnes consultent d’ailleurs d’abord pour ces symptômes physiques.

L’évitement est un élément important. Renoncer progressivement aux transports, aux lieux fréquentés, à certaines situations sociales ou professionnelles parce qu’elles déclenchent de l’angoisse peut soulager à court terme, mais contribuer à maintenir le problème. Le champ des activités se réduit alors progressivement.

Il existe plusieurs troubles anxieux et ils ne se diagnostiquent pas sur un symptôme isolé ou un questionnaire en ligne. L’évaluation s’intéresse à la nature des peurs, à leur durée, aux situations qui les déclenchent, à leur retentissement et aux autres difficultés éventuellement associées. Elle permet également de ne pas attribuer trop vite à l’anxiété un symptôme qui nécessiterait une autre exploration.

La prise en charge dépend de cette évaluation. Les psychothérapies, notamment les approches cognitives et comportementales, ont une place importante. Des médicaments peuvent être utilisés dans certaines situations, mais ils ne sont ni systématiques ni la seule réponse possible.

Lorsque l’anxiété empêche de dormir, travailler, étudier, sortir, maintenir des relations ou réaliser des activités habituelles, ce n’est plus simplement une émotion désagréable à supporter : il devient pertinent d’en parler à un professionnel de santé.`,
"Dépression : comment la différencier d’un coup de blues ?":`Une baisse de moral après une déception, un conflit ou une période difficile fait partie de la vie. Elle peut être intense mais reste généralement fluctuante et tend à s’améliorer avec le temps ou lorsque la situation change. La dépression correspond à un tableau plus durable et plus large qu’une simple tristesse.

Le diagnostic repose sur un ensemble de symptômes présents de façon persistante, avec un retentissement réel. L’humeur dépressive et la perte d’intérêt ou de plaisir occupent une place centrale. Peuvent s’y associer fatigue, troubles du sommeil, modification de l’appétit, difficultés de concentration, ralentissement ou agitation, sentiment de dévalorisation, culpabilité excessive, pessimisme ou pensées autour de la mort.

La durée est importante mais ne suffit pas à elle seule. Le repère de plusieurs symptômes présents presque chaque jour pendant au moins deux semaines aide à distinguer un épisode dépressif d’une variation passagère du moral, mais l’évaluation tient aussi compte de leur intensité et de leurs conséquences sur la vie quotidienne.

Une personne dépressive n’a pas nécessairement l’air triste en permanence. Certaines continuent à travailler et à assurer leurs obligations au prix d’un effort considérable. Chez d’autres, irritabilité, fatigue, douleurs ou retrait social sont au premier plan. C’est pourquoi réduire la dépression à « être triste » peut retarder son repérage.

Le diagnostic est clinique. Une prise de sang ne confirme pas une dépression, même si des examens peuvent parfois être demandés pour rechercher une autre cause à certains symptômes. L’entretien permet aussi d’identifier anxiété, consommations, trouble bipolaire ou autre situation nécessitant une approche différente.

La prise en charge dépend de la sévérité, du contexte et des préférences de la personne. Psychothérapie, soutien, adaptation de certains facteurs de vie et, lorsque cela est indiqué, traitement médicamenteux peuvent être proposés.

Les idées suicidaires doivent toujours être prises au sérieux. Elles peuvent aller d’un souhait de ne plus être là à un projet précis. Les rechercher n’« implante » pas l’idée : cela permet au contraire d’évaluer le risque et d’organiser une aide adaptée.`,
"Crise d’angoisse : que faire quand elle survient ?":`Une attaque de panique est un épisode d’angoisse très intense qui apparaît brutalement et atteint rapidement un niveau élevé. Le cœur peut accélérer, la respiration devenir inconfortable, les mains trembler, des vertiges ou des nausées apparaître. La sensation peut être si forte que la personne pense faire un infarctus, s’étouffer, perdre le contrôle ou mourir.

Ces sensations sont impressionnantes mais, lorsqu’il s’agit bien d’une attaque de panique déjà identifiée, elles diminuent progressivement. Pendant la crise, l’objectif est d’éviter d’ajouter une lutte supplémentaire contre chaque sensation. S’installer dans un endroit calme, se rappeler que l’épisode va décroître et ralentir progressivement la respiration peuvent aider.

Respirer très vite entretient certains symptômes : fourmillements, sensation de tête légère, oppression ou vertiges. Il ne s’agit pas de prendre de grandes inspirations forcées, mais de retrouver progressivement une respiration plus lente et naturelle.

Après une première crise, beaucoup de personnes développent une peur de la prochaine. Elles commencent alors à surveiller leur cœur ou leur respiration et à éviter les lieux où elles craignent de ne pas pouvoir s’échapper. Ce mécanisme peut entretenir un trouble panique même lorsque les crises sont espacées.

Une première crise ne doit cependant pas être automatiquement étiquetée « anxiété ». Douleur thoracique inhabituelle, malaise, perte de connaissance, difficulté respiratoire importante, symptômes neurologiques ou contexte médical particulier peuvent nécessiter d’éliminer une autre cause.

Lorsque les crises se répètent ou que leur anticipation modifie la vie quotidienne, une consultation permet de confirmer le diagnostic et de proposer une prise en charge. Les approches cognitives et comportementales sont notamment utilisées pour comprendre les sensations, réduire la peur qu’elles déclenchent et limiter les comportements d’évitement.

Le message essentiel est donc double : une attaque de panique peut être extrêmement impressionnante sans être dangereuse en elle-même lorsqu’elle est correctement identifiée, mais des symptômes nouveaux ou atypiques ne doivent pas être attribués automatiquement à l’angoisse.`,
"TDAH : quels sont les vrais critères et quand un médicament est-il justifié ?":`Le TDAH est un trouble du neurodéveloppement. Il ne se résume ni à être distrait ni à être très actif. Les symptômes d’inattention et/ou d’hyperactivité-impulsivité doivent être persistants, inadaptés au niveau de développement et entraîner un retentissement réel dans la vie de l’enfant ou de l’adolescent.

L’un des points essentiels est que les difficultés doivent être replacées dans plusieurs contextes. Un enfant peut être très agité dans une situation particulière sans présenter un TDAH. L’évaluation recueille donc des informations auprès de l’enfant ou de l’adolescent, de sa famille et, lorsque cela est pertinent, de l’école ou d’autres environnements.

Il n’existe pas de prise de sang, d’IRM, de test informatique ou de questionnaire permettant à lui seul de confirmer le diagnostic. Les questionnaires peuvent structurer les observations, mais ils s’intègrent dans une évaluation clinique plus large. Celle-ci recherche également d’autres explications : troubles du sommeil, anxiété, dépression, difficultés d’apprentissage, autres troubles du neurodéveloppement ou contexte psychosocial.

Le diagnostic ne signifie pas automatiquement médicament. La prise en charge est globale et tient compte du retentissement, des besoins et des objectifs de l’enfant et de sa famille. Information, adaptations de l’environnement, accompagnement parental et interventions non médicamenteuses peuvent en faire partie.

Lorsqu’un traitement médicamenteux est indiqué chez l’enfant ou l’adolescent, le méthylphénidate constitue le traitement pharmacologique de première intention selon la recommandation HAS déjà référencée dans cette fiche. La décision repose sur l’importance du trouble et de son retentissement, après une évaluation complète ; elle ne doit pas découler d’un simple score de questionnaire.

Le traitement nécessite ensuite un suivi. L’objectif n’est pas de rendre l’enfant « calme » mais d’améliorer son fonctionnement et sa qualité de vie tout en surveillant efficacité et tolérance. La pertinence de la stratégie doit être réévaluée au cours du temps.

Ainsi, ni les difficultés scolaires isolées ni l’agitation ordinaire ne suffisent au diagnostic, et un TDAH correctement diagnostiqué ne conduit pas automatiquement à une prescription.`,
"Burn-out : comment reconnaître un épuisement professionnel ?":`Le burn-out, ou épuisement professionnel, décrit un phénomène lié au travail et à l’exposition prolongée à un stress professionnel qui n’a pas pu être suffisamment régulé. Il ne correspond pas à une simple fatigue après une semaine chargée.

L’épuisement est souvent au premier plan : impression de ne plus récupérer, difficultés à se lever pour aller travailler, troubles du sommeil, baisse de concentration et sentiment de fonctionner en permanence sur ses réserves. Une prise de distance mentale vis-à-vis du travail peut apparaître, avec irritabilité, cynisme, perte d’engagement ou sentiment de ne plus parvenir à faire correctement ce qui était auparavant maîtrisé.

Les manifestations peuvent être psychologiques mais aussi physiques : tensions, douleurs, troubles digestifs, palpitations ou sommeil perturbé. Elles ne sont pas spécifiques du burn-out. C’est précisément pourquoi il est utile de ne pas s’autodiagnostiquer uniquement à partir d’une liste de symptômes.

L’évaluation cherche à comprendre l’organisation du travail, la charge, les horaires, l’autonomie, les conflits de valeurs, les relations professionnelles et l’évolution des symptômes. Elle recherche également d’autres situations qui peuvent se présenter de façon proche ou être associées : épisode dépressif, trouble anxieux, trouble du sommeil, consommation de substances ou maladie somatique.

Le burn-out n’est donc pas simplement synonyme de dépression, même si les deux peuvent coexister. La distinction a des conséquences sur la prise en charge et sur la manière d’aborder les facteurs professionnels qui entretiennent la situation.

La réponse ne consiste pas uniquement à « apprendre à mieux gérer son stress ». Selon la situation, elle peut nécessiter repos, soins, accompagnement psychologique, adaptation du travail et mobilisation de la santé au travail. Le retour professionnel doit parfois être préparé pour éviter de replacer la personne exactement dans les conditions ayant contribué à l’épuisement.

Il est préférable de demander de l’aide avant l’effondrement complet lorsque le sommeil, l’humeur, les capacités de travail ou la vie personnelle se dégradent nettement. Des idées suicidaires, un sentiment d’impasse majeur ou une incapacité à assurer sa sécurité nécessitent une aide urgente.`
};
function patch(list){if(!Array.isArray(list))return;for(const c of list){if(c&&details[c.title]){c.detail=details[c.title];c.longAnswer=details[c.title];c.readingTime='3–5 min';c.editorialStandard='MACA_V2';}}}
patch(window.healthQuestions);patch(window.extraAuditedQuestions);patch(window.structuredBacklog);
})();
