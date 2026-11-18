const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','executive-branch-data.js'),'utf8'), context);
const tree = context.window.EXECUTIVE_BRANCH_DATA;
const ids = new Set(), paths = new Map();
let deepest = 0;
function walk(node, ancestors=[]) {
  assert(node.id && !ids.has(node.id),'Every organization needs a unique identifier: '+node.title);
  ids.add(node.id);
  assert(node.title && node.desc && Array.isArray(node.children),'Every entry needs a name, explanation, and children array.');
  if(ancestors.length){
    const source = new URL(node.source);
    assert(source.protocol==='https:' && (/\.gov$/.test(source.hostname) || source.hostname==='about.usps.com'),'Use an official HTTPS government source: '+node.title);
  }
  paths.set(node.title,[...ancestors,node.title]);
  deepest = Math.max(deepest,ancestors.length);
  node.children.forEach(child=>walk(child,[...ancestors,node.title]));
}
walk(tree);
assert(ids.size>=400,'Keep the expanded organization and program coverage.');
assert(deepest>=5,'Preserve multiple layers beneath the department level.');
const departments = tree.children.find(n=>n.kind==='departments').children;
assert.strictEqual(departments.length,15,'There are 15 statutory executive departments.');
const names = ['State','the Treasury','Defense','Justice','the Interior','Agriculture','Commerce','Labor','Health and Human Services','Housing and Urban Development','Transportation','Energy','Education','Veterans Affairs','Homeland Security'];
names.forEach(name=>assert(departments.some(n=>n.title==='Department of '+name),name));
[
 ['National Park Service','Department of the Interior'],
 ['U.S. Forest Service','Department of Agriculture'],
 ['Federal Bureau of Investigation (FBI)','Department of Justice'],
 ['U.S. Secret Service','Department of Homeland Security'],
 ['U.S. Marine Corps','Department of the Navy'],
 ['U.S. Space Force','Department of the Air Force'],
 ['Federal Pell Grants','Federal Student Aid'],
 ['National Weather Service','National Oceanic and Atmospheric Administration (NOAA)']
].forEach(([child,parent])=>assert(paths.get(child).includes(parent),child+' belongs under '+parent));
assert(paths.get('Tax Litigation Branch').includes('Civil Division'),'Civil tax litigation belongs within DOJ Civil Division.');
assert(!paths.has('Tax Division'),'Do not restore the former standalone DOJ Tax Division.');
assert(paths.get('Food and Nutrition Administration (FNA)').includes('Department of Agriculture'));
assert(paths.has('Economic, Energy, and Business Affairs'));
assert(paths.get('Central Intelligence Agency (CIA)').includes('Outside the departments'));
assert(!paths.get('Federal Reserve System').some(name=>name.startsWith('Department of ')));
console.log('Executive branch diagram passed: '+ids.size+' unique entries, 15 departments, official sources, and core organizational relationships.');
