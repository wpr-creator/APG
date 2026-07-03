// ════════════════════════════════════════════════════
// data-content.js — AP Gov Site: Content Data
// Living Docs, Diagnostic, FRQ Practice, Cartoons, Cases
// ════════════════════════════════════════════════════

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
//  POLITICAL CARTOON ANALYZER DATA
// ════════════════════════════════════════════════════════════════
var CARTOONS = [
  {
    id: 1, unit: 1, file: "images/cartoon-01-checks-balances.jpg",
    title: "The Constitutional Leash",
    standard: "2.2",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main visual metaphor in this cartoon and describe what you see.",
        answer: "The cartoon shows three figures representing Congress, the President, and the Supreme Court connected by chains. Each figure grips a chain attached to the others, preventing any one branch from moving freely. The chains are labeled with specific constitutional checks: Veto Power, Judicial Review, and Senate Confirmation."
      },
      {
        part: "Part B — Explain",
        q: "What is the cartoonist's point of view about the relationship between the three branches of government?",
        answer: "The cartoonist argues that the three branches are deliberately and equally constrained by one another. None can act without the others having some check on their power. The strain on each figure's face suggests this tension is ongoing and intentional — by constitutional design, not accident."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates the principle of checks and balances (EK 2.2). The Founders, as argued in Federalist No. 51, designed the government so that 'ambition must be made to counteract ambition.' Each branch has specific tools — the veto, judicial review, and Senate confirmation — to prevent the others from accumulating too much power. This reflects Madison's argument that structural design, not the virtue of officeholders, is what prevents tyranny."
      }
    ]
  },
  {
    id: 2, unit: 1, file: "images/cartoon-02-federalism.jpg",
    title: "Still Tugging",
    standard: "1.2",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "Two figures are engaged in a tug of war. One figure is larger and labeled 'Federal Government,' the other smaller and labeled 'State Government.' The rope between them represents the contested power between the two levels of government."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about the relationship between federal and state governments?",
        answer: "The cartoonist suggests that the balance of power between federal and state governments is an ongoing, unresolved contest. Neither side has fully won — the tension is permanent and structural, not a temporary dispute."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates federalism (EK 1.2) — the constitutional division of power between national and state governments. The Tenth Amendment reserves powers not delegated to the federal government to the states, while the Supremacy Clause establishes federal law as supreme when conflicts arise. The ongoing tug of war reflects the evolution from dual federalism (layer cake) to cooperative federalism (marble cake) and debates over devolution and unfunded mandates."
      }
    ]
  },
  {
    id: 3, unit: 1, file: "images/cartoon-03-factions.jpg",
    title: "Madison's Nightmare",
    standard: "1.3",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "A figure in colonial dress stands surrounded by a crowd of modern figures, each holding signs with different interest group labels. The colonial figure — representing a Founder — appears overwhelmed by the chaos of competing interests shouting in different directions."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about factions and the political system?",
        answer: "The cartoonist suggests that the problem of factions — groups pursuing their own interests at the expense of the common good — is alive and well in modern American politics. The Founder figure's distress implies that the current state of factional politics is exactly what the Founders feared."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon directly illustrates Madison's argument in Federalist No. 10 (EK 1.3). Madison defined a faction as a group whose interests are 'adverse to the rights of other citizens or the aggregate interests of the community.' He argued that factions are inevitable in a free society but that a large republic with many competing interests would prevent any single faction from dominating — the diversity itself becomes a check. The modern interest groups shown (oil, guns, unions, banks) are exactly the kind of factions Madison anticipated."
      }
    ]
  },
  {
    id: 4, unit: 2, file: "images/cartoon-04-executive-orders.jpg",
    title: "With the Stroke of a Pen",
    standard: "2.3",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "A president sits at a desk signing a large document while Congress is depicted in the corner — marginalized or bypassed. The image emphasizes the president acting alone without congressional involvement."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about presidential power?",
        answer: "The cartoonist suggests that presidents can and do use executive orders to act unilaterally, bypassing Congress entirely. The image implies this may be an overreach of executive authority — Congress is present but irrelevant to the action being taken."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates the informal and inherent powers of the presidency (EK 2.3). Executive orders are policy directives issued by the president that do not require congressional approval. They represent the president's informal power — particularly 'going public' and acting through administrative means. Critics argue they circumvent the separation of powers; defenders argue they are necessary for effective governance. The War Powers Resolution (1973) and debates over executive overreach connect directly to this image."
      }
    ]
  },
  {
    id: 5, unit: 2, file: "images/cartoon-05-filibuster.jpg",
    title: "The Art of Saying Nothing",
    standard: "2.1",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "A senator stands alone at a podium speaking endlessly. The clock shows it is very late, other senators' seats are empty or senators are asleep, and a piece of legislation sits untouched — gathering dust or cobwebs. The senator appears to hold a very thick document, suggesting they intend to continue speaking indefinitely."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about Senate procedure?",
        answer: "The cartoonist criticizes the filibuster as a tool for blocking legislation rather than engaging with it. The image implies the tactic wastes time and prevents democratic majority rule — the bill never gets voted on while one senator exercises unlimited delay."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates the Senate filibuster (EK 2.1) — a tactic through which a senator may use unlimited debate to delay or block a vote on legislation. Ending a filibuster requires cloture, which needs 60 votes. This gives the minority significant power to obstruct the majority's agenda. The cartoon also connects to the concept of gridlock — the Senate's difficulty in passing legislation — and to debates about whether the filibuster should be reformed or eliminated."
      }
    ]
  },
  {
    id: 6, unit: 2, file: "images/cartoon-06-iron-triangle.jpg",
    title: "Who's Really in Charge?",
    standard: "2.4",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "Three figures or hands are connected in a triangular formation, each labeled with one of three entities: a Congressional Committee, a Federal Agency, and an Interest Group (or Lobbyist). The connections between them suggest mutual benefit. A figure outside the triangle — representing the public — appears excluded or unaware of what's happening inside."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about policymaking in the federal bureaucracy?",
        answer: "The cartoonist argues that real policymaking happens not in public deliberation but in closed relationships between Congress, agencies, and interest groups — all of whom benefit from the arrangement at the public's expense. The public is excluded from this process."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates the iron triangle (EK 2.4) — the stable, mutually beneficial relationship between a congressional committee, a federal agency, and an interest group. The committee funds the agency and writes favorable legislation; the agency implements rules that benefit the interest group; the interest group provides campaign donations and votes for committee members. This concept connects to agency capture — when the regulated industry effectively controls the regulating agency — and to concerns about democratic accountability in the bureaucracy."
      }
    ]
  },
  {
    id: 7, unit: 2, file: "images/cartoon-07-judicial-review.jpg",
    title: "Marbury's Legacy",
    standard: "2.5",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "A robed Supreme Court figure holds an enormous stamp labeled 'VOID' or 'UNCONSTITUTIONAL' over a document representing an Act of Congress. Members of Congress look on in shock. The stamp is coming down with authority, about to invalidate the congressional action."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about the power of the Supreme Court?",
        answer: "The cartoonist illustrates the Supreme Court's power to be the final word on what is constitutional — able to strike down acts of Congress that it determines violate the Constitution. The shock of the congressional figures suggests this power is formidable and final."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates judicial review (EK 2.5) — the power of the Supreme Court to declare laws or executive actions unconstitutional. This power was established in Marbury v. Madison (1803), in which Chief Justice John Marshall asserted that 'it is emphatically the province and duty of the judicial department to say what the law is.' Hamilton anticipated this in Federalist No. 78, arguing the courts would be the 'least dangerous branch.' The cartoon also connects to debates about judicial activism vs. judicial restraint."
      }
    ]
  },
  {
    id: 8, unit: 3, file: "images/cartoon-08-first-amendment.jpg",
    title: "Free — But Not Absolute",
    standard: "3.1",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "A figure speaks into a microphone, but something in the image — the microphone cord is knotted, a filter is on the microphone, or some speech is blocked — suggests that free speech has limits. One type of speech passes through while another is stopped."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about freedom of speech?",
        answer: "The cartoonist argues that while freedom of speech is a fundamental right, it is not unlimited. Some categories of speech — those that create an immediate threat to public safety — can be restricted by the government. The image shows the tension between protecting free expression and maintaining public order."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates the First Amendment protections for freedom of speech and their limits (EK 3.1). In Schenck v. United States (1919), the Supreme Court established the 'clear and present danger' test — speech that poses an immediate, serious threat to national security is not protected. The cartoon also connects to symbolic speech (protected), prior restraint (generally unconstitutional per New York Times v. United States, 1971), and the ongoing debate about where free speech ends."
      }
    ]
  },
  {
    id: 9, unit: 3, file: "images/cartoon-09-incorporation.jpg",
    title: "One Right at a Time",
    standard: "3.3",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "A delivery truck labeled 'Bill of Rights' is parked at a state capitol building. A driver delivers boxes one at a time — each box labeled with a specific right (Free Speech, Right to Counsel, etc.). Some boxes are already inside but the truck is not fully unloaded, suggesting the process is incomplete."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about the Bill of Rights and the states?",
        answer: "The cartoonist argues that the Bill of Rights has not been applied to the states all at once — it has been delivered piecemeal, right by right, over many decades. The incomplete delivery suggests the process is still ongoing and that states are not yet bound by every protection in the Bill of Rights."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates selective incorporation (EK 3.3) — the process through which the Supreme Court applies fundamental rights from the Bill of Rights to the states, one case at a time, through the Due Process Clause of the 14th Amendment. Key examples: Mapp v. Ohio (1961) incorporated the 4th Amendment exclusionary rule; Gideon v. Wainwright (1963) incorporated the 6th Amendment right to counsel; McDonald v. Chicago (2010) incorporated the 2nd Amendment right to bear arms. Not every right has been incorporated — the process continues."
      }
    ]
  },
  {
    id: 10, unit: 3, file: "images/cartoon-10-equal-protection.jpg",
    title: "Separate is Not Equal",
    standard: "3.4",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "Two school buildings or doors stand side by side, appearing identical. A sign on one is being removed. Diverse groups of students now move freely between both. A date — 1954 — appears prominently. The image captures a moment of transition from segregation to integration."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about racial equality in education?",
        answer: "The cartoonist argues that the doctrine of 'separate but equal' was wrong and its removal was a necessary step toward genuine equality. The identical buildings highlight that separate facilities could never truly be equal — the separation itself was the inequality."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates the Equal Protection Clause of the 14th Amendment and its application in Brown v. Board of Education (1954) (EK 3.4). The Supreme Court unanimously overturned Plessy v. Ferguson (1896)'s 'separate but equal' doctrine, ruling that racially segregated public schools were inherently unequal. Chief Justice Warren argued that separation generated feelings of inferiority that undermined Black children's educational opportunities. Brown marked a turning point in the civil rights movement and established the framework for later equal protection cases using strict scrutiny."
      }
    ]
  },
  {
    id: 11, unit: 4, file: "images/cartoon-11-polarization.jpg",
    title: "Moderate in a Polarized World",
    standard: "4.1",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "A seesaw is shown with 'Liberal' on one end and 'Conservative' on the other. Both ends are pulled down simultaneously, leaving the middle elevated and empty — or a single figure stands uncomfortably in the middle while groups push from both extremes."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about the current state of American political ideology?",
        answer: "The cartoonist argues that American politics has become increasingly polarized, with both parties moving toward their ideological extremes. The middle — moderate or independent voters — is being squeezed out or left without representation as both bases pull in opposite directions."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates party polarization (EK 4.1 and 5.1) — the shift of party positions away from the center toward ideological extremes. This connects to political ideology, the liberal-conservative spectrum, and the growing gap between Democratic and Republican voters. It also connects to the median voter theorem — candidates in primaries appeal to their base while general election candidates try to capture moderate voters — and to the impact of polarization on congressional gridlock (EK 2.1)."
      }
    ]
  },
  {
    id: 12, unit: 4, file: "images/cartoon-12-polling.jpg",
    title: "The Polling Problem",
    standard: "4.3",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "A pollster approaches a voter with a clipboard. A Magic 8-Ball labeled 'Public Opinion Poll' sits on a table. The 8-Ball's window reads 'Ask Again Later' — suggesting the poll cannot reliably predict or measure public opinion. The pollster peers hopefully at an instrument that cannot give a definitive answer."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about public opinion polling?",
        answer: "The cartoonist is skeptical of public opinion polls, suggesting they are unreliable as tools for measuring genuine public sentiment. Just as a Magic 8-Ball gives vague or evasive answers, polls are portrayed as similarly imprecise — the public's opinion is not as easily captured or predicted as pollsters imply."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates the limitations of public opinion polling (EK 4.3). Polls can be distorted by sampling error, question wording, question order, and the Bradley effect (respondents giving socially desirable rather than honest answers). Push polls present biased information as neutral questions. Latent preferences — opinions people hold weakly and that change over time — make polling results unstable. The cartoon connects to the idea that measuring 'public opinion' is far more complex than simply asking people what they think."
      }
    ]
  },
  {
    id: 13, unit: 5, file: "images/cartoon-13-gerrymandering.jpg",
    title: "Drawing the Lines",
    standard: "5.2",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "A politician stands at a drafting table drawing impossibly contorted district lines on a state map. The lines snake and twist in ways that defy geographic logic. The politician appears smug or satisfied with the result. Tools of precision — a ruler, compass — sit unused nearby."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about the redistricting process?",
        answer: "The cartoonist argues that partisan gerrymandering is a deliberate manipulation of electoral maps to benefit the party in power. The absurd shape of the district and the politician's satisfaction suggest this is done cynically to maximize political advantage rather than to create fair representation."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates gerrymandering (EK 5.2) — the intentional redrawing of electoral district boundaries to benefit a specific party or group. It connects to two required SCOTUS cases: Shaw v. Reno (1993), in which the Supreme Court ruled that racially drawn districts could be challenged under the Equal Protection Clause; and Rucho v. Common Cause (2019), in which the Court ruled partisan gerrymandering is a political question beyond federal court jurisdiction. Baker v. Carr (1962) established the principle of 'one person, one vote' through the Equal Protection Clause."
      }
    ]
  },
  {
    id: 14, unit: 5, file: "images/cartoon-14-citizens-united.jpg",
    title: "Money Talks",
    standard: "5.3",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "Two figures stand at identical microphones. One is a normal-sized citizen. The other is an enormous bag of money in a suit, labeled 'Corporation' or 'Super PAC.' Both are at the same 'Free Speech' platform but the size difference makes it clear they do not have equal voice. The citizen's microphone may be smaller or their voice drowned out."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about money and political speech?",
        answer: "The cartoonist argues that equating money with free speech gives wealthy corporations and interest groups a vastly disproportionate voice in American politics compared to ordinary citizens. While both have the same formal right to speak, their practical ability to be heard is wildly unequal."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates the impact of Citizens United v. Federal Election Commission (2010) (EK 5.3). The Supreme Court ruled that corporations and unions have a First Amendment right to spend unlimited amounts on elections, as political spending is a form of protected speech. This enabled the creation of Super PACs — organizations that can spend unlimited money on campaigns as long as spending is not directly coordinated with a candidate. Critics argue this gives wealthy interests disproportionate political influence; supporters argue it protects free speech. This connects to campaign finance, interest group lobbying, and the iron triangle."
      }
    ]
  },
  {
    id: 15, unit: 5, file: "images/cartoon-15-agenda-setting.jpg",
    title: "What You Think About",
    standard: "5.4",
    questions: [
      {
        part: "Part A — Describe",
        q: "Identify the main symbols in this cartoon and describe what you see.",
        answer: "A television dominates the scene. Multiple viewers face the TV, each with thought bubbles showing the exact same image as what's on the screen — they are all thinking about the same thing. One person in the back faces away from the TV or reads a different source, and their thought bubble shows a completely different topic."
      },
      {
        part: "Part B — Explain",
        q: "What point is the cartoonist making about the relationship between media and public opinion?",
        answer: "The cartoonist argues that the media powerfully shapes what the public thinks about — not necessarily what they think, but which issues they consider important. The uniform thought bubbles of the TV viewers show the media's ability to direct public attention, while the outlier figure reading something else thinks about different issues entirely."
      },
      {
        part: "Part C — Connect",
        q: "Explain how this cartoon relates to a specific concept from AP U.S. Government and Politics.",
        answer: "This cartoon illustrates agenda setting (EK 5.4) — the media's ability to highlight certain issues and bring them to the attention of the public, influencing which issues citizens consider most important. This is distinct from telling people what to think (propaganda) — it's about what people think about. Related concepts include framing (giving a story a specific context) and priming (predisposing audiences to evaluate issues a certain way). These media effects connect to linkage institutions and the role of media in connecting citizens to government."
      }
    ]
  }
];

