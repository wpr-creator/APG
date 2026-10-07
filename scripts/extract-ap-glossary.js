const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "glossary-data.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);
const units = context.window.APG_GLOSSARY_UNITS;
if (!Array.isArray(units) || units.length !== 5) {
  throw new Error("The canonical APG glossary must define all five AP units.");
}

const count = units.reduce((total, unit) => (
  total + Object.values(unit.groups).reduce((unitTotal, terms) => unitTotal + terms.length, 0)
), 0);
console.log(`Verified ${count} AP Government glossary entries in glossary-data.js (canonical source).`);
