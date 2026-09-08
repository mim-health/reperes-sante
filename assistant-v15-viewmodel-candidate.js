/* MACA Assistant V1.6 — production UI view model, deterministic multi-fiche navigation. */
(function(root){
  'use strict';
  function build(query){
    const selector=root.MACA_SEARCH_V15_LAB;
    if(!selector||typeof selector.select!=='function')throw new Error('MACA V1.6 selector required');
    const selection=selector.select(query);
    if(!selection.primary){
      return {
        status:'none',
        message:'Nous n’avons pas encore de réponse MACA suffisamment fiable à cette question.',
        proposeLabel:'Proposer cette question à MACA',
        exactQuestion:String(query||'').trim(),
        primary:null,
        complements:[],
        choices:[]
      };
    }
    const alternatives=(selection.alternatives||[]).map(x=>x&&x.q).filter(Boolean).slice(0,2);
    if(alternatives.length){
      return {
        status:'choices',
        message:'J’ai trouvé plusieurs fiches MACA qui peuvent correspondre à votre recherche :',
        proposeLabel:null,
        exactQuestion:String(query||'').trim(),
        primary:selection.primary.q,
        complements:[],
        choices:[selection.primary.q,...alternatives].slice(0,3),
        selectionReason:selection.reason
      };
    }
    return {
      status:'match',
      message:'J’ai trouvé une fiche MACA qui semble correspondre à votre recherche :',
      proposeLabel:null,
      exactQuestion:String(query||'').trim(),
      primary:selection.primary.q,
      complements:(selection.complements||[]).slice(0,2),
      choices:[],
      selectionReason:selection.reason
    };
  }
  root.MACA_ASSISTANT_V15_VIEWMODEL={version:'2026-09-08-v16-1',build};
})(typeof window!=='undefined'?window:globalThis);
