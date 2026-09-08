/* MACA Assistant V1.6 — production language adapter + deterministic multi-fiche navigation. */
(function(root){
  'use strict';
  const base=root.MACA_SEARCH_V2;
  if(!base)throw new Error('MACA_SEARCH_V2 required');
  if(base.__macaV15LanguageFix&&root.MACA_SEARCH_V15_LAB&&typeof root.MACA_SEARCH_V15_LAB.select==='function'&&root.MACA_SEARCH_V15_LAB.__macaMultiFiche)return;
  const norm=base.normalize||function(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();};
  const corpus=()=>Array.isArray(root.MACA_CANONICAL_CORPUS)?root.MACA_CANONICAL_CORPUS:[];
  const byId=id=>corpus().find(q=>q&&q.id===id)||null;
  const baseResolve=base.resolve.bind(base),baseRank=base.rank.bind(base);
  function direct(id,intentKey,query,reason){if(!byId(id))return null;return {status:'match',reason,matches:[{intentKey,id,score:1180,confidence:'high',matchedAlias:norm(query),matchType:'v15-targeted-language'}],context:[]};}
  function safetyAbstain(query){const q=norm(query);return /\b(quel|quelle|quels|quelles)\b.*\bantibiotique\b/.test(q)&&!/(gorge|angine|trod)/.test(q);}
  function cystitisLanguage(q){const urinary=/\b(pipi|urin|urine|uriner|urinaire|urinaires)\b/.test(q);const burning=/\b(brule|brulure|brulures)\b/.test(q);const frequent=/\b(envie|envies|souvent|frequent|frequente|frequentes|frequemment)\b/.test(q);return /\bcystite\b/.test(q)||/\binfection urinaire\b/.test(q)||(urinary&&(burning||frequent));}
  function targeted(query){
    const q=norm(query);
    if(/\b(estomac|ventre)\b/.test(q)&&/\b(brule|brulure|brulures)\b/.test(q)&&/\b(remonte|remontee|remontees|acide)\b/.test(q))return direct('reflux-adulte','reflux',query,'v15-reflux-language');
    if(cystitisLanguage(q))return direct('cystite-femme','cystitis',query,'v15-cystitis-language');
    if(/\bimmunotherapie\b/.test(q)&&/\bcancer\b/.test(q))return direct('cancer-immunotherapie-comment-ca-marche','cancer-immunotherapy',query,'v15-cancer-immunotherapy-language');
    if(/\b(varice|varices)\b/.test(q)&&/\b(contention|compression|bas)\b/.test(q))return direct('varices-contention-disparaitre','varices-compression',query,'v15-varices-compression-language');
    return null;
  }
  function resolve(query,options={}){if(safetyAbstain(query))return {status:'none',reason:'v15-safety-generic-antibiotic',matches:[],context:[]};return targeted(query)||baseResolve(query,options);}
  function rank(query,options={}){
    if(safetyAbstain(query))return [];
    const targetedResult=targeted(query);if(!targetedResult)return baseRank(query,options);
    const map=new Map(corpus().map((q,index)=>[q.id,{q,index}]));
    return targetedResult.matches.map(m=>{const f=map.get(m.id);return f?{q:f.q,index:f.index,score:m.score,coverage:1,directCoverage:1,confidence:m.confidence,intentKey:m.intentKey,matchedAlias:m.matchedAlias}:null;}).filter(Boolean);
  }
  const promoted={...base,version:String(base.version||'')+'-v15language3',resolve,rank,__macaV15LanguageFix:true};
  root.MACA_SEARCH_V2=promoted;

  const complementRules=[
    {when:/\b(remontee|remontees|reflux|rgo|acide|acides)\b/,primary:'reflux-adulte',ids:['douleur-abdominale']},
    {when:/\b(mal|maux|douleur)\b.*\b(tete)\b/,primary:'maux-tete',ids:['migraine-que-faire']},
    {when:/\b(bourdonnement|bourdonnements|acouphene|acouphenes)\b.*\b(vertige|vertiges|tourne)\b|\b(vertige|vertiges|tourne)\b.*\b(bourdonnement|bourdonnements|acouphene|acouphenes)\b/,primary:'acouphenes-adulte',ids:['vertiges-causes']}
  ];

  const NAV_STOPWORDS=new Set(['a','ai','au','aux','avec','ce','ces','dans','de','des','du','elle','en','est','et','fait','faire','faut','il','je','j','la','le','les','ma','mais','me','mes','mon','ne','nous','on','ou','par','pas','pour','que','quel','quelle','qui','sa','se','ses','son','sur','un','une','vous','votre','depuis','quand','comment','pourquoi','peut','peux','dois','doit','jai','cest','estce','avoir','chez']);
  function navTokens(value){return norm(value).split(' ').filter(w=>w.length>1&&!NAV_STOPWORDS.has(w));}
  function tokenEq(a,b){if(a===b)return true;const strip=x=>x.length>=5?x.replace(/(es|s)$/,''):x;return strip(a)===strip(b);}
  function queryCore(query){return norm(query).replace(/^(j ai|jai|je|mon|ma|mes|un|une|le|la|les)\s+/,'').trim();}
  const populationGroups=[
    ['baby',/\b(bebe|nourrisson)\b/],
    ['child',/\b(enfant|fils|fille)\b/],
    ['adolescent',/\b(ado|adolescent|adolescente|jeune|jeunes)\b/],
    ['female',/\b(femme|femmes|enceinte|grossesse)\b/],
    ['male',/\b(homme|hommes)\b/],
    ['senior',/\b(senior|seniors|personne agee|personnes agees|apres 60 ans|apres 65 ans)\b/]
  ];
  function populationCompatible(query,title){
    const q=norm(query),t=norm(title);
    for(const [,rx] of populationGroups){if(rx.test(t)&&!rx.test(q))return false;}
    return true;
  }
  function navigationAlternatives(query,primary){
    if(!primary||!primary.q)return [];
    const qTokens=navTokens(query);if(qTokens.length<2)return [];
    const core=queryCore(query);
    const rows=[];
    for(const card of corpus()){
      if(!card||!card.id||card.id===primary.q.id)continue;
      const title=String(card.title||card.question||'');if(!title||!populationCompatible(query,title))continue;
      const titleTokens=navTokens(title);if(!titleTokens.length)continue;
      const hits=qTokens.filter(qt=>titleTokens.some(tt=>tokenEq(qt,tt))).length;
      const coverage=hits/qTokens.length;
      const phrase=core.length>=8&&norm(title).includes(core);
      if(!(phrase||(hits>=2&&coverage===1)))continue;
      const keywordTokens=navTokens(card.keywords||'');
      const keywordHits=qTokens.filter(qt=>keywordTokens.some(kt=>tokenEq(qt,kt))).length;
      const score=(phrase?1000:0)+(hits*100)+(keywordHits*10)-Math.max(0,titleTokens.length-hits);
      rows.push({q:card,score,matchType:phrase?'title-phrase':'title-token-coverage'});
    }
    return rows.sort((a,b)=>b.score-a.score||String(a.q.title||'').localeCompare(String(b.q.title||''),'fr')).slice(0,2);
  }

  function select(query,options={}){
    const engine=root.MACA_SEARCH_V2;
    const ranked=engine.rank(query,options);
    const primary=ranked[0]||null;
    if(!primary)return {primary:null,complements:[],alternatives:[],reason:'no-primary'};
    const q=norm(query);
    const rule=complementRules.find(r=>r.primary===primary.q.id&&r.when.test(q));
    if(rule){
      const complements=rule.ids.map(byId).filter(Boolean).filter(x=>x.id!==primary.q.id).slice(0,2);
      if(complements.length)return {primary,complements,alternatives:[],reason:'v15-explicit-complements'};
    }
    const alternatives=navigationAlternatives(query,primary);
    return {primary,complements:[],alternatives,reason:alternatives.length?'v16-multi-fiche-navigation':'primary-only'};
  }
  root.MACA_SEARCH_V15_LAB={...promoted,version:promoted.version+'-selector2',select,__macaMultiFiche:true};
})(typeof window!=='undefined'?window:globalThis);
