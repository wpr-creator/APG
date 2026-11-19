const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const E=require('../rotunda-engine.js'),root=path.join(__dirname,'..');
const bank=JSON.parse(fs.readFileSync(path.join(root,'rotunda-data.json'),'utf8'));
assert.equal(bank.length,157);assert.equal(new Set(bank.map(p=>p.id )).size,157);
for(const unit of [1,2])assert.ok(bank.some(p=>p.unit===unit));assert.ok(bank.every(p=>p.unit<=2));
for(const p of bank){assert.ok(p.prompt&&p.hint&&p.answers.length>=1);assert.ok(fs.existsSync(path.join(root,p.href.split('#')[0])));const names=new Map();for(const a of p.answers){assert.ok(a.id&&a.label&&a.explanation&&Array.isArray(a.aliases));for(const name of [a.label,...a.aliases]){const n=E.normalize(name);assert.ok(!names.has(n)||names.get(n)===a.id,p.id+': conflicting alias '+name);names.set(n,a.id);assert.equal(E.match(p,name).answer.id,a.id);}}assert.equal(E.match(p,'totally unrelated nonsense').type,'miss');assert.equal(E.match(p,'').type,'empty');}
const energy=bank.find(p=>p.id==='energy');assert.equal(E.match(energy,'unty').type,'correct');assert.equal(E.match(energy,'duratoin').type,'correct');assert.equal(E.match(energy,'adequate suport').type,'correct');assert.equal(E.match(energy,'adequate support').type,'correct');
assert.equal(E.match(bank.find(p=>p.id==='district-cases'),'Baker versus Carr').answer.label,'Baker v. Carr');
assert.deepEqual(E.deck(bank,'daily','all','2026-11-19'),E.deck(bank,'daily','all','2026-11-19'));assert.equal(E.deck(bank,'daily','all','2026-11-19').length,7);assert.notDeepEqual(E.deck(bank,'daily','all','2026-11-19').map(p=>p.id),E.deck(bank,'daily','all','2026-11-20').map(p=>p.id));
const curriculum=JSON.parse(fs.readFileSync(path.join(root,'rotunda-curriculum.json'),'utf8'));
assert.equal(E.courseBank(bank,curriculum).length,bank.length);
assert.equal(E.courseBank([...bank,{id:'future',lesson:'2.4',apTopics:['2.8']}],curriculum).length,bank.length);
const recent=new Set();let date=new Date('2026-11-19T20:00:00Z'),days=0;while(days<22){if(E.schoolSchedule(date).open){for(const q of E.courseDeck(bank,curriculum,E.dateKey(date))){assert.ok(!recent.has(q.id),'Exact prompt repeats inside 22 school days: '+q.id);recent.add(q.id);}days++;}date.setUTCDate(date.getUTCDate()+1);}
assert.equal(E.courseDeck(bank,curriculum,'2026-11-19').length,7);assert.deepEqual(E.courseDeck(bank,curriculum,'2026-11-19'),E.courseDeck(bank,curriculum,'2026-11-19'));
for(const p of bank){assert.ok(curriculum.lessons.includes(p.lesson));assert.ok(p.apTopics.length);}
for(const [iso,open,active,next]of[['2026-11-20T20:00:00Z',true,'2026-11-20','2026-11-23'],['2026-11-21T20:00:00Z',false,'2026-11-20','2026-11-23'],['2026-11-22T20:00:00Z',false,'2026-11-20','2026-11-23'],['2026-11-23T20:00:00Z',true,'2026-11-23','2026-11-24']]){const schedule=E.schoolSchedule(new Date(iso));assert.equal(schedule.open,open);assert.equal(schedule.activeDate,active);assert.equal(schedule.nextDate,next);}
assert.equal(E.dateKey(new Date('2026-11-20T07:59:00Z')),'2026-11-19');assert.equal(E.dateKey(new Date('2026-11-20T08:00:00Z')),'2026-11-20');
console.log('Rotunda: 157 course-scoped prompts, all answer aliases, wording and typo matching, daily ordering, Pacific rollover, lesson/AP topic limits and weekday schedule, and reading links passed.');

for(const [id,input,label] of [['energy','I think it is adequate suport','Adequate support'],['energy','enough authority to do the job','Competent powers'],['founding-principles','government must obey the law','Limited government'],['district-cases','shaw v renp','Shaw v. Reno']])assert.equal(E.match(bank.find(p=>p.id===id),input).answer?.label,label);
for(const input of ['not unity','unity or duration','not enough legal authority','no secrecy'])assert.equal(E.match(energy,input).type,'miss');
assert.equal(E.match(bank.find(p=>p.id==='house-size'),'436').type,'miss');
assert.equal(E.match({answers:[{label:'cat',aliases:[]},{label:'bat',aliases:[]}]},'hat').type,'miss');
assert.equal(E.rankFor(0).title,'Intern');assert.equal(E.rankFor(700).title,'Speaker of the House');
for(let n=0;n<=700;n++)assert.ok(E.rankFor(n).points<=n);

assert.equal(E.ranks.length,20);
assert.equal(E.match(energy,'I would say one president because one person makes the final decision').answer.label,'Unity');
assert.equal(E.match(energy,'maybe enough legal authority').answer.label,'Competent powers');

assert.equal(E.match(bank.find(p=>p.id==='budget-categories'),'not interest').type,'miss');
