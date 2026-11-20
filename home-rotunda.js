// Read-only homepage standings. Never creates a device ID or starts a scored attempt.
(() => {
  'use strict';
  const list=document.getElementById('home-board-list'),status=document.getElementById('home-board-status'),date=document.getElementById('home-board-date'),refresh=document.getElementById('home-board-refresh');
  if(!list||!status||!date||!refresh)return;
  const endpoint='https://apg-rotunda-scores.endearingbuffalo5.chatgpt.site/leaderboard';
  const zone='America/Los_Angeles',dayKey=()=>new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  let timer,busy=false,stopped=false,lastGood=false,signature='';
  function showDate(day){date.dateTime=day;date.textContent=new Intl.DateTimeFormat('en-US',{timeZone:zone,month:'short',day:'numeric'}).format(new Date(day+'T12:00:00Z'));}
  showDate(dayKey());
  function render(data){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(data.date)||!Number.isInteger(data.players)||data.players<0||!Array.isArray(data.rows))throw Error('Invalid standings');
    const rows=data.rows.slice(0,5);
    if(rows.some(row=>typeof row.nickname!=='string'||row.nickname.length>60||!Number.isInteger(row.rank)||row.rank<1||!Number.isInteger(row.score)||row.score<0||row.score>700))throw Error('Invalid score');
    showDate(data.date);
    const next=JSON.stringify([data.date,rows]);
    if(next!==signature){list.replaceChildren();for(const row of rows){const li=document.createElement('li');for(const [className,text]of [['home-board-rank',String(row.rank)],['home-board-name',row.nickname],['home-board-points',row.score+' pts']]){const span=document.createElement('span');span.className=className;span.textContent=text;li.append(span);}list.append(li);}signature=next;}
    list.hidden=!rows.length;
    const today=data.date===dayKey(),count=data.players+' completed '+(data.players===1?'climb':'climbs');
    status.textContent=rows.length?(today?'Today · ':'Latest board · ')+count+' · updates every minute.':today?'No completed climbs yet today.':'No completed climbs on the latest board.';
    lastGood=true;
  }
  function schedule(){clearTimeout(timer);if(!stopped&&!document.hidden)timer=setTimeout(load,60000);}
  async function load(){
    if(stopped||document.hidden||busy)return;
    clearTimeout(timer);busy=true;refresh.disabled=true;
    try{const response=await fetch(endpoint,{cache:'no-store',credentials:'omit',signal:AbortSignal.timeout(8000)});if(!response.ok)throw Error('Standings unavailable');const data=await response.json();if(!stopped)render(data);}
    catch{if(!stopped)status.textContent=lastGood?'Showing the last loaded scores. Refresh to try again.':'Scores are temporarily unavailable. You can still open Rotunda.';}
    finally{busy=false;refresh.disabled=false;schedule();}
  }
  refresh.addEventListener('click',load);
  document.addEventListener('visibilitychange',()=>{clearTimeout(timer);if(!document.hidden)load();});
  window.addEventListener('pagehide',()=>{stopped=true;clearTimeout(timer);});
  window.addEventListener('pageshow',()=>{if(stopped){stopped=false;load();}});
  load();
})();
