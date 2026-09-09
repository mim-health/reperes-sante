/* MACA Assistant V1.6 — production UI view model, deterministic multi-fiche navigation. */
(function(root){
  'use strict';
  const norm=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  function genericCoughChoices(query){
    const q=norm(query);
    const hasCough=/\b(toux|tousse|tousses|tousser|toussent|toussez|toussait|toussant)\b/.test(q);
    const specific=/\b(enfant|bebe|nourrisson|fils|fille|seche|sec|crachat|irritative|dure|longtemps|persistante|persistant|chronique|prolongee|prolonge|sang|hemoptysie)\b/.test(q);
    if(!hasCough||specific)return null;
    const corpus=Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:[];
    const byId=id=>corpus.find(card=>card&&card.id===id)||null;
    return ['toux-seche-que-faire','toux-prolongee-adulte','toux-enfant'].map(byId).filter(Boolean);
  }
  function build(query){
    const coughChoices=genericCoughChoices(query);
    if(coughChoices&&coughChoices.length){
      return {
        status:'choices',
        message:'J’ai trouvé plusieurs fiches MACA sur la toux. Choisissez celle qui correspond le mieux à votre recherche :',
        proposeLabel:null,
        exactQuestion:String(query||'').trim(),
        primary:coughChoices[0],
        complements:[],
        choices:coughChoices.slice(0,3),
        selectionReason:'p0-generic-cough-choices'
      };
    }
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
  root.MACA_ASSISTANT_V15_VIEWMODEL={version:'2026-09-09-coughp0-2',build};
})(typeof window!=='undefined'?window:globalThis);
