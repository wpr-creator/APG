const assert=require('node:assert/strict'),fs=require('node:fs');
const bank=JSON.parse(fs.readFileSync('pool-questions.json','utf8'));
assert(bank.length>500);
for(let u=1;u<=5;u++)assert(bank.some(q=>q.unit===u));
for(const q of bank){assert(q.prompt&&q.correct&&q.why);assert(q.unit>=1&&q.unit<=5);if(q.choices){assert(q.choices.includes(q.correct));assert(q.unit<=2);}if(q.href)assert(fs.existsSync(q.href));}
for(const category of ['Terms','Clauses','Principles','Cases','Documents','Scenarios'])assert(bank.some(q=>q.category===category));
console.log('Pool bank passed: units, categories, source links, scenario answers, and Units 3–5 scope.');

const practices=JSON.parse(fs.readFileSync('pool-practices.json','utf8'));
const expected={'unit1-concept-practice':42,'unit1-history-concept-practice':33,'unit1-topic-16-concept-practice':28,'unit1-topic-17-19-concept-practice':37,'unit2-concept-practice':49,'unit2-topic-23-concept-practice':27,'unit2-executive-concept-practice':53};
for(const [id,count] of Object.entries(expected)){assert.equal(practices[id].length,count,id+' retains its complete question set');assert(fs.readFileSync(id+'.html','utf8').includes('reflecting-pool.html?practice='+id));for(const q of practices[id]){assert(q.choices.includes(q.correct));if(q.table)assert(q.table.headers.length&&q.table.rows.length);if(q.source)assert(typeof q.source==='string'||q.source.text);}}
const game=fs.readFileSync('reflecting-pool.js','utf8');assert(!game.includes('createOscillator'));assert(game.includes('park-ambience.m4a'));assert(!fs.readFileSync('reflecting-pool.html','utf8').includes('id="motion"'));
console.log('Lesson pool routes passed: all seven complete banks, stimulus tables, field-recorded audio, and no pause control.');

const poolHtml=fs.readFileSync('reflecting-pool.html','utf8');assert(!poolHtml.includes('id="sound"'));assert(poolHtml.includes('aria-label="Sound" aria-pressed="false"'));assert(poolHtml.includes('class="sound-slash"'));assert(game.includes('let soundEnabled=false')); assert(!poolHtml.includes('type="range"'));assert(!poolHtml.includes('type="checkbox" checked>Ambient sound'));assert(game.includes('fieldAudio.volume=0'));

assert(!/<input[^>]*\bchecked\b/.test(poolHtml),'Review chooser starts with no selections');assert(poolHtml.includes('value="Scenarios">Scenarios'));assert(!poolHtml.includes('Scenarios1')&&!poolHtml.includes('Scenarios2'));

// Exercise the actual chooser filter for single-unit, mixed-unit, and unavailable scenarios.
const vm=require('node:vm');const chooser=game.match(/function selected\(\)\{[^\n]+/)[0];
for(const units of [[1],[2],[1,2],[3,4,5]]){const result=vm.runInNewContext(chooser+';selected()',{practiceId:null,practices:{},bank,selection:()=>({units,categories:['Scenarios']})});assert(result.every(q=>units.includes(q.unit)&&q.category==='Scenarios'));if(units[0]<3)assert(result.length>0);else assert.equal(result.length,0);if(units.length===2)assert(result.some(q=>q.unit===1)&&result.some(q=>q.unit===2));}
console.log('Scenario chooser passed: selected units control the single Scenarios category.');
