# P0 ASSISTANT-V3-01 — Diagnostic et prototype expérimental

État du 9 novembre 2026. Ticket ouvert. Aucun déploiement ni fusion autorisé par ce travail.

## Référence et périmètre

Base inspectée : `feat/v0-magazine`, commit `a168b21b6a6a6b6125147c45469bf09eca142270`. La branche par défaut `main` pointe sur `bf0fe88` et ne contient pas l'architecture publique actuelle. La référence choisie contient les correctifs de grounding, le Worker public et le dernier export immuable. Inspection en HEAD détaché, construction et tests V2 avant création de `feat/assistant-v3-retrieval-conversation`. Aucun fichier médical modifié.

Corpus reconstruit à l'identique : 662 documents, 427 fiches, 235 articles Magazine ; empreinte `dd4e8d3796361325563d10d216e975ddf5e1c55fa69f3bc2c90ff668f46b3b05`. Les deux versions sont évaluées sur cette même empreinte, sans reconstruire les embeddings. 52 documents sans champ detail ; tous ont answer et sources. Ce constat de couverture n'est pas une réévaluation médicale.

## Fichiers examinés et composants

| Fichier | Fonction / constat |
|---|---|
| `assistant-v2/cloudflare-worker-public.js` | API Cloudflare, embedding de question, cosine top 5, seuil 0,30, génération et contrôle indépendant, 40 s de budget |
| `assistant-v2/patient-language-retrieval.js` | Promotions par titre exact et alias ; ambiguïtés refusées ; contraintes population/exclusions |
| `assistant-v2/patient-language-aliases.json` | Six groupes d'alias validés, aucune recherche lexicale générale sur le corps |
| `ipp-retrieval-policy.js` | Politique existante spécifique aux IPP à conserver |
| `assistant-v2/grounding-contract.js` | Vérification citations exactes, nombres, IDs et verdicts du vérificateur |
| `scripts/build-assistant-v2-corpus.js` | Manifeste, canonisation, champs de recherche, export et empreinte SHA-256 |
| `scripts/build-assistant-v2-embeddings.js` | Embeddings OpenAI existants et réutilisation incrémentale |
| `scripts/mag-editorial.js` | `magCards`, statut validé/publié et hash éditorial, exclusions assistantPolicy |
| `maca-assistant-v2-unified.js` | Client public, envoie uniquement `{question}`, ne conserve pas le contexte des tours |
| `maca-assistant-metrics.js` | Mesures anonymes de durée/statut, liste blanche, aucun texte médical enregistré |
| `.github/workflows/assistant-v2-worker-publish.yml` | Déploiement Worker limité aux branches / chemins désignés |
| `.github/workflows/assistant-v2-auto-publish.yml` | Export et publication corpus ; ne pas modifier pour ce ticket |
| `scripts/test-assistant-v2-{grounding,canonical,patient-language}.js`, `scripts/test-ipp-retrieval.js` | Tests existants réutilisés |

## Limites démontrées

1. Aucun historique n'est lu par le Worker ni envoyé par le client. « Trois semaines » est donc une nouvelle question isolée. Preuve directe dans le contrat HTTP et le chemin embedding/génération.
2. Pas de politique d'urgence déterministe dans le Worker. Les impératifs « appelez », « consultez » sont au contraire interdits dans les blocs générés. Une bonne réponse d'orientation n'est donc pas garantie, même si le document urgent est trouvé. Le prototype sépare explicitement ce chemin du générateur documentaire.
3. Un titre ou alias exact est promu mais garde sa similarité. Le seuil `ranked[0].similarity < 0.30` peut ensuite rejeter ce résultat certain. La V3 accepte un match validé sans ce seuil tout en conservant les contrôles de preuve.
4. La recherche V2 est déjà sémantique, contrairement à l'hypothèse d'un moteur uniquement lexical. Le corps est déjà intégré dans les embeddings. L'amélioration consiste à ajouter un second signal lexical, pas à reconstruire un moteur sémantique.
5. Le registre comporte six groupes et le rapprochement des phrases courtes exige une égalité stricte ; la branche de recherche lexicale explicite ne peut pas gérer beaucoup de formulations. Sur les 100 cas, six activent le sous-système d'alias. **Ce chiffre ne mesure pas la récupération globale V2**, dont les embeddings peuvent retrouver ces questions.
6. Coût/latence : au minimum un appel embedding, une génération et une vérification pour une réponse acceptée, jusqu'à trois brouillons avec réparations et retries. Refresh manifeste à 60 s ; chargement froid des deux artefacts en parallèle. Pas de mesure réseau actuelle fiable end-to-end à ce stade. Le fichier `assistant-v2/PERFORMANCE-BASELINE-20260923.md` rapporte historiquement 8,375 et 9,417 secondes pour deux réponses sourcées sur 290 fiches ; ces valeurs ne sont pas extrapolables au corpus actuel. Le contrôle de disponibilité public a répondu avec la révision `2026-10-11-resilience2` ; cela ne prouve pas une génération fonctionnelle.
7. La longueur déclarée du corps est vérifiée mais pas sa taille réelle avant `request.json()`. Le prototype vérifie également la taille effective (8192 octets) et valide les tours. Le Worker lit encore le corps avant cette vérification ; une lecture en flux bornée serait nécessaire avant exposition publique. Le serveur local, lui, interrompt les corps trop grands pendant la lecture.

