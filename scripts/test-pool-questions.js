const assert=require('node:assert/strict'),fs=require('node:fs');
const bank=JSON.parse(fs.readFileSync('pool-questions.json','utf8'));
assert(bank.length>500);
for(let u=1;u<=5;u++)assert(bank.some(q=>q.unit===u));
for(const q of bank){assert(q.prompt&&q.correct&&q.why);assert(q.unit>=1&&q.unit<=5);if(q.choices){assert(q.choices.includes(q.correct));assert(q.unit<=2);}if(q.href)assert(fs.existsSync(q.href));}
for(const category of ['Terms','Clauses','Principles','Cases','Documents','Scenarios'])assert(bank.some(q=>q.category===category));
console.log('Pool bank passed: units, categories, source links, scenario answers, and Units 3–5 scope.');
