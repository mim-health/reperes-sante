# Audit documentaire et revalidation du corpus — 12 au 16 octobre 2026

Périmètre initial : 377 fiches de référence sur `feat/v0-magazine`, export du 11 octobre. Les 17 documents du Mag présents dans l’export Assistant sont suivis séparément : actualités datées, sans assimilation à une fiche revalidée. L’inventaire est un tri automatique, aucune fiche n’est nouvellement validée par ce tri.

## Premier constat

- 125 fiches n’ont aucune URL documentaire renseignée dans l’export Assistant. Des organismes peuvent être cités en texte : cela ne signifie pas absence de sources, mais traçabilité à résoudre.
- 24 fiches ont uniquement des URL Ameli parmi leurs liens documentaires renseignés. D’autres organismes peuvent être cités sans lien : leur rôle doit être vérifié.
- 98 fiches ont au moins une URL Ameli.
- 54 fiches ont un lien potentiellement général, repéré par une heuristique de chemin d’URL. Vérification manuelle indispensable.

Ces groupes se recoupent. La présence d’un DOI, de PubMed, d’Ameli ou de plusieurs références n’est pas une validation scientifique. Les références Ameli pertinentes restent utilisables pour les conseils pratiques français.

## Organisation proposée

| Date prévue | Lot documentaire | Travail attendu |
|---|---:|---|
| Lundi 12 octobre | 76 fiches | Résoudre les références non traçables en priorité ; commencer l’examen approfondi des 20 premières fiches sensibles de `summary.json`. |
| Mardi 13 octobre | 76 fiches | Continuer la traçabilité et les recommandations ; présenter les premières corrections à Romain. |
| Mercredi 14 octobre | 76 fiches | Vérifier les affirmations, traitements, bénéfices, risques et chiffres dans les documents identifiés. |
| Jeudi 15 octobre | 76 fiches | Examiner les lots suivants ; traiter les discordances et actualiser les références justifiées. |
| Vendredi 16 octobre | 73 fiches | Terminer le premier passage documentaire, établir le bilan des fiches revalidées et celles restant ouvertes. |

Les dates sont des objectifs de traitement, pas des exécutions déjà programmées ou des promesses de revalidation. Le premier passage doit couvrir 377/377 fiches cette semaine ; la revalidation complète est l’objectif, mais sa clôture dépend de la vérification des preuves, des corrections et de la validation médicale effective. Ne jamais marquer une fiche revalidée pour respecter une date. Si la charge est supérieure au temps disponible, poursuivre les lots restants et expliciter l’écart.

## Examen fiche par fiche

1. Ouvrir la référence exacte ; consigner titre, organisme/revue, année, URL/DOI, date de consultation et version. Chercher les recommandations officielles actuelles des sociétés savantes, de la HAS ou des organismes pertinents. Utiliser les études originales et synthèses méthodiques lorsque la question le nécessite.
2. Relier les affirmations majeures à leurs preuves : réponse courte, conduite pratique, chiffres, effets, risques et signaux d’alerte. Vérifier la population, le contexte français et les limites. Ne pas imposer arbitrairement un nombre de références ni ajouter une étude décorative.
3. Pour les sujets controversés ou les effets d’un traitement, examiner le type d’étude, sa portée, sa qualité et les divergences. Distinguer association et causalité ; ne pas extrapoler au-delà des données.
4. Proposer les corrections dans un lot de revue, en conservant l’ancienne version et le motif. Toute modification médicale est soumise à Dr Romain BEDDOK avant publication.
5. Consigner la décision explicite : conforme à revalider, à corriger, preuve insuffisante ou retrait proposé. Le retrait éventuel reste une décision médicale, pas le résultat automatique d’un score d’URL.
6. Après accord : publier, régénérer fiche individuelle/pages/corpus, vérifier texte et sources en ligne puis fidélité de la réponse Assistant. Tester les cas concernés et la non-régression.

## Statuts et clôture

`À AUDITER` → `EN REVUE DOCUMENTAIRE` → `À VALIDER PAR ROMAIN` → `REVALIDÉE`, ou `À CORRIGER` / `BLOQUÉE`.

Une revalidation exige : preuves identifiées et examinées, affirmation/preuve concordantes, signaux d’alerte revus, approbation médicale explicite, date et version enregistrées, publication et synchronisation Assistant vérifiées. Aucun statut existant n’est réinitialisé automatiquement ; l’inventaire suit cette nouvelle campagne séparément.

Rapport quotidien : examinées / corrigées / en attente médicale / revalidées / bloquées. Rapport final : couverture complète, liste des exceptions, version du corpus et preuves de publication. La campagne n’est « corpus entièrement revalidé » qu’une fois toutes les lignes closes avec leur décision médicale documentée.

## Suivi

`inventaire.csv` contient l’ID, le titre, la catégorie, les signaux de tri, les URL, le lot prévu et les champs de preuve, correction et validation. `summary.json` décrit le périmètre et les 20 premières fiches à approfondir. Recalculer l’inventaire si des fiches sont ajoutées ; préserver les décisions déjà renseignées dans le fichier de suivi avant tout recalcul.

Aucune exécution différée n’est activée par ce document. Le script `scripts/plan-corpus-source-audit.py` produit seulement l’inventaire ; il ne recherche pas les preuves, ne corrige pas les textes et ne valide rien.
