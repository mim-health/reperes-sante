/* MACA Santé — Assistant IA V2 semantic retrieval.
 * Prototype isolé. Ce module ne produit aucune réponse médicale.
 * Il classe les fiches MACA à partir de vecteurs déjà calculés.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.MACA_ASSISTANT_V2_SEMANTIC=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  function dot(a,b){
    if(!Array.isArray(a)||!Array.isArray(b)||a.length!==b.length)throw new Error('Vecteurs incompatibles');
    let out=0;
    for(let i=0;i<a.length;i++)out+=a[i]*b[i];
    return out;
  }

  function norm(a){
    return Math.sqrt(dot(a,a));
  }

  function cosine(a,b){
    const denom=norm(a)*norm(b);
    return denom?dot(a,b)/denom:0;
  }

  function buildIndex(payload){
    if(!payload||!Array.isArray(payload.vectors))throw new Error('Index embeddings V2 invalide');
    const byId=new Map(payload.vectors.map(item=>[item.id,item]));
    return {
      schemaVersion:payload.schemaVersion||1,
      model:payload.model||'',
      dimensions:payload.dimensions||0,
      corpusFingerprint:payload.corpusFingerprint||'',
      byId,
      vectors:payload.vectors
    };
  }

  function search(index,queryVector,options={}){
    const topK=Math.max(1,Math.min(20,Number(options.topK)||5));
    const results=index.vectors.map(item=>({
      id:item.id,
      similarity:Number(cosine(queryVector,item.vector).toFixed(6))
    }));
    results.sort((a,b)=>b.similarity-a.similarity||String(a.id).localeCompare(String(b.id)));
    return results.slice(0,topK);
  }

  function reciprocalRankFusion(lists,options={}){
    const k=Number(options.k)||60;
    const topK=Math.max(1,Math.min(20,Number(options.topK)||5));
    const score=new Map();
    for(const list of lists){
      if(!Array.isArray(list))continue;
      list.forEach((item,index)=>{
        const id=typeof item==='string'?item:item&&item.id;
        if(!id)return;
        score.set(id,(score.get(id)||0)+(1/(k+index+1)));
      });
    }
    return [...score.entries()]
      .map(([id,rrfScore])=>({id,rrfScore:Number(rrfScore.toFixed(8))}))
      .sort((a,b)=>b.rrfScore-a.rrfScore||String(a.id).localeCompare(String(b.id)))
      .slice(0,topK);
  }

  return {dot,cosine,buildIndex,search,reciprocalRankFusion};
});
