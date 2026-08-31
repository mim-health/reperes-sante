# MACA Santé — Référentiel Corpus V2

**Date de référence : 31/08/2026**  
**Branche de référence :** `feat/v0-magazine`  
**Statut :** document produit de référence — validation en cours

## Référentiel complet

Le référentiel exhaustif du corpus MACA V2 est enregistré dans Google Drive sous forme de feuille native :

**MACA — Référentiel Corpus V2 — 31.08.2026**  
https://docs.google.com/spreadsheets/d/1J87nGAxHRknFsHtl_fhV3pYw6R7TtbpIPH5H2QsZ_28/edit

Le référentiel contient **180 IDs/fiches uniques** inventoriés depuis le `corpus-manifest.js` actuel.

Pour chaque fiche sont documentés :
- ID ;
- titre canonique ;
- rubrique canonique ;
- rubrique et fichier source ;
- mots-clés existants ;
- synonymes médicaux proposés ;
- formulations grand public proposées ;
- formulations patients ;
- questions patient typiques ;
- exclusions / ambiguïtés ;
- contexte / population ;
- signal Alpha ;
- présence runtime ;
- priorité P0/P1/P2 ;
- statut de validation ;
- statut « intégrable V2 ».

## Principe moteur validé

> **Une fiche existe → MACA doit savoir la retrouver avec le langage réel du patient.**
>
> **Aucune fiche ne correspond suffisamment → MACA ne propose rien.**

Le moteur V2 est un moteur conversationnel d’accès au corpus vérifié. Il ne génère pas de réponse médicale de remplacement lorsqu’aucune fiche n’est suffisamment correspondante.

## Gouvernance

Les synonymes et formulations proposés dans le référentiel ne sont **pas intégrés automatiquement**. Ils doivent être validés avant déploiement dans le moteur V2.

Les retours Alpha sont classés en :
1. bonne réponse ;
2. mauvaise fiche ;
3. fiche existante non retrouvée ;
4. sujet absent.

Les questions sans fiche alimentent le backlog éditorial mais ne déclenchent pas automatiquement la création d’un contenu.

## Points techniques identifiés pendant l’inventaire

Le classeur contient un onglet `Anomalies corpus` recensant notamment :
- une réaffectation potentiellement destructive de `window.healthQuestions` dans le lot femmes/gériatrie du 27/08 ;
- des entrées `MACA_BACKLOG_AUDITED` qui ne semblent pas toutes exposées par le bridge actuel ;
- une déduplication UI par titre encore présente dans `app.js` ;
- un scoring de recherche actuel qui utilise aussi le corps de réponse et peut favoriser des faux positifs.

Ces anomalies doivent être vérifiées/corrigées avant l’intégration définitive du référentiel au moteur.

## Fichiers locaux de travail produits le 31/08/2026

- `MACA_Referentiel_V2_Corpus_2026-08-31.xlsx` — classeur complet de validation ;
- `MACA_Referentiel_V2_Corpus_2026-08-31.csv` — export tabulaire ;
- ce document GitHub — point d’ancrage versionné du référentiel.
