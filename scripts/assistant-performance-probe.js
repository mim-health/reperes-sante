#!/usr/bin/env node
'use strict';
// Fixed, non-personal synthetic questions only. No real user questions are logged.
const fs=require('node:fs');
const endpoint=process.env.ASSISTANT_ENDPOINT||'https://purple-voice-a8e3.dr-beddok.workers.dev/';
const cases=[
  {id:'sciatique',question:'Sciatique : faut-il faire une IRM ?',covered:true},
  {id:'nycturie',question:'Je me lève plusieurs fois la nuit pour uriner : est-ce normal ?',covered:true},
  {id:'menopause',question:'Un saignement après la ménopause est-il normal ?',covered:true},
  {id:'magnesium',question:'Le magnésium aide-t-il vraiment à dormir ?',covered:true},
  {id:'hors_corpus',question:'Quels sont les meilleurs traitements naturels pour la maladie de Lyme chronique ?',covered:false}
];
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const median=values=>{const a=[...values].sort((a,b)=>a-b);return a.length?a.length%2?a[(a.length-1)/2]:(a[a.length/2-1]+a[a.length/2])/2:null;};
async function probe({fetchImpl=fetch,pause=sleep,rounds=2}={}){
  const report={generatedAt:new Date().toISOString(),endpoint,newWorkerTiming:false,cases:[],note:'La première requête peut inclure un chargement initial ; une instance froide n’est pas garantie.'};
  async function request(test,round){
    const started=performance.now();
    try{
      const r=await fetchImpl(test?endpoint:endpoint+'?maca_public_ready=1',test?{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://macasante.fr'},body:JSON.stringify({question:test.question}),signal:AbortSignal.timeout(45000)}:{signal:AbortSignal.timeout(15000)});
      const body=await r.json();const meta=body.meta||{};
      const supported=body.status==='answer'&&Boolean(body.answer)&&Boolean(body.cards_used?.length)&&meta.grounding==='supported';
      const pass=test?(test.covered?supported:r.ok&&['abstain','category_only','no_answer'].includes(body.status)):r.ok&&body.public_ready===true;
      return {id:test?.id||'readiness',round,http:r.status,totalMs:Math.round(performance.now()-started),status:body.status||null,pass,error:body.error||null,grounding:meta.grounding||null,corpusCards:meta.corpus_cards||null,artifactVersion:meta.artifact_version||body.artifact_version||null,cardIds:(body.cards_used||[]).map(c=>c.id),timings:meta.timings_ms||null,serverTiming:r.headers.get('server-timing')};
    }catch(e){return {id:test?.id||'readiness',round,totalMs:Math.round(performance.now()-started),pass:false,error:e.name};}
  }
  report.readiness=await request(null,0);
  for(let round=1;round<=rounds;round++)for(const test of cases){
    report.cases.push(await request(test,round));await pause(5000);
  }
  const answers=report.cases.filter(x=>x.pass&&x.status==='answer');
  report.summary={passed:report.cases.filter(x=>x.pass).length,total:report.cases.length,medianAnswerMs:median(answers.map(x=>x.totalMs)),targetMs:7000};
  report.newWorkerTiming=report.cases.some(x=>x.timings);
  return report;
}
function md(r){
  return ['# MACASANTÉ — Mesure Assistant',`Généré : ${r.generatedAt}`,'',r.note,
    `Disponibilité : HTTP ${r.readiness.http||'—'} ; ${r.readiness.totalMs} ms.`,
    '**Cette disponibilité ne mesure pas la génération d’une réponse.**','',
    '| Cas fixe | Passage | HTTP | Statut | Temps total | Fidélité | Résultat |','|---|---:|---:|---|---:|---|---|',
    ...r.cases.map(x=>`| ${x.id} | ${x.round} | ${x.http||'—'} | ${x.status||x.error||'—'} | ${(x.totalMs/1000).toFixed(2)} s | ${x.grounding||'—'} | ${x.pass?'PASS':'À examiner'} |`),
    '',`Médiane des réponses couvertes réussies : ${r.summary.medianAnswerMs===null?'indisponible':(r.summary.medianAnswerMs/1000).toFixed(2)+' s'}. Cible : moins de 7 s.`,
    `Résultats fonctionnels : ${r.summary.passed}/${r.summary.total}.`,
    r.newWorkerTiming?'Mesures internes disponibles dans le JSON.':'Le Worker actif ne fournit pas encore de chronométrage par étape. Ne pas déduire ces étapes du seul temps total.'].join('\n')+'\n';
}
if(require.main===module)(async()=>{
  const report=await probe();fs.writeFileSync('assistant-performance-latest.json',JSON.stringify(report,null,2)+'\n');fs.writeFileSync('assistant-performance-latest.md',md(report));
  console.log(JSON.stringify(report.summary));if(!report.readiness.pass||report.summary.passed!==report.summary.total)process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={probe,md,median};
