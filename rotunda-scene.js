// Original low-resolution artwork. Drawn on an integer grid and enlarged without smoothing.
export function createRotundaScene(canvas,{reduced=false}={}){
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)throw Error('Canvas unavailable');
 const C={sky:'#8fbfca',skyLight:'#bad9d4',cloud:'#f6ebd0',cloudShade:'#bdc9bc',navy:'#172b3b',deep:'#11222e',ink:'#26494d',stone:'#c3ba9e',shade:'#8c958b',darkStone:'#667e7b',cream:'#f0e1b8',light:'#fff1cf',gold:'#d9ab64',darkGold:'#ad7e49',grass:'#4e7770',grassLight:'#6c9180',rose:'#cf8876',blue:'#6e919c',wood:'#9b7057'};
 let width=480,height=320,stage='welcome',progress=0,target=0,pan=0,panTarget=0,vertical=0,verticalTarget=0,zoom=1.15,zoomTarget=1.15,rewardAt=-10000,rewardPoints=0,rewardRank='',flight=null,eagleX=.17,frame,last=0,active=!document.hidden,disposed=false;
 const budget=createFrameBudget();
 const art=new Image();art.src='assets/rotunda/apotheosis.webp';let fresco=null;
 art.onload=()=>{if(disposed)return;const off=document.createElement('canvas');off.width=96;off.height=64;const x=off.getContext('2d');x.drawImage(art,0,0,96,64);const image=x.getImageData(0,0,96,64);for(let i=0;i<image.data.length;i+=4){for(let c=0;c<3;c++)image.data[i+c]=Math.round(image.data[i+c]/40)*40;}x.putImageData(image,0,0);fresco=off;};
 const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));};
 function poly(points,c){ctx.fillStyle=c;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(Math.round(x),Math.round(y)):ctx.moveTo(Math.round(x),Math.round(y)));ctx.closePath();ctx.fill();}
 function oval(x,y,rx,ry,c){ctx.fillStyle=c;for(let j=-Math.ceil(ry);j<=ry;j++){const span=rx*Math.sqrt(Math.max(0,1-j*j/(ry*ry)));ctx.fillRect(Math.round(x-span),Math.round(y+j),Math.round(span*2),1);}}
 function cloud(x,y,s){const pixels=[[0,4,28,6],[4,1,13,6],[9,-2,9,5],[20,3,13,5],[28,5,9,4]];for(const[a,b,w,h]of pixels)r(x+a*s,y+(b+2)*s,w*s,h*s,C.cloudShade);for(const[a,b,w,h]of pixels)r(x+a*s,y+b*s,w*s,h*s,C.cloud);}
 function tree(x,y,s=1){r(x-2*s,y,4*s,26*s,C.wood);for(const[a,b,w,h]of[[-12,-17,24,15],[-17,-8,34,13],[-11,-26,22,13],[-5,-32,10,9]])r(x+a*s,y+b*s,w*s,h*s,C.grass);r(x-10*s,y-20*s,9*s,13*s,C.grassLight);r(x+2*s,y-28*s,5*s,7*s,C.grassLight);}
 function exterior(time,quiet){
  const ground=height*.78,center=width*.5,scale=Math.min(width/480,height/320)*1.1;
  r(0,0,width,height,C.sky);for(let y=0;y<height*.78;y+=4)if(y>height*.25)r(0,y,width,2,y>height*.55?C.skyLight:C.sky);
  oval(width*.82,height*.23,19,19,C.gold);r(width*.82-16,height*.23-6,32,12,'#efd094');
  const drift=quiet?0:time*.0008;cloud((width*.12+drift)%(width+80)-20,height*.18,1.5);cloud((width*.62+drift*.6)%(width+80),height*.37,1);cloud((width*.3+drift*.8)%(width+80),height*.49,.75);
  // Distant Mall and the Capitol's stepped silhouette.
  r(0,ground-20,width,40,C.grass);r(0,ground-12,width,35,C.grassLight);
  ctx.save();ctx.translate(Math.round(center),Math.round(ground));ctx.scale(scale,scale);
  r(-159,-45,318,46,C.shade);r(-157,-43,314,40,C.stone);r(-164,-49,328,5,C.light);r(-166,-52,332,3,C.shade);
  for(let x=-148;x<154;x+=12){r(x,-37,5,23,C.darkStone);r(x+1,-36,2,22,C.blue);r(x-2,-12,9,3,C.cream);}
  r(-61,-62,122,63,C.cream);r(-67,-66,134,5,C.light);poly([[-68,-66],[0,-96],[68,-66]],C.light);poly([[-51,-68],[0,-89],[51,-68]],C.stone);
  for(let x=-51;x<=51;x+=17){r(x,-59,5,52,C.light);r(x+4,-59,2,52,C.shade);r(x-2,-62,10,4,C.light);r(x-2,-8,10,4,C.stone);}
  r(-13,-31,26,31,C.ink);r(-9,-28,7,28,C.darkStone);r(3,-28,7,28,C.darkStone);
  // Drum, dome ribs, lantern and Statue of Freedom silhouette.
  r(-31,-100,62,21,C.stone);r(-34,-104,68,5,C.light);for(let x=-27;x<31;x+=9){r(x,-99,3,17,C.darkStone);r(x+3,-99,3,17,C.light);}
  for(let j=0;j<20;j++){const half=30*Math.sqrt(Math.max(0,1-(19-j)*(19-j)/400));r(-half,-144+j*2,half*2,2,j%3===0?C.light:C.cream);}
  for(let x=-20;x<=20;x+=10)r(x,-133+Math.abs(x)*.5,2,29-Math.abs(x)*.5,C.shade);
  r(-9,-153,18,11,C.light);r(-6,-158,12,6,C.cream);r(-2,-166,4,9,C.ink);r(-3,-168,6,3,C.ink);r(-1,-172,2,4,C.ink);
  r(-170,1,340,3,C.light);r(-176,4,352,4,C.shade);r(-184,8,368,4,C.cream);r(-192,12,384,4,C.shade);
  for(const x of [-116,116]){r(x,-82,1,30,C.wood);const wave=quiet?0:Math.floor(Math.sin(time*.002)*2);poly([[x+1,-82],[x+18,-80+wave],[x+18,-69+wave],[x+1,-70]],C.rose);r(x+1,-82,6,6,C.blue);}
  ctx.restore();
  poly([[center-22,ground+16],[center+22,ground+16],[center+width*.26,height],[center-width*.26,height]],C.stone);
  for(let y=ground+20;y<height;y+=8)r(center-(y-ground)*1.4,y,(y-ground)*2.8,1,C.shade);
  for(const [x,y,s]of[[width*.04,ground+3,1.5],[width*.93,ground+4,1.4],[width*.14,ground+12,1],[width*.84,ground+15,1]])tree(x,y,s);
  for(let i=0;i<45;i++){const x=(i*137)%width,y=ground+22+(i*19)%Math.max(1,height-ground-24);if(Math.abs(x-center)>(y-ground)*1.4)r(x,y,2,1,C.grass);}
 }
 function interior(time,quiet){
  r(0,0,width,height,C.darkStone);
  const scale=width/480*zoom,camera=1130-progress*1045+vertical;
  ctx.save();ctx.translate(Math.round(width/2+pan*scale),Math.round(height/2-camera*scale));ctx.scale(scale,scale);
  // A continuous tower of architectural tiers, revealed as the camera rises.
  r(-245,-900,490,2295,C.shade);r(-236,-900,472,2285,C.stone);
  // Upper vault continues beyond the viewport; reaching the canopy never reveals an empty void.
  for(let y=-700;y<90;y+=42){for(let x=-228;x<228;x+=50){r(x,y,44,34,C.shade);r(x+3,y+3,38,28,C.stone);r(x,y,44,2,C.cream);r(x,y,2,34,C.cream);}}
  const centerGlow=ctx.createLinearGradient(-240,0,240,0);centerGlow.addColorStop(0,C.darkStone);centerGlow.addColorStop(.23,C.stone);centerGlow.addColorStop(.5,C.cream);centerGlow.addColorStop(.77,C.stone);centerGlow.addColorStop(1,C.darkStone);ctx.fillStyle=centerGlow;ctx.fillRect(-236,320,472,1050);
  // Distant stonework moves more slowly than the main architectural layer.
  ctx.save();ctx.globalAlpha=.14;
  for(let y=-1300;y<1500;y+=74){const yy=y+camera*.22;r(-236,yy,472,1,C.darkStone);for(let x=-220;x<236;x+=65)r(x,yy,1,73,C.shade);}
  ctx.restore();
  // Ground-level galleries and pilasters.
  for(let i=-3;i<=3;i++){
   const x=i*70;r(x-5,1040,10,277,C.cream);r(x+5,1040,4,277,C.shade);r(x-8,1035,20,8,C.light);r(x-9,1317,22,9,C.shade);
   for(let k=-2;k<=2;k++)r(x+k*2,1052,1,250,k%2?C.shade:C.light);
   if(i<3){const xx=x+35;r(xx-21,1110,42,70,C.darkGold);r(xx-18,1113,36,64,C.grass);r(xx-18,1113,36,23,C.blue);poly([[xx-18,1145],[xx,1135],[xx+18,1147],[xx+18,1177],[xx-18,1177]],C.grassLight);for(let f=-1;f<=1;f++){const fx=xx+f*10;r(fx-2,1155,4,16,f===0?C.cream:C.ink);r(fx-2,1151,4,4,C.wood);}oval(xx,1070,9,9,C.darkGold);oval(xx,1070,6,6,C.stone);}
  }
  // Stone gallery bands and a continuous pixel frieze.
  for(const y of [995,1002,1011,1019,1315,1324]){r(-245,y,490,5,C.shade);r(-245,y-3,490,3,C.light);}
  r(-240,884,480,100,C.darkGold);r(-240,889,480,86,C.stone);
  for(let i=0;i<34;i++){const x=-232+i*14,h=20+i%4*3;r(x,924,5,h,C.shade);r(x,918,5,5,C.shade);r(x-3,930,3,9,C.darkStone);r(x+5,928,4,3,C.shade);r(x-1,947,2,9,C.shade);r(x+4,947,2,9,C.shade);}
  // Upper drum: tall, bright windows and fluted columns.
  for(let i=-4;i<=4;i++){
   const x=i*58;r(x-4,595,8,264,C.cream);r(x+4,595,3,264,C.shade);r(x-8,589,18,7,C.light);r(x-8,859,18,8,C.light);r(x-2,606,1,240,C.light);
   if(i<4){const xx=x+29;r(xx-17,630,34,174,C.darkStone);r(xx-14,634,28,166,C.gold);r(xx-12,636,24,162,C.light);for(let j=0;j<6;j++){r(xx-12,645+j*25,24,2,C.stone);r(xx-1,636,2,162,C.shade);}r(xx-21,806,42,6,C.cream);}
  }
  for(const y of [570,579,875,882]){r(-248,y,496,5,C.light);r(-248,y+5,496,4,C.shade);}
  // Dome cross-section: stepped vault, coffered bands, and inward ribs.
  for(let row=0;row<70;row++){
   const yy=140+row*6,rr=80+Math.sqrt(Math.max(0,1-Math.pow((560-yy)/430,2)))*164;
   r(-rr,yy,rr*2,6,row%4===0?C.cream:C.stone);
   r(-rr,yy,4,6,C.shade);r(rr-4,yy,4,6,C.darkStone);
  }
  for(let ring=0;ring<7;ring++){
   const y=210+ring*49,w=99+ring*22;r(-w,y,w*2,3,C.light);r(-w,y+3,w*2,2,C.shade);
   for(let col=-3;col<=3;col++){const x=col*w/4,cw=w/4-9;r(x-cw/2,y+9,cw,29,C.shade);r(x-cw/2+2,y+11,cw-4,24,C.stone);r(x-cw/2,y+9,cw,2,C.light);}
  }
  for(let i=-4;i<=4;i++)poly([[i*15-1,150],[i*15+2,150],[i*59+3,570],[i*59-1,570]],C.cream);
  // Canopy: the real fresco, pixel-quantized and clipped to an oval.
  oval(0,135,109,67,C.darkGold);oval(0,131,105,65,C.light);oval(0,130,99,59,C.gold);
  if(fresco){ctx.save();ctx.beginPath();ctx.ellipse(0,130,96,55,0,0,Math.PI*2);ctx.clip();ctx.imageSmoothingEnabled=false;ctx.drawImage(fresco,-100,74,200,113);ctx.restore();}
  for(let j=0;j<6;j++)r(-10+j*4,63,2,4,C.gold);
  // Marble floor in a shallow Mode-7-like perspective.
  poly([[-250,1330],[250,1330],[330,1440],[-330,1440]],C.stone);
  for(let y=1332;y<1440;y+=8){const t=(y-1330)/110;for(let x=-350;x<350;x+=26){poly([[x,y],[x+26,y],[x+30+t*2,y+8],[x-4-t*2,y+8]],(Math.floor((y-1332)/8)+Math.floor(x/26))%2?C.cream:C.shade);}}
  oval(0,1390,52,16,C.ink);oval(0,1390,45,12,C.stone);poly([[0,1376],[8,1387],[35,1390],[8,1393],[0,1403],[-8,1393],[-35,1390],[-8,1387]],C.grass);
  // Window light shafts and slow square dust, with no flashing.
  ctx.globalAlpha=.11;poly([[58,635],[76,635],[-110,1330],[-215,1330]],C.light);poly([[-74,635],[-58,635],[160,1330],[255,1330]],C.light);ctx.globalAlpha=1;
  if(!quiet){for(let i=0;i<28;i++){const x=-220+(i*73)%440,y=70+((i*131+time*.004)%1260)+camera*.32;r(x,y,1,1,C.light);}}
  ctx.restore();
  // Near pilasters and motes pass faster, creating depth without changing rank height.
  const nearCamera=1130-progress*1045*1.18+vertical*1.1;
  for(const side of [0,1]){const x=side?width-10+pan*scale*.1:-4+pan*scale*.1;r(x,0,13,height,C.darkStone);r(x+2,0,3,height,C.cream);r(x+8,0,2,height,C.shade);for(let y=-900;y<1500;y+=118){const sy=height/2+(y-nearCamera)*scale;if(sy>-12&&sy<height+12){r(x-3,sy,19,4,C.cream);r(x-2,sy+4,17,3,C.shade);}}}
  if(!quiet){for(let i=0;i<14;i++){const x=(i*97+37)%width,y=(i*71+progress*1450+time*.009)%height;r(x,y,i%3?1:2,i%3?1:2,C.cream);}}
  // Rank milestones use the same score-to-height scale as the player camera.
  ctx.save();ctx.font='8px monospace';ctx.textAlign='right';
  for(const rank of window.RotundaEngine.ranks){const y=height/2+(progress-rank.points/700)*1045*scale;if(y<65||y>height-65)continue;const current=window.RotundaEngine.rankFor(progress*700).title===rank.title;ctx.fillStyle=current?C.gold:C.light;ctx.fillText(rank.short.toUpperCase(),width-17,y);r(width-13,y-4,9,2,current?C.gold:C.shade);}
  ctx.restore();
  // A small pixel eagle is the player's marker; answer tiers add stronger upward trails.
  const age=(time-rewardAt)/1000,bob=quiet?0:Math.round(Math.sin(time*.003)*1.5),ex=Math.round(width*eagleX),ey=Math.round(height*.5+bob);
  if(flight&&!quiet){for(let i=0;i<20;i++){const x=(i*83+11)%width,y=(time*.12+i*41)%height;r(x,y,1,7+rewardPoints/12,C.light);}r(ex+6,ey+13,3,12+Math.sin(time*.03)*4,C.gold);}
  const sprite=['....WWWW........','...WWWWYY.......','..WWWNN.........','TTTTNNNNNTTTT...','.TTTNNNNNTTT....','...TNNNNT.......','....NNNN........','....Y..Y........'];
  const colors={W:C.light,Y:C.gold,N:C.ink,T:C.darkStone};
  sprite.forEach((row,y)=>[...row].forEach((v,x)=>{if(colors[v])r(ex+x,ey+y,1,1,colors[v]);}));
  if(!quiet&&age>=0&&age<2.4&&rewardPoints){for(let i=0;i<Math.ceil(rewardPoints/10);i++){const x=ex-12+(i*17)%55,y=ey+16+((age*50+i*13)%60);r(x,y,1,5,rewardPoints>=80?C.gold:C.skyLight);}ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillStyle=C.ink;ctx.fillText('+'+rewardPoints,ex+9,ey-12-age*5);ctx.fillStyle=C.light;ctx.fillText('+'+rewardPoints,ex+8,ey-13-age*5);ctx.textAlign='left';}
  if(!quiet&&age>=0&&age<1.6&&rewardPoints){const count=Math.min(18,Math.ceil(rewardPoints/6));for(let i=0;i<count;i++){const angle=i*2.39996,spread=7+age*24,x=ex+6+Math.cos(angle)*spread,y=ey+4+Math.sin(angle)*spread-age*20;r(x,y,2,2,rewardPoints>=80?C.gold:rewardPoints>=40?C.skyLight:C.cream);if(rewardPoints>=60)r(x-1,y+1,4,1,C.light);}}
 }
 function resize(){const rect=canvas.getBoundingClientRect();const density=stage==='welcome'?3.2:2.8;width=Math.max(200,Math.min(640,Math.round(rect.width/density)));height=Math.max(160,Math.round(rect.height*width/rect.width));canvas.width=width;canvas.height=height;ctx.imageSmoothingEnabled=false;}
 const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 function draw(time){
  frame=requestAnimationFrame(draw);if(!active||time-last<1000/budget.fps-1)return;
  const started=performance.now(),dt=Math.min((time-last)/1000,.25);last=time;
  const quiet=reduced,ease=1-Math.exp(-dt/.55),spriteEase=1-Math.exp(-dt/.22);
  if(flight){const f=flight,t=quiet?1:Math.min(1,(time-f.started)/f.duration),e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;progress=f.from+(f.to-f.from)*e;canvas.dataset.ascent=String(Math.round(t*100));const points=progress*700,rank=window.RotundaEngine.rankFor(points+.01),crossed=rank.points>f.lastRank;if(crossed)f.lastRank=rank.points;canvas.dispatchEvent(new CustomEvent('rotunda-ascent',{detail:{points,rank,crossed,done:t===1}}));if(t===1){flight=null;f.resolve();}}
  else progress=quiet?target:progress+(target-progress)*ease;
  eagleX=quiet?.17:eagleX+((flight?.5:.17)-eagleX)*spriteEase;
  pan=quiet?panTarget:pan+(panTarget-pan)*ease;vertical=quiet?verticalTarget:vertical+(verticalTarget-vertical)*ease;zoom=quiet?zoomTarget:zoom+(zoomTarget-zoom)*ease;
  const z=Math.round(zoom*100);if(canvas.dataset.zoom!==String(z)){canvas.dataset.zoom=String(z);canvas.dispatchEvent(new CustomEvent('rotunda-zoom',{detail:z}));}
  ctx.imageSmoothingEnabled=false;if(stage==='welcome')exterior(time,quiet);else interior(time,quiet);
  budget.sample(performance.now()-started);canvas.dataset.renderFps=String(budget.fps);canvas.dataset.eagleX=eagleX.toFixed(3);
 }
 frame=requestAnimationFrame(draw);const visibility=()=>{active=!document.hidden;};document.addEventListener('visibilitychange',visibility);
 const pointers=new Map();let pinchDistance=null;
 const down=e=>{if(stage==='welcome')return;canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});pinchDistance=null;};
 const move=e=>{const before=pointers.get(e.pointerId);if(!before)return;const rect=canvas.getBoundingClientRect(),factor=480/rect.width/zoomTarget;if(pointers.size===1){panTarget=Math.max(-170,Math.min(170,panTarget+(e.clientX-before.x)*factor));verticalTarget=Math.max(-650,Math.min(650,verticalTarget-(e.clientY-before.y)*factor));}pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const[a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);if(pinchDistance)zoomTarget=Math.max(.8,Math.min(3,zoomTarget*distance/pinchDistance));pinchDistance=distance;}};
 const up=e=>{pointers.delete(e.pointerId);pinchDistance=null;};
 const wheel=e=>{if(stage==='welcome')return;e.preventDefault();zoomTarget=Math.max(.8,Math.min(3,zoomTarget*Math.exp(-e.deltaY*.0015)));};
 canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);canvas.addEventListener('wheel',wheel,{passive:false});
 return{ascend(from,to,points){if(flight){flight.resolve();flight=null;}progress=Math.max(0,from/700);target=Math.min(1,to/700);panTarget=verticalTarget=0;rewardPoints=points;rewardAt=performance.now();return new Promise(resolve=>{flight={from:progress,to:target,started:performance.now(),duration:2300+points*25,lastRank:window.RotundaEngine.rankFor(from).points,resolve};});},skipAscent(){if(flight){progress=target=flight.to;flight.resolve();flight=null;}},reward(points,rank=''){rewardPoints=points;rewardRank=rank;rewardAt=performance.now();},setProgress(p){const value=Math.max(0,Math.min(1,p));if(value!==target)verticalTarget=0;target=value;},setStage(value){if(stage!==value){stage=value;panTarget=verticalTarget=0;resize();}},setReduced(value){reduced=value;},look(dir){panTarget=Math.max(-170,Math.min(170,panTarget-dir*50));},zoom(factor){zoomTarget=Math.max(.8,Math.min(3,zoomTarget*factor));},resetView(){panTarget=verticalTarget=0;zoomTarget=1.15;},dispose(){if(flight){flight.resolve();flight=null;}disposed=true;cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);canvas.removeEventListener('wheel',wheel);}};
}

// Frame cost changes quality, never elapsed-time animation speed or the game timer.
export function createFrameBudget(){let fps=60,average=0,slow=0,fast=0;return{get fps(){return fps;},sample(ms){average=average*.9+Math.max(0,ms)*.1;if(fps===60){slow=average>10?slow+1:Math.max(0,slow-2);if(slow>=30){fps=30;fast=0;}}else{fast=average<6?fast+1:0;if(fast>=180){fps=60;slow=0;}}return fps;}};}
