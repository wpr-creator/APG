(async () => {
  'use strict';
  try {
    const response = await fetch('site-content.json', {cache:'no-cache'});
    if (!response.ok) return;
    const settings = await response.json();
    const unit = window.COURSE_DATA.units.find(item => item.id === settings.currentUnit);
    if (unit) {
      document.getElementById('current-label').textContent = 'CURRENT UNIT / ' + unit.number.toUpperCase();
      document.getElementById('current-title').textContent = unit.title;
      document.getElementById('current-unit').href = unit.id === 'gov-2' ? 'unit2-design-preview.html' : 'index.html#' + unit.id;
    }
    if (settings.classroomUrl) {
      const classroom = new URL(settings.classroomUrl);
      if (classroom.protocol === 'https:') document.getElementById('classroom-link').href = classroom.href;
    }
  } catch (_) { /* Keep the course-unit link and default Classroom URL available. */ }
})();
