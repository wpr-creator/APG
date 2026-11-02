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
