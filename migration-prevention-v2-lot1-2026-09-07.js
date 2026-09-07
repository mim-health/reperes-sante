/* MACA Santé — Prévention & dépistage V2 — lot 1/2.
 * Enrichissement pédagogique à fond médical constant, sans nouvel ID ni modification moteur.
 * Fiches B1 à B5 de la migration validée du 07/09/2026.
 */
(function(){
'use strict';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const details={
"Faut-il absolument faire 10 000 pas par jour ?":`Le chiffre de 10 000 pas est devenu un objectif très populaire, notamment avec les montres connectées et les smartphones. Il est facile à comprendre et donne un repère concret, mais il ne correspond pas à une frontière biologique entre « assez actif » et « pas assez actif ».

Les données disponibles montrent plutôt une relation progressive : lorsqu’une personne est très peu active, augmenter le nombre de pas apporte déjà un bénéfice. Autrement dit, passer d’un niveau très bas à un niveau plus élevé compte, même si l’on reste en dessous de 10 000 pas.

Une importante méta-analyse publiée en 2025 a notamment retrouvé des bénéfices substantiels autour de 7 000 pas par jour par rapport à des niveaux beaucoup plus faibles. Cela ne transforme pas pour autant 7 000 pas en nouveau chiffre obligatoire. L’intérêt principal est de montrer qu’il n’existe pas un seul seuil universel à franchir.

Le nombre de pas est surtout utile comme outil de suivi. Il permet à une personne de comparer ses journées, de voir si elle bouge davantage qu’avant et de se fixer un objectif progressif. Pour quelqu’un qui marche peu, ajouter régulièrement quelques centaines ou quelques milliers de pas peut déjà représenter un changement significatif.

Il faut aussi rappeler que compter les pas ne résume pas toute l’activité physique. Le vélo, la natation, certaines activités sportives ou même certaines tâches du quotidien peuvent apporter des bénéfices importants sans augmenter fortement le compteur de pas.

L’idée utile n’est donc pas de réussir ou d’échouer face à un chiffre unique, mais de réduire la sédentarité et d’augmenter progressivement son niveau d’activité par rapport à son point de départ.`,
"J’ai entre 40 et 50 ans : quels dépistages dois-je penser à faire ?":`Entre 40 et 50 ans, la prévention ne repose pas sur une liste universelle d’examens à faire chaque année. Une bonne démarche consiste d’abord à regarder les principaux facteurs de risque et les dépistages réellement adaptés à l’âge, au sexe, aux antécédents personnels et familiaux et au mode de vie.

Sur le plan cardiovasculaire, connaître sa pression artérielle est important car une hypertension peut évoluer sans symptôme. L’évaluation du risque tient aussi compte notamment du tabagisme, du poids, de l’activité physique, des antécédents familiaux, du cholestérol ou du risque de diabète selon la situation.

L’objectif n’est pas de multiplier automatiquement les prises de sang ou examens d’imagerie « au cas où ». Un examen n’est utile que s’il répond à une question précise, si son résultat peut réellement modifier la prise en charge et si son bénéfice attendu dépasse ses inconvénients.

En France, Mon Bilan Prévention prévoit notamment un temps dédié entre 45 et 50 ans. Ce rendez-vous est justement pensé pour faire le point sur les habitudes de vie, les facteurs de risque, les vaccinations et les dépistages pertinents, plutôt que d’appliquer le même programme à tout le monde.

Les antécédents personnels ou familiaux peuvent modifier cette stratégie. Une personne ayant, par exemple, un risque familial particulier de cancer ou une maladie chronique connue peut nécessiter un suivi différent de celui prévu pour la population générale.

Le bon réflexe est donc moins de rechercher un « check-up complet » standard que de vérifier que les principaux risques ont été identifiés et que les dépistages correspondant réellement à sa situation sont à jour.`,
"Quels vaccins faut-il vérifier à l’âge adulte ?":`La vaccination ne s’arrête pas à l’enfance. Certains vaccins nécessitent des rappels à l’âge adulte, tandis que d’autres deviennent particulièrement importants à certains âges ou en présence de certaines maladies.

Le calendrier vaccinal français prévoit notamment des rappels contre la diphtérie, le tétanos et la poliomyélite à certains âges. L’objectif est d’entretenir une protection qui peut diminuer avec le temps.

D’autres vaccinations sont recommandées en fonction du contexte. Avec l’âge ou certaines maladies, la vaccination contre la grippe, le Covid-19, le pneumocoque ou le zona peut devenir indiquée selon les recommandations applicables à la personne.

La grossesse constitue également une période où certaines vaccinations doivent être vérifiées ou proposées. Le métier peut compter aussi : certaines professions exposent davantage à certaines infections ou nécessitent une protection particulière.

Les voyages sont un autre cas spécifique. Les vaccins nécessaires dépendent alors de la destination, de la durée et des conditions du séjour. Ils ne peuvent donc pas être résumés par une liste unique valable pour tous les voyageurs.

Lorsqu’on ne retrouve plus son carnet de vaccination, il ne faut pas conclure automatiquement qu’il faut tout recommencer. Un professionnel de santé peut aider à reconstituer l’historique disponible et à déterminer ce qui est réellement nécessaire.

L’objectif pratique est donc simple : vérifier périodiquement que les rappels prévus et les vaccinations liées à l’âge, à la santé ou à certaines situations particulières sont bien à jour.`,
"Quels dépistages de cancer sont organisés selon l’âge ?":`Le dépistage organisé s’adresse à des personnes qui ne présentent pas de symptôme. Son objectif est de rechercher une maladie ou certaines lésions avant qu’elles ne se manifestent, lorsqu’une détection plus précoce peut permettre une prise en charge plus efficace.

En France, trois programmes nationaux concernent actuellement le cancer du sein, le cancer colorectal et le cancer du col de l’utérus. Ils ne reposent pas sur les mêmes examens et ne commencent pas au même âge.

Pour le cancer du sein, le programme organisé concerne les femmes de 50 à 74 ans à risque moyen, avec une mammographie proposée tous les deux ans. Pour le cancer colorectal, le dépistage organisé concerne les femmes et les hommes de 50 à 74 ans à risque moyen et repose d’abord sur un test immunologique réalisé sur les selles.

Pour le cancer du col de l’utérus, le dépistage concerne les femmes de 25 à 65 ans, avec des modalités qui varient selon l’âge. Là encore, il s’agit d’un programme destiné à la population générale répondant aux critères prévus.

Ces programmes ne remplacent pas une surveillance spécifique lorsqu’il existe un risque particulier. Des antécédents personnels, certains antécédents familiaux ou certaines maladies peuvent conduire à proposer une stratégie différente.

Il faut aussi distinguer dépistage et diagnostic. Un test de dépistage anormal ne signifie pas automatiquement qu’un cancer est présent : il conduit à des examens complémentaires. À l’inverse, lorsqu’un symptôme apparaît, il ne faut pas attendre le prochain dépistage prévu, car on entre alors dans une démarche diagnostique.`,
"Votre tour de taille en dit-il plus sur votre santé que votre poids ?":`Le poids et l’IMC apportent une information utile, mais ils ne décrivent pas à eux seuls la répartition de la masse grasse. Deux personnes ayant le même poids ou le même IMC peuvent avoir une distribution très différente de la graisse corporelle.

Le tour de taille apporte donc une information complémentaire. Il donne une estimation simple de l’accumulation de graisse abdominale, qui est davantage associée à certaines anomalies métaboliques comme la résistance à l’insuline, le diabète de type 2, l’hypertension ou des perturbations des lipides sanguins.

Cela ne signifie pas que le tour de taille « remplace » le poids. Les deux mesures répondent à des questions différentes et doivent être replacées dans l’ensemble du contexte : âge, activité physique, pression artérielle, glycémie, cholestérol, antécédents et habitudes de vie.

Des repères de risque sont souvent utilisés autour de 80 cm chez la femme et 94 cm chez l’homme. Ils ne constituent pas à eux seuls un diagnostic et ne doivent pas être interprétés isolément. Leur intérêt est surtout d’attirer l’attention sur une accumulation abdominale de graisse associée à un risque métabolique plus élevé.

La mesure doit être réalisée de manière standardisée, avec un mètre ruban horizontal, sans comprimer l’abdomen. Une variation minime d’un centimètre n’a pas, à elle seule, de signification particulière.

Le message utile est donc que le poids ne raconte pas toute l’histoire : le tour de taille complète l’évaluation, mais il reste un indicateur parmi d’autres du risque cardiovasculaire et métabolique.`
};
const pools=[window.healthQuestions,window.extraAuditedQuestions].filter(Array.isArray);
const found=[];
pools.forEach(pool=>pool.forEach(card=>{const d=details[card&&card.title];if(!d)return;card.detail=d;found.push(card.id||card.title);}));
window.MACA_PREVENTION_V2_LOT1={expected:5,matchedCount:new Set(found).size,matchedIds:[...new Set(found)]};
if(new Set(found).size!==5)console.error('[MACA Prévention V2 lot1] correspondances inattendues',found);
})();