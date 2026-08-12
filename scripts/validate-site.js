#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { isDirectlyPolitical } = require('./calendar-relevance');
const { curatedEvents } = require('./calendar-curated-events');

const root = path.resolve(__dirname, '..');
const files = [];
const errors = [];

function walk(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach(function (entry) {
    if (entry.name === '.git') return;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else files.push(file);
  });
}

function relative(file) {
  return path.relative(root, file);
}

function validateJavaScript() {
  files.filter(function (file) { return file.endsWith('.js'); }).forEach(function (file) {
    try {
      execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
    } catch (error) {
      errors.push('Invalid JavaScript: ' + relative(file) + '\n' + error.stderr.toString());
    }
  });
}

function validateJson() {
  files.filter(function (file) { return file.endsWith('.json'); }).forEach(function (file) {
    try {
      JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
      errors.push('Invalid JSON: ' + relative(file) + ' — ' + error.message);
    }
  });
}

function validatePresidentialTerms() {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'assets', 'presidents', 'president-facts.json'), 'utf8'));
  const byName = Object.fromEntries(data.presidents.map(function (president) { return [president.name, president]; }));
  const expected = {
    'Grover Cleveland': [['22', '1885–1889'], ['24', '1893–1897']],
    'Donald Trump': [['45', '2017–2021'], ['47', '2025–present']]
  };
  Object.entries(expected).forEach(function ([name, terms]) {
    const actual = (byName[name] && byName[name].presidencies || []).map(function (term) {
      return [term.order, term.yearsInOffice];
    });
    if (JSON.stringify(actual) !== JSON.stringify(terms)) {
      errors.push(name + ' must render one correctly numbered card for each nonconsecutive term.');
    }
  });
  const renderedCardCount = data.presidents.reduce(function (count, president) {
    return count + (president.presidencies ? president.presidencies.length : 1);
  }, 0);
  if (renderedCardCount !== 47) errors.push('Presidential Library must render all 47 numbered presidencies.');
}

