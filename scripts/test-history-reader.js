const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'history-reader-data.js'), 'utf8'), context);

const data = context.window.HISTORY_SECTION_DATA;
const expected = ['independence', 'articles', 'crisis', 'convention', 'compromises', 'debate', 'rights'];
assert.deepEqual(Object.keys(data), expected, 'History Lesson topics changed unexpectedly.');

Object.entries(data).forEach(([topic, section]) => {
  assert.equal(section.sections.length, 4, `${topic} must have exactly four teaching points.`);
  assert.equal(section.teach.length, 4, `${topic} must have exactly four matching explanation checks.`);
  section.sections.forEach((point, index) => {
    assert.ok(point.heading, `${topic} teaching point ${index + 1} needs a heading.`);
    assert.ok(point.text || (point.bullets && point.bullets.length), `${topic} teaching point ${index + 1} needs content.`);
    assert.ok(section.teach[index], `${topic} teaching point ${index + 1} needs a matching explanation check.`);
    const teachingText = [point.text || '', ...(point.bullets || [])].join(' ').trim();
    const wordCount = teachingText.split(/\s+/).filter(Boolean).length;
    assert.ok(wordCount <= 90, `${topic} teaching point ${index + 1} is ${wordCount} words; the maximum is 90.`);
    assert.ok(section.teach[index].endsWith('?'), `${topic} explanation check ${index + 1} should be one clear question.`);
  });
});

const printedNotesTerms = [
  'voluntary state cooperation', 'collect taxes directly', 'regulate trade between the states',
  'enumerated powers', 'Commerce Clause', 'Supremacy Clause', 'rule of law',
  'two-thirds of both houses of Congress', 'three-fourths of state legislatures',
  'Federalists promised to consider amendments'
];
const serializedData = JSON.stringify(data).toLowerCase();
printedNotesTerms.forEach(term => {
  assert.ok(serializedData.includes(term.toLowerCase()), `History Lesson is missing a printed-notes concept: ${term}`);
});

console.log('History Lesson teaching structure test passed.');
