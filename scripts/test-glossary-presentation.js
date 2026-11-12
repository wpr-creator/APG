const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
const render=app.slice(app.indexOf('  function renderWords() {'),app.indexOf('  function renderElection2026() {'));
const definition=app.slice(app.indexOf('  function glossaryDefinition(word) {'),app.indexOf('  const unit2BranchGroups'));
class Element {
 constructor(){this.children=[];this.attrs={};this.textContent='';this.parts={h3:{textContent:''},p:{textContent:''}};}
 append(...e){this.children.push(...e);}
 replaceChildren(){this.children=[];} appendChild(e){this.children.push(e);} querySelector(selector){return this.parts[selector];}
 setAttribute(k,v){this.attrs[k]=v;} addEventListener(){}
}
const grid=new Element();const status=new Element();const branches=new Element();
const sandbox={
 wordGrid:grid,glossaryFilter:'gov-2',glossaryBranchFilter:'all',glossaryQuery:'',
 glossaryWords:[['Federalist No. 10','','General definition','Congress',['gov-1','gov-2'],{'gov-1':'An argument about factions.','gov-2':'A congressional connection to factions.'}],['Political action committee (PAC)','','Campaign organization','Participation',['gov-5'],{}]],
 glossaryUnits:[{groups:{}},{groups:{Congress:[]}}],unit2BranchGroups:{congress:['Congress']},openWord(){},
 document:{createElement:()=>new Element(),getElementById:id=>({'glossary-status':status,'glossary-branch-filters':branches}[id]),querySelector:()=>({textContent:'UNIT 2'}),querySelectorAll:()=>[]}
};
vm.createContext(sandbox);vm.runInContext(definition+render,sandbox);
function cards(node=grid){return node.children.flatMap(child=>child.className==='word-card'?[child]:cards(child));}
vm.runInContext('renderWords()',sandbox);
assert.equal(cards().length,1);
assert.equal(cards()[0].parts.h3.textContent,'Federalist No. 10');
assert.equal(cards()[0].parts.p.textContent,'A congressional connection to factions.');
assert.equal(cards()[0].attrs['aria-haspopup'],'dialog');
sandbox.glossaryQuery='congressional';vm.runInContext('renderWords()',sandbox);assert.equal(cards().length,1);
sandbox.glossaryFilter='gov-1';vm.runInContext('renderWords()',sandbox);assert(grid.children[0].textContent.startsWith('No matching terms'));
sandbox.glossaryFilter='all';sandbox.glossaryQuery='pac';vm.runInContext('renderWords()',sandbox);assert.equal(cards()[0].parts.h3.textContent,'Political action committee (PAC)');
sandbox.glossaryFilter='gov-2';sandbox.glossaryQuery='';sandbox.glossaryBranchFilter='congress';vm.runInContext('renderWords()',sandbox);assert.equal(cards()[0].parts.h3.textContent,'Federalist No. 10');
sandbox.glossaryFilter='all';sandbox.glossaryQuery='';sandbox.glossaryBranchFilter='all';vm.runInContext('renderWords()',sandbox);assert.equal(cards().length,2);assert.equal(new Set(cards().map(card=>card.parts.h3.textContent)).size,2);
// Canonical definitions must also replace legacy quick-reference text in All units.
const merge=app.slice(app.indexOf('  const glossaryEntries = new Map();'),app.indexOf('  function glossaryDefinition(word) {'));
const merged={data:{words:[['Shared Term','','Outdated summary','Legacy','gov-1']]},glossaryUnits:[{groups:{Foundations:[['Shared Term','Current Unit 1 definition',[]]]}},{groups:{Congress:[['Shared Term','Current Unit 2 definition',[]]]}}]};
vm.createContext(merged);vm.runInContext(merge+'; globalThis.result = glossaryWords;',merged);
assert.equal(merged.result.length,1);
assert.equal(merged.result[0][2],'Current Unit 1 definition');
assert.equal(merged.result[0][5]['gov-2'],'Current Unit 2 definition');
console.log('Glossary presentation tests passed: canonical names, acronyms, scoped definitions, search, branch filters, and canonical All-units definitions.');
