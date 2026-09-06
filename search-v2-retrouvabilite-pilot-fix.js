/* MACA Santé — micro-correctif retrouvabilité suite premier retour diffusion — 06/09/2026.
 * Périmètre strict :
 * 1) "maux de ventre" -> fiche douleur abdominale existante ;
 * 2) bien-être adolescent -> rubrique Ados uniquement après abstention ;
 * 3) règles douloureuses -> rubrique Santé des femmes & grossesse uniquement après abstention.
 * Aucun changement de seuil, scoring général, corpus médical ou abstention globale.
 */
(function(root){
  'use strict';

  const TARGET_ID='douleur-abdominale';
  const ADO_MESSAGE='Nous n’avons pas trouvé de fiche précise pour cette question. Retrouvez nos questions sur la santé des adolescents.';
  const WOMEN_MESSAGE='Nous n’avons pas encore de fiche précise sur cette question. Retrouvez nos questions dans Santé des femmes & grossesse.';

  function plainNorm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}

  function fallbackFor(query){
    const q=plainNorm(query);
    const wellbeing=/\b(bien etre|bienetre)\b/.test(q);
    const adolescent=/\b(ado|ados|adolescent|adolescente|adolescents|adolescentes)\b/.test(q);
    if(wellbeing&&adolescent)return {category:'Ados',message:ADO_MESSAGE};

    const periods=/\b(regle|regles|menstruation|menstruations)\b/.test(q);
    const painful=/\b(douloureux|douloureuse|douloureuses|douleur|douleurs|mal)\b/.test(q);
    if(periods&&painful)return {category:'Santé des femmes & grossesse',message:WOMEN_MESSAGE};
    return null;
  }

  function installEngine(win){
    const base=win&&win.MACA_SEARCH_V2;
    if(!base||typeof base.rank!=='function'||typeof base.resolve!=='function'||base.__macaRetrievabilitePilotFix)return false;
    const baseRank=base.rank.bind(base),baseResolve=base.resolve.bind(base);
    const norm=base.normalize?base.normalize.bind(base):plainNorm;
    function corpus(){return Array.isArray(win.MACA_CANONICAL_CORPUS)?win.MACA_CANONICAL_CORPUS:(Array.isArray(win.healthQuestions)?win.healthQuestions:[]);}
    function isMauxVentre(query){const q=plainNorm(query);return q==='maux de ventre'||q==='j ai des maux de ventre'||q==='jai des maux de ventre'||q==='des maux de ventre';}
    function target(){return corpus().find(q=>q&&q.id===TARGET_ID)||null;}
    function rank(query,options={}){
      if(!isMauxVentre(query))return baseRank(query,options);
      const q=target();if(!q)return [];
      const items=corpus(),index=items.findIndex(x=>x&&x.id===TARGET_ID);
      return [{q,index,score:1180,coverage:1,directCoverage:1,confidence:'high',intentKey:'abdominal-pain',matchedAlias:norm(query)}];
    }
    function resolve(query,options={}){
      if(!isMauxVentre(query))return baseResolve(query,options);
      const q=target();if(!q)return {status:'none',reason:'abdominal-pain-target-missing',matches:[],context:[]};
      return {status:'match',reason:'pilot-maux-ventre-direct',matches:[{intentKey:'abdominal-pain',id:TARGET_ID,score:1180,confidence:'high',matchedAlias:norm(query),matchType:'direct-topic'}],context:[]};
    }
    win.MACA_SEARCH_V2={...base,version:String(base.version||'')+'-retrouvabilite1',resolve,rank,retrievabilityFallback:fallbackFor,__macaRetrievabilitePilotFix:true};
    return true;
  }

  function bindSearchFallback(){
    const ui=root.MACA_SEARCH_V2_UI,input=ui&&ui.input,noResults=document.getElementById('no-results');
    if(!ui||!input||!noResults||input.dataset.macaRetrievabiliteFallback==='1')return false;
    input.dataset.macaRetrievabiliteFallback='1';
    const apply=()=>{
      const query=input.value.trim(),fallback=fallbackFor(query);
      if(!fallback)return;
      const ranked=root.MACA_SEARCH_V2.rank(query);
      if(ranked.length)return;
      noResults.hidden=false;
      noResults.innerHTML='';
      const strong=document.createElement('strong');strong.textContent=fallback.message;noResults.appendChild(strong);
      const p=document.createElement('p'),button=document.createElement('button');
      button.type='button';button.className='filter-chip';button.textContent='Voir la rubrique '+fallback.category;
      button.addEventListener('click',()=>{ui.run(fallback.category);document.querySelector('.library-section')?.scrollIntoView({behavior:'smooth',block:'start'});});
      p.appendChild(button);noResults.appendChild(p);
    };
    input.addEventListener('input',()=>setTimeout(apply,0));
    input.addEventListener('keydown',e=>{if(e.key==='Enter')setTimeout(apply,0);});
    document.getElementById('search-go')?.addEventListener('click',()=>setTimeout(apply,0));
    return true;
  }

  function wireAssistantFrame(frame){
    if(!frame||frame.dataset.macaRetrievabiliteWire==='1')return;
    frame.dataset.macaRetrievabiliteWire='1';
    const attempt=()=>{
      let cw,doc;try{cw=frame.contentWindow;doc=frame.contentDocument;}catch(e){return;}
      if(!cw||!doc)return;
      if(!installEngine(cw)&&(!cw.MACA_SEARCH_V2||!cw.MACA_SEARCH_V2.__macaRetrievabilitePilotFix))return;
      const form=doc.getElementById('form'),input=doc.getElementById('alpha-query');
      if(!form||!input||form.dataset.macaRetrievabiliteFallback==='1')return;
      form.dataset.macaRetrievabiliteFallback='1';
      form.addEventListener('submit',()=>setTimeout(()=>{
        const query=input.value.trim(),fallback=fallbackFor(query);if(!fallback)return;
        const ranked=cw.MACA_SEARCH_V2.rank(query);if(ranked.length)return;
        const bot=doc.getElementById('bot2'),answer=doc.getElementById('answer'),feedback=doc.getElementById('feedback'),wrap=doc.getElementById('suggest-wrap'),choices=doc.getElementById('choices');
        if(bot){bot.hidden=false;bot.textContent=fallback.message;}
        if(answer)answer.style.display='none';if(feedback)feedback.style.display='none';
        if(wrap&&choices){choices.innerHTML='';const title=wrap.querySelector('.suggest-title');if(title)title.textContent='Explorer cette rubrique';const b=doc.createElement('button');b.type='button';b.textContent='Ouvrir la rubrique '+fallback.category+'  →';b.onclick=()=>{root.location.href='fiches.html?category='+encodeURIComponent(fallback.category)+'#questions';};choices.appendChild(b);wrap.style.display='block';}
      },0));
    };
    frame.addEventListener('load',()=>{let tries=0;const timer=setInterval(()=>{attempt();if(++tries>100||frame.contentDocument?.getElementById('form')?.dataset.macaRetrievabiliteFallback==='1')clearInterval(timer);},50);});
    let tries=0;const timer=setInterval(()=>{attempt();if(++tries>100||frame.contentDocument?.getElementById('form')?.dataset.macaRetrievabiliteFallback==='1')clearInterval(timer);},50);
  }

  function watchAssistant(){
    const existing=document.querySelector('.maca-assistant-frame');if(existing)wireAssistantFrame(existing);
    if(!document.body)return;
    new MutationObserver(()=>{const frame=document.querySelector('.maca-assistant-frame');if(frame)wireAssistantFrame(frame);}).observe(document.body,{childList:true,subtree:true});
  }

  installEngine(root);
  root.MACA_RETRIEVABILITY_FALLBACKS={version:'2026-09-06-pilot1',match:fallbackFor};
  window.addEventListener('maca:v2-ui-ready',()=>{bindSearchFallback();watchAssistant();});
  if(document.readyState!=='loading')watchAssistant();else document.addEventListener('DOMContentLoaded',watchAssistant,{once:true});
})(typeof window!=='undefined'?window:globalThis);
