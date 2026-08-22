# MACA Santé — standard obligatoire des nouvelles fiches

Validé le 22/08/2026.

Toute nouvelle fiche MACA Santé, quelle que soit son origine, doit respecter ce modèle avant publication.

## Structure visible obligatoire

1. **Question / titre clair** — formulation grand public, compréhensible et directement recherchable.
2. **Réponse essentielle** — réponse courte donnant immédiatement le message principal.
3. **Explication** — contexte utile, nuances et éléments nécessaires à la compréhension, sans jargon inutile.
4. **Ce qu’il faut retenir / informations utiles** — conseils pratiques et repères actionnables adaptés à une information générale en santé.
5. **Quand demander un avis médical** — uniquement lorsque pertinent : signes ou situations justifiant un avis professionnel, formulés de façon générale et non comme une orientation médicale individualisée.
6. **Sources** — sources médicales identifiées et cliquables, avec priorité aux sources françaises institutionnelles et sociétés savantes ; littérature scientifique de qualité en complément lorsque nécessaire.
7. **Date de vérification et révision** — date du dernier contrôle documentaire et prochaine échéance d’audit, par défaut à 3 mois.

## Métadonnées obligatoires

Chaque fiche doit comporter au minimum :
- `id` unique et stable ;
- `category` ;
- `keywords` et synonymes utiles au moteur de recherche ;
- sources et URL précises ;
- `validationStatus` ;
- `verifiedAt` ;
- `nextAuditAt` ;
- `auditIntervalMonths: 3` par défaut ;
- statut éditorial selon le workflow `DRAFT → EDITOR_APPROVED → PUBLISHED`.

## Règles de qualité

- Une nouvelle fiche ne peut pas contourner ce gabarit.
- Vérifier l’existence d’une fiche équivalente avant création afin d’éviter les doublons ; enrichir la fiche existante lorsque cela est préférable.
- Les affirmations médicales importantes doivent être rattachées à une source adaptée à leur niveau de précision.
- Une tendance issue des réseaux sociaux peut déclencher la création d’une fiche mais ne constitue jamais une preuve médicale.
- Les formulations diagnostiques personnalisées sont exclues : MACA Santé reste un service d’information générale en santé.
- Toute incertitude ou divergence pertinente doit être explicitée plutôt que masquée.
- Une fiche ne peut être publiée sans validation explicite du directeur éditorial.

## Origines concernées

Ce standard s’applique notamment aux fiches issues :
- d’une nouvelle question identifiée par le moteur ou les utilisateurs ;
- d’un Vrai/Faux arrivé en fin de mise en avant ;
- d’un Chiffre du jour ;
- des « 3 données à retenir » ;
- d’un sujet À la une devenu pertinent comme contenu pérenne ;
- de la veille éditoriale ou documentaire ;
- d’un ajout manuel au corpus.

## Principe

**Une seule architecture de fiche, quelle que soit son origine : réponse rapide, explication fiable, informations utiles, sécurité, sources et traçabilité.**
