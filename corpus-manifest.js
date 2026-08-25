/* MACA corpus manifest — single source of truth for corpus script loading.
 * Migration branch only: fix/corpus-pipeline.
 * Adding a validated medical card should require adding its data file once here.
 * UI/search/category scripts are intentionally NOT part of this manifest.
 */
window.MACA_CORPUS_MANIFEST = Object.freeze([
  'qa-data.js',
  'qa-data-september-2026.js?v=20260822-1',
  'evidence-model.js',
  'audit-overrides.js',
  'backlog-audited.js',
  'backlog-audited-lot-d.js',
  'backlog-audited-lot-e.js',
  'backlog-audited-lot-f.js',
  'backlog-audited-alcohol.js',
  'backlog-audited-lot-g.js',
  'backlog-audited-lot-h.js',
  'backlog-audited-lot-i.js',
  'backlog-audited-lot-j.js',
  'backlog-audited-magnesium.js',
  'backlog-audited-fertility.js',
  'backlog-audited-perimenopause.js',
  'backlog-audited-travel-kit.js',
  'structured-backlog-compat.js',
  'maca-extra-five.js',
  'backlog-audited-lot-k.js',
  'backlog-audited-lot-l.js?v=20260822-1',
  'backlog-audited-aphtes.js?v=20260823-2',
  'backlog-audited-sang-selles-2026-08-23.js?v=20260823-1',
  'backlog-audited-pth-elevee-2026-08-23.js?v=20260823-1',
  'maca-daily-archive.js',
  'backlog-audited-ados-v1.js?v=20260823-2',
  'backlog-audited-sante-mentale-2026-08-23.js?v=20260824-1',
  'backlog-audited-cholesterol-2026-08-23.js?v=20260824-2',
  'backlog-audited-sante-quotidien-2026-08-23.js?v=20260823-1',
  'backlog-audited-heritage-2026-08-24.js?v=20260824-1',
  'backlog-audited-couchage-nourrisson-2026-08-24.js?v=20260824-1',
  'backlog-audited-cancer-alcool-2026-08-24.js?v=20260824-2',
  'backlog-audited-reseaux-sociaux-jeunes-2026-08-24.js?v=20260824-2',
  'backlog-audited-gluten-ble-diagnostic-2026-08-24.js?v=20260824-2'
]);
