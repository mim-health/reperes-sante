# MACA Next — Plan de migration

## Objectif

Construire une nouvelle base MACA plus simple, maintenable et évolutive, tout en conservant la valeur créée dans la version actuelle.

La version V1 reste disponible pendant toute la phase de migration.

---

# 1. Principes

La migration doit :

- préserver les contenus validés ;
- améliorer l'expérience utilisateur ;
- simplifier l'architecture technique ;
- éviter la dette technique.

Aucune migration ne doit supprimer une fonctionnalité validée sans décision préalable.

---

# 2. Éléments à conserver

## Contenu santé

À conserver :

- fiches santé ;
- corpus médical ;
- sources ;
- catégories ;
- questions fréquentes.

Le contenu représente la valeur principale de MACA.

---

## Ligne éditoriale

À conserver :

- À la une ;
- Chiffre du jour ;
- Vrai/Faux ;
- Trois données à retenir ;
- informations santé quotidiennes.

---

## Identité

À conserver :

- nom MACA Santé ;
- identité graphique ;
- positionnement magazine santé ;
- approche pédagogique.

---

# 3. Éléments à reconstruire

## Accueil

Nouvelle approche :

- présentation claire de MACA ;
- contenu éditorial quotidien ;
- accès simple aux fiches ;
- expérience moderne.

La barre de recherche classique n'est pas l'élément central de l'accueil.

---

## Architecture interface

Créer des composants indépendants :

- Header ;
- Hero ;
- À la une ;
- Chiffre du jour ;
- Vrai/Faux ;
- Trois données à retenir ;
- Cartes fiches ;
- Assistant navigation.

---

## Responsive

Objectif :

- affichage desktop stable ;
- affichage mobile pensé dès la conception ;
- absence de débordements.

---

# 4. Éléments à mettre en pause

## Recherche classique

La recherche actuelle est conservée uniquement si utile dans la bibliothèque de fiches.

Elle n'est pas l'expérience principale.

---

## Assistant navigation

Développement progressif.

Objectif :

Question utilisateur
→ compréhension du sujet
→ proposition de fiches MACA.

Limites :

- pas de diagnostic ;
- pas de triage ;
- pas de consultation médicale.

---

# 5. Phases de développement

## Phase 1 — Nouvelle base

Créer :

- architecture propre ;
- accueil MACA Next ;
- composants séparés.

---

## Phase 2 — Migration contenu

Importer :

- fiches ;
- catégories ;
- éditorial quotidien.

---

## Phase 3 — Expérience utilisateur

Ajouter :

- assistant navigation ;
- découvertes quotidiennes ;
- interactions.

---

## Phase 4 — Stabilisation

Vérifier :

- performances ;
- responsive ;
- qualité éditoriale ;
- absence de régression.

---

# Objectif final

Obtenir une plateforme santé moderne :

- fiable ;
- claire ;
- agréable à utiliser ;
- facile à maintenir ;
- capable d'évoluer.
