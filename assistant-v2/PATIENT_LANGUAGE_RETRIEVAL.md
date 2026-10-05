# Assistant V2 — Langage patient / Retrieval QA

## Principe

Le Growth Engine peut détecter un échec, proposer un cas `RETRIEVAL_GAP` et alimenter une suite de tests, mais il ne modifie jamais automatiquement le moteur.

Les équivalences validées sont stockées dans `assistant-v2/patient-language-aliases.json`. Elles sont versionnées, auditées et incorporées au fingerprint du corpus Assistant V2.

## Ordre de résolution

1. titre canonique ou alias canonique validé ;
2. formulation patient validée ;
3. synonyme médical validé ;
4. recherche sémantique par embeddings.

Une correspondance déterministe validée ne supprime pas le retrieval sémantique : elle promeut seulement la fiche attendue en première position. Les autres candidats restent disponibles pour la synthèse et le grounding.

## Garde-fous

Chaque entrée peut déclarer `requiredPhrases` et `excludePhrases`. Une entrée dont plusieurs cibles seraient simultanément valides n'est pas forcée : le moteur retombe sur le retrieval sémantique et ses seuils habituels.

Le corpus reste fermé. Aucun synonyme n'est généré au runtime. Aucun appel Web n'est ajouté.

## Ajouter une nouvelle formulation patient

1. Confirmer qu'une fiche `VALIDATED` couvre réellement la question.
2. Ajouter la formulation à l'entrée existante ou créer une entrée dans `patient-language-aliases.json`.
3. Renseigner la source et la raison du mapping.
4. Ajouter un cas permanent dans `patient-language-regression-cases.json`, avec `expectedId`, `forbiddenIds` et `classification: RETRIEVAL_GAP` si le cas provient d'une abstention anormale.
5. Lancer `node scripts/build-assistant-v2-corpus.js`.
6. Lancer `node scripts/test-assistant-v2-patient-language.js` puis la batterie Assistant/Search existante.
7. Ne fusionner que si la batterie historique, le red-team, le smoke, le rate-limit et la synchronisation corpus restent verts.

## Source de vérité

`VALIDATED -> corpus canonique -> export Assistant -> embeddings + aliases -> Worker`

Le build échoue si un alias référence une fiche absente. Les artefacts précédents restent la dernière version fonctionnelle tant qu'un nouveau build n'est pas publié.
