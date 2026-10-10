# Assistant — Mesure du 06/10/2026 et candidat d’optimisation

Mesure de production depuis GitHub Actions, dix requêtes synthétiques fixes,
deux passages. Aucun changement de Worker n’a été déployé pour cette mesure.

| Cas | Passage 1 | Passage 2 |
|---|---:|---:|
| Sciatique / IRM | 9,27 s | 5,15 s |
| Nycturie | 7,49 s | 6,32 s |
| Saignements après ménopause | abstention (4,84 s) | réponse (6,55 s) |
| Magnésium / sommeil | 5,45 s | 5,04 s |
| Hors corpus | 3,47 s | 2,12 s |

Médiane des sept réponses couvertes réussies : **6,318 s**.
Disponibilité simple : 149 ms. Corpus actif : 355 fiches.
La première série ne garantit pas une instance froide. Ne pas attribuer les
écarts à un étage précis sans chronométrage interne.

Le cas ménopause a déclenché `contract_rejected` une fois sur deux. Ce résultat
est un signal de fiabilité à reproduire et analyser, pas une raison pour
affaiblir la validation ou republier une nouvelle fiche.

## Candidat préparé

- Préchargement asynchrone des artefacts validés lors de la requête de
  disponibilité déjà émise par le widget ; aucune requête OpenAI à cette étape.
- Pré-calcul de la norme des vecteurs à chaque chargement d’index ; classement
  et similarités identiques à l’algorithme précédent.
- Durées `artifacts`, `embedding`, `retrieval`, `synthesis`, `grounding`, `total`
  ajoutées à la réponse et à `Server-Timing`. Aucune question journalisée.
- Version du corpus reprise depuis le jeu de données utilisé par la requête.

Prompts médicaux, schémas, top-K, seuil, rate limiting, grounding et abstention
conservés. Aucun cache de questions ni réponse avant la vérification finale.

## Vérification et déploiement

Le test local `node scripts/test-assistant-prewarm-timing.js` compare original
et candidat : préchargement/réutilisation, réponses identiques avec mocks,
classement exact de 355 vecteurs, rejets et indisponibilité.
Il ne remplace pas un test avec les modèles réels.

Le candidat doit rester isolé tant que le smoke, le red-team public 22/22 et
le benchmark avant/après n’ont pas confirmé sa fidélité et son gain après
déploiement contrôlé. Il n’existe pas de gain de production mesuré à ce stade.

## Réparation bornée des erreurs de contrat
Une seule nouvelle génération est autorisée pour les erreurs de structure. Une citation étrangère ou un conseil personnalisé rejeté ne déclenche pas de réparation. Chaque résultat réparé repasse validation et grounding. Les refus persistants exposent seulement les codes contract_errors et repair_attempted, sans texte utilisateur. Tests : réparation réussie, échec persistant limité à deux générations, citation étrangère sans relance. Le cas ménopause reste à vérifier après déploiement ; le code exact du refus en production n'était pas exposé auparavant.
