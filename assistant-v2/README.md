# MACA Santé — Assistant IA V2 (prototype isolé)

Ce dossier appartient exclusivement au prototype **Assistant IA V2 — corpus fermé**.

## Principe d’isolation

- Ne pas modifier l’Assistant V1.6 ni son moteur `MACA_SEARCH_V2`.
- Ne pas modifier les fiches médicales pour satisfaire le prototype.
- Toute donnée utilisée par V2 doit provenir du corpus canonique MACA déjà validé.
- Les artefacts V2 sont dérivés automatiquement du corpus ; ils ne constituent pas une nouvelle source éditoriale.
- Aucun appel Web, aucune API médicale et aucune génération de réponse n’est utilisé dans le retrieval des étapes 1, 2 et 2B.
- L’étape 3 utilise uniquement l’API d’embeddings OpenAI pour transformer les textes MACA et les questions en vecteurs. Elle ne génère aucun contenu médical.

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

Il s’agit volontairement d’un **baseline gratuit et reproductible**. Il permet de mesurer ce que le corpus sait retrouver avant d’ajouter une API.

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

Les échecs du baseline restent volontairement visibles : ils servent de cas de comparaison pour le retrieval sémantique et ne doivent pas être masqués par l’ajout de règles lexicales spécifiques.

## Retrieval sémantique — étape 3

`semantic-retrieval.js` effectue le classement par similarité cosinus et fournit aussi une fusion RRF entre classement sémantique et classement lexical.

`scripts/build-assistant-v2-embeddings.js` construit `embeddings.index.json` avec `text-embedding-3-small`, en 512 dimensions par défaut. Le script conserve un hash de chaque `retrievalText` : lorsqu’une fiche n’a pas changé, son vecteur existant est réutilisé. Seules les fiches nouvelles ou modifiées nécessitent un nouvel appel payant.

`scripts/benchmark-assistant-v2-semantic.js` réutilise exactement les 52 questions de l’étape 2B et compare :

1. le baseline lexical ;
2. le retrieval sémantique pur ;
3. une fusion hybride lexical + sémantique.

Le rapport `semantic.report.json` mesure notamment le top 5, les performances par classe, les échecs et la séparation sémantique corpus / hors corpus. Les seuils calculés restent exploratoires.

La CI teste toujours les modules sans API. Le benchmark sémantique payant ne s’exécute que si le secret GitHub `OPENAI_API_KEY` est présent. En son absence, l’étape est explicitement sautée sans erreur et sans coût.

## Limite actuelle avant exécution live de l’étape 3

Le code de l’étape 3 est installé et isolé. Pour obtenir les résultats réels embeddings sur les 272 fiches et les 52 questions, il faut ajouter une clé API OpenAI au secret GitHub `OPENAI_API_KEY` de ce prototype. La clé ne doit jamais être écrite dans un fichier du dépôt, dans le navigateur ou dans une fiche MACA.

Après génération de l’index, l’étape suivante sera de décider, sur mesures, si MACA retient le sémantique pur ou l’hybride et de fixer un contrat d’abstention avant toute synthèse générative.
