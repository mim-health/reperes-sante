# Audit final public — Assistant MACA V2 — 23/09/2026

## Périmètre
Bascule de la recherche et de l'Assistant flottant vers une entrée unique V2, corpus fermé. Aucun ajout fonctionnel et aucune modification du corpus médical dans la clôture P0.

## Gates V2 validés sur le dernier SHA audité
- régression retrieval : **132/132**, soit 120 historiques + 12 Alzheimer, 0 échec
- readiness handshake : OK
- smoke test public : OK
- intégration unifiée recherche + Assistant : OK
- red-team public : **22/22**
- rate limiter Cloudflare, test espacé : HTTP 429 observé, OK
- test burst instantané : OK comme test de sécurité/non-5xx ; il n'est plus utilisé comme preuve déterministe du 429
- absence de code pilote public : OK
- endpoint public : `purple-voice-a8e3.dr-beddok.workers.dev`
- configuration déclarative : Worker `purple-voice-a8e3`, binding `RATE_LIMITER`, namespace `1001`, 20/60 s

## Rate limiting
Le test instantané précédent supposait qu'un burst de 25 requêtes devait obligatoirement produire un HTTP 429. Cette hypothèse a été retirée du gate strict : le comportement du compteur Cloudflare peut être permissif / éventuellement cohérent pendant un burst très court.

La protection n'a pas été affaiblie :
- le Worker conserve le binding `RATE_LIMITER` 20/60 s ;
- le test espacé reste le gate strict et exige un HTTP 429 réel ;
- le red-team respecte désormais un éventuel 429 de CI avec un backoff puis un rejeu unique du même cas.

## Confidentialité / logs
Vérifié dans le code :
- la clé IP utilisée par le rate limiter est dérivée de `SHA-256(RATE_LIMIT_SALT | IP)` et tronquée ;
- aucune question, IP, clé hashée, carte ou réponse n'est écrite par un `console.log` applicatif dans le Worker public ;
- aucun secret n'est embarqué dans le client public ou dans la PR ;
- `store:false` est utilisé pour les appels OpenAI.

Reste à vérifier manuellement dans Cloudflare avant fusion :
- `RATE_LIMIT_SALT` présent sous forme de **Secret**, avec une nouvelle valeur aléatoire ;
- aucune valeur du salt copiée dans GitHub, la CI, la documentation ou les logs ;
- configuration Observability / Workers Logs et rétention limitée au strict nécessaire.

## Workflows historiques rouges non utilisés comme gates V2
Les workflows suivants restent rouges pour des raisons antérieures / hors périmètre V2 :
- ancien widget / harness Alpha : rendu attendu par l'ancienne interface ; la régression V2 qu'il exécute en amont passe bien **132/132** ;
- Search V2 Corpus Coverage : l'étape de régression P0 passe, l'échec est ensuite dans d'anciens cas curated ;
- Corpus Pipeline : dette d'intégrité historique du référentiel.

Ils ne doivent pas être rendus verts en modifiant le corpus médical ou en réintroduisant l'ancien comportement UI.

## Rollback
Référence pré-cutover auditée : `feat/v0-magazine` au SHA `0ec265332d43bd7abcdf5f1a0f1668ad5a0b8b5e`.

En cas d'incident après fusion :
1. Revert de la fusion PR #35 sur `feat/v0-magazine` par commit de revert, sans reset forcé.
2. Vérification du retour de l'ancienne recherche / ancien widget sur desktop et mobile.
3. Le Worker V2 peut rester déployé mais non utilisé ; s'il est lui-même en cause, restaurer son déploiement Cloudflare précédent.
4. Rejouer le smoke de l'interface restaurée avant une nouvelle tentative.

## Verrous restants avant fusion
1. Rotation / vérification manuelle de `RATE_LIMIT_SALT` en Secret Cloudflare.
2. Vérification manuelle de la configuration des logs / rétention Cloudflare.
3. Rejouer smoke + red-team + rate-limit paced après rotation du salt.
4. Fusionner la PR #35 seulement si ces trois validations restent vertes.
5. Après fusion, test end-to-end depuis la véritable interface publique sur PC : recherche + Assistant avec `cystite`, `Alzheimer`, `prise de sang Alzheimer`, une question ambiguë, une question hors corpus et une demande médicale personnalisée.

## État
**NO-GO temporaire de procédure uniquement** : le code et les gates automatisés P0 sont prêts, mais la rotation du `RATE_LIMIT_SALT`, la vérification des logs Cloudflare et le test E2E public post-fusion n'ont pas encore été réalisés / constatés. Aucune mise en production ne doit être faite avant ces vérifications.
