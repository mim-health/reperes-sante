# MACA_PATIENT_QUESTION_MAP_POC — V1

## But
Mesurer la couverture du corpus MACA face aux questions réellement publiées par des associations de patients. Ce chantier ne modifie jamais MACA.

## Périmètre V1
- MICI — AFA Crohn RCH
- Alzheimer — France Alzheimer
- Diabète — Fédération Française des Diabétiques
- Référence de départ : 272 fiches du corpus Assistant V2.

## Pipeline
1. Collecter uniquement des pages publiques autorisées.
2. Conserver `source_text`, URL, association et pathologie.
3. Créer séparément `normalized_question`.
4. Regrouper en intentions auditables sans perdre les formulations sources.
5. Comparer l'intention au contenu des fiches MACA, jamais au seul titre/mot-clé.
6. Classer : COUVERT / PARTIEL / ABSENT / À VÉRIFIER.
7. COUVERT ou PARTIEL exige ID + titre de fiche MACA et justification.
8. Calculer seulement un signal FAIBLE / MOYEN / FORT / NON DÉTERMINABLE.
9. Contrôle humain d'un échantillon avant toute décision éditoriale.

## Résultat POC initial
27 intentions : 1 COUVERT, 4 PARTIEL, 22 ABSENT après revue conservatrice. Le POC montre surtout des lacunes de vie quotidienne avec maladie chronique, et non un manque uniforme d'information médicale.

## Garde-fous
- aucune création/modification de fiche ;
- aucun changement corpus, MACA_SEARCH_V2, seuil ou Assistant ;
- aucune reformulation IA présentée comme citation ;
- aucun rapprochement forcé ;
- ABSENT n'est validé qu'après recherche corpus suffisante ;
- toute industrialisation doit rester reproductible et auditable.

## Étape suivante
Élargir progressivement la carte à 15–20 maladies chroniques et plusieurs associations par maladie, puis croiser les gaps consolidés avec Search Console et les questions réelles posées à MACA. La création de fiches reste un chantier éditorial distinct avec validation médicale.
