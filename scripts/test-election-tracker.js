const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'course-home.js'), 'utf8').split('(async () => {')[0];
function run(timestamp) {
  let clock = timestamp, tick;
  const nodes = Object.fromEntries(['election-countdown','election-date','election-year','tracker-label','election-progress','guide'].map(id => [id, {setAttribute(name,value){this[name]=value;}}]));
  class Clock extends Date { constructor(...args) { super(...(args.length ? args : [clock])); } }
  vm.runInNewContext(source, { Date: Clock, Intl, document: { getElementById: id => nodes[id], querySelector: () => nodes.guide }, setInterval: callback => { tick = callback; } });
  return { nodes, advance(timestamp) { clock = timestamp; tick(); } };
}
const result = run('2026-11-03T07:59:59Z'); // Nov 2, 11:59 p.m. at school.
assert.equal(result.nodes['election-countdown'].textContent, '1 day until election day');
result.advance('2026-11-03T08:00:00Z');
assert.equal(result.nodes['election-countdown'].textContent, 'Election day is today');
result.advance('2026-11-04T07:59:59Z');
assert.equal(result.nodes['election-year'].textContent, '2026 MIDTERMS');
result.advance('2026-11-04T08:00:00Z');
assert.equal(result.nodes['election-year'].textContent, 'NEW CONGRESS');
assert.equal(result.nodes['election-date'].dateTime, '2027-01-03');
assert.equal(result.nodes['election-countdown'].textContent, '60 days until the new Congress begins');
assert(result.nodes.guide.innerHTML.includes('2026 VOTER GUIDE'));
assert.equal(result.nodes['election-progress'].value,0);
result.advance('2026-12-04T08:00:00Z');
assert.equal(result.nodes['election-progress'].value,50);
assert.equal(result.nodes['election-countdown'].textContent,'30 days until the new Congress begins');
result.advance('2027-01-03T08:00:00Z');
assert.equal(result.nodes['election-progress'].value,100);
assert.equal(result.nodes['election-countdown'].textContent,'The new Congress begins today');
result.advance('2027-01-04T08:00:00Z');
assert.equal(result.nodes['election-year'].textContent,'2028 PRESIDENTIAL ELECTION');
assert.equal(result.nodes['election-progress'].value,0);
assert.equal(run('2028-11-07T08:00:00Z').nodes['election-countdown'].textContent, 'Election day is today');
console.log('Election tracker tests passed: numeric days, school midnight rollover, open-page refresh, Congress progress, and 2028 target.');
