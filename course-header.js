(async () => {
  'use strict';
  const routes = {'index.html':'Home','units.html':'Units','unit2.html':'Units','lesson-2-2.html':'Current lesson'};
  const filename = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.preview-nav a').forEach(link => {
    if (routes[filename] === 'Units' && link.getAttribute('href') === 'units.html') link.setAttribute('aria-current','page');
  });
  try {
    const response = await fetch('site-content.json', {cache:'no-store'});
    if (!response.ok) return;
    const settings = await response.json();
    const unit = window.COURSE_DATA?.units.find(item => item.id === settings.currentUnit);
    const lesson = unit?.lessonTitles?.find(item => item[0] === settings.currentLesson);
    const current = document.querySelector('.preview-current');
    if (!current) return;
    if (!lesson) { current.hidden = true; return; }
    current.href = lesson[0] === '2.2' ? 'lesson-2-2.html' : 'course-tools.html?lesson=' + encodeURIComponent(lesson[0] === '2.1' ? 'unit2-concept-practice' : 'lesson-' + lesson[0]) + '#' + unit.id;
    const title = current.querySelector('span'); title.textContent = lesson[0] + ' · ' + lesson[1] + ' ↗';
    if (filename === 'lesson-2-2.html' && lesson[0] === '2.2') current.setAttribute('aria-current','page');
  } catch (_) { /* Static navigation remains available. */ }
})();
