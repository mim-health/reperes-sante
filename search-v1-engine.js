/* MACA Santé — Search V1 generic engine. Library only; deterministic and corpus-driven. */
(function(){
  'use strict';

  const norm = value => String(value || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();

  const STOPWORDS = new Set([
    'a','ai','au','aux','avec','ce','ces','dans','de','des','du','elle','en','est','et','fait','faire','faut','il','je','la','le','les','ma','mais','me','mes','mon','ne','nous','on','ou','par','pas','pour','que','quel','quelle','qui','sa','se','ses','son','sur','un','une','vous','votre','depuis','quand','comment','pourquoi','peut','peux','dois','doit','jai','cest','estce','avoir','chez'
  ]);

  /* One transversal synonym dictionary. Add concepts here, never query-specific ranking rules. */
  const CONCEPT_GROUPS = [
    ['tension','hypertension','hta','pression arterielle'],
    ['sommeil','dormir','dors','dort','endormir','endormissement','insomnie','apnee du sommeil'],
    ['sang dans les selles','sang selles','rectorragie','saignement digestif','sang rectal'],
    ['tete qui tourne','tete tourne','vertige','vertiges','etourdissement','etourdissements','malaise'],
    ['mal de tete','cephalee','cephalees','migraine','migraines'],
    ['aphte','aphtes','ulcere buccal','ulcere bouche'],
    ['diarrhee','selles liquides','gastro'],
    ['constipation','transit lent','selles dures'],
    ['coeur','cardiaque','cardiovasculaire'],
    ['cholesterol','ldl','hypercholesterolemie'],
    ['sport','activite physique','marche','course','courir'],
    ['bebe','nourrisson'],
    ['enfant','pediatrie','pediatrique'],
    ['rhume','nez bouche','rhinopharyngite'],
    ['toux','tousser'],
    ['urine','urinaire','cystite','pipi'],
    ['paracetamol','doliprane'],
    ['ibuprofene','advil','nurofen'],
    ['tique','lyme'],
    ['acouphene','acouphenes','bourdonnement','sifflement']
  ].map(group => group.map(norm));

  function tokens(value){
    return norm(value).split(' ').filter(w => w.length > 1 && !STOPWORDS.has(w));
  }

  function phraseConcept(query){
    const q = norm(query);
    let best = null;
    for(const group of CONCEPT_GROUPS){
      for(const phrase of group){
        if(phrase.includes(' ') && (q === phrase || q.includes(phrase))){
          if(!best || phrase.length > best.phrase.length) best = {phrase, group};
        }
      }
    }
    return best?.group || null;
  }

  function tokenConcepts(token){
    return CONCEPT_GROUPS.filter(group => group.some(phrase => tokens(phrase).includes(token)));
  }

  function semanticTerms(query){
    const out = new Set();
    const phraseGroup = phraseConcept(query);
    if(phraseGroup) phraseGroup.forEach(p => tokens(p).forEach(t => out.add(t)));
    tokens(query).forEach(token => tokenConcepts(token).forEach(group => group.forEach(p => tokens(p).forEach(t => out.add(t)))));
    return [...out];
  }

  function fields(q){
    return {
      title: norm(q.title || q.question),
      keywords: norm(q.keywords),
      category: norm(q.publicCategory || q.category),
      answer: norm(q.answer)
    };
  }

  function containsToken(text, token){
    return text.split(' ').includes(token) || (token.length >= 5 && text.split(' ').some(w => w.startsWith(token) || token.startsWith(w)));
  }

  function scoreQuestion(q, query){
    const nq = norm(query);
    const base = tokens(query);
    const semantic = semanticTerms(query).filter(t => !base.includes(t));
    const f = fields(q);
    if(!base.length) return {score:0, coverage:0, directCoverage:0};

    let score = 0;
    let directHits = 0;
    let semanticHits = 0;

    if(f.title === nq) score += 1200;
    else if(f.title.includes(nq) && nq.length >= 4) score += 700;
    if(f.keywords.includes(nq) && nq.length >= 4) score += 420;

    for(const t of base){
      let direct = false;
      if(containsToken(f.title,t)){ score += 150; direct = true; }
      else if(containsToken(f.keywords,t)){ score += 90; direct = true; }
      else if(containsToken(f.category,t)){ score += 24; direct = true; }
      else if(containsToken(f.answer,t)){ score += 6; direct = true; }
      if(direct) directHits++;
    }

    for(const t of semantic){
      if(containsToken(f.title,t)){ score += 70; semanticHits++; }
      else if(containsToken(f.keywords,t)){ score += 40; semanticHits++; }
      else if(containsToken(f.category,t)){ score += 10; semanticHits++; }
      else if(containsToken(f.answer,t)){ score += 2; }
    }

    const directCoverage = directHits / base.length;
    const coverage = Math.min(1, (directHits + Math.min(semanticHits, base.length)) / base.length);

    if(base.length >= 2){
      if(directCoverage === 1) score += 360;
      else if(directCoverage >= 0.5 && coverage >= 1) score += 180;
    }

    return {score, coverage, directCoverage};
  }

  function rank(query){
    const corpus = Array.isArray(window.healthQuestions) ? window.healthQuestions : [];
    const base = tokens(query);
    if(!base.length) return [];

    const scored = corpus.map((q,index) => ({q,index,...scoreQuestion(q,query)}));
    const meaningful = scored.filter(item => {
      if(base.length === 1) return item.score >= 70;
      return item.score >= 110 && item.coverage >= 0.67;
    }).sort((a,b) => b.score - a.score || a.index - b.index);

    if(!meaningful.length) return [];
    const top = meaningful[0].score;

    /* Precision guard: after a strong direct match, keep only results that are
       genuinely close to the best score instead of filling the grid with weak matches. */
    const strongDirectMatch = meaningful[0].directCoverage === 1 && top >= 500;
    const relativeFloor = strongDirectMatch ? 0.60 : 0.18;
    const floor = Math.max(base.length === 1 ? 70 : 110, top * relativeFloor);

    return meaningful.filter(item => item.score >= floor).slice(0,8);
  }

  function card(q){
    return `<article class="qa-card" data-qid="${q.id}" tabindex="0"><div class="qa-icon" aria-hidden="true">＋</div><div><span class="qa-category">${q.publicCategory || q.category || ''}</span><h3>${q.title || q.question || ''}</h3><p>${q.answer || ''}</p><small>${q.source || ''}${q.verifiedAt ? ` · Vérifié le ${q.verifiedAt}` : ''}</small></div><span class="qa-arrow" aria-hidden="true">→</span></article>`;
  }

  function render(){
    const input = document.querySelector('#search-input');
    const grid = document.querySelector('#qa-grid');
    const empty = document.querySelector('#no-results');
    if(!input || !grid) return;
    const query = input.value.trim();
    if(!query) return;

    const ranked = rank(query);
    grid.innerHTML = ranked.map(item => card(item.q)).join('');
    if(empty){
      empty.hidden = ranked.length > 0;
      empty.innerHTML = ranked.length ? '' : '<strong>Nous n’avons pas encore de fiche correspondant à cette recherche.</strong><p>Essayez un autre mot-clé ou explorez les rubriques.</p>';
    }
  }

  function init(){
    const input = document.querySelector('#search-input');
    if(!input) return;
    input.addEventListener('input', e => { e.stopImmediatePropagation(); render(); }, true);
    input.addEventListener('keydown', e => {
      if(e.key === 'Enter'){
        e.preventDefault();
        e.stopImmediatePropagation();
        render();
      }
    }, true);
    if(input.value) render();
  }

  window.MACA_SEARCH_V1 = {rank, scoreQuestion};
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();