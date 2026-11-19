/* Run manually: node scripts/check-executive-branch-links.js [--output report.json]
   Government sites frequently block automated clients. HTTP success confirms
   reachability, not organizational identity; compare with the saved evidence. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','executive-branch-data.js'),'utf8'),context);
const nodes=[];
function walk(node){nodes.push(node);node.children.forEach(walk);}
walk(context.window.EXECUTIVE_BRANCH_DATA);
const unique=[...new Set(nodes.map(node=>node.url))];
const checks=new Map();
let next=0;
async function worker(){
  while(next<unique.length){
    const url=unique[next++];
    try{
      const response=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'User-Agent':'APG course-site link audit'}});
      const title=(await response.text()).match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g,' ').trim()||'';
      const softError=/page not found|404 error|access denied|request rejected/i.test(title);
      checks.set(url,{httpStatus:response.status,finalUrl:response.url,title,result:response.ok&&!softError?'reachable':[401,403,429].includes(response.status)?'automated-access-restricted':'review'});
    }catch(error){checks.set(url,{result:'review',error:error.message});}
  }
}
(async()=>{
  await Promise.all(Array.from({length:6},worker));
  const entries=nodes.map(node=>({id:node.id,title:node.title,url:node.url,evidence:node.source,...checks.get(node.url)}));
  const report={checkedAt:new Date().toISOString(),entries};
  const out=process.argv.indexOf('--output');
  if(out!==-1){if(!process.argv[out+1])throw new Error('--output requires a file path');fs.writeFileSync(process.argv[out+1],JSON.stringify(report,null,2)+'\n');}
  const totals=entries.reduce((all,item)=>(all[item.result]=(all[item.result]||0)+1,all),{});
  console.log(JSON.stringify({entries:entries.length,uniqueUrls:unique.length,...totals},null,2));
  entries.filter(item=>item.result==='review').forEach(item=>console.log('REVIEW',item.title,item.httpStatus||item.error,item.url));
  if(totals.review)process.exitCode=1;
})().catch(error=>{console.error(error.message);process.exitCode=1;});
