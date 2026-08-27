/* MACA Santé V1 — taxonomie pédiatrique unique.
   Fusionne les anciens libellés Enfant & bébé / Enfant et bébé dans Enfants & parents.
   À charger après toutes les sources de fiches et avant app.js. */
(function(){
  const lists=[window.healthQuestions,window.extraAuditedQuestions];
  lists.forEach(function(list){
    if(!Array.isArray(list)) return;
    list.forEach(function(q){
      if(!q || !q.category) return;
      const c=String(q.category).trim().toLowerCase();
      if(c==='enfant & bébé' || c==='enfant et bébé' || c==='enfants & bébé' || c==='enfants et bébé'){
        q.category='Enfants & parents';
      }
    });
  });
})();
