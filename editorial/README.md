# Accueil → Le Mag → Assistant

La source persistante est `editorial/content.json`. L’automatisation construit l’accueil, les pages permanentes, les registres, les archives et l’export IA depuis cette source. Les fichiers `maca-daily-editorial-data.js`, `maca-editorial-history.js`, `magazine-articles.js` et `magazine-videos.js` sont générés : ne plus les modifier pour une rotation.

## Préparer puis valider une édition

1. Ajouter un contenu avec identifiant et URL uniques, date réelle, titre, réponse courte, **texte intégral dans `html`**, références exactes et droits de l’image. `html` est le contenu du `<main>` ; conserver sources, crédits, médias et limites scientifiques. Les vidéos nécessitent une transcription explicitement validée pour être indexées.
2. Renseigner `medicalStatus: DRAFT` et `publicationStatus: SCHEDULED` pendant la préparation. Aucune publication/validation implicite.
3. Après validation explicite du Dr Romain BEDDOK, renseigner `validation.validator`, `validation.validatedAt`, `validation.evidence`, puis `validation.contentHash = require('./scripts/mag-editorial').digest(contenu)`. Calculer le hash constate la version approuvée ; cela **ne donne aucune autorisation de validation**. Une modification substantielle nécessite une nouvelle approbation.
4. Ajouter une édition avec `id`, `date`, `publishAt` ISO **avec offset explicite**, `items: [{contentId,slot,icon}]` et `complete: true` seulement après contrôle complet. Utiliser les slots existants : À LA UNE, À LIRE EN 3 MIN, FICHE DU JOUR, VRAI OU FAUX, LE CHIFFRE DU JOUR, DONNÉES. Pour une publication immédiate, mettre les contenus en `PUBLISHED`. Pour une programmation, conserver `SCHEDULED` : à l’heure due, le pipeline publie la vue effective sans modifier le statut planifié de la source. Les deux cas exigent une édition complète et une validation médicale documentée.
5. Prévisualiser avec `node scripts/mag-editorial.js --dry-run`, puis lancer les tests avant le commit sur `feat/v0-magazine`. Un push de la source déclenche le workflow `Mag validated editorial publication`.

La date de validation ne doit pas être confondue avec la date de veille ou de publication. La programmation à heure quelconque dépend d’un déclenchement du pipeline à cette heure : le contrôle de rattrapage configuré à 07 h ne constitue pas un ordonnanceur à la minute. Un contenu programmé peut attendre le prochain contrôle si aucun push n’a lieu.

## Rattrapage à 07 h Europe/Paris

GitHub ignore `schedule` dans les branches autres que la branche par défaut (`main` ici). Pour respecter l’interdiction de travailler sur main, une tâche ChatGPT quotidienne met à jour **uniquement** `editorial/catchup.json` sur `feat/v0-magazine` via GitHub ; ce push déclenche le même pipeline. Elle contrôle les exécutions et signale une édition manquante ou un échec. Elle ne crée ni ne valide de texte médical. Les offsets des éditions sont explicites ; la tâche utilise Europe/Paris, y compris le changement d’heure. `workflow_dispatch` sert aussi à la relance manuelle si le workflow est disponible dans l’interface GitHub ; un nouveau tick est toujours possible.

## Correction, retrait et retour arrière

- Correction : modifier le texte source après validation, mettre à jour `updatedAt`, validation et hash. Le même identifiant et la même URL sont conservés. Le prochain export remplace la version active ; les versions techniques anciennes restent des artefacts immuables, jamais des sources sélectionnables.
- Retrait : `publicationStatus: RETRACTED` ou `medicalStatus: WITHDRAWN`. Le pipeline supprime le contenu des archives actives et de l’index, et publie une page permanente `noindex` indiquant le retrait. Relancer prioritairement via un push du retrait ; ne pas attendre le lendemain.
- Relance : corriger l’étape échouée puis recommitter le tick. Relances bornées ; verrou local et groupe GitHub empêchent les publications Mag concurrentes.
- Retour arrière : rétablir la dernière source correcte par un nouveau commit et relancer. Ne jamais rétablir un contenu dont la validation a été retirée. Sans édition complète, la dernière édition conserve sa vraie date. Si le build échoue, aucun déploiement n’a lieu.
- Un changement concurrent de la source bloque la publication plutôt que d’écraser les modifications. Les changements générés sont publiés par commit, sans force push.

