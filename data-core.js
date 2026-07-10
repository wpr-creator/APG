// ════════════════════════════════════════════════════
// data-core.js — AP Gov Site: Core Data & Site Engine
// O'Farrell High School · 2026-27
// ════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════
// apgov-data.js -- AP Government & Politics Site Data
// O'Farrell High School · 2026-27
//
// ADD A SCOTUS CASE: find SCOTUS_CASES array, add an object
// ADD A GLOSSARY TERM: find GLOSSARY_UNITS, add to right group  
// ADD AN FRQ PROMPT: find FRQ_PROMPTS array, add an object
// ADD A DIAGNOSTIC Q: find DIAG_QUESTIONS array, add an object
// ════════════════════════════════════════════════════════════════

const SCOTUS_CASES = [
  {
    name: "Marbury v. Madison", year: 1803, unit: 2,
    issue: "Can the Supreme Court declare an act of Congress unconstitutional?",
    ruling: "Yes. Chief Justice Marshall established the doctrine of judicial review.",
    sig: "Established judicial review -- the Court's power to strike down laws that violate the Constitution. Foundation of the entire federal court system's role.",
    tip: "Know this cold. Any FRQ about the judiciary, separation of powers, or checks and balances will likely test judicial review."
  },
  {
    name: "McCulloch v. Maryland", year: 1819, unit: 2,
    issue: "Does Congress have the power to create a national bank? Can states tax federal institutions?",
    ruling: "Yes and no. Congress has implied powers; states cannot tax federal government.",
    sig: "Established implied powers via the Necessary & Proper Clause and federal supremacy over the states.",
    tip: "Connect to Federalist No. 51 and the Supremacy Clause. Classic federalism FRQ case."
  },
  {
    name: "Schenck v. United States", year: 1919, unit: 3,
    issue: "Can the government limit speech during wartime?",
    ruling: "Yes. Speech creating a 'clear and present danger' can be restricted.",
    sig: "Established the 'clear and present danger' test for limiting First Amendment rights.",
    tip: "Contrast with Tinker v. Des Moines to show how speech protections have evolved."
  },
  {
    name: "Brown v. Board of Education", year: 1954, unit: 3,
    issue: "Does racial segregation in public schools violate the Equal Protection Clause?",
    ruling: "Yes. Unanimous decision overturning Plessy v. Ferguson's 'separate but equal' doctrine.",
    sig: "Landmark civil rights ruling. Used the 14th Amendment's Equal Protection Clause to end de jure school segregation.",
    tip: "Know that it overruled Plessy (1896). Often paired with civil rights FRQs and the 14th Amendment."
  },
  {
    name: "Engel v. Vitale", year: 1962, unit: 3,
    issue: "Does state-sponsored prayer in public schools violate the Establishment Clause?",
    ruling: "Yes. Even nondenominational government-composed prayer violates the First Amendment.",
    sig: "Landmark Establishment Clause ruling separating government from religion in public schools.",
    tip: "Know the difference between Establishment Clause (Engel) and Free Exercise Clause cases."
  },
  {
    name: "Baker v. Carr", year: 1962, unit: 5,
    issue: "Are legislative apportionment disputes justiciable (can courts rule on them)?",
    ruling: "Yes. The Court held that redistricting cases are justiciable under the Equal Protection Clause.",
    sig: "Opened the door for courts to rule on redistricting. Led to 'one person, one vote' principle.",
    tip: "Pair with Shaw v. Reno. Both deal with redistricting -- Baker opened courts to it, Shaw addressed racial gerrymandering."
  },
  {
    name: "Gideon v. Wainwright", year: 1963, unit: 3,
    issue: "Does the 6th Amendment right to counsel apply to state criminal trials?",
    ruling: "Yes. States must provide an attorney to defendants who cannot afford one.",
    sig: "Key selective incorporation case -- applied the right to counsel to the states via the 14th Amendment.",
    tip: "Example of selective incorporation. Connect to Mapp v. Ohio and Miranda for a pattern of 1960s rights expansion."
  },
  {
    name: "Tinker v. Des Moines", year: 1969, unit: 3,
    issue: "Can schools prohibit students from wearing black armbands to protest the Vietnam War?",
    ruling: "No. Students do not 'shed their constitutional rights at the schoolhouse gate.'",
    sig: "Established that students retain First Amendment rights in school unless speech causes 'substantial disruption.'",
    tip: "High-frequency case. Know the 'substantial disruption' test. Contrast with Bethel School District v. Fraser."
  },
  {
    name: "New York Times v. United States", year: 1971, unit: 3,
    issue: "Can the government prevent the press from publishing the Pentagon Papers?",
    ruling: "No. Prior restraint requires an extremely heavy burden of justification. Press prevailed.",
    sig: "Reaffirmed freedom of the press and the near-absolute ban on prior restraint of publication.",
    tip: "Know 'prior restraint' -- the government stopping publication before it happens. This case rejected it."
  },
  {
    name: "Wisconsin v. Yoder", year: 1972, unit: 3,
    issue: "Can states compel Amish children to attend school beyond 8th grade?",
    ruling: "No. The Free Exercise Clause protects Amish families from compulsory school attendance laws.",
    sig: "Major Free Exercise Clause ruling balancing religious freedom against state interest in education.",
    tip: "Contrast with Engel v. Vitale (Establishment) -- Yoder is a Free Exercise case where religion wins."
  },
  {
    name: "Shaw v. Reno", year: 1993, unit: 5,
    issue: "Can states draw oddly shaped legislative districts solely to create majority-minority districts?",
    ruling: "Such districts can be challenged under the Equal Protection Clause if race is the predominant factor.",
    sig: "Limited racial gerrymandering. While the Voting Rights Act permits some race-consciousness, race cannot be the sole factor.",
    tip: "Pair with Baker v. Carr. Shaw addresses racial gerrymandering -- know the difference between political and racial gerrymandering."
  },
  {
    name: "U.S. v. Lopez", year: 1995, unit: 2,
    issue: "Did Congress exceed its Commerce Clause power by banning guns near schools?",
    ruling: "Yes. The Gun-Free School Zones Act exceeded Congressional commerce power.",
    sig: "First major case in decades to limit Congress's Commerce Clause power, signaling a new federalism.",
    tip: "Shows limits on federal power. Contrast with McCulloch (broad federal power) -- shows the tension in federalism."
  },
  {
    name: "McDonald v. City of Chicago", year: 2010, unit: 3,
    issue: "Does the 2nd Amendment apply to state and local governments?",
    ruling: "Yes. The 2nd Amendment is incorporated against the states through the 14th Amendment.",
    sig: "Extended D.C. v. Heller (2008) to states via selective incorporation. Individuals have the right to keep arms for self-defense at home.",
    tip: "Another selective incorporation case -- the 2nd Amendment applied to states via the 14th. Connect to the incorporation doctrine."
  },
  {
    name: "Citizens United v. FEC", year: 2010, unit: 5,
    issue: "Can the government limit independent political expenditures by corporations and other groups?",
    ruling: "No. Political spending by corporations is a form of protected speech under the 1st Amendment.",
    sig: "Opened the door to unlimited 'outside spending' in elections and the rise of Super PACs.",
    tip: "Major campaign finance case. Know the connection to Super PACs, dark money, and the debate over money as speech."
  }
];

// ══════════════════════════════════════════════════════════
//  DATA: REQUIRED FOUNDATIONAL DOCUMENTS
// ══════════════════════════════════════════════════════════
const REQ_DOCS = [
  { name: "Declaration of Independence", type: "Historical Document", year: "1776" },
  { name: "Articles of Confederation", type: "Historical Document", year: "1777" },
  { name: "U.S. Constitution", type: "Founding Document", year: "1787" },
  { name: "Federalist No. 10", type: "Federalist Paper", year: "1787" },
  { name: "Brutus No. 1", type: "Anti-Federalist", year: "1787" },
  { name: "Federalist No. 51", type: "Federalist Paper", year: "1788" },
  { name: "Federalist No. 70", type: "Federalist Paper", year: "1788" },
  { name: "Emancipation Proclamation", type: "Executive Order", year: "1863" },
  { name: "Federalist No. 39", type: "Federalist Paper", year: "1788" },
  { name: "The Gettysburg Address", type: "Speech", year: "1863" },
  { name: "Adam Smith -- The Wealth of Nations (Core Principles)", type: "Economic Text", year: "1776" },
  { name: "Letter from Birmingham Jail", type: "Historical Document", year: "1963" }
];

// ══════════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════════
let contentData = null;
// TDIH ("This Day in Politics") state now lives entirely in the
// local-database script at the bottom of index.html.
let vocabIndex = 0;
let caseFilter = 'all';

