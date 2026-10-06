# MACASANTÉ — Audience et Assistant — 06 octobre 2026

## Audience Google mesurée

Source : API Search Console en lecture seule, propriété `sc-domain:macasante.fr`,
recherche Web, données finales demandées jusqu’au 03/10/2026.

| Période | Clics | Impressions | CTR |
|---|---:|---:|---:|
| 27/09–03/10 (7 jours) | 10 | 120 | 8,3 % |
| 20/09–26/09 (7 jours précédents) | 12 | 112 | 10,7 % |
| 06/09–03/10 (28 jours) | 49 | 418 | 11,7 % |
| 09/08–05/09 (28 jours précédents) | 23 | 607 | 3,8 % |

Les clics progressent de 113 % sur les deux fenêtres de 28 jours, avec une
base faible. La dernière semaine ne progresse pas : 10 contre 12 clics.
Les impressions sur 28 jours baissent de 31 %. Ne pas présenter une croissance
continue ni assimiler les clics à des visiteurs uniques.

La table pages totalise 45 clics vers l’accueil (44 HTTPS et 1 HTTP), 3 vers des
fiches (double prise de médicament : 2 ; syndrome du nid vide : 1) et 1 vers
les mentions légales. Les fiches ont donc encore une très faible acquisition
directe. Les requêtes ayant produit les clics ne sont pas visibles dans la
table query/page : ne pas inventer leur contenu ni une attribution « marque ».

Opportunités observées sur 28 jours :

- Double prise de médicament : 73 impressions, 2 clics, position moyenne 8,84.
- Activité physique et sommeil : 20 impressions, 0 clic, position moyenne 7,7.
- Sciatique, nycturie et saignements après ménopause : formulations repérées,
  mais volumes insuffisants pour inférer un effet du titre ou une forte demande.

## Corrections SEO intégrées sur magazine

- Descriptions spécifiques des cinq fiches prioritaires, sans coupure de mots.
- Descriptions de repli plus propres sur les autres pages générées.
- Liens « À lire aussi » disponibles dans le HTML statique, ainsi que dans
  les fiches interactives pour les groupes ciblés.
- Métadonnées de partage des fiches statiques.

Aucune fiche médicale créée ou supprimée ; canonicals existants conservés.
Deux angles voisins (nycturie/prostate, nycturie/réveils nocturnes) restent
distincts. Le corpus canonique contient 355 fiches ; test retrieval : 139/139.

## Vitesse mesurée en production

Mesure du 06/10 à 11:33 UTC, 10 requêtes synthétiques, deux passages.
Médiane des 7 réponses couvertes réussies : 6,318 s. Sciatique : 9,27 puis
5,15 s. Nycturie : 7,49 puis 6,32 s. Magnésium : 5,45 puis 5,04 s.
La disponibilité simple (149 ms) n’est pas une mesure de réponse médicale.

Résultats fonctionnels : 9/10. La question sur la ménopause a été rejetée
par le contrat au premier passage, puis traitée correctement au second.
Ce cas reste un signal QA à reproduire. Aucun garde-fou affaibli.

Le moniteur existant a été corrigé : ses scripts mélangent auparavant
`require()` et `await` au premier niveau ; ils sont désormais en modules ES.

Optimisation candidate isolée dans la PR #57 : préchargement des artefacts
validés à l’ouverture, normes de vecteurs pré-calculées et temps par étape.
Tests locaux réussis ; aucun gain de production revendiqué. Déploiement
Cloudflare, smoke/red-team et comparaison avant/après restent nécessaires.

## Suivi réutilisable

Workflow `MACA audience and Assistant performance` sur main : relevés
comparables 7/28 jours, totaux globaux indépendants des requêtes visibles,
association requête/page et mesure de réponses complètes. Résumés dans le run,
artefacts conservés 14 jours. Exécution quotidienne avant le digest de midi.

Le site ne comporte toujours pas de mesure de visiteurs tous canaux. Les
visites directes et sociales, visiteurs uniques, rétention et clics depuis les
vidéos ne peuvent pas être déduits de Search Console. Aucun traceur ajouté.
