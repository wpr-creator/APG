import * as THREE from './assets/reflecting-pool/three.module.js';
export function createRotundaScene(canvas,{reduced=false}={}){
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#c9bca3');scene.fog=new THREE.Fog('#d4c6ad',42,100);
 const camera=new THREE.PerspectiveCamera(66,1,.1,120);
 const warm=new THREE.DirectionalLight('#ffe3aa',3);warm.position.set(-8,48,10);scene.add(warm,new THREE.HemisphereLight('#fff1da','#7c7767',2));
 const soft=new THREE.PointLight('#d0deed',35,70,1.4);soft.position.set(0,26,0);scene.add(soft);
 const gradient=new THREE.DataTexture(new Uint8Array([85,170,255]),3,1,THREE.RedFormat);gradient.needsUpdate=true;gradient.minFilter=gradient.magFilter=THREE.NearestFilter;
 const mat=(c,extra={})=>new THREE.MeshToonMaterial({color:c,gradientMap:gradient,...extra});
 const cream=mat('#e7d8ba'),pale=mat('#f4e7cc'),shade=mat('#bda98a'),gold=mat('#ac8650'),dark=mat('#52695c'),stone=mat('#d5c6a8');
 function mesh(g,m,x=0,y=0,z=0,parent=scene){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);parent.add(o);return o;}
 const box=(w,h,d,m,x,y,z,parent)=>mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,parent);
 function ring(radius,y,tube=.12,m=pale){const o=mesh(new THREE.TorusGeometry(radius,tube,6,96),m,0,y,0);o.rotation.x=Math.PI/2;return o;}
 function wall(r,y,h,m){return mesh(new THREE.CylinderGeometry(r,r,h,96,1,true),m,0,y,0);}
 wall(15.5,8,16,mat('#d0c2aa',{side:THREE.BackSide}));
 wall(15.4,18.3,4.6,mat('#bba88a',{side:THREE.BackSide}));
 wall(15.5,27.2,13.2,mat('#dbd0b9',{side:THREE.BackSide}));
 wall(15.5,35,3,mat('#cab99b',{side:THREE.BackSide}));
 // Radial inlaid marble: hand-drawn bands and alternating wedges.
 function floorTexture(){const c=document.createElement('canvas');c.width=c.height=1024;const x=c.getContext('2d'),cx=512;
 x.fillStyle='#c6bcaa';x.fillRect(0,0,1024,1024);
 for(let band=0;band<11;band++)for(let j=0;j<32;j++){const r0=band*48,r1=(band+1)*48,a=j*Math.PI/16,b=(j+1)*Math.PI/16;x.beginPath();x.arc(cx,cx,r1,a,b);x.arc(cx,cx,r0,b,a,true);x.closePath();x.fillStyle=(band+j)%2?'#e4ddcd':'#b8b2a2';x.fill();x.strokeStyle='#9d9b8d';x.lineWidth=1;x.stroke();}
 for(const r of [80,91,160,172,350,361,470]){x.beginPath();x.arc(cx,cx,r,0,Math.PI*2);x.strokeStyle='#667c71';x.lineWidth=7;x.stroke();}
 x.fillStyle='#526e64';x.beginPath();for(let i=0;i<16;i++){const a=i*Math.PI/8-Math.PI/2,r=i%2?22:66;x.lineTo(cx+Math.cos(a)*r,cx+Math.sin(a)*r);}x.closePath();x.fill();const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
 const floor=mesh(new THREE.CircleGeometry(15.5,96),new THREE.MeshStandardMaterial({map:floorTexture(),roughness:.65}),0,-.05,0);floor.rotation.x=-Math.PI/2;
 for(const y of [.18,.45,1,14.5,15,15.5,16,20.3,20.7,21.3,32.7,33.3,34,35.5]){ring(15.05,y,.17,y===20.7||y===33.3?gold:pale);}
 // Wall bays: fluted pilasters, inset paintings, and dark passageways.
 const bayCount=16;
 function bayGroup(a){const g=new THREE.Group();g.position.set(Math.sin(a)*14.75,0,Math.cos(a)*14.75);g.rotation.y=a;scene.add(g);return g;}
 function archShape(w,h){const s=new THREE.Shape();s.moveTo(-w/2,0);s.lineTo(w/2,0);s.lineTo(w/2,h-w/2);s.absarc(0,h-w/2,w/2,0,Math.PI,false);s.lineTo(-w/2,0);return s;}
 function painting(index){const c=document.createElement('canvas');c.width=384;c.height=256;const x=c.getContext('2d');const bg=x.createLinearGradient(0,0,0,256);bg.addColorStop(0,['#9b9d8a','#a9ac99','#91a3a0','#b8a38a'][index%4]);bg.addColorStop(.65,'#c4b396');bg.addColorStop(1,'#6e7561');x.fillStyle=bg;x.fillRect(0,0,384,256);x.fillStyle='#64735d';x.beginPath();x.moveTo(0,165);for(let i=0;i<12;i++)x.lineTo(i*38,130+Math.sin(i*1.7+index)*20);x.lineTo(384,256);x.lineTo(0,256);x.fill();for(let i=0;i<7;i++){const px=60+i*42,py=138+Math.sin(i+index)*15;x.fillStyle=['#344940','#8c6950','#c6b59a','#53666a'][i%4];x.beginPath();x.moveTo(px-10,py+60);x.lineTo(px-7,py+10);x.lineTo(px+6,py+10);x.lineTo(px+13,py+60);x.closePath();x.fill();x.beginPath();x.arc(px,py,7,0,7);x.fill();}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
 for(let i=0;i<bayCount;i++){
  const a=i*Math.PI*2/bayCount,g=bayGroup(a);
  box(.9,12,.35,cream,0,7,-.05,g);box(1.3,.45,.6,pale,0,1.2,-.15,g);box(1.4,.35,.65,pale,0,13.1,-.15,g);
  for(let j=-2;j<=2;j++)box(.055,10,.045,shade,j*.14,7,-.25,g);
  const center=bayGroup(a+Math.PI/bayCount);
  if(i%4===0){const opening=mesh(new THREE.ShapeGeometry(archShape(3.2,8)),mat('#354a41'),0,.5,-.11,center);opening.rotation.y=Math.PI;box(3.6,.35,.3,pale,0,8.6,-.2,center);}
  else{box(3.35,3,.2,gold,0,6.4,-.15,center);const art=mesh(new THREE.PlaneGeometry(3.05,2.65),new THREE.MeshBasicMaterial({map:painting(i),color:'#e7d2ad'}),0,6.4,-.27,center);art.rotation.y=Math.PI;}
  // Carved wreath above each bay.
  const wreath=mesh(new THREE.TorusGeometry(.42,.07,5,20),gold,0,11.6,-.28,center);wreath.rotation.y=Math.PI;
  // Upper colonnade and luminous windows.
  const col=bayGroup(a);mesh(new THREE.CylinderGeometry(.25,.32,9.7,12),pale,0,27.4,-.25,col);box(.85,.4,.8,pale,0,22.4,-.2,col);box(.9,.4,.8,pale,0,32.4,-.2,col);
  const windowBay=bayGroup(a+Math.PI/bayCount);box(1.9,6,.16,shade,0,27.3,-.15,windowBay);
  const glass=box(1.5,5.6,.07,new THREE.MeshBasicMaterial({color:i%3?'#e8e0c5':'#f8eac4'}),0,27.3,-.29,windowBay);
  for(const xx of [-.48,0,.48])box(.055,5.6,.09,cream,xx,27.3,-.36,windowBay);
  for(const yy of [25.5,27.3,29.1])box(1.5,.06,.09,cream,0,yy,-.36,windowBay);
 }
 // Painted grisaille frieze; repeated silhouettes read as a continuous relief band.
 for(let i=0;i<96;i++){const g=bayGroup(i*Math.PI/48);const h=.75+(i%5)*.12;mesh(new THREE.SphereGeometry(.12,6,5),shade,0,19,-.12,g);box(.24,h,.12,shade,0,18.5,-.14,g);const limb=box(.08,.7,.1,shade,.22,18.65,-.15,g);limb.rotation.z=(i%2?1:-1)*.7;}
 // Receding coffered dome above the colonnade.
 const dome=mesh(new THREE.SphereGeometry(15.6,64,24,0,Math.PI*2,0,Math.PI/2),mat('#ddceb0',{side:THREE.BackSide}),0,35.5,0);
 const panels=[],frames=[];const dummy=new THREE.Object3D();
 for(let band=0;band<7;band++){
  const theta=.38+band*.18,r=Math.sin(theta)*15.3,y=35.5+Math.cos(theta)*15.3;
  ring(r,y,.075,pale);
  for(let i=0;i<32;i++){
   const a=(i+.5)*Math.PI/16,g=new THREE.Object3D();g.position.set(Math.sin(a)*r,y,Math.cos(a)*r);g.lookAt(0,35.5,0);g.updateMatrix();
   const w=Math.max(.25,r*.15),h=1.85;
   function instance(list,x,y,z,sx,sy,sz){dummy.position.set(x,y,z);dummy.quaternion.identity();dummy.scale.set(sx,sy,sz);dummy.updateMatrix();list.push(g.matrix.clone().multiply(dummy.matrix));}
   instance(panels,0,0,0,w,h,.045);
   instance(frames,0,-h/2,.08,w+.12,.075,.075);instance(frames,0,h/2,.08,w+.12,.075,.075);
   instance(frames,-w/2,0,.08,.075,h,.075);instance(frames,w/2,0,.08,.075,h,.075);
  }
 }
 for(const [list,material]of[[panels,stone],[frames,pale]]){const instanced=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),material,list.length);list.forEach((matrix,i)=>instanced.setMatrixAt(i,matrix));instanced.instanceMatrix.needsUpdate=true;scene.add(instanced);}
 for(let i=0;i<32;i++){const a=i*Math.PI/16,points=[];for(let j=0;j<28;j++){const t=.31+j*(Math.PI/2-.31)/27;points.push(new THREE.Vector3(Math.sin(t)*15.12*Math.sin(a),35.5+Math.cos(t)*15.12,Math.sin(t)*15.12*Math.cos(a)));}const curve=new THREE.CatmullRomCurve3(points);mesh(new THREE.TubeGeometry(curve,28,.065,4,false),pale);}
 ring(4.5,50.25,.28,pale);ring(4.2,50.4,.11,gold);
 // Canopy art: AOC photograph of Brumidi's public-domain fresco. Source in the page credits.
 const canopy=mesh(new THREE.CircleGeometry(4.12,64),new THREE.MeshBasicMaterial({color:'#e7c998',side:THREE.DoubleSide}),0,50.6,0);canopy.rotation.x=Math.PI/2;
 let disposed=false;
 new THREE.TextureLoader().load('assets/rotunda/apotheosis.webp',t=>{if(disposed){t.dispose();return;}t.colorSpace=THREE.SRGBColorSpace;t.center.set(.5,.5);t.repeat.set(.72,1);canopy.material.map=t;canopy.material.color.set('#ffffff');canopy.material.needsUpdate=true;},undefined,()=>{});
 // A small field of sunlit motes rather than heavy postprocessing.
 const dustGeometry=new THREE.BufferGeometry(),dustPositions=new Float32Array(120*3);
 for(let i=0;i<120;i++){const a=i*2.39996,r=4+(i%29)*.32;dustPositions[i*3]=Math.sin(a)*r;dustPositions[i*3+1]=1+(i*1.71)%47;dustPositions[i*3+2]=Math.cos(a)*r;}
 dustGeometry.setAttribute('position',new THREE.BufferAttribute(dustPositions,3));const dust=new THREE.Points(dustGeometry,new THREE.PointsMaterial({color:'#fff2c7',size:.045,transparent:true,opacity:.45,depthWrite:false}));scene.add(dust);
 let progress=0,target=0,look=0,lookTarget=0,frame=0,last=0,active=!document.hidden;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 function resize(){const r=canvas.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();}
 const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 function draw(time){frame=requestAnimationFrame(draw);if(!active||time-last<1000/30)return;const delta=Math.min((time-last)/1000,.25);last=time;const ease=1-Math.exp(-delta/.55),quiet=reduced||motion.matches;progress=quiet?target:progress+(target-progress)*ease;look=quiet?lookTarget:look+(lookTarget-look)*ease;const y=2.6+progress*41;const yaw=look+(quiet?0:Math.sin(time*.00008)*.012);camera.position.set(Math.sin(yaw)*2.2,y,Math.cos(yaw)*2.2);const angle=yaw+.32,viewRadius=13.5*(1-progress)+.05;camera.lookAt(Math.sin(angle)*viewRadius,8+progress*42.6,-Math.cos(angle)*viewRadius);dust.visible=!quiet;if(!quiet)dust.rotation.y=time*.000006;renderer.render(scene,camera);}
 frame=requestAnimationFrame(draw);
 const visibility=()=>{active=!document.hidden;};document.addEventListener('visibilitychange',visibility);
 const lost=e=>{e.preventDefault();canvas.dispatchEvent(new CustomEvent('scene-unavailable'));};canvas.addEventListener('webglcontextlost',lost);
 return{setProgress(value){target=Math.max(0,Math.min(1,value));},setReduced(value){reduced=value;},look(direction){lookTarget+=direction*.35;},dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('webglcontextlost',lost);scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of(Array.isArray(o.material)?o.material:[o.material])){m.map?.dispose();m.dispose();}}});renderer.dispose();}};
}
