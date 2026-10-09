'use strict';
const assert=require('assert');const {scoreOpportunity}=require('./opportunity-score.js');const {rankOpportunities}=require('./rank-opportunities.js');
const strong=scoreOpportunity({coverage:'match',demand:90,freshness:90,corpusFit:95,seoPotential:85,socialPotential:75,competitionEase:70});assert(strong.score>=70);assert.strictEqual(strong.action,'DISTRIBUTE_NOW');
assert.strictEqual(scoreOpportunity({coverage:'gap',demand:95,freshness:95,corpusFit:10,seoPotential:90,socialPotential:90,competitionEase:90}).action,'EDITORIAL_GAP');
assert.strictEqual(scoreOpportunity({coverage:'problem',demand:100,freshness:100,corpusFit:100,seoPotential:100,socialPotential:100,competitionEase:100}).action,'FIX_PRODUCT');
const ranked=rankOpportunities([{id:'low',coverage:'match',demand:10,freshness:10,corpusFit:20,seoPotential:10,socialPotential:10,competitionEase:10},{id:'high',coverage:'match',demand:100,freshness:100,corpusFit:100,seoPotential:100,socialPotential:100,competitionEase:100}]);assert.strictEqual(ranked[0].id,'high');console.log('MACA Growth Engine V0: OK');

// Privacy/score boundary regression
assert.strictEqual(scoreOpportunity({coverage:'match',demand:999,freshness:-1,corpusFit:100,seoPotential:100,socialPotential:100,competitionEase:100}).components.demand,100);
