(() => {
  'use strict';
  const cards = [...document.querySelectorAll('.tool-card')];
  function openLinkedTool() {
    const card = cards.find(card => '#' + card.id === location.hash);
    if (!card) return;
    card.open = true;
    requestAnimationFrame(() => card.scrollIntoView({ block: 'start' }));
  }
  window.addEventListener('hashchange', openLinkedTool);
  openLinkedTool();
  let printState;
  window.addEventListener('beforeprint', () => {
    if (printState) return;
    printState = cards.map(card => card.open);
    cards.forEach(card => { card.open = true; });
  });
  window.addEventListener('afterprint', () => {
    if (!printState) return;
    cards.forEach((card, index) => { card.open = printState[index]; });
    printState = undefined;
  });
})();
