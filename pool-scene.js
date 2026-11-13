import * as THREE from './assets/reflecting-pool/three.module.js';
export function createPoolScene(canvas){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#abcfc6');scene.fog=new THREE.Fog('#d0ddbf',55,180);
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
 const camera=new THREE.PerspectiveCamera(47,1,.1,250);camera.position.set(6,5.5,29);camera.lookAt(14,7,-22);
 const sun=new THREE.DirectionalLight('#ffe6a5',3);sun.position.set(-25,45,20);scene.add(sun,new THREE.HemisphereLight('#ecf4d3','#577a61',2.4));
 const colors=['#283f34','#63865a','#a7b879'];const gradient=new THREE.DataTexture(new Uint8Array([75,150,245]),3,1,THREE.RedFormat);gradient.needsUpdate=true;gradient.minFilter=gradient.magFilter=THREE.NearestFilter;
 const mat=c=>new THREE.MeshToonMaterial({color:c,gradientMap:gradient});const stone=mat('#eadfc1'),grass=mat('#839c60'),path=mat('#d5ccae'),trunk=mat('#756443');
 function mesh(g,m,x,y,z){const a=new THREE.Mesh(g,m);a.position.set(x,y,z);scene.add(a);return a;}
 function box(w,h,d,m,x,y,z){return mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z);}
 box(230,.8,210,grass,0,-.7,-55);box(28,.15,130,path,0,-.18,-35);box(20,.22,112,stone,0,-.12,-36);
 const waterUniforms={time:{value:0}};
 const waterMaterial=new THREE.ShaderMaterial({uniforms:waterUniforms,vertexShader:`varying vec2 uvp;void main(){uvp=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec2 uvp;uniform float time;void main(){vec2 p=uvp;float wave=sin(p.y*320.+time*.65+sin(p.x*27.))*sin(p.x*18.-time*.3);vec3 c=mix(vec3(.19,.48,.43),vec3(.58,.75,.62),p.y);float center=.5+.009*sin(p.y*130.-time);float width=mix(.055,.012,p.y);float tower=step(abs(p.x-center),width)*step(.38,p.y)*step(p.y,.98);c=mix(c,vec3(.79,.81,.64),tower*.7);float glint=smoothstep(.91,.99,wave)*.18;c+=glint;gl_FragColor=vec4(c,1.);}`});
 const water=mesh(new THREE.PlaneGeometry(19,110),waterMaterial,0,.03,-36);water.rotation.x=-Math.PI/2;
 // The monument is a tapered shaft with a four-sided pyramidion.
 const shaft=mesh(new THREE.CylinderGeometry(1.05,1.65,26,4,1),stone,0,13,-101);shaft.rotation.y=Math.PI/4;
 const peak=mesh(new THREE.ConeGeometry(1.49,3.7,4),mat('#f5e6ba'),0,27.85,-101);peak.rotation.y=Math.PI/4;box(5,.6,5,stone,0,.1,-101);
 const trees=[];let seed=42;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
 for(const side of [-1,1])for(let i=0;i<19;i++){
  const z=17-i*6.4,x=side*(17+rand()*6),height=6+rand()*3;box(.6,height,.65,trunk,x,height/2,z);
  const group=new THREE.Group();group.position.set(x,height,z);scene.add(group);trees.push(group);
  for(let j=0;j<7;j++){const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(2.2+rand()*1.7,1),mat(colors[Math.floor(rand()*3)]));leaf.position.set((rand()-.5)*4,(rand()-.25)*3,(rand()-.5)*3);leaf.scale.y=.8;group.add(leaf);}
 }
 // Broad clouds and small foreground flowers use the same stepped lighting.
 const cloud=new THREE.MeshBasicMaterial({color:'#edf0d7'});for(let i=0;i<10;i++){const c=mesh(new THREE.IcosahedronGeometry(1,2),cloud,-60+rand()*120,27+rand()*15,-90-rand()*30);c.scale.set(8+rand()*10,1.3+rand()*2,3);}
 for(let i=0;i<75;i++){const side=rand()<.5?-1:1;mesh(new THREE.IcosahedronGeometry(.10+rand()*.1,0),mat(i%3?'#e7dc9b':'#faf0d7'),side*(14+rand()*12),.3,18-rand()*25);}
 // Low stone edge and a seat establish the near, seated viewpoint.
 box(22,.5,1.1,stone,0,.1,19.7);box(3,.5,2,stone,-14,.25,23);
 let running=!matchMedia('(prefers-reduced-motion: reduce)').matches,frame=0,last=0;const clock=new THREE.Clock();
 function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.render(scene,camera);}addEventListener('resize',resize);resize();
 function draw(ms){frame=requestAnimationFrame(draw);if(document.hidden||!running||ms-last<40)return;last=ms;const t=clock.getElapsedTime();waterUniforms.time.value=t;trees.forEach((tree,i)=>tree.rotation.z=Math.sin(t*.4+i)*.012);renderer.render(scene,camera);}frame=requestAnimationFrame(draw);
 return {setMotion(value){running=value;if(!value)renderer.render(scene,camera);},dispose(){cancelAnimationFrame(frame);removeEventListener('resize',resize);renderer.dispose();}};
}
