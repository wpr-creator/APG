#!/usr/bin/env node

// Builds a frozen, year-round U.S. government and politics calendar.
// Wikimedia is used only as a research feed at build time. The deployed site
// reads the generated JSON and never calls Wikimedia at runtime.

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outputFile = path.join(root, 'us-politics-events.json');
const existing = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
const endpoint = 'https://byabbe.se/on-this-day/';

const civicFocus = [
  ['Popular Sovereignty', 'Government authority comes from the people.', 'Unit 1', 'Constitutional foundations'],
  ['Rule of Law', 'Public officials and citizens are bound by the law.', 'Unit 1', 'Constitutional foundations'],
  ['Federalism', 'Power is divided between national and state governments.', 'Unit 1', 'Federalism'],
  ['Separation of Powers', 'Legislative, executive, and judicial powers are assigned to different branches.', 'Unit 1', 'Constitutional foundations'],
  ['Checks and Balances', 'Each branch has tools to limit the power of the others.', 'Unit 1', 'Constitutional foundations'],
  ['Judicial Review', 'Courts may invalidate government actions that conflict with the Constitution.', 'Unit 2', 'Judicial branch'],
  ['Congressional Oversight', 'Congress monitors executive agencies and implementation of federal law.', 'Unit 2', 'Congress'],
  ['Executive Orders', 'Presidents direct executive-branch operations without passing a new statute.', 'Unit 2', 'Presidency'],
  ['Bureaucratic Discretion', 'Agencies make choices about how laws and regulations are implemented.', 'Unit 2', 'Bureaucracy'],
  ['Selective Incorporation', 'Most Bill of Rights protections apply to states through the Fourteenth Amendment.', 'Unit 3', 'Civil liberties'],
  ['Due Process', 'Government must use fair procedures before depriving a person of life, liberty, or property.', 'Unit 3', 'Civil liberties'],
  ['Equal Protection', 'States must provide equal protection of the laws.', 'Unit 3', 'Civil rights'],
  ['Political Socialization', 'Families, schools, peers, and media shape political beliefs.', 'Unit 4', 'Political beliefs'],
  ['Public Opinion', 'The public’s political attitudes influence elections and policymaking.', 'Unit 4', 'Public opinion'],
  ['Linkage Institutions', 'Parties, elections, interest groups, and media connect people to government.', 'Unit 5', 'Political participation'],
  ['Voter Turnout', 'Rules, resources, mobilization, and political interest affect participation.', 'Unit 5', 'Elections'],
  ['Interest Groups', 'Organized groups seek to influence public policy without directly controlling government.', 'Unit 5', 'Political participation'],
  ['Campaign Finance', 'Rules governing political money shape electoral competition and political speech.', 'Unit 5', 'Elections'],
  ['Agenda Setting', 'Political institutions and media influence which issues receive public attention.', 'Unit 5', 'Media'],
  ['Political Accountability', 'Elections, oversight, courts, and public scrutiny allow officials to be held responsible.', 'Unit 5', 'Political participation']
];

const strongUsPattern = /\b(united states|u\.s\.|washington, d\.c\.|white house|supreme court of the united states|u\.s\. state|american civil war|american revolutionary war|thirteen colonies|continental congress|federal reserve)\b/i;
const usPlacePattern = /\b(alabama|alaska|arizona|arkansas|california|colorado|connecticut|delaware|florida|hawaii|idaho|illinois|indiana|iowa|kansas|kentucky|louisiana|maine|maryland|massachusetts|michigan|minnesota|mississippi|missouri|montana|nebraska|nevada|new hampshire|new jersey|new mexico|new york|north carolina|north dakota|ohio|oklahoma|oregon|pennsylvania|rhode island|south carolina|south dakota|tennessee|texas|utah|vermont|virginia|west virginia|wisconsin|wyoming|the pentagon)\b/i;
const americanPoliticalPattern = /\bAmerican\b.*\b(president|vice president|politic|government|governor|senator|representative|congress|supreme court|justice|constitution|amendment|election|voting|suffrage|civil rights|cabinet|secretary of state|attorney general)\b|\b(president|vice president|politic|government|governor|senator|representative|congress|supreme court|justice|constitution|amendment|election|voting|suffrage|civil rights|cabinet|secretary of state|attorney general)\b.*\bAmerican\b/i;
const governmentPattern = /\b(presiden\w*|politic\w*|governor|government|congress|senat\w*|representative|court|justice|constitution\w*|amendment|election|vote|voting|suffrage|civil rights|civil liberties|federal|law|legislation|statute|treaty|cabinet|department|statehood|territory|independence|impeach\w*|ratif\w*|executive order|terror\w*|national security|military|war|fbi|cia|pentagon)\b/i;
const placeGovernmentPattern = /\b(politic\w*|governor|government|congress|senat\w*|representative|constitution\w*|amendment|election|vote|voting|suffrage|civil rights|federal|legislation|statute|treaty|statehood|terror\w*|national security|fbi|cia|pentagon)\b/i;
const publicFigurePattern = /\b(president of the united states|u\.s\. president|vice president|senator|representative|governor|supreme court|justice|politician|civil rights|activist|first lady|cabinet|secretary of|attorney general|speaker of the house)\b/i;

