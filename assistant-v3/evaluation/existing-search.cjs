'use strict';
const fs=require('fs'),r=require('../retrieval'),c=require('../../assistant-v2/corpus.json');
require('../../search-v2-tests-p0.js');
const index=r.buildIndex(c.cards,c.patientLanguageAliases);
const rows=globalThis.MACA_SEARCH_V2_P0_TESTS.map(t=>{const found=r.search(index,t.query);return {question:t.query,expectedIds:t.expectedIds,retrievedIds:found.map(r=>r.id),result:!t.expectedIds.length?'not_comparable':t.expectedIds.some(id=>found.some(r=>r.id===id))?'pass':'fail'};});
const output={mode:'independent-existing-search-cases-lexical-component-only',total:rows.length,pass:rows.filter(r=>r.result==='pass').length,fail:rows.filter(r=>r.result==='fail').length,notComparable:rows.filter(r=>r.result==='not_comparable').length,rows};
fs.writeFileSync('assistant-v3/evaluation/existing-search-results.json',JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({...output,rows:undefined}));
