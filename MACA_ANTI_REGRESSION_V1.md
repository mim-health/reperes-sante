# MaCa Santé — Étape 8 : anti-régression Stable V1

Clôturée le 22/08/2026.

## Objectif

Après les corrections de stabilisation, refaire les parcours essentiels afin de vérifier qu'une amélioration n'en casse pas une autre.

## Références

- Audit technique étape 7 : `554ae766c1dc2c376f2ec5ee2758c367361c4bde`.
- Checklist initiale étape 8 : `d59577958a79d0ba7cf6da173a13946ea01b091f`.
- Contrôle statique complémentaire : `7872e11d5952904a56b2c2f69ebeb3e95cefb3a8`.

## Résultats

### A. Chargement / identité — VALIDÉ
- [x] `index.html` présent.
- [x] `CNAME` présent pour `macasante.fr`.
- [x] URL canonique HTTPS déclarée.
- [x] logo et feuille de style chargés.
- [x] site public effectivement chargé sur smartphone extérieur, sans avertissement de sécurité visible.

### B. Recherche — VALIDÉE
- [x] champ de recherche utilisable sur mobile.
- [x] requête réelle « Tension » exécutée sur le site public.
- [x] résultat pertinent affiché : fiche sur l'hypertension.
- [x] filtres/catégories restent présents après recherche.
- [x] moteur statique contrôlé : recherche exacte, tokens, concepts/synonymes et tolérance limitée aux fautes prévus dans `app.js`.
- [x] état sans résultat et effacement prévus dans le moteur.

### C. Catégories — VALIDÉES
- [x] catégories affichées sur le site public.
- [x] « Toutes » visible et active lors du test.
- [x] catégorie « Enfants & parents » visible.
- [x] catégorie « Cœur & circulation » visible.
- [x] logique filtre + recherche contrôlée dans le code.

Note UX non bloquante : le carrousel horizontal de catégories peut montrer un libellé partiellement coupé à droite sur petit écran. Cela indique la présence de contenu défilable et n'empêche pas la recherche ni l'accès aux fiches. À améliorer ultérieurement si souhaité.

### D. Fiches — VALIDÉES
- [x] fiches chargées sur le site public.
- [x] titre, réponse courte, sources et date de vérification visibles.
- [x] fiche « Le magnésium est-il bon pour ma santé ? » affichée correctement sur smartphone.
- [x] fiche hypertension retrouvée via recherche.
- [x] ouverture/fermeture et gestion de modale présentes dans le code.
- [x] liens de sources protégés par `rel="noopener"`.

### E. Contenus éditoriaux — VALIDÉS
- [x] Vrai/Faux du jour chargé sur la page d'accueil publique.
- [x] contenu réel affiché, sans placeholder : cortisol, verdict « FAUX ».
- [x] bloc « À la une » chargé immédiatement sous le Vrai/Faux.
- [x] navigation éditoriale visible en haut de page.

### F. Navigation — VALIDÉE POUR LE PARCOURS CRITIQUE
- [x] Recherche visible.
- [x] À la une visible.
- [x] Vrai ou faux visible.
- [x] passage accueil → fiches observé sur le site public.
- [x] architecture des autres destinations contrôlée statiquement.

### G. Mobile / accessibilité — VALIDÉ POUR STABLE V1
- [x] rendu smartphone réel contrôlé.
- [x] recherche utilisable.
- [x] cartes lisibles.
- [x] navigation principale utilisable.
- [x] boutons et cartes interactives disposent des mécanismes clavier prévus dans le code.
- [x] modale dispose d'une fermeture gérée par le moteur.

### H. Technique — VALIDÉ POUR STABLE V1
- [x] domaine public accessible en HTTPS depuis smartphone extérieur.
- [x] aucune alerte « non sécurisé » visible lors des tests réels.
- [x] CSS, logo et JavaScript nécessaires aux parcours testés se chargent effectivement : l'interface et la recherche fonctionnent.
- [x] aucun symptôme d'erreur JavaScript bloquante sur les parcours testés.
- [x] chargement mobile réel jugé fonctionnel et fluide sur les captures/tests fournis.

Limite documentée : l'environnement de consultation web automatisé de ChatGPT n'arrive actuellement pas à récupérer `macasante.fr`. Comme le domaine fonctionne depuis un navigateur utilisateur réel, cette anomalie n'est pas considérée comme une régression du site. Une inspection DevTools dédiée pourra ultérieurement compléter la vérification exhaustive console/réseau, sans bloquer Stable V1.

## Parcours anti-régression de référence

Après toute modification significative de `index.html`, `app.js`, `styles-v2.css`, des données de questions ou des scripts éditoriaux, rejouer au minimum :

`ACCUEIL → RECHERCHE → RÉSULTAT → FICHE → FERMETURE → FILTRE → VRAI/FAUX → SOURCE`

Une correction n'est terminée que si ce parcours reste fonctionnel.

## Conclusion

**ÉTAPE 8 — VALIDÉE ET CLÔTURÉE LE 22/08/2026.**

Les contrôles statiques et les tests réels fournis sur smartphone confirment le fonctionnement des parcours critiques de MaCa Santé. Aucun défaut bloquant n'a été identifié. Les petites améliorations d'ergonomie mobile restantes sont classées non bloquantes.

Le projet peut passer à l'étape 9 : sauvegarde d'une version stable identifiable et récupérable « MaCaSanté Stable V1 ».