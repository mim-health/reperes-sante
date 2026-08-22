# MaCa Santé — Étape 8 : anti-régression Stable V1

Démarré le 22/08/2026.

## Objectif

Après les corrections de stabilisation, refaire systématiquement les parcours essentiels afin de vérifier qu'une amélioration n'en casse pas une autre.

## Référence de départ

Audit technique étape 7 : commit `554ae766c1dc2c376f2ec5ee2758c367361c4bde`.

## A. Chargement / identité

- [x] `index.html` présent sur la branche de travail.
- [x] `CNAME` présent pour `macasante.fr`.
- [x] URL canonique HTTPS déclarée.
- [x] logo local référencé.
- [x] feuille de style locale référencée.
- [ ] site public chargé depuis un navigateur extérieur sans avertissement.

## B. Recherche — parcours critique

À tester sur le site déployé :

1. recherche exacte d'une fiche connue ;
2. recherche avec formulation naturelle ;
3. recherche avec synonyme ;
4. recherche avec petite faute de frappe ;
5. recherche sans résultat ;
6. effacement puis nouvelle recherche.

Critères :
- [ ] résultat pertinent pour une requête connue ;
- [ ] aucun blocage du champ de recherche ;
- [ ] état sans résultat compréhensible ;
- [ ] bouton d'effacement fonctionnel ;
- [ ] nouvelle recherche possible immédiatement.

## C. Catégories

- [ ] affichage des catégories ;
- [ ] sélection d'une catégorie ;
- [ ] retour à « Toutes » ;
- [ ] recherche + catégorie compatibles ;
- [ ] aucune catégorie vide par erreur de code.

## D. Fiches

Pour au moins trois domaines différents :
- [ ] ouverture au clic ;
- [ ] ouverture au clavier ;
- [ ] titre correct ;
- [ ] réponse affichée ;
- [ ] source affichée ;
- [ ] lien source utilisable ;
- [ ] fermeture de la fiche ;
- [ ] retour à la page sans état cassé.

## E. Contenus éditoriaux

- [ ] Vrai/Faux du jour affiché sans placeholder de chargement ;
- [ ] À la une affiché ;
- [ ] Chiffre du jour affiché ;
- [ ] cartes éditoriales ouvrables lorsqu'elles sont interactives ;
- [ ] aucune ancienne mention éditoriale indésirable réapparue.

## F. Navigation / pages institutionnelles

- [ ] Questions ;
- [ ] À la une ;
- [ ] Vrai ou faux ;
- [ ] Sources ;
- [ ] Mentions légales ;
- [ ] Confidentialité ;
- [ ] Contact.

Chaque lien doit conduire à la bonne destination sans 404.

## G. Mobile et clavier

- [ ] recherche utilisable sur mobile ;
- [ ] cartes lisibles sans débordement horizontal ;
- [ ] navigation principale utilisable ;
- [ ] focus clavier visible ;
- [ ] Entrée/Espace ouvre les éléments interactifs prévus ;
- [ ] fermeture de modale accessible.

## H. Technique couplée à l'étape 7

- [ ] certificat HTTPS public valide ;
- [ ] zéro erreur JavaScript bloquante en console ;
- [ ] zéro ressource locale 404 dans le réseau ;
- [ ] aucune alerte « non sécurisé » ;
- [ ] chargement mobile réel fluide.

## I. Contrôle après chaque correction

Toute correction touchant `index.html`, `app.js`, `styles-v2.css`, les données de questions ou les scripts éditoriaux impose au minimum de rejouer :

`ACCUEIL → RECHERCHE → RÉSULTAT → OUVERTURE FICHE → FERMETURE → FILTRE → VRAI/FAUX → SOURCE`

Une correction n'est considérée terminée que si ce parcours reste fonctionnel.

## J. Règle de passage à l'étape 9

Ne pas créer le jalon « MaCaSanté Stable V1 » tant que les parcours critiques B, C, D, G et H n'ont pas été vérifiés sur la version réellement déployée.

## Statut actuel

**Étape 8 démarrée — checklist anti-régression créée.**

Les contrôles statiques de base sont cohérents. Les tests d'interaction réels et les quatre contrôles navigateur restants de l'étape 7 doivent encore être exécutés avant validation définitive.