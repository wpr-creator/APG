'use strict';

// This calendar promises AP Government relevance, not general U.S. history.
// An entry must describe a government action, constitutional development,
// election/participation event, rights-policy change, or institutional conflict.
const directGovernmentPattern = /\b(constitution(?:al)?|amendment|ratif(?:y|ied|ication)|supreme court|court (?:ruled|decided|held|struck down|upheld)|judicial review|congress|senate|house of representatives|president\w*[^;:]{0,120}\b(?:sign(?:s|ed)|veto(?:es|ed)|issu(?:es|ed)|order(?:s|ed)|nominat(?:es|ed)|appoint(?:s|ed)|address(?:es|ed)|declar(?:es|ed)|resign(?:s|ed)|is inaugurated|was inaugurated|takes office|took office|is elected|was elected|announc(?:es|ed)|authoriz(?:es|ed)|recogniz(?:es|ed)|deliver(?:s|ed)|pardon(?:s|ed)|commut(?:es|ed)|reliev(?:es|ed)|visit(?:s|ed)|meets with|met with|admit(?:s|ted))|governor\w*[^;:]{0,100}\b(?:sign(?:s|ed)|veto(?:es|ed)|issu(?:es|ed)|order(?:s|ed)|is elected|was elected|appoint(?:s|ed)|resign(?:s|ed))|executive order|impeach(?:ed|ment)?|election|elected|electoral college|vote|voting|voter|right to vote|suffrage|civil rights|civil liberties|equal protection|due process|segregat(?:e|ed|ion)|desegregat(?:e|ed|ion)|federal (?:law|government|authorities|employees|funding|common law|agency)|legislation|statute|signed into law|becomes law|goes into effect|treaty|statehood|admitted as the \d+(?:st|nd|rd|th) state|federal reserve|department of|secretary of|cabinet member|bureaucracy|political party|political convention|campaign finance|redistricting|gerrymander|public opinion|watergate|lewinsky scandal|prohibition|protest|boycott|sit-in|march on washington|declaration of independence|articles of confederation)\b/i;

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
