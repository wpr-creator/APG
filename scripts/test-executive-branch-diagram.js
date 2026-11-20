const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','executive-branch-data.js'),'utf8'), context);
const tree = context.window.EXECUTIVE_BRANCH_DATA;
const audit = JSON.parse(fs.readFileSync(path.join(__dirname,'audits','executive-branch-links.json'),'utf8'));
const audited = new Map(audit.entries.map(entry=>[entry.id,entry]));
assert.strictEqual(audited.size,audit.entries.length,'Audit entries must be unique.');
const linkTypes = new Set(['website','program-page','organization-listing','official-profile','directory','staff-directory']);
const ids = new Set(), paths = new Map();
let deepest = 0;
function walk(node, ancestors=[]) {
  assert(node.id && !ids.has(node.id),'Every organization needs a unique identifier: '+node.title);
  ids.add(node.id);
  assert(node.title && node.desc && Array.isArray(node.children),'Every entry needs a name, explanation, and children array.');
  for(const field of ['topics','relatedTopics']){
    assert(Array.isArray(node[field]) && node[field].every(term=>typeof term==='string' && term.trim()),'Use readable discovery terms: '+node.title);
    assert.strictEqual(new Set(node[field]).size,node[field].length,'Do not repeat discovery terms: '+node.title);
  }
  const source = new URL(node.source), url = new URL(node.url);
  assert(source.protocol==='https:' && /\.(gov|mil)$/.test(source.hostname),'Use official government evidence: '+node.title);
  assert(url.protocol==='https:','Every entry needs a secure primary link: '+node.title);
  const exceptionalHosts = new Set(['www.bie.edu','www.usps.com','www.tva.com']);
  assert(/\.(gov|mil)$/.test(url.hostname) || exceptionalHosts.has(url.hostname),'Primary links must be official: '+node.title);
  assert(linkTypes.has(node.linkType),'Identify the type of destination: '+node.title);
  const record = audited.get(node.id);
  assert(record && record.url===node.url && record.title===node.title && record.linkType===node.linkType,'Keep each link aligned with its audit record: '+node.title);
  paths.set(node.title,[...ancestors,node.title]);
  deepest = Math.max(deepest,ancestors.length);
  node.children.forEach(child=>walk(child,[...ancestors,node.title]));
}
walk(tree);
assert.strictEqual(ids.size,audited.size,'Audit every displayed entry, including programs and groups.');
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
assert(paths.has('Bureau of Economic, Energy, and Business Affairs'));
assert(paths.get('Directorate of Mission Systems').includes('Central Intelligence Agency (CIA)'));
assert(!paths.has('Directorate of Digital Innovation'),'Use the current CIA directorate name.');
assert(paths.get('Energy and Natural Resources Division').includes('Department of Justice'));
assert(paths.get('Division of Vector-borne Diseases').includes('National Center for Emerging and Zoonotic Infectious Diseases'));
assert(paths.get('One Health Office').includes('National Center for Emerging and Zoonotic Infectious Diseases'));
assert(paths.get('U.S. Board on Geographic Names').includes('Department of the Interior'));
assert(!paths.get('U.S. Board on Geographic Names').includes('U.S. Geological Survey (USGS)'),'BGN is an interagency board sharing responsibility with the Interior secretary, not an ordinary USGS office.');
assert(paths.get('Advisory Committee on Undersea Features').includes('U.S. Board on Geographic Names'));
assert(paths.get('National Detector Dog Training Center').includes('Plant Protection and Quarantine'));
assert(paths.get('FBI Art Crime Team').includes('Federal Bureau of Investigation (FBI)'));
assert(paths.get('National Indian Gaming Commission').includes('Department of the Interior'));
[
 ['U.S. National Arboretum','Agricultural Research Service'],
 ['National Bonsai & Penjing Museum','U.S. National Arboretum'],
 ['National Plant Germplasm System','Agricultural Research Service'],
 ['Pension Benefit Guaranty Corporation (PBGC)','Department of Labor'],
 ['Defense POW/MIA Accounting Agency (DPAA)','Defense agencies'],
 ['United States Antarctic Program','National Science Foundation'],
 ['Human Foods Program','Food and Drug Administration (FDA)'],
 ['Jet Propulsion Laboratory (JPL)','National Aeronautics and Space Administration (NASA)']
].forEach(([child,parent])=>assert(paths.get(child).includes(parent),child+' belongs under '+parent));
['Surface Transportation Board (STB)','Occupational Safety and Health Review Commission','Federal Labor Relations Authority (FLRA)','Postal Regulatory Commission'].forEach(name=>{
 assert(paths.get(name).includes('Outside the departments'),name+' is independent of the executive departments.');
});
function findNode(id,node=tree){return node.id===id?node:node.children.map(child=>findNode(id,child)).find(Boolean);}
assert.match(findNode('jet-propulsion-laboratory').desc,/managed by Caltech/);
assert.strictEqual(findNode('national-bonsai-penjing-museum').kind,'collection','A museum collection is not a standalone agency.');
for(const [id,term] of [['office-of-special-counsel','Hatch Act'],['defense-pow-mia-accounting-agency','missing soldiers'],['us-national-arboretum','bonsai'],['human-foods-program','food dyes']]){
 const n=findNode(id);assert([...n.topics,...n.relatedTopics].includes(term),id+' should be discoverable by '+term);
}
assert(!findNode('national-bonsai-penjing-museum').topics.includes('food dyes'),'Do not spread unrelated mission tags down the tree.');
const diagramScript = fs.readFileSync(path.join(__dirname,'..','executive-branch-diagram.js'),'utf8');
assert(diagramScript.includes('link.href=item.url'),'Cards must link to their own primary destination, not inherited evidence.');
assert(!diagramScript.includes('link.href=item.source'),'Evidence is not a substitute for an organization’s own site.');
assert(paths.get('Central Intelligence Agency (CIA)').includes('Outside the departments'));
assert(!paths.get('Federal Reserve System').some(name=>name.startsWith('Department of ')));
console.log('Executive branch diagram passed: '+ids.size+' unique entries and audited primary links, 15 departments, official evidence, and core organizational relationships.');
