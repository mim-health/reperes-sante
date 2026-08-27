# MaCa Santé — Cycle Question → Fiche

Validé le 22/08/2026. Positionnement et boucle d'enrichissement précisés le 23/08/2026 à partir des tests utilisateurs V1.

## Positionnement produit

MaCa Santé est un **site d'information médicale**, pas un service de diagnostic et pas un substitut au médecin.

Sa mission est de répondre aux **questions de santé que les gens se posent réellement et fréquemment**, avec des réponses simples et courtes dont le travail documentaire a été réalisé en amont : recherche, sélection, croisement et vérification des références médicales les plus solides et adaptées au sujet.

La valeur de MaCa Santé repose donc sur :
- des questions formulées comme le grand public se les pose réellement ;
- un corpus de réponses préparées, structurées et réutilisables ;
- des références médicales identifiées, privilégiant les sources françaises institutionnelles et les sociétés savantes ;
- une synthèse compréhensible sans sacrifier la solidité documentaire ;
- une date de vérification et un réaudit régulier ;
- un corpus qui s'enrichit à partir des besoins réels observés chez les utilisateurs.

MaCa Santé n'a pas vocation à analyser une photo pour donner un avis diagnostique, à poser un diagnostic personnalisé, ni à remplacer une consultation médicale.

**Boucle produit de référence :**

`VRAIES QUESTIONS UTILISATEURS → MEILLEURES SOURCES → RÉPONSE CLAIRE → CORPUS ENRICHI PAR LES USAGES`

## Objectif

Toute question de santé pertinente identifiée par MaCa Santé doit pouvoir devenir un contenu générique, fiable, réutilisable et retrouvable par le moteur, sans créer une logique spécifique dans l'interface pour chaque nouvelle question.

## Questions sans réponse : boucle d'enrichissement obligatoire

Le moteur doit à terme permettre d'identifier les requêtes auxquelles le corpus ne fournit pas de réponse satisfaisante.

Principes :
- tracer la **requête ou sa forme normalisée**, pas l'identité de la personne ;
- ne demander ni nom, ni adresse, ni coordonnées pour ce mécanisme ;
- privilégier une collecte anonyme et agrégée ;
- comptabiliser la fréquence des questions sans réponse ou insuffisamment couvertes ;
- regrouper les formulations proches afin d'identifier un même besoin éditorial ;
- utiliser le retour « Ai-je trouvé ma réponse ? Oui / Non » comme signal complémentaire lorsque cette fonction sera disponible ;
- faire remonter les sujets récurrents dans une file éditoriale ;
- ne jamais générer ni publier automatiquement une réponse médicale à partir de ces données.

Une question récurrente non couverte devient une **CANDIDATE** et suit ensuite l'intégralité du pipeline éditorial et médical ci-dessous.

Objectif : les échecs de recherche doivent progressivement améliorer le corpus sans transformer MaCa Santé en outil de profilage des utilisateurs.

## Pipeline éditorial obligatoire

`QUESTION → CANDIDATE → DRAFT → EVIDENCE_REVIEW → EDITOR_APPROVED → PUBLISHED → PUBLICATION_CHECK → REAUDIT`

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

**Règle impérative : la création ou la présence du fichier dans GitHub ne constitue jamais, à elle seule, une publication réussie.** Le fichier contenant la fiche doit être effectivement intégré à la chaîne de chargement utilisée par le site public (ou au mécanisme générique de corpus qui la remplace). Une fiche non chargée par `index.html` ou par le chargeur de corpus actif est considérée comme **NON PUBLIÉE**, même si son fichier existe dans le dépôt.

### 7. PUBLICATION_CHECK — contrôle obligatoire sans relance utilisateur

Après chaque ajout ou modification de fiche, effectuer systématiquement, dans la même tâche, le contrôle de bout en bout suivant :
1. vérifier que le fichier/la donnée est bien présent(e) sur la branche publique `feat/v0-magazine` ;
2. vérifier que le site public charge effectivement cette source de données (`index.html` ou chargeur générique actif) ;
3. vérifier que la fiche rejoint bien le corpus consommé par l'application et n'est pas seulement stockée dans le dépôt ;
4. vérifier son rattachement à la bonne rubrique/catégorie ;
5. vérifier qu'elle est retrouvable par son titre et ses principaux mots-clés/synonymes ;
6. vérifier ses sources, `verifiedAt`, `nextAuditAt`, `auditIntervalMonths` et son statut de validation ;
7. effectuer un contrôle anti-doublon ;
8. vérifier qu'aucune régression évidente n'est introduite dans la navigation, la recherche ou l'affichage ;
9. lorsque le déploiement public est disponible, confirmer que la fiche est effectivement visible/retrouvable sur `macasante.fr`.

**Ce contrôle est automatique et obligatoire. Il ne doit jamais dépendre d'une relance de l'utilisateur.**

Une tâche « ajouter une fiche », « intégrer une fiche », « publier une fiche » ou formulation équivalente n'est considérée **DONE** qu'après réussite de cette chaîne complète. Si un contrôle ne peut pas encore être réalisé (par exemple déploiement GitHub Pages en attente), le statut doit rester **EN ATTENTE DE CONTRÔLE**, et non DONE.

### 8. REAUDIT
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
- Pas d'analyse d'image visant à donner un avis diagnostique dans le périmètre actuel de MaCa Santé.
- Pas de publication automatique d'une réponse générée.
- Pas de création de doublon lorsque l'enrichissement d'une fiche existante suffit.
- Pas de fiche sans source et traçabilité.
- Pas de fiche publiée sans validation éditoriale explicite.
- Pas de statut DONE tant que le contrôle `PUBLICATION_CHECK` n'est pas terminé.
- Toute donnée issue des réseaux sociaux sert au mieux de signal éditorial, jamais de preuve médicale.
- Les requêtes sans réponse servent à mesurer les manques du corpus, pas à identifier ou profiler les utilisateurs.

## Critère de réussite de l'étape 6

L'étape est considérée prête lorsque :
1. une question nouvelle peut être généralisée en fiche ;
2. la fiche respecte le standard commun ;
3. elle peut être ajoutée au corpus sans modification spécifique de l'interface ;
4. le moteur peut la retrouver via titre, mots-clés, synonymes ou concepts ;
5. son origine, sa validation et son prochain audit restent traçables ;
6. sa présence dans le chemin de chargement public est vérifiée ;
7. le `PUBLICATION_CHECK` a été réalisé sans intervention ou relance de l'utilisateur.

Ce cycle constitue la base de l'enrichissement continu de MaCa Santé.