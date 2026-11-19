const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const E=require('../rotunda-engine.js'),root=path.join(__dirname,'..');
const bank=JSON.parse(fs.readFileSync(path.join(root,'rotunda-data.json'),'utf8'));
assert.equal(bank.length,20);assert.equal(new Set(bank.map(p=>p.id)).size,20);
for(const unit of [1,2,3,4,5])assert.ok(bank.some(p=>p.unit===unit));
for(const p of bank){assert.ok(p.prompt&&p.hint&&p.answers.length>=2);assert.ok(fs.existsSync(path.join(root,p.href.split('#')[0])));const names=new Map();for(const a of p.answers){assert.ok(a.id&&a.label&&a.explanation&&Array.isArray(a.aliases));for(const name of [a.label,...a.aliases]){const n=E.normalize(name);assert.ok(!names.has(n)||names.get(n)===a.id,p.id+': conflicting alias '+name);names.set(n,a.id);assert.equal(E.match(p,name).answer.id,a.id);}}assert.equal(E.match(p,'totally unrelated nonsense').type,'miss');assert.equal(E.match(p,'').type,'empty');}
const energy=bank.find(p=>p.id==='energy');assert.equal(E.match(energy,'unty').type,'miss');assert.equal(E.match(energy,'duratoin').type,'suggestion');assert.equal(E.match(energy,'adequate suport').type,'suggestion');assert.equal(E.match(energy,'adequate support').type,'correct');
assert.equal(E.match(bank.find(p=>p.id==='district-cases'),'Baker versus Carr').answer.label,'Baker v. Carr');
assert.deepEqual(E.deck(bank,'daily','all','2026-11-19'),E.deck(bank,'daily','all','2026-11-19'));assert.equal(E.deck(bank,'daily','all','2026-11-19').length,7);assert.notDeepEqual(E.deck(bank,'daily','all','2026-11-19').map(p=>p.id),E.deck(bank,'daily','all','2026-11-20').map(p=>p.id));
for(const u of [1,2,3,4,5])assert.ok(E.deck(bank,'practice',String(u),'test').every(p=>p.unit===u));
assert.equal(E.dateKey(new Date('2026-11-20T07:59:00Z')),'2026-11-19');assert.equal(E.dateKey(new Date('2026-11-20T08:00:00Z')),'2026-11-20');
console.log('Rotunda: 20 prompts, all answer aliases, exact-vs-suggested matching, daily ordering, Pacific rollover, unit filters, and reading links passed.');
