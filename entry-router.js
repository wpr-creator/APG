/* Preserve the existing APG hash URLs while promoting the new course entry pages. */
(() => {
  const url = new URL(location.href);
  const route = url.hash.slice(1);
  const lesson = url.searchParams.get('lesson');
  let destination;
  if (route === 'units') destination = new URL('units.html', url);
  else if (route === 'gov-2' && (lesson === 'lesson-2.2' || lesson === 'lesson-2.02')) destination = new URL('lesson-2-2.html', url);
  else if (route === 'gov-2' && !lesson) destination = new URL('unit2.html', url);
  else if (route && !['home','main'].includes(route)) destination = new URL('course-tools.html' + url.search + url.hash, url);
  if (destination) location.replace(destination.href);
  addEventListener('hashchange', () => { if (!['','home','main'].includes(location.hash.slice(1))) location.reload(); });
})();
