// Original raster scenery, composed on a fixed pixel grid with an automatic ascent.
export function createRotundaScene(canvas,{reduced=false}={}){
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)throw Error('Canvas unavailable');
 const C={cream:'#f5e9ca',gold:'#d1a75b',light:'#fff5db'};
 let width=1200,height=800,dpr=1,stage='welcome',progress=0,target=0,eagleX=.18,flight=null,frame,last=0,active=!document.hidden,disposed=false,rewardPoints=0,rewardAt=-1e4,finishPoints=0;
 const budget=createFrameBudget(),art={};

 const P={night:'#172b38',deep:'#243e49',shadow:'#796f61',shade:'#a89b84',stone:'#c7baa0',cream:'#e3d4b6',light:'#f3e5c5',gold:'#c2a66c',sky:'#829ca7',blue:'#566e85',red:'#a97970',green:'#35544c'};
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
 function paintedCanopy(image){
  const c=surface(256,256),x=c.getContext('2d');x.drawImage(image,280,20,900,900,0,0,256,256);
  const pixels=x.getImageData(0,0,256,256),colors=['#f5ecd4','#e5dbc0','#cec9b7','#b7b5ad','#9ba4ac','#7b8e9c','#617286','#47576d','#384450','#bfc5ca','#d2d7d4','#b7a2a1','#927583','#73596b','#cab29b','#ae8e71','#8b6c52','#624b3e','#433c36','#b4af88','#929b7f','#6b806e','#465e55','#c5ac69','#ac8f52','#806d44','#ad7766','#8b554c','#d4bcb1','#ddd2b2','#dbd9c8','#f1e4bd'].map(hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)));
  for(let i=0;i<pixels.data.length;i+=4){let best=colors[0],d=Infinity;for(const color of colors){const n=(pixels.data[i]-color[0])**2+(pixels.data[i+1]-color[1])**2+(pixels.data[i+2]-color[2])**2;if(n<d){d=n;best=color;}}for(let k=0;k<3;k++)pixels.data[i+k]=best[k];}x.putImageData(pixels,0,0);return c;
 }
 function dome(){const c=surface(640,480),x=c.getContext('2d');rect(x,0,0,640,480,'#d8ccb3');
  const cx=320,cy=151,rx=413,ry=287;
  ellipse(x,cx,cy,rx,ry,'#a99d86');
  // Recessed coffers and rosettes surrounding the central oculus.
  for(let ring=0;ring<5;ring++){const inner=.43+ring*.112,outer=inner+.105,count=ring<2?28:36;
   for(let i=0;i<count;i++){const start=i*Math.PI*2/count+.007,end=(i+1)*Math.PI*2/count-.007,point=(r,t)=>[cx+Math.cos(t)*rx*r,cy+Math.sin(t)*ry*r];
    polygon(x,[point(inner,start),point(outer,start),point(outer,end),point(inner,end)],'#f4ead3');
    polygon(x,[point(inner+.008,start+.008),point(outer-.008,start+.008),point(outer-.008,end-.008),point(inner+.008,end-.008)],'#9b8f7a');
    polygon(x,[point(inner+.025,start+.018),point(outer-.023,start+.018),point(outer-.023,end-.018),point(inner+.025,end-.018)],'#c6bca4');
    const mid=(start+end)/2,rr=(inner+outer)/2,px=cx+Math.cos(mid)*rx*rr,py=cy+Math.sin(mid)*ry*rr;rect(x,px-2,py-3,4,7,'#eee4cc');rect(x,px-3,py-1,7,3,'#eee4cc');rect(x,px,py,2,2,'#a99b7e');
   }
  }
  ellipse(x,cx,cy,181,128,'#f8efd9');ellipse(x,cx,cy,175,122,'#a79471');
  if(art.canopy){x.save();x.beginPath();x.ellipse(cx,cy,170,117,0,0,Math.PI*2);x.clip();x.imageSmoothingEnabled=false;x.drawImage(art.canopy,cx-174,cy-122,348,244);x.restore();}else fresco(x,cx,cy,169,116);
  for(let i=0;i<48;i++){const t=i*Math.PI*2/48;rect(x,cx+Math.cos(t)*178-1,cy+Math.sin(t)*125-1,3,3,'#d5c5a4');}
  // A visible section of the circular window drum, rather than a second ceiling.
  for(let i=0;i<12;i++){const a=8+i*53,y=365-Math.round(Math.abs(5.5-i)*4);rect(x,a,y,34,82,'#9f927b');rect(x,a+3,y+3,28,75,'#f1e6c8');rect(x,a+6,y+6,22,69,'#cbc7b3');rect(x,a+16,y+6,2,69,'#9b967f');for(let j=0;j<5;j++)rect(x,a+6,y+16+j*12,22,2,'#a59c85');rect(x,a+4,y+4,2,72,'#fff0d0');rect(x,a-3,y+81,40,5,'#eee0c2');}
  for(let y=451;y<480;y+=7)rect(x,0,y,640,2,y%2?'#a69a82':'#f1e5c9');return c;
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
 function room(){const c=surface(640,1320),x=c.getContext('2d');rect(x,0,0,640,1320,'#c9b99a');
  // Warm sandstone, not a generic green stone tower.
  for(let y=8;y<1190;y+=23){rect(x,0,y,640,1,'#b6a589');for(let a=(y%2)*36;a<640;a+=76)rect(x,a,y,1,22,'#b6a589');}
  x.drawImage(art.dome,0,-50,640,480);
  for(let i=0;i<12;i++){const a=8+i*53;pillar(x,a,420,9,196);rect(x,a+15,446,29,133,'#8c826d');rect(x,a+18,449,23,127,'#e3d6b7');rect(x,a+21,452,17,121,'#b6beb5');for(let y=460;y<570;y+=18)rect(x,a+21,y,17,2,'#8b8e7d');rect(x,a+28,452,2,121,'#8b8e7d');rect(x,a+13,581,34,5,'#f0e2c4');}
  for(const y of [410,617,644,723]){rect(x,0,y,640,4,'#f2e3c6');rect(x,0,y+4,640,6,'#96876f');rect(x,0,y+10,640,4,'#d6c6a7');}
  // Grisaille history frieze below the windows: figures, horses and architectural scenes.
  rect(x,0,658,640,62,'#bfb396');for(let i=0;i<36;i++){const a=i*18,y=675+(i%3)*2;rect(x,a+4,y,4,4,'#756b59');polygon(x,[[a+3,y+4],[a+9,y+4],[a+12,y+24],[a,y+24]],i%2?'#8d816a':'#e1d2b3');rect(x,a+2,y+24,3,12,'#8d816a');rect(x,a+9,y+24,3,12,'#8d816a');rect(x,a-2,y+7,8,3,'#8d816a');if(i%7===0){rect(x,a-6,y+18,23,6,'#8d816a');rect(x,a+13,y+10,5,13,'#8d816a');}if(i%11===0)polygon(x,[[a+2,y-5],[a+2,y+19],[a+22,y+19]],'#e0d1b2');}
  // Doric pilasters divide broad historical paintings and entrance bays.
  for(let i=-1;i<6;i++){const a=i*128+7;pillar(x,a,759,15,378);rect(x,a-5,750,25,5,'#f0dfbe');rect(x,a-3,755,21,5,'#a99a7d');
   const cx=a+70;ellipse(x,cx,789,17,15,'#998c73');ellipse(x,cx,789,13,11,'#dacaac');ellipse(x,cx,786,5,6,'#afa083');rect(x,cx-8,792,16,5,'#afa083');
   if(i%2===0){rect(x,a+28,848,85,133,'#766348');rect(x,a+31,851,79,127,'#c5a66b');rect(x,a+35,855,71,119,'#52697b');polygon(x,[[a+35,900],[a+59,877],[a+79,893],[a+105,877],[a+105,973],[a+35,973]],'#788475');rect(x,a+38,941,64,28,'#7d6d58');for(let k=0;k<7;k++)figure(x,a+40+k*8,921+(k%3)*4,k%2?'#8b7260':'#b7b09b');rect(x,a+36,974,69,2,'#e5cc96');}
   else{rect(x,a+31,839,79,267,'#a6977b');rect(x,a+37,846,67,259,'#4c554e');rect(x,a+43,852,55,252,'#6b7161');rect(x,a+69,855,2,246,'#a89c7f');for(let y=864;y<1094;y+=42){rect(x,a+46,y,20,32,'#596151');rect(x,a+75,y,20,32,'#596151');}}
   // Carved olive wreath ornaments above the entablature.
   for(let k=0;k<10;k++){const t=k*Math.PI*2/10;rect(x,a+70+Math.cos(t)*23,790+Math.sin(t)*20,4,3,'#dcccaf');}
  }
  rect(x,0,1139,640,7,'#9d8c71');rect(x,0,1146,640,6,'#e6d6b7');rect(x,0,1152,640,168,'#af8d72');
  // The Rotunda floor has concentric stone rings, rather than a checkerboard.
  for(let i=8;i>=0;i--)ellipse(x,320,1342,470-i*46,164-i*14,i%2?'#c1a58b':'#8e7765');ellipse(x,320,1342,92,44,'#e4dccc');
  const shade=x.createLinearGradient(0,0,640,0);shade.addColorStop(0,'#302d3150');shade.addColorStop(.35,'#302d3100');shade.addColorStop(.65,'#302d3100');shade.addColorStop(1,'#302d3150');x.fillStyle=shade;x.fillRect(0,0,640,1320);return c;
 }
 art.front=exterior();art.dome=dome();art.room=room();canvas.dataset.artwork='handcrafted-pixels';
 const painting=new Image();painting.onload=()=>{if(disposed)return;try{art.canopy=paintedCanopy(painting);art.dome=dome();art.room=room();canvas.dataset.fresco='apotheosis-palette';}catch{canvas.dataset.fresco='sprite-fallback';}};painting.onerror=()=>{canvas.dataset.fresco='sprite-fallback';};painting.src=new URL('./assets/rotunda/apotheosis.webp',import.meta.url).href;
 function cover(image,{focus=.5,zoom=1}={}){const scale=Math.max(width/image.width,height/image.height)*zoom,w=image.width*scale,h=image.height*scale;ctx.drawImage(image,Math.round((width-w)/2),Math.round((height-h)*focus),Math.round(w),Math.round(h));}
 function roomView(time,quiet){
  if(!art.room)return;
  const image=art.room,scale=Math.max(width/image.width,height/(image.height*.62)),viewH=height/scale,travel=Math.max(0,image.height-viewH),pose=cameraPose(progress*700),sy=(1-pose.wall)*Math.max(0,travel-viewH*.25);
  ctx.drawImage(image,0,sy,image.width,viewH,Math.round((width-image.width*scale)/2),0,Math.round(image.width*scale),height);
  const mix=pose.dome;canvas.dataset.domeReveal=mix.toFixed(3);canvas.dataset.wallTravel=pose.wall.toFixed(3);
  if(mix>.001&&art.dome){ctx.save();const w=width*pose.zoom,h=Math.min(height,width*.8)*mix*pose.zoom,y=-Math.max(0,h-height)*.12;ctx.drawImage(art.dome,Math.round((width-w)/2),Math.round(y),Math.round(w),Math.round(h));if(h+y<height){box(ctx,0,h+y-3,width,3,'#e9d9ba');box(ctx,0,h+y,width,3,'#8c7b62');}ctx.restore();}
  // Light motes are small pixel sprites, not vector beams or decorative banners.
  if(!quiet)for(let i=0;i<18;i++){ctx.globalAlpha=.12+(i%4)*.035;box(ctx,(i*137+73)%width,(i*83+time*.009+progress*750)%height,2,2,C.light);}ctx.globalAlpha=1;
  if(stage!=='finish')markers();if(flight&&!quiet)ascentTrail(time);eagle(time,quiet);
  const age=(time-rewardAt)/1000;if(!quiet&&age<2.1&&rewardPoints){ctx.font='18px "Pixelify Sans",monospace';ctx.textAlign='center';ctx.fillStyle=C.light;ctx.fillText('+'+rewardPoints,width*eagleX,height*.43-42-age*9);}
 }
 function ascentTrail(time){const f=flight,t=Math.min(1,(time-f.started)/f.duration),lift=Math.sin(Math.PI*t)*height*.09*f.power;
  ctx.save();ctx.fillStyle=f.color;for(let i=0;i<f.particles;i++){const age=((time*.0015+i*.173)%1),x=width*eagleX+Math.sin(i*7.3)*14*f.power,y=height*.43-lift+22+age*(22+f.power*105);ctx.globalAlpha=(1-age)*(.24+f.power*.24);box(ctx,x,y,i%3?2:3,i%3?3:5,f.color);}ctx.restore();
  const x=width-18,y=height*.43,dy=(f.to-f.from)*height*2.3;ctx.save();ctx.strokeStyle=f.color;ctx.lineWidth=2;ctx.globalAlpha=.7;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,Math.min(height-90,y+dy));ctx.stroke();box(ctx,x-4,y-2,8,4,f.color);ctx.restore();
 }
 function markers(){ctx.font='13px "Pixelify Sans",monospace';ctx.textAlign='right';let previous=-100;for(const rank of [...window.RotundaEngine.ranks].reverse()){const y=height*.43+(progress-rank.points/700)*height*2.3;if(y<156||y>height-80||y-previous<38)continue;previous=y;const current=window.RotundaEngine.rankFor(progress*700).title===rank.title,text=rank.short.toUpperCase(),w=ctx.measureText(text).width;box(ctx,width-w-36,y-14,w+26,22,'#102635c9');ctx.fillStyle=current?'#ffe3a5':'#d3d8c9';ctx.fillText(text,width-24,y);box(ctx,width-17,y-4,10,2,current?C.gold:C.cream);}}
 function eagle(time,quiet,anchor=.43){const lift=flight&&!quiet?Math.sin(Math.PI*Math.min(1,(time-flight.started)/flight.duration))*height*.09*flight.power:0;const x=width*eagleX,y=height*anchor-lift+(quiet?0:Math.sin(time*.0025)*3),s=Math.max(1.35,Math.min(2.1,width/700)),flap=quiet?0:Math.sin(time*(flight?.015:.006))*7;ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(s,s);polygon(ctx,[[-25,-4-flap],[-16,-10-flap],[-4,-3],[5,0],[-3,5],[-16,1],[-26,4-flap]],'#594639');for(let i=0;i<6;i++)box(ctx,-27+i*3,-2-flap+i*.55,3,8-i*.6,i%2?'#7b6250':'#4d4037');polygon(ctx,[[1,0],[13,-9-flap*.7],[26,-14-flap],[25,-5-flap],[17,1],[4,7]],'#6d5441');for(let i=0;i<4;i++)box(ctx,15+i*3,-10-flap+i,2,8,'#9b7a56');ellipse(ctx,0,3,10,7,'#69503c');polygon(ctx,[[-8,5],[-18,11],[-11,14],[-3,9]],'#f1ecd9');box(ctx,4,-7,12,10,'#f7f0df');box(ctx,7,-9,6,3,'#fff9eb');box(ctx,14,-4,8,3,'#e9b94e');polygon(ctx,[[19,-1],[16,3],[16,-2]],'#d39a39');box(ctx,12,-6,2,2,'#172b3b');box(ctx,2,9,2,5,'#d5a43e');box(ctx,5,12,4,2,'#d5a43e');if(flight){box(ctx,0,15,16,6,C.cream);box(ctx,-2,14,4,8,C.light);box(ctx,14,14,4,8,C.light);box(ctx,7,15,2,6,'#ad7653');}ctx.restore();}

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
 return{ascend(from,to,points){if(flight)flight.resolve();progress=Math.max(0,from/700);target=Math.min(1,to/700);rewardPoints=points;rewardAt=performance.now();return new Promise(resolve=>{flight={from:progress,to:target,started:performance.now(),...ascentProfile(points),lastRank:window.RotundaEngine.rankFor(from).points,resolve};});},skipAscent(){if(flight){progress=target=flight.to;flight.resolve();flight=null;}},reward(points){rewardPoints=points;rewardAt=performance.now();},setProgress(p){target=Math.max(0,Math.min(1,p));},setStage(s){stage=s;canvas.dataset.scene=s;},setFinish(points){finishPoints=Math.max(0,Math.min(700,points));canvas.dataset.finishTier=finishPoints>=700?'summit':finishPoints>=580?'gold':finishPoints>=400?'silver':'bronze';},setReduced(value){reduced=value;},dispose(){disposed=true;if(flight)flight.resolve();cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',visibility);}};
}
export function createFrameBudget(){let fps=60,average=0,slow=0,fast=0;return{get fps(){return fps;},sample(ms){average=average*.9+Math.max(0,ms)*.1;if(fps===60){slow=average>10?slow+1:Math.max(0,slow-2);if(slow>=30){fps=30;fast=0;}}else{fast=average<6?fast+1:0;if(fast>=180){fps=60;slow=0;}}return fps;}};}

export function ascentProfile(points){const p=Math.max(20,Math.min(100,points));return{duration:650+p*18,power:p/100,particles:Math.round(p/5),color:({20:'#b4c6c2',40:'#8ccec0',60:'#95cbdc',80:'#efc870',100:'#fff0b4'})[p]||'#efc870'};}

// Score remains linear for ranks; the architectural camera eases upward earlier.
export function cameraPose(points){const p=Math.max(0,Math.min(700,points))/700,t=Math.max(0,Math.min(1,(points-40)/280));return{wall:Math.pow(p,.65),dome:t*t*(3-2*t),zoom:1+p*.18};}
