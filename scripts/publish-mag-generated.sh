#!/usr/bin/env bash
set -euo pipefail
# Only generated outputs are committed; the canonical editorial source remains unchanged.
BRANCH_NAME="${GITHUB_REF_NAME:-feat/v0-magazine}"
[ "$BRANCH_NAME" = 'feat/v0-magazine' ] || { echo 'Publication restricted to magazine branch'; exit 1; }
SOURCE_COMMIT="$(git rev-parse HEAD)"
INPUT_VERSION="$(node -p "require('./scripts/mag-editorial').hash(require('./scripts/mag-editorial').read())")"
git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
git add index.html daily.html magazine.html maca-daily-editorial-data.js maca-editorial-history.js magazine-articles.js magazine-videos.js sitemap.xml editorial/manifest.json editorial/candidate-fiches.json
node - <<'JS'
const {execFileSync}=require('child_process');const {read}=require('./scripts/mag-editorial');
const fs=require('fs');for(const c of read().contents)if(fs.existsSync(c.url))execFileSync('git',['add','--',c.url]);
JS
if git diff --cached --quiet; then exit 0; fi
git commit -m 'build(mag): publish complete validated edition and permanent archives'
OUTPUT_COMMIT="$(git rev-parse HEAD)"
for attempt in 1 2 3; do
 git fetch origin "+refs/heads/$BRANCH_NAME:refs/remotes/origin/$BRANCH_NAME"
 REMOTE_HEAD="$(git rev-parse "origin/$BRANCH_NAME")"
 if [ "$REMOTE_HEAD" != "$SOURCE_COMMIT" ]; then
  REMOTE_INPUT="$(git show "$REMOTE_HEAD:editorial/content.json" | node -e "let s='';process.stdin.on('data',x=>s+=x);process.stdin.on('end',()=>console.log(require('./scripts/mag-editorial').hash(JSON.parse(s))))")"
  [ "$REMOTE_INPUT" = "$INPUT_VERSION" ] || { echo 'Editorial source changed: refusing stale publication'; exit 1; }
  # Replay generated output only; conflicts abort rather than overwrite concurrent work.
  git checkout --detach "$REMOTE_HEAD"
  git cherry-pick "$OUTPUT_COMMIT" || exit 1
 fi
 if git push origin "HEAD:refs/heads/$BRANCH_NAME"; then exit 0; fi
 sleep 2
done
exit 1
