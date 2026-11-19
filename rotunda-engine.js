/* Shared by the browser and the content/answer-matching checks. */
(function(root){
'use strict';
function normalize(value){return String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,' and ').replace(/\bversus\b/g,'v').replace(/\bv\./g,'v').replace(/[^a-z0-9 ]/g,' ').replace(/\b(?:the|a|an)\b/g,' ').replace(/\s+/g,' ').trim();}
function distance(a,b){const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));for(let i=0;i<=a.length;i++)d[i][0]=i;for(let j=0;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);}return d[a.length][b.length];}
function match(prompt,value){const n=normalize(value);if(!n)return{type:'empty'};const exact=prompt.answers.find(a=>[a.label,...a.aliases].some(s=>normalize(s)===n));if(exact)return{type:'correct',answer:exact};if(n.length<5||n.length>100)return{type:'miss'};const guesses=prompt.answers.map(a=>({answer:a,d:Math.min(...[a.label,...a.aliases].map(s=>{const v=normalize(s);return v.length>=5?distance(n,v):999;}))})).sort((a,b)=>a.d-b.d);const first=guesses[0];if(first&&first.d<=(n.length>=10?2:1)&&(!guesses[1]||first.d<guesses[1].d))return{type:'suggestion',answer:first.answer};return{type:'miss'};}
function hash(s){let n=2166136261;for(const c of s){n^=c.charCodeAt(0);n=Math.imul(n,16777619);}return n>>>0;}
function shuffle(list,seed){const a=[...list];let n=hash(seed);for(let i=a.length-1;i>0;i--){n=(Math.imul(n,1664525)+1013904223)>>>0;const j=n%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
function dateKey(date=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);}
function deck(bank,mode,units,seed){const selected=units==='all'?[1,2,3,4,5]:(Array.isArray(units)?units:[units]).map(Number).filter(u=>Number.isInteger(u)&&u>=1&&u<=5);const list=bank.filter(p=>selected.includes(p.unit));return shuffle(list,seed).slice(0,7);}
const api={normalize,match,shuffle,dateKey,deck};root.RotundaEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
