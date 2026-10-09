# MACASANTÉ — Question Map 51 : suivi éditorial au 09/10/2026

**STATUT : DOCUMENT DE TRAVAIL — aucune fiche médicale créée, modifiée, validée ni publiée dans ce lot.**

Test communiqué : 35 réponses, 9 orientations, 5 abstentions, 2 erreurs JSON. Aucun score par intention ni formulation originale n'a été transmis dans ce ticket. Les colonnes « fiche » sont des pistes issues du contrôle partiel du manifeste `feat/v0-magazine` et de fichiers du corpus, pas un audit exhaustif.

| ID | Intention | Fiche existante / piste à vérifier | Action éditoriale proposée | Sources à vérifier | Validation Dr BEDDOK | Retest formulation originale |
|---|---|---|---|---|---|---|
| L1-01 | MICI : activité physique | À rechercher dans corpus MICI ; fiche spécifique probable | Nouvelle fiche si aucun équivalent | ECCO; recommandations activité physique adaptées | Validé médicalement le 09/10/2026 ; intégration différée jusqu’à contrôle anti-doublon exhaustif | Non effectué |
| L1-02 | MICI : fatigue sous traitement | À rechercher : fatigue, anémie, MICI | Nouvelle fiche ou enrichissement | ECCO déficits/anémie; recommandations MICI | Validé médicalement le 09/10/2026 ; intégration différée jusqu’à contrôle anti-doublon exhaustif | Non effectué |
| L1-03 | MICI : grossesse et suivi | À rechercher : grossesse et maladies chroniques | Fiche dédiée grossesse | Global IBD Pregnancy Consensus 2025; ECCO 2023 | Validé médicalement le 09/10/2026 ; intégration différée jusqu’à contrôle anti-doublon exhaustif | Non effectué |
| L1-04 | MICI : sexualité et désir d’enfant | À rechercher : sexualité/santé; fertilité | Fiche dédiée, distincte de grossesse | ECCO 2023 | Validé médicalement le 09/10/2026 ; intégration différée jusqu’à contrôle anti-doublon exhaustif | Non effectué |
| L1-05 | Cancer : alimentation pendant traitement | À rechercher dans corpus Cancer | Fiche dédiée / enrichir si équivalent | INCa Cancer Info alimentation 2025 | Validé médicalement le 09/10/2026 ; intégration différée jusqu’à contrôle anti-doublon exhaustif | Non effectué |
| L1-06 | Cancer : droits et aides | À rechercher : accompagnement, démarches, cancer | Fiche dédiée selon recouvrement | INCa; Assurance Maladie; Service-Public | Validé médicalement le 09/10/2026 ; intégration différée jusqu’à contrôle anti-doublon exhaustif | Non effectué |
| L2-01 | Cancer : travail et reprise | maladie-chronique-travail-confidentialite | Enrichir ou relier fiche, préciser reprise post-cancer | INCa; Assurance Maladie | En attente | Non effectué |
| L2-02 | Cancer : quotidien après traitements | cancer-remission-guerison (à contrôler) | Enrichir / nouveau sous-angle si nécessaire | INCa parcours après cancer | En attente | Non effectué |
| L2-03 | Insuffisance cardiaque : activité physique | insuffisance-cardiaque-signes-aggravation | Fiche dédiée si non couverte | ESC/HFA 2021 | En attente | Non effectué |
| L2-04 | Insuffisance cardiaque : médicaments au quotidien | insuffisance-cardiaque-sel-boissons; insuffisance-cardiaque-surveillance-poids | Enrichir / fiche dédiée si besoin | ESC/HFA 2021; Ameli | En attente | Non effectué |
| L2-05 | Insuffisance cardiaque : avion | maladie-chronique-voyage | Fiche dédiée si voyage général insuffisant | ESC/HFA 2021 | En attente | Non effectué |
| L2-06 | Insuffisance cardiaque : travail | maladie-chronique-travail-confidentialite | Enrichir sur les adaptations liées au cœur | ESC/HFA; médecine du travail | En attente | Non effectué |
| L2-07 | Diabète : sport à jeun | diabete-activite-physique-glycemie | Enrichissement prioritaire, pas de doublon | ADA Standards 2026 | En attente | Non effectué |
| L2-08 | Diabète : complications et suivi | Fiches diabète existantes; rechercher rétinopathie, rein, pied | Enrichir synthèse et liens | ADA Standards 2026; HAS | En attente | Non effectué |
| L2-09 | Diabète : organiser traitement | diabete-malade-mange-moins-traitement | Enrichir / fiche quotidienne si non couverte | ADA Standards 2026; Ameli | En attente | Non effectué |
| L2-10 | Alzheimer : répit et droits aidants | alzheimer-entree-etablissement | Créer fiche aidants / relier | Pour les personnes âgées 2026; Service-Public | En attente | Non effectué |
| L2-11 | Alzheimer : consultation mémoire | À rechercher dans corpus Alzheimer | Créer si pas d'équivalent | HAS; France Alzheimer | En attente | Non effectué |
| L2-12 | Alzheimer : après diagnostic | alzheimer-rester-seul-domicile; alzheimer-entree-etablissement | Créer fiche parcours premières étapes | HAS; France Alzheimer | En attente | Non effectué |

