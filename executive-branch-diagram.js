/* A measured, fully expanded organization map. All content is local; no runtime API required. */
(function () {
  'use strict';
  const root = window.EXECUTIVE_BRANCH_DATA;
  const map = document.getElementById('diagram');
  const svg = document.getElementById('wires');
  const vp = document.getElementById('viewport');
  const sizer = document.getElementById('sizer');
  const search = document.getElementById('search');
  const next = document.getElementById('next');
  const matches = document.getElementById('matches');
  const jump = document.getElementById('jump');
  if (!root || !map) return;
  const nodes = new Map(), parents = new Map(), elements = new Map();
  const colors = {eop:'#226d61',departments:'#305d7c',independent:'#a14d37'};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scale = .8, stageHeight = 1200, found = [], matchIndex = 0;
  const cardWidth=430, columnStep=500, bandGap=200;
  const columnCounts=[3,15,6];
  const stageWidth=120+columnCounts.reduce((sum,n)=>sum+n*columnStep-70,0)+bandGap*2;
  const mini=document.getElementById('mini-chart');
  const minimap=document.getElementById('minimap');
  let miniWindow;
  let pendingLayout = 0;
  function count(item) { return item.children.reduce((sum, child) => sum + 1 + count(child), 0); }
  function register(item, parent, family, depth) {
    nodes.set(item.id, item);
    if (parent) parents.set(item.id, parent.id);
    item.family = family; item.depth = depth;
    const el = document.createElement('section');
    el.className = 'branch-node '+(item===root?'president':depth===1?'group':item.kind);
    el.id = 'node-'+item.id;
    el.style.setProperty('--family', colors[family] || '#183630');
    const tag = document.createElement('span'); tag.className='node-tag';
    tag.textContent = item===root?'Article II':depth===1?(family==='eop'?'Presidential support':family==='departments'?'Executive departments':'Independent establishments'):item.kind==='department'?'Executive department':item.kind==='program'?'Program, service, or site':item.kind==='grouping'?'Related organizations':'Agency, bureau, or office';
    el.appendChild(tag);
    const heading=document.createElement(item===root?'h2':depth<=2?'h3':'h4');
    heading.id=el.id+'-title';heading.textContent=item.title;el.setAttribute('aria-labelledby',heading.id);el.appendChild(heading);
    const desc=document.createElement('p');desc.textContent=item.desc;el.appendChild(desc);
    const controls=document.createElement('div');controls.className='node-controls';
    if(item.source){const link=document.createElement('a');link.className='node-source';link.href=item.source;link.textContent='Official site ↗';link.target='_blank';link.rel='noopener';link.setAttribute('aria-label','Official source for '+item.title+' (opens in new tab)');controls.appendChild(link);}
    if(controls.childElementCount)el.appendChild(controls);
    map.appendChild(el);elements.set(item.id,el);
    item.children.forEach(child=>register(child,item,depth===0?child.kind:family,depth+1));
  }
  function wire(d,family){const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',d);path.setAttribute('class','branch-wire '+(family||''));svg.appendChild(path);}
  register(root,null,'',0);
  function place(item,x,y,width){
    const el=elements.get(item.id);el.hidden=false;el.style.left=x+'px';el.style.top=y+'px';el.style.width=width+'px';
    return el.offsetHeight;
  }
  function column(item,x,y,width){
    const height=place(item,x,y,width);
    let bottom=y+height;
    if(item.children.length){
      const childX=x+28,childWidth=width-28,rail=x+12;
      let childY=bottom+38,lastCenter=0;
      item.children.forEach(child=>{
        const nextBottom=column(child,childX,childY,childWidth);
        const el=elements.get(child.id);const center=childY+Math.min(50,el.offsetHeight/2);
        wire(`M${rail} ${center} H${childX}`,item.family);lastCenter=center;
        childY=nextBottom+26;
      });
      wire(`M${x+width/2} ${bottom} V${bottom+18} H${rail} V${lastCenter}`,item.family);
      bottom=childY-26;
    }
    return bottom;
  }
  function layout(){
    svg.replaceChildren();
    const rootWidth=490,rootX=(stageWidth-rootWidth)/2;
    const rootHeight=place(root,rootX,40,rootWidth);
    const groupY=40+rootHeight+130;
    const bands=[];
    let x=60,maxGroupBottom=0;
    root.children.forEach((group,i)=>{
      const width=columnCounts[i]*columnStep-70;
      const center=x+width/2;
      const height=place(group,center-260,groupY,520);
      maxGroupBottom=Math.max(maxGroupBottom,groupY+height);
      bands.push({group,x,width,center,height,columns:columnCounts[i]});
      wire(`M${stageWidth/2} ${40+rootHeight} V${groupY-65} H${center} V${groupY}`,group.family);
      x+=width+bandGap;
    });
    const contentY=maxGroupBottom+110;
    let bottom=contentY;
    bands.forEach(band=>{
      const {group,x,width,center,height,columns}=band;
      const stacks=Array.from({length:columns},()=>[]);
      group.children.forEach((child,i)=>stacks[i%columns].push(child));
      let bandBottom=contentY;
      stacks.forEach((items,col)=>{
        const colX=x+col*columnStep,rail=colX-18;
        let y=contentY,lastCenter=contentY;
        items.forEach(child=>{
          const nextY=column(child,colX,y,cardWidth);
          lastCenter=y+Math.min(50,elements.get(child.id).offsetHeight/2);
          wire(`M${rail} ${lastCenter} H${colX}`,group.family);
          y=nextY+50;
        });
        wire(`M${center} ${groupY+height} V${contentY-55} H${rail} V${lastCenter}`,group.family);
        bandBottom=Math.max(bandBottom,y);
      });
      const tint=document.createElementNS('http://www.w3.org/2000/svg','rect');
      tint.setAttribute('x',x-32);tint.setAttribute('y',groupY-28);tint.setAttribute('width',width+64);tint.setAttribute('height',bandBottom-groupY+50);tint.setAttribute('fill',colors[group.family]);tint.setAttribute('opacity','.035');svg.prepend(tint);
      bottom=Math.max(bottom,bandBottom);
    });
    stageHeight=bottom+70;
    map.style.width=stageWidth+'px';map.style.height=stageHeight+'px';svg.setAttribute('width',stageWidth);svg.setAttribute('height',stageHeight);svg.setAttribute('viewBox',`0 0 ${stageWidth} ${stageHeight}`);
    buildMinimap();resize();highlight();
  }
  function buildMinimap(){
    mini.replaceChildren();mini.setAttribute('preserveAspectRatio','none');mini.setAttribute('viewBox',`0 0 ${stageWidth} ${stageHeight}`);
    elements.forEach((el,id)=>{
      const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
      rect.setAttribute('x',el.offsetLeft);rect.setAttribute('y',el.offsetTop);rect.setAttribute('width',el.offsetWidth);rect.setAttribute('height',el.offsetHeight);rect.setAttribute('fill',colors[nodes.get(id).family]||'#183630');mini.appendChild(rect);
    });
    miniWindow=document.createElementNS('http://www.w3.org/2000/svg','rect');miniWindow.setAttribute('class','mini-window');mini.appendChild(miniWindow);
    minimap.style.aspectRatio=stageWidth+'/'+stageHeight;
  }
  function updateMini(){if(!miniWindow)return;miniWindow.setAttribute('x',vp.scrollLeft/scale);miniWindow.setAttribute('y',vp.scrollTop/scale);miniWindow.setAttribute('width',Math.min(stageWidth,vp.clientWidth/scale));miniWindow.setAttribute('height',Math.min(stageHeight,vp.clientHeight/scale));}
  function resize(){sizer.style.width=stageWidth*scale+'px';sizer.style.height=stageHeight*scale+'px';map.style.transform=`scale(${scale})`;document.getElementById('zoom').textContent=Math.round(scale*100)+'%';updateMini();document.getElementById('minus').disabled=scale<=.03;document.getElementById('plus').disabled=scale>=1.6;}
  function zoomTo(value){const cx=(vp.scrollLeft+vp.clientWidth/2)/scale,cy=(vp.scrollTop+vp.clientHeight/2)/scale;scale=Math.max(.03,Math.min(1.6,value));resize();vp.scrollLeft=cx*scale-vp.clientWidth/2;vp.scrollTop=cy*scale-vp.clientHeight/2;}
  function showPath(id){const path=[];let current=id;while(current){path.unshift(nodes.get(current).title);current=parents.get(current);}document.getElementById('diagram-help').textContent=path.join(' → ');}
  function focusNode(id,readable=true){const el=elements.get(id);if(!el||el.hidden)return;showPath(id);if(readable){scale=Math.max(.8,Math.min(1.1,(vp.clientWidth-70)/el.offsetWidth));resize();}vp.scrollTo({left:Math.max(0,(el.offsetLeft+el.offsetWidth/2)*scale-vp.clientWidth/2),top:Math.max(0,el.offsetTop*scale-38),behavior:reduced.matches?'auto':'smooth'});}
  const guide='Drag or scroll to explore. Everything is expanded. Zoom in or choose a department to read.';
  function home(){jump.value='';document.getElementById('diagram-help').textContent=guide;scale=.65;resize();vp.scrollLeft=Math.max(0,(stageWidth*scale-vp.clientWidth)/2);vp.scrollTop=0;}
  function overview(){jump.value='';document.getElementById('diagram-help').textContent=guide;scale=Math.min(1,(vp.clientWidth-30)/stageWidth);resize();vp.scrollTo(0,0);}
  function highlight(){const q=search.value.trim().toLowerCase();elements.forEach((el,id)=>{const hit=found.includes(id);el.classList.toggle('hit',hit);el.classList.toggle('dim',!!q&&!hit);});}
  function focusMatch(){if(!found.length)return;focusNode(found[matchIndex]);matches.textContent=(matchIndex+1)+' of '+found.length+' matches';}
  function searchMap(){jump.value='';const q=search.value.trim().toLowerCase();found=[];if(q)nodes.forEach(item=>{if((item.title+' '+item.desc).toLowerCase().includes(q))found.push(item.id);});matchIndex=0;if(!q)document.getElementById('diagram-help').textContent=guide;next.hidden=found.length<2;matches.textContent=q&&!found.length?'No matches':'';highlight();if(found.length)focusMatch();}
  document.getElementById('plus').addEventListener('click',()=>zoomTo(scale+.15));document.getElementById('minus').addEventListener('click',()=>zoomTo(scale-.15));document.getElementById('home').addEventListener('click',home);
  document.getElementById('fit').addEventListener('click',overview);
  document.getElementById('reading-size').addEventListener('click',()=>zoomTo(1));
  root.children.forEach(group=>{const opt=document.createElement('option');opt.value=group.id;opt.textContent=group.title;jump.appendChild(opt);if(group.kind==='departments')group.children.forEach(dep=>{const opt=document.createElement('option');opt.value=dep.id;opt.textContent=dep.title;jump.appendChild(opt);});});
  jump.addEventListener('change',()=>{if(!jump.value)return;search.value='';found=[];matches.textContent='';next.hidden=true;focusNode(jump.value);});
  search.addEventListener('input',searchMap);search.addEventListener('keydown',event=>{if(event.key==='Enter'&&found.length){event.preventDefault();matchIndex=(matchIndex+1)%found.length;focusMatch();}});next.addEventListener('click',()=>{if(found.length){matchIndex=(matchIndex+1)%found.length;focusMatch();}});
  vp.addEventListener('keydown',event=>{if(event.target!==vp)return;if(event.key==='+'||event.key==='='){event.preventDefault();zoomTo(scale+.15);}if(event.key==='-'){event.preventDefault();zoomTo(scale-.15);}if(event.key==='Home'){event.preventDefault();home();}});
  vp.addEventListener('scroll',updateMini,{passive:true});
  minimap.addEventListener('click',event=>{if(event.detail===0){overview();return;}const bounds=mini.getBoundingClientRect();const x=(event.clientX-bounds.left)/bounds.width*stageWidth;const y=(event.clientY-bounds.top)/bounds.height*stageHeight;if(scale<.35){scale=.65;resize();}vp.scrollTo({left:Math.max(0,x*scale-vp.clientWidth/2),top:Math.max(0,y*scale-vp.clientHeight/2),behavior:reduced.matches?'auto':'smooth'});});
  let drag=null;
  vp.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'||event.button!==0||event.target.closest('a,button'))return;drag={x:event.clientX,y:event.clientY,left:vp.scrollLeft,top:vp.scrollTop};vp.setPointerCapture(event.pointerId);vp.classList.add('dragging');});
  vp.addEventListener('pointermove',event=>{if(drag){vp.scrollLeft=drag.left-(event.clientX-drag.x);vp.scrollTop=drag.top-(event.clientY-drag.y);}});
  for(const name of ['pointerup','pointercancel','lostpointercapture'])vp.addEventListener(name,()=>{drag=null;vp.classList.remove('dragging');});
  window.addEventListener('resize',()=>{cancelAnimationFrame(pendingLayout);pendingLayout=requestAnimationFrame(resize);});
  document.getElementById('node-count').textContent=(count(root)+1)+' organizations & programs';
  layout();overview();
  document.fonts.ready.then(()=>{layout();overview();});
}());
