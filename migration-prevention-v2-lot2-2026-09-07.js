/* MACA Santé — Prévention & dépistage V2 — lot 2/2.
 * Enrichissement pédagogique à fond médical constant, sans nouvel ID ni modification moteur.
 * Fiches B6 à B10 de la migration validée du 07/09/2026.
 */
(function(){
'use strict';
const details={
"J’ai 50 ans : dois-je faire une coloscopie ?":`À 50 ans, le dépistage du cancer colorectal devient un sujet important, mais cela ne signifie pas que tout le monde doit faire une coloscopie d’emblée.

En France, chez les personnes de 50 à 74 ans présentant un risque moyen de cancer colorectal et ne présentant pas de symptôme, le dépistage organisé commence par un test immunologique réalisé sur les selles. Ce test recherche une petite quantité de sang invisible à l’œil nu.

Le test est simple et peut être réalisé à domicile. Lorsqu’il est négatif, la personne poursuit le programme selon le rythme prévu. Lorsqu’il est positif, cela ne signifie pas qu’un cancer est présent. Une coloscopie est alors proposée afin d’examiner directement le côlon et le rectum et de rechercher l’origine du saignement.

La coloscopie est un examen plus complet, mais aussi plus contraignant. Elle n’est donc pas utilisée comme premier examen chez toutes les personnes à risque moyen dans le cadre du dépistage organisé.

La stratégie change lorsque le risque n’est pas celui de la population générale. Des antécédents personnels de polypes ou de cancer colorectal, certains antécédents familiaux ou certaines maladies du côlon peuvent conduire à proposer une surveillance différente, parfois avec coloscopie sans passer par le programme standard.

Enfin, le dépistage organisé concerne les personnes sans symptôme. Du sang visible dans les selles, une modification persistante du transit, une anémie inexpliquée ou d’autres symptômes ne relèvent pas d’un simple dépistage : ils nécessitent une démarche diagnostique adaptée.`,
"Diabète de type 2 : pourquoi le dépister avant d’avoir des symptômes ?":`Le diabète de type 2 peut évoluer lentement pendant plusieurs années avant de provoquer des symptômes évidents. Une personne peut donc avoir une glycémie trop élevée tout en se sentant parfaitement bien.

La maladie apparaît lorsque l’organisme utilise moins efficacement l’insuline et que, progressivement, la régulation du glucose devient insuffisante. Cette évolution étant souvent lente, le diagnostic peut être retardé si l’on attend uniquement l’apparition de symptômes.

Le dépistage vise justement à identifier une anomalie de la glycémie chez une personne qui n’a pas encore de signes particuliers. Il ne consiste pas à tester toute la population exactement de la même manière : il est proposé en fonction du contexte et des facteurs de risque.

L’intérêt d’un repérage précoce est de permettre une prise en charge avant que l’hyperglycémie ne reste durablement méconnue. La prévention et le traitement reposent ensuite sur une stratégie adaptée à la situation de la personne.

Le dépistage repose notamment sur la mesure de la glycémie. Un résultat anormal ne suffit pas toujours, à lui seul, à poser immédiatement le diagnostic : il doit être interprété et, lorsque cela est nécessaire, confirmé selon les modalités prévues.

Un point important pour cette fiche est que les critères français d’entrée dans le dépistage font l’objet d’une actualisation par la HAS en 2026. Il ne faut donc pas présenter d’anciens critères comme s’ils constituaient une nouvelle recommandation HAS 2026 définitive.

Le message essentiel reste donc simple : l’absence de symptôme n’exclut pas un diabète de type 2, ce qui explique l’intérêt d’un dépistage adapté au risque.`,
"Moustique tigre : quelles maladies peut-il transmettre en France ?":`Le moustique tigre, Aedes albopictus, s’est progressivement implanté dans une grande partie du territoire français. Sa présence ne signifie cependant pas qu’il transmet en permanence des maladies.

Pour qu’une transmission locale se produise, plusieurs étapes sont nécessaires : le moustique doit d’abord piquer une personne porteuse d’un virus transmissible, puis le virus doit pouvoir se développer dans le moustique avant qu’une nouvelle piqûre ne transmette l’infection à une autre personne.

Les principaux virus concernés sont notamment la dengue, le chikungunya et le virus Zika. La présence du moustique crée donc une possibilité de transmission, mais ne signifie pas que chaque moustique est infecté ni que ces virus circulent en permanence en France métropolitaine.

La surveillance devient particulièrement importante pendant les périodes où le moustique est actif et lorsque des voyageurs reviennent de zones où l’un de ces virus circule. Les autorités sanitaires suivent alors les cas importés et les éventuelles transmissions locales.

La prévention repose surtout sur deux axes complémentaires. Le premier est de réduire les lieux de ponte autour des habitations. Le moustique tigre peut utiliser de très petites quantités d’eau stagnante : coupelles, seaux, récipients, gouttières ou autres contenants peuvent suffire.

Le second axe est la protection contre les piqûres, particulièrement lorsqu’une circulation virale est signalée ou lors d’un séjour dans une zone à risque.

Le bon message n’est donc pas « moustique tigre = maladie », mais plutôt : sa présence rend possible certaines transmissions et justifie une surveillance et des mesures de prévention adaptées.`,
"West Nile : peut-on l’attraper en France ?":`Oui, le virus West Nile, aussi appelé virus du Nil occidental, peut circuler en France. Sa circulation est liée notamment à la saison d’activité des moustiques et peut varier selon les années et les régions.

Le cycle du virus concerne principalement les oiseaux et certains moustiques, notamment des moustiques du genre Culex. L’être humain peut être infecté lorsqu’il est piqué par un moustique porteur du virus. Il constitue généralement un hôte accidentel dans ce cycle.

La majorité des personnes infectées ne développent pas de symptôme. Lorsqu’il y en a, la présentation peut être peu spécifique. Plus rarement, des formes neurologiques graves peuvent survenir, notamment des méningites ou des encéphalites.

Le risque de forme sévère n’est pas identique pour tout le monde. Il augmente notamment avec l’âge et certaines fragilités. Cela explique pourquoi la surveillance de la circulation du virus est particulièrement importante lorsqu’une zone ou une population plus vulnérable est concernée.

Les autorités sanitaires surveillent les cas humains et la circulation du virus afin d’adapter l’information et les mesures locales. Cette surveillance est utile parce que la situation peut changer d’une saison à l’autre.

La prévention repose essentiellement sur la protection contre les piqûres de moustiques et sur la réduction des lieux favorisant leur reproduction. Lorsque des cas sont signalés, les recommandations locales des autorités sanitaires doivent être suivies.

Ainsi, le fait que le virus puisse être attrapé en France ne signifie pas qu’il circule partout ni en permanence. Le risque dépend du lieu, de la période et de la circulation observée.`,
"Fumées d’incendie : comment protéger sa santé ?":`Les fumées d’incendie ne sont pas seulement gênantes parce qu’elles réduisent la visibilité ou sentent mauvais. Elles contiennent des particules fines et différents polluants dont la composition dépend notamment de ce qui brûle.

Certaines particules sont suffisamment petites pour pénétrer profondément dans les voies respiratoires. Une exposition peut provoquer une irritation des yeux ou de la gorge, de la toux, une gêne respiratoire ou des maux de tête.

Les effets ne sont pas identiques pour tout le monde. Les personnes ayant déjà une maladie respiratoire ou cardiovasculaire peuvent être davantage gênées et certaines populations fragiles peuvent être plus sensibles aux épisodes de pollution liés aux incendies.

Lors d’un épisode important, l’objectif principal est de réduire autant que possible l’exposition. Il ne s’agit pas d’appliquer une règle unique dans toutes les situations, car la conduite à tenir dépend notamment de l’intensité de la fumée, de la durée de l’épisode et des consignes locales.

Les autorités peuvent recommander de limiter certaines activités extérieures, de fermer les ouvertures pendant les périodes les plus enfumées ou d’adapter les déplacements selon la situation. Ces recommandations doivent être suivies car elles tiennent compte des mesures locales et de l’évolution de l’incendie.

La fumée visible n’est d’ailleurs qu’une partie du problème : un air qui semble s’être éclairci peut encore contenir des particules. C’est pourquoi les informations officielles sur la qualité de l’air et les consignes locales sont utiles pour savoir quand l’exposition diminue réellement.

Le principe pratique est donc de réduire l’exposition, d’éviter les efforts inutiles dans une atmosphère très enfumée et de suivre les consignes des autorités, en particulier en cas de maladie respiratoire ou cardiovasculaire connue.`
};
const pools=[window.healthQuestions,window.extraAuditedQuestions].filter(Array.isArray);
const found=[];
pools.forEach(pool=>pool.forEach(card=>{const d=details[card&&card.title];if(!d)return;card.detail=d;found.push(card.id||card.title);}));
window.MACA_PREVENTION_V2_LOT2={expected:5,matchedCount:new Set(found).size,matchedIds:[...new Set(found)]};
if(new Set(found).size!==5)console.error('[MACA Prévention V2 lot2] correspondances inattendues',found);
})();