# MACA Santé — Audit SEO technique — 17/09/2026

## Périmètre
Audit du dépôt `mim-health/reperes-sante`, production GitHub Pages sur `feat/v0-magazine`. Aucun contenu médical, `MACA_SEARCH_V2`, Assistant V1.6 ou Assistant IA V2 n'est modifié.

## Diagnostic

### 1. Homepage `/` vs `/index.html`
- La homepage contient déjà un canonical vers `https://macasante.fr/`.
- Le sitemap contient `/` et pas `/index.html`.
- Plusieurs pages publiques créaient néanmoins des liens internes vers `index.html`, ce qui envoyait un signal alternatif à Google.
- GitHub Pages ne fournit pas ici de règle 301 native configurable dans le dépôt. La correction sûre consiste à rendre les signaux cohérents : canonical `/`, sitemap `/`, liens internes `/`.

### 2. Gabarit des fiches
Le renderer commun `fiche-corpus-v2.js` produit au runtime : title spécifique, meta description, canonical, H1, Open Graph, Twitter et JSON-LD `MedicalWebPage`. Une fiche inexistante passe en `noindex,follow`.

Limite importante : le HTML source initial de `fiche.html` reste générique (`Fiche santé — MACA Santé`, description générique, pas de canonical/H1 spécifique avant JavaScript). Google peut rendre JavaScript, mais ce socle est moins robuste qu'un HTML pré-rendu et les crawlers sociaux peuvent ne pas exécuter ce JavaScript. Pas de pré-rendu ajouté dans ce correctif.

### 3. Sitemap
- Le corpus canonique audité contient actuellement 273 fiches.
- `sitemap.xml` contient les 273 fiches + 5 URLs statiques = 278 URLs uniques.
- 0 fiche canonique manquante.
- `ecrans-petit` et `constipation-adulte` sont présents.
- `sitemap-corpus-extra.xml` était devenu redondant avec le sitemap principal et est supprimé sur la branche d'audit.

### 4. Robots
`robots.txt` autorise tout le site. Aucun blocage accidentel des fiches. La branche d'audit ne déclare plus que le sitemap canonique principal.

### 5. Données structurées
- Homepage : `WebSite` + `Organization`, pertinents.
- Fiches : `MedicalWebPage` injecté au runtime.
- Pas d'ajout de FAQ/medical schema artificiel. Un éventuel `Article` + `BreadcrumbList` ne serait pertinent qu'avec une évolution de pré-rendu et des champs visibles cohérents.

### 6. Maillage interne
Constat initial : les cartes de la homepage et de `fiches.html` étaient des `<article>` pilotés par JavaScript qui ouvraient une modale, sans vrai lien HTML vers `fiche.html?id=...`. Le sitemap assurait donc une part importante de la découverte des fiches.

Correction ciblée exécutée après validation : `seo-crawlable-fiche-links.js` ajoute au titre de chaque carte rendue un vrai lien `<a href="fiche.html?id=...">`. Le design reste inchangé. Un clic ordinaire conserve le comportement historique et ouvre la modale ; le lien reste présent dans le DOM et les clics modifiés conservent le comportement natif du navigateur.

Un `MutationObserver` réapplique ces liens après les rerendus provoqués par la recherche ou les filtres. Le script est chargé sur la homepage et sur la bibliothèque. Les liens `À lire aussi` des fiches, déjà crawlables, restent inchangés.

### 7. Cas représentatifs
- Homepage : head/canonical/OG/schema solides ; signal `/index.html` provenant des liens internes corrigé ; cartes de fiches désormais dotées de liens crawlables.
- `ecrans-petit` : présent dans le sitemap ; metadata spécifique générée par le renderer commun ; accessible depuis le maillage crawlable.
- `constipation-adulte` : présent dans le sitemap ; même architecture SEO ; bénéficie désormais également du renforcement du maillage interne. Son mauvais classement ne vient pas d'une absence du sitemap ou du canonical au runtime.

## Corrections préparées sur `fix/seo-tech-2026-09-17`
- Liens homepage internes normalisés vers `/` au lieu de `/index.html` sur les pages publiques auditées.
- `robots.txt` réduit au sitemap canonique unique.
- `sitemap-corpus-extra.xml` redondant supprimé.
- Contrôle sitemap renforcé : refuse doublons, URLs non canoniques et fiches manquantes.
- Liens crawlables ajoutés aux titres des cartes de l'accueil et de la bibliothèque, sans changer l'UX ordinaire.
- Audit CI dédié renforcé avec validation syntaxique et contrôles du maillage crawlable.

## Tests SEO
GitHub Actions `SEO technical audit` : vert après le changement de maillage (run 35238276935).
- syntaxe des scripts validée ;
- sitemap : 278 URLs uniques, 273 fiches canoniques ;
- 0 fiche manquante ;
- homepage canonical `/` ;
- `/index.html` absent du sitemap et des liens internes audités ;
- robots public et un seul sitemap ;
- title/description/canonical/H1/OG/schema du renderer de fiches détectés ;
- cas `ecrans-petit` et `constipation-adulte` présents ;
- enhancement de liens crawlables chargé sur accueil + bibliothèque ;
- comportement modale préservé au clic ordinaire.

## Contrôles historiques hors périmètre SEO
La PR déclenche également d'anciens workflows globaux dont certains échouent pour des raisons indépendantes du présent correctif :

- `Corpus Pipeline` attend encore une ancienne taxonomie à 8 catégories alors que le corpus public actuel utilise désormais les catégories récentes, notamment `Cœur & circulation`, `Prévention & dépistage` et `Os & articulations` ;
- les bancs `Search V2 / Alpha V2` contiennent cinq attentes historiques sur l'ID `maca-cystite-reperes`, actuellement absent ou exclu du corpus testé.

Aucun fichier de contenu médical, de moteur de recherche ou d'Assistant n'a été modifié pour contourner ces contrôles. Ces régressions historiques doivent être traitées séparément du lot SEO.
