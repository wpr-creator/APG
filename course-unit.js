(async () => {
  'use strict';
  try {
    const response = await fetch('site-content.json', {cache:'no-store'});
    if (!response.ok) return;
    const settings = await response.json();
    const unitId = document.body.dataset.unit || 'gov-2';
    if (settings.currentUnit !== unitId && !settings.unitUnlocks?.[unitId]) { location.replace('units.html'); return; }
    if (unitId === 'gov-1') {
      if (['concepts','documents','amendments','examguide','frq'].includes(location.hash.slice(1))) { location.replace('unit1-reference.html' + location.hash); return; }
    }
    const unit = window.COURSE_DATA.units.find(item => item.id === unitId);
    document.querySelectorAll('[data-resource-id]').forEach(link => {
      const id = link.dataset.resourceId;
      const resource = unit.resources.find(item => item.id === id);
      const scheduled = Date.parse(settings.assignmentUnlockAt?.[id] || '');
      const unlocked = settings.assignmentUnlocks?.[id] || (Number.isFinite(scheduled) && scheduled <= Date.now());
      const url = settings.assignmentUrls?.[id] ?? resource?.url;
      if (url && unlocked) link.href = url;
      else { link.removeAttribute('href');link.setAttribute('aria-disabled','true'); }
    });
    const index = document.querySelector('.lesson-index');
    index.querySelectorAll('.lesson-row,.upcoming').forEach(item => item.remove());
    const upcoming = [];
    unit.lessonTitles.forEach(([number,title]) => {
      const resources = unit.lessonResources?.[number] || [];
      if (!resources.length) { upcoming.push([number,title]); return; }
      const link = document.createElement('a');
      link.className = 'lesson-row' + (settings.currentUnit === unitId && settings.currentLesson === number ? ' available' : '');
      link.href = unitId === 'gov-1' ? 'lesson-' + number.replace('.', '-') + '.html' : ['2.2','2.3'].includes(number) ? 'lesson-' + number.replace('.', '-') + '.html' : number === '2.1' ? 'lesson-2-1.html' : 'course-tools.html?lesson=' + encodeURIComponent(number === '2.1' ? 'unit2-concept-practice' : 'lesson-' + number) + '#gov-2';
      const label = document.createElement('span'); label.className='lesson-no'; label.textContent=number;
      const copy = document.createElement('div'); const heading=document.createElement('h3');heading.textContent=title;
      const count=document.createElement('p');count.textContent=resources.length+' resources';copy.append(heading,count);
      const action=document.createElement('span');action.className='open-label';action.textContent='OPEN LESSON →';copy.appendChild(action);
      const arrow=document.createElement('span');arrow.className='lesson-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';link.append(label,copy,arrow);index.appendChild(link);
    });
    if (upcoming.length) {
      const details=document.createElement('details');details.className='upcoming';const summary=document.createElement('summary');summary.textContent='Coming later in '+unit.number+' · '+upcoming.length+' lessons';details.appendChild(summary);
      const list=document.createElement('ol');upcoming.forEach(([number,title])=>{const item=document.createElement('li');const label=document.createElement('span');label.textContent=number;item.append(label,document.createTextNode(title));list.appendChild(item);});details.appendChild(list);index.appendChild(details);
    }
  } catch (_) { /* The static lesson list remains usable. */ }
})();
