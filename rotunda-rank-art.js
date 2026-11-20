// Original pixel insignia. Canvas pixels stay crisp alongside the clean score UI.
export function drawRankEmblem(canvas,points,{leader=false}={}){
 const x=canvas.getContext('2d');if(!x)return;
 const summit=points>=700,gold=points>=580||leader,silver=points>=400;
 const metal=summit?'#fff0bb':gold?'#e4bd6d':silver?'#c6e1df':'#caa47a';
 const shadow=gold?'#96713f':'#647e7c',light=summit?'#fffbe5':'#f8e7c2';
 x.clearRect(0,0,256,128);x.save();x.scale(2,2);x.imageSmoothingEnabled=false;
 const box=(a,b,w,h,c)=>{x.fillStyle=c;x.fillRect(Math.round(a),Math.round(b),w,h);};
 const poly=(p,c)=>{x.fillStyle=c;x.beginPath();p.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath();x.fill();};
 const star=(a,b,s=1)=>{box(a-s,b,s*2+1,1,light);box(a,b-s,1,s*2+1,light);};
 if(summit){for(let i=0;i<16;i++){const a=i*Math.PI/8,r=i%2?26:28;poly([[64+Math.cos(a)*r,31+Math.sin(a)*r],[64+Math.cos(a-.025)*36,31+Math.sin(a-.025)*31],[64+Math.cos(a+.025)*36,31+Math.sin(a+.025)*31]],'#cda96155');}}
 // Feathered wings and layered laurel branches frame the Capitol.
 for(const side of [-1,1]){
  for(let i=0;i<7;i++){const a=64+side*(21+i*5),b=35-i*2;poly([[a,b],[a+side*7,b-10-i*.5],[a+side*10,b-8],[a+side*5,b+5]],i%2?shadow:metal);}
  if(gold||silver)for(let i=0;i<7;i++){const a=64+side*(25+Math.sin(i*.32)*17),b=55-i*4;poly([[a,b],[a+side*6,b-6],[a+side*7,b-1],[a,b+3]],i%2?metal:shadow);box(a,b,1,4,metal);}
 }
 // Shield field, drum, ribbed dome, lantern, and lit colonnade.
 poly([[43,14],[85,14],[85,39],[79,49],[64,57],[49,49],[43,39]],'#173c4b');
 box(46,15,36,1,metal);box(43,18,1,22,metal);box(84,18,1,22,shadow);
 for(let row=0;row<12;row++){const r=Math.sqrt(Math.max(0,1-((11-row)/12)**2))*15;box(64-r,21+row,r*2,1,row%3?metal:light);}
 for(let i=-2;i<=2;i++){box(63+i*4,23+Math.abs(i)*2,1,10,shadow);}
 box(60,15,8,6,metal);box(63,11,2,4,light);box(57,34,14,2,shadow);
 box(46,36,36,3,light);for(let i=0;i<6;i++){box(48+i*5,39,2,8,metal);box(50+i*5,40,1,7,shadow);}box(45,48,38,2,metal);box(49,51,30,2,shadow);
 if(summit){
  // Speaker's gavel, with a small ivory constitutional scroll.
  poly([[51,46],[55,43],[71,55],[68,58]],'#bc8f4a');box(48,41,10,5,light);box(46,40,3,7,metal);box(58,41,2,6,shadow);
  box(73,43,9,12,light);box(72,42,11,2,metal);for(let i=0;i<3;i++)box(75,46+i*2,5,1,'#a78d60');
 }
 for(let i=0;i<(summit?7:gold?5:3);i++){const count=summit?7:gold?5:3;star(64+(i-(count-1)/2)*9,7+Math.abs(i-(count-1)/2),i===Math.floor(count/2)?2:1);}
 box(53,59,22,2,metal);box(58,62,12,1,shadow);x.restore();
}
