'use strict';
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const src=JSON.parse(fs.readFileSync(path.join(root,'editorial/content.json'),'utf8'));
const report={total:src.contents.length,withImage:0,local:0,external:0,withoutImage:0,warnings:[],errors:[]};
const isWeb=v=>/^https:\/\//i.test(v);
for(const c of src.contents){
 if(!c.image){report.withoutImage++;continue;}
 report.withImage++;
 const strict=c.medicalStatus==='VALIDATED'&&['PUBLISHED','SCHEDULED'].includes(c.publicationStatus);
 const add=(message)=>{(strict?report.errors:report.warnings).push({id:c.id,message});};
 if(!c.imageAlt||!c.imageCredit||!c.imageSource||!c.imageLicense)add('Missing image alt, credit, source or license');
 if(isWeb(c.image)){report.external++;if(!/^https:\/\//.test(c.image))add('Insecure remote image');}
 else {
  report.local++;
  if(/^(\/|\.\.)/.test(c.image)||c.image.includes('..')||!fs.existsSync(path.join(root,c.image)))add('Missing or unsafe local image: '+c.image);
 }
 if(strict&&/<img\\b/i.test(c.html||'')&&!String(c.html).includes(c.image)){
  const item={id:c.id,message:'Article hero image differs from editorial image field'};
  (c.date<'2026-10-29'?report.warnings:report.errors).push(item);
 }
}
console.log('MAG IMAGE AUDIT '+JSON.stringify(report,null,2));
assert.equal(report.errors.length,0,'Validated Mag image failures: '+report.errors.length);
