# MaCa Santé — Étape 8 : contrôle anti-régression du code

Contrôle du 22/08/2026, après création de la checklist Stable V1.

## Résultats vérifiables dans le code actuel

### Recherche
- Le champ de recherche est relié au moteur générique.
- Normalisation accents/majuscules présente.
- Stop-words français présents.
- Groupes de synonymes/concepts présents.
- Tolérance aux petites fautes via distance d'édition présente.
- Score par titre, mots-clés, catégorie et réponse présent.
- État sans résultat et suggestions proches prévus.
- Effacement de recherche prévu.

Statut code : **PASS**.

### Catégories
- Catégories calculées depuis le corpus.
- Filtre `Toutes` présent.
- Catégorie active prise en compte avant scoring de recherche.
- Ordonnancement préférentiel avec ajout automatique des catégories non prévues.

Statut code : **PASS**.

### Fiches / modales
- Cartes de questions rendues depuis les données du corpus.
- Ouverture de fiche par identifiant.
- Titre, réponse, source et métadonnées documentaires affichables.
- Liens sources ouverts avec `noopener`.
- Fermeture de modale prévue sans rechargement de page.
- État de scroll restauré à la fermeture.

Statut code : **PASS**.

### Clavier
- Cartes de questions et cartes éditoriales ont `tabindex="0"`.
- Les gestionnaires d'événements du moteur prévoient l'activation clavier des éléments interactifs.

Statut code : **PASS sous réserve du test navigateur réel du focus visuel et des touches attendues**.

### Navigation / identité
- Ancres principales présentes : Questions, À la une, Vrai/Faux, Sources.
- Pages Mentions légales, Confidentialité et Contact référencées depuis le pied de page.
- Canonical HTTPS et identité MaCa Santé présents.

Statut code : **PASS sous réserve de l'absence de 404 sur le déploiement public**.

## Point important découvert pendant l'étape 8

Le site public n'a pas pu être contrôlé de manière fiable depuis l'outil web de cette session : la récupération externe du domaine n'a pas fourni de page exploitable. Ce résultat ne permet ni de conclure que le site est indisponible, ni de certifier son fonctionnement.

En conséquence, les éléments suivants restent volontairement non cochés :
- certificat HTTPS observé depuis un navigateur ;
- zéro erreur console ;
- zéro ressource 404 ;
- comportement mobile réel ;
- rendu visuel du focus clavier ;
- interactions réelles de bout en bout.

## Conclusion intermédiaire

**Anti-régression structurelle/code : satisfaisante.**

Aucune régression évidente n'a été identifiée dans les parcours Recherche → Résultat → Fiche → Filtre à l'inspection du code.

**Stable V1 n'est pas encore déclarée**, conformément à la règle de la checklist : le contrôle navigateur réel reste nécessaire avant l'étape 9.