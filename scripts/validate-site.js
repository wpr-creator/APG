#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

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
    if (!events.some(function (event) { return event.kind !== 'civic-focus'; })) {
      errors.push('Calendar date has no historical event: ' + key);
    }
    events.forEach(function (event, index) {
      if ((event.kind !== 'civic-focus' && !event.year) || !event.text || !event.ap_connection ||
          !event.unit || !event.category || !event.source_label || !event.source_url) {
        errors.push('Incomplete calendar event: ' + key + '[' + index + ']');
      }
      if (![1, 2, 3, 4, 5].includes(event.unit)) errors.push('Invalid AP unit: ' + key + '[' + index + ']');
      if (!['event', 'birth', 'death', 'civic-focus'].includes(event.kind)) errors.push('Invalid event kind: ' + key + '[' + index + ']');
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
validateCalendarData();

if (errors.length) {
  console.error('\n' + errors.join('\n'));
  process.exit(1);
}

console.log('Site validation passed.');
