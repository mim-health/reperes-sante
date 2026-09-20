/* MACA Patient Question Map — retrieval patch candidate — 20/09/2026.
 * Scope: only validated PQM #1 cards already present in the canonical corpus.
 * No corpus medical change, no global threshold/scoring change.
 * Conservative disease + intent routing. Must pass P0 non-regression + PQM replay before promotion.
 */
(function(root){
'use strict';
const base=root.MACA_SEARCH_V2;if(!base||typeof base.resolve!=='function'||typeof base.rank!=='function')throw new Error('MACA_SEARCH_V2 required');
const baseResolve=base.resolve.bind(base),baseRank=base.rank.bind(base);
const norm=base.normalize?base.normalize.bind(base):(v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim());
const corpus=()=>Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:[];
const byId=id=>corpus().find(x=>x&&x.id===id)||null;
function has(q,re){return re.test(q);}
function route(query){
 const q=norm(query);
 const mici=has(q,/\b(mici|crohn|rch|rectocolite)\b/), diab=has(q,/\b(diabete|diabetique|diabetiques)\b/), alz=has(q,/\b(alzheimer|demence|trouble neurocognitif)\b/);
 if(mici){
   if(has(q,/\b(alimentation|aliment|aliments|manger|mange|regime|nutrition|diversifier|diversification|variee|varie|plaisir)\b/)&&has(q,/\b(poussee|diversifier|diversification|variee|varie|plaisir|alimentation|manger)\b/))return ['mici-alimentation-poussee','pqm-mici-alimentation'];
   if(has(q,/\b(travail|employeur|collegue|collegues|emploi)\b/))return ['maladie-chronique-travail-confidentialite','pqm-mici-travail'];
   if(has(q,/\b(voyage|voyager|avion|sejour)\b/))return ['maladie-chronique-voyage','pqm-mici-voyage'];
 }
 if(diab){
   if(has(q,/\b(pied|pieds|plaie|ulcere|chaussure|podologue)\b/))return ['diabete-pied-prevention','pqm-diabete-pied'];
   if(has(q,/\b(sport|activite physique|effort|exercice|glycemie|hypoglycemie|hypoglycemique)\b/))return ['diabete-activite-physique-glycemie','pqm-diabete-activite'];
   if(has(q,/\b(travail|employeur|collegue|collegues|emploi)\b/))return ['maladie-chronique-travail-confidentialite','pqm-diabete-travail'];
   if(has(q,/\b(voyage|voyager|avion|sejour)\b/))return ['maladie-chronique-voyage','pqm-diabete-voyage'];
 }
 if(alz&&has(q,/\b(refus|refuse|toilette|habiller|habillage|manger|repas)\b/))return ['alzheimer-refus-soins-repas','pqm-alzheimer-refus'];
 return null;
}
function forced(query,spec){
 const card=byId(spec[0]);if(!card)return null;
 return {status:'match',reason:'pqm-validated-intent',matches:[{intentKey:spec[1],id:card.id,score:1180,confidence:'high',matchedAlias:norm(query),matchType:'pqm-disease-intent'}],context:[]};
}
function resolve(query,options={}){const spec=route(query);if(!spec)return baseResolve(query,options);return forced(query,spec)||baseResolve(query,options);}
function rank(query,options={}){const spec=route(query);if(!spec)return baseRank(query,options);const r=forced(query,spec);if(!r)return baseRank(query,options);const card=byId(spec[0]),items=corpus();return [{q:card,index:items.indexOf(card),score:1180,coverage:1,directCoverage:1,confidence:'high',intentKey:spec[1],matchedAlias:norm(query)}];}
root.MACA_SEARCH_V2={...base,version:String(base.version||'')+'-pqm1retrieval1',resolve,rank,__macaPqmRetrieval:true};
})(typeof window!=='undefined'?window:globalThis);
