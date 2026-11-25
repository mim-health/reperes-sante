'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..');
const dir=path.join(root,'editorial/scientific-quality');
const file=path.join(dir,'registry.json');
function date(v){const s=String(v||'');let m=s.match(/^(\d{4})-(\d{2})-(\d{2})(?:T|$)/);if(m)return m.slice(1).join('-');m=s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);return m?[m[3],m[2],m[1]].join('-'):null;}
function due(v){const d=new Date(v+'T00:00:00Z');if(!v||!Number.isFinite(+d))return null;const day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+3);d.setUTCDate(Math.min(day,new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate()));return d.toISOString().slice(0,10);}

const criteria=Array.from({length:12},(_,i)=>'A'+String(i+1).padStart(2,'0'));
const safetyKeys=['redFlags','urgentOrientation','contraindications','vulnerableGroups','treatmentBoundaries','diagnosticUncertainty'];
const levels=['GUIDELINE','SYSTEMATIC_REVIEW','RANDOMIZED_TRIAL','OBSERVATIONAL','EXPERT_CONSENSUS','PATIENT_INFORMATION','OTHER'];
const nonempty=v=>typeof v==='string'&&v.trim().length>0;
const evidence=v=>nonempty(v)&&! /^(ok|pass|ras|n\/a|todo)$/i.test(v.trim());
const https=v=>typeof v==='string'&&/^https:\/\/[^/\s]+/i.test(v);
const dated=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(v)&&Number.isFinite(Date.parse(v));
function auditErrors(r,revision){
 const errors=[];const require=(ok,label)=>{if(!ok)errors.push(label);};
 if(!r)return ['MISSING_REVIEW'];
 require(r.schemaVersion===2&&r.revision===revision,'VERSION_MISMATCH');
 const a=r.primaryAudit,b=r.counterReview;
 require(nonempty(a?.reviewer)&&dated(a?.at)&&evidence(a?.summary),'PRIMARY_AUDIT');
 require(nonempty(b?.reviewer)&&dated(b?.at)&&b?.reviewer!==a?.reviewer&&b?.runId!==a?.runId&&nonempty(a?.runId)&&nonempty(b?.runId)&&Date.parse(b?.at)>=Date.parse(a?.at)&&evidence(b?.summary)&&b?.decision==='PASS','COUNTER_REVIEW');
 require(Array.isArray(b?.findings)&&b.findings.every(f=>evidence(f?.issue)&&evidence(f?.resolution)&&f?.status==='RESOLVED'),'UNRESOLVED_FINDINGS');
 const sources=Array.isArray(r.sources)?r.sources:[],ids=new Set(sources.map(s=>s.id));
 require(sources.length>0&&ids.size===sources.length&&sources.every(s=>nonempty(s.id)&&nonempty(s.title)&&https(s.url)&&levels.includes(s.level)&&dated(s.checkedAt)&&s.access==='VERIFIED'&&evidence(s.relevance)),'SOURCE_EVIDENCE');
 require(evidence(r.sourceSelectionRationale),'SOURCE_SELECTION');
 require(Array.isArray(r.claims)&&r.claims.length>0&&r.claims.every(c=>evidence(c.text)&&evidence(c.location)&&Array.isArray(c.sourceIds)&&c.sourceIds.length>0&&c.sourceIds.every(id=>ids.has(id))&&c.verdict==='SUPPORTED'&&evidence(c.evidence)&&evidence(c.limitations)),'CLAIM_TRACEABILITY');
 require(r.claimCoverage?.complete===true&&evidence(r.claimCoverage?.method),'CLAIM_COVERAGE');
 require(safetyKeys.every(k=>['PASS','NOT_APPLICABLE'].includes(r.safety?.[k]?.status)&&evidence(r.safety[k].evidence)),'SAFETY_GRID');
 require(criteria.slice(0,9).every(k=>['PASS','NOT_APPLICABLE'].includes(r.criteria?.[k]?.status)&&evidence(r.criteria[k].evidence)),'SCIENTIFIC_CRITERIA');
 return errors;
}
function closureErrors(r,revision){
 const errors=auditErrors(r,revision);if(!r)return errors;
 const m=r.medicalApproval,p=r.production,a=r.assistant;
 if(!(m?.validator==='Dr Romain BEDDOK'&&m.revision===revision&&dated(m.date)&&Date.parse(m.date)>=Date.parse(r.counterReview?.at)&&evidence(m.evidence)))errors.push('MEDICAL_APPROVAL');
 if(!(p?.verified===true&&p.revision===revision&&https(p.url)&&dated(p.at)&&Date.parse(p.at)>=Date.parse(m?.date)&&evidence(p.evidence)))errors.push('PRODUCTION_PROOF');
 if(!(a?.verified===true&&a.revision===revision&&dated(a.at)&&Date.parse(a.at)>=Date.parse(m?.date)&&/^[a-f0-9]{64}$/.test(a.indexVersion||'')&&evidence(a.fidelityEvidence)&&evidence(a.abstentionEvidence)))errors.push('ASSISTANT_PROOF');
 if(!criteria.slice(9).every(k=>r.criteria?.[k]?.status==='PASS'&&evidence(r.criteria[k].evidence)))errors.push('FINAL_CRITERIA');
 return errors;
}
function dashboard(r){
 const counts={},flags={};for(const e of r.entries){counts[e.status]=(counts[e.status]||0)+1;for(const f of e.flags)flags[f]=(flags[f]||0)+1;}
 return {schemaVersion:2,asOf:r.asOf,total:r.count,overdue:r.entries.filter(e=>e.deadline&&e.deadline<=r.asOf).length,missingDeadline:r.entries.filter(e=>!e.deadline).length,sensitive:r.entries.filter(e=>e.sensitive).length,sensitiveOpen:r.entries.filter(e=>e.sensitive&&e.status!=='REVALIDATED').length,counts,flags,scientificallyRevalidated:r.scientificallyRevalidated,audited:r.entries.filter(e=>['PENDING_MEDICAL_APPROVAL','PENDING_VERIFICATION','REVALIDATED'].includes(e.status)).length,queue:r.queue};
}
function report(d){return '# MACASANTÉ — Tableau de bord scientifique V2\n\nDate : '+d.asOf+'\n\n| Indicateur | Nombre |\n|---|---:|\n'+Object.entries({'Fiches canoniques':d.total,'Échéances dépassées':d.overdue,'Échéances inconnues':d.missingDeadline,'Fiches sensibles non clôturées':d.sensitiveOpen,'Audits V2 documentés et recevables':d.audited,'Réévaluations V2 clôturées':d.scientificallyRevalidated,...d.counts,...d.flags}).map(([k,v])=>'| '+k+' | '+v+' |').join('\n')+'\n\n## File prioritaire\n\n'+d.queue.map(x=>'- '+x).join('\n')+'\n\nLes signaux automatiques ne prouvent pas une erreur médicale. Les contrôles de structure ne prouvent pas la validité scientifique ni l’indépendance humaine de la contre-expertise. Aucun audit n’est comptabilisé sans dossier V2 recevable.\n';}

