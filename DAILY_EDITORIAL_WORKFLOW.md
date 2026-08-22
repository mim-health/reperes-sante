# MACA SANTE — voie à suivre pour la rotation éditoriale

## Principe
La rotation quotidienne est isolée du moteur de recherche et du corpus des fiches.

**Règle fondamentale : rotation de l'accueil ≠ suppression du contenu.**
Un contenu éditorial validé qui quitte l'accueil doit être conservé lorsqu'il a une valeur durable et transformé en fiche générique, réutilisable et retrouvable par le moteur de recherche.

## Règle d'interactivité de l'accueil
**Tout contenu éditorial visible sur la page d'accueil doit être cliquable/tappable.**
Cela comprend obligatoirement :
- À la une ;
- Vrai/Faux ;
- Chiffre du jour ;
- chacune des trois données à retenir ;
- chacune des cartes « À lire en 3 minutes ».

Le clic/tap doit ouvrir un contenu utile avec au minimum le titre, une explication et la source. L'interaction doit aussi fonctionner au clavier (Tab puis Entrée/Espace). Une rotation éditoriale ne peut être considérée comme publiée tant que ces interactions n'ont pas été testées sur mobile et desktop.

## Fichier à modifier chaque jour
`maca-daily-editorial.js`

Modifier uniquement l'objet `DAILY_EDITORIAL` après validation éditoriale :
- date ;
- À la une ;
- Vrai/Faux ;
- Chiffre du jour ;
- données/chiffres complémentaires validés ;
- iconographie de l'À la une.

## Validation quotidienne de l'iconographie
L'iconographie fait partie du lot éditorial à valider chaque jour.

Avant publication :
1. l'image doit être directement cohérente avec le sujet de l'À la une ;
2. éviter toute image générique ou décorative sans rapport avec le sujet ;
3. vérifier le droit d'utilisation / la licence et conserver la provenance ;
4. vérifier le cadrage desktop et mobile ;
5. ne publier l'image qu'avec le lot éditorial validé.

## Cycle obligatoire : éditorial → fiche
Avant de remplacer le contenu du jour précédent :
1. identifier les À la une et Vrai/Faux ayant une valeur documentaire durable ;
2. les transformer en fiches génériques et non datées lorsque cela est pertinent ;
3. conserver les sources médicales et la date de dernière vérification ;
4. contrôler les doublons avec le corpus existant ;
5. intégrer les nouvelles fiches au corpus audité afin qu'elles soient retrouvables par la recherche ;
6. seulement ensuite retirer l'ancien contenu de l'accueil.

Exemples déjà concernés :
- CMV pendant la grossesse / conduite après dépistage positif ;
- vaccination antipneumococcique / évolution de la stratégie vaccinale ;
- maladie cœliaque / ne pas arrêter le gluten avant le diagnostic ;
- cortisol, stress et fatigue ;
- autres Vrai/Faux ou À la une validés présentant une valeur durable.

**Aucun ancien À la une ou Vrai/Faux pertinent ne doit être perdu lors d'une rotation quotidienne.**

## Ne pas modifier pour une simple rotation quotidienne
- `app.js` (moteur, recherche, rendu des fiches) ;
- `qa-data.js` et les lots de fiches auditées, sauf lors de l'étape explicite de conversion éditorial → fiche ;
- CSS / direction artistique ;
- architecture de recherche.

## Contrôle après publication
1. Vérifier le contenu dans `maca-daily-editorial.js`.
2. Vérifier que l'image correspond au sujet et que sa provenance/licence est documentée.
3. Vérifier l'accueil desktop.
4. Vérifier l'accueil mobile.
5. Cliquer/taper À la une, Vrai/Faux, Chiffre du jour, les 3 données et toutes les cartes « À lire en 3 minutes ».
6. Tester ces mêmes contenus au clavier (Tab + Entrée/Espace).
7. Vérifier que les contenus sortis de la rotation mais conservables existent comme fiches recherchables.
8. Tester une recherche simple et une recherche visant une fiche issue d'un ancien contenu éditorial.
9. Confirmer l'absence de régression du moteur.
10. Conserver le commit GitHub du jour comme point de retour.

Cette séparation évite de réécrire `app.js` à chaque veille quotidienne, empêche la perte des contenus éditoriaux validés et réduit le risque de casser le moteur ou les fiches validées.
