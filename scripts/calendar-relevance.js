'use strict';

// This calendar promises AP Government relevance, not general U.S. history.
// An entry must describe a government action, constitutional development,
// election/participation event, rights-policy change, or institutional conflict.
const directGovernmentPattern = /\b(constitution(?:al)?|amendment|ratif(?:y|ied|ication)|supreme court|court (?:ruled|decided|held|struck down|upheld)|judicial review|congress|senate|house of representatives|president\w* (?:signed|vetoed|issued|ordered|nominated|appointed|addressed|declared|resigned|was inaugurated|took office|was elected)|governor\w* (?:signed|vetoed|issued|ordered|was elected)|executive order|impeach(?:ed|ment)?|election|elected|electoral college|vote|voting|voter|suffrage|civil rights|civil liberties|equal protection|due process|segregat(?:e|ed|ion)|desegregat(?:e|ed|ion)|federal law|legislation|statute|signed into law|treaty|statehood|admitted as the \d+(?:st|nd|rd|th) state|federal reserve|department of|federal agency|bureaucracy|political party|campaign finance|redistricting|gerrymander|public opinion|protest|boycott|sit-in|march on washington|declaration of independence|articles of confederation)\b/i;

// Military events qualify only when the description itself contains a direct
// institutional decision or rights question. A battle happening in American
// history is not enough.
const militaryNarrativePattern = /\b(battle|combat|army|navy|marines?|troops|military forces|invasion|invades?|bomb(?:ed|ing)?|sinks?|captures?|surrenders?|siege|offensive|airstrike|warship|confederate-held|union forces)\b/i;
const conflictGovernmentActionPattern = /\b(congress (?:declared war|authorized|passed|approved|voted)|war powers|president\w* (?:ordered|authorized|signed|vetoed|issued|addressed|declared)|executive order|supreme court|court (?:ruled|decided|held)|civil liberties|civil rights|internment|habeas corpus|treaty|secession|votes? not to secede|draft law|selective service)\b/i;

function isDirectlyPolitical(event) {
  if (!event || !event.text) return false;
  if (event.kind === 'civic-focus') return true;
  if (event.kind === 'birth' || event.kind === 'death') return false;

  const text = String(event.text);
  if (!directGovernmentPattern.test(text)) return false;
  if (militaryNarrativePattern.test(text) && !conflictGovernmentActionPattern.test(text)) return false;
  return true;
}

module.exports = { isDirectlyPolitical };
