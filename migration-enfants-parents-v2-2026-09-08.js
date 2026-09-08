// MACA Santé — migration éditoriale V2 Enfants & parents — 08/09/2026
// Enrichissement exclusivement : IDs, URLs, réponses courtes, vigilance, sources et métadonnées existantes sont conservés.
// Les doublons historiques restent gérés par le corpus canonique ; cette migration enrichit les fiches effectivement présentes.
(function(){
  const cards=[...(window.healthQuestions||[]),...(window.extraAuditedQuestions||[])];
  const byId=(id)=>cards.filter(q=>q&&q.id===id);
  const set=(id,detail)=>byId(id).forEach(q=>q.detail=detail);

set('fievre-enfant',`La fièvre est une réaction fréquente de l’organisme, le plus souvent au cours d’une infection. Chez l’enfant, le chiffre du thermomètre ne suffit pas à dire si la situation est grave. L’âge, le comportement, la respiration, la capacité à boire et l’évolution sont souvent plus importants que le niveau exact de température.

Chez un nourrisson de moins de 3 mois, une fièvre nécessite une évaluation médicale rapide, car les infections potentiellement sérieuses peuvent se manifester de façon peu spectaculaire. Chez l’enfant plus grand, on observe surtout son état général : reste-t-il éveillé et réactif ? Boit-il ? Urine-t-il normalement ? Respire-t-il sans difficulté ? Retrouve-t-il des moments où il joue ou interagit lorsque la température baisse ?

Le but du traitement n’est pas de normaliser à tout prix la température, mais d’améliorer le confort de l’enfant. Il faut proposer régulièrement à boire, éviter de trop le couvrir et maintenir une température ambiante confortable. Le paracétamol peut être utilisé lorsque la fièvre est mal tolérée, à une dose adaptée au poids et en respectant les intervalles de prise. Il faut vérifier qu’un autre médicament donné en parallèle ne contient pas déjà du paracétamol. Les bains froids ou les méthodes visant à refroidir brutalement l’enfant ne sont pas utiles.

La durée compte également. Une fièvre qui persiste plusieurs jours, réapparaît après une amélioration ou s’accompagne de nouveaux symptômes mérite une réévaluation. Certaines situations demandent une attention particulière : maladie chronique importante, déficit immunitaire, traitement immunosuppresseur ou enfant très jeune.

Les signes associés priment toujours sur le thermomètre. Une difficulté respiratoire, un enfant difficile à réveiller, qui ne boit presque plus, urine très peu, présente une raideur inhabituelle, des taches violacées qui ne s’effacent pas à la pression, une convulsion ou une altération nette de son état général nécessitent une évaluation rapide. À l’inverse, une température élevée chez un enfant plus grand qui reste bien réactif et boit correctement n’a pas la même signification. L’essentiel est donc de surveiller l’enfant, pas seulement sa température.`);

set('diarrhee-enfant',`La diarrhée aiguë de l’enfant est le plus souvent liée à une infection digestive virale. Le principal risque, surtout chez le nourrisson et le jeune enfant, n’est pas le nombre de selles en lui-même mais la perte d’eau et de sels minéraux pouvant conduire à une déshydratation.

La priorité est donc de maintenir l’hydratation. Chez le nourrisson ou le jeune enfant, une solution de réhydratation orale (SRO) est la boisson de référence lorsqu’il existe des pertes digestives importantes. Sa composition est précisément adaptée pour permettre l’absorption de l’eau et des électrolytes. Elle doit être préparée conformément aux instructions. L’eau seule, les sodas, jus ou préparations maison ne remplacent pas une SRO lorsqu’une réhydratation est nécessaire.

Il est généralement possible de poursuivre l’alimentation habituelle selon la tolérance de l’enfant. Chez un bébé allaité, l’allaitement peut être poursuivi. Il n’est pas nécessaire d’imposer un jeûne prolongé. Lorsque l’enfant vomit également, proposer de petites quantités très régulièrement peut être mieux toléré qu’un grand volume d’un seul coup.

La surveillance porte surtout sur l’état général et les signes d’hydratation : fréquence des urines ou nombre de couches mouillées, bouche sèche, absence de larmes, yeux creux, fatigue inhabituelle, somnolence, comportement moins réactif. Le poids, lorsqu’il est connu récemment, peut aussi aider à apprécier l’importance des pertes chez le nourrisson.

Les médicaments antidiarrhéiques ne doivent pas être utilisés chez l’enfant comme chez l’adulte sans vérifier qu’ils sont adaptés à l’âge et à la situation. La majorité des gastro-entérites guérissent spontanément avec une hydratation correcte.

Une évaluation médicale rapide est nécessaire si l’enfant ne parvient plus à boire, vomit tout ce qu’il prend, urine très peu, devient inhabituellement somnolent ou peu réactif, ou présente des signes de déshydratation. Du sang dans les selles, une douleur abdominale importante, une forte altération de l’état général ou une diarrhée chez un très jeune nourrisson doivent également conduire à demander un avis. Chez l’enfant, l’évolution clinique compte davantage que le simple nombre de selles.`);

set('bebe-tete-moins',`Un nourrisson peut parfois boire ou téter un peu moins pendant quelques heures : fatigue, nez bouché, changement de rythme ou petite infection peuvent modifier transitoirement les prises. Ce qui compte est de distinguer cette variation passagère d’une baisse franche et persistante des apports.

Chez un bébé, l’alimentation est étroitement liée à l’hydratation et à l’état général. Il faut donc regarder l’ensemble de la situation : âge du nourrisson, quantité ou durée habituelle des prises, nombre de couches mouillées, éveil, couleur, respiration et présence éventuelle de fièvre, vomissements ou diarrhée. Un bébé qui prend un peu moins mais reste tonique, se réveille normalement et continue à uriner n’est pas dans la même situation qu’un nourrisson qui refuse plusieurs prises et devient somnolent.

Un nez très encombré peut gêner la tétée ou le biberon, car les jeunes nourrissons respirent principalement par le nez. Un lavage nasal au sérum physiologique avant les repas peut alors faciliter les prises. Il peut aussi être utile de proposer des prises plus petites et plus fréquentes si le bébé se fatigue rapidement, sans forcer.

Le nombre de millilitres ne doit pas être interprété isolément, notamment chez un bébé allaité où la quantité ingérée n’est pas directement mesurable. Les signes indirects — déglutition, satisfaction après la tétée, urines, évolution du poids et comportement — sont plus informatifs. Une difficulté durable d’alimentation ou une croissance insuffisante mérite une évaluation afin d’en rechercher la cause.

Chez un nourrisson très jeune, la marge de sécurité est plus faible : une diminution nette des prises peut être un signe précoce d’infection ou de difficulté respiratoire. Il faut demander rapidement un avis si le bébé refuse plusieurs prises, boit nettement moins qu’habituellement, urine beaucoup moins, devient difficile à réveiller, paraît très abattu, présente une gêne respiratoire, une coloration inhabituelle ou de la fièvre avant 3 mois. L’objectif n’est pas de surveiller chaque variation de quantité, mais de repérer un changement réel du comportement alimentaire associé à d’autres signes.`);

set('toux-enfant',`La toux est un réflexe de défense des voies respiratoires. Chez l’enfant, elle accompagne très souvent un rhume ou une autre infection virale et peut persister quelque temps après la disparition des autres symptômes. Sa présence seule ne signifie donc pas qu’un antibiotique ou un traitement antitussif est nécessaire.

Pour apprécier une toux, il faut surtout regarder comment l’enfant respire entre les épisodes. Une respiration calme, sans creusement entre les côtes, sans battement important des ailes du nez et avec un enfant qui parle, joue et boit normalement est plutôt rassurante. À l’inverse, une respiration rapide ou laborieuse, un enfant qui s’épuise ou des lèvres bleutées sont des signes beaucoup plus importants que le caractère impressionnant de la toux.

L’âge et le contexte orientent aussi. Chez un nourrisson, une infection respiratoire peut rapidement gêner l’alimentation. Chez un enfant plus grand, des épisodes répétés de toux nocturne, à l’effort, au rire ou associés à des sifflements peuvent faire rechercher un asthme. Une toux apparue brutalement pendant un repas ou un jeu avec de petits objets doit faire évoquer l’inhalation d’un corps étranger.

Dans un rhume banal, dégager le nez avec du sérum physiologique chez le jeune enfant et proposer régulièrement à boire sont des mesures simples. Il faut éviter l’automédication avec des sirops ou médicaments non adaptés à l’âge. Le miel peut apaiser certaines toux chez l’enfant de plus d’un an, mais ne doit jamais être donné avant l’âge d’un an en raison du risque de botulisme infantile.

La durée doit être prise en compte : une toux qui s’améliore progressivement après une infection n’a pas la même signification qu’une toux qui persiste, s’aggrave ou revient régulièrement. Un avis médical est utile dans ces situations.

Une difficulté respiratoire, un creusement marqué entre les côtes, une coloration bleutée, des pauses respiratoires, une grande somnolence ou une altération importante de l’état général nécessitent une évaluation rapide. Chez le très jeune nourrisson, une toux associée à une baisse nette des prises ou à une gêne respiratoire mérite également une attention particulière.`);

set('vomissements-enfant',`Les vomissements sont fréquents chez l’enfant et peuvent accompagner une gastro-entérite, une autre infection, une migraine ou de nombreuses situations digestives. Chez le nourrisson, il faut aussi distinguer les régurgitations habituelles — souvent sans effort — de véritables vomissements. L’enjeu principal est d’évaluer l’état général et la capacité de l’enfant à rester hydraté.

Lorsqu’un enfant vomit, il est souvent préférable de proposer de petites quantités de liquide très fréquemment plutôt qu’un grand verre d’un seul coup. En cas de gastro-entérite chez le nourrisson ou le jeune enfant, une solution de réhydratation orale est particulièrement adaptée. Si elle est tolérée, l’alimentation peut ensuite être reprise ou poursuivie progressivement selon l’appétit ; un jeûne prolongé n’est généralement pas nécessaire.

La surveillance porte sur les urines, la bouche, les larmes, l’éveil et le comportement. Un enfant qui continue à boire par petites quantités, urine et retrouve des périodes d’activité est plus rassurant qu’un enfant qui vomit toutes les prises et devient très fatigué. Les médicaments contre les vomissements ne doivent pas être donnés systématiquement sans avis adapté à l’âge et à la cause probable.

L’aspect des vomissements apporte des informations importantes. Un vomissement vert, correspondant à de la bile, n’est pas un symptôme banal chez l’enfant et nécessite une évaluation rapide. La présence de sang doit également conduire à demander un avis. Des vomissements en jet répétés chez un très jeune nourrisson, surtout avec mauvaise prise de poids, ont une signification particulière.

Une douleur abdominale intense ou localisée, un ventre très distendu, une céphalée inhabituelle, une raideur de nuque, un traumatisme crânien récent ou une altération neurologique changent également le niveau d’urgence.

Il faut faire évaluer rapidement un enfant qui ne parvient plus à garder les liquides, urine très peu, devient somnolent ou peu réactif, présente des vomissements verts ou sanglants, une douleur importante ou des signes de déshydratation. L’objectif est moins de stopper immédiatement tout vomissement que de s’assurer que l’enfant reste hydraté et qu’aucun signe n’évoque une cause nécessitant une prise en charge spécifique.`);

set('rash-enfant',`Une éruption cutanée chez l’enfant peut avoir de nombreuses causes : infection virale, irritation, eczéma, réaction allergique, piqûres ou maladie infectieuse particulière. L’aspect des boutons est utile, mais il ne permet pas toujours à lui seul de poser un diagnostic. Le contexte et surtout l’état général de l’enfant sont essentiels.

Il faut observer la vitesse d’apparition, la localisation, l’existence de démangeaisons ou de douleur, la présence de fièvre et les autres symptômes. Une éruption apparue progressivement chez un enfant qui reste en forme n’a pas la même signification qu’une éruption très rapide associée à un malaise ou à une difficulté respiratoire.

Un geste simple peut aider à repérer certaines lésions préoccupantes : lorsqu’on appuie sur une rougeur avec un doigt ou un verre transparent, la plupart des rougeurs inflammatoires pâlissent momentanément. Des petites taches rouges ou violacées qui ne s’effacent pas à la pression peuvent correspondre à un purpura. Associées à de la fièvre ou à une altération de l’état général, elles nécessitent une évaluation urgente.

Une réaction allergique peut provoquer de l’urticaire, avec des plaques en relief qui démangent et changent souvent de place. Une urticaire isolée n’est pas forcément grave. En revanche, gonflement des lèvres ou de la langue, voix modifiée, gêne respiratoire, malaise ou symptômes rapidement généralisés peuvent évoquer une réaction allergique sévère et nécessitent une prise en charge urgente.

Il faut également tenir compte des médicaments récemment commencés, des aliments nouveaux, des contacts infectieux et du statut vaccinal. Certaines maladies virales de l’enfant donnent des éruptions caractéristiques, mais leur identification dépend de l’ensemble des signes.

En l’absence de signe d’alarme, photographier l’éruption au début puis surveiller son évolution peut être utile pour une consultation ultérieure. Une éruption qui persiste, s’étend, devient douloureuse ou s’accompagne d’une fièvre durable mérite un avis médical. Une éruption violacée ne s’effaçant pas à la pression avec enfant abattu, ou toute éruption associée à une difficulté respiratoire ou un malaise, doit être évaluée sans délai.`);

set('sommeil-bebe',`Le sommeil du nourrisson se construit progressivement. Les nouveau-nés n’ont pas encore le rythme jour-nuit d’un adulte et leurs cycles sont courts. Les réveils nocturnes et le besoin d’aide pour s’endormir sont donc fréquents au début de la vie. Il n’existe pas un âge précis auquel tous les bébés devraient savoir s’endormir seuls.

Avec les mois, des repères réguliers peuvent aider : différencier progressivement le jour et la nuit, instaurer une routine calme avant le coucher et coucher le bébé lorsqu’il montre des signes de fatigue. La régularité est généralement plus utile que des méthodes rigides. Les capacités d’endormissement autonome apparaissent à des rythmes différents selon les enfants et les familles.

La sécurité du sommeil reste prioritaire. Pour dormir, le nourrisson doit être couché sur le dos, à plat, sur un matelas ferme dans un lit dégagé, sans oreiller, couette, tour de lit, cale-bébé ni objet mou susceptible d’entraver sa respiration. Les recommandations de prévention de la mort inattendue du nourrisson priment sur les astuces destinées à prolonger le sommeil.

Les réveils ne sont pas tous liés à une « mauvaise habitude ». Faim chez le jeune nourrisson, poussées développementales, inconfort, maladie, chaleur ou changements de rythme peuvent modifier temporairement le sommeil. Avant de chercher à supprimer tous les réveils, il faut tenir compte de l’âge et du développement de l’enfant.

Le sommeil devient un sujet médical lorsqu’il existe des signes associés : ronflements très importants avec pauses respiratoires, respiration difficile la nuit, mauvaise prise de poids, douleur, reflux compliqué ou épisodes inhabituels. L’épuisement parental est également un motif légitime pour en parler : des conseils adaptés peuvent être utiles sans culpabiliser les parents ni imposer une méthode unique.

Un bébé qui ne s’endort pas seul n’est donc pas, en soi, anormal. Le but est d’accompagner progressivement l’acquisition de rythmes compatibles avec son développement, tout en protégeant la sécurité du couchage et l’équilibre familial.`);

set('ecrans-petit',`Les premières années de vie sont une période où le développement repose surtout sur les interactions réelles : regarder un visage, entendre une voix, manipuler des objets, bouger, jouer et explorer. C’est pourquoi les repères français recommandent d’éviter l’exposition aux écrans avant 3 ans, y compris lorsqu’un écran fonctionne en bruit de fond.

Le problème n’est pas qu’un écran serait toxique en lui-même dès qu’il est allumé. Le risque principal est ce qu’il remplace : échanges avec l’adulte, langage, jeu libre, activité physique et sommeil. Même une télévision que personne ne regarde peut détourner l’attention et diminuer la qualité des interactions dans la pièce.

Entre 3 et 6 ans, l’usage peut être introduit de façon occasionnelle, dans un cadre défini et accompagné par un adulte. Regarder ensemble permet de commenter ce qui est vu et de relier l’écran à la vie réelle. À cet âge, laisser un jeune enfant seul avec des contenus enchaînés automatiquement ou utiliser systématiquement l’écran pour les repas, l’endormissement ou chaque moment d’ennui favorise une place excessive du numérique dans la journée.

Le moment d’utilisation compte également. Les écrans avant le coucher peuvent retarder l’endormissement et concurrencer les routines favorables au sommeil. Les repas et les temps d’échange familial sont de bonnes occasions de garder des périodes sans écran. L’exemple donné par les adultes compte aussi : un téléphone constamment consulté peut interrompre les interactions même lorsque l’enfant lui-même ne regarde pas d’écran.

Il n’est pas nécessaire de culpabiliser une famille pour une exposition ponctuelle. L’objectif est de regarder les habitudes globales et de retrouver des temps quotidiens de jeu, lecture, conversation, sorties et activité physique. Si l’écran devient indispensable pour calmer l’enfant, occupe une grande partie de la journée, perturbe le sommeil ou remplace nettement les interactions, il est utile de revoir progressivement l’organisation familiale.

Le repère « pas d’écran avant 3 ans » est donc surtout un outil simple pour protéger une période essentielle du développement, et non une frontière après laquelle l’usage deviendrait sans limite.`);

set('etat-general-nourrisson',`Chez un nourrisson, l’état général est souvent plus informatif qu’un symptôme isolé. Un bébé ne peut pas expliquer ce qu’il ressent et certaines maladies se manifestent d’abord par un changement de comportement : il tète moins, dort beaucoup plus, réagit moins, pleure différemment ou paraît inhabituellement calme et abattu.

Les parents connaissent le comportement habituel de leur enfant. Un changement net mérite donc d’être pris au sérieux, surtout chez un bébé très jeune. Il faut observer l’éveil : se réveille-t-il pour manger ? suit-il du regard ? réagit-il au contact et à la voix ? Son tonus paraît-il habituel ? Il faut également regarder sa respiration, sa couleur et ses prises alimentaires.

L’hydratation est un autre repère. Une diminution importante des couches mouillées, une bouche sèche ou un bébé qui ne parvient plus à boire suffisamment peuvent annoncer une déshydratation. Une infection respiratoire peut aussi se révéler par des prises plus courtes parce que le nourrisson se fatigue en respirant.

La température doit être interprétée avec l’âge. Chez un nourrisson de moins de 3 mois, une fièvre nécessite une évaluation médicale rapide. À l’inverse, l’absence de forte fièvre ne suffit pas à rassurer si le bébé est très peu réactif ou respire mal.

Certains changements transitoires peuvent être bénins : journée plus fatigante, rythme inhabituel ou petit encombrement nasal. Ce qui alerte est surtout l’association ou la persistance de plusieurs signes et la différence franche avec le comportement habituel.

Un nourrisson difficile à réveiller, très hypotonique, qui réagit peu aux stimulations, ne boit presque plus, respire difficilement, devient très pâle ou bleuté ou présente une fièvre avant 3 mois doit être évalué sans délai. Chez un jeune bébé, il vaut mieux faire vérifier un changement important que d’attendre l’apparition d’un signe plus spectaculaire. La vigilance parentale sur « il n’est vraiment pas comme d’habitude » constitue une information clinique utile.`);

set('difficulte-respiratoire-enfant',`Reconnaître une difficulté respiratoire chez l’enfant consiste surtout à regarder l’effort nécessaire pour respirer. Une toux ou un nez bouché peuvent être impressionnants sans que la respiration soit réellement en difficulté. À l’inverse, un enfant peut peu tousser mais fournir un effort important pour faire entrer l’air.

Observez d’abord la fréquence et le travail respiratoire au repos. Un creusement marqué entre les côtes, sous les côtes ou au-dessus du sternum, un battement des ailes du nez chez le nourrisson ou une respiration manifestement laborieuse sont des signes importants. L’enfant peut également avoir du mal à parler en phrases, à boire ou à manger parce qu’il doit reprendre son souffle.

Les bruits respiratoires donnent parfois une orientation : un sifflement expiratoire peut accompagner une obstruction bronchique, notamment dans l’asthme ; un bruit aigu à l’inspiration peut évoquer une obstruction plus haute. Mais l’absence de bruit ne permet pas d’exclure une gêne sévère. Un enfant qui s’épuise peut au contraire devenir moins bruyant.

Chez le nourrisson, les prises alimentaires constituent un excellent indicateur fonctionnel. S’il doit interrompre fréquemment la tétée ou le biberon pour respirer, boit nettement moins ou se fatigue, une évaluation est nécessaire. Il faut également observer la couleur des lèvres et la vigilance.

Une gêne apparue brutalement pendant un repas ou alors que l’enfant jouait avec un petit objet doit faire penser à l’inhalation d’un corps étranger. Le contexte est alors très différent d’une infection respiratoire progressive.

Une coloration bleutée des lèvres, des pauses respiratoires, des troubles de la vigilance, un épuisement, une difficulté respiratoire importante ou un début brutal après un étouffement imposent une prise en charge urgente. Chez le nourrisson, une respiration difficile associée à une baisse importante des prises doit également être évaluée rapidement. Le meilleur repère pour les parents est donc moins le bruit de la toux que l’effort visible pour respirer et son retentissement sur le comportement.`);

set('deshydratation-enfant',`Les enfants, et particulièrement les nourrissons, peuvent se déshydrater plus rapidement que les adultes lorsqu’ils perdent de l’eau par diarrhée, vomissements ou forte fièvre. Le risque dépend de l’importance des pertes, de l’âge et de la capacité à continuer à boire.

Le premier repère est souvent la diminution des urines. Chez un bébé, les couches sont nettement moins mouillées ; chez un enfant plus grand, les passages aux toilettes deviennent rares. Une bouche sèche, l’absence de larmes lorsqu’il pleure, des yeux creux, une fatigue inhabituelle ou une irritabilité peuvent accompagner la déshydratation. Lorsque celle-ci devient importante, l’enfant peut être somnolent ou moins réactif.

En cas de gastro-entérite, la solution de réhydratation orale est conçue pour remplacer à la fois l’eau et les sels perdus. Elle doit être préparée exactement comme indiqué. Il vaut mieux en proposer de petites quantités très fréquemment, notamment si l’enfant vomit. Les sodas, jus, boissons sportives ou recettes maison n’ont pas la même composition et ne constituent pas une alternative équivalente chez un jeune enfant déshydraté.

L’allaitement peut être poursuivi. Lorsque l’enfant recommence à tolérer les liquides, l’alimentation habituelle est généralement reprise selon son appétit. Le but n’est pas de faire boire un grand volume d’un coup, mais d’obtenir des apports réguliers supérieurs aux pertes.

Chez un nourrisson, une perte de poids rapide peut refléter une perte d’eau importante. Si un poids récent est connu, cette information peut être utile au professionnel qui évalue l’enfant.

Il faut demander rapidement un avis si l’enfant ne parvient plus à boire, vomit de façon répétée toutes les prises, urine très peu, devient inhabituellement somnolent ou peu réactif, ou si son état général se dégrade. Un très jeune nourrisson, un enfant ayant une maladie chronique importante ou des pertes digestives très abondantes mérite une vigilance accrue. La prévention repose surtout sur une réhydratation précoce et adaptée, avant que les signes sévères n’apparaissent.`);

set('rhume-nez-bouche-enfant',`Le rhume, ou rhinopharyngite, est extrêmement fréquent chez l’enfant, surtout lorsqu’il fréquente une collectivité. Il est généralement viral et guérit spontanément. Un nez bouché, un écoulement nasal, une petite fièvre et une toux peuvent se succéder pendant plusieurs jours sans qu’un antibiotique soit nécessaire.

Chez le nourrisson et le jeune enfant, le geste le plus utile est souvent le lavage du nez avec du sérum physiologique. Un nez dégagé facilite la respiration, les repas et le sommeil. Le lavage peut être réalisé notamment avant les prises alimentaires et le coucher, avec une technique adaptée à l’âge. Il n’est pas nécessaire de chercher à supprimer totalement l’écoulement : celui-ci participe à l’élimination des sécrétions.

Les médicaments décongestionnants vasoconstricteurs ne sont pas des traitements banals du rhume de l’enfant et ne doivent pas être utilisés en automédication. Les antibiotiques n’agissent pas sur les virus et ne raccourcissent pas une rhinopharyngite simple. Une coloration jaune ou verte des sécrétions au cours de l’évolution ne signifie pas, à elle seule, qu’un antibiotique est nécessaire.

Il faut surtout surveiller la respiration et l’alimentation. Un nourrisson très encombré peut boire moins parce qu’il doit interrompre la tétée ou le biberon pour respirer. Proposer les prises après un lavage nasal peut aider. L’hydratation et un environnement sans fumée sont également importants.

Un rhume peut parfois se compliquer d’une otite ou s’accompagner d’autres infections respiratoires. Une fièvre qui persiste ou réapparaît, une douleur d’oreille importante ou une évolution qui s’aggrave au lieu de s’améliorer mérite une réévaluation.

Il faut consulter rapidement si l’enfant respire difficilement, devient inhabituellement somnolent ou peu réactif, boit nettement moins, présente des signes de déshydratation ou si un nourrisson de moins de 3 mois a de la fièvre. Pour la majorité des rhumes, cependant, le temps, les lavages de nez et la surveillance sont les principaux éléments de la prise en charge.`);

set('douleur-oreille-enfant',`Une douleur d’oreille chez l’enfant n’est pas toujours une otite moyenne aiguë. Elle peut être liée au conduit auditif, à un bouchon, à une irritation, à une douleur provenant de la gorge ou des dents, ou effectivement à une infection derrière le tympan. Le diagnostic d’otite nécessite donc d’examiner l’oreille et le tympan.

Les otites moyennes surviennent souvent après un rhume. Chez le jeune enfant, la douleur peut se manifester par des pleurs, une irritabilité ou un sommeil perturbé. Toucher son oreille n’est pas un signe suffisamment spécifique pour confirmer le diagnostic. La fièvre peut être présente ou absente.

Toutes les otites ne nécessitent pas un antibiotique. Lorsqu’une otite moyenne aiguë purulente est confirmée, la décision dépend notamment de l’âge, de l’intensité des symptômes et de l’examen. Certaines situations peuvent être surveillées, tandis que d’autres justifient une antibiothérapie. Cette distinction explique pourquoi il vaut mieux éviter d’utiliser un antibiotique restant d’une ancienne prescription.

Le soulagement de la douleur est important. Le paracétamol est généralement l’antalgique de première intention lorsqu’il est adapté à l’enfant et utilisé à la bonne dose. Les anti-inflammatoires non stéroïdiens nécessitent davantage de précautions dans certains contextes infectieux ou de déshydratation.

Un écoulement par l’oreille peut correspondre à une perforation du tympan ou à une atteinte du conduit et mérite un examen. Une douleur persistante ou qui s’aggrave malgré les mesures antalgiques doit également être réévaluée.

Chez un nourrisson de moins de 3 mois avec fièvre, ou chez tout enfant présentant une altération importante de l’état général, une difficulté respiratoire, une somnolence inhabituelle ou des signes qui s’aggravent, l’évaluation doit être rapide. Une douleur derrière l’oreille avec gonflement ou décollement du pavillon est également inhabituelle. L’essentiel est donc de traiter la douleur et de confirmer le diagnostic avant de conclure qu’un antibiotique est nécessaire.`);

set('constipation-enfant',`La constipation de l’enfant ne se définit pas uniquement par le nombre de selles. Elle associe souvent des selles dures ou volumineuses, difficiles ou douloureuses à évacuer, parfois avec une tendance de l’enfant à se retenir. Certains enfants peuvent même avoir des fuites de selles dans les sous-vêtements autour d’un amas de selles retenues.

Chez le nourrisson allaité, des selles espacées peuvent être normales si elles restent molles, que le bébé mange bien et grandit normalement. À l’inverse, des selles quotidiennes très dures peuvent correspondre à une constipation. L’aspect et la difficulté d’évacuation comptent donc davantage que la fréquence seule.

La constipation fonctionnelle est fréquente. Un épisode douloureux peut pousser l’enfant à se retenir ; cette rétention rend les selles encore plus dures et entretient un cercle vicieux. Des habitudes régulières aux toilettes, sans pression ni punition, sont importantes. Chez l’enfant assez grand, s’asseoir quelques minutes après les repas avec les pieds bien appuyés peut favoriser le réflexe naturel de défécation.

L’alimentation doit apporter des fibres adaptées à l’âge — fruits, légumes, légumineuses, céréales complètes — et une hydratation suffisante. Mais une constipation installée ne se corrige pas toujours par l’alimentation seule. Des laxatifs osmotiques comme le macrogol peuvent être utilisés chez l’enfant lorsqu’ils sont prescrits ou conseillés de façon adaptée à l’âge et à la situation ; le traitement peut parfois devoir être poursuivi suffisamment longtemps pour rompre le cycle de rétention.

Il faut éviter de culpabiliser l’enfant ou de considérer les fuites comme volontaires. Une constipation chronique peut distendre le rectum et diminuer temporairement la sensation du besoin.

Une constipation apparue dès les premières semaines de vie, associée à un ventre très distendu, des vomissements répétés, une mauvaise croissance, une fièvre, une douleur abdominale importante ou d’autres signes inhabituels nécessite une évaluation. Du sang peut parfois provenir d’une fissure liée aux selles dures, mais des saignements répétés doivent être discutés. Chez la majorité des enfants, une prise en charge régulière et suffisamment prolongée permet de retrouver progressivement un transit confortable.`);

set('regurgitations-nourrisson',`Les régurgitations sont très fréquentes au cours des premiers mois. Elles correspondent à la remontée sans effort d’une petite quantité de lait après le repas, favorisée par l’immaturité du système digestif du nourrisson. Chez un bébé qui mange avec plaisir, reste confortable et prend normalement du poids, elles sont le plus souvent physiologiques et diminuent progressivement avec la croissance.

Il faut distinguer régurgitation et vomissement. Une régurgitation s’écoule généralement sans effort important ; un vomissement s’accompagne d’une contraction et peut être plus abondant. Cette distinction aide à repérer les situations qui nécessitent une évaluation.

Des mesures simples peuvent limiter l’inconfort : éviter de suralimenter le bébé, respecter son rythme, faire des pauses si nécessaire et le garder un moment en position verticale après le repas lorsqu’il est éveillé. En revanche, les règles de couchage sûr ne doivent pas être modifiées pour traiter un reflux : pour dormir, le nourrisson doit rester couché à plat sur le dos, sur un matelas ferme, sans dispositif de surélévation ou de positionnement.

Les médicaments qui diminuent l’acidité gastrique, notamment les inhibiteurs de la pompe à protons, ne réduisent pas de simples régurgitations physiologiques et ne doivent pas être utilisés systématiquement. Ils peuvent être indiqués dans certaines situations spécifiques évaluées médicalement, mais le fait qu’un bébé régurgite beaucoup ne suffit pas à les justifier.

Ce qui compte est le retentissement. Une bonne croissance, un bébé tonique et des prises alimentaires satisfaisantes sont rassurants. À l’inverse, refus de s’alimenter, douleurs importantes répétées, cassure de la courbe de poids ou difficultés respiratoires nécessitent un avis.

Des vomissements verts, sanglants ou franchement en jet, surtout s’ils se répètent, ne correspondent pas à de simples régurgitations et doivent être évalués rapidement. Il en va de même en cas de malaise ou d’altération de l’état général. Pour la majorité des nourrissons, cependant, les régurgitations sont une étape transitoire du développement digestif plutôt qu’une maladie à traiter.`);

set('mal-gorge-enfant',`Un mal de gorge chez l’enfant est très souvent lié à une infection virale. Une angine peut également être provoquée par le streptocoque du groupe A, mais l’aspect de la gorge et la fièvre ne permettent pas toujours de distinguer de façon fiable une origine virale d’une origine bactérienne.

Chez l’enfant de 3 ans ou plus lorsqu’une angine est suspectée, un test rapide d’orientation diagnostique peut rechercher le streptocoque A. S’il est négatif, un antibiotique n’est généralement pas indiqué. S’il est positif, une antibiothérapie adaptée peut être proposée. Avant 3 ans, les angines à streptocoque A sont rares et le test n’est habituellement pas recommandé en routine.

L’objectif est d’éviter deux excès : donner des antibiotiques à toutes les angines, ce qui est inutile contre les virus et favorise l’antibiorésistance, ou négliger une situation qui nécessite un traitement spécifique. L’examen et, lorsqu’il est indiqué, le test rapide permettent de choisir.

Pour soulager l’enfant, il faut surtout maintenir l’hydratation et traiter la douleur ou la fièvre mal tolérée avec un médicament adapté, généralement le paracétamol lorsqu’il n’existe pas de contre-indication. Les aliments frais ou faciles à avaler peuvent être mieux tolérés. Il ne faut pas utiliser un antibiotique restant d’une prescription précédente.

Certains signes orientent vers d’autres diagnostics : toux et nez qui coule accompagnent fréquemment une infection virale ; une éruption peut avoir différentes causes et doit être interprétée avec l’ensemble des symptômes.

Une difficulté à respirer, une impossibilité ou grande difficulté à avaler, une salivation inhabituelle, un enfant qui ne boit plus, une somnolence importante ou des signes de déshydratation nécessitent une évaluation rapide. Une forte fièvre persistante, une aggravation ou une douleur très asymétrique méritent également un avis médical. La bonne question n’est donc pas « angine égale antibiotique ? », mais « y a-t-il des arguments pour une infection bactérienne qui justifie un traitement ? »`);

set('oeil-rouge-enfant',`Un œil rouge ou qui coule chez l’enfant peut avoir plusieurs causes. Les conjonctivites virales sont fréquentes et peuvent accompagner un rhume ; les formes bactériennes donnent souvent des sécrétions plus épaisses et des paupières collées ; les allergies provoquent volontiers démangeaisons, larmoiement et atteinte des deux yeux. Une irritation ou un corps étranger sont également possibles.

Dans une conjonctivite simple, un nettoyage doux avec du sérum physiologique et une bonne hygiène des mains sont utiles. Il faut éviter de partager serviettes et gants de toilette lorsqu’une origine infectieuse est possible. L’aspect des sécrétions aide à orienter, mais ne permet pas toujours de décider seul qu’un antibiotique local est nécessaire.

La douleur et la vision sont des éléments essentiels. Une conjonctivite banale provoque surtout une gêne, des picotements ou des démangeaisons. Une douleur oculaire importante, une baisse de vision ou une forte gêne à la lumière font rechercher une atteinte plus profonde de l’œil et nécessitent un avis rapide.

Le contexte compte aussi : traumatisme, projection chimique, corps étranger, port de lentilles chez l’adolescent ou gonflement important autour de l’œil modifient la conduite à tenir. En cas de projection d’un produit chimique, le rinçage immédiat et abondant de l’œil est prioritaire avant l’évaluation médicale.

Chez un nourrisson, un œil qui coule de façon chronique peut également être lié à un canal lacrymal encore étroit ; l’interprétation dépend alors de l’âge et de l’aspect de l’œil.

Il faut consulter rapidement en cas de douleur importante, baisse de vision, photophobie marquée, traumatisme ou projection chimique. Chez un enfant de moins de 2 ans présentant un œil rouge avec écoulement purulent, une consultation dans la journée est recommandée. Un gonflement important des paupières avec fièvre ou altération de l’état général doit également être évalué rapidement.`);

set('saignement-nez-enfant',`Les saignements de nez sont fréquents chez l’enfant. Ils proviennent le plus souvent de petits vaisseaux situés à l’avant de la cloison nasale, fragilisés par un rhume, un air sec, le grattage du nez ou de petits traumatismes. Leur aspect peut être impressionnant alors que la quantité de sang perdue est généralement faible.

Le geste essentiel est simple : asseoir l’enfant, le pencher légèrement vers l’avant et pincer fermement la partie souple du nez entre deux doigts pendant environ dix minutes, sans relâcher toutes les trente secondes pour vérifier. L’enfant respire par la bouche. Pencher la tête en arrière est déconseillé car cela fait couler le sang vers la gorge sans arrêter réellement le saignement.

Après l’arrêt, il vaut mieux éviter pendant quelques heures de se moucher fortement, de gratter le nez ou de pratiquer un effort intense susceptible de faire reprendre le saignement. Lorsque les épisodes sont favorisés par une muqueuse très sèche, des mesures locales d’humidification peuvent être discutées.

Des épistaxis répétées ne signifient pas automatiquement qu’il existe un trouble de la coagulation. Elles peuvent simplement être liées à une zone fragile du nez. Cependant, si elles sont très fréquentes, difficiles à arrêter ou associées à d’autres saignements inhabituels ou à de nombreux bleus, un avis médical est utile.

Un corps étranger dans le nez peut parfois provoquer un écoulement ou des saignements répétés d’un seul côté chez le jeune enfant. Il ne faut pas tenter des manœuvres profondes avec une pince ou un coton-tige.

Une évaluation urgente est nécessaire si le saignement reste abondant malgré une compression correctement réalisée, si l’enfant devient pâle, faible ou fait un malaise, ou si l’épisode survient après un traumatisme important. Une maladie connue de la coagulation ou un traitement modifiant la coagulation justifient également une vigilance particulière. Dans la grande majorité des cas, toutefois, une compression bien faite suffit.`);

set('intoxication-produit-menager-enfant',`Lorsqu’un enfant avale ou lèche un produit ménager, le risque dépend entièrement du produit, de sa concentration, de la quantité et de l’âge de l’enfant. Un produit apparemment banal peut être irritant ou corrosif ; à l’inverse, une très petite exposition à certains produits peut rester sans conséquence. Il ne faut donc pas essayer d’évaluer le risque uniquement à partir de l’état immédiat de l’enfant.

Le premier réflexe est de retirer le produit de sa portée et de conserver l’emballage. Il faut identifier précisément le nom commercial, la composition si elle est disponible, la quantité potentiellement ingérée et l’heure de l’exposition. Ces informations permettent au centre antipoison de donner une conduite adaptée.

Il ne faut pas faire vomir l’enfant. Le produit pourrait repasser dans l’œsophage et aggraver les lésions ou être inhalé dans les poumons. Il ne faut pas non plus donner systématiquement de lait, d’eau ou tenter de « neutraliser » un produit acide avec une base ou inversement : ces gestes peuvent être inutiles ou dangereux selon la substance.

Même si l’enfant semble aller bien, contacter rapidement un centre antipoison permet de déterminer si une simple surveillance suffit ou si une évaluation médicale est nécessaire. Il faut préparer l’âge et le poids de l’enfant, les symptômes éventuels et les informations figurant sur le flacon.

Certaines ingestions ont des règles particulières. Une pile bouton avalée constitue une urgence en raison du risque de brûlure rapide de l’œsophage et nécessite une prise en charge spécifique. Les capsules de lessive concentrée, produits caustiques, solvants et autres substances concentrées peuvent également exposer à des complications importantes.

En cas de trouble de conscience, difficulté respiratoire, convulsion, malaise ou symptôme sévère, il faut contacter les secours en urgence. Si le produit a également été projeté sur la peau ou dans les yeux, un rinçage abondant peut être nécessaire selon la situation. La règle générale est donc : ne pas improviser de traitement domestique, conserver le produit et obtenir rapidement un avis toxicologique adapté.`);

set('boiterie-enfant',`Une boiterie chez l’enfant a de nombreuses causes et son interprétation dépend beaucoup de l’âge. La première étape est souvent très simple : regarder le pied, les chaussures et rechercher une ampoule, une écharde, une plaie, un ongle douloureux ou un petit traumatisme. Chez les jeunes enfants, un choc ou une petite fracture peut parfois être passé inaperçu.

Il faut ensuite préciser le début : brutal ou progressif ? Y a-t-il eu une chute ? L’enfant se plaint-il d’une douleur précise ? Refuse-t-il complètement de poser le pied ou marche-t-il simplement différemment ? La douleur ressentie au genou peut parfois provenir de la hanche, ce qui explique que l’examen porte sur l’ensemble du membre inférieur.

Entre environ 3 et 8 ans, une boiterie brutale sans fièvre après une infection virale peut correspondre à une synovite aiguë transitoire de hanche, souvent appelée « rhume de hanche ». Elle évolue généralement favorablement, mais ce diagnostic ne doit pas être utilisé pour banaliser une boiterie accompagnée de fièvre ou d’un enfant très douloureux.

L’association boiterie et fièvre est en effet un signal important, car une infection osseuse ou articulaire doit notamment être éliminée. Une articulation rouge, chaude ou gonflée, un refus total d’appui ou une douleur très importante nécessitent également une évaluation rapide.

Une boiterie progressive ou persistante peut avoir d’autres causes orthopédiques, inflammatoires ou plus rarement générales. Une douleur nocturne répétée, une fatigue inhabituelle, une perte de poids ou d’autres symptômes doivent être signalés au médecin.

Il n’est donc pas nécessaire de réaliser des examens pour toute boiterie très brève après un petit choc identifiable, mais l’évolution doit être surveillée. Une boiterie qui persiste, s’aggrave ou récidive mérite un examen. Chez l’enfant, l’âge, la fièvre, la capacité d’appui et l’état général sont les quatre repères les plus utiles pour distinguer une situation banale d’une situation nécessitant une évaluation rapide.`);

set('poux-enfant-traitement',`Les poux de tête sont fréquents chez les enfants et ne sont pas un signe de mauvaise hygiène. Ils se transmettent principalement par contact direct entre les cheveux. Avant de traiter, il faut vérifier qu’il existe réellement des poux vivants : la présence de petites particules dans les cheveux ne correspond pas toujours à des lentes.

Lorsqu’une infestation est confirmée, un produit anti-poux adapté à l’âge peut être utilisé en respectant exactement la notice : quantité, durée d’application et éventuelle seconde application. Cette deuxième application est souvent importante pour éliminer les poux issus d’œufs ayant survécu au premier traitement. Le peigne fin complète la prise en charge en retirant poux et lentes.

Il faut examiner les personnes vivant sous le même toit ou ayant eu des contacts rapprochés, mais traiter uniquement celles chez qui des poux sont retrouvés. Les traitements préventifs systématiques n’ont pas démontré leur intérêt et exposent inutilement aux produits.

La gestion de l’environnement doit rester proportionnée. Les objets ayant eu un contact récent avec la tête — taies d’oreiller, bonnets, écharpes — peuvent être lavés selon les recommandations du produit ou isolés temporairement si nécessaire. Une désinfection complète du logement, des meubles ou des sols est inutile : le pou survit mal longtemps loin du cuir chevelu.

L’échec d’un traitement peut être lié à une mauvaise application, à l’absence de seconde application lorsqu’elle est nécessaire, à une nouvelle contamination ou à une résistance. Dans ce cas, mieux vaut demander conseil au pharmacien ou au médecin plutôt que multiplier les applications du même produit.

Les poux n’imposent généralement pas une éviction scolaire. Prévenir la collectivité permet cependant aux autres familles de vérifier les cheveux et limite les recontaminations. Les démangeaisons peuvent persister quelques jours après un traitement efficace et ne prouvent pas à elles seules qu’il reste des poux. Le critère principal de succès est l’absence de pou vivant lors d’un contrôle soigneux.`);

set('diversification-alimentaire-bebe',`La diversification alimentaire correspond à l’introduction progressive d’aliments autres que le lait. Les repères français situent son début entre 4 et 6 mois révolus, en tenant compte du développement du bébé, tout en poursuivant le lait maternel ou infantile qui reste un élément central de l’alimentation pendant cette période.

Il n’est pas nécessaire d’introduire les aliments dans un ordre rigide. L’objectif est de faire découvrir progressivement différentes familles d’aliments et saveurs, avec des textures adaptées aux capacités de l’enfant. Les légumes, fruits, féculents, aliments riches en protéines et matières grasses adaptées trouvent progressivement leur place selon l’âge et les recommandations du carnet de santé.

Les textures évoluent également. Rester trop longtemps uniquement sur des purées parfaitement lisses n’est pas nécessaire lorsque le développement permet d’aller vers des textures plus épaisses puis des petits morceaux adaptés. Cette progression participe à l’apprentissage oral et alimentaire. Elle doit toutefois respecter les capacités de l’enfant et les règles de prévention de l’étouffement.

Les recommandations actuelles ne conseillent plus de retarder systématiquement les aliments potentiellement allergisants au-delà de 6 mois, y compris lorsqu’il existe un terrain familial allergique. Leur introduction se fait dans le cadre de la diversification, sous une forme adaptée et sûre. Dans certaines situations particulières, notamment eczéma sévère ou allergie déjà connue, un avis médical peut être utile pour organiser l’introduction.

Le sel et les produits très sucrés ne sont pas nécessaires pour habituer un bébé à manger. Les boissons sucrées ne remplacent pas l’eau. Le miel ne doit pas être donné avant l’âge d’un an en raison du risque de botulisme infantile. Les aliments présentant un risque d’étouffement doivent être adaptés ou évités selon l’âge.

La diversification n’est pas une course aux quantités. Au début, quelques cuillères peuvent suffire : le bébé apprend des goûts, des textures et de nouvelles façons de manger. Il est utile de respecter les signes de faim et de satiété plutôt que de forcer. En cas de difficulté importante d’alimentation, de réaction allergique ou de croissance insuffisante, un avis professionnel permet d’adapter les conseils.`);

})();
