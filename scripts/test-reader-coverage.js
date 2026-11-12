/* Content checks complement layout checks: keep named concepts and source text. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const visible = text => text.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
const coverage = {
  'docs/declaration-of-independence.html': ['natural rights','equality','social contract','popular sovereignty','limited government'],
  'docs/gettysburg-address.html': ['equality','popular sovereignty'],
  'docs/federalist-10.html': ['faction','majority','minority','liberty','representatives'],
  'docs/brutus-1.html': ['necessary and proper clause','supremacy','large republic'],
  'docs/federalist-39.html': ['federalism','national','state','access points'],
  'docs/federalist-51.html': ['separation of powers','checks and balances','federalism','double security'],
  'docs/federalist-70.html': ['unity','duration','adequate support','competent powers','decision','activity','secrecy','dispatch','dependence on the people','responsibility for official conduct'],
  'docs/federalist-78.html': ['judicial review','judicial independence','good behavior','pay'],
  'docs/wealth-of-nations.html': ['individualism','equality of opportunity','free enterprise','rule of law','allocation','competition'],
  'cases/baker-v-carr.html': ['equal protection','state legislative','justiciable','political question','reynolds'],
  'cases/shaw-v-reno.html': ['equal protection','strict scrutiny','narrowly tailored','compelling','did not decide in 1993'],
  'cases/mcdonald-v-chicago.html': ['second amendment','fourteenth amendment','due process','selective incorporation','fundamental right','history and tradition'],
  'unit2-districting-frq-scoring.html': ['stare decisis','precedent','wesberry','bush v. vera']
};
for (const [file, terms] of Object.entries(coverage)) {
  const text = visible(read(file));
  for (const term of terms) assert.ok(text.includes(term), `${file} lost the teaching concept: ${term}`);
}
const tools = read('presidential-tools.html');
for (const id of ['regular-veto','pocket-veto','treaty','executive-agreement','executive-order','signing-statement','bargaining','bully-pulpit']) {
  assert.ok(tools.includes(`id="${id}"`), `Missing Lesson 2.3 worksheet tool: ${id}`);
}
for (const file of fs.readdirSync(path.join(root, 'cases')).filter(file => file.endsWith('.html'))) {
  const page = read('cases/' + file);
  for (const id of ['case-situation','case-claim','case-decision']) assert.ok(page.includes(`id="${id}"`), `${file} lost a core case section`);
  assert.ok(/id="case-(rule|not-decided)"/.test(page), `${file} lost the decision's limits`);
  assert.ok(page.includes('supreme.justia.com/'), `${file} needs its opinion source`);
}
// Hash only the original passage blocks, not their editable teaching annotations.
function sourceDigest(page) {
  const blocks = [...page.matchAll(/<(div|blockquote)\b[^>]*class="[^"\n]*\b(?:original|doc-paragraph-text|doc-passage-text)\b[^"\n]*"[^>]*>([\s\S]*?)<\/\1>/g)].map(m => m[2].replace(/\s+/g, ' ').trim());
  assert.ok(blocks.length, 'No original passages found');
  return crypto.createHash('sha256').update(JSON.stringify(blocks)).digest('hex');
}
const sourceHashes = {
  "docs/declaration-of-independence.html": "8f8707baee062f0f7f1e302d381a4049ddda8b1e4216409d6bfb60803ef2b1e0",
  "docs/gettysburg-address.html": "53817208a7e10ad9c5342cb801ce9dfa3f2425d2753469b20c5450532fb8316c",
  "docs/constitution-preamble.html": "87d4ebf15b4703edb2c85521fe4f8d5e602fa1f2fbc426b963b120f48e3b7892",
  "docs/letter-birmingham-jail.html": "18a24111ece794217f3316f1ff69ce35c9d29911a2a9720a397be9364aa7b80f",
  "docs/federalist-10.html": "6d4344d11195e510128216ed7492f57817cedbc446917959006d182af827a74e",
  "docs/federalist-51.html": "17ff087f02f98b52fabf3507c6d5d02af7905ec8bd764c6b45c11949eb906b8c"
};
for (const [file, hash] of Object.entries(sourceHashes)) assert.equal(sourceDigest(read(file)), hash, `${file}: original passages changed; review the source before updating this baseline`);
console.log('Reader coverage passed: core case sections, worksheet concepts, all eight presidential tools, and unchanged source passages.');
