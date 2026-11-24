'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const mag = require('./mag-editorial');
const { hash } = require('./editorial-publish');
const { importEditions, merge } = require('./editorial-import-editions');

const registry = mag.read();
const date = '2099-02-15';
const previous = mag.assemble(registry).current;
const featured = previous.items.find(item => item.slot === 'FICHE DU JOUR');
const slots = ['À LA UNE', ...Array(3).fill('À LIRE EN 3 MIN'), 'VRAI OU FAUX',
  'LE CHIFFRE DU JOUR', ...Array(3).fill('DONNÉES')];
const items = slots.map((slot, index) => {
  const id = 'import-test-' + index;
  const title = 'Contenu de test incrémental ' + index;
  return {
    kind: 'magazine',
    body: { id, url: id + '.html', title, date, format: 'article',
      answer: title, html: '<p>' + title + '</p>', keywords: ['test'],
      sources: [{ label: 'Source de test', url: 'https://example.org/' }] }
  };
});
const fixture = {
  id: 'edition-' + date, date, publishAt: date + 'T08:00:00+01:00', complete: true,
  items: [featured, ...items.map(({ body }, index) => ({
    contentId: body.id, slot: slots[index], icon: '•'
  }))]
};
const snapshot = { schemaVersion: 1, requestId: fixture.id, editions: [fixture], items };
const snapshotHash = hash(snapshot);
const approval = { validator: 'Dr Romain BEDDOK', action: 'Je valide et publie',
  validatedAt: date + 'T07:50:00+01:00', evidence: 'Approbation fictive, réservée au test.', snapshotHash };
const file = { name: date + '.json', record: { snapshot, snapshotHash, approval } };
const merged = merge(registry, [file]);
assert.deepEqual(merged.contents.slice(0, registry.contents.length), registry.contents);
assert.deepEqual(merged.editions.slice(0, registry.editions.length), registry.editions);
assert.equal(merged.contents.length, registry.contents.length + 9);
for (const entry of merged.contents.slice(-9)) assert.equal(entry.validation.contentHash, mag.digest(entry));
const releasedAt = new Date(fixture.publishAt);
assert.equal(mag.assemble(merged, new Date(releasedAt.getTime() - 1000)).current.id, previous.id);
assert.equal(mag.assemble(merged, releasedAt).current.id, fixture.id);
assert.deepEqual(merge(merged, [file]), merged);

const withdrawn = structuredClone(merged);
withdrawn.editions.at(-1).complete = false;
for (const entry of withdrawn.contents.slice(-9)) entry.publicationStatus = 'RETRACTED';
assert.equal(mag.assemble(withdrawn, releasedAt).current.id, previous.id);
assert.deepEqual(merge(withdrawn, [file]), withdrawn);

function altered(update, reapprove = true) {
  const copy = structuredClone(file);
  update(copy.record);
  if (reapprove) copy.record.approval.snapshotHash = copy.record.snapshotHash = hash(copy.record.snapshot);
  return copy;
}
assert.throws(() => merge(registry, [altered(r => r.approval.evidence = '')]), /Approval/);
assert.throws(() => merge(registry, [altered(r => r.snapshot.items[0].body.answer = 'Edited', false)]), /has changed/);
assert.throws(() => merge(registry, [altered(r => r.snapshot.items[1].body.url = r.snapshot.items[0].body.url)]), /duplicate URL/);
assert.throws(() => merge(registry, [altered(r => r.snapshot.editions[0].items.pop())]), /Incomplete/);
assert.throws(() => merge(merged, [altered(r => r.snapshot.items[0].body.answer = 'Edited')]), /Previously imported/);

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mag-edition-import-'));
try {
  fs.mkdirSync(path.join(root, 'editorial/editions'), { recursive: true });
  const target = path.join(root, 'editorial/content.json');
  const source = path.join(root, 'editorial/editions', file.name);
  const before = JSON.stringify(registry);
  fs.writeFileSync(target, before);
  fs.writeFileSync(source, JSON.stringify(altered(r => r.approval.evidence = '').record));
  assert.throws(() => importEditions(root), /Approval/);
  assert.equal(fs.readFileSync(target, 'utf8'), before);
  fs.writeFileSync(source, JSON.stringify(file.record));
  assert.equal(importEditions(root), 1);
  assert.deepEqual(mag.read(root), merged);
  const after = fs.readFileSync(target, 'utf8');
  assert.equal(importEditions(root), 0);
  assert.equal(fs.readFileSync(target, 'utf8'), after);
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
console.log('PASS: daily edition import, real registry preservation, approval, hashes, duplicates, retry and withdrawal.');
