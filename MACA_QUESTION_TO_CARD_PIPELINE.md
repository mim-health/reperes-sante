# MaCa Santé — Cycle Question → Fiche

Validé le 22/08/2026.

## Objectif

Toute question de santé pertinente identifiée par MaCa Santé doit pouvoir devenir un contenu générique, fiable, réutilisable et retrouvable par le moteur, sans créer une logique spécifique dans l'interface pour chaque nouvelle question.

## Pipeline éditorial obligatoire

`QUESTION → CANDIDATE → DRAFT → EVIDENCE_REVIEW → EDITOR_APPROVED → PUBLISHED → REAUDIT`

### 1. QUESTION
Question brute issue d'un utilisateur, de la veille, d'un Vrai/Faux, d'un chiffre, d'une actualité ou d'une idée éditoriale.

La question brute n'est jamais publiée automatiquement.

### 2. CANDIDATE
Avant création :
- normaliser la formulation ;
- identifier le thème et les synonymes ;
- rechercher une fiche existante équivalente ;
- si une fiche existe, l'enrichir plutôt que créer un doublon ;
- vérifier que le sujet peut être traité comme information générale en santé.

### 3. DRAFT
Transformer la question particulière en question générique grand public.

Exemple :
- question brute : « Mon fils tousse surtout la nuit, pourquoi ? »
- fiche générique : « Toux nocturne chez l'enfant : quelles sont les causes fréquentes ? »

Le brouillon suit obligatoirement `MACA_HEALTH_CARD_STANDARD.md`.

### 4. EVIDENCE_REVIEW
Avant validation :
- rechercher les références médicales adaptées ;
- privilégier les sources françaises institutionnelles et sociétés savantes ;
- croiser les sources lorsque nécessaire ;
- rattacher les affirmations importantes à une référence ;
- dater la vérification documentaire ;
- signaler les incertitudes ou divergences utiles.

### 5. EDITOR_APPROVED
Validation éditoriale explicite obligatoire avant publication.

Une génération par IA, une tendance de recherche ou une question fréquente ne vaut jamais validation médicale ou éditoriale.

### 6. PUBLISHED
La fiche validée rejoint le corpus commun. Elle devient :
- accessible depuis les catégories ;
- retrouvable par le moteur grâce au titre, aux mots-clés et synonymes ;
- réutilisable comme réponse à plusieurs formulations proches ;
- indépendante de la question particulière qui l'a déclenchée.

### 7. REAUDIT
Chaque fiche publiée conserve :
- `verifiedAt` ;
- `nextAuditAt` ;
- `auditIntervalMonths`, par défaut 3 ;
- son statut de validation.

À l'échéance, la fiche est revue, mise à jour si nécessaire et redatée.

## Schéma minimal d'une fiche issue d'une question

```js
{
  id: 'identifiant-stable',
  category: 'Catégorie',
  title: 'Question générique grand public ?',
  keywords: 'synonyme1 synonyme2 formulation proche',
  answer: 'Réponse essentielle courte.',
  explanation: 'Explication et nuances utiles.',
  usefulInfo: 'Repères pratiques généraux.',
  watch: 'Quand demander un avis médical, si pertinent.',
  source: 'Source(s) identifiée(s)',
  url: 'https://source-principale.example/',
  validationStatus: 'EDITOR_APPROVED',
  editorialStatus: 'PUBLISHED',
  verifiedAt: 'YYYY-MM-DD',
  nextAuditAt: 'YYYY-MM-DD',
  auditIntervalMonths: 3,
  origin: 'USER_QUESTION'
}
```

## Règle d'architecture

Le moteur ne doit pas nécessiter une nouvelle règle de code pour chaque fiche ajoutée. Une nouvelle fiche correctement structurée doit rejoindre le corpus, être indexable et devenir recherchable par les mécanismes génériques existants.

Les synonymes ou concepts transversaux peuvent enrichir le moteur global lorsqu'ils améliorent plusieurs recherches ; ils ne doivent pas devenir une succession de correctifs propres à chaque question.

## Garde-fous

- Pas de diagnostic personnalisé.
- Pas de publication automatique d'une réponse générée.
- Pas de création de doublon lorsque l'enrichissement d'une fiche existante suffit.
- Pas de fiche sans source et traçabilité.
- Pas de fiche publiée sans validation éditoriale explicite.
- Toute donnée issue des réseaux sociaux sert au mieux de signal éditorial, jamais de preuve médicale.

## Critère de réussite de l'étape 6

L'étape est considérée prête lorsque :
1. une question nouvelle peut être généralisée en fiche ;
2. la fiche respecte le standard commun ;
3. elle peut être ajoutée au corpus sans modification spécifique de l'interface ;
4. le moteur peut la retrouver via titre, mots-clés, synonymes ou concepts ;
5. son origine, sa validation et son prochain audit restent traçables.

Ce cycle constitue la base de l'enrichissement continu de MaCa Santé.