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
    name: "Roe v. Wade", year: 1973, unit: 3,
    issue: "Does the Constitution protect a woman's right to an abortion?",
    ruling: "Yes (at the time). The right to privacy under the 14th Amendment extends to abortion decisions.",
    sig: "Established a constitutional right to abortion (later overturned by Dobbs v. Jackson, 2022). Based on implied right to privacy.",
    tip: "Know this was overturned in 2022 by Dobbs. The AP exam still includes it as a required case -- focus on the privacy/14th Amendment rationale."
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
  { name: "Federalist No. 76", type: "Federalist Paper", year: "1788" },
  { name: "Emancipation Proclamation", type: "Executive Order", year: "1863" },
  { name: "Federalist No. 39", type: "Federalist Paper", year: "1788" },
  { name: "The Gettysburg Address", type: "Speech", year: "1863" },
  { name: "Adam Smith -- The Wealth of Nations (Core Principles)", type: "Economic Text", year: "1776" },
  { name: "Letter from Birmingham Jail", type: "Historical Document", year: "1963" }
];

// ══════════════════════════════════════════════════════════
//  DATA: THIS DAY IN GOV HISTORY (curated fallbacks, date-keyed)
//  Format: "M/D": [ { year, text }, ... ]
// ══════════════════════════════════════════════════════════
const GOV_HISTORY = {
  "1/1":  [{ year: "1863", text: "President Lincoln issues the Emancipation Proclamation, declaring enslaved people in Confederate states to be free." }],
  "1/4":  [{ year: "1965", text: "President Lyndon B. Johnson outlines his 'Great Society' domestic program in his State of the Union address." }],
  "1/8":  [{ year: "1918", text: "President Woodrow Wilson presents his Fourteen Points to Congress, his vision for post-WWI peace including the League of Nations." }],
  "1/20": [{ year: "1961", text: "John F. Kennedy is inaugurated, delivering his famous address: 'Ask not what your country can do for you--ask what you can do for your country.'" }],
  "2/3":  [{ year: "1870", text: "The 15th Amendment is ratified, prohibiting denial of the vote based on race, color, or previous condition of servitude." }],
  "2/6":  [{ year: "1933", text: "The 20th Amendment is ratified, moving the presidential inauguration date from March 4 to January 20." }],
  "2/24": [{ year: "1803", text: "Chief Justice John Marshall delivers the Marbury v. Madison opinion, establishing the doctrine of judicial review." }],
  "3/4":  [{ year: "1933", text: "Franklin D. Roosevelt is inaugurated during the Great Depression, declaring 'The only thing we have to fear is fear itself.'" }],
  "3/5":  [{ year: "1770", text: "The Boston Massacre occurs, becoming a catalyst for colonial opposition to British rule." }],
  "3/6":  [{ year: "1857", text: "The Supreme Court issues Dred Scott v. Sandford, ruling that enslaved people are property, not citizens." }],
  "3/25": [{ year: "1965", text: "Martin Luther King Jr. leads the Selma-to-Montgomery voting rights march, a key event leading to the Voting Rights Act of 1965." }],
  "4/9":  [{ year: "1865", text: "Confederate General Robert E. Lee surrenders at Appomattox Court House, effectively ending the Civil War." }],
  "4/12": [{ year: "1861", text: "Confederate forces fire on Fort Sumter, South Carolina, beginning the Civil War." }],
  "4/14": [{ year: "1865", text: "President Abraham Lincoln is shot at Ford's Theatre; he dies the following morning." }],
  "4/19": [{ year: "1775", text: "Battles of Lexington and Concord -- 'the shot heard round the world' -- begin the American Revolutionary War." }],
  "5/17": [{ year: "1954", text: "The Supreme Court unanimously rules in Brown v. Board of Education that racial segregation in public schools is unconstitutional." }],
  "5/18": [{ year: "1896", text: "The Supreme Court decides Plessy v. Ferguson, establishing the 'separate but equal' doctrine that would stand for 58 years." }],
  "5/25": [{ year: "1787", text: "The Constitutional Convention opens in Philadelphia with delegates from 12 states -- the drafting of the U.S. Constitution begins." }],
  "6/2":  [{ year: "1924", text: "President Coolidge signs the Indian Citizenship Act, granting U.S. citizenship to all Native Americans born in the country." }],
  "6/5":  [{ year: "1968", text: "Senator Robert F. Kennedy is assassinated in Los Angeles after winning the California Democratic primary." }],
  "6/13": [{ year: "1966", text: "The Supreme Court rules in Miranda v. Arizona that suspects must be informed of their rights before police interrogation." }],
  "6/15": [{ year: "1215", text: "King John of England seals the Magna Carta -- the foundational document for constitutional limits on government power, later influencing the Founders." }],
  "6/17": [{ year: "1972", text: "Five men are arrested breaking into the Democratic National Committee headquarters at the Watergate complex, beginning the Watergate scandal." }],
  "6/19": [{ year: "1865", text: "Juneteenth: Union soldiers arrive in Galveston, Texas, announcing the end of slavery -- two months after the Civil War ended." }],
  "6/20": [{ year: "1788", text: "New Hampshire becomes the 9th state to ratify the Constitution, the minimum needed to put it into effect." }],
  "6/21": [{ year: "1788", text: "The U.S. Constitution officially goes into effect after New Hampshire's ratification the prior day." }],
  "6/26": [{ year: "2015", text: "The Supreme Court rules in Obergefell v. Hodges that the Constitution guarantees a right to same-sex marriage nationwide." }],
  "7/2":  [{ year: "1964", text: "President Lyndon B. Johnson signs the Civil Rights Act of 1964, outlawing discrimination based on race, color, religion, sex, or national origin." }],
  "7/4":  [{ year: "1776", text: "The Continental Congress formally adopts the Declaration of Independence, asserting that 'all men are created equal.'" }],
  "7/9":  [{ year: "1868", text: "The 14th Amendment is ratified, granting citizenship to former enslaved people and guaranteeing equal protection and due process." }],
  "7/26": [{ year: "1948", text: "President Truman signs Executive Order 9981, desegregating the United States Armed Forces." }],
  "8/6":  [{ year: "1965", text: "President Johnson signs the Voting Rights Act of 1965, prohibiting discriminatory voting practices that had disenfranchised Black Americans." }],
  "8/9":  [{ year: "1974", text: "President Richard Nixon resigns from office following the Watergate scandal, the only president to do so." }],
  "8/18": [{ year: "1920", text: "The 19th Amendment is ratified, granting women the right to vote after a decades-long suffrage movement." }],
  "8/26": [{ year: "1920", text: "Women officially gained the right to vote as Secretary of State Bainbridge Colby certified the 19th Amendment." }],
  "8/28": [{ year: "1963", text: "Martin Luther King Jr. delivers his 'I Have a Dream' speech at the March on Washington, calling for civil rights and racial equality." }],
  "9/4":  [{ year: "1957", text: "Arkansas Governor Orval Faubus calls out the National Guard to prevent Black students from entering Little Rock Central High School." }],
  "9/9":  [{ year: "1776", text: "The Continental Congress officially renames the country from 'United Colonies' to 'United States.'" }],
  "9/17": [{ year: "1787", text: "Delegates to the Constitutional Convention sign the final draft of the U.S. Constitution in Philadelphia." }],
  "9/22": [{ year: "1862", text: "President Lincoln issues the preliminary Emancipation Proclamation, announcing his intention to free enslaved people in rebel states." }],
  "10/2": [{ year: "1967", text: "Thurgood Marshall is sworn in as the first African American Supreme Court Justice." }],
  "10/7": [{ year: "1777", text: "American forces defeat British troops at the Battle of Saratoga -- a turning point that brings France into the Revolutionary War." }],
  "10/26":[{ year: "2001", text: "President Bush signs the USA PATRIOT Act into law, expanding government surveillance powers after the September 11 attacks." }],
  "11/2": [{ year: "1920", text: "Warren G. Harding wins the first presidential election in which women could vote nationally following the 19th Amendment." }],
  "11/8": [{ year: "1960", text: "John F. Kennedy defeats Richard Nixon in one of the closest presidential elections in U.S. history." }],
  "11/19":[{ year: "1863", text: "President Lincoln delivers the Gettysburg Address, reframing the Civil War as a fight for democratic equality." }],
  "12/7": [{ year: "1941", text: "Japan attacks Pearl Harbor; President Roosevelt calls it 'a date which will live in infamy' and Congress declares war." }],
  "12/10":[{ year: "1948", text: "The United Nations adopts the Universal Declaration of Human Rights, drafted with significant U.S. involvement." }],
  "12/15":[{ year: "1791", text: "The Bill of Rights -- the first 10 amendments to the Constitution -- is ratified, protecting individual liberties from government overreach." }]
};

// ══════════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════════
let contentData = null;
let tdihEvents = [];
let tdihIndex = 0;
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
        "Federalist No. 76"
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
        "Roe v. Wade (1973)",
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
  loadHistory().catch(() => {
    // TDIH failed silently -- fallback already handled inside loadHistory
  });
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
//  THIS DAY IN HISTORY
// ══════════════════════════════════════════════════════════
async function loadHistory() {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const key = m + '/' + d;

  const GOV_KEYWORDS = [
    'congress', 'senate', 'house of representatives', 'president', 'constitution',
    'amendment', 'supreme court', 'court', 'law', 'act', 'bill', 'signed',
    'ratified', 'election', 'vote', 'declaration', 'independence', 'rights',
    'civil', 'government', 'federal', 'republic', 'democracy', 'treaty',
    'inaugural', 'white house', 'justice', 'ruling', 'landmark', 'congress',
    'legislature', 'veto', 'impeach', 'suffrage', 'segregation', 'slavery'
  ];

  // First try Wikipedia's On This Day API
  try {
    const controller = new AbortController();
    const tId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`https://history.muffinlabs.com/date/${m}/${d}`, { signal: controller.signal });
    clearTimeout(tId);
    const data = await res.json();
    const events = data.data.Events;

    const scored = events.map(e => {
      const text = e.text.toLowerCase();
      const score = GOV_KEYWORDS.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
      return { year: e.year, text: e.text, score };
    });

    scored.sort((a, b) => b.score - a.score);
    // Take top 5 government-relevant events
    tdihEvents = scored.slice(0, 5).filter(e => e.score > 0);

    if (tdihEvents.length === 0 && GOV_HISTORY[key]) {
      tdihEvents = GOV_HISTORY[key];
    } else if (tdihEvents.length === 0) {
      tdihEvents = [{ year: '--', text: 'No notable American government events found for today.' }];
    }
  } catch (err) {
    // Fall back to our curated data
    tdihEvents = GOV_HISTORY[key] || [
      { year: '--', text: 'Historical data unavailable. Check your connection.' }
    ];
  }

  tdihIndex = 0;
  renderTdih();
}

function renderTdih() {
  if (!tdihEvents.length) return;
  const e = tdihEvents[tdihIndex];
  document.getElementById('tdih-year').textContent = e.year ? 'On This Day in ' + e.year : 'On This Day';
  document.getElementById('tdih-text').textContent = e.text;

  // Prev/next visibility
  document.getElementById('tdih-prev').disabled = tdihIndex === 0;
  document.getElementById('tdih-next').disabled = tdihIndex === tdihEvents.length - 1;
  document.getElementById('tdih-prev').style.opacity = tdihIndex === 0 ? '0.35' : '1';
  document.getElementById('tdih-next').style.opacity = tdihIndex === tdihEvents.length - 1 ? '0.35' : '1';
}

document.getElementById('tdih-prev').addEventListener('click', () => {
  if (tdihIndex > 0) { tdihIndex--; renderTdih(); }
});
document.getElementById('tdih-next').addEventListener('click', () => {
  if (tdihIndex < tdihEvents.length - 1) { tdihIndex++; renderTdih(); }
});
document.getElementById('tdih-discuss').addEventListener('click', () => {
  if (!tdihEvents.length) return;
  const e = tdihEvents[tdihIndex];
  const text = `Discussion starter: In ${e.year}, ${e.text} -- How does this event connect to what we're studying in AP Gov?`;
  // Copy to clipboard
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('tdih-discuss');
    btn.textContent = '✓ Copied!';
    setTimeout(() => btn.textContent = 'Use as Discussion Starter', 2000);
  }).catch(() => {
    alert(text);
  });
});

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
      <div class="unit-card${isCurrent ? ' current-unit' : ''}">
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
const TAB_IDS = ['home', 'units', 'review', 'glossary', 'docs', 'diagnostic', 'stump', 'amendments', 'archive', 'exit'];

// ── Nav tab switcher (handles flat tabs + dropdown tabs) ──
function switchToTab(target) {
  // Remove active from all tabs
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  // Remove has-active from all groups
  document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('has-active'));

  // Find and activate the clicked tab
  const activeTab = document.querySelector('.nav-tab[data-tab="' + target + '"]');
  if (activeTab) {
    activeTab.classList.add('active');
    // If it's inside a dropdown group, mark the group as has-active
    const group = activeTab.closest('.nav-group');
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
}

document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.tab) switchToTab(tab.dataset.tab);
  });
});

// Ensure home tab shows on load
TAB_IDS.forEach(id => {
  const el = document.getElementById('tab-' + id);
  if (el && id !== 'home') el.style.display = 'none';
});

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


var LIVING_DOCS = [
  {
    id: 'declaration',
    title: 'Declaration of Independence',
    year: 1776,
    author: 'Thomas Jefferson',
    intro: 'The Declaration announced American independence from Britain and established the philosophical foundation for American democracy -- natural rights, popular sovereignty, and the social contract. It is the "why" behind the Constitution\'s "how."',
    sections: [
      {
        title: 'Preamble & Natural Rights',
        clauses: [
          {
            num: '¶1',
            text: 'When in the Course of human events, it becomes necessary for one people to dissolve the political bands...',
            plain: 'When a people need to break away from their government, they should explain why to the world.',
            standards: ['1.1'],
            cases: [],
            connections: 'Introduces the idea of popular sovereignty -- the people have the right to change their government.'
          },
          {
            num: '¶2',
            text: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.',
            plain: 'All people are born equal and have rights that cannot be taken away -- life, liberty, and the pursuit of happiness.',
            standards: ['1.1', '3.4'],
            cases: ['Brown v. Board of Education'],
            connections: 'Foundation for the Equal Protection Clause (14th Amendment) and all civil rights arguments. Lincoln cited this in the Gettysburg Address.'
          },
          {
            num: '¶3',
            text: 'That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed.',
            plain: 'Governments exist to protect these rights, and their power comes from the people -- not from kings or tradition.',
            standards: ['1.1'],
            cases: [],
            connections: 'Defines popular sovereignty. Direct source for the concept that appears in AP Gov FRQs about the basis of legitimate government.'
          },
          {
            num: '¶4',
            text: 'That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it...',
            plain: 'When a government fails to protect rights, the people have the right to change or replace it.',
            standards: ['1.1'],
            cases: [],
            connections: 'The social contract theory of Locke -- government by consent, with the right of revolution if that contract is broken.'
          }
        ]
      }
    ]
  },
  {
    id: 'fed10',
    title: 'Federalist No. 10',
    year: 1787,
    author: 'James Madison',
    intro: 'Madison\'s most important essay argues that a large republic is the best defense against "factions" -- groups that pursue their own interests at the expense of the common good. This is the foundational argument for the entire Constitution.',
    sections: [
      {
        title: 'The Problem of Faction',
        clauses: [
          {
            num: '§1',
            text: 'Among the numerous advantages promised by a well-constructed Union, none deserves to be more accurately developed than its tendency to break and control the violence of faction.',
            plain: 'One of the biggest advantages of a strong national government is its ability to control dangerous factions -- groups that put their own interests above everyone else\'s.',
            standards: ['1.3'],
            cases: [],
            connections: 'Madison defines the central problem the Constitution solves. Every AP Gov unit traces back to this tension.'
          },
          {
            num: '§2',
            text: 'By a faction, I understand a number of citizens... who are united and actuated by some common impulse of passion, or of interest, adverse to the rights of other citizens, or to the permanent and aggregate interests of the community.',
            plain: 'A faction is any group -- majority or minority -- that pursues its own interests at the expense of other citizens or the common good.',
            standards: ['1.3', '5.3'],
            cases: [],
            connections: 'Directly relevant to interest groups (Unit 5). Madison predicted exactly what PACs and lobbying groups would become.'
          },
          {
            num: '§3',
            text: 'There are two methods of curing the mischiefs of faction: the one, by removing its causes; the other, by controlling its effects.',
            plain: 'You can either eliminate the causes of factions (impossible in a free society) or design a system that controls their effects. Madison chooses the second.',
            standards: ['1.3'],
            cases: [],
            connections: 'Sets up his argument for the large republic. This is why we have so many checks and balances -- not to prevent factions, but to prevent any one from winning completely.'
          }
        ]
      },
      {
        title: 'The Republican Solution',
        clauses: [
          {
            num: '§4',
            text: 'The effect of... is to refine and enlarge the public views, by passing them through the medium of a chosen body of citizens, whose wisdom may best discern the true interest of their country.',
            plain: 'A representative republic -- not a direct democracy -- filters public opinion through elected officials who can make wiser decisions than a mob.',
            standards: ['1.3'],
            cases: [],
            connections: 'The argument for representative democracy over direct democracy. Links to the Trustee vs. Delegate models of representation.'
          },
          {
            num: '§5',
            text: 'Extend the sphere, and you take in a greater variety of parties and interests; you make it less probable that a majority of the whole will have a common motive to invade the rights of other citizens.',
            plain: 'The bigger the republic, the more groups there are competing -- making it harder for any single faction to dominate.',
            standards: ['1.3'],
            cases: [],
            connections: 'The core argument of Federalist 10. A large diverse nation prevents tyranny better than a small homogeneous one.'
          }
        ]
      }
    ]
  },
  {
    id: 'fed51',
    title: 'Federalist No. 51',
    year: 1788,
    author: 'James Madison',
    intro: 'If Federalist 10 explains why we need the Constitution, Federalist 51 explains how it works. Madison argues that the structure of government itself -- separation of powers, checks and balances -- prevents tyranny without relying on the goodness of those in power.',
    sections: [
      {
        title: 'Structure as Safeguard',
        clauses: [
          {
            num: '§1',
            text: 'In order to lay a due foundation for that separate and distinct exercise of the different powers of government... it is evident that each department should have a will of its own.',
            plain: 'For separation of powers to actually work, each branch of government needs to be independent -- its own source of authority, not depending on the others.',
            standards: ['2.2'],
            cases: ['U.S. v. Nixon'],
            connections: 'The entire structure of Articles I, II, and III flows from this principle. Key for any FRQ about separation of powers.'
          },
          {
            num: '§2',
            text: 'Ambition must be made to counteract ambition. The interest of the man must be connected with the constitutional rights of the place.',
            plain: 'Since people are self-interested, design the system so that each official\'s personal ambition keeps them from letting others take too much power.',
            standards: ['2.2'],
            cases: [],
            connections: 'The most-quoted line in AP Gov. Madison is arguing for human nature -- not virtue -- as the foundation of constitutional government.'
          },
          {
            num: '§3',
            text: 'If men were angels, no government would be necessary. If angels were to govern men, neither external nor internal controls on government would be necessary.',
            plain: 'Because humans are flawed, we need government. And because those in government are also human, we need checks on them too.',
            standards: ['2.2', '1.1'],
            cases: [],
            connections: 'The most powerful sentence in the Federalist Papers. Appears on AP exams constantly. Know it cold.'
          }
        ]
      },
      {
        title: 'Federalism as Double Security',
        clauses: [
          {
            num: '§4',
            text: 'In the compound republic of America, the power surrendered by the people is first divided between two distinct governments, and then the portion allotted to each subdivided among distinct and separate departments.',
            plain: 'Americans give up power at two levels: to the national government AND state governments. Then each level is divided into three branches. Double protection.',
            standards: ['1.2', '2.2'],
            cases: ['McCulloch v. Maryland'],
            connections: 'This is the argument for federalism AND separation of powers working together. The dual layer of checks and balances.'
          }
        ]
      }
    ]
  },
  {
    id: 'brutus1',
    title: 'Brutus No. 1',
    year: 1787,
    author: 'Robert Yates (attributed)',
    intro: 'The most important Anti-Federalist paper, Brutus No. 1 argues AGAINST ratifying the Constitution. Its author feared the national government would swallow the states, the military would become oppressive, and the Necessary and Proper Clause would give Congress unlimited power. Many of these warnings proved prophetic.',
    sections: [
      {
        title: 'The Danger of Consolidated Government',
        clauses: [
          {
            num: '§1',
            text: 'This government is to possess absolute and uncontroulable power, legislative, executive and judicial, with respect to every object to which it extends.',
            plain: 'The proposed national government will have total power over everything it touches -- with no limits from the states.',
            standards: ['1.3', '1.2'],
            cases: [],
            connections: 'The Anti-Federalist fear that the Supremacy Clause would eliminate state power. Compare directly to Federalist 51\'s response.'
          },
          {
            num: '§2',
            text: 'The general legislature... are authorised to make all laws which shall be necessary and proper for carrying into execution the foregoing powers.',
            plain: 'The Necessary and Proper Clause essentially gives Congress unlimited legislative power.',
            standards: ['1.3', '2.1'],
            cases: ['McCulloch v. Maryland'],
            connections: 'Brutus predicted exactly how the Elastic Clause would be used. McCulloch v. Maryland (1819) confirmed his fears by broadly interpreting implied powers.'
          },
          {
            num: '§3',
            text: 'In a republic, the manners, sentiments, and interests of the people should be similar. If this be not the case, there will be a constant clashing of opinions.',
            plain: 'A republic only works in a small, homogeneous community where people share values. America is too big and diverse to be one republic.',
            standards: ['1.3'],
            cases: [],
            connections: 'The direct counter to Federalist 10. Where Madison sees diversity as a strength, Brutus sees it as a fatal weakness.'
          }
        ]
      }
    ]
  },
  {
    id: 'gettysburg',
    title: 'The Gettysburg Address',
    year: 1863,
    author: 'Abraham Lincoln',
    intro: 'In 272 words, Lincoln redefined what the Civil War was about -- not just saving the Union, but fulfilling the promise of the Declaration of Independence. He reframed American democracy around equality and popular sovereignty, giving both new meaning. Required document per EK 1.1.A.3.',
    sections: [
      {
        title: 'The Address',
        clauses: [
          {
            num: '¶1',
            text: 'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.',
            plain: 'Eighty-seven years ago (1776), the founders created a nation built on the idea that all people are equal.',
            standards: ['1.1', '3.4'],
            cases: ['Brown v. Board of Education'],
            connections: 'Lincoln reaches back to 1776 -- not 1787 -- as the nation\'s founding moment. Equality, not the Constitution, is the nation\'s core promise. This reframes the entire debate about civil rights.'
          },
          {
            num: '¶2',
            text: 'Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure.',
            plain: 'The Civil War is a test of whether a democracy built on equality can survive.',
            standards: ['1.1'],
            cases: [],
            connections: 'Lincoln frames the war as a test of democracy itself -- not just American union. This is the argument for why preserving the Union matters to the world.'
          },
          {
            num: '¶3',
            text: '...that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.',
            plain: 'America will be reborn with true freedom, and government by the consent of the governed will survive.',
            standards: ['1.1'],
            cases: [],
            connections: 'Popular sovereignty defined in its most powerful form. "Government of the people, by the people, for the people" is Lincoln\'s restatement of the social contract -- and the most quoted definition of democracy in American history.'
          }
        ]
      }
    ]
  },
  {
    id: 'emancipation',
    title: 'Emancipation Proclamation',
    year: 1863,
    author: 'Abraham Lincoln',
    intro: 'Issued January 1, 1863, the Emancipation Proclamation declared enslaved people in Confederate states to be free. It was a war measure -- limited in scope but massive in meaning. It reframed the Civil War as a war against slavery and set the stage for the 13th Amendment. Required document per EK 3.12.A.1.',
    sections: [
      {
        title: 'Key Provisions',
        clauses: [
          {
            num: '§1',
            text: 'All persons held as slaves within any State or designated part of a State, the people whereof shall then be in rebellion against the United States, shall be then, thenceforward, and forever free.',
            plain: 'All enslaved people in Confederate states are declared permanently free as of January 1, 1863.',
            standards: ['3.12', '3.4'],
            cases: ['Brown v. Board of Education'],
            connections: 'Note what it did NOT do: it did not free enslaved people in border states loyal to the Union (Kentucky, Missouri, Maryland, Delaware). Lincoln used his war powers as commander-in-chief, not Congress.'
          },
          {
            num: '§2',
            text: 'The Executive Government of the United States, including the military and naval authorities thereof, will recognize and maintain the freedom of such persons.',
            plain: 'The federal government and military will enforce and protect this freedom.',
            standards: ['3.12', '2.3'],
            cases: [],
            connections: 'Lincoln used executive/war powers to issue the Proclamation -- not an act of Congress. This is a key example of presidential inherent/war powers. The 13th Amendment (1865) made abolition permanent and universal.'
          }
        ]
      }
    ]
  },
  {
    id: "fed39",
    title: "Federalist No. 39",
    year: 1788,
    author: "James Madison",
    intro: "Required document per Fall 2026 CED (EK 1.7.A.1). Madison argues the Constitution creates a government that is neither purely national nor purely federal -- a unique hybrid that divides authority to prevent tyranny while allowing broad political participation.",
    sections: [{
      title: "National vs. Federal Character",
      clauses: [
        { num: "S1", text: "The Constitution is to be founded on the assent and ratification of the people of America... not as individuals composing one entire nation, but as composing the distinct and individual States to which they respectively belong.", plain: "The Constitution is ratified by the people acting through their states -- making it partly federal rather than purely national.", standards: ["1.7"], cases: ["McCulloch v. Maryland"], connections: "Madison's key argument for how the Constitution balances national and state power. The ratification process itself reflects a federal, not national, character." },
        { num: "S2", text: "The government is of a mixed nature. In its foundation it is federal, not national; in the sources from which the ordinary powers of the government are drawn, it is partly federal and partly national.", plain: "The U.S. government is neither purely federal nor purely national -- it is a unique mix of both.", standards: ["1.7","1.2"], cases: [], connections: "The core AP Gov argument for American federalism. Know this for FRQs on the balance of national and state power." }
      ]
    }]
  },
  {
    id: "fed70",
    title: "Federalist No. 70",
    year: 1788,
    author: "Alexander Hamilton",
    intro: "Hamilton argues for a single, energetic executive. Unity -- one president, not a committee -- is essential to decisive action, accountability, and effective governance.",
    sections: [{
      title: "Energy in the Executive",
      clauses: [
        { num: "S1", text: "Energy in the executive is a leading character in the definition of good government... A feeble executive implies a feeble execution of the government.", plain: "A strong, energetic president is essential to good government. Presidential weakness means governmental weakness.", standards: ["2.3"], cases: [], connections: "The philosophical foundation for strong presidential power. Connects to executive orders, war powers, and debates about presidential overreach." },
        { num: "S2", text: "Decision, activity, secrecy, and despatch will generally characterize the proceedings of one man in a much more eminent degree than the proceedings of any greater number.", plain: "A single president can act decisively, quickly, and confidentially -- qualities impossible in a committee.", standards: ["2.3"], cases: ["U.S. v. Nixon"], connections: "The argument for a unitary executive. Connects to executive privilege and the need for confidential presidential deliberation." },
        { num: "S3", text: "The ingredients which constitute safety in the republican sense are, first, a due dependence on the people, secondly, a due responsibility.", plain: "A safe executive must be accountable to the people. A single president is easier to hold responsible than a committee.", standards: ["2.3","2.2"], cases: [], connections: "Hamilton's accountability argument. Connects to checks and balances and congressional oversight of the executive." }
      ]
    }]
  },
  {
    id: "fed76",
    title: "Federalist No. 76",
    year: 1788,
    author: "Alexander Hamilton",
    intro: "Hamilton defends the presidential appointment power and Senate confirmation process, arguing that a single responsible executive best ensures qualified nominations while the Senate checks corruption.",
    sections: [{
      title: "The Appointment Power",
      clauses: [
        { num: "S1", text: "The sole and undivided responsibility of one man will naturally beget a livelier sense of duty and a more exact regard to reputation.", plain: "Because the president alone is responsible for nominations, they have a strong personal incentive to choose qualified people -- their reputation is on the line.", standards: ["2.3","2.5"], cases: [], connections: "Foundation for the presidential nomination process. Connects to judicial nominations, senatorial courtesy, and Senate confirmation battles." },
        { num: "S2", text: "The necessity of their concurrence would have a powerful, though, in general, a silent operation... it would be an excellent check upon a spirit of favoritism in the President.", plain: "Senate confirmation disciplines presidential nominations -- even the threat of rejection prevents cronyism.", standards: ["2.5","2.2"], cases: [], connections: "The Senate advice and consent role. Connects to filibuster of nominees, the nuclear option, and judicial confirmation battles." }
      ]
    }]
  },
  {
    id: "fed78",
    title: "Federalist No. 78",
    year: 1788,
    author: "Alexander Hamilton",
    intro: "Hamilton defends the federal judiciary as the least dangerous branch -- it controls neither the sword nor the purse. He also makes the strongest pre-constitutional argument for judicial review and lifetime tenure.",
    sections: [{
      title: "The Least Dangerous Branch",
      clauses: [
        { num: "S1", text: "The judiciary, from the nature of its functions, will always be the least dangerous to the political rights of the Constitution.", plain: "Courts are the weakest branch -- they have no army and no budget. Their power depends entirely on persuasion and legitimacy.", standards: ["2.5"], cases: ["Marbury v. Madison"], connections: "Foundation for an independent judiciary. Marbury v. Madison (1803) confirmed that courts ARE powerful, but through interpretation, not force." },
        { num: "S2", text: "A constitution is, in fact, and must be regarded by the judges, as a fundamental law. It therefore belongs to them to ascertain its meaning.", plain: "It is the courts' job to interpret the Constitution. When a law conflicts with the Constitution, courts must follow the Constitution.", standards: ["2.5"], cases: ["Marbury v. Madison"], connections: "Hamilton directly anticipates judicial review. This is the strongest pre-Marbury argument for the courts' power to strike down unconstitutional laws." },
        { num: "S3", text: "The complete independence of the courts of justice is peculiarly essential in a limited Constitution... judges should hold their offices during good behavior.", plain: "Independent judges with lifetime tenure are essential -- they cannot be fired for unpopular decisions.", standards: ["2.5"], cases: [], connections: "The argument for lifetime federal judicial appointments. Connects to debates about judicial activism vs. restraint." }
      ]
    }]
  },
  {
    id: "birmingham",
    title: "Letter from Birmingham Jail",
    year: 1963,
    author: "Dr. Martin Luther King Jr.",
    intro: "Written while imprisoned for protesting segregation in Birmingham, Alabama, this letter responds to white clergymen who called King's protests unwise and untimely. It is one of the most powerful defenses of civil disobedience ever written.",
    sections: [{
      title: "Just and Unjust Laws",
      clauses: [
        { num: "S1", text: "We know through painful experience that freedom is never voluntarily given by the oppressor; it must be demanded by the oppressed.", plain: "Those in power never give up power voluntarily -- freedom must be actively fought for.", standards: ["3.4"], cases: ["Brown v. Board of Education"], connections: "Foundation for the civil rights movement's direct action strategy. Connects to civil disobedience as political participation (Unit 5)." },
        { num: "S2", text: "One has not only a legal but a moral responsibility to obey just laws. Conversely, one has a moral responsibility to disobey unjust laws.", plain: "People must follow just laws but have a moral duty to disobey unjust ones -- drawing on natural rights theory from the Declaration of Independence.", standards: ["3.4","1.1"], cases: [], connections: "The AP Gov definition of civil disobedience. King uses natural rights theory to argue unjust laws lack moral authority." },
        { num: "S3", text: "An unjust law is a code that a numerical or power majority group compels a minority group to obey but does not make binding on itself.", plain: "An unjust law is one a majority forces on a minority but does not apply to itself. Segregation laws applied only to Black Americans.", standards: ["3.4"], cases: ["Brown v. Board of Education"], connections: "Directly connects to tyranny of the majority (Unit 1) and the Equal Protection Clause (14th Amendment)." },
        { num: "S4", text: "The Negro's great stumbling block is not the White Citizen's Counciler or the Ku Klux Klanner, but the white moderate, who is more devoted to order than to justice.", plain: "The biggest obstacle to civil rights is not open racists but moderates who prefer order to justice and ask Black Americans to wait.", standards: ["3.4","5.5"], cases: [], connections: "King's critique of incrementalism. Connects to debates about the pace of reform and political participation strategies." }
      ]
    }]
  }
];

