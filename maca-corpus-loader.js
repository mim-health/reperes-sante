// MACA Santé — point d'entrée unique des ajouts de corpus.
// RÈGLE : toute nouvelle fiche éditoriale validée est ajoutée UNE SEULE FOIS ici.
// index.html et fiches.html chargent tous deux ce manifeste : une fiche ajoutée ici devient donc
// disponible sur l'accueil, dans « Toutes les fiches », la recherche et les catégories.
// Les scripts historiques restent chargés par les pages pendant la migration progressive.
(function(){
  var files = [
    'backlog-audited-pth-elevee-2026-08-23.js?v=20260823-1',
    'backlog-audited-heritage-2026-08-24.js?v=20260824-1',
    'backlog-audited-couchage-nourrisson-2026-08-24.js?v=20260824-1',
    'backlog-audited-cancer-alcool-2026-08-24.js?v=20260824-2',
    'backlog-audited-reseaux-sociaux-jeunes-2026-08-24.js?v=20260824-2',
    'backlog-audited-gluten-ble-diagnostic-2026-08-24.js?v=20260824-2'
  ];
  files.forEach(function(src){ document.write('<script src="'+src+'"><\\/script>'); });
})();