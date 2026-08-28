# MACA Next — Architecture

## Objectif

Construire une nouvelle base technique pour MACA permettant une évolution simple, maintenable et progressive.

La version actuelle reste disponible pendant la construction.

---

# 1. Vision produit

MACA est un magazine santé grand public.

Objectif :

Permettre à chacun d'accéder facilement à des informations de santé :
- fiables ;
- pédagogiques ;
- sourcées ;
- compréhensibles.

MACA n'est pas :
- un outil de diagnostic ;
- un médecin IA ;
- un outil de triage.

MACA est :
- un média santé ;
- une bibliothèque de fiches validées ;
- une interface permettant de trouver la bonne information.

---

# 2. Architecture fonctionnelle

## Accueil

Objectif :
donner envie de découvrir MACA.

Structure :

- identité MACA ;
- À la une ;
- Chiffre du jour ;
- Vrai/Faux ;
- Trois données à retenir ;
- découverte des fiches ;
- accès assistant navigation.

La barre de recherche classique n'est pas l'entrée principale.

---

# 3. Corpus santé

Le corpus constitue la valeur principale du produit.

Il comprend :

- fiches santé ;
- questions fréquentes ;
- sources médicales ;
- catégories.

Le corpus doit être séparé :
- des composants d'affichage ;
- du code de navigation.

---

# 4. Editorial quotidien

Production quotidienne :

- À la une ;
- Chiffre du jour ;
- Vrai/Faux ;
- Trois données à retenir.

L'éditorial doit être piloté indépendamment du code.

---

# 5. Assistant navigation

Objectif :

Aider l'utilisateur à trouver la bonne fiche.

Principe :

Question utilisateur
→ compréhension du thème
→ proposition de fiches MACA pertinentes.

Limites :

- pas de diagnostic ;
- pas de recommandation médicale personnalisée ;
- pas de remplacement du médecin.

---

# 6. Architecture technique cible

Séparer :

## Composants

- Header
- Hero
- EditorialCard
- DailyNumber
- FactCheck
- KeyDataCards
- FicheCard
- AssistantBox

## Données

- editorial.js
- fiches.js
- sources.js

## Styles

- layout
- composants
- responsive

---

# 7. Règles de développement

- Une fonctionnalité = un périmètre clair.
- Une modification = un ticket identifié.
- Un commit = une évolution compréhensible.
- Ne pas modifier plusieurs domaines simultanément.

---

# 8. Stratégie de migration

Phase 1 :
Nouvel accueil MACA Next.

Phase 2 :
Migration progressive des fiches et catégories.

Phase 3 :
Assistant navigation.

Phase 4 :
Optimisation expérience utilisateur.

---

# Objectif final

Créer une plateforme santé moderne, simple et fiable, capable d'évoluer sans dette technique excessive.
