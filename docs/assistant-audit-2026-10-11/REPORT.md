# Assistant MACASANTÉ — audit du 11 octobre 2026

**Décision : BLOQUÉ / NO-GO pour un premier test autonome auprès de 30 utilisateurs extérieurs.**

Branche : `feat/v0-magazine`. Corpus public : 394 documents (377 fiches, 17 articles), empreinte `f18e9123988d3026c15a57ca85c2f4e497606b892c6d171693168b80a4eb322c`.

| Axe | Résultat | Preuve / limite |
|---|---|---|
| Recherche locale | PASS | 139 contrôles existants, 47 complémentaires, 8 cas IPP et gardes de population |
| Benchmark public original | FAIL | 51 questions : 36 réponses, 3 orientations de catégorie, 9 abstentions, 3 erreurs HTTP 503 ; médiane 5,861 s |
| Relance des 3 erreurs | FAIL | Diabète : encore 503 ; Alzheimer : abstention ; insuffisance cardiaque : réponse. Le résultat initial est conservé |
| Corpus récent | PASS | Deux nouvelles fiches et trois articles du Mag retrouvés dans les 16 essais ciblés ; date et distinction actualité / référence vérifiées |
| Sources | PASS | 46 sources distinctes : identifiant, URL conforme et HTTP 200 ; clic réel vers un article vérifié |
| Limites | PASS dans les cas testés | 22 cas publics ; urgence orientée vers 15/112, hors corpus et ambiguïté traités sans invention |
| Fidélité déployée | BLOQUÉ | Révision attendue `2026-10-11-ipp-grounding1` absente ; jeton Cloudflare manquant |
| Mesures / interface | PASS | Ouverture, envoi, réponse/abstention, erreur, délai, clic source et Utile/Pas utile ; export réel joint |
| Mobile réel | BLOQUÉ | Aucun essai sur téléphone physique disponible ; clavier, tactile et ouverture des liens restent à vérifier |

## Corrections techniques

Gestion des erreurs réseau/serveur et du délai maximal, prévention des doubles envois, limite de 600 caractères, nettoyage des sources anciennes, liens conformes au domaine MACASANTÉ, sources différenciées et feedback simple. Tests simulés de récupération et de non-régression réussis. Aucun contenu médical modifié.

Les événements restent dans le stockage de session du navigateur, avec export manuel volontaire (200 événements maximum). Ils ne contiennent ni question, réponse, IP, identité, ni URL ; aucun envoi publicitaire. La collecte centrale automatique et le comptage des visiteurs uniques ne sont pas mis en place. L’export joint prouve un clic vers une source et un vote, pas une appréciation clinique.

Le chargement de l’Assistant est rendu indépendant du chargement des fiches locales. Publication réussie : [run 38155615166](https://github.com/mim-health/reperes-sante/actions/runs/38155615166). Le script public `pilot3` et l’ouverture du panneau après rechargement ont été vérifiés dans le navigateur. Le contrôle public de révision du Worker échoue toujours : révision absente malgré le corpus actif correct.

## Anomalies et clôture

Les échecs sont détaillés dans [anomalies.json](anomalies.json), avec question, attendu, obtenu et version. Une abstention intermittente sur la piqûre de guêpe a aussi fait échouer le contrôle public CI : [run 38155086163](https://github.com/mim-health/reperes-sante/actions/runs/38155086163). Les contenus couverts qui s’abstiennent demandent une revue ; les lacunes éditoriales et toute modification médicale doivent être soumises à Romain BEDDOK.

Le correctif de fidélité a passé ses vérifications candidates mais sa publication a été bloquée : [run 38127965160](https://github.com/mim-health/reperes-sante/actions/runs/38127965160). Le contrôle de la révision publique échoue encore. Il faut configurer le secret Cloudflare dans GitHub, publier puis vérifier réellement la révision, résoudre les 503 et les abstentions intermittentes, rejouer les cas concernés et effectuer le parcours mobile avant GO.

Aucune anomalie critique de sécurité ou de fidélité n’a été identifiée dans les réponses examinées ; les chiffres et nuances ciblés ont été comparés aux documents effectivement cités. Cela ne constitue ni une validation médicale exhaustive ni une garantie absolue de sécurité. Les blocages empêchent de clôturer le ticket.

## Preuves reproductibles

[51 questions originales](benchmark-51.json), [rejeu complet](benchmark-live.json), [relance erreurs](error-replay.json), [16 essais ciblés et documents utilisés](live.json), [22 limites](red-team.json), [46 liens](source-links.json), [export navigateur anonyme](metrics-browser.json).

Scripts : `scripts/replay-assistant-benchmark.js`, `scripts/replay-assistant-errors.js`, `scripts/audit-assistant-public.js`, `scripts/check-assistant-audit-sources.js`, `scripts/test-assistant-pilot.js`.
