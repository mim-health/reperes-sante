# ASSISTANT-V3-01 — Accélération mesurée avec références de citations

9 novembre 2026. **Candidat accéléré validé par les contrôles automatisés ; revue médicale et contrôle sur infrastructure publique encore requis. Aucun déploiement.**

## Changement

Le modèle génère des références courtes aux extraits du corpus plutôt que de recopier leurs longues citations dans sa sortie JSON. Le serveur réinsère les citations exactes avant les contrôles mécaniques et la vérification sémantique indépendante. Les extraits restent issus des seuls champs answer, detail, usefulInfo et watch ; leur regroupement par paragraphes ne crée aucun fait médical. Les références inconnues échouent aux contrôles. Aucun vérificateur supprimé, modèle changé ou texte médical source réécrit.

La version reste isolée dans `assistant-v3/worker-citation-refs.js`, avec ses tests et son comparateur. Le Worker public V2, la production et l'entrée expérimentale précédente ne sont pas remplacés.

## Protocole et traçabilité

- [Validation finale 42647212116](https://github.com/mim-health/reperes-sante/actions/runs/42647212116), commit `2d1b6645e2e07e169bae30f04d01968b08bbc2ac`, terminée avec succès.
- Artefact `assistant-v3-evaluation`, ID `13689300480`, SHA-256 `6eb58a61bc6f5ac9c88e1c156a1e694aa01efb9592c98c982455b4e4dbebbf01`. Le fichier mesuré est `citation-refs-results.json`, pas les autres résultats historiques inclus dans l'archive.
- Corpus figé : 662 documents ; empreinte `dd4e8d3796361325563d10d216e975ddf5e1c55fa69f3bc2c90ff668f46b3b05`.
- Même modèle, même recherche et mêmes 100 questions des deux côtés ; ordre alterné, quatre files parallèles, appels réels au fournisseur. 75 questions documentaires, 15 urgences, 10 limites.
- Avant : Worker V3 après retrait du précédent candidat de brièveté/compression. Après : références de citations et refus explicites de certaines demandes hors périmètre.

## Résultats finaux

| Population | Effectif | Médiane avant | Médiane après | p95 avant | p95 après |
|---|---:|---:|---:|---:|---:|
| Ensemble | 100 | 5,36 s | 4,32 s | 13,36 s | 6,36 s |
| Questions documentaires, échec compris | 75 | 5,72 s | 4,62 s | 15,59 s | 7,64 s |
| Réponses documentaires réussies des deux côtés | 74 | 5,71 s | 4,61 s | 13,85 s | 7,64 s |

Sur les 74 paires comparables réussies : **19,4 % de réduction de la médiane**, **44,8 % au p95**. Sur les 75 questions documentaires, baisse de 19,2 % et 51,0 %, mais le témoin inclut un échec ; les 74 paires sont donc le comparatif le plus prudent. Le p95 est une mesure de queue de distribution, pas le maximum.

| Contrôle | Avant | Après |
|---|---:|---:|
| Passes mécaniques, total | 97/100 | 100/100 |
| Documentaires | 74/75 | 75/75 |
| Urgences | 15/15 | 15/15 |
| Limites du corpus | 8/10 | 10/10 |
| Appels fournisseur | 279 | 243 |

Aucune régression mécanique dans le jeu final ; trois améliorations T003 (fièvre de l'enfant), T078 (dose individuelle), T082 (choix d'arrêt de médicament). Une réussite mécanique impose pour les questions documentaires une réponse non vide, supported et un document attendu dans la sélection ; **elle ne constitue pas une validation clinique de chaque affirmation**.

Mesures par appel sur les réponses abouties du candidat : embedding p50 173 ms, génération 3261 ms, vérification 1030 ms. Ces médianes ne s'additionnent pas pour produire une médiane de requête. Certaines requêtes ont plusieurs essais ; les échecs ne renvoient pas les timings détaillés.

## Première mesure et correction des limites

Premier essai des références seules : [42646004439](https://github.com/mim-health/reperes-sante/actions/runs/42646004439), commit `19085553efd00af4476c0eee9e0bbb942c57eb52`, artefact `13687383950`. Sur les 75 documentaires, 75/75 des deux côtés, médiane 5,87 → 4,73 s (−19,5 %), p95 16,74 → 10,67 s. Mais trois demandes hors périmètre ne respectaient pas l'abstention stricte attendue (T078, T079, T082).

La correction ajoute une règle de refus avant appel au fournisseur pour certaines formulations explicites de dose personnelle, choix de médicament, ordonnance et interprétation génétique individuelle. Huit nouvelles formulations positives et six négatives ont été testées ; les 90 questions hors catégorie limites restent non bloquées. Les urgences passent avant ce refus. Ces motifs ne forment pas un classificateur exhaustif de toutes les demandes individuelles ; leurs faux positifs et faux négatifs restent à revoir.

Tests locaux : 6423 références de citations réinsérées exactement sur 662 documents, références étrangères rejetées, contrat de grounding exercé après réinsertion, 11 contrôles et 11 flux de grounding partagés, 100 annotations V3, 15 flux urgents sans API, contexte, entrées trop grandes, refus sans API et contre-exemples : succès.

## Décision

Conserver ce candidat sur la branche expérimentale pour revue médicale. Les réponses de priorité sont dans `REVUE_MEDICALE_V3_ACCELEREE.md` ; toutes les 100 réponses figurent dans l'artefact. La production reste inchangée. Le ticket n'est pas fermé : validation médicale et vérification publique avant toute intégration.

## Limites

Questions de développement connues, non étude clinique indépendante. Deux passages successifs, avec modification des refus entre eux ; pas d'échantillon aléatoire ni de garantie générale. Quatre files concurrentes et variabilité du fournisseur. Corpus et embeddings injectés localement dans le banc ; modèle réellement appelé, mais navigateur, CDN, téléchargement froid et exécution Cloudflare publique non mesurés. Aucun résultat ne prouve à lui seul la conformité médicale ou de confidentialité du futur déploiement.
