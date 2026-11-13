(() => {
  'use strict';
  const root = new URL('./',document.currentScript.src);
  const nav = document.querySelector('.preview-nav');
  if (!nav || document.getElementById('course-search')) return;
  const button = document.createElement('button');
  button.className = 'course-search-button'; button.type = 'button';
  button.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 5 5"></path></svg><span>SEARCH</span>';
  button.setAttribute('aria-haspopup','dialog');
  button.setAttribute('aria-keyshortcuts','/');
  nav.insertBefore(button,nav.querySelector('.preview-exit'));
  const dialog = document.createElement('dialog'); dialog.id = 'course-search';
  dialog.setAttribute('aria-labelledby','course-search-title');
  dialog.innerHTML = `<div class="search-heading"><h2 id="course-search-title">Find your materials.</h2><button type="button" class="search-close" aria-label="Close search">Close <kbd>Esc</kbd></button></div><label for="course-search-input">Search lessons, materials, cases, documents, and terms</label><input id="course-search-input" type="search" autocomplete="off" placeholder="Try 2.2, Federalist, or federalism"><div class="search-filters" role="group" aria-label="Search category"><button type="button" data-search-type="All" aria-pressed="true">All</button><button type="button" data-search-type="Lesson" aria-pressed="false">Lessons</button><button type="button" data-search-type="Resource" aria-pressed="false">Materials</button><button type="button" data-search-type="Case" aria-pressed="false">Cases</button><button type="button" data-search-type="Document" aria-pressed="false">Documents</button><button type="button" data-search-type="Term" aria-pressed="false">Terms</button></div><p class="search-status" role="status" aria-live="polite"></p><div class="search-results"></div><p class="search-help">↑ ↓ Move through results · Enter to open · Esc to close</p>`;
  document.body.append(dialog);
  const input = dialog.querySelector('input');
  const results = dialog.querySelector('.search-results');
  const status = dialog.querySelector('.search-status');
  let index, settings, request, opener, active = -1;
  let category='All';
  let engineRequest;
  function loadEngine(){
    if(window.APG_SEARCH)return Promise.resolve();
    return engineRequest ||= new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL('search-engine.js?v=20261113-resource-search',root);script.onload=resolve;script.onerror=reject;document.head.append(script);}).catch(error=>{engineRequest=null;throw error;});
  }
  function highlight(element,text,terms){
    if(!terms.length){element.textContent=text;return;}
    const lower=text.toLowerCase();let position=0;
    while(position<text.length){let next=-1,word='';for(const term of terms){const found=lower.indexOf(term.toLowerCase(),position);if(found>=0&&(next<0||found<next)){next=found;word=term;}}
      if(next<0){element.append(document.createTextNode(text.slice(position)));break;}
      element.append(document.createTextNode(text.slice(position,next)));const mark=document.createElement('mark');mark.textContent=text.slice(next,next+word.length);element.append(mark);position=next+word.length;
    }
  }
  function render() {
    results.replaceChildren(); active = -1;
    if (!index || !settings) return;
    if(!window.APG_SEARCH)return;
    const query=input.value.trim();
    if(!query&&category==='All'){status.textContent='Type a title, lesson number, or concept. Try SCOTUS or Fed 10.';return;}
    const matches=window.APG_SEARCH.search(window.APG_SEARCH.availableEntries(index,settings),query,category);
    status.textContent = matches.length ? `${matches.length} result${matches.length===1?'':'s'}${matches.length>30?' · showing the first 30':''}${matches.some(item=>item.approximate)?' · includes close spelling matches':''}` : 'No matches. Try a shorter title or another concept.';
    for (const {entry,terms} of matches.slice(0,30)) {
      const link = document.createElement('a'); link.href = new URL(entry.url,root).href;
      const type = document.createElement('span'); type.className='search-type'; type.textContent=entry.type;
      const title=document.createElement('strong');highlight(title,entry.title,terms);
      const detail=document.createElement('span');detail.className='search-detail';highlight(detail,entry.detail,terms);
      if(new URL(link.href).origin!==location.origin){link.target='_blank';link.rel='noopener';detail.append(document.createTextNode(' · opens a new tab'));}
      link.append(type,title,detail);results.append(link);
    }
  }
  async function open() {
    if (dialog.open) return;
    opener=document.activeElement===document.body?button:document.activeElement;dialog.showModal();input.focus();
    settings=null;results.replaceChildren();status.textContent='Loading search…';
    try {
      request ||= fetch(new URL('search-index.json?v=20261113-resource-search',root)).then(response=>{if(!response.ok)throw Error();return response.json();});
      [index,settings]=await Promise.all([request,fetch(new URL('site-content.json',root),{cache:'no-store'}).then(response=>{if(!response.ok)throw Error();return response.json();}),loadEngine()]);render();
    } catch (_) {request=null;status.textContent='Search could not load. Close and reopen to retry, or use Units, Library, and Glossary in the navigation.';}
  }
  button.addEventListener('click',open);
  dialog.querySelector('.search-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>opener?.focus());
  input.addEventListener('input',render);
  dialog.querySelectorAll('[data-search-type]').forEach(filter=>filter.addEventListener('click',()=>{category=filter.dataset.searchType;dialog.querySelectorAll('[data-search-type]').forEach(item=>item.setAttribute('aria-pressed',String(item===filter)));render();}));
  dialog.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();dialog.close();return;}
    if (!['ArrowDown','ArrowUp','Enter'].includes(event.key))return;
    const links=[...results.querySelectorAll('a')];
    if(event.key==='Enter') {
      if(document.activeElement===input && links.length){event.preventDefault();links[0].click();} return;
    }
    if(!links.length)return;
    event.preventDefault(); const focused=links.indexOf(document.activeElement);
    active=event.key==='ArrowDown'?(focused+1)%links.length:focused<=0?links.length-1:focused-1;
    links[active].focus();
  });
  document.addEventListener('keydown',event=>{
    if(event.key!=='/' || event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented || dialog.open)return;
    const target=event.target;
    if(target instanceof Element && target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="textbox"]'))return;
    if(document.querySelector('dialog[open]'))return;
    event.preventDefault();open();
  });
})();