function keyFor(date) {
  return String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

function apiDate(key, category) {
  const parts = key.split('-').map(Number);
  return parts[0] + '/' + parts[1] + '/' + category + '.json';
}

function pageText(item) {
  return (item.pages || []).map(function (page) {
    return [page.title, page.description].filter(Boolean).join(' ');
  }).join(' ');
}

function score(item, kind) {
  const direct = item.text || '';
  const combined = direct + ' ' + pageText(item);
  const clearlyAmerican = strongUsPattern.test(direct) || americanPoliticalPattern.test(direct) ||
    (usPlacePattern.test(direct) && placeGovernmentPattern.test(direct)) ||
    /\b(united states declaration of independence|american declaration of independence|articles of confederation|federalist papers|reconstruction amendments)\b/i.test(direct);
  if (!clearlyAmerican || !governmentPattern.test(combined)) return -1;
  if (kind !== 'events' && (!/\bAmerican\b/i.test(direct) || !publicFigurePattern.test(direct))) return -1;

  let value = kind === 'events' ? 30 : kind === 'births' ? 10 : 8;
  if (strongUsPattern.test(direct)) value += 14;
  if (governmentPattern.test(direct)) value += 10;
  if (/constitution|amendment|supreme court|congress|president|civil rights|civil liberties/i.test(direct)) value += 24;
  if (/election|ratif|signed into law|ruled|decided|inaugurat|impeach|executive order/i.test(direct)) value += 16;
  if (/world trade center|september 11|terrorist attacks|the pentagon/i.test(direct)) value += 32;
  return value;
}

function classify(text) {
  const value = text.toLowerCase();
  if (/supreme court|judicial|court ruled|court decided|court holds|court decision/.test(value)) return { unit: 2, category: 'Judicial branch', connection: 'Supreme Court; judicial power; constitutional interpretation' };
  if (/civil rights|segregat|equal protection|discrimin|suffrage/.test(value)) return { unit: 3, category: 'Civil rights', connection: 'Civil rights; equal protection; federal action' };
  if (/constitution|amendment|ratif|federalism|statehood|declaration of independence|revolutionary war|continental congress/.test(value)) return { unit: 1, category: 'Constitutional foundations', connection: 'Constitutional foundations; founding ideals; federalism' };
  if (/vote|voting|election|campaign|political party/.test(value)) return { unit: 5, category: 'Elections', connection: 'Elections; political participation; linkage institutions' };
  if (/congress|senate|house of representatives|legisl/.test(value)) return { unit: 2, category: 'Congress', connection: 'Congress; representation; national policymaking' };
  if (/president|white house|executive|cabinet/.test(value)) return { unit: 2, category: 'Presidency', connection: 'Presidency; executive power; agenda setting' };
  if (/terror|national security|military|war|pentagon|fbi|cia/.test(value)) return { unit: 2, category: 'National security', connection: 'National security; executive power; civil liberties' };
  if (/department|agency|bureau/.test(value)) return { unit: 2, category: 'Bureaucracy', connection: 'Federal bureaucracy; implementation; administrative power' };
  return { unit: 5, category: 'Political development', connection: 'American political development; institutions; public policy' };
}

function pageUrl(item) {
  const page = (item.pages || [])[0];
  return page && page.content_urls && page.content_urls.desktop ? page.content_urls.desktop.page : '';
}

function normalizeRemote(item, kind) {
  const prefix = kind === 'births' ? 'Born: ' : kind === 'deaths' ? 'Died: ' : '';
  const text = prefix + item.text;
  const classification = classify(text);
  return {
    year: item.year,
    text,
    ap_connection: classification.connection,
    unit: classification.unit,
    category: classification.category,
    source_label: 'Wikipedia',
    source_url: pageUrl(item),
    kind: kind === 'events' ? 'event' : kind === 'births' ? 'birth' : 'death'
  };
}

function normalizeExisting(event) {
  const classification = classify(event.text || '');
  return {
    year: event.year,
    text: event.text,
    ap_connection: event.ap_connection || classification.connection,
    unit: event.unit || classification.unit,
    category: event.category || classification.category,
    source_label: event.source_label || 'Research this event',
    source_url: event.source_url || ('https://en.wikipedia.org/w/index.php?search=' + encodeURIComponent(event.year + ' ' + event.text)),
    kind: event.kind || 'event'
  };
}

function tokens(text) {
  return new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(function (word) { return word.length > 4; }));
}

