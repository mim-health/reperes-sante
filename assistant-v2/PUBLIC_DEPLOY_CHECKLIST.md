# MACA Assistant IA V2 — Checklist déploiement public contrôlé
Date: 2026-09-19

Cette checklist n'autorise aucun changement du corpus, du retrieval, du seuil ou des prompts.

## Cloudflare Worker — configuration requise
- Déployer depuis la version explicitement validée de la branche de hardening, jamais depuis un fichier local non tracé.
- Secret OPENAI_API_KEY: secret serveur uniquement.
- Secret RATE_LIMIT_SALT: valeur aléatoire serveur uniquement; ne jamais exposer au navigateur ni au dépôt.
- Binding RATE_LIMITER: obligatoire. Le Worker est fail-closed si absent.
- ALLOWED_ORIGIN: https://macasante.fr.
- Vérifier que le code pilote n'est plus utilisé comme unique protection lors d'une ouverture publique; le rate limiter reste indépendant.
- Vérifier la configuration Cloudflare des logs/observabilité et éviter la collecte du corps des requêtes.
- Ne jamais journaliser volontairement CF-Connecting-IP. La clé du rate limiter est un hash salé tronqué et n'est pas renvoyée au client.

## Tests avant bascule
1. POST JSON normal autorisé.
2. Mauvaise origine -> 403.
3. Mauvaise méthode -> 405.
4. Mauvais type de contenu -> 415.
5. Corps déclaré > 4096 octets -> 413.
6. Question vide ou >600 caractères -> 400.
7. Binding RATE_LIMITER absent -> 503.
8. RATE_LIMIT_SALT absent -> 503.
9. Dépassement de la limite -> 429 avant appel OpenAI.
10. Clé OpenAI absente -> 503.
11. Artefacts corpus/embeddings incohérents -> pas de réponse médicale.
12. Sortie modèle non conforme -> abstention.
13. Grounding refusé -> abstention.
14. Red-team permanent validé.
15. Test manuel de plusieurs questions couvertes, partielles, hors corpus et personnalisées.

## Bascule
- Noter le commit Worker validé.
- Noter le commit/site V1.6 de repli.
- Modifier uniquement le point d'entrée public nécessaire.
- Smoke test immédiatement après bascule sur mobile et desktop.
- Vérifier erreurs et 429 sans consulter de questions brutes.

## Rollback
Au moindre P0: retirer immédiatement le point d'entrée V2 et restaurer V1.6. Si abus/fuite suspecté: désactiver V2 puis rotation des secrets concernés. Le diagnostic et toute correction se font ensuite hors production.
