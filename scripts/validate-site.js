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
    'Already in Session',
    'Read the Fine Print',
    'Pack Your Field Guides',
    'Portrait Day',
    'Show Your Work',
    'Prove Your Case',
    'Complete The Presidential Yearbook',
    'Complete the Civics Field Test and AP Addendum',
    'Complete the AP Addendum Test and Evidence in Action',
    'https://docs.google.com/document/d/1tPuBKdMDAK3NZwmKKrHXx-ALRhSJ53r2d0G-RaPkDFc/edit',
    'https://classroom.google.com/c/ODcxMDM2NTk5NjI1',
    'const chromebook = /CrOS/i.test(device);',
    'Press ${shortcut}${deviceNote} to add it to your browser bookmarks.'
  ].forEach(function (content) {
    if (!unitZero.includes(content)) errors.push('Unit 0 shared content changed or missing: ' + content);
  });

  const rootPages = files.filter(function (file) {
    return file.endsWith('.html') && path.dirname(file) === root;
  });
  rootPages.forEach(function (file) {
    const html = fs.readFileSync(file, 'utf8');
    const isNewShell = relative(file) === 'index.html' && html.includes('href="styles.css');
    if (!isNewShell && !html.includes('styles-gov-theme.css')) {
      errors.push('Root page is missing the shared visual theme: ' + relative(file));
    }
  });

  const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  [
    'data-view-link="home"',
    'data-view-link="agenda"',
    'data-view-link="units"',
    'data-view-link="foundations"',
    'data-view-link="words"',
    'data-view-link="skills"',
    'https://classroom.google.com/c/ODcxMDM2NTk5NjI1',
    '<code>wxe36xms</code>'
  ].forEach(function (content) {
    if (!homepage.includes(content)) errors.push('New APG shell is missing: ' + content);
  });
  if (!homepage.includes('<h1>AP GOVERNMENT GLOSSARY</h1>')) {
    errors.push('APG glossary heading is missing.');
  }
  if (homepage.includes('AP GOVERNMENT WORDS, PLAIN LANGUAGE') || homepage.includes('Short definitions. One clear example.')) {
    errors.push('APG glossary contains retired promotional phrasing.');
  }

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
    '0.1 — Already in Session',
    '0.2 — Read the Fine Print',
    '0.3 — Pack Your Field Guides',
    '0.4 — Portrait Day',
    '0.5 — Show Your Work',
    '0.6 — Prove Your Case',
    'Complete the signed syllabus, Self-Guided Tour, and Civic Selfie',
    'Complete The Presidential Yearbook',
    'AP ADDENDUM',
    'AP ADDENDUM TEST',
    'CIVICS FIELD TEST',
    'EVIDENCE IN ACTION'
  ].forEach(function (content) {
    if (!courseData.includes(content)) errors.push('Primary Unit 0 content changed or missing: ' + content);
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

walk(root);
validateJavaScript();
validateJson();
validateLocalReferences();
validateSocialMetadata();
validateSharedCourseExperience();
validateCalendarData();

if (errors.length) {
  console.error('\n' + errors.join('\n'));
  process.exit(1);
}

console.log('Site validation passed.');
