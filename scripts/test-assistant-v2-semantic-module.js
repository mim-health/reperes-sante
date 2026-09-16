#!/usr/bin/env node
'use strict';
const path=require('path');
const semantic=require(path.resolve(__dirname,'..','assistant-v2','semantic-retrieval.js'));

function assert(condition,message){if(!condition)throw new Error(message);}

const a=[1,0,0],b=[0.9,0.1,0],c=[0,1,0];
assert(Math.abs(semantic.cosine(a,a)-1)<1e-9,'cosine identique');
assert(semantic.cosine(a,b)>semantic.cosine(a,c),'classement cosine');

const index=semantic.buildIndex({model:'mock',dimensions:3,corpusFingerprint:'x',vectors:[
  {id:'a',vector:a},{id:'b',vector:b},{id:'c',vector:c}
]});
const ranked=semantic.search(index,a,{topK:3});
assert(ranked[0].id==='a','top semantic attendu');
const fused=semantic.reciprocalRankFusion([[{id:'a'},{id:'b'}],[{id:'b'},{id:'a'}]],{topK:2});
assert(fused.length===2,'RRF incomplet');
assert(new Set(fused.map(x=>x.id)).size===2,'RRF doublons');
console.log(JSON.stringify({ok:true,semanticTop:ranked[0],rrf:fused},null,2));