function validatePresidentialYearbookAssignments() {
  const dataFile = path.join(root, 'presidential-yearbook-assignments.js');
  const revealFile = path.join(root, 'presidential-yearbook-reveal.js');
  const pageFile = path.join(root, 'presidential-yearbook.html');
  if (!fs.existsSync(dataFile) || !fs.existsSync(revealFile)) {
    errors.push('Presidential Yearbook reveal data or display logic is missing.');
    return;
  }
  const dataCode = fs.readFileSync(dataFile, 'utf8');
  const revealCode = fs.readFileSync(revealFile, 'utf8');
  const page = fs.readFileSync(pageFile, 'utf8');
  if (/Math\.random\s*\(/.test(dataCode + revealCode + page)) {
    errors.push('Presidential Yearbook assignments must never be randomized in the browser.');
  }
  if (!page.includes('PRESIDENTIAL REVEAL') || !page.includes('REVEAL MY PRESIDENT') ||
      !page.includes('presidential-yearbook-assignments.js') || !page.includes('presidential-yearbook-reveal.js')) {
    errors.push('Presidential Yearbook reveal interface is incomplete.');
  }
  if (page.includes('<strong>ASSIGNED PRESIDENTS</strong>') || page.includes('<span>COMING SOON</span>')) {
    errors.push('Presidential Yearbook placeholder is still present.');
  }
  const vm = require('vm');
  const sandbox = { window: {} };
  vm.runInNewContext(dataCode, sandbox);
  const assignments = sandbox.window.PRESIDENTIAL_YEARBOOK_ASSIGNMENTS;
  if (!Array.isArray(assignments) || assignments.length !== 79) {
    errors.push('Presidential Yearbook must contain exactly 79 finalized AP assignments.');
    return;
  }
  const requiredFields = ['period', 'student', 'presidentNumber', 'president', 'term', 'libraryUrl', 'status'];
  assignments.forEach(function (assignment, index) {
    requiredFields.forEach(function (field) {
      if (assignment[field] === undefined || assignment[field] === null || assignment[field] === '') {
        errors.push('Incomplete Presidential Yearbook assignment at record ' + (index + 1) + ': ' + field);
      }
    });
    if (!['1A', '2B'].includes(assignment.period)) {
      errors.push('Non-AP class period in Presidential Yearbook assignments: ' + assignment.period);
    }
    if (assignment.libraryUrl !== 'https://wpr-creator.github.io/APG/presidential-library.html') {
      errors.push('Non-AP Presidential Library link for ' + assignment.student);
    }
  });
  const keys = assignments.map(function (assignment) { return assignment.period + '|' + assignment.student; });
  if (new Set(keys).size !== assignments.length) errors.push('Duplicate AP student assignment record detected.');
  const counts = assignments.reduce(function (totals, assignment) {
    totals[assignment.period] = (totals[assignment.period] || 0) + 1;
    return totals;
  }, {});
  if (counts['1A'] !== 39 || counts['2B'] !== 40) errors.push('AP assignment class counts do not match the finalized workbook.');
  ['1A', '2B'].forEach(function (period) {
    const numbers = assignments.filter(function (assignment) { return assignment.period === period; })
      .map(function (assignment) { return assignment.presidentNumber; });
    if (new Set(numbers).size !== numbers.length) errors.push('Duplicate president number within AP period ' + period);
    [22, 24, 45, 47].forEach(function (number) {
      if (!numbers.includes(number)) errors.push('AP period ' + period + ' is missing separate presidency #' + number);
    });
  });
}

function validateLocalReferences() {
  const attributePattern = /(?:href|src)=["']([^"']+)["']/gi;
  files.filter(function (file) { return file.endsWith('.html'); }).forEach(function (file) {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(attributePattern)) {
      let url = match[1];
      if (/^(https?:|mailto:|tel:|data:|javascript:|#)/.test(url)) continue;
      url = url.split(/[?#]/)[0];
      const target = url.startsWith('/APG/')
        ? path.join(root, url.slice('/APG/'.length))
        : path.resolve(path.dirname(file), url);
      if (!fs.existsSync(target)) {
        errors.push('Broken local reference: ' + relative(file) + ' → ' + match[1]);
      }
    }
  });
}

function validateSocialMetadata() {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const required = [
    'name="description"',
    'rel="canonical"',
    'property="og:title"',
    'property="og:description"',
    'property="og:url"',
    'property="og:image"',
    'name="twitter:card"',
    'name="twitter:image"'
  ];
  required.forEach(function (fragment) {
    if (!html.includes(fragment)) errors.push('Missing social metadata: ' + fragment);
  });
  const socialImage = path.join(root, 'images', 'ap-government-social-card.png');
  if (!fs.existsSync(socialImage) || fs.statSync(socialImage).size === 0) {
    errors.push('Missing social-sharing image: images/ap-government-social-card.png');
  }
}

function validateAccessibilityAndHygiene() {
  files.filter(function (file) { return file.endsWith('.html'); }).forEach(function (file) {
    const html = fs.readFileSync(file, 'utf8');
    const name = relative(file);
    const isRedirect = /http-equiv=["']refresh/i.test(html);

    if (!/<html[^>]*\slang=["'][^"']+["']/i.test(html)) {
      errors.push('HTML page is missing a language declaration: ' + name);
    }
    if (!/<title>[^<]+<\/title>/i.test(html)) {
      errors.push('HTML page is missing a title: ' + name);
    }
    if (!isRedirect && !/<meta[^>]*name=["']viewport["']/i.test(html)) {
      errors.push('HTML page is missing responsive viewport metadata: ' + name);
    }

    const imagesWithoutAlt = Array.from(html.matchAll(/<img\b[^>]*>/gi))
      .map(function (match) { return match[0]; })
      .filter(function (tag) { return !/\salt=["'][^"']*["']/i.test(tag); });
    if (imagesWithoutAlt.length) {
      errors.push('HTML page contains images without alt attributes: ' + name);
    }

    const ids = Array.from(html.matchAll(/\sid=["']([^"']+)["']/gi))
      .map(function (match) { return match[1]; });
    const duplicateIds = Array.from(new Set(ids.filter(function (id, index) {
      return ids.indexOf(id) !== index;
    })));
    if (duplicateIds.length) {
      errors.push('HTML page contains duplicate IDs: ' + name + ' — ' + duplicateIds.join(', '));
    }
  });

  files.forEach(function (file) {
    if (path.basename(file) === '.DS_Store') {
      errors.push('Stray macOS metadata file: ' + relative(file));
    }
  });

  const assetBudgets = {
    'images/ap-government-social-card.png': 1000000,
    'assets/assignments/presidential-yearbook-color-example.png': 1900000,
    'assets/assignments/presidential-yearbook-word-example.png': 1650000
  };
  Object.entries(assetBudgets).forEach(function ([name, maximum]) {
    const file = path.join(root, name);
    if (fs.existsSync(file) && fs.statSync(file).size > maximum) {
      errors.push('Image exceeds its performance budget: ' + name + ' — ' + fs.statSync(file).size + ' bytes');
    }
  });
}

function validateSharedCourseExperience() {
  const requiredFiles = [
    'glossary-data.js',
    'styles-gov-theme.css',
    'unit0.html',
    'agenda.html',
    'agenda.js',
    'presidential-library.html',
    'presidential-library.js',
    'presidential-yearbook.html',
    'civic-selfie.html',
    'extensions.html',
    'assets/presidents/president-facts.json',
    'assets/assignments/civic-selfie-example.png',
    'assets/assignments/presidential-yearbook-color-example.png',
    'assets/assignments/presidential-yearbook-word-example.png'
  ];
  requiredFiles.forEach(function (file) {
    if (!fs.existsSync(path.join(root, file))) errors.push('Missing shared GOV/APG experience: ' + file);
  });

  const unitZero = fs.readFileSync(path.join(root, 'unit0.html'), 'utf8');
  [
    'content="0; url=./#gov-0"',
    'href="https://wpr-creator.github.io/APG/#gov-0"',
    'window.location.replace("./#gov-0");'
  ].forEach(function (content) {
    if (!unitZero.includes(content)) errors.push('Legacy Unit 0 redirect changed or missing: ' + content);
  });

  const rootPages = files.filter(function (file) {
    return file.endsWith('.html') && path.dirname(file) === root;
  });
  rootPages.forEach(function (file) {
    const html = fs.readFileSync(file, 'utf8');
    const isNewShell = relative(file) === 'index.html' && html.includes('href="styles.css');
    const isUnitZeroRedirect = relative(file) === 'unit0.html' && html.includes('url=./#gov-0');
    const isAgendaRedirect = relative(file) === 'agenda.html' && html.includes('url=./#home');
    if (!isNewShell && !isUnitZeroRedirect && !isAgendaRedirect && !html.includes('styles-gov-theme.css')) {
      errors.push('Root page is missing the shared visual theme: ' + relative(file));
    }
  });

  const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  [
    'styles.css?v=20260811-unit0-links',
    'course-data.js?v=20260811-unit0-links',
    'data-required.js?v=20260805-foundations-cases',
    'app.js?v=20260808-history-cleanup',
    'data-view-link="home"',
    'data-view-link="units"',
    'data-view-link="foundations"',
    'data-view-link="words"',
    'data-view-link="skills"',
    'https://classroom.google.com/',
    '<code>wxe36xms</code>',
    'href="https://myap.collegeboard.org/"',
    '<h3>AP CLASSROOM</h3>',
    '<code>VYJN37</code>',
    '<code>9RN33E</code>'
  ].forEach(function (content) {
    if (!homepage.includes(content)) errors.push('New APG shell is missing: ' + content);
  });
  if (homepage.includes('data-view-link="agenda"') || homepage.includes('href="#agenda"')) {
    errors.push('Agenda must remain disabled in the primary student navigation.');
  }
  if (homepage.includes('href="#help"') || homepage.includes('data-view="help"')) {
    errors.push('Retired assignment-help content must not return to the student site.');
  }
  if (homepage.includes('history-connection') || fs.readFileSync(path.join(root, 'app.js'), 'utf8').includes('plainHistoryConnection')) {
    errors.push('This Day in Politics must not render the retired connection tags.');
  }
  ['MIDTERM ELECTION TRACKER', 'href="#election-2026"', 'id="election-count"'].forEach(function (content) {
    if (!homepage.includes(content)) errors.push('Home election tracker is missing: ' + content);
  });
  const agendaRedirect = fs.readFileSync(path.join(root, 'agenda.html'), 'utf8');
  ['content="0; url=./#home"', 'window.location.replace("./#home");'].forEach(function (content) {
    if (!agendaRedirect.includes(content)) errors.push('Disabled Agenda redirect changed or missing: ' + content);
  });
  const sharedNav = fs.readFileSync(path.join(root, 'nav-render.js'), 'utf8');
  if (sharedNav.includes('{ label: "Agenda"')) errors.push('Agenda must remain disabled in shared navigation.');
  if (!homepage.includes('<h1>AP GOVERNMENT GLOSSARY</h1>')) {
    errors.push('APG glossary heading is missing.');
  }
  [
    'data-foundation-tab="cases"',
    'id="foundation-cases"',
    'id="foundation-case-grid"'
  ].forEach(function (content) {
    if (!homepage.includes(content)) errors.push('Foundations case library is missing: ' + content);
  });
  if (homepage.includes('AP GOVERNMENT WORDS, PLAIN LANGUAGE') || homepage.includes('Short definitions. One clear example.')) {
    errors.push('APG glossary contains retired promotional phrasing.');
  }
  const studentInterface = [
    'index.html',
    'app.js',
    'presidential-library.html',
    'extensions.html',
    'unit1.html',
    'unit2.html',
    'unit3.html',
    'unit4.html',
    'unit5.html'
  ].map(function (file) { return fs.readFileSync(path.join(root, file), 'utf8'); }).join('\n');
  [
    'SHORT EXCERPTS · PLAIN LANGUAGE · ONE QUESTION',
    'START WITH THIS UNIT OR VIEW ALL 27.',
    'FORTY-FIVE PEOPLE. ONE OFFICE. THEIR CHOICES STILL ECHO.',
    'START HERE. TRY IT. USE IT.',
    'USE ANYTIME',
    'GO FURTHER',
    'THREE BRANCHES. ONE CONSTITUTION. CONSTANT TENSION.'
  ].forEach(function (phrase) {
    if (studentInterface.toUpperCase().includes(phrase)) {
      errors.push('Student interface contains retired promotional phrasing: ' + phrase);
    }
  });

  const courseData = fs.readFileSync(path.join(root, 'course-data.js'), 'utf8');
  const glossaryData = fs.readFileSync(path.join(root, 'glossary-data.js'), 'utf8');
  const glossaryUnits = JSON.parse(glossaryData.slice(glossaryData.indexOf('['), glossaryData.lastIndexOf(']') + 1));
  const glossaryEntryCount = glossaryUnits.reduce(function (total, unit) {
    return total + Object.values(unit.groups).reduce(function (unitTotal, terms) {
      return unitTotal + terms.length;
    }, 0);
  }, 0);
  if (glossaryEntryCount < 400) errors.push('APG glossary must retain the full AP vocabulary library.');
  const apUnits = courseData.match(/id: "gov-[0-5]"/g) || [];
  if (apUnits.length !== 6) errors.push('APG shell must contain Unit 0 and AP Units 1–5.');
  [
    '0.1 — Class Is in Session',
    '0.2 — Read the Fine Print',
    '0.3 — Pack Your Field Guides',
    '0.4 — Government Takes the Stage',
    '0.5 — Portrait Day',
    '0.6 — Show Your Work',
    '0.7 — Prove The Case',
    'Join Google Classroom, bookmark the course website, and join AP Classroom',
    'Complete the signed syllabus, Self-Guided Tour, and Civic Selfie',
    'Complete The Presidential Yearbook',
    'AP ADDENDUM',
    'AP ADDENDUM TEST',
    'CIVICS FIELD GUIDE TEST',
    'EVIDENCE IN ACTION',
    'MR. SMITH GOES TO WASHINGTON EXTENSION'
  ].forEach(function (content) {
    if (!courseData.includes(content)) errors.push('Primary Unit 0 content changed or missing: ' + content);
  });
  [
    'title: "JOIN GOOGLE CLASSROOM", note: "JOIN CODE: wxe36xms", url: "https://classroom.google.com/"',
    'title: "BOOKMARK COURSE WEBSITE"',
    'title: "SELF-GUIDED TOUR", url: "https://docs.google.com/document/d/1tPuBKdMDAK3NZwmKKrHXx-ALRhSJ53r2d0G-RaPkDFc/edit?tab=t.0"',
    'title: "AP CLASSROOM CHECK-IN", note: "1A: VYJN37 · 2B: 9RN33E", url: "https://myap.collegeboard.org/"'
  ].forEach(function (content) {
    if (!courseData.includes(content)) errors.push('Primary Unit 0 launch link changed or missing: ' + content);
  });
  const siteContent = fs.readFileSync(path.join(root, 'site-content.json'), 'utf8');
  if (!siteContent.includes('"self-guided-tour": "https://docs.google.com/document/d/1tPuBKdMDAK3NZwmKKrHXx-ALRhSJ53r2d0G-RaPkDFc/edit?tab=t.0"')) {
    errors.push('Published Self-Guided Tour URL changed or missing.');
  }
  if (!siteContent.includes('"civics-field-guide": "https://docs.google.com/document/d/1-xEhsGyKlaDogaCCvOtJV70IyeqFgpSwPo2H_wqkoOI/edit?tab=t.0"')) {
    errors.push('Published Civics Field Guide URL changed or missing.');
  }
  if (!siteContent.includes('"mr-smith-extension": "https://docs.google.com/forms/d/e/1FAIpQLSfEvttJqyYGUOLTLTgbdpf4Uzxm4h7OUafD6nk2GZwo5HANiA/viewform?usp=publish-editor"')) {
    errors.push('Published Mr. Smith Goes to Washington Extension URL changed or missing.');
  }
  if (!siteContent.includes('"civics-field-test": "https://docs.google.com/forms/d/e/1FAIpQLSchtFHBKW3g1YxP38--uD3CmlffQFeL0ci-fd18Bfhr9vJQqA/viewform?usp=dialog"')) {
    errors.push('Published Civics Field Guide Test URL changed or missing.');
  }
  if (!courseData.includes('title: "AP ADDENDUM", url: "https://docs.google.com/document/d/12htrxeXMnU5NHfBzkLOXgG6jipT6KQMlK_TrbM6Z7gg/edit?tab=t.0"') ||
      !siteContent.includes('"ap-addendum": "https://docs.google.com/document/d/12htrxeXMnU5NHfBzkLOXgG6jipT6KQMlK_TrbM6Z7gg/edit?tab=t.0"') ||
      !siteContent.includes('"ap-addendum": true')) {
    errors.push('Published AP Addendum must be open with its assigned Google Doc URL.');
  }
  const parsedSiteContent = JSON.parse(siteContent);
  const expectedUpcoming = [
    { title: 'CIVICS FIELD GUIDE TEST', date: 'UNIT 0 · 0.6' },
    { title: 'AP ADDENDUM TEST', date: 'UNIT 0 · 0.7' }
  ];
  if (JSON.stringify(parsedSiteContent.upcoming) !== JSON.stringify(expectedUpcoming)) {
    errors.push('Upcoming Assignments must contain only the two separate Unit 0 tests.');
  }
  const appCode = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  [
    'window.location.hash = "home";',
    'Press ${shortcut}${deviceNote} to bookmark this course website.',
    'const UNIT_ZERO_COMPLETION_KEY = "apg-unit0-completion-v1";',
    'const CONTENT_STORAGE_KEY = "apg-site-content-v1";',
    'assignmentIsUnlocked(resource.id)',
    'createUnitZeroCheck(resource, unlocked)',
    'localStorage.setItem(UNIT_ZERO_COMPLETION_KEY'
  ].forEach(function (content) {
    if (!appCode.includes(content)) errors.push('Unit 0 interaction changed or missing: ' + content);
  });
  const primaryStyles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  ['.unit-zero-resource-item', '.unit-zero-check', '.unit-zero-check[aria-pressed="true"]'].forEach(function (selector) {
    if (!primaryStyles.includes(selector)) errors.push('Unit 0 completion styling changed or missing: ' + selector);
  });
  const navCode = fs.readFileSync(path.join(root, 'nav-render.js'), 'utf8');
  if (!navCode.includes('{ label: "Unit 0 · First Bell", href: "index.html#gov-0" }')) {
    errors.push('Shared navigation does not point to the canonical Unit 0 view.');
  }
  if (!navCode.includes('5: "Political Participation"')) {
    errors.push('Unit 5 navigation marker does not identify Political Participation.');
  }
  const foundationData = fs.readFileSync(path.join(root, 'foundations-data.js'), 'utf8');
  if (!foundationData.includes('Life, Liberty and the pursuit of Happiness') ||
      !foundationData.includes('Life, Liberty, and the pursuit of Happiness')) {
    errors.push('Declaration guide must name all three unalienable rights.');
  }
  const requiredData = fs.readFileSync(path.join(root, 'data-required.js'), 'utf8');
  if (!requiredData.includes('window.REQUIRED_CASES = REQUIRED_CASES;')) {
    errors.push('Required Supreme Court cases are not exposed to Foundations.');
  }
  if (!requiredData.includes('file: "docs/bill-of-rights.html"') ||
      !fs.existsSync(path.join(root, 'docs', 'bill-of-rights.html'))) {
    errors.push('The AP Addendum foundational-document list must include a dedicated Bill of Rights guide.');
  }
  if (!navCode.includes('addAddendumSummary') || !navCode.includes('AP ADDENDUM SUMMARY')) {
    errors.push('Required documents and cases must receive the shared AP Addendum Summary panel.');
  }
  const REQUIRED_SUMMARY_FILES = [
    ...fs.readdirSync(path.join(root, 'docs')).filter(function (file) { return file.endsWith('.html') && file !== 'ARCHITECTURE.html'; }).map(function (file) { return path.join(root, 'docs', file); }),
    ...fs.readdirSync(path.join(root, 'cases')).filter(function (file) { return file.endsWith('.html'); }).map(function (file) { return path.join(root, 'cases', file); })
  ];
  REQUIRED_SUMMARY_FILES.forEach(function (file) {
    const page = fs.readFileSync(file, 'utf8');
    if (!page.includes('data-required.js') || !page.includes('nav-render.js')) {
      errors.push('Required guide cannot load its AP Addendum Summary: ' + relative(file));
    }
  });
  const canonicalCases = fs.readdirSync(path.join(root, 'cases'))
    .filter(function (file) { return file.endsWith('.html'); });
  canonicalCases.forEach(function (file) {
    const redirectPath = path.join(root, file);
    if (!fs.existsSync(redirectPath)) {
      errors.push('Missing root compatibility redirect for case: ' + file);
      return;
    }
    const redirect = fs.readFileSync(redirectPath, 'utf8');
    const canonicalUrl = '/APG/cases/' + file;
    if (!redirect.includes('rel="canonical" href="' + canonicalUrl + '"') ||
        !redirect.includes('url=' + canonicalUrl)) {
      errors.push('Case compatibility route does not redirect to its canonical page: ' + file);
    }
  });

  const rosterSources = [
    fs.readFileSync(path.join(root, 'content.json'), 'utf8'),
    fs.readFileSync(path.join(root, 'data-core.js'), 'utf8'),
    fs.readFileSync(path.join(root, 'exit-ticket-script.gs'), 'utf8')
  ].join('\n');
  ['Period 1A', 'Period 2B'].forEach(function (period) {
    if (!rosterSources.includes(period)) errors.push('Course period changed or missing: ' + period);
  });
  if (/Period 2A/.test(rosterSources)) errors.push('Retired Period 2A remains in roster or exit-ticket configuration.');
}

function validateCalendarData() {
  const file = path.join(root, 'us-politics-events.json');
  const database = JSON.parse(fs.readFileSync(file, 'utf8'));
  const validKey = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const expectedKeys = [];
  const cursor = new Date(2024, 0, 1);
  while (cursor.getFullYear() === 2024) {
    expectedKeys.push(String(cursor.getMonth() + 1).padStart(2, '0') + '-' + String(cursor.getDate()).padStart(2, '0'));
    cursor.setDate(cursor.getDate() + 1);
  }
  expectedKeys.forEach(function (key) {
    if (!Object.prototype.hasOwnProperty.call(database, key)) errors.push('Missing calendar date: ' + key);
  });
  if (Object.keys(database).length !== 366) {
    errors.push('Calendar must contain exactly 366 date keys; found ' + Object.keys(database).length);
  }
  Object.entries(curatedEvents).forEach(function ([key, events]) {
    if (JSON.stringify(database[key]) !== JSON.stringify(events)) {
      errors.push('Curated calendar event is missing or changed: ' + key);
    }
  });
  Object.entries(database).forEach(function ([key, events]) {
    if (!validKey.test(key)) errors.push('Invalid calendar key: ' + key);
    const parts = key.split('-').map(Number);
    const date = new Date(2024, parts[0] - 1, parts[1]);
    if (date.getMonth() !== parts[0] - 1 || date.getDate() !== parts[1]) {
      errors.push('Impossible calendar date: ' + key);
    }
    if (!Array.isArray(events) || !events.length) {
      errors.push('Calendar date has no events: ' + key);
      return;
    }
    events.forEach(function (event, index) {
      if (!event.year || !event.text || !event.ap_connection ||
          !event.unit || !event.category || !event.source_label || !event.source_url) {
        errors.push('Incomplete calendar event: ' + key + '[' + index + ']');
      }
      if (![1, 2, 3, 4, 5].includes(event.unit)) errors.push('Invalid AP unit: ' + key + '[' + index + ']');
      if (!['event', 'birth', 'death'].includes(event.kind)) errors.push('Invalid event kind: ' + key + '[' + index + ']');
      const isCurated = Boolean(curatedEvents[key] && JSON.stringify(curatedEvents[key][index]) === JSON.stringify(event));
      if (!isCurated && !isDirectlyPolitical(event)) errors.push('Weak calendar relevance: ' + key + '[' + index + ']');
    });
  });
  const entries = Object.values(database).flat();
  console.log('Local politics calendar:', Object.keys(database).length + ' dates,', entries.length + ' entries');
}

walk(root);
validateJavaScript();
validateJson();
validatePresidentialTerms();
validatePresidentialYearbookAssignments();
validateLocalReferences();
validateSocialMetadata();
validateAccessibilityAndHygiene();
validateSharedCourseExperience();
validateCalendarData();

if (errors.length) {
  console.error('\n' + errors.join('\n'));
  process.exit(1);
}

console.log('Site validation passed.');
