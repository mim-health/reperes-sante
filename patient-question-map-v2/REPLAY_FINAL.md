# Patient Question Map — replay final lot #1

Date : 20/09/2026

Règle finale : **un gap n'est fermé que si (1) le contenu répond réellement à l'intention ET (2) le moteur retrouve la bonne fiche sur la formulation patient d'origine.**

## Résultat
- 27 intentions rejouées sans reformulation.
- 16 gaps **FERMÉS** : contenu COUVERT + bonne fiche retrouvée.
- 1 intention **PARTIELLEMENT COUVERTE et retrouvée** : sport à jeun + diabète.
- 10 intentions avec contenu **ABSENT** : elles restent ouvertes.
- 18/27 requêtes produisent un résultat moteur, mais ce nombre brut n'est pas utilisé comme score de couverture.

### Coverage Score strict
- Avant lot #1 : 1/27 gap fermé = **3,7 %**.
- Après intégration des fiches + correctif retrieval : 16/27 gaps fermés = **59,3 %**.
- Si l'on conserve l'indicateur pondéré historique (PARTIEL = 0,5) : (16 + 0,5) / 27 = **61,1 %**.

## Gaps fermés
Alimentation MICI (poussée, diversification, plaisir), activité/alimentation diabète, glycémie/hypoglycémie + activité, complications diabète, conduite Alzheimer, entrée en établissement Alzheimer, pied diabétique, refus Alzheimer (manger/habillage/toilette), travail diabète, travail MICI, voyage diabète, voyage MICI.

## Partiel
- Sport à jeun + diabète → la fiche activité physique est retrouvée, mais le contenu ne répond pas explicitement à toute la question du jeûne. Le gap n'est donc pas déclaré fermé.

## Gaps ouverts — contenu absent
Activité physique + MICI ; aliments interdits + diabète ; après-diagnostic Alzheimer ; droits du proche aidant ; fatigue liée aux traitements MICI ; grossesse + MICI ; quotidien du diabète selon traitement ; sexualité/désir d'enfant + MICI ; sommeil + Alzheimer ; suivi diabétologue.

## Anomalie distincte
La question fatigue + traitements MICI déclenche encore des fiches fatigue génériques alors que le contenu spécifique est absent. Elle reste correctement classée gap ouvert ; ce résultat moteur ne doit jamais être compté comme fermeture.

## Non-régression
Le correctif PQM n'a pas introduit de changement sur les 120 requêtes du benchmark historique lors du test différentiel. Les 11 écarts déjà présents avant ce chantier restent hors périmètre de cette correction.

## Conclusion
Le lot #1 fait passer la fermeture stricte des gaps de **3,7 % à 59,3 %** sur ce jeu de 27 intentions. La règle « contenu adéquat + retrieval correct » est désormais l'indicateur de référence du Patient Question Map.
