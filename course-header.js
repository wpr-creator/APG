(async () => {
  'use strict';
  const root = new URL('./', document.currentScript.src);
  let header = document.querySelector('.preview-header');
  if (!header) {
    document.querySelectorAll('body > header, body > nav, body > .course-header').forEach(element => {
      if (element.matches('nav, .site-header, .course-header, .course-shell, .page-header') || element.querySelector('.header-brand, .header-inner')) element.classList.add('course-header-replaced');
    });
    header = document.createElement('header');
    header.className = 'preview-header';
    header.innerHTML = `<div class="preview-header-inner"><a class="preview-brand" href="${new URL('index.html',root)}"><img src="${new URL('assets/capitol-mark.svg',root)}" width="38" height="38" alt=""><span><strong>Mr. Rogers</strong><small>AP Government &amp; Politics</small></span></a><a class="preview-current" hidden><small>CURRENT LESSON</small><span></span></a><nav class="preview-nav" aria-label="Course navigation"><a href="${new URL('units.html',root)}">UNITS</a><a href="${new URL('index.html#foundations',root)}">LIBRARY</a><a href="${new URL('index.html#words',root)}">GLOSSARY</a><a class="preview-exit" href="${new URL('exit-ticket.html',root)}">EXIT TICKET <span aria-hidden="true">↗</span></a></nav></div>`;
    document.body.prepend(header);
    const skip = document.querySelector('.skip-link, .skip');
    if (skip) document.body.prepend(skip);
  }
  const searchScript = document.createElement('script');
  searchScript.src = new URL('course-search.js?v=20261113-complete',root).href;
  document.head.appendChild(searchScript);
  const resourceScript = document.createElement('script');
  resourceScript.src = new URL('resource-navigation.js?v=20261113-complete',root).href;
  document.head.appendChild(resourceScript);
  header.querySelectorAll('.preview-exit').forEach(link => { link.href = new URL('exit-ticket.html',root).href; });
  const routes = {'index.html':'Home','units.html':'Units','unit1.html':'Units','unit2.html':'Units','lesson-2-2.html':'Current lesson','lesson-2-1.html':'Lesson'};
  const filename = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.preview-nav a').forEach(link => {
    if ((routes[filename] === 'Units' || /^lesson-[12]-\d\.html$/.test(filename)) && new URL(link.href,location.href).pathname.endsWith('/units.html')) link.setAttribute('aria-current','page');
  });
  try {
    if (document.readyState !== 'complete') await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, {once:true}));
    const response = await fetch(new URL('site-content.json',root), {cache:'no-store'});
    if (!response.ok) return;
    const settings = await response.json();
    let unit = window.COURSE_DATA?.units.find(item => item.id === settings.currentUnit);
    let lesson = unit?.lessonTitles?.find(item => item[0] === settings.currentLesson);
    let contextDestination = null;
    let contextLabel = 'CURRENT LESSON';
    try {
      const saved = JSON.parse(sessionStorage.getItem('apg-return-lesson') || 'null');
      if (saved?.destination === location.pathname && /^gov-[0-5]$/.test(saved.unit)) {
        const sourceUnit = window.COURSE_DATA?.units.find(item => item.id === saved.unit);
        const number = saved.unit === 'gov-1' && /^lesson-u1-10[1-5]-/.test(saved.lesson) ? '1.' + saved.lesson.match(/^lesson-u1-10([1-5])-/)[1] : saved.lesson === 'unit2-concept-practice' ? '2.1' : saved.lesson?.replace(/^lesson-/, '');
        const sourceLesson = sourceUnit?.lessonTitles?.find(item => item[0] === number);
        const sourceResource = sourceUnit?.resources?.find(item => 'lesson-' + item.id === saved.lesson);
        if (sourceLesson || sourceResource) {
          unit = sourceUnit; lesson = sourceLesson || [saved.lesson,sourceResource.lesson];
          contextLabel = 'BACK TO LESSON';
          contextDestination = sourceUnit.id === 'gov-1' && sourceLesson ? 'lesson-' + sourceLesson[0].replace('.', '-') + '.html' : sourceLesson?.[0] === '2.1' ? 'lesson-2-1.html' : sourceLesson?.[0] === '2.2' ? 'lesson-2-2.html' : sourceLesson?.[0] === '2.3' ? 'lesson-2-3.html' : 'index.html?lesson=' + encodeURIComponent(saved.lesson) + '#' + saved.unit;
        }
      }
    } catch (_) {}
    const current = document.querySelector('.preview-current');
    if (!current) return;
    if (!lesson) { current.hidden = true; return; }
    current.querySelector('small').textContent = contextLabel;
    const destination = contextDestination || (unit.id === 'gov-1' ? 'lesson-' + lesson[0].replace('.', '-') + '.html' : lesson[0] === '2.2' ? 'lesson-2-2.html' : lesson[0] === '2.1' ? 'lesson-2-1.html' : lesson[0] === '2.3' ? 'lesson-2-3.html' : 'course-tools.html?lesson=' + encodeURIComponent('lesson-' + lesson[0]) + '#' + unit.id);
    current.href = new URL(destination,root).href;
    current.hidden = false;
    const title = current.querySelector('span'); title.textContent = (lesson[0].startsWith('lesson-') ? lesson[1] : lesson[0] + ' · ' + lesson[1]);const arrow=document.createElement('span');arrow.textContent=contextLabel === 'BACK TO LESSON' ? '←' : '→';arrow.setAttribute('aria-hidden','true');title.appendChild(arrow);
    if (filename === 'lesson-' + lesson[0].replace('.', '-') + '.html') current.setAttribute('aria-current','page');
  } catch (_) { /* Static navigation remains available. */ }
})();
