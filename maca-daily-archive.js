// MACA Santé — capitalisation des contenus quotidiens vers la bibliothèque permanente.
// Un contenu dont la date de publication est passée devient une fiche Questions & réponses.
(function(){
  const today = new Date().toISOString().slice(0,10);
  const dailyItems = [
    {
      id:'daily-vf-cortisol-2026-08-21',
      publishDate:'2026-08-21',
      library:{
        id:'q-cortisol-stress-fatigue',
        category:'Prévention & bien-être',
        title:'Quand on est stressé ou fatigué, faut-il faire baisser son cortisol ?',
        answer:'Non. Le cortisol est une hormone indispensable et le stress ou la fatigue ne prouvent pas un excès pathologique. Un véritable hypercortisolisme relève d’un contexte médical précis.',
        watch:'Un dosage du cortisol n’est pas un test de routine pour une fatigue ou un stress isolés ; il se discute selon le contexte clinique.',
        source:'Inserm · Société Française d’Endocrinologie · vérifié le 21/08/2026',
        url:'https://presse.inserm.fr/canal-detox/faut-il-vraiment-reguler-son-cortisol/?theme=sante-mentale',
        keywords:'cortisol stress fatigue hypercortisolisme cushing hormone stress chronique dosage cortisol'
      }
    },
    {
      id:'daily-number-tinnitus-2026-08-21',
      publishDate:'2026-08-21',
      library:{
        id:'q-acouphenes-frequence',
        category:'Respiration & ORL',
        title:'Combien de personnes sont concernées par les acouphènes ?',
        answer:'Environ un adulte sur cinq est concerné par des acouphènes. Chez certaines personnes, ils peuvent avoir un retentissement important sur le sommeil, la concentration ou la qualité de vie.',
        watch:'Des acouphènes persistants, unilatéraux, pulsatiles ou associés à une baisse auditive justifient une évaluation médicale adaptée.',
        source:'Haute Autorité de Santé · vérifié le 21/08/2026',
        url:'https://www.has-sante.fr/',
        keywords:'acouphenes oreilles sifflement bourdonnement audition orl sommeil un sur cinq 1 sur 5'
      }
    }
  ];

  const expired = dailyItems.filter(item => item.publishDate < today).map(item => item.library);
  if(!expired.length) return;

  const existing = [
    ...(window.healthQuestions || []),
    ...(window.extraAuditedQuestions || [])
  ];
  const normalize = (s='') => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const exists = (candidate) => existing.some(q => q.id===candidate.id || normalize(q.title||'')===normalize(candidate.title));
  const additions = expired.filter(item => !exists(item));
  if(additions.length){
    window.extraAuditedQuestions = [...(window.extraAuditedQuestions || []), ...additions];
  }
})();
