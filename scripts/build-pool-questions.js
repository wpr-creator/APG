// Reuse reviewed course content; no live generation or external services.
const fs=require('node:fs'),vm=require('node:vm');
const ctx={window:{}};vm.createContext(ctx);
for(const file of ['glossary-data.js','foundations-data.js','data-required.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
const cases=vm.runInContext('REQUIRED_CASES',ctx),bank=[],practices={};
for(const u of ctx.window.APG_GLOSSARY_UNITS)for(const [group,entries] of Object.entries(u.groups))for(const [term,definition] of entries){
 const category=/clause/i.test(term)?'Clauses':/ v\.? |versus/i.test(term)?'Cases':/Federalist|Brutus|Declaration|Articles of Confederation|Birmingham/i.test(term)?'Documents':/principle|sovereignty|federalism|checks and balances|separation of powers|limited government|natural rights|consent of the governed/i.test(term)?'Principles':'Terms';
 bank.push({unit:Number(u.key.replace('unit','')),category,prompt:definition,correct:term,group,why:definition});
}
for(const d of ctx.window.FOUNDATIONS_DATA.documents)for(const key of d.units)bank.push({unit:Number(key.replace('gov-','')),category:'Documents',prompt:'Which document makes this argument? '+d.bigIdea,correct:d.title,why:d.plain,href:d.file});
for(const c of cases){const unit=['mcculloch','lopez'].includes(c.id)?1:['baker','shaw'].includes(c.id)?2:c.unit;bank.push({unit,category:'Cases',prompt:'Which case addressed this question? '+c.question,correct:c.title,why:c.holding.replace('N&P Clause','Necessary and Proper Clause'),href:c.file});}
const files={1:['unit1-concept-practice.js','unit1-history-concept-practice.js','unit1-topic-16-concept-practice.js','unit1-topic-17-19-concept-practice.js'],2:['unit2-concept-practice.js','unit2-topic-23-concept-practice.js','unit2-executive-concept-practice.js']};
for(const [unit,list] of Object.entries(files))for(const file of list){
 const src=fs.readFileSync(file,'utf8');let start=src.indexOf('const questions = [');if(start<0)start=src.indexOf('window.startConceptPractice([');start=src.indexOf('[',start);let questions;
 for(let end=src.indexOf(']',start);end>=0;end=src.indexOf(']',end+1)){try{questions=vm.runInNewContext('('+src.slice(start,end+1)+')');break;}catch{}}
 if(!questions)throw Error(file);
 practices[file.replace('.js','')] = questions.map(q=>({...q,unit:Number(unit),category:'Scenarios',correct:q.choices[q.answer]}));
 for(const q of questions)if(!q.source&&!q.table&&!q.image&&!q.diagram&&q.prompt&&q.choices&&Number.isInteger(q.answer))bank.push({unit:Number(unit),category:'Scenarios',prompt:q.prompt,choices:q.choices,correct:q.choices[q.answer],why:q.why});
}
const seen=new Set();const clean=bank.filter(q=>q.unit>=1&&q.unit<=5&&q.correct&&q.why).filter(q=>{const key=q.unit+q.prompt;if(seen.has(key))return false;seen.add(key);return true;});
fs.writeFileSync('pool-practices.json',JSON.stringify(practices));
fs.writeFileSync('pool-questions.json',JSON.stringify(clean));console.log('Pool questions:',clean.length);for(let n=1;n<=5;n++)console.log('Unit',n,clean.filter(q=>q.unit===n).length);
