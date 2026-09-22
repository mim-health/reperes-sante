# Bascule publique Assistant V2

État attendu avant fusion de la PR d’intégration :

1. Déployer `cloudflare-worker-public.js` sur le Worker `purple-voice-a8e3`.
2. Conserver le secret `OPENAI_API_KEY`.
3. Ajouter un secret aléatoire `RATE_LIMIT_SALT`.
4. Activer le binding `RATE_LIMITER` (20 requêtes/minute/IP hashée).
5. Vérifier `GET /?maca_public_ready=1` → `{"service":"maca-assistant-v2","public_ready":true}`.
6. Rejouer le red-team dynamique 22/22 sans code pilote.
7. Vérifier un 429 réel au-delà de la limite.
8. Seulement ensuite fusionner la PR vers `feat/v0-magazine`.

Le client public est fail-closed : tant que le handshake de readiness n’existe pas, le V2 ne remplace pas l’interface existante.
