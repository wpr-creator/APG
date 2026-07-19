#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { isDirectlyPolitical } = require('./calendar-relevance');
const { curatedEvents } = require('./calendar-curated-events');

const root = path.resolve(__dirname, '..');
const databaseFile = path.join(root, 'us-politics-events.json');
const database = JSON.parse(fs.readFileSync(databaseFile, 'utf8'));

let removed = 0;
const refined = {};

Object.keys(database).sort().forEach(function (key) {
  const original = curatedEvents[key] || database[key] || [];
  const kept = curatedEvents[key] ? original.slice() : original.filter(isDirectlyPolitical);
  removed += original.length - kept.length;
  if (!kept.length) {
    throw new Error('No researched historical politics event remains for ' + key);
  }
  refined[key] = kept;
});

fs.writeFileSync(databaseFile, JSON.stringify(refined, null, 2) + '\n');
const total = Object.values(refined).flat().length;
console.log('Refined politics calendar:', total + ' historical entries,', removed + ' weak entries removed.');
