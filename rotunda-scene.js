// Original raster scenery, composed on a fixed pixel grid with an automatic ascent.
export function createRotundaScene(canvas,{reduced=false}={}){
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)throw Error('Canvas unavailable');
 const C={cream:'#f5e9ca',gold:'#d1a75b',light:'#fff5db'};
 let width=1200,height=800,dpr=1,stage='welcome',progress=0,target=0,eagleX=.18,flight=null,frame,last=0,active=!document.hidden,disposed=false,rewardPoints=0,rewardAt=-1e4,finishPoints=0;
 const budget=createFrameBudget(),art={};

 const P={night:'#172b38',deep:'#243e49',shadow:'#5a6b69',shade:'#899181',stone:'#b2b49b',cream:'#d7cfaf',light:'#eee1b7',gold:'#c2a66c',sky:'#829ca7',blue:'#566e85',red:'#a97970',green:'#35544c'};
 function box(x,a,b,w,h,c){x.fillStyle=c;x.fillRect(Math.round(a),Math.round(b),Math.round(w),Math.round(h));}
 function polygon(x,points,c){x.fillStyle=c;x.beginPath();points.forEach(([a,b],i)=>i?x.lineTo(Math.round(a),Math.round(b)):x.moveTo(Math.round(a),Math.round(b)));x.closePath();x.fill();}
 function ellipse(x,a,b,rx,ry,c){x.fillStyle=c;x.beginPath();x.ellipse(a,b,rx,ry,0,0,Math.PI*2);x.fill();}
 function surface(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
 function rect(x,a,b,w,h,c){box(x,a,b,w,h,c);}
 function cloud(x,a,b,w){rect(x,a,b,w,3,'#b6b9ab');rect(x,a+5,b-3,w-10,5,'#b6b9ab');rect(x,a+11,b-6,w-22,5,'#c5c4b0');}
 function foliage(x,a,b,w,h,seed){for(let y=0;y<h;y+=4){const spread=w*(.35+.65*Math.sin((y/h)*Math.PI*.75));const left=a+(w-spread)/2;rect(x,left,b+y,spread,5,P.deep);for(let k=0;k<3;k++){const off=(seed+y*7+k*13)%Math.max(1,Math.floor(spread));rect(x,left+off,b+y,5,3,k===0?'#577565':P.green);}}}
 function figure(x,a,b,color,flip=1){rect(x,a,b,3,3,'#cfb99b');rect(x,a-1,b+3,5,7,color);rect(x,a-4*flip,b+4,4,2,color);rect(x,a+3*flip,b+5,4,2,color);rect(x,a-1,b+10,2,4,P.cream);rect(x,a+2,b+10,2,4,P.cream);}
 function pillar(x,a,b,w,h){rect(x,a+2,b+3,w,h,P.shadow);rect(x,a,b,w,h,P.stone);rect(x,a,b,2,h,P.light);rect(x,a+w-2,b,2,h,P.shade);for(let i=3;i<w-2;i+=3)rect(x,a+i,b,1,h,P.shade);rect(x,a-3,b-4,w+6,3,P.cream);rect(x,a-2,b-1,w+4,2,P.shadow);rect(x,a-3,b+h,w+6,3,P.cream);}
 function ledge(x,y,w=320){rect(x,0,y,w,2,P.light);rect(x,0,y+2,w,3,P.shade);rect(x,0,y+5,w,2,P.shadow);for(let a=0;a<w;a+=8)rect(x,a,y+7,3,2,P.cream);}
 function fresco(x,cx,cy,rx,ry){
  ellipse(x,cx,cy,rx+2,ry+2,P.gold);ellipse(x,cx,cy,rx,ry,'#667f95');
  const clouds=[[cx-rx*.7,cy+ry*.35,rx*.7],[cx-rx*.2,cy+ry*.65,rx*.9],[cx+rx*.15,cy+ry*.1,rx*.65],[cx-rx*.5,cy-ry*.4,rx*.65],[cx+rx*.1,cy-ry*.45,rx*.55]];
  for(const [a,b,w]of clouds){rect(x,a,b,w,4,'#a9b3b3');rect(x,a+3,b-3,w-5,4,'#c8c7b6');rect(x,a+7,b-5,w-13,3,P.cream);}
  // Tiny historical figures are sprite motifs, rather than painted faces.
  figure(x,cx-1,cy-10,'#3d5a79');figure(x,cx-18,cy-6,'#b18275',-1);figure(x,cx+16,cy-7,'#cdc4a5');
  for(const [a,b,c]of [[cx-32,cy+12,'#91747e'],[cx-11,cy+19,'#6b7b74'],[cx+15,cy+17,'#9b7b63']]){rect(x,a,b,2,2,P.cream);rect(x,a-2,b+2,6,6,c);}
 }
 function dome(){const c=surface(320,200),x=c.getContext('2d');rect(x,0,0,320,200,P.deep);
  const cx=160,cy=50,rx=217,ry=125;
  ellipse(x,cx,cy,rx,ry,P.shade);
  // Each recessed coffer has hand-sized pixel bevels, stepped edges, and a rosette.
  for(let ring=0;ring<5;ring++){const inner=.38+ring*.122,outer=inner+.115,count=ring<2?22:26;
   for(let i=0;i<count;i++){const start=i*Math.PI*2/count+.008,end=(i+1)*Math.PI*2/count-.008,point=(r,t)=>[cx+Math.cos(t)*rx*r,cy+Math.sin(t)*ry*r];
    polygon(x,[point(inner,start),point(outer,start),point(outer,end),point(inner,end)],P.cream);
    polygon(x,[point(inner+.016,start+.009),point(outer-.01,start+.009),point(outer-.01,end-.009),point(inner+.016,end-.009)],P.shadow);
    polygon(x,[point(inner+.033,start+.025),point(outer-.024,start+.025),point(outer-.024,end-.025),point(inner+.033,end-.025)],ring%2?'#9da28d':P.stone);
    const mid=(start+end)/2,rr=(inner+outer)/2,px=cx+Math.cos(mid)*rx*rr,py=cy+Math.sin(mid)*ry*rr;rect(x,px-1,py-2,2,5,P.cream);rect(x,px-2,py-1,4,2,P.cream);rect(x,px,py,1,1,P.gold);
   }
  }
  fresco(x,cx,cy,73,49);
  // The window drum curves below the dome, with slim rectangular panes.
  for(let i=0;i<11;i++){const a=6+i*30,y=153-Math.round(Math.abs(5-i)*5);rect(x,a,y,16,40,P.shadow);rect(x,a+2,y+2,12,35,'#c9c5a7');rect(x,a+3,y+3,10,32,'#e0d3a5');rect(x,a+7,y+3,1,32,P.shade);for(let j=0;j<3;j++)rect(x,a+3,y+9+j*8,10,1,P.shade);rect(x,a+3,y+3,1,31,P.light);rect(x,a-2,y+39,20,3,P.cream);}
  const dim=x.createLinearGradient(0,0,320,0);dim.addColorStop(0,'#182e3d66');dim.addColorStop(.25,'#182e3d00');dim.addColorStop(.75,'#182e3d00');dim.addColorStop(1,'#182e3d66');x.fillStyle=dim;x.fillRect(0,0,320,200);return c;
 }
 function exterior(){const c=surface(320,200),x=c.getContext('2d');const sky=x.createLinearGradient(0,0,0,200);sky.addColorStop(0,'#526f84');sky.addColorStop(1,'#b8baa5');x.fillStyle=sky;x.fillRect(0,0,320,200);
  cloud(x,15,38,51);cloud(x,230,48,64);cloud(x,250,18,38);cloud(x,93,21,39);
  rect(x,0,143,320,57,'#557464');rect(x,16,112,288,42,P.stone);rect(x,14,108,292,4,P.cream);rect(x,14,112,292,2,P.shadow);
  for(let a=23;a<300;a+=12){rect(x,a,118,4,10,P.deep);rect(x,a+1,119,1,8,'#829f9b');rect(x,a,134,4,9,P.shadow);rect(x,a-1,115,6,1,P.light);}
  rect(x,111,98,98,58,P.cream);polygon(x,[[105,98],[160,77],[215,98]],P.light);polygon(x,[[116,95],[160,81],[204,95]],P.shade);
  for(let a=119;a<206;a+=13)pillar(x,a,103,4,47);rect(x,153,131,14,22,P.deep);
  rect(x,137,78,46,17,P.stone);for(let a=140;a<182;a+=6){rect(x,a,81,2,11,P.deep);rect(x,a+2,80,2,13,P.cream);}
  for(let y=45;y<78;y++){const t=(78-y)/34,r=23*Math.sqrt(Math.max(0,1-t*t));rect(x,160-r,y,r*2,1,y%6===0?P.cream:P.stone);}
  for(let i=-3;i<=3;i++)for(let y=49;y<77;y++){const bend=Math.sqrt(Math.max(0,1-((78-y)/34)**2));rect(x,160+i*6*bend,y,1,1,i>0?P.light:P.shade);}
  rect(x,156,38,8,7,P.cream);rect(x,158,39,1,4,P.shadow);rect(x,161,39,1,4,P.shadow);rect(x,159,32,2,6,P.deep);rect(x,158,31,3,2,P.deep);
  for(let i=0;i<5;i++)rect(x,103-i*4,156+i*3,114+i*8,2,P.cream);
  polygon(x,[[146,171],[174,171],[207,200],[113,200]],'#9ba18b');for(let i=0;i<4;i++)rect(x,143-i*8,177+i*6,34+i*16,1,'#71877b');
  for(const side of [0,1])for(let i=0;i<4;i++){const a=side?290-i*11:8+i*11;rect(x,a+5,145+i*4,2,34,'#4b5146');foliage(x,a-8,125+i*4,29,31,i*17+side*5);}
  return c;
 }
 function room(){const c=surface(320,600),x=c.getContext('2d');rect(x,0,0,320,600,P.stone);
  for(let y=4;y<560;y+=13){rect(x,0,y,320,1,'#a6ad96');for(let a=(y%2)*18;a<320;a+=36)rect(x,a,y+1,1,11,'#a6ad96');}
  // Upper windows, quiet coffer bands, lower historical paintings, and the marble floor.
  for(let i=0;i<10;i++){const a=5+i*32;pillar(x,a,70,5,160);rect(x,a+10,88,15,116,P.shadow);rect(x,a+12,90,11,111,'#d8d0ad');for(let y=94;y<201;y+=14){rect(x,a+13,y,8,10,'#e8ddb5');rect(x,a+17,y,1,10,P.shade);}rect(x,a+8,204,19,3,P.cream);}
  ledge(x,52);ledge(x,230);ledge(x,258);
  rect(x,0,270,320,30,P.shade);for(let i=0;i<38;i++){const a=i*9;rect(x,a+2,278,2,3,P.shadow);rect(x,a+1,281,4,8,P.shadow);rect(x,a,289,2,6,P.shadow);rect(x,a+4,289,2,6,P.shadow);}ledge(x,301);
  for(let i=0;i<7;i++){const a=i*48;pillar(x,a,326,9,195);rect(x,a+15,374,26,72,P.shadow);rect(x,a+16,375,24,69,P.gold);rect(x,a+18,377,20,65,P.blue);polygon(x,[[a+18,410],[a+26,393],[a+38,410],[a+38,441],[a+18,441]],'#657b6c');for(let k=0;k<4;k++){rect(x,a+20+k*4,412+k%2*4,2,3,P.cream);rect(x,a+19+k*4,415+k%2*4,4,12,k%2?P.deep:'#9a8b72');}rect(x,a+23,351,12,2,P.gold);rect(x,a+21,353,2,10,P.gold);rect(x,a+35,353,2,10,P.gold);rect(x,a+24,365,10,2,P.gold);}
  ledge(x,521);for(let y=534;y<600;y+=9)for(let a=0;a<320;a+=20)rect(x,a,y,20,9,(Math.floor(a/20)+Math.floor(y/9))%2?'#657b74':'#b7b89d');
  const shade=x.createLinearGradient(0,0,320,0);shade.addColorStop(0,'#1b334755');shade.addColorStop(.5,'#1b334700');shade.addColorStop(1,'#1b334755');x.fillStyle=shade;x.fillRect(0,0,320,600);return c;
 }
 art.front=exterior();art.room=room();art.dome=dome();canvas.dataset.artwork='handcrafted-pixels';
 function cover(image,{focus=.5,zoom=1}={}){const scale=Math.max(width/image.width,height/image.height)*zoom,w=image.width*scale,h=image.height*scale;ctx.drawImage(image,Math.round((width-w)/2),Math.round((height-h)*focus),Math.round(w),Math.round(h));}
 function roomView(time,quiet){
  if(!art.room)return;
  const image=art.room,scale=Math.max(width/image.width,height/(image.height*.62)),viewH=height/scale,travel=Math.max(0,image.height-viewH),sy=(1-progress)*travel;
  ctx.drawImage(image,0,sy,image.width,viewH,Math.round((width-image.width*scale)/2),0,Math.round(image.width*scale),height);
  const mix=Math.max(0,Math.min(1,(progress-.76)/.24));
  if(mix>0&&art.dome){ctx.save();ctx.globalAlpha=mix*mix*(3-2*mix);cover(art.dome,{focus:0});ctx.restore();}
  // Light motes are small pixel sprites, not vector beams or decorative banners.
  if(!quiet)for(let i=0;i<18;i++){ctx.globalAlpha=.12+(i%4)*.035;box(ctx,(i*137+73)%width,(i*83+time*.009+progress*750)%height,2,2,C.light);}ctx.globalAlpha=1;
  if(stage!=='finish')markers();eagle(time,quiet);
  const age=(time-rewardAt)/1000;if(!quiet&&age<2.1&&rewardPoints){ctx.font='18px "Pixelify Sans",monospace';ctx.textAlign='center';ctx.fillStyle=C.light;ctx.fillText('+'+rewardPoints,width*eagleX,height*.43-42-age*9);}
 }
 function markers(){ctx.font='13px "Pixelify Sans",monospace';ctx.textAlign='right';let previous=-100;for(const rank of [...window.RotundaEngine.ranks].reverse()){const y=height*.43+(progress-rank.points/700)*height*2.3;if(y<156||y>height-80||y-previous<38)continue;previous=y;const current=window.RotundaEngine.rankFor(progress*700).title===rank.title,text=rank.short.toUpperCase(),w=ctx.measureText(text).width;box(ctx,width-w-36,y-14,w+26,22,'#102635c9');ctx.fillStyle=current?'#ffe3a5':'#d3d8c9';ctx.fillText(text,width-24,y);box(ctx,width-17,y-4,10,2,current?C.gold:C.cream);}}
 function eagle(time,quiet,anchor=.43){const x=width*eagleX,y=height*anchor+(quiet?0:Math.sin(time*.0025)*3),s=Math.max(1.35,Math.min(2.1,width/700)),flap=quiet?0:Math.sin(time*(flight?.015:.006))*7;ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(s,s);polygon(ctx,[[-25,-4-flap],[-16,-10-flap],[-4,-3],[5,0],[-3,5],[-16,1],[-26,4-flap]],'#594639');for(let i=0;i<6;i++)box(ctx,-27+i*3,-2-flap+i*.55,3,8-i*.6,i%2?'#7b6250':'#4d4037');polygon(ctx,[[1,0],[13,-9-flap*.7],[26,-14-flap],[25,-5-flap],[17,1],[4,7]],'#6d5441');for(let i=0;i<4;i++)box(ctx,15+i*3,-10-flap+i,2,8,'#9b7a56');ellipse(ctx,0,3,10,7,'#69503c');polygon(ctx,[[-8,5],[-18,11],[-11,14],[-3,9]],'#f1ecd9');box(ctx,4,-7,12,10,'#f7f0df');box(ctx,7,-9,6,3,'#fff9eb');box(ctx,14,-4,8,3,'#e9b94e');polygon(ctx,[[19,-1],[16,3],[16,-2]],'#d39a39');box(ctx,12,-6,2,2,'#172b3b');box(ctx,2,9,2,5,'#d5a43e');box(ctx,5,12,4,2,'#d5a43e');if(flight){box(ctx,0,15,16,6,C.cream);box(ctx,-2,14,4,8,C.light);box(ctx,14,14,4,8,C.light);box(ctx,7,15,2,6,'#ad7653');}ctx.restore();}

 function resize(){const rect=canvas.getBoundingClientRect();width=Math.max(320,Math.round(rect.width));height=Math.max(320,Math.round(rect.height));dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);canvas.dataset.resolution=width+'x'+height;}
 const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 function draw(time){frame=requestAnimationFrame(draw);if(!active||time-last<1000/budget.fps-1)return;const begin=performance.now(),dt=Math.min((time-last)/1000,.25);last=time;
  if(flight){const f=flight,t=reduced?1:Math.min(1,(time-f.started)/f.duration),e=t*t*(3-2*t);progress=f.from+(f.to-f.from)*e;canvas.dataset.ascent=String(Math.round(t*100));const rank=window.RotundaEngine.rankFor(progress*700+.01),crossed=rank.points>f.lastRank;if(crossed)f.lastRank=rank.points;canvas.dispatchEvent(new CustomEvent('rotunda-ascent',{detail:{points:progress*700,rank,crossed,done:t===1}}));if(t===1){flight=null;f.resolve();}}
  else progress=reduced?target:progress+(target-progress)*(1-Math.exp(-dt/.35));
  eagleX=reduced?.18:eagleX+((flight?.5:.18)-eagleX)*(1-Math.exp(-dt/.22));ctx.setTransform(dpr,0,0,dpr,0,0);ctx.imageSmoothingEnabled=false;box(ctx,0,0,width,height,'#122c3b');
  if(stage==='welcome'){if(art.front)cover(art.front,{focus:.42});eagle(time,reduced,.78);}else roomView(time,reduced);
  budget.sample(performance.now()-begin);canvas.dataset.renderFps=String(budget.fps);canvas.dataset.eagleX=eagleX.toFixed(3);canvas.dataset.cameraProgress=progress.toFixed(3);
 }
 frame=requestAnimationFrame(draw);const visibility=()=>{active=!document.hidden;};document.addEventListener('visibilitychange',visibility);
 return{ascend(from,to,points){if(flight)flight.resolve();progress=Math.max(0,from/700);target=Math.min(1,to/700);rewardPoints=points;rewardAt=performance.now();return new Promise(resolve=>{flight={from:progress,to:target,started:performance.now(),duration:2300+points*25,lastRank:window.RotundaEngine.rankFor(from).points,resolve};});},skipAscent(){if(flight){progress=target=flight.to;flight.resolve();flight=null;}},reward(points){rewardPoints=points;rewardAt=performance.now();},setProgress(p){target=Math.max(0,Math.min(1,p));},setStage(s){stage=s;canvas.dataset.scene=s;},setFinish(points){finishPoints=Math.max(0,Math.min(700,points));canvas.dataset.finishTier=finishPoints>=700?'summit':finishPoints>=580?'gold':finishPoints>=400?'silver':'bronze';},setReduced(value){reduced=value;},dispose(){disposed=true;if(flight)flight.resolve();cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',visibility);}};
}
export function createFrameBudget(){let fps=60,average=0,slow=0,fast=0;return{get fps(){return fps;},sample(ms){average=average*.9+Math.max(0,ms)*.1;if(fps===60){slow=average>10?slow+1:Math.max(0,slow-2);if(slow>=30){fps=30;fast=0;}}else{fast=average<6?fast+1:0;if(fast>=180){fps=60;slow=0;}}return fps;}};}
