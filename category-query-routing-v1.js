/* MACA Santé V1 — routage d'une recherche vers une rubrique.
   Si le terme saisi correspond clairement au nom / alias d'une rubrique,
   la rubrique est activée et la recherche textuelle est vidée afin d'afficher
   toutes ses fiches. La recherche reste ensuite strictement dans cette rubrique. */
(function(){
  const aliases={
    'Ados':['ado','ados','adolescent','adolescents','adolescence'],
    'Après 60 ans':['60 ans','senior','seniors','personne agee','personnes agees'],
    'Cœur & circulation':['coeur','cardio','cardiaque','circulation'],
    'Digestion & ventre':['digestion','digestif','digestive','ventre'],
    'Enfants & parents':['enfant','enfants','parent','parents','pediatrie'],
    'Santé mentale':['mental','mentale','mentales','mentaux','sante mentale','psy','psychique'],
    'Santé urinaire':['urinaire','urine','urologie'],
    'Peau & dermatologie':['peau','dermatologie','dermato'],
    'Respiration & ORL':['respiration','respiratoire','orl'],
    'Yeux & vision':['yeux','oeil','oeils','vision','ophtalmo']
  };
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  function init(){
    const input=document.querySelector('#search-input');
    const filters=document.querySelector('#category-filters');
    if(!input||!filters)return;
    let timer;
    input.addEventListener('input',()=>{
      clearTimeout(timer);
      timer=setTimeout(()=>{
        const q=norm(input.value);
        if(!q)return;
        let category=null;
        for(const [cat,terms] of Object.entries(aliases)){
          if(norm(cat)===q||terms.some(t=>norm(t)===q)){category=cat;break;}
        }
        if(!category)return;
        const chip=[...filters.querySelectorAll('.filter-chip')].find(b=>norm(b.dataset.category||b.textContent)===norm(category));
        if(!chip)return;
        /* Utilise le gestionnaire natif d'app.js : activeCategory est ainsi réellement modifié. */
        chip.click();
        input.value='';
        input.dispatchEvent(new Event('input',{bubbles:true}));
        input.focus();
      },120);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
