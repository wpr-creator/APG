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

function validateCalendarData() {
  const file = path.join(root, 'us-politics-events.json');
  const database = JSON.parse(fs.readFileSync(file, 'utf8'));
  const validKey = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
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
      if (!event.year || !event.text || !event.ap_connection) {
        errors.push('Incomplete calendar event: ' + key + '[' + index + ']');
      }
    });
  });
  console.log('Curated calendar dates:', Object.keys(database).length, '(remaining dates use the filtered live feed or glossary fallback)');
}

walk(root);
validateJavaScript();
validateJson();
validateLocalReferences();
validateCalendarData();

if (errors.length) {
  console.error('\n' + errors.join('\n'));
  process.exit(1);
}

console.log('Site validation passed.');
