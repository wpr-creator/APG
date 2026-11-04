const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'course-home.js'), 'utf8').split('(async () => {')[0];
function run(timestamp) {
  let clock = timestamp, tick;
  const nodes = Object.fromEntries(['election-countdown','election-progress'].map(id => [id, {setAttribute(name,value){this[name]=value;}}]));
  class Clock extends Date { constructor(...args) { super(...(args.length ? args : [clock])); } }
  vm.runInNewContext(source, { Date: Clock, Intl, document: { getElementById: id => nodes[id] }, setInterval: callback => { tick = callback; } });
  return { nodes, advance(timestamp) { clock = timestamp; tick(); } };
}
const result = run('2026-11-04T08:00:00Z');
assert.equal(result.nodes['election-countdown'].textContent, '60 days until the 120th Congress begins');
assert.equal(result.nodes['election-progress'].value, 0);
result.advance('2026-12-04T08:00:00Z');
assert.equal(result.nodes['election-progress'].value, 50);
result.advance('2027-01-03T08:00:00Z');
assert.equal(result.nodes['election-progress'].value, 100);
assert.equal(result.nodes['election-countdown'].textContent, 'The 120th Congress begins today');
result.advance('2027-01-04T08:00:00Z');
assert.equal(result.nodes['election-countdown'].textContent, 'The 120th Congress has begun');
console.log('Congress countdown checks passed.');
