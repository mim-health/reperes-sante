/* MACA Santé — canonical category access shared by library search, filters and assistant. */
(function(root){
  'use strict';
  const PUBLIC=['Ados','Cancer','Cœur & prévention','Digestion & urinaire','Enfants & parents','Santé au quotidien','Santé des femmes & grossesse','Santé mentale','Seniors'];
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const aliases=new Map();
  function add(name,...values){[name,...values].forEach(v=>aliases.set(norm(v),name));}
  add('Ados','ado','adolescents','adolescent');
  add('Cancer','cancers','oncologie','cancérologie','cancerologie');
  add('Cœur & prévention','coeur prevention','cœur prévention','coeur et prevention','cœur et prévention');
  add('Digestion & urinaire','digestion urinaire','digestion et urinaire');
  add('Enfants & parents','enfants parents','enfants et parents');
  add('Santé au quotidien','sante au quotidien');
  add('Santé des femmes & grossesse','sante des femmes grossesse','sante des femmes et grossesse');
  add('Santé mentale','sante mentale');
  add('Seniors','senior','apres 60 ans','après 60 ans');

  function canonicalName(value){return aliases.get(norm(value))||null;}
  function valuesOf(q){
    if(!q)return [];
    const values=[q.publicCategory,q.category,q.primaryCategory];
    if(Array.isArray(q.sections))values.push(...q.sections);
    return values.filter(Boolean);
  }
  function categoriesOf(q){
    const out=[];
    valuesOf(q).forEach(value=>{const canonical=canonicalName(value);if(canonical&&!out.includes(canonical))out.push(canonical);});
    return out;
  }
  function primaryCategoryOf(q){
    if(!q)return'Santé au quotidien';
    /* The editorial source category is authoritative when it already names a
       public rubric (notably Cancer). publicCategory may contain an older
       compatibility mapping such as Cancer -> Santé au quotidien. */
    return canonicalName(q.category)||canonicalName(q.primaryCategory)||canonicalName(q.publicCategory)||categoriesOf(q)[0]||'Santé au quotidien';
  }
  function matchQuery(query){return canonicalName(query);}
  function itemsFor(category,corpus){
    const canonical=canonicalName(category);
    if(!canonical||!Array.isArray(corpus))return [];
    return corpus.filter(q=>categoriesOf(q).includes(canonical));
  }
  function idsFor(category,corpus){return itemsFor(category,corpus).map(q=>q&&q.id).filter(Boolean);}

  root.MACA_CATEGORY_ACCESS={PUBLIC:[...PUBLIC],normalize:norm,canonicalName,matchQuery,categoriesOf,primaryCategoryOf,itemsFor,idsFor};
})(typeof window!=='undefined'?window:globalThis);
