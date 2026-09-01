# MACA Santé — Audit exhaustif de couverture Search V2

Date : 01/09/2026

## Objectif

Compléter les 120 tests P0 validés par un contrôle automatique de couverture du corpus canonique complet.

Les 120 tests P0 mesurent la qualité sur des formulations patients validées et les abstentions sensibles.

Le nouvel audit vérifie une propriété différente : toute fiche canonique routable doit rester atteignable par le moteur Search V2. Les IDs explicitement marqués comme doublons/superseded dans `MACA_V2_REFERENTIAL_P0.excludedIds` sont exclus du dénominateur.

## Contrôles automatiques

À chaque PR vers `feat/v0-magazine` touchant le moteur, le référentiel ou le corpus :

1. le corpus canonique doit contenir 180 fiches ;
2. les 120 tests P0 doivent rester à 120/120 ;
3. les 13 cas ciblés de fallback et abstention doivent rester verts ;
4. chaque fiche routable est testée avec son titre canonique ;
5. chaque fiche routable doit également être atteignable par au moins une sonde courte dérivée de son titre ou de ses mots-clés ;
6. le contenu médical (`answer`, `watch`, sources) n'est jamais utilisé pour générer ou scorer ces sondes.

## Principe produit

- Une fiche existe et est routable : MACA doit pouvoir y accéder.
- Une fiche est explicitement exclue car doublon/superseded : son ID n'est pas exigé comme cible distincte.
- Aucune correspondance suffisamment fiable : abstention.

Cet audit ne remplace pas les tests utilisateurs ni les formulations patients du référentiel du 31/08/2026. Il constitue un garde-fou technique exhaustif contre la régression « fiche présente mais invisible au moteur ».
