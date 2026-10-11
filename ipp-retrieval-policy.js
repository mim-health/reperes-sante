/* Route existing IPP documents by intent, without changing medical content. */
(function(root){
  'use strict';
  function normalize(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();}
  function target(question){
    const q=normalize(question);
    const drug=/\b(ipp|omeprazole|esomeprazole|pantoprazole|lansoprazole|rabeprazole)\b/;
    if(!drug.test(q))return null;
    // Do not force an adult drug document for a pediatric or pregnancy query.
    if(/\b(bebe|nourrisson|enfant|enfants|enceinte|grossesse|allaitement)\b/.test(q))return null;
    if(/\b(arreter|arret|stopper|sevrage|deprescription|diminuer|diminution|reduire|reduction)\b/.test(q))return 'arreter-omeprazole-pantoprazole-ipp';
    if(/\b(longtemps|long cours|long terme|prolonge|prolongee|prolonges|prolongees|duree|annees|ans|mois|dangereux|danger|risques|risque|securite)\b/.test(q)||/^(ipp|omeprazole|esomeprazole|pantoprazole|lansoprazole|rabeprazole)$/.test(q))return 'ipp-long-cours-omeprazole';
    return null;
  }
  root.MACA_IPP_RETRIEVAL={target};
  if(typeof module!=='undefined'&&module.exports)module.exports=root.MACA_IPP_RETRIEVAL;
})(typeof window!=='undefined'?window:globalThis);
