# MACA Santé — Assistant IA V2 (prototype isolé)

Ce dossier appartient exclusivement au prototype **Assistant IA V2 — corpus fermé**.

## Principe d’isolation

- Ne pas modifier l’Assistant V1.6 ni son moteur `MACA_SEARCH_V2`.
- Ne pas modifier les fiches médicales pour satisfaire le prototype.
- Toute donnée utilisée par V2 doit provenir du corpus canonique MACA déjà validé.
- Les artefacts V2 sont dérivés automatiquement du corpus ; ils ne constituent pas une nouvelle source éditoriale.
- Aucun appel Web, aucune API médicale et aucune génération de réponse n’est utilisé dans le retrieval des étapes 1, 2 et 2B.

## Corpus V2

`corpus.json` est généré par `scripts/build-assistant-v2-corpus.js` à partir de `MACA_CANONICAL_CORPUS`.

Chaque fiche exportée contient uniquement les informations utiles au futur retrieval et à la synthèse :

- `id`
- `title`
- `primaryCategory` et `categories`
- `keywords`
- `content.answer`
- `content.detail`
- `content.usefulInfo`
- `content.watch`
- `sources`
- `url`
- métadonnées de validation/audit disponibles
- `retrievalText`, construit uniquement à partir de ces champs MACA

`corpus.report.json` contrôle la structure de l’export. Les erreurs fatales sont : ID absent, ID dupliqué, titre absent ou texte de retrieval vide. Les champs historiques incomplets sont signalés comme avertissements afin de mesurer l’état réel du corpus sans modifier la production.

## Retrieval local — étape 2

`retrieval.js` fournit un moteur local hybride fondé sur BM25 et une pondération explicite des champs MACA : titre, mots-clés, réponse courte, détail, pratique/vigilance et catégorie.

Il s’agit volontairement d’un **baseline gratuit et reproductible**, pas encore du retrieval sémantique final par embeddings. Il permet de mesurer ce que le corpus sait retrouver avant d’ajouter une API.

`lab.html` est une page de laboratoire : elle charge uniquement `corpus.json`, permet de saisir une question et affiche les cinq fiches candidates, leur score, la couverture de la requête et les termes concordants. Elle ne produit aucune réponse médicale.

`retrieval.test-cases.json` contient les requêtes de référence. `scripts/test-assistant-v2-retrieval.js` exécute automatiquement le benchmark et génère `retrieval.report.json`.

## Calibration — étape 2B

`retrieval.calibration-cases.json` contient 52 requêtes mixtes : 24 réponses simples, 6 multi-sujets, 8 demandes personnalisées et 14 cas d’abstention (requêtes non médicales ou sujets médicaux absents du corpus).

`scripts/calibrate-assistant-v2-retrieval.js` mesure sans modifier le moteur :

- le taux de présence des fiches attendues dans le top 5 ;
- la distribution des scores et de la couverture ;
- les cas difficiles ;
- la séparation entre corpus et hors corpus ;
- plusieurs règles de seuil exploratoires.

Résultat du baseline sur ce banc : 33/38 cas pertinents retrouvés dans le top 5 (86,84 %), 6/6 cas multi-sujets réussis. Le meilleur seuil exploratoire observé sur ce petit échantillon est `score >= 37,5` et `coverage >= 0,34`, avec 100 % de spécificité sur les 14 cas d’abstention et 89,47 % de sensibilité. **Ce seuil n’est pas validé pour la production.**

Les échecs du baseline restent volontairement visibles : ils servent de cas de comparaison pour le futur retrieval sémantique et ne doivent pas être masqués par l’ajout de règles lexicales spécifiques.

## Étape suivante

Comparer un retrieval sémantique par embeddings au baseline local sur les mêmes jeux de tests. La génération de synthèse restera séparée et ne sera branchée qu’après validation du retrieval et du contrat d’abstention.
