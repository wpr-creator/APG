(() => {
  'use strict';
  document.querySelectorAll('a[href]').forEach(link => {
    const destination = new URL(link.href, location.href);
    if (destination.origin === location.origin && !link.getAttribute('href').startsWith('#') && !destination.pathname.endsWith('index.html')) {
      link.addEventListener('click', () => {
        try { sessionStorage.setItem('apg-return-lesson', JSON.stringify({unit:'gov-2', lesson:'lesson-2.2', destination:destination.pathname})); } catch (_) {}
      });
    }
  });
})();
