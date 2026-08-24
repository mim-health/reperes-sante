// MACA Santé V1 — enrichissement lexical sans chatbot.
// Ajoute uniquement des formulations grand public aux mots-clés des fiches existantes.
(function(){
  if(Array.isArray(window.healthQuestions)){
    const aliases={
      'fievre-enfant':'fievre bebe bebe chaud temperature haute enfant malade',
      'toux-enfant':'bebe tousse enfant tousse tousse la nuit toux nocturne',
      'diarrhee-enfant':'gastro bebe gastro enfant selles molles selles liquides',
      'bebe-tete-moins':'bebe boit moins boit peu refuse biberon refuse sein mange moins',
      'rash-enfant':'boutons ventre enfant plaques rouges eruption cutanee',
      'hta':'tension haute tension trop haute pression haute pression arterielle hypertension hta',
      'douleur-abdominale':'mal au ventre douleur ventre mal estomac douleur abdominale ventre douloureux',
      'paracetamol':'doliprane paracetamol medicament fievre medicament douleur',
      'ibuprofene-enfant':'advil nurofen ibuprofene anti inflammatoire enfant',
      'antibiotiques':'antibiotique rhume antibio rhume antibiotique virus',
      'pas-jour':'combien de pas par jour marcher marche quotidienne 10000 pas 7000 pas',
      'tique':'morsure tique piqure tique maladie lyme erytheme migrant'
    };
    window.healthQuestions=window.healthQuestions.map(q=>aliases[q.id]?{...q,keywords:`${q.keywords||''} ${aliases[q.id]}`}:q);
  }
  // Point d'entrée commun du corpus : index.html et fiches.html chargent déjà ce fichier
  // avant app.js. Les futures fiches ne doivent donc être référencées que dans
  // maca-corpus-loader.js, jamais ajoutées séparément aux deux pages HTML.
  document.write('<script src="maca-corpus-loader.js?v=20260824-1"><\/script>');
})();
