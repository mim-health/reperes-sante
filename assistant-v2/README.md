# MACA Santé — Assistant IA V2 (prototype isolé)

Ce dossier appartient exclusivement au prototype **Assistant IA V2 — corpus fermé**.

## Principe d’isolation

- Ne pas modifier l’Assistant V1.6 ni son moteur `MACA_SEARCH_V2`.
- Ne pas modifier les fiches médicales pour satisfaire le prototype.
- Toute donnée utilisée par V2 doit provenir du corpus canonique MACA déjà validé.
- Les artefacts V2 sont dérivés automatiquement du corpus ; ils ne constituent pas une nouvelle source éditoriale.

## Artefacts

`corpus.json` est généré par `scripts/build-assistant-v2-corpus.js` à partir de `MACA_CANONICAL_CORPUS`.

Chaque fiche exportée contient uniquement les informations utiles au futur retrieval et à la synthèse :

- `id`
- `title`
- `primaryCategory` et `categories`
- `keywords`
- `content.answer`
- `content.detail`
- `content.usefulInfo`
- `content.watch`
- `sources`
- `url`
- métadonnées de validation/audit disponibles
- `retrievalText`, construit uniquement à partir de ces champs MACA

`corpus.report.json` contrôle la structure de l’export. Les erreurs fatales sont : ID absent, ID dupliqué, titre absent ou texte de retrieval vide. Les champs historiques incomplets (détail, sources, catégorie reconnue, etc.) sont signalés comme avertissements afin de mesurer l’état réel du corpus sans modifier la production.

## Étape suivante

Le retrieval V2 sera construit au-dessus de cet artefact sans accès au Web et sans accès à une autre base médicale. L’API de génération ne sera ajoutée qu’après validation du retrieval sur un banc de tests dédié.
