/* Location cues and resource destinations; no student state is stored. */
(() => {
  'use strict';
  const root = new URL('./',document.currentScript.src);
  const filename = location.pathname.split('/').pop() || 'index.html';
  if(/^unit[3-5]\.html$/.test(filename)||/^unit[12]-reference\.html$/.test(filename)||['agenda.html','extensions.html','presidential-library.html','presidential-yearbook.html'].includes(filename)) document.body.classList.add('course-reference-page');
  const main = document.querySelector('main,.doc-page');
  if (!main) return;
  const lessonMatch = filename.match(/^lesson-([12])-(\d)\.html$/);
  const unitMatch = filename.match(/^unit([12])\.html$/);
  const reader = document.body.hasAttribute('data-library-reader');
  if(reader){const source=document.createElement('p');source.className='reader-print-source';source.textContent='Mr. Rogers · AP Government & Politics · '+new URL(location.pathname,location.origin).href;main.append(source);}

  if(reader && !main.querySelector('.document-contents,.case-reader-nav,.reader-nav,.route')){
    const headings=[...main.querySelectorAll('h2[id],section[id]>h2,section[id]>h3,.doc-section[id]>h2,section.amendment>h3')].filter(h=>!/(?:source|context|before you read)/i.test(h.textContent));
    if(headings.length>=3){const contents=document.createElement('nav');contents.className='document-contents';contents.setAttribute('aria-label','On this page');
      headings.slice(0,12).forEach((h,number)=>{let id=h.id||h.parentElement.id;if(!id){id='reader-section-'+(number+1);while(document.getElementById(id))id+='-reading';h.id=id;}const link=document.createElement('a');link.href='#'+id;link.textContent=h.parentElement.querySelector('.amendment-number')?.textContent.trim()||h.textContent.trim();contents.append(link);});
      const hero=main.querySelector('.doc-hero,.page-hero,.document-hero,.reader-hero,.case-hero');if(hero)hero.after(contents);
    }
  }
  if (lessonMatch || unitMatch || reader || filename === 'units.html') {
    const breadcrumb=document.createElement('nav');breadcrumb.className='course-breadcrumb';breadcrumb.setAttribute('aria-label','Breadcrumb');
    const list=document.createElement('ol');
    const add=(label,path)=>{const li=document.createElement('li');if(path){const a=document.createElement('a');a.href=new URL(path,root).href;a.textContent=label;li.append(a);}else{const span=document.createElement('span');span.textContent=label;span.setAttribute('aria-current','page');li.append(span);}list.append(li);};
    add('Course','index.html');
    if(lessonMatch || unitMatch){add('Units','units.html');const n=(lessonMatch||unitMatch)[1];add('Unit '+n,lessonMatch?'unit'+n+'.html':null);if(lessonMatch)add('Lesson '+n+'.'+lessonMatch[2]);}
    else if(reader){add('Library','course-tools.html#foundations');const title=main.querySelector('h1');add(title?.textContent.trim()||'Reading');}
    else add('Units');
    breadcrumb.append(list);main.prepend(breadcrumb);
  }
  if (lessonMatch) {
    const primary=main.querySelector('.primary-materials');
    if(primary){
      primary.id ||= 'lesson-materials';
      const nav=document.createElement('nav');nav.className='lesson-shortcuts';nav.setAttribute('aria-label','Lesson sections');
      const add=(label,id)=>{const a=document.createElement('a');a.href='#'+id;a.textContent=label;nav.append(a);};
      add('Notes & slides',primary.id);
      main.querySelectorAll('section.supporting,section.case-section').forEach(section=>{const h=section.querySelector('h2[id]');if(h){const labels={'practice-title':lessonMatch[1]+'.'+lessonMatch[2]==='2.1'?'Notes & practice':'Practice & assignments','reading-title':'Readings','case-title':'Case guides','focused-title':'Focused lessons'};add(labels[h.id]||h.textContent.trim(),h.id);}});
      main.querySelector('.course-breadcrumb').after(nav);
    }
  }
  const selector='body[data-lesson] .material,body[data-lesson] .activity-links>a,body[data-lesson] .case-links>a';
  function decorate(link){
    let meta=link.querySelector('.resource-destination');
    if(!meta){meta=document.createElement('span');meta.className='resource-destination';const action=link.querySelector('.material-action');if(action)action.before(meta);else link.append(meta);}
    const disabled=link.getAttribute('aria-disabled')==='true'||!link.hasAttribute('href');
    let label='Not open yet';
    if(!disabled){
      const url=new URL(link.href,location.href),external=url.origin!==location.origin;
      let format=external?url.hostname.replace(/^www\./,''):'On this site';
      if(url.hostname==='docs.google.com')format=url.pathname.startsWith('/presentation/')?'Google Slides':url.pathname.startsWith('/forms/')?'Google Form':'Google Doc';
      else if(url.hostname==='slides.com')format='Slideshow';
      else if(/\.pdf$/i.test(url.pathname))format='PDF';
      else if(!external && url.pathname.includes('/cases/'))format='Case guide';
      else if(!external && url.pathname.includes('/docs/'))format='Document reader';
      if(external){link.target='_blank';link.rel='noopener';}
      else if(link.hasAttribute('target'))link.removeAttribute('target');
      label=format+' · '+(external?'opens a new tab':'opens here');
    }
    if(meta.textContent!==label)meta.textContent=label;
    link.classList.toggle('resource-unavailable',disabled);
  }
  main.querySelectorAll(selector).forEach(decorate);
  new MutationObserver(records=>{
    const links=new Set();
    records.forEach(record=>{
      if(record.type==='attributes'&&record.target.matches(selector))links.add(record.target);
      if(record.type==='childList')record.addedNodes.forEach(node=>{if(node instanceof Element){if(node.matches(selector))links.add(node);node.querySelectorAll(selector).forEach(link=>links.add(link));}});
    });links.forEach(decorate);
  }).observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['href','aria-disabled']});
})();
