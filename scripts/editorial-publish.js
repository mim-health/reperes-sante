#!/usr/bin/env node
'use strict';
// Trusted editorial intake. A hash identifies approval; it never creates medical authorization.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),cp=require('child_process');
const mag=require('./mag-editorial');
const ROOT=path.resolve(__dirname,'..');
const STATES=['DRAFT','READY_FOR_VALIDATION','VALIDATED_PENDING_PUBLICATION','PUBLISHING','PUBLISHED','PUBLICATION_FAILED','ASSISTANT_SYNC_PENDING'];
const stable=x=>JSON.stringify(x,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
const hash=x=>crypto.createHash('sha256').update(stable(x)).digest('hex');
const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
class PublicationError extends Error{constructor(code,stage,message,fix){super(message);Object.assign(this,{code,stage,fix});}}
const fail=(code,stage,message,fix)=>{throw new PublicationError(code,stage,message,fix);};
function read(root,p,fallback){const f=path.join(root,p);return fs.existsSync(f)?JSON.parse(fs.readFileSync(f,'utf8')):fallback;}
function write(root,p,x){const f=path.join(root,p);fs.mkdirSync(path.dirname(f),{recursive:true});const tmp=f+'.tmp-'+process.pid;fs.writeFileSync(tmp,JSON.stringify(x,null,2)+'\n');fs.renameSync(tmp,f);}
function id(x){if(!/^[a-z0-9][a-z0-9-]{0,100}$/.test(x||''))fail('INVALID_ID','prepare','Invalid request/content ID','Use a stable alphanumeric slug.');return x;}
function references(body){if(!Array.isArray(body.sources)||!body.sources.length||body.sources.some(s=>!s.label||!/^https:\/\/[^\s]+$/.test(s.url||'')))fail('MISSING_SOURCES','prepare','Missing precise scientific reference','Restore the approved references with labels and HTTPS URLs.');}
const adapters={
 magazine:{check(b){if(!b.title||!b.answer||!b.html||mag.plain(b.html).length<100||!b.url||!b.date)fail('MISSING_FULL_TEXT','prepare','Full Magazine text is missing','Retrieve the integral approved text; titles do not authorize reconstruction.');references(b);},version:mag.digest,url:b=>b.url},
 fiche:{check(b){if(!b.title||!b.category||!b.answer||!b.detail||b.detail.length<100)fail('MISSING_FULL_TEXT','prepare','Full fiche is missing','Retrieve the approved answer, detail and category.');references(b);},version:hash,url:b=>'fiches-seo/'+b.id+'.html'}
};
function prepare(bundle,{root=ROOT}={}){
 id(bundle.requestId);if(!Array.isArray(bundle.items)||!bundle.items.length)fail('EMPTY_BATCH','prepare','No integral contents supplied','Attach the exact full-content bundle.');
 const keys=new Set();for(const i of bundle.items){if(!adapters[i.kind]||!i.body)fail('INVALID_ADAPTER','prepare','Unsupported content format','Use magazine or fiche.');id(i.body.id);if(['medicalStatus','publicationStatus','validation'].some(k=>Object.hasOwn(i.body,k)))fail('RESERVED_FIELD','prepare','Validation fields belong to the engine','Remove delivery/approval fields from the presented medical body.');const key=i.kind+':'+i.body.id;if(keys.has(key))fail('DUPLICATE_BATCH','prepare',key,'Keep one approved version per ID.');keys.add(key);adapters[i.kind].check(i.body);}
 const snapshot={schemaVersion:1,requestId:bundle.requestId,items:bundle.items,editions:bundle.editions||[]};
 const snapshotHash=hash(snapshot),file='editorial/publication-requests/'+bundle.requestId+'.json';
 const draftFile='editorial/drafts/requests/'+bundle.requestId+'.json';const previous=read(root,file,null)||read(root,draftFile,null);if(previous&&previous.snapshotHash!==snapshotHash)fail('REQUEST_CONFLICT','prepare','Request ID already binds another version','Use a new request ID for a revised medical version.');
 const record=previous||{snapshot,snapshotHash,state:'READY_FOR_VALIDATION',history:[{state:'READY_FOR_VALIDATION',at:new Date().toISOString()}]};write(root,draftFile,record);return record;
}
function validate(record,approval){
 if(!approval||norm(approval.action)!=='je valide et publie'||approval.fullText!==true||approval.snapshotHash!==record.snapshotHash||norm(approval.validator)!=='dr romain beddok'||(typeof approval.evidence!=='string'||!approval.evidence.trim())||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(approval.validatedAt||'')||!Number.isFinite(Date.parse(approval.validatedAt)))fail('FULL_APPROVAL_REQUIRED','validate','Approval does not bind the integral snapshot','Record the doctor, timestamp, explicit instruction, evidence and hash of the full presented version.');
 if(hash(record.snapshot)!==record.snapshotHash)fail('APPROVED_VERSION_CHANGED','validate','Approved content has changed','Present the new complete version for medical approval.');
 return {...approval};
}
function transition(record,state,extra={}){if(!STATES.includes(state))throw Error('Unknown state');return {...record,...extra,state,history:[...(record.history||[]),{state,at:new Date().toISOString(),...extra}]};}
function publish(bundle,approval,{root=ROOT}={}){
 const lock=path.join(root,'editorial/.publication-lock');fs.mkdirSync(path.dirname(lock),{recursive:true});try{fs.mkdirSync(lock);}catch{fail('PUBLICATION_BUSY','publish','Another intake owns the lock','Retry after the in-flight intake finishes; never force overwrite.');}
 try{
  let record=prepare(bundle,{root});validate(record,approval);
  if(record.approval&&hash(record.approval)!==hash(approval))fail('APPROVAL_CONFLICT','validate','Saved approval cannot be replaced','Use a new request for a new approval.');
  const source=read(root,'editorial/content.json',null),fiches=read(root,'editorial/fiches.json',{schemaVersion:1,contents:[]});if(!source)throw Error('Missing Magazine source');
  const next=structuredClone(source),nextFiches=structuredClone(fiches);
  for(const item of record.snapshot.items){const body=structuredClone(item.body),adapter=adapters[item.kind];adapter.check(body);const list=item.kind==='magazine'?next.contents:nextFiches.contents;
   const existing=list.find(c=>c.id===body.id),version=adapter.version(body);
   if(existing){if(existing.medicalStatus!=='VALIDATED'||existing.publicationStatus!=='PUBLISHED')fail('CONTENT_WITHDRAWN','publish','Existing content is not active: '+body.id,'Review withdrawal before creating a new approved request.');const previousVersion=item.kind==='magazine'?mag.digest(existing):existing.validation?.contentHash;
    if(previousVersion!==version&&item.baseVersion!==previousVersion)fail('CONCURRENT_SOURCE_CHANGE','publish','Existing content differs: '+body.id,'Provide its previous approved baseVersion; never overwrite unseen changes.');
    if(previousVersion===version)continue;
   }
   const validation={validator:approval.validator,validatedAt:approval.validatedAt,evidence:approval.evidence,contentHash:version,snapshotHash:record.snapshotHash};
   const value={...body,medicalStatus:'VALIDATED',publicationStatus:'PUBLISHED',validation};
   if(existing)list[list.indexOf(existing)]=value;else list.push(value);
  }
  for(const edition of record.snapshot.editions){const prior=next.editions.find(e=>e.id===edition.id);if(prior&&hash(prior)!==hash(edition))fail('EDITION_CONFLICT','publish','Edition already exists with different slots','Use an explicit reviewed correction rather than replacing the historical edition.');if(!prior)next.editions.push(edition);}
  for(const item of record.snapshot.items.filter(i=>i.kind==='magazine'))if(!item.body.standalone&&!next.editions.some(e=>e.complete&&e.items.some(i=>i.contentId===item.body.id)))fail('MISSING_EDITION','publish',item.body.id,'Attach the complete approved edition or explicitly approve standalone publication.');
  for(const e of record.snapshot.editions){const slots=new Set(e.items.map(i=>i.slot));if(!e.complete||['À LA UNE','À LIRE EN 3 MIN','FICHE DU JOUR','VRAI OU FAUX','LE CHIFFRE DU JOUR','DONNÉES'].some(s=>!slots.has(s)))fail('INCOMPLETE_EDITION','publish',e.id,'Restore all six approved rubrics; do not fill missing texts automatically.');}
  mag.check(next);
  for(const c of next.contents.filter(c=>c.date>='2026-10-29'&&c.medicalStatus==='VALIDATED'&&c.image))if(next.contents.some(o=>o.id!==c.id&&o.image===c.image))fail('DUPLICATE_IMAGE','validate',c.id,'Supply a distinct licensed photograph or omit optional imagery.');
  const canonical=fs.existsSync(path.join(root,'corpus-manifest.js'))?require('./audit-content-duplicates').load(root).canonical:[];
  const names=new Map(canonical.filter(c=>!nextFiches.contents.some(n=>n.id===c.id)).map(c=>[norm(c.title),c.id]));for(const c of nextFiches.contents){const n=norm(c.title);if(names.has(n))fail('DUPLICATE_FICHE','validate',c.title,'Enrich the existing fiche using its stable ID.');names.set(n,c.id);}
  if(record.approval&&hash(source)===hash(next)&&hash(fiches)===hash(nextFiches))return record;
  // All schema, approval and conflict checks finish before either canonical source is changed.
  const files={'editorial/content.json':next,'editorial/fiches.json':nextFiches};const old=new Map(Object.keys(files).map(p=>[p,fs.existsSync(path.join(root,p))?fs.readFileSync(path.join(root,p)):null]));
  try{for(const [p,x]of Object.entries(files))write(root,p,x);
   record=transition(record,'VALIDATED_PENDING_PUBLICATION',{approval,targets:record.snapshot.items.map(i=>({kind:i.kind,id:i.body.id,assistantPolicy:i.body.assistantPolicy||null,ficheId:i.body.ficheId||null,textHash:i.kind==='fiche'?hash(['title','answer','detail','usefulInfo','watch'].map(k=>String(i.body[k]||'').trim().replace(/\r\n/g,'\n'))):null,url:adapters[i.kind].url(i.body),version:adapters[i.kind].version(i.body)}))});
   write(root,'editorial/publication-requests/'+bundle.requestId+'.json',record);
  }catch(e){for(const [p,data]of old)if(data)fs.writeFileSync(path.join(root,p),data);else fs.rmSync(path.join(root,p),{force:true});throw e;}
  return record;
 }finally{fs.rmdirSync(lock);}
}
function validateCanonicalFiches(cards,root=ROOT){for(const approved of read(root,'editorial/fiches.json',{contents:[]}).contents){const c=cards.find(c=>c.id===approved.id);if(!c)throw Error('Missing approved fiche '+approved.id);for(const key of ['title','answer','detail','usefulInfo','watch','sources'])if(hash(c[key]||'')!==hash(approved[key]||''))throw Error('Canonical transformation changed approved '+key+': '+approved.id);}return true;}
function buildFiches(root=ROOT){
 const x=read(root,'editorial/fiches.json',{contents:[]});for(const c of x.contents){adapters.fiche.check(c);const {validation,medicalStatus,publicationStatus,...body}=c;if(medicalStatus!=='VALIDATED'||publicationStatus!=='PUBLISHED'||validation?.contentHash!==hash(body))fail('FICHE_APPROVAL_CHANGED','prepare',c.id,'Restore the approved fiche or obtain new medical validation.');}
 const code='/* Generated from exact medically approved fiche snapshots. */\n(function(){const cards='+JSON.stringify(x.contents.map(c=>({...c,validationStatus:'VALIDATED',verifiedAt:c.validation.validatedAt})))+';for(const c of cards){for(const key of ["healthQuestions","extraAuditedQuestions"])if(Array.isArray(window[key]))window[key]=window[key].filter(old=>old.id!==c.id);window.extraAuditedQuestions=(window.extraAuditedQuestions||[]).concat(c);}})();\n';
 const file=path.join(root,'editorial-fiches-validated.js');if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==code)fs.writeFileSync(file,code);
}
async function verify(targets,{origin='https://macasante.fr',fetcher=fetch}={}){
 const archive=await fetcher(origin+'/magazine.html'),sitemap=await fetcher(origin+'/sitemap.xml');if(!archive.ok||!sitemap.ok)throw Error('Archive/sitemap unavailable');const a=await archive.text(),s=await sitemap.text();
 for(const t of targets){const url=origin+'/'+t.url,r=await fetcher(url,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('Public URL HTTP '+r.status+': '+url);const html=await r.text();if(!html.includes(t.version))throw Error('Public page is stale: '+url);if(!s.includes('<loc>'+url+'</loc>'))throw Error('Missing sitemap URL '+url);if(t.kind==='magazine'&&!a.includes('href="'+t.url+'"'))throw Error('Missing archive link '+url);}
 return {verified:true,urls:targets.map(t=>origin+'/'+t.url)};
}
function syncAssistant(targets,corpus){for(const t of targets){if(t.assistantPolicy){if(t.assistantPolicy==='REFERENCE_FICHE_ONLY'&&!corpus.cards.some(c=>c.id===t.ficheId))throw Error('Missing referenced fiche '+t.ficheId);continue;}const id=t.kind==='magazine'?'mag-'+t.id:t.id,c=corpus.cards.find(c=>c.id===id);if(!c)throw Error('Assistant missing '+id);if((t.kind==='magazine'?c.metadata?.version:c.metadata?.publicationVersion)!==t.version)throw Error('Assistant stale '+id);if(t.kind==='fiche'&&t.textHash&&hash([c.title,...['answer','detail','usefulInfo','watch'].map(k=>c.content[k]||'')].map(s=>String(s).trim().replace(/\r\n/g,'\n')))!==t.textHash)throw Error('Assistant text differs from approved fiche '+id);}return {synced:true};}
function exec(cmd,args=[]){cp.execFileSync(cmd,args,{cwd:ROOT,stdio:'inherit'});}
function commitAndPush(record,push){
 const branch=cp.execFileSync('git',['branch','--show-current'],{cwd:ROOT,encoding:'utf8'}).trim();if(branch!=='feat/v0-magazine')fail('WRONG_PUBLICATION_BRANCH','commit',branch,'Publication source must be committed on feat/v0-magazine; test fixtures stay isolated.');
 try{cp.execFileSync('git',['diff','--cached','--quiet'],{cwd:ROOT});}catch{fail('UNRELATED_STAGED_FILES','commit','Index contains unrelated changes','Keep this publication commit restricted to its three canonical source paths.');}
 cp.execFileSync('git',['add','--','editorial/content.json','editorial/fiches.json','editorial/publication-requests/'+record.snapshot.requestId+'.json'],{cwd:ROOT});
 let changed=false;try{cp.execFileSync('git',['diff','--cached','--quiet'],{cwd:ROOT});}catch{changed=true;}
 if(changed)cp.execFileSync('git',['commit','-m','editorial: publish approved snapshot '+record.snapshot.requestId],{cwd:ROOT,stdio:'inherit'});
 if(push)cp.execFileSync('git',['push','origin','HEAD:refs/heads/feat/v0-magazine'],{cwd:ROOT,stdio:'inherit'});
}
module.exports={prepare,validate,publish,verify,syncAssistant,hash,stable,adapters,transition,buildFiches,validateCanonicalFiches,PublicationError};
if(require.main===module){(async()=>{const [action,file,approvalFile]=process.argv.slice(2);
 if(action==='prepare')console.log(JSON.stringify(prepare(JSON.parse(fs.readFileSync(file))),null,2));
 else if(action==='publish'){const record=publish(JSON.parse(fs.readFileSync(file)),JSON.parse(fs.readFileSync(approvalFile)));if(process.argv.includes('--commit')||process.argv.includes('--push'))commitAndPush(record,process.argv.includes('--push'));console.log(JSON.stringify(record,null,2));}
 else if(action==='fiches')buildFiches();
 else if(action==='verify'){const requests=fs.readdirSync(path.join(ROOT,'editorial/publication-requests')).filter(f=>f.endsWith('.json')).map(f=>read(ROOT,'editorial/publication-requests/'+f,null));console.log(JSON.stringify(await verify(requests.flatMap(r=>r.targets||[])),null,2));}
 else throw Error('Use prepare BUNDLE | publish BUNDLE APPROVAL | fiches | verify');
 })().catch(e=>{console.error(JSON.stringify({code:e.code||'PUBLICATION_FAILED',stage:e.stage||'execution',cause:e.message,fix:e.fix||'Inspect the failed stage and retry the same approved request.'}));process.exitCode=1;});}
