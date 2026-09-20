# Replay complet PQM #1 — après correctif retrieval

Date : 20/09/2026

Configuration : pile réelle de recherche de `feat/v0-magazine` + `search-pqm-retrieval-candidate.js`, dans le même ordre que celui branché dans `corpus-v2-browser-entry.js`.

Les 27 formulations sont celles du POC, sans reformulation.

## Résultat moteur brut
- 18/27 questions produisent au moins un résultat.
- 9/27 restent en abstention.

Ce chiffre brut n'est **pas** le Coverage Score : un résultat n'est pas considéré couvert s'il pointe vers une fiche qui ne répond pas réellement à l'intention.

## Fermeture réelle des gaps
Le contenu après lot #1 avait été audité à :
- 16 COUVERT
- 1 PARTIELLEMENT COUVERT
- 10 ABSENT
- Coverage contenu : 61,1 %

Le correctif retrieval ferme les principaux écarts où une fiche adéquate existait mais n'était pas retrouvée :
- alimentation MICI : poussée, diversification, alimentation-plaisir ;
- diabète + activité physique ;
- pied diabétique ;
- refus Alzheimer : repas, habillage, toilette ;
- travail : MICI et diabète ;
- voyage : MICI et diabète ;
- sport à jeun + diabète → fiche activité physique (à considérer partiel si la fiche ne répond pas explicitement au jeûne).

## Gaps qui restent légitimes
Ne pas les « réparer » par le moteur :
- activité physique + MICI ;
- aliments interdits + diabète ;
- après-diagnostic Alzheimer ;
- droits du proche aidant ;
- fatigue liée aux traitements MICI ;
- grossesse + MICI ;
- quotidien du diabète selon traitement ;
- sexualité/désir d'enfant + MICI ;
- sommeil + Alzheimer ;
- suivi diabétologue.

## Deux anomalies de retrieval encore à corriger
1. `GLYCEMIE_SPORT_DIABETE` — « Comment gérer glycémie/hypoglycémie avant une activité physique ? » ne contient pas le mot diabète ; la fiche adéquate existe mais le routeur pathologie+intention ne peut pas l'identifier. Il faut ajouter une route très spécifique glycémie/hypoglycémie + activité physique, sans route générique.
2. Certaines questions diabète hors périmètre continuent d'être forcées par l'ancien `search-v2-retrouvabilite-pilot-fix.js` vers `diabete-type-2-depistage-complications` (aliments interdits, quotidien selon traitement). Ce sont des faux positifs historiques : ils ne doivent pas compter comme COUVERT.

## Conclusion
Le correctif améliore fortement la retrievabilité des fiches PQM, mais le replay complet n'est **pas encore PASS final**. Il reste une correction retrieval légitime (glycémie/hypoglycémie + activité) et un ancien routeur diabète trop large à neutraliser proprement avant promotion.
