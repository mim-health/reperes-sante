/* MACA Santé — capitalisation éditoriale du 20/09/2026 à partir de l'édition du 19/09.
 * Décisions validées : café/cœur = CRÉER ; TDAH adulte = ACTUALISER/ÉLARGIR ;
 * HTA = FUSIONNER avec le patrimoine existant ; couverture vaccinale = ACTUALISER/FUSIONNER.
 * Aucun changement du moteur ni des seuils.
 */
(function(){
'use strict';
const cards=window.extraAuditedQuestions||(window.extraAuditedQuestions=[]);
const byId=id=>cards.find(x=>x&&x.id===id);

if(!byId('cafe-coeur-cafeine')){
 cards.push({
  id:'cafe-coeur-cafeine',category:'Cœur & circulation',
  title:'Café et cœur : est-ce mauvais pour la santé cardiovasculaire ?',
  keywords:'café cafe caféine caffeine cœur cardiovasculaire tension hypertension arythmie fibrillation atriale palpitations boisson énergisante energy drink',
  answer:"Pas de façon générale. Les données actuelles ne permettent pas de classer le café comme « mauvais pour le cœur ». Une déclaration scientifique récente de l’American Heart Association souligne que les effets dépendent de la source et de la quantité de caféine ainsi que du terrain. Chez la majorité des adultes qui consomment déjà du café ou du thé caféiné, une consommation modérée de caféine naturellement présente ne semble pas nocive pour le système cardiovasculaire. Cela ne signifie pas qu’il faille commencer à boire du café pour protéger son cœur, ni que café, caféine concentrée et boissons énergisantes soient équivalents.",
  detail:"Le mot « caféine » regroupe des situations très différentes. Une tasse de café ou de thé apporte de la caféine au sein d’une boisson complexe, alors que certaines boissons énergisantes ou produits concentrés peuvent apporter des doses élevées rapidement. C’est l’une des raisons pour lesquelles il est trompeur de résumer la question par « le café est bon » ou « le café est mauvais » pour le cœur.\n\nLa déclaration scientifique de l’American Heart Association publiée en 2026 insiste sur plusieurs dimensions : la quantité consommée, la source de la caféine et les différences individuelles de métabolisme. Certaines personnes ressentent palpitations, nervosité ou troubles du sommeil à des doses que d’autres tolèrent bien.\n\nLa pression artérielle peut augmenter transitoirement après une prise de caféine, surtout chez les personnes peu habituées. Cela ne signifie pas qu’une consommation habituelle modérée provoque automatiquement une hypertension chronique. Les données observationnelles disponibles sur le café et le thé sont globalement rassurantes, mais elles ne suffisent pas à recommander de commencer à en consommer dans un objectif cardiovasculaire.\n\nConcernant le rythme cardiaque, l’idée selon laquelle toute personne ayant des palpitations ou une fibrillation atriale devrait supprimer systématiquement le café n’est pas étayée de façon simple. Un essai randomisé publié dans JAMA a même montré que, chez des personnes atteintes de fibrillation atriale, la stratégie de consommation de café caféiné étudiée n’augmentait pas les récidives par rapport à l’abstinence. Cela ne transforme pas le café en traitement et ne signifie pas que chacun le tolère de la même façon.\n\nLes boissons énergisantes constituent un cas différent. Leur teneur en caféine, leur mode de consommation et parfois leur association à d’autres stimulants ou à l’alcool justifient davantage de prudence.\n\nLe message pratique est donc de raisonner en quantité, en source et en tolérance individuelle. Une consommation habituelle modérée de café n’a pas à être considérée automatiquement comme dangereuse pour le cœur, mais augmenter volontairement sa consommation pour obtenir un bénéfice cardiovasculaire n’est pas recommandé.",
  watch:"Des palpitations importantes, un malaise, une douleur thoracique ou un essoufflement inhabituel nécessitent une évaluation médicale et ne doivent pas être attribués automatiquement au café. Une personne qui constate de façon reproductible que la caféine déclenche des symptômes peut réduire ses apports et en parler avec un professionnel de santé.",
  source:'American Heart Association · JAMA',
  sources:[
   {label:'JAMA — Caffeine and Cardiovascular Health: What the Science Says, 18 septembre 2026',url:'https://jamanetwork.com/journals/jama/fullarticle/2854422'},
   {label:'JAMA — DECAF randomized clinical trial',url:'https://jamanetwork.com/journals/jama/fullarticle/2841253'}
  ],
  url:'https://jamanetwork.com/journals/jama/fullarticle/2854422',
  verifiedAt:'20/09/2026',nextAuditAt:'20/12/2026',auditIntervalMonths:3,validationStatus:'VALIDATED',
  evidenceStatus:'VALIDÉ — capitalisation éditoriale MACA 20/09/2026 ; déclaration scientifique AHA relayée par JAMA + essai randomisé DECAF'
 });
}

const tdah=byId('sante-mentale-tdah-criteres-traitement');
if(tdah){
 tdah.title='TDAH : comment le diagnostic est-il posé chez l’enfant ou l’adulte ?';
 tdah.keywords=(tdah.keywords||'')+' adulte TDAH adulte diagnostic adulte attention travail organisation oubli';
 tdah.answer="Être distrait, agité ou avoir du mal à se concentrer ne suffit pas pour avoir un TDAH, chez l’enfant comme chez l’adulte. Le diagnostic repose sur des symptômes persistants d’inattention et/ou d’hyperactivité-impulsivité, présents depuis l’enfance, retrouvés dans plusieurs contextes et responsables d’un retentissement réel. Chez l’adulte, sommeil insuffisant, anxiété, dépression, consommation de substances ou d’autres situations peuvent produire des symptômes proches. Aucun questionnaire, bilan neuropsychologique, examen biologique ou IRM ne confirme à lui seul le diagnostic.";
 tdah.detail="Le TDAH est un trouble du neurodéveloppement : même lorsqu’il est identifié à l’âge adulte, l’évaluation recherche donc une histoire compatible avec des symptômes ayant débuté pendant l’enfance. Le fait qu’une personne se sente aujourd’hui distraite, oublieuse ou désorganisée ne suffit pas à établir le diagnostic.\n\nChez l’adulte, la demande d’évaluation a augmenté. Une mise au point publiée dans JAMA en septembre 2026 souligne le rôle croissant des soins primaires et l’importance d’une démarche diagnostique structurée. Les manifestations peuvent être moins visibles que l’hyperactivité typiquement associée à l’enfance : difficultés d’organisation, gestion du temps, oublis répétés, impulsivité ou difficulté à maintenir l’attention peuvent être au premier plan.\n\nL’évaluation cherche surtout à savoir si les symptômes sont persistants, s’ils existaient déjà plus tôt dans la vie et s’ils ont un retentissement dans plusieurs domaines : études, travail, organisation quotidienne, relations ou vie familiale. Lorsque cela est possible, l’histoire scolaire et les informations de proches peuvent aider à reconstruire cette trajectoire.\n\nIl faut aussi rechercher d’autres explications. Manque chronique de sommeil, anxiété, dépression, consommation d’alcool ou d’autres substances, certains médicaments et d’autres troubles psychiatriques ou médicaux peuvent provoquer ou aggraver des difficultés d’attention. Plusieurs situations peuvent également coexister avec un véritable TDAH.\n\nLes questionnaires standardisés peuvent soutenir l’entretien mais ne constituent pas un diagnostic à eux seuls. Il n’existe pas non plus de prise de sang, d’IRM ou de test neuropsychologique unique permettant de confirmer le TDAH.\n\nChez l’enfant et l’adolescent, les recommandations françaises HAS encadrent précisément le diagnostic et la prise en charge. Chez l’adulte, la même exigence de diagnostic clinique structuré et de recherche des diagnostics différentiels est essentielle. La stratégie thérapeutique dépend ensuite du retentissement, des troubles associés et du contexte de la personne ; elle ne se résume pas à la prescription d’un médicament.";
 tdah.watch="Une difficulté récente de concentration n’est pas automatiquement un TDAH. Un questionnaire positif ne suffit pas au diagnostic. Chez l’adulte, il faut notamment rechercher le sommeil, l’anxiété, la dépression, les substances et l’histoire des symptômes depuis l’enfance avant de conclure.";
 tdah.source='HAS · JAMA';
 tdah.sources=[
  {label:'HAS — TDAH : diagnostic et interventions thérapeutiques chez l’enfant et l’adolescent',url:'https://www.has-sante.fr/jcms/p_3302482/fr/trouble-du-neurodeveloppement/tdah-diagnostic-et-interventions-therapeutiques-aupres-des-enfants-et-adolescents'},
  {label:'JAMA — As More Adults Seek ADHD Care, Primary Care Clinicians Are Tasked With Getting the Diagnosis Right, 18 septembre 2026',url:'https://jamanetwork.com/journals/jama/fullarticle/2854423'}
 ];
 tdah.url='https://jamanetwork.com/journals/jama/fullarticle/2854423';
 tdah.verifiedAt='20/09/2026'; tdah.nextAuditAt='20/12/2026';
 tdah.evidenceStatus='VALIDÉ — fiche existante élargie à l’adulte ; HAS + mise au point JAMA 18/09/2026';
}

const vacc=byId('vaccins-adulte');
if(vacc){
 vacc.keywords=(vacc.keywords||'')+' couverture vaccinale couverture vaccination population taux vacciné';
 vacc.detail="Le calendrier vaccinal indique quels vaccins sont recommandés selon l’âge et certaines situations. La couverture vaccinale répond à une autre question : quelle proportion de la population concernée est effectivement vaccinée ? Les deux notions sont complémentaires mais ne doivent pas être confondues.\n\nSanté publique France publie chaque année un bilan des couvertures vaccinales. Le bilan publié en avril 2026, portant sur 2025, montre par exemple des couvertures supérieures à 95 % à 24 mois pour plusieurs vaccinations du nourrisson. Ces chiffres décrivent une population : ils ne permettent pas de savoir si une personne donnée est à jour.\n\nPour un adulte, la démarche pratique reste donc de vérifier son propre carnet et de le comparer au calendrier vaccinal en vigueur. Les recommandations varient avec l’âge, les antécédents, les maladies chroniques, la grossesse, le métier, les voyages et certaines situations d’exposition.\n\nUne couverture élevée dans la population ne dispense pas de vérifier sa situation personnelle. À l’inverse, un taux de couverture insuffisant constitue un indicateur de santé publique et peut conduire les autorités sanitaires à renforcer certaines campagnes de prévention.";
 vacc.source='Ministère de la Santé · HAS · Santé publique France';
 vacc.sources=[
  {label:'Ministère de la Santé — Calendrier vaccinal',url:'https://sante.gouv.fr/prevention-en-sante/preserver-sa-sante/vaccination/calendrier-vaccinal'},
  {label:'Santé publique France — Données de couverture vaccinale',url:'https://www.santepubliquefrance.fr/vaccination/donnees'},
  {label:'Santé publique France — Bilan de la couverture vaccinale 2025',url:'https://www.santepubliquefrance.fr/vaccination/bulletin-national/vaccination-des-enfants-adolescents-et-jeunes-adultes-en-france-bilan-de-la-couverture-vaccinale-en'}
 ];
 vacc.verifiedAt='20/09/2026';
 vacc.evidenceStatus='VALIDÉ — fiche existante enrichie avec la notion de couverture vaccinale ; calendrier 2026 + bilan SPF 2025 publié en 2026';
}

// HTA : pas de doublon créé. Le sujet récent tension/démence est déjà capitalisé dans
// backlog-audited-hta-demence-esc-2026-09-15.js ; la fiche HTA générale reste canonique.
})();