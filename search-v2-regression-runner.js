/* MACA Santé — browser regression runner for Search V2 P0. */
(function(root){
  'use strict';
  function run(cases=root.MACA_SEARCH_V2_P0_TESTS||[]){
    if(!root.MACA_SEARCH_V2) throw new Error('MACA_SEARCH_V2 missing');
    const failures=[];
    for(const test of cases){
      const got=root.MACA_SEARCH_V2.rank(test.query).map(item=>item.q.id);
      const expected=test.expectedIds||[];
      if(JSON.stringify(got)!==JSON.stringify(expected)){
        failures.push({query:test.query,expected,got,resolution:root.MACA_SEARCH_V2.resolve(test.query)});
      }
    }
    const report={total:cases.length,passed:cases.length-failures.length,failed:failures.length,failures};
    if(root.console) console.table(failures.map(f=>({query:f.query,expected:f.expected.join(' | '),got:f.got.join(' | ')})));
    return report;
  }
  root.MACA_SEARCH_V2_RUN_REGRESSION=run;
})(typeof window!=='undefined'?window:globalThis);
