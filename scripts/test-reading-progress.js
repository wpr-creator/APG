const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "reading-progress.js"), "utf8");
const calculate = vm.runInNewContext(source + "\ncalculateReadingProgress", {});

assert.equal(calculate(0, 1000), 0);
assert.equal(calculate(250, 1000), 0.25);
assert.equal(calculate(1000, 1000), 1);
assert.equal(calculate(-50, 1000), 0);
assert.equal(calculate(1200, 1000), 1);
assert.equal(calculate(10, 0), 0);
assert.equal(calculate(10, Number.NaN), 0);

class MockElement {
  constructor() { this.children = []; this.attributes = {}; this.style = {}; }
  setAttribute(name, value) { this.attributes[name] = value; }
  appendChild(child) { this.children.push(child); }
}

const page = new MockElement();
const body = new MockElement();
const listeners = {};
const document = {
  documentElement: { scrollHeight: 2000 },
  body: Object.assign(body, { scrollHeight: 2000 }),
  querySelector: () => page,
  createElement: () => new MockElement()
};
const window = {
  innerHeight: 800,
  scrollY: 0,
  addEventListener(name, callback) { listeners[name] = callback; },
  requestAnimationFrame(callback) { callback(); }
};

vm.runInNewContext(source, { document, window, Number });
assert.equal(body.children.length, 1, "Long reading pages should receive one progress indicator.");
assert.equal(body.children[0].attributes["aria-hidden"], "true");
assert.equal(body.children[0].children[0].style.transform, "scaleX(0)");
window.scrollY = 600;
listeners.scroll();
assert.equal(body.children[0].children[0].style.transform, "scaleX(0.5)");
window.scrollY = 1200;
listeners.scroll();
assert.equal(body.children[0].children[0].style.transform, "scaleX(1)");

console.log("Reading progress tests passed: bounds, decorative accessibility, and scroll updates.");