## Assistant fermé et provenance

Le corpus comporte les fiches existantes plus les documents `mag-…`. Chaque document Mag porte URL, date, format, hash de version, validation et références. Le titre et le texte exportés indiquent explicitement « Le Mag » et la date, y compris pour le Worker déjà déployé ; l’interface ouvre l’article réel au lieu de fabriquer une URL de fiche.

Les contenus avec `assistantPolicy: SOURCE_REVIEW_REQUIRED` ne sont pas indexés. Les cartes qui remettent une fiche existante en avant ont `REFERENCE_FICHE_ONLY` : la fiche canonique reste la source de référence, sans duplication de son aperçu quotidien. Lier explicitement `ficheId` lorsqu’une fiche couvre le même sujet ; le moteur actuel ne garantit pas une priorité universelle entre toute fiche et tout article non reliés. Pour les actualités indexées, leur texte conserve les limites de preuve : aucune connaissance extérieure n’est ajoutée.

La migration conserve les éditions 10 et 11 octobre. Quatre contenus plus anciens déjà publiés restent visibles dans Le Mag mais portent `LEGACY_REVIEW_REQUIRED` et sont exclus de l’IA jusqu’à confirmation de leur validation. Quatre brèves du 10 octobre nécessitent une référence précise avant accès IA. La synchronisation est vérifiée sur les ensembles d’identifiants **et les versions**, pas seulement sur le nombre.

## Candidats fiches

Mettre `candidateFiche: true` pour sélectionner un article. Le pipeline alimente `editorial/candidate-fiches.json` sans créer ni publier de fiche. Avant préparation : vérifier les doublons et choisir créer/enrichir/ne pas créer. La nouvelle fiche suit le format MACA et sa validation habituelle. Ajouter `ficheId` à l’article après publication ; le lien apparaît sur la page. Le lien inverse apparaît automatiquement sur fiche.html pour les articles/vidéos publiés qui portent ce ficheId. Aucune nouvelle fiche médicale n’est créée par ce lot.

## Contrôles et statut

- `node scripts/test-mag-editorial.js` : rotation 10→11, absence de perte, idempotence, correction, retrait, brouillons, édition incomplète et changement d’heure.
- `node scripts/test-home-magazine.js` et `node scripts/test-magazine-videos.js` : archive, routes, médias et sitemap.
- `node scripts/test-assistant-v2-canonical.js` : contrôles existants de recherche (139 au 11 octobre), corpus canonique et extension automatique.
- `node scripts/verify-mag-public.js` : URLs publiques et édition réellement servie.
- `node scripts/verify-mag-public.js --assistant` : manifeste éligible vs index actif, version et réponse publique sourcée uniquement par Le Mag.

Le workflow conserve un rapport d’exécution, un résumé GitHub et les manifestes même en cas d’échec. `editorial/manifest.json` décrit une préparation, **pas une preuve de succès du déploiement**. Un site déployé et un échec IA sont distingués. L’objectif de 15 minutes est une cible, non un SLA garanti par GitHub Actions ou la tâche ChatGPT.

Les 51 formulations originales ne sont pas présentes dans le dépôt : `docs/editorial/question-map-51-suivi-2026-10-09.md` le constate. Ne pas inventer ce jeu de test ni annoncer l’avoir rejoué. Les requêtes des tests ne sont ni conservées dans les journaux ni associées à des données personnelles.

Les publications vidéo vérifiées alimentent la même source persistante. Un manifeste média validé sans auteur/date de validation médicale précise reste visible, mais exclu de l’IA. Les champs validatedBy, validatedAt et validationEvidence permettent une reprise documentée de cette validation.
