/* MACA Corpus V2 — deterministic, non-destructive canonical view.
 * Does NOT rewrite legacy medical source files.
 * Policy: last occurrence of a stable ID wins; otherwise last normalized title wins.
 * Public category is explicit and independent from search keywords.
 */
(function(){
'use strict';
const CATEGORY_MAP={
 'Médicaments':'Santé au quotidien','Prévention':'Cœur & prévention','Prévention & bien-être':'Santé au quotidien',
 'Nutrition':'Santé au quotidien','Symptômes':'Santé au quotidien','Sommeil':'Santé mentale','Sommeil & santé mentale':'Santé mentale',
 'Après 60 ans':'Seniors','Santé des femmes':'Santé des femmes & grossesse','Grossesse & santé des femmes':'Santé des femmes & grossesse',
 'Enfant & bébé':'Enfants & parents','Enfants':'Enfants & parents','Digestion & ventre':'Digestion & urinaire','Digestion & nutrition':'Digestion & urinaire',
 'Santé urinaire':'Digestion & urinaire','Cœur & circulation':'Cœur & prévention','Cœur, circulation & prévention':'Cœur & prévention',
 'Respiration':'Santé au quotidien','Respiration & ORL':'Santé au quotidien','Peau & dermatologie':'Santé au quotidien',
 'Santé de l’homme':'Santé au quotidien','Voyage & prévention':'Santé au quotidien','Vrai ou faux ?':'Santé au quotidien',
 'Santé au quotidien':'Santé au quotidien','Cœur & prévention':'Cœur & prévention','Digestion & urinaire':'Digestion & urinaire',
 'Santé des femmes & grossesse':'Santé des femmes & grossesse','Enfants & parents':'Enfants & parents','Ados':'Ados','Santé mentale':'Santé mentale','Seniors':'Seniors'
};
const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function build(){
 const raw=[].concat(Array.isArray(window.healthQuestions)?window.healthQuestions:[],Array.isArray(window.extraAuditedQuestions)?window.extraAuditedQuestions:[]).filter(Boolean);
 const byKey=new Map();
 raw.forEach((card,index)=>{
   const id=String(card.id||'').trim(); const title=norm(card.title||card.question); const key=id?'id:'+id:'title:'+title;
   if(!key.endsWith(':')) byKey.set(key,{card,index});
 });
 const canonical=[...byKey.values()].sort((a,b)=>a.index-b.index).map(({card})=>{
   const legacy=String(card.publicCategory||card.category||'').trim();
   return Object.freeze(Object.assign({},card,{publicCategory:CATEGORY_MAP[legacy]||legacy}));
 });
 window.MACA_CANONICAL_CORPUS=Object.freeze(canonical);
 return window.MACA_CANONICAL_CORPUS;
}
window.MACA_BUILD_CANONICAL_CORPUS=build;
})();