// Fallback copy of content.json so the page does not stay stuck on Loading if content.json fails to fetch.
const DEFAULT_CONTENT = {
  "current_unit": "Unit 3: Civil Liberties & Civil Rights",
  "week": "Week of June 23",
  "periods": [
    {
      "id": "2A",
      "label": "Period 2A",
      "students": []
    },
    {
      "id": "2B",
      "label": "Period 2B",
      "students": []
    }
  ],
  "exit_ticket": "In your own words, explain the significance of Tinker v. Des Moines. How does it affect students today?",
  "materials": [
    {
      "title": "Unit 3 Slides -- 1st Amendment",
      "type": "slides",
      "url": "https://docs.google.com/presentation",
      "date": "Jun 20"
    },
    {
      "title": "Due Process Study Guide",
      "type": "doc",
      "url": "https://docs.google.com/document",
      "date": "Jun 18"
    },
    {
      "title": "Khan Academy -- Civil Rights Overview",
      "type": "video",
      "url": "https://khanacademy.org",
      "date": "Jun 17"
    },
    {
      "title": "FRQ Practice -- Unit 2 Answer Key",
      "type": "doc",
      "url": "https://docs.google.com/document",
      "date": "Jun 14"
    }
  ],
  "upcoming": [
    {
      "title": "Unit 3 Quiz",
      "date": "Jun 27"
    },
    {
      "title": "FRQ -- Argumentative Essay",
      "date": "Jul 1"
    },
    {
      "title": "Unit 4 Begins",
      "date": "Jul 7"
    }
  ],
  "key_links": [
    {
      "title": "AP Classroom",
      "url": "https://myap.collegeboard.org",
      "icon": "ti-school"
    },
    {
      "title": "Google Classroom",
      "url": "https://classroom.google.com",
      "icon": "ti-brand-google"
    }
  ],
  "units": [
    {
      "number": 1,
      "title": "Foundations of American Democracy",
      "weight": "15-22%",
      "topics": [
        "Principles of American Democracy",
        "Articles of Confederation & Constitutional Convention",
        "Compromises of the Constitution",
        "Federalism & Its Evolution",
        "Separation of Powers & Checks and Balances",
        "American Political Values & Culture"
      ],
      "key_cases": [],
      "key_docs": [
        "Declaration of Independence",
        "Articles of Confederation",
        "U.S. Constitution",
        "Federalist No. 10",
        "Federalist No. 51",
        "Brutus No. 1"
      ]
    },
    {
      "number": 2,
      "title": "Interactions Among Branches of Government",
      "weight": "25-36%",
      "topics": [
        "Congress: Structure, Powers & Process",
        "The Presidency: Powers, Roles & Limits",
        "The Federal Bureaucracy",
        "The Federal Courts & Judicial Review",
        "Checks & Balances in Action"
      ],
      "key_cases": [
        "Marbury v. Madison (1803)",
        "McCulloch v. Maryland (1819)",
        "U.S. v. Nixon (1974)",
        "Clinton v. City of New York (1998)"
      ],
      "key_docs": [
        "Federalist No. 70",
        "Federalist No. 78"
      ]
    },
    {
      "number": 3,
      "title": "Civil Liberties & Civil Rights",
      "weight": "13-18%",
      "topics": [
        "First Amendment Freedoms",
        "Second Amendment & Gun Rights Debate",
        "Due Process & Rights of the Accused",
        "Privacy Rights",
        "Equal Protection & Civil Rights Movement",
        "Affirmative Action Debate"
      ],
      "key_cases": [
        "Schenck v. U.S. (1919)",
        "Engel v. Vitale (1962)",
        "Tinker v. Des Moines (1969)",
        "New York Times v. U.S. (1971)",
        "Wisconsin v. Yoder (1972)",
        "McDonald v. Chicago (2010)",
        "Gideon v. Wainwright (1963)",
        "Miranda v. Arizona (1966)",
        "Mapp v. Ohio (1961)",
        "Brown v. Board of Education (1954)"
      ],
      "key_docs": []
    },
    {
      "number": 4,
      "title": "American Political Ideologies & Beliefs",
      "weight": "10-15%",
      "topics": [
        "American Political Culture",
        "Political Socialization",
        "Public Opinion & Polling",
        "Liberal vs. Conservative Ideology",
        "The Political Spectrum"
      ],
      "key_cases": [],
      "key_docs": []
    },
    {
      "number": 5,
      "title": "Political Participation",
      "weight": "20-27%",
      "topics": [
        "Political Parties: Structure & Function",
        "Party Realignment & Third Parties",
        "Interest Groups & PACs",
        "Elections & Electoral College",
        "Campaign Finance (Citizens United)",
        "Voting Rights & Voter Participation",
        "The Media & Its Political Role",
        "Social Media & Political Engagement"
      ],
      "key_cases": [
        "Baker v. Carr (1962)",
        "Shaw v. Reno (1993)",
        "Citizens United v. FEC (2010)"
      ],
      "key_docs": []
    }
  ],
  "frq_types": [
    {
      "type": "Concept Application",
      "points": 3,
      "tips": [
        "Describe the scenario in your own words first",
        "Apply the specific concept named in the prompt",
        "Connect back to the specific scenario -- always bring it home"
      ]
    },
    {
      "type": "Quantitative Analysis",
      "points": 4,
      "tips": [
        "Read the data source and title carefully",
        "Describe the data accurately -- do not interpret yet",
        "Draw a connection to a course concept",
        "Use evidence from the data to support your conclusion"
      ]
    },
    {
      "type": "SCOTUS Comparison",
      "points": 4,
      "tips": [
        "Identify the constitutional principle at stake in the required case",
        "Describe the ruling AND the reasoning",
        "Compare to the non-required case -- similarities AND differences",
        "Apply the reasoning to a new scenario if asked"
      ]
    },
    {
      "type": "Argumentative Essay",
      "points": 6,
      "tips": [
        "State a defensible claim -- take a clear position",
        "Use at least ONE of the required foundational documents",
        "Provide evidence from TWO different pieces of evidence",
        "Respond to the opposing perspective -- don't ignore it",
        "Conclude with a broader implication"
      ]
    }
  ],
  "vocab_of_day": [
    {
      "term": "Judicial Review",
      "definition": "The power of the Supreme Court to declare laws or executive actions unconstitutional, established in Marbury v. Madison (1803)."
    },
    {
      "term": "Federalism",
      "definition": "A system of government where power is divided between a national government and state governments, each with defined authority."
    },
    {
      "term": "Selective Incorporation",
      "definition": "The legal doctrine by which the Bill of Rights is applied to the states through the 14th Amendment's Due Process Clause, one case at a time."
    },
    {
      "term": "Checks and Balances",
      "definition": "Constitutional mechanisms that allow each branch of government to limit the powers of the other branches, preventing any one branch from becoming too powerful."
    },
    {
      "term": "Enumerated Powers",
      "definition": "Powers explicitly granted to Congress by the Constitution, listed in Article I, Section 8, such as the power to declare war and coin money."
    },
    {
      "term": "Implied Powers",
      "definition": "Powers not explicitly stated in the Constitution but inferred from the Necessary and Proper Clause (Article I, Section 8); upheld in McCulloch v. Maryland."
    },
    {
      "term": "Civil Liberties",
      "definition": "Individual rights protected by the Constitution from government intrusion, such as freedoms of speech, religion, and protection against unreasonable searches."
    },
    {
      "term": "Civil Rights",
      "definition": "The rights of citizens to political and social equality -- protections against discrimination based on race, gender, religion, or other characteristics."
    },
    {
      "term": "Due Process",
      "definition": "Constitutional guarantee that the government cannot deprive citizens of life, liberty, or property without fair legal procedures (5th and 14th Amendments)."
    },
    {
      "term": "Equal Protection",
      "definition": "14th Amendment guarantee that no state shall deny any person equal protection of the laws -- the foundation of most civil rights litigation."
    },
    {
      "term": "Bicameralism",
      "definition": "A legislature divided into two chambers (Senate and House). The Founders created it to balance representation of population vs. states."
    },
    {
      "term": "Filibuster",
      "definition": "A Senate tactic where a member extends debate to delay or block a vote. Requires 60 votes (cloture) to end, giving the minority significant power."
    },
    {
      "term": "Cloture",
      "definition": "A Senate procedure requiring 60 votes to end a filibuster and force a vote on legislation."
    },
    {
      "term": "Gerrymandering",
      "definition": "The manipulation of electoral district boundaries to favor a particular party or group. Baker v. Carr and Shaw v. Reno addressed redistricting."
    },
    {
      "term": "Electoral College",
      "definition": "The body of electors established by the Constitution to formally elect the President. Each state receives electors equal to its Congressional delegation."
    },
    {
      "term": "Precedent (Stare Decisis)",
      "definition": "The legal principle that courts should follow prior rulings when deciding similar cases, ensuring consistency and stability in the law."
    },
    {
      "term": "Iron Triangle",
      "definition": "The stable relationship between a Congressional committee, federal agency, and interest group, each benefiting from the relationship at the public's expense."
    },
    {
      "term": "Linkage Institutions",
      "definition": "Institutions that connect citizens to government, including political parties, elections, interest groups, and the media."
    },
    {
      "term": "Political Socialization",
      "definition": "The process by which people develop their political values, beliefs, and identities -- primarily through family, school, peers, and media."
    },
    {
      "term": "Writ of Certiorari",
      "definition": "An order from the Supreme Court to a lower court to send up the record of a case for review. The 'Rule of Four' requires four justices to agree."
    },
    {
      "term": "Amicus Curiae",
      "definition": "'Friend of the court' -- a brief filed by an outside party (often an interest group) offering information or arguments in a case before the court."
    },
    {
      "term": "Exclusionary Rule",
      "definition": "Evidence obtained illegally cannot be used in court. Established in Mapp v. Ohio (1961) via selective incorporation of the 4th Amendment."
    },
    {
      "term": "Miranda Rights",
      "definition": "Required warnings police must give before interrogating a suspect in custody, established in Miranda v. Arizona (1966): right to remain silent, right to attorney."
    },
    {
      "term": "Establishment Clause",
      "definition": "First Amendment clause prohibiting Congress from making any law 'respecting an establishment of religion' -- separation of church and state."
    },
    {
      "term": "Free Exercise Clause",
      "definition": "First Amendment clause protecting individuals' rights to practice their religion without government interference."
    },
    {
      "term": "Prior Restraint",
      "definition": "Government censorship of information before it is published. Generally unconstitutional per New York Times v. United States (1971)."
    },
    {
      "term": "Clear and Present Danger",
      "definition": "Test from Schenck v. U.S. (1919): speech can be restricted only if it poses a clear and present danger of producing imminent lawless action."
    },
    {
      "term": "Dual Federalism",
      "definition": "'Layer cake' federalism -- national and state governments each operate independently in their own sphere. Dominant from the Founding to the New Deal."
    },
    {
      "term": "Cooperative Federalism",
      "definition": "'Marble cake' federalism -- national and state governments share responsibilities and work together. Dominant since the New Deal era."
    },
    {
      "term": "Categorical Grants",
      "definition": "Federal money given to states for specific purposes with strings attached. Gives the federal government more control over state policy."
    }
  ]
};

// ══════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════
async function init() {
  try { updateDates(); } catch(e) { console.error('Date render failed', e); }
  try { buildStaticSections(); } catch(e) { console.error('Static section render failed', e); }
  try { await loadContent(); } catch(e) { console.error('Content render failed', e); }
  // TDIH ("This Day in Politics") is now handled entirely by the
  // U.S.-only local-database script at the bottom of index.html --
  // the old Wikipedia-API-based version that used to live here was
  // removed because both were racing to control the same #tdih-*
  // elements, which is why the wrong content sometimes won on refresh.
}

function updateDates() {
  const now = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('en-US', opts);
  document.getElementById('hero-date').textContent = dateStr;
  document.getElementById('footer-date').textContent = 'Updated weekly · ' + now.getFullYear();

  // Badge in header
  const m = now.getMonth() + 1;
  const d = now.getDate();
  document.getElementById('tdih-date-badge').textContent =
    now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ══════════════════════════════════════════════════════════
//  LOAD CONTENT.JSON
// ══════════════════════════════════════════════════════════
async function loadContent() {
  try {
    const res = await fetch('content.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('content.json HTTP ' + res.status);
    contentData = await res.json();
  } catch(e) {
    console.warn('content.json load failed; using built-in fallback content', e);
    contentData = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  }

  // Hero
  document.getElementById('hero-unit').textContent = contentData.current_unit.toUpperCase();
  document.getElementById('hero-week').textContent = contentData.week;

  // Exit questions
  ['home', 'page'].forEach(suffix => {
    const el = document.getElementById('exit-question-' + suffix);
    if (el) el.textContent = contentData.exit_ticket;
  });

  // Materials
  const iconMap = { slides: 'ti-presentation', doc: 'ti-file-text', video: 'ti-video', link: 'ti-external-link' };
  document.getElementById('materials-list').innerHTML = contentData.materials.map(m => `
    <a class="material-row" href="${m.url}" target="_blank" rel="noopener">
      <div class="material-icon ${m.type || 'link'}">
        <i class="ti ${iconMap[m.type] || 'ti-file'}" aria-hidden="true"></i>
      </div>
      <span class="material-title">${m.title}</span>
      <span class="material-date">${m.date}</span>
    </a>
  `).join('');

  // ── Google Calendar URL builder ──
  function buildCalendarUrl(title, dateStr, year) {
    // Parse date like "Sep 12" -> Date object
    const d = new Date(dateStr + ', ' + year);
    if (isNaN(d)) return 'https://calendar.google.com';
    // Format as YYYYMMDD for Google Calendar
    const pad = n => String(n).padStart(2, '0');
    const dateFormatted = d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate());
    // Next day for end date
    const end = new Date(d);
    end.setDate(end.getDate() + 1);
    const endFormatted = end.getFullYear() + pad(end.getMonth()+1) + pad(end.getDate());
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'AP Gov: ' + title,
      dates: dateFormatted + '/' + endFormatted,
      details: "AP Government & Politics - O'Farrell High School",
      allday: 'true'
    });
    return 'https://calendar.google.com/calendar/render?' + params.toString();
  }

  // Upcoming -- highlight items within 3 days
  const now = new Date();
  document.getElementById('upcoming-list').innerHTML = contentData.upcoming.map(u => {
    const d = new Date(u.date + ', ' + now.getFullYear());
    const soon = (d - now) < 1000 * 60 * 60 * 72;
    const calUrl = buildCalendarUrl(u.title, u.date, now.getFullYear());
    return `<div class="upcoming-row${soon ? ' soon' : ''}">
      <span class="upcoming-title">${u.title}</span>
      <span class="upcoming-row-right">
        <span class="upcoming-date">${u.date}</span>
        <a class="upcoming-cal-btn" href="${calUrl}" target="_blank" rel="noopener" title="Add to Google Calendar" onclick="event.stopPropagation()">
          <i class="ti ti-calendar-plus"></i>
        </a>
      </span>
    </div>`;
  }).join('');

  // Key Links
  document.getElementById('links-list').innerHTML = contentData.key_links.map(l => `
    <a class="key-link" href="${l.url}" target="_blank" rel="noopener">
      <i class="ti ${l.icon}" aria-hidden="true"></i>
      ${l.title}
    </a>
  `).join('');

  // Gov news removed
  // Period dropdowns (both home and page)
  buildPeriodDropdowns();
  skillsInitIdGate();
  skillsRefreshActivityGrid();

  // Vocab
  buildVocab();

  // Units tab
  buildUnits();

  // Review tab
  buildReview();
}

