(() => {
  'use strict';
  const root = new URL('./',document.currentScript.src);
  const nav = document.querySelector('.preview-nav');
  if (!nav || document.getElementById('course-search')) return;
  const button = document.createElement('button');
  button.className = 'course-search-button'; button.type = 'button';
  button.textContent = 'SEARCH'; button.setAttribute('aria-haspopup','dialog');
  button.setAttribute('aria-keyshortcuts','/');
  nav.insertBefore(button,nav.querySelector('.preview-exit'));
  const dialog = document.createElement('dialog'); dialog.id = 'course-search';
  dialog.setAttribute('aria-labelledby','course-search-title');
  dialog.innerHTML = `<div class="search-heading"><h2 id="course-search-title">Find your materials.</h2><button type="button" class="search-close" aria-label="Close search">Close <kbd>Esc</kbd></button></div><label for="course-search-input">Search lessons, cases, documents, and terms</label><input id="course-search-input" type="search" autocomplete="off" placeholder="Try 2.2, Federalist, or federalism"><p class="search-status" role="status" aria-live="polite"></p><div class="search-results"></div><p class="search-help">↑ ↓ Move through results · Enter to open · Esc to close</p>`;
  document.body.append(dialog);
  const input = dialog.querySelector('input');
  const results = dialog.querySelector('.search-results');
  const status = dialog.querySelector('.search-status');
  let index, request, opener, active = -1;
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9.]+/g,' ').trim();
  function render() {
    results.replaceChildren(); active = -1;
    if (!index) return;
    const query = normalize(input.value), tokens = query.split(' ').filter(Boolean);
    if (!query) { status.textContent = 'Type a title, lesson number, or concept to begin.'; return; }
    const matches = index.map(entry=>{
      const title=normalize(entry.title), all=title+' '+normalize(entry.detail);
      return {entry,score:tokens.every(token=>all.includes(token)) ? (title===query?100:title.startsWith(query)?60:title.includes(query)?40:10) : 0};
    }).filter(item=>item.score).sort((a,b)=>b.score-a.score||a.entry.title.localeCompare(b.entry.title));
    status.textContent = matches.length ? `${matches.length} result${matches.length===1?'':'s'}${matches.length>30?' · showing the first 30':''}` : 'No matches. Try a shorter title or another concept.';
    for (const {entry} of matches.slice(0,30)) {
      const link = document.createElement('a'); link.href = new URL(entry.url,root).href;
      const type = document.createElement('span'); type.className='search-type'; type.textContent=entry.type;
      const title=document.createElement('strong');title.textContent=entry.title;
      const detail=document.createElement('span');detail.className='search-detail';detail.textContent=entry.detail;
      link.append(type,title,detail);results.append(link);
    }
  }
  async function open() {
    if (dialog.open) return;
    opener=document.activeElement===document.body?button:document.activeElement;dialog.showModal();input.focus();
    if (index) {render();return;}
    status.textContent='Loading search…';
    try {
      request ||= fetch(new URL('search-index.json',root)).then(response=>{if(!response.ok)throw Error();return response.json();});
      index=await request;render();
    } catch (_) {request=null;status.textContent='Search could not load. Close and reopen to retry, or use Units, Library, and Glossary in the navigation.';}
  }
  button.addEventListener('click',open);
  dialog.querySelector('.search-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>opener?.focus());
  input.addEventListener('input',render);
  dialog.addEventListener('keydown',event=>{
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
