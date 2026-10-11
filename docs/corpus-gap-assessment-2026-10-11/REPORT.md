# Évaluation préliminaire des trous du corpus MACASANTÉ — 11 octobre 2026

## Résultat

Le corpus comporte 377 fiches de référence et 17 documents du Mag dans l’export examiné. Les parcours Alzheimer, diabète et insuffisance cardiaque disposent déjà de plusieurs réponses pratiques : les traiter comme totalement absents serait une erreur.

Cette première revue retient **30 questions candidates : 10 sans fiche dédiée repérée et 20 couvertes partiellement**, ainsi que **53 fiches sans champ « Pour mieux comprendre » renseigné**. Ce n’est ni un décompte exhaustif de tous les besoins santé ni une mesure globale de couverture. Une fiche courte peut être pertinente ; elle doit être examinée selon sa question, pas allongée artificiellement.

## Méthode et limites

Périmètre : export `assistant-v2/corpus.json`, empreinte `f18e9123988d3026c15a57ca85c2f4e497606b892c6d171693168b80a4eb322c`, sélection des 377 IDs correspondant aux fiches individuelles générées.

Tous les titres ont été parcourus. Des recherches ciblées dans les textes ont vérifié notamment hypoglycémie, HbA1c, dénutrition, fausse route, escarre, directives anticipées, travail de nuit, BPCO, automesure et anticoagulants. Une mention ne prouve pas une réponse complète ; une absence de mot ne prouve pas l’absence de toute information équivalente. La lecture intégrale des fiches proches et un essai de recherche/Assistant sont nécessaires avant de confirmer chaque trou.

Pas de nouveau test live de retrouvabilité ni de nouvelle revue de littérature dans cette évaluation. Les priorités ci-dessous sont un choix éditorial proposé à partir des cibles commerciales exprimées et de l’utilité pratique présumée ; elles ne reposent pas sur des volumes GSC ou des demandes mesurées d’acheteurs. Aucun contenu médical n’a été modifié.

## Où compléter en premier

| Parcours | Base déjà présente | Manques ou approfondissements proposés |
|---|---|---|
| Seniors, aidants et EHPAD | Alzheimer quotidien, autonomie, aides, chutes, fragilité, polymédication | Déglutition/fausses routes, nutrition des repas, escarres, retour d’hospitalisation ; adaptation à l’EHPAD et fatigue de l’aidant à approfondir |
| Santé au travail | Stress, burn-out, dos, écran, confidentialité, retour après cancer | Travail de nuit, accès concret au médecin du travail, métiers physiques, parcours d’aide et retour après arrêt long |
| Maladies chroniques et médicaments | Diabète quotidien, insuffisance cardiaque, asthme, DFG, fibrillation atriale | Hypoglycémie centrale, HbA1c, automesure tensionnelle, anticoagulants quotidiens, BPCO, inhalateurs, suivi rénal |
| Prévention | Vaccins adultes, zona/grippe, dépistages organisés, mammographie, coloscopie | Parcours après test colorectal positif, synthèse vaccinale senior et accompagnement général d’arrêt du tabac |
| Cancer | Nouveaux traitements, chimio, après-cancer, reprise du travail, sexualité | Fatigue et alimentation au quotidien ; vérifier d’abord si les fiches existantes peuvent être complétées |
| Autres parcours | Langage enfant, TDAH, grossesse, dépression, douleurs spécifiques | Autisme et accès à l’évaluation, post-partum, douleur chronique ; aide à l’entourage en cas d’idées suicidaires à vérifier en priorité de sécurité |

## Premier lot : dix besoins à confirmer et traiter

1. Troubles de déglutition et toux pendant les repas chez un parent âgé.
2. Baisse des apports alimentaires et risque de dénutrition.
3. Escarres et surveillance d’une personne peu mobile.
4. Retour à domicile après hospitalisation.
5. Épuisement de l’aidant : approfondir et élargir la fiche répit déjà présente si cela suffit.
6. Hypoglycémie : une réponse centrale, reliée aux fiches diabète existantes.
7. Mesure de la tension à domicile : une fiche pratique.
8. Anticoagulants au quotidien : regrouper les repères dispersés.
9. Après un diagnostic de BPCO : construire le parcours absent ou mal identifié.
10. Travail de nuit et horaires décalés.

Ce sont dix **besoins**, pas dix nouvelles fiches obligatoires. L’enrichissement d’une réponse existante est préférable lorsqu’il répond suffisamment à la question. Toute future conduite pratique doit être sourcée puis validée médicalement.

## Trois autres types de trous

**Profondeur** : 53 fiches sans détail développé. Examiner en priorité celles où la réponse courte ne suffit pas au besoin. Croiser avec l’audit des références : 125 fiches sans URL documentaire dans l’export et 24 avec uniquement des URL Ameli parmi leurs liens renseignés. Ces groupes se recoupent et ne signifient pas automatiquement absence de preuves.

**Navigation et cohérence** : plusieurs IDs portent des questions proches sur boule du sein, hématurie, vertiges, reflux, brûlures ou sciatique. Cela peut disperser les références et les réponses. Comparer avant toute fusion, conserver les URLs et redirections si une consolidation est validée. Aucun doublon n’est supprimé ici.

**Retrouvabilité** : une abstention peut provenir du moteur alors que la fiche existe. Les difficultés du benchmark et le correctif Worker non encore activé doivent être suivis séparément. Ne pas produire une nouvelle fiche pour masquer un défaut de recherche ou un rejet de fidélité.

## Organisation avec l’audit de la semaine

- Lundi 12 octobre : confirmer le premier lot, lire les fiches proches, tester les formulations, préciser les références à rechercher et proposer création/enrichissement/consolidation.
- Mardi–jeudi : préparer les textes et les preuves par lots pour validation par Romain, en parallèle de la revue documentaire des fiches existantes.
- Vendredi : bilan de couverture de cette liste, décisions médicales obtenues, corrections publiées et besoins restant ouverts.

Statuts : `À CONFIRMER` → `MANQUE CONFIRMÉ` ou `COUVERT / DÉFAUT DE RECHERCHE` → `BROUILLON SOURCÉ` → `À VALIDER PAR ROMAIN` → `PUBLIÉ ET VÉRIFIÉ`.

Clôture d’un besoin : question précise, réponse suffisante, sources concordantes, alertes adaptées, validation médicale, lien facilement accessible et Assistant vérifié. Ne pas annoncer un pourcentage de couverture de toute la santé à partir de ces 30 questions sélectionnées.

Le fichier `backlog.csv` fournit pour chaque question les IDs des fiches proches, le constat et le statut. Le plan est préparé ; aucune exécution différée n’est activée par sa présence dans le dépôt.
