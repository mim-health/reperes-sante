# V3 — Accélération supplémentaire par sortie technique compacte

9 novembre 2026. Candidat expérimental, sans mise en production. Validation médicale encore en attente.

## Modification testée

Le modèle ne répète plus les identifiants de cartes déjà déductibles des preuves, la note générale fixe ni un motif interne inutilisé. Le serveur reconstruit ces champs avant la validation habituelle. Texte médical, recherche, modèles, citations exactes, règles d'urgence, refus hors périmètre et vérificateur sémantique sont conservés. Pas de nouvelle consigne de brièveté médicale.

Candidat isolé : `assistant-v3/worker-compact-output.js`. Témoin : `worker-citation-refs.js`, V3 accélérée déjà testée. Aucun Worker public remplacé.

## Mesure réelle

[Run 42658186389](https://github.com/mim-health/reperes-sante/actions/runs/42658186389), commit `5410a37bd731c08525105b895f48a0a89ba190ca`. Artefact `assistant-v3-evaluation`, ID `13691914227`, SHA-256 `7bfb58aeff3b95bb0196f475c0b4920133eb3e76980bc5b619a2a54987c042ab`. Résultats : `compact-output-results.json`.

100 questions synthétiques figées, ordre alterné, quatre files parallèles, même corpus de 662 documents et mêmes modèles. Appels réels au fournisseur ; corpus et embeddings injectés dans le banc.

| Population | Médiane témoin | Médiane candidat | p95 témoin | p95 candidat |
|---|---:|---:|---:|---:|
| 75 questions documentaires, réussies des deux côtés | 4,82 s | 4,19 s | 10,40 s | 9,44 s |
| Ensemble des 100 questions | 4,39 s | 4,06 s | 7,81 s | 8,88 s |

**Gain documentaire : 13,0 % de médiane et 9,3 % au p95.** Sur l'ensemble, médiane améliorée de 7,6 %, mais **p95 dégradé de 13,7 %**. Il ne faut donc pas annoncer une accélération uniforme ni masquer la queue globale moins favorable. Les quantiles des populations mixtes se situent à des rangs différents dans les 75 réponses documentaires, ce qui explique que leurs évolutions puissent avoir des signes opposés.

100/100 passes mécaniques dans les deux versions : 75/75 documentaires, 15/15 urgences, 10/10 limites. Aucune régression mécanique dans ce passage ; cela ne remplace pas la revue médicale. Appels fournisseur : 251 → 250.

Génération du candidat, par appel abouti : p50 2885 ms, p95 3871 ms. Vérification indépendante : p50 997 ms, p95 1775 ms. Ces médianes par appel ne sont pas des sous-totaux additifs d'une requête.

## Cas restant lents

Des reprises sont encore observées : prévention des chutes (10,19 s, 5 appels), pyrosis (10,01 s, 5 appels), ostéodensitométrie (9,55 s, 5 appels), brûlures d'estomac (9,44 s, 5 appels). Certaines étaient plus rapides côté témoin dans ce passage. Le candidat améliore la rédaction ordinaire ; il ne résout pas toutes les reprises ni la variabilité du fournisseur.

## Contrôles et décision

Tests de reconstruction des champs, validation des références et rejets d'IDs inconnus, 6423 citations réinsérées exactement, 11 contrôles et 11 flux de grounding partagés, 100 annotations, 15 flux urgents sans API, refus hors périmètre et contre-exemples : succès.

Conserver le candidat séparé pour revue et étude des requêtes lentes. Ne pas déployer sur la seule base du gain médian. Les réponses prioritaires réellement produites figurent dans `REVUE_MEDICALE_SORTIE_COMPACTE.md` ; l'ensemble est disponible dans l'artefact. Le précédent candidat reste disponible et inchangé.

## Limites

Un passage apparié sur des questions connues, quatre files concurrentes et variabilité du fournisseur. Aucune étude clinique indépendante. Le navigateur, le CDN, le téléchargement froid du corpus et le Worker Cloudflare public ne sont pas mesurés. Ne pas multiplier les pourcentages des essais successifs pour annoncer un gain cumulé : leurs témoins et leurs moments de mesure diffèrent. Ticket ouvert.
