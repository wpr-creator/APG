/* Shared by the browser and search regression checks. */
(function (root) {
  'use strict';
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9.]+/g,' ').trim();
  function near(a,b) {
    if(a===b)return true;
    if(a.length<5||b.length<4||Math.abs(a.length-b.length)>1)return false;
    if(a.length===b.length){const differences=[];for(let i=0;i<a.length;i++)if(a[i]!==b[i])differences.push(i);return differences.length===1 || differences.length===2 && differences[1]===differences[0]+1 && a[differences[0]]===b[differences[1]] && a[differences[1]]===b[differences[0]];}
    if(a.length>b.length)[a,b]=[b,a];
    let i=0,j=0,skipped=false;while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;}else{if(skipped)return false;skipped=true;j++;}}return true;
  }
  function search(entries,raw,type='All') {
    let query=normalize(raw),scope=null;
    if(/\bscotus\b/.test(query)){scope='Case';query=query.replace(/\bscotus\b/g,'').trim();}
    query=query.replace(/\bpotus\b/g,'president').replace(/\bbor\b/g,'bill of rights').replace(/\bfed(?:eralist)?\.?\s*(\d+)\b/g,'federalist $1');
    const tokens=query.split(' ').filter(Boolean);
    if(!tokens.length&&!scope&&type==='All')return [];
    return entries.filter(entry=>(type==='All'||entry.type===type)&&(!scope||entry.type===scope)).map(entry=>{
      const title=normalize(entry.title),all=title+' '+normalize(entry.detail),words=title.split(' '),terms=[];let approximate=false;
      for(const token of tokens){if(all.includes(token)){terms.push(token);continue;}const correction=words.find(word=>near(token,word));if(!correction)return null;terms.push(correction);approximate=true;}
      const rankedQuery=approximate?terms.join(' '):query;
      const score=(title===rankedQuery?100:title.startsWith(rankedQuery)&&rankedQuery?60:title.includes(rankedQuery)&&rankedQuery?40:10)-(approximate?8:0);
      return {entry,score,approximate,terms};
    }).filter(Boolean).sort((a,b)=>b.score-a.score||a.entry.title.localeCompare(b.entry.title));
  }
  root.APG_SEARCH={search,normalize};
  if(typeof module!=='undefined')module.exports=root.APG_SEARCH;
})(typeof window!=='undefined'?window:globalThis);
