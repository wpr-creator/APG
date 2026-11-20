const assert=require('node:assert/strict'),E=require('../rotunda-engine.js');
const bank=require('../rotunda-data.json'),language=require('../rotunda-answer-language.json'),cases=require('./audits/rotunda-language-cases.json');
const find=id=>{const p=bank.find(p=>p.id==='trivia-'+id);assert.ok(p,id);return p;};
assert.deepEqual(new Set(language.reviewedLabels),new Set(bank.flatMap(p=>p.answers.map(a=>a.label))));
assert.deepEqual(new Set(cases.accepted.map(([id])=>'trivia-'+id)),new Set(bank.map(p=>p.id)),'Every question needs an independent natural-language example.');
for(const [id,input,label]of cases.accepted){const p=find(id),match=E.match(p,input);assert.equal(match.type,'correct',id+': '+input);assert.equal(match.answer?.label,label,id+': '+input);assert.ok(!match.spellingAdjusted,id+': valid everyday phrasing should be an exact equivalent: '+input);}
for(const [id,input,labels]of cases.choices){const result=E.match(find(id),input);assert.equal(result.type,'choice',id+': '+input);assert.deepEqual(new Set(result.answers.map(a=>a.label)),new Set(labels));}
for(const [id,input,label]of cases.corrections){const result=E.match(find(id),input);assert.equal(result.type,'correct',id+': '+input);assert.equal(result.answer?.label,label);assert.equal(result.spellingAdjusted,true,'A spelling correction still requires explicit confirmation.');}
for(const [id,input]of cases.rejected)assert.equal(E.match(find(id),input).type,'miss',id+': must reject '+input);
let variants=0;for(const p of bank)for(const a of p.answers)for(const text of [a.label,...a.aliases]){const m=E.match(p,text);assert.ok(m.answer?.id===a.id||m.type==='choice'&&m.answers.some(v=>v.id===a.id),p.id+': '+text);variants++;}
console.log(`Rotunda language: ${bank.length} questions, ${language.reviewedLabels.length} distinct labels, ${variants} answer spellings; ${cases.accepted.length} everyday phrases, ${cases.choices.length} ambiguity cases, ${cases.corrections.length} spelling corrections and ${cases.rejected.length} incorrect claims passed.`);
