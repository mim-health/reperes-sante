'use strict';
const {scoreOpportunity}=require('./opportunity-score.js');
function rankOpportunities(items,limit=5){return (items||[]).map(item=>({...item,...scoreOpportunity(item)})).sort((a,b)=>b.score-a.score).slice(0,Math.max(1,Number(limit)||5));}
module.exports={rankOpportunities};
if(require.main===module){let raw='';process.stdin.setEncoding('utf8');process.stdin.on('data',c=>raw+=c);process.stdin.on('end',()=>process.stdout.write(JSON.stringify(rankOpportunities(raw.trim()?JSON.parse(raw):[],5),null,2)+'\n'));}
