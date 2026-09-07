/* MACA Assistant V1.5 — UI view model candidate. NOT WIRED TO PRODUCTION. */
(function(root){
  'use strict';
  function build(query){
    const engine=root.MACA_SEARCH_V15_LAB;
    if(!engine||typeof engine.select!=='function')throw new Error('MACA_SEARCH_V15_LAB.select required');
    const selection=engine.select(query);
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
  root.MACA_ASSISTANT_V15_VIEWMODEL={version:'2026-09-07-v15-candidate1',build};
})(typeof window!=='undefined'?window:globalThis);
