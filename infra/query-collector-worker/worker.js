/* MACA Santé — Worker V1 de collecte minimisée. Aucune donnée d'identité utilisateur n'est demandée ni stockée. */
const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const FICHE_RE=/^[a-z0-9][a-z0-9-]{0,119}$/;
const MAX_BODY=4096;
const MAX_QUERY=250;
const MAX_IDS=20;

function allowedOrigins(env){
  return new Set(String(env.ALLOWED_ORIGINS||'https://macasante.fr,https://www.macasante.fr').split(',').map(s=>s.trim()).filter(Boolean));
}
function cors(origin){return {'Access-Control-Allow-Origin':origin,'Vary':'Origin','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'86400','Cache-Control':'no-store'};}
function response(status,origin,body=''){return new Response(body,{status,headers:origin?cors(origin):{'Cache-Control':'no-store'}});}
function sanitizeQuery(value){
  let text=String(value||'').replace(/\s+/g,' ').trim().slice(0,MAX_QUERY);
  text=text.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,'[email]');
  text=text.replace(/(?:\+33|0)[\s.\-]?[1-9](?:[\s.\-]?\d{2}){4}/g,'[telephone]');
  text=text.replace(/\b\d{1,2}[/.\-]\d{1,2}[/.\-]\d{2,4}\b/g,'[date]');
  text=text.replace(/\b\d{6,}\b/g,'[nombre]');
  return text;
}
function cleanIds(values){return [...new Set((Array.isArray(values)?values:[]).map(v=>String(v||'').trim().slice(0,120)).filter(v=>FICHE_RE.test(v)).slice(0,MAX_IDS))];}
async function handlePost(request,env,origin){
  const declared=Number(request.headers.get('content-length')||0);if(declared>MAX_BODY)return response(413,origin);
  const raw=await request.text();if(raw.length>MAX_BODY)return response(413,origin);
  let data;try{data=JSON.parse(raw);}catch(_){return response(400,origin);}
  if(!data||typeof data!=='object')return response(400,origin);

  if(data.event_type==='query'){
    const eventId=String(data.event_id||'');if(!UUID_RE.test(eventId))return response(400,origin);
    const surface=data.surface==='assistant'?'assistant':data.surface==='search'?'search':null;if(!surface)return response(400,origin);
    const query=sanitizeQuery(data.query_text);if(!query)return response(400,origin);
    const result=data.result==='no_result'?'no_result':data.result==='result'?'result':null;if(!result)return response(400,origin);
    const ids=cleanIds(data.proposed_ids);
    const route=data.route_kind==='category'?'category':'engine';
    const engineVersion=String(data.engine_version||'').slice(0,120);
    const collectorVersion=String(data.collector_version||'').slice(0,80);
    await env.DB.prepare(`INSERT OR IGNORE INTO query_events (event_id,surface,query_text,result,proposed_ids,proposed_count,engine_version,route_kind,collector_version) VALUES (?,?,?,?,?,?,?,?,?)`).bind(eventId,surface,query,result,JSON.stringify(ids),ids.length,engineVersion,route,collectorVersion).run();
    return response(204,origin);
  }

  if(data.event_type==='open'){
    const queryEventId=String(data.query_event_id||'');const ficheId=String(data.fiche_id||'').slice(0,120);
    if(!UUID_RE.test(queryEventId)||!FICHE_RE.test(ficheId))return response(400,origin);
    await env.DB.prepare(`INSERT OR IGNORE INTO open_events (query_event_id,fiche_id) SELECT ?,? WHERE EXISTS (SELECT 1 FROM query_events WHERE event_id=?)`).bind(queryEventId,ficheId,queryEventId).run();
    return response(204,origin);
  }
  return response(400,origin);
}

export default {
  async fetch(request,env){
    const origin=request.headers.get('Origin')||'';
    if(!allowedOrigins(env).has(origin))return response(403,'');
    if(request.method==='OPTIONS')return response(204,origin);
    if(request.method!=='POST')return response(405,origin);
    try{return await handlePost(request,env,origin);}catch(_){return response(503,origin);}
  },
  async scheduled(_event,env){
    await env.DB.prepare(`DELETE FROM open_events WHERE query_event_id IN (SELECT event_id FROM query_events WHERE created_at < datetime('now','-90 days'))`).run();
    await env.DB.prepare(`DELETE FROM query_events WHERE created_at < datetime('now','-90 days')`).run();
  }
};