// ══════════════════════════════════════════════════════════
//  PERIOD DROPDOWNS
// ══════════════════════════════════════════════════════════
function buildPeriodDropdowns() {
  ['home', 'page'].forEach(suffix => {
    const periodSel = document.getElementById('period-select-' + suffix);
    const nameSel = document.getElementById('name-select-' + suffix);
    if (!periodSel) return;

    contentData.periods.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id; opt.textContent = p.label;
      periodSel.appendChild(opt);
    });

    periodSel.addEventListener('change', () => {
      const period = contentData.periods.find(p => p.id === periodSel.value);
      nameSel.innerHTML = '<option value="">Select your name...</option>';
      if (period) {
        period.students.forEach(s => {
          const opt = document.createElement('option');
          opt.value = s; opt.textContent = s;
          nameSel.appendChild(opt);
        });
        nameSel.disabled = false;
      } else { nameSel.disabled = true; }
      checkReady(suffix);
    });

    nameSel.addEventListener('change', () => checkReady(suffix));
    document.getElementById('exit-response-' + suffix)
      .addEventListener('input', () => checkReady(suffix));
  });
}

function checkReady(suffix) {
  const period = document.getElementById('period-select-' + suffix).value;
  const name = document.getElementById('name-select-' + suffix).value;
  const response = document.getElementById('exit-response-' + suffix).value.trim();
  document.getElementById('submit-btn-' + suffix).disabled = !(period && name && response.length > 3);
}

// ══════════════════════════════════════════════════════════
//  SUBMIT EXIT TICKET
// ══════════════════════════════════════════════════════════
const SCRIPT_URL = 'https://script.google.com/a/macros/ofarrellschool.org/s/AKfycbyPbD_iSjdjtKO48jc2QDsMysiGl4j_K0ZzKlJeWlRVGgZJ8LSINO6iFWwPjd6a9gfe6w/exec';

function setupSubmitButtons() {
  ['home', 'page'].forEach(suffix => {
    const btn = document.getElementById('submit-btn-' + suffix);
    if (!btn) return;
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.innerHTML = '<i class="ti ti-loader-2" style="animation:spin 1s linear infinite;"></i> Submitting...';

      const period = document.getElementById('period-select-' + suffix).value;
      const name = document.getElementById('name-select-' + suffix).value;
      const response = document.getElementById('exit-response-' + suffix).value.trim();
      const question = document.getElementById('exit-question-' + suffix).textContent;
      const today = new Date().toLocaleDateString('en-US');

      try {
        await fetch(SCRIPT_URL, {
          method: 'POST', mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: today, period, name, question, response })
        });
        document.getElementById('exit-form-' + suffix).style.display = 'none';
        document.getElementById('submit-success-' + suffix).classList.remove('hidden');
      } catch (err) {
        btn.disabled = false;
        btn.innerHTML = '<i class="ti ti-send"></i> Submit Exit Ticket';
        alert('Something went wrong. Please try again.');
      }
    });
  });
}

// ══════════════════════════════════════════════════════════
//  VOCAB OF THE DAY
// ══════════════════════════════════════════════════════════
function buildVocab() {
  if (!contentData || !contentData.vocab_of_day) return;
  const vocab = contentData.vocab_of_day;

  // Start on the day-of-year index so it feels "different" each day
  const doy = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  vocabIndex = doy % vocab.length;

  function render() {
    const v = vocab[vocabIndex];
    document.getElementById('vocab-term').textContent = v.term;
    document.getElementById('vocab-def').textContent = v.definition;
    document.getElementById('vocab-counter').textContent = (vocabIndex + 1) + ' / ' + vocab.length;
  }

  document.getElementById('vocab-prev').addEventListener('click', () => {
    vocabIndex = (vocabIndex - 1 + vocab.length) % vocab.length;
    render();
  });
  document.getElementById('vocab-next').addEventListener('click', () => {
    vocabIndex = (vocabIndex + 1) % vocab.length;
    render();
  });

  render();
}

