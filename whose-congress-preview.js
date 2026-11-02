(() => {
  'use strict';
  const map = document.getElementById('district-map');
  for (let i = 0; i < 25; i++) {
    const voter = document.createElement('span');
    voter.className = 'voter' + (i >= 15 ? ' rust' : '');
    voter.setAttribute('aria-hidden', 'true');
    voter.appendChild(document.createElement('i'));
    map.appendChild(voter);
  }
  function show(layout) {
    const rows = layout === 'rows';
    map.className = 'map ' + layout;
    map.setAttribute('aria-label', `25 voters: 15 teal and 10 rust. Five equal districts drawn ${rows ? 'horizontally' : 'vertically'}. Teal wins ${rows ? '3' : '5'} seats; rust wins ${rows ? '2' : '0'}.`);
    document.getElementById('seat-count').textContent = rows ? '3–2' : '5–0';
    document.getElementById('seat-copy').textContent = rows ? 'Teal wins 3 seats. Rust wins 2 seats.' : 'Teal wins all 5 seats. Rust wins 0 seats. Same voters. Different result.';
    document.querySelectorAll('[data-layout]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.layout === layout)));
  }
  document.querySelectorAll('[data-layout]').forEach(button => button.addEventListener('click', () => show(button.dataset.layout)));
  show('rows');
  document.querySelectorAll('a[href]').forEach(link => {
    const destination = new URL(link.href, location.href);
    if (destination.origin === location.origin && !link.getAttribute('href').startsWith('#') && !destination.pathname.endsWith('index.html')) {
      link.addEventListener('click', () => {
        try { sessionStorage.setItem('apg-return-lesson', JSON.stringify({unit:'gov-2', lesson:'lesson-2.2', destination:destination.pathname})); } catch (_) {}
      });
    }
  });
})();