## Prototype C

- `assistant-v3/retrieval.js` : BM25 pondéré titres/alias/mots-clés/corps, vocabulaire patient expérimental, correction à une édition des mots longs inconnus uniquement si candidat unique, fusion RRF des 20 candidats lexicaux et sémantiques, promotion des correspondances validées. Aucun modèle ou abonnement supplémentaire.
- `assistant-v3/worker-experimental.js` : copie isolée du Worker V2 pour conserver exactement son protocole et ses contrôles de preuve. Les imports de grounding et de politique patient restent partagés. Ce doublon est volontaire pour l'expérimentation ; une extraction du cœur partagé sera nécessaire avant intégration finale, afin d'éviter sa divergence. Artefacts figés au commit audité.
- Contexte : six tours de 600 caractères au maximum ; seuls les messages utilisateur servent à compléter une réponse courte. Nouveau sujet explicite : aucun contexte ajouté. Limite : heuristique de continuité, pas de résolution générale des pronoms. Le contexte reste du texte utilisateur non fiable, jamais une preuve documentaire.
- `assistant-v3/safety.js` et `safety-sources.js` : six familles de règles de détection, réponses exclusivement composées d'extraits exacts de fiches figées. Exécutées avant les appels documentaires/modèle, mais après contrôle du format et du débit. Pas de diagnostic ni de prescription. **Règles expérimentales : validation clinique non acquise.**
- `assistant-v3/preview.html`, `local-server.mjs` : conversation locale sur `127.0.0.1:8789`, contexte en RAM, purge à 15 minutes, bouton de remise à zéro. Aucun stockage de conversation, aucun log de texte ou de clé. La clé du fournisseur déjà utilisé est nécessaire pour les réponses documentaires. L'orientation urgente de test fonctionne sans elle.

Lancer depuis la racine : `node assistant-v3/local-server.mjs`, puis ouvrir `http://127.0.0.1:8789`. Ne pas servir cette page au public ou déployer le Worker avant validation. Pas de configuration Wrangler de production créée.

## B — Référentiel et notation

`assistant-v3/evaluation/questions.json` contient exactement 25/20/15/15/10/15 cas, contexte, IDs et extraits attendus. Annotations de développement proposées, non validées cliniquement. Tolérance : au moins un des documents de référence dans le top 5. Une réussite de recherche ne vaut pas réussite de réponse. Les questions personnelles dans la catégorie limites demandent une abstention personnalisée ; une explication générale correctement limitée peut relever d'une revue humaine plutôt que d'un échec clinique automatique.

Évaluer séparément : top 5 pertinent ; continuité du sujet et de sa précision ; réponse correcte et directe ; fidélité de chaque affirmation ; population, négation et causalité ; absence de prescription/diagnostic ; sources cliquables ; abstention justifiée ; orientation urgente. Statuts automatisés et appréciation médicale sont distincts. Une réponse vide ou une erreur HTTP ne constitue jamais une réussite clinique.

## D — Résultats locaux et limites

| Catégorie | Cas | V3 composant local réussi | Échec | Non évalué |
|---|---:|---:|---:|---:|
| Courantes | 25 | 25 | 0 | 0 |
| Familier | 20 | 19 | 1 | 0 |
| Orthographe / synonymes | 15 | 15 | 0 | 0 |
| Conversations | 15 | 14 | 1 | 0 |
| Limites du corpus | 10 | 0 | 0 | 10 |
| Urgences — détection seule | 15 | 15 | 0 | 0 |

