# MACA Growth Engine — Google First

Source prioritaire: Google Search Console.

Boucle:
1. exporter les requêtes Search Console;
2. convertir automatiquement l'export en signaux Growth;
3. prioriser les requêtes avec impressions réelles et positions améliorables;
4. tester la couverture par l'Assistant MACA;
5. relier chaque requête à la/aux fiche(s) utilisée(s);
6. produire un digest d'opportunités;
7. optimisation éditoriale humaine avant tout changement public;
8. mesurer ensuite impressions, position, clics et questions MACA.

Commande:
```
GSC_EXPORT=search-console-queries.csv node scripts/growth-search-console-import-v0.js
GROWTH_INPUT_PATH=growth-input.json node scripts/growth-digest-v0.js
```

Priorité pratique V0: requêtes déjà exposées par Google, particulièrement position 8–30 avec impressions et CTR perfectible.

Limites: Search Console ne restitue pas toutes les recherches Google et certaines requêtes sont masquées. V0 ne crée aucune page automatiquement et ne modifie pas le contenu médical sans validation humaine.
