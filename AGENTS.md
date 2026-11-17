# MACASANTÉ — Editorial publication contract

Production source is `mim-health/reperes-sante`, branch `feat/v0-magazine`; never publish from `main` or the private repository. Isolate technical fixes and run their checks before integration. Do not deploy Assistant V3 as part of editorial work.

## Règle éditoriale prioritaire — 17 novembre 2026

- Tout éditorial présenté au Dr Romain BEDDOK est déjà finalisé et prêt à publier. Aucune finalisation supplémentaire ne doit être attendue après sa validation.
- « Je valide », « on valide » ou la validation de l’éditorial valide la version telle qu’elle est présentée. Dans ce circuit de publication, exécuter la suite sans nouvelle demande de validation, sauf réserve explicite du médecin (par exemple « ne pas publier »).
- Aucune version dite « intégrale », longue ou développée n’est exigée en supplément. Il n’existe aucun minimum ni maximum de mots pour un article. Adapter sa longueur au sujet ; le contenu doit être bien construit et sa source visible, quelle que soit la nature de cette source.
- Conserver la version présentée et la preuve de validation pour publier fidèlement ; le hash identifie cette version, sans imposer de longueur ni créer de validation. Ne pas réécrire le contenu après validation.

## When the responsible doctor validates the editorial

Treat this as authorization to execute publication of the **version as actually presented, of any length**, not merely to acknowledge, plan, or approve titles. No further confirmation is needed for that exact approved version.

1. Retrieve the presented versions, references, edition slots and approval evidence. If anything is missing, identify it precisely; never reconstruct an allegedly approved text from its title.
2. Prepare a structured bundle with a stable `requestId`, `items: [{kind: "magazine" | "fiche", body: ...}]` and approved `editions` for Magazine rotations. Preserve stable IDs/URLs when correcting existing contents; supply `baseVersion` for corrections.
3. Run `node scripts/editorial-publish.js prepare BUNDLE.json`. The snapshot is saved under `editorial/drafts/requests/` and is not itself authorization. Present finalized editorial content **before** asking for validation. After an existing explicit approval, use only the exact retrievable approved version to compute its hash.
4. Record the actual doctor identity, ISO timestamp with timezone, verbatim approval evidence, matching `snapshotHash`; no `fullText` flag or expanded text is required. Record the actual scope of the approval without inventing missing content.
5. Execute `node scripts/editorial-publish.js publish BUNDLE.json APPROVAL.json --commit --push` on the production branch, or atomically save the two canonical sources and approved request through the authenticated GitHub connector. The write must precede any claim that publication started.
6. Observe the resulting Actions run: A prepares; B deploys and checks exact public versions; C synchronizes the closed Assistant corpus. No extra manual intervention is expected on the successful path. Retry a failed stage without changing the approved medical snapshot.
7. Report actual URLs only after B verifies them. Distinguish `site published / Assistant pending` from complete success; never claim success from a commit, artifact, or deployment alone.

This is an operational contract for the agent processing the conversation, not a global ChatGPT message webhook. A phrase cannot publish missing texts or connect an unrelated conversation automatically.

Keep draft packages, test fixtures and approval intent out of the assembled public site. Preserve SHA-256 approval records, immutable Git history, sources, duplicate checks and image rights. Supplied imagery must pass its rights/uniqueness checks; an approved article without imagery is allowed by the existing audit.

## Programme de production et de diffusion

Appliquer [editorial/PRODUCTION.md](editorial/PRODUCTION.md) : une édition finalisée et validée doit être publiée, vérifiée puis accompagnée d’un relais social préparé. La notoriété de MACASANTÉ et sa présence sur les réseaux font partie du travail de production. Distinguer les supports prêts à publier des diffusions réellement effectuées. Ne pas annoncer un envoi ou une publication sociale sans preuve.
