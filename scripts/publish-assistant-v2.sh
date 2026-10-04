#!/usr/bin/env bash
# Publish only the generated artifacts onto the current branch, never replay source commits.
set -euo pipefail
VERSION="$(node -p "require('./assistant-v2/corpus.json').fingerprint")"
CARD_COUNT="$(node -p "require('./assistant-v2/corpus.json').cardCount")"
DEST="assistant-v2/public-artifacts/$VERSION"
mkdir -p "$DEST"
cp assistant-v2/corpus.json "$DEST/corpus.json"
cp assistant-v2/embeddings.index.json "$DEST/embeddings.index.json"
node - "$VERSION" "$CARD_COUNT" <<'NODE'
const fs=require('fs');
const version=process.argv[2];
const latest={schemaVersion:1,version,corpusFingerprint:version,cardCount:Number(process.argv[3]),sourceCommit:process.env.GITHUB_SHA,generatedAt:new Date().toISOString()};
fs.writeFileSync('assistant-v2/latest.json',JSON.stringify(latest,null,2)+'\n');
NODE
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add assistant-v2/latest.json "$DEST/corpus.json" "$DEST/embeddings.index.json"
if git diff --cached --quiet; then exit 0; fi
git commit -m "build(assistant-v2): publish validated corpus artifacts $VERSION"
PUBLISH_COMMIT="$(git rev-parse HEAD)"
CHECK_DIR="$(mktemp -d)"
trap 'rm -rf "$CHECK_DIR"' EXIT
for attempt in 1 2 3 4 5; do
  # Full history is essential: depth=1 made Git replay source commits and caused add/add conflicts.
  git fetch origin "+refs/heads/$GITHUB_REF_NAME:refs/remotes/origin/$GITHUB_REF_NAME"
  REMOTE_HEAD="$(git rev-parse "origin/$GITHUB_REF_NAME")"
  # Concurrent SEO/UI commits are safe only if the canonical corpus is identical.
  git archive "$REMOTE_HEAD" | tar -x -C "$CHECK_DIR"
  node "$CHECK_DIR/scripts/build-assistant-v2-corpus.js" > "$CHECK_DIR/build-report.json"
  REMOTE_VERSION="$(node -p "require(process.argv[1]).fingerprint" "$CHECK_DIR/assistant-v2/corpus.json")"
  if [ "$REMOTE_VERSION" != "$VERSION" ]; then
    echo "Canonical corpus changed during build; refusing stale publication. The next run must rebuild." >&2
    exit 1
  fi
  if [ "$(node -p "require(process.argv[1]).version" "$CHECK_DIR/assistant-v2/latest.json")" = "$VERSION" ]; then
    echo "Current canonical corpus already published."
    exit 0
  fi
  # Apply exactly the artifact commit onto the remote head. No source rebase and no force push.
  git checkout --detach "$REMOTE_HEAD"
  git cherry-pick "$PUBLISH_COMMIT"
  if git push origin "HEAD:refs/heads/$GITHUB_REF_NAME"; then
    echo "Assistant artifacts published: $CARD_COUNT cards ($VERSION)."
    exit 0
  fi
  sleep 2
done
echo "Assistant publication failed after 5 concurrent-update retries" >&2
exit 1
