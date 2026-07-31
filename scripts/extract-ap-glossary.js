const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "data-core.js"), "utf8");
const marker = "const GLOSSARY_UNITS =";
const markerIndex = source.indexOf(marker);
if (markerIndex < 0) throw new Error("GLOSSARY_UNITS was not found.");

const start = source.indexOf("[", markerIndex);
let depth = 0;
let quote = "";
let escaped = false;
let end = -1;

for (let index = start; index < source.length; index += 1) {
  const character = source[index];
  if (quote) {
    if (escaped) escaped = false;
    else if (character === "\\") escaped = true;
    else if (character === quote) quote = "";
    continue;
  }
  if (character === "'" || character === '"' || character === "`") {
    quote = character;
    continue;
  }
  if (character === "[") depth += 1;
  if (character === "]") {
    depth -= 1;
    if (depth === 0) {
      end = index + 1;
      break;
    }
  }
}

if (end < 0) throw new Error("GLOSSARY_UNITS did not have a closing bracket.");
const units = vm.runInNewContext(`(${source.slice(start, end)})`, Object.create(null));
const output = [
  "window.APG_GLOSSARY_UNITS = ",
  JSON.stringify(units, null, 2),
  ";\n"
].join("");
fs.writeFileSync(path.join(root, "glossary-data.js"), output);

const count = units.reduce((total, unit) => (
  total + Object.values(unit.groups).reduce((unitTotal, terms) => unitTotal + terms.length, 0)
), 0);
console.log(`Extracted ${count} AP Government glossary entries.`);
