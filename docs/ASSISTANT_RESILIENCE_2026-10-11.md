# Corrections Assistant — 11 octobre 2026

Le site est déjà public. Ces corrections améliorent l’Assistant existant ; elles ne conditionnent pas l’ouverture du site ni son audience actuelle.

## Interface publique

- Une seule relance automatique sur HTTP 502/503/504, sous le délai total de 45 secondes ; le premier échec reste enregistré dans les mesures anonymes.
- Une réponse rejetée pour fidélité n’est plus présentée comme une absence de documents. Jusqu’à trois fiches candidates peuvent être ouvertes directement, sous « Fiches à consulter — aucune réponse validée », distinct des sources d’une réponse.
- Les doubles envois, erreurs explicites, limites et mesures sans question restent conservés.

## Worker candidat

Révision attendue : `2026-10-11-resilience2`.

- Relance des erreurs temporaires de l’API amont (429/500/502/503/504 et incidents réseau), maximum deux tentatives, délai borné par requête.
- Une seule reformulation contrôlée après JSON malformé ou rejet mécanique/semantique. Chaque réponse corrigée repasse les preuves exactes, les chiffres, le contrôle de personnalisation et le vérificateur indépendant. Aucun abaissement du seuil de fidélité.
- L’échec persistant reste une erreur ou une abstention, jamais une réponse fabriquée.

## Validation

Tests locaux : 139 contrôles canoniques, 47 complémentaires, 8 IPP, 7 langage patient ; contrat documentaire et 11 scénarios Worker ; interface (reprise après 503, absence persistante, distinction fidélité/corpus, liens et mesures) réussis.

Le workflow de publication exécute le modèle réel sur les cas IPP, Galleri, diabète quotidien, après-diagnostic Alzheimer, médicaments d’insuffisance cardiaque, piqûre de guêpe et hors corpus avant tout déploiement. Les vérifications publiques exigent la nouvelle révision.

Aucun texte médical modifié. La publication du Worker nécessite le secret Cloudflare déjà signalé ; la présence de fichiers corrigés dans GitHub ne prouve pas leur activation.

## Résultat effectif

Interface publiée et vérifiée, fichiers publics identiques au correctif : [publication réussie](https://github.com/mim-health/reperes-sante/actions/runs/38156197477). Huit cas avec le modèle réel PASS : [validation et blocage de publication](https://github.com/mim-health/reperes-sante/actions/runs/38156197469). Le secret `CLOUDFLARE_API_TOKEN` est vide ; les étapes de déploiement et de vérification publique du Worker ont été sautées. La correction du moteur est prête mais non active. Configurer ce secret dans GitHub puis relancer « Assistant V2 verified Worker publication » sur `feat/v0-magazine`.

[Preuves de vérification](assistant-audit-2026-10-11/repair-verification.json).
