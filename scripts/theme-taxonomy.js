'use strict';
// Shared editorial taxonomy for navigation only. Never changes approved medical text.
const THEMES=[
 {slug:'prevention',label:'Prévention & dépistage',aliases:['prevention','depistage','vaccination','infectiologie','tabac','sante sexuelle','voyage']},
 {slug:'coeur-circulation',label:'Cœur & circulation',aliases:['coeur','cardio','circulation','vasculaire','hypertension','cholesterol','statine']},
 {slug:'femmes-grossesse',label:'Femmes & grossesse',aliases:['femme','grossesse','gynecologie','menopause','fertilite','maternelle','sein']},
 {slug:'enfants-parents',label:'Enfants & parents',aliases:['enfant','bebe','pediatrie','nouveau ne','parent','bronchiolite']},
 {slug:'adolescents',label:'Adolescents',aliases:['ado','adolescent','puberte','scolaire']},
 {slug:'sommeil-mental',label:'Sommeil & santé mentale',aliases:['sommeil','insomnie','anxiete','depression','psy','mental','stress','narcolepsie']},
 {slug:'digestion-nutrition',label:'Digestion & nutrition',aliases:['digestion','digestif','nutrition','alimentation','intestin','foie','microbiote','obesite','diabete','poids']},
 {slug:'os-articulations',label:'Os & articulations',aliases:['os','articulation','rhumato','entorse','fracture','arthrose','osteoporose','lombalgie']},
 {slug:'cancer',label:'Cancer',aliases:['cancer','oncologie','oncogenetique','tumeur','metastase']},
 {slug:'seniors',label:'Seniors',aliases:['senior','geriat','apres 60','alzheimer','parkinson','vieillissement']},
 {slug:'quotidien',label:'Santé au quotidien',aliases:['quotidien','medicament','premiers secours','symptome','dermatologie','peau','neurologie','respiration','pneumologie','orl','ophtalmologie','vision','oreilles','urinair','rein','nephrologie','asthme','migraine','sante homme','bien etre','securite']}
];
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const broad=new Set(['quotidien','fiche du jour','a la une','a lire en 3 min','donnees','vrai ou faux','faux','chiffre du jour','2 minutes','recherche','actualite sante','prevention']);
function classify(item){
 const id=norm(item.category||item.primaryCategory||item.theme);
 const alt=norm(item.theme||'');
 const text=norm([item.title,item.keywords?.join(' ')].filter(Boolean).join(' '));
 // Prefer specific metadata from the primary category, then the Mag theme.
 for(const field of [id,alt]){
  if(!field||broad.has(field))continue;
  const found=THEMES.find(t=>t.slug!=='quotidien'&&t.aliases.some(a=>field.includes(norm(a))));
  if(found)return found;
 }
 // Generic or editorial-only themes: infer conservatively from topic title.
 for(const t of THEMES){
  if(t.slug==='quotidien')continue;
  if(t.aliases.some(a=>norm(a).length>=5 && text.split(' ').includes(norm(a))))return t;
 }
 const generic=THEMES.find(t=>t.slug==='quotidien');
 return generic;
}
module.exports={THEMES,classify,norm};
