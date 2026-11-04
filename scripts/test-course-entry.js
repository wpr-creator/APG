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
for (const route of ['exit-ticket','election-2026','foundations','presidents']) {
  assert.equal(redirect('index.html#'+route), 'https://example.test/APG/course-tools.html#'+route);
}
assert.equal(redirect('index.html?unit=2#words'), 'https://example.test/APG/course-tools.html?unit=2#words');
assert.equal(redirect('index.html#units'), 'https://example.test/APG/units.html');
assert.equal(redirect('index.html#gov-1'), 'https://example.test/APG/unit1.html');
for(let n=1;n<=5;n++){
 assert.equal(redirect('index.html?lesson=lesson-1.'+n+'#gov-1'), 'https://example.test/APG/lesson-1-'+n+'.html');
 assert.equal(redirect('index.html?lesson=lesson-u1-10'+n+'-guided-notes#gov-1'), 'https://example.test/APG/lesson-1-'+n+'.html');
}
assert.equal(redirect('index.html#gov-2'), 'https://example.test/APG/unit2.html');
assert.equal(redirect('index.html?lesson=lesson-2.2#gov-2'), 'https://example.test/APG/lesson-2-2.html');
assert.equal(redirect('index.html?lesson=unit2-concept-practice#gov-2'), 'https://example.test/APG/lesson-2-1.html');
const lesson21 = fs.readFileSync(path.join(root, 'lesson-2-1.html'), 'utf8');
assert(lesson21.includes('How does the structure of Congress shape the way national policy is made?'));
for (const id of ['u2-201-guided-notes','u2-201-lesson-slides','u2-201-congress-key','u2-201-bill-to-law-notes','u2-201-follow-the-money-notes','u2-21-22-concept-practice']) assert(lesson21.includes('data-resource-id="'+id+'"'));
const lesson = fs.readFileSync(path.join(root, 'lesson-2-2.html'), 'utf8');
assert(lesson.includes('How do districts and political pressures shape representation in Congress?'));
for (const filename of ['index.html','units.html','unit1.html','unit2.html','lesson-1-1.html','lesson-1-2.html','lesson-1-3.html','lesson-1-4.html','lesson-1-5.html','lesson-2-1.html','lesson-2-2.html']) {
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

for (const filename of ['lesson-1-1.html','lesson-1-2.html','lesson-1-3.html','lesson-1-4.html','lesson-1-5.html','lesson-2-1.html','lesson-2-2.html']) {
 const html=fs.readFileSync(path.join(root,filename),'utf8');
 const main=html.slice(html.indexOf('<main'),html.indexOf('</main>'));
 assert(!main.includes('exit-ticket'), 'Exit tickets must remain course-wide, outside '+filename+' lesson content');
}

const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'course-data.js'),'utf8'),context);
const unit1=context.window.COURSE_DATA.units.find(unit=>unit.id==='gov-1');
for(const [number] of unit1.lessonTitles){
 const html=fs.readFileSync(path.join(root,'lesson-'+number.replace('.','-')+'.html'),'utf8');
 for(const resource of unit1.lessonResources[number]){
  assert(html.includes('data-resource-id="'+resource.id+'"'),resource.id+' must remain accessible in its lesson');
  assert(html.includes(resource.url.replaceAll('&','&amp;')),resource.id+' must retain its source URL');
 }
 assert(!html.includes('Your lesson materials, ready for class.'),'Remove lesson filler text.');
}
const unit1Page=fs.readFileSync(path.join(root,'unit1.html'),'utf8');
for(const resource of unit1.resources.filter(item=>item.lesson==='CONCEPT PRACTICE'))assert(unit1Page.includes(resource.id));
const archive=fs.readFileSync(path.join(root,'unit1-reference.html'),'utf8');
for(const anchor of ['concepts','documents','amendments','examguide','frq'])assert(archive.includes('id="'+anchor+'"'));
console.log('Unit 1 migration tests passed: all lesson resources, practice sets, archived references, and legacy lesson routes preserved.');

const essentialQuestions=JSON.parse(fs.readFileSync(path.join(root,'lesson-essential-questions.json'),'utf8'));
for(const [number,source] of Object.entries(essentialQuestions)){
 const html=fs.readFileSync(path.join(root,'lesson-'+number.replace('.','-')+'.html'),'utf8');
 assert(html.includes('<p class="eq">'+source.question+'</p>'),number+' must show its exact guided-notes EQ.');
 assert(html.indexOf('<p class="eq">')>html.indexOf('<h1'),number+' EQ must follow the lesson title.');
 assert(html.indexOf('<p class="eq">')<html.indexOf('<nav class="primary-materials"'),number+' EQ must be in the opening.');
 assert(html.includes(source.source),number+' must retain its source notes link.');
}
console.log('All seven lesson pages show source-verified essential questions beneath their titles.');

const homepage=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(!fs.readFileSync(path.join(root,'app.js'),'utf8').includes('guide-ballot-cta'),'Move the ballot rather than duplicating it in the guide.');
