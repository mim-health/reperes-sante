'use strict';

import fs from 'node:fs';
import vm from 'node:vm';

const worker=fs.readFileSync(new URL('./cloudflare-worker-public.js',import.meta.url),'utf8');
const start=worker.indexOf('function minimizeQuestion');
const end=worker.indexOf('function questionGraphIntent',start);
if(start<0||end<0)throw new Error('minimizeQuestion not found');
const sandbox={MAX_QUESTION_CHARS:600};
vm.createContext(sandbox);
vm.runInContext(worker.slice(start,end),sandbox);
const m=sandbox.minimizeQuestion;

const cases=[
 ['nom+telephone',"Je m'appelle Jean Dupont, mon téléphone est 06 12 34 56 78",'[telephone]',['06 12 34 56 78']],
 ['email','Écrivez-moi à jean.dupont@example.fr','[email]',['jean.dupont@example.fr']],
 ['adresse',"J'habite 12 rue de la Paix, 75002 Paris",'[adresse]',['12 rue de la Paix','75002']],
 ['naissance','Je suis né le 14/03/1982 et je voudrais comprendre mon résultat','[date]',['14/03/1982']],
 ['url','Voir https://example.org/dossier/ABC123 pour ma question','[lien]',['https://example.org/dossier/ABC123']],
 ['nir','Mon numéro est 1 82 03 75 123 456 78','[identifiant]',['1 82 03 75 123 456 78']],
 ['identifiant','identifiant: AB-1234567890 pour mon dossier','[identifiant]',['AB-1234567890']],
 ['medical','Est-ce que marcher 30 minutes par jour est bon pour la santé?',null,[]]
];
let failed=0;
for(const [name,input,token,forbidden] of cases){
 const out=m(input);
 const ok=(!token||out.includes(token))&&forbidden.every(x=>!out.includes(x))&&out.length<=600;
 console.log(ok?'OK':'FAIL',name,'=>',out);
 if(!ok)failed++;
}
const long=m('x'.repeat(700));
if(long.length!==600){console.log('FAIL length',long.length);failed++;}else console.log('OK length => 600');
if(failed)process.exit(1);
console.log('privacy tests: PASS');
