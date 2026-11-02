(() => {
  const label = window.ELECTION_2026_DATA?.electionDate;
  const election = new Date(label);
  if (!label || Number.isNaN(election.getTime())) return;
  function updateElection() {
    const today = new Date();
    const days = Math.round((Date.UTC(election.getFullYear(), election.getMonth(), election.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
    document.getElementById('election-countdown').textContent = days === 1 ? 'Election day is tomorrow' : days === 0 ? 'Election day is today' : days > 1 ? days + ' days until election day' : 'Election day has passed';
    const date = document.getElementById('election-date');
    date.textContent = label;
    date.dateTime = [election.getFullYear(), String(election.getMonth()+1).padStart(2,'0'), String(election.getDate()).padStart(2,'0')].join('-');
  }
  updateElection();
  setInterval(updateElection, 60000);
})();
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
