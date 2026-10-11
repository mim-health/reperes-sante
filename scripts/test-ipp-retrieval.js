'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const s={console,setTimeout,clearTimeout,document:{readyState:'loading',addEventListener(){}},addEventListener(){}};s.window=s;s.globalThis=s;vm.createContext(s);
const run=p=>vm.runInContext(fs.readFileSync(p,'utf8'),s,{filename:p});
run('corpus-manifest.js');s.MACA_CORPUS_MANIFEST.forEach(p=>run(p.split('?')[0]));run('corpus-canonicalizer.js');s.MACA_BUILD_CANONICAL_CORPUS();
const corpus=JSON.parse(fs.readFileSync('assistant-v2/corpus.json','utf8'));
const queries=[
 ['omeprazole depuis longtemps','ipp-long-cours-omeprazole'],
 ['pantoprazole depuis longtemps','ipp-long-cours-omeprazole'],
 ['Je prends de l’oméprazole depuis 10 ans, est-ce dangereux ?','ipp-long-cours-omeprazole'],
 ['IPP au long cours','ipp-long-cours-omeprazole'],
 ['oméprazole','ipp-long-cours-omeprazole'],
 ['Puis-je arrêter mon oméprazole ?','arreter-omeprazole-pantoprazole-ipp'],
 ['arrêter IPP','arreter-omeprazole-pantoprazole-ipp'],
 ['diminuer pantoprazole après plusieurs années','arreter-omeprazole-pantoprazole-ipp']
];
for(const f of ['maca-category-access.js','search-v2-referential-p0.js','search-v2-engine.js','ipp-retrieval-policy.js','search-v2-corpus-fallback.js','search-v2-fatigue-fix.js','search-v2-harcelement-fix.js','search-v2-retrouvabilite-pilot-fix.js','search-v15-lab-candidate.js','search-v2-pqm-retrieval-fix.js'])run(f);
for(const [query,id] of queries)assert.equal(s.MACA_SEARCH_V2.rank(query)[0]?.q.id,id,query);
// Existing 46-case browser acceptance set must still pass with today's full corpus.
const html=fs.readFileSync('search-v2-corpus-fallback-functional.html','utf8');
const cases=vm.runInNewContext(html.match(/const cases=(\[[\s\S]*?\]);/)[1]);
for(const [query,expected] of cases)assert.deepEqual(Array.from(s.MACA_SEARCH_V2.rank(query),x=>x.q.id),Array.from(expected),query);
run('assistant-v2/patient-language-retrieval.js');
for(const [query,id] of queries)assert.equal(s.MACA_PATIENT_LANGUAGE_RETRIEVAL.selectValidatedLanguageMatch(query,corpus.cards,corpus.patientLanguageAliases)?.targetId,id,'Assistant '+query);
for(const query of ['grippe','oméprazole pour mon bébé','IPP grossesse','que fait la pompe à protons ?','oméprazole vaccin grippe'])assert.equal(s.MACA_IPP_RETRIEVAL.target(query),null,query);
for(const id of ['ipp-long-cours-omeprazole','arreter-omeprazole-pantoprazole-ipp'])assert.equal(corpus.cards.find(c=>c.id===id).url,'https://macasante.fr/fiche.html?id='+id);
console.log(JSON.stringify({ok:true,ippQueries:queries.length,browserRegression:cases.length,populationAndUnrelatedGuards:5}));
