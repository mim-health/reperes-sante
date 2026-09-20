# Patient Question Map V2 — replay lot #1 + extension

## Références figées
- Avant lot #1 : `5d43e1a73d11f268e959abf3effb1dc72d82b000`
- Après intégration des 8 fiches PQM : `3a40ad1ea0587745a78a4a5077fb9b0a0a335a79`
- Mesure sans modification du corpus, du moteur ou des seuils.
- Replay : les 27 `normalized_question` exactes du POC V1.

## Replay lot #1

Coverage Score = (COUVERT + 0,5 × PARTIELLEMENT COUVERT) / N.

### Couverture du contenu
- Avant : 1 couvert, 4 partiels, 22 absents → **11,1 %**
- Après : 16 couverts, 1 partiel, 10 absents → **61,1 %**

### Couverture réellement retrouvée par MACA_SEARCH_V2
Replay de la couche de recherche chargée sur le site (référentiel + moteur + fallback + correctifs), sans adaptation aux tests.
- Avant : 1/27 → **3,7 %**
- Après : 6/27 → **22,2 %**

Les 8 fiches améliorent donc fortement le contenu disponible, mais une partie importante reste non retrouvée avec les formulations patient ayant motivé leur création.

Exemples de fiches présentes mais non retrouvées sur certaines questions sources : activité physique/glycémie dans le diabète, pied diabétique, refus toilette/habillage/repas dans Alzheimer, travail avec diabète, voyage avec diabète, diversification/alimentation-plaisir dans les MICI.

**Conclusion : un gap n'est fermé que si le contenu existe ET si le moteur le retrouve avec la formulation patient d'origine.**

## Extension

| Pathologie | Intentions | Couvert | Partiel | Absent |
|---|---:|---:|---:|---:|
| Alzheimer | 8 | 4 (50 %) | 2 (25 %) | 2 (25 %) |
| Insuffisance cardiaque | 8 | 0 (0 %) | 3 (37,5 %) | 5 (62,5 %) |
| Cancer | 8 | 1 (12,5 %) | 2 (25 %) | 5 (62,5 %) |
| **Total** | **24** | **5 (20,8 %)** | **7 (29,2 %)** | **12 (50 %)** |

## 10 gaps éditoriaux solides
1. Insuffisance cardiaque : surveillance quotidienne — poids, essoufflement, œdèmes, aggravation.
2. Insuffisance cardiaque : sel et liquides.
3. Insuffisance cardiaque : activité physique et limites.
4. Insuffisance cardiaque : médicaments, organisation et effets indésirables.
5. Insuffisance cardiaque et sexualité.
6. Cancer : fatigue pendant et après les traitements.
7. Cancer : alimentation, appétit et goût pendant les traitements.
8. Cancer et sexualité.
9. Cancer : effets indésirables — que surveiller et quand contacter l'équipe.
10. Alzheimer : sommeil et nuits difficiles.

Gap suivant : vivre et s'organiser après l'annonce d'un diagnostic d'Alzheimer.

## Conclusion
**GO méthodologique.** Le Patient Question Map révèle des gaps cohérents sur trois univers très différents. Le prochain cycle doit conserver deux mesures séparées : couverture éditoriale du corpus et retrievabilité réelle. Aucune fiche n'a été créée dans ce chantier.
