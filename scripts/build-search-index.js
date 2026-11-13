/* Rebuild after changing lesson titles, resources, readers, or glossary data. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root,'glossary-data.js'),'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root,'course-data.js'),'utf8'), context);
const decode = text => text.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&#(?:39|x27);/g,"'").replace(/&(?:nbsp|#160);/g,' ').replace(/\s+/g,' ').trim();
const entries = [];
for (const file of fs.readdirSync(root).filter(name => /^lesson-[12]-\d\.html$/.test(name))) {
 const html = fs.readFileSync(path.join(root,file),'utf8');
 const title = decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || file);
 const number = file.match(/lesson-(\d)-(\d)/).slice(1).join('.');
 entries.push({type:'Lesson',title:number+' · '+title,url:file,detail:decode(html.match(/<p class="eq">([\s\S]*?)<\/p>/)?.[1] || '')});
 const unit = context.window.COURSE_DATA.units.find(unit => unit.id === 'gov-' + number[0]);
 const resources = [...(unit.resources || []), ...Object.values(unit.lessonResources || {}).flat()];
 // Index the actual cards on each lesson, not archived or unassigned resources.
 const ids = new Set([...html.matchAll(/data-resource-id="([^"]+)"/g)].map(match => match[1]));
 for (const id of ids) {
  const resource = resources.find(item => item.id === id);
  if (!resource || !resource.url) throw Error('Missing lesson resource: ' + id);
  entries.push({type:'Resource', title:number+' · '+resource.title.replace(/^[12]\.\d\s+/, ''), url:resource.url,
   detail:[title,resource.note,resource.group].filter(Boolean).join(' · '),
   resourceId:id,unitId:unit.id,lesson:number,
   releaseControlled:unit.id==='gov-1'||resource.category==='concept-practice'||id==='u2-21-22-concept-practice'});
 }

}
for (const [folder,type] of [['cases','Case'],['docs','Document']]) {
 for (const file of fs.readdirSync(path.join(root,folder)).filter(name=>name.endsWith('.html'))) {
  const html=fs.readFileSync(path.join(root,folder,file),'utf8');
  const title=decode((html.match(/<title>(.*?)<\/title>/i)?.[1] || file).split('—')[0]);
  entries.push({type,title,url:folder+'/'+file,detail:type==='Case'?'Supreme Court case guide':'Foundational document reader'});
 }
}
const terms = new Map();
for (const unit of context.window.APG_GLOSSARY_UNITS) for (const group of Object.values(unit.groups)) for (const [title,detail] of group) {
 if (!terms.has(title.toLowerCase())) terms.set(title.toLowerCase(),{type:'Term',title,detail,url:'course-tools.html?glossary='+encodeURIComponent(title)+'#words'});
}
entries.push(...terms.values());
const output = JSON.stringify(entries,null,2)+'\n';
if (process.argv.includes('--check')) {
 if(fs.readFileSync(path.join(root,'search-index.json'),'utf8')!==output) throw Error('Search index is stale. Run node scripts/build-search-index.js');
 for(const entry of entries) if(!/^https?:\/\//.test(entry.url) && !fs.existsSync(path.join(root,entry.url.split(/[?#]/)[0]))) throw Error('Missing search destination: '+entry.url);
 for(const title of ['Baker v. Carr','Federalist','2.2','Federalism']) if(!entries.some(entry=>entry.title.toLowerCase().includes(title.toLowerCase()))) throw Error('Missing search coverage: '+title);
} else fs.writeFileSync(path.join(root,'search-index.json'),output);
console.log(`Search index: ${entries.length} entries`);
