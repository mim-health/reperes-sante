'use strict';
const mag = require('./mag-editorial');
const { normalize, repeated } = require('./audit-content-duplicates');
const { approvedRepetition } = require('./approved-title-recurrences');
// Report independent existing source gates together, before integration tests.
// This does not change approval records, source texts or publication eligibility.
function diagnose(source) {
  const errors = [], warnings = [];
  try { mag.check(source); } catch (error) { errors.push(error.message); }
  for (const [, rows] of repeated(source.contents, c => normalize(c.title))) {
    if (!approvedRepetition(rows)) errors.push('Duplicate normalized titles: ' + rows.map(c => c.id).join(', '));
  }
  for (const c of source.contents.filter(c => c.medicalStatus === 'VALIDATED' && c.date >= '2026-11-17')) {
    for (const s of c.sources || []) {
      try {
        const u = new URL(s.url);
        if (u.pathname === '/' || u.searchParams.has('term') || /^Source \d+$/.test(s.label || '')) warnings.push('Référence à préciser : ' + c.id + ' — ' + s.url);
      } catch { warnings.push('Référence illisible : ' + c.id); }
    }
  }
  return { errors: [...new Set(errors)], warnings: [...new Set(warnings)] };
}
module.exports = { diagnose };
if (require.main === module) {
  const report = diagnose(mag.read());
  console.log(JSON.stringify(report, null, 2));
  if (report.errors.length) process.exitCode = 1;
}
