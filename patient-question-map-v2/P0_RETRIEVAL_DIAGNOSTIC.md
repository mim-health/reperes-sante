# P0 Retrieval Patient Question Map — état 20/09/2026

## Diagnostic
Le problème n'est pas un seuil global trop strict. Les fiches PQM ont été ajoutées au corpus, mais leurs intentions ne sont pas toutes présentes dans le référentiel déterministe. Le fallback metadata exige que tous les mots significatifs de la question soient présents dans titre/keywords ; des formulations naturelles comme « refuse de s'habiller » vs « habillage », ou « quel impact le voyage… » ne passent donc pas. En parallèle, le micro-correctif pilote historique contient une route beaucoup trop large : toute question contenant « diabète » est forcée vers la fiche de dépistage/complications. Cette route explique plusieurs faux positifs observés dans le replay initial.

## Correctif candidat
`search-pqm-retrieval-candidate.js` ajoute uniquement des routes **pathologie + intention** vers des fiches PQM déjà VALIDATED :
- MICI + alimentation → `mici-alimentation-poussee`
- MICI + travail → `maladie-chronique-travail-confidentialite`
- MICI + voyage → `maladie-chronique-voyage`
- diabète + activité/glycémie → `diabete-activite-physique-glycemie`
- diabète + pied → `diabete-pied-prevention`
- diabète + travail → `maladie-chronique-travail-confidentialite`
- diabète + voyage → `maladie-chronique-voyage`
- Alzheimer + refus/toilette/habillage/repas → `alzheimer-refus-soins-repas`

Aucun seuil/scoring général ni contenu médical n'est modifié.

## Replay ciblé
Après correctif candidat, les formulations sources concernées retrouvent correctement les fiches ci-dessus, notamment :
- alimentation MICI (poussée, diversification, plaisir) ;
- diabète + activité physique ;
- diabète + pied ;
- refus Alzheimer (repas, habillage, toilette) ;
- travail MICI/diabète ;
- voyage MICI/diabète.

Deux intentions du POC ne doivent pas être artificiellement routées : activité physique + MICI (pas de fiche dédiée suffisante) et les autres gaps éditoriaux réellement absents.

## Non-régression
Le benchmark P0 existant comporte actuellement **11 échecs déjà présents dans la pile de production testée** (attentes devenues obsolètes ou changements antérieurs : cystite, fatigue, pertes vaginales, alternatives reflux/contraception, etc.). Le candidat PQM n'ajoute pas de collision visible avec ces cas, mais il serait faux d'annoncer 120/120 avant de remettre le benchmark de référence en cohérence avec la production validée.

## Décision
**NE PAS DÉPLOYER ENCORE.** Prochaine étape : comparer le benchmark juste avant/après le seul patch PQM pour prouver delta = 0 hors cas PQM, ajouter des cas négatifs dédiés (ex. diabète sans intention activité/pied/travail/voyage), puis seulement proposer la promotion vers production.
