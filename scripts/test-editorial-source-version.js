'use strict';
const assert=require('node:assert/strict'),fs=require('fs'),os=require('os'),path=require('path'),cp=require('child_process');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'maca-source-version-'));
const pipeline=path.resolve(__dirname,'editorial-pipeline.js');
const git=args=>cp.execFileSync('git',args,{cwd:root,stdio:'pipe'});
const version=ref=>cp.execFileSync(process.execPath,['-e','process.stdout.write(require(process.argv[1]).sourceVersion(process.argv[2]||undefined))',pipeline,ref||''],{cwd:root,encoding:'utf8',stdio:'pipe'});
try {
 fs.mkdirSync(path.join(root,'editorial'));
 const source={contents:[{html:'x'.repeat(2*1024*1024)}]};
 const file=path.join(root,'editorial/content.json');
 fs.writeFileSync(file,JSON.stringify(source));
 fs.writeFileSync(path.join(root,'editorial/fiches.json'),JSON.stringify({contents:[]}));
 git(['init']);git(['add','.']);git(['-c','user.name=TEST','-c','user.email=test@example.invalid','commit','-m','Synthetic test fixture']);
 assert.equal(version(),version('HEAD'),'Large source must produce the same local and committed fingerprint');
 source.contents[0].html+=' newer medically validated version';fs.writeFileSync(file,JSON.stringify(source));
 assert.notEqual(version(),version('HEAD'),'A changed medical source must still prevent an obsolete deployment');
 assert.throws(()=>version('missing-ref'),'An unreadable reference must not bypass the source guard');
 console.log('PASS: source above 1 MiB, unchanged fingerprint, changed-source protection and invalid-ref rejection');
} finally {fs.rmSync(root,{recursive:true,force:true});}
