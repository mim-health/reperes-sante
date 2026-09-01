# MACA Santé — Référentiel Corpus V2

**Date de référence : 01/09/2026**  
**Branche de référence :** `feat/v0-magazine`  
**Statut :** référentiel de production courant

## Référentiel complet

La liste exhaustive du corpus MACA V2 est maintenue dans la feuille Google native :

**MACA — Référentiel Corpus V2 — 01.09.2026**  
https://docs.google.com/spreadsheets/d/1J87nGAxHRknFsHtl_fhV3pYw6R7TtbpIPH5H2QsZ_28/edit

Le référentiel contient désormais **234 fiches canoniques**.

État Search V2 au 01/09/2026 :

- **234** fiches canoniques chargées ;
- **6** IDs historiques explicitement exclus comme doublons/superseded ;
- **228** fiches distinctes routables ;
- **228/228** titres canoniques retrouvés ;
- **228/228** sondes courtes retrouvées ;
- **120/120** tests de régression P0 ;
- **47/47** cas ciblés corpus/Search V2.

Les 6 exclusions historiques restent :

- `rgo-adulte` ;
- `cystite-femme` ;
- `essoufflement-causes-signes-alerte` ;
- `palpitations` ;
- `poux-enfant` ;
- `diversification-alimentaire-bebe`.

## Répartition canonique actuelle

| Rubrique | Nombre |
| --- | ---: |
| Santé au quotidien | 107 |
| Cœur & prévention | 25 |
| Digestion & urinaire | 14 |
| Santé des femmes & grossesse | 21 |
| Enfants & parents | 30 |
| Ados | 7 |
| Santé mentale | 8 |
| Seniors | 22 |
| **Total** | **234** |

Les anciennes rubriques sources telles que `Cancer`, `Prévention`, `Santé urinaire`, `Santé de l’homme` ou `Après 60 ans` sont conservées dans le référentiel pour la traçabilité, mais sont mappées vers les huit rubriques publiques canoniques.

## Enrichissements du 01/09/2026

54 fiches ont été ajoutées au référentiel depuis l’état à 180 fiches du 31/08, via les lots suivants :

- prévention / urologie / seniors / santé des femmes — 10 fiches ;
- urologie / sexologie / femmes / seniors — 10 fiches ;
- femmes / seniors / ophtalmologie / douleurs — 10 fiches ;
- ORL / ophtalmologie / articulations / quotidien — 10 fiches ;
- fièvre / goutte / zona / cancérologie — 10 fiches ;
- médicaments / ophtalmologie / bucco-dentaire du quotidien — 4 fiches.

Les 54 nouvelles lignes sont marquées `VALIDÉ` et `Oui — intégré V2` dans l’onglet `Référentiel V2`.

## Principe moteur validé

> **Une fiche existe → MACA doit savoir la retrouver avec le langage réel du patient.**
>
> **Aucune fiche ne correspond suffisamment → MACA ne propose rien.**

Le moteur V2 sert uniquement à retrouver les fiches vérifiées du corpus. Il ne génère pas de réponse médicale de remplacement lorsqu’aucune fiche n’est suffisamment correspondante.

### Règle de scoring

Le scoring Search V2 utilise les **titres/questions, mots-clés et métadonnées de recherche**. Le contenu médical des réponses n’est pas utilisé pour favoriser une correspondance.

## Gouvernance du référentiel

À partir de cet état, chaque lot de corpus fusionné dans `feat/v0-magazine` doit mettre à jour dans le même cycle :

1. `corpus-manifest.js` ;
2. sitemap/SEO de la fiche ;
3. tests Search V2 concernés ;
4. le référentiel Google `Référentiel V2` ;
5. la synthèse du référentiel ;
6. ce point d’ancrage GitHub si le nombre global ou les règles structurantes évoluent.

Cette règle évite que le corpus de production et sa liste de référence divergent à nouveau.
