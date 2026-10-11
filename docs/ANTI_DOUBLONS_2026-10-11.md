# Contrôles anti-doublons — 11 octobre 2026

Le contrôle porte sur les 139 fichiers déclarés au manifeste, leurs 403 occurrences brutes, les 377 fiches canoniques et les 27 contenus du Mag. Aucun titre normalisé ni texte intégral identique entre les fiches canoniques n'a été identifié. Les deux nouvelles fiches SFE sont présentes une seule fois, avec des développements de 529 et 527 mots.

## Erreurs corrigées

Les trois articles approuvés de `editorial-sfe-2026-10-11.json` étaient enregistrés mais non raccordés à la source de publication. Ils sont maintenant déclarés dans `editorial/content.json`, avec identifiant stable, URL permanente, sources conservées et provenance de la validation fournie par le fondateur. Les articles sur le diabète et l'hypertension renvoient aux deux fiches de référence. La validation médicale existante est conservée ; cette livraison n'effectue aucune validation médicale nouvelle.

La date des articles autonomes est désormais respectée dans la simulation de publication. Le test qui imposait 14 contenus Mag à l'Assistant est remplacé par une comparaison aux contenus réellement éligibles et une vérification explicite des trois nouveaux articles. L'export préparé compte 17 documents Mag et 377 fiches, soit 394 documents.

## Contrôles bloquants

- Fichier répété dans le manifeste, même avec une version de cache différente.
- Nouvelle réutilisation d'un identifiant de fiche avant canonicalisation ; modification non explicitement recensée d'une révision historique.
- Identifiant, URL ou titre normalisé répété dans une même collection.
- Texte intégral normalisé répété sous des identifiants distincts (minimum 200 caractères).
- Contenu répété dans une même édition ou référence vers un contenu absent.
- Lien d'un article vers une fiche inexistante.
- Article SFE approuvé resté hors du Mag ou texte/sources divergents après raccordement.

Le contrôle est exécuté avant publication Mag, avant génération SEO sur la branche Magazine et à chaque construction du corpus Assistant. Un échec empêche cette publication. `editorial/duplicates-report.json` est enregistré, et joint au rapport d'exécution du pipeline Mag. Le contrôle quotidien existant à 7 h déclenche ce même pipeline.

## Historique et rapprochements à examiner

Les 26 occurrences supplémentaires du corpus brut correspondent aux identifiants réutilisés dans les versions historiques. `editorial/reviewed-corpus-overrides.json` fige les empreintes et les fichiers de ces occurrences déjà présentes ; ce recensement technique ne constitue pas une validation médicale de chaque version. Aucun texte historique n'est effacé. Toute nouvelle révision d'un identifiant existant doit être examinée et explicitement inscrite dans ce registre, sans le régénérer aveuglément.

Le rapport contient 21 paires de titres proches, calculées par recoupement lexical. Certaines sont des rapprochements légitimes entre une fiche et un article/une vidéo, ou des maladies différentes avec une formulation comparable. D'autres sujets déjà proches (sang dans les urines, boule dans le sein, diversification, produits ménagers, poux, levers nocturnes) peuvent justifier un examen éditorial. Ce signal ne démontre ni équivalence médicale ni doublon à supprimer. Les fusions et transformations en fiche restent soumises à décision humaine. Le rapprochement lexical ne garantit pas de détecter toutes les paraphrases.

## Vérification

11 scénarios anti-doublons positifs/négatifs, tests de rotation/programmation/retrait/idempotence, 139 recherches de non-régression, 8 questions IPP, 47 scénarios de recherche de secours, 5 garde-fous de population, contrôles Mag/vidéos, 11 contrôles mécaniques et 7 flux simulés de fidélité, 7 tests de langage patient.

La réussite locale prépare la livraison. Le succès du déploiement public et de l'index actif doit être vérifié séparément. Le correctif de fidélité du Worker livré précédemment reste tributaire de son déploiement Cloudflare ; cette livraison ne résout pas l'absence de jeton de déploiement constatée auparavant.
