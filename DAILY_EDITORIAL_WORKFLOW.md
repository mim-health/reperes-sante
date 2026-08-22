# MACA SANTE — voie à suivre pour la rotation éditoriale

## Principe
La rotation quotidienne est isolée du moteur de recherche et du corpus des fiches.

## Fichier à modifier chaque jour
`maca-daily-editorial.js`

Modifier uniquement l'objet `DAILY_EDITORIAL` après validation éditoriale :
- date ;
- À la une ;
- Vrai/Faux ;
- Chiffre du jour ;
- données/chiffres complémentaires validés.

## Ne pas modifier pour une simple rotation quotidienne
- `app.js` (moteur, recherche, rendu des fiches) ;
- `qa-data.js` et les lots de fiches auditées ;
- CSS / direction artistique ;
- architecture de recherche.

## Contrôle après publication
1. Vérifier le contenu dans `maca-daily-editorial.js`.
2. Vérifier l'accueil desktop.
3. Vérifier l'accueil mobile.
4. Ouvrir chaque carte éditoriale.
5. Tester une recherche simple pour confirmer l'absence de régression du moteur.
6. Conserver le commit GitHub du jour comme point de retour.

Cette séparation évite de réécrire `app.js` à chaque veille quotidienne et réduit le risque de casser le moteur ou les fiches validées.
