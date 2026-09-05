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

## Règle permanente de destination quotidienne
Les destinations ne doivent JAMAIS être codées comme un sujet permanent (ex. acouphènes, sommeil, sel, rougeole).

Chaque jour, le lot `DAILY_EDITORIAL` validé définit simultanément :
1. le contenu visible de chaque bloc ;
2. son identifiant éditorial unique ;
3. la page quotidienne validée vers laquelle le clic/tap doit conduire.

Ainsi :
- À la une du jour → page validée de l'À la une de CE jour ;
- Vrai/Faux du jour → page validée du Vrai/Faux de CE jour ;
- Chiffre du jour → page validée du Chiffre de CE jour ;
- données complémentaires → pages correspondant exactement aux données affichées.

Le sujet peut donc changer chaque jour sans modification du mécanisme de navigation. Le code de navigation utilise l'identifiant du contenu quotidien validé, jamais un thème fixe.

**Invariant anti-régression : contenu affiché = contenu de destination.** Une carte ne peut jamais afficher un sujet et ouvrir la page d'un autre sujet.

Le clic/tap doit ouvrir un contenu utile avec au minimum le titre, une explication et la source. L'interaction doit aussi fonctionner au clavier (Tab puis Entrée/Espace). Une rotation éditoriale ne peut être considérée comme publiée tant que ces interactions n'ont pas été testées sur mobile et desktop.

## Fichier à modifier chaque jour
`maca-daily-editorial-data.js`

Modifier uniquement le lot éditorial après validation :
- date ;
- À la une ;
- Vrai/Faux ;
- Chiffre du jour ;
- données/chiffres complémentaires validés ;
- iconographie de l'À la une ;
- identifiant/destination quotidienne de chacun de ces contenus.

Le mécanisme de navigation lui-même ne doit pas être réécrit à chaque rotation.

## Validation quotidienne de l'iconographie
L'iconographie fait partie du lot éditorial à valider chaque jour.

Avant publication :
1. l'image doit être directement cohérente avec le sujet de l'À la une ;
2. éviter toute image générique ou décorative sans rapport avec le sujet ;
3. vérifier le droit d'utilisation / la licence et conserver la provenance ;
4. vérifier le cadrage desktop et mobile ;
5. ne publier l'image qu'avec le lot éditorial validé.

## Cycle OBLIGATOIRE : éditorial → corpus
La validation éditoriale quotidienne n'est pas considérée comme terminée tant que la capitalisation vers le corpus n'a pas été examinée.

Avant de remplacer le contenu du jour précédent, chaque sujet doit recevoir l'une de ces trois décisions :
- **CRÉER** : le sujet apporte une information durable absente du corpus → créer une fiche courte ;
- **FUSIONNER / ACTUALISER** : une fiche existe déjà → enrichir ou actualiser cette fiche plutôt que créer un doublon ;
- **NE PAS CRÉER** : donnée trop ponctuelle, redondante ou sans valeur documentaire durable → conserver seulement l'historique éditorial.

### Format attendu
- viser en règle générale **1 à 3 fiches durables maximum par édition quotidienne** ;
- une fiche doit répondre à **une vraie question du grand public** ;
- réponse courte : l'essentiel en quelques phrases ;
- conserver la source et la date de vérification ;
- **ne pas créer une fiche distincte pour chaque chiffre** lorsque plusieurs chiffres documentent le même sujet ;
- fusionner le À la une, le Vrai/Faux, le chiffre du jour et les données complémentaires lorsqu'ils racontent la même question ;
- contrôler les doublons avant toute création ;
- intégrer toute nouvelle fiche au corpus audité afin qu'elle soit retrouvable par la recherche.

**Règle produit : le travail éditorial quotidien doit enrichir progressivement le patrimoine MACA, sans allonger inutilement les fiches ni gonfler artificiellement le corpus.**

Exemples de bonnes capitalisations :
- un À la une sur la vaccination HPV + ses chiffres de couverture → une seule fiche durable HPV ;
- un À la une sur les statines + Vrai/Faux + données d'essais → une seule fiche statines ;
- un chiffre sur le sel lorsque la fiche sel/tension existe déjà → pas de nouvelle fiche, actualisation si nécessaire.

**Aucun ancien contenu pertinent ne doit être perdu lors d'une rotation quotidienne.**

## Ne pas modifier pour une simple rotation quotidienne
- `app.js` (moteur, recherche, rendu des fiches) ;
- CSS / direction artistique ;
- architecture de recherche ;
- mécanisme générique de navigation quotidienne.

Les fichiers du corpus ne sont modifiés que dans l'étape explicite de capitalisation éditoriale validée.

## Contrôle après publication
1. Vérifier le contenu dans `maca-daily-editorial-data.js`.
2. Vérifier que chaque contenu visible et sa destination ont le même identifiant éditorial.
3. Vérifier que l'image correspond au sujet et que sa provenance/licence est documentée.
4. Vérifier l'accueil desktop.
5. Vérifier l'accueil mobile.
6. Cliquer/taper À la une, Vrai/Faux, Chiffre du jour, les 3 données et toutes les cartes « À lire en 3 minutes » et contrôler que chaque page ouverte correspond exactement au sujet affiché.
7. Tester ces mêmes contenus au clavier (Tab + Entrée/Espace).
8. Documenter pour chaque sujet la décision CRÉER / FUSIONNER / NE PAS CRÉER.
9. Vérifier que les fiches créées ou actualisées sont bien chargées par `corpus-manifest.js`.
10. Tester une recherche simple et une recherche visant une fiche issue de l'éditorial.
11. Confirmer l'absence de régression du moteur.
12. Conserver le commit GitHub du jour comme point de retour.

Cette séparation évite de réécrire le moteur à chaque veille quotidienne, empêche la perte des contenus éditoriaux validés et transforme progressivement le travail de rédaction en patrimoine documentaire durable pour MACA.
