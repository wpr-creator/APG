// Year-round "This Day in Politics" engine.
//
// It combines the teacher-curated local calendar with Wikimedia's On This Day
// feed, then keeps only entries that are strongly connected to United States
// government and politics. If a date has no suitable historical result, the
// site shows a deterministic AP Government concept instead, so the home page
// always has meaningful daily content.
(function () {
  'use strict';

  const LOCAL_EVENT_FILE = 'us-politics-events.json';
  const WIKIMEDIA_ENDPOINT = 'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/';

  const US_MARKERS = [
    'united states', 'u.s.', 'american', 'america', 'washington, d.c.',
    'white house', 'congress', 'senate', 'house of representatives',
    'supreme court', 'president of the united states', 'us president',
    'constitution', 'federal government', 'state of the union'
  ];

  const GOVERNMENT_MARKERS = [
    'amendment', 'bill of rights', 'civil rights', 'civil liberties',
    'election', 'electoral', 'voting', 'suffrage', 'campaign', 'political party',
    'president', 'vice president', 'governor', 'mayor', 'congress', 'senate',
    'representative', 'legislature', 'supreme court', 'court ruled', 'justice',
    'constitution', 'constitutional', 'federal', 'law', 'act of congress',
    'executive order', 'impeach', 'ratified', 'treaty', 'cabinet', 'department',
    'civil war', 'reconstruction', 'independence', 'proclamation', 'new deal'
  ];

  const state = {
    events: [],
    index: 0,
    requestId: 0
  };

  function mmdd(date) {
    return String(date.getMonth() + 1).padStart(2, '0') + '-' +
      String(date.getDate()).padStart(2, '0');
  }

  function apiDate(date) {
    return String(date.getMonth() + 1).padStart(2, '0') + '/' +
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

  function normalizedPageText(item) {
    const pages = item.pages || [];
    return pages.map(function (page) {
      return [page.title, page.description, page.extract].filter(Boolean).join(' ');
    }).join(' ');
  }

  function relevanceScore(item) {
    const text = ((item.text || '') + ' ' + normalizedPageText(item)).toLowerCase();
    let score = 0;
    US_MARKERS.forEach(function (marker) {
      if (text.includes(marker)) score += 4;
    });
    GOVERNMENT_MARKERS.forEach(function (marker) {
      if (text.includes(marker)) score += 2;
    });
    if (/\b(american|u\.s\.|united states)\b/.test((item.text || '').toLowerCase())) score += 4;
    return score;
  }

  function inferConnection(text) {
    const value = (text || '').toLowerCase();
    if (/court|justice|judicial/.test(value)) return 'Supreme Court; judicial power; civil liberties';
    if (/vote|voting|election|campaign|party|suffrage/.test(value)) return 'Elections; political participation; linkage institutions';
    if (/congress|senate|house|legisl/.test(value)) return 'Congress; representation; policymaking';
    if (/president|white house|executive/.test(value)) return 'Presidency; executive power; agenda setting';
    if (/civil rights|segregat|equal protection|discrimin/.test(value)) return 'Civil rights; equal protection; federal action';
    if (/constitution|amendment|ratif/.test(value)) return 'Constitutional foundations; amendments; federalism';
    return 'American political development; institutions; public policy';
  }

  function pageUrl(item) {
    const page = (item.pages || [])[0];
    return page && page.content_urls && page.content_urls.desktop
      ? page.content_urls.desktop.page
      : '';
  }

  function normalizeRemoteItem(item, kind) {
    const prefix = kind === 'births' ? 'Born: ' : kind === 'deaths' ? 'Died: ' : '';
    return {
      year: item.year,
      text: prefix + (item.text || ''),
      ap_connection: inferConnection(item.text),
      source_label: 'Wikimedia On This Day',
      source_url: pageUrl(item),
      origin: 'wikimedia'
    };
  }

  function normalizeLocalItem(item) {
    const search = 'https://en.wikipedia.org/w/index.php?search=' +
      encodeURIComponent((item.year ? item.year + ' ' : '') + (item.text || ''));
    return {
      year: item.year,
      text: item.text || '',
      ap_connection: item.ap_connection || inferConnection(item.text),
      source_label: item.source_label || 'Explore this event',
      source_url: item.source_url || search,
      origin: 'local'
    };
  }

  function deduplicate(events) {
    const seen = new Set();
    return events.filter(function (event) {
      const key = String(event.year || '') + '|' + event.text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function glossaryFallback(date) {
    let terms = [];
    if (typeof GLOSSARY_UNITS !== 'undefined') {
      GLOSSARY_UNITS.forEach(function (unit) {
        Object.values(unit.groups).forEach(function (group) {
          group.forEach(function (entry) {
            terms.push({ term: entry[0], definition: entry[1], unit: unit.label });
          });
        });
      });
    }
    if (!terms.length) {
      terms = [{
        term: 'Popular Sovereignty',
        definition: 'The principle that government authority comes from the people.',
        unit: 'Unit 1: Foundations of American Democracy'
      }];
    }
    const term = terms[deterministicIndex(mmdd(date), terms.length)];
    return {
      year: null,
      text: 'Civic concept for today: ' + term.term + ' — ' + term.definition,
      ap_connection: term.unit,
      source_label: 'AP Government course glossary',
      source_url: '#glossary',
      origin: 'glossary'
    };
  }

  async function loadLocalEvents(date) {
    try {
      const response = await fetch(LOCAL_EVENT_FILE, { cache: 'no-store' });
      if (!response.ok) return [];
      const database = await response.json();
      return (database[mmdd(date)] || []).map(normalizeLocalItem);
    } catch (error) {
      console.warn('Local politics calendar unavailable.', error);
      return [];
    }
  }

  async function loadRemoteEvents(date) {
    try {
      const response = await fetch(WIKIMEDIA_ENDPOINT + apiDate(date));
      if (!response.ok) return [];
      const data = await response.json();
      const candidates = [];
      ['events', 'births', 'deaths'].forEach(function (kind) {
        (data[kind] || []).forEach(function (item) {
          const score = relevanceScore(item);
          if (score >= 8) candidates.push({ item: item, kind: kind, score: score });
        });
      });
      candidates.sort(function (a, b) {
        return b.score - a.score || (b.item.year || 0) - (a.item.year || 0);
      });
      return candidates.slice(0, 12).map(function (candidate) {
        return normalizeRemoteItem(candidate.item, candidate.kind);
      });
    } catch (error) {
      console.warn('Wikimedia politics calendar unavailable.', error);
      return [];
    }
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function render() {
    const event = state.events[state.index] || null;
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
    meta.textContent = event.ap_connection || '';
    body.appendChild(meta);

    if (event.source_url) {
      const source = document.createElement('a');
      source.className = 'tdih-source';
      source.href = event.source_url;
      source.target = event.source_url.charAt(0) === '#' ? '_self' : '_blank';
      source.rel = 'noopener';
      source.textContent = event.source_label || 'Source';
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
    setText('tdih-text', 'Finding a U.S. government and politics connection for today…');

    const results = await Promise.all([loadLocalEvents(today), loadRemoteEvents(today)]);
    if (requestId !== state.requestId) return;

    state.events = deduplicate(results[0].concat(results[1]));
    if (!state.events.length) state.events = [glossaryFallback(today)];
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
  // Re-run after all page content has initialized so the daily controls remain
  // attached even if another home-page component refreshed the surrounding UI.
  window.addEventListener('load', function () { setTimeout(init, 250); });
})();
