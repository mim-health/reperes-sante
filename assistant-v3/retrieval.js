/* Experimental, dependency-free retrieval. No medical content is generated here. */
(function(root){
'use strict';
const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/œ/g,'oe').replace(/[^a-z0-9]+/g,' ').trim();
const STOP=new Set('je j ai le la les de des du un une et ou est ce que qui en au aux dans pour par avec sans mon ma mes me se il elle on nous vous tu ca plus depuis quand faut faire peut sont comme alors tout tres'.split(' '));
const tokens=s=>normalize(s).split(/\s+/).filter(t=>t.length>1&&!STOP.has(t));
// Retrieval vocabulary only, not medical assertions or diagnostic rules. Requires review.
const GROUPS=[['crevee','creve','fatigue','epuise'],['pipi','uriner','urines'],['bide','ventre'],['kilos','poids'],['tape','palpitations'],['sifflements','acouphenes'],['destomac','estomac'],['hipertension','hypertension'],['sciatik','sciatique'],['acouphenne','acouphenes'],['constipassion','constipation'],['melatonnine','melatonine'],['osteoporosse','osteoporose']];
function distance(a,b){if(Math.abs(a.length-b.length)>1)return 2;let prev=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]!==b[j-1]));prev=next;}return prev[b.length];}
function buildIndex(cards,registry){
 const alias=new Map();for(const e of registry?.entries||[]){alias.set(e.targetId,[...(alias.get(e.targetId)||[]),...(e.canonicalAliases||[]),...(e.patientPhrases||[]),...(e.medicalSynonyms||[])]);}
 const df=new Map(),vocabulary=new Set();
 const docs=cards.map(c=>{const content=c.content||{};const fields=[[c.title,5],[(alias.get(c.id)||[]).join(' '),4],[(c.keywords||[]).join(' '),3],[Object.values(content).join(' '),1]];const tf=new Map();let length=0;for(const [text,weight]of fields)for(const t of tokens(text)){tf.set(t,(tf.get(t)||0)+weight);length++;vocabulary.add(t);}for(const t of tf.keys())df.set(t,(df.get(t)||0)+1);return {id:c.id,tf,length};});
 return {docs,df,vocabulary,average:docs.reduce((n,d)=>n+d.length,0)/(docs.length||1)};
}
function search(index,question,k=5){
 const terms=new Set(tokens(question));for(const group of GROUPS)if(group.some(t=>terms.has(t)))group.forEach(t=>terms.add(t));
 // Only correct long unknown tokens with a unique nearest corpus term; never numbers.
 for(const term of [...terms]){if(term.length<6||index.vocabulary.has(term)||/\d/.test(term))continue;const near=[...index.vocabulary].filter(t=>distance(term,t)===1);if(near.length===1)terms.add(near[0]);}
 return index.docs.map(d=>{let score=0,hits=0;for(const t of terms){const tf=d.tf.get(t)||0;if(!tf)continue;hits++;const idf=Math.log(1+(index.docs.length-(index.df.get(t)||0)+0.5)/((index.df.get(t)||0)+0.5));score+=idf*tf*2.2/(tf+1.2*(0.25+0.75*d.length/index.average));}return {id:d.id,lexicalScore:score,hits};}).filter(d=>d.hits&&d.lexicalScore>0).sort((a,b)=>b.lexicalScore-a.lexicalScore||a.id.localeCompare(b.id)).slice(0,k);
}
function hybrid(index,question,semantic,validatedMatch,k=5){
 const lexical=search(index,question,20),merged=new Map();
 for(const [list,kind]of [[lexical,'lexical'],[semantic||[],'semantic']])list.forEach((r,i)=>{let v=merged.get(r.id)||{id:r.id,score:0,similarity:0,lexicalScore:0};v.score+=1/(60+i+1);if(kind==='semantic')v.similarity=r.similarity;else v.lexicalScore=r.lexicalScore;merged.set(r.id,v);});
 if(validatedMatch){const v=merged.get(validatedMatch.targetId)||{id:validatedMatch.targetId,score:0,similarity:0,lexicalScore:0};v.score+=1;v.validated=true;merged.set(v.id,v);}
 return [...merged.values()].sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)).slice(0,k);
}
function contextualize(question,history){
 if(!Array.isArray(history)||history.length>6)throw new Error('invalid_history');
 for(const t of history)if(!t||!['user','assistant'].includes(t.role)||typeof t.content!=='string'||t.content.length>600)throw new Error('invalid_history');
 const q=String(question).trim(),n=normalize(q);
 const followup=/^(oui|non|depuis|trois|deux|un|une|plusieurs|surtout|la nuit|apres chaque|sans faire|et les|est ce systematique|a propos)/.test(n)&&tokens(q).length<=10;
 const previous=history.filter(t=>t.role==='user').slice(-2).map(t=>t.content);
 return {question:q,retrievalQuestion:followup&&previous.length?previous.join('\n')+'\nPrécision : '+q:q,usedHistory:followup&&previous.length>0};
}
const api={normalize,tokens,buildIndex,search,hybrid,contextualize};root.MACA_V3_RETRIEVAL=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
