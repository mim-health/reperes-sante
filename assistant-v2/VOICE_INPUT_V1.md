# MACA Assistant V2 — Saisie vocale V1

## Statut
Prototype uniquement sur branche dédiée. Aucun déploiement production sans validation explicite.

## Architecture
Flux strict : voix → transcription → champ texte → validation/correction utilisateur → bouton Interroger MACA → Assistant V2 existant.

La saisie vocale ne déclenche jamais l'envoi. Le moteur médical, le retrieval, le corpus fermé, le grounding, les seuils, les sources, les garde-fous, l'abstention et Question Graph ne sont pas modifiés.

## Technologie du prototype
Le prototype utilise l'API navigateur Web Speech `SpeechRecognition` / `webkitSpeechRecognition`, avec `lang = fr-FR`, une seule séquence de dictée et sans résultat intermédiaire.

MACA ne crée aucun fichier audio, n'envoie aucun audio à son Worker et n'écrit aucun audio dans D1, les logs ou Question Graph. Seul le texte présent dans le champ au moment où l'utilisateur appuie sur le bouton d'envoi suit le flux Assistant V2 existant.

### Confidentialité / prestataire
Cette V1 ne peut pas être décrite comme « traitement local garanti ». Selon le navigateur et la plateforme, la reconnaissance peut utiliser un service distant du fournisseur du navigateur/OS. MDN indique notamment que, sur certains navigateurs comme Chrome, l'audio peut être envoyé à un service web de reconnaissance.

Conséquence : avant production, la politique de confidentialité MACA doit documenter cette dépendance et le traitement doit être revalidé juridiquement/produit. Le prototype affiche « N’indiquez aucune information permettant de vous identifier. »

Le mode `processLocally` existe dans l'API mais reste expérimental et dépend de packs linguistiques/support navigateur ; il n'est donc pas imposé dans cette V1 afin de préserver la compatibilité.

Références techniques :
- MDN SpeechRecognition : https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
- MDN Using the Web Speech API : https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
- Can I Use Speech Recognition API : https://caniuse.com/speech-recognition

## Gestion des erreurs
- permission refusée → message + clavier intact
- microphone indisponible → message + clavier intact
- aucune parole → message + réessai possible
- interruption réseau/service → message + clavier intact
- navigateur non compatible → micro non fonctionnel, clavier intact
- transcription vide/erreur → aucun envoi

## Tests d'acceptation
- Chrome Android : permission acceptée/refusée, démarrage/arrêt, question courte/longue, termes médicaux
- Safari iPhone : mêmes scénarios, avec vérification réelle du support de la version iOS
- ordinateur : Chrome + navigateur non compatible/repli
- correction manuelle de la transcription
- compteur 600 caractères conservé
- aucun clic/envoi automatique après résultat vocal
- envoi seulement après action utilisateur
- réponse Assistant V2 inchangée
- aucun changement Worker/D1/Question Graph

Question de référence : « Est-ce que le café est mauvais pour le cœur ? » doit être transcrite dans le champ puis attendre l'action utilisateur.

## GO / NO-GO production
NO-GO tant que les tests sur appareils réels (Chrome Android + Safari iPhone) et la revue confidentialité ne sont pas validés.
