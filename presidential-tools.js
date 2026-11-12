(() => {
  'use strict';
  const cards = [...document.querySelectorAll('details')];
  function openLinkedTool() {
    const card = cards.find(card => '#' + card.id === location.hash);
    if (!card) return;
    card.open = true;
    requestAnimationFrame(() => card.scrollIntoView({ block: 'start' }));
  }
  window.addEventListener('hashchange', openLinkedTool);
  openLinkedTool();
})();
