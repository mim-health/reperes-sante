# Correctifs IPP et fidélité documentaire — 11 octobre 2026

## Défauts reproduits

- Avec le corpus actuel, « omeprazole depuis longtemps » était routé vers la fiche d’arrêt, car « depuis longtemps » est retiré des mots de recherche et le nouveau titre d’arrêt contient oméprazole. « Puis-je arrêter mon oméprazole ? » et « arrêter IPP » ne donnaient aucun résultat dans la recherche du site.
- L’export de l’Assistant reprenait `card.url` : certains documents avaient une URL vide, d’autres l’URL d’une référence scientifique externe au lieu de leur page MACASANTÉ. Ces liens incorrects ont aussi été observés sur des réponses publiques IPP.
- Le contrôle de fidélité jugeait globalement les blocs et l’union des fiches citées, sans preuve textuelle vérifiable pour chaque bloc. La note de portée générée était affichée sans ce contrôle. Il s’agit de failles de contrôle, pas d’une mesure du taux de réponses erronées.

## Changements

- Politique IPP partagée entre recherche et Worker : distinguer le long cours/la sécurité et l’arrêt/la diminution ; préserver les garde-fous de population et ne pas changer les textes médicaux.
- Les documents canoniques exportés portent toujours leur URL MACASANTÉ ; les références restent dans `sources`. Les URLs des articles du Mag sont conservées.
- Chaque bloc produit des citations exactes des champs documentaires ; refus mécanique des citations inventées, références sans preuve et chiffres absents des extraits.
- Le deuxième passage vérifie chaque bloc contre ses propres extraits, avec raisonnement `low` et un verdict complet par bloc. Un seul bloc non soutenu entraîne l’abstention.
- La note finale est un texte fixe de portée générale, sans information médicale générée. Les formulations de conseil individuel sont bloquées même si le modèle oublie de signaler la personnalisation.
- Une révision du Worker est exposée pour distinguer publication du code et simple mise à jour du corpus.
- Workflow de déploiement Worker séparé, contrôles avant déploiement, puis vérification publique de la révision, du routage IPP, du critère principal Galleri et de l’abstention hors corpus.

## Contrôles locaux

- 139 contrôles de recherche canoniques.
- 47 cas du jeu de recherche complémentaire avec le corpus actuel.
- 8 formulations IPP vérifiées dans la recherche et le retrieval Worker ; 5 garde-fous de contexte.
- 7 cas de langage patient, dont 4 négatifs.
- 11 vérifications mécaniques et 7 parcours Worker simulés, dont ajout de chiffre, note médicale inventée, verdict incomplet, causalité non soutenue et conseil individualisé.
- Tests d’archivage Mag, corrections, retraits, programmation et changement d’heure, accueil et vidéos.

Les tests simulés vérifient le refus en cas de verdict négatif ; ils ne prouvent pas l’infaillibilité du vérificateur IA. Les tests publics sont nécessaires après déploiement. Le jeu original des 51 questions n’est pas disponible dans le dépôt et n’est pas déclaré rejoué.

## Déploiement et exploitation

Sur `feat/v0-magazine`, les changements de recherche déclenchent la publication Mag/site et l’export IA. Les changements Worker déclenchent `Assistant V2 verified Worker publication`.

Le workflow Worker utilise `CLOUDFLARE_API_TOKEN` avec droits de modification sur le Worker existant et, si nécessaire pour sélectionner le compte, `CLOUDFLARE_ACCOUNT_ID`. Il échoue explicitement avant déploiement si le token manque : un succès du site/corpus ne signifie pas que le Worker est corrigé. Les secrets applicatifs et le rate limiter existants restent configurés sur Cloudflare.

Relance après configuration : nouveau commit ciblé ou `workflow_dispatch` si le workflow apparaît dans l’interface. Contrôle : `node scripts/test-assistant-v2-correctives-live.js`.

Retour arrière : rétablir les fichiers Worker de la dernière révision fonctionnelle et redéployer avec le même workflow ; l’historique Cloudflare permet également de revenir à la version précédente. Conserver les corrections de liens et le routage du site si le problème est uniquement lié à la génération.

## Éligibilité du Mag

Pour les 20 contenus des éditions des 10 et 11 octobre, les 6 exclusions sont attendues : 2 aperçus renvoient à une fiche existante et 4 brèves nécessitent une référence précise. Ils ne doivent pas être rendus éligibles par un changement technique de statut. Les contenus historiques et vidéos supplémentaires en attente de validation restent exclus selon leur propre statut.

La validation médicale et la transformation en fiche restent humaines.

## Vérification de livraison

La publication Mag/site a réussi. Les scripts de recherche réellement servis sur macasante.fr et le cache de l’entrée navigateur ont été contrôlés ; les requêtes long cours et arrêt trouvent leurs fiches respectives. Le manifeste actif de l’Assistant correspond aux 14 documents Mag éligibles, et une réponse Galleri sourcée a été vérifiée.

Le premier déploiement Worker a été arrêté après succès des tests : le secret CLOUDFLARE_API_TOKEN n’est pas configuré dans le contexte GitHub. Le Worker public ne présente pas la nouvelle révision ; le renforcement de fidélité et le routage Worker ne sont donc pas annoncés actifs.

Un test du Worker candidat avec les vraies API de génération et de vérification est ajouté avant l’étape Cloudflare, en utilisant uniquement les artefacts du dépôt. Il vérifie trois réponses couvertes et une question hors corpus, sans prouver le déploiement du serveur.

Un échec SEO concurrent a également été constaté : push rejeté parce que la publication Mag avait avancé la branche. Le workflow SEO utilise désormais la même file de publication que Le Mag, part de la branche actuelle et peut reprendre un push avec rebase sans force ; un conflit interrompt la publication.

Le premier test réel a effectivement détecté des précisions absentes des extraits (« mois ou années », « remontées acides »). Une unique révision contrôlée supprime désormais les affirmations contestées, puis repasse les mêmes contrôles mécaniques et sémantiques. En cas de nouvel échec, la réponse est abandonnée. Ce mécanisme ne transforme pas les remarques du vérificateur en source médicale et ne modifie pas le corpus.
