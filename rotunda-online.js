// Public, anonymous score service. No credentials or student names are sent.
const base='https://apg-rotunda-scores.endearingbuffalo5.chatgpt.site';
let clientId;
try{clientId=localStorage.getItem('apg-rotunda-client');}catch{}
if(!/^[a-z0-9-]{30,50}$/i.test(clientId||'')){clientId=crypto.randomUUID();try{localStorage.setItem('apg-rotunda-client',clientId);}catch{}}
async function request(path,body){const response=await fetch(base+path,{...(body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...body,clientId})}:{}),signal:AbortSignal.timeout(10000),cache:'no-store',credentials:'omit'});const data=await response.json();if(!response.ok)throw Error(data.error||'The score service is unavailable.');return data;}
export const online={curriculum:()=>request('/curriculum'),start:()=>request('/start',{}),submit:(state,answer)=>request('/answer',{sessionId:state.sessionId,index:state.index,answer}),next:state=>request('/next',{sessionId:state.sessionId,index:state.index}),board:(date,player='')=>request('/leaderboard?'+new URLSearchParams({date,player}))};
