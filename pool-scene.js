import * as THREE from './assets/reflecting-pool/three.module.js';
import { Reflector } from './assets/reflecting-pool/Reflector.js';
export function createPoolScene(canvas){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#9c9dba');scene.fog=new THREE.FogExp2('#b2a2b0',.004);
 const sky=new THREE.Mesh(new THREE.SphereGeometry(200,24,16),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,vertexShader:'varying vec3 v;void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 v;void main(){float h=normalize(v).y;vec3 low=vec3(.94,.62,.49);vec3 mid=vec3(.63,.55,.72);vec3 high=vec3(.23,.34,.53);vec3 c=mix(low,mid,smoothstep(-.05,.28,h));c=mix(c,high,smoothstep(.15,.85,h));gl_FragColor=vec4(c,1.);}'}));scene.add(sky);
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 const camera=new THREE.PerspectiveCamera(47,1,.1,250);camera.position.set(6,5.5,29);camera.lookAt(10,7,-22);
 const sun=new THREE.DirectionalLight('#ffc99a',1.7);sun.position.set(-25,45,20);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-60,right:60,top:60,bottom:-80,far:180});sun.shadow.bias=-.0004;sun.shadow.normalBias=.08;sun.shadow.radius=4;sun.target.position.set(0,0,-35);scene.add(sun,sun.target,new THREE.HemisphereLight('#9aaed6','#3d5146',1.2));
 const colors=['#283f34','#63865a','#a7b879'];const gradient=new THREE.DataTexture(new Uint8Array([75,150,245]),3,1,THREE.RedFormat);gradient.needsUpdate=true;gradient.minFilter=gradient.magFilter=THREE.NearestFilter;
 const mat=c=>new THREE.MeshToonMaterial({color:c,gradientMap:gradient});const stone=new THREE.MeshToonMaterial({color:'#f2d7a1',emissive:'#c78e3c',emissiveIntensity:.32,gradientMap:gradient}),grass=mat('#839c60'),path=mat('#d5ccae'),trunk=mat('#756443');
 function mesh(g,m,x,y,z){const a=new THREE.Mesh(g,m);a.position.set(x,y,z);a.receiveShadow=true;scene.add(a);return a;}
 function box(w,h,d,m,x,y,z){return mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z);}
 box(230,.8,210,grass,0,-.7,-55);box(28,.15,130,path,0,-.18,-35);box(20,.22,112,stone,0,-.12,-36);
 const shader={uniforms:THREE.UniformsUtils.clone(Reflector.ReflectorShader.uniforms),vertexShader:Reflector.ReflectorShader.vertexShader.replace('varying vec4 vUv;','varying vec4 vUv; varying vec2 surfaceUv;').replace('vUv = textureMatrix','surfaceUv = uv; vUv = textureMatrix'),fragmentShader:Reflector.ReflectorShader.fragmentShader.replace('uniform vec3 color;','uniform vec3 color; uniform float time; varying vec2 surfaceUv;').replace('vec4 base = texture2DProj( tDiffuse, vUv );','vec4 ripple=vUv; float flow=sin(surfaceUv.y*140.0-time*.55)+.4*sin(surfaceUv.y*390.0+surfaceUv.x*23.0+time*.4); ripple.x += flow*.0012*vUv.w; ripple.y+=sin(surfaceUv.x*37.0+surfaceUv.y*160.0+time*.3)*.00065*vUv.w; vec4 base = texture2DProj( tDiffuse, ripple );').replace('gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );','vec3 reflected=blendOverlay(base.rgb,color); float stroke=sin(surfaceUv.y*900.0+sin(surfaceUv.x*46.0)+time*.6)*sin(surfaceUv.x*190.0-time*.12); float gleam=smoothstep(.94,1.0,stroke)*.07; reflected=mix(reflected,vec3(.22,.33,.43),.10)+gleam*vec3(.8,.8,.9); gl_FragColor=vec4(reflected,1.0);')};shader.uniforms.time={value:0};
 const water=new Reflector(new THREE.PlaneGeometry(19,110),{color:0x9bafb9,textureWidth:768,textureHeight:768,clipBias:.003,shader});water.position.set(0,.03,-36);water.rotation.x=-Math.PI/2;scene.add(water);
 // The monument is a tapered shaft with a four-sided pyramidion.
 const stoneCanvas=document.createElement('canvas');stoneCanvas.width=256;stoneCanvas.height=1024;const sc=stoneCanvas.getContext('2d');sc.fillStyle='#e6d5ad';sc.fillRect(0,0,256,1024);for(let row=0;row<100;row++){sc.fillStyle=row%3===0?'#decca6':'#e9d8b3';sc.fillRect(0,row*10,256,10);sc.strokeStyle='#c9ba9b';sc.globalAlpha=.28;sc.beginPath();sc.moveTo(0,row*10);sc.lineTo(256,row*10);sc.stroke();sc.beginPath();sc.moveTo(row%2?64:128,row*10);sc.lineTo(row%2?64:128,row*10+10);sc.stroke();sc.globalAlpha=1;}const stoneMap=new THREE.CanvasTexture(stoneCanvas);stoneMap.colorSpace=THREE.SRGBColorSpace;const monumentStone=stone.clone();monumentStone.map=stoneMap;
 const shaft=mesh(new THREE.CylinderGeometry(1.05,1.65,26,4,1),monumentStone,0,13,-101);shaft.rotation.y=Math.PI/4;
 const peak=mesh(new THREE.ConeGeometry(1.05,3.0,4),stone,0,27.5,-101);peak.rotation.y=Math.PI/4;box(5,.6,5,stone,0,.1,-101);
 const trees=[];let seed=42;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
 // Detailed, seeded foliage keeps the avenue consistent across visits.
 const leafShape=new THREE.Shape();leafShape.moveTo(0,-.5);leafShape.quadraticCurveTo(.32,-.1,.19,.25);leafShape.lineTo(0,.58);leafShape.quadraticCurveTo(-.30,.1,0,-.5);
 const leafGeometry=new THREE.ShapeGeometry(leafShape,2);const leafMat=new THREE.MeshToonMaterial({color:'#829e4c',gradientMap:gradient,side:THREE.DoubleSide});
 const dummy=new THREE.Object3D(),tint=new THREE.Color();
 const breezeTime={value:0};
 // Each plant responds to a shared passing breeze, with local flutter and rooted bases.
 function animatePlant(material,kind){
  const code=kind==='leaf'?`vec3 origin=(modelMatrix*instanceMatrix*vec4(0.0,0.0,0.0,1.0)).xyz;
   float phase=origin.x*.17+origin.z*.095;
   float gust=sin(breezeTime*.62+phase)*.65+sin(breezeTime*.23+phase*.43)*.35;
   float flutter=sin(breezeTime*3.1+phase*4.0+position.y*2.0);
   transformed.x += gust*.16+flutter*.025;
   transformed.z += cos(breezeTime*.8+phase)*.075;
   transformed.y += flutter*.018;`:
   `vec3 origin=(modelMatrix*instanceMatrix*vec4(0.0,0.0,0.0,1.0)).xyz;
   float tip=max(position.y,0.0);float phase=origin.x*.24+origin.z*.14;
   float gust=sin(breezeTime*.7+phase)+.35*sin(breezeTime*1.3+phase*.7);
   transformed.x += tip*tip*gust*.28;
   transformed.z += tip*tip*sin(breezeTime*.55+phase)*.12;`;
  const install=shader=>{shader.uniforms.breezeTime=breezeTime;shader.vertexShader='uniform float breezeTime;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n'+code);};
  material.onBeforeCompile=install;material.customProgramCacheKey=()=>kind+'-breeze-v1';
  const depth=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking,side:THREE.DoubleSide});depth.onBeforeCompile=install;depth.customProgramCacheKey=()=>kind+'-breeze-depth-v1';return depth;
 }
 const leafDepth=animatePlant(leafMat,'leaf');

 function branch(group,from,to,r){const d=new THREE.Vector3().subVectors(to,from);const m=new THREE.Mesh(new THREE.CylinderGeometry(r*.4,r,d.length(),6),trunk);m.position.copy(from).add(to).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());m.castShadow=true;group.add(m);}
 for(const side of [-1,1])for(let i=0;i<18;i++){
  const z=15-i*6.8,x=side*(18+rand()*4),height=7+rand()*2;
  const group=new THREE.Group();group.position.set(x,0,z);scene.add(group);trees.push(group);
  branch(group,new THREE.Vector3(0,0,0),new THREE.Vector3(.2,height,0),.36);
  const leaves=new THREE.InstancedMesh(leafGeometry,leafMat,1600);leaves.customDepthMaterial=leafDepth;leaves.castShadow=true;leaves.receiveShadow=true;group.add(leaves);let index=0;
  for(let j=0;j<8;j++){
   const angle=j*Math.PI*.77;const end=new THREE.Vector3(Math.cos(angle)*3.1,height-1+rand()*3,Math.sin(angle)*2.8);
   branch(group,new THREE.Vector3(0,height*.55,0),end,.13);
   branch(group,end.clone().multiplyScalar(.8),end.clone().add(new THREE.Vector3(.8,1,.4)),.045);
   for(let k=0;k<200;k++){
    const az=rand()*Math.PI*2,rad=Math.sqrt(rand())*2.1;
    dummy.position.set(end.x+Math.cos(az)*rad,end.y+(rand()-.5)*2.2,end.z+Math.sin(az)*rad);
    dummy.rotation.set(rand()*Math.PI,rand()*Math.PI,rand()*Math.PI);const size=.35+rand()*.45;dummy.scale.set(size*.95,size,size);dummy.updateMatrix();leaves.setMatrixAt(index,dummy.matrix);
    tint.setHSL(.27+rand()*.10,.22+rand()*.2,.22+rand()*.20);leaves.setColorAt(index++,tint);
   }
  }
 }
 // Soft cloud banks, rather than solid floating shapes.
 const cloudCanvas=document.createElement('canvas');cloudCanvas.width=256;cloudCanvas.height=128;const cctx=cloudCanvas.getContext('2d');
 for(let i=0;i<12;i++){const x=35+rand()*185,y=45+rand()*35,r=20+rand()*30,g=cctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(244,202,210,.48)');g.addColorStop(1,'rgba(244,202,210,0)');cctx.fillStyle=g;cctx.fillRect(0,0,256,128);}
 const cloudTexture=new THREE.CanvasTexture(cloudCanvas);const cloudMaterial=new THREE.SpriteMaterial({map:cloudTexture,transparent:true,opacity:.7,depthWrite:false});
 const clouds=[];for(let i=0;i<8;i++){const c=new THREE.Sprite(cloudMaterial);c.position.set(-90+rand()*160,28+rand()*20,-110-rand()*30);c.scale.set(38+rand()*25,13,1);c.userData.startX=c.position.x;c.userData.speed=.045+rand()*.04;clouds.push(c);scene.add(c);}
 // Grass is made of individual tapered blades in the foreground.
 const bladeGeometry=new THREE.BufferGeometry();bladeGeometry.setAttribute('position',new THREE.Float32BufferAttribute([-.065,0,0,.065,0,0,-.04,.36,.015,.04,.36,.015,.015,.75,.04],3));bladeGeometry.setIndex([0,1,2,1,3,2,2,3,4]);bladeGeometry.computeVertexNormals();
 const blades=new THREE.InstancedMesh(bladeGeometry,new THREE.MeshToonMaterial({color:'#9daa64',gradientMap:gradient,side:THREE.DoubleSide}),4500);blades.customDepthMaterial=animatePlant(blades.material,'grass');blades.receiveShadow=true;
 for(let i=0;i<4500;i++){const side=rand()<.5?-1:1;dummy.position.set(side*(14.4+rand()*15),-.2,24-rand()*68);dummy.rotation.set(0,rand()*6.28,rand()*.25);const size=.35+rand()*.65;dummy.scale.set(size,size,size);dummy.updateMatrix();blades.setMatrixAt(i,dummy.matrix);tint.setHSL(.19+rand()*.05,.25,.35+rand()*.18);blades.setColorAt(i,tint);}scene.add(blades);
 for(let i=0;i<75;i++){const side=rand()<.5?-1:1;mesh(new THREE.IcosahedronGeometry(.08+rand()*.08,0),mat(i%3?'#e7dc9b':'#faf0d7'),side*(14+rand()*12),.25,18-rand()*25);}
 const dustGeometry=new THREE.BufferGeometry(),points=[];for(let i=0;i<90;i++)points.push((rand()-.5)*65,rand()*12,15-rand()*80);dustGeometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));const dust=new THREE.Points(dustGeometry,new THREE.PointsMaterial({color:'#fff4bf',size:.08,transparent:true,opacity:.5,depthWrite:false}));scene.add(dust);
 // Layered tree silhouettes give the distance foliage detail without heavy geometry.
 const forestCanvas=document.createElement('canvas');forestCanvas.width=256;forestCanvas.height=320;const fc=forestCanvas.getContext('2d');
 fc.strokeStyle='#454d40';fc.lineWidth=10;fc.beginPath();fc.moveTo(128,320);fc.lineTo(125,115);fc.stroke();
 for(let i=0;i<8;i++){const x=55+rand()*145,y=70+rand()*140;fc.lineWidth=4;fc.beginPath();fc.moveTo(126,255);fc.lineTo(x,y);fc.stroke();}
 for(let i=0;i<2000;i++){const angle=rand()*Math.PI*2,r=Math.sqrt(rand());const x=128+Math.cos(angle)*r*115,y=119+Math.sin(angle)*r*106;const light=.17+rand()*.13+(1-x/256)*.05;fc.fillStyle=`hsl(${105+rand()*28},18%,${light*100}%)`;fc.beginPath();fc.ellipse(x,y,2+rand()*6,2+rand()*4,rand()*Math.PI,0,Math.PI*2);fc.fill();}
 const forestTexture=new THREE.CanvasTexture(forestCanvas);forestTexture.colorSpace=THREE.SRGBColorSpace;
 const forestMaterial=new THREE.MeshBasicMaterial({map:forestTexture,alphaTest:.45,side:THREE.DoubleSide,color:'#c6c8b4'});
 const distantTrees=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1),forestMaterial,240);
 for(let i=0;i<240;i++){
  const side=i%2?-1:1,back=i>=140;
  const x=back?(rand()-.5)*195:side*(29+rand()*62);
  const z=back?-133-rand()*23:5-rand()*145;
  const height=back?5+rand()*4:7+rand()*5;
  dummy.position.set(x,height*.5-.3,z);dummy.rotation.set(0,(rand()-.5)*.25,0);dummy.scale.set(height*(.65+rand()*.25),height,1);dummy.updateMatrix();distantTrees.setMatrixAt(i,dummy.matrix);
  tint.setHSL(.30+rand()*.08,.03,.80+rand()*.18);distantTrees.setColorAt(i,tint);
 }scene.add(distantTrees);
 const shrubs=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1),forestMaterial,70);
 for(let i=0;i<70;i++){const side=i%2?-1:1,h=1+rand()*1.3;dummy.position.set(side*(16+rand()*38),h*.5-.2,-90-rand()*38);dummy.rotation.set(0,rand()*.2,0);dummy.scale.set(2+rand()*2,h,1);dummy.updateMatrix();shrubs.setMatrixAt(i,dummy.matrix);}scene.add(shrubs);
 // Low stone edge and a seat establish the near, seated viewpoint.
 box(22,.5,1.1,stone,0,.1,19.7);box(3,.5,2,stone,-14,.25,23);
 let running=!matchMedia('(prefers-reduced-motion: reduce)').matches,frame=0,last=0;const clock=new THREE.Clock();
 function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.render(scene,camera);}addEventListener('resize',resize);resize();
 function draw(ms){frame=requestAnimationFrame(draw);if(document.hidden||!running||ms-last<40)return;last=ms;const t=clock.getElapsedTime();water.material.uniforms.time.value=t;breezeTime.value=t;clouds.forEach(c=>{c.position.x=c.userData.startX+Math.sin(t*.006)*12*c.userData.speed/.06;});dust.position.y=Math.sin(t*.12)*.5;dust.position.x=Math.sin(t*.08)*.45;renderer.render(scene,camera);}frame=requestAnimationFrame(draw);
 return {setMotion(value){running=value;if(!value)renderer.render(scene,camera);},dispose(){cancelAnimationFrame(frame);removeEventListener('resize',resize);renderer.dispose();}};
}
