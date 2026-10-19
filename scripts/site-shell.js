'use strict';
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const VERSION='20261019-1';
const themes=[['Prévention & dépistage','Prévention & dépistage'],['Cœur & circulation','Cœur & circulation'],['Femmes & grossesse','Santé des femmes & grossesse'],['Enfants & parents','Enfants & parents'],['Ados','Ados'],['Santé au quotidien','Santé au quotidien'],['Santé mentale','Santé mentale'],['Digestion & urinaire','Digestion & urinaire'],['Os & articulations','Os & articulations'],['Cancer','Cancer'],['Seniors','Seniors']];
const socials=[['Instagram','https://www.instagram.com/macasante_fr/'],['TikTok','https://www.tiktok.com/@romainbeddok']];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function socialLinks(){return `<nav class="maca-social-links" aria-label="MACASANTÉ sur les réseaux sociaux">${socials.map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="MACASANTÉ sur ${name} (nouvel onglet)">${name} <span aria-hidden="true">↗</span></a>`).join('')}</nav>`;}
function header(prefix){return `<a class="ms-skip" href="#maca-page-content">Aller au contenu</a><header class="ms-mobile"><button type="button" class="ms-toggle" aria-label="Ouvrir le menu" aria-controls="ms-sidebar" aria-expanded="false">☰</button><a class="ms-brand" href="/"><img src="${prefix}logo-maca-officiel.svg" width="44" height="44" alt=""><span>MACASANTÉ</span></a><span class="ms-spacer"></span></header><button class="ms-backdrop" type="button" aria-label="Fermer le menu" hidden></button><aside class="ms-sidebar" id="ms-sidebar" aria-label="Navigation du site"><div class="ms-sidebar-top"><a href="/" aria-label="MACASANTÉ — accueil"><img src="${prefix}logo-maca-officiel.svg" width="48" height="48" alt="Logo MACASANTÉ"></a><button class="ms-close" type="button" aria-label="Fermer le menu">×</button></div><a class="ms-question" href="/#questions">＋ Poser une question</a><p class="ms-label">Les fiches santé</p><nav class="ms-themes" aria-label="Grands thèmes des fiches">${themes.map(([label,cat])=>`<a href="${prefix}fiches.html?cat=${encodeURIComponent(cat)}#questions">${esc(label)}</a>`).join('')}</nav><nav class="ms-secondary" aria-label="Découvrir MACASANTÉ"><a href="/">Accueil</a><a href="${prefix}fiches.html">Toutes les fiches</a><a href="${prefix}magazine.html">Le Mag</a><a href="${prefix}notre-histoire.html">Notre histoire</a><a href="${prefix}notre-histoire.html#validation-medicale">Sources et méthode</a></nav><p class="ms-signature">Comprendre pour mieux agir.</p></aside><div class="ms-desktop-brand"><a class="ms-brand" href="/"><img src="${prefix}logo-maca-officiel.svg" width="60" height="60" alt=""><span>MACASANTÉ</span></a></div>`;}
function footer(prefix){return `<footer class="ms-footer"><p>Comprendre pour mieux agir.</p><p>Information générale en santé, sans diagnostic ni conseil médical individualisé. Ne remplace pas une consultation médicale.</p>${socialLinks()}<nav aria-label="Informations du site"><a href="${prefix}notre-histoire.html">Notre histoire</a><a href="${prefix}notre-histoire.html#validation-medicale">Sources et méthode</a><a href="${prefix}mentions-legales.html">Mentions légales</a><a href="${prefix}confidentialite.html">Confidentialité</a><a href="${prefix}credits-photos.html">Crédits photos</a><a href="${prefix}contact.html">Contact</a></nav></footer>`;}
function enhance(html,file){
 if(!/<main\b/i.test(html)||file.startsWith('assistant-v2/'))return html;
 const prefix=file.includes('/')?'../':'';
 // Repair only former homepage destinations; retain each article's own sources.
 html=html.replace(/href="(?:https:\/\/macasante\.fr\/|\/|(?:\.\.\/)?index\.html)#(?:sources|comprendre|a-la-une|chiffre-du-jour)"/g,(m)=>m.includes('#sources')?`href="${prefix}notre-histoire.html#validation-medicale"`:`href="${prefix}magazine.html"`);
 if(file==='index.html'){
  if(!html.includes('class="maca-social-links"'))html=html.replace('</footer>',socialLinks()+'</footer>');
  if(!html.includes('maca-site-shell.css'))html=html.replace('</head>',`<link rel="stylesheet" href="maca-site-shell.css?v=${VERSION}"></head>`);
  return html;
 }
 if(html.includes('data-maca-shell="1"'))return html;
 html=html.replace(/<header\b[^>]*class="site-header"[^>]*>[\s\S]*?<\/header>/i,'');
 html=html.replace(/<body\b([^>]*)>/i,(m,attrs)=>{attrs=/class="/.test(attrs)?attrs.replace(/class="([^"]*)"/,(_,c)=>`class="${c} maca-site-shell"`):attrs+' class="maca-site-shell"';return `<body${attrs} data-maca-shell="1">${header(prefix)}`;});
 html=html.replace(/<main\b([^>]*)>/i,(m,attrs)=>/\bid=/.test(attrs)?m:`<main id="maca-page-content" tabindex="-1"${attrs}>`);
 const mainId=html.match(/<main\b[^>]*\bid="([^"]+)"/i)?.[1];
 if(mainId)html=html.replace('href="#maca-page-content"',`href="#${mainId}"`);
 // Standardize the site footer without matching article-level footers.
 const end=html.lastIndexOf('</main>');
 const tail=html.slice(end+7).replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/i,'');
 html=html.slice(0,end+7)+footer(prefix)+tail;
 html=html.replace('</head>',`<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Newsreader:opsz,wght@6..72,400;6..72,500&amp;display=swap" rel="stylesheet"><link rel="stylesheet" href="${prefix}maca-site-shell.css?v=${VERSION}"></head>`);
 html=html.replace('</body>',`<script src="${prefix}maca-site-shell.js?v=${VERSION}" defer></script></body>`);
 return html;
}
module.exports={enhance,socialLinks,themes};
if(require.main===module){let count=0;const files=fs.readdirSync(ROOT).filter(f=>f.endsWith('.html')).concat(fs.readdirSync(path.join(ROOT,'fiches-seo')).filter(f=>f.endsWith('.html')).map(f=>'fiches-seo/'+f));for(const file of files){const p=path.join(ROOT,file),old=fs.readFileSync(p,'utf8'),next=enhance(old,file);if(next!==old){fs.writeFileSync(p,next);count++;}}console.log('Updated shared navigation on '+count+' pages.');}
