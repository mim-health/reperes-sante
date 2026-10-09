# Le Mag: validated video publication

The user provides approval and the video; the agent handles all technical transfers.

1. Materialize the approved video. Inspect codecs (H.264/yuv420p + AAC), decode it fully, record SHA-256 and byte size, extract a poster, and transcribe the validated narration.
2. Split bytes into parts of at most 7,500,000 bytes. Base64 requests must remain below the connector's 16 MiB request limit. If the local tool caps outputs at 1 MiB, collect base64 in chunks no longer than 1,000,000 characters in code mode and concatenate without printing. Verify the expected base64 length before upload. Never send a truncated output to create_blob.
3. Upload each part with GitHub create_blob(encoding=base64). Compare returned blob SHA to local git hash-object. Upload poster, manifest and scripts in one tree/commit on feat/v0-magazine with an expected-head lease. Never change main.
4. Store an immutable version ID (for example proteines-v8), validated=true, ordered part paths, source size/SHA-256, poster path, approved title/excerpt/transcript, published date, category, source fiche ID, keywords and cited scientific sources in media-publishing/ID/manifest.json. Use a new ID for each changed approved version.
5. Publish validated Mag videos runs automatically: reconstruct original bytes, enforce size/hash/codecs and full decode for every manifest, then generate MP4/poster/page/archive/sitemap, test all video links and commit atomically. A verify_only fixture exercises a second transfer without adding a public test video.
6. The workflow deploys the verified public tree (excluding multipart source files) and checks HTTP accessibility and exact public SHA-256. Any error fails the run visibly; no success should be reported before public verification.
7. The agent performs desktop/mobile playback QA and reports any device limitation honestly. Instagram, Facebook and YouTube remain separate user-approved actions.

Original approved versions remain in Git history and multipart inputs. No recompression or logo replacement occurs.
