'use strict';
// Narrow editorial exception: two independently medically validated editions
// reuse the same topic/title while retaining distinct text and permanent URLs.
// Every other duplicate title remains a blocking error. Content hashes are
// pinned: changes require fresh medical validation AND deliberate re-review.
const approved = Object.freeze({
  // Approved fiche rotation: same canonical palpitations fiche, distinct daily presentations.
  'daily-palpitations-rotation-20261102': '801bf1ae187f231de0776e5f708c0d4f05c7b669043ef855763e70d14c0a3565',
  'daily-palpitations-rotation-20261117': '6d45c5d583daac06b6effdb9ee7be2dbddf606c1df15eaa93a86674993b1e86b',
  'daily-entorse-20261011': '2717a00a8059c20d22ef9b5ad1220d7ffcbbaa2cf777f7fda909f21b3156f48d',
  'daily-entorse-cheville-rotation-20261104': '2169d09994d33fdea1dd830e021f6072d97b1a6ca881490a94144d07dde8ea2d'
});
function approvedRepetition(rows) {
  if (!Array.isArray(rows) || rows.length !== 2) return false;
  const pairs = [['daily-entorse-20261011','daily-entorse-cheville-rotation-20261104'], ['daily-palpitations-rotation-20261102','daily-palpitations-rotation-20261117']];
  if (!pairs.some(pair => rows.every(c => pair.includes(c.id)))) return false;
  return rows.every(c => Object.hasOwn(approved,c.id) &&
    c.medicalStatus === 'VALIDATED' &&
    c.validation?.contentHash === approved[c.id]) &&
    new Set(rows.map(c=>c.id)).size === 2 &&
    new Set(rows.map(c=>c.url)).size === 2 &&
    rows[0].html !== rows[1].html;
}
module.exports = { approvedRepetition };
