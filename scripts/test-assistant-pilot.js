'use strict';
const assert=require('assert/strict'),fs=require('fs'),vm=require('vm');
class El{
 constructor(){this.dataset={};this.attrs={};this.hidden=false;this.disabled=false;this.value='';this.textContent='';this.innerHTML='';this.events={};this.classList={add(){},remove(){},contains(){return true;}};}
 setAttribute(k,v){this.attrs[k]=v;} addEventListener(k,f){this.events[k]=f;} focus(){} append(){} appendChild(){} querySelector(s){return this.nodes[s];}querySelectorAll(){return this.buttons||[];}closest(){return this;}
}
async function run(){
 const panel=new El(),head=new El(),body=new El(),feedback=new El();feedback.buttons=[new El(),new El()];feedback.buttons[0].dataset.vote='useful';feedback.buttons[1].dataset.vote='not_useful';
 panel.nodes=Object.fromEntries(['.maca-v2-close','textarea','.maca-v2-send','.maca-v2-result','.maca-v2-status','.maca-v2-answer','.maca-v2-scope','.maca-v2-sources','.maca-v2-export','.maca-v2-vote-status'].map(k=>[k,new El()]));panel.nodes['.maca-v2-feedback']=feedback;
 const sourceLink=new El();sourceLink.dataset.sourceType='magazine';panel.nodes['.maca-v2-sources'].buttons=[sourceLink];
 const storage=new Map();const requests=[],s={console,Date,Set,Blob,URL,AbortController,setTimeout(){return 1;},clearTimeout(){},document:{body,head,getElementById(){return null;},querySelector(){return null;},addEventListener(){},createElement(tag){return tag==='section'?panel:new El();}},fetch:async(u,o)=>{if(!o||o.method==='GET')return {ok:true,json:async()=>({service:'maca-assistant-v2',public_ready:true})};requests.push(o);return s.reply();}};s.sessionStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};s.window=s;s.globalThis=s;vm.createContext(s);
 for(const p of ['maca-assistant-metrics.js','maca-assistant-v2-unified.js'])vm.runInContext(fs.readFileSync(p,'utf8'),s,{filename:p});await new Promise(r=>setImmediate(r));
 const api=s.MACA_ASSISTANT_V2,m=s.MACA_ASSISTANT_METRICS;assert(api);
 let resolve;s.reply=()=>new Promise(r=>resolve=r);const first=api.ask('Une question synthétique');await api.ask('double envoi');assert.equal(requests.length,1,'pending request must block duplicate send');
 const version='f'.repeat(64);resolve({ok:true,json:async()=>({status:'answer',answer:'Texte documenté',scope_note:'Portée',cards_used:[{id:'mag-test',title:'Titre — Le Mag · 11/10/2026',url:'https://macasante.fr/article-test.html'},{id:'fiche-test',title:'<script>texte</script>'}],meta:{artifact_version:version}})});await first;
 assert.equal(panel.nodes['.maca-v2-answer'].textContent,'Texte documenté');assert(panel.nodes['.maca-v2-sources'].innerHTML.includes('Actualité — Le Mag'));assert(panel.nodes['.maca-v2-sources'].innerHTML.includes('fiche.html?id=fiche-test'));assert(!panel.nodes['.maca-v2-sources'].innerHTML.includes('<script>'));
 feedback.buttons[0].onclick();assert(feedback.buttons.every(b=>b.disabled));sourceLink.events.click();assert.equal(m.snapshot().events.at(-1).event,'source_click');
 for(const [reply,error] of [[()=>({ok:false,status:429}),'rate_limit'],[()=>({ok:false,status:503}),'server'],[()=>({ok:true,json:async()=>{throw Error('bad')}}),'invalid_response'],[()=>({ok:true,json:async()=>({status:'mystery'})}),'invalid_response'],[()=>{throw new TypeError('fetch failed')},'network'],[()=>{const e=Error();e.name='AbortError';throw e;},'timeout']]){s.reply=reply;await api.ask('question suivante');assert.equal(m.snapshot().events.at(-1).error,error);assert.equal(panel.nodes['.maca-v2-send'].disabled,false);assert(feedback.hidden);assert(!panel.nodes['.maca-v2-sources'].textContent);}
 s.reply=()=>({ok:true,json:async()=>({status:'abstain',cards_used:[],answer:''})});await api.ask('Zeflorium');assert.equal(m.snapshot().events.at(-1).event,'abstain');
 const count=requests.length;await api.ask('a'.repeat(601));assert.equal(requests.length,count);assert.equal(m.snapshot().events.at(-1).error,'input_length');assert(requests.every(r=>r.signal));
 m.record('answer',{question:'secret medical text',answer:'secret answer',url:'https://private',ip:'127.0.0.1',durationMs:99,corpusVersion:version});m.record('unknown',{value:'secret'});
 const serialized=JSON.stringify(m.snapshot());assert(!/secret|private|127\.0/.test(serialized));assert(serialized.includes('feedback'));assert(serialized.includes('source_click'));assert(serialized.includes('corpusVersion'));
 for(let i=0;i<210;i++)m.record('open');assert.equal(m.snapshot().events.length,200);
 vm.runInContext(fs.readFileSync('maca-assistant-metrics.js','utf8'),s);assert.equal(s.MACA_ASSISTANT_METRICS.snapshot().events.length,200,'same-tab source navigation preserves anonymous events');
 const summary=require('./summarize-assistant-pilot').summarize([{schemaVersion:1,mode:'local-manual-export',events:[{event:'question_sent',question:'secret'},{event:'answer',durationMs:5000},{event:'feedback',value:'useful'}]}]);assert.equal(summary.counts.useful,1);assert.equal(summary.medianDurationMs,5000);assert(!JSON.stringify(summary).includes('secret'));
 console.log(JSON.stringify({ok:true,duplicateSend:true,sourceLinks:true,feedback:true,errorRecovery:6,longInput:true,timeoutSignal:true,anonymousWhitelist:true,boundedMemory:true}));
}
run().catch(e=>{console.error(e);process.exitCode=1;});
