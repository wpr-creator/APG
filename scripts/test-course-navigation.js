const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const shell = fs.readFileSync(path.join(root, "course-shell.js"), "utf8");
class Element {
  constructor(tag = "div") {
    this.tag = tag; this.children = []; this.attrs = {}; this.events = {}; this.classes = new Set();
    this.classList = { add: c => this.classes.add(c), remove: c => this.classes.delete(c), toggle: (c, on) => on ? this.classes.add(c) : this.classes.delete(c) };
  }
  append(...nodes) { this.children.push(...nodes); }
  prepend(node) { this.children.unshift(node); }
  after(node) { this.afterNode = node; }
  setAttribute(k, v) { this.attrs[k] = v; }
  getAttribute(k) { return this.attrs[k]; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(k, fn) { this.events[k] = fn; }
  focus() { this.focused = true; }
  matches(selector) { return selector.split(",").some(s => s.trim() === this.tag || s.trim() === "." + this.className); }
  querySelector() { return this.brand || null; }
}
function runShell({ saved, homepage = false } = {}) {
  const body = new Element("body");
  const oldHeader = new Element("header"); oldHeader.className = "course-header";
  const lessonHero = new Element("header"); lessonHero.className = "section-hero";
  const back = new Element("a"); back.href = "https://example.test/APG/#gov-1";
  const internal = new Element("a"); internal.href = "https://example.test/APG/docs/federalist-10.html"; internal.attrs.target = "_blank";
  const external = new Element("a"); external.href = "https://docs.google.com/document/d/example/edit"; external.attrs.target = "_blank";
  const mainHeader = new Element("header"); mainHeader.brand = new Element("a");
  const document = {
    currentScript: { src: "https://example.test/APG/course-shell.js" }, body,
    addEventListener: (event, fn) => { if (event === "DOMContentLoaded") fn(); },
    createElement: tag => new Element(tag),
    querySelector: () => homepage ? mainHeader : null,
    querySelectorAll: selector => selector === 'a[target="_blank"]' ? [internal, external] : selector === "a[href]" ? [back] : [oldHeader, lessonHero]
  };
  vm.runInNewContext(shell, { document, URL, location: { href: "https://example.test/APG/democracy-filtered.html", pathname: "/APG/democracy-filtered.html" }, sessionStorage: { getItem: () => JSON.stringify(saved || null) } });
  assert.equal(internal.attrs.target, undefined);
  assert.equal(external.attrs.target, "_blank");
  if (homepage) { assert(mainHeader.classes.has("apg-shared-header")); return; }
  assert(oldHeader.classes.has("apg-replaced-navigation"));
  assert(!lessonHero.classes.has("apg-replaced-navigation"), "Lesson heroes must stay visible");
  const header = body.children[0], button = header.children[1], nav = header.children[2];
  assert.deepEqual(nav.children.map(a => a.textContent), ["Home", "Units", "Foundations", "Glossary", "Skill Builders"]);
  button.events.click(); assert.equal(button.getAttribute("aria-expanded"), "true"); assert(nav.classes.has("is-open"));
  header.events.keydown({ key: "Escape" }); assert.equal(button.getAttribute("aria-expanded"), "false"); assert(!nav.classes.has("is-open")); assert(button.focused);
  return header.afterNode.href;
}
assert.equal(runShell(), "https://example.test/APG/#gov-1");
assert.equal(runShell({ saved: { destination: "/APG/democracy-filtered.html", unit: "gov-1", lesson: "lesson-u1-102-democracy-filtered" } }), "https://example.test/APG/?lesson=lesson-u1-102-democracy-filtered#gov-1");
assert.equal(runShell({ saved: { destination: "/APG/other.html", unit: "gov-0", lesson: "unrelated" } }), "https://example.test/APG/#gov-1");
runShell({ homepage: true });
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const cards = ["test-corrections-card", "election-tracker-card", "history-card", "course-links-card"].map(c => html.indexOf(c));
assert(cards.every((position, i) => position >= 0 && (!i || position > cards[i - 1])), "Reading order must match visual priority");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const start = app.indexOf("    const currentLesson =");
const end = app.indexOf("    renderSiteContent();", start);
const elements = { "current-lesson-action": {} };
const resources = [
  { id: "older", lesson: "1.01 — FIRST", url: "first.html" },
  { id: "newer", lesson: "1.02 — SECOND", url: "second.html" },
  { id: "future", lesson: "1.03 — LATER", url: "later.html" }
];
vm.runInNewContext(app.slice(start, end), { current: { id: "gov-1", resources }, siteContent: {}, assignmentIsUnlocked: id => id !== "future", document: { getElementById: id => elements[id] } });
assert.equal(elements["current-lesson-action"].href, "?lesson=lesson-newer#gov-1", "Current lesson must exclude locked work");
assert.equal(elements["current-lesson-action"].hidden, false);
resources.length = 0;
vm.runInNewContext(app.slice(start, end), { current: { id: "gov-1", resources }, siteContent: {}, assignmentIsUnlocked: () => true, document: { getElementById: id => elements[id] } });
assert.equal(elements["current-lesson-action"].hidden, true);
console.log("Course navigation tests passed: shared headers, retained heroes, menu toggle/Escape, return links, tab behavior, homepage order, and current-lesson availability.");
