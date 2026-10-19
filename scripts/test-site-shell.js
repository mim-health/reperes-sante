'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {enhance}=require('./site-shell');
const files=fs.readdirSync('.').filter(f=>f.endsWith('.html')).concat(fs.readdirSync('fiches-seo').filter(f=>f.endsWith('.html')).map(f=>'fiches-seo/'+f));
let count=0;
for(const file of files){const html=fs.readFileSync(file,'utf8');if(!html.includes('data-maca-shell="1"')&&file!=='index.html')continue;
 assert.equal(enhance(html,file),html,'Idempotent shell: '+file);
 assert(!/href="(?:\/|https:\/\/macasante\.fr\/)#(?:sources|comprendre|a-la-une|chiffre-du-jour)"/.test(html),'Old homepage anchor: '+file);
 if(file!=='index.html'){
  assert.equal((html.match(/id="ms-sidebar"/g)||[]).length,1,file);
  assert.equal((html.match(/<main\b/g)||[]).length,1,file);
  assert.equal((html.match(/class="ms-footer"/g)||[]).length,1,file);
  assert(html.includes('aria-controls="ms-sidebar"'),file);
  const skip=html.match(/class="ms-skip" href="#([^"]+)"/)[1];assert(html.includes('id="'+skip+'"'),file);
 }
 for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
  const url=match[1];if(/^(?:https?:|data:|mailto:|tel:|\/)/.test(url))continue;
  const asset=decodeURIComponent(url.split(/[?#]/)[0]);if(!asset)continue;
  // Shell assets and navigation targets must resolve from nested SEO pages too.
  if(/maca-site-shell|logo-maca-officiel|^(?:\.\.\/)?(?:fiches|magazine|notre-histoire|mentions-legales|confidentialite|credits-photos|contact)\.html/.test(asset))assert(fs.existsSync(path.resolve(path.dirname(file),asset)),file+': '+asset);
 }
 count++;
}
assert(count>450);
const sample='<html><head></head><body><header class="site-header">Old menu</header><main><h1>Example</h1><p>Medical text</p><a href="/#sources">Sources</a></main></body></html>';
const generated=enhance(sample,'fiches-seo/example.html');assert(generated.includes('<h1>Example</h1><p>Medical text</p>'));assert(generated.includes('href="../notre-histoire.html#validation-medicale"'));
console.log('PASS: '+count+' pages, idempotent shell, skip links, nested assets, legacy anchors and preserved content.');
