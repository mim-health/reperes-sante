#!/usr/bin/env bash
set -euo pipefail
# Commit the validated edition import together with its generated outputs.
BRANCH_NAME="${GITHUB_REF_NAME:-feat/v0-magazine}"
[ "$BRANCH_NAME" = 'feat/v0-magazine' ] || { echo 'Publication restricted to magazine branch'; exit 1; }
SOURCE_COMMIT="$(git rev-parse HEAD)"
INPUT_VERSION="$(node -p "require('./scripts/editorial-pipeline').sourceVersion()")"
IMPORT_CHANGED=false
if ! git diff --quiet -- editorial/content.json; then
 IMPORT_CHANGED=true
 git add -- editorial/content.json
fi
git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
git add editorial-fiches-validated.js
git add corpus-production.js corpus-loader.js fiches-data fiches-seo annuaire-fiches.html themes
git add index.html fiches.html fiche.html daily.html magazine.html maca-daily-editorial-data.js maca-editorial-history.js magazine-articles.js magazine-videos.js sitemap.xml editorial/manifest.json editorial/candidate-fiches.json editorial/duplicates-report.json
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
  [ "$IMPORT_CHANGED" = false ] || { echo 'Branch advanced during edition import; retry from the new head'; exit 1; }
  REMOTE_INPUT="$(node -p "require('./scripts/editorial-pipeline').sourceVersion(process.argv[1])" "$REMOTE_HEAD")"
  [ "$REMOTE_INPUT" = "$INPUT_VERSION" ] || { echo 'Editorial source changed: refusing stale publication'; exit 1; }
  # Replay generated output only; conflicts abort rather than overwrite concurrent work.
  git checkout --detach "$REMOTE_HEAD"
  git cherry-pick "$OUTPUT_COMMIT" || exit 1
 fi
 if git push origin "HEAD:refs/heads/$BRANCH_NAME"; then exit 0; fi
 sleep 2
done
exit 1
