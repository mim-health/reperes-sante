# MACA — collecte des recherches réelles V1

Cette brique est strictement périphérique à `MACA_SEARCH_V2`. Elle reçoit uniquement des événements de recherche et d'ouverture après consentement explicite côté navigateur.

## Création de la base D1 en juridiction UE

La juridiction doit être choisie à la création de la base et ne peut pas être ajoutée ensuite.

```bash
npx wrangler@latest d1 create maca-query-collection --jurisdiction=eu
```

Reporter ensuite le `database_id` retourné dans une copie de `wrangler.toml.example` nommée `wrangler.toml`.

## Initialisation

```bash
npx wrangler@latest d1 execute maca-query-collection --remote --file=schema.sql
```

## Déploiement du Worker

```bash
npx wrangler@latest deploy
```

Le domaine cible prévu par le frontend est `https://collecte.macasante.fr/v1/event`. Le domaine personnalisé doit être rattaché au Worker côté Cloudflare avant activation en production.

## Données

`query_events` contient : date serveur, surface (`search`/`assistant`), texte minimisé, `result`/`no_result`, IDs proposés, version moteur et classe de revue A/B/C optionnelle.

`open_events` relie uniquement une requête donnée à une fiche effectivement ouverte. Aucun identifiant utilisateur ou de session n'est prévu dans le schéma.

## Revue simple A/B/C

Exemple de liste de travail :

```sql
SELECT q.created_at, q.surface, q.query_text, q.result, q.proposed_ids,
       GROUP_CONCAT(o.fiche_id) AS opened_ids, q.review_class
FROM query_events q
LEFT JOIN open_events o ON o.query_event_id = q.event_id
GROUP BY q.event_id
ORDER BY q.created_at DESC;
```

A = fiche absente / candidat éditorial  
B = fiche existante mais non retrouvée / trouvabilité  
C = hors périmètre ou trop individualisé / abstention normale

## Conservation

Le Cron quotidien supprime automatiquement les événements de plus de 90 jours. Aucun payload de requête ne doit être écrit dans les logs applicatifs.
