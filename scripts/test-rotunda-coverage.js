const assert=require('node:assert/strict'),fs=require('node:fs');
const E=require('../rotunda-engine.js'),bank=require('../rotunda-data.json'),curriculum=require('../rotunda-curriculum.json');
const find=id=>bank.find(p=>p.id==='trivia-'+id);
const examples=[
 ['presidents','Rutherford','Rutherford B. Hayes'],['presidents','Hayes','Rutherford B. Hayes'],['presidents','Rutherfod','Rutherford B. Hayes'],
 ['presidents-last-m','Madson','James Madison'],['presidents-last-m','McKinley','William McKinley'],
 ['presidents-last-m','I think Monroe','James Monroe'],['presidents-last-t','Truman','Harry S. Truman'],
 ['presidents-first-james','Polk','James K. Polk'],['presidents-first-john','JFK','John F. Kennedy'],
 ['presidents-first-james','James Carter','Jimmy Carter'],['presidents-first-william','Bill Clinton','Bill Clinton'],
 ['presidents-vps','LBJ','Lyndon B. Johnson'],['presidents-senators','Obama','Barack Obama'],
 ['presidents-notes','Grant','Ulysses S. Grant'],['presidents-two-names','John Adams','Adams'],
 ['states-letter-m','Massachusets','Massachusetts'],['states-letter-m','MI','Michigan'],
 ['states-letter-n','NY','New York'],['states-letter-w','State of Wyoming','Wyoming'],
 ['federalist-authors','Jay','John Jay'],['federalist-authors','Hamilton','Alexander Hamilton'],
 ['democracy-models','elite','Elite Democracy'],['democracy-models','particpatory','Participatory Democracy'],
 ['democracy-models','pluralism','Pluralist Democracy'],['founding-ideas','republic','Republicanism'],
 ['national-powers','punish piracy','Punish piracy and offenses on the high seas'],
 ['national-powers','post roads','Establish post offices'],['congress-powers','make laws','Pass laws'],
 ['congress-powers','override a veto','Override a veto'],['cabinet-departments','DOJ','Department of Justice'],
 ['government-institutions','Department of State','Federal departments and agencies'],
 ['presidential-informal','social media','Going public'],['presidential-informal','persuasion','Bargaining and persuasion'],
 ['presidential-formal','commander in chief','Command the armed forces'],['federalism-forms','devolution','New Federalism'],
 ['executive-offices','governor','Governor'],['executive-offices','mayor','Mayor'],
 ['legislative-offices','assemblymember','State representative'],['legislative-offices','city councilor','City council member'],
 ['baker-concepts','one man one vote','One person one vote'],['baker-concepts','14th amendment','Fourteenth Amendment'],
 ['baker-concepts','political question','Political question doctrine'],['baker-concepts','reapportionment','Apportionment'],
 ['mcculloch-concepts','elastic clause','Necessary and Proper Clause'],['mcculloch-concepts','implied power','Implied powers'],
 ['mcculloch-concepts','bank','National bank'],['mcculloch-concepts','national supremacy','Supremacy Clause'],
 ['constitutional-clauses','commerce','Commerce Clause'],['constitutional-clauses','full faith and credit','Full Faith and Credit Clause'],
 ['article-i','coin money','Coin money'],['article-i','House','House of Representatives'],
 ['article-i','habeas corpus','Habeas corpus'],['article-ii','SOTU','State of the Union'],
 ['article-ii','Electoral College','Presidential electors'],['article-iii','SCOTUS','Supreme Court'],
 ['article-iii','life tenure','Good behavior tenure'],['article-iii','treason','Treason']
];
for(const [id,input,label]of examples)assert.equal(E.match(find(id),input).answer?.label,label,id+': '+input);
// Every known out-of-category president/state must remain wrong, even when a
// valid name is within the spelling-correction distance (John vs John Quincy).
let excluded=0;for(const p of bank)for(const input of p.rejectedAnswers||[]){assert.equal(E.match(p,input).type,'miss',p.id+': '+input);excluded++;}
for(const [id,input]of [['presidents-first-john','James Madison'],['presidents-last-m','Lincoln'],['presidents-notes','Hamilton'],['states-letter-m','California'],['federalist-authors','Jefferson'],['democracy-models','not elite'],['national-powers','not taxation']])assert.equal(E.match(find(id),input).type,'miss',id+': '+input);
assert.equal(E.match(find('presidents-last-b'),'Martin Van Buren').type,'miss','Van Buren begins with V.');
for(const id of ['presidents','presidents-last-b','presidents-first-george'])assert.equal(E.match(find(id),'Bush').type,'choice');
for(const id of ['baker-concepts','mcculloch-concepts','article-i','article-ii','article-iii'])assert.ok(find(id).answers.length>=4);
assert.equal(E.match(find('article-iii'),'judicial review').type,'miss');
assert.equal(E.match(find('article-ii'),'two term limit').type,'miss');
assert.equal(E.match(find('presidents-first-john'),'Adams').type,'choice');
assert.equal(curriculum.promptsPerDay,7);assert.equal(curriculum.secondsPerPrompt,25);
assert.equal(curriculum.id,'government-categories-20261119');assert.equal(curriculum.previous.id,'course-through-2-3-notes-157');assert.equal(curriculum.effectiveFrom,'2026-11-19');
assert.equal(bank.length,curriculum.bankSize);assert.ok(bank.every(p=>p.answers.length>=3));
const archive=JSON.parse(fs.readFileSync(require('node:path').join(__dirname,'../rotunda-archive.json'),'utf8'));
assert.deepEqual(E.selectBank(bank,archive,curriculum,'2026-11-18'),archive);
for(let d=20;d<=30;d++){const deck=E.courseDeck(bank,curriculum,'2026-11-'+d);assert.equal(deck.length,7);assert.equal(deck.at(-1).kind,'letter-category');}
const drawn=new Set();for(let n=0;n<260;n++){const date=new Date('2026-11-20T12:00:00Z');date.setUTCDate(date.getUTCDate()+n);if([0,6].includes(date.getUTCDay()))continue;for(const p of E.courseDeck(bank,curriculum,date.toISOString().slice(0,10)))drawn.add(p.id);}
assert.deepEqual(bank.filter(p=>!drawn.has(p.id)).map(p=>p.id),[],'Family preferences must not starve any category.');
console.log(`Rotunda coverage: ${examples.length} representative variants, ${excluded} outside-category names, ambiguous surnames, and existing attempts passed.`);

const today=E.courseDeck(bank,curriculum,'2026-11-19');assert.deepEqual(today.map(p=>p.id),curriculum.dailyOverrides['2026-11-19']);assert.deepEqual(today.map(p=>p.answers.length),[45,8,3,7,3,32,14]);assert.ok(today.every(p=>p.answers.length>=3));console.log('Today’s fresh category climb has seven broad prompts and at least three accepted answers each.');

assert.equal(find('executive-offices').answers.find(a=>a.id==='president').basePoints,20);assert.equal(find('executive-offices').answers.find(a=>a.id==='mayor').basePoints,80);
