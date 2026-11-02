(async () => {
  'use strict';
  const open = document.getElementById('open-units');
  try {
    const response = await fetch('site-content.json', {cache:'no-cache'});
    if (!response.ok) throw new Error('Course availability could not be loaded.');
    const settings = await response.json();
    const units = window.COURSE_DATA.units;
    open.replaceChildren();
    units.forEach(unit => {
      const current = settings.currentUnit === unit.id;
      const available = current || settings.unitUnlocks?.[unit.id] === true;
      const number = unit.number.replace('Unit ', '');
      if (available) {
        const link = document.createElement('a');
        link.className = 'unit-card' + (current ? ' current' : '');
        link.href = unit.id === 'gov-2' ? 'unit2-design-preview.html' : 'index.html#' + unit.id;
        const top = document.createElement('div'); top.className = 'unit-card-top';
        const label = document.createElement('span'); label.className = 'unit-number'; label.textContent = 'UNIT ' + number;
        const state = document.createElement('span'); state.className = 'unit-status'; state.textContent = current ? 'CURRENT UNIT' : 'OPEN';
        top.append(label,state);
        const title = document.createElement('h3'); title.textContent = unit.title;
        const bottom = document.createElement('div'); bottom.className = 'unit-card-bottom';
        const action = document.createElement('span'); action.textContent = 'OPEN UNIT';
        const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden','true');
        bottom.append(action,arrow); link.append(top,title,bottom); open.appendChild(link);
      } else if (unit.id === 'gov-0') {
        const row = document.createElement('div'); row.className = 'launch-row';
        const title = document.createElement('strong'); title.textContent = 'UNIT 0 / ' + unit.title;
        const state = document.createElement('span'); state.className = 'unit-status'; state.textContent = 'CLOSED'; row.append(title,state);
        document.getElementById('course-launch').appendChild(row);
      } else {
        const row = document.createElement('div'); row.className = 'later-row';
        const label = document.createElement('span'); label.className = 'unit-number'; label.textContent = '0' + number;
        const title = document.createElement('h3'); title.textContent = unit.title;
        const state = document.createElement('span'); state.className = 'unit-status'; state.textContent = 'NOT OPEN YET';
        row.append(label,title,state); document.getElementById('later-units').appendChild(row);
      }
    });
  } catch (_) {
    open.replaceChildren();
    const link = document.createElement('a'); link.href = 'index.html#units'; link.textContent = 'Open the course unit list →'; open.appendChild(link);
  }
})();