var docsBuilt = false;

var DIAG_QUESTIONS = [
  { q: 'Which foundational document first articulated the principle that governments derive their just powers from the consent of the governed?', opts: ['U.S. Constitution', 'Declaration of Independence', 'Federalist No. 10', 'Articles of Confederation'], ans: 1, unit: 1, topic: 'Natural Rights & Popular Sovereignty' },
  { q: 'In Federalist No. 10, Madison argues that a large republic is better than a small one primarily because:', opts: ['Large republics have stronger armies', 'More diversity makes it harder for any one faction to dominate', 'Large republics can collect more taxes', 'The president has more power in a large republic'], ans: 1, unit: 1, topic: 'Federalist Papers' },
  { q: 'The Supremacy Clause of the Constitution states that:', opts: ['The President is the supreme commander of the military', 'Federal law takes precedence over conflicting state law', 'The Supreme Court has final say on all legal matters', 'Congress must approve all treaties'], ans: 1, unit: 1, topic: 'Federalism' },
  { q: 'Which type of federal grant gives states the MOST flexibility in how to spend the money?', opts: ['Categorical grants', 'Block grants', 'Unfunded mandates', 'Revenue sharing'], ans: 1, unit: 1, topic: 'Fiscal Federalism' },
  { q: 'The filibuster is a Senate procedure that:', opts: ['Forces an immediate vote on legislation', 'Allows unlimited debate to delay or block a vote', 'Removes a senator from office', 'Overrides a presidential veto'], ans: 1, unit: 2, topic: 'Congress' },
  { q: 'An executive order differs from a law passed by Congress because it:', opts: ['Must be approved by the Senate', 'Does not require congressional approval', 'Must be signed by the Chief Justice', 'Requires a two-thirds majority vote'], ans: 1, unit: 2, topic: 'The Presidency' },
  { q: 'Judicial review -- the power to strike down unconstitutional laws -- was established in:', opts: ['The Constitution\'s Article III', 'Marbury v. Madison (1803)', 'McCulloch v. Maryland (1819)', 'Federalist No. 78'], ans: 1, unit: 2, topic: 'Judicial Review' },
  { q: 'The "iron triangle" refers to the relationship between:', opts: ['The President, Senate, and House', 'A congressional committee, federal agency, and interest group', 'Federal, state, and local governments', 'The courts, Congress, and the executive'], ans: 1, unit: 2, topic: 'The Bureaucracy' },
  { q: 'Which Supreme Court case established that the exclusionary rule applies to state courts?', opts: ['Miranda v. Arizona', 'Gideon v. Wainwright', 'Mapp v. Ohio', 'Tinker v. Des Moines'], ans: 2, unit: 3, topic: 'Rights of the Accused' },
  { q: 'The "clear and present danger" test was established in:', opts: ['Tinker v. Des Moines', 'New York Times v. United States', 'Schenck v. United States', 'Engel v. Vitale'], ans: 2, unit: 3, topic: 'First Amendment' },
  { q: 'Selective incorporation means:', opts: ['Congress selects which states must follow federal law', 'The Supreme Court applies Bill of Rights protections to states case by case', 'Only citizens can claim constitutional rights', 'The president selects which laws to enforce'], ans: 1, unit: 3, topic: 'Selective Incorporation' },
  { q: 'Which standard of review does the Supreme Court use for laws that discriminate based on race?', opts: ['Rational basis test', 'Intermediate scrutiny', 'Strict scrutiny', 'Clear and present danger'], ans: 2, unit: 3, topic: 'Equal Protection' },
  { q: 'Political socialization refers to:', opts: ['The process of running for political office', 'How individuals develop their political values and beliefs', 'The way politicians socialize with voters', 'Mandatory civics education in schools'], ans: 1, unit: 4, topic: 'Political Socialization' },
  { q: 'A "push poll" is:', opts: ['A survey that measures genuine public opinion', 'Biased political information presented as a poll to influence views', 'An exit poll conducted after voting', 'A tracking poll used throughout a campaign'], ans: 1, unit: 4, topic: 'Public Opinion & Polling' },
  { q: 'Keynesian economics holds that during a recession, the government should:', opts: ['Cut spending and raise taxes to balance the budget', 'Increase spending and/or cut taxes to stimulate demand', 'Do nothing and let markets self-correct', 'Raise interest rates to reduce inflation'], ans: 1, unit: 4, topic: 'Economic Ideology' },
  { q: 'Which Supreme Court case ruled that corporations and unions can spend unlimited money on elections?', opts: ['Shaw v. Reno', 'Baker v. Carr', 'Citizens United v. FEC', 'Buckley v. Valeo'], ans: 2, unit: 5, topic: 'Campaign Finance' },
  { q: 'The Electoral College uses a winner-take-all system in most states, which means:', opts: ['The candidate with the most popular votes wins all electoral votes in that state', 'Electoral votes are split proportionally among candidates', 'The legislature selects electors', 'Third-party candidates receive electoral votes proportionally'], ans: 0, unit: 5, topic: 'Electoral College' },
  { q: 'Agenda setting refers to the media\'s ability to:', opts: ['Write legislation for Congress', 'Determine which issues the public thinks are most important', 'Endorse political candidates', 'Control how politicians vote'], ans: 1, unit: 5, topic: 'Media & Politics' },
  { q: '"Stare decisis" is a legal principle that means:', opts: ['Courts have jurisdiction over interstate disputes', 'Judges must follow precedent from prior cases', 'The Supreme Court has nine justices', 'Lower courts must defer to Congress'], ans: 1, unit: 2, topic: 'The Federal Courts' },
  { q: 'Brutus No. 1 opposed ratification of the Constitution primarily because:', opts: ['It created a weak national government', 'The national government would become too powerful and consume the states', 'The Bill of Rights was not strong enough', 'Congress had too little power over the President'], ans: 1, unit: 1, topic: 'Anti-Federalist Arguments' }
];

var diagState = { questions: [], index: 0, score: 0, unitScores: {}, answered: false, selectedUnits: ['all'] };

function diagToggleUnit(el) {
  var unit = el.dataset.unit;
  if (unit === 'all') {
    diagState.selectedUnits = ['all'];
    document.querySelectorAll('.diag-unit-pill').forEach(function(p) { p.classList.remove('selected'); });
    el.classList.add('selected');
  } else {
    var allPill = document.querySelector('.diag-unit-pill[data-unit="all"]');
    if (diagState.selectedUnits.includes('all')) {
      diagState.selectedUnits = [];
      if (allPill) allPill.classList.remove('selected');
    }
    if (diagState.selectedUnits.includes(unit)) {
      diagState.selectedUnits = diagState.selectedUnits.filter(function(u) { return u !== unit; });
      el.classList.remove('selected');
    } else {
      diagState.selectedUnits.push(unit);
      el.classList.add('selected');
    }
    if (diagState.selectedUnits.length === 0) {
      diagState.selectedUnits = ['all'];
      if (allPill) allPill.classList.add('selected');
    }
  }
}

