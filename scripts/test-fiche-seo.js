const fs=require('fs');
const s=fs.readFileSync('fiche-corpus-v2.js','utf8');
const required=[
  "MedicalWebPage",
  "MedicalEntity",
  "link[rel=\"canonical\"]",
  "meta[name=\"description\"]",
  "og:title",
  "og:description",
  "og:url",
  "twitter:card",
  "dateModified",
  "isPartOf",
  "index,follow",
  "noindex,follow"
];
for(const token of required){if(!s.includes(token))throw new Error('SEO fiche missing '+token);}
if(s.includes("'@type':'FAQPage'")||s.includes('"@type":"FAQPage"'))throw new Error('FAQPage must not be used for MACA fiches');
console.log('Fiche SEO regression gate PASS');
