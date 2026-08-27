# MACA — Corpus Pipeline V2 (migration)

Branch: `fix/corpus-pipeline`

## Goal
A validated health card is declared once and becomes available to every consumer of the corpus.

## Safety contract
- `feat/v0-magazine` is not modified during migration.
- Existing medical data files are not rewritten during this phase.
- `corpus-manifest.js` is the single registry of corpus data files.
- `corpus-loader.js` loads the manifest sequentially and reports missing files.
- Search aliases, category UI, dedupe patches and editorial widgets are consumers/compatibility layers, not corpus sources.
- No production switch until parity tests pass.

## Canonical category rule
Every new card must carry an explicit canonical public category. Search keywords must never decide or mutate that category.

Allowed public categories:
1. Santé au quotidien
2. Cœur & prévention
3. Digestion & urinaire
4. Santé des femmes & grossesse
5. Enfants & parents
6. Ados
7. Santé mentale
8. Seniors

## Required pre-switch tests
1. Same legacy corpus/card count before and after loader migration.
2. No duplicate stable IDs.
3. No duplicate normalized titles.
4. Every card resolves to exactly one allowed public category.
5. Home and `fiches.html` consume the same manifest.
6. Search finds a newly added test card.
7. Category filter shows that test card only in its canonical category.
8. Individual-card URL opens correctly.
9. Existing representative cards remain searchable/openable.

## Addition workflow after validation
1. Editorial/medical validation.
2. Create one audited card data file with stable ID + explicit canonical category.
3. Add that filename once to `corpus-manifest.js`.
4. Automated integrity checks.
5. Publish only if checks pass.