function startDiagnostic() {
  var pool = diagState.selectedUnits.includes('all')
    ? DIAG_QUESTIONS
    : DIAG_QUESTIONS.filter(function(q) { return diagState.selectedUnits.includes(String(q.unit)); });

  if (pool.length < 5) { alert('Please select at least one unit with enough questions.'); return; }

  // Shuffle and take up to 20
  var shuffled = pool.slice();
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
  }
  diagState.questions = shuffled.slice(0, Math.min(20, shuffled.length));
  diagState.index = 0;
  diagState.score = 0;
  diagState.unitScores = {};
  diagState.answered = false;

  document.getElementById('diag-start').style.display = 'none';
  document.getElementById('diag-results').classList.remove('show');
  document.getElementById('diag-q-card').classList.add('show');
  diagShowQuestion();
}

function diagShowQuestion() {
  var q = diagState.questions[diagState.index];
  var total = diagState.questions.length;
  var pct = (diagState.index / total * 100).toFixed(0);
  document.getElementById('diag-progress-fill').style.width = pct + '%';
  document.getElementById('diag-q-meta').textContent = 'Question ' + (diagState.index + 1) + ' of ' + total;
  document.getElementById('diag-q-unit-tag').textContent = 'Unit ' + q.unit + ' · ' + q.topic;
  document.getElementById('diag-question').textContent = q.q;
  diagState.answered = false;

  var optionsEl = document.getElementById('diag-options');
  optionsEl.innerHTML = q.opts.map(function(opt, i) {
    return '<button class="diag-option" onclick="diagAnswer(this,' + i + ')">' + opt + '</button>';
  }).join('');

  var fb = document.getElementById('diag-feedback');
  fb.className = 'diag-feedback';
  fb.textContent = '';
  var nextBtn = document.getElementById('diag-next-btn');
  nextBtn.className = 'diag-next-btn';
  nextBtn.textContent = diagState.index < diagState.questions.length - 1 ? 'Next Question →' : 'See Results →';
}

function diagAnswer(btn, chosen) {
  if (diagState.answered) return;
  diagState.answered = true;
  var q = diagState.questions[diagState.index];
  var correct = chosen === q.ans;
  if (correct) diagState.score++;

  var unit = String(q.unit);
  if (!diagState.unitScores[unit]) diagState.unitScores[unit] = { correct: 0, total: 0 };
  diagState.unitScores[unit].total++;
  if (correct) diagState.unitScores[unit].correct++;

  document.querySelectorAll('.diag-option').forEach(function(b, i) {
    b.disabled = true;
    if (i === q.ans) b.classList.add('correct');
    else if (b === btn && !correct) b.classList.add('wrong');
  });

  var fb = document.getElementById('diag-feedback');
  fb.className = 'diag-feedback show ' + (correct ? 'correct' : 'wrong');
  fb.textContent = correct
    ? '✓ Correct! ' + q.topic
    : '✗ The correct answer is: ' + q.opts[q.ans] + ' (' + q.topic + ')';

  document.getElementById('diag-next-btn').className = 'diag-next-btn show';
}

function diagNext() {
  diagState.index++;
  if (diagState.index >= diagState.questions.length) {
    diagShowResults();
  } else {
    diagShowQuestion();
  }
}

function diagShowResults() {
  document.getElementById('diag-q-card').classList.remove('show');
  var results = document.getElementById('diag-results');
  results.classList.add('show');

  var total = diagState.questions.length;
  var score = diagState.score;
  var pct = Math.round(score / total * 100);

  document.getElementById('diag-score-big').textContent = score + '/' + total;
  var msg = pct >= 80 ? '🎉 Excellent -- you know this material!' :
            pct >= 65 ? '👍 Good work -- review the units below.' :
            pct >= 50 ? '📚 Keep studying -- focus on your weak spots.' :
            '🔄 More review needed -- use the flashcards and glossary.';
  document.getElementById('diag-score-msg').textContent = msg;

  // Unit breakdown
  var rows = '';
  var weakUnits = [];
  [1,2,3,4,5].forEach(function(u) {
    var s = diagState.unitScores[String(u)];
    if (!s) return;
    var upct = Math.round(s.correct / s.total * 100);
    var color = upct >= 80 ? '#22c55e' : upct >= 60 ? '#f59e0b' : '#ef4444';
    if (upct < 70) weakUnits.push('Unit ' + u + ' (' + upct + '%)');
    rows += '<div class="diag-unit-row">' +
      '<div class="diag-unit-name">Unit ' + u + '</div>' +
      '<div class="diag-unit-bar"><div class="diag-unit-fill" style="width:' + upct + '%;background:' + color + '"></div></div>' +
      '<div class="diag-unit-pct" style="color:' + color + '">' + upct + '%</div>' +
      '</div>';
  });
  document.getElementById('diag-breakdown-rows').innerHTML = rows || '<p style="color:var(--gray-400);font-size:13px;">Take more questions to see unit breakdown.</p>';

  var focusBox = document.getElementById('diag-focus-box');
  var focusList = document.getElementById('diag-focus-list');
  if (weakUnits.length > 0) {
    focusList.textContent = 'Focus on: ' + weakUnits.join(', ') + ' -- use the Glossary flashcards and review the Living Documents for these units.';
    focusBox.style.display = '';
  } else {
    focusBox.style.display = 'none';
  }
}

function resetDiagnostic() {
  document.getElementById('diag-results').classList.remove('show');
  document.getElementById('diag-q-card').classList.remove('show');
  document.getElementById('diag-start').style.display = '';
}

function diagGoToGlossary() {
  document.querySelectorAll('.nav-tab').forEach(function(t) { t.classList.remove('active'); });
  var glossTab = document.querySelector('.nav-tab[data-tab="glossary"]');
  if (glossTab) glossTab.classList.add('active');
  TAB_IDS.forEach(function(id) {
    var el = document.getElementById('tab-' + id);
    if (el) { el.style.display = (id === 'glossary') ? '' : 'none'; el.classList.toggle('active', id === 'glossary'); }
  });
  buildGlossary && buildGlossary();
}

// ══════════════════════════════════════════════════════════
//  STUMP THE CLASS ENGINE
// ══════════════════════════════════════════════════════════
var stumpState = {
  deck: [], index: 0,
  got: 0, missed: 0,
  timerInterval: null, timeLeft: 30,
  phase: 'idle' // idle, question, revealed, scored
};


