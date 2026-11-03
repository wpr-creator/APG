(() => {
  // Federal election dates: https://www.fec.gov/help-candidates-and-committees/filing-reports/election-cycle-aggregation/
  const elections = [
    { start: '2026-01-01', date: '2026-11-03', label: 'NOVEMBER 3, 2026', year: '2026 MIDTERMS', event: 'election day', today: 'Election day is today' },
    { start: '2026-11-04', date: '2027-01-03', label: 'JANUARY 3, 2027', year: 'NEW CONGRESS', event: 'the new Congress begins', today: 'The new Congress begins today' },
    { start: '2027-01-04', date: '2028-11-07', label: 'NOVEMBER 7, 2028', year: '2028 PRESIDENTIAL ELECTION', event: 'election day', today: 'Election day is today' }
  ];
  function updateElection() {
    // Use the school's calendar day, including across daylight-saving changes.
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date()).filter(part => part.type !== 'literal').map(part => [part.type, part.value]));
    const today = `${parts.year}-${parts.month}-${parts.day}`;
    const election = elections.find(item => today <= item.date) || elections.at(-1);
    const days = Math.round((Date.parse(election.date) - Date.parse(today)) / 86400000);
    document.getElementById('election-countdown').textContent = days === 0 ? election.today : days > 0 ? `${days.toLocaleString('en-US')} ${days === 1 ? 'day' : 'days'} until ${election.event}` : 'Election day has passed';
    document.getElementById('election-year').textContent = election.year;
    document.getElementById('tracker-label').textContent = election.year === 'NEW CONGRESS' ? 'CONGRESS COUNTDOWN' : 'ELECTION TRACKER';
    const duration = (Date.parse(election.date) - Date.parse(election.start)) / 86400000;
    const elapsed = (Date.parse(today) - Date.parse(election.start)) / 86400000;
    const progress = document.getElementById('election-progress');
    progress.value = Math.max(0, Math.min(100, elapsed / duration * 100));
    progress.setAttribute('aria-label', election.year === 'NEW CONGRESS' ? 'Progress toward the new Congress' : 'Progress toward election day');
    progress.setAttribute('aria-valuetext', days > 0 ? `${days} ${days === 1 ? 'day' : 'days'} remaining` : election.today);
    const date = document.getElementById('election-date');
    date.textContent = election.label;
    date.dateTime = election.date;
    // Keep the existing student guide explicitly labeled as the 2026 guide.
    const guide = document.querySelector('.election-bar .election-guide');
    if (guide) guide.innerHTML = `${election.date === '2026-11-03' ? 'STUDENT VOTER GUIDE' : '2026 VOTER GUIDE'} <span aria-hidden="true">↗</span>`;
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
      document.getElementById('current-unit').href = unit.id === 'gov-1' ? 'unit1.html' : unit.id === 'gov-2' ? 'unit2.html' : 'index.html#' + unit.id;
    }
    if (settings.classroomUrl) {
      const classroom = new URL(settings.classroomUrl);
      if (classroom.protocol === 'https:') document.getElementById('classroom-link').href = classroom.href;
    }
  } catch (_) { /* Keep the course-unit link and default Classroom URL available. */ }
})();
