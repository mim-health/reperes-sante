'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const fingerprint = card => crypto.createHash('sha256').update(JSON.stringify(card)).digest('hex');
function load(root = ROOT) {
  const context = { console, setTimeout, clearTimeout }; context.window = context; context.globalThis = context;
  vm.createContext(context);
  const run = file => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  run('corpus-manifest.js');
  const files = Array.from(context.MACA_CORPUS_MANIFEST, f => f.split('?')[0]), provenance = new Map();
  const raw = () => [...(context.healthQuestions || []), ...(context.extraAuditedQuestions || [])];
  for (const file of files) { run(file); for (const card of raw()) if (!provenance.has(card)) provenance.set(card, file); }
  run('corpus-canonicalizer.js');
  return { files, raw: raw().map(card => ({ card, file: provenance.get(card) })), canonical: Array.from(context.MACA_BUILD_CANONICAL_CORPUS()), editorial: fs.existsSync(path.join(root, 'editorial/content.json')) ? JSON.parse(fs.readFileSync(path.join(root, 'editorial/content.json'), 'utf8')) : { contents: [], editions: [] } };
}
function repeated(items, key) {
  const groups = new Map();
  for (const item of items) { const value = key(item); if (value) groups.set(value, [...(groups.get(value) || []), item]); }
  return [...groups.entries()].filter(([, values]) => values.length > 1);
}
function audit(data, baseline = {}) {
  const errors = [], revisions = [], similarities = [];
  for (const [file] of repeated(data.files, f => f)) errors.push('Manifest file repeated: ' + file);
  for (const [id, rows] of repeated(data.raw, row => row.card.id || 'title:' + normalize(row.card.title))) {
    const signatures = rows.map(row => row.file + ':' + fingerprint(row.card));
    if (!baseline[id] || JSON.stringify(signatures) !== JSON.stringify(baseline[id])) errors.push('Unreviewed corpus override: ' + id);
    revisions.push({ id, occurrences: rows.length, files: rows.map(row => row.file) });
  }
  for (const [name, items, getTitle, getBody] of [
    ['corpus', data.canonical, c => c.title, c => [c.answer, c.detail].join(' ')],
    ['Mag', data.editorial.contents, c => c.title, c => require('./mag-editorial').plain(c.html)]
  ]) {
    for (const [key, rows] of repeated(items, c => c.id)) errors.push(name + ' duplicate ID: ' + key);
    for (const [, rows] of repeated(items, c => normalize(getTitle(c)))) errors.push(name + ' duplicate normalized title: ' + rows.map(c => c.id).join(', '));
    for (const [, rows] of repeated(items, c => { const body = normalize(getBody(c)); return body.length >= 200 ? body : ''; })) errors.push(name + ' duplicate full text: ' + rows.map(c => c.id).join(', '));
  }
  for (const [url] of repeated(data.editorial.contents, c => c.url)) errors.push('Mag duplicate URL: ' + url);
  const ficheIds = new Set(data.canonical.map(c => c.id)), contentIds = new Set(data.editorial.contents.map(c => c.id));
  for (const c of data.editorial.contents) if (c.ficheId && !ficheIds.has(c.ficheId)) errors.push('Broken fiche reference: ' + c.id + ' -> ' + c.ficheId);
  for (const e of data.editorial.editions) {
    for (const [id] of repeated(e.items, i => i.contentId)) errors.push('Repeated edition item: ' + e.id + ' -> ' + id);
    for (const i of e.items) if (!contentIds.has(i.contentId)) errors.push('Missing edition content: ' + e.id + ' -> ' + i.contentId);
  }
  // Similar subjects are editorial review candidates, never automatic deletions.
  const all = [...data.canonical.map(c => ({ id: c.id, title: c.title, type: 'fiche' })), ...data.editorial.contents.map(c => ({ id: c.id, title: c.title, type: 'Mag' }))];
  const stop = new Set('a au aux avec ce ces chez comment dans de des du en est et faut il la le les mais ne on ou par pas peut pourquoi pour que quel quelle quels quelles qui se si son sur un une vous quand'.split(' '));
  const tokens = c => new Set(normalize(c.title).split(' ').filter(t => t.length > 2 && !stop.has(t)));
  for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
    const a = tokens(all[i]), b = tokens(all[j]), intersection = [...a].filter(t => b.has(t)).length;
    const score = intersection / new Set([...a, ...b]).size;
    if (intersection >= 2 && score >= 0.5) similarities.push({ left: all[i], right: all[j], score: Number(score.toFixed(2)) });
  }
  return { errors, reviewedOverrides: revisions, titleSimilarityCandidates: similarities, counts: { manifestFiles: data.files.length, rawFiches: data.raw.length, canonicalFiches: data.canonical.length, magContents: data.editorial.contents.length } };
}
function run(root = ROOT) {
  const data = load(root), baseline = JSON.parse(fs.readFileSync(path.join(root, 'editorial/reviewed-corpus-overrides.json'), 'utf8'));
  const result = audit(data, baseline);
  const stagedPath = path.join(root, 'editorial-sfe-2026-10-11.json');
  if (fs.existsSync(stagedPath)) {
    const staged = JSON.parse(fs.readFileSync(stagedPath, 'utf8'));
    for (const article of staged.articles) {
      const published = data.editorial.contents.find(c => c.id === article.id);
      if (!published) result.errors.push('Approved staged article not connected to Mag: ' + article.id);
      else if (published.title !== article.title || published.answer !== article.intro || JSON.stringify(published.sources) !== JSON.stringify(article.sources) || !(Array.isArray(article.body) ? article.body : article.body.split(/\n\s*\n/)).every(p => require('./mag-editorial').plain(published.html).replace(/\s+/g, ' ').includes(p.replace(/\s+/g, ' ')))) result.errors.push('Staged source differs from Mag: ' + article.id);
    }
  }
  fs.writeFileSync(path.join(root, 'editorial/duplicates-report.json'), JSON.stringify(result, null, 2) + '\n');
  if (result.errors.length) throw Error(result.errors.join('\n'));
  return result;
}
module.exports = { load, audit, run, normalize, fingerprint, repeated };
if (require.main === module) { try { const r = run(); console.log('PASS duplicate audit: ' + JSON.stringify(r.counts) + '; ' + r.titleSimilarityCandidates.length + ' similarity candidates for human review.'); } catch (e) { console.error(e.message); process.exitCode = 1; } }
