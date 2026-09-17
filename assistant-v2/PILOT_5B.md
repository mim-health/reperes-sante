# MACA Santé — Assistant IA V2 — Pilote 5B

## Objectif

Confronter le prototype V2 à des formulations réellement produites par des utilisateurs qui ne connaissent ni le corpus ni les tests de développement, avant toute modification de l'Assistant public V1.6.

## Périmètre

- 5 à 10 testeurs maximum pour la première vague.
- 3 à 5 questions spontanées par testeur.
- URL Vercel séparée et non référencée par le site public.
- Code d'accès partagé aux seuls testeurs.
- Pas de nom, adresse, date de naissance, téléphone ou autre donnée directement identifiante dans les questions.
- Aucune question brute n'est enregistrée volontairement dans les logs applicatifs.
- Le compte rendu du test reste dans le navigateur ; le testeur choisit de le copier et de le transmettre.

## Architecture du pilote

Navigateur testeur -> fonction serveur Vercel -> embedding de la question -> retrieval sémantique sur les 272 fiches -> synthèse sur les seules fiches sélectionnées -> validation du contrat -> second contrôle de fidélité documentaire -> réponse.

Si le contrat ou le contrôle documentaire échoue, la réponse médicale n'est pas affichée et le pilote renvoie une abstention.

## Variables serveur requises

- `OPENAI_API_KEY`
- `PILOT_ACCESS_CODE`
- optionnel : `MACA_SYNTHESIS_MODEL` (défaut : `gpt-5.6-terra`)

Ces valeurs doivent exister uniquement côté serveur Vercel. Elles ne doivent jamais être intégrées au HTML, au JavaScript navigateur ou au dépôt GitHub.

## Interface

Page : `assistant-v2/pilot-5b.html`

Mode testeur : réponse + fiches MACA utilisées + appréciation utile / à améliorer + commentaire facultatif.

Mode technique interne : ajouter `?debug=1` à l'URL pour afficher le Top 5 sémantique et les métadonnées du résultat. Ne pas fournir ce mode aux testeurs ordinaires afin de ne pas influencer leur appréciation.

## Critères de passage de la première vague

On n'optimise pas le moteur pendant le pilote à partir d'une impression isolée. Chaque résultat problématique est d'abord classé : corpus manquant, retrieval, abstention, grounding, personnalisation ou UX. Les formulations réellement échouées sont ensuite ajoutées au banc de non-régression avant toute correction.

V1.6 et le site public restent inchangés pendant tout le pilote 5B.