var FRQ_CHARTS = {
  approval_ratings: {
    title: 'Figure 1: Presidential Approval Ratings Over Time',
    svg: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;display:block;margin:0 auto;">
      <style>.axis{font:10px sans-serif;fill:#666}.label{font:11px sans-serif;fill:#333;font-weight:600}.bar-label{font:10px sans-serif;fill:#fff;font-weight:700}</style>
      <!-- Y axis -->
      <line x1="60" y1="10" x2="60" y2="160" stroke="#ccc" stroke-width="1"/>
      <!-- X axis -->
      <line x1="60" y1="160" x2="460" y2="160" stroke="#ccc" stroke-width="1"/>
      <!-- Y gridlines & labels -->
      <text x="52" y="163" class="axis" text-anchor="end">0%</text>
      <line x1="60" y1="160" x2="460" y2="160" stroke="#eee"/>
      <text x="52" y="123" class="axis" text-anchor="end">25%</text>
      <line x1="60" y1="120" x2="460" y2="120" stroke="#eee" stroke-dasharray="3"/>
      <text x="52" y="83" class="axis" text-anchor="end">50%</text>
      <line x1="60" y1="80" x2="460" y2="80" stroke="#eee" stroke-dasharray="3"/>
      <text x="52" y="43" class="axis" text-anchor="end">75%</text>
      <line x1="60" y1="40" x2="460" y2="40" stroke="#eee" stroke-dasharray="3"/>
      <!-- Bars: Years 1-5, approval 62,54,48,42,38 -->
      <rect x="80" y="41" width="50" height="119" fill="#1a2e5a" rx="2"/>
      <text x="105" y="55" class="bar-label" text-anchor="middle">62%</text>
      <text x="105" y="176" class="axis" text-anchor="middle">Year 1</text>
      <rect x="160" y="73" width="50" height="87" fill="#1a2e5a" rx="2"/>
      <text x="185" y="87" class="bar-label" text-anchor="middle">54%</text>
      <text x="185" y="176" class="axis" text-anchor="middle">Year 2</text>
      <rect x="240" y="97" width="50" height="63" fill="#1a2e5a" rx="2"/>
      <text x="265" y="111" class="bar-label" text-anchor="middle">48%</text>
      <text x="265" y="176" class="axis" text-anchor="middle">Year 3</text>
      <rect x="320" y="113" width="50" height="47" fill="#B22234" rx="2"/>
      <text x="345" y="127" class="bar-label" text-anchor="middle">42%</text>
      <text x="345" y="176" class="axis" text-anchor="middle">Year 4</text>
      <rect x="400" y="129" width="50" height="31" fill="#B22234" rx="2"/>
      <text x="425" y="143" class="bar-label" text-anchor="middle">38%</text>
      <text x="425" y="176" class="axis" text-anchor="middle">Year 5</text>
      <text x="260" y="196" class="label" text-anchor="middle">Source: Gallup Poll, 2026 (Hypothetical)</text>
    </svg>`
  },
  voter_turnout: {
    title: 'Figure 1: Voter Turnout by Age Group -- 2024 Presidential Election',
    svg: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;display:block;margin:0 auto;">
      <style>.axis{font:10px sans-serif;fill:#666}.label{font:11px sans-serif;fill:#333;font-weight:600}</style>
      <line x1="110" y1="10" x2="110" y2="170" stroke="#ccc" stroke-width="1"/>
      <line x1="110" y1="170" x2="460" y2="170" stroke="#ccc" stroke-width="1"/>
      <!-- Horizontal bars by age group -->
      <!-- 18-29: 48% -->
      <text x="105" y="35" class="axis" text-anchor="end">18-29</text>
      <rect x="112" y="22" width="163" height="22" fill="#1a2e5a" rx="2"/>
      <text x="280" y="37" style="font:10px sans-serif;fill:#333;font-weight:700">48%</text>
      <!-- 30-44: 59% -->
      <text x="105" y="75" class="axis" text-anchor="end">30-44</text>
      <rect x="112" y="62" width="200" height="22" fill="#1a2e5a" rx="2"/>
      <text x="317" y="77" style="font:10px sans-serif;fill:#333;font-weight:700">59%</text>
      <!-- 45-59: 68% -->
      <text x="105" y="115" class="axis" text-anchor="end">45-59</text>
      <rect x="112" y="102" width="231" height="22" fill="#1a2e5a" rx="2"/>
      <text x="348" y="117" style="font:10px sans-serif;fill:#333;font-weight:700">68%</text>
      <!-- 60+: 74% -->
      <text x="105" y="155" class="axis" text-anchor="end">60+</text>
      <rect x="112" y="142" width="251" height="22" fill="#B22234" rx="2"/>
      <text x="368" y="157" style="font:10px sans-serif;fill:#333;font-weight:700">74%</text>
      <!-- X axis labels -->
      <text x="112" y="188" class="axis">0%</text>
      <text x="197" y="188" class="axis">25%</text>
      <text x="282" y="188" class="axis">50%</text>
      <text x="367" y="188" class="axis">75%</text>
      <text x="260" y="208" class="label" text-anchor="middle">Source: U.S. Census Bureau CPS, 2024 (Hypothetical)</text>
    </svg>`
  },
  party_id: {
    title: 'Figure 1: Party Identification Among Registered Voters',
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto;">
      <style>.axis{font:11px sans-serif;fill:#333}.label{font:11px sans-serif;fill:#333;font-weight:600}</style>
      <!-- Pie chart: Democrat 31%, Republican 29%, Independent 38%, Other 2% -->
      <!-- Using pre-calculated arc paths -->
      <!-- Independent (38%) top -->
      <path d="M160,100 L160,20 A80,80 0 0,1 224,152 Z" fill="#888" opacity="0.85"/>
      <!-- Democrat (31%) -->
      <path d="M160,100 L224,152 A80,80 0 0,1 96,152 Z" fill="#1a2e5a"/>
      <!-- Republican (29%) -->
      <path d="M160,100 L96,152 A80,80 0 0,1 145,21 Z" fill="#B22234"/>
      <!-- Other (2%) -->
      <path d="M160,100 L145,21 A80,80 0 0,1 160,20 Z" fill="#c8922a"/>
      <!-- Center circle for donut -->
      <circle cx="160" cy="100" r="45" fill="white"/>
      <text x="160" y="97" class="label" text-anchor="middle">Party</text>
      <text x="160" y="112" class="label" text-anchor="middle">ID</text>
      <!-- Legend -->
      <rect x="10" y="155" width="12" height="12" fill="#888"/>
      <text x="26" y="165" class="axis">Independent 38%</text>
      <rect x="10" y="173" width="12" height="12" fill="#1a2e5a"/>
      <text x="26" y="183" class="axis">Democrat 31%</text>
      <rect x="175" y="155" width="12" height="12" fill="#B22234"/>
      <text x="191" y="165" class="axis">Republican 29%</text>
      <rect x="175" y="173" width="12" height="12" fill="#c8922a"/>
      <text x="191" y="183" class="axis">Other 2%</text>
      <text x="160" y="198" style="font:10px sans-serif;fill:#666" text-anchor="middle">Source: Pew Research, 2026 (Hypothetical)</text>
    </svg>`
  },
  congress_approval: {
    title: 'Figure 1: Congressional vs. Presidential Approval Ratings',
    svg: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;display:block;margin:0 auto;">
      <style>.axis{font:10px sans-serif;fill:#666}.label{font:11px sans-serif;fill:#333;font-weight:600}</style>
      <line x1="60" y1="10" x2="60" y2="155" stroke="#ccc"/>
      <line x1="60" y1="155" x2="460" y2="155" stroke="#ccc"/>
      <!-- Gridlines -->
      <line x1="60" y1="115" x2="460" y2="115" stroke="#eee" stroke-dasharray="3"/>
      <text x="52" y="118" class="axis" text-anchor="end">25%</text>
      <line x1="60" y1="75" x2="460" y2="75" stroke="#eee" stroke-dasharray="3"/>
      <text x="52" y="78" class="axis" text-anchor="end">50%</text>
      <line x1="60" y1="35" x2="460" y2="35" stroke="#eee" stroke-dasharray="3"/>
      <text x="52" y="38" class="axis" text-anchor="end">75%</text>
      <text x="52" y="158" class="axis" text-anchor="end">0%</text>
      <!-- Presidential approval line: 62,58,54,50,48 -->
      <polyline points="90,36 170,52 250,68 330,82 410,90" fill="none" stroke="#1a2e5a" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="90" cy="36" r="4" fill="#1a2e5a"/>
      <circle cx="170" cy="52" r="4" fill="#1a2e5a"/>
      <circle cx="250" cy="68" r="4" fill="#1a2e5a"/>
      <circle cx="330" cy="82" r="4" fill="#1a2e5a"/>
      <circle cx="410" cy="90" r="4" fill="#1a2e5a"/>
      <!-- Congressional approval line: 22,20,18,19,17 -->
      <polyline points="90,127 170,131 250,135 330,133 410,137" fill="none" stroke="#B22234" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="90" cy="127" r="4" fill="#B22234"/>
      <circle cx="170" cy="131" r="4" fill="#B22234"/>
      <circle cx="250" cy="135" r="4" fill="#B22234"/>
      <circle cx="330" cy="133" r="4" fill="#B22234"/>
      <circle cx="410" cy="137" r="4" fill="#B22234"/>
      <!-- X labels -->
      <text x="90" y="170" class="axis" text-anchor="middle">2022</text>
      <text x="170" y="170" class="axis" text-anchor="middle">2023</text>
      <text x="250" y="170" class="axis" text-anchor="middle">2024</text>
      <text x="330" y="170" class="axis" text-anchor="middle">2025</text>
      <text x="410" y="170" class="axis" text-anchor="middle">2026</text>
      <!-- Legend -->
      <rect x="130" y="182" width="14" height="3" fill="#1a2e5a"/>
      <text x="148" y="187" class="axis">Presidential Approval</text>
      <rect x="280" y="182" width="14" height="3" fill="#B22234"/>
      <text x="298" y="187" class="axis">Congressional Approval</text>
      <text x="260" y="198" class="label" text-anchor="middle">Source: Gallup, 2026 (Hypothetical)</text>
    </svg>`
  },
  ideology: {
    title: 'Figure 1: Self-Identified Political Ideology of Americans',
    svg: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;display:block;margin:0 auto;">
      <style>.axis{font:10px sans-serif;fill:#666}.label{font:11px sans-serif;fill:#333;font-weight:600}.bar-label{font:10px sans-serif;fill:#fff;font-weight:700}</style>
      <line x1="60" y1="10" x2="60" y2="155" stroke="#ccc"/>
      <line x1="60" y1="155" x2="460" y2="155" stroke="#ccc"/>
      <line x1="60" y1="75" x2="460" y2="75" stroke="#eee" stroke-dasharray="3"/>
      <text x="52" y="78" class="axis" text-anchor="end">50%</text>
      <text x="52" y="158" class="axis" text-anchor="end">0%</text>
      <!-- Very Liberal 11%, Liberal 25%, Moderate 36%, Conservative 22%, Very Conservative 6% -->
      <rect x="72" y="111" width="50" height="44" fill="#1a2e5a" rx="2"/>
      <text x="97" y="135" class="bar-label" text-anchor="middle">11%</text>
      <text x="97" y="170" class="axis" text-anchor="middle">Very Liberal</text>
      <rect x="150" y="75" width="50" height="80" fill="#2a4e8a" rx="2"/>
      <text x="175" y="120" class="bar-label" text-anchor="middle">25%</text>
      <text x="175" y="170" class="axis" text-anchor="middle">Liberal</text>
      <rect x="228" y="44" width="50" height="111" fill="#888" rx="2"/>
      <text x="253" y="105" class="bar-label" text-anchor="middle">36%</text>
      <text x="253" y="170" class="axis" text-anchor="middle">Moderate</text>
      <rect x="306" y="86" width="50" height="69" fill="#B22234" rx="2"/>
      <text x="331" y="126" class="bar-label" text-anchor="middle">22%</text>
      <text x="331" y="170" class="axis" text-anchor="middle">Conservative</text>
      <rect x="384" y="136" width="50" height="19" fill="#8B0000" rx="2"/>
      <text x="409" y="150" class="bar-label" text-anchor="middle">6%</text>
      <text x="409" y="170" class="axis" text-anchor="middle">Very Cons.</text>
      <text x="260" y="190" class="label" text-anchor="middle">Source: Gallup Annual Ideology Survey, 2026 (Hypothetical)</text>
    </svg>`
  }
};

// ── FRQ Prompt Bank ──
var FRQ_PROMPTS = [
  // ── CONCEPT APPLICATION (type 0) ──
  {
    type: 0, typeName: 'Concept Application', pts: 3, minutes: 10,
    unit: 2, unitLabel: 'Unit 2 · Congress',
    title: 'Congressional Gridlock',
    chart: null,
    prompt: `Read the following scenario and answer parts A, B, and C.

The Senate is considering a major immigration reform bill that has already passed the House with bipartisan support. However, a group of senators has threatened to use procedural tactics to prevent the bill from coming to a vote. The Senate Majority Leader is searching for a way to force the bill to a final vote before the session ends.

A. Describe the Senate procedural tactic that senators could use to block the bill from reaching a final vote.

B. Explain ONE constitutional or procedural mechanism the Senate Majority Leader could use to overcome this tactic.

C. Explain how this scenario illustrates the tension between majority rule and minority rights in the United States Senate.`
  },
  {
    type: 0, typeName: 'Concept Application', pts: 3, minutes: 10,
    unit: 1, unitLabel: 'Unit 1 · Federalism',
    title: 'Unfunded Mandates',
    chart: null,
    prompt: `Read the following scenario and answer parts A, B, and C.

Congress passes a new law requiring all states to implement specific water quality standards within two years. The law includes detailed regulations but provides no additional federal funding for states to meet the requirements. Several state governors have publicly criticized the law, calling it an overreach of federal power.

A. Define the term "unfunded mandate" and explain how it applies to the scenario above.

B. Describe ONE argument a supporter of the law might make using the Supremacy Clause to defend federal authority.

C. Explain how this scenario reflects the ongoing tension between national and state power in the American federal system.`
  },
  {
    type: 0, typeName: 'Concept Application', pts: 3, minutes: 10,
    unit: 3, unitLabel: 'Unit 3 · Civil Liberties',
    title: 'Student Speech Online',
    chart: null,
    prompt: `Read the following scenario and answer parts A, B, and C.

A high school student posts a video on social media, filmed from home on a weekend, mocking and threatening school administrators. School officials suspend the student for violating the school's anti-harassment policy. The student and her parents argue the school violated her First Amendment rights since the speech occurred off-campus.

A. Identify the constitutional clause at issue in this scenario.

B. Using the precedent established in Tinker v. Des Moines (1969), explain what standard courts would use to evaluate whether the school's actions were constitutional.

C. Explain ONE argument the student could make AND one argument the school could make using constitutional reasoning.`
  },
  {
    type: 0, typeName: 'Concept Application', pts: 3, minutes: 10,
    unit: 2, unitLabel: 'Unit 2 · The Presidency',
    title: 'Executive Orders',
    chart: null,
    prompt: `Read the following scenario and answer parts A, B, and C.

Shortly after taking office, the President issues an executive order directing all federal agencies to immediately halt implementation of an immigration policy from the previous administration. Members of Congress from the opposing party argue that the President is overstepping executive authority and that the action requires congressional approval.

A. Define "executive order" and explain why the President might choose this method over seeking legislation from Congress.

B. Describe ONE formal power Congress has to check or respond to this executive action.

C. Explain how the use of executive orders reflects the informal powers of the presidency as described in the concept of the "bully pulpit" and going public.`
  },
  {
    type: 0, typeName: 'Concept Application', pts: 3, minutes: 10,
    unit: 5, unitLabel: 'Unit 5 · Interest Groups',
    title: 'Iron Triangle',
    chart: null,
    prompt: `Read the following scenario and answer parts A, B, and C.

A major agricultural interest group meets regularly with members of the House Agriculture Committee and officials from the U.S. Department of Agriculture. Over several years, the group has successfully lobbied for increased farm subsidies, helped write legislation favorable to large farming operations, and provided campaign contributions to committee members.

A. Identify the concept from American government that best describes the relationship illustrated in this scenario.

B. Explain how each of the three actors in this relationship benefits from their arrangement.

C. Explain ONE way this relationship could be seen as harmful to democratic representation and the public interest.`
  },

  // ── QUANTITATIVE ANALYSIS (type 1) ──
  {
    type: 1, typeName: 'Quantitative Analysis', pts: 4, minutes: 15,
    unit: 2, unitLabel: 'Unit 2 · The Presidency',
    title: 'Presidential Approval Ratings',
    chart: 'approval_ratings',
    prompt: `Use the graph above and your knowledge of AP U.S. Government and Politics to answer the following questions.

A. Identify the trend shown in the president's approval ratings over the five-year period.

B. Describe ONE pattern shown in the data that could be explained by the concept of the "honeymoon period."

C. Draw a conclusion about the relationship between presidential approval ratings and the president's ability to achieve legislative goals, using specific data from the graph as evidence.

D. Explain ONE factor not shown in the graph that could account for the decline in approval ratings over time.`
  },
  {
    type: 1, typeName: 'Quantitative Analysis', pts: 4, minutes: 15,
    unit: 5, unitLabel: 'Unit 5 · Voting & Elections',
    title: 'Voter Turnout by Age Group',
    chart: 'voter_turnout',
    prompt: `Use the bar graph above and your knowledge of AP U.S. Government and Politics to answer the following questions.

A. Identify the age group with the highest voter turnout and the age group with the lowest voter turnout in the 2024 presidential election.

B. Describe the overall pattern shown in the data regarding the relationship between age and voter turnout.

C. Draw a conclusion about what this data suggests for political parties trying to build winning electoral coalitions. Use specific data from the graph as evidence.

D. Explain ONE reason why younger voters (18-29) tend to have lower turnout rates than older voters, based on your knowledge of political participation.`
  },
  {
    type: 1, typeName: 'Quantitative Analysis', pts: 4, minutes: 15,
    unit: 5, unitLabel: 'Unit 5 · Political Parties',
    title: 'Party Identification',
    chart: 'party_id',
    prompt: `Use the pie chart above and your knowledge of AP U.S. Government and Politics to answer the following questions.

A. Identify the largest single group in terms of party identification among registered voters.

B. Describe what the data suggests about the current state of the American two-party system.

C. Draw a conclusion about what this distribution of party identification means for candidates running in a general election. Use specific data from the chart as evidence.

D. Explain ONE reason why the percentage of voters identifying as Independent has grown in recent decades, using your knowledge of political socialization and party polarization.`
  },
  {
    type: 1, typeName: 'Quantitative Analysis', pts: 4, minutes: 15,
    unit: 2, unitLabel: 'Unit 2 · Congress',
    title: 'Congressional vs. Presidential Approval',
    chart: 'congress_approval',
    prompt: `Use the line graph above and your knowledge of AP U.S. Government and Politics to answer the following questions.

A. Identify the year in which the gap between presidential and congressional approval was the largest.

B. Describe the overall trend shown for congressional approval ratings over the five-year period.

C. Draw a conclusion about what this consistent gap between presidential and congressional approval suggests about public attitudes toward the two institutions. Use specific data from the graph as evidence.

D. Explain ONE structural or political reason why congressional approval ratings tend to be consistently lower than presidential approval ratings.`
  },
  {
    type: 1, typeName: 'Quantitative Analysis', pts: 4, minutes: 15,
    unit: 4, unitLabel: 'Unit 4 · Political Ideology',
    title: 'Political Ideology Distribution',
    chart: 'ideology',
    prompt: `Use the bar graph above and your knowledge of AP U.S. Government and Politics to answer the following questions.

A. Identify the ideology that represents the largest single group among Americans surveyed.

B. Describe the overall distribution of political ideology shown in the data.

C. Draw a conclusion about what this distribution suggests for candidates competing in primary elections versus general elections. Use specific data from the graph as evidence.

D. Explain ONE way political socialization contributes to the ideological distribution shown in the graph.`
  },

  // ── SCOTUS COMPARISON (type 2) ──
  {
    type: 2, typeName: 'SCOTUS Comparison', pts: 4, minutes: 15,
    unit: 3, unitLabel: 'Unit 3 · Civil Liberties',
    title: 'Student Speech Rights',
    chart: null,
    prompt: `In Tinker v. Des Moines Independent Community School District (1969), the Supreme Court ruled that students wearing black armbands to protest the Vietnam War was protected speech under the First Amendment.

In Bethel School District v. Fraser (1986), the Court ruled that school officials could discipline a student for giving a sexually suggestive speech at a school assembly without violating the First Amendment.

A. Identify the constitutional provision at issue in both cases.

B. Explain the reasoning of the majority in Tinker v. Des Moines, including the legal standard it established.

C. Explain how Bethel School District v. Fraser reached a different conclusion, and describe ONE similarity and ONE difference in the constitutional reasoning between the two cases.

D. Apply the legal standards from both cases to the following scenario: A student posts a profane video on social media criticizing the school principal, filmed from her bedroom on a Saturday. Explain whether you think a court would likely find the school's suspension of the student constitutional, using reasoning from BOTH cases.`
  },
  {
    type: 2, typeName: 'SCOTUS Comparison', pts: 4, minutes: 15,
    unit: 2, unitLabel: 'Unit 2 · Judicial Review',
    title: 'Presidential Power & Courts',
    chart: null,
    prompt: `In United States v. Nixon (1974), the Supreme Court ruled that President Nixon had to turn over subpoenaed White House tape recordings to a special prosecutor, rejecting the claim of absolute executive privilege.

In Trump v. United States (2024), the Supreme Court ruled that former presidents have absolute immunity from criminal prosecution for actions within their constitutional authority as president, and presumptive immunity for other official acts.

A. Identify the constitutional principle at issue in both cases regarding the scope of presidential power.

B. Explain the reasoning of the Court in U.S. v. Nixon and what limits it placed on executive privilege.

C. Compare the two cases: explain ONE way Trump v. United States extended presidential power beyond what was recognized in Nixon AND one way the two cases are similar in their approach to presidential accountability.

D. Explain what both rulings together suggest about the role of the Supreme Court in checking executive power.`
  },
  {
    type: 2, typeName: 'SCOTUS Comparison', pts: 4, minutes: 15,
    unit: 3, unitLabel: 'Unit 3 · Civil Rights',
    title: 'Equal Protection & Segregation',
    chart: null,
    prompt: `In Plessy v. Ferguson (1896), the Supreme Court ruled that racial segregation on railroad cars was constitutional as long as the facilities were "separate but equal."

In Brown v. Board of Education (1954), the Supreme Court unanimously overruled Plessy, holding that racially segregated public schools were inherently unequal and violated the Equal Protection Clause of the Fourteenth Amendment.

A. Identify the constitutional clause central to both cases.

B. Explain the reasoning of the Court in Brown v. Board of Education, including what evidence the Court used to reach its conclusion.

C. Explain how the two decisions reflect different interpretations of the Equal Protection Clause, and identify ONE way in which the broader historical context between 1896 and 1954 may have influenced the Court's reasoning in Brown.

D. Explain the significance of the Brown decision for the civil rights movement and for future applications of the Equal Protection Clause.`
  },

  // ── ARGUMENTATIVE ESSAY (type 3) ──
  {
    type: 3, typeName: 'Argumentative Essay', pts: 6, minutes: 25,
    unit: 2, unitLabel: 'Unit 2 · Branches of Government',
    title: 'Presidential vs. Congressional Power',
    chart: null,
    prompt: `Develop an argument that answers the following question:

Has the power of the presidency grown too strong relative to Congress in the modern era?

In your essay, you must:
• State a defensible claim that responds to the question
• Use at least ONE piece of evidence from the following foundational documents: Federalist No. 51, Federalist No. 70, or Brutus No. 1
• Use at least ONE additional piece of evidence from your knowledge of AP U.S. Government and Politics (a Supreme Court case, a specific historical example, or a course concept)
• Respond to an opposing or alternative perspective to your argument
• Support your argument with a logical line of reasoning throughout

Consider addressing: executive orders, war powers, veto power, the bully pulpit, agency capture, and the War Powers Resolution.`
  },
  {
    type: 3, typeName: 'Argumentative Essay', pts: 6, minutes: 25,
    unit: 1, unitLabel: 'Unit 1 · Federalism',
    title: 'Federal vs. State Power',
    chart: null,
    prompt: `Develop an argument that answers the following question:

Is the current balance of power between the federal government and the states consistent with the original intentions of the Founders?

In your essay, you must:
• State a defensible claim that responds to the question
• Use at least ONE piece of evidence from the following foundational documents: Federalist No. 51, Brutus No. 1, or the Constitution (specific article or amendment)
• Use at least ONE additional piece of evidence from your knowledge of AP U.S. Government and Politics
• Respond to an opposing or alternative perspective to your argument
• Support your argument with a logical line of reasoning

Consider addressing: the Supremacy Clause, the Tenth Amendment, categorical vs. block grants, cooperative federalism, McCulloch v. Maryland, and the growth of the federal government since the New Deal.`
  },
  {
    type: 3, typeName: 'Argumentative Essay', pts: 6, minutes: 25,
    unit: 5, unitLabel: 'Unit 5 · Political Participation',
    title: 'Money & Democracy',
    chart: null,
    prompt: `Develop an argument that answers the following question:

Does the role of money in American politics undermine democratic representation?

In your essay, you must:
• State a defensible claim that responds to the question
• Use at least ONE piece of evidence from the following foundational documents: Federalist No. 10, Federalist No. 51, or the First Amendment
• Use at least ONE additional piece of evidence from your knowledge of AP U.S. Government and Politics
• Respond to an opposing or alternative perspective to your argument
• Support your argument with a logical line of reasoning

Consider addressing: Citizens United v. FEC, Super PACs, iron triangles, issue networks, the role of interest groups, campaign finance reform, and the concept of equal political participation.`
  },
  {
    type: 3, typeName: 'Argumentative Essay', pts: 6, minutes: 25,
    unit: 3, unitLabel: 'Unit 3 · Civil Liberties',
    title: 'Free Speech & Its Limits',
    chart: null,
    prompt: `Develop an argument that answers the following question:

Should the government have broader authority to limit speech in the digital age?

In your essay, you must:
• State a defensible claim that responds to the question
• Use at least ONE piece of evidence from the following foundational documents: the First Amendment, Federalist No. 51, or the Declaration of Independence
• Use at least ONE additional piece of evidence from your knowledge of AP U.S. Government and Politics
• Respond to an opposing or alternative perspective to your argument
• Support your argument with a logical line of reasoning

Consider addressing: Schenck v. United States, Tinker v. Des Moines, New York Times v. United States, the clear and present danger test, social media platforms, national security, and the Marketplace of Ideas theory.`
  }
];

// ── FRQ Practice State ──
var frqPracticeState = {
  currentPrompt: null,
  timerInterval: null,
  timeLeft: 0,
  running: false,
  activeType: 'all'
};

// ── Build the prompt selector ──
function buildFrqPracticeUI() {
  // Prompt selector is built inline -- see frqRenderPromptList()
}


// ════════════════════════════════════════════════════════════════
//  AMENDMENT TRACKER DATA -- All 27 Amendments
// ════════════════════════════════════════════════════════════════
var AMENDMENTS = [
  {
    num: 1, year: 1791, era: 'Bill of Rights',
    title: 'Freedom of Religion, Speech, Press, Assembly, Petition',
    plain: 'Congress cannot establish an official religion, prevent you from practicing your religion, restrict freedom of speech or the press, or stop people from peacefully assembling or petitioning the government.',
    standards: ['3.1'],
    cases: ['Engel v. Vitale','Tinker v. Des Moines','New York Times v. United States','Schenck v. United States'],
    frqs: ['First Amendment freedoms appear in nearly every AP Gov exam. Know the Establishment Clause, Free Exercise Clause, freedom of speech, and prior restraint -- all tested repeatedly.'],
    significance: 'The most litigated amendment in American history. Covers five distinct freedoms and is central to Unit 3.'
  },
  {
    num: 2, year: 1791, era: 'Bill of Rights',
    title: 'Right to Bear Arms',
    plain: 'The people have the right to keep and bear arms. The Supreme Court has ruled this is an individual right, not just a collective militia right.',
    standards: ['3.2'],
    cases: ['McDonald v. Chicago'],
    frqs: ['McDonald v. Chicago (2010) is a required SCOTUS case -- it applied the 2nd Amendment to the states via selective incorporation.'],
    significance: 'One of the most debated amendments. McDonald v. Chicago incorporated it to the states in 2010.'
  },
  {
    num: 3, year: 1791, era: 'Bill of Rights',
    title: 'Quartering of Soldiers',
    plain: 'The government cannot force citizens to house soldiers in their homes during peacetime without their consent.',
    standards: ['3.2'],
    cases: [],
    frqs: ['Rarely tested directly but cited in privacy cases as evidence the Founders valued personal space and security in the home.'],
    significance: 'Rarely litigated today but historically cited as evidence of a broader right to privacy in the home.'
  },
  {
    num: 4, year: 1791, era: 'Bill of Rights',
    title: 'Search and Seizure',
    plain: 'The government needs a warrant based on probable cause to search your home or seize your property. Evidence obtained illegally cannot be used in court (exclusionary rule).',
    standards: ['3.2'],
    cases: ['Mapp v. Ohio'],
    frqs: ['Mapp v. Ohio (1961) applied the exclusionary rule to the states -- key selective incorporation case.'],
    significance: 'Foundation of search and seizure law. The exclusionary rule from Mapp v. Ohio is a required case.'
  },
  {
    num: 5, year: 1791, era: 'Bill of Rights',
    title: 'Rights of the Accused (Grand Jury, Double Jeopardy, Self-Incrimination)',
    plain: 'You cannot be tried for a serious federal crime without a grand jury indictment, tried twice for the same crime, forced to testify against yourself, or deprived of life/liberty/property without due process.',
    standards: ['3.2'],
    cases: ['Miranda v. Arizona'],
    frqs: ['The 5th Amendment right against self-incrimination is the basis of Miranda v. Arizona (1966) -- a required case.'],
    significance: 'Miranda rights flow from the 5th Amendment. The due process clause here applies to the federal government.'
  },
  {
    num: 6, year: 1791, era: 'Bill of Rights',
    title: 'Right to Speedy Trial, Jury, and Counsel',
    plain: 'If you are accused of a crime, you have the right to a speedy public trial by jury, to know the charges against you, to confront witnesses, and to have a lawyer.',
    standards: ['3.2'],
    cases: ['Gideon v. Wainwright'],
    frqs: ['Gideon v. Wainwright (1963) applied the right to counsel to the states. Classic selective incorporation FRQ case.'],
    significance: 'Gideon v. Wainwright extended this right to state courts -- one of the most important selective incorporation decisions.'
  },
  {
    num: 7, year: 1791, era: 'Bill of Rights',
    title: 'Civil Trial by Jury',
    plain: 'In federal civil cases involving more than $20, you have the right to a trial by jury.',
    standards: ['3.2'],
    cases: [],
    frqs: ['Rarely tested directly on the AP exam.'],
    significance: 'Applies only to federal civil cases. Rarely litigated at the Supreme Court level today.'
  },
  {
    num: 8, year: 1791, era: 'Bill of Rights',
    title: 'Bail, Fines, and Cruel and Unusual Punishment',
    plain: 'The government cannot impose excessive bail or fines, or inflict cruel and unusual punishment.',
    standards: ['3.2'],
    cases: [],
    frqs: ['Appears in questions about capital punishment, prison conditions, and the rights of the accused.'],
    significance: 'The "cruel and unusual punishment" clause has been applied to death penalty cases and prison conditions.'
  },
  {
    num: 9, year: 1791, era: 'Bill of Rights',
    title: 'Rights Retained by the People',
    plain: 'Just because a right is not listed in the Constitution does not mean the people do not have it. The list of rights is not exhaustive.',
    standards: ['3.3'],
    cases: [],
    frqs: ['Cited in privacy rights arguments -- the right to privacy is not explicitly in the Constitution but courts have found it implied here and in the 14th Amendment.'],
    significance: 'Foundation for unenumerated rights including privacy. Important for understanding how the Constitution is interpreted broadly.'
  },
  {
    num: 10, year: 1791, era: 'Bill of Rights',
    title: 'Powers Reserved to States and People',
    plain: 'Any powers not given to the federal government by the Constitution belong to the states or the people.',
    standards: ['1.2'],
    cases: [],
    frqs: ['The foundation of federalism arguments. Frequently appears in FRQs about the balance of power between national and state governments.'],
    significance: 'The constitutional basis for federalism. One of the most cited amendments in AP Gov.'
  },
  {
    num: 11, year: 1795, era: 'Post-Founding',
    title: 'Suits Against States',
    plain: 'Citizens of one state (or foreign citizens) cannot sue another state in federal court without that state\'s consent.',
    standards: ['2.5'],
    cases: [],
    frqs: ['Rarely tested directly. Related to state sovereign immunity.'],
    significance: 'Established state sovereign immunity from certain federal lawsuits.'
  },
  {
    num: 12, year: 1804, era: 'Post-Founding',
    title: 'Election of President and Vice President',
    plain: 'Electors cast separate ballots for President and Vice President (changed after the 1800 election tied Jefferson and Burr).',
    standards: ['5.2'],
    cases: [],
    frqs: ['Context for understanding the Electoral College. The 1800 election crisis that prompted this amendment is good background knowledge.'],
    significance: 'Fixed the flaw that caused the 1800 election crisis. Part of the Electoral College structure.'
  },
  {
    num: 13, year: 1865, era: 'Reconstruction',
    title: 'Abolition of Slavery',
    plain: 'Slavery and involuntary servitude are abolished throughout the United States, except as punishment for a crime.',
    standards: ['3.4'],
    cases: [],
    frqs: ['Frequently appears in civil rights FRQs. Know the connection to the Emancipation Proclamation (1863) -- the Proclamation was a war measure, the 13th Amendment made abolition permanent.'],
    significance: 'The most fundamental change to the Constitution. Ended legal slavery and prompted the Reconstruction Amendments.'
  },
  {
    num: 14, year: 1868, era: 'Reconstruction',
    title: 'Citizenship, Due Process, Equal Protection',
    plain: 'Anyone born or naturalized in the United States is a citizen. States cannot deny citizens due process or equal protection of the laws.',
    standards: ['3.3','3.4'],
    cases: ['Brown v. Board of Education','Gideon v. Wainwright','Mapp v. Ohio','Miranda v. Arizona','McDonald v. Chicago'],
    frqs: ['The MOST important amendment for AP Gov. Selective incorporation, equal protection, due process -- all Unit 3 flows through the 14th. Know it cold.'],
    significance: 'The single most litigated amendment. Foundation for selective incorporation, equal protection, and civil rights. Every required SCOTUS case in Unit 3 touches the 14th Amendment.'
  },
  {
    num: 15, year: 1870, era: 'Reconstruction',
    title: 'Voting Rights -- Race',
    plain: 'The right to vote cannot be denied based on race, color, or previous condition of servitude.',
    standards: ['3.4','5.2'],
    cases: [],
    frqs: ['Pair with the Voting Rights Act of 1965 and the history of voter suppression (literacy tests, grandfather clauses, white primaries).'],
    significance: 'Granted Black men the right to vote -- but was effectively nullified for nearly a century by Jim Crow laws.'
  },
  {
    num: 16, year: 1913, era: 'Progressive Era',
    title: 'Income Tax',
    plain: 'Congress has the power to collect an income tax without apportioning it among the states.',
    standards: ['4.4'],
    cases: [],
    frqs: ['Relevant to fiscal policy discussions and the growth of federal power in the 20th century.'],
    significance: 'Enabled the modern federal government by creating a reliable revenue source.'
  },
  {
    num: 17, year: 1913, era: 'Progressive Era',
    title: 'Direct Election of Senators',
    plain: 'U.S. Senators are elected directly by the voters of each state (previously chosen by state legislatures).',
    standards: ['2.1'],
    cases: [],
    frqs: ['Connects to debates about representation, federalism, and democratic accountability. Good context for understanding the original design of the Senate.'],
    significance: 'Major democratic reform. Changed the Senate from an appointed to an elected body, shifting power from state governments to the people.'
  },
  {
    num: 18, year: 1919, era: 'Progressive Era',
    title: 'Prohibition of Alcohol',
    plain: 'The manufacture, sale, and transportation of alcohol is prohibited.',
    standards: ['1.1'],
    cases: [],
    frqs: ['Used as an example of federalism, the limits of government power, and constitutional amendment. Notable as the only amendment later repealed.'],
    significance: 'The only amendment later repealed. Classic example of using constitutional amendment for social policy -- and its failures.'
  },
  {
    num: 19, year: 1920, era: "Women's Suffrage",
    title: "Women's Right to Vote",
    plain: 'The right to vote cannot be denied based on sex.',
    standards: ['3.4','5.2'],
    cases: [],
    frqs: ['Appears in civil rights and political participation FRQs. Know the broader suffrage movement context.'],
    significance: "Gave women the right to vote after decades of activism. Combined with the 15th Amendment, expanded voting rights significantly."
  },
  {
    num: 20, year: 1933, era: 'New Deal Era',
    title: 'Presidential Terms Begin in January',
    plain: 'Presidential and congressional terms begin on January 20th and January 3rd respectively, reducing the "lame duck" period.',
    standards: ['2.3'],
    cases: [],
    frqs: ['Connects to the concept of the lame duck period and presidential power transitions.'],
    significance: 'Shortened the lame duck period by moving the inauguration from March to January.'
  },
  {
    num: 21, year: 1933, era: 'New Deal Era',
    title: 'Repeal of Prohibition',
    plain: 'The 18th Amendment is repealed. Prohibition is over.',
    standards: ['1.1'],
    cases: [],
    frqs: ['Paired with the 18th Amendment as an example of constitutional amendment and its limits.'],
    significance: 'The only amendment that repeals another. Demonstrates that the Constitution can be changed when a policy fails.'
  },
  {
    num: 22, year: 1951, era: 'Cold War Era',
    title: 'Presidential Term Limits',
    plain: 'No person can be elected President more than twice. Passed after FDR won four terms.',
    standards: ['2.3'],
    cases: [],
    frqs: ['Connects to separation of powers, presidential power, and the lame duck period. Know WHY it was passed -- FDR\'s four terms.'],
    significance: 'Passed in reaction to FDR\'s four terms. Limits presidential power by preventing entrenchment in office.'
  },
  {
    num: 23, year: 1961, era: 'Civil Rights Era',
    title: 'Electoral Votes for Washington D.C.',
    plain: 'Washington D.C. receives electoral votes as if it were a state (currently 3), allowing D.C. residents to vote for President.',
    standards: ['5.2'],
    cases: [],
    frqs: ['Context for Electoral College discussions. Connects to ongoing debates about D.C. statehood.'],
    significance: 'Gave D.C. residents the right to vote for President for the first time. D.C. statehood debate continues today.'
  },
  {
    num: 24, year: 1964, era: 'Civil Rights Era',
    title: 'Abolition of Poll Taxes',
    plain: 'The right to vote in federal elections cannot be conditioned on payment of a poll tax or any other tax.',
    standards: ['3.4','5.2'],
    cases: [],
    frqs: ['Appears in voting rights FRQs alongside the Voting Rights Act of 1965. Know the history of poll taxes as voter suppression tools.'],
    significance: 'Eliminated poll taxes in federal elections -- a key voter suppression tool used to disenfranchise poor Black voters in the South.'
  },
  {
    num: 25, year: 1967, era: 'Cold War Era',
    title: 'Presidential Succession and Disability',
    plain: 'Establishes the order of presidential succession and procedures for addressing presidential disability or incapacity.',
    standards: ['2.3'],
    cases: [],
    frqs: ['Connects to presidential power, checks and balances, and continuity of government.'],
    significance: 'Passed after JFK\'s assassination to clarify succession. Used to address concerns about presidential disability.'
  },
  {
    num: 26, year: 1971, era: 'Vietnam Era',
    title: 'Voting Age Lowered to 18',
    plain: 'The right to vote cannot be denied to citizens 18 years of age or older. Passed during Vietnam War -- "old enough to fight, old enough to vote."',
    standards: ['3.4','5.2'],
    cases: [],
    frqs: ['Appears in political participation FRQs about voting rights and youth turnout.'],
    significance: 'Lowered voting age from 21 to 18. Context: young men were being drafted to fight in Vietnam without being able to vote.'
  },
  {
    num: 27, year: 1992, era: 'Modern Era',
    title: 'Congressional Pay',
    plain: 'Any law changing congressional pay cannot take effect until after the next election. Originally proposed in 1789 -- took 203 years to ratify.',
    standards: ['2.1'],
    cases: [],
    frqs: ['Good example of the amendment process and its slowness. The 203-year gap between proposal and ratification is remarkable.'],
    significance: 'The longest gap between proposal and ratification in history (1789-1992). Shows the amendment process can be glacially slow.'
  }
];

// ════════════════════════════════════════════════════════════════
//  AP EXAM FRQ ARCHIVE -- Released Questions 2015-2024
//  Source: College Board AP Central (public domain)
// ════════════════════════════════════════════════════════════════
var FRQ_ARCHIVE = [
  // ── 2024 ──
  { year: 2024, type: 'Concept Application', unit: 2, standard: '2.3',
    title: 'Presidential Use of Executive Agreements',
    prompt: 'The president negotiates a major trade deal with another country. Rather than submitting it to the Senate as a formal treaty, the president signs it as an executive agreement.\n\na. Describe the difference between a treaty and an executive agreement.\n\nb. Explain one reason a president might prefer to use an executive agreement rather than a treaty.\n\nc. Explain how this scenario illustrates the tension between presidential power and the Senate\'s role in foreign policy.' },
  { year: 2024, type: 'Quantitative Analysis', unit: 5, standard: '5.2',
    title: 'Voter Turnout Trends',
    prompt: 'The bar graph shows voter turnout in presidential and midterm elections from 2010-2022.\n\na. Identify the election year with the highest voter turnout shown in the data.\n\nb. Describe the pattern shown in the data between presidential and midterm election turnout.\n\nc. Draw a conclusion about what the data suggests regarding the surge-and-decline theory of voter participation. Use specific data from the graph as evidence.\n\nd. Explain one factor that could account for the unusually high turnout in 2020 that is not shown in the graph.' },
  { year: 2024, type: 'SCOTUS Comparison', unit: 3, standard: '3.1',
    title: 'Tinker v. Des Moines & Hazelwood v. Kuhlmeier',
    prompt: 'In Tinker v. Des Moines (1969), the Supreme Court ruled that students wearing black armbands to protest the Vietnam War was protected speech under the First Amendment.\n\nIn Hazelwood School District v. Kuhlmeier (1988), the Court ruled that school officials could censor a school-sponsored newspaper without violating the First Amendment.\n\na. Identify the constitutional provision at issue in both cases.\n\nb. Explain the reasoning of the majority in Tinker v. Des Moines.\n\nc. Explain how Hazelwood reached a different conclusion, and identify one similarity and one difference in the constitutional reasoning between the two cases.\n\nd. Apply the reasoning of both cases to the following scenario: A student writes an op-ed for the school newspaper criticizing the principal\'s disciplinary policies. Should it be protected? Use reasoning from BOTH cases.' },
  { year: 2024, type: 'Argumentative Essay', unit: 1, standard: '1.2',
    title: 'Federalism and Policy Effectiveness',
    prompt: 'Develop an argument that responds to the following question:\n\nDoes federalism make American public policy more or less effective?\n\nIn your response, use at least ONE piece of evidence from the following: Federalist No. 51, the Tenth Amendment, or McCulloch v. Maryland. Use at least one additional piece of evidence from your knowledge of AP U.S. Government and Politics. Respond to an opposing perspective and support your argument with logical reasoning.' },

  // ── 2023 ──
  { year: 2023, type: 'Concept Application', unit: 2, standard: '2.1',
    title: 'Congressional Oversight',
    prompt: 'The House Armed Services Committee holds hearings to investigate whether the Department of Defense properly spent funds allocated by Congress.\n\na. Describe the constitutional basis for Congress\'s ability to investigate executive branch activities.\n\nb. Explain one way this scenario illustrates the principle of checks and balances.\n\nc. Explain how interest groups might attempt to influence the outcome of these hearings.' },
  { year: 2023, type: 'Quantitative Analysis', unit: 4, standard: '4.3',
    title: 'Public Trust in Government',
    prompt: 'The line graph shows the percentage of Americans who say they trust the federal government to do what is right "just about always" or "most of the time" from 1960-2023.\n\na. Identify the decade in which trust in government was highest.\n\nb. Describe the overall trend shown in the data from 1960 to 2023.\n\nc. Draw a conclusion about what the data suggests about political efficacy among Americans. Use specific data from the graph as evidence.\n\nd. Explain one event or development that could account for the sharp decline in trust seen in the 1970s.' },
  { year: 2023, type: 'SCOTUS Comparison', unit: 2, standard: '2.5',
    title: 'McCulloch v. Maryland & United States v. Lopez',
    prompt: 'In McCulloch v. Maryland (1819), the Supreme Court broadly interpreted congressional power, holding that Congress had implied powers beyond those explicitly listed in the Constitution.\n\nIn United States v. Lopez (1995), the Court struck down the Gun-Free School Zones Act, ruling that Congress had exceeded its Commerce Clause authority.\n\na. Identify the constitutional provision that grants Congress authority in both cases.\n\nb. Explain the Court\'s reasoning in McCulloch v. Maryland and what it established about federal power.\n\nc. Explain how Lopez limited what was established in McCulloch, and identify one similarity between how the Court approached federal power in both cases.' },
  { year: 2023, type: 'Argumentative Essay', unit: 2, standard: '2.3',
    title: 'Limits on Presidential Power',
    prompt: 'Develop an argument that responds to the following question:\n\nAre there sufficient checks on presidential power in the American constitutional system?\n\nUse at least ONE piece of evidence from: Federalist No. 51, Federalist No. 70, or U.S. v. Nixon. Use at least one additional piece of evidence. Respond to an opposing perspective.' },

  // ── 2022 ──
  { year: 2022, type: 'Concept Application', unit: 3, standard: '3.1',
    title: 'Symbolic Speech',
    prompt: 'A city passes an ordinance prohibiting the burning of the American flag on public property, citing concerns about public order and respect for national symbols.\n\na. Identify the constitutional protection most at issue in this scenario.\n\nb. Explain how the concept of symbolic speech applies to this scenario.\n\nc. Explain one argument a court might make FOR the ordinance and one argument AGAINST it, using constitutional reasoning.' },
  { year: 2022, type: 'Quantitative Analysis', unit: 5, standard: '5.1',
    title: 'Party Identification Trends',
    prompt: 'The line graph shows the percentage of Americans identifying as Democrat, Republican, and Independent from 1994-2022.\n\na. Identify the trend shown for Independent party identification over the time period shown.\n\nb. Describe what the data shows about the relative strength of the two major parties over time.\n\nc. Draw a conclusion about what the data suggests for the future of the two-party system. Use specific data as evidence.\n\nd. Explain one reason why party identification has become less stable in recent decades.' },
  { year: 2022, type: 'SCOTUS Comparison', unit: 3, standard: '3.4',
    title: 'Brown v. Board & Parents Involved v. Seattle',
    prompt: 'In Brown v. Board of Education (1954), the Supreme Court ruled that race-based school segregation was unconstitutional under the Equal Protection Clause.\n\nIn Parents Involved in Community Schools v. Seattle School District (2007), the Court ruled that voluntary race-conscious school assignment plans were unconstitutional.\n\na. Identify the constitutional provision central to both cases.\n\nb. Explain the reasoning of the Court in Brown v. Board of Education.\n\nc. Explain how Parents Involved built upon and extended Brown, and describe one way the two cases are in tension with each other.' },
  { year: 2022, type: 'Argumentative Essay', unit: 5, standard: '5.3',
    title: 'Interest Groups and Democracy',
    prompt: 'Develop an argument that responds to the following question:\n\nDo interest groups strengthen or weaken American democracy?\n\nUse at least ONE piece of evidence from: Federalist No. 10, the First Amendment, or Citizens United v. FEC. Use at least one additional piece of evidence. Respond to an opposing perspective.' },

  // ── 2021 ──
  { year: 2021, type: 'Concept Application', unit: 1, standard: '1.2',
    title: 'Categorical Grants and Federal Power',
    prompt: 'Congress passes a law providing states with federal funds to upgrade their highway systems. The law requires that states use the money only for highway construction and maintenance, follow specific federal design standards, and submit detailed progress reports to the federal government.\n\na. Identify the type of federal grant described in this scenario.\n\nb. Explain one advantage and one disadvantage of this type of grant from the perspective of the states.\n\nc. Explain how this scenario illustrates cooperative federalism.' },
  { year: 2021, type: 'Quantitative Analysis', unit: 2, standard: '2.1',
    title: 'Congressional Approval Ratings',
    prompt: 'The bar graph shows congressional approval ratings from 2001-2021.\n\na. Identify the year in which congressional approval was highest in the data shown.\n\nb. Describe the general trend in congressional approval over the period shown.\n\nc. Draw a conclusion about the relationship between congressional approval and public confidence in government institutions. Use specific data from the graph.\n\nd. Explain one structural factor that makes it difficult for Congress to maintain high approval ratings.' },
  { year: 2021, type: 'SCOTUS Comparison', unit: 2, standard: '2.5',
    title: 'Marbury v. Madison & Bush v. Gore',
    prompt: 'In Marbury v. Madison (1803), the Supreme Court established the power of judicial review, asserting the Court\'s authority to strike down laws that violate the Constitution.\n\nIn Bush v. Gore (2000), the Court intervened in the Florida presidential recount, ruling that the recount process violated the Equal Protection Clause and ordering it halted.\n\na. Identify the principle established in Marbury v. Madison.\n\nb. Explain the significance of Marbury v. Madison for the role of the judicial branch in the constitutional system.\n\nc. Explain how Bush v. Gore illustrates both the power and the limits of judicial review, and identify one similarity in how both cases affected the balance of power among the three branches.' },
  { year: 2021, type: 'Argumentative Essay', unit: 3, standard: '3.1',
    title: 'Free Speech and Social Order',
    prompt: 'Develop an argument that responds to the following question:\n\nShould freedom of speech be an absolute right, or does the government have a legitimate interest in limiting certain types of speech?\n\nUse at least ONE piece of evidence from: the First Amendment, Schenck v. United States, or Tinker v. Des Moines. Use at least one additional piece of evidence. Respond to an opposing perspective.' },

  // ── 2020 ──
  { year: 2020, type: 'Concept Application', unit: 2, standard: '2.4',
    title: 'Bureaucratic Discretion',
    prompt: 'The Environmental Protection Agency issues new regulations limiting carbon emissions from power plants. The regulations go beyond what Congress explicitly authorized in the Clean Air Act, but the EPA argues that the law gives it broad authority to protect public health.\n\na. Define bureaucratic discretion and explain how it applies to this scenario.\n\nb. Explain one way Congress could respond to limit the EPA\'s authority in this situation.\n\nc. Explain how this scenario illustrates the concept of agency capture, or explain why it does NOT illustrate agency capture.' },
  { year: 2020, type: 'Quantitative Analysis', unit: 5, standard: '5.4',
    title: 'Media Consumption and Political Knowledge',
    prompt: 'The bar graph shows the percentage of Americans who say they regularly get political news from various sources (television, newspaper, online, social media) in 2000 and 2020.\n\na. Identify the news source that showed the greatest increase between 2000 and 2020.\n\nb. Describe what the data shows about how Americans\' media consumption habits have changed.\n\nc. Draw a conclusion about how these changes might affect agenda setting and the public\'s political knowledge. Use specific data as evidence.\n\nd. Explain one concern about the rise of social media as a primary news source for political information.' },
  { year: 2020, type: 'SCOTUS Comparison', unit: 3, standard: '3.4',
    title: 'Shaw v. Reno & Rucho v. Common Cause',
    prompt: 'In Shaw v. Reno (1993), the Supreme Court ruled that oddly shaped majority-minority districts could be challenged as racial gerrymanders under the Equal Protection Clause.\n\nIn Rucho v. Common Cause (2019), the Court ruled that partisan gerrymandering claims were non-justiciable political questions that federal courts could not adjudicate.\n\na. Identify the constitutional provision central to Shaw v. Reno.\n\nb. Explain the reasoning of the Court in Shaw v. Reno and what it established about redistricting.\n\nc. Explain how Rucho differs from Shaw v. Reno in its approach to gerrymandering, and explain one implication of the Rucho ruling for future redistricting cases.' },
  { year: 2020, type: 'Argumentative Essay', unit: 2, standard: '2.1',
    title: 'Congressional Power in the Modern Era',
    prompt: 'Develop an argument that responds to the following question:\n\nHas Congress adequately fulfilled its constitutional role as a check on executive power in the modern era?\n\nUse at least ONE piece of evidence from: Federalist No. 51, the War Powers Resolution, or U.S. v. Nixon. Use at least one additional piece of evidence. Respond to an opposing perspective.' },

  // ── 2019 ──
  { year: 2019, type: 'Concept Application', unit: 5, standard: '5.2',
    title: 'Electoral College and Popular Vote',
    prompt: 'A presidential candidate wins the Electoral College and becomes president despite losing the national popular vote by more than two million votes.\n\na. Describe how the Electoral College works and explain how a candidate can win the presidency without winning the popular vote.\n\nb. Explain one argument in favor of keeping the Electoral College.\n\nc. Explain one argument for replacing the Electoral College with a national popular vote system.' },
  { year: 2019, type: 'SCOTUS Comparison', unit: 2, standard: '2.3',
    title: 'U.S. v. Nixon & Clinton v. Jones',
    prompt: 'In United States v. Nixon (1974), the Supreme Court unanimously ruled that President Nixon had to turn over White House tape recordings to a special prosecutor, rejecting the claim of absolute executive privilege.\n\nIn Clinton v. Jones (1997), the Court ruled that a sitting president does not have immunity from civil lawsuits for actions taken before taking office.\n\na. Identify the constitutional principle at issue in both cases regarding presidential power.\n\nb. Explain the reasoning of the Court in U.S. v. Nixon and what limits it placed on presidential power.\n\nc. Explain how Clinton v. Jones extended the principle established in Nixon, and identify one similarity in how the Court approached presidential accountability in both cases.' },
  { year: 2019, type: 'Argumentative Essay', unit: 1, standard: '1.3',
    title: 'Constitutional Design and Faction',
    prompt: 'Develop an argument that responds to the following question:\n\nHas the constitutional design established by the Founders been successful in controlling the effects of faction?\n\nUse at least ONE piece of evidence from: Federalist No. 10, Federalist No. 51, or Brutus No. 1. Use at least one additional piece of evidence. Respond to an opposing perspective.' },

  // ── 2018 ──
  { year: 2018, type: 'Concept Application', unit: 3, standard: '3.2',
    title: 'Search and Seizure in the Digital Age',
    prompt: 'Police officers, investigating a robbery, ask a suspect\'s cell phone provider to turn over months of location data without obtaining a warrant. The data places the suspect at the scene of multiple crimes.\n\na. Identify the constitutional amendment most relevant to this scenario.\n\nb. Explain how the exclusionary rule applies to this scenario.\n\nc. Explain one argument that the police behavior was constitutional AND one argument that it was unconstitutional.' },
  { year: 2018, type: 'Quantitative Analysis', unit: 5, standard: '5.1',
    title: 'Voter Turnout by Education Level',
    prompt: 'The bar graph shows voter turnout in the 2016 presidential election by education level.\n\na. Identify the education group with the highest voter turnout in the 2016 election.\n\nb. Describe the pattern shown in the data between education level and voter turnout.\n\nc. Draw a conclusion about what this data suggests for political representation and whose voices are most heard in elections. Use specific data as evidence.\n\nd. Explain one reason why citizens with higher education levels tend to vote at higher rates.' },
  { year: 2018, type: 'Argumentative Essay', unit: 5, standard: '5.3',
    title: 'Campaign Finance and the First Amendment',
    prompt: 'Develop an argument that responds to the following question:\n\nDid the Supreme Court make the right decision in Citizens United v. Federal Election Commission?\n\nUse at least ONE piece of evidence from: the First Amendment, Federalist No. 10, or your knowledge of campaign finance. Use at least one additional piece of evidence. Respond to an opposing perspective.' },

  // ── 2017 ──
  { year: 2017, type: 'Concept Application', unit: 2, standard: '2.5',
    title: 'Judicial Nominations and Senate Confirmation',
    prompt: 'The president nominates a federal judge to fill a vacancy on the Supreme Court. Opposition senators announce they will use every procedural tool available to delay or block the confirmation vote.\n\na. Describe the formal constitutional process for confirming federal judges.\n\nb. Explain one informal norm or practice that senators might use to delay confirmation.\n\nc. Explain how this scenario illustrates the checks and balances between the executive and legislative branches.' },
  { year: 2017, type: 'Argumentative Essay', unit: 3, standard: '3.4',
    title: 'Civil Rights and Equal Protection',
    prompt: 'Develop an argument that responds to the following question:\n\nHas the Equal Protection Clause of the 14th Amendment been interpreted broadly enough to protect the civil rights of all Americans?\n\nUse at least ONE piece of evidence from: the 14th Amendment, Brown v. Board of Education, or the Civil Rights Act of 1964. Use at least one additional piece of evidence. Respond to an opposing perspective.' },

  // ── 2016 ──
  { year: 2016, type: 'Concept Application', unit: 1, standard: '1.2',
    title: 'Federalism and Immigration',
    prompt: 'A state passes a law requiring police officers to check the immigration status of anyone they stop for any reason. The federal government argues the state law interferes with federal immigration policy.\n\na. Identify the constitutional clause that gives the federal government authority over immigration policy.\n\nb. Explain how this scenario illustrates the tension between state and federal power in the American federal system.\n\nc. Explain one argument the state government might make to defend its law.' },
  { year: 2016, type: 'Argumentative Essay', unit: 2, standard: '2.1',
    title: 'Representation and the Role of Congress',
    prompt: 'Develop an argument that responds to the following question:\n\nWhich model of representation -- delegate, trustee, or politico -- best serves the interests of American democracy?\n\nUse at least ONE piece of evidence from: Federalist No. 51, Federalist No. 10, or your knowledge of congressional representation. Use at least one additional piece of evidence. Respond to an opposing perspective.' },

  // ── 2015 ──
  { year: 2015, type: 'Concept Application', unit: 5, standard: '5.4',
    title: 'Media and Political Campaigns',
    prompt: 'During a presidential campaign, a candidate\'s negative advertisement falsely claims that the opponent raised taxes twelve times as governor. The advertisement runs repeatedly on television in battleground states.\n\na. Explain how this scenario illustrates the concept of "going negative" in political campaigns.\n\nb. Explain one way the media can act as a "watchdog" in response to this type of advertisement.\n\nc. Explain how this type of advertising relates to the concept of agenda setting.' },
  { year: 2015, type: 'Argumentative Essay', unit: 1, standard: '1.1',
    title: 'Democratic Values and the Constitution',
    prompt: 'Develop an argument that responds to the following question:\n\nTo what extent does the United States Constitution fulfill the democratic ideals expressed in the Declaration of Independence?\n\nUse at least ONE piece of evidence from: the Declaration of Independence, the Constitution, or Federalist No. 51. Use at least one additional piece of evidence. Respond to an opposing perspective.' }
];

