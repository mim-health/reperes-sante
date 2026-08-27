# MaCa Santé — Étape 7 : sécurité / technique

Audit du 22/08/2026.

## Périmètre

Contrôle pré-Stable V1 : domaine/HTTPS, ressources front, dépendances, exposition technique, erreurs visibles et performance élémentaire.

## 1. Domaine et HTTPS

- Le dépôt contient un `CNAME` dédié à `macasante.fr`.
- Les métadonnées du site utilisent `https://macasante.fr/` comme URL canonique.
- Sitemap, OpenGraph et données structurées utilisent également HTTPS.
- Aucun contenu applicatif interne n'est référencé en HTTP dans `index.html`.

Statut : **architecture HTTPS cohérente**.

À confirmer lors du test extérieur/navigateur : certificat effectivement valide et absence d'avertissement « non sécurisé » sur le domaine public.

## 2. Ressources et dépendances

La page charge principalement des fichiers statiques locaux (CSS, SVG et JavaScript). Les seules dépendances visuelles externes identifiées dans l'en-tête sont les polices Google Fonts, chargées en HTTPS.

Points positifs :
- pas de framework tiers lourd chargé à l'exécution ;
- pas de bibliothèque JavaScript distante critique ;
- pas de script publicitaire ou tracker identifié dans `index.html` ;
- liens externes ouverts avec `rel="noopener"` lorsqu'ils utilisent `target="_blank"`.

Point de vigilance : `index.html` référence de nombreux fichiers JavaScript éditoriaux. Leur présence doit rester contrôlée à chaque ajout afin d'éviter une ressource manquante qui interromprait une partie du corpus.

## 3. Données sensibles / secrets

Le front audité est statique. Aucun champ d'identification, compte utilisateur, mot de passe ou donnée médicale nominative n'est demandé dans l'interface principale.

Règle Stable V1 : aucune clé API, secret, token GitHub ou identifiant privé ne doit être placé dans les fichiers servis au navigateur.

Statut : **pas d'exposition sensible identifiée dans l'architecture inspectée**.

## 4. Erreurs visibles et robustesse

Le moteur prévoit explicitement :
- état « aucun résultat » ;
- effacement de recherche ;
- filtres de catégories ;
- modales fermables ;
- vérifications d'existence de plusieurs éléments DOM avant manipulation.

Aucune alerte technique destinée à l'utilisateur ne doit apparaître. Une erreur de contenu ou de chargement doit dégrader localement la fonctionnalité sans afficher de jargon technique.

Statut code : **pas d'alerte bloquante évidente identifiée à l'inspection**.

Limite : une console JavaScript réelle et les requêtes réseau du domaine public doivent encore être observées depuis un navigateur pour certifier « zéro erreur console / zéro 404 ».

## 5. Performance élémentaire

Points favorables :
- site statique ;
- pas de framework lourd ;
- SVG pour le logo ;
- CSS unique principal ;
- JavaScript local sans dépendance applicative distante majeure.

Point d'amélioration futur : le corpus est actuellement réparti entre de nombreux scripts JS. Pour une montée en charge importante, consolider ou générer automatiquement les données réduira le nombre de requêtes et simplifiera l'anti-régression.

Cette optimisation n'est pas bloquante pour Stable V1 tant que les tests réseau ne montrent pas de ressource absente ou de temps de chargement anormal.

## 6. Critères de validation avant Stable V1

- [x] Domaine déclaré dans le dépôt.
- [x] URLs canoniques en HTTPS.
- [x] Pas de mixed content applicatif évident dans `index.html`.
- [x] Pas de secret ou donnée nominative requis par le front inspecté.
- [x] Pas de dépendance JavaScript distante critique.
- [x] Liens externes principaux protégés par `noopener`.
- [x] États utilisateur élémentaires prévus.
- [ ] Certificat HTTPS public vérifié dans navigateur.
- [ ] Console navigateur : zéro erreur bloquante.
- [ ] Réseau navigateur : zéro ressource locale 404.
- [ ] Chargement mobile réel jugé fluide.

## Conclusion

**Étape 7 — code et architecture : satisfaisants, sans signal inquiétant identifié.**

La validation technique définitive de Stable V1 exige encore le contrôle du site réellement déployé dans un navigateur (certificat, console, réseau et chargement mobile). Ces contrôles seront couplés à l'étape 8 d'anti-régression afin de ne pas déclarer prématurément une version stable.