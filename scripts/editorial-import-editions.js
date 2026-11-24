'use strict';

const fs = require('node:fs');
const path = require('node:path');
const mag = require('./mag-editorial');
const { adapters, hash, validate } = require('./editorial-publish');

const directory = 'editorial/editions';
const slots = new Map([
  ['À LA UNE', 1], ['À LIRE EN 3 MIN', 3], ['FICHE DU JOUR', 1],
  ['VRAI OU FAUX', 1], ['LE CHIFFRE DU JOUR', 1], ['DONNÉES', 3]
]);

function merge(registry, files) {
  const next = structuredClone(registry);
  for (const { name, record } of files) {
    const { snapshot, snapshotHash, approval } = record;
    validate(record, approval);
    const [edition] = snapshot.editions ?? [];
    if (snapshot.schemaVersion !== 1 || !edition || snapshot.editions.length !== 1 ||
        !/^\d{4}-\d{2}-\d{2}$/.test(edition.date) ||
        !Number.isFinite(Date.parse(edition.date)) ||
        new Date(edition.date).toISOString().slice(0, 10) !== edition.date ||
        snapshot.requestId !== 'edition-' + edition.date || edition.id !== snapshot.requestId ||
        name !== edition.date + '.json') {
      throw Error('Invalid daily edition snapshot: ' + name);
    }
    const fingerprint = hash({ snapshotHash, approval });
    const previous = next.importedEditions?.[edition.date];
    if (previous) {
      if (previous !== fingerprint) throw Error('Previously imported edition changed: ' + name);
      continue;
    }
    if (next.editions.some(old => old.id === edition.id || old.date === edition.date)) {
      throw Error('Edition already exists: ' + edition.date);
    }
    if (edition.complete !== true || !Array.isArray(edition.items) ||
        edition.items.length !== 10 ||
        [...slots].some(([slot, count]) => edition.items.filter(item => item.slot === slot).length !== count)) {
      throw Error('Incomplete daily edition: ' + name);
    }

    const existing = new Map(next.contents.map(content => [content.id, content]));
    const newIds = new Set();
    const features = edition.items.find(item => item.slot === 'FICHE DU JOUR');
    if (!mag.eligible(existing.get(features.contentId) ?? {})) {
      throw Error('Fiche du jour must reference existing validated content: ' + name);
    }
    if (!Array.isArray(snapshot.items) || snapshot.items.length !== 9) {
      throw Error('Expected nine approved Mag texts: ' + name);
    }
    for (const item of snapshot.items) {
      const { kind, body } = item;
      if (kind !== 'magazine' || !body || body.date !== edition.date ||
          ['medicalStatus', 'publicationStatus', 'validation'].some(key => Object.hasOwn(body, key)) ||
          existing.has(body.id) || newIds.has(body.id) ||
          !Array.isArray(body.keywords) || !body.keywords.some(keyword => typeof keyword === 'string' && keyword.trim())) {
        throw Error('Invalid or duplicate approved Mag text: ' + body?.id);
      }
      adapters.magazine.check(body);
      newIds.add(body.id);
      next.contents.push({
        ...body,
        medicalStatus: 'VALIDATED',
        publicationStatus: 'SCHEDULED',
        validation: {
          validator: approval.validator,
          validatedAt: approval.validatedAt,
          evidence: approval.evidence,
          contentHash: mag.digest(body),
          snapshotHash
        }
      });
    }
    if (edition.items.some(item => item !== features && !newIds.has(item.contentId))) {
      throw Error('Edition slots do not match the approved texts: ' + name);
    }
    next.editions.push(edition);
    (next.importedEditions ??= {})[edition.date] = fingerprint;
  }
  mag.check(next);
  return next;
}

function importEditions(root = mag.ROOT) {
  const input = path.join(root, directory);
  if (!fs.existsSync(input)) return 0;
  const files = fs.readdirSync(input, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.json'))
    .map(entry => entry.name).sort()
    .map(name => ({ name, record: JSON.parse(fs.readFileSync(path.join(input, name), 'utf8')) }));
  const current = mag.read(root);
  const next = merge(current, files);
  const imported = next.editions.length - current.editions.length;
  if (!imported) return 0;
  const target = path.join(root, 'editorial/content.json');
  const temporary = target + '.import-' + process.pid;
  try {
    fs.writeFileSync(temporary, JSON.stringify(next, null, 2) + '\n', { flag: 'wx' });
    fs.renameSync(temporary, target);
  } finally {
    fs.rmSync(temporary, { force: true });
  }
  return imported;
}

module.exports = { importEditions, merge };
