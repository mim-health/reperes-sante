'use strict';
// Narrow editorial exception: two independently medically validated editions
// reuse the same topic/title while retaining distinct text and permanent URLs.
// Every other duplicate title remains a blocking error. Content hashes are
// pinned: changes require fresh medical validation AND deliberate re-review.
const approved = Object.freeze({
  'daily-entorse-20261011': '2717a00a8059c20d22ef9b5ad1220d7ffcbbaa2cf777f7fda909f21b3156f48d',
  'daily-entorse-cheville-rotation-20261104': '2169d09994d33fdea1dd830e021f6072d97b1a6ca881490a94144d07dde8ea2d'
});
function approvedRepetition(rows) {
  if (!Array.isArray(rows) || rows.length !== 2) return false;
  return rows.every(c => Object.hasOwn(approved,c.id) &&
    c.medicalStatus === 'VALIDATED' &&
    c.validation?.contentHash === approved[c.id]) &&
    new Set(rows.map(c=>c.id)).size === 2 &&
    new Set(rows.map(c=>c.url)).size === 2 &&
    rows[0].html !== rows[1].html;
}
module.exports = { approvedRepetition };
