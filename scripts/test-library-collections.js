const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
class Element {
  constructor(tag) { this.tag = tag; this.children = []; }
  append(...children) { this.children.push(...children); }
  appendChild(child) { this.append(child); }
  replaceChildren() { this.children = []; }
  setAttribute(name, value) { this[name] = value; }
}
const grids = { 'document-grid': new Element('div'), 'foundation-case-grid': new Element('div') };
const context = { window: {}, document: { createElement: tag => new Element(tag), getElementById: id => grids[id] } };
vm.createContext(context);
for (const file of ['foundations-data.js', 'data-required.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
context.foundations = context.window.FOUNDATIONS_DATA;
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
vm.runInContext(source.slice(source.indexOf('  function renderLibraryGroups('), source.indexOf('  function openDocument(')), context);
function flatten(node) { return [node, ...node.children.flatMap(flatten)]; }
for (const [render, gridId, items] of [
  ['renderDocuments', 'document-grid', context.foundations.documents],
  ['renderRequiredCases', 'foundation-case-grid', context.window.REQUIRED_CASES]
]) {
  context[render]();
  const grid = grids[gridId];
  const cards = flatten(grid).filter(node => node.tag === 'a');
  assert.equal(grid.children.length, 3);
  assert.equal(cards.length, items.length, 'Every resource must appear once.');
  assert.equal(new Set(cards.map(card => card.href)).size, items.length, 'No duplicate links.');
  for (const item of items) {
    const card = cards.find(card => card.href === item.file);
    assert.ok(card, `Missing ${item.title}`);
    assert.equal(card.children.find(node => node.tag === 'h4').textContent, item.title);
  }
  context[render]();
  assert.equal(flatten(grid).filter(node => node.tag === 'a').length, items.length, 'Re-rendering must not duplicate resources.');
}
console.log('Library collection tests passed: complete coverage, unique direct links, canonical titles, and safe re-rendering.');
// Amendments retain their complete summaries and explanations in every filter.
for (const id of ['amendment-filters', 'amendment-grid', 'amendment-status']) grids[id] = new Element('div');
context.data = { units: [] };
context.amendmentFilter = 'all';
Element.prototype.addEventListener = function () {};
vm.runInContext(source.slice(source.indexOf('  function amendmentMatches('), source.indexOf('  function renderSkills()')), context);
for (const [filter, expected] of [['all', 27], ['rights', 10], ['voting', 7]]) {
  context.amendmentFilter = filter;
  context.renderAmendments();
  const cards = flatten(grids['amendment-grid']).filter(node => node.className === 'amendment-card');
  assert.equal(cards.length, expected);
  for (const card of cards) {
    const number = parseInt(card.children[0].textContent, 10);
    const original = context.foundations.amendments.find(item => item[0] === number);
    assert.equal(card.children[2].textContent, original[2]);
    assert.equal(card.children[3].children[1].textContent, original[3]);
  }
}
console.log('Amendment collection tests passed: all 27, Bill of Rights and voting filters, and unchanged explanations.');
