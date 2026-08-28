# MACA Next — Stack technique

## Objectif

Créer une base technique moderne, simple et maintenable permettant à MACA d'évoluer sans accumuler de dette technique.

---

# 1. Principes techniques

MACA Next doit privilégier :

- simplicité ;
- séparation claire des responsabilités ;
- composants indépendants ;
- facilité de maintenance ;
- évolutivité.

Chaque fonctionnalité doit être identifiable et modifiable indépendamment.

---

# 2. Interface

## Technologie

Utiliser :

- React ;
- Vite ;
- composants réutilisables.

Objectif :

Créer une interface moderne adaptée :
- desktop ;
- mobile ;
- futures évolutions conversationnelles.

---

# 3. Organisation du code

Séparer :

## Components

Composants d'interface :

- Header ;
- Hero ;
- À la une ;
- Chiffre du jour ;
- Vrai/Faux ;
- Trois données à retenir ;
- Cartes fiches ;
- Assistant navigation.

---

## Data

Données séparées du rendu :

- contenu éditorial ;
- fiches santé ;
- sources ;
- catégories.

Le contenu médical ne doit jamais être mélangé avec les composants visuels.

---

## Styles

Organisation :

- layout ;
- composants ;
- responsive.

Objectif :

Éviter les fichiers CSS monolithiques difficiles à maintenir.

---

# 4. Données médicales

Le corpus MACA reste la source principale.

Règles :

- contenu validé ;
- sources identifiées ;
- séparation entre données et affichage.

---

# 5. Assistant navigation

L'assistant MACA est une interface d'accès au contenu.

Il permet :

Question utilisateur
→ identification du thème
→ proposition de fiches MACA.

Il ne réalise pas :

- diagnostic ;
- triage ;
- consultation médicale.

---

# 6. Développement

Règles :

- une fonctionnalité = un périmètre ;
- une modification = un ticket ;
- un commit = une évolution identifiable ;
- tests avant intégration.

---

# 7. Migration

MACA V1 reste active.

MACA Next récupère progressivement :

- identité ;
- contenu ;
- corpus ;
- expérience éditoriale.

La bascule se fera uniquement lorsque MACA Next sera supérieur à la version actuelle.
