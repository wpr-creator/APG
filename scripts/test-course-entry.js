const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const router = fs.readFileSync(path.join(root, 'entry-router.js'), 'utf8');
function redirect(suffix) {
  let destination = null;
  vm.runInNewContext(router, { URL, location: {href: 'https://example.test/APG/' + suffix, replace: url => { destination = url; }}, addEventListener() {} });
  return destination;
}
assert.equal(redirect(''), null);
assert.equal(redirect('index.html#home'), null);
assert.equal(redirect('index.html#main'), null);
for (const route of ['exit-ticket','election-2026','foundations','gov-1','presidents']) {
  assert.equal(redirect('index.html#'+route), 'https://example.test/APG/course-tools.html#'+route);
}
assert.equal(redirect('index.html?unit=2#words'), 'https://example.test/APG/course-tools.html?unit=2#words');
assert.equal(redirect('index.html#units'), 'https://example.test/APG/units.html');
assert.equal(redirect('index.html#gov-2'), 'https://example.test/APG/unit2.html');
assert.equal(redirect('index.html?lesson=lesson-2.2#gov-2'), 'https://example.test/APG/lesson-2-2.html');
assert.equal(redirect('index.html?lesson=unit2-concept-practice#gov-2'), 'https://example.test/APG/lesson-2-1.html');
const lesson21 = fs.readFileSync(path.join(root, 'lesson-2-1.html'), 'utf8');
assert(lesson21.includes('How does the structure of Congress shape the way national policy is made?'));
for (const id of ['u2-201-guided-notes','u2-201-lesson-slides','u2-201-congress-key','u2-201-bill-to-law-notes','u2-201-follow-the-money-notes','u2-21-22-concept-practice']) assert(lesson21.includes('data-resource-id="'+id+'"'));
const lesson = fs.readFileSync(path.join(root, 'lesson-2-2.html'), 'utf8');
assert(lesson.includes('How do districts and political pressures shape representation in Congress?'));
for (const filename of ['index.html','units.html','unit2.html','lesson-2-1.html','lesson-2-2.html']) {
 const html=fs.readFileSync(path.join(root,filename),'utf8');
 assert(!/design-preview|DESIGN PREVIEW/.test(html), filename+' must use canonical navigation');
 assert(html.includes('class="preview-exit"'), filename+' must retain the exit ticket shortcut');
}
console.log('Canonical course entry tests passed: bookmarks, lesson routing, exact EQ, and navigation.');

const settings=JSON.parse(fs.readFileSync(path.join(root,'site-content.json'),'utf8'));
assert.equal(settings.exitQuestion, 'Imagine you’re a politician who can draw districts to help your party win more seats. Would you do it? Convince me. If **no**, explain why you would give up that advantage and how you would draw the lines instead. If **yes**, explain why helping your party win justifies the effect on voters. Use one move you made in *GerryMander* to support your answer.');
const tools=fs.readFileSync(path.join(root,'course-tools.html'),'utf8');
for(const id of ['exit-ticket-form','exit-period','exit-student','exit-response','exit-question','exit-status','exit-ticket-success']) assert(tools.includes('id="'+id+'"'));
function checkHeaders(directory) {
 for(const entry of fs.readdirSync(directory,{withFileTypes:true})) {
  if(entry.name==='slides'||entry.name==='.git')continue;
  const filename=path.join(directory,entry.name);
  if(entry.isDirectory())checkHeaders(filename);
  else if(filename.endsWith('.html')) {
   const html=fs.readFileSync(filename,'utf8');
   if(/http-equiv=["']refresh/i.test(html))continue;
   assert(/src=["'][^"']*course-header\.js/.test(html), filename+' must load the shared header');
   assert(/href=["'][^"']*course-header\.css/.test(html), filename+' must load shared header styles');
  }
 }
}
checkHeaders(root);
console.log('All course pages load the shared header; lesson 2.1 resources and exit-ticket contract are intact.');

for (const filename of ['lesson-2-1.html','lesson-2-2.html']) {
 const html=fs.readFileSync(path.join(root,filename),'utf8');
 const main=html.slice(html.indexOf('<main'),html.indexOf('</main>'));
 assert(!main.includes('exit-ticket'), 'Exit tickets must remain course-wide, outside '+filename+' lesson content');
}
