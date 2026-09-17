#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const apiPath = path.join(root, 'api', 'assistant-v2-pilot.js');
const pagePath = path.join(root, 'assistant-v2', 'pilot-5b.html');
const api = fs.readFileSync(apiPath, 'utf8');
const page = fs.readFileSync(pagePath, 'utf8');

const checks = [
  ['clé OpenAI côté serveur', api.includes('process.env.OPENAI_API_KEY')],
  ['code pilote côté serveur', api.includes('process.env.PILOT_ACCESS_CODE')],
  ['aucune clé OpenAI dans la page', !page.includes('OPENAI_API_KEY') && !page.includes('sk-')],
  ['appel API même origine', page.includes("fetch('/api/assistant-v2-pilot'" )],
  ['noindex pilote', page.includes('noindex,nofollow,noarchive')],
  ['question limitée', api.includes('MAX_QUESTION_CHARS = 600')],
  ['contrat V2 validé', api.includes('contract.validate')],
  ['grounding avant affichage', api.includes('groundingCheck') && api.includes("grounding: 'rejected'")],
  ['pas de question brute dans log succès', !/console\.log\([^\n]*question/i.test(api)],
  ['information données identifiantes', page.includes('ne saisissez pas de nom')]
];

let ok = true;
for (const [label, passed] of checks) {
  console.log(`${passed ? '✓' : '✗'} ${label}`);
  if (!passed) ok = false;
}
if (!ok) process.exit(1);
console.log(`Pilote 5B : ${checks.length}/${checks.length} garde-fous statiques validés.`);
