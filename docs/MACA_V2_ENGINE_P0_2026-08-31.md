# MACA V2 — Moteur P0

**Date : 31/08/2026**  
**Branche :** `feat/search-v2-p0-20260831`  
**Statut :** moteur autonome construit, non branché à l'interface publique.

## Objectif produit

La barre d'accueil et le chatbot doivent devenir deux portes d'entrée vers le même corpus MACA vérifié.

Le moteur V2 ne génère aucune réponse médicale. Il transforme une formulation utilisateur en zéro, une ou exceptionnellement deux fiches MACA existantes.

Règle de sécurité produit : **un faux positif est plus grave qu'un non-résultat.**

## Fichiers

- `search-v2-referential-p0.js` : traduction exécutable du lot P0 validé médicalement.
- `search-v2-engine.js` : résolution déterministe et abstention.
- `search-v2-tests-p0.js` : 120 cas de régression P0.
- `search-v2-regression-runner.js` : runner navigateur contre le corpus réellement chargé.
- `search-v2-lab.html` : laboratoire navigateur isolé pour tester des formulations et lancer la régression sans toucher à l'accueil.
- `.github/workflows/maca-search-v2-regression.yml` : exécution de `search-v2-lab.html?autorun=1` dans Chrome headless sur la branche de PR.

## Ordre de décision

1. normalisation conservatrice : casse, accents, ponctuation, pluriels simples et coquille limitée ;
2. détection du contexte explicite : bébé/enfant/ado/adulte, etc. ;
3. règles d'abstention obligatoires ;
4. alias et formulations validés du référentiel ;
5. exclusions/veto anatomiques et sémantiques ;
6. arbitrages de sous-intentions : par exemple palpitations générales vs « quand consulter » ;
7. seuil de confiance ;
8. marge entre les deux meilleurs candidats ;
9. vérification que l'ID cible n'est pas exclu et existe réellement dans le corpus chargé ;
10. en cas d'ambiguïté ou de cible absente : **aucun résultat**.

## Ce que le moteur ne fait plus

- aucun score sur le corps des réponses médicales ;
- aucun groupe sémantique large de type `malaise = vertige` ;
- aucun remplissage avec des fiches vaguement proches ;
- aucun fallback génératif ;
- aucune utilisation des IDs marqués `Exclure / Non — exclu` dans le référentiel.

## Associations validées

Des associations peuvent produire deux résultats uniquement lorsqu'elles sont explicitement prévues :

- reflux / douleur abdominale ;
- acouphènes + vertiges si les deux symptômes sont présents ;
- mal de tête : fiche céphalée générale + migraine comme alternative ;
- rapport non protégé + contraception d'urgence.

## Abstentions P0 obligatoires

Le moteur rend zéro résultat pour notamment :

- yeux rouges/secs/qui piquent chez l'adulte tant qu'aucune fiche adulte n'existe ;
- hémoptysie / « je tousse du sang » ;
- picotement de langue ;
- démangeaisons isolées de la nuque ;
- saignement de nez adulte tant que seule la fiche enfant existe ;
- toux sèche adulte isolée sans notion de durée dans le périmètre P0.

## Test local effectué avant commit

**120 / 120 cas P0 réussis** avec un corpus de test contenant les IDs attendus.

Le lot contient : formulations exactes, langage patient, sous-intentions, associations autorisées, fautes simples et vrais cas de non-résultat.

Cas de régression importants inclus :

- `crampe au mollet et mollet gonflé` → `jambe-gonflee-adulte`, pas crampes ;
- `acouphènes et vertiges` → deux fiches pertinentes ;
- `mal de tête` → `maux-tete` puis alternative migraine ;
- `palpitations quand consulter` → fiche dédiée quand-consulter ;
- `rapport non protégé pilule du lendemain` → contraception d'urgence prioritaire + fiche IST associée ;
- `cistite` et `migrane` → tolérance à une coquille simple ;
- requêtes d'abstention validées → zéro résultat.

## Régression navigateur sur corpus canonique

Le lab expose désormais un résultat machine contenant la taille réelle de `MACA_CANONICAL_CORPUS`, le nombre de tests réussis/échoués et le détail des différences. Le workflow Chrome headless charge directement le manifest et les scripts de la branche de PR : il teste donc le moteur contre le corpus canonique construit après les corrections d'intégrité de #13.

## Étape suivante avant activation

1. obtenir 120/120 dans le workflow navigateur canonique ;
2. corriger toute différence liée à une fiche absente ou à un ID réel ;
3. seulement ensuite brancher ce moteur sur la barre d'accueil et le chatbot Alpha/V2.
