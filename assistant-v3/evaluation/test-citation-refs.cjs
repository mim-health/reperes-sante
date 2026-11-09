'use strict';
const assert=require('assert/strict'),fs=require('fs'),vm=require('vm'),Module=require('module'),path=require('path');
const c=require('../../assistant-v2/corpus.json');
const box={};vm.createContext(box);vm.runInContext(fs.readFileSync('assistant-v3/worker-citation-refs.js','utf8').replace(/^import .*;\n/gm,'').replace('export default {','globalThis.worker = {'),box);
let n=0;for(const card of c.cards){for(const e of box.cardExcerpts(card)){assert(Object.values(card.content).some(t=>t.includes(e.quote)));const raw={blocks:[{text:'test',card_ids:[card.id],evidence:[{card_id:card.id,excerpt_id:e.excerpt_id}]}]};assert.equal(box.hydrateEvidence(raw,[card]).blocks[0].evidence[0].quote,e.quote);n++;}}
const card=c.cards[0];for(const evidence of [[{card_id:card.id,excerpt_id:'unknown'}],[{card_id:'foreign',excerpt_id:'e0'}]])assert.equal(box.hydrateEvidence({blocks:[{evidence}]},[card]).blocks[0].evidence[0].quote,'');
const filename=path.resolve('scripts/test-assistant-v2-grounding.js');let code=fs.readFileSync(filename,'utf8').replace("fs.readFileSync('assistant-v2/cloudflare-worker-public.js'", "fs.readFileSync('assistant-v3/worker-citation-refs.js'").replace('TextEncoder,crypto:webcrypto,','TextEncoder,TextDecoder,MACA_V3_RETRIEVAL:require(\'../assistant-v3/retrieval\'),MACA_V3_SAFETY:require(\'../assistant-v3/safety\'),crypto:webcrypto,');
const child=new Module(filename,module);child.filename=filename;child.paths=Module._nodeModulePaths(path.dirname(filename));child._compile(code,filename);
console.log(JSON.stringify({documents:c.cardCount,exactExcerptsRoundTripped:n,foreignReferencesRejected:true,medicalReview:false}));

const testfile=path.resolve('assistant-v3/evaluation/test-v3.cjs');
const testcode=fs.readFileSync(testfile,'utf8').replace('assistant-v3/worker-experimental.js','assistant-v3/worker-citation-refs.js');
const flow=new Module(testfile,module);flow.filename=testfile;flow.paths=Module._nodeModulePaths(path.dirname(testfile));flow._compile(testcode,testfile);
