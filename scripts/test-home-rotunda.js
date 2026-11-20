const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
class Node{constructor(){this.children=[];this.hidden=false;this.textContent='';this.events={};}append(n){this.children.push(n);}replaceChildren(){this.children=[];}addEventListener(name,fn){this.events[name]=fn;}}
(async()=>{
 const nodes=Object.fromEntries(['home-board-list','home-board-status','home-board-date','home-board-refresh'].map(id=>[id,new Node()])),events={},win={},timers=new Map(),calls=[],responses=[];let timerId=0;
 const document={hidden:false,getElementById:id=>nodes[id],createElement:()=>new Node(),addEventListener:(name,fn)=>events[name]=fn};
 class Clock extends Date{constructor(...args){super(...(args.length?args:['2026-11-20T16:00:00Z']));}}
 const queue=data=>responses.push(data);queue({date:'2026-11-20',players:0,rows:[]});
 vm.runInNewContext(fs.readFileSync('home-rotunda.js','utf8'),{document,window:{addEventListener:(name,fn)=>win[name]=fn},Date:Clock,Intl,AbortSignal,setTimeout:fn=>{timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id),fetch:async(url,options)=>{calls.push({url,options});const data=responses.shift();if(data instanceof Error)throw data;return{ok:true,json:async()=>data};}});
 const settle=()=>new Promise(resolve=>setImmediate(resolve));await settle();assert.match(nodes['home-board-status'].textContent,/No completed climbs yet today/);assert.equal(nodes['home-board-list'].hidden,true);
 queue({date:'2026-11-20',players:3,rows:[{nickname:'Cedar Owl 001',rank:1,score:320},{nickname:'Jade Finch 002',rank:1,score:320},{nickname:'Amber Fox 003',rank:3,score:280}]});await nodes['home-board-refresh'].events.click();assert.equal(nodes['home-board-list'].children.length,3);assert.equal(nodes['home-board-list'].children[1].children[0].textContent,'1','Preserve tied ranks');assert.equal(nodes['home-board-date'].dateTime,'2026-11-20');
 queue({date:'2026-11-20',players:5,rows:Array.from({length:5},(_,i)=>({nickname:'Player '+(i+1),rank:i+1,score:500-i*20}))});await nodes['home-board-refresh'].events.click();assert.equal(nodes['home-board-list'].children.length,3,'Only show the top three players');
 queue(new Error('offline'));await nodes['home-board-refresh'].events.click();assert.equal(nodes['home-board-list'].children.length,3);assert.match(nodes['home-board-status'].textContent,/last loaded/);
 document.hidden=true;events.visibilitychange();assert.equal(timers.size,0,'Stop background polling');let count=calls.length;await nodes['home-board-refresh'].events.click();assert.equal(calls.length,count);
 queue({date:'2026-11-20',players:1,rows:[{nickname:'<script>unsafe</script>',rank:1,score:400}]});document.hidden=false;events.visibilitychange();await settle();assert.equal(nodes['home-board-list'].children[0].children[1].textContent,'<script>unsafe</script>','Names are text, never markup');
 queue({date:'2026-11-20',players:1,rows:[{nickname:'bad',rank:1,score:9000}]});await nodes['home-board-refresh'].events.click();assert.match(nodes['home-board-status'].textContent,/last loaded/);
 win.pagehide();assert.equal(timers.size,0);assert.ok(calls.every(c=>c.url.endsWith('/leaderboard')&&c.options.credentials==='omit'&&c.options.cache==='no-store'),'Only anonymous, uncached standings reads');
 console.log('Homepage board: empty/live states, tied ranks, refresh, hidden tabs, recovery, text safety, invalid scores and read-only requests passed.');
})().catch(e=>{console.error(e);process.exit(1)});
