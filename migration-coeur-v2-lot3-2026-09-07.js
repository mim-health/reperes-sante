/* MACA Santé — Cœur & circulation V2 — lot 3/3. Enrichissement pédagogique à fond constant. */
(function(){'use strict';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const updates={
[norm('J’ai des varices : qu’est-ce que cela signifie ?')]:`Le sang qui arrive dans les jambes doit ensuite remonter vers le cœur malgré la pesanteur. Cette remontée dépend notamment des mouvements musculaires, surtout ceux du mollet, qui participent à propulser le sang dans les veines.

Les veines possèdent également des valvules. Leur rôle est de limiter le reflux du sang vers le bas. Lorsque certaines valvules ne fonctionnent plus correctement, une partie du sang peut refluer dans le réseau veineux superficiel.

Ce reflux augmente la pression dans certaines veines superficielles. Avec le temps, elles peuvent se dilater, devenir tortueuses et former des varices visibles sous la peau.

Toutes les varices ne se ressemblent pas et ne provoquent pas les mêmes conséquences. Chez certaines personnes, elles sont principalement visibles. Chez d’autres, elles s’accompagnent de lourdeurs, de douleurs, de gonflement ou de démangeaisons.

Lorsque la maladie veineuse évolue, des modifications de la peau peuvent également apparaître et certaines complications sont possibles. La présence d’une veine dilatée ne permet donc pas, à elle seule, de résumer la gravité ou la conduite à tenir.

Le réseau veineux superficiel est en outre plus complexe que ce que l’on voit à la surface de la jambe. Deux personnes ayant des varices assez semblables visuellement peuvent avoir des reflux et une anatomie veineuse différents.

C’est pour cela que toutes les varices ne doivent pas être traitées de la même façon, et que toutes ne nécessitent pas nécessairement un traitement. La décision dépend notamment des symptômes, de l’examen clinique, de l’existence éventuelle de complications et, lorsqu’un traitement est envisagé, de l’anatomie du réseau veineux.`,
[norm('À quoi sert l’écho-Doppler quand on a des varices ?')]:`Ce que l’on voit à la surface d’une jambe ne représente qu’une partie du réseau veineux. Une varice visible peut dépendre d’une veine située ailleurs dans le réseau superficiel et responsable d’un reflux.

L’écho-Doppler associe deux informations complémentaires. L’échographie montre l’anatomie des veines : leur trajet, leur diamètre et leurs rapports. Le Doppler permet d’étudier le déplacement du sang et son sens de circulation.

Dans une maladie veineuse, l’examen permet ainsi de rechercher les zones où le sang reflue au lieu de remonter normalement vers le cœur. Il aide à comprendre quelles veines participent réellement au problème observé.

Cette cartographie est particulièrement importante lorsqu’un traitement est envisagé. Le choix d’une technique ne dépend pas uniquement de la veine visible sur la peau, mais du circuit veineux qui l’alimente.

Deux personnes présentant extérieurement des varices assez semblables peuvent donc avoir des écho-Doppler très différents. La stratégie thérapeutique doit tenir compte de cette anatomie et des reflux identifiés.

L’écho-Doppler permet aussi de préparer le traitement en identifiant précisément les veines concernées. Il ne s’agit donc pas seulement d’un examen destiné à confirmer que « ce sont bien des varices », mais d’un outil de compréhension et de cartographie du réseau veineux.

Il n’est pas nécessaire dans toutes les situations esthétiques simples impliquant de très petites veines visibles. En revanche, il occupe une place centrale dans l’évaluation d’une maladie veineuse et avant de nombreux traitements des varices.`,
[norm('Les bas de compression font-ils disparaître les varices ?')]:`La compression médicale exerce une pression contrôlée sur la jambe. Son objectif est d’aider le retour veineux et de limiter la stagnation du sang et des liquides dans les membres inférieurs.

Elle existe sous plusieurs formes — chaussettes, bas ou collants — et avec différents niveaux de compression. Le modèle et le niveau utilisés doivent être adaptés à la situation.

Chez certaines personnes ayant une maladie veineuse, la compression peut améliorer des symptômes comme les lourdeurs, les douleurs ou certains œdèmes. Elle agit donc sur les conséquences fonctionnelles du mauvais retour veineux.

En revanche, une veine superficielle déjà devenue variqueuse ne retrouve pas une anatomie normale simplement parce qu’une compression est portée. Le bas ne fait pas disparaître mécaniquement la veine dilatée.

Cette distinction permet de comprendre pourquoi on peut se sentir mieux avec une compression tout en continuant à voir les varices. L’amélioration des symptômes et la disparition anatomique d’une varice sont deux objectifs différents.

Lorsqu’il existe une indication à traiter une veine variqueuse elle-même, d’autres techniques peuvent être proposées. Le choix dépend notamment de l’anatomie veineuse, des symptômes et du résultat de l’écho-Doppler.

Les bas de compression ne sont donc ni inutiles ni un traitement qui ferait disparaître les varices. Leur rôle est différent : ils contribuent à traiter certaines manifestations de la maladie veineuse et à améliorer le retour veineux dans des situations adaptées.`,
[norm('Laser, radiofréquence, sclérose : comment traite-t-on les varices aujourd’hui ?')]:`Le traitement moderne des varices commence par comprendre l’anatomie du réseau veineux. L’objectif n’est pas simplement de faire disparaître ce qui est visible sur la peau, mais d’identifier les veines responsables du reflux.

L’écho-Doppler joue donc un rôle central avant de nombreux traitements. Il permet de cartographier les veines, de repérer les reflux et d’aider à choisir la technique adaptée.

Lorsque certaines veines saphènes présentent un reflux, des techniques endoveineuses thermiques peuvent être utilisées. Une fibre ou un cathéter est introduit dans la veine et la chaleur produite par laser ou radiofréquence entraîne sa fermeture depuis l’intérieur.

La sclérothérapie repose sur un principe différent : un produit est injecté dans la veine afin d’entraîner sa fermeture. Selon la situation, elle peut être utilisée pour différents types de veines.

Ces techniques ont réduit la place de la chirurgie dans de nombreuses situations, mais la chirurgie n’a pas disparu. Elle conserve des indications lorsque l’anatomie veineuse, le trajet des veines ou d’autres caractéristiques rendent cette option pertinente.

Le choix dépend donc du type de veine, de son diamètre, de son trajet, des symptômes, des antécédents et du résultat de l’écho-Doppler. Il n’existe pas une technique qui serait systématiquement « la meilleure » pour toutes les varices.

Une même personne peut parfois bénéficier de plusieurs techniques complémentaires, parce que toutes les veines responsables du problème n’ont pas nécessairement la même anatomie.

La logique est donc d’identifier d’abord le problème veineux puis de choisir la ou les techniques capables de le traiter de la façon la plus adaptée.`,
[norm('Palpitations : quand faut-il consulter ?')]:`La question importante n’est pas uniquement de savoir si le cœur semble battre vite. Lorsqu’une personne décrit des palpitations, il faut essayer de comprendre ce qui se produit pendant l’épisode et dans quelles circonstances il survient.

Le médecin s’intéresse notamment à la façon dont les palpitations commencent et s’arrêtent, à leur durée, à leur fréquence et à leur caractère régulier ou irrégulier. Il cherche également à savoir si elles apparaissent au repos, à l’effort, après un excitant, dans un contexte de stress ou sans déclencheur évident.

Les symptômes associés comptent beaucoup. Des palpitations isolées, brèves et occasionnelles n’ont pas la même signification que des épisodes accompagnés d’un malaise, d’une perte de connaissance, d’une douleur thoracique ou d’un essoufflement important.

La consultation permet aussi de rechercher des causes qui ne sont pas directement liées à une maladie du rythme cardiaque. Une fièvre, une anémie, un problème thyroïdien, le manque de sommeil ou certains excitants peuvent favoriser une accélération ou une perception plus forte du cœur.

Lorsque cela est nécessaire, un électrocardiogramme enregistre l’activité électrique du cœur. Si les palpitations sont intermittentes et absentes au moment de l’examen, un enregistrement plus prolongé peut être proposé pour tenter de capturer le rythme pendant un épisode.

Le but est de distinguer une sensation sans anomalie rythmique d’une véritable arythmie et, lorsqu’une arythmie existe, d’en préciser la nature.

Un avis médical devient donc particulièrement utile lorsque les épisodes se répètent, durent, surviennent sans explication évidente ou s’accompagnent d’autres symptômes. L’urgence dépend surtout des signes associés et de la tolérance de l’épisode, pas uniquement de la sensation que le cœur bat vite.`};
const pools=[window.healthQuestions,window.extraAuditedQuestions].filter(Array.isArray);const found=[];pools.forEach(pool=>pool.forEach(card=>{const d=card&&updates[norm(card.title)];if(d){card.detail=d;found.push(card.id);}}));window.MACA_COEUR_V2_LOT3={expected:5,matchedIds:[...new Set(found)],matchedCount:new Set(found).size};if(new Set(found).size!==5)console.error('[MACA Cœur V2 lot3]',found);})();