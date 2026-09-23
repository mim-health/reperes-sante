# Assistant IA V2 — Performance baseline — 2026-09-23

## Mesure publique

Mesure effectuée contre le Worker public `purple-voice-a8e3`, depuis GitHub Actions, avec requêtes espacées pour rester compatibles avec le rate limiting.

| Cas | HTTP | Temps total |
|---|---:|---:|
| Readiness | 200 | 0,082 s |
| `Une prise de sang peut-elle rechercher Alzheimer ?` | 200 | 9,417 s |
| `Le magnésium aide-t-il vraiment à dormir ?` | 200 | 8,375 s |
| Hors corpus Lyme chronique | 200 | 4,617 s |

Les réponses couvertes utilisaient le grounding final et la bonne version d'artefacts (290 fiches). Le cas hors corpus / catégorie seule ne nécessitait pas le second passage de grounding.

## Diagnostic

- Réseau / Cloudflare : négligeable par rapport au temps total (readiness ~80 ms).
- Premier chargement des artefacts : surcoût visible mais secondaire (~1 s sur la première requête mesurée).
- Embedding + retrieval + synthèse : environ 4–5 s.
- Grounding LLM final : surcoût d'environ 3–4 s pour les réponses normales.
- Le cache mémoire du Worker fonctionne : les requêtes suivantes utilisent la même version chargée.
- Le refresh de `latest.json` toutes les 60 s n'est pas le goulet d'étranglement principal.

## Décision CTO

Ne pas supprimer le grounding final uniquement pour gagner de la latence : il constitue un garde-fou de fidélité documentaire essentiel.

Optimisations autorisées uniquement après benchmark complet :

1. réduire la taille du contexte envoyé au synthétiseur (top-K / compaction) si le benchmark 132/132 et le red-team 22/22 restent verts ;
2. tester un grounding plus compact sans changer sa décision binaire ni son niveau d'exigence ;
3. mesurer séparément synthèse et grounding avant tout changement de modèle ;
4. ne pas introduire de cache de questions ou de contenu utilisateur sans revue confidentialité ;
5. conserver le fallback sur dernière version saine et le rate limiting.

## Cibles

- Readiness : < 1 s
- Hors corpus / abstention : cible < 5 s
- Réponse normale : cible court terme < 7 s, objectif idéal ~5 s
- Aucun gain de performance ne doit réduire le grounding, l'abstention ou la protection contre le conseil médical personnalisé.
