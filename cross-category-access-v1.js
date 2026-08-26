/* MACA Santé V1 — accès transversal aux fiches sans duplication du contenu.
   Une fiche garde sa catégorie principale mais peut être trouvée/affichée dans d'autres rubriques. */
(function(){
  const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const rules=[
    {match:/melatonine/,cats:['Médicaments','Santé mentale']},
    {match:/statine|cholesterol|\bldl\b/,cats:['Médicaments','Cœur & prévention','Après 60 ans']},
    {match:/contracept|pilule/,cats:['Médicaments','Santé des femmes']},
    {match:/antidepresseur|anxiolytique|benzodiazepine/,cats:['Médicaments','Santé mentale']},
    {match:/sommeil|insomnie/,cats:['Santé mentale','Après 60 ans']},
    {match:/vaccin|vaccination/,cats:['Médicaments','Santé au quotidien']},
    {match:/hypertension|tension arterielle/,cats:['Cœur & prévention','Après 60 ans']},
    {match:/menopause|perimenopause/,cats:['Santé des femmes','Après 60 ans']},
    {match:/senior-endurance-force-equilibre/,cats:['Après 60 ans','Cœur & prévention']}
  ];
  function apply(list){
    if(!Array.isArray(list))return;
    list.forEach(q=>{
      if(!q)return;
      const text=norm(`${q.id||''} ${q.title||''} ${q.keywords||''} ${q.category||''}`);
      const cats=new Set(Array.isArray(q.categories)?q.categories:[q.category].filter(Boolean));
      rules.forEach(r=>{if(r.match.test(text))r.cats.forEach(c=>cats.add(c));});
      q.categories=[...cats];
    });
  }
  apply(window.healthQuestions); apply(window.extraAuditedQuestions);
})();
