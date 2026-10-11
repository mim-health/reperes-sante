#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST = path.join(ROOT, 'corpus-manifest.js');
const OUT_DIR = path.join(ROOT, '.maca-lab');
const OUT_FILE = path.join(OUT_DIR, 'corpus-production.js');
const META_FILE = path.join(OUT_DIR, 'corpus-production.meta.json');

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function readManifest() {
  const source = fs.readFileSync(MANIFEST, 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: 'corpus-manifest.js' });
  const manifest = sandbox.window.MACA_CORPUS_MANIFEST;
  if (!Array.isArray(manifest) || !manifest.length) {
    throw new Error('MACA_CORPUS_MANIFEST absent ou vide');
  }
  const seen = new Set();
  const entries = [];
  for (const src of manifest) {
    const clean = String(src).split('?')[0];
    if (seen.has(clean)) throw new Error(`Doublon manifest interdit dans le lab: ${clean}`);
    seen.add(clean);
    const absolute = path.join(ROOT, clean);
    if (!fs.existsSync(absolute)) throw new Error(`Fichier manifest introuvable: ${clean}`);
    entries.push({ src: String(src), clean, absolute });
  }
  return entries;
}

function build() {
  const entries = readManifest();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const parts = [];
  const files = [];
  for (const entry of entries) {
    const body = fs.readFileSync(entry.absolute, 'utf8');
    parts.push(`\n/* ===== MACA BUNDLE SOURCE: ${entry.clean} ===== */\n`);
    parts.push(body);
    parts.push('\n;\n');
    files.push({
      src: entry.src,
      path: entry.clean,
      bytes: Buffer.byteLength(body),
      sha256: sha256(body)
    });
  }
  const banner = `/* MACA CORPUS PRODUCTION — GENERATED FILE. DO NOT EDIT BY HAND.\n * Generated from corpus-manifest.js in exact manifest order.\n */\n`;
  const bundle = banner + parts.join('');
  fs.writeFileSync(OUT_FILE, bundle, 'utf8');
  const metadata = {
    generatedAt: new Date().toISOString(),
    manifestCount: entries.length,
    bundleBytes: Buffer.byteLength(bundle),
    bundleSha256: sha256(bundle),
    files
  };
  fs.writeFileSync(META_FILE, JSON.stringify(metadata, null, 2) + '\n', 'utf8');
  if(process.argv.includes('--publish')) {
    // One source revision for bundle, individual payloads and browser cache keys.
    const revision=metadata.bundleSha256.slice(0,16);
    fs.writeFileSync(path.join(ROOT,'corpus-production.js'),bundle);
    const loaderPath=path.join(ROOT,'corpus-loader.js');
    let loader=fs.readFileSync(loaderPath,'utf8');
    loader=loader.replace(/corpus-production\.js\?v=[^'"\s]+/g,'corpus-production.js?v='+revision);
    loader=loader.replace(/const FICHE_DATA_REVISION = '[^']*'/,"const FICHE_DATA_REVISION = '"+revision+"'");
    fs.writeFileSync(loaderPath,loader);
    const loaderRevision=sha256(loader).slice(0,16);
    for(const name of ['index.html','fiches.html','fiche.html']) {
      const file=path.join(ROOT,name);
      fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace(/corpus-loader\.js\?v=[^'"\s<>]+/g,'corpus-loader.js?v='+loaderRevision));
    }
  }
  console.log(JSON.stringify({
    ok: true,
    manifestCount: metadata.manifestCount,
    bundleBytes: metadata.bundleBytes,
    bundleSha256: metadata.bundleSha256,
    outFile: path.relative(ROOT, OUT_FILE),
    metaFile: path.relative(ROOT, META_FILE)
  }, null, 2));
}

build();
