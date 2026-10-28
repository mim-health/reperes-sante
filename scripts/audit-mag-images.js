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
 const newArticle=c.date>='2026-10-29'&&c.format==='article'&&strict;
 if(newArticle){
   if(!c.image)report.errors.push({id:c.id,message:'New Mag article requires a rights-cleared photograph'});
   else if(/\.svg(?:[?#]|$)/i.test(c.image)||/generated|ai.generated|illustration originale/i.test((c.imageLicense||'')+' '+(c.imageCredit||'')))report.errors.push({id:c.id,message:'Illustration is not an approved photograph'});
   if(!c.imageSource||!c.imageLicense||!c.imageCredit)report.errors.push({id:c.id,message:'Photo provenance or licence missing'});
 }

 const add=(message)=>{(strict?report.errors:report.warnings).push({id:c.id,message});};
 if(!c.imageAlt||!c.imageCredit||!c.imageSource||!c.imageLicense)add('Missing image alt, credit, source or license');
 if(isWeb(c.image)){report.external++;if(!/^https:\/\//.test(c.image))add('Insecure remote image');}
 else {
  report.local++;
  if(/^(\/|\.\.)/.test(c.image)||c.image.includes('..')||!fs.existsSync(path.join(root,c.image)))add('Missing or unsafe local image: '+c.image);
 }
 if(strict&&/<img\\b/i.test(c.html||'')&&!String(c.html).replaceAll('&amp;','&').includes(c.image)){
  const item={id:c.id,message:'Article hero image differs from editorial image field'};
  (c.date<'2026-10-29'?report.warnings:report.errors).push(item);
 }
}

// Detect repeated generic photography across unrelated editorial topics.
// These are editorial review findings, not proof of invalid image rights.
const byImage=new Map();
for(const item of src.contents){
 if(!item.image)continue;
 const group=byImage.get(item.image)||[];
 group.push({id:item.id,title:item.title,theme:item.theme||''});
 byImage.set(item.image,group);
}
report.reusedVisuals=[...byImage.entries()].filter(([image,items])=>items.length>=2)
 .map(([image,items])=>({image,count:items.length,items}))
 .sort((a,b)=>b.count-a.count);
report.reuseWarnings=report.reusedVisuals.filter(x=>new Set(x.items.map(item=>item.theme)).size>1);
console.log('MAG VISUAL REUSE REVIEW '+JSON.stringify(report.reuseWarnings,null,2));

console.log('MAG IMAGE AUDIT '+JSON.stringify(report,null,2));
assert.equal(report.errors.length,0,'Validated Mag image failures: '+report.errors.length);
