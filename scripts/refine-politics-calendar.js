#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { isDirectlyPolitical } = require('./calendar-relevance');
const { curatedEvents } = require('./calendar-curated-events');

const root = path.resolve(__dirname, '..');
const databaseFile = path.join(root, 'us-politics-events.json');
const database = JSON.parse(fs.readFileSync(databaseFile, 'utf8'));

const civicFocus = [
  ['Popular Sovereignty', 'Government authority comes from the people.', 1, 'Constitutional foundations'],
  ['Rule of Law', 'Public officials and citizens are bound by the law.', 1, 'Constitutional foundations'],
  ['Federalism', 'Power is divided between national and state governments.', 1, 'Federalism'],
  ['Separation of Powers', 'Government power is divided among legislative, executive, and judicial branches.', 1, 'Constitutional foundations'],
  ['Checks and Balances', 'Each branch has tools to limit the power of the others.', 1, 'Constitutional foundations'],
  ['Judicial Review', 'Courts may invalidate government actions that conflict with the Constitution.', 2, 'Judicial branch'],
  ['Congressional Oversight', 'Congress monitors executive agencies and implementation of federal law.', 2, 'Congress'],
  ['Executive Orders', 'Presidents direct executive-branch operations without passing a new statute.', 2, 'Presidency'],
  ['Bureaucratic Discretion', 'Agencies make choices about how laws and regulations are implemented.', 2, 'Bureaucracy'],
  ['Selective Incorporation', 'Most Bill of Rights protections apply to states through the Fourteenth Amendment.', 3, 'Civil liberties'],
  ['Due Process', 'Government must use fair procedures before depriving a person of life, liberty, or property.', 3, 'Civil liberties'],
  ['Equal Protection', 'States must provide equal protection of the laws.', 3, 'Civil rights'],
  ['Political Socialization', 'Families, schools, peers, and media shape political beliefs.', 4, 'Political beliefs'],
  ['Public Opinion', 'The public’s political attitudes influence elections and policymaking.', 4, 'Public opinion'],
  ['Linkage Institutions', 'Parties, elections, interest groups, and media connect people to government.', 5, 'Political participation'],
  ['Voter Turnout', 'Rules, resources, mobilization, and political interest affect participation.', 5, 'Elections'],
  ['Interest Groups', 'Organized groups seek to influence public policy without directly controlling government.', 5, 'Political participation'],
  ['Campaign Finance', 'Rules governing political money shape electoral competition and political speech.', 5, 'Elections'],
  ['Agenda Setting', 'Political institutions and media influence which issues receive public attention.', 5, 'Media'],
  ['Political Accountability', 'Elections, oversight, courts, and public scrutiny allow officials to be held responsible.', 5, 'Political participation']
];

function civicEntry(key) {
  const focus = civicFocus[Number(key.replace('-', '')) % civicFocus.length];
  return {
    year: null,
    text: 'Civic focus: ' + focus[0] + ' — ' + focus[1],
    ap_connection: 'Unit ' + focus[2] + '; ' + focus[3],
    unit: focus[2],
    category: focus[3],
    source_label: 'AP Government course glossary',
    source_url: '/APG/#glossary',
    kind: 'civic-focus'
  };
}

let removed = 0;
let fallbackDates = 0;
const refined = {};

Object.keys(database).sort().forEach(function (key) {
  const original = curatedEvents[key] || database[key] || [];
  const kept = original.filter(isDirectlyPolitical);
  removed += original.length - kept.length;
  if (!kept.length) {
    kept.push(civicEntry(key));
    fallbackDates += 1;
  }
  refined[key] = kept;
});

fs.writeFileSync(databaseFile, JSON.stringify(refined, null, 2) + '\n');
const total = Object.values(refined).flat().length;
console.log('Refined politics calendar:', total + ' entries,', removed + ' weak entries removed,', fallbackDates + ' civic-focus dates.');
