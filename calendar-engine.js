// Local year-round "This Day in Politics" engine.
// The deployed site reads only us-politics-events.json. External historical
// feeds are used by the maintenance script, never by a student's browser.
(function () {
  'use strict';

  const EVENT_FILE = 'us-politics-events.json';
  const state = { events: [], index: 0, requestId: 0 };

  function mmdd(date) {
    return String(date.getMonth() + 1).padStart(2, '0') + '-' +
      String(date.getDate()).padStart(2, '0');
  }

  function deterministicIndex(seed, length) {
    if (!length) return 0;
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return hash % length;
  }

  function labelForDate(date) {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  function normalizeEvent(event) {
    return {
      year: event.year || null,
      text: event.text || '',
      ap_connection: event.ap_connection || 'American government and political development',
      unit: event.unit || null,
      category: event.category || 'Political development',
      source_label: event.source_label || 'Source',
      source_url: event.source_url || '',
      kind: event.kind || 'event'
    };
  }

  function unavailableEntry() {
    return {
      year: null,
      text: 'Today’s historical politics entry could not be loaded. Please refresh the page.',
      ap_connection: '',
      unit: null,
      category: 'Unavailable',
      source_label: '',
      source_url: '',
      kind: 'unavailable'
    };
  }

  async function loadEvents(date) {
    try {
      const response = await fetch(EVENT_FILE, { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const database = await response.json();
      return (database[mmdd(date)] || []).map(normalizeEvent);
    } catch (error) {
      console.warn('Local politics calendar unavailable.', error);
      return [];
    }
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function render() {
    const event = state.events[state.index];
    if (!event) return;

    setText('tdih-year', event.year ? String(event.year) : 'Civic Focus');
    const body = document.getElementById('tdih-text');
    if (!body) return;
    body.textContent = '';

    const description = document.createElement('span');
    description.textContent = event.text;
    body.appendChild(description);

    const meta = document.createElement('span');
    meta.className = 'tdih-meta';
    meta.textContent = [event.unit ? 'Unit ' + event.unit : '', event.category, event.ap_connection]
      .filter(Boolean).join(' · ');
    body.appendChild(meta);

    if (event.source_url) {
      const source = document.createElement('a');
      source.className = 'tdih-source';
      source.href = event.source_url;
      source.target = event.source_url.charAt(0) === '/' ? '_self' : '_blank';
      source.rel = 'noopener';
      source.textContent = event.source_label;
      body.appendChild(source);
    }
  }

  function wireControls() {
    const previous = document.getElementById('tdih-prev');
    const next = document.getElementById('tdih-next');
    const discuss = document.getElementById('tdih-discuss');

    if (previous) previous.onclick = function () {
      state.index = (state.index - 1 + state.events.length) % state.events.length;
      render();
    };
    if (next) next.onclick = function () {
      state.index = (state.index + 1) % state.events.length;
      render();
    };
    if (discuss) discuss.onclick = function () {
      const event = state.events[state.index];
      const question = 'Discussion starter: How does this connect to power, rights, institutions, or participation in American government?\n\n' +
        (event.year ? event.year + ' — ' : '') + event.text;
      ['home', 'page'].forEach(function (suffix) {
        const element = document.getElementById('exit-question-' + suffix);
        if (element) element.textContent = question;
      });
    };
  }

  async function init() {
    const requestId = ++state.requestId;
    const today = new Date();
    setText('tdih-date-badge', labelForDate(today));
    setText('tdih-year', 'Loading');
    setText('tdih-text', 'Loading today’s U.S. government and politics entry…');

    state.events = await loadEvents(today);
    if (requestId !== state.requestId) return;
    if (!state.events.length) state.events = [unavailableEntry()];
    state.index = deterministicIndex(today.toISOString().slice(0, 10), state.events.length);
    wireControls();
    render();
  }

  window.APGCalendar = { init: init };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
