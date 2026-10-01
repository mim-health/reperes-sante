import fs from 'node:fs';
import assert from 'node:assert/strict';
const src=fs.readFileSync(new URL('./cloudflare-worker-public.js',import.meta.url),'utf8');
assert.match(src,/async scheduled\(controller,env,ctx\)/);
assert.match(src,/DELETE FROM questions WHERE created_at < datetime\('now', '-90 days'\)/);
assert.match(src,/async fetch\(request,env,ctx\)/);
console.log('Question Graph retention 90d: PASS');
