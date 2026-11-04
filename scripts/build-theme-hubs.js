'use strict';
// Build public, crawlable thematic hubs and reciprocal Mag/fiche navigation.
// Operates only on generated HTML. Does not edit validated medical source.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {THEMES,classify,norm}=require('./theme-taxonomy');
const ROOT=path.resolve(__dirname,'..'), BASE='https://macasante.fr/';
const read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tokens=s=>new Set(norm(s).split(' ').filter(w=>w.length>=5));
const score=(a,b)=>[...tokens(a)].filter(t=>tokens(b).has(t)).length;
const magContext={window:{}};vm.createContext(magContext);
for(const f of ['magazine-articles.js','magazine-videos.js'])vm.runInContext(read(f),magContext,{filename:f});
const mags=[...(magContext.window.MACA_MAGAZINE_ARTICLES||[]),...(magContext.window.MACA_MAGAZINE_VIDEOS||[])]
 .filter(x=>x.status==='PUBLISHED'&&x.url&&fs.existsSync(path.join(ROOT,x.url)))
 .map(x=>({...x,kind:'mag',topic:classify({category:x.theme,theme:x.theme,title:x.title,keywords:x.keywords})}));
const dir=path.join(ROOT,'fiches-data');
if(!fs.existsSync(dir))throw Error('Missing generated fiches-data directory');
const fiches=fs.readdirSync(dir).filter(f=>f.endsWith('.json')).map(f=>{
 const q=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8')).fiche;
 return {id:q.id,title:q.title||q.question||'',kind:'fiche',category:q.category,topic:classify(q),keywords:q.keywords||[]};
});
if(!fiches.length||!mags.length)throw Error('Missing fiche or Magazine inventory');
const total={fiches:fiches.length,mag:mags.length,topics:{}};
const fUrl=x=>'../fiches-seo/'+encodeURIComponent(x.id)+'.html';
const mUrl=x=>'../'+x.url;
const list=(arr,href)=>'<ul>'+arr.map(x=>'<li><a href="'+escape(href(x))+'">'+escape(x.title)+'</a></li>').join('')+'</ul>';
const style='<style>body{font-family:system-ui,sans-serif;line-height:1.55;margin:0;color:#17392f;background:#fafcf7}header,main,footer{max-width:1050px;margin:auto;padding:20px}h1{font-size:2.2rem}h2{margin-top:2rem}section{border-top:1px solid #dce5d7;margin:24px 0}a{color:#215849}li{margin:7px 0}.columns{display:grid;grid-template-columns:1fr 1fr;gap:36px}@media(max-width:680px){.columns{display:block}}</style>';
const makePage=(title,description,canonical,body)=>'<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(title)+' — MACASANTÉ</title><meta name="description" content="'+escape(description)+'"><meta name="robots" content="index,follow"><link rel="canonical" href="'+canonical+'">'+style+'</head><body><header><a href="../">MACASANTÉ</a> · <a href="../annuaire-fiches.html">Toutes les fiches</a> · <a href="../magazine.html">Le Mag</a> · <a href="index.html">Tous les thèmes</a></header><main>'+body+'</main><footer>Information générale en santé. Ne remplace pas une consultation médicale.</footer></body></html>\n';
const folder=path.join(ROOT,'themes');fs.mkdirSync(folder,{recursive:true});
const toc=[];
for(const t of THEMES){
 const fq=fiches.filter(q=>q.topic.slug===t.slug).sort((a,b)=>a.title.localeCompare(b.title,'fr'));
 const mq=mags.filter(m=>m.topic.slug===t.slug).sort((a,b)=>b.date.localeCompare(a.date));
 total.topics[t.slug]={fiches:fq.length,mag:mq.length};
 const body='<h1>'+escape(t.label)+'</h1><p>Retrouvez les fiches de référence et les décryptages du Magazine sur ce thème.</p><div class="columns"><section><h2>Fiches santé ('+fq.length+')</h2>'+list(fq,fUrl)+'</section><section><h2>Le Mag ('+mq.length+')</h2>'+list(mq,mUrl)+'</section></div>';
 fs.writeFileSync(path.join(folder,t.slug+'.html'),makePage(t.label,'Fiches de référence et articles du Magazine : '+t.label,BASE+'themes/'+t.slug+'.html',body));
 toc.push('<li><a href="'+t.slug+'.html">'+escape(t.label)+'</a> — '+fq.length+' fiches, '+mq.length+' contenus du Mag</li>');
}
fs.writeFileSync(path.join(folder,'index.html'),makePage('Les thèmes santé','Explorez les fiches de référence et les articles du Mag classés par thème.',BASE+'themes/index.html','<h1>Explorer la santé par thème</h1><p>Deux façons complémentaires de comprendre : les fiches et les articles du Mag.</p><ul>'+toc.join('')+'</ul>'));
const START='<!-- MACA_THEME_NAV_START -->',END='<!-- MACA_THEME_NAV_END -->';
function insert(file,markup,tag){
 if(!fs.existsSync(path.join(ROOT,file)))throw Error('Missing '+file);
 let s=read(file);const pattern=new RegExp(START+'[\\s\\S]*?'+END,'g');s=s.replace(pattern,'');
 if(!s.includes(tag))throw Error('Cannot find injection point in '+file);
 s=s.replace(tag,START+markup+END+tag);
 fs.writeFileSync(path.join(ROOT,file),s);
}
for(const f of fiches){
 const same=mags.filter(m=>m.topic.slug===f.topic.slug)
  .map(m=>({m,s:score(f.title,m.title)+(m.referenceFicheId===f.id?100:0)}))
  .filter(x=>x.s>=2).sort((a,b)=>b.s-a.s||b.m.date.localeCompare(a.m.date)).slice(0,3).map(x=>x.m);
 const related=same.length?'<h3>À lire dans le Mag</h3><ul>'+same.map(m=>'<li><a href="../'+escape(m.url)+'">'+escape(m.title)+'</a></li>').join('')+'</ul>':'';
 const nav='<aside aria-label="Explorer ce thème" class="maca-cross-links"><h2>Explorer le thème</h2><p><a href="../themes/'+f.topic.slug+'.html">'+escape(f.topic.label)+' : fiches et articles</a></p>'+related+'</aside>';
 insert('fiches-seo/'+f.id+'.html',nav,'</article>');
}
for(const m of mags){
 const same=fiches.filter(f=>f.topic.slug===m.topic.slug)
  .map(f=>({f,s:score(m.title,f.title)+(m.referenceFicheId===f.id?100:0)}))
  .filter(x=>x.s>=2).sort((a,b)=>b.s-a.s).slice(0,3).map(x=>x.f);
 const related=same.length?'<h3>Fiches de référence associées</h3><ul>'+same.map(f=>'<li><a href="fiches-seo/'+encodeURIComponent(f.id)+'.html">'+escape(f.title)+'</a></li>').join('')+'</ul>':'';
 const nav='<aside aria-label="Explorer ce thème"><h2>Explorer le thème</h2><p><a href="themes/'+m.topic.slug+'.html">'+escape(m.topic.label)+' : fiches et articles</a></p>'+related+'</aside>';
 insert(m.url,nav,'</main>');
}
// Permanent site navigation to the new directory, without changing content.
const hub='<section aria-label="Explorer les thèmes santé"><h2>Explorer les thèmes santé</h2><p><a href="themes/index.html">Toutes les fiches et les articles du Mag, classés par thème</a></p></section>';
for(const file of ['annuaire-fiches.html','magazine.html'])insert(file,hub,'</main>');
fs.mkdirSync(path.join(ROOT,'seo-reports'),{recursive:true});
fs.writeFileSync(path.join(ROOT,'seo-reports/theme-inventory.json'),JSON.stringify(total,null,2)+'\n');
console.log('THEMES '+JSON.stringify(total));
