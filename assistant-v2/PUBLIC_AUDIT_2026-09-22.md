# Audit final public — Assistant MACA V2 — 22/09/2026

## Périmètre
Bascule de la recherche et de l'Assistant flottant vers une entrée unique V2, corpus fermé.

## Validé sur le Worker public
- readiness handshake : OK
- smoke test question réelle : OK
- red-team public : 22/22
- rate limiter Cloudflare : HTTP 429 observé lors du test espacé
- intégration JS / Worker / absence de code pilote public : OK
- endpoint public : `purple-voice-a8e3.dr-beddok.workers.dev`
- configuration déclarative : Worker `purple-voice-a8e3`, binding `RATE_LIMITER`, namespace `1001`, 20/60 s

## UX / intégration
- accueil et bibliothèque chargent `maca-assistant-v2-unified.js`
- barre de recherche et launcher appellent la même fonction `ask()`
- activation fail-closed après handshake public
- mobile : panneau plein écran et verrouillage du scroll
- erreur réseau / 429 gérés côté interface

## Workflows historiques rouges non utilisés comme gate V2
- ancien widget : assertion encore basée sur `assistant-alpha.html`
- ancienne régression recherche : 5 attentes `maca-cystite-reperes` absente/exclue du corpus canonique
- intégrité corpus : 46 catégories historiques hors référentiel actuel

Ces échecs sont documentés comme dette historique. Ils ne doivent pas être « corrigés » en modifiant le contenu médical uniquement pour rendre les tests verts.

## Verrou manuel restant avant fusion
1. Dans Cloudflare, remplacer `RATE_LIMIT_SALT` par une nouvelle valeur aléatoire, idéalement stockée comme Secret.
2. Ne pas communiquer cette nouvelle valeur.
3. Rejouer smoke + red-team + rate-limit après rotation.
4. Si les trois restent verts, fusionner la PR #35 vers `feat/v0-magazine`, puis vérifier le site public.

## État
Code prêt pour cutover sous réserve de la rotation du salt et de la validation post-rotation.
