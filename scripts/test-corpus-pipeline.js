'use strict';
const fs = require('fs');
const vm = require('vm');

const ALLOWED = new Set([
  'Santé au quotidien','Cœur & prévention','Digestion & urinaire',
  'Santé des femmes & grossesse','Enfants & parents','Ados','Santé mentale','Seniors'
]);
const norm = v => String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const stripQuery = s => String(s).split('?')[0];

function fail(message, details) {
  console.error('\nFAIL:', message);
  if (details) console.error(details);
  process.exitCode = 1;
}

// 1) Read manifest without browser dependencies.
const manifestCode = fs.readFileSync('corpus-manifest.js','utf8');
const manifestSandbox = { window: {} };
vm.createContext(manifestSandbox);
vm.runInContext(manifestCode, manifestSandbox, { filename: 'corpus-manifest.js' });
const manifest = manifestSandbox.window.MACA_CORPUS_MANIFEST;
if (!Array.isArray(manifest) || !manifest.length) {
  fail('manifest missing or empty');
  process.exit(1);
}

// 2) Missing files + duplicate manifest entries.
const manifestFiles = manifest.map(stripQuery);
const missing = manifestFiles.filter(f => !fs.existsSync(f));
const duplicateManifest = manifestFiles.filter((f,i,a) => a.indexOf(f) !== i);
if (missing.length) fail('manifest references missing files', missing);
if (duplicateManifest.length) fail('manifest contains duplicate files', duplicateManifest);

// 3) Load corpus in manifest order in a browser-like global sandbox.
const sandbox = { window: {}, console };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
for (const file of manifestFiles) {
  try {
    vm.runInContext(fs.readFileSync(file,'utf8'), sandbox, { filename: file });
  } catch (e) {
    fail('unable to execute corpus file '+file, e.stack || e.message);
  }
}

const w = sandbox.window;
const cards = []
  .concat(Array.isArray(w.healthQuestions) ? w.healthQuestions : [])
  .concat(Array.isArray(w.extraAuditedQuestions) ? w.extraAuditedQuestions : [])
  .filter(Boolean);

// 4) IDs/titles/category integrity.
const ids = new Map(), titles = new Map();
const duplicateIds = [], duplicateTitles = [], invalidCategories = [];
cards.forEach((c,i) => {
  const id = String(c.id || '').trim();
  const title = norm(c.title || c.question);
  const category = String(c.publicCategory || c.category || '').trim();
  if (id) { if (ids.has(id)) duplicateIds.push(id); else ids.set(id,i); }
  if (title) { if (titles.has(title)) duplicateTitles.push(c.title || c.question); else titles.set(title,i); }
  if (category && !ALLOWED.has(category)) invalidCategories.push({id,title:c.title||c.question,category});
});
if (duplicateIds.length) fail('duplicate stable IDs', [...new Set(duplicateIds)]);
if (duplicateTitles.length) fail('duplicate normalized titles', [...new Set(duplicateTitles)]);
if (invalidCategories.length) fail('cards outside canonical 8 categories', invalidCategories);

// 5) Canary must NOT be part of production manifest; load it separately and validate once/search/category.
if (manifestFiles.includes('corpus-pipeline-test-card.js')) fail('canary must not be included in production corpus manifest');
vm.runInContext(fs.readFileSync('corpus-pipeline-test-card.js','utf8'), sandbox, { filename:'corpus-pipeline-test-card.js' });
const afterCanary = []
  .concat(Array.isArray(w.healthQuestions) ? w.healthQuestions : [])
  .concat(Array.isArray(w.extraAuditedQuestions) ? w.extraAuditedQuestions : [])
  .filter(Boolean);
const canary = afterCanary.filter(c => c.id === 'maca-pipeline-canary-2026-08-25');
const searchable = afterCanary.some(c => c.id === 'maca-pipeline-canary-2026-08-25' && norm([c.title,c.question,(c.keywords||[]).join(' ')].join(' ')).includes('maca pipeline canary'));
const categoryOK = canary.length === 1 && (canary[0].publicCategory || canary[0].category) === 'Santé au quotidien';
if (canary.length !== 1) fail('canary is not present exactly once', {count:canary.length});
if (!searchable) fail('canary is not searchable');
if (!categoryOK) fail('canary canonical category failed');

console.log(JSON.stringify({
  manifestFiles: manifestFiles.length,
  rawCards: cards.length,
  uniqueIds: ids.size,
  uniqueNormalizedTitles: titles.size,
  missingFiles: missing.length,
  duplicateManifestFiles: duplicateManifest.length,
  duplicateIds: duplicateIds.length,
  duplicateTitles: duplicateTitles.length,
  invalidCategories: invalidCategories.length,
  canary: {presentExactlyOnce:canary.length===1, searchable, canonicalCategory:categoryOK},
  passed: process.exitCode !== 1
}, null, 2));

if (process.exitCode === 1) process.exit(1);
