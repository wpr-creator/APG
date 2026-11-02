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
assert.equal(redirect('index.html?lesson=unit2-concept-practice#gov-2'), 'https://example.test/APG/course-tools.html?lesson=unit2-concept-practice#gov-2');
const lesson = fs.readFileSync(path.join(root, 'lesson-2-2.html'), 'utf8');
assert(lesson.includes('How do districts and political pressures shape representation in Congress?'));
for (const filename of ['index.html','units.html','unit2.html','lesson-2-2.html']) {
 const html=fs.readFileSync(path.join(root,filename),'utf8');
 assert(!/design-preview|DESIGN PREVIEW/.test(html), filename+' must use canonical navigation');
 assert(html.includes('class="preview-exit"'), filename+' must retain the exit ticket shortcut');
}
console.log('Canonical course entry tests passed: bookmarks, lesson routing, exact EQ, and navigation.');
