/* MACA Santé — Assistant V2 closed-corpus retrieval baseline.
 * Prototype only. No API, no generation, no access outside assistant-v2/corpus.json.
 * Works in both Node.js and the browser.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.MACA_ASSISTANT_V2_RETRIEVAL=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const STOPWORDS=new Set([
    'a','ai','aie','aient','ainsi','au','aucun','aucune','aux','avec','avoir','c','ca','ce','ces','cet','cette','chez','comme','comment','d','dans','de','des','du','elle','elles','en','encore','est','et','eu','faire','fait','faut','il','ils','j','je','l','la','le','les','leur','leurs','lui','m','ma','mais','me','mes','mon','ne','nos','notre','nous','on','ou','par','pas','peut','plus','pour','qu','que','quel','quelle','quelles','quels','qui','sa','sans','se','ses','si','son','sont','sur','t','ta','te','tes','toi','ton','tous','tout','tres','tu','un','une','vos','votre','vous','y'
  ]);

  function normalize(value){
    return String(value||'')
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .toLowerCase()
      .replace(/[’']/g,' ')
      .replace(/[^a-z0-9]+/g,' ')
      .replace(/\s+/g,' ')
      .trim();
  }

  function stem(token){
    let t=token;
    if(t.length>6&&/(ements|ement)$/.test(t))t=t.replace(/ements?$/,'');
    if(t.length>6&&/(ations|ation)$/.test(t))t=t.replace(/ations?$/,'');
    if(t.length>5&&/(iques|ique)$/.test(t))t=t.replace(/iques?$/,'');
    if(t.length>5&&/(euses|euse|eux)$/.test(t))t=t.replace(/euses?$|eux$/,'');
    if(t.length>5&&/(iennes|ienne|iens|ien)$/.test(t))t=t.replace(/iennes?$|iens?$/,'');
    if(t.length>5&&/(ées|ee|es|s)$/.test(t))t=t.replace(/ees?$|es?$|s$/,'');
    return t.length>=3?t:token;
  }

  function tokens(value,{keepStopwords=false}={}){
    const raw=normalize(value).split(' ').filter(Boolean);
    const out=[];
    for(const token of raw){
      if(!keepStopwords&&STOPWORDS.has(token))continue;
      const s=stem(token);
      if(s.length<2)continue;
      out.push(s);
    }
    return out;
  }

  function termCounts(list){
    const map=new Map();
    for(const term of list)map.set(term,(map.get(term)||0)+1);
    return map;
  }

  function fieldText(card,key){
    if(key==='title')return card.title||'';
    if(key==='keywords')return Array.isArray(card.keywords)?card.keywords.join(' '):'';
    if(key==='answer')return card.content&&card.content.answer||'';
    if(key==='detail')return card.content&&card.content.detail||'';
    if(key==='usefulInfo')return card.content&&card.content.usefulInfo||'';
    if(key==='watch')return card.content&&card.content.watch||'';
    if(key==='category')return [card.primaryCategory].concat(card.categories||[]).join(' ');
    return '';
  }

  const FIELD_WEIGHTS={title:5.5,keywords:4.5,answer:2.2,detail:1.25,usefulInfo:1.1,watch:1.1,category:0.45};
  const FIELD_KEYS=Object.keys(FIELD_WEIGHTS);

  function buildIndex(corpus){
    if(!corpus||!Array.isArray(corpus.cards))throw new Error('Corpus V2 invalide');
    const docs=corpus.cards.map(card=>{
      const fields={};
      const unique=new Set();
      for(const key of FIELD_KEYS){
        const text=fieldText(card,key);
        const list=tokens(text);
        fields[key]={text:normalize(text),tokens:list,counts:termCounts(list),length:list.length};
        list.forEach(term=>unique.add(term));
      }
      return {card,fields,unique};
    });
    const df=new Map();
    for(const doc of docs){
      for(const term of doc.unique)df.set(term,(df.get(term)||0)+1);
    }
    const avgLengths={};
    for(const key of FIELD_KEYS){
      const total=docs.reduce((sum,doc)=>sum+doc.fields[key].length,0);
      avgLengths[key]=Math.max(1,total/Math.max(1,docs.length));
    }
    return {schemaVersion:1,corpusFingerprint:corpus.fingerprint||'',docs,df,avgLengths,size:docs.length};
  }

  function bm25Term(tf,docLen,avgLen,idf,k1=1.35,b=0.72){
    if(!tf)return 0;
    const denom=tf+k1*(1-b+b*(docLen/Math.max(1,avgLen)));
    return idf*((tf*(k1+1))/denom);
  }

  function idfFor(index,term){
    const n=index.size;
    const df=index.df.get(term)||0;
    return Math.log(1+((n-df+0.5)/(df+0.5)));
  }

  function phraseBonus(queryNorm,fieldNorm,weight){
    if(!queryNorm||queryNorm.length<4||!fieldNorm)return 0;
    if(fieldNorm===queryNorm)return weight*1.35;
    if(fieldNorm.includes(queryNorm))return weight;
    return 0;
  }

  function scoreDoc(index,doc,query){
    const qNorm=normalize(query);
    const qTokens=[...new Set(tokens(query))];
    if(!qTokens.length)return {score:0,coverage:0,matchedTerms:[],parts:{}};
    let score=0;
    const parts={};
    const matched=new Set();

    for(const key of FIELD_KEYS){
      const field=doc.fields[key];
      let fieldScore=0;
      for(const term of qTokens){
        const tf=field.counts.get(term)||0;
        if(!tf)continue;
        matched.add(term);
        fieldScore+=bm25Term(tf,field.length,index.avgLengths[key],idfFor(index,term));
      }
      fieldScore*=FIELD_WEIGHTS[key];
      if(key==='title')fieldScore+=phraseBonus(qNorm,field.text,18);
      if(key==='keywords')fieldScore+=phraseBonus(qNorm,field.text,13);
      if(fieldScore>0){parts[key]=Number(fieldScore.toFixed(4));score+=fieldScore;}
    }

    // Reward high query-term coverage. This is useful for natural multi-word symptom queries.
    const coverage=matched.size/qTokens.length;
    if(matched.size>=2)score+=4*coverage;
    if(coverage===1&&qTokens.length>=2)score+=3;

    // Small bonus when several distinct high-signal fields agree.
    const agreeing=['title','keywords','answer','detail'].filter(key=>parts[key]>0).length;
    if(agreeing>=3)score+=Math.min(3,agreeing-1);

    return {
      score:Number(score.toFixed(4)),
      coverage:Number(coverage.toFixed(4)),
      matchedTerms:[...matched],
      parts
    };
  }

  function search(index,query,options={}){
    const topK=Math.max(1,Math.min(20,Number(options.topK)||5));
    const q=normalize(query);
    if(!q)return {query:String(query||''),normalizedQuery:q,results:[],meta:{indexSize:index.size,corpusFingerprint:index.corpusFingerprint}};
    const results=[];
    for(const doc of index.docs){
      const detail=scoreDoc(index,doc,q);
      if(detail.score<=0)continue;
      results.push({
        id:doc.card.id,
        title:doc.card.title,
        primaryCategory:doc.card.primaryCategory,
        categories:doc.card.categories||[],
        url:doc.card.url||'',
        score:detail.score,
        coverage:detail.coverage,
        matchedTerms:detail.matchedTerms,
        scoreParts:detail.parts
      });
    }
    results.sort((a,b)=>b.score-a.score||b.coverage-a.coverage||String(a.title).localeCompare(String(b.title),'fr'));
    return {
      query:String(query||''),
      normalizedQuery:q,
      results:results.slice(0,topK),
      meta:{indexSize:index.size,corpusFingerprint:index.corpusFingerprint,engine:'maca-v2-local-hybrid-bm25-v1'}
    };
  }

  return {normalize,tokens,buildIndex,search,FIELD_WEIGHTS};
});
