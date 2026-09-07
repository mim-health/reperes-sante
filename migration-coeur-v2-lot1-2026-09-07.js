/* MACA Santé — Cœur & circulation V2 — lot 1/3. Enrichissement pédagogique à fond constant. */
(function(){'use strict';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const updates={
[norm('Hypertension : peut-on en avoir sans le savoir ?')]:`La pression artérielle correspond à la pression exercée par le sang sur la paroi des artères. Elle varie naturellement au cours de la journée, notamment avec l’activité physique, le stress ou le repos. Une valeur élevée isolée ne suffit donc généralement pas à conclure à une hypertension.

Lorsque les chiffres sont élevés au cabinet, le diagnostic repose sur des mesures répétées. Selon la situation, une automesure à domicile ou un appareil enregistrant la pression pendant 24 heures peuvent aider à vérifier si l’élévation est durable.

Le point essentiel est que l’hypertension peut rester silencieuse très longtemps. On peut se sentir parfaitement bien sans percevoir que la pression dans les artères est trop élevée. C’est pourquoi attendre des maux de tête ou des vertiges n’est pas une méthode fiable de dépistage.

Lorsqu’elle persiste pendant des années, une pression trop élevée favorise progressivement les maladies des artères et augmente notamment le risque d’AVC, de maladie cardiovasculaire et d’atteinte rénale.

Une fois l’hypertension diagnostiquée, la prise en charge dépend de la situation globale. Les mesures concernant l’alimentation, le sel, l’activité physique, le poids, l’alcool ou le tabac ont leur place lorsqu’elles sont pertinentes. Un ou plusieurs médicaments peuvent également être nécessaires.

La mesure de la tension permet donc de rendre visible un facteur de risque souvent silencieux, tout en évitant l’erreur inverse : considérer qu’une seule mesure élevée signifie automatiquement que l’on est hypertendu.`,
[norm('J’ai une douleur dans la poitrine : est-ce forcément le cœur ?')]:`La poitrine contient plusieurs structures capables de provoquer une douleur : muscles et côtes, œsophage, poumons, cœur et gros vaisseaux. Deux douleurs ressenties au même endroit peuvent donc avoir des causes très différentes.

Certaines caractéristiques peuvent orienter l’évaluation. Une douleur apparaissant à l’effort, une sensation d’oppression ou une douleur irradiant vers le bras, la mâchoire ou le dos peuvent par exemple faire évoquer une origine cardiovasculaire. Mais aucune description ne permet à elle seule d’écarter un problème cardiaque.

Un infarctus ne provoque pas toujours la douleur « typique » que l’on imagine. Les symptômes peuvent être moins caractéristiques, notamment chez certaines personnes âgées, diabétiques ou chez les femmes. À l’inverse, une douleur impressionnante n’est pas nécessairement cardiaque.

Le contexte est donc essentiel : âge, facteurs de risque cardiovasculaire, circonstances d’apparition, durée et symptômes associés. L’évaluation ne repose pas sur un seul signe mais sur l’ensemble de ces éléments.

La bonne question n’est donc pas seulement « est-ce que cela ressemble au cœur ? », mais aussi : cette douleur est-elle nouvelle, brutale, inhabituelle ou persistante, et existe-t-il des signes associés ? Lorsque ces éléments font craindre une urgence, il ne faut pas attendre pour demander une évaluation.`,
[norm('Voyage long : comment réduire le risque de thrombose ?')]:`Le sang des jambes doit remonter vers le cœur malgré la pesanteur. Les mouvements des muscles du mollet participent activement à cette remontée. Lorsque l’on marche ou que l’on mobilise les jambes, les muscles contribuent à faire progresser le sang dans les veines.

Lors d’un trajet prolongé, rester assis et immobile pendant plusieurs heures réduit cette aide musculaire. Le sang circule alors plus lentement dans les veines, ce qui fait partie des éléments pouvant favoriser une thrombose veineuse profonde.

Le risque n’est pas propre à l’avion. Un long trajet en voiture, en train ou en autocar peut également être concerné : c’est surtout l’immobilité prolongée qui compte.

Chez la plupart des voyageurs, le risque reste faible. Il augmente surtout lorsqu’il existe déjà d’autres facteurs de risque, par exemple un antécédent personnel de thrombose, une chirurgie récente, un cancer actif ou certaines situations médicales particulières.

Les mesures simples visent donc surtout à éviter l’immobilité complète : bouger régulièrement les chevilles et les jambes et se lever périodiquement lorsque les conditions le permettent.

Chez une personne à risque plus élevé, la question d’une compression ou d’un traitement préventif peut se poser, mais elle doit être individualisée. Aspirine ou anticoagulant ne doivent pas être pris de sa propre initiative uniquement parce qu’un voyage est long.`,
[norm('Je sens mon cœur battre fort ou irrégulièrement : que sont les palpitations ?')]:`Normalement, nous ne ressentons pas en permanence chaque battement du cœur. Lors de palpitations, les battements deviennent soudain perceptibles : cœur qui bat fort, vite, de manière irrégulière ou impression qu’un battement « saute ».

Cette sensation est fréquente et ne signifie pas automatiquement qu’il existe une maladie cardiaque. Stress, émotion, effort, manque de sommeil ou certains excitants peuvent la favoriser sans qu’il y ait d’arythmie.

D’autres situations peuvent accélérer le cœur, par exemple une fièvre, une anémie ou un problème thyroïdien. Dans ces cas, la palpitation peut être la conséquence d’un autre phénomène. Enfin, certaines palpitations correspondent effectivement à un trouble du rythme.

La description de la sensation apporte des informations utiles mais ne permet donc pas toujours d’identifier la cause à elle seule.

Lorsque cela est nécessaire, l’électrocardiogramme enregistre l’activité électrique du cœur. Si les épisodes sont intermittents et absents au moment de l’examen, un enregistrement plus prolongé peut être proposé afin d’essayer de capturer le rythme au moment des symptômes.

La distinction importante est la suivante : une palpitation est un symptôme ressenti, tandis qu’une arythmie est une anomalie objectivable du rythme cardiaque. On peut ressentir des palpitations sans arythmie, et certaines arythmies peuvent au contraire passer inaperçues.`,
[norm('AVC : quels signes doivent alerter et comment réduire le risque après 50 ans ?')]:`Un AVC survient lorsqu’une partie du cerveau n’est plus correctement alimentée en sang ou lorsqu’un vaisseau se rompt. La majorité des AVC sont liés à l’obstruction d’une artère cérébrale ; d’autres sont provoqués par une hémorragie.

Dans les deux situations, certaines cellules cérébrales peuvent être endommagées rapidement. C’est pourquoi le temps est essentiel : certains traitements ne peuvent être proposés que dans des conditions précises et leur efficacité dépend notamment de la rapidité de la prise en charge.

Les signes d’alerte apparaissent brutalement. Les plus connus sont un visage qui se déforme, une faiblesse ou paralysie soudaine d’un bras ou d’un côté du corps et un trouble brutal de la parole.

Un épisode très bref ne doit pas rassurer à tort. Des symptômes neurologiques qui disparaissent peuvent correspondre à un accident ischémique transitoire et nécessitent également une évaluation urgente.

Après 50 ans, le risque augmente, mais l’âge n’est qu’un facteur parmi d’autres. L’hypertension joue un rôle majeur. Le tabac, le diabète, le cholestérol et certains troubles du rythme, notamment la fibrillation atriale, participent également au risque.

La prévention consiste donc à agir sur l’ensemble de ces facteurs lorsqu’ils existent. Devant l’apparition brutale d’un visage asymétrique, d’une faiblesse d’un bras ou d’un trouble de la parole, il ne faut pas attendre pour voir si cela passe.`};
const pools=[window.healthQuestions,window.extraAuditedQuestions].filter(Array.isArray);const found=[];pools.forEach(pool=>pool.forEach(card=>{const d=card&&updates[norm(card.title)];if(d){card.detail=d;found.push(card.id);}}));window.MACA_COEUR_V2_LOT1={expected:5,matchedIds:[...new Set(found)],matchedCount:new Set(found).size};if(new Set(found).size!==5)console.error('[MACA Cœur V2 lot1]',found);})();