#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
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
    const isDemocracyFiltered = relative(file) === 'democracy-filtered.html' && html.includes('democracy-filtered.css');
    const isHeardExplorer = relative(file) === 'who-is-trying-to-be-heard.html' && html.includes('who-is-trying-to-be-heard.css');
    if (!isNewShell && !isUnitZeroRedirect && !isAgendaRedirect && !isDemocracyFiltered && !isHeardExplorer && !html.includes('styles-gov-theme.css')) {
      errors.push('Root page is missing the shared visual theme: ' + relative(file));
    }
  });

  const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  [
    'styles.css?v=20260831-white-checks',
    'course-data.js?v=20260826-unit-102-notes',
    'data-required.js?v=20260805-foundations-cases',
    'app.js?v=20260831-guided-practice',
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
  [
    '["Natural rights", "N", "Rights every person has simply because they are human, including life and liberty."',
    '["Social contract", "S", "People agree to give government authority in exchange for order and protection of their rights."',
    '["Popular sovereignty", "P", "The people are the source of government power."',
    '["Limited government", "L", "Government power is restricted by law and cannot be absolute."',
    '["Consent of the governed", "✓", "Government may rule only because the people authorize it."',
    '["Republicanism", "R", "People govern through elected representatives. Representation means those officials speak and act for people who cannot all make national policy directly."',
    '["Equality", "=", "People have equal political rights. No person is naturally entitled to rule others."',
    '["Participatory democracy", "P", "A model emphasizing broad and direct citizen involvement in political decisions."',
    '["Pluralist democracy", "P", "A model in which organized groups compete to influence public policy."',
    '["Elite democracy", "E", "A model in which elected leaders and influential minorities exercise substantial policy influence."',
    '["Representative democracy", "R", "A system in which citizens elect officials to make public decisions."',
    '["Political participation", "P", "Actions citizens take to influence government."',
    '["Faction", "F", "A group united by a shared interest that may conflict with the rights or interests of others."',
    '["Institutional filter", "I", "A constitutional structure that separates public preferences from immediate policy decisions."'
  ].forEach(function (entry) {
    if (!courseData.includes(entry)) errors.push('Core AP ideal changed or missing from the student glossary: ' + entry);
  });
  const apUnits = courseData.match(/id: "gov-[0-5]"/g) || [];
  if (apUnits.length !== 6) errors.push('APG shell must contain Unit 0 and AP Units 1–5.');
  [
    '0.1 — Class Is in Session',
    '0.2 — Read the Fine Print',
    '0.3 — Pack Your Field Guides',
    '0.4 — Government Takes the Stage',
    '0.5 — Portrait Day',
    '0.6 — The Court Is in Session',
    'Join Google Classroom, bookmark the course website, and join AP Classroom',
    'Complete the signed syllabus, Self-Guided Tour, and Civic Selfie',
    'Complete The Presidential Yearbook',
    'AP APPENDUM STUDY GUIDE',
    'AP ADDENDUM TEST',
    'CIVICS FIELD GUIDE TEST',
    'PROVE YOUR CASE',
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
  if (!courseData.includes('title: "AP APPENDUM STUDY GUIDE", url: "https://docs.google.com/document/d/12htrxeXMnU5NHfBzkLOXgG6jipT6KQMlK_TrbM6Z7gg/edit?tab=t.0"') ||
      !siteContent.includes('"ap-addendum": "https://docs.google.com/document/d/12htrxeXMnU5NHfBzkLOXgG6jipT6KQMlK_TrbM6Z7gg/edit?tab=t.0"') ||
      !siteContent.includes('"ap-addendum": true')) {
    errors.push('Published AP Addendum must be open with its assigned Google Doc URL.');
  }
  const parsedSiteContent = JSON.parse(siteContent);
  const expectedExitQuestion = 'CASE CLOSED? ⚖\n• What case did your team investigate?\n• What did the Supreme Court decide?\n• Did the Court rule with you—or did you dissent?\n• Final call: Did the Court get it right? Why or why not? Use one fact from the case.';
  if (parsedSiteContent.exitQuestion !== '' || parsedSiteContent.exitQuestionDraft !== expectedExitQuestion) {
    errors.push('The homepage exit ticket must remain closed while preserving its Prove Your Case draft.');
  }
  const expectedUpcoming = [
    { title: '1.01 GUIDED NOTES', date: 'UNIT 1 · 1.01' },
    { title: 'DECLARATION ANNOTATION', date: 'UNIT 1 · 1.01' },
    { title: 'GETTYSBURG REDUX', date: 'UNIT 1 · 1.01' }
  ];
  if (JSON.stringify(parsedSiteContent.upcoming) !== JSON.stringify(expectedUpcoming)) {
    errors.push('Upcoming Assignments must reflect the three Unit 1.01 assignments.');
  }
  const expectedUnitUnlocks = { 'gov-0': true, 'gov-1': true, 'gov-2': false, 'gov-3': false, 'gov-4': false, 'gov-5': false };
  if (JSON.stringify(parsedSiteContent.unitUnlocks) !== JSON.stringify(expectedUnitUnlocks)) {
    errors.push('Unit 1 must be current and open while later units remain locked.');
  }
  [
    'ap-u2-overview', 'ap-u2-documents', 'ap-u2-cases', 'bill-journey', 'presidential-power', 'presidential-library-u2',
    'ap-u3-overview', 'ap-u3-documents', 'ap-u3-cases', 'rights-referee',
    'ap-u4-overview', 'ap-u4-documents', 'ap-polling',
    'ap-u5-overview', 'ap-u5-cases'
  ].forEach(function (resourceId) {
    if (parsedSiteContent.assignmentUnlocks[resourceId] !== false) errors.push('Later-course resource must remain locked: ' + resourceId);
  });
  if (parsedSiteContent.currentUnit !== 'gov-1') {
    errors.push('Unit 1 must be the current homepage unit.');
  }
  if (!courseData.includes('question: "How can a government be powerful enough to govern but limited enough to preserve democracy?"')) {
    errors.push('Unit 1 essential question is missing or incorrect.');
  }
  ['ap-u1-overview', 'ap-u1-documents', 'founding-power', 'federalism-map', 'constitution-explorer', 'madison-vs-brutus'].forEach(function (resourceId) {
    if (courseData.includes(`id: "${resourceId}"`) ||
        Object.hasOwn(parsedSiteContent.assignmentUnlocks, resourceId) ||
        Object.hasOwn(parsedSiteContent.assignmentUrls, resourceId)) {
      errors.push('Retired broad Unit 1 card must remain removed: ' + resourceId);
    }
  });
  const unit101Resources = {
    'u1-101-declaration': 'docs/declaration-of-independence.html',
    'u1-101-preamble': 'docs/constitution-preamble.html',
    'u1-101-gettysburg': 'docs/gettysburg-address.html',
    'u1-101-declaration-annotation': 'https://docs.google.com/document/d/1mo5aAq_GjYzHbtitMIpRZPDsaUxx3Fvbg-jzP_i5JEU/edit?tab=t.0',
    'u1-101-guided-notes': 'https://docs.google.com/document/d/1miD29ZfEz4ag8IvzqMLRSo9DRrfT2ItyPBD5pFr3AR0/edit?usp=sharing',
    'u1-101-democratic-ideals-review': 'https://wpr-creator.github.io/GOV/founding-ideals-review.html'
  };
  Object.entries(unit101Resources).forEach(function ([resourceId, url]) {
    if (parsedSiteContent.assignmentUnlocks[resourceId] !== true || parsedSiteContent.assignmentUrls[resourceId] !== url) {
      errors.push('Unit 1.01 resource must be open with its assigned URL: ' + resourceId);
    }
  });
  if (!courseData.includes('id: "u1-101-democratic-ideals-review", lesson: "1.01 — THE FOUNDING PROMISE", title: "DEMOCRATIC IDEALS REVIEW", note: "INTERACTIVE REVIEW", url: "https://wpr-creator.github.io/GOV/founding-ideals-review.html"')) {
    errors.push('The Democratic Ideals Review card is missing from Unit 1.01.');
  }
  const unit102Resources = {
    'u1-102-democracy-filtered': 'democracy-filtered.html',
    'u1-102-guided-notes': 'https://docs.google.com/document/d/1Aq_lAJypODHhX0IUcOTzjL4Olp8jVyIF95c-evf_6vs/edit?usp=sharing'
  };
  Object.entries(unit102Resources).forEach(function ([resourceId, url]) {
    if (parsedSiteContent.assignmentUnlocks[resourceId] !== true || parsedSiteContent.assignmentUrls[resourceId] !== url) {
      errors.push('Unit 1.02 resource must remain open with its assigned URL: ' + resourceId);
    }
  });
  if (!courseData.includes('id: "u1-102-guided-notes", lesson: "1.02 — DEMOCRACY, FILTERED", title: "1.02 GUIDED NOTES", note: "GUIDED NOTES", url: "' + unit102Resources['u1-102-guided-notes'] + '"')) {
    errors.push('Unit 1.02 Guided Notes card is missing or has the wrong URL.');
  }
  if (!courseData.includes('id: "u1-concept-practice", lesson: "1.01 + 1.02 — CONCEPT PRACTICE", title: "UNIT 1 CONCEPT PRACTICE", note: "PRACTICE · IMMEDIATE FEEDBACK", url: "unit1-concept-practice.html"') ||
      parsedSiteContent.assignmentUnlocks['u1-concept-practice'] !== true ||
      parsedSiteContent.assignmentUrls['u1-concept-practice'] !== 'unit1-concept-practice.html') {
    errors.push('The open Unit 1.01 + 1.02 Concept Practice card is missing or incorrect.');
  }
  const unitOnePracticeIndex = courseData.indexOf('id: "u1-concept-practice"');
  const unitOne102Index = courseData.indexOf('id: "u1-102-democracy-filtered"');
  const unitOne101Index = courseData.indexOf('id: "u1-101-democratic-ideals-review"');
  if (!(unitOnePracticeIndex < unitOne102Index && unitOne102Index < unitOne101Index)) {
    errors.push('Unit 1 must show Concept Practice, then lesson 1.02, then lesson 1.01.');
  }
  if (courseData.includes('id: "u1-103-history-lesson"') || parsedSiteContent.assignmentUnlocks['u1-103-history-lesson'] !== false) {
    errors.push('Lesson 1.03 must remain hidden until it is introduced.');
  }
  const unitResourceAppCode = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const unitResourceStyles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  ['ASSESSMENTS', 'ASSIGNMENTS & PROJECTS', 'GUIDED NOTES & PRACTICE', 'READINGS & RESOURCES'].forEach(function (rowLabel) {
    if (!unitResourceAppCode.includes(`label: "${rowLabel}"`)) errors.push('Lesson resource row is missing: ' + rowLabel);
  });
  if (!unitResourceAppCode.includes('if (!categoryResources.length) return;') ||
      !unitResourceAppCode.includes('resourceType.includes("INTERACTIVE")') ||
      !unitResourceAppCode.includes('resourceType.includes("PRACTICE")') ||
      !unitResourceAppCode.includes('resourceType.includes("REVIEW")') ||
      !unitResourceStyles.includes('.unit-resource-grid { display: grid; grid-template-columns: repeat(2, 1fr);') ||
      !unitResourceStyles.includes('.unit-resource { min-height: 92px;') ||
      !unitResourceStyles.includes('text-align: left;') ||
      unitResourceAppCode.includes('unit-resource-item-centered')) {
    errors.push('Lesson resource rows must hide empty categories, use two equal columns, left-align cards, group practice with guided notes, and group interactive lessons with assignments.');
  }
  const unit1ConceptPractice = fs.readFileSync(path.join(root, 'unit1-concept-practice.html'), 'utf8');
  const unit1ConceptScript = fs.readFileSync(path.join(root, 'unit1-concept-practice.js'), 'utf8');
  ['CONCEPT<br><span>PRACTICE</span>', 'Choose the idea that best fits each example.', 'QUESTION 1', 'NEXT QUESTION →'].forEach(function (requiredText) {
    if (!unit1ConceptPractice.includes(requiredText)) errors.push('Unit 1 Concept Practice is missing: ' + requiredText);
  });
  if ((unit1ConceptScript.match(/lesson: "/g) || []).length !== 42 ||
      !unit1ConceptScript.includes('NATURAL RIGHTS') ||
      !unit1ConceptScript.includes('EQUALITY') ||
      !unit1ConceptScript.includes('Sovereignty is the source; consent is authorization.') ||
      !unit1ConceptScript.includes('Rights → government → consent → limits → representation') ||
      !unit1ConceptScript.includes('PARTICIPATORY DEMOCRACY') ||
      !unit1ConceptScript.includes('FEDERALIST NO. 10') ||
      !unit1ConceptScript.includes('CLUSTER 4 · BUILD AN ARGUMENT') ||
      !unit1ConceptScript.includes('REFERENDUM') ||
      !unit1ConceptScript.includes('upper-class accent') ||
      !unit1ConceptScript.includes('crypto.getRandomValues') ||
      !unit1ConceptScript.includes('sessionQuestions = buildSessionQuestions()') ||
      unit1ConceptScript.includes('Math.random')) {
    errors.push('Unit 1 Concept Practice must keep all 42 assessment-aligned questions spanning Topics 1.1 and 1.2.');
  }
  const democracyFiltered = fs.readFileSync(path.join(root, 'democracy-filtered.html'), 'utf8');
  [
    'How does representative democracy decide whose voices matter?',
    'REPUBLICANISM', 'PEOPLE\'S VOICES', 'REPRESENTATIVES', 'PUBLIC POLICY',
    'WHY THESE THREE?', 'BRUTUS · IDENTITY UNCERTAIN', 'JAMES MADISON', 'ALEXANDER HAMILTON',
    '<span>PARTICIPATORY</span>', '<span>PLURALIST</span>', '<span>ELITE</span>',
    'ELITE DEMOCRACY', 'WHAT THAT MEANS', 'WHOSE VOICE GETS HEARD?', 'WHOSE VOICE MAY BE MISSED?',
    '<strong>FACTION</strong>', '<strong>INTEREST GROUP</strong>', '<strong>LOBBYING</strong>',
    '<strong>COALITION</strong>', '<strong>INSTITUTIONAL FILTER</strong>',
    'BRUTUS', 'MADISON', 'HAMILTON', 'LESSON COMPLETE',
    'THREE DOCUMENTS, THREE CLUES', 'BRUTUS NO. 1', 'FEDERALIST NO. 10', 'U.S. CONSTITUTION',
    'WHO SHOULD GOVERNMENT LISTEN TO?',
    'docs/brutus-1.html', 'docs/federalist-10.html', 'docs/constitution.html',
    'For each model, write what it means, one strength, and one weakness.',
    'Use your own words. Write all nine sentences in the box.', 'id="model-summary-response"',
    'assets/democracy-filtered/brutus-advocate.jpg',
    'assets/democracy-filtered/madison-advocate.jpg',
    'assets/democracy-filtered/hamilton-advocate.jpg',
    'assets/democracy-filtered/social-media-congress.jpg'
  ].forEach(function (content) {
    if (!democracyFiltered.includes(content)) errors.push('Democracy, Filtered lesson is missing: ' + content);
  });
  if (!democracyFiltered.includes('THE SCENARIO + THE DECISION') ||
      democracyFiltered.includes('class="mission"') || democracyFiltered.includes('name="opening"')) {
    errors.push('Democracy, Filtered must combine the scenario and decision without an inactive opening poll.');
  }
  if ((democracyFiltered.match(/class="path-challenge"/g) || []).length !== 12 ||
      (democracyFiltered.match(/data-check="(brutus|madison|hamilton)-[1-4]"/g) || []).length !== 12 ||
      democracyFiltered.includes('<figcaption>PUBLIC VOICES') || democracyFiltered.includes('class="route"') ||
      democracyFiltered.includes('class="today"')) {
    errors.push('Each Democracy, Filtered model must have four checks and retired grey route/example boxes must remain removed.');
  }
  if (democracyFiltered.includes('“LET THE PEOPLE TAKE PART.”') || democracyFiltered.includes('“LET GROUPS COMPETE.”') ||
      democracyFiltered.includes('“LET LEADERS AND EXPERTS DECIDE.”')) {
    errors.push('Democracy, Filtered must not present lesson slogans as quotations.');
  }
  const democracyChecks = democracyFiltered.match(/<fieldset class="path-challenge"[\s\S]*?<\/fieldset>/g) || [];
  democracyChecks.forEach(function (check, index) {
    const answerLengths = Array.from(check.matchAll(/data-answer="(?:correct|wrong)">([^<]+)/g), function (match) {
      return match[1].trim().split(/\s+/).length;
    });
    if (answerLengths.length !== 3 || Math.max.apply(null, answerLengths) - Math.min.apply(null, answerLengths) > 2) {
      errors.push('Democracy, Filtered check ' + (index + 1) + ' must use three similarly sized answer choices.');
    }
  });
  const democracyScript = fs.readFileSync(path.join(root, 'democracy-filtered.js'), 'utf8');
  if (!democracyScript.includes('localStorage') ||
      !democracyScript.includes('fetch("content.json", { cache: "no-store" })') ||
      !democracyScript.includes('verifySubmission') || !democracyScript.includes('submissionId') ||
      !democracyScript.includes('model-summary-response') || !democracyScript.includes('type: "exit"') ||
      !democracyScript.includes('question: "Democracy, Filtered') || !democracyScript.includes('checks.length === 4')) {
    errors.push('Democracy, Filtered must use the final roster, save progress locally, and verify exit-ticket submission.');
  }
  ['termDefinitions', 'addTermDefinitions', 'PARTICIPATORY DEMOCRACY', 'PLURALIST DEMOCRACY', 'ELITE DEMOCRACY', 'INSTITUTIONAL FILTER'].forEach(function (content) {
    if (!democracyScript.includes(content)) errors.push('Democracy, Filtered key-term definitions are missing: ' + content);
  });
  ['id="submit-judgment"', 'id="decision-award"', 'id="award-student"', 'id="award-model"', '9 SENTENCES', 'TURN YOUR SCREEN AND SHOW MR. ROGERS'].forEach(function (content) {
    if (!democracyFiltered.includes(content)) errors.push('Democracy, Filtered submitted award is missing: ' + content);
  });
  if (democracyFiltered.includes('VOICE PASSPORT') || democracyFiltered.includes('PRINT / SAVE AS PDF')) {
    errors.push('Democracy, Filtered must not retain the retired printable Voice Passport.');
  }
  const democracyStyles = fs.readFileSync(path.join(root, 'democracy-filtered.css'), 'utf8');
  if (!democracyScript.includes('is-selected-answer') ||
      !democracyStyles.includes('.path-challenge button.is-selected-answer') ||
      !democracyStyles.includes('.classify button.is-selected-answer')) {
    errors.push('Democracy, Filtered selected answers must remain visibly filled and readable.');
  }
  if (!democracyStyles.includes('grid-template-columns:minmax(360px,42%) 1fr') ||
      !democracyStyles.includes('.advocate-copy{display:contents}') ||
      !democracyStyles.includes('.advocate-copy>.check-set{grid-column:1/-1}') ||
      !democracyStyles.includes('.hero{grid-template-columns:1fr}')) {
    errors.push('Democracy, Filtered must keep the large portrait-and-full-width activity layout.');
  }
  if (!democracyStyles.includes('[hidden]{display:none!important}')) {
    errors.push('Democracy, Filtered must display only the selected model panel.');
  }
  if (!democracyStyles.includes('aspect-ratio:4/5') || !democracyStyles.includes('aspect-ratio:1400/768')) {
    errors.push('Democracy, Filtered artwork must retain its intended image proportions.');
  }
  ['.award-participatory', '.award-pluralist', '.award-elite', '.decision-award'].forEach(function (content) {
    if (!democracyStyles.includes(content)) errors.push('Democracy, Filtered award palette is missing: ' + content);
  });
  const gettysburgReduxUrl = 'https://docs.google.com/document/d/124osPO5NyPwIFD2SI5m4Lf9iAJffpMUndl-8gOKrUug/edit?tab=t.0';
  if (parsedSiteContent.assignmentUnlocks['u1-101-gettysburg-redux'] !== true ||
      parsedSiteContent.assignmentUrls['u1-101-gettysburg-redux'] !== gettysburgReduxUrl ||
      !courseData.includes('id: "u1-101-gettysburg-redux", lesson: "1.01 — THE FOUNDING PROMISE", title: "GETTYSBURG REDUX", note: "PROJECT", url: "' + gettysburgReduxUrl + '"')) {
    errors.push('Gettysburg Redux must be open in Unit 1.01 with its assigned Google Doc URL.');
  }
  if (!fs.existsSync(path.join(root, 'docs/constitution-preamble.html')) ||
      !fs.readFileSync(path.join(root, 'docs/constitution-preamble.html'), 'utf8').includes('We the People')) {
    errors.push('The dedicated Constitution Preamble reading page is missing.');
  }
  if (parsedSiteContent.assignmentUnlocks['california-ballot-2026'] !== true) {
    errors.push('The 2026 California election tracker must remain open.');
  }
  [
    'id: "mr-smith-extension", lesson: "ASSESSMENTS"',
    'id: "civics-field-test", lesson: "ASSESSMENTS"',
    'id: "ap-addendum-test", lesson: "ASSESSMENTS"'
  ].forEach(function (content) {
    if (!courseData.includes(content)) errors.push('Unit 0 assessment grouping changed or missing: ' + content);
  });
  if (!courseData.includes('id: "evidence-in-action", lesson: "0.6 — THE COURT IS IN SESSION", title: "PROVE YOUR CASE"') ||
      courseData.includes('0.7 —')) {
    errors.push('Unit 0 must end with 0.6 — The Court Is in Session and include Prove Your Case there.');
  }
  const unitOneJoinCard = 'id: "u1-ap-classroom", lesson: "START HERE", title: "JOIN AP CLASSROOM", note: "1A JOIN CODE: VYJN37 · 2B JOIN CODE: 9RN33E", url: "https://myap.collegeboard.org/"';
  if (!courseData.includes(unitOneJoinCard) ||
      courseData.indexOf(unitOneJoinCard) > courseData.indexOf('id: "u1-101-declaration"') ||
      parsedSiteContent.assignmentUnlocks['u1-ap-classroom'] !== true ||
      parsedSiteContent.assignmentUrls['u1-ap-classroom'] !== 'https://myap.collegeboard.org/') {
    errors.push('Unit 1 must begin with the open AP Classroom join card and both class codes.');
  }
  if (courseData.indexOf('id: "u1-101-democratic-ideals-review"') > courseData.indexOf('id: "u1-101-declaration"')) {
    errors.push('The centered Democratic Ideals Review must remain first in lesson 1.01.');
  }
  const proveCaseFiles = [
    'prove-your-case.html',
    'prove-your-case/case-data.js',
    'prove-your-case/case.css',
    'prove-your-case/case.js',
    'prove-your-case/miranda-v-arizona.html',
    'prove-your-case/riley-v-california.html',
    'prove-your-case/mahanoy-v-bl.html',
    'prove-your-case/carpenter-v-united-states.html',
    'prove-your-case/board-v-earls.html',
    'prove-your-case/miller-v-alabama.html'
  ];
  proveCaseFiles.forEach(function (relativePath) {
    if (!fs.existsSync(path.join(root, relativePath))) errors.push('Missing Prove Your Case file: ' + relativePath);
  });
  ['miranda', 'riley', 'mahanoy', 'carpenter', 'earls', 'miller'].forEach(function (caseId) {
    if (parsedSiteContent.proveCaseUnlocks?.[caseId] !== true) errors.push('Prove Your Case ruling must remain open: ' + caseId);
    if (!fs.existsSync(path.join(root, 'assets/prove-your-case', caseId + '.svg'))) errors.push('Missing Prove Your Case artwork: ' + caseId);
  });
  if (!courseData.includes('id: "evidence-in-action", lesson: "0.6 — THE COURT IS IN SESSION", title: "PROVE YOUR CASE", url: "prove-your-case.html"') ||
      parsedSiteContent.assignmentUrls['evidence-in-action'] !== 'prove-your-case.html' ||
      parsedSiteContent.assignmentUnlocks['evidence-in-action'] !== true) {
    errors.push('Prove Your Case must point to its APG activity and remain open.');
  }
  const proveCaseCode = proveCaseFiles.map(function (relativePath) {
    return fs.existsSync(path.join(root, relativePath)) ? fs.readFileSync(path.join(root, relativePath), 'utf8') : '';
  }).join('\n');
  if (proveCaseCode.includes('#unit-gov-0') || proveCaseCode.includes('pad-site-content-v2') || proveCaseCode.includes('/GOV/')) {
    errors.push('Prove Your Case contains a leftover GOV-site route or settings key.');
  }
  if (!proveCaseCode.includes('20260820-apg-port') ||
      !proveCaseCode.includes('YOUR FOUR STEPS') ||
      !proveCaseCode.includes('TWO ACTIONS. ONE RIGHTS QUESTION.') ||
      !proveCaseCode.includes('A person can do something wrong and still have constitutional rights.') ||
      !proveCaseCode.includes('WHAT HAPPENED NEXT?')) {
    errors.push('The simplified GOV Prove Your Case structure changed or is missing from APG.');
  }
  const proveCaseData = fs.readFileSync(path.join(root, 'prove-your-case/case-data.js'), 'utf8');
  const proveCaseApp = fs.readFileSync(path.join(root, 'prove-your-case/case.js'), 'utf8');
  if ((proveCaseData.match(/worksheet:\s*\{?actor:/g) || []).length !== 6 ||
      (proveCaseData.match(/personAction:/g) || []).length !== 6 ||
      (proveCaseData.match(/aftermath:/g) || []).length !== 6 ||
      !proveCaseApp.includes('WORKSHEET GUIDE: ') ||
      !proveCaseApp.includes('GOVERNMENT ACTOR') ||
      !proveCaseApp.includes('CHOOSE TWO LEGAL WORDS') ||
      !proveCaseApp.includes('BUILD YOUR OPINION')) {
    errors.push('Every Prove Your Case file must include explicit, worksheet-aligned guidance for Steps 1–4.');
  }
  ['mr-smith-extension', 'civics-field-test', 'ap-addendum-test'].forEach(function (resourceId) {
    if (parsedSiteContent.assignmentUrls[resourceId] !== '' ||
        parsedSiteContent.assignmentUnlocks[resourceId] !== false ||
        !courseData.includes(`id: "${resourceId}", lesson: "ASSESSMENTS"`) ||
        !courseData.includes(`id: "${resourceId}", lesson: "ASSESSMENTS", title:`) ||
        !courseData.match(new RegExp(`id: "${resourceId}"[^\\n]+status: "SEE MR\\. ROGERS"[^\\n]+url: ""`))) {
      errors.push('Unit 0 assessment must have no link and must direct students to see Mr. Rogers: ' + resourceId);
    }
  });
  const appCode = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  [
    'window.location.hash = "home";',
    'Press ${shortcut}${deviceNote} to bookmark this course website.',
    'const UNIT_ZERO_COMPLETION_KEY = "apg-unit0-completion-v1";',
    'const CONTENT_STORAGE_KEY = "apg-site-content-v1";',
    'assignmentIsUnlocked(resource.id)',
    'createCompletionStar(resource, unlocked)',
    'group.classList.add("unit-resource-group-assessments")',
    'if (lessonA === "ASSESSMENTS") return -1;',
    'localStorage.setItem(UNIT_ZERO_COMPLETION_KEY'
  ].forEach(function (content) {
    if (!appCode.includes(content)) errors.push('Unit 0 interaction changed or missing: ' + content);
  });
  const primaryStyles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  ['.unit-resource-item', '.unit-completion-star', '.unit-completion-star[aria-pressed="true"]', '.unit-resource-reading', '.unit-resource-assignment', '.unit-resource-guided-notes', '.unit-resource-assessment'].forEach(function (selector) {
    if (!primaryStyles.includes(selector)) errors.push('Resource card styling changed or missing: ' + selector);
  });
  if (!primaryStyles.includes('color: #174f85; background: var(--white); border: 5px solid #174f85;') ||
      !primaryStyles.includes('.unit-completion-star[aria-pressed="true"] { color: var(--white); background: #174f85;')) {
    errors.push('Unit completion controls must begin white and become blue with a white star when complete.');
  }
  if (appCode.includes('THE ROAD AHEAD') || appCode.includes('lessons.append(lessonHeading, lessonList)')) {
    errors.push('Unit pages must not render the retired Road Ahead lessons section.');
  }
  if (!appCode.includes('!["gov-0", "gov-1"].includes(unit.id) && sourceGrid.children.length')) {
    errors.push('Unit 1 must hide the broad Unit Sources block and show lesson resources only.');
  }
  if (courseData.includes('lessonSupports:') || appCode.includes('createLessonSupport') || primaryStyles.includes('.lesson-support')) {
    errors.push('Unit pages must remain concise and must not render the retired lesson-support panels.');
  }
  const navCode = fs.readFileSync(path.join(root, 'nav-render.js'), 'utf8');
  [
    '["Home", "#home"]',
    '["Units", "#units"]',
    '["Foundations", "#foundations"]',
    '["Glossary", "#words"]',
    '["Skill Builders", "#skills"]'
  ].forEach(function (content) {
    if (!navCode.includes(content)) errors.push('Shared navigation does not match the primary site menu: ' + content);
  });
  if (navCode.includes('NAV_STATIC_TABS') || navCode.includes('nav-group-label')) {
    errors.push('Retired standalone navigation dropdowns must not return.');
  }
  const unversionedNavPages = files.filter(function (file) {
    return file.endsWith('.html') && /src="(?:\.\.\/)?nav-render\.js"/.test(fs.readFileSync(file, 'utf8'));
  });
  if (unversionedNavPages.length) {
    errors.push('Standalone pages must cache-bust shared navigation updates: ' + unversionedNavPages.map(relative).join(', '));
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
  if (!navCode.includes("document.querySelector(doc ? '.doc-hero, .page-hero, .document-hero' : '.case-hero')")) {
    errors.push('AP Addendum summaries must support both document hero layouts.');
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
  const documentReaderStyles = fs.readFileSync(path.join(root, 'styles-document-reader.css'), 'utf8');
  fs.readdirSync(path.join(root, 'docs')).filter(function (file) {
    return file.endsWith('.html') && file !== 'ARCHITECTURE.html';
  }).forEach(function (file) {
    const page = fs.readFileSync(path.join(root, 'docs', file), 'utf8');
    const newReaderFiles = ['declaration-of-independence.html', 'constitution-preamble.html', 'gettysburg-address.html'];
    const readerLink = newReaderFiles.includes(file)
      ? 'document-reader.css?v=20260823-apg-reader'
      : 'styles-document-reader.css?v=20260819-student-reader';
    if (!page.includes(readerLink) || page.indexOf(readerLink) > page.indexOf('</head>')) {
      errors.push('Document does not load the student reader inside its head: docs/' + file);
    }
  });
  const newDocumentReaderStyles = fs.readFileSync(path.join(root, 'docs', 'document-reader.css'), 'utf8');
  ['.course-shell', '.document-hero', '.passage', '.original', '.support', '.highlight', '.addendum-summary'].forEach(function (selector) {
    if (!newDocumentReaderStyles.includes(selector)) errors.push('New Unit 1 reader style changed or missing: ' + selector);
  });
  ['declaration-of-independence.html', 'constitution-preamble.html', 'gettysburg-address.html'].forEach(function (file) {
    const page = fs.readFileSync(path.join(root, 'docs', file), 'utf8');
    if (!page.includes('class="course-shell"') || !page.includes('AP UNITED STATES GOVERNMENT') ||
        !page.includes('AP ADDENDUM SUMMARY') && !page.includes('addAddendumSummary(')) {
      errors.push('Unit 1 reader is missing its AP-wide shell or concise summary: docs/' + file);
    }
  });
  ['.doc-passage-text', '.doc-paragraph-text', '.doc-margin', '.doc-annotation', '.highlight-key', '.doc-nav', '.doc-rail'].forEach(function (selector) {
    if (!documentReaderStyles.includes(selector)) errors.push('Student document-reader style changed or missing: ' + selector);
  });
  const declarationReader = fs.readFileSync(path.join(root, 'docs/declaration-of-independence.html'), 'utf8');
  const grievanceTransition = 'The history of the present King of Great Britain is a history of repeated injuries and usurpations';
  if ((declarationReader.match(new RegExp(grievanceTransition, 'g')) || []).length !== 1 ||
      declarationReader.indexOf('3 · THE EVIDENCE AGAINST THE KING') > declarationReader.indexOf(grievanceTransition)) {
    errors.push('The Declaration grievance transition must begin Section 3.');
  }
  if (declarationReader.includes('class="highlight"') || declarationReader.includes('<u>') ||
      (declarationReader.match(/class="support"/g) || []).length < 8) {
    errors.push('The Declaration must use plain original text while retaining its side annotations.');
  }
  if (!appCode.includes('card.href = documentData.file') ||
      !appCode.includes('link.href = documentData.file') ||
      appCode.includes('button.addEventListener("click", () => openDocument(documentData, button))')) {
    errors.push('Foundational document cards must open the full reading page directly.');
  }
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
  const exitCollector = fs.readFileSync(path.join(root, 'exit-ticket-script.gs'), 'utf8');
  ['Democracy Filtered', 'DEMOCRACY_HEADERS', "type === 'democracy-filtered'", 'democracySubmissionExists', 'writeDemocracyTab'].forEach(function (content) {
    if (!exitCollector.includes(content)) errors.push('Democracy, Filtered response collector is missing: ' + content);
  });
  ['Period 1A', 'Period 2B'].forEach(function (period) {
    if (!rosterSources.includes(period)) errors.push('Course period changed or missing: ' + period);
  });
  if (/Period 2A/.test(rosterSources)) errors.push('Retired Period 2A remains in roster or exit-ticket configuration.');
  const publishedContent = JSON.parse(fs.readFileSync(path.join(root, 'content.json'), 'utf8'));
  const rosterByPeriod = Object.fromEntries(publishedContent.periods.map(function (period) {
    return [period.id, period.students];
  }));
  if (rosterByPeriod['1A']?.length !== 40 || rosterByPeriod['2B']?.length !== 39) {
    errors.push('Final AP rosters must contain 40 students in 1A and 39 students in 2B.');
  }
  const rosterFingerprint = crypto.createHash('sha256')
    .update(JSON.stringify(publishedContent.periods))
    .digest('hex');
  if (rosterFingerprint !== 'f6f48ef7a43c176ecadbc4b53af997bc5efe90a645c3aa1f2e1e738b0eeda9e9') {
    errors.push('Published AP rosters no longer match the final 1A/2B list supplied on August 26, 2026.');
  }
  Object.entries(rosterByPeriod).forEach(function ([period, students]) {
    if (students.length !== new Set(students).size) errors.push('Duplicate student in Period ' + period + ' roster.');
    if (students.some(function (name) { return name !== name.trim() || !name.includes(','); })) {
      errors.push('Malformed student name in Period ' + period + ' roster.');
    }
  });
  const dataCore = fs.readFileSync(path.join(root, 'data-core.js'), 'utf8');
  const fallbackMatch = dataCore.match(/const DEFAULT_CONTENT = (\{[\s\S]*?\n\});/);
  if (!fallbackMatch) {
    errors.push('Could not read the fallback roster in data-core.js.');
  } else {
    const fallbackContent = JSON.parse(fallbackMatch[1]);
    if (JSON.stringify(fallbackContent.periods) !== JSON.stringify(publishedContent.periods)) {
      errors.push('Published and fallback AP rosters are out of sync.');
    }
  }
  [
    'id="exit-ticket-form"', 'id="exit-period"', 'id="exit-student"',
    'id="exit-response"', 'id="exit-status"'
  ].forEach(function (content) {
    if (!homepage.includes(content)) errors.push('Exit-ticket form control changed or missing: ' + content);
  });
  if (!(homepage.indexOf('class="now-panel"') < homepage.indexOf('class="dashboard-card exit-card"') &&
        homepage.indexOf('class="dashboard-card exit-card"') < homepage.indexOf('class="home-dashboard"'))) {
    errors.push('The exit ticket must appear directly below the current-unit card.');
  }
  [
    'fetch("content.json", { cache: "no-store" })',
    'EXIT_TICKET_URL', 'populateExitStudents', 'submitExitTicket',
    'body: JSON.stringify(payload)', 'verifyExitSubmission', 'submissionId',
    'NOT CONFIRMED—YOUR RESPONSE MAY NOT HAVE SAVED.'
  ].forEach(function (content) {
    if (!appCode.includes(content)) errors.push('Exit-ticket system changed or missing: ' + content);
  });
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

function validateWhoIsTryingToBeHeard() {
  const pageFile = path.join(root, 'who-is-trying-to-be-heard.html');
  const dataFile = path.join(root, 'who-is-trying-to-be-heard-data.js');
  const logicFile = path.join(root, 'who-is-trying-to-be-heard.js');
  if (![pageFile, dataFile, logicFile].every(fs.existsSync)) {
    errors.push('Unit 5 organization explorer files are incomplete.');
    return;
  }
  const page = fs.readFileSync(pageFile, 'utf8');
  const dataCode = fs.readFileSync(dataFile, 'utf8');
  const logic = fs.readFileSync(logicFile, 'utf8');
  ['WHO IS TRYING', 'SURPRISE ME', 'COMPARE CARDS', 'do not sponsor or endorse'].forEach(function (text) {
    if (!page.includes(text)) errors.push('Unit 5 organization explorer is missing: ' + text);
  });
  if (/Math\.random\s*\(/.test(page + dataCode + logic)) {
    errors.push('Unit 5 organization explorer must use secure random selection, not Math.random.');
  }
  const vm = require('vm');
  const sandbox = { window: {} };
  vm.runInNewContext(dataCode, sandbox);
  const data = sandbox.window.HEARD_EXPLORER_DATA;
  if (!data || !Array.isArray(data.topics) || data.topics.length < 8) {
    errors.push('Unit 5 organization explorer must include at least eight topics.');
    return;
  }
  if (!Array.isArray(data.organizations) || data.organizations.length < 32) {
    errors.push('Unit 5 organization explorer must include at least 32 organizations.');
    return;
  }
  const topicIds = new Set(data.topics.map(function (topic) { return topic.id; }));
  const organizationIds = new Set();
  data.organizations.forEach(function (organization) {
    ['id', 'topic', 'name', 'summary', 'who', 'represents', 'wants', 'methods', 'competes', 'url'].forEach(function (field) {
      if (!organization[field]) errors.push('Incomplete organization record: ' + (organization.name || organization.id || 'unknown') + ' — ' + field);
    });
    if (organizationIds.has(organization.id)) errors.push('Duplicate organization id: ' + organization.id);
    organizationIds.add(organization.id);
    if (!topicIds.has(organization.topic)) errors.push('Unknown topic for organization: ' + organization.name);
    if (!/^https:\/\//.test(organization.url)) errors.push('Organization must use an official HTTPS link: ' + organization.name);
  });
  data.topics.forEach(function (topic) {
    const total = data.organizations.filter(function (organization) { return organization.topic === topic.id; }).length;
    if (total < 4) errors.push('Topic needs at least four organizations: ' + topic.label);
  });
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
validateWhoIsTryingToBeHeard();

if (errors.length) {
  console.error('\n' + errors.join('\n'));
  process.exit(1);
}

console.log('Site validation passed.');
