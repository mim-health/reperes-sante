#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path'),cp=require('child_process'),p=require('./editorial-publish'),mag=require('./mag-editorial');
const ROOT=path.resolve(__dirname,'..');
function run(cmd,args=[]){try{cp.execFileSync(cmd,args,{cwd:ROOT,stdio:'inherit'});}catch(e){e.stage=args[0]||cmd;throw e;}}
const node=f=>run(process.execPath,[f]);
function sourceVersion(ref){const load=f=>JSON.parse(ref?cp.execFileSync('git',['show',ref+':'+f],{encoding:'utf8'}):fs.readFileSync(f,'utf8'));return p.hash({mag:load('editorial/content.json'),fiches:load('editorial/fiches.json')});}
function requests(){return fs.existsSync('editorial/publication-requests')?fs.readdirSync('editorial/publication-requests').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync('editorial/publication-requests/'+f))):[];}
function targets(){const magSource=mag.read(),fiches=JSON.parse(fs.readFileSync('editorial/fiches.json'));const selected=new Map();for(const r of requests())for(const t of r.targets||[]){const c=(t.kind==='magazine'?magSource.contents:fiches.contents).find(c=>c.id===t.id);if(c&&c.medicalStatus==='VALIDATED'&&c.publicationStatus==='PUBLISHED'&&(t.kind==='magazine'?mag.digest(c):c.validation.contentHash)===t.version)selected.set(t.kind+':'+t.id,t);}return [...selected.values()];}
function state(stage,error){const report={schemaVersion:1,sourceFingerprint:sourceVersion(),sourceCommit:process.env.GITHUB_SHA||null,runUrl:process.env.GITHUB_RUN_ID?'https://github.com/'+process.env.GITHUB_REPOSITORY+'/actions/runs/'+process.env.GITHUB_RUN_ID:null,stage,siteStatus:['ASSISTANT_SYNC_PENDING','PUBLISHED'].includes(stage)?'PUBLISHED':stage,assistantStatus:stage==='PUBLISHED'?'SYNCED':'PENDING',at:new Date().toISOString(),requests:requests().map(r=>({requestId:r.snapshot.requestId,snapshotHash:r.snapshotHash,state:stage,targets:r.targets||[]})),...(error?{error:{stage:error.stage||process.env.PUBLICATION_STEP||stage,cause:error.message,fix:'Correct the reported stage and rerun the same approved request; do not revalidate an unchanged text.'}}:{})};fs.writeFileSync('publication-report.json',JSON.stringify(report,null,2)+'\n');return report;}
function plan(){
 let files=[];try{const base=process.env.PUBLICATION_BASE_SHA;if(base&&/^[a-f0-9]{40}$/.test(base)&&!/^0+$/.test(base))files=cp.execFileSync('git',['diff','--name-only',base,'HEAD'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);}catch{}
 const reuse=files.length>0&&files.every(f=>/^editorial\/(content\.json|catchup\.json|publication-requests\/[^/]+\.json)$/.test(f))&&['corpus-production.js','annuaire-fiches.html','editorial/manifest.json'].every(f=>fs.existsSync(f));
 return {mode:reuse?'MAGAZINE_INCREMENTAL':'FULL_SAFE_FALLBACK',changedInputs:files};
}
async function main(){const action=process.argv[2];
 if(action==='prepare'){
  const decision=plan();fs.writeFileSync('publication-plan.json',JSON.stringify(decision,null,2)+'\n');state('PUBLISHING');
  p.buildFiches();node('scripts/test-editorial-publish.js');node('scripts/test-content-duplicates.js');node('scripts/audit-content-duplicates.js');node('scripts/mag-editorial.js');node('scripts/test-mag-editorial.js');node('scripts/audit-mag-images.js');
  if(decision.mode!=='MAGAZINE_INCREMENTAL')for(const f of ['scripts/test-site-shell.js','scripts/test-home-assistant.js','scripts/test-assistant-pilot.js','scripts/test-corpus-pipeline.js','scripts/test-corpus-functional.js','scripts/test-ui-adapter.js','scripts/test-browser-entry.js'])node(f);
  if(decision.mode!=='MAGAZINE_INCREMENTAL'){run(process.execPath,['scripts/build-corpus-production.js','--publish']);node('scripts/test-corpus-bundle-equivalence.js');node('scripts/build-static-seo-fiches.js');node('scripts/test-fiche-fast-load.js');}
  for(const f of ['scripts/build-theme-hubs.js','scripts/build-sitemap-from-corpus.js','scripts/test-theme-hubs.js','scripts/test-home-magazine.js','scripts/test-magazine-videos.js'])node(f);
  run(process.execPath,['scripts/verify-publication.js','--site-only']);
 }else if(action==='verify'){
  node('scripts/verify-mag-public.js');run(process.execPath,['scripts/verify-publication.js','--public','--site-only']);
  const active=targets();if(active.length)await p.verify(active);state('ASSISTANT_SYNC_PENDING');
 }else if(action==='assistant'){
  for(const f of ['scripts/build-assistant-v2-corpus.js','scripts/test-assistant-v2-canonical.js','scripts/test-ipp-retrieval.js','scripts/test-assistant-v2-grounding.js','scripts/test-assistant-v2-patient-language.js'])node(f);
  const active=targets();p.syncAssistant(active,JSON.parse(fs.readFileSync('assistant-v2/corpus.json','utf8')));
  const latest=JSON.parse(fs.readFileSync('assistant-v2/latest.json'));const previous='assistant-v2/public-artifacts/'+latest.version+'/embeddings.index.json';if(fs.existsSync(previous))fs.copyFileSync(previous,'assistant-v2/embeddings.index.json');
  node('scripts/build-assistant-v2-embeddings.js');run('bash',['scripts/publish-assistant-v2.sh']);run(process.execPath,['scripts/verify-mag-public.js','--assistant']);run(process.execPath,['scripts/verify-publication.js','--assistant-index']);state('PUBLISHED');
 }else if(action==='report')state(process.argv[3],process.env.ERROR_CAUSE?new Error(process.env.ERROR_CAUSE):undefined);else throw Error('prepare | verify | assistant | report STATE');
}
module.exports={plan,sourceVersion};
if(require.main===module)main().catch(e=>{state(process.argv[2]==='assistant'?'ASSISTANT_SYNC_PENDING':'PUBLICATION_FAILED',e);console.error(e.message);process.exitCode=1;});