// ════════════════════════════════════════════════════════════════
//  CARTOON ANALYZER ENGINE
// ════════════════════════════════════════════════════════════════
var cartoonCurrentIdx = 0;
var cartoonFilterUnit = 'all';
var cartoonDeck = CARTOONS.slice();

function buildCartoonTab() {
  cartoonDeck = CARTOONS.slice();
  showCartoon(0);
}

function cartoonFilter(unit, btn) {
  document.querySelectorAll('.cartoon-filter-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  cartoonFilterUnit = unit;
  cartoonDeck = unit === 'all'
    ? CARTOONS.slice()
    : CARTOONS.filter(function(c) { return String(c.unit) === unit; });
  cartoonCurrentIdx = 0;
  showCartoon(0);
}

function cartoonRandom() {
  var idx = Math.floor(Math.random() * cartoonDeck.length);
  cartoonCurrentIdx = idx;
  showCartoon(idx);
}

function cartoonNavigate(dir) {
  cartoonCurrentIdx = Math.max(0, Math.min(cartoonDeck.length - 1, cartoonCurrentIdx + dir));
  showCartoon(cartoonCurrentIdx);
}

function showCartoon(idx) {
  var c = cartoonDeck[idx];
  if (!c) return;

  // Image
  var img = document.getElementById('cartoon-img');
  if (img) {
    img.src = c.file;
    img.alt = c.title;
  }

  // Meta
  var titleEl = document.getElementById('cartoon-title');
  var unitEl = document.getElementById('cartoon-unit-badge');
  if (titleEl) titleEl.textContent = c.title;
  if (unitEl) unitEl.textContent = 'Unit ' + c.unit + ' · EK ' + c.standard;

  // Counter
  var counter = document.getElementById('cartoon-counter');
  if (counter) counter.textContent = (idx + 1) + ' / ' + cartoonDeck.length;

  // Nav buttons
  var prevBtn = document.getElementById('cartoon-prev-btn');
  var nextBtn = document.getElementById('cartoon-next-btn');
  if (prevBtn) prevBtn.disabled = idx === 0;
  if (nextBtn) nextBtn.disabled = idx === cartoonDeck.length - 1;

  // Questions
  var qBody = document.getElementById('cartoon-q-body');
  if (!qBody) return;
  qBody.innerHTML = c.questions.map(function(q, i) {
    return '<div class="cartoon-q-item">' +
      '<div class="cartoon-q-label">' + q.part + '</div>' +
      '<div class="cartoon-q-text">' + q.q + '</div>' +
      '<div class="cartoon-answer" id="cartoon-ans-' + i + '">' + q.answer + '</div>' +
      '<button class="cartoon-reveal-btn" id="cartoon-reveal-' + i + '" ' +
        'onclick="cartoonToggleAnswer(' + i + ')">' +
        'Show Answer</button>' +
      (i < c.questions.length - 1 ? '<div class="cartoon-divider"></div>' : '') +
    '</div>';
  }).join('');

  // Reset checklist
  document.querySelectorAll('.cartoon-check-item').forEach(function(item) {
    item.classList.remove('checked');
  });
}

function cartoonToggleAnswer(idx) {
  var ans = document.getElementById('cartoon-ans-' + idx);
  var btn = document.getElementById('cartoon-reveal-' + idx);
  if (!ans || !btn) return;
  var showing = ans.classList.contains('show');
  ans.classList.toggle('show', !showing);
  btn.classList.toggle('revealed', !showing);
  btn.textContent = showing ? 'Show Answer' : 'Hide Answer';
}

function cartoonRevealAll() {
  var c = cartoonDeck[cartoonCurrentIdx];
  if (!c) return;
  c.questions.forEach(function(q, i) {
    var ans = document.getElementById('cartoon-ans-' + i);
    var btn = document.getElementById('cartoon-reveal-' + i);
    if (ans) ans.classList.add('show');
    if (btn) { btn.classList.add('revealed'); btn.textContent = 'Hide Answer'; }
  });
}

const cartoonTab = document.querySelector('.nav-tab[data-tab="cartoons"]'); if(cartoonTab) cartoonTab.addEventListener('click', function() {
  setTimeout(buildCartoonTab, 30);
});




// ════════════════════════════════════════════════════════════════
//  WHAT WOULD MADISON SAY — DEBATE SIMULATOR DATA
// ════════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════════
//  LANDMARK CASES TAB ENGINE
// ════════════════════════════════════════════════════════════════

// SCOTUS case amendments and constitutional provisions by case
var CASE_META = {
  "Marbury v. Madison":   { amends: ["Article III", "Article II"], clause: "Judicial Review", unit: 2 },
  "McCulloch v. Maryland":{ amends: ["Article I", "Supremacy Clause", "Necessary & Proper Clause"], clause: "Implied Powers / Federal Supremacy", unit: 2 },
  "Schenck v. United States": { amends: ["1st Amendment"], clause: "Clear and Present Danger", unit: 3 },
  "Brown v. Board of Education": { amends: ["14th Amendment", "Equal Protection Clause"], clause: "Equal Protection", unit: 3 },
  "Baker v. Carr":        { amends: ["14th Amendment", "Equal Protection Clause"], clause: "Judicial Justiciability / One Person One Vote", unit: 5 },
  "Engel v. Vitale":      { amends: ["1st Amendment", "Establishment Clause"], clause: "Separation of Church and State", unit: 3 },
  "Gideon v. Wainwright": { amends: ["6th Amendment", "14th Amendment"], clause: "Selective Incorporation / Right to Counsel", unit: 3 },
  "Tinker v. Des Moines": { amends: ["1st Amendment"], clause: "Student Free Speech / Substantial Disruption Test", unit: 3 },
  "New York Times v. United States": { amends: ["1st Amendment"], clause: "Prior Restraint / Freedom of Press", unit: 3 },
  "Wisconsin v. Yoder":   { amends: ["1st Amendment", "Free Exercise Clause"], clause: "Religious Freedom vs. State Interest", unit: 3 },
  "Roe v. Wade":          { amends: ["14th Amendment"], clause: "Right to Privacy / Due Process", unit: 3 },
  "Shaw v. Reno":         { amends: ["14th Amendment", "Equal Protection Clause"], clause: "Racial Gerrymandering", unit: 5 },
  "U.S. v. Lopez":        { amends: ["Article I", "Commerce Clause"], clause: "Limits on Congressional Commerce Power", unit: 2 },
  "McDonald v. City of Chicago": { amends: ["2nd Amendment", "14th Amendment"], clause: "Selective Incorporation / Right to Bear Arms", unit: 3 },
  "Citizens United v. FEC": { amends: ["1st Amendment"], clause: "Political Speech / Campaign Finance", unit: 5 }
};

// Group cases by unit for sidebar
var CASES_BY_UNIT = [
  { unit: 2, label: "Unit 2 -- Branches of Government", cases: [] },
  { unit: 3, label: "Unit 3 -- Civil Liberties & Rights", cases: [] },
  { unit: 5, label: "Unit 5 -- Political Participation", cases: [] }
];

SCOTUS_CASES.forEach(function(c) {
  var group = CASES_BY_UNIT.find(function(g) { return g.unit === c.unit; });
  if (group) group.cases.push(c);
});

// Small SVG icon per case category -- gavel-style icons in unit colors
var CASE_ICONS = {
  2: '<svg class="docs-doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4l6 6-8.5 8.5a2.12 2.12 0 0 1-3-3L17 6.5 14 4z"/><path d="M2 22l5-5"/></svg>',
  3: '<svg class="docs-doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  5: '<svg class="docs-doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z"/></svg>'
};

var casesBuilt = false;
var caseCurrentIdx = 0;

function buildCasesTab() {
  if (casesBuilt) return;
  casesBuilt = true;

  var sidebar = document.getElementById('cases-sidebar');
  if (!sidebar) return;

  CASES_BY_UNIT.forEach(function(group) {
    if (!group.cases.length) return;
    var div = document.createElement('div');
    div.className = 'cases-unit-group';
    div.innerHTML = '<div class="cases-unit-head">' + group.label + '</div>';

    group.cases.forEach(function(c) {
      var globalIdx = SCOTUS_CASES.findIndex(function(sc) { return sc.name === c.name; });
      var pill = document.createElement('div');
      pill.className = 'cases-pill' + (globalIdx === 0 ? ' active' : '');
      pill.dataset.idx = globalIdx;
      var icon = CASE_ICONS[c.unit] || CASE_ICONS[2];
      pill.innerHTML = '<div class="docs-doc-item-row">' + icon +
        '<span class="cases-pill-year">' + c.year + '</span>' +
        '<span class="cases-pill-name">' + c.name + '</span></div>';
      pill.addEventListener('click', function() { showCase(globalIdx); });
      div.appendChild(pill);
    });
    sidebar.appendChild(div);
  });

  showCase(0);
}

function showCase(idx) {
  caseCurrentIdx = idx;
  var c = SCOTUS_CASES[idx];
  if (!c) return;
  var meta = CASE_META[c.name] || {};

  document.querySelectorAll('.cases-pill').forEach(function(p) { p.classList.remove('active'); });
  var activePill = document.querySelector('.cases-pill[data-idx="' + idx + '"]');
  if (activePill) {
    activePill.classList.add('active');
    activePill.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  var card = document.getElementById('cases-card');
  if (!card) return;

  var amendTags = (meta.amends || []).map(function(a) {
    return '<span class="cases-tag amend-tag">' + a + '</span>';
  }).join('');

  var unitLabel = ['', 'Unit 1 - Foundations', 'Unit 2 - Branches', 'Unit 3 - Civil Liberties', 'Unit 4 - Ideology', 'Unit 5 - Participation'][c.unit] || ('Unit ' + c.unit);

  var prev = SCOTUS_CASES[idx - 1];
  var next = SCOTUS_CASES[idx + 1];

  card.innerHTML =
    '<div class="cases-card-header">' +
      '<div class="cases-card-unit">' + unitLabel + '</div>' +
      '<div class="cases-card-name">' + c.name + ' (' + c.year + ')</div>' +
      '<div class="cases-card-meta">' + (meta.clause || '') + '</div>' +
    '</div>' +
    '<div class="cases-card-body">' +
      (amendTags ? '<div class="cases-tags">' + amendTags + '</div>' : '') +
      '<div class="cases-section-label">Constitutional Question</div>' +
      '<div class="cases-issue">' + c.issue + '</div>' +
      '<div class="cases-section-label">The Ruling</div>' +
      '<div class="cases-ruling">' + c.ruling + '</div>' +
      '<div class="cases-section-label">Why It Matters</div>' +
      '<div class="cases-sig">' + c.sig + '</div>' +
      '<div class="cases-section-label">\u2b50 AP Exam Tip</div>' +
      '<div class="cases-tip">' + c.tip + '</div>' +
    '</div>' +
    '<div class="cases-nav-btns">' +
      '<button class="cases-nav-btn" onclick="showCase(' + (idx-1) + ')"' + (idx === 0 ? ' disabled' : '') + '>' +
        (prev ? '\u2190 ' + prev.name : '\u2190 Previous') + '</button>' +
      '<button class="cases-nav-btn" onclick="showCase(' + (idx+1) + ')"' + (idx === SCOTUS_CASES.length-1 ? ' disabled' : '') + '>' +
        (next ? next.name + ' \u2192' : 'Next \u2192') + '</button>' +
    '</div>';
}

document.querySelector('.nav-tab[data-tab="cases"]').addEventListener('click', function() {
  setTimeout(buildCasesTab, 30);
});




// ════════════════════════════════════════════════════════════════
//  SKILL BUILDERS — Claim, Evidence & Reasoning (CER) Trainer
// ════════════════════════════════════════════════════════════════

