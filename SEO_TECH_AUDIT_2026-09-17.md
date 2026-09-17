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

Limite importante : le HTML source initial de `fiche.html` reste générique (`Fiche santé — MACA Santé`, description générique, pas de canonical/H1 spécifique avant JavaScript). Google peut rendre JavaScript, mais ce socle est moins robuste qu'un HTML pré-rendu et les crawlers sociaux peuvent ne pas exécuter ce JavaScript. Pas de modification structurelle faite à ce stade.

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
Point structurel principal : les cartes de la homepage et de `fiches.html` sont des `<article>` pilotés par JavaScript qui ouvrent une modale ; elles ne sont pas des liens HTML crawlables vers `fiche.html?id=...`. Le sitemap assure donc une part importante de la découverte des fiches. En revanche, le bloc `À lire aussi` des fiches génère de vrais liens vers des fiches liées lorsqu'il est présent.

Ce point peut affecter la découverte, la circulation du signal interne et la compréhension de la hiérarchie du corpus. Aucune modification n'a été faite car transformer les cartes en liens crawlables touche au comportement UX et doit être validé avant changement.

### 7. Cas représentatifs
- Homepage : head/canonical/OG/schema solides ; signal `/index.html` provenant des liens internes corrigé sur la branche.
- `ecrans-petit` : présent dans le sitemap ; metadata spécifique générée par le renderer commun ; même limite de rendu JavaScript que les autres fiches.
- `constipation-adulte` : présent dans le sitemap ; même architecture SEO. Son mauvais classement ne vient pas d'une absence du sitemap ou d'une absence de canonical au runtime. Le maillage interne insuffisant est un problème technique plus plausible à corriger avant de réécrire le contenu.

## Corrections simples préparées sur `fix/seo-tech-2026-09-17`
- Liens homepage internes normalisés vers `/` au lieu de `/index.html` sur les pages publiques auditées.
- `robots.txt` réduit au sitemap canonique unique.
- `sitemap-corpus-extra.xml` redondant supprimé.
- Contrôle sitemap renforcé : refuse désormais doublons, URLs non canoniques et fiches manquantes.
- Nouveau audit CI dédié.

## Tests
GitHub Actions `SEO technical audit` : vert.
- sitemap : 278 URLs uniques, 273 fiches canoniques ;
- 0 fiche manquante ;
- homepage canonical `/` ;
- `/index.html` absent du sitemap et des liens internes audités ;
- robots public et un seul sitemap ;
- title/description/canonical/H1/OG/schema du renderer de fiches détectés ;
- cas `ecrans-petit` et `constipation-adulte` présents.

## Modification structurelle proposée mais non exécutée
Faire de chaque carte de fiche sur l'accueil/la bibliothèque un vrai lien crawlable vers son URL canonique, tout en conservant l'expérience de recherche et, si souhaité, la modale. À valider avant implémentation.
