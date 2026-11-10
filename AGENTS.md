# MACASANTÉ — Editorial publication contract

Production source is `mim-health/reperes-sante`, branch `feat/v0-magazine`; never publish from `main` or the private repository. Isolate technical fixes and run their checks before integration. Do not deploy Assistant V3 as part of editorial work.

## When the responsible doctor says « Je valide et publie »

Treat this as authorization to execute publication of the **complete texts actually presented**, not merely to acknowledge, plan, or approve titles. No further confirmation is needed for that exact approved version.

1. Retrieve the complete presented versions, references, edition slots and approval evidence. If anything is missing, identify it precisely; never reconstruct an allegedly approved text from its title.
2. Prepare a structured bundle with a stable `requestId`, `items: [{kind: "magazine" | "fiche", body: ...}]` and approved `editions` for Magazine rotations. Preserve stable IDs/URLs when correcting existing contents; supply `baseVersion` for corrections.
3. Run `node scripts/editorial-publish.js prepare BUNDLE.json`. The snapshot is saved under `editorial/drafts/requests/` and is not itself authorization. Present integral drafts **before** asking for approval. After an existing explicit approval, use only the exact retrievable approved version to compute its hash.
4. Record the actual doctor identity, ISO timestamp with timezone, verbatim approval evidence, `fullText: true` and matching `snapshotHash`; do not manufacture these fields if approval only covered titles.
5. Execute `node scripts/editorial-publish.js publish BUNDLE.json APPROVAL.json --commit --push` on the production branch, or atomically save the two canonical sources and approved request through the authenticated GitHub connector. The write must precede any claim that publication started.
6. Observe the resulting Actions run: A prepares; B deploys and checks exact public versions; C synchronizes the closed Assistant corpus. No extra manual intervention is expected on the successful path. Retry a failed stage without changing the approved medical snapshot.
7. Report actual URLs only after B verifies them. Distinguish `site published / Assistant pending` from complete success; never claim success from a commit, artifact, or deployment alone.

This is an operational contract for the agent processing the conversation, not a global ChatGPT message webhook. A phrase cannot publish missing texts or connect an unrelated conversation automatically.

Keep draft packages, test fixtures and approval intent out of the assembled public site. Preserve SHA-256 approval records, immutable Git history, sources, duplicate checks and image rights. Supplied imagery must pass its rights/uniqueness checks; an approved article without imagery is allowed by the existing audit.
