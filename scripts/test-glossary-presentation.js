const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
const render=app.slice(app.indexOf('  function renderWords() {'),app.indexOf('  function renderElection2026() {'));
const definition=app.slice(app.indexOf('  function glossaryDefinition(word) {'),app.indexOf('  const unit2BranchGroups'));
class Element {
 constructor(){this.children=[];this.attrs={};this.textContent='';this.parts={h2:{textContent:''},p:{textContent:''}};}
 replaceChildren(){this.children=[];} appendChild(e){this.children.push(e);} querySelector(selector){return this.parts[selector];}
 setAttribute(k,v){this.attrs[k]=v;} addEventListener(){}
}
const grid=new Element();const status=new Element();const branches=new Element();
const sandbox={
 wordGrid:grid,glossaryFilter:'gov-2',glossaryBranchFilter:'all',glossaryQuery:'',
 glossaryWords:[['Federalist No. 10','','General definition','Congress',['gov-1','gov-2'],{'gov-1':'An argument about factions.','gov-2':'A congressional connection to factions.'}],['Political action committee (PAC)','','Campaign organization','Participation',['gov-5'],{}]],
 unit2BranchGroups:{congress:['Congress']},openWord(){},
 document:{createElement:()=>new Element(),getElementById:id=>({'glossary-status':status,'glossary-branch-filters':branches}[id]),querySelector:()=>({textContent:'UNIT 2'}),querySelectorAll:()=>[]}
};
vm.createContext(sandbox);vm.runInContext(definition+render,sandbox);
vm.runInContext('renderWords()',sandbox);
assert.equal(grid.children.length,1);
assert.equal(grid.children[0].parts.h2.textContent,'Federalist No. 10');
assert.equal(grid.children[0].parts.p.textContent,'A congressional connection to factions.');
assert.equal(grid.children[0].attrs['aria-haspopup'],'dialog');
sandbox.glossaryQuery='congressional';vm.runInContext('renderWords()',sandbox);assert.equal(grid.children.length,1);
sandbox.glossaryFilter='gov-1';vm.runInContext('renderWords()',sandbox);assert(grid.children[0].textContent.startsWith('No matching terms'));
sandbox.glossaryFilter='all';sandbox.glossaryQuery='pac';vm.runInContext('renderWords()',sandbox);assert.equal(grid.children[0].parts.h2.textContent,'Political action committee (PAC)');
sandbox.glossaryFilter='gov-2';sandbox.glossaryQuery='';sandbox.glossaryBranchFilter='congress';vm.runInContext('renderWords()',sandbox);assert.equal(grid.children[0].parts.h2.textContent,'Federalist No. 10');
console.log('Glossary presentation tests passed: canonical names, acronyms, scoped definitions, search, and branch filters.');
