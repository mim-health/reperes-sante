# MACA — Correction intégrité corpus — 31/08/2026

Branche cible de préparation : `fix/corpus-v2-integrity-20260831`.

Objectif : garantir qu'un même corpus canonique complet alimente la bibliothèque, la recherche et le prototype assistant avant intégration du référentiel V2.

Corrections prévues :
1. rendre le lot femmes/gériatrie du 27/08 additif au lieu de réinitialiser `window.healthQuestions` ;
2. faire convertir par le bridge les deux registres structurés `SANTEJUSTE_BACKLOG_AUDITED` et `MACA_BACKLOG_AUDITED` ;
3. exécuter le bridge après le chargement de tous les fichiers de données du manifest ;
4. auditer le corpus canonique final et non seulement les tableaux legacy ;
5. traiter séparément la déduplication UI par titre et le scoring de recherche lors du passage au moteur V2.

Aucun contenu médical n'est modifié par ce ticket.
