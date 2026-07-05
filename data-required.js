// ═══════════════════════════════════════════════════════════════════
// CANONICAL SOURCE OF TRUTH — Required Docs & Cases
// ═══════════════════════════════════════════════════════════════════
// This file replaces the scattered copies of this same information
// that currently live in: nav dropdowns (repeated on ~20 pages),
// unit*-docs.html / unit*-cases.html card grids, data-core.js
// key_docs/key_cases arrays, and content.json key_docs/key_cases.
//
// STATUS: Step 1 only — this is the extracted data, built from what's
// currently live on the site. Nothing else has been wired to read
// from this yet. Nothing on the live site changes until nav-render.js
// and the card renderer (step 2) are built and one page is swapped
// over and tested.
//
// HOW TO ADD/REMOVE A REQUIRED DOC OR CASE (once wired in):
// Edit ONE entry below. It will then automatically appear/disappear
// in: every page's nav dropdown, the relevant unit's landing page
// card grid, the landing page's "X required documents" count, and
// the unit overview page's key_docs/key_cases chips.
// ═══════════════════════════════════════════════════════════════════

const REQUIRED_DOCS = [
  {
    id: "declaration",
    title: "Declaration of Independence",
    navLabel: "Declaration of Independence",
    author: "Jefferson",
    year: "1776",
    unit: 1,
    icon: "🦅",
    file: "docs/declaration-of-independence.html",
    blurb: "Natural rights, social contract, right of revolution. The philosophical foundation of the American republic — and a legal case for independence built on 27 specific grievances."
  },
  {
    id: "articles",
    title: "Articles of Confederation",
    navLabel: "Articles of Confederation",
    author: "Continental Congress",
    year: "1781",
    unit: 1,
    icon: "📜",
    file: "docs/articles-of-confederation.html",
    blurb: "America's first constitution — and a cautionary tale. No power to tax, no executive, no courts. Know what it could NOT do as much as what it could."
  },
  {
    id: "constitution",
    title: "U.S. Constitution",
    navLabel: "U.S. Constitution",
    author: "Constitutional Convention",
    year: "1787",
    unit: 1,
    icon: "⚖️",
    file: "docs/constitution.html",
    blurb: "Required portions only: Preamble, Articles I–III, Supremacy Clause, N&P Clause, key amendments. Every clause that generated a landmark case."
  },
  {
    id: "fed10",
    title: "Federalist No. 10",
    navLabel: "Federalist No. 10",
    author: "Madison",
    year: "1787",
    tag: "⭐ Most Tested",
    unit: 1,
    icon: "✍️",
    file: "docs/federalist-10.html",
    blurb: "Factions are inevitable in a free society — but a large republic with many competing interests prevents any one faction from dominating. The origin of American pluralism."
  },
  {
    id: "fed51",
    title: "Federalist No. 51",
    navLabel: "Federalist No. 51",
    author: "Madison",
    year: "1788",
    tag: "⭐ Most Tested",
    unit: 1,
    icon: "✍️",
    file: "docs/federalist-51.html",
    blurb: "\"Ambition must counteract ambition.\" \"If men were angels, no government would be necessary.\" The definitive defense of separation of powers and checks and balances."
  },
  {
    id: "brutus1",
    title: "Brutus No. 1",
    navLabel: "Brutus No. 1",
    author: "Yates (attr.)",
    year: "1787",
    tag: "Anti-Federalist",
    unit: 1,
    icon: "⚡",
    file: "docs/brutus-1.html",
    blurb: "The N&P and Supremacy Clauses will give the federal government unlimited power to destroy the states. The best counterargument to Madison — and he was right about a lot of it."
  },
  {
    id: "fed39",
    title: "Federalist No. 39",
    navLabel: "Federalist No. 39",
    author: "Madison",
    year: "1788",
    unit: 1,
    icon: "✍️",
    file: "docs/federalist-39.html",
    blurb: "Is the new government national or federal? Madison's answer: both — a compound republic, partly national and partly federal in its foundation, powers, and operation."
  },
  {
    id: "wealth-of-nations",
    title: "The Wealth of Nations",
    navLabel: "Wealth of Nations",
    author: "Adam Smith",
    year: "1776",
    unit: 1,
    icon: "💰",
    file: "docs/wealth-of-nations.html",
    blurb: "The \"invisible hand,\" free markets, and self-interest as the engine of prosperity. The economic philosophy underpinning the Framers' vision of limited government."
  },
  {
    id: "fed70",
    title: "Federalist No. 70",
    navLabel: "Federalist No. 70",
    author: "Hamilton",
    year: "1788",
    unit: 2,
    icon: "⚡",
    file: "docs/federalist-70.html",
    blurb: "Energy in the executive is essential to good government. Hamilton defends a single, unified presidency — one person means clear accountability, decisive action, and no buck-passing."
  },
  {
    id: "fed78",
    title: "Federalist No. 78",
    navLabel: "Federalist No. 78",
    author: "Hamilton",
    year: "1788",
    tag: "⭐ Most Tested",
    unit: 2,
    icon: "🏛️",
    file: "docs/federalist-78.html",
    blurb: "Courts have neither force nor will — only judgment. Hamilton anticipates judicial review and defends life tenure as essential to protecting constitutional rights from temporary majorities."
  },
  {
    id: "emancipation",
    title: "Emancipation Proclamation",
    navLabel: "Emancipation Proclamation",
    author: "Lincoln",
    year: "January 1, 1863",
    unit: 3,
    icon: "📜",
    file: "docs/emancipation-proclamation.html",
    blurb: "Issued under commander-in-chief authority — freed enslaved people in Confederate states only. Know what it did AND what it didn't do. Set the stage for the 13th Amendment."
  },
  {
    id: "birmingham",
    title: "Letter from Birmingham Jail",
    navLabel: "Letter from Birmingham Jail",
    author: "Dr. Martin Luther King Jr.",
    year: "April 16, 1963",
    unit: 3,
    icon: "✉️",
    file: "docs/letter-birmingham-jail.html",
    blurb: "Written from jail in response to white clergy calling protests \"unwise and untimely.\" The most precisely argued defense of civil disobedience ever written. Read it as argument."
  },
  {
    id: "gettysburg",
    title: "The Gettysburg Address",
    navLabel: "Gettysburg Address",
    author: "Lincoln",
    year: "November 19, 1863",
    unit: 3,
    icon: "🎖️",
    file: "docs/gettysburg-address.html",
    blurb: "Two minutes, 272 words. Reframes the Civil War as a test of whether a nation \"conceived in liberty\" and dedicated to equality can endure — and redefines the Declaration as the nation's founding promise."
  }
];

