'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..');
const dir=path.join(root,'editorial/scientific-quality');
const file=path.join(dir,'registry.json');
function date(v){const s=String(v||'');let m=s.match(/^(\d{4})-(\d{2})-(\d{2})(?:T|$)/);if(m)return m.slice(1).join('-');m=s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);return m?[m[3],m[2],m[1]].join('-'):null;}
function due(v){const d=new Date(v+'T00:00:00Z');if(!v||!Number.isFinite(+d))return null;const day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+3);d.setUTCDate(Math.min(day,new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate()));return d.toISOString().slice(0,10);}
function build(cards,previous={},today=new Date().toISOString().slice(0,10)){
 const ids=new Set();const entries=cards.map(c=>{
 if(!c.id||ids.has(c.id))throw Error('Missing or duplicate canonical ID '+c.id);ids.add(c.id);
 const revision=crypto.createHash('sha256').update(JSON.stringify([c.title,c.answer,c.detail,c.watch,c.sources])).digest('hex');
 const prior=previous[c.id];const historicalDate=date(c.verifiedAt);const reviewed=prior?.revision===revision?prior.review:null;
 // Historical metadata is a scheduling hint, not proof of completed scientific review.
 const closed=reviewed?.status==='REVALIDATED'&&reviewed.medicalApproval?.validator==='Dr Romain BEDDOK'&&reviewed.medicalApproval?.evidence&&reviewed.productionVerified===true&&reviewed.assistantVerified===true&&Array.from({length:12},(_,i)=>'A'+String(i+1).padStart(2,'0')).every(k=>reviewed.criteria?.[k]?.status==='PASS'&&reviewed.criteria[k].evidence);
 const verified=closed?date(reviewed.medicalApproval.date):null;
 const deadline=verified?due(verified):date(c.nextAuditAt)||due(historicalDate);
 const sources=(c.sources||[]).filter(s=>/^https?:\/\//.test(s.url||''));
 const sensitive=/enfant|nourrisson|grossesse|urgence|cancer|medicament|médicament|suicid|vaccin/i.test(c.title+' '+c.category);
 return {id:c.id,title:c.title,category:c.publicCategory||c.category,revision,historicalDate,deadline,sensitive,sourceCount:sources.length,flags:[...(!c.detail?['NO_DETAIL']:[]),...(sources.length<3?['REVIEW_SOURCE_DIVERSITY']:[]),...(sources.length&&sources.every(s=>/ameli\.fr/i.test(s.url))?['AMELI_ONLY']:[])],status:closed?'REVALIDATED':reviewed?.status==='PENDING_MEDICAL_APPROVAL'?'PENDING_MEDICAL_APPROVAL':'TO_REVIEW',review:reviewed||null};
 });
 const queue=entries.filter(e=>e.status!=='PENDING_MEDICAL_APPROVAL'&&(e.status!=='REVALIDATED'||!e.deadline||e.deadline<=today)).sort((a,b)=>Number(b.sensitive)-Number(a.sensitive)||(a.deadline||'0000').localeCompare(b.deadline||'0000')||a.id.localeCompare(b.id)).slice(0,10).map(e=>e.id);
 return {schemaVersion:1,asOf:today,criteriaVersion:'A01-A12-2026-11-25',count:entries.length,overdue:entries.filter(e=>!e.deadline||e.deadline<=today).length,scientificallyRevalidated:entries.filter(e=>e.status==='REVALIDATED').length,queue,entries};
}
if(require.main===module){fs.mkdirSync(dir,{recursive:true});const old=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)): {entries:[]};const cards=require('./audit-content-duplicates').load(root).canonical;const result=build(cards,Object.fromEntries(old.entries.map(e=>[e.id,e])));fs.writeFileSync(file,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({count:result.count,overdue:result.overdue,queue:result.queue,scientificallyRevalidated:result.scientificallyRevalidated}));}
module.exports={date,due,build};
