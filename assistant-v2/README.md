# MACA Santé — Assistant IA V2 (prototype isolé)

Ce dossier appartient exclusivement au prototype **Assistant IA V2 — corpus fermé**.

## Principe d’isolation

- Ne pas modifier l’Assistant V1.6 ni son moteur `MACA_SEARCH_V2`.
- Ne pas modifier les fiches médicales pour satisfaire le prototype.
- Toute donnée utilisée par V2 doit provenir du corpus canonique MACA déjà validé.
- Les artefacts V2 sont dérivés automatiquement du corpus ; ils ne constituent pas une nouvelle source éditoriale.
- Aucun appel Web, aucune API médicale et aucune génération de réponse n’est utilisé dans le retrieval de l’étape 2.

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

`retrieval.test-cases.json` contient les requêtes de référence. `scripts/test-assistant-v2-retrieval.js` exécute automatiquement le benchmark et génère `retrieval.report.json`. La CI exige actuellement au moins 80 % de cas réussis dans le top 5.

## Étape suivante

Après validation et enrichissement du banc de tests, le prototype pourra ajouter un retrieval sémantique par embeddings et comparer ses résultats au baseline local. La génération de synthèse restera séparée et ne sera branchée qu’après validation du retrieval et du contrat d’abstention.
