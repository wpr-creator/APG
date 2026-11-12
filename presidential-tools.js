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
  const select = document.getElementById('tool-diagram-select');
  const diagrams = [...document.querySelectorAll('[data-tool-diagram]')];
  function showDiagram() {
    diagrams.forEach(panel => {
      panel.hidden = panel.dataset.toolDiagram !== select.value;
    });
  }
  if (select) {
    select.addEventListener('change', showDiagram);
    showDiagram();
  }
})();
