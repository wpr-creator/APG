// ════════════════════════════════════════════════════
// data-extra.js — AP Gov Site: Extended Content
// Madison Debate, Amendments, FRQ Archive
// ════════════════════════════════════════════════════

var MADISON_TOPICS = [
  {
    id: "executive-orders", icon: "[PEN]",
    title: "Presidential Executive Orders",
    question: "Should presidents be able to make major policy through executive orders, bypassing Congress?",
    federalist: {
      quote: "Energy in the executive is a leading character in the definition of good government... A feeble executive implies a feeble execution of the government.",
      source: "Federalist No. 70, Hamilton",
      argument: "Hamilton would argue that a strong, decisive executive is essential to good governance. Congress is slow by design -- deliberation among hundreds of members takes time the nation does not always have. A unified executive can act with 'decision, activity, secrecy, and despatch' that a legislature never could. When Congress is gridlocked, the president using lawful executive authority to act is not a threat to the Constitution -- it is the Constitution working as intended."
    },
    antifederalist: {
      quote: "This government is to possess absolute and uncontroulable power, legislative, executive and judicial, with respect to every object to which it extends.",
      source: "Brutus No. 1",
      argument: "An Anti-Federalist would warn that a president acting alone, without the deliberation and consent of the people's representatives, is exactly the kind of unchecked power the Revolution was fought to escape. Today's friendly executive order becomes tomorrow's tyrant's tool. Brutus warned that once a branch tastes unchecked power, it will not give it back willingly -- only the legislature, accountable directly to voters, should make binding national policy."
    },
    constitutional: "Article II, Section 1 vests \"the executive Power\" in the President, but Article I, Section 1 vests \"all legislative Powers\" in Congress. Executive orders sit in the gray area between executing existing law (constitutional) and making new law (arguably not). The War Powers Resolution (1973) was Congress's attempt to claw back authority it felt presidents had seized.",
    tags: ["Article II", "Separation of Powers", "Unit 2"],
    prompt: "Should Congress pass a law strictly limiting what presidents can do through executive order? Take a position and defend it using reasoning from either side above."
  },
  {
    id: "tiktok-ban", icon: "[PHONE]",
    title: "Banning Foreign-Owned Apps",
    question: "Can the government ban a foreign-owned social media app on national security grounds without violating free speech?",
    federalist: {
      quote: "The circumstances that endanger the safety of nations are infinite... it is impossible to foresee or define the extent and variety of national exigencies.",
      source: "Federalist No. 23, Hamilton",
      argument: "Hamilton would argue that national security threats cannot be fully anticipated, so the government must have broad authority to act against them -- including restricting a platform controlled by a foreign adversary government. The Constitution was designed to give the national government exactly this kind of power because state-by-state or no response at all would leave the country defenseless against modern threats the Founders could not have imagined."
    },
    antifederalist: {
      quote: "The fears of the people of America... that they should be subjected to the absolute and uncontroulable power of the general government.",
      source: "Brutus No. 1",
      argument: "An Anti-Federalist would be deeply suspicious of the government banning a communication platform millions of citizens use to speak freely, no matter the justification. \"National security\" has historically been used to justify expansions of government power that outlast the threat that created them. If the government can ban one app today, what stops it from banning a domestic platform tomorrow under the same reasoning?"
    },
    constitutional: "The First Amendment protects freedom of speech and association, but courts have generally allowed restrictions when national security is genuinely at stake (see the \"clear and present danger\" framework from Schenck v. United States). The case turns on whether banning a platform is a content-neutral national security measure or an unconstitutional restriction on speech.",
    tags: ["1st Amendment", "Schenck v. U.S.", "Unit 3"],
    prompt: "Is banning a foreign-owned app more like restricting speech or more like restricting a national security risk? Defend your position."
  },
  {
    id: "marijuana-federalism", icon: "[SCALE]",
    title: "Federal vs. State Marijuana Law",
    question: "When state law legalizes something federal law prohibits, which law should control?",
    federalist: {
      quote: "This Constitution, and the Laws of the United States which shall be made in Pursuance thereof... shall be the supreme Law of the Land.",
      source: "Article VI, the Supremacy Clause",
      argument: "A Federalist would point to the Supremacy Clause directly: federal law is supreme when it conflicts with state law. Hamilton in Federalist No. 33 explained that without this supremacy, the national government could not function -- a patchwork of 50 different drug policies undermines the uniform national regulation the Commerce Clause was designed to create. If states could simply ignore federal law they disagree with, the Union itself would unravel."
    },
    antifederalist: {
      quote: "Each state retains its sovereignty, freedom, and independence, and every Power, Jurisdiction, and right, which is not by this confederation expressly delegated to the United States.",
      source: "Articles of Confederation, Art. II (the Anti-Federalist ideal)",
      argument: "An Anti-Federalist would argue that states are closer to their citizens and better positioned to set policy that reflects local values. Forcing federal drug policy onto a state that has democratically chosen otherwise is exactly the kind of federal overreach the Tenth Amendment was meant to prevent. If voters in a state want different policy, that is federalism working correctly, not a problem to be fixed."
    },
    constitutional: "The Commerce Clause (Article I, Section 8) gives Congress power to regulate interstate commerce, which has been interpreted broadly to include drug regulation (see Gonzales v. Raich, 2005). The Tenth Amendment reserves non-delegated powers to the states. This is a live tension in modern federalism -- the federal government has largely chosen not to enforce marijuana law in states that have legalized it, an informal truce rather than a constitutional resolution.",
    tags: ["Commerce Clause", "10th Amendment", "Unit 1"],
    prompt: "Should Congress change federal law to match state marijuana laws, or should it enforce federal law uniformly? Defend your position using federalism reasoning."
  },
  {
    id: "student-loans", icon: "[DOC]",
    title: "Executive Student Loan Forgiveness",
    question: "Can the president forgive billions in student loan debt through executive action alone, without a vote in Congress?",
    federalist: {
      quote: "The President is to be the 'guardian of the people'... investing him with a degree of power and confidence necessary to discharge that important trust.",
      source: "Federalist No. 71, Hamilton (paraphrased argument)",
      argument: "A Federalist might argue that Congress has, in past legislation, delegated broad authority to the executive branch to manage federal loan programs during emergencies. The president using existing statutory authority -- rather than inventing new power -- is a legitimate exercise of delegated executive authority, similar to how Hamilton argued the executive needs flexibility to respond to circumstances Congress cannot fully anticipate."
    },
    antifederalist: {
      quote: "All legislative Powers herein granted shall be vested in a Congress of the United States.",
      source: "Article I, Section 1 (the Anti-Federalist argument)",
      argument: "An Anti-Federalist would insist that spending hundreds of billions of dollars is precisely the kind of major national policy that must go through Congress, which holds the constitutional power of the purse. If a president can forgive any debt by simply reinterpreting an old statute, the legislative branch's central power -- control over spending -- becomes meaningless. This is exactly the unchecked executive power Brutus warned would emerge if the other branches did not jealously guard their own authority."
    },
    constitutional: "Article I, Section 8 grants Congress the power \"to pay the Debts\" and control federal spending -- the \"power of the purse.\" The major questions doctrine, used by the Supreme Court in Biden v. Nebraska (2023), held that executive agencies need clear congressional authorization for actions of major economic and political significance, like mass loan forgiveness.",
    tags: ["Article I §8", "Major Questions Doctrine", "Unit 2"],
    prompt: "Does using an old law in a new way count as executive overreach, or is it legitimate use of delegated power? Take a position."
  },
  {
    id: "electoral-college", icon: "[STAR]",
    title: "The Electoral College",
    question: "Should the United States replace the Electoral College with a direct national popular vote for president?",
    federalist: {
      quote: "It was desirable that the sense of the people should operate in the choice of the person to whom so important a trust was to be confided... [but] it was also peculiarly desirable to afford as little opportunity as possible to tumult and disorder.",
      source: "Federalist No. 68, Hamilton",
      argument: "Hamilton would argue the Electoral College was designed deliberately as a filter -- not pure democracy, but a buffer against the passions of the moment. It ensures candidates must build broad coalitions across many different states and regions, not just appeal to the largest population centers. A direct popular vote would let candidates ignore smaller and rural states entirely, undermining the federal character of the Union the Constitution was built to protect."
    },
    antifederalist: {
      quote: "The people of America... have not, nor do not assent to surrender their sovereignty into the hands of any man, or body of men.",
      source: "Brutus No. 1 (argument adapted)",
      argument: "An Anti-Federalist focused on direct popular sovereignty would argue that every citizen's vote should count equally regardless of which state they live in. A system where a candidate can win the presidency while losing the national popular vote -- as has happened multiple times -- contradicts the basic democratic principle that government derives its power from the consent of the governed, not from an indirect college of electors."
    },
    constitutional: "Article II, Section 1 establishes the Electoral College, and the Twelfth Amendment refined the process after the 1800 election crisis. Changing or eliminating it would require a constitutional amendment -- a deliberately difficult process requiring two-thirds of Congress and three-fourths of the states, reflecting the Founders' intent to make such structural changes rare.",
    tags: ["Article II", "12th Amendment", "Unit 5"],
    prompt: "Does the Electoral College still serve its original purpose today, or has it outlived its usefulness? Defend your position."
  },
  {
    id: "filibuster", icon: "[CLOCK]",
    title: "Eliminating the Senate Filibuster",
    question: "Should the Senate eliminate the filibuster, allowing legislation to pass with a simple majority instead of 60 votes?",
    federalist: {
      quote: "The fundamental principle of free government [is] that the sense of the majority should prevail.",
      source: "Federalist No. 22, Hamilton",
      argument: "Hamilton was deeply skeptical of supermajority requirements, arguing in Federalist No. 22 that requiring more than a simple majority gives a minority the power to control the majority -- \"the latter, instead of being able to act, are compelled to court the pleasure of the former.\" He worried that supermajority rules like the filibuster produce \"tedious delays\" and \"continual negotiation\" rather than effective governance, weakening the national government's ability to function."
    },
    antifederalist: {
      quote: "It is in the senate ... that the most odious of all aristocracies, that of wealth, has the fairest field for influence and intrigue.",
      source: "Brutus No. 16 (paraphrased concern about Senate power concentration)",
      argument: "An Anti-Federalist concerned with minority protection would argue that the filibuster forces the kind of consensus-building and compromise that prevents a temporary majority from steamrolling the rest of the country. Removing it would let a party with a razor-thin majority impose sweeping change that half the country opposes, with the only check being the next election -- too slow to undo lasting policy damage."
    },
    constitutional: "The filibuster is NOT in the Constitution -- it is a Senate rule, not a constitutional requirement. The Constitution specifies simple majority votes for most legislation (Article I) but does list a few exceptions requiring supermajorities, like treaty ratification (two-thirds) and overriding a veto (two-thirds), suggesting the Founders specified supermajorities only where they wanted them.",
    tags: ["Article I", "Senate Rules", "Unit 2"],
    prompt: "Since the filibuster isn't in the Constitution, does that make it easier or harder to defend as good policy? Take a position."
  },
  {
    id: "citizens-united", icon: "[MONEY]",
    title: "Money as Political Speech",
    question: "Should corporations and unions be allowed to spend unlimited money on political campaigns as a form of free speech?",
    federalist: {
      quote: "Liberty is to faction what air is to fire... we might as well wish to annihilate liberty... as to abolish liberty, which is essential to political life.",
      source: "Federalist No. 10, Madison",
      argument: "Madison himself warned that you cannot eliminate the causes of faction without destroying liberty itself. A Federalist might argue that restricting how groups -- including corporations and unions -- can spend money to advocate for their views is a restriction on political speech and association. The solution to the influence of money, as Madison argued about factions generally, is not suppression but a large, diverse republic where many competing voices balance each other out."
    },
    antifederalist: {
      quote: "The fears of the people of America... that they should be subjected to ... the most odious of all aristocracies, that of wealth.",
      source: "Anti-Federalist concern, adapted",
      argument: "An Anti-Federalist deeply wary of concentrated power would see unlimited corporate political spending as creating exactly the kind of moneyed aristocracy the Revolution sought to escape. If a wealthy corporation can outspend thousands of ordinary citizens combined, the principle of one person, one voice in self-government is hollowed out -- replaced by one dollar, one voice."
    },
    constitutional: "Citizens United v. FEC (2010) held that the First Amendment protects political spending by corporations and unions as a form of speech, striking down restrictions on independent campaign expenditures. This remains one of the most contested rulings in modern constitutional law, dividing those who see it as protecting free speech and those who see it as enabling outsized influence by wealthy interests.",
    tags: ["1st Amendment", "Citizens United v. FEC", "Unit 5"],
    prompt: "Is political spending the same thing as political speech? Defend your position using reasoning from either side."
  },
  {
    id: "immigration-federalism", icon: "[FLAG]",
    title: "State Immigration Enforcement",
    question: "Can states pass their own immigration enforcement laws, or is immigration exclusively a federal responsibility?",
    federalist: {
      quote: "This Constitution, and the Laws of the United States... shall be the supreme Law of the Land; and the Judges in every State shall be bound thereby.",
      source: "Article VI, the Supremacy Clause",
      argument: "A Federalist would argue that immigration policy must be uniform nationally -- foreign relations and the treatment of non-citizens cannot vary state by state without creating chaos and undermining the federal government's exclusive constitutional authority over naturalization (Article I, Section 8) and foreign affairs. A patchwork of 50 different state immigration policies would be unworkable and would weaken the national government's ability to speak with one voice internationally."
    },
    antifederalist: {
      quote: "Each state retains its sovereignty, freedom, and independence, and every Power, Jurisdiction, and right, which is not by this confederation expressly delegated to the United States.",
      source: "Articles of Confederation, Art. II",
      argument: "An Anti-Federalist focused on state sovereignty would argue that states bear the direct, day-to-day consequences of immigration policy within their borders -- on schools, hospitals, and law enforcement -- and should have authority to respond as their citizens see fit when the federal government fails to act. State police powers, reserved by the Tenth Amendment, include protecting public health, safety, and welfare within state borders."
    },
    constitutional: "Article I, Section 8 gives Congress power over naturalization, suggesting federal supremacy in immigration policy. However, the Tenth Amendment reserves police powers to the states. Arizona v. United States (2012) addressed this directly -- the Supreme Court struck down several Arizona immigration enforcement provisions as preempted by federal law, reinforcing federal primacy while leaving some room for state cooperation.",
    tags: ["Article I §8", "10th Amendment", "Unit 1"],
    prompt: "Should states be allowed to enforce immigration law more strictly than the federal government if their citizens want it? Defend your position."
  }
];

