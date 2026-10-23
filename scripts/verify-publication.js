'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),crypto=require('crypto');
const read=p=>fs.readFileSync(p,'utf8');
const ctx={window:{},console};vm.createContext(ctx);
for(const p of ['backlog-audited-sante-mentale-lot2-2026-10-23.js','backlog-audited-retine-validated-2026-10-23.js'])vm.runInContext(read(p),ctx);
const expected=ctx.window.extraAuditedQuestions;
assert.equal(expected.length,11);
const forbidden=['ophtalmo-chirurgie-myopie-laser','ophtalmo-glaucome-depistage'];
const corpus=JSON.parse(read('assistant-v2/corpus.json'));
for(const c of expected){
  assert(corpus.cards.some(x=>x.id===c.id),'Missing Assistant card '+c.id);
  const p='fiches-seo/'+c.id+'.html',html=read(p);
  assert(html.includes('https://macasante.fr/'+p),'Canonical '+c.id);
  assert(!/noindex/i.test(html),'Noindex '+c.id);
  assert(read('sitemap.xml').includes('https://macasante.fr/'+p),'Sitemap '+c.id);
  assert(read('corpus-production.js').includes(c.id),'Catalogue '+c.id);
}
for(const id of forbidden){assert(!corpus.cards.some(c=>c.id===id),'Unvalidated Assistant card '+id);assert(!fs.existsSync('fiches-seo/'+id+'.html'),'Unvalidated page '+id);}
async function get(p){const r=await fetch('https://macasante.fr/'+p+(p.includes('?')?'&':'?')+'publication_check='+Date.now(),{signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,p+' HTTP '+r.status);return r.text();}
async function main(){
  if(process.argv.includes('--assistant-index')){
    const base='https://raw.githubusercontent.com/mim-health/reperes-sante/feat/v0-magazine/assistant-v2/';
    const latest=await (await fetch(base+'latest.json')).json();
    const published=await (await fetch(base+'public-artifacts/'+latest.version+'/corpus.json')).json();
    assert.equal(published.fingerprint,latest.version);
    for(const c of expected)assert(published.cards.some(x=>x.id===c.id),'Missing published Assistant card '+c.id);
    for(const id of forbidden)assert(!published.cards.some(x=>x.id===id),'Unvalidated published Assistant card '+id);
    // A readiness GET can hit a cold isolate with no loaded version. Exercise retrieval.
    const response=await fetch('https://purple-voice-a8e3.dr-beddok.workers.dev/',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://macasante.fr'},body:JSON.stringify({question:'Mouches volantes et éclairs dans les yeux : quand faut-il consulter ?'}),signal:AbortSignal.timeout(90000)});
    assert.equal(response.status,200,'Assistant HTTP '+response.status);
    const ready=await response.json();
    assert.equal(ready.meta?.artifact_version,latest.version,'Active Assistant index is stale');
    assert(ready.selected_cards?.some(c=>c.id==='ophtalmo-mouches-volantes-eclairs-retine'),'Retina fiche not retrievable');
    console.log('PASS: all 11 cards in active immutable Assistant index '+latest.version);
  }
  if(process.argv.includes('--public')){
    // Exact generated bundle parity also verifies the catalogue's complete data source.
    const remote=await get('corpus-production.js');
    assert.equal(crypto.createHash('sha256').update(remote).digest('hex'),crypto.createHash('sha256').update(read('corpus-production.js')).digest('hex'),'Stale public bundle');
    const sitemap=await get('sitemap.xml'),catalogue=await get('fiches.html');assert(catalogue.includes('corpus-loader.js'));
    for(const c of expected){const p='fiches-seo/'+c.id+'.html',html=await get(p);assert.equal(html,read(p),'Stale page '+c.id);assert(sitemap.includes('https://macasante.fr/'+p));console.log('PUBLIC PASS https://macasante.fr/'+p);}
    for(const id of forbidden)assert(!remote.includes('"id": "'+id+'"'),'Unvalidated public card '+id);
  }
  console.log('PASS: 11 validated fiches, catalogue, sitemap, Assistant build; 2 unvalidated fiches excluded.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
