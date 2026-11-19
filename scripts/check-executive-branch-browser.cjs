/* Manual browser regression check. Start the local site server, then run:
   node scripts/check-executive-branch-browser.cjs
   Requires Playwright and Chromium. APG_BASE_URL, PLAYWRIGHT_MODULE, and
   BROWSER_EXECUTABLE may override the server, package, and browser paths. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('assert');
const url=(process.env.APG_BASE_URL||'http://127.0.0.1:8765/').replace(/\/?$/,'/')+'executive-branch-diagram.html';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
 try{
  for(const device of [{name:'laptop',viewport:{width:1440,height:1000}},{name:'ipad-landscape',viewport:{width:1024,height:768},hasTouch:true,isMobile:true},{name:'ipad-portrait',viewport:{width:768,height:1024},hasTouch:true,isMobile:true}]){
   const context=await browser.newContext({...device,reducedMotion:'reduce',permissions:['clipboard-read','clipboard-write']});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(url);try{await page.locator('.branch-node').first().waitFor();}catch(error){console.error({url:page.url(),errors,state:await page.evaluate(()=>({ready:document.readyState,data:!!window.EXECUTIVE_BRANCH_DATA,scripts:[...document.scripts].map(s=>s.src),resources:performance.getEntriesByType('resource').filter(r=>r.name.includes('executive-branch')).map(r=>({name:r.name,duration:r.duration}))}))});throw error;}await page.evaluate(()=>document.fonts.ready);
   const total=await page.evaluate(()=>{function count(n){return 1+n.children.reduce((sum,child)=>sum+count(child),0);}return count(window.EXECUTIVE_BRANCH_DATA);});
   assert.equal(await page.locator('.node-source').count(),total);
   const initial=await page.locator('#zoom').innerText();
   await page.locator('#search').fill('coins');
   await page.locator('#branch-results').waitFor({state:'visible'});
   const count=await page.locator('#results-list button').count();assert(count>=3);
   const mint=page.locator('#results-list button[data-node="u-s-mint"]');
   assert.match(await mint.innerText(),/Matching topics:.*coin/);
   await mint.click();
   assert(await page.locator('#node-u-s-mint').evaluate(el=>el.classList.contains('selected')));
   assert(page.url().endsWith('#agency=u-s-mint'));
   assert.equal(await page.locator('.branch-node.dim').count(),0);
   assert.equal(await page.locator('.node-source[tabindex="0"]').count(),1);
   const visible=await page.evaluate(()=>{const n=document.querySelector('#node-u-s-mint').getBoundingClientRect(),v=document.querySelector('#viewport').getBoundingClientRect();return n.left>=v.left&&n.right<=v.right&&n.top>=v.top&&n.bottom<=v.bottom});assert(visible,'Selected card must fit in '+device.name);
   await page.locator('#node-u-s-mint .node-copy').click();
   assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/#agency=u-s-mint$/);
   await page.locator('#view-back').click();await page.locator('#view-back').click();
   assert.equal(await page.locator('#search').inputValue(),'');assert.equal(await page.locator('#zoom').innerText(),initial);assert(await page.locator('#branch-results').isHidden());
   await page.locator('#search').fill('prison');await page.locator('#search').press('ArrowDown');
   assert(await page.locator('#results-list button').first().evaluate(el=>document.activeElement===el));
   await page.keyboard.press('End');await page.keyboard.press('Enter');assert.match(await page.locator('#matches').innerText(),/results/);
   await page.keyboard.press('Escape');assert(await page.locator('#branch-results').isHidden());
   await page.locator('#jump').selectOption('department-of-energy');assert(await page.locator('#node-department-of-energy').evaluate(el=>el.classList.contains('selected')));
   await page.locator('#plus').click();const zoomed=await page.locator('#zoom').innerText();await page.locator('#minus').click();assert.notEqual(await page.locator('#zoom').innerText(),zoomed);
   await page.locator('#search').fill('mosquito');
   assert(await page.locator('#results-list button[data-node="division-of-vector-borne-diseases"]').count());
   assert(await page.locator('#results-list button[data-node="centers-for-disease-control-and-prevention-cdc"]').count());
   await page.locator('#fullscreen').click();assert.equal(await page.locator('#fullscreen').getAttribute('aria-pressed'),'true');

   await page.keyboard.press('Escape');assert.equal(await page.locator('#fullscreen').getAttribute('aria-pressed'),'false');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'No page overflow '+device.name);
   await page.goto(url+'#agency=federal-bureau-of-prisons');await page.locator('#node-federal-bureau-of-prisons.selected').waitFor();await page.evaluate(()=>document.fonts.ready);
   assert.match(await page.locator('#diagram-help').innerText(),/Department of Justice.*Federal Bureau of Prisons/);
   await page.setViewportSize({width:device.name==='ipad-portrait'?1024:768,height:device.name==='ipad-portrait'?768:1024});await page.waitForTimeout(200);
   assert(await page.locator('#node-federal-bureau-of-prisons').evaluate(el=>{const n=el.getBoundingClientRect(),v=document.querySelector('#viewport').getBoundingClientRect();return n.left>=v.left&&n.right<=v.right&&n.top>=v.top;}));
   if(device.name==='laptop'){
    for(const [query,id] of [['Who names mountains?','u-s-board-on-geographic-names'],['airport beagles','national-detector-dog-training-center'],['space germs','office-of-planetary-protection'],['time zones','department-of-transportation'],['makeup','food-and-drug-administration-fda'],['cats','center-for-veterinary-medicine']]){
     await page.locator('#search').fill(query);assert(await page.locator('#results-list button[data-node="'+id+'"]').count(),query+' must find '+id);
    }
    for(const [query,id] of [['ICE','national-park-service'],['art','national-institute-of-standards-and-technology-nist'],['street names','u-s-board-on-geographic-names']]){
     await page.locator('#search').fill(query);assert.equal(await page.locator('#results-list button[data-node="'+id+'"]').count(),0,query+' must not misidentify '+id);
    }
   }
   assert.deepEqual(errors,[]);console.log(device.name+': search list, topic hints, selection, clipboard, Back, keyboard, zoom, fullscreen, deep link and resize passed.');
   await context.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