// ════════════════════════════════════════════════════════════════
//  MADISON DEBATE ENGINE
// ════════════════════════════════════════════════════════════════
var madisonBuilt = false;
var madisonCurrentTopic = null;

function buildMadisonTab() {
  if (madisonBuilt) return;
  madisonBuilt = true;

  var grid = document.getElementById('madison-topic-grid');
  if (!grid) return;

  grid.innerHTML = MADISON_TOPICS.map(function(t) {
    return '<div class="madison-topic-card" data-id="' + t.id + '" onclick="madisonSelectTopic(\'' + t.id + '\', this)">' +
      '<span class="madison-topic-icon">' + t.icon + '</span>' +
      '<div class="madison-topic-title">' + t.title + '</div>' +
    '</div>';
  }).join('');

  // Auto-select first topic
  madisonSelectTopic(MADISON_TOPICS[0].id, grid.querySelector('.madison-topic-card'));
}

function madisonSelectTopic(id, cardEl) {
  var topic = MADISON_TOPICS.find(function(t) { return t.id === id; });
  if (!topic) return;
  madisonCurrentTopic = topic;

  document.querySelectorAll('.madison-topic-card').forEach(function(c) { c.classList.remove('active'); });
  if (cardEl) cardEl.classList.add('active');

  document.getElementById('madison-question-text').textContent = topic.question;

  document.getElementById('madison-fed-quote').textContent = '"' + topic.federalist.quote + '"';
  document.getElementById('madison-fed-source').textContent = '— ' + topic.federalist.source;
  document.getElementById('madison-fed-argument').textContent = topic.federalist.argument;

  document.getElementById('madison-anti-quote').textContent = '"' + topic.antifederalist.quote + '"';
  document.getElementById('madison-anti-source').textContent = '— ' + topic.antifederalist.source;
  document.getElementById('madison-anti-argument').textContent = topic.antifederalist.argument;

  document.getElementById('madison-const-text').textContent = topic.constitutional;
  document.getElementById('madison-const-tags').innerHTML = topic.tags.map(function(tag) {
    return '<span class="madison-const-tag">' + tag + '</span>';
  }).join('');

  document.getElementById('madison-prompt-text').textContent = topic.prompt;
  document.getElementById('madison-response-area').value = '';

  document.getElementById('madison-debate-area').classList.add('show');
  document.getElementById('madison-debate-area').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.querySelector('.nav-tab[data-tab="madison"]').addEventListener('click', function() {
  setTimeout(buildMadisonTab, 30);
});



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

