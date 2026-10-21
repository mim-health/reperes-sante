# MACA Growth Engine V0

Date: 2026-10-02

## Objectif
Transformer des questions santé publiques déjà exprimées en opportunités d'acquisition qualifiées pour MACA Santé, sans automatiser la publication et sans modifier le moteur médical.

## Principe
DETECTER -> QUALIFIER -> TESTER MACA -> CLASSER -> PROPOSER -> VALIDATION HUMAINE -> MESURER.

## Contrat V0
Le V0 reçoit une liste de questions publiques collectées légalement et explicitement fournies au moteur. Il:
1. normalise et déduplique les questions;
2. calcule un Growth Score sur 100;
3. prépare chaque question pour un test contre l'Assistant MACA;
4. classe le résultat en GREEN / GAP / RED;
5. retourne au maximum 10 opportunités prioritaires.

Aucune publication automatique. Aucun profil utilisateur. Aucun stockage d'identité. Aucun scraping clandestin. Aucune modification du corpus ou du retrieval.

## Score
- intent: 0-25
- macaFit: 0-25
- corpusFit: 0-25
- distributionFit: 0-25
Total: 0-100.

## Statuts
- GREEN: MACA fournit une réponse exploitable et correctement sourcée.
- GAP: abstention correcte ou couverture insuffisante.
- RED: réponse potentiellement inadéquate, non groundée ou nécessitant revue.

## Données minimales
source, sourceUrl, question, detectedAt, scores, status. Ne pas conserver auteur, pseudo, email, téléphone, IP, cookie, profil ou données de navigation.

## KPI
KPI principal: nombre d'utilisateurs inconnus ayant posé au moins une question à MACA.
Secondaires: opportunités détectées, GREEN/GAP/RED, visites par source, visite -> première question.

## Étape suivante
Brancher des collecteurs publics autorisés et l'appel de test à l'Assistant V2, puis générer un digest quotidien Top 10.
