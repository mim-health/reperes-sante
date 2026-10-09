# Patient Question Map — replay réel du 9 octobre 2026

Les 51 questions générales de test ont été envoyées à MACA Assistant, sans données personnelles. Le replay est terminé. Il mesure un benchmark synthétique, pas une collecte de questions de visiteurs.

## Résultats du premier passage

| Résultat technique | Nombre | Part |
|---|---:|---:|
| Réponse produite (`answer`) | 35 | 68,6 % |
| Orientation vers une catégorie sans réponse (`category_only`) | 9 | 17,6 % |
| Abstention (`abstain`) | 5 | 9,8 % |
| Erreur technique | 2 | 3,9 % |
| Total | 51 | 100 % |

**68,6 % est un taux de réponse, pas un taux de couverture éditoriale complète.** Certaines réponses restent partielles ou reposent sur des fiches générales. Le score historique de 16/27 intentions strictement closes ne peut pas être comparé directement à ce taux.

| Lot | Questions | Réponse | Catégorie seule | Abstention | Erreur |
|---|---:|---:|---:|---:|---:|
| Historique MICI | 9 | 3 | 4 | 2 | 0 |
| Historique diabète | 10 | 7 | 1 | 2 | 0 |
| Historique Alzheimer | 8 | 6 | 1 | 0 | 1 |
| Extension Alzheimer | 8 | 6 | 0 | 1 | 1 |
| Extension cancer | 8 | 5 | 3 | 0 | 0 |
| Extension insuffisance cardiaque | 8 | 8 | 0 | 0 | 0 |

## Priorités de correction

1. **Deux erreurs HTTP 503 avec JSON incomplet** : après un diagnostic Alzheimer (lot historique) et sommeil Alzheimer (extension). Examiner la génération et le parsing ; garder ces échecs dans le score du premier passage.
2. **Quatre abstentions malgré un contenu adapté disponible** : diversification alimentaire MICI, alimentation autour du sport avec diabète, confidentialité au travail avec MICI, voyage avec diabète. Les diagnostics de grounding/contrat indiquent un problème à investiguer dans la chaîne de réponse ; ils ne suffisent pas à attribuer la cause uniquement à la recherche des fiches.
3. **MICI** : activité physique, fatigue liée aux traitements, grossesse et sexualité/désir d’enfant restent sans réponse dans ce passage.
4. **Cancer** : alimentation, travail et droits restent sans réponse. Une fiche générale sur le travail existe ; vérifier sa mobilisation avant de produire un doublon.
5. **Alzheimer** : droits des aidants sans réponse ; répit des aidants en abstention ; consultation mémoire et après-diagnostic méritent une revue de complétude.
6. **Insuffisance cardiaque** : 8 réponses sur 8, mais activité physique, médicaments, voyage en avion et travail reposent surtout sur du contenu général ou voisin. Une réponse produite ne clôt pas automatiquement ces intentions.
7. **Diabète** : sport à jeun, complications et organisation quotidienne du traitement nécessitent une revue de complétude ; suivi du diabétologue reste sans réponse.

## Méthode et traçabilité

- Endpoint : https://purple-voice-a8e3.dr-beddok.workers.dev/
- 51 formulations originales ; requêtes séquentielles via Node fetch ; pas de relance automatique après erreur.
- Corpus observé : 357 fiches.
- Empreinte : `cd125fbdf25bea6c4a4e002f7fbdb2ec6f758cd9b9f3f96dba4a84ebe92be014`.
- Résultats complets : `pqm-relaunch/replay-2026-10-09.json` (questions, réponses, fiches utilisées, diagnostics et durées).
- Exécution : https://github.com/mim-health/reperes-sante/actions/runs/37911661556
- Branche de travail : `audit/question-map-replay-20261009`, dépôt `mim-health/reperes-sante`.
- Aucun changement apporté au moteur médical, aux fiches ou au site pendant ce replay.

La collecte réelle de questions visiteurs (Question Graph) et le Top 10 issu de cette collecte ne sont pas attestés par ce test. La prochaine étape est de corriger les erreurs et les abstentions évitables, puis de refaire les mêmes formulations et de valider la couverture éditoriale intention par intention.
