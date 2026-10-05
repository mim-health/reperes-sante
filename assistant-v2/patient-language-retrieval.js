'use strict';

function normalizePatientLanguage(value){
  return String(value||'')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toLowerCase().replace(/œ/g,'oe')
    .replace(/[^a-z0-9]+/g,' ')
    .replace(/\s+/g,' ').trim();
}

function phraseMatch(query,phrase){
  const q=normalizePatientLanguage(query),p=normalizePatientLanguage(phrase);
  if(!q||!p)return false;
  if(q===p)return true;
  const tokenCount=p.split(' ').filter(Boolean).length;
  return tokenCount>=3 && (` ${q} `).includes(` ${p} `);
}

function hasAny(query,list){
  return (list||[]).some(value=>phraseMatch(query,value));
}

function entryAllowed(query,entry){
  if(hasAny(query,entry.excludePhrases))return false;
  if(entry.requiredPhrases&&entry.requiredPhrases.length&&!hasAny(query,entry.requiredPhrases))return false;
  return true;
}

function selectValidatedLanguageMatch(question,cards,registry){
  const q=normalizePatientLanguage(question);
  if(!q)return null;
  const cardList=Array.isArray(cards)?cards:[];
  const byId=new Map(cardList.map(card=>[card.id,card]));

  const titleMatches=cardList.filter(card=>normalizePatientLanguage(card.title)===q);
  if(titleMatches.length===1){
    return {targetId:titleMatches[0].id,key:'canonical-title',level:1,matchType:'exact-title',matched:q};
  }
  if(titleMatches.length>1)return null;

  const groups=[
    {field:'canonicalAliases',level:1,matchType:'validated-alias'},
    {field:'patientPhrases',level:2,matchType:'patient-language'},
    {field:'medicalSynonyms',level:3,matchType:'medical-synonym'}
  ];
  for(const group of groups){
    const matches=[];
    for(const entry of registry?.entries||[]){
      if(!byId.has(entry.targetId)||!entryAllowed(question,entry))continue;
      const matched=(entry[group.field]||[]).find(alias=>phraseMatch(question,alias));
      if(matched)matches.push({targetId:entry.targetId,key:entry.key,level:group.level,matchType:group.matchType,matched});
    }
    const unique=[...new Map(matches.map(item=>[item.targetId,item])).values()];
    if(unique.length===1)return unique[0];
    if(unique.length>1)return null;
  }
  return null;
}

function promoteValidatedMatch(ranked,match,semanticCandidate){
  if(!match)return ranked;
  const rest=(ranked||[]).filter(item=>item.id!==match.targetId);
  const promoted={
    ...(semanticCandidate||{id:match.targetId,similarity:0}),
    id:match.targetId,
    retrievalLevel:match.level,
    retrievalReason:match.matchType,
    matchedAlias:match.matched
  };
  return [promoted,...rest].slice(0,ranked.length||5);
}

module.exports={normalizePatientLanguage,phraseMatch,selectValidatedLanguageMatch,promoteValidatedMatch};
