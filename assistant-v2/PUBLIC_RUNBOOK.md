# MACA Santé — Assistant IA V2 — Runbook ouverture / rollback

Date: 2026-09-19

## Principe
V2 reste isolé de V1.6. Aucun changement de corpus, retrieval, seuil ou prompt n'est nécessaire pour activer ou retirer V2.

## Préconditions obligatoires avant exposition publique
- Red-team de bout en bout validé, sans défaut critique de grounding, contournement du corpus, diagnostic ou conseil individualisé.
- Binding Cloudflare RATE_LIMITER configuré et vérifié par un test réel 429.
- OPENAI_API_KEY uniquement en secret serveur.
- Origine autorisée limitée au domaine MACA attendu.
- Taille de requête et longueur de question limitées.
- Observabilité technique active sans journalisation volontaire du texte brut des questions.
- Vérification des règles de rétention/logging Cloudflare.
- Version V1.6 publique connue et testée comme solution de repli.

## Rollback immédiat
Déclencheurs: fait médical non soutenu par les fiches citées; contournement reproductible du corpus; diagnostic/conduite individualisée; fuite de secret; anomalie de confidentialité; hausse anormale de trafic/coût; indisponibilité persistante.

1. Retirer le point d'entrée public V2 du site et rétablir le lien/route V1.6.
2. Ne pas modifier V1.6.
3. Si suspicion d'abus ou fuite, désactiver le Worker V2 ou son accès public et faire tourner le secret concerné.
4. Conserver uniquement les métriques techniques non sensibles nécessaires au diagnostic; ne pas copier les questions médicales brutes dans les tickets/logs.
5. Identifier le cas reproductible et la cause racine sur branche isolée.
6. Ajouter le cas au banc permanent de non-régression.
7. Corriger localement puis refaire red-team + grounding avant toute réouverture.

## Critère de réussite rollback
Un utilisateur public ne peut plus atteindre V2 et retrouve V1.6; aucune modification du corpus public n'est nécessaire.

## Configuration rate limiting
Le Worker de hardening est fail-closed: sans binding RATE_LIMITER valide il renvoie 503 avant tout appel OpenAI. En dépassement il renvoie 429. La valeur de limite/fenêtre doit être définie dans la configuration Cloudflare et testée avant déploiement. Ne pas simuler la présence du binding.

## Données à mesurer sans question brute
Compteurs agrégés: total requêtes, answer, category_only, abstain, contract_rejected, grounding_rejected, 4xx, 5xx, 429. Les IDs de fiches citées peuvent être comptés de manière agrégée. Ne pas journaliser volontairement question, réponse libre, adresse IP, code pilote ou secret API.
