# macasante — Rétro-contrôle après intégration Mediterranean Modern

Date : 22/08/2026

## Périmètre

Base anti-régression validée : commit `841a70bce1df57447687a63f354d0cb05b990c72`.
Nouvelle intégration : logo maca, thème Mediterranean Modern, activation dans `index.html`, marque affichée en minuscules.

## Comparaison Git

La branche est à +3 commits sur la base validée. Seulement trois fichiers ont changé avant ce document :
- `index.html` ;
- `logo-maca.svg` ;
- `maca-mediterranean-theme.css` ajouté.

Aucun fichier de données médicales, aucune source, aucun backlog audité et aucun fichier JavaScript du moteur n'ont été modifiés.

## Contrôles structurels

- [x] `styles-v2.css` reste chargé en premier : structure et responsive existants conservés.
- [x] `maca-mediterranean-theme.css` est chargé ensuite comme couche visuelle additive.
- [x] `app.js`, `vrai-faux-ui.js` et `source-ui.js` restent chargés.
- [x] tous les scripts de corpus/audit précédemment présents restent référencés.
- [x] IDs fonctionnels conservés : `search-input`, `clear-search`, `category-filters`, `qa-grid`, `no-results`, `article-grid`, `article-modal`, `modal-content`.
- [x] ancres fonctionnelles conservées : `questions`, `comprendre`, `verifier`, `sources`, `chiffre-du-jour`.
- [x] recherche, filtres, cartes, modale et Vrai/Faux ne changent pas de contrat DOM.
- [x] aucune grande image/photographie hero ajoutée.
- [x] favicon/logo reste un SVG local, donc aucune ressource image externe supplémentaire.
- [x] thème mobile existant conservé et complété par des overrides ciblés.

## Identité

- [x] marque visible : `macasante` en minuscules.
- [x] palette : bleu encre, ivoire, sable, terracotta.
- [x] symbole végétal maca remplacé par une marque plus fine.
- [x] couleur navigateur (`theme-color`) alignée sur le bleu encre.
- [x] métadonnées principales et données structurées utilisent `macasante`.

## Risque de régression

Faible : la modification est principalement CSS/branding. Le moteur JavaScript et le corpus sont inchangés.

## Contrôle réel restant

Après propagation du déploiement, refaire sur smartphone le parcours court :

`ACCUEIL → RECHERCHE « tension » → FICHE → FERMETURE → FILTRE → VRAI/FAUX → SOURCE`

Vérifier visuellement en particulier :
- logo et mot-symbole `macasante` ;
- absence de grand visuel hero ;
- contraste bleu/terracotta ;
- défilement horizontal des catégories ;
- absence de texte coupé ou de débordement anormal.

La Stable V1 ne doit être figée qu'après ce contrôle réel post-redesign.