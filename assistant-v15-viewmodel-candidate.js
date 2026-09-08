/* MACA Assistant V1.5 — production UI view model. */
(function(root){
  'use strict';
  function build(query){
    const selector=root.MACA_SEARCH_V15_LAB;
    if(!selector||typeof selector.select!=='function')throw new Error('MACA V1.5 selector required');
    const selection=selector.select(query);
    if(!selection.primary){
      return {
        status:'none',
        message:'Nous n’avons pas encore de réponse MACA suffisamment fiable à cette question.',
        proposeLabel:'Proposer cette question à MACA',
        exactQuestion:String(query||'').trim(),
        primary:null,
        complements:[]
      };
    }
    return {
      status:'match',
      message:'J’ai trouvé une fiche MACA qui semble correspondre à votre recherche :',
      proposeLabel:null,
      exactQuestion:String(query||'').trim(),
      primary:selection.primary.q,
      complements:(selection.complements||[]).slice(0,2),
      selectionReason:selection.reason
    };
  }
  root.MACA_ASSISTANT_V15_VIEWMODEL={version:'2026-09-08-v15-1',build};
})(typeof window!=='undefined'?window:globalThis);
