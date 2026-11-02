(() => {
  'use strict';
  const lessonNumber = document.body.dataset.lesson || '2.2';
  document.querySelectorAll('a[href]').forEach(link => {
    const destination = new URL(link.href, location.href);
    if (destination.origin === location.origin && !link.getAttribute('href').startsWith('#') && !destination.pathname.endsWith('index.html')) {
      link.addEventListener('click', () => {
        try { const current = new URL(link.href, location.href); if (current.origin === location.origin) sessionStorage.setItem('apg-return-lesson', JSON.stringify({unit:'gov-2', lesson:lessonNumber === '2.1' ? 'unit2-concept-practice' : 'lesson-' + lessonNumber, destination:current.pathname})); } catch (_) {}
      });
    }
  });
})();
(async () => {
  try {
    if (document.readyState !== 'complete') await new Promise(resolve => document.addEventListener('DOMContentLoaded',resolve,{once:true}));
    const response = await fetch('site-content.json', {cache:'no-store'});
    if (!response.ok) return;
    const settings = await response.json();
    const lessonNumber = document.body.dataset.lesson || '2.2';
    if (settings.currentUnit !== 'gov-2' && !settings.unitUnlocks?.['gov-2']) { location.replace('units.html'); return; }
    const resources = window.COURSE_DATA.units.find(unit => unit.id === 'gov-2').lessonResources[lessonNumber];
    document.querySelectorAll('[data-resource-id]').forEach(link => {
      const id = link.dataset.resourceId;
      const resource = resources.find(item => item.id === id);
      const url = settings.assignmentUrls?.[id] ?? resource?.url;
      const scheduled = Date.parse(settings.assignmentUnlockAt?.[id] || '');
      const unlocked = !(resource?.category === 'concept-practice' || id === 'u2-21-22-concept-practice') || settings.assignmentUnlocks?.[id] || (Number.isFinite(scheduled) && scheduled <= Date.now());
      if (url && unlocked) link.href = url;
      else { link.removeAttribute('href');link.setAttribute('aria-disabled','true');const note=link.querySelector('p');if(note)note.textContent='Not open yet'; }
    });
  } catch (_) { /* Supplied lesson links remain accessible. */ }
})();
