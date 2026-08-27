/* MACA Santé V1 — taxonomie : séparer Grossesse et Santé des femmes.
   Règle produit : une seule rubrique « Santé des femmes » ; les contenus explicitement
   liés à la grossesse sont classés dans « Grossesse ». À charger avant app.js. */
(function(){
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const pregnancy=/\bgrossess|enceinte|femme enceinte|prenatal|prénatal|foetus|fœtus|gestation|maternite|maternité|cmv.*grossess/;
  function reclassify(q){
    if(!q||typeof q!=='object')return;
    const cat=norm(q.category);
    if(!(cat.includes('grossesse')||cat.includes('sante de la femme')||cat.includes('sante des femmes')))return;
    const text=norm(`${q.id||''} ${q.title||''} ${q.keywords||''}`);
    q.category=pregnancy.test(text)?'Grossesse':'Santé des femmes';
  }
  ['healthQuestions','extraAuditedQuestions','auditedQuestionOverrides'].forEach(name=>{
    const arr=window[name]; if(Array.isArray(arr))arr.forEach(reclassify);
  });
})();
