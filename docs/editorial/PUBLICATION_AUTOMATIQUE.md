# P0 #73 — Validation médicale → publication

## Contract

The conversational executor must retrieve and persist the exact complete approved content, not just titles. `scripts/editorial-publish.js` exposes `prepare`, `validate`, `publish`, `verify`, `syncAssistant` and two adapters. GitHub write access remains the authorization boundary; a JSON hash is not a medical signature. See the root `AGENTS.md` for the execution path after « Je valide et publie ».

The approved request contains the full immutable snapshot, SHA-256, doctor identity, timestamp, approval evidence and historical transitions. The legacy Magazine validation hash is also retained. Fiches enter `editorial/fiches.json`, are checked against their approved hash, then compiled into the canonical manifest without modifying legacy medical files. Existing IDs are replaced only with a matching explicit base version. All requests remain versioned in Git.

`prepare` produces `READY_FOR_VALIDATION` in drafts. `publish` requires approval of that exact snapshot and writes canonical sources plus `VALIDATED_PENDING_PUBLICATION`. Drafts, approval request files and execution reports are excluded from the assembled site. Source intent is not a deployment proof.

## Three isolated jobs

A: input validation, duplicates, references/rights metadata, rendering, archive/sitemap and existing regressions. Magazine-only source changes reuse the validated fiche bundle and static fiche artifacts. Hubs, Magazine archives and sitemap are refreshed because they share dependencies. Structural changes, fiches, unknown bases and manual dispatch use a full safe rebuild. This deliberately does not claim fully incremental static fiche generation when shared dependencies change.

B: deploy the immutable site artifact; reject superseded medical sources immediately before deployment; check homepage, archive, sitemap, permanent pages, exact new content hashes and historical pages. A failure does not validate publication. Only this job owns the Pages concurrency lock; an in-progress AI sync does not hold it.

C: after successful B, reconstruct the closed corpus, check new IDs and versions, restore previous vectors, reuse the existing incremental embedding builder, publish an immutable index and exercise the public Assistant. Failure produces `ASSISTANT_SYNC_PENDING` with `siteStatus: PUBLISHED`; it never rolls the site back. The previous auto-publish workflow is disabled on the production branch to prevent a competing pre-deployment corpus publication.

Execution states and failure stage/cause/remedy are persisted in per-job `publication-report.json` artifacts (`editorial-stage-a/b/c-<tentative>`). These are execution evidence; approved request history describes intake. `DRAFT` describes editorial preparation; `READY_FOR_VALIDATION`, `VALIDATED_PENDING_PUBLICATION`, `PUBLISHING`, `PUBLISHED`, `PUBLICATION_FAILED` and `ASSISTANT_SYNC_PENDING` are distinct. Do not read a pending source-intent record as proof that a completed run failed. Recover actual run reports through GitHub.

Unchanged sources can be retried without a new medical approval. A medical version change requires a new snapshot and explicit approval. AI-only failures should rerun job C through Actions rather than redeploying a successful site. GitHub is not an automatic scientific reviewer: complete precise references and the doctor's validation remain mandatory; metadata checks do not establish medical validity.

## Tests

`node scripts/test-editorial-publish.js` uses temporary, clearly synthetic fixtures only, never a published medical approval. It covers mixed adapters, title-only/mismatched approval rejection, mutation, idempotence, source conflicts, exact generated/public versions, archive/sitemap membership, stale page rejection, Assistant ID/version consistency and preservation of approval after AI failure.

`node scripts/editorial-pipeline.js prepare` executes integration and existing regressions. The fix branch runs job A, builds an artifact, but cannot deploy or publish Assistant artifacts. Only `feat/v0-magazine` can execute B/C.

## Catch-up — 9 and 10 November 2026

At diagnosis the persistent source ends on 6 November. No integral approved editions for 9/10 were recovered from repository drafts, personal-context retrieval or the targeted file search. The four 10 November titles are known, not sufficient to reconstruct their approved articles. No fake edition or invented approval is inserted. Complete texts, references, approved rubrics and approval evidence are necessary to use the intake path. Missing material must be reported as a content-input blocker, not as a GitHub deployment failure.


Bilan de mise en place et limites : `P0_73_BILAN_2026-11-10.md`.