function build(cards,previous={},today=new Date().toISOString().slice(0,10)){
 const ids=new Set();const entries=cards.map(c=>{
 if(!c.id||ids.has(c.id))throw Error('Missing or duplicate canonical ID '+c.id);ids.add(c.id);
 const revision=crypto.createHash('sha256').update(JSON.stringify([c.title,c.answer,c.detail,c.watch,c.sources])).digest('hex');
 const prior=previous[c.id];const historicalDate=date(c.verifiedAt);const reviewed=prior?.revision===revision?prior.review:null;
 // Historical metadata is a scheduling hint, not proof of completed scientific review.
 const scientificErrors=auditErrors(reviewed,revision),errors=closureErrors(reviewed,revision);
 const closed=errors.length===0&&reviewed?.status==='REVALIDATED';
 const ready=scientificErrors.length===0;
 const status=closed?'REVALIDATED':ready?(errors.includes('MEDICAL_APPROVAL')?'PENDING_MEDICAL_APPROVAL':'PENDING_VERIFICATION'):'TO_REVIEW';
 const verified=closed?date(reviewed.medicalApproval.date):null;
 const deadline=verified?due(verified):date(c.nextAuditAt)||due(historicalDate);
 const sources=(c.sources||[]).filter(s=>/^https?:\/\//.test(s.url||''));
 const sensitive=/enfant|nourrisson|grossesse|urgence|cancer|medicament|médicament|suicid|vaccin/i.test(c.title+' '+c.category);
 return {id:c.id,title:c.title,category:c.publicCategory||c.category,revision,historicalDate,deadline,sensitive,sourceCount:sources.length,flags:[...(!c.detail?['NO_DETAIL']:[]),...(sources.length<3?['REVIEW_SOURCE_DIVERSITY']:[]),...(sources.length&&sources.every(s=>/ameli\.fr/i.test(s.url))?['AMELI_ONLY']:[])],status,reviewErrors:errors,review:reviewed||null};
 });
 const queue=entries.filter(e=>e.status==='TO_REVIEW'||(e.status==='REVALIDATED'&&(!e.deadline||e.deadline<=today))).sort((a,b)=>Number(b.sensitive)-Number(a.sensitive)||(a.deadline||'0000').localeCompare(b.deadline||'0000')||a.id.localeCompare(b.id)).slice(0,10).map(e=>e.id);
 return {schemaVersion:2,asOf:today,criteriaVersion:'A01-A12-V2-2026-11-25',count:entries.length,overdue:entries.filter(e=>!e.deadline||e.deadline<=today).length,scientificallyRevalidated:entries.filter(e=>e.status==='REVALIDATED').length,queue,entries};
}
if(require.main===module){fs.mkdirSync(dir,{recursive:true});const old=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)): {entries:[]};const cards=require('./audit-content-duplicates').load(root).canonical;const previous=Object.fromEntries(old.entries.map(e=>[e.id,e]));const reviews=path.join(dir,'reviews');if(fs.existsSync(reviews))for(const name of fs.readdirSync(reviews).filter(n=>n.endsWith('.json'))){const r=JSON.parse(fs.readFileSync(path.join(reviews,name),'utf8'));if(name!==r.id+'.json'||!cards.some(c=>c.id===r.id))throw Error('Invalid review file '+name);previous[r.id]={revision:r.revision,review:r};}const result=build(cards,previous);fs.writeFileSync(file,JSON.stringify(result,null,2)+'\n');const d=dashboard(result);fs.writeFileSync(path.join(dir,'dashboard.json'),JSON.stringify(d,null,2)+'\n');fs.writeFileSync(path.join(dir,'DASHBOARD.md'),report(d));console.log(JSON.stringify({count:result.count,overdue:result.overdue,queue:result.queue,scientificallyRevalidated:result.scientificallyRevalidated}));}
module.exports={date,due,build,auditErrors,closureErrors,dashboard,report};
