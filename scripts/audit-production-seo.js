'use strict';
/**
 * MACASANTÉ — audit SEO de production en lecture seule.
 * Usage: node scripts/audit-production-seo.js [--limit 30] [--urls-file urls.txt]
 * Node 22+, aucune dépendance externe. Ne modifie aucune page publique.
 */
const fs = require('node:fs');
const { URL } = require('node:url');
const BASE = 'https://macasante.fr';
const args = process.argv.slice(2);
function option(name, fallback) {
  const i = args.indexOf(name);
  return i < 0 ? fallback : args[i + 1];
}
const limit = Number(option('--limit', '0'));
if (!Number.isSafeInteger(limit) || limit < 0) throw new Error('--limit doit être un entier positif ou zéro');
const file = option('--urls-file', '');
const sitemapUrl = BASE + '/sitemap.xml';
const errors = [];
const rows = [];
function decode(s) {
  return s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
}
function attribute(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = tag.match(new RegExp('(?:\\s|<)' + escaped + '\\s*=\\s*(?:"([^"]*)"|\x27([^\x27]*)\x27)', 'i'));
  return m ? decode(m[1] ?? m[2] ?? '') : '';
}
function canonical(html) {
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    if (attribute(m[0], 'rel').toLowerCase().split(/\s+/).includes('canonical')) return attribute(m[0], 'href');
  }
  return '';
}
function robots(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)]
    .filter(m => /^(?:robots|googlebot)$/i.test(attribute(m[0], 'name')))
    .map(m => attribute(m[0], 'content')).join(',').toLowerCase();
}
async function get(url) {
  const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'MACASANTE-SEO-Audit/1.0 (+https://macasante.fr/)' } });
  return { response, body: await response.text() };
}
function sameUrl(a, b) {
  try {
    const left = new URL(a, BASE), right = new URL(b, BASE);
    left.hash = ''; right.hash = '';
    return left.href === right.href;
  } catch { return false; }
}
async function main() {
  const sm = await get(sitemapUrl);
  if (!sm.response.ok) throw new Error('Sitemap HTTP ' + sm.response.status);
  const sitemap = [...sm.body.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m => decode(m[1].trim()));
  if (!sitemap.length) throw new Error('Sitemap vide ou illisible');
  const listed = new Set(sitemap);
  let targets = sitemap;
  if (file) {
    targets = fs.readFileSync(file, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith('#'));
  }
  targets = [...new Set(targets)];
  if (limit) targets = targets.slice(0, limit);
  for (let i = 0; i < targets.length; i++) {
    const url = targets[i];
    const result = { url, status: null, finalUrl: null, canonical: null, inSitemap: listed.has(url), robots: '', xRobots: '', issues: [] };
    rows.push(result);
    try {
      const parsed = new URL(url);
      if (parsed.origin !== BASE) { result.issues.push('external_origin'); continue; }
      const { response, body } = await get(url);
      result.status = response.status;
      result.finalUrl = response.url;
      result.xRobots = response.headers.get('x-robots-tag') || '';
      result.robots = robots(body);
      result.canonical = canonical(body) || null;
      if (!response.ok) result.issues.push('http_' + response.status);
      if (!sameUrl(response.url, url)) result.issues.push('redirect');
      if (/noindex/i.test(result.xRobots + ',' + result.robots)) result.issues.push('noindex');
      if (!result.canonical) result.issues.push('missing_canonical');
      else if (!sameUrl(result.canonical, response.url)) result.issues.push('canonical_other_url');
      if (!result.inSitemap) result.issues.push('not_in_sitemap');
      if (!/<title\b[^>]*>\s*[^<\s]/i.test(body)) result.issues.push('missing_title');
    } catch (err) {
      result.issues.push('request_error');
      result.error = String(err.message || err);
    }
    if (result.issues.length) errors.push(result);
    console.log((i + 1) + '/' + targets.length + ' ' + (result.status ?? 'ERR') + ' ' + url + ' ' + result.issues.join(','));
  }
  const report = { checkedAt: new Date().toISOString(), source: file ? file : sitemapUrl, sitemapUrls: sitemap.length, checked: rows.length, flagged: errors.length, note: 'Les canonical_other_url ne sont pas automatiquement des anomalies : examiner les doublons intentionnels.', rows };
  fs.mkdirSync('seo-reports', { recursive: true });
  fs.writeFileSync('seo-reports/production-latest.json', JSON.stringify(report, null, 2) + '\n');
  console.log('Rapport : seo-reports/production-latest.json — ' + rows.length + ' contrôlées, ' + errors.length + ' signalées');
  if (errors.some(r => r.issues.includes('request_error') || r.issues.some(x => x.startsWith('http_'))) || (args.includes('--check') && errors.length)) process.exitCode = 1;
}
main().catch(err => { console.error(err); process.exitCode = 1; });
