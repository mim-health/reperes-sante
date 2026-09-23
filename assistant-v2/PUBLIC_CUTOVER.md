# Bascule publique Assistant V2

État attendu avant fusion de la PR d’intégration :

1. Déployer `cloudflare-worker-public.js` sur le Worker `purple-voice-a8e3`.
2. Conserver `OPENAI_API_KEY` comme secret Cloudflare.
3. Remplacer `RATE_LIMIT_SALT` par une nouvelle valeur aléatoire et la stocker comme secret Cloudflare. Ne jamais conserver ni recopier sa valeur dans GitHub, la CI, la documentation ou les logs.
4. Activer le binding `RATE_LIMITER` (20 requêtes/minute par clé IP hashée, namespace `1001`).
5. Vérifier `GET /?maca_public_ready=1` → `{"service":"maca-assistant-v2","public_ready":true}`.
6. Rejouer le red-team dynamique et obtenir 22/22. Un HTTP 429 provenant du quota de test doit entraîner un backoff puis un rejeu du même cas, pas un affaiblissement du rate limiter.
7. Vérifier un 429 réel avec le test espacé `assistant v2 public rate-limit paced`. Le test burst instantané est informatif : l’API Rate Limiting Cloudflare est permissive/éventuellement cohérente et ne garantit pas un 429 déterministe sur un burst très court.
8. Vérifier les logs/confidentialité : aucun `console.log` applicatif ne doit écrire la question, l’IP, le hash d’IP, les cartes ou les réponses ; le code public ne doit exposer aucun secret ; `store:false` reste activé pour les appels OpenAI. Contrôler dans Cloudflare la configuration d’Observability/Workers Logs et limiter la rétention au strict nécessaire.
9. Seulement ensuite fusionner la PR vers `feat/v0-magazine`.
10. Après fusion, faire le test end-to-end depuis `https://macasante.fr` sur PC : recherche + Assistant, avec `cystite`, `Alzheimer`, `prise de sang Alzheimer`, une question ambiguë, une question hors corpus et une demande médicale personnalisée.

Le client public est fail-closed : tant que le handshake de readiness n’existe pas, le V2 ne remplace pas l’interface existante.

## Rollback

Référence pré-cutover auditée le 23/09/2026 : `feat/v0-magazine` au SHA `0ec265332d43bd7abcdf5f1a0f1668ad5a0b8b5e`.

En cas d’anomalie après fusion :

1. Ne pas modifier le corpus médical pour corriger l’incident.
2. Revenir sur la fusion de la PR #35 par un commit de revert sur `feat/v0-magazine` (préféré à un reset forcé), ce qui restaure l’interface publique antérieure tout en conservant l’historique Git.
3. Vérifier ensuite `macasante.fr` sur desktop et mobile : ancienne recherche/widget restaurés, aucune référence publique au client V2 unifié.
4. Le Worker `purple-voice-a8e3` peut rester déployé mais devient non utilisé par l’interface restaurée. Si l’incident vient du Worker lui-même ou d’une exposition inattendue, restaurer sa version Cloudflare précédente depuis l’historique des déploiements.
5. Rejouer smoke de l’interface restaurée avant toute nouvelle tentative de cutover.

Le GO public n’est prononcé que si le rollback est compris, exécutable et ne dépend d’aucune modification du corpus.
