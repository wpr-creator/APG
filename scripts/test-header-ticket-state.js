const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const code = fs.readFileSync(path.join(__dirname,'../course-header.js'),'utf8');
async function run(settings,ok=true) {
  const exit={dataset:{},attrs:{},children:[],textContent:'EXIT TICKET',setAttribute(k,v){this.attrs[k]=v;},appendChild(n){this.children.push(n);}};
  const header={querySelectorAll(){return [exit];}};
  const document={currentScript:{src:'https://example.test/APG/course-header.js'},readyState:'interactive',head:{appendChild(){}},
    querySelector(s){return s==='.preview-header'?header:null;},querySelectorAll(){return [];},createElement(){return {setAttribute(){}};}};
  await vm.runInNewContext(code,{document,URL,location:{pathname:'/APG/index.html'},fetch:async()=>({ok,json:async()=>settings}),window:{},sessionStorage:{getItem:()=>null}});
  return exit;
}
(async()=>{
  for(const exitQuestion of ['', ' \n ']) {
    const exit=await run({exitQuestion,exitQuestionDraft:'Unpublished draft'});
    assert.equal(exit.dataset.ticketState,'closed');
    assert.equal(exit.textContent,'EXIT TICKET CLOSED');
    assert.equal(exit.children.length,0);
    assert.equal(exit.attrs['aria-label'],'Exit ticket: closed');
    assert.equal(exit.href,'https://example.test/APG/exit-ticket.html');
  }
  const open=await run({exitQuestion:'Explain your choice.'});
  assert.equal(open.dataset.ticketState,'open');assert.equal(open.textContent,'EXIT TICKET');
  assert.equal(open.children.length,1);assert.equal(open.attrs['aria-label'],'Exit ticket: open');
  const unavailable=await run({},false);
  assert.equal(unavailable.dataset.ticketState,'unknown');assert.equal(unavailable.textContent,'EXIT TICKET');
  console.log('Header ticket states passed: closed, draft-only, open, failed settings, and already-ready pages.');
})().catch(error=>{console.error(error);process.exitCode=1;});
