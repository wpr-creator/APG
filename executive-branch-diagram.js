/* A measured, expandable organization tree. All content is local; no runtime API required. */
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
  const expanded = new Set([root.id, ...root.children.map(n => n.id)]);
  const colors = {eop:'#226d61',departments:'#305d7c',independent:'#a14d37'};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scale = .8, stageHeight = 1200, found = [], matchIndex = 0;
  const stageWidth = 1720;
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
    if(item.children.length){
      const toggle=document.createElement('button');toggle.type='button';toggle.className='node-toggle';
      toggle.setAttribute('aria-label','Show or hide organizations within '+item.title);
      toggle.addEventListener('click',()=>{
        if(expanded.has(item.id))expanded.delete(item.id);else expanded.add(item.id);
        layout();focusNode(item.id,false);
      });controls.appendChild(toggle);
    }
    if(item.source){const link=document.createElement('a');link.className='node-source';link.href=item.source;link.textContent='Official site ↗';link.target='_blank';link.rel='noopener';link.setAttribute('aria-label','Official source for '+item.title+' (opens in new tab)');controls.appendChild(link);}
    if(controls.childElementCount)el.appendChild(controls);
    map.appendChild(el);elements.set(item.id,el);
    item.children.forEach(child=>register(child,item,depth===0?child.kind:family,depth+1));
  }
  function wire(d,family){const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',d);path.setAttribute('class','branch-wire '+(family||''));svg.appendChild(path);}
  register(root,null,'',0);
  function place(item,x,y,width){
    const el=elements.get(item.id);el.hidden=false;el.style.left=x+'px';el.style.top=y+'px';el.style.width=width+'px';
    const btn=el.querySelector('.node-toggle');if(btn){const open=expanded.has(item.id);btn.setAttribute('aria-expanded',String(open));btn.textContent=open?'− Collapse':'＋ Explore · '+item.children.length;}
    return el.offsetHeight;
  }
  function column(item,x,y,width){
    const height=place(item,x,y,width);
    let bottom=y+height;
    if(expanded.has(item.id)&&item.children.length){
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
    elements.forEach(el=>{el.hidden=true;});svg.replaceChildren();
    const rootWidth=490,rootX=(stageWidth-rootWidth)/2;
    const rootHeight=place(root,rootX,34,rootWidth);
    let bottom=34+rootHeight;
    if(expanded.has(root.id)){
      const groupY=bottom+100;
      root.children.forEach((group,i)=>{const x=40+i*570;bottom=Math.max(bottom,column(group,x,groupY,500));wire(`M${stageWidth/2} ${34+rootHeight} V${groupY-48} H${x+250} V${groupY}`,group.family);});
    }
    stageHeight=bottom+80;
    map.style.width=stageWidth+'px';map.style.height=stageHeight+'px';svg.setAttribute('width',stageWidth);svg.setAttribute('height',stageHeight);svg.setAttribute('viewBox',`0 0 ${stageWidth} ${stageHeight}`);
    resize();highlight();
  }
  function resize(){sizer.style.width=stageWidth*scale+'px';sizer.style.height=stageHeight*scale+'px';map.style.transform=`scale(${scale})`;document.getElementById('zoom').textContent=Math.round(scale*100)+'%';document.getElementById('minus').disabled=scale<=.12;document.getElementById('plus').disabled=scale>=1.6;}
  function zoomTo(value){const cx=(vp.scrollLeft+vp.clientWidth/2)/scale,cy=(vp.scrollTop+vp.clientHeight/2)/scale;scale=Math.max(.12,Math.min(1.6,value));resize();vp.scrollLeft=cx*scale-vp.clientWidth/2;vp.scrollTop=cy*scale-vp.clientHeight/2;}
  function showPath(id){const path=[];let current=id;while(current){path.unshift(nodes.get(current).title);current=parents.get(current);}document.getElementById('diagram-help').textContent=path.join(' → ');}
  function focusNode(id,readable=true){const el=elements.get(id);if(!el||el.hidden)return;showPath(id);if(readable){scale=Math.max(.8,Math.min(1.1,(vp.clientWidth-70)/el.offsetWidth));resize();}vp.scrollTo({left:Math.max(0,(el.offsetLeft+el.offsetWidth/2)*scale-vp.clientWidth/2),top:Math.max(0,el.offsetTop*scale-38),behavior:reduced.matches?'auto':'smooth'});}
  function reveal(id){let parent=parents.get(id);while(parent){expanded.add(parent);parent=parents.get(parent);}layout();}
  function home(){jump.value='';document.getElementById('diagram-help').textContent='Open a branch to see inside it. Drag or scroll to move; use + and − to zoom.';scale=Math.max(.35,Math.min(.9,vp.clientWidth/stageWidth));resize();vp.scrollLeft=Math.max(0,(stageWidth*scale-vp.clientWidth)/2);vp.scrollTop=0;}
  function highlight(){const q=search.value.trim().toLowerCase();elements.forEach((el,id)=>{const hit=found.includes(id);el.classList.toggle('hit',hit);el.classList.toggle('dim',!!q&&!hit);});}
  function focusMatch(){if(!found.length)return;reveal(found[matchIndex]);focusNode(found[matchIndex]);matches.textContent=(matchIndex+1)+' of '+found.length+' matches';}
  function searchMap(){jump.value='';const q=search.value.trim().toLowerCase();found=[];if(q)nodes.forEach(item=>{if((item.title+' '+item.desc).toLowerCase().includes(q))found.push(item.id);});matchIndex=0;if(!q)document.getElementById('diagram-help').textContent='Open a branch to see inside it. Drag or scroll to move; use + and − to zoom.';next.hidden=found.length<2;matches.textContent=q&&!found.length?'No matches':'';highlight();if(found.length)focusMatch();}
  document.getElementById('plus').addEventListener('click',()=>zoomTo(scale+.15));document.getElementById('minus').addEventListener('click',()=>zoomTo(scale-.15));document.getElementById('home').addEventListener('click',home);
  document.getElementById('fit').addEventListener('click',()=>{scale=Math.max(.001,Math.min(1,vp.clientWidth/stageWidth,vp.clientHeight/stageHeight));resize();vp.scrollTo(0,0);});
  document.getElementById('expand').addEventListener('click',()=>{nodes.forEach(item=>{if(item.children.length)expanded.add(item.id);});layout();home();});
  document.getElementById('collapse').addEventListener('click',()=>{expanded.clear();expanded.add(root.id);root.children.forEach(n=>expanded.add(n.id));search.value='';found=[];matches.textContent='';next.hidden=true;layout();home();});
  root.children.forEach(group=>{const opt=document.createElement('option');opt.value=group.id;opt.textContent=group.title;jump.appendChild(opt);if(group.kind==='departments')group.children.forEach(dep=>{const opt=document.createElement('option');opt.value=dep.id;opt.textContent=dep.title;jump.appendChild(opt);});});
  jump.addEventListener('change',()=>{if(!jump.value)return;search.value='';found=[];matches.textContent='';next.hidden=true;expanded.add(jump.value);reveal(jump.value);focusNode(jump.value);});
  search.addEventListener('input',searchMap);search.addEventListener('keydown',event=>{if(event.key==='Enter'&&found.length){event.preventDefault();matchIndex=(matchIndex+1)%found.length;focusMatch();}});next.addEventListener('click',()=>{if(found.length){matchIndex=(matchIndex+1)%found.length;focusMatch();}});
  vp.addEventListener('keydown',event=>{if(event.target!==vp)return;if(event.key==='+'||event.key==='='){event.preventDefault();zoomTo(scale+.15);}if(event.key==='-'){event.preventDefault();zoomTo(scale-.15);}if(event.key==='Home'){event.preventDefault();home();}});
  let drag=null;
  vp.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'||event.button!==0||event.target.closest('a,button'))return;drag={x:event.clientX,y:event.clientY,left:vp.scrollLeft,top:vp.scrollTop};vp.setPointerCapture(event.pointerId);vp.classList.add('dragging');});
  vp.addEventListener('pointermove',event=>{if(drag){vp.scrollLeft=drag.left-(event.clientX-drag.x);vp.scrollTop=drag.top-(event.clientY-drag.y);}});
  for(const name of ['pointerup','pointercancel','lostpointercapture'])vp.addEventListener(name,()=>{drag=null;vp.classList.remove('dragging');});
  window.addEventListener('resize',()=>{cancelAnimationFrame(pendingLayout);pendingLayout=requestAnimationFrame(resize);});
  document.getElementById('node-count').textContent=(count(root)+1)+' organizations & programs';
  layout();home();
  document.fonts.ready.then(()=>{layout();home();});
}());
