/* DRAFT detection patterns: technical prototype, medical validation pending. */
(function(root){
'use strict';
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').trim();
const RULES=[
 {id:'button-battery',source:'ingestion-produit-toxique-enfant',test:q=>/pile bouton/.test(q)&&/avale|ingere|ingestion/.test(q)},
 {id:'toxic-ingestion',source:'ingestion-produit-toxique-enfant',test:q=>/avale|ingere/.test(q)&&/produit menager|javel|toxique/.test(q)},
 {id:'medication-error',source:'double-prise-medicament',test:q=>(/pris|prise/.test(q)&&/deux fois|double dose/.test(q)&&/medicament|traitement|comprime/.test(q))||/avale trop de comprimes/.test(q)},
 {id:'neurological',source:'avc-signes-risque-apres-50',test:q=>/visage.*deforme.*soudain|bras.*paralyse.*brutal|cote du corps.*faible.*soudain|arrive plus a parler.*minutes/.test(q)},
 {id:'respiratory',source:'essoufflement-adulte',test:q=>/arrive plus a respirer|suffoque|levres.*bleues.*respir|respir.*levres.*bleues/.test(q)},
 {id:'chest',source:'douleur-thoracique-coeur',test:q=>/douleur.*(?:thoracique|poitrine)|oppression.*poitrine/.test(q)&&/brutal|intense|sueur|malaise|manque d air/.test(q)}
];
function detect(question){
 // Evaluate clauses separately: a negated symptom must not mask another positive one.
 const clauses=String(question).split(/[.!?;\n]|\bmais\b/i).map(normalize);
 for(const rule of RULES)for(const q of clauses){if(/^(comment|quels|quelles|pourquoi)\b/.test(q))continue;if(/\b(?:pas de|aucune|jamais eu|n ai pas|n a pas|n est pas|n ai jamais|il y a dix ans)\b/.test(q))continue;if(rule.test(q))return {ruleId:rule.id,sourceId:rule.source,reviewStatus:'PENDING_MEDICAL_REVIEW'};}return null;
}
const api={detect,RULES};root.MACA_V3_SAFETY=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
