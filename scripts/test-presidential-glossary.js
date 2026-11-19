const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = { window: {} };
vm.runInNewContext(read('glossary-data.js'), context);
const entries = Object.values(context.window.APG_GLOSSARY_UNITS.find(u => u.key === 'unit2').groups).flat();
const glossary = new Map(entries.map(([term, definition]) => [term.toLowerCase(), definition]));
const plain = html => html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const expected = new Map();
for (const row of read('presidential-tools.html').matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)) {
  const title = row[1].match(/<th\b[^>]*>([\s\S]*?)<\/th>/);
  const cells = [...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)];
  if (!title || cells.length !== 2) continue;
  const term = plain(title[1]).toLowerCase().replace(/^regular veto$/, 'veto');
  expected.set(term, cells.map(c => plain(c[1])).join(' '));
}
for (const term of ['Formal powers', 'Informal powers']) {
  const match = read('presidential-tools.html').match(new RegExp('<h[23][^>]*>\\s*' + term + '\\s*</h[23]>\\s*<p[^>]*>([\\s\\S]*?)</p>', 'i'));
  assert.ok(match, term);
  expected.set(term.toLowerCase(), plain(match[1]));
}
for (const row of read('presidential-roles.html').matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)) {
  const title = row[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
  const definition = row[1].match(/<td[^>]*data-label="Class definition"[^>]*>([\s\S]*?)<\/td>/);
  if (title && definition) expected.set(plain(title[1]).toLowerCase(), plain(definition[1]));
}
assert.equal(expected.size, 16);
const federalist = read('docs/federalist-70.html');
for (const row of federalist.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)) {
  const term = row[1].match(/<th scope="row">([\s\S]*?)<\/th>/);
  const definition = row[1].match(/<td>([\s\S]*?)<\/td>/);
  if (term && definition) expected.set(plain(term[1]).toLowerCase(), plain(definition[1]));
}
for (const term of ['Energy', 'Accountability']) {
  const match = federalist.match(new RegExp('<strong>' + term + ' means ([\\s\\S]*?)</strong>'));
  assert.ok(match, term);
  const definition = plain(match[1]);
  expected.set(term === 'Energy' ? 'executive energy' : 'accountability', definition[0].toUpperCase() + definition.slice(1));
}
for (const term of ['Dependence on the people', 'Responsibility for official conduct']) {
  const match = federalist.match(new RegExp('<strong>' + term + '</strong> — ([\\s\\S]*?)</li>'));
  assert.ok(match, term);
  expected.set(term.toLowerCase(), plain(match[1]));
}
assert.equal(expected.size, 28);
const questions = JSON.parse(read('pool-questions.json'));
for (const [term, definition] of expected) {
  assert.equal(glossary.get(term), definition, term + ' must match its reference page');
  assert.ok(questions.some(q => q.unit === 2 && q.correct.toLowerCase() === term && q.prompt === definition && q.why === definition), term + ' review question must match');
}
console.log('Presidential glossary: all 28 definitions match their reference pages and review questions.');