## Blocages techniques distincts
- Retrouver les 51 formulations originales et résultats détaillés de chaque requête, afin d’attribuer précisément les statuts.
- Rechercher les 5 abstentions dans les journaux : notamment diversification alimentaire MICI, diabète/repas autour du sport, travail/confidentialité MICI et diabète/voyage déjà documentés.
- Investiguer les deux échecs de génération JSON (logs, schéma, parsing, retry contrôlé).
- Après validation, vérifier indexation de chaque fiche dans l’Assistant, puis rejouer la question **à l’identique** et consigner réponse, sources et statut.

## Règle de publication
Ne rien publier ni marquer VALIDATED avant validation explicite par le Dr Romain BEDDOK. Conserver les identifiants et URL des fiches enrichies ; pas de doublon.

## Sources pivots
- ECCO sexualité/fertilité/grossesse (2023) : https://academic.oup.com/ecco-jcc/article/17/1/1/6675338
- Global Consensus IBD Pregnancy (2025) : https://academic.oup.com/ecco-jcc/article/19/8/jjaf129/8248811
- INCa alimentation pendant traitements (2025) : https://www.cancer.fr/catalogue-des-publications/cancer-votre-alimentation-pendant-les-traitements
- ESC/HFA self-care (2021) : https://academic.oup.com/eurjhf/article/23/1/157/8377562
- Répit APA (mise à jour 2026) : https://www.pour-les-personnes-agees.gouv.fr/solutions-pour-les-aidants/soutien-financier/l-aide-au-repit-dans-le-cadre-de-l-apa

## Validation médicale Lot 1 — 09/10/2026
Le Dr Romain BEDDOK a explicitement validé les six projets de fiches (activité physique MICI ; fatigue MICI ; grossesse MICI ; sexualité et fertilité MICI ; alimentation pendant traitements anticancéreux ; droits et aides cancer). Cette validation éditoriale ne constitue PAS une preuve d’intégration, d’indexation ou de publication. Aucune modification du manifeste ou des fiches de production n’est réalisée par ce suivi.

### Audit exploratoire anti-doublon
Le fichier `backlog-audited-pqm1-lot-2026-09-19.js` contient une fiche « MICI : alimentation en poussée » qui est un sujet différent. Le fichier `backlog-audited-sexualite-sante-2026-09-28.js` contient « Cancer et sexualité », également différent. Le corpus général de travail/voyage comprend des contenus transversaux, mais ceux-ci ne répondent pas complètement aux six nouvelles intentions. Un contrôle exhaustif de tous les fichiers du manifeste et de leurs identifiants reste requis avant insertion.
