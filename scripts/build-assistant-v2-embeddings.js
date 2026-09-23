#!/usr/bin/env node
'use strict';

const fs=require('fs');
const path=require('path');
const crypto=require('crypto');

const ROOT=path.resolve(__dirname,'..');
const CORPUS_PATH=path.join(ROOT,'assistant-v2','corpus.json');
const OUT_PATH=path.join(ROOT,'assistant-v2','embeddings.index.json');
const API_URL='https://api.openai.com/v1/embeddings';
const MODEL=process.env.MACA_EMBEDDING_MODEL||'text-embedding-3-small';
const DIMENSIONS=Math.max(64,Number(process.env.MACA_EMBEDDING_DIMENSIONS)||512);
const BATCH_SIZE=Math.max(1,Math.min(256,Number(process.env.MACA_EMBEDDING_BATCH_SIZE)||64));

function sha(value){return crypto.createHash('sha256').update(String(value||'')).digest('hex');}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function embedBatch(input,apiKey){
  let lastError=null;
  for(let attempt=1;attempt<=4;attempt++){
    const response=await fetch(API_URL,{
      method:'POST',
      headers:{'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json'},
      body:JSON.stringify({model:MODEL,input,dimensions:DIMENSIONS,encoding_format:'float'})
    });
    if(response.ok)return response.json();
    const text=await response.text();
    lastError=new Error(`OpenAI embeddings ${response.status}: ${text.slice(0,500)}`);
    if(![429,500,502,503,504].includes(response.status))break;
    await sleep(500*attempt*attempt);
  }
  throw lastError||new Error('Échec embeddings OpenAI');
}

async function main(){
  const corpus=JSON.parse(fs.readFileSync(CORPUS_PATH,'utf8'));
  if(!Array.isArray(corpus.cards)||!corpus.cards.length)throw new Error('Corpus V2 vide');

  let previous=null;
  if(fs.existsSync(OUT_PATH)){
    try{previous=JSON.parse(fs.readFileSync(OUT_PATH,'utf8'));}catch(_){previous=null;}
  }
  const reusable=new Map();
  if(previous&&previous.model===MODEL&&Number(previous.dimensions)===DIMENSIONS&&Array.isArray(previous.vectors)){
    for(const item of previous.vectors){
      if(item&&item.id&&item.sourceHash&&Array.isArray(item.vector))reusable.set(item.id,item);
    }
  }

  const wanted=corpus.cards.map(card=>({
    id:card.id,
    text:String(card.retrievalText||'').trim(),
    sourceHash:sha(card.retrievalText||'')
  }));
  const vectors=[];
  const pending=[];
  for(const item of wanted){
    if(!item.text)throw new Error(`Texte vide pour ${item.id}`);
    const cached=reusable.get(item.id);
    if(cached&&cached.sourceHash===item.sourceHash&&cached.vector.length===DIMENSIONS){
      vectors.push(cached);
    }else{
      pending.push(item);
    }
  }

  let totalTokens=0;
  if(pending.length){
    const apiKey=process.env.OPENAI_API_KEY;
    if(!apiKey)throw new Error(`OPENAI_API_KEY absent : ${pending.length} fiche(s) nécessitent un embedding.`);
    for(let start=0;start<pending.length;start+=BATCH_SIZE){
      const batch=pending.slice(start,start+BATCH_SIZE);
      const payload=await embedBatch(batch.map(x=>x.text),apiKey);
      totalTokens+=Number(payload.usage&&payload.usage.total_tokens||0);
      const data=[...(payload.data||[])].sort((a,b)=>a.index-b.index);
      if(data.length!==batch.length)throw new Error(`Réponse embeddings incomplète (${data.length}/${batch.length})`);
      data.forEach((row,index)=>{
        if(!Array.isArray(row.embedding)||row.embedding.length!==DIMENSIONS)throw new Error(`Dimension invalide pour ${batch[index].id}`);
        vectors.push({id:batch[index].id,sourceHash:batch[index].sourceHash,vector:row.embedding});
      });
    }
  }

  const order=new Map(wanted.map((x,i)=>[x.id,i]));
  vectors.sort((a,b)=>(order.get(a.id)??1e9)-(order.get(b.id)??1e9));
  if(vectors.length!==wanted.length)throw new Error(`Index incomplet (${vectors.length}/${wanted.length})`);

  const out={
    schemaVersion:1,
    source:'MACA_CANONICAL_CORPUS',
    corpusFingerprint:corpus.fingerprint||'',
    model:MODEL,
    dimensions:DIMENSIONS,
    cardCount:vectors.length,
    generatedAt:new Date().toISOString(),
    build:{reused:vectors.length-pending.length,embedded:pending.length,totalTokens},
    vectors
  };
  fs.writeFileSync(OUT_PATH,JSON.stringify(out,null,2)+'\n');
  console.log(JSON.stringify({ok:true,model:MODEL,dimensions:DIMENSIONS,cardCount:vectors.length,reused:out.build.reused,embedded:out.build.embedded,totalTokens},null,2));
}

main().catch(error=>{console.error(error.stack||error.message||String(error));process.exitCode=1;});