const REQUIRED_CASES = [
  {
    id: "marbury",
    title: "Marbury v. Madison",
    year: "1803",
    unit: 2,
    tag: "Judicial Review",
    file: "cases/marbury-v-madison.html",
    question: "Does the Supreme Court have power to void acts of Congress that conflict with the Constitution?",
    holding: "Yes — Marshall established judicial review. The most important case in American legal history."
  },
  {
    id: "mcculloch",
    title: "McCulloch v. Maryland",
    year: "1819",
    unit: 2,
    tag: "Implied Powers",
    file: "cases/mcculloch-v-maryland.html",
    question: "Can Congress charter a national bank, and can states tax it?",
    holding: "Yes Congress can (N&P Clause); No states cannot (Supremacy Clause). Two pillars of federal supremacy."
  },
  {
    id: "lopez",
    title: "U.S. v. Lopez",
    year: "1995",
    unit: 2,
    tag: "Commerce Clause",
    file: "cases/us-v-lopez.html",
    question: "Does the Gun-Free School Zones Act fall within Congress's Commerce Clause power?",
    holding: "No — first Commerce Clause limit in 60 years. Non-economic activity doesn't count."
  },
  {
    id: "schenck",
    title: "Schenck v. United States",
    year: "1919",
    unit: 3,
    tag: "1st Amend.",
    file: "cases/schenck-v-us.html",
    question: "Can government restrict speech creating a \"clear and present danger\"?",
    holding: "Yes — Holmes established the clear and present danger test. Anti-draft leaflets not protected."
  },
  {
    id: "engel",
    title: "Engel v. Vitale",
    year: "1962",
    unit: 3,
    tag: "Est. Clause",
    file: "cases/engel-v-vitale.html",
    question: "Does state-sponsored prayer in public schools violate the Establishment Clause?",
    holding: "Yes — even a voluntary, non-denominational state-written prayer crosses the line."
  },
  {
    id: "gideon",
    title: "Gideon v. Wainwright",
    year: "1963",
    unit: 3,
    tag: "6th Amend.",
    file: "cases/gideon-v-wainwright.html",
    question: "Must states provide a lawyer to felony defendants who can't afford one?",
    holding: "Yes — Gideon's handwritten appeal won unanimously. Right to counsel is fundamental to a fair trial."
  },
  {
    id: "tinker",
    title: "Tinker v. Des Moines",
    year: "1969",
    unit: 3,
    tag: "1st Amend.",
    file: "cases/tinker-v-des-moines.html",
    question: "Do students shed their constitutional rights at the schoolhouse gate?",
    holding: "No — schools can only restrict speech causing \"substantial disruption.\" Silent armbands don't qualify."
  },
  {
    id: "nyt",
    title: "New York Times v. United States",
    year: "1971",
    unit: 3,
    tag: "1st Amend.",
    file: "cases/nyt-v-us.html",
    question: "Can government stop a newspaper from publishing the Pentagon Papers?",
    holding: "No — prior restraint is the most serious First Amendment violation. Government couldn't meet the burden."
  },
  {
    id: "yoder",
    title: "Wisconsin v. Yoder",
    year: "1972",
    unit: 3,
    tag: "Free Exercise",
    file: "cases/wisconsin-v-yoder.html",
    question: "Can the state compel Amish families to keep children in school past 8th grade?",
    holding: "No — compulsory education law violated the Free Exercise Clause. State interest didn't outweigh religious practice."
  },
  {
    id: "brown",
    title: "Brown v. Board of Education",
    year: "1954",
    unit: 3,
    tag: "Eq. Protection",
    file: "cases/brown-v-board.html",
    question: "Does racial segregation in public schools violate the Equal Protection Clause?",
    holding: "Yes — \"Separate but equal is inherently unequal.\" Unanimous. Overturned Plessy (1896)."
  },
  {
    id: "mcdonald",
    title: "McDonald v. City of Chicago",
    year: "2010",
    unit: 3,
    tag: "2nd & 14th",
    file: "cases/mcdonald-v-chicago.html",
    question: "Does the 2nd Amendment apply to state and local governments?",
    holding: "Yes — most recent major selective incorporation case. 2nd Amendment applies to all levels of government."
  },
  {
    id: "baker",
    title: "Baker v. Carr",
    year: "1962",
    unit: 5,
    tag: "Equal Protection",
    file: "cases/baker-v-carr.html",
    question: "Are legislative apportionment questions justiciable by federal courts?",
    holding: "Yes — \"one person, one vote\" begins here. Courts CAN review redistricting. Landmark for voting rights."
  },
  {
    id: "shaw",
    title: "Shaw v. Reno",
    year: "1993",
    unit: 5,
    tag: "Equal Protection",
    file: "cases/shaw-v-reno.html",
    question: "Can race be the predominant factor in drawing congressional district lines?",
    holding: "No — racial gerrymandering violates Equal Protection even when designed to help minority voters."
  },
  {
    id: "citizens-united",
    title: "Citizens United v. FEC",
    year: "2010",
    unit: 5,
    tag: "1st Amend.",
    file: "cases/citizens-united-v-fec.html",
    question: "Can Congress limit independent political expenditures by corporations?",
    holding: "No — political spending is protected speech. Opened the door to Super PACs. Most controversial campaign finance ruling."
  }
];

// Quick self-check helper — run in browser console after loading this
// file to confirm every doc/case count matches what the handoff doc says.
function _auditRequiredContent() {
  console.log("Docs by unit:", REQUIRED_DOCS.reduce((a, d) => (a[d.unit] = (a[d.unit] || 0) + 1, a), {}));
  console.log("Total docs:", REQUIRED_DOCS.length, "(expect 13)");
  console.log("Cases by unit:", REQUIRED_CASES.reduce((a, c) => (a[c.unit] = (a[c.unit] || 0) + 1, a), {}));
  console.log("Total cases:", REQUIRED_CASES.length, "(expect 14)");
}
