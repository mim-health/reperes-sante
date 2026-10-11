/* Mechanical proof checks precede the independent semantic grounding pass. */
(function(root){
  'use strict';
  const normalize=s=>String(s||'').normalize('NFC').replace(/\s+/g,' ').trim();
  const numbers=s=>normalize(s).match(/\d+(?:[.,]\d+)*/g)||[];
  function evidenceValid(block,cards){
    if(!Array.isArray(block.evidence)||!block.evidence.length)return false;
    const byId=new Map(cards.map(c=>[c.id,c]));
    const cited=new Set(block.card_ids),proved=new Set();
    for(const e of block.evidence){
      const card=byId.get(e?.card_id),quote=normalize(e?.quote);
      if(!card||!cited.has(e.card_id)||quote.length<12)return false;
      const c=card.content||card;
      // A title, external reference or user's question is not documentary evidence.
      const fields=['answer','detail','usefulInfo','watch'].map(k=>normalize(c[k]));
      if(!fields.some(field=>field.includes(quote)))return false;
      proved.add(e.card_id);
    }
    if([...cited].some(id=>!proved.has(id)))return false;
    const witnessed=new Set(block.evidence.flatMap(e=>numbers(e.quote)));
    return numbers(block.text).every(n=>witnessed.has(n));
  }
  function verdictsValid(parsed,count){
    if(!Array.isArray(parsed?.verdicts)||parsed.verdicts.length!==count)return false;
    return parsed.verdicts.every((v,i)=>v.block_index===i&&v.supported===true&&Array.isArray(v.unsupported_claims)&&v.unsupported_claims.length===0);
  }
  const api={evidenceValid,verdictsValid};root.MACA_GROUNDING_CONTRACT=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
