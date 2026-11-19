/* A measured, fully expanded organization map. All content is local; no runtime API required. */
(function () {
  'use strict';
  const root = window.EXECUTIVE_BRANCH_DATA;
  const map = document.getElementById('diagram');
  const svg = document.getElementById('wires');
  const vp = document.getElementById('viewport');
  const sizer = document.getElementById('sizer');
  const search = document.getElementById('search');
  const matches = document.getElementById('matches');
  const jump = document.getElementById('jump');
  const zoomRange=document.getElementById('zoom-range');
  const explorer=document.querySelector('.branch-explorer');
  const fullscreen=document.getElementById('fullscreen');
  const resultPanel=document.getElementById('branch-results');
  const resultList=document.getElementById('results-list');
  const resultSummary=document.getElementById('results-summary');
  const backButton=document.getElementById('view-back');
  const status=document.getElementById('branch-status');
  const frame=document.querySelector('.branch-map-frame');
  let selectedId=null,searchSession=false;
  const viewHistory=[];
  const minScale=.01,maxScale=4;
  let oldBodyOverflow='';
  const outsideMap=[...document.querySelectorAll('.preview-header,.branch-intro,.branch-notes,.skip')];
  const previousInert=new Map();
  if (!root || !map) return;
  const nodes = new Map(), parents = new Map(), elements = new Map();
  const kindLabels={'central-bank-system':'Central bank system','federal-agency':'Federal agency','reserve-banks':'Regional Reserve Banks','policy-committee':'Policy committee','military-service':'Military service','military-component':'Military component','military-department':'Military department','military-command':'Military command','bureau':'Bureau','division':'Division','field-offices':'Field offices','park-unit':'National Park Service unit','center':'Center','staff-office':'Presidential staff'};
  const linkLabels={'website':'Website','program-page':'Program page','organization-listing':'Organization listing','official-profile':'Official profile','directory':'Official directory','staff-directory':'Staff directory (PDF)'};
  const colors = {eop:'#226d61',departments:'#305d7c',independent:'#a14d37'};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scale = .8, stageHeight = 1200, found = [], matchIndex = 0;
  const cardWidth=430, columnStep=500, bandGap=200;
  const columnCounts=[3,15,6];
  const stageWidth=120+columnCounts.reduce((sum,n)=>sum+n*columnStep-70,0)+bandGap*2;
  const mini=document.getElementById('mini-chart');
  const minimap=document.getElementById('minimap');
  let miniWindow;
  let pendingLayout = 0,viewWidth=0,viewHeight=0;
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
    tag.textContent = item===root?'Article II':depth===1?(family==='eop'?'Presidential support':family==='departments'?'Executive departments':'Agencies & other institutions'):item.kind==='department'?'Executive department':item.kind==='program'?'Program, service, or site':item.kind==='grouping'?'Related organizations':kindLabels[item.kind]||'Agency, bureau, or office';
    el.appendChild(tag);
    const heading=document.createElement(item===root?'h2':depth<=2?'h3':'h4');
    heading.id=el.id+'-title';heading.textContent=item.title;el.setAttribute('aria-labelledby',heading.id);el.appendChild(heading);
    const desc=document.createElement('p');desc.textContent=item.desc;el.appendChild(desc);
    const controls=document.createElement('div');controls.className='node-controls';
    if(item.url){const link=document.createElement('a');const label=linkLabels[item.linkType]||'Official page';link.className='node-source';link.href=item.url;link.textContent=label+' ↗';link.target='_blank';link.rel='noopener';link.setAttribute('aria-label',label+' for '+item.title+' (opens in new tab)');controls.appendChild(link);}
    const copy=document.createElement('button');copy.type='button';copy.className='node-copy';
    copy.setAttribute('aria-label','Copy link to '+item.title);copy.title='Copy link';
    copy.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 13 4-4m-6 6-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 4 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"/></svg>';
    copy.addEventListener('click',()=>copyNodeLink(item.id));controls.appendChild(copy);
    controls.querySelectorAll('a,button').forEach(control=>control.tabIndex=-1);
    el.appendChild(controls);
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
  function resize(){
    viewWidth=vp.clientWidth;viewHeight=vp.clientHeight;
    sizer.style.width=stageWidth*scale+'px';sizer.style.height=stageHeight*scale+'px';map.style.transform=`scale(${scale})`;
    const percent=Math.round(scale*100);document.getElementById('zoom').textContent=percent+'%';
    zoomRange.value=Math.max(0,Math.min(100,Math.log(scale/minScale)/Math.log(maxScale/minScale)*100));zoomRange.setAttribute('aria-valuetext',percent+' percent');
    document.getElementById('minus').disabled=scale<=minScale;document.getElementById('plus').disabled=scale>=maxScale;updateMini();
  }
  function zoomTo(value,px=vp.clientWidth/2,py=vp.clientHeight/2){
    const cx=(vp.scrollLeft+px)/scale,cy=(vp.scrollTop+py)/scale;
    scale=Math.max(minScale,Math.min(maxScale,value));resize();
    vp.scrollLeft=cx*scale-px;vp.scrollTop=cy*scale-py;updateMini();
  }
  function nodePath(id){const path=[];let current=id;while(current){path.unshift(nodes.get(current).title);current=parents.get(current);}return path;}
  function showPath(id){const text=nodePath(id).join(' → ');document.getElementById('diagram-help').textContent=text;document.getElementById('diagram-help').title=text;}
  function setNodeUrl(id){const url=new URL(location.href);url.hash=id?'agency='+encodeURIComponent(id):'';if(url.href!==location.href)history.replaceState(null,'',url);}
  function snapshot(){return {scale,cx:(vp.scrollLeft+vp.clientWidth/2)/scale,cy:(vp.scrollTop+vp.clientHeight/2)/scale,query:search.value,selectedId,panel:!resultPanel.hidden,jump:jump.value};}
  function rememberView(overrides={}){viewHistory.push({...snapshot(),...overrides});if(viewHistory.length>30)viewHistory.shift();backButton.disabled=false;}
  function setResultsOpen(open){resultPanel.hidden=!open;frame.classList.toggle('has-results',open);}
  function selectNode(id){selectedId=id;highlight();showPath(id);setNodeUrl(id);resultList.querySelectorAll('button').forEach(button=>{const active=button.dataset.node===id;if(active){button.setAttribute('aria-current','true');const b=button.getBoundingClientRect(),r=resultList.getBoundingClientRect();if(b.top<r.top)resultList.scrollTop+=b.top-r.top;else if(b.bottom>r.bottom)resultList.scrollTop+=b.bottom-r.bottom;}else button.removeAttribute('aria-current');});}
  function focusNode(id,readable=true){
    const el=elements.get(id);if(!el||el.hidden)return;selectNode(id);
    if(readable){scale=Math.max(.45,Math.min(1.1,(vp.clientWidth-60)/el.offsetWidth));resize();}
    // A direct move keeps distant results predictable, including while typing on iPad.
    vp.scrollTo({left:Math.max(0,(el.offsetLeft+el.offsetWidth/2)*scale-vp.clientWidth/2),top:Math.max(0,el.offsetTop*scale-30),behavior:'instant'});updateMini();
  }
  const guide='Drag to move · Scroll or pinch to zoom';
  function resetSearch(){search.value='';found=[];matches.textContent='';searchSession=false;setResultsOpen(false);highlight();}
  function home(){rememberView();resetSearch();jump.value='';scale=.65;resize();focusNode(root.id,false);}
  function overview(record=true){if(record)rememberView();resetSearch();jump.value='';selectedId=null;setNodeUrl(null);document.getElementById('diagram-help').textContent=guide;scale=Math.min(1,(vp.clientWidth-30)/stageWidth);resize();vp.scrollTo({left:0,top:0,behavior:'instant'});highlight();updateMini();}
  function highlight(){
    const hits=new Set(found);
    elements.forEach((el,id)=>{
      el.classList.toggle('hit',hits.has(id));el.classList.toggle('selected',id===selectedId);el.classList.remove('dim');
      el.querySelectorAll('.node-controls a,.node-controls button').forEach(control=>control.tabIndex=id===selectedId?0:-1);
    });
  }
  function focusMatch(index=matchIndex){if(!found.length)return;matchIndex=index;focusNode(found[matchIndex]);matches.textContent=(matchIndex+1)+' of '+found.length+(found.length===1?' result':' results');}
  function searchText(value){return value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/\./g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
  function findMatches(){
    const q=searchText(search.value);found=[];
    if(q){
      const words=q.split(/\s+/),hits=[];
      nodes.forEach(item=>{
        const title=searchText(item.title),aliases=searchText((item.aliases||[]).join(' '));
        const description=searchText(item.desc),topics=searchText((item.topics||[]).join(' '));
        const text=[title,aliases,description,topics].join(' ');
        if(words.every(word=>text.includes(word))){
          const score=title===q?120:title.includes(q)?100:aliases.includes(q)?90:topics.includes(q)?70:description.includes(q)?60:40;
          hits.push({id:item.id,score:score-(item.kind==='department'?8:0)});
        }
      });
      hits.sort((a,b)=>b.score-a.score);found=hits.map(hit=>hit.id);
    }
  }
  function renderResults(){
    resultList.replaceChildren();resultList.scrollTop=0;const words=searchText(search.value).split(/\s+/).filter(Boolean);
    resultSummary.textContent=found.length?found.length+(found.length===1?' result':' results'):'No matches. Try another agency name or topic.';
    found.forEach((id,index)=>{
      const item=nodes.get(id),li=document.createElement('li'),button=document.createElement('button');
      button.type='button';button.dataset.node=id;button.tabIndex=index===0?0:-1;
      const title=document.createElement('strong');title.textContent=item.title;button.appendChild(title);
      const path=document.createElement('span');path.className='result-path';path.textContent=nodePath(id).slice(2,-1).join(' → ');button.appendChild(path);
      const topics=item.topics||[],matched=topics.filter(topic=>words.some(word=>searchText(topic).includes(word)));
      const terms=matched.length?matched.slice(0,3):topics.slice(0,2);
      const reason=document.createElement('span');reason.className='result-topics';
      reason.textContent=(matched.length?'Matching topics: ':'Topics: ')+terms.join(', ');
      const alias=(item.aliases||[]).find(alias=>searchText(alias).includes(searchText(search.value)));
      if(!matched.length&&alias)reason.textContent='Also known as: '+alias;
      if(terms.length||alias)button.appendChild(reason);
      button.addEventListener('click',()=>{if(selectedId!==id)rememberView();focusMatch(index);status.textContent='Showing '+item.title;});
      button.addEventListener('focus',()=>{resultList.querySelectorAll('button').forEach(other=>other.tabIndex=other===button?0:-1);});
      li.appendChild(button);resultList.appendChild(li);
    });
  }
  function searchMap(){
    const q=searchText(search.value);if(q&&!searchSession){rememberView({query:'',panel:false});searchSession=true;}
    jump.value='';findMatches();matchIndex=0;renderResults();setResultsOpen(!!q);resize();
    matches.textContent=q?(found.length?found.length+' results':'No matches'):'';
    if(!q){searchSession=false;highlight();if(selectedId)focusNode(selectedId,false);else document.getElementById('diagram-help').textContent=guide;}
    else {highlight();if(found.length)focusMatch();}
  }
  backButton.addEventListener('click',()=>{
    const view=viewHistory.pop();if(!view)return;
    search.value=view.query;selectedId=view.selectedId;searchSession=!!searchText(search.value);jump.value=view.jump;
    findMatches();renderResults();setResultsOpen(view.panel);scale=view.scale;resize();
    vp.scrollTo({left:Math.max(0,view.cx*scale-vp.clientWidth/2),top:Math.max(0,view.cy*scale-vp.clientHeight/2),behavior:'instant'});
    matchIndex=Math.max(0,found.indexOf(selectedId));matches.textContent=searchSession?(found.length?found.length+' results':'No matches'):'';
    if(selectedId)selectNode(selectedId);else{highlight();setNodeUrl(null);document.getElementById('diagram-help').textContent=guide;}
    backButton.disabled=!viewHistory.length;updateMini();status.textContent='Previous view restored.';
  });
  function closeResults(){const cx=(vp.scrollLeft+vp.clientWidth/2)/scale;setResultsOpen(false);resize();vp.scrollLeft=Math.max(0,cx*scale-vp.clientWidth/2);search.focus({preventScroll:true});}
  document.getElementById('results-close').addEventListener('click',closeResults);
  resultList.addEventListener('keydown',event=>{
    const buttons=[...resultList.querySelectorAll('button')],index=buttons.indexOf(document.activeElement);let target;
    if(event.key==='ArrowDown')target=Math.min(buttons.length-1,index+1);
    if(event.key==='ArrowUp')target=Math.max(0,index-1);
    if(event.key==='Home')target=0;if(event.key==='End')target=buttons.length-1;
    if(target!==undefined){event.preventDefault();buttons[target]?.focus();}
    if(event.key==='Escape'){event.preventDefault();closeResults();}
  });
  async function copyNodeLink(id){
    if(selectedId!==id){rememberView();selectNode(id);}setNodeUrl(id);const url=location.href;let copied=false;
    try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(url);copied=true;}}catch(error){/* Use the local copy fallback below. */}
    if(!copied){const input=document.createElement('textarea');input.value=url;input.className='sr';document.body.appendChild(input);input.select();try{copied=document.execCommand('copy');}catch(error){copied=false;}input.remove();elements.get(id).querySelector('.node-copy').focus({preventScroll:true});}
    const button=elements.get(id).querySelector('.node-copy');if(copied){button.title='Link copied';const icon=button.innerHTML;button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';setTimeout(()=>{button.innerHTML=icon;button.title='Copy link';},1800);}
    status.textContent=(copied?'Link copied for ':'Link is in the address bar for ')+nodes.get(id).title+'.';
  }
  document.getElementById('plus').addEventListener('click',()=>zoomTo(scale*1.4));document.getElementById('minus').addEventListener('click',()=>zoomTo(scale/1.4));
  document.getElementById('fit').addEventListener('click',()=>overview());
  zoomRange.addEventListener('input',()=>zoomTo(minScale*Math.pow(maxScale/minScale,Number(zoomRange.value)/100)));
  document.getElementById('pan-overview').addEventListener('click',()=>overview());
  const presidentOption=document.createElement('option');presidentOption.value=root.id;presidentOption.textContent='President';jump.appendChild(presidentOption);
  root.children.forEach(group=>{const opt=document.createElement('option');opt.value=group.id;opt.textContent=group.title;jump.appendChild(opt);if(group.kind==='departments')group.children.forEach(dep=>{const opt=document.createElement('option');opt.value=dep.id;opt.textContent=dep.title;jump.appendChild(opt);});});
  jump.addEventListener('change',()=>{const id=jump.value;if(!id)return;rememberView({jump:[...jump.options].some(option=>option.value===selectedId)?selectedId:''});resetSearch();resize();jump.value=id;focusNode(id);});
  search.addEventListener('pointerdown',()=>{if(searchText(search.value)&&resultPanel.hidden){setResultsOpen(true);resize();if(selectedId)focusNode(selectedId);}});
  search.addEventListener('input',searchMap);
  search.addEventListener('keydown',event=>{
    if(['ArrowDown','ArrowUp'].includes(event.key)&&found.length){event.preventDefault();setResultsOpen(true);resize();const buttons=resultList.querySelectorAll('button');buttons[event.key==='ArrowDown'?0:buttons.length-1].focus();}
    if(event.key==='Enter'&&found.length){event.preventDefault();setResultsOpen(true);resize();focusMatch(0);}
    if(event.key==='Escape'){event.preventDefault();closeResults();}
  });
  function pan(direction,amount=.6){
    if(scale<.3)zoomTo(.4);
    const dx=direction==='left'?-vp.clientWidth*amount:direction==='right'?vp.clientWidth*amount:0;
    const dy=direction==='up'?-vp.clientHeight*amount:direction==='down'?vp.clientHeight*amount:0;
    vp.scrollBy({left:dx,top:dy,behavior:reduced.matches?'auto':'smooth'});
  }
  document.querySelectorAll('[data-pan]').forEach(button=>button.addEventListener('click',()=>pan(button.dataset.pan)));
  vp.addEventListener('keydown',event=>{
    if(event.target!==vp)return;
    const directions={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};
    if(directions[event.key]){event.preventDefault();pan(directions[event.key],event.shiftKey ? .8 : .2);}
    if(event.key==='+'||event.key==='='){event.preventDefault();zoomTo(scale*1.4);}
    if(event.key==='-'){event.preventDefault();zoomTo(scale/1.4);}
    if(event.key==='Home'){event.preventDefault();home();}
    if(event.key==='0'){event.preventDefault();overview();}if(event.key==='1'){event.preventDefault();zoomTo(1);}
  });
  function toggleFullscreen(force){
    const open=typeof force==='boolean'?force:!explorer.classList.contains('is-fullscreen');
    const cx=(vp.scrollLeft+vp.clientWidth/2)/scale,cy=(vp.scrollTop+vp.clientHeight/2)/scale;
    if(open){oldBodyOverflow=document.body.style.overflow;outsideMap.forEach(el=>{previousInert.set(el,el.inert);el.inert=true;});}
    else outsideMap.forEach(el=>{el.inert=previousInert.get(el)||false;});
    explorer.classList.toggle('is-fullscreen',open);document.body.style.overflow=open?'hidden':oldBodyOverflow;
    fullscreen.setAttribute('aria-label',open?'Exit full screen':'Full screen');fullscreen.title=open?'Exit full screen':'Full screen';fullscreen.setAttribute('aria-pressed',String(open));
    resize();vp.scrollLeft=cx*scale-vp.clientWidth/2;vp.scrollTop=cy*scale-vp.clientHeight/2;updateMini();
    fullscreen.focus({preventScroll:true});
  }
  fullscreen.addEventListener('click',()=>toggleFullscreen());
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&explorer.classList.contains('is-fullscreen')){event.preventDefault();toggleFullscreen(false);}});
  vp.addEventListener('scroll',updateMini,{passive:true});
  vp.addEventListener('wheel',event=>{
    event.preventDefault();
    if(event.shiftKey||(!event.ctrlKey&&Math.abs(event.deltaX)>Math.abs(event.deltaY))){if(scale<.3)zoomTo(.4);vp.scrollLeft+=event.deltaX||event.deltaY;if(!event.shiftKey)vp.scrollTop+=event.deltaY;return;}
    const rect=vp.getBoundingClientRect();const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?vp.clientHeight:1);
    zoomTo(scale*Math.exp(-Math.max(-200,Math.min(200,delta))*.0025),event.clientX-rect.left,event.clientY-rect.top);
  },{passive:false});
  vp.addEventListener('dblclick',event=>{if(event.target.closest('a,button'))return;const rect=vp.getBoundingClientRect();zoomTo(scale*(event.shiftKey?1/1.8:1.8),event.clientX-rect.left,event.clientY-rect.top);});
  function travel(event){
    const bounds=mini.getBoundingClientRect();const x=Math.max(0,Math.min(1,(event.clientX-bounds.left)/bounds.width))*stageWidth;const y=Math.max(0,Math.min(1,(event.clientY-bounds.top)/bounds.height))*stageHeight;
    if(scale<.35){scale=.65;resize();}
    vp.scrollLeft=Math.max(0,x*scale-vp.clientWidth/2);vp.scrollTop=Math.max(0,y*scale-vp.clientHeight/2);updateMini();
  }
  let navigating=false;
  minimap.addEventListener('pointerdown',event=>{if(event.button!==0)return;rememberView();event.preventDefault();navigating=true;minimap.setPointerCapture(event.pointerId);travel(event);});
  minimap.addEventListener('pointermove',event=>{if(navigating)travel(event);});
  for(const name of ['pointerup','pointercancel','lostpointercapture'])minimap.addEventListener(name,()=>{navigating=false;});
  minimap.addEventListener('click',event=>{if(event.detail===0)overview();});
  const pointers=new Map();let gesture=null;
  function resetGesture(){
    const points=[...pointers.values()];
    if(points.length===1)gesture={type:'pan',x:points[0].x,y:points[0].y,left:vp.scrollLeft,top:vp.scrollTop};
    else if(points.length>=2){const a=points[0],b=points[1],rect=vp.getBoundingClientRect();const x=(a.x+b.x)/2-rect.left,y=(a.y+b.y)/2-rect.top;gesture={type:'pinch',distance:Math.hypot(b.x-a.x,b.y-a.y),scale,worldX:(vp.scrollLeft+x)/scale,worldY:(vp.scrollTop+y)/scale};}
    else gesture=null;
  }
  vp.addEventListener('pointerdown',event=>{
    if(event.button!==0||event.target.closest('a,button'))return;
    vp.focus({preventScroll:true});pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});vp.setPointerCapture(event.pointerId);resetGesture();vp.classList.add('dragging');
  });
  vp.addEventListener('pointermove',event=>{
    if(!pointers.has(event.pointerId))return;
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});const points=[...pointers.values()];
    if(gesture?.type==='pinch'&&points.length>=2){const a=points[0],b=points[1],rect=vp.getBoundingClientRect();const distance=Math.hypot(b.x-a.x,b.y-a.y);scale=Math.max(minScale,Math.min(maxScale,gesture.scale*distance/Math.max(1,gesture.distance)));resize();vp.scrollLeft=gesture.worldX*scale-((a.x+b.x)/2-rect.left);vp.scrollTop=gesture.worldY*scale-((a.y+b.y)/2-rect.top);}
    else if(gesture?.type==='pan'){const dx=points[0].x-gesture.x,dy=points[0].y-gesture.y;if(scale<.3&&Math.hypot(dx,dy)>4){const rect=vp.getBoundingClientRect();zoomTo(.4,gesture.x-rect.left,gesture.y-rect.top);gesture.left=vp.scrollLeft;gesture.top=vp.scrollTop;}vp.scrollLeft=gesture.left-dx;vp.scrollTop=gesture.top-dy;}
    updateMini();
  });
  function endPointer(event){pointers.delete(event.pointerId);resetGesture();if(!pointers.size)vp.classList.remove('dragging');}
  for(const name of ['pointerup','pointercancel','lostpointercapture'])vp.addEventListener(name,endPointer);
  window.addEventListener('resize',()=>{cancelAnimationFrame(pendingLayout);pendingLayout=requestAnimationFrame(()=>{
    const cx=(vp.scrollLeft+viewWidth/2)/scale,cy=(vp.scrollTop+viewHeight/2)/scale;
    resize();if(selectedId)focusNode(selectedId);else{vp.scrollLeft=cx*scale-vp.clientWidth/2;vp.scrollTop=cy*scale-vp.clientHeight/2;}updateMini();
  });});
  function readNodeUrl(){const id=new URLSearchParams(location.hash.slice(1)).get('agency');return nodes.has(id)?id:null;}
  window.addEventListener('hashchange',()=>{const id=readNodeUrl();if(id){rememberView();resetSearch();resize();focusNode(id);}else overview(false);});
  document.getElementById('node-count').textContent=(count(root)+1)+' organizations & programs';
  layout();const initialId=readNodeUrl();if(initialId)focusNode(initialId);else overview(false);
  document.fonts.ready.then(()=>{
    const view=snapshot();layout();
    if(selectedId)focusNode(selectedId,false);
    else{scale=view.scale;resize();vp.scrollLeft=view.cx*scale-vp.clientWidth/2;vp.scrollTop=view.cy*scale-vp.clientHeight/2;updateMini();}
  });
}());
