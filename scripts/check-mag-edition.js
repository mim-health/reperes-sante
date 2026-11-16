#!/usr/bin/env node
'use strict';
// Editorial preflight: fail closed on missing approval, duplicate edition and missing article metadata.
// Run before promoting a prepared edition into editorial/content.json.
const fs=require('fs');
const path=require('path');
const file=path.join(__dirname,'..','editorial','content.json');
const data=JSON.parse(fs.readFileSync(file,'utf8'));
const date=process.argv[2];
if(!/^\d{4}-\d{2}-\d{2}$/.test(date||'')){console.error('Usage: node scripts/check-mag-edition.js YYYY-MM-DD');process.exit(2);}
const editions=data.editions.filter(e=>e.date===date);
const problems=[];
if(editions.length!==1) problems.push('Expected exactly one complete edition for '+date+'; found '+editions.length);
const e=editions[0];
if(e){
 if(e.complete!==true) problems.push('Edition incomplete');
 const slots=e.items||[];
 const count=slot=>slots.filter(x=>x.slot===slot).length;
 for(const [slot,n] of [['À LA UNE',1],['À LIRE EN 3 MIN',3],['FICHE DU JOUR',1],['VRAI OU FAUX',1],['LE CHIFFRE DU JOUR',1],['DONNÉES',3]]) if(count(slot)!==n) problems.push(slot+': expected '+n+', got '+count(slot));
 const ids=new Set();
 for(const item of slots){
  if(ids.has(item.contentId)) problems.push('Duplicate item '+item.contentId);
  ids.add(item.contentId);
  const c=data.contents.find(x=>x.id===item.contentId);
  if(!c){problems.push('Missing content '+item.contentId);continue;}
  if(c.medicalStatus!=='VALIDATED') problems.push('Not medically validated: '+c.id);
  if(!['PUBLISHED','SCHEDULED'].includes(c.publicationStatus)) problems.push('Not publishable: '+c.id);
  if(!c.validation?.validator||!c.validation?.validatedAt||!c.validation?.evidence||!c.validation?.contentHash) problems.push('Missing documented exact-version validation: '+c.id);
  if(!c.html||c.html.length<120) problems.push('Missing substantial HTML: '+c.id);
  if(!c.url) problems.push('Missing permanent URL: '+c.id);
  if(!Array.isArray(c.sources)||!c.sources.length) problems.push('Missing sources: '+c.id);
  if(c.format==='article' && c.date===date && (!c.image||!c.imageSource||!c.imageLicense||!c.imageCredit||!c.imageAlt)) problems.push('Missing image provenance/rights: '+c.id);
 }
}
if(problems.length){console.error('BLOCKED '+date+'\n'+problems.map(x=>' - '+x).join('\n'));process.exit(1);}
console.log('PASS: edition '+date+' meets structural preflight. Still run repository tests and live checks.');
