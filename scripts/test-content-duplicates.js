'use strict';
const assert = require('assert/strict'), fs = require('fs'), a = require('./audit-content-duplicates'), m = require('./mag-editorial');
const data = a.load(), baseline = JSON.parse(fs.readFileSync('editorial/reviewed-corpus-overrides.json', 'utf8')), copy = x => JSON.parse(JSON.stringify(x));
assert.deepEqual(a.audit(data, baseline).errors, []);
let tests = 1;
function rejects(mutate, pattern) { const d = copy(data); mutate(d); assert(a.audit(d, baseline).errors.some(e => pattern.test(e)), pattern.toString()); tests++; }
rejects(d => d.files.push(d.files[0]), /Manifest file repeated/);
rejects(d => d.raw.push(copy(d.raw[0])), /Unreviewed corpus override/);
rejects(d => d.raw.reverse(), /Unreviewed corpus override/);
rejects(d => { const group = a.repeated(d.raw, r => r.card.id)[0][1]; group[0].card.answer += ' altered'; }, /Unreviewed corpus override/);
rejects(d => d.canonical.push({...copy(d.canonical[0]), id: 'new-copy', title: d.canonical[0].title.toUpperCase().replace(/ /g, ' — ')}), /duplicate normalized title/);
rejects(d => d.canonical.push({...copy(d.canonical[0]), id: 'new-copy', title: 'Autre titre'}), /duplicate full text/);
rejects(d => d.editorial.contents.push({...copy(d.editorial.contents[0]), id: 'duplicate-url', title: 'Autre titre', html: '<p>Autre texte</p>'}), /duplicate URL/);
rejects(d => d.editorial.editions[0].items.push(copy(d.editorial.editions[0].items[0])), /Repeated edition item/);
rejects(d => d.editorial.contents[0].ficheId = 'missing-fiche', /Broken fiche reference/);
const x = copy(data.editorial); x.editions[0].items.push(copy(x.editions[0].items[0])); assert.throws(() => m.check(x), /Repeated edition item/); tests++;
const y = copy(data.editorial), c = copy(y.contents[0]); c.id = 'copy'; c.url = 'copy.html'; c.title = c.title.toUpperCase(); c.validation.contentHash = m.digest(c); y.contents.push(c); assert.throws(() => m.check(y), /Duplicate normalized title/); tests++;
console.log('PASS: ' + tests + ' duplicate controls, including historical override protection and publishing gate.');
