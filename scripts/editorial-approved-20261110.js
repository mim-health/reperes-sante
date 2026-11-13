#!/usr/bin/env node
'use strict';
// One-time intake of the four complete articles explicitly approved by Dr Romain Beddok
// in the 10 November 2026 conversation. This never approves the other six rubrics.
const fs=require('fs');
const p=require('./editorial-publish');
const root=require('path').resolve(__dirname,'..');
const specs=[
 ['reveils-3-4-heures','reveils-3-4-heures'],
 ['fatigue-malgre-huit-heures','fatigue-malgre-huit-heures'],
 ['tete-tourne-au-lever','tete-tourne-au-lever'],
 ['ventre-gonfle-apres-repas','ventre-gonfle-apres-repas']
];
const sources={
 'reveils-3-4-heures':[['NHS — Insomnia','https://www.nhs.uk/conditions/insomnia/'],['NHLBI — Insomnia','https://www.nhlbi.nih.gov/health/insomnia']],
 'fatigue-malgre-huit-heures':[['CDC — About Sleep','https://www.cdc.gov/sleep/about/index.html'],['NHS — Tiredness and fatigue','https://www.nhs.uk/symptoms/tiredness-and-fatigue/']],
 'tete-tourne-au-lever':[['NHS — Low blood pressure','https://www.nhs.uk/conditions/low-blood-pressure-hypotension/'],['Merck Manual — Orthostatic Hypotension','https://www.merckmanuals.com/professional/cardiovascular-disorders/symptoms-of-cardiovascular-disorders/orthostatic-hypotension']],
 'ventre-gonfle-apres-repas':[['NHS — Bloating','https://www.nhs.uk/symptoms/bloating/'],['NIDDK — Gas in the Digestive Tract','https://www.niddk.nih.gov/health-information/digestive-diseases/gas-digestive-tract']]
};
if(fs.existsSync(root+'/editorial/publication-requests/medical-approval-20261110-four-complete-articles.json')){console.log('Previously approved request already registered');process.exit(0);}
const items=specs.map(([key])=>{
 const html=fs.readFileSync(root+'/editorial/drafts/2026-11-10-'+key+'.html','utf8');
 const title=html.match(/<h1>([^<]+)<\/h1>/)?.[1];
 const answer=html.match(/<p>([^<]+)<\/p>/)?.[1];
 if(!title||!answer||!html.includes('<h2>Sources</h2>'))throw Error('Draft mismatch '+key);
 return {kind:'magazine',body:{id:'daily-'+key+'-20261110',date:'2026-11-10',title,answer,html,
 url:'article-daily-'+key+'-20261110.html',format:'article',category:'Décryptage',theme:'Santé',
 keywords:key.split('-'),sources:sources[key].map(([label,url])=>({label,url})),image:'',imageLicense:'',
 ficheId:'',standalone:true}};
});
const bundle={requestId:'medical-approval-20261110-four-complete-articles',items,editions:[]};
const record=p.prepare(bundle,{root});
const approval={action:'Je valide et publie',fullText:true,snapshotHash:record.snapshotHash,
 validator:'Dr Romain Beddok',validatedAt:'2026-11-10T16:30:42Z',
 evidence:"Je valide médicalement les versions intégrales des quatre articles du 10 novembre présentées ci-dessus et j'autorise leur publication sur MACASANTÉ. Lance la mise en ligne et vérifie les URL publiques et la synchronisation IA. — Dr Romain BEDDOK, conversation éditoriale du 10 novembre 2026."};
const result=p.publish(bundle,approval,{root});
console.log('Four medically approved articles registered:',result.targets.map(x=>x.url));
