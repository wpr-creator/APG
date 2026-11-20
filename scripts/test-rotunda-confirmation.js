// Exercise the actual form handlers without a network or timed daily attempt.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('rotunda.js','utf8'),elements=new Map(),sent=[];
const $=selector=>{if(!elements.has(selector))elements.set(selector,{value:'',hidden:false,focus(){this.focused=true;},addEventListener(type,handler){this[type]=handler;}});return elements.get(selector);};
let result;const answer={label:'George Washington'};
const context=vm.createContext({$,record:()=>null,busy:false,E:{match:()=>result},current:()=>({}),submitDaily:text=>sent.push(text),clearFeedback:()=>{},feedback:()=>{},answerChoices:()=>{},suggestion:null});
vm.runInContext(source.match(/function accept\(answer\)\{[^\n]+/)[0],context);
vm.runInContext(source.match(/\$\('#answer-form'\)\.addEventListener[^\n]+/)[0],context);
const submit=()=>$('#answer-form').submit({preventDefault(){}});
$('#answer').value='George Washngton';result={type:'correct',answer,spellingAdjusted:true};submit();
assert.equal(sent.length,0,'A typo must not submit or earn points');assert.equal($('#answer').value,answer.label);assert.equal($('#answer').focused,true);
result={type:'correct',answer};submit();assert.deepEqual(sent,[answer.label],'A second explicit submission confirms the corrected answer');
vm.runInContext('accept({label:"John Adams"})',context);assert.equal($('#answer').value,'John Adams');assert.equal(sent.length,1,'Choosing a suggested/full answer must only fill the field');
console.log('Rotunda confirmation: typo correction and answer choices require a separate explicit submission.');
