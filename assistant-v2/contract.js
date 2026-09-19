/* MACA Santé — Assistant IA V2 closed synthesis contract.
 * Prototype isolé : validation déterministe des sorties du modèle.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.MACA_ASSISTANT_V2_CONTRACT=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const STATUSES=['answer','category_only','abstain'];
  const COVERAGE=['sufficient','partial','insufficient'];

  const OUTPUT_SCHEMA={
    type:'object',
    properties:{
      status:{type:'string',enum:STATUSES},
      coverage:{type:'string',enum:COVERAGE},
      blocks:{
        type:'array',
        items:{
          type:'object',
          properties:{
            text:{type:'string'},
            card_ids:{type:'array',items:{type:'string'}}
          },
          required:['text','card_ids'],
          additionalProperties:false
        }
      },
      category:{type:['string','null']},
      personalized_request:{type:'boolean'},
      scope_note:{type:'string'},
      reason:{type:'string'}
    },
    required:['status','coverage','blocks','category','personalized_request','scope_note','reason'],
    additionalProperties:false
  };

  function clean(value){return typeof value==='string'?value.trim():'';}
  function uniq(values){return [...new Set(values)];}

  function validate(raw,allowedCards,options={}){
    const allowedIds=new Set((allowedCards||[]).map(card=>typeof card==='string'?card:card&&card.id).filter(Boolean));
    const errors=[];
    if(!raw||typeof raw!=='object'||Array.isArray(raw))return {ok:false,errors:['Sortie structurée absente ou invalide'],normalized:null};

    if(!STATUSES.includes(raw.status))errors.push('status invalide');
    if(!COVERAGE.includes(raw.coverage))errors.push('coverage invalide');
    if(!Array.isArray(raw.blocks))errors.push('blocks doit être un tableau');
    if(typeof raw.personalized_request!=='boolean')errors.push('personalized_request doit être booléen');
    if(typeof raw.scope_note!=='string')errors.push('scope_note doit être une chaîne');
    if(typeof raw.reason!=='string')errors.push('reason doit être une chaîne');
    if(!(raw.category===null||typeof raw.category==='string'))errors.push('category invalide');

    const blocks=[];
    const used=[];
    if(Array.isArray(raw.blocks)){
      raw.blocks.forEach((block,index)=>{
        if(!block||typeof block!=='object'){
          errors.push(`block ${index} invalide`);return;
        }
        const text=clean(block.text);
        const ids=Array.isArray(block.card_ids)?uniq(block.card_ids.map(clean).filter(Boolean)):[];
        if(!text)errors.push(`block ${index} sans texte`);
        if(!ids.length)errors.push(`block ${index} sans card_ids`);
        for(const id of ids){
          if(!allowedIds.has(id))errors.push(`block ${index} cite une fiche non fournie: ${id}`);
          used.push(id);
        }
        blocks.push({text,card_ids:ids});
      });
    }

    const cardsUsed=uniq(used);
    if(raw.status==='answer'){
      if(!blocks.length)errors.push('answer sans block sourcé');
      if(!cardsUsed.length)errors.push('answer sans fiche utilisée');
      if(raw.coverage==='insufficient')errors.push('answer avec coverage insufficient');
    }
    if(raw.status==='category_only'){
      if(!clean(raw.category))errors.push('category_only sans catégorie');
      if(blocks.length)errors.push('category_only ne doit contenir aucun block médical');
      if(cardsUsed.length)errors.push('category_only ne doit citer aucune fiche');
    }
    if(raw.status==='abstain'){
      if(blocks.length)errors.push('abstain ne doit contenir aucun block médical');
      if(cardsUsed.length)errors.push('abstain ne doit citer aucune fiche');
      if(raw.coverage!=='insufficient')errors.push('abstain doit avoir coverage insufficient');
    }
    if(raw.personalized_request&&raw.status==='answer'&&!clean(raw.scope_note)){
      errors.push('requête personnalisée répondue sans scope_note');
    }

    const personalizedForbidden=/(?:\bvous devez\b|\btu dois\b|\bprenez\b|\barrêtez\b|\bcommencez\b|\bchangez de\b|\ballez\b|\bconsultez\b|\bappelez\b|\bfaites\b|\brendez-vous\b|\badressez-vous\b|\bje vous conseille\b|\bdans (?:votre|ton) cas\b|\bpour (?:vous|toi)\b.{0,80}\b(?:adapt[ée]e?|préférable|meilleur(?:e)?|choix|prendre|choisir)\b|\b(?:meilleur(?:e)?|préférable|adapt[ée]e?)\b.{0,80}\bpour (?:vous|toi)\b)/i;
    const answerText=blocks.map(block=>block.text).join(' ').trim();
    if(options.rejectDirectPersonalAdvice!==false&&raw.personalized_request&&personalizedForbidden.test(answerText)){
      errors.push('formulation de conseil individualisé détectée');
    }

    const normalized={
      status:raw.status,
      coverage:raw.coverage,
      answer:answerText,
      blocks,
      cards_used:cardsUsed,
      category:raw.category===null?null:clean(raw.category),
      personalized_request:Boolean(raw.personalized_request),
      scope_note:clean(raw.scope_note),
      reason:clean(raw.reason)
    };
    return {ok:errors.length===0,errors,normalized};
  }

  return {STATUSES,COVERAGE,OUTPUT_SCHEMA,validate};
});
