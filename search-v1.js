// MACA Santé — Recherche V1
// Recherche locale tolérante : mots-clés, variantes usuelles et synonymes simples.
(function(){
  if (typeof searchInput === 'undefined' || !searchInput || typeof healthQuestions === 'undefined') return;

  const STOPWORDS = new Set([
    'a','ai','au','aux','avec','ce','ces','dans','de','des','du','elle','en','est','et','eu','fait','faire','faut','il','je','la','le','les','leur','lui','ma','mais','me','mes','mon','ne','nos','notre','nous','on','ou','par','pas','pour','que','quel','quelle','quels','quelles','qui','sa','se','ses','son','sur','un','une','vos','votre','vous','y','depuis','quand','comment','pourquoi','peut','peux','dois','doit','jai','j ai','cest','c est'
  ]);

  const SYNONYMS = {
    'ventre':['abdominal','abdomen','digestif','digestion','estomac'],
    'mal':['douleur','douloureux'],
    'coeur':['cardiaque','palpitation','palpitations','rythme'],
    'tension':['hypertension','pression','arterielle'],
    'bouton':['boutons','eruption','rash','peau'],
    'demange':['demangeaison','prurit','peau'],
    'toux':['tousser','respiratoire','respiration'],
    'rhume':['nez','nasal','orl'],
    'gorge':['angine','orl','pharynx'],
    'pipi':['urine','urinaire','cystite'],
    'urine':['urinaire','cystite','brulure'],
    'brule':['brulure','brulures'],
    'dormir':['sommeil','insomnie'],
    'dort':['sommeil','insomnie'],
    'fatigue':['fatiguee','fatiguees','fatigues','epuisement'],
    'bebe':['nourrisson','enfant'],
    'enfant':['bebe','nourrisson','pediatrie'],
    'regles':['menstruations','menopause','femme'],
    'bouffee':['menopause','chaleur'],
    'sport':['activite','physique','course','running','marche'],
    'courir':['course','running','sport'],
    'marche':['pas','activite','physique'],
    'medicament':['traitement','paracetamol','ibuprofene'],
    'doliprane':['paracetamol'],
    'advil':['ibuprofene'],
    'tique':['lyme','peau'],
    'cholesterol':['lipides','cardiovasculaire'],
    'diarrhee':['selles','liquides','digestif'],
    'constipation':['selles','transit','digestif'],
    'vomit':['vomissement','vomissements','digestif'],
    'vomissements':['vomir','digestif'],
    'essouffle':['essoufflement','respiration','respiratoire'],
    'migraine':['mal','tete','cephalee'],
    'tete':['cephalee','migraine']
  };

  function clean(value=''){
    return value
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .toLowerCase()
      .replace(/[^a-z0-9%+\s-]/g,' ')
      .replace(/\s+/g,' ')
      .trim();
  }

  function stem(word){
    if(word.length < 5) return word;
    return word
      .replace(/(ements|ement|ations|ation|iques|ique|istes|iste)$/,'')
      .replace(/(es|s)$/,'');
  }

  function queryTokens(value){
    const base = clean(value).split(' ').filter(w => w.length > 1 && !STOPWORDS.has(w));
    const expanded = new Set();
    base.forEach(w => {
      expanded.add(w);
      expanded.add(stem(w));
      (SYNONYMS[w] || []).forEach(s => { expanded.add(s); expanded.add(stem(s)); });
    });
    return [...expanded].filter(Boolean);
  }

  function scoreQuestion(q, originalTerm){
    const title = clean(q.title || '');
    const keywords = clean(q.keywords || '');
    const category = clean(q.category || '');
    const answer = clean(q.answer || '');
    const all = `${title} ${keywords} ${category} ${answer}`;
    const original = clean(originalTerm);
    const tokens = queryTokens(originalTerm);
    if(!original) return 1;

    let score = 0;
    if(title.includes(original)) score += 16;
    if(keywords.includes(original)) score += 12;
    if(all.includes(original)) score += 8;

    tokens.forEach(t => {
      const st = stem(t);
      if(title.includes(t) || title.includes(st)) score += 6;
      if(keywords.includes(t) || keywords.includes(st)) score += 5;
      if(category.includes(t) || category.includes(st)) score += 3;
      if(answer.includes(t) || answer.includes(st)) score += 1;
    });

    // Bonus si plusieurs mots différents de la question sont retrouvés.
    const baseTokens = clean(originalTerm).split(' ').filter(w => w.length > 2 && !STOPWORDS.has(w));
    const matches = baseTokens.filter(w => all.includes(w) || all.includes(stem(w))).length;
    if(matches >= 2) score += matches * 4;

    return score;
  }

  function smartItems(){
    const term = searchInput.value.trim();
    const categoryItems = healthQuestions.filter(q => activeCategory === 'Toutes' || q.category === activeCategory);
    if(!term) return categoryItems;
    return categoryItems
      .map(q => ({q, score: scoreQuestion(q, term)}))
      .filter(x => x.score >= 3)
      .sort((a,b) => b.score - a.score)
      .map(x => x.q);
  }

  function renderSmart(){
    if(!qaGrid) return;
    const items = smartItems();
    qaGrid.innerHTML = items.map(q => `<article class="qa-card" data-qid="${q.id}" tabindex="0"><div class="qa-icon" aria-hidden="true">${iconForQuestion(q)}</div><div><span class="qa-category">${q.category}</span><h3>${q.title}</h3><p>${q.answer}</p><small>${q.source}${q.verifiedAt?` · Vérifié le ${q.verifiedAt}`:''}</small></div><span class="qa-arrow" aria-hidden="true">→</span></article>`).join('');
    if(noResults){
      noResults.hidden = items.length !== 0;
      if(items.length === 0){
        noResults.innerHTML = '<strong>MACA n’a pas encore trouvé de réponse proche.</strong><p>Essayez un mot plus simple ou un synonyme. Nous pourrons ensuite ajouter l’option « proposer cette question à la rédaction ».</p>';
      }
    }
    if(clearSearch) clearSearch.hidden = !searchInput.value;
  }

  searchInput.addEventListener('input', () => setTimeout(renderSmart, 0));
  if(filters) filters.addEventListener('click', () => setTimeout(renderSmart, 0));
  if(clearSearch) clearSearch.addEventListener('click', () => setTimeout(renderSmart, 0));
})();
