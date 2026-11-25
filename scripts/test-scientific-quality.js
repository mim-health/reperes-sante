'use strict';
const assert=require('assert/strict');const {date,due,build}=require('./scientific-quality');
assert.equal(date('25/11/2026'),'2026-11-25');assert.equal(date('2026-11-25T11:55:00+01:00'),'2026-11-25');assert.equal(due('2026-11-30'),'2027-02-28');
const cards=Array.from({length:13},(_,i)=>({id:'a'+i,title:'test '+i,verifiedAt:'20/08/2026',answer:'a',detail:'b',sources:[]}));
const a=build(cards,{},'2026-11-25');assert.equal(a.count,13);assert.equal(a.queue.length,10);assert.equal(a.scientificallyRevalidated,0);assert.equal(a.overdue,13);assert.throws(()=>build([cards[0],cards[0]]));assert.equal(build(cards,{a0:{revision:a.entries[0].revision,review:{status:'REVALIDATED'}}},'2026-11-25').scientificallyRevalidated,0);console.log('PASS scientific quality: deadlines, queue, duplicates, no automatic medical approval');

const q=require('./scientific-quality'),revision=a.entries[0].revision,at='2026-11-25T10:00:00+01:00';
const proof='Synthetic fixture: documented test evidence, not real medical review.';
const criteria=Object.fromEntries(Array.from({length:12},(_,i)=>['A'+String(i+1).padStart(2,'0'),{status:'PASS',evidence:proof}]));
const r={schemaVersion:2,revision,status:'REVALIDATED',primaryAudit:{reviewer:'writer-test',runId:'test-a',at,summary:proof},counterReview:{reviewer:'critic-test',runId:'test-b',at,summary:proof,decision:'PASS',findings:[]},sources:[{id:'s1',title:'Synthetic source',url:'https://example.org/test',level:'GUIDELINE',checkedAt:at,access:'VERIFIED',relevance:proof}],sourceSelectionRationale:proof,claims:[{text:'Synthetic claim',location:'answer',sourceIds:['s1'],verdict:'SUPPORTED',evidence:proof,limitations:proof}],claimCoverage:{complete:true,method:proof},safety:Object.fromEntries(['redFlags','urgentOrientation','contraindications','vulnerableGroups','treatmentBoundaries','diagnosticUncertainty'].map(k=>[k,{status:'PASS',evidence:proof}])),criteria,medicalApproval:{validator:'Dr Romain BEDDOK',date:at,revision,evidence:proof},production:{verified:true,revision,at,url:'https://example.org/test',evidence:proof},assistant:{verified:true,revision,at,indexVersion:'a'.repeat(64),fidelityEvidence:proof,abstentionEvidence:proof}};
assert.deepEqual(q.closureErrors(r,revision),[]);
const mutate=fn=>{const x=JSON.parse(JSON.stringify(r));fn(x);return x;};
for(const fn of [x=>x.counterReview.reviewer=x.primaryAudit.reviewer,x=>x.counterReview.runId=x.primaryAudit.runId,x=>x.claims[0].sourceIds=['missing'],x=>delete x.safety.redFlags,x=>x.sources[0].access='UNVERIFIED',x=>x.counterReview.findings.push({issue:proof,status:'OPEN'}),x=>delete x.medicalApproval,x=>x.production.revision='old',x=>delete x.assistant.abstentionEvidence])assert(q.closureErrors(mutate(fn),revision).length);
assert(q.closureErrors(r,'changed').includes('VERSION_MISMATCH'));
assert.equal(q.build(cards,{a0:{revision,review:r}},'2026-11-25').scientificallyRevalidated,1);
assert.equal(q.build(cards,{a0:{revision,review:mutate(x=>delete x.medicalApproval)}},'2026-11-25').entries[0].status,'PENDING_MEDICAL_APPROVAL');
assert.equal(q.build(cards,{a0:{revision,review:mutate(x=>delete x.production)}},'2026-11-25').entries[0].status,'PENDING_VERIFICATION');
assert.equal(q.dashboard(a).audited,0);
console.log('PASS V2: independent review fields, unresolved findings, source and claim traceability, safety, human approval, version-bound publication and assistant evidence.');
