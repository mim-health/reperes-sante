# MACA V2 — Arbitrages doublons

## Cystite — décision 31/08/2026

### Doublon confirmé
- `maca-cystite-reperes` — « Brûlures urinaires : quand penser à une cystite ? »
- `cystite-femme` — « Brûlures urinaires et envies fréquentes : est-ce une cystite ? »

Les deux fiches couvrent la même intention principale : brûlures urinaires + pollakiurie/urgenturie évoquant une cystite.

### Décision canonique
Conserver **un seul point d’entrée V2** : `maca-cystite-reperes`.

La fiche canonique devra être consolidée avec :
- le cadrage tout public/adulte et les drapeaux de contexte de `maca-cystite-reperes` ;
- les éléments plus précis de `cystite-femme` pour la cystite simple de la femme adulte, issus d’Ameli + SPILF 2026 ;
- une formulation de titre proposée : « Brûlures urinaires et envies fréquentes : quand penser à une cystite ? ».

`cystite-femme` doit être marquée **superseded / non routable** dans le référentiel V2 après consolidation, afin d’éviter la compétition entre deux fiches quasi identiques.

### Règle moteur
- « cystite », « infection urinaire », « brûlures en urinant », « envie fréquente d’uriner » → fiche canonique.
- contexte femme adulte simple → même fiche, avec contenu spécifique applicable.
- grossesse, homme, fièvre, frissons, douleur lombaire/flanc, fragilité ou terrain à risque → ne pas traiter comme simple cystite sans complication ; conserver les alertes de la fiche.

### Correction du référentiel
Les termes « tique », « borréliose de Lyme » et « érythème migrant » présents dans la ligne générée de `cystite-femme` sont une erreur du référentiel, **pas du fichier source**. Ils doivent être supprimés du référentiel.
