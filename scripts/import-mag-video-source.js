'use strict';
// Media packaging establishes publication approval, not a new medical validation.
const fs=require('fs'),path=require('path');const m=require('./mag-editorial');
const x=m.read();let changed=false;
for(const dir of fs.readdirSync(path.join(m.ROOT,'media-publishing'))){const p=path.join(m.ROOT,'media-publishing',dir,'manifest.json');if(!fs.existsSync(p))continue;const v=JSON.parse(fs.readFileSync(p,'utf8'));if(v.verify_only||v.validated!==true)continue;
 const url='video-'+v.id+'.html';if(!fs.existsSync(path.join(m.ROOT,url)))throw Error('Verified video page missing '+v.id);const html=fs.readFileSync(path.join(m.ROOT,url),'utf8').match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];if(!html)throw Error('Video main missing');
 const previous=x.contents.find(c=>c.id===v.id);const c={...previous,id:v.id,title:v.title,date:v.date,answer:v.excerpt,html,url,format:'video',category:v.category,theme:previous?.theme||v.category,keywords:v.keywords,sources:v.sources.map(s=>({label:s.title||s.label,url:s.url})),image:'assets/videos/'+v.id+'.jpg',imageAlt:v.title,imageCredit:v.imageCredit||previous?.imageCredit||'',imageSource:v.imageSource||previous?.imageSource||'',imageLicense:v.imageLicense||previous?.imageLicense||'',video:'assets/videos/'+v.id+'.mp4',transcript:v.transcript,ficheId:v.source,standalone:true,candidateFiche:previous?.candidateFiche||false,medicalStatus:previous?.medicalStatus||'LEGACY_REVIEW_REQUIRED',publicationStatus:'PUBLISHED',legacyEvidence:'Media manifest validated=true; source bytes verified. Record medical validator/date before IA indexing.'};
 if(previous?.medicalStatus==='VALIDATED'&&m.digest(c)!==m.digest(previous)){c.medicalStatus='DRAFT';c.publicationStatus='SCHEDULED';delete c.validation;}
 if(v.validatedAt&&v.validatedBy&&v.validationEvidence&&c.imageCredit&&c.imageSource&&c.imageLicense){c.medicalStatus='VALIDATED';c.validation={validator:v.validatedBy,validatedAt:v.validatedAt,evidence:v.validationEvidence,contentHash:m.digest(c)};}
 if(JSON.stringify(previous)!==JSON.stringify(c)){if(previous)x.contents[x.contents.indexOf(previous)]=c;else x.contents.push(c);changed=true;}
}
m.check(x);if(changed)fs.writeFileSync(path.join(m.ROOT,'editorial/content.json'),JSON.stringify(x,null,2)+'\n');console.log(JSON.stringify({sourceUpdated:changed}));
