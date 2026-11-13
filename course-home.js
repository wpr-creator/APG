(() => {
  const start = Date.parse('2026-11-04');
  const target = Date.parse('2027-01-03');
  const day = 86400000;

  function updateCongressCountdown() {
    // Use the school's calendar day, including across daylight-saving changes.
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date()).filter(part => part.type !== 'literal').map(part => [part.type, part.value]));
    const today = Date.parse(`${parts.year}-${parts.month}-${parts.day}`);
    const days = (target - today) / day;
    const remaining = `${days} ${days === 1 ? 'day' : 'days'}`;
    const message = days > 0
      ? `${remaining} until the 120th Congress begins`
      : days === 0 ? 'The 120th Congress begins today' : 'The 120th Congress has begun';
    document.getElementById('election-countdown').textContent = message;
    const progress = document.getElementById('election-progress');
    progress.value = Math.max(0, Math.min(100, (today - start) / (target - start) * 100));
    progress.setAttribute('aria-valuetext', days > 0 ? `${remaining} remaining` : message);
  }

  updateCongressCountdown();
  setInterval(updateCongressCountdown, 60000);
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
      const artwork = document.querySelector('.current-unit-art');
      if (artwork) artwork.src = 'assets/unit-art/unit-' + unit.id.replace('gov-', '') + '.svg';
      document.getElementById('current-unit').href = unit.id === 'gov-1' ? 'unit1.html' : unit.id === 'gov-2' ? 'unit2.html' : 'index.html#' + unit.id;
    }
    if (settings.classroomUrl) {
      const classroom = new URL(settings.classroomUrl);
      if (classroom.protocol === 'https:') document.getElementById('classroom-link').href = classroom.href;
    }
  } catch (_) { /* Keep the course-unit link and default Classroom URL available. */ }
})();
