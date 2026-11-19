// Public, anonymous score service. No credentials or student names are sent.
const base='https://apg-rotunda-scores.endearingbuffalo5.chatgpt.site';
let clientId;
try{clientId=localStorage.getItem('apg-rotunda-client');}catch{}
if(!/^[a-z0-9-]{30,50}$/i.test(clientId||'')){clientId=crypto.randomUUID();try{localStorage.setItem('apg-rotunda-client',clientId);}catch{}}
async function request(path,body){const response=await fetch(base+path,{...(body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...body,clientId})}:{}),signal:AbortSignal.timeout(10000),cache:'no-store',credentials:'omit'});const data=await response.json();if(!response.ok)throw Error(data.error||'The score service is unavailable.');return data;}
export const online={start:units=>request('/start',{units}),submit:(state,answer)=>request('/answer',{sessionId:state.sessionId,index:state.index,answer}),next:state=>request('/next',{sessionId:state.sessionId,index:state.index}),board:(units,date,player='')=>request('/leaderboard?'+new URLSearchParams({units:units.join(','),date,player}))};
