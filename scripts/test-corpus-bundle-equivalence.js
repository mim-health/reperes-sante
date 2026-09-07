#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');
const LAB = path.join(ROOT, '.maca-lab');
const BUNDLE = path.join(LAB, 'corpus-production.js');

function loadManifestEntries() {
  const source = fs.readFileSync(path.join(ROOT, 'corpus-manifest.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: 'corpus-manifest.js' });
  return sandbox.window.MACA_CORPUS_MANIFEST.map(src => String(src).split('?')[0]);
}

function makeSandbox() {
  const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    CustomEvent: function CustomEvent(type, init){ this.type = type; this.detail = init && init.detail; }
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  return vm.createContext(sandbox);
}

function executeSequential(files) {
  const ctx = makeSandbox();
  for (const file of files) {
    const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
    vm.runInContext(source, ctx, { filename: file });
  }
  return ctx;
}

function executeBundle() {
  const ctx = makeSandbox();
  const source = fs.readFileSync(BUNDLE, 'utf8');
  vm.runInContext(source, ctx, { filename: '.maca-lab/corpus-production.js' });
  return ctx;
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      const v = value[key];
      if (typeof v !== 'function' && key !== '__proto__') out[key] = stable(v);
    }
    return out;
  }
  return value;
}

function canonicalSnapshot(ctx) {
  const arrays = {
    healthQuestions: Array.isArray(ctx.healthQuestions) ? ctx.healthQuestions : [],
    extraAuditedQuestions: Array.isArray(ctx.extraAuditedQuestions) ? ctx.extraAuditedQuestions : []
  };
  return stable(arrays);
}

function ids(snapshot) {
  const all = [...snapshot.healthQuestions, ...snapshot.extraAuditedQuestions];
  return all.map(x => String(x && x.id || '')).filter(Boolean);
}

function run() {
  if (!fs.existsSync(BUNDLE)) throw new Error('Bundle lab absent. Exécuter build-corpus-production.js avant ce test.');
  const files = loadManifestEntries();
  const seq = canonicalSnapshot(executeSequential(files));
  const bun = canonicalSnapshot(executeBundle());

  assert.deepStrictEqual(bun, seq, 'Le bundle ne produit pas exactement les mêmes globals corpus que le chargement séquentiel');

  const seqIds = ids(seq);
  const bunIds = ids(bun);
  assert.deepStrictEqual(bunIds, seqIds, 'Ordre ou liste des IDs différent');

  const duplicates = seqIds.filter((id, i) => seqIds.indexOf(id) !== i);
  console.log(JSON.stringify({
    ok: true,
    manifestCount: files.length,
    healthQuestions: seq.healthQuestions.length,
    extraAuditedQuestions: seq.extraAuditedQuestions.length,
    idCount: seqIds.length,
    duplicateIdCount: new Set(duplicates).size,
    identical: true
  }, null, 2));
}

run();
