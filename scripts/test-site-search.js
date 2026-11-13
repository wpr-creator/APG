const assert=require('node:assert/strict');
const {search}=require('../search-engine.js');
const index=require('../search-index.json');
assert(search(index,'SCOTUS').every(x=>x.entry.type==='Case'));
assert.equal(search(index,'SCOTUS').length,14);
assert.equal(search(index,'','Case').length,14);
assert(search(index,'fed 10','Document').some(x=>x.entry.title==='Federalist No. 10'));
assert.equal(search(index,'federalsim','Term')[0].entry.title,'Federalism');
assert(search(index,'federalsim','Term')[0].approximate);
assert(search(index,'Bkaer','Case').some(x=>x.entry.title.includes('Baker')));
assert.equal(search(index,'2.2')[0].entry.url,'lesson-2-2.html');
assert(search(index,'Baker','Document').length===0);
assert(search(index,'POTUS').some(x=>/president/i.test(x.entry.title+' '+x.entry.detail)));
assert.equal(search(index,'zzzzzzzzzz').length,0);
assert(search(index,'federalism','Term')[0].terms.includes('federalism'));
console.log('Search regression checks passed: aliases, categories, spelling, ranking, and match terms.');

// Students search for materials by lesson number and the words on their cards.
const {availableEntries}=require('../search-engine.js');
const settings=require('../site-content.json');
const available=availableEntries(index,settings);
for(const [query,id] of [
 ['2.2 slides','u2-202-lesson-slides'],['2.2 notes','u2-202-guided-notes'],
 ['guided notes','u2-202-guided-notes'],['presidential toolbox','u2-203-presidential-tools'],
 ['GerryMander','u2-202-gerrymander-game'],['2.2 concept practice','u2-203-concept-practice']
]) assert(search(available,query).some(x=>x.entry.resourceId===id),`Missing resource search: ${query}`);
assert(search(available,'concept practice','Resource').length>0);
const practice=index.find(e=>e.resourceId==='u2-203-concept-practice');
const locked={currentUnit:'gov-2',assignmentUnlocks:{}};
assert.equal(availableEntries([practice],locked).length,0,'Locked practice must not appear');
const schedule={...locked,assignmentUnlockAt:{[practice.resourceId]:'2030-01-01T08:00:00Z'}};
assert.equal(availableEntries([practice],schedule,Date.parse('2030-01-01T07:59:00Z')).length,0);
assert.equal(availableEntries([practice],schedule,Date.parse('2030-01-01T08:00:00Z')).length,1);
const notes=index.find(e=>e.resourceId==='u2-202-guided-notes');
assert.equal(availableEntries([notes],{currentUnit:'gov-1'}).length,0,'Closed units must not expose resources');
assert.equal(availableEntries([notes],{...locked,assignmentUrls:{[notes.resourceId]:'https://example.org/updated-notes'}})[0].url,'https://example.org/updated-notes');
assert.equal(availableEntries([notes],{...locked,assignmentUrls:{[notes.resourceId]:''}}).length,0,'An empty URL disables the resource');
console.log('Lesson material search passed: notes, slides, practice, tools, release controls, schedules, and URL overrides.');

for(const query of ['2026 election results','midterm results','school votes']) assert(search(available,query).some(x=>x.entry.url==='election-results-2026.html'),`Missing archived results: ${query}`);