Recherche lexicale locale : 73/75 documents attendus dans le top 5 (97,3 %). Conversations : 14/15 (93,3 %) pour récupération documentaire uniquement, pas pour la compréhension médicale complète. Les 15 flux urgents ont également été exécutés au niveau Worker avec aucun appel de recherche ou au fournisseur, réponses comparées mot pour mot au corpus. Cinq contre-exemples négatifs contrôlés. Ils ne prouvent pas une sensibilité ou spécificité clinique générale.

Échecs conservés : T026 fatigue avec prise de sang normale (surclassement par fatigue MICI/ado) ; T067 hypertension suivie de « Non aucun symptôme » (surclassement par autres documents). Ne pas ajuster les règles sur ces cas puis annoncer un score indépendant : constituer un jeu de validation supplémentaire.

Évaluation complémentaire sur le jeu de recherche préexistant, sans ajustement des règles : 115/126 cas avec documents attendus sont retrouvés dans le top 5 lexical (91,3 %), 11 échecs conservés et 13 cas de résolution vide non comparables. Voir `existing-search-results.json` et `existing-search.cjs`. Ce test indépendant souligne que le 97,3 % du nouveau jeu ne peut pas être généralisé. Il ne remplace pas le comparatif hybride complet.

`local-results.json` contient les documents retrouvés, sources et latences de chaque cas. Temps d'index et p50/p95 sont ceux du composant CPU local ; **pas ceux de la réponse réseau**. `v2-baseline.json` documente seulement la branche d'alias V2 ; les résultats globaux y sont non exécutés. `full-results.json` consigne l'absence de clé locale. Aucun faux embedding ou réponse de modèle simulée n'est comptabilisé comme résultat réel.

Le script `full-compare.cjs` exécute réellement V2 et V3 sur le même export et les mêmes vecteurs, chronomètre chaque appel, enregistre réponses, sources, documents et résultat mécanique. Les artefacts sont injectés localement mais les appels au modèle sont réels. Évaluation des règles de débit exclue de ce banc fonctionnel. Test intégré dans un workflow isolé sans déploiement ; réutilise uniquement le fournisseur et le secret existants, sans service supplémentaire, abonnement ni planification récurrente. Arrêt sur erreur de configuration du fournisseur ; appels bornés par version.

## E — Validation et décision de pilotage

Tests exécutés avec succès : grounding V2 (11 vérifications mécaniques et 11 flux), registre patient (7 positifs / 4 négatifs), canonique (139 régressions sur 662 documents), IPP (8 requêtes, 47 régressions navigateur, 5 garde-fous), V3 (100 annotations contrôlées, 15 détections urgentes, 15 flux Worker urgents sans API, contre-exemples et validation des entrées), recherche locale 100 cas. La totalité des 11 flux existants de grounding a aussi été réexécutée contre le Worker V3 via `grounding-regression.cjs` : succès. Les simulations d'intégration vérifient le contrat technique ; elles ne testent pas le comportement réel du modèle.

Risques : annotations et règles médicales à revoir ; négations complexes, historique ancien ou implicite, expressions hors lexique, population enfant/adulte, calibrage du seuil, ambiguïtés lexicales, coût/latence réelle du grounding, absence de jeu indépendant. L'absence de persistance locale n'établit pas à elle seule la conformité complète du traitement externe : revue des paramètres de conservation et du traitement des requêtes nécessaire avant intégration. `store:false` est conservé sur les réponses du modèle ; pas de journal médical ajouté.

**Décision : ne pas déployer.** Les seuils du ticket ne peuvent pas être déclarés atteints sur la seule base des composants. Clôture conditionnée au comparatif réel complet, correction des échecs critiques, revue médicale indépendante et validation explicite. Retour arrière immédiat : continuer à utiliser l'entrée et le Worker V2 existants, qui n'ont pas été modifiés.

## Traçabilité

Commit complémentaire de mesure indépendante : `59fb9c425c4e60c8070198f14bbb26828e6e917b`. Premier commit : `f7d609c8cdd410a265c0b242740a44f34e67817a`. Comparaison GitHub confirmée : 16 fichiers ajoutés, aucun fichier existant modifié. Exécution isolée du comparatif réel : [run 42636065434](https://github.com/mim-health/reperes-sante/actions/runs/42636065434). Les résultats de génération restent en cours tant que ce run ne fournit pas son artefact final.