// ══════════════════════════════════════════════════════════
//  THIS DAY IN HISTORY -- REMOVED (see note in init() above).
//  This used to fetch from history.muffinlabs.com (a Wikipedia
//  mirror) and bind its own tdih-prev/next/discuss click handlers.
//  It ran alongside the newer local-database version at the bottom
//  of index.html, and the two would race to render #tdih-year/
//  #tdih-text on every page load -- whichever fetch resolved last
//  won, which is why the "old" content sometimes appeared even
//  after the local database was added. Only the index.html version
//  remains now.
// ══════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════
//  UNITS TAB
// ══════════════════════════════════════════════════════════
function buildUnits() {
  if (!contentData || !contentData.units) return;
  const currentUnitNum = parseInt(contentData.current_unit.match(/\d+/)?.[0]);

  const grid = document.getElementById('units-grid');
  grid.innerHTML = contentData.units.map(u => {
    const isCurrent = u.number === currentUnitNum;
    return `
      <div class="unit-card${isCurrent ? ' current-unit' : ''}" id="unit-block-${u.number}">
        ${isCurrent ? '<div class="current-badge">Current Unit</div>' : ''}
        <div class="unit-header">
          <div class="unit-num">0${u.number}</div>
          <div class="unit-header-text">
            <div class="unit-title">${u.title}</div>
            <span class="unit-weight">${u.weight} of exam</span>
          </div>
        </div>
        <div class="unit-body">
          <div class="unit-section-label">Key Topics</div>
          <ul class="unit-topics">
            ${u.topics.map(t => `<li>${t}</li>`).join('')}
          </ul>
          ${u.key_cases.length ? `
            <div class="unit-section-label">Required Cases</div>
            <div class="unit-cases">
              ${u.key_cases.map(c => `<span class="case-chip">${c}</span>`).join('')}
            </div>
          ` : ''}
          ${u.key_docs.length ? `
            <div class="unit-section-label">Foundational Documents</div>
            <div class="unit-docs">
              ${u.key_docs.map(d => `<span class="doc-chip">${d}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// ══════════════════════════════════════════════════════════
//  REVIEW TAB
// ══════════════════════════════════════════════════════════
function buildStaticSections() {
  // SCOTUS cases (static data, no content.json dependency)
  buildCasesGrid('all');
  buildCaseFilters();
  buildReqDocs();
}

function buildReview() {
  if (!contentData || !contentData.frq_types) return;
  const container = document.getElementById('frq-cards');
  container.innerHTML = contentData.frq_types.map(f => `
    <div class="frq-type-card" style="margin-bottom:16px;">
      <div class="frq-header">
        <h3>${f.type}</h3>
        <span class="frq-pts">${f.points} pts</span>
      </div>
      <div class="frq-tips">
        ${f.tips.map((tip, i) => `
          <div class="frq-tip">
            <span class="frq-tip-num">${String(i+1).padStart(2,'0')}</span>
            <span>${tip}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function buildReqDocs() {
  const grid = document.getElementById('req-docs-grid');
  if (!grid) return;
  grid.innerHTML = REQ_DOCS.map(d => `
    <div class="doc-item">
      <div class="doc-item-name">${d.name}</div>
      <div class="doc-item-type">${d.type} · ${d.year}</div>
    </div>
  `).join('');
}

function buildCaseFilters() {
  const units = [1,2,3,4,5];
  const row = document.getElementById('case-filter-row');
  row.innerHTML = `
    <button class="filter-btn active" data-filter="all">All Cases</button>
    ${units.map(u => `<button class="filter-btn" data-filter="${u}">Unit ${u}</button>`).join('')}
  `;
  row.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      row.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      caseFilter = btn.dataset.filter;
      buildCasesGrid(caseFilter);
    });
  });
}

function buildCasesGrid(filter) {
  const grid = document.getElementById('cases-grid');
  if (!grid) return;
  const filtered = filter === 'all' ? SCOTUS_CASES : SCOTUS_CASES.filter(c => c.unit === parseInt(filter));
  grid.innerHTML = filtered.map(c => `
    <div class="case-item" data-case="${c.name}" tabindex="0" role="button" aria-label="View details for ${c.name}">
      <div class="case-name">${c.name}</div>
      <div class="case-year">${c.year}</div>
      <span class="case-unit-tag">Unit ${c.unit}</span>
    </div>
  `).join('');

  grid.querySelectorAll('.case-item').forEach(item => {
    item.addEventListener('click', () => openCaseModal(item.dataset.case));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openCaseModal(item.dataset.case); });
  });
}

function openCaseModal(name) {
  const c = SCOTUS_CASES.find(x => x.name === name);
  if (!c) return;
  document.getElementById('modal-case-name').textContent = c.name + ' (' + c.year + ')';
  document.getElementById('modal-unit-tag').textContent = 'Unit ' + c.unit;
  document.getElementById('modal-year').textContent = c.year;
  document.getElementById('modal-issue').textContent = c.issue;
  document.getElementById('modal-ruling').innerHTML = '<strong>' + c.ruling + '</strong>';
  document.getElementById('modal-sig').textContent = c.sig;
  document.getElementById('modal-tip').textContent = '★ ' + c.tip;
  document.getElementById('case-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.getElementById('modal-close').addEventListener('click', closeCaseModal);
document.getElementById('case-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('case-modal')) closeCaseModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCaseModal(); });

function closeCaseModal() {
  document.getElementById('case-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ══════════════════════════════════════════════════════════
//  NAV TABS
// ══════════════════════════════════════════════════════════
const TAB_IDS = ['home', 'units', 'review', 'frqpractice', 'glossary', 'docs', 'diagnostic', 'stump', 'amendments', 'cases', 'archive', 'cartoons', 'madison', 'skills', 'exit'];

// ── Nav tab switcher (handles flat tabs + dropdown tabs) ──
function switchToTab(target, unitNum) {
  // Keep the URL in sync with whatever tab is showing, so refreshing the
  // page (or bookmarking it) lands back on the same tab instead of
  // always reverting to Home. Uses replaceState (not location.hash=)
  // so this doesn't spam the browser's back-button history on every
  // click, and doesn't trigger the #term= glossary hashchange listener.
  //
  // Only touches the hash when actually SWITCHING tabs -- if the
  // current hash's tab portion already matches target (e.g. this call
  // came from the initial hash-router confirming a deep link like
  // "#frqpractice&frq=u1-marijuana"), leave the hash untouched so any
  // extra "&frq=..." suffix survives for index-app.js's deep-link
  // reader, which runs after this and needs it still intact.
  var currentHashTab = window.location.hash.replace('#', '').split('&')[0];
  if (currentHashTab !== target) {
    var newHash = (target === 'home') ? '' : ('#' + target);
    var url = window.location.pathname + window.location.search + newHash;
    history.replaceState(null, '', url);
  }

  // Remove active from all nav tabs
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('has-active'));

  // Find and activate the right tab element
  // If a unit number is given, find the tab with matching data-unit
  var activeTab;
  if (unitNum) {
    activeTab = document.querySelector('.nav-tab[data-tab="' + target + '"][data-unit="' + unitNum + '"]');
  }
  if (!activeTab) {
    activeTab = document.querySelector('.nav-tab[data-tab="' + target + '"]');
  }
  if (activeTab) {
    activeTab.classList.add('active');
    var group = activeTab.closest('.nav-group');
    if (group) group.classList.add('has-active');
  }

  // Show/hide tab panels
  TAB_IDS.forEach(id => {
    const el = document.getElementById('tab-' + id);
    if (el) {
      el.style.display = (id === target) ? '' : 'none';
      el.classList.toggle('active', id === target);
    }
  });

  // If switching to units tab with a specific unit, scroll to that unit
  if (target === 'units' && unitNum) {
    setTimeout(function() {
      var unitEl = document.getElementById('unit-block-' + unitNum);
      if (unitEl) unitEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  // When switching to Foundations, rebuild dropdowns
  if (target === 'skills') {
    setTimeout(function() {
      typeof skillsBuildIdDropdowns === 'function' && skillsBuildIdDropdowns();
      typeof skillsRefreshActivityGrid === 'function' && skillsRefreshActivityGrid();
    }, 50);
  }
}

document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.tab) switchToTab(tab.dataset.tab, tab.dataset.unit || null);
  });
});

// Show the tab matching the URL hash on load (e.g. a unit page linking to
// "/APG/#review" should actually open the Review tab, not just land on
// Home and silently ignore the hash). Falls back to Home if the hash is
// missing, empty, or doesn't match a real tab.
(function () {
  var hashTab = window.location.hash.replace('#', '').split('&')[0];
  var validTab = TAB_IDS.includes(hashTab) ? hashTab : 'home';
  TAB_IDS.forEach(id => {
    const el = document.getElementById('tab-' + id);
    if (el) el.style.display = (id === validTab) ? '' : 'none';
  });
  if (validTab !== 'home') {
    switchToTab(validTab);
  }
})();

// ══════════════════════════════════════════════════════════
//  SPIN ANIMATION (submit button)
// ══════════════════════════════════════════════════════════
const style = document.createElement('style');
style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
document.head.appendChild(style);

// ══════════════════════════════════════════════════════════
//  GLOSSARY DATA -- 392 Terms, 5 Units, 23 Groups
// ══════════════════════════════════════════════════════════
const GLOSSARY_UNITS = [
  {
    key: 'unit1', label: 'Unit 1: Foundations of American Democracy', weight: '15-22%',
    groups: {
      'Constitutional Foundations': [
        ['Articles of Confederation','The first basis for the new nation\'s government; adopted in 1781; created an alliance of sovereign states held together by a weak central government.',['1.2']],
        ['Articles of Confederation and Perpetual Union','A governing document that created a union of thirteen sovereign states in which the states, not the union, were supreme.',['1.2']],
        ['Constitutional Convention','A meeting attended by state delegates in 1787 to fix the Articles of Confederation.',['1.3']],
        ['Constitution','A document that sets out the fundamental principles of governance and establishes the institutions of a government.',['1.3']],
        ['Constitutional Republic','A democratic system with elected representatives in which the constitution is the supreme law.',['1.3']],
        ['Three-Fifths Compromise','An agreement at the Constitutional Convention that a slave would count as three-fifths of a person in calculating a state\'s representation.',['1.3']],
        ['Shays\'s Rebellion','A popular uprising against the government of Massachusetts that highlighted the weaknesses of the Articles of Confederation.',['1.2']],
        ['Bill of Attainder','When the legislature declares someone guilty without a trial; prohibited by the Constitution.',['1.3']],
        ['Ex Post Facto Law','A law punishing people for acts that were not crimes at the time they were committed; prohibited by the Constitution.',['1.3']],
        ['Great Compromise','An agreement that settled issues of state representation by calling for a bicameral legislature with a proportional House and an equal Senate.',['1.3']],
        ['Virginia Plan','A plan of government calling for a three-branch government with a bicameral legislature, where more populous states would have more representation.',['1.3']],
        ['New Jersey Plan','A plan of government that provided for a unicameral legislature with equal votes for each state.',['1.3']],
        ['Writ of Habeas Corpus','The right of people detained by the government to know the charges against them.',['1.3']],
        ['Compromise on Importation','Agreement at the Constitutional Convention that Congress could not restrict the slave trade until 1808.',['1.3']],
      ],
      'Founding Principles and Documents': [
        ['Popular Sovereignty','The idea that the government\'s right to rule comes from the people. Reaffirmed in the Gettysburg Address (EK 1.1.A.3) and foundational to both the Declaration of Independence and the Constitution.',['1.1']],
        ['Rule of Law','The principle that no one, including public officials, is above the law.',['1.1']],
        ['Democracy','A system of government where power is held by the people.',['1.1']],
        ['Republic','A government ruled by representatives of the people.',['1.1']],
        ['Republicanism','A system in which the government\'s authority comes from the people.',['1.1']],
        ['Individualism','The belief that individuals should be responsible for themselves and for the decisions they make.',['1.1']],
        ['Faction','A group of self-interested people; Madison\'s term for groups whose interests conflict with those of the public.',['1.3']],
        ['Federalist No. 10','An essay by Madison arguing that the dangers of faction can be mitigated by a large republic and republican government.',['1.3']],
        ['Federalist No. 51','An essay by Madison arguing that separation of powers and federalism will prevent tyranny.',['1.3']],
        ['Federalist Papers','A series of eighty-five essays by Hamilton, Madison, and Jay published 1787-1788 that lay out the theory behind the Constitution.',['1.3']],
        ['Free Enterprise','The pursuit of self-interest, competition, efficient allocation of resources, and limited government regulation of the market; espoused by Adam Smith in The Wealth of Nations. One of four core American values per EK 4.1.A.1.',['1.1']],
        ['The Gettysburg Address','A speech delivered by Abraham Lincoln during the Civil War that reaffirmed equality and popular sovereignty as defining foundations of democracy. Required foundational document per LO 1.1.A.',['1.1']],
        ['Federalist No. 39','Essay by James Madison explaining that the U.S. Constitution combines national and state features to limit concentration of power while allowing multiple access points for political participation. Ties to EK 1.7.A.1.',['1.7']],
        ['Brutus No. 1','An Anti-Federalist paper arguing the country was too large to be governed as a republic and the Constitution gave too much power to the national government.',['1.3']],
        ['Federalist','Supporter of the proposed Constitution who called for a strong national government.',['1.3']],
        ['Anti-Federalists','A person opposed to the proposed Constitution who favored stronger state governments.',['1.3']],
        ['Declaration of Independence','A document written in 1776 in which the American colonists proclaimed their independence from Great Britain.',['1.1']],
        ['Social Contract','People allow their governments to rule over them to ensure an orderly and functioning society.',['1.1']],
        ['Natural Rights','The right to life, liberty, and property, which government cannot take away; rooted in Enlightenment philosophy.',['1.1']],
        ['Inalienable Rights','Rights the government cannot take away; foundational to the Declaration of Independence.',['1.1']],
      ],
      'Federalism': [
        ['Federalism','The sharing of power between the national government and the states.',['1.2']],
        ['Federal System','A system where power is divided between the national and state governments.',['1.2']],
        ['Unitary System','A system where the central government has all of the power over subnational governments.',['1.2']],
        ['Confedral System','A system where the subnational governments have most of the power.',['1.2']],
        ['Dual Federalism','A form of American federalism in which the states and the nation operate independently in their own areas; "layer cake."',['1.2']],
        ['Cooperative Federalism','A form of American federalism in which the states and the national government work together; "marble cake."',['1.2']],
        ['New Federalism','A style of federalism premised on the idea that decentralization of policies enhances administrative efficiency.',['1.2']],
        ['Fiscal Federalism','The federal government\'s use of grants-in-aid to influence policies in the states.',['1.2']],
        ['Supremacy Clause','Constitutional provision declaring that the Constitution and all national laws and treaties are the supreme law of the land.',['1.2']],
        ['Tenth Amendment','Reserves powers not delegated to the national government to the states and the people; the basis of federalism.',['1.2']],
        ['Concurrent Powers','Powers granted to both states and the federal government in the Constitution.',['1.2']],
        ['Elastic Clause','The Necessary and Proper Clause; enables the national government to make all Laws necessary and proper for carrying out its constitutional responsibilities.',['1.2']],
        ['Commerce Clause','Grants Congress the authority to regulate interstate business and commercial activity.',['1.2']],
        ['Full Faith and Credit Clause','Constitutional clause requiring states to recognize the public acts, records, and civil court proceedings from another state.',['1.2']],
        ['Privileges and Immunities Clause','Prevents states from discriminating against people from out of state.',['1.2']],
        ['Nullification','A doctrine asserting that if a state deems a federal law unconstitutional, it can nullify it within its borders; rejected after the Civil War.',['1.2']],
        ['Devolution','Returning more authority to state or local governments.',['1.2']],
        ['Categorical Grants','Grants-in-aid provided to states with specific provisions on their use; gives federal government more control.',['1.2']],
        ['Block Grant','A type of grant-in-aid that gives state officials more authority in the disbursement of federal funds.',['1.2']],
        ['Grants-in-Aid','Federal money provided to states to implement public policy objectives.',['1.2']],
        ['General Revenue Sharing','A type of federal grant that places minimal restrictions on how state and local governments spend the money.',['1.2']],
        ['Unfunded Mandate','Federal requirement the states must follow without being provided with funding.',['1.2']],
        ['Immigration Federalism','The gradual movement of states into the immigration policy domain traditionally handled by the federal government.',['1.2']],
        ['Extradition','The requirement that officials in one state return a defendant to another state where the crime was committed.',['1.2']],
        ['Home Rule','Principle that provides local governments some degree of independence from the state government.',['1.2']],
      ],
      'Government Types and Political Theory': [
        ['Monarchy','A form of government where one ruler, usually a hereditary one, holds political power.',['1.1']],
        ['Oligarchy','A form of government where a handful of elite society members hold political power.',['1.1']],
        ['Totalitarianism','A form of government where government is all-powerful and citizens have no rights.',['1.1']],
        ['Elite Theory','Theory of democracy that elites have a disproportionate amount of influence in the policymaking process.',['1.1']],
        ['Pluralism','A theory that views the distribution of political power among many competing groups as serving to keep any one group in check.',['1.1']],
        ['Political Culture','The shared set of beliefs, customs, traditions, and values that define the relationship between citizens and government.',['1.1']],
        ['Moralistic Political Culture','A culture that views the government as a means to better society and promote the general welfare.',['1.1']],
        ['Traditionalistic Political Culture','A culture that views the government as necessary to maintaining the existing social order.',['1.1']],
        ['Individualistic Political Culture','A culture that views the government as a mechanism for addressing issues that matter to individual citizens.',['1.1']],
        ['Public Policy','The intentional use of governmental power to secure the health, welfare, opportunities, and national security of citizens.',['1.1']],
        ['Direct Democracy','A political system in which citizens vote directly on public policies.',['1.1']],
        ['Representative Democracy','A political system in which voters select representatives who then vote on matters of public policy.',['1.1']],
        ['Eminent Domain','The power of government to take or use property for a public purpose after compensating its owner; also known as the takings clause of the Fifth Amendment.',['1.1']],
        ['Statute','A written law established by a legislative body.',['1.1']],
        ['Common Law','The pattern of law developed by judges through case decisions largely based on precedent.',['1.1']],
        ['Social Contract','People allow their governments to rule over them to ensure an orderly and functioning society.',['1.1']],
      ],
    }
  },
  {
    key: 'unit2', label: 'Unit 2: Interactions Among Branches', weight: '25-36%',
    groups: {
      'Congress': [
        ['Bicameral Legislature','A legislature with two houses, such as the U.S. Congress.',['2.1']],
        ['Unicameral Legislature','A legislature with only one house.',['2.1']],
        ['Apportionment','The process of determining the number of representatives for each state using census data.',['2.1']],
        ['Reapportionment','The reallocation of House seats between the states to account for population changes.',['2.1']],
        ['Redistricting','States\' redrawing of boundaries of electoral districts following each census.',['2.1']],
        ['Gerrymandering','The intentional use of redistricting to benefit a specific interest or group of voters.',['2.1']],
        ['Malapportionment','The uneven distribution of the population between legislative districts.',['2.1']],
        ['Speaker of the House','The leader of the House of Representatives, chosen by an election of its members.',['2.1']],
        ['House Majority Leader','The person who is the second in command of the House of Representatives.',['2.1']],
        ['Senate Majority Leader','The person who has the most power in the Senate and is the head of the party with the most seats.',['2.1']],
        ['President Pro Tempore','The senator who acts in the absence of the vice president; usually the most senior senator of the majority party.',['2.1']],
        ['Whip','A member of Congress whose job is to ensure party unity and discipline.',['2.1']],
        ['Filibuster','A tactic through which an individual senator may use the right of unlimited debate to delay or block action on legislation.',['2.1']],
        ['Cloture','A procedure through which senators can end a filibuster, provided three-fifths of senators (60) agree.',['2.1']],
        ['House Rules Committee','A powerful committee that determines when a bill will be subject to debate and vote on the House floor.',['2.1']],
        ['Conference Committee','A special joint committee that reconciles different bills passed in the House and Senate so a single bill results.',['2.1']],
        ['Standing Committee','A permanent legislative committee that meets regularly.',['2.1']],
        ['Select Committee','A small legislative committee created to fulfill a specific purpose and then disbanded.',['2.1']],
        ['Joint Committee','A legislative committee consisting of members from both chambers.',['2.1']],
        ['Discharge Petition','A motion filed by a member of Congress to move a bill out of committee and onto the House floor.',['2.1']],
        ['Logrolling','Trading of votes on legislation by members of Congress to get their earmarks passed.',['2.1']],
        ['Earmark','An addition to a piece of legislation that directs specific funds to projects within districts or states.',['2.1']],
        ['Pork-Barrel Politics','Federal spending intended to benefit a particular district or set of constituents.',['2.1']],
        ['Roll-Call Vote','A recorded vote on a bill.',['2.1']],
        ['Unanimous Consent Agreement','An agreement in the Senate that sets the terms for consideration of a bill.',['2.1']],
        ['Hold','A delay placed on legislation by a senator who objects to a bill.',['2.1']],
        ['Gridlock','A slowdown or halt in Congress\'s ability to legislate, especially due to partisanship.',['2.1']],
        ['Impeachment','The act of charging a government official with serious wrongdoing, which may lead to removal from office.',['2.1']],
        ['Oversight','Efforts by Congress to ensure executive branch agencies and officials are acting legally and in accordance with congressional goals.',['2.1']],
        ['Mandatory Spending','Spending required by existing laws that is locked in the budget.',['2.1']],
        ['Discretionary Spending','Spending for programs and policies at the discretion of Congress and the president.',['2.1']],
        ['Deficit','The annual amount by which expenditures are greater than revenues.',['2.1']],
        ['Appropriation','The process through which congressional committees allocate funds to executive branch agencies.',['2.1']],
        ['Congressional Budget Office (CBO)','The federal agency tasked with producing independent analyses of budgetary and economic issues.',['2.1']],
        ['Bipartisanship','Agreement between the parties to work together in Congress to pass legislation.',['2.1']],
        ['Incumbency Advantage','Institutional advantages held by those already in office trying to fend off challengers.',['2.1']],
      ],
      'The Presidency': [
        ['Executive Branch','The institution responsible for carrying out laws passed by the legislative branch.',['2.3']],
        ['Executive Order','Policy directives issued by presidents that do not require congressional approval.',['2.3']],
        ['Executive Privilege','A right claimed by presidents to keep certain conversations, records, and transcripts confidential from outside scrutiny.',['2.3']],
        ['Executive Agreement','An agreement between a president and another nation that does not require Senate ratification.',['2.3']],
        ['Bully Pulpit','Presidential appeals to the public to pressure other branches of government to support presidential policies.',['2.3']],
        ['Going Public','A tactic through which presidents reach out directly to the American people to pressure Congress on policy goals.',['2.3']],
        ['Veto','Formal rejection by the president of a bill that has passed both houses of Congress.',['2.3']],
        ['Pocket Veto','An informal veto when the president does not sign a bill within ten days while Congress is adjourned.',['2.3']],
        ['Line-Item Veto','A type of veto that allows an executive to reject specific provisions of a bill rather than the whole bill.',['2.3']],
        ['Presidential Pardon','Presidential authority to forgive an individual and set aside punishment for a crime.',['2.3']],
        ['Signing Statement','Text issued by presidents while signing a bill that may include a president\'s interpretation of the law.',['2.3']],
        ['War Powers Resolution','A law restricting the president\'s power to maintain troops in combat for more than sixty days without congressional authorization.',['2.3']],
        ['Cabinet','A group of advisors to the president, consisting of the most senior appointed officers of the executive branch.',['2.3']],
        ['Executive Office of the President','A collection of offices within the White House designed mainly to provide information to the president.',['2.3']],
        ['Office of Management and Budget (OMB)','The executive branch office that assists the president in setting national spending priorities.',['2.3']],
        ['State of the Union Address','The annual speech from the president to Congress updating that branch on the state of national affairs.',['2.3']],
        ['Two Presidencies Thesis','Wildavsky\'s thesis that there are two distinct presidencies one for foreign and one for domestic policy, and presidents are more successful in foreign policy.',['2.3']],
        ['Informal Powers','Powers not laid out in the Constitution but used to carry out presidential duties.',['2.3']],
        ['Inherent Powers','Powers neither enumerated nor implied but assumed to exist as a direct result of the country\'s existence.',['2.3']],
        ['Formal Powers','Those powers a president may exercise that are specifically outlined in the Constitution.',['2.3']],
        ['Enumerated Powers','Powers explicitly granted to the national government through the Constitution; also called express powers.',['2.2']],
        ['Implied Powers','Authority of the federal government beyond its expressed powers; considered necessary to carry out enumerated powers.',['2.2']],
        ['Lame Duck Period','Period at the end of a presidential term when Congress may block presidential initiatives and nominees.',['2.3']],
        ['Treaty','An agreement with a foreign government negotiated by the president and requiring a two-thirds vote in the Senate to ratify.',['2.3']],
        ['Rally Around the Flag Effect','A spike in presidential popularity during international crises.',['2.3']],
      ],
      'The Federal Bureaucracy': [
        ['Bureaucracy','An administrative group of nonelected officials charged with carrying out functions connected to policies and programs.',['2.4']],
        ['Federal Bureaucracy','The departments and agencies within the executive branch that carry out the laws of the nation.',['2.4']],
        ['Bureaucratic Discretion','The power to decide how a law is implemented.',['2.4']],
        ['Bureaucratic Adjudication','When the federal bureaucracy settles disputes between parties that arise over the implementation of federal laws.',['2.4']],
        ['Implementation','The bureaucracy\'s role in putting into action the laws that Congress has passed.',['2.4']],
        ['Rulemaking','The process through which the federal bureaucracy fills in critical details of a law.',['2.4']],
        ['Regulation','The process through which the federal bureaucracy makes rules that have the force of law.',['2.4']],
        ['Independent Regulatory Agency','Organization that exists outside of the major cabinet departments whose job is to monitor and regulate specific sectors of the economy.',['2.4']],
        ['Independent Executive Agency','Agency similar to cabinet departments but existing outside the cabinet structure and usually having a narrower mission.',['2.4']],
        ['Agency Capture','When agencies tasked with regulating businesses are populated by individuals with close ties to the very firms they are supposed to regulate.',['2.4']],
        ['Whistleblower','A person who publicizes misdeeds committed within a bureaucracy or other organization.',['2.4']],
        ['Civil Servants','The individuals who fill nonelected positions in government and make up the bureaucracy.',['2.4']],
        ['Merit System','A system of hiring and promotion based on competitive testing results, education, and other qualifications.',['2.4']],
        ['Spoils System','A system that rewards political loyalties with bureaucratic appointments after victory.',['2.4']],
        ['Patronage','The use of government positions to reward individuals for their political support.',['2.4']],
        ['Pendleton Act','An act of Congress that created the first United States Civil Service Commission to draw up and enforce rules on hiring in the civil service.',['2.4']],
        ['Iron Triangle','Coordinated and mutually beneficial activities of the bureaucracy, Congress, and interest groups to achieve shared policy goals.',['2.4']],
        ['Issue Network','Webs of influence between interest groups, policymakers, and policy advocates.',['2.4']],
        ['Revolving Door','The movement of individuals between government and lobbying positions.',['2.4']],
        ['Red Tape','The mechanisms, procedures, and rules that must be followed to get something done.',['2.4']],
        ['Freedom of Information Act (FOIA)','A federal statute that requires public agencies to provide certain types of information requested by citizens.',['2.4']],
        ['Sunshine Laws','Laws that require government documents and proceedings to be made public.',['2.4']],
        ['Top-Down Implementation','A strategy in which the federal government dictates the specifics of public policy and each state implements it the same way.',['2.4']],
        ['Bottom-Up Implementation','A strategy in which the federal government allows local areas some flexibility to meet their specific challenges.',['2.4']],
      ],
      'The Federal Courts': [
        ['Judicial Branch','The institution responsible for hearing and deciding cases through federal courts.',['2.5']],
        ['Judicial Review','The authority of the Supreme Court to strike down a law or executive action if it conflicts with the Constitution; established in Marbury v. Madison.',['2.5']],
        ['Judicial Activism','A philosophy that justices should wield judicial review, sometimes creating bold new policies.',['2.5']],
        ['Judicial Restraint','A philosophy that asserts justices should be cautious in overturning laws.',['2.5']],
        ['Precedent','A judicial decision that guides future courts in handling similar cases.',['2.5']],
        ['Stare Decisis','The practice of letting a previous legal decision stand.',['2.5']],
        ['Supreme Court','The highest level of the federal judiciary, established in Article III of the Constitution.',['2.5']],
        ['Original Jurisdiction','The authority of a court to act as the first court to hear a case.',['2.5']],
        ['Appellate Jurisdiction','The authority of a court to hear and review decisions made by lower courts.',['2.5']],
        ['Appellate Court','A court that reviews cases already decided by a lower or trial court.',['2.5']],
        ['Circuit Courts','The appeals courts of the federal court system; also called courts of appeals.',['2.5']],
        ['Federal District Courts','The lowest level of the federal judiciary where cases are tried and evidence is presented.',['2.5']],
        ['Dual Court System','The division of the courts into two separate systems, one federal and one state.',['2.5']],
        ['Writ of Certiorari','An order of the Supreme Court calling up the records of the lower court so a case may be reviewed.',['2.5']],
        ['Rule of Four','A Supreme Court custom in which a case will be heard when four justices decide to do so.',['2.5']],
        ['Docket','The list of cases pending on a court\'s calendar.',['2.5']],
        ['Oral Argument','Presentation made by plaintiffs and attorneys before the Supreme Court.',['2.5']],
        ['Majority Opinion','Binding Supreme Court opinions, which serve as precedent for future cases.',['2.5']],
        ['Concurring Opinion','An opinion that agrees with the majority decision but offers different reasoning; does not serve as precedent.',['2.5']],
        ['Dissenting Opinion','An opinion that disagrees with the majority opinion and does not serve as precedent.',['2.5']],
        ['Standing','The legal ability to bring a case in court.',['2.5']],
        ['Amicus Curiae','Literally a "friend of the court"; a brief filed by someone interested in but not party to a case.',['2.5']],
        ['Senatorial Courtesy','An unwritten custom by which the president consults senators in the state before nominating a federal court candidate.',['2.5']],
        ['Federalist No. 78','Argument by Hamilton that the federal judiciary would serve as a check on the other two branches.',['2.5']],
        ['Solicitor General','The lawyer who represents the federal government and argues cases before the Supreme Court.',['2.5']],
      ],
      'Separation of Powers and Checks and Balances': [
        ['Separation of Powers','A design of government that distributes powers across institutions in order to avoid making one branch too powerful.',['2.2']],
        ['Checks and Balances','A design of government in which each branch has powers that can prevent the other branches from making policy.',['2.2']],
        ['Reserved Powers','Powers not given to the national government, which are retained by the states and the people.',['2.2']],
        ['Exclusive Powers','Powers only the national government may exercise.',['2.2']],
        ['Police Powers','A category of reserved powers that includes the protection of people\'s health, safety, and welfare.',['2.2']],
        ['Divided Government','A situation when control of the presidency and one or both chambers of Congress is split between the two major parties.',['2.2']],
      ],
      'Representation and Legislative Roles': [
        ['Delegate Model of Representation','A model in which representatives act on the specific stated wishes of their constituents.',['2.1']],
        ['Trustee Model of Representation','A model in which representatives feel at liberty to act in the way they believe is best for their constituents.',['2.1']],
        ['Politico Model of Representation','A model in which members of Congress act as either trustee or delegate, based on rational political calculations.',['2.1']],
        ['Descriptive Representation','The degree to which a legislature reflects the diversity of that nation\'s identities and lived experiences.',['2.1']],
        ['Constituency','A body of voters in a given area who elect a representative or senator.',['2.1']],
        ['Collective Representation','The relationship between Congress and the United States as a whole; whether the institution represents the American people.',['2.1']],
      ],
    }
  },
  {
    key: 'unit3', label: 'Unit 3: Civil Liberties and Civil Rights', weight: '13-18%',
    groups: {
      'First Amendment Freedoms': [
        ['Bill of Rights','The first ten amendments to the U.S. Constitution, protecting fundamental rights and freedoms from government infringement.',['3.1']],
        ['Civil Liberties','Fundamental rights and freedoms protected from infringement by the government.',['3.1']],
        ['Freedom of Expression','A fundamental right affirmed in the First Amendment to speak, publish, and protest.',['3.1']],
        ['Establishment Clause','First Amendment protection against the government requiring citizens to join or support a religion; separation of church and state.',['3.1']],
        ['Free Exercise Clause','First Amendment protection of the rights of individuals to exercise and express their religious beliefs.',['3.1']],
        ['Prior Restraint','The suppression of material prior to publication; generally unconstitutional per New York Times v. United States.',['3.1']],
        ['Clear and Present Danger Test','Legal standard that speech posing an immediate and serious threat to national security is not protected by the First Amendment; from Schenck v. U.S.',['3.1']],
        ['Symbolic Speech','Protected expression in the form of images, signs, and other symbols.',['3.1']],
        ['Libel','An untrue written statement that injures a person\'s reputation.',['3.1']],
        ['Slander','An untrue spoken expression that injures a person\'s reputation.',['3.1']],
        ['Sherbert Test','A standard for deciding whether a law violates the Free Exercise Clause; requires compelling governmental interest and least restrictive means.',['3.1']],
        ['Reporter\'s Privilege','The right of a journalist to keep a source confidential.',['3.1']],
      ],
      'Rights of the Accused': [
        ['Miranda Rights','The right to remain silent and to have an attorney present during questioning; from Miranda v. Arizona.',['3.2']],
        ['Miranda Warning','A statement by law enforcement officers informing a person of their rights before interrogation.',['3.2']],
        ['Exclusionary Rule','A rule that evidence obtained without a warrant is inadmissible in court; from Mapp v. Ohio.',['3.2']],
        ['Due Process Clause','The clause in the Fourteenth Amendment restricting state governments from denying citizens life, liberty, or property without legal safeguards.',['3.2']],
        ['Procedural Due Process','A judicial standard requiring that fairness be applied to all individuals equally.',['3.2']],
        ['Writ of Habeas Corpus','The right of people detained by the government to know the charges against them.',['3.2']],
        ['Self-Incrimination','An action or statement that admits guilt; the 5th Amendment protects against compelled self-incrimination.',['3.2']],
        ['Plea Bargaining','A legal process in which the defendant agrees to an outcome before the handing out of a verdict.',['3.2']],
        ['Probable Cause','Reasonable belief that a crime has been committed or that there is evidence indicating so.',['3.2']],
        ['Grand Jury','A group of citizens who decide whether or not a person should be indicted and tried in court.',['3.2']],
        ['Double Jeopardy','Protects an individual acquitted of a crime from being charged with the same crime again in the same jurisdiction.',['3.2']],
      ],
      'Privacy and Selective Incorporation': [
        ['Selective Incorporation','The process through which the Supreme Court applies fundamental rights in the Bill of Rights to the states on a case-by-case basis via the 14th Amendment.',['3.3']],
        ['Privacy','A right not enumerated in the Constitution but affirmed by Supreme Court decisions covering individuals\' private decisions.',['3.3']],
        ['Right to Privacy','The right to be free of government intrusion.',['3.3']],
        ['Inalienable Rights','Rights the government cannot take away.',['3.3']],
        ['Natural Rights','The right to life, liberty, and property, which government cannot take away.',['3.3']],
        ['Common-Law Right','A right of the people rooted in legal tradition and past court rulings, rather than the Constitution.',['3.3']],
      ],
      'Civil Rights and Equal Protection': [
        ['Emancipation Proclamation','An executive order issued by President Lincoln in 1863 that freed enslaved people in the states in rebellion. The subsequent ratification of the Thirteenth Amendment permanently abolished slavery and marked a shift toward civil rights for the formerly enslaved. Required foundational document per EK 3.12.A.1.',['3.12']],
        ['Civil Rights','Protections from discrimination as a member of a particular group.',['3.4']],
        ['Equal Protection Clause','A clause of the Fourteenth Amendment that requires the states to treat all citizens alike with regard to application of the laws.',['3.4']],
        ['Fourteenth Amendment','Constitutional amendment granting citizenship to persons born in the United States and prohibiting states from denying due process or equal protection.',['3.4']],
        ['Thirteenth Amendment','Constitutional amendment that outlaws slavery.',['3.4']],
        ['Fifteenth Amendment','Constitutional amendment that gave African Americans the right to vote.',['3.4']],
        ['Nineteenth Amendment','A 1920 constitutional amendment granting women the right to vote.',['3.4']],
        ['Twenty-Sixth Amendment','Allows those eighteen years old and older to vote.',['3.4']],
        ['Twenty-Fourth Amendment','Prohibits poll taxes as a condition for voting in federal elections.',['3.4']],
        ['Civil Rights Act of 1964','Legislation outlawing racial segregation in schools and public places.',['3.4']],
        ['Voting Rights Act of 1965','Legislation outlawing literacy tests and authorizing the Justice Department to send federal officers to register voters in uncooperative jurisdictions.',['3.4']],
        ['Affirmative Action','A policy designed to address the consequences of previous discrimination by providing special consideration to individuals.',['3.4']],
        ['Strict Scrutiny','The standard used by courts for cases of discrimination based on race, ethnicity, or religion; the government must show a compelling interest.',['3.4']],
        ['Intermediate Scrutiny','The standard used for cases of discrimination based on gender; burden of proof is on the government to show an important governmental interest.',['3.4']],
        ['Rational Basis Test','The standard used by courts for most other forms of discrimination; challengers must show there is no good reason for treating them differently.',['3.4']],
        ['Separate But Equal','The doctrine that racial segregation was constitutional so long as the facilities for blacks and whites were equal; Plessy v. Ferguson, overturned by Brown.',['3.4']],
        ['Majority-Minority District','A district in which voters of a minority ethnicity constitute an electoral majority.',['3.4']],
        ['Disenfranchisement','The revocation of someone\'s right to vote.',['3.4']],
        ['Black Codes','Laws passed immediately after the Civil War that discriminated against freed people and deprived them of their rights.',['3.4']],
        ['Reconstruction','The period from 1865 to 1877 during which the governments of Confederate states were reorganized prior to being readmitted to the Union.',['3.4']],
        ['De Facto Segregation','A separation of individuals based on characteristics that arises not by law but because of other factors such as residential housing patterns.',['3.4']],
        ['De Jure Segregation','The separation by law of individuals based on their race.',['3.4']],
        ['Civil Disobedience','The intentional refusal to obey a law to call attention to its injustice.',['3.4']],
        ['Tyranny of the Majority','When a large number of citizens use the power of their majority to trample on the rights of a smaller group.',['3.4']],
        ['Tyranny of the Minority','When a small number of citizens trample on the rights of the larger population.',['3.4']],
        ['Equal Rights Amendment','A proposed but not ratified amendment to the Constitution that sought to guarantee equality of rights based upon sex.',['3.4']],
        ['Title IX','The section of the U.S. Education Amendments of 1972 that prohibits discrimination in education on the basis of sex.',['3.4']],
        ['Minority Rights','Protections for those who are not part of the majority.',['3.4']],
        ['Jim Crow Laws','State and local laws that promoted racial segregation and undermined Black voting rights in the South after Reconstruction.',['3.4']],
        ['Literacy Tests','Tests requiring the prospective voter to read a passage and answer questions; used to disenfranchise minorities.',['3.4']],
        ['Grandfather Clause','A provision in some southern states that allowed illiterate White people to vote because their ancestors had voted before the Fifteenth Amendment.',['3.4']],
        ['Civil Disobedience','The intentional refusal to obey a law to call attention to its injustice.',['3.4']],
        ['Majority Rule','A fundamental principle of democracy; the majority should have the power to make decisions binding upon the whole.',['3.4']],
      ],
    }
  },
  {
    key: 'unit4', label: 'Unit 4: American Political Ideologies and Beliefs', weight: '10-15%',
    groups: {
      'Political Ideology': [
        ['Political Ideology','An individual\'s coherent set of beliefs about government and politics.',['4.1']],
        ['American Political Culture','The set of beliefs, customs, traditions, and values that Americans share.',['4.1']],
        ['Conservatism','An ideology favoring more regulation of social behavior and less government interference in the economy.',['4.1']],
        ['Liberalism','An ideology favoring less government control over social behavior and greater regulation of the economy.',['4.1']],
        ['Modern Conservatism','A political ideology that prioritizes individual liberties, preferring a smaller government that stays out of the economy.',['4.1']],
        ['Modern Liberalism','A political ideology focused on equality and supporting government intervention in society and the economy if it promotes equality.',['4.1']],
        ['Libertarianism','An ideology favoring very little government intervention beyond protecting private property and individual liberty.',['4.1']],
        ['Neoconservatism','The belief that the United States should aggressively use its might to promote its values and ideals around the world.',['4.1']],
        ['Classical Liberalism','A political ideology based on belief in individual liberties and rights and the idea of free will, with little role for government.',['4.1']],
        ['Ideology','The beliefs and ideals that help to shape political opinion and eventually policy.',['4.1']],
        ['The American Dream','The idea that individuals should be able to achieve prosperity through hard work, sacrifice, and their own talents.',['4.1']],
        ['Liberty','Social, political, and economic freedoms.',['4.1']],
        ['Economic Liberty','The right of individuals to obtain, use, and trade things of value for their own benefit.',['4.1']],
        ['Pluralist Theory','A theory of democracy that emphasizes the role of groups in the policymaking process.',['4.1']],
        ['Elite Critique','The proposition that wealthy and elite interests are advantaged over those without resources.',['4.1']],
      ],
      'Political Socialization': [
        ['Political Socialization','The experiences and factors that shape our political values, attitudes, and behaviors.',['4.2']],
        ['Agent of Political Socialization','A person or entity that teaches and influences others about politics through use of information.',['4.2']],
        ['Generational Effect','The impact of historical events experienced by a generation upon their political views.',['4.2']],
        ['Life-Cycle Effect','The impact of a person\'s age and stage in life on his or her political views.',['4.2']],
        ['Social Capital','Connections with others and the willingness to interact and aid them.',['4.2']],
        ['Socioeconomic Status (SES)','A measure of an individual\'s wealth, income, occupation, and educational attainment.',['4.2']],
        ['Political Efficacy','A person\'s belief that he or she can make effective political change.',['4.2']],
        ['Gender Gap','The fact that American women are more likely to identify with and vote for Democratic Party candidates than men.',['4.2']],
        ['Heuristics','Shortcuts or generalizations for decision making used by voters to simplify complex choices.',['4.2']],
      ],
      'Public Opinion and Polling': [
        ['Public Opinion','The sum of individual attitudes about government, policies, and issues.',['4.3']],
        ['Sample','A group of individuals from a larger population used to measure public opinion.',['4.3']],
        ['Random Sample','A limited number of people selected so that each has an equal chance of being chosen.',['4.3']],
        ['Representative Sample','A sample that reflects the demographics of the population.',['4.3']],
        ['Scientific Poll','A representative poll of randomly selected respondents with a statistically significant sample size using neutral language.',['4.3']],
        ['Margin of Error','A number that states how far poll results may be from the actual preferences of the total population.',['4.3']],
        ['Sampling Error','The margin of error in a poll, usually calculated to plus or minus three percentage points.',['4.3']],
        ['Exit Poll','A survey conducted outside a polling place in which individuals are asked who or what they just voted for.',['4.3']],
        ['Push Poll','Politically biased campaign information presented as a poll in order to change minds.',['4.3']],
        ['Benchmark Poll','A survey taken at the beginning of a political campaign to gauge support and determine which issues are important to voters.',['4.3']],
        ['Tracking Poll','A survey determining the level of support for a candidate or an issue throughout a campaign.',['4.3']],
        ['Straw Poll','An informal and unofficial election poll conducted with a non-random population.',['4.3']],
        ['Favorability Poll','A public opinion poll that measures a public\'s positive feelings about a candidate or politician.',['4.3']],
        ['Mass Survey','A survey designed to measure the opinions of the population, usually consisting of 1,500 responses.',['4.3']],
        ['Question Order','The sequencing of questions in public opinion polls.',['4.3']],
        ['Question Wording','The phrasing of a question in a public opinion poll.',['4.3']],
        ['Leading Question','A question worded to lead a respondent to give a desired answer.',['4.3']],
        ['Latent Preferences','Beliefs and preferences people are not deeply committed to and that change over time.',['4.3']],
        ['Intense Preferences','Beliefs and preferences based on strong feelings regarding an issue that someone adheres to over time.',['4.3']],
        ['Weighting','A procedure in which the survey is adjusted according to the demographics of the larger population.',['4.3']],
        ['Demographic Characteristics','Measurable characteristics of a population, such as economic status, education, age, race or ethnicity, gender, and partisan attachment.',['4.3']],
        ['Focus Group','A small group of individuals assembled for a conversation about specific issues.',['4.3']],
        ['Bradley Effect','The difference between a poll result and an election result in which voters gave a socially desirable response rather than an honest one.',['4.3']],
        ['Bandwagon Effect','Increased media coverage of candidates who poll high.',['4.3']],
      ],
      'Economic Ideology and Policy': [
        ['Adam Smith / The Wealth of Nations','Adam Smith\'s foundational economic text arguing for free markets, competition, and limited government interference. Core Principles from The Wealth of Nations are a required AP Gov foundational document per EK 4.1.A.1.',['4.4']],
        ['Equality of Opportunity','The belief that all people are given an equal chance to compete; one of four core American values per EK 4.1.A.1.',['4.1']],
        ['Fiscal Policy','Government use of taxes and spending to attempt to lower unemployment, support economic activity, and stabilize the economy.',['4.4']],
        ['Monetary Policy','A set of economic policy tools designed to regulate the amount of money in the economy.',['4.4']],
        ['Keynesian Economics','An economic policy based on the idea that economic growth is closely tied to the ability of individuals to consume goods.',['4.4']],
        ['Supply-Side Economics','An economic policy that assumes economic growth is largely a function of a country\'s productive capacity.',['4.4']],
        ['Laissez-Faire','An economic policy that assumes the key to economic growth is for the government to allow private markets to operate efficiently without interference.',['4.4']],
        ['Free-Market Economics','A school of thought that believes the forces of supply and demand, working without government intervention, are most effective.',['4.4']],
        ['Capitalist System','A way of structuring economic activity in which private firms are allowed to make most decisions involving production and distribution of goods.',['4.4']],
        ['Mixed Economy','Economic policy in which many economic decisions are left to individuals and businesses with the federal government regulating economic activity.',['4.4']],
        ['Socialism','A system in which government uses its authority to promote social and economic equality.',['4.4']],
        ['Communism','A political and economic system in which government promotes common ownership of all property and means of production.',['4.4']],
        ['Economic Recession','A period of decline in economic activity, typically defined by two consecutive quarters of negative GDP growth.',['4.4']],
        ['Gross Domestic Product (GDP)','The total value of goods and services produced by an economy.',['4.4']],
        ['Inflation','The rise in the prices of goods and services.',['4.4']],
        ['Budget Deficit','The difference when a government takes in less money than it spends.',['4.4']],
        ['Budget Surplus','The amount of money remaining when the government takes in more money than it spends.',['4.4']],
        ['National Debt','The total amount of money owed by the federal government.',['4.4']],
        ['Federal Reserve System','A board of governors, Federal Reserve Banks, and member banks responsible for monetary policy.',['4.4']],
        ['Progressive Tax','A tax that increases the effective tax rate as the wealth or income of the taxpayer increases.',['4.4']],
        ['Safety Net','A way to provide for members of society experiencing economic hardship.',['4.4']],
        ['Social Welfare Policies','Governmental efforts designed to improve or protect the health, safety, education, and opportunities for citizens.',['4.4']],
        ['Social Insurance Programs','Programs such as Social Security that are financed by payroll taxes paid by individuals.',['4.4']],
        ['Medicare','A federal program that provides health insurance to seniors and the disabled.',['4.4']],
        ['Medicaid','A federal program that provides health care for the poor.',['4.4']],
        ['Entitlement','A program that guarantees benefits to members of a specific group or segment of the population.',['4.4']],
        ['Free Trade','A policy in which a country allows the unfettered flow of goods and services between itself and other countries.',['4.4']],
        ['Protectionism','A policy in which a country charges very high tariffs or does not permit other countries to sell goods within its borders.',['4.4']],
        ['Globalization','The increasing interconnectedness of people, businesses, and countries throughout the world.',['4.4']],
        ['Economic Sanction','A situation in which countries suspend trade or other financial relationships with another country to signal displeasure.',['4.4']],
        ['Need-Based Assistance','Social welfare programs whose benefits are allocated to individuals demonstrating specific needs.',['4.4']],
      ],
    }
  },
  {
    key: 'unit5', label: 'Unit 5: Political Participation', weight: '20-27%',
    groups: {
      'Political Parties': [
        ['Political Party','An organized group of party leaders, officeholders, and voters who work together to elect candidates to political office.',['5.1']],
        ['Party Identification','An individual\'s attachment to a political party.',['5.1']],
        ['Party Ideology','A party\'s philosophy about the proper role of government and its consistent set of positions on major issues.',['5.1']],
        ['Party Platform','A set of positions and policy objectives that members of a political party agree to.',['5.1']],
        ['Party Realignment','A shifting of party alliances within the electorate.',['5.1']],
        ['Party Coalition','Interest groups and like-minded voters who support a political party over time.',['5.1']],
        ['Party Polarization','The shift of party positions from moderate towards ideological extremes.',['5.1']],
        ['Polarization','A sharp ideological distance between political parties.',['5.1']],
        ['Partisanship','Strong support, or even blind allegiance, for a particular political party.',['5.1']],
        ['Two-Party System','A system in which two political parties dominate politics, winning almost all elections.',['5.1']],
        ['Third Party','A minor political party in competition with the two major parties.',['5.1']],
        ['Party Organization','The formal structure of the political party and the active members responsible for coordinating party behavior.',['5.1']],
        ['Party-in-Government','Party identifiers who have been elected to office and are responsible for fulfilling the party\'s promises.',['5.1']],
        ['Party-in-the-Electorate','Members of the voting public who consider themselves part of a political party.',['5.1']],
        ['Party Era','Time period when one party wins most national elections.',['5.1']],
        ['Critical Election','A major national election that signals a change in the balance of power between the two parties.',['5.1']],
        ['Political Machine','An organization that secures votes for a party\'s candidates, usually in exchange for political favors.',['5.1']],
        ['Sorting','The process in which voters change party allegiances in response to shifts in party position.',['5.1']],
        ['Majority Party','The legislative party with over half the seats in a legislative body.',['5.1']],
        ['Minority Party','The legislative party with less than half the seats in a legislative body.',['5.1']],
        ['Majority Party Leader','The head of the party with the most seats in Congress.',['5.1']],
        ['Minority Leader','The head of the party with the second-highest number of seats in Congress.',['5.1']],
      ],
      'Elections and Voting': [
        ['Electoral College','A constitutionally required process for selecting the president through slates of electors chosen in each state.',['5.2']],
        ['Winner-Take-All System','A system in which the candidate who wins the plurality of votes within a state receives all of that state\'s Electoral College votes.',['5.2']],
        ['Franchise (or Suffrage)','The right to vote in political elections.',['5.2']],
        ['Suffrage','The right to vote in political elections.',['5.2']],
        ['Voter Turnout','The number of eligible voters who participate in an election as a percentage of the total number of eligible voters.',['5.2']],
        ['Closed Primary','A primary election in which only those who have registered as a member of a political party may vote.',['5.2']],
        ['Open Primary','A primary election in which all eligible voters may vote, regardless of their party affiliation.',['5.2']],
        ['Top-Two Primary','A primary election in which the two candidates with the most votes, regardless of party, become the nominees.',['5.2']],
        ['Midterm Elections','The congressional elections that occur in the even-numbered years between presidential election years.',['5.2']],
        ['Primary Election','An election in which voters choose delegates for a presidential candidate or a party\'s nominee for Congress.',['5.2']],
        ['National Convention','A meeting where delegates officially select their party\'s nominee for the presidency.',['5.2']],
        ['Superdelegate','Usually a party leader or activist who is not pledged to a candidate based on state primary or caucus outcomes.',['5.2']],
        ['Gerrymandering','The intentional use of redistricting to benefit a specific interest or group of voters.',['5.2']],
        ['Partisan Gerrymandering','Drawing of district boundaries into strange shapes to benefit a political party.',['5.2']],
        ['Safe Seat','A district drawn so members of a party can be assured of winning by a comfortable margin.',['5.2']],
        ['Swing State','A state where levels of support for the parties are similar and elections swing back and forth between Democrats and Republicans.',['5.2']],
        ['Motor Voter Law','A law allowing Americans to register to vote when applying for or renewing their driver\'s licenses.',['5.2']],
        ['Absentee Ballots','Voting completed and submitted by a voter before the day of an election.',['5.2']],
        ['Early Voting','An accommodation that allows voting up to two weeks before Election Day.',['5.2']],
        ['Voter Fatigue','The result when voters grow tired of voting and stay home from the polls.',['5.2']],
        ['Ballot Fatigue','The result when a voter stops voting for offices and initiatives at the bottom of a long ballot.',['5.2']],
        ['Retrospective Voting','Voting based on an assessment of an incumbent\'s past performance.',['5.2']],
        ['Prospective Voting','Casting a ballot for a candidate who promises to enact policies favored by the voter in the future.',['5.2']],
        ['Rational Choice Voting','Voting based on what a citizen believes is in his or her best interest.',['5.2']],
        ['Split-Ticket Voting','Voting for candidates from different parties in the same election.',['5.2']],
        ['Straight-Ticket Voting','Voting for all of the candidates on the ballot from one political party.',['5.2']],
        ['Coattail Effect','The result when a popular presidential candidate helps candidates from the same party win their own elections.',['5.2']],
        ['Incumbent','A political official who is currently in office.',['5.2']],
        ['Get Out the Vote (GOTV)','Efforts to mobilize voters.',['5.2']],
        ['Political Mobilization','Efforts by political parties to encourage their members to vote.',['5.2']],
        ['Twenty-Fourth Amendment','Prohibits poll taxes as a condition for voting in federal elections.',['5.2']],
        ['Voting Rights Act of 1965','Legislation outlawing literacy tests and authorizing the Justice Department to send federal officers to register voters.',['5.2']],
        ['Jim Crow Laws','State and local laws that promoted racial segregation and undermined Black voting rights in the South after Reconstruction.',['5.2']],
        ['Literacy Tests','Tests requiring the prospective voter to read a passage; used to disenfranchise minorities.',['5.2']],
        ['White Primary','A primary election in which only White people are allowed to vote.',['5.2']],
        ['Caucus','A process through which a state\'s eligible voters meet to select delegates for the nomination process.',['5.2']],
        ['Nomination','The formal process through which parties choose their candidates for political office.',['5.2']],
      ],
      'Interest Groups and Lobbying': [
        ['Interest Group','Voluntary association of people who come together with the goal of getting the policies that they favor enacted.',['5.3']],
        ['Lobbying','Interacting with government officials in order to advance a group\'s public policy goals.',['5.3']],
        ['Lobbyist','A person who represents an organization before government in an attempt to influence policy.',['5.3']],
        ['Political Action Committee (PAC)','An organization that raises money for candidates and campaigns.',['5.3']],
        ['Super PAC','An organization that may spend an unlimited amount of money on a political campaign, as long as the spending is not coordinated with the campaign.',['5.3']],
        ['Citizens United','Citizens United v. FEC; a 2010 Supreme Court case that granted corporations and unions the right to spend unlimited amounts of money on elections.',['5.3']],
        ['Soft Money','Money that interests can spend on behalf of candidates without being restricted by federal law.',['5.3']],
        ['Iron Triangle','Coordinated and mutually beneficial activities of the bureaucracy, Congress, and interest groups to achieve shared policy goals.',['5.3']],
        ['Issue Network','Webs of influence between interest groups, policymakers, and policy advocates.',['5.3']],
        ['Inside Lobbying','The act of contacting and taking the organization\'s message directly to lawmakers.',['5.3']],
        ['Outside Lobbying','The act of lobbying indirectly by taking the organization\'s message to the public, often through the media.',['5.3']],
        ['Grassroots Lobbying','Mobilizing interest group members to pressure their representatives by contacting them directly.',['5.3']],
        ['Astroturf Movement','A political movement that resembles a grassroots movement but is often supported or facilitated by wealthy interests.',['5.3']],
        ['Venue Shopping','A strategy in which interest groups select the level and branch of government most receptive to their policy goals.',['5.3']],
        ['Disturbance Theory','The theory that an external event can lead to interest group mobilization.',['5.3']],
        ['Free Rider','Individual who enjoys collective goods and benefits from the actions of an interest group without joining.',['5.3']],
        ['Free Rider Problem','The situation that occurs when some individuals receive benefits without helping to bear the cost.',['5.3']],
        ['Amicus Curiae Brief','A brief filed by someone who is not a party to a case in an attempt to persuade the court.',['5.3']],
        ['Social Movement','Large groups of citizens organizing for political change.',['5.3']],
        ['Collective Action','Political action that occurs when individuals contribute their energy, time, or money to a larger group goal.',['5.3']],
        ['Single-Issue Group','Association focusing on one specific area of public policy, often a moral issue about which they are unwilling to compromise.',['5.3']],
        ['Solidary Incentives','Benefits based on the concept that people like to associate with those who are similar to them.',['5.3']],
        ['Material Incentives','Substantive monetary or physical benefits given to group members.',['5.3']],
        ['Purposive Incentives','Benefits that appeal to people\'s support of the issue or cause.',['5.3']],
        ['Revolving Door','The movement of individuals between government and lobbying positions.',['5.3']],
      ],
      'Media and Political Communication': [
        ['Mass Media','Sources of information that appeal to a wide audience, including newspapers, radio, television, and Internet outlets.',['5.4']],
        ['Linkage Institutions','Channels that connect individuals with government, including elections, political parties, interest groups, and the media.',['5.4']],
        ['Agenda Setting','The media\'s ability to highlight certain issues and bring them to the attention of the public.',['5.4']],
        ['Media Effects','The power of the news media in shaping individuals\' political knowledge, preferences, and political behavior.',['5.4']],
        ['Framing','The process of giving a news story a specific context or background.',['5.4']],
        ['Priming','The process of predisposing readers or viewers to think a particular way.',['5.4']],
        ['Media Consolidation','The concentration of ownership of the media into fewer corporations.',['5.4']],
        ['Social Media','Forms of electronic communication that enable users to create and share content or to participate in social networking.',['5.4']],
        ['Partisan Bias','The slanting of political news coverage in support of a particular political party or ideology.',['5.4']],
        ['Horse-Race Journalism','Coverage of political campaigns that focuses more on the drama of the campaign than on policy issues.',['5.4']],
        ['Citizen Journalism','Video and print news posted to the Internet or social media by citizens rather than the news media.',['5.4']],
        ['Investigative Journalism','An approach to newsgathering in which reporters dig into stories, often looking for instances of wrongdoing.',['5.4']],
        ['Muckraking','News coverage focusing on exposing corrupt business and government practices.',['5.4']],
        ['Minimal Effects Theory','The idea that the media have little effect on citizens.',['5.4']],
        ['Cultivation Theory','The idea that media affect a citizen\'s worldview through the information presented.',['5.4']],
        ['Hypodermic Theory','The idea that information is placed in a citizen\'s brain and accepted.',['5.4']],
        ['Soft News','News presented in an entertaining style.',['5.4']],
        ['Overt Content','Political information whose author makes clear that only one side is presented.',['5.4']],
        ['Covert Content','Ideologically slanted information presented as unbiased information in order to influence public opinion.',['5.4']],
        ['Yellow Journalism','Sensationalized coverage of scandals and human interest stories.',['5.4']],
        ['Fairness Doctrine','A 1949 FCC policy (now defunct) that required holders of broadcast licenses to cover controversial issues in a balanced manner.',['5.4']],
        ['Equal-Time Rule','An FCC policy that all candidates running for office must be given the same radio and television airtime opportunities.',['5.4']],
        ['Digital Divide','Divisions in society driven by access to and knowledge about technologies.',['5.4']],
        ['Net Neutrality','An FCC rule that required internet service providers to treat all data and content providers equally.',['5.4']],
        ['Aggregating','A process through which internet news providers relay news as reported by journalists and other sources.',['5.4']],
      ],
      'Political Participation and Campaigns': [
        ['Political Participation','The different ways in which individuals take action to shape the laws and policies of a government.',['5.5']],
        ['Protest','A public demonstration designed to call attention to the need for change.',['5.5']],
        ['Political Efficacy','A person\'s belief that he or she can make effective political change.',['5.5']],
        ['Participatory Democracy','The theory that widespread political participation is essential for democratic government.',['5.5']],
        ['Candidate-Centered Campaign','A trend in which candidates develop their own strategies and raise money with less influence from the party elite.',['5.5']],
        ['Shadow Campaign','A campaign run by political action committees and other organizations without the coordination of the candidate.',['5.5']],
        ['Surge-And-Decline Theory','A theory proposing that the surge of stimulation during presidential elections subsides during midterm elections.',['5.5']],
        ['Policy Agenda','The set of issues to which government officials, voters, and the public are paying attention.',['5.5']],
        ['Policy Advocates','People who actively work to propose or maintain public policy.',['5.5']],
        ['Front-Loading','A decision by a state to push its primary or caucus as early as possible to gain more influence.',['5.5']],
        ['Recruitment','The process through which political parties identify potential candidates.',['5.5']],
        ['Incumbency Advantage','Institutional advantages held by those already in office who are trying to fend off challengers in an election.',['5.5']],
        ['Era of Divided Government','A trend since 1969 in which one party controls one or both houses of Congress while the president is from the opposing party.',['5.5']],
        ['Voting Cues','Sources that lawmakers use to help them decide how to vote, especially on unfamiliar issues.',['5.5']],
      ],
    }
  },
];

// ══════════════════════════════════════════════════════════
//  FLAT INDEX (for search and tooltip)
// ══════════════════════════════════════════════════════════
const TERM_INDEX = new Map();
GLOSSARY_UNITS.forEach(u => {
  Object.entries(u.groups).forEach(([group, terms]) => {
    terms.forEach(([term, def, standards]) => {
      const key = term.toLowerCase();
      if (!TERM_INDEX.has(key)) {
        TERM_INDEX.set(key, { term, def, unit: u.key, unitLabel: u.label, unitNum: u.key.replace('unit',''), group, standards: standards || [] });
      }
    });
  });
});

// ══════════════════════════════════════════════════════════

var FRQ_TIMER_DATA = [
  {
    type: 'Concept Application', pts: 3, minutes: 10,
    checklist: [
      'Described the scenario accurately in your own words',
      'Identified the specific AP concept named in the prompt',
      'Explained how the concept applies to this scenario',
      'Brought the answer back to the specific scenario (not generic)',
    ]
  },
  {
    type: 'Quantitative Analysis', pts: 4, minutes: 15,
    checklist: [
      'Read the data source title and labels carefully',
      'Described what the data shows (no interpretation yet)',
      'Identified a trend or pattern in the data',
      'Connected the data to a specific AP Gov concept',
      'Used specific data as evidence (numbers, labels)',
    ]
  },
  {
    type: 'SCOTUS Comparison', pts: 4, minutes: 15,
    checklist: [
      'Identified the constitutional principle at stake',
      'Described the ruling of the required case',
      "Explained the Court\'s reasoning (not just outcome)",
      'Compared to the non-required case (similarities AND differences)',
      'Applied reasoning to the new scenario if asked',
    ]
  },
  {
    type: 'Argumentative Essay', pts: 6, minutes: 25,
    checklist: [
      'Stated a defensible claim -- took a clear position',
      'Used at least ONE required foundational document',
      'Provided evidence from TWO different sources',
      'Explained how evidence supports your argument',
      'Responded to the opposing perspective',
      'Concluded with a broader implication',
    ]
  }
];

function buildFrqTimerUI() {
  var btns = document.getElementById('frq-type-btns');
  if (!btns) return;
  btns.innerHTML = FRQ_TIMER_DATA.map(function(f, i) {
    return '<button class="frq-type-pick-btn' + (i === 3 ? ' active' : '') +
      '" onclick="frqSelectType(' + i + ')">' + f.type + '</button>';
  }).join('');
  frqSelectType(3); // Default to Argumentative
}

function frqSelectType(idx) {
  frqSelectedType = FRQ_TIMER_DATA[idx];
  // Update button states
  document.querySelectorAll('.frq-type-pick-btn').forEach(function(b, i) {
    b.classList.toggle('active', i === idx);
  });
  frqTimerReset();
  // Update pts badge and label
  document.getElementById('frq-pts-badge').textContent = frqSelectedType.pts + ' pts';
  document.getElementById('frq-pts-label').textContent = frqSelectedType.type;
  // Build checklist
  var cl = document.getElementById('frq-checklist');
  cl.innerHTML = '<div class="frq-checklist-title">Scoring Checklist</div>' +
    frqSelectedType.checklist.map(function(item) {
      return '<div class="frq-check-item" onclick="frqToggleCheck(this)">' +
        '<div class="frq-check-box"></div>' +
        '<div class="frq-check-text">' + item + '</div>' +
        '</div>';
    }).join('');
}

function frqTimerToggle() {
  if (frqRunning) {
    clearInterval(frqTimerInterval);
    frqRunning = false;
    document.getElementById('frq-start-btn').textContent = 'Resume';
  } else {
    frqRunning = true;
    document.getElementById('frq-start-btn').textContent = 'Pause';
    frqTimerInterval = setInterval(function() {
      frqTimeLeft--;
      frqUpdateClock();
      if (frqTimeLeft <= 0) {
        clearInterval(frqTimerInterval);
        frqRunning = false;
        document.getElementById('frq-start-btn').textContent = 'Start';
        document.getElementById('frq-clock').textContent = 'TIME!';
        document.getElementById('frq-clock').classList.add('warning');
      }
    }, 1000);
  }
}

function frqTimerReset() {
  clearInterval(frqTimerInterval);
  frqRunning = false;
  frqTimeLeft = frqSelectedType ? frqSelectedType.minutes * 60 : 1500;
  document.getElementById('frq-start-btn').textContent = 'Start';
  var clock = document.getElementById('frq-clock');
  clock.classList.remove('warning');
  frqUpdateClock();
  // Reset checklist
  document.querySelectorAll('.frq-check-item').forEach(function(item) {
    item.classList.remove('checked');
  });
}

function frqUpdateClock() {
  var m = Math.floor(frqTimeLeft / 60);
  var s = frqTimeLeft % 60;
  var clock = document.getElementById('frq-clock');
  clock.textContent = m + ':' + (s < 10 ? '0' : '') + s;
  if (frqTimeLeft <= 120 && frqTimeLeft > 0) clock.classList.add('warning');
  else clock.classList.remove('warning');
}

function frqToggleCheck(el) {
  el.classList.toggle('checked');
}

// Build FRQ timer when review tab is opened
var frqTimerBuilt = false;
// FRQ timer UI now handled by frqPracticeBuilt listener below


// ══════════════════════════════════════════════════════════
//  ADMIN PANEL -- type "dev" anywhere to open
// ══════════════════════════════════════════════════════════
(function() {
  var keyBuffer = '';
  var SECRET = 'dev';

  document.addEventListener('keydown', function(e) {
    // Ignore if typing in an input/textarea
    var tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    keyBuffer += e.key.toLowerCase();
    if (keyBuffer.length > SECRET.length) keyBuffer = keyBuffer.slice(-SECRET.length);
    if (keyBuffer === SECRET) { openAdmin(); keyBuffer = ''; }
  });
})();


