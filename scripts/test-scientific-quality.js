'use strict';
const assert=require('assert/strict');const {date,due,build}=require('./scientific-quality');
assert.equal(date('25/11/2026'),'2026-11-25');assert.equal(date('2026-11-25T11:55:00+01:00'),'2026-11-25');assert.equal(due('2026-11-30'),'2027-02-28');
const cards=Array.from({length:13},(_,i)=>({id:'a'+i,title:'test '+i,verifiedAt:'20/08/2026',answer:'a',detail:'b',sources:[]}));
const a=build(cards,{},'2026-11-25');assert.equal(a.count,13);assert.equal(a.queue.length,10);assert.equal(a.scientificallyRevalidated,0);assert.equal(a.overdue,13);assert.throws(()=>build([cards[0],cards[0]]));assert.equal(build(cards,{a0:{revision:a.entries[0].revision,review:{status:'REVALIDATED'}}},'2026-11-25').scientificallyRevalidated,0);console.log('PASS scientific quality: deadlines, queue, duplicates, no automatic medical approval');
