/* Reuse every existing V2 grounding flow against the isolated V3 Worker. */
'use strict';
const fs=require('fs'),Module=require('module'),path=require('path');
const filename=path.resolve('scripts/test-assistant-v2-grounding.js');
let code=fs.readFileSync(filename,'utf8')
 .replace("fs.readFileSync('assistant-v2/cloudflare-worker-public.js'", "fs.readFileSync('assistant-v3/worker-experimental.js'")
 .replace('TextEncoder,crypto:webcrypto,','TextEncoder,TextDecoder,MACA_V3_RETRIEVAL:require(\'../assistant-v3/retrieval\'),MACA_V3_SAFETY:require(\'../assistant-v3/safety\'),crypto:webcrypto,');
const child=new Module(filename,module);child.filename=filename;child.paths=Module._nodeModulePaths(path.dirname(filename));child._compile(code,filename);