function similar(a, b) {
  if (String(a.year) !== String(b.year)) return false;
  const left = tokens(a.text);
  const right = tokens(b.text);
  let overlap = 0;
  left.forEach(function (word) { if (right.has(word)) overlap += 1; });
  return overlap >= 3 && overlap / Math.max(1, Math.min(left.size, right.size)) >= 0.35;
}

function civicEntry(key) {
  const numeric = Number(key.replace('-', ''));
  const focus = civicFocus[numeric % civicFocus.length];
  return {
    year: null,
    text: 'Civic focus: ' + focus[0] + ' — ' + focus[1],
    ap_connection: focus[2] + '; ' + focus[3],
    unit: Number(focus[2].replace('Unit ', '')),
    category: focus[3],
    source_label: 'AP Government course glossary',
    source_url: '/APG/#glossary',
    kind: 'civic-focus'
  };
}

async function fetchCategory(key, category, attempt) {
  try {
    const response = await fetch(endpoint + apiDate(key, category), { headers: { 'User-Agent': 'APG-calendar-builder/1.0' } });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    return (data[category] || []).map(function (event) {
      return {
        text: event.description,
        year: Number(event.year),
        pages: (event.wikipedia || []).map(function (page) {
          return {
            title: page.title,
            description: '',
            content_urls: { desktop: { page: page.wikipedia } }
          };
        })
      };
    });
  } catch (error) {
    if ((attempt || 0) < 2) {
      await new Promise(function (resolve) { setTimeout(resolve, 750 * ((attempt || 0) + 1)); });
      return fetchCategory(key, category, (attempt || 0) + 1);
    }
    console.warn('Could not fetch ' + key + ' ' + category + ': ' + error.message);
    return [];
  }
}

async function buildDay(key) {
  const data = { events: await fetchCategory(key, 'events') };
  const candidates = [];
  function addCandidates(kinds) {
    kinds.forEach(function (kind) {
    (data[kind] || []).forEach(function (item) {
      const relevance = score(item, kind);
      if (relevance >= 0) candidates.push({ relevance, item, kind });
    });
    });
  }
  addCandidates(['events']);
  const local = (existing[key] || []).map(normalizeExisting);
  if (!candidates.length && !local.length) {
    const people = await Promise.all([
      fetchCategory(key, 'births'),
      fetchCategory(key, 'deaths')
    ]);
    data.births = people[0];
    data.deaths = people[1];
    addCandidates(['births', 'deaths']);
  }
  candidates.sort(function (a, b) { return b.relevance - a.relevance || (b.item.year || 0) - (a.item.year || 0); });
  const remote = candidates.map(function (candidate) { return normalizeRemote(candidate.item, candidate.kind); });

  local.forEach(function (event) {
    const match = remote.find(function (candidate) { return similar(event, candidate); });
    if (match && match.source_url) {
      event.source_label = match.source_label;
      event.source_url = match.source_url;
    }
  });

  const selected = local.slice();
  remote.forEach(function (event) {
    if (selected.length >= 3) return;
    if (!selected.some(function (current) { return similar(current, event); })) selected.push(event);
  });
  if (!selected.length) selected.push(civicEntry(key));
  return selected;
}

async function main() {
  const keys = [];
  const date = new Date(2024, 0, 1);
  while (date.getFullYear() === 2024) {
    keys.push(keyFor(date));
    date.setDate(date.getDate() + 1);
  }

  const result = {};
  let cursor = 0;
  async function worker() {
    while (cursor < keys.length) {
      const index = cursor;
      cursor += 1;
      const key = keys[index];
      result[key] = await buildDay(key);
      if ((index + 1) % 25 === 0) console.log('Processed ' + (index + 1) + ' of ' + keys.length);
    }
  }

  await Promise.all(Array.from({ length: 4 }, worker));
  const ordered = {};
  keys.forEach(function (key) { ordered[key] = result[key]; });
  fs.writeFileSync(outputFile, JSON.stringify(ordered, null, 2) + '\n');

  const entries = Object.values(ordered).flat();
  const civic = entries.filter(function (event) { return event.kind === 'civic-focus'; }).length;
  console.log('Wrote ' + entries.length + ' entries across ' + keys.length + ' dates (' + civic + ' civic-focus fallbacks).');
}

main().catch(function (error) {
  console.error(error);
  process.exit(1);
});
