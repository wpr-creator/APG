const assert=require('node:assert/strict');
const bank=require('../rotunda-data.json'),E=require('../rotunda-engine.js'),review=require('./audits/rotunda-rarity-review.json');
const tiers=[20,40,60,80,100];
assert.deepEqual(review.categories.map(p=>p.id),bank.map(p=>p.id),'Every live question needs an explicit rarity review.');
let answers=0,pairs=0;
for(const p of bank){
 const reviewed=review.categories.find(q=>q.id===p.id);
 assert.equal(reviewed.prompt,p.prompt);assert.ok(reviewed.rationale.length>30);
 assert.deepEqual(reviewed.answers,p.answers.map(({id,label,basePoints})=>({id,label,basePoints})),p.id+': keep the reviewed scoring and authoring sources in sync.');
 assert.equal(new Set(p.answers.map(a=>a.id)).size,p.answers.length,p.id+': answer IDs must be unique for scoring and saved results.');
 const values=p.answers.map(a=>a.basePoints);assert.equal(Math.min(...values),20,p.id+': a familiar answer must give a small bump.');// Ties are deliberate when all answers are similarly familiar.

 for(const a of p.answers){
  assert.ok(tiers.includes(a.basePoints),p.id+': '+a.id);
  // Early players get the curated starting reward, independent of category size.
  assert.equal(E.answerPoints(p,a.id,1,1),a.basePoints,p.id+': first answer');
  assert.equal(E.answerPoints(p,a.id,1,4),a.basePoints,p.id+': small class sample');
  // As the class grows, repeatedly used answers shrink and uncommon answers rise.
  const all=E.answerPoints(p,a.id,100,100),rare=E.answerPoints(p,a.id,1,100);
  assert.equal(all,20,p.id+': an answer everybody uses is common');assert.ok(rare>all,p.id+': less used answers climb farther');
  let previous=100;for(const count of [1,5,10,20,40,60,80,100]){const points=E.answerPoints(p,a.id,count,100);assert.ok(points<=previous,p.id+': popularity must never increase the reward');previous=points;}
  answers++;
 }
 // Test every within-question ordering rather than just President versus Mayor.
 for(const a of p.answers)for(const b of p.answers)if(a.basePoints<b.basePoints){assert.ok(E.answerPoints(p,a.id,1,1)<E.answerPoints(p,b.id,1,1),p.id+': '+a.label+' / '+b.label);pairs++;}
}
const examples=[
 ['national-powers','Tax','Set weights and measures'],['roles','Commander in chief','Party leader'],
 ['founding-documents','Constitution','Federalist No. 39'],['democracy-models','Participatory Democracy','Elite Democracy'],
 ['states-letter-m','Michigan','Montana'],['states-letter-c','California','Connecticut'],
 ['federalist-authors','Alexander Hamilton','John Jay'],['committee-types','Standing Committee','Joint committee'],
 ['article-i','Congress','Congressional journals'],['article-ii','President','Commission federal officers'],
 ['article-iii','Supreme Court','Two witnesses for treason'],
 ['baker-concepts','Equal Protection Clause','Political question doctrine'],
 ['mcculloch-concepts','Implied powers','Intergovernmental tax immunity']
];
for(const [id,common,rare]of examples){const p=bank.find(p=>p.id==='trivia-'+id);assert.equal(p.answers.find(a=>a.label===common)?.basePoints,20,id);assert.equal(p.answers.find(a=>a.label===rare)?.basePoints,({roles:80,'states-letter-c':80,'democracy-models':60})[id]||100,id);}
console.log(`Rotunda rarity: ${bank.length} reviewed questions, ${answers} answer groups, ${pairs} within-question comparisons; first-player rewards, class frequency and monotonic scoring passed.`);

const score=(id,label)=>bank.find(p=>p.id==='trivia-'+id).answers.find(a=>a.label===label).basePoints;
assert.equal(score('branches','Judicial branch'),score('branches','Executive branch'));
assert.equal(score('declaration-rights','Life'),score('declaration-rights','Pursuit of happiness'));
assert.ok(score('notes-presidential-media','Social media')<score('notes-presidential-media','Radio'));
assert.ok(score('notes-convention-plans','Great Compromise')<score('notes-convention-plans','New Jersey Plan'));
assert.ok(score('notes-senate-confirmed-offices','Federal judge')<score('notes-senate-confirmed-offices','Ambassador'));
assert.ok(score('notes-bill-stopping-points','Presidential veto')<score('notes-bill-stopping-points','Senate floor'));
assert.equal(score('notes-mcculloch-clauses','Necessary and Proper Clause'),score('notes-mcculloch-clauses','Supremacy Clause'));
