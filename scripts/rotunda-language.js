// Build-time, scoped language support. Runtime matching remains whole-answer matching.
const E=require('../rotunda-engine.js');
function applyAnswerLanguage(bank,language){
 const reviewed=new Set(language.reviewedLabels),groups=new Map();
 for(const p of bank)if(language.choiceQuestions?.includes(p.id))p.allowAmbiguous=true;
 const add=(list,value)=>{const n=E.normalize(value);if(n&&!list.some(v=>E.normalize(v)===n))list.push(value);};
 for(const p of bank)for(const a of p.answers){
  if(!reviewed.has(a.label))throw Error('Review everyday wording for new answer: '+a.label);
  const key=E.normalize(a.label);if(!groups.has(key))groups.set(key,[]);
  for(const v of [...language.aliases[a.label]||[],...language.personFirstNames[a.label]||[]])add(groups.get(key),v);
 }
 for(const p of bank)for(const a of p.answers){
  const original=a.aliases;a.aliases=[];for(const v of [...original,...groups.get(E.normalize(a.label))])add(a.aliases,v);
  if(/^trivia-states-/.test(p.id)){
   add(a.aliases,a.label+' state');for(const v of language.stateShortForms[a.label]||[])add(a.aliases,v);
  }
  // Only expand a reviewed abbreviation already attached to this exact answer.
  for(const v of [a.label,...a.aliases]){
   for(const token of v.match(/\b[A-Z]{2,6}\b/g)||[]){add(a.aliases,v.replace(token,token.split('').join('.')+'.'));add(a.aliases,v.replace(token,token.split('').join(' ')));}
   if(/\bu\.?\s?s\.?(?=\s|$)/i.test(v))for(const form of ['US','U.S.','United States'])add(a.aliases,v.replace(/\bu\.?\s?s\.?(?=\s|$)/ig,form));
  }
 }
 // Natural answer frames are valid only for the named actor and a reviewed action.
 // Never strip arbitrary words: "the president can tax" is not "Congress can tax".
 const actions={
  'Tax':['tax','collect taxes','raise taxes','lower taxes','levy taxes'],
  'Borrow money':['borrow money'], 'Coin money':['coin money','print money'],
  'Regulate interstate commerce':['regulate trade','regulate interstate commerce'],
  'Declare war':['declare war'], 'Raise and support armies':['raise armies','fund the military'],
  'Establish post offices':['establish post offices'], 'Provide and maintain a navy':['maintain a navy'],
  'Set naturalization rules':['set naturalization rules'], 'Set bankruptcy laws':['set bankruptcy laws'],
  'Protect inventions and writings':['grant patents','grant copyrights'],
  'Establish lower federal courts':['create federal courts'], 'Set weights and measures':['set weights and measures'],
  'Punish counterfeiting':['punish counterfeiting'], 'Make necessary and proper laws':['make necessary and proper laws'],
  'Regulate foreign commerce':['regulate foreign trade'], 'Regulate commerce with Indian tribes':['regulate tribal commerce'],
  'Punish piracy and offenses on the high seas':['punish piracy'],
  'Punish offenses against the law of nations':['punish violations of international law'],
  'Grant letters of marque and reprisal':['grant letters of marque'], 'Make rules concerning captures':['make rules concerning captures'],
  'Make rules for the armed forces':['make military rules'], 'Organize and call forth the militia':['call forth the militia'],
  'Govern the federal district':['govern Washington DC'], 'Spend for the general welfare':['spend money'],
  'Override a veto':['override a veto'], 'Power of the Purse':['control spending'], 'Oversight':['conduct oversight','hold hearings'],
  'Impeachment':['impeach the president','impeach officials'], 'Senate Confirmation':['confirm appointments','confirm judges'],
  'Consent to treaties':['approve treaties'], 'Pass laws':['make laws','pass laws'],
  'Veto a bill':['veto bills'], 'Sign a bill into law':['sign bills into law'], 'Lead the executive branch':['enforce laws'],
  'Command the armed forces':['command the military'], 'Nominate federal judges':['nominate judges'],
  'Nominate executive officials':['appoint cabinet members'], 'Negotiate treaties':['negotiate treaties'],
  'Grant federal pardons':['grant pardons'], 'Issue executive orders':['issue executive orders'],
  'Make executive agreements':['make executive agreements'], 'Recommend legislation':['recommend legislation'],
  'Give the State of the Union':['give the State of the Union'], 'Receive ambassadors':['receive ambassadors'],
  'Call Congress into special session':['call Congress into session']
 };
 for(const p of bank){
  const actor=['trivia-congress-powers','trivia-national-powers','trivia-article-i'].includes(p.id)?'Congress':
   ['trivia-presidential-duties','trivia-presidential-formal'].includes(p.id)?'the president':null;
  if(actor)for(const a of p.answers)for(const phrase of actions[a.label]||[]){add(a.aliases,actor+' can '+phrase);add(a.aliases,actor+' may '+phrase);add(a.aliases,actor+' has the power to '+phrase);add(a.aliases,'power to '+phrase);add(a.aliases,'can '+phrase);}
 }
 // Route overlapping concepts to the more precise answer rather than guessing.
 for(const p of bank)for(const [alias,target]of Object.entries(language.aliasTargets?.[p.id]||{})){
  if(!p.answers.some(a=>a.label===target))throw Error('Unknown alias target: '+p.id+' '+target);
  for(const a of p.answers)if(a.label!==target)a.aliases=a.aliases.filter(v=>E.normalize(v)!==E.normalize(alias));
 }
 // New shorthand for a real out-of-category person/state must not become a typo guess.
 const people=bank.find(p=>p.id==='trivia-presidents').answers;
 const surnameGroups=bank.find(p=>p.id==='trivia-presidents-two-names');
 for(const group of surnameGroups?.answers||[])for(const person of people.filter(a=>a.label.endsWith(' '+group.label))){
  const first=new Set((language.personFirstNames[person.label]||[]).map(E.normalize));
  for(const v of [person.label,...person.aliases])if(!first.has(E.normalize(v)))add(group.aliases,v);
 }
 const knownPresidents=people.flatMap(a=>[a.label,...a.aliases]);
 const knownStates=bank.filter(p=>/^trivia-states-/.test(p.id)).flatMap(p=>p.answers.flatMap(a=>[a.label,...a.aliases]));
 for(const p of bank)if(p.rejectedAnswers){
  const valid=new Set(p.answers.flatMap(a=>[a.label,...a.aliases]).map(E.normalize));
  const known=/^trivia-states-/.test(p.id)?knownStates:/^trivia-(presidents|first-five-presidents)/.test(p.id)?knownPresidents:[];
  const rejected=[];for(const v of [...p.rejectedAnswers,...known])if(!valid.has(E.normalize(v)))add(rejected,v);p.rejectedAnswers=rejected;
 }
 return bank;
}
module.exports={applyAnswerLanguage};
