/* MACA Santé — multi-section exposure layer.
   One canonical fiche stays one object/ID/URL; this only adds secondary display sections. */
(function(){
'use strict';
const RULES=[
 {section:'Après 60 ans',re:/\b(ath[eé]rome|avc|accident vasculaire|cholest[eé]rol|hypertension|tension art[eé]rielle|statine|activit[eé] physique|marche|chute|m[eé]moire|vaccin|zona|grippe|pneumocoque|alcool|vin|sommeil|d[eé]nutrition|ost[eé]oporose)\b/i},
 {section:'Cœur & prévention',re:/\b(ath[eé]rome|avc|accident vasculaire|cholest[eé]rol|hypertension|tension art[eé]rielle|cardio|cœur|coeur|art[eè]re|thromb|phl[eé]bite|activit[eé] physique|marche)\b/i},
 {section:'Santé mentale',re:/\b(d[eé]pression|anxi[eé]t[eé]|angoisse|stress|sommeil|insomnie|suicid|harc[eè]lement|moral)\b/i},
 {section:'Ados',re:/\b(ado|adolescent|pubert[eé]|harc[eè]lement|r[eé]seaux sociaux|contraception|acn[eé])\b/i},
 {section:'Santé des femmes & grossesse',re:/\b(grossesse|enceinte|m[eé]nopause|contraception|fertilit[eé]|post[- ]partum|endom[eé]triose|r[eè]gles)\b/i},
 {section:'Enfants & parents',re:/\b(enfant|b[eé]b[eé]|nourrisson|parent|p[eé]diatr)\b/i},
 {section:'Médicaments',re:/\b(m[eé]dicament|parac[eé]tamol|ibuprof[eè]ne|antibiotique|statine|traitement|ordonnance)\b/i}
];
function decorate(items){
 if(!Array.isArray(items))return items;
 return items.map(q=>{
  const primary=q.category;
  const text=[q.title,q.keywords,q.answer,q.category].filter(Boolean).join(' ');
  const sections=[primary];
  for(const rule of RULES){if(sections.length>=3)break;if(rule.section!==primary&&rule.re.test(text))sections.push(rule.section);}
  return {...q,primaryCategory:primary,sections:[...new Set(sections)]};
 });
}
window.MACA_ADD_MULTI_SECTIONS=decorate;
})();