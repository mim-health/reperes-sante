# PQM Retrieval — validation de non-régression

Date : 20/09/2026

## Méthode
Comparaison stricte, même corpus et même pile de production :
1. production actuelle ;
2. production actuelle + seul `search-pqm-retrieval-candidate.js`.

Aucun seuil, scoring global ou contenu médical modifié.

## Benchmark historique
- 120 requêtes comparées avant/après.
- **Delta induit par le patch PQM : 0/120.**
- Les 11 divergences du benchmark historique déjà observées sont identiques avant et après : elles ne sont donc pas causées par le patch PQM.

## Cas négatifs dédiés
Aucun changement avant/après pour :
- diabète générique ;
- dépistage diabète ;
- complications diabète ;
- traitement diabète ;
- alimentation diabète ;
- grossesse diabète ;
- MICI + fatigue ;
- MICI + grossesse ;
- MICI + sexualité ;
- Alzheimer + sommeil ;
- Alzheimer + traitement ;
- Alzheimer + conduite.

Un garde-fou supplémentaire interdit explicitement de router `MICI + activité/sport/exercice/effort` vers la fiche alimentation : cette intention reste un vrai gap éditorial.

## Critère de promotion
Le candidat satisfait la condition de non-régression différentielle : **aucun changement hors routes PQM ciblées sur les 120 cas historiques testés**.

Il reste à intégrer le script dans la pile de chargement sur une branche technique de test, exécuter le replay complet des 27 intentions dans cette configuration réelle, puis seulement proposer le déploiement.
