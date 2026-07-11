// ════════════════════════════════════════════════════
// data-skills.js — AP Gov Site: Foundations Skills Data
// CER Trainer, Vocabulary in Context content banks
// ════════════════════════════════════════════════════

var SKILLS_CER_LEVEL1 = {
  learnTitle: "FACT VS. OPINION",
  learnBig: "Every sentence is either a FACT or an OPINION.",
  learnSub: "A FACT can be proven true or false by looking it up. An OPINION is what someone believes, thinks, or feels — you can agree or disagree, but you can't prove it right or wrong.",
  goodExample: "Congress has 535 voting members.",
  goodLabel: "FACT — you can look this up and verify it",
  badExample: "Congress should have term limits.",
  badLabel: "OPINION — this is what someone believes should happen",
  signalWords: true,
  guidedExamples: [
    {
      sentence: "The Constitution was written in 1787.",
      answer: "fact",
      thinking: "Step 1: Can we look this up and check it? YES. Step 2: Is there a right or wrong answer? YES — it either happened in 1787 or it didn't. Step 3: Could two reasonable people disagree about whether this is true? NO. This is a FACT.",
      verdict: "FACT"
    },
    {
      sentence: "The President has too much power over foreign policy.",
      answer: "opinion",
      thinking: "Step 1: Can we look this up and check it? NO — 'too much' is a judgment call. Step 2: Watch for the signal word: TOO MUCH. That's an evaluation word. Step 3: Could two reasonable people disagree about this? ABSOLUTELY YES. Some people think the President needs that power, others don't. This is an OPINION.",
      verdict: "OPINION"
    },
    {
      sentence: "The Supreme Court has struck down over 180 federal laws as unconstitutional since 1789.",
      answer: "fact",
      thinking: "Step 1: This looks like it could be an opinion because it's a big claim. But LOOK CAREFULLY — it gives a specific number (180) and a specific timeframe (since 1789). Step 2: Can we check this? YES — court records exist. Step 3: The tricky part: just because something SURPRISES you doesn't make it an opinion. Facts can be surprising. This is a FACT.",
      verdict: "FACT"
    },
    {
      sentence: "The Founders were brilliant men who created the greatest system of government in history.",
      answer: "opinion",
      thinking: "Step 1: Watch for the signal words: BRILLIANT and GREATEST. Both are superlatives — words that make a judgment about how good something is. Step 2: Can we prove the Founders were 'brilliant'? No — brilliance is a judgment. Can we prove their system is 'greatest in history'? No — that's a comparison that depends entirely on values. This is an OPINION.",
      verdict: "OPINION"
    },
    {
      sentence: "In 2022, voter turnout in the midterm elections was approximately 47% of eligible voters.",
      answer: "fact",
      thinking: "Step 1: This gives a specific number (47%) for a specific event (2022 midterms). Step 2: Can we check this? YES — election data is public record. Step 3: Notice the word 'approximately' — that doesn't make it an opinion. Approximations are still facts as long as they can be verified. This is a FACT.",
      verdict: "FACT"
    }
  ],
  warning: {
    title: "WATCH OUT FOR THESE TRAPS",
    points: [
      "TRAP 1: A sentence that sounds confident is not automatically a fact. 'The Electoral College is clearly outdated' sounds sure of itself — but 'clearly' and 'outdated' are opinions.",
      "TRAP 2: A sentence with numbers is not automatically a fact. 'Most Americans think Congress is too slow' uses a number word ('most') but expresses an opinion about what Congress should do.",
      "TRAP 3: Historical facts are still facts even if they happened long ago. 'The Civil War ended in 1865' is a fact even though nobody alive witnessed it.",
      "TRAP 4: Something you personally agree with can still be an opinion. 'The government should provide healthcare to everyone' might feel true to you — but it\'s still an opinion others would disagree with."
    ]
  },
  applyIt: {
    intro: "You\'ve learned the skill. Now use it on a real paragraph. Below is a short paragraph about the First Amendment. Click each sentence, then tag it as FACT or OPINION. When you\'re done tagging all 7 sentences, click Check My Work.",
    sentences: [
      { text: "The First Amendment was ratified in 1791 as part of the Bill of Rights.", answer: "fact", explain: "This is a FACT — it\'s a specific historical date that can be verified." },
      { text: "It protects five fundamental freedoms: religion, speech, press, assembly, and petition.", answer: "fact", explain: "This is a FACT — the text of the First Amendment explicitly lists these five freedoms." },
      { text: "Freedom of speech is the most important right in the Constitution.", answer: "opinion", explain: "This is an OPINION — 'most important' is a judgment. Other people might argue due process or equal protection matters more." },
      { text: "In Tinker v. Des Moines (1969), the Supreme Court ruled that students do not shed their rights at the schoolhouse gate.", answer: "fact", explain: "This is a FACT — this is a specific legal ruling that can be verified in court records." },
      { text: "The Court should have given schools more authority to regulate student speech.", answer: "opinion", explain: "This is an OPINION — 'should have' is a clear signal word that this is a belief about what ought to have happened." },
      { text: "Today, courts continue to debate the limits of free speech in digital spaces.", answer: "fact", explain: "This is a FACT — court cases are public record and we can verify that digital speech cases are being litigated." },
      { text: "Social media companies have too much control over what Americans are allowed to say online.", answer: "opinion", explain: "This is an OPINION — 'too much control' is an evaluation. Whether this is true depends on values and political perspective." }
    ]
  },
  questions: [
    { text: "The President lives in the White House.", answer: "fact", explain: "FACT — you can verify where the President actually lives." },
    { text: "The President is doing a great job.", answer: "opinion", explain: "OPINION — \'great job\' is a judgment. People would disagree depending on their politics." },
    { text: "There are 50 states in the United States.", answer: "fact", explain: "FACT — you can count the states and verify this number." },
    { text: "Voting should be mandatory for all citizens.", answer: "opinion", explain: "OPINION — \'should be\' is a classic opinion signal word — this is what someone believes ought to happen." },
    { text: "The Supreme Court has 9 justices.", answer: "fact", explain: "FACT — this is a specific, checkable number established by federal law." },
    { text: "The Supreme Court makes too many controversial decisions.", answer: "opinion", explain: "OPINION — \'too many\' is a judgment. What counts as \'too many\' depends on who you ask." },
    { text: "Congress passed the Civil Rights Act in 1964.", answer: "fact", explain: "FACT — this is a historical event with a specific date that can be verified." },
    { text: "The Civil Rights Act was the most important law in American history.", answer: "opinion", explain: "OPINION — \'most important\' is a ranking based on values. Historians would disagree about this." },
    { text: "Each state has two U.S. Senators.", answer: "fact", explain: "FACT — this is written in the Constitution and can be verified." },
    { text: "Senators should serve shorter terms.", answer: "opinion", explain: "OPINION — \'should\' is always a signal that someone is stating a belief about what ought to happen." },
    { text: "The Declaration of Independence was signed in 1776.", answer: "fact", explain: "FACT — this is a specific historical date that can be checked." },
    { text: "The Founding Fathers were the wisest leaders in history.", answer: "opinion", explain: "OPINION — \'wisest\' is a superlative judgment that cannot be objectively proven." },
    { text: "The Bill of Rights contains the first ten amendments to the Constitution.", answer: "fact", explain: "FACT — you can count the amendments and verify this." },
    { text: "The Second Amendment is the most misunderstood amendment.", answer: "opinion", explain: "OPINION — \'most misunderstood\' is a judgment about how people interpret the amendment." },
    { text: "The United States has a two-party political system dominated by Democrats and Republicans.", answer: "fact", explain: "FACT — this is a verifiable description of the current political system." },
    { text: "Third parties should receive equal media coverage in elections.", answer: "opinion", explain: "OPINION — \'should receive\' signals a belief about what ought to happen, not a statement of fact." },
    { text: "Presidential elections occur every four years in the United States.", answer: "fact", explain: "FACT — this is established in the Constitution and can be verified." },
    { text: "The Electoral College system is unfair to voters in large states.", answer: "opinion", explain: "OPINION — \'unfair\' is a value judgment. Whether something is fair depends on your perspective and values." },
    { text: "In the 2020 presidential election, over 155 million Americans cast ballots.", answer: "fact", explain: "FACT — this is a specific, verifiable number from official election records." },
    { text: "Politicians care more about getting reelected than about helping their constituents.", answer: "opinion", explain: "OPINION — this is a generalization about motivations that cannot be objectively proven for all politicians." },
    { text: "The 26th Amendment lowered the voting age from 21 to 18.", answer: "fact", explain: "FACT — the text of the 26th Amendment (1971) can be read and verified." },
    { text: "Eighteen-year-olds are mature enough to vote responsibly.", answer: "opinion", explain: "OPINION — \'mature enough\' and \'responsibly\' are judgments. This is a claim about what ought to be, not a fact." },
    { text: "Congress is divided into the House of Representatives and the Senate.", answer: "fact", explain: "FACT — this is stated directly in Article I of the Constitution." },
    { text: "The House of Representatives is more responsive to citizens than the Senate.", answer: "opinion", explain: "OPINION — \'more responsive\' is a comparative judgment. This is a position people argue about, not a provable fact." },
    { text: "The United States Constitution is the oldest written national constitution still in use.", answer: "fact", explain: "FACT — this is a verifiable historical claim confirmed by constitutional scholars." }
  ]
};

var SKILLS_CER_LEVEL2 = {
  learnTitle: "CLAIM VS. EVIDENCE",
  learnBig: "A CLAIM is what someone argues. EVIDENCE is the proof that backs it up.",
  learnSub: "Think of a claim as the main point someone is trying to make. Evidence is the specific facts, numbers, or examples used to support that point.",
  goodExample: "Evidence: 'Voter turnout was only 38% in the last midterm election.'",
  goodLabel: "EVIDENCE — a specific, checkable fact used as proof",
  badExample: "Claim: 'Americans don't care enough about voting.'",
  badLabel: "CLAIM — the argument or point being made",
  guidedPassage: "Claim: \"The filibuster makes the Senate dysfunctional.\" Evidence: \"In 2022, over 90% of bills introduced in the Senate never received a floor vote.\"",
  guidedAnswer: "The first sentence is the CLAIM -- it's the argument being made about the filibuster. The second sentence is the EVIDENCE -- it's a specific, checkable statistic used to support that argument.",
  guidedExamples: [
    {
      sentence: "The Senate confirmation process for judges has become too partisan.",
      answer: "claim",
      thinking: "Step 1: Is this something we can look up and verify with a specific number or fact? NO -- \"too partisan\" is a judgment call. Step 2: This is the writer's argument about how the process HAS become, not a checkable statistic. Step 3: Could reasonable people disagree? YES -- some would say it's always been this way, others would disagree entirely. This is a CLAIM.",
      verdict: "CLAIM"
    },
    {
      sentence: "In the past decade, the average number of days between a judicial nomination and a Senate confirmation vote has more than doubled.",
      answer: "evidence",
      thinking: "Step 1: Does this give a specific, checkable data point? YES -- a measurable change over a specific time period. Step 2: This isn't an argument by itself -- it's a fact that could be used to SUPPORT an argument about judicial confirmations. Step 3: This is EVIDENCE.",
      verdict: "EVIDENCE"
    },
    {
      sentence: "Term limits for Supreme Court Justices would improve the Court's legitimacy.",
      answer: "claim",
      thinking: "Step 1: Can we prove this will happen? NO -- this is a prediction about a hypothetical outcome. Step 2: \"Would improve\" signals a stance the writer is taking, not a fact. Step 3: People strongly disagree about whether this is true. This is a CLAIM.",
      verdict: "CLAIM"
    },
    {
      sentence: "A 2023 Pew Research poll found that 66% of Americans support setting an 18-year term limit for Supreme Court Justices.",
      answer: "evidence",
      thinking: "Step 1: This gives a specific source (Pew Research), a specific year, and a specific percentage. Step 2: This is a checkable, citable data point -- not an argument by itself. Step 3: This is EVIDENCE that could support a claim about term limits.",
      verdict: "EVIDENCE"
    },
    {
      sentence: "Campaign finance laws fail to prevent wealthy donors from having outsized political influence.",
      answer: "claim",
      thinking: "Step 1: Is \"outsized influence\" something we can directly measure and prove on its own? NO -- it's an interpretation of how influence works. Step 2: This is the writer's argument about how the system fails. Step 3: This is a CLAIM, even though it could be supported by real numbers about campaign donations.",
      verdict: "CLAIM"
    }
  ],
  warning: {
    title: "WATCH OUT FOR THESE TRAPS",
    points: [
      "TRAP 1: A sentence with a number isn't automatically evidence. \"Nearly all Americans agree Congress is broken\" has a number word (\"nearly all\") but it's still a claim -- there's no specific, checkable statistic here.",
      "TRAP 2: Evidence doesn't have to come from a poll or study. A specific historical event, court ruling, or vote count can also be evidence, as long as it's a checkable fact rather than an argument.",
      "TRAP 3: A claim can still be true. Calling something a \"claim\" isn't saying it's wrong -- it just means it's the writer's argument, which requires evidence to support it, rather than being self-proving.",
      "TRAP 4: Watch for evidence hidden inside a claim. \"The clearly disastrous 2013 shutdown cost the economy billions\" mixes a real fact (the shutdown happened and had a cost) with a loaded claim word (\"disastrous\") -- read carefully to separate the two."
    ]
  },
  applyIt: {
    intro: "You've learned the skill. Now use it on a real paragraph. Below is a short paragraph about voter ID laws. Click each sentence, then tag it as CLAIM or EVIDENCE. When you're done tagging all 7 sentences, click Check My Work.",
    tagPositive: { value: "claim", label: "TAG AS CLAIM" },
    tagNegative: { value: "evidence", label: "TAG AS EVIDENCE" },
    sentences: [
      { text: "Voter ID laws make elections more secure.", answer: "claim", explain: "This is a CLAIM -- \"more secure\" is a judgment about the law's effect, not a specific checkable fact." },
      { text: "As of 2024, 36 states have laws requesting or requiring voters to show identification at the polls.", answer: "evidence", explain: "This is EVIDENCE -- a specific, checkable number of states." },
      { text: "A 2021 study by the Brennan Center found no evidence of widespread voter impersonation fraud in U.S. elections.", answer: "evidence", explain: "This is EVIDENCE -- a specific, citable study and finding." },
      { text: "Strict voter ID requirements disproportionately burden elderly, low-income, and minority voters.", answer: "claim", explain: "This is a CLAIM -- it's an argument about who is affected and how, which would need evidence to support it." },
      { text: "In Texas, a 2016 federal court ruling found the state's voter ID law had a discriminatory effect on Black and Latino voters.", answer: "evidence", explain: "This is EVIDENCE -- a specific, checkable court ruling." },
      { text: "States should be allowed to set their own election security standards without federal interference.", answer: "claim", explain: "This is a CLAIM -- \"should be allowed\" signals a position on federalism, not a provable fact." },
      { text: "Every democracy needs some baseline of trust in its election system to function.", answer: "claim", explain: "This is a CLAIM -- it's a general assertion about what democracies need, not a specific checkable fact." }
    ]
  },
  questions: [
    { text: "\"Social media has too much influence on elections.\"", answer: "claim", explain: "This is a CLAIM -- it's an argument or position being put forward, not a specific proof." },
    { text: "\"In the 2020 election, campaigns spent over $1 billion on social media ads.\"", answer: "evidence", explain: "This is EVIDENCE -- it's a specific, checkable statistic that could be used to support a claim." },
    { text: "\"The Electoral College should be abolished.\"", answer: "claim", explain: "This is a CLAIM -- it's an argument about what should happen, not proof of anything." },
    { text: "\"In 2000 and 2016, the winner of the popular vote lost the presidency.\"", answer: "evidence", explain: "This is EVIDENCE -- these are specific historical facts that could support an argument about the Electoral College." },
    { text: "\"Gerrymandering undermines fair representation.\"", answer: "claim", explain: "This is a CLAIM -- it's the writer's argument or position." },
    { text: "\"In North Carolina's 2016 map, Republicans won 10 of 13 seats despite winning only 53% of the statewide vote.\"", answer: "evidence", explain: "This is EVIDENCE -- it's a specific, checkable example that supports a claim about gerrymandering." },
    { text: "\"The Supreme Court has become too political.\"", answer: "claim", explain: "This is a CLAIM -- 'too political' is the writer's argument." },
    { text: "\"A 2023 poll found that 58% of Americans believe the Court is influenced by politics rather than law.\"", answer: "evidence", explain: "This is EVIDENCE -- it's a specific, citable data point." },
    { text: "\"Lobbying gives wealthy interest groups outsized power in Congress.\"", answer: "claim", explain: "This is a CLAIM -- it's the argument being made about lobbying's effect." },
    { text: "\"In 2022, over $4 billion was spent on federal lobbying.\"", answer: "evidence", explain: "This is EVIDENCE -- it's a specific, checkable dollar figure." },
    { text: "\"The Senate filibuster protects minority party interests.\"", answer: "claim", explain: "This is a CLAIM -- 'protects' and 'interests' reflect the writer's interpretation, not a provable fact." },
    { text: "\"In 2021, a bill with 50 votes in favor still failed to pass because it needed 60 to overcome a filibuster.\"", answer: "evidence", explain: "This is EVIDENCE -- a specific, checkable vote count and procedural outcome." },
    { text: "\"Presidential debates favor candidates with more media experience.\"", answer: "claim", explain: "This is a CLAIM -- 'favor' is an interpretation of how debates function, not a specific checkable fact." },
    { text: "\"The 2020 presidential debates drew over 73 million television viewers for the first debate alone.\"", answer: "evidence", explain: "This is EVIDENCE -- a specific, checkable viewership number." },
    { text: "\"The Freedom of Information Act allows citizens too much access to sensitive government records.\"", answer: "claim", explain: "This is a CLAIM -- 'too much access' is a judgment about the law's scope." },
    { text: "\"Since 1967, the Freedom of Information Act has required federal agencies to disclose records upon request, with some exceptions.\"", answer: "evidence", explain: "This is EVIDENCE -- a specific, checkable description of what the law requires." },
    { text: "\"Third-party candidates have no realistic chance of winning the presidency.\"", answer: "claim", explain: "This is a CLAIM -- 'no realistic chance' is a prediction and judgment, not a provable fact by itself." },
    { text: "\"No third-party or independent candidate has won a presidential election since the Republican Party's founding in 1854.\"", answer: "evidence", explain: "This is EVIDENCE -- a specific, checkable historical fact." },
    { text: "\"Political action committees exert too much control over congressional voting.\"", answer: "claim", explain: "This is a CLAIM -- 'too much control' is a judgment about influence, not a specific measurement." },
    { text: "\"In the 2022 election cycle, PACs contributed more than $500 million to congressional candidates.\"", answer: "evidence", explain: "This is EVIDENCE -- a specific, checkable dollar figure." },
    { text: "\"Term limits for members of Congress would reduce corruption.\"", answer: "claim", explain: "This is a CLAIM -- it's a prediction about a hypothetical policy's effect." },
    { text: "\"Currently, there are no federal term limits for members of the House or Senate.\"", answer: "evidence", explain: "This is EVIDENCE -- a specific, checkable fact about current law." },
    { text: "\"The Senate's structure gives disproportionate power to small states.\"", answer: "claim", explain: "This is a CLAIM -- 'disproportionate' is an interpretation, even though it's based on real numbers." },
    { text: "\"Wyoming, with about 580,000 residents, has the same number of senators as California, with about 39 million residents.\"", answer: "evidence", explain: "This is EVIDENCE -- specific, checkable population and representation figures." },
    { text: "\"Federal judges should be elected rather than appointed.\"", answer: "claim", explain: "This is a CLAIM -- 'should be' always signals an argument about what ought to happen, not a fact." }
  ]
};

var SKILLS_CER_LEVEL3 = {
  learnTitle: "CLAIM, EVIDENCE & REASONING",
  learnBig: "REASONING is the bridge that connects your evidence to your claim.",
  learnSub: "It's not enough to state a claim and drop in a fact -- you have to explain WHY that evidence proves your point. Reasoning answers the question: 'So what? Why does this evidence matter?'",
  goodExample: "\"This shows that low turnout weakens the legitimacy of elected officials, because leaders who are chosen by a small fraction of the population don't truly represent the will of the people.\"",
  goodLabel: "REASONING — explains WHY the evidence supports the claim",
  badExample: "\"Voter turnout was 38%. This is a problem.\"",
  badLabel: "MISSING REASONING — no explanation of WHY 38% matters or proves anything",
  guidedPassage: "Claim: \"The Senate filibuster gives the minority party too much power.\" Evidence: \"In 2021, a bill with 59 votes still failed to pass because it needed 60 to overcome a filibuster.\" Reasoning: \"This shows that even when a clear majority of senators support a bill, a smaller minority can block it entirely -- meaning the will of most senators, and the constituents they represent, can be overridden by a small group.\"",
  guidedAnswer: "Notice how the REASONING doesn't just repeat the evidence -- it explains the broader significance. It connects the specific fact (59 votes still failing) back to the claim (the filibuster gives too much power to the minority) by explaining the mechanism: a majority's will being blocked by a minority.",
  guidedExamples: [
    {
      sentence: "Claim: \"Voter ID laws reduce voter turnout.\" Evidence: \"A 2014 study found that strict photo ID laws reduced turnout by about 2 percentage points among registered voters in affected states.\" Reasoning: \"This shows that even a small percentage drop can be significant, because it demonstrates that ID laws create a real, measurable barrier to voting for some registered voters, particularly affecting close elections where a small number of votes decides the outcome.\"",
      answer: "strong",
      thinking: "Step 1: Does the reasoning just restate the evidence, or does it explain WHY the 2-point drop matters? It explains why -- connecting a small percentage to real-world consequences in close elections. Step 2: Does it explain the mechanism connecting evidence to claim? YES -- it shows HOW a small barrier translates into a real problem. This is STRONG REASONING.",
      verdict: "STRONG REASONING"
    },
    {
      sentence: "Claim: \"The Electoral College distorts presidential campaigns.\" Evidence: \"In 2020, presidential candidates held the vast majority of campaign events in fewer than 10 'swing states.'\" Reasoning: \"This is bad because campaigns should be fair.\"",
      answer: "weak",
      thinking: "Step 1: Does the reasoning explain WHY concentrating events in swing states connects to 'distorting' campaigns? NO -- it just asserts a value judgment ('should be fair') without explaining the mechanism. Step 2: A strong version would explain HOW ignoring most states changes what issues get discussed or which voters get attention. This is WEAK REASONING -- it repeats an opinion instead of connecting evidence to claim.",
      verdict: "WEAK REASONING"
    },
    {
      sentence: "Claim: \"Judicial review gives the Supreme Court significant power over policy.\" Evidence: \"In Brown v. Board of Education (1954), the Court struck down state laws requiring school segregation, overturning decades of precedent.\" Reasoning: \"This shows that the Court's power to declare state laws unconstitutional means unelected justices, not elected legislatures, can reverse long-standing policy across the entire country -- illustrating why judicial review is considered one of the most powerful checks in the constitutional system.\"",
      answer: "strong",
      thinking: "Step 1: Does the reasoning explain WHY Brown matters for the claim about judicial power? YES -- it connects the specific case to the broader mechanism of unelected justices overturning policy nationwide. Step 2: Does it go beyond just restating the evidence? YES -- it draws out the significance. This is STRONG REASONING.",
      verdict: "STRONG REASONING"
    },
    {
      sentence: "Claim: \"Interest groups play an important role in American politics.\" Evidence: \"The NRA and the Sierra Club are both examples of interest groups.\" Reasoning: \"These groups show that interest groups exist in American politics.\"",
      answer: "weak",
      thinking: "Step 1: Does the reasoning explain WHY these groups matter, or just restate that they exist? It just restates existence -- it never explains WHAT interest groups actually do or why that role is 'important.' Step 2: A strong version would explain a specific function, like lobbying, mobilizing voters, or shaping legislation. This is WEAK REASONING -- it circles back to the claim without adding any new insight.",
      verdict: "WEAK REASONING"
    },
    {
      sentence: "Claim: \"Divided government makes passing major legislation more difficult.\" Evidence: \"During the 113th Congress (2013-2015), with a Democratic Senate and Republican House, fewer than 300 bills became law -- one of the lowest totals in decades.\" Reasoning: \"This shows that when control of Congress is split between parties, each chamber can block the other's priorities, making it harder to reach the compromises needed for a bill to pass both chambers and reach the president's desk.\"",
      answer: "strong",
      thinking: "Step 1: Does the reasoning explain the mechanism connecting divided government to fewer laws? YES -- it explains HOW split control creates blocking power. Step 2: Does it go beyond simply repeating the low bill count? YES -- it explains why that number would be expected under these conditions. This is STRONG REASONING.",
      verdict: "STRONG REASONING"
    }
  ],
  warning: {
    title: "WATCH OUT FOR THESE TRAPS",
    points: [
      "TRAP 1: Reasoning that just repeats the evidence in different words isn't real reasoning. \"Spending rose to $600 million, which is a lot of money\" doesn't explain WHY that increase matters -- it just restates the number with a value judgment attached.",
      "TRAP 2: Reasoning that only states an opinion, without connecting it to the specific evidence, is weak. \"This is unfair\" or \"this is a problem\" doesn't explain the mechanism linking the evidence to the claim.",
      "TRAP 3: Longer isn't automatically stronger. A short sentence that clearly explains the connection between evidence and claim beats a long sentence full of extra detail that never actually explains why the evidence matters.",
      "TRAP 4: Strong reasoning usually answers \"so what?\" or \"how do we know?\" If you can ask \"so what?\" after reading the reasoning and it doesn't already answer that question, the reasoning isn't finished yet."
    ]
  },
  applyIt: {
    intro: "You've learned to tell strong reasoning from weak reasoning. Now apply it to several real examples. Each item below is a complete claim-evidence-reasoning argument. Click each one, then tag it as STRONG REASONING or WEAK REASONING based on whether the reasoning actually explains WHY the evidence supports the claim.",
    tagPositive: { value: "strong", label: "STRONG REASONING" },
    tagNegative: { value: "weak", label: "WEAK REASONING" },
    sentences: [
      { text: "Claim: \"Congressional oversight serves as an important check on the executive branch.\" Evidence: \"In 2019, the House Intelligence Committee subpoenaed White House officials as part of an investigation into executive actions.\" Reasoning: \"This shows that Congress can compel executive branch officials to provide information and testimony even when the President objects, demonstrating that legislative oversight can operate independently of executive cooperation.\"", answer: "strong", explain: "STRONG -- the reasoning explains the mechanism (compelling testimony despite objection) and connects it directly to the broader claim about oversight as an independent check." },
      { text: "Claim: \"Political polarization has increased in recent decades.\" Evidence: \"A 2022 Pew Research study found that the ideological gap between Democrats and Republicans has widened significantly since the 1990s.\" Reasoning: \"This proves that Americans are more divided than ever before.\"", answer: "weak", explain: "WEAK -- the reasoning overstates the evidence ('more divided than ever before' isn't what the study measured) rather than explaining the specific mechanism connecting a widening ideological gap to the claim." },
      { text: "Claim: \"The 24-hour news cycle has changed how presidents communicate with the public.\" Evidence: \"Modern presidents post directly to social media platforms multiple times per day, bypassing traditional press briefings.\" Reasoning: \"This shows that presidents can now shape public opinion in real time without relying on journalists to filter or contextualize their message, changing the relationship between the executive branch and the public.\"", answer: "strong", explain: "STRONG -- the reasoning explains exactly how bypassing journalists changes the presidential-public relationship, directly connecting evidence to claim." },
      { text: "Claim: \"Federalism creates policy differences between states.\" Evidence: \"Minimum wage requirements vary significantly from state to state.\" Reasoning: \"This is a good example of federalism.\"", answer: "weak", explain: "WEAK -- the reasoning just labels the evidence as an example of the claim without explaining WHY minimum wage variation is a meaningful consequence of federalism." },
      { text: "Claim: \"Political action committees influence which candidates receive media attention.\" Evidence: \"Candidates backed by well-funded PACs received significantly more television advertising airtime in the 2022 midterms than candidates without major PAC support.\" Reasoning: \"This shows that financial backing can shape voter exposure to a candidate before votes are even cast, meaning PAC support may influence elections by controlling visibility rather than persuading voters directly on the merits.\"", answer: "strong", explain: "STRONG -- the reasoning explains the specific mechanism (controlling visibility, not persuasion) connecting PAC funding to electoral influence." },
      { text: "Claim: \"Supreme Court confirmation hearings have become more contentious.\" Evidence: \"Recent confirmation votes have been closer along party lines than confirmation votes several decades ago.\" Reasoning: \"This shows that hearings are contentious now.\"", answer: "weak", explain: "WEAK -- the reasoning just restates the claim in slightly different words instead of explaining what closer party-line votes actually reveal about WHY hearings have grown contentious." }
    ]
  },
  questions: [
    {
      text: "Claim: \"Citizens United increased the influence of money in politics.\" Evidence: \"Following the 2010 ruling, Super PAC spending rose from $0 to over $600 million in the next election cycle.\" Which sentence below is the BEST reasoning connecting this evidence to the claim?",
      choices: [
        "This shows that Super PACs are now allowed to spend unlimited money, meaning groups with the most money can have a far greater voice in elections than ordinary citizens.",
        "Super PACs are a type of political organization that emerged after a major court case."
      ],
      answer: 0,
      explain: "The first option explains WHY the dramatic spending increase matters -- it connects the evidence (the spending jump) to the claim (increased influence of money) by explaining the mechanism (unequal voice based on wealth). The second option just restates background facts without connecting them to the claim."
    },
    {
      text: "Claim: \"Gerrymandering reduces electoral competition.\" Evidence: \"In the 2022 midterms, over 80% of House races were decided by more than 10 percentage points.\" Which sentence is the BEST reasoning?",
      choices: [
        "House races happen every two years for all 435 seats.",
        "This shows that most districts have been drawn to heavily favor one party, meaning the outcome is often decided before voters even go to the polls, reducing meaningful competition."
      ],
      answer: 1,
      explain: "The second option explains the significance of the 80% statistic -- it connects district-drawing to predetermined outcomes, directly supporting the claim about reduced competition. The first option is just unrelated background information."
    },
    {
      text: "Claim: \"Selective incorporation has expanded individual rights over time.\" Evidence: \"Cases like Gideon v. Wainwright (1963) and McDonald v. Chicago (2010) applied Bill of Rights protections to state governments.\" Which sentence is the BEST reasoning?",
      choices: [
        "This shows that rights which once only restricted the federal government now also apply to state and local governments, meaning individuals have stronger legal protections no matter where in the country they live.",
        "The Bill of Rights contains the first ten amendments to the Constitution."
      ],
      answer: 0,
      explain: "The first option explains the broader significance of these cases -- expanding protections to state governments -- connecting it directly to the claim about expanded rights. The second is just a definition, not reasoning."
    },
    {
      text: "Claim: \"Political polarization has made congressional compromise more difficult.\" Evidence: \"Bipartisan votes on major legislation dropped from common in the 1990s to rare by the 2020s.\" Which sentence is the BEST reasoning?",
      choices: [
        "Congress is made up of the House of Representatives and the Senate.",
        "This shows that members of each party have become less willing to work across the aisle, meaning fewer policies can gain the broad support needed to pass and remain stable over time."
      ],
      answer: 1,
      explain: "The second option explains WHY the drop in bipartisan votes matters -- it connects the trend to reduced willingness to compromise, directly supporting the claim. The first is just a structural fact about Congress."
    },
    {
      text: "Claim: \"The 22nd Amendment limits presidential power.\" Evidence: \"Since its ratification in 1951, no president has served more than two elected terms.\" Which sentence is the BEST reasoning?",
      choices: [
        "This shows that the constitutional limit has been consistently followed since its adoption, demonstrating that presidents are bound by a fixed structural check on how long they can hold executive power, regardless of popularity.",
        "The 22nd Amendment was ratified after World War II."
      ],
      answer: 0,
      explain: "The first option explains WHY the historical pattern matters -- it connects consistent compliance to the broader claim about structural limits on power. The second is just a date, unrelated to the argument."
    },
    {
      text: "Claim: \"Media consolidation limits the diversity of viewpoints Americans encounter.\" Evidence: \"By 2020, a small number of media conglomerates owned the majority of major television, radio, and newspaper outlets in the United States.\" Which sentence is the BEST reasoning?",
      choices: [
        "Television, radio, and newspapers are all types of media.",
        "This shows that a small number of corporate decision-makers can influence what stories reach large portions of the public, meaning fewer independent editorial perspectives shape the news Americans see across different outlets."
      ],
      answer: 1,
      explain: "The second option explains the mechanism -- how ownership concentration translates into fewer independent perspectives -- directly supporting the claim. The first is just a definition."
    },
    {
      text: "Claim: \"Amicus curiae briefs allow outside groups to influence Supreme Court decisions.\" Evidence: \"In major cases like Obergefell v. Hodges, dozens of interest groups filed amicus briefs presenting arguments and research to the Court.\" Which sentence is the BEST reasoning?",
      choices: [
        "This shows that groups without formal standing in a case can still shape the information and arguments justices consider, giving organized interests a channel to influence the Court's reasoning even though they aren't parties to the lawsuit.",
        "Obergefell v. Hodges was decided by the Supreme Court."
      ],
      answer: 0,
      explain: "The first option explains HOW amicus briefs create influence -- by shaping the information justices see -- directly connecting the evidence to the claim. The second just restates that a case exists."
    },
    {
      text: "Claim: \"Divided government leads to increased use of executive orders.\" Evidence: \"Presidents facing a Congress controlled by the opposing party have issued executive orders at higher rates than presidents with unified control.\" Which sentence is the BEST reasoning?",
      choices: [
        "Executive orders are directives issued by the President.",
        "This shows that when presidents cannot get legislation through an opposing Congress, they turn to unilateral executive action instead, using orders as a workaround for legislative gridlock rather than working through the normal lawmaking process."
      ],
      answer: 1,
      explain: "The second option explains the mechanism connecting divided government to more executive orders -- presidents substituting unilateral action for blocked legislation. The first is just a definition."
    },
    {
      text: "Claim: \"Increased early voting has made voting more accessible.\" Evidence: \"In the 2020 election, over 100 million ballots were cast before Election Day, a record high.\" Which sentence is the BEST reasoning?",
      choices: [
        "This shows that expanding the time window to vote allowed a historic number of Americans to cast ballots on a schedule that worked for them, rather than being limited to a single day, suggesting that flexibility increases participation.",
        "Election Day occurs in November."
      ],
      answer: 0,
      explain: "The first option explains WHY the record turnout matters -- connecting flexible timing to increased participation. The second is unrelated background information."
    },
    {
      text: "Claim: \"Congressional committees play a powerful role in shaping legislation.\" Evidence: \"The vast majority of bills introduced in Congress never make it out of committee.\" Which sentence is the BEST reasoning?",
      choices: [
        "Congress has many different committees.",
        "This shows that committees act as gatekeepers who can prevent a bill from ever reaching a floor vote, meaning a small group of committee members can effectively kill legislation that never gets a chance to be debated or voted on by the full chamber."
      ],
      answer: 1,
      explain: "The second option explains the gatekeeping mechanism -- how committees block bills from advancing -- directly supporting the claim about committee power. The first is just a generic fact."
    },
    {
      text: "Claim: \"Social media has changed how political campaigns reach voters.\" Evidence: \"Campaign spending on digital and social media advertising has grown substantially in every election cycle since 2008.\" Which sentence is the BEST reasoning?",
      choices: [
        "This shows that campaigns are increasingly investing resources in reaching voters directly through platforms they already use daily, rather than relying solely on television or print media, changing how and where political messaging reaches the public.",
        "Social media includes platforms like Facebook, Twitter, and Instagram."
      ],
      answer: 0,
      explain: "The first option connects the spending trend to a broader shift in campaign strategy, explaining why the growth matters. The second is just a definition of social media."
    },
    {
      text: "Claim: \"The bureaucracy has significant discretion in how it implements federal law.\" Evidence: \"Congress often passes laws using broad language, leaving federal agencies to write detailed regulations that determine how the law actually works in practice.\" Which sentence is the BEST reasoning?",
      choices: [
        "Federal agencies are part of the executive branch.",
        "This shows that Congress frequently delegates the specific details of policy to unelected agency officials, meaning the bureaucracy effectively shapes how laws function even though agencies were not the ones who voted the law into existence."
      ],
      answer: 1,
      explain: "The second option explains the delegation mechanism -- how broad congressional language becomes specific bureaucratic rules -- directly supporting the claim about bureaucratic discretion. The first is just a structural fact."
    }
  ]
};


// ════════════════════════════════════════════════════════════════
//  SKILL BUILDERS — ACADEMIC VOCABULARY IN CONTEXT
// ════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// VOCAB LEVEL 0 — true floor level. Everyday words (not academic
// government terms), short simple sentences, obvious context clues.
// This exists because a meaningful share of students arrive reading
// below grade level -- this level isolates the raw "use the sentence
// around a word to guess its meaning" skill before Level 1 asks them
// to do that with harder academic vocabulary. This is positioned
// FIRST in the levels array (see SKILLS_ACTIVITY_DATA below), so it
// displays as "LEVEL 1" in the UI -- the variable name stays
// SKILLS_VOCAB_LEVEL0 for clarity in this file, but everything that
// used to be "Level 1/2/3" is now displayed one number higher.
// ══════════════════════════════════════════════════════════════
var SKILLS_VOCAB_LEVEL0 = {
  learnTitle: "USING CLUES IN A SENTENCE",
  learnBig: "You don't have to know every word. The sentence around it can tell you.",
  learnSub: "When you see a word you don't know, don't stop reading. Look at the words right before and after it — they almost always give you a hint about what it means. This is the very first step to becoming a stronger reader.",
  goodExample: "The dog was LOYAL, always staying by her owner's side and never running away.",
  goodLabel: "CONTEXT CLUE: 'always staying by her owner's side and never running away' tells you LOYAL means faithful and devoted",
  badExample: "The dog was LOYAL.",
  badLabel: "NO CONTEXT: without more of the sentence, you'd have to guess what LOYAL means",
  guidedPassage: "The mayor wanted to IMPROVE the park, so she added new benches, fresh paint, and bright new lights.",
  guidedAnswer: "Look at what comes after IMPROVE: 'added new benches, fresh paint, and bright new lights.' These are all good changes that make the park nicer. IMPROVE means to make something better.",
  questions: [
    {
      text: "The class picked a LEADER, and everyone listened to her and followed her directions.",
      word: "LEADER",
      choices: ["a person who guides others", "a person who hides", "a person who is late", "a person who watches TV"],
      answer: 0,
      explain: "The clue is 'everyone listened to her and followed her directions' — a LEADER is a person who guides or is in charge of others."
    },
    {
      text: "The teacher was FAIR, giving every student the same amount of time to answer.",
      word: "FAIR",
      choices: ["unfair", "equal and just", "angry", "slow"],
      answer: 1,
      explain: "The clue is 'giving every student the same amount' — FAIR means equal and just treatment for everyone."
    },
    {
      text: "The guard's job was to PROTECT the building, keeping it safe from anyone who wanted to break in.",
      word: "PROTECT",
      choices: ["keep safe", "destroy", "paint", "sell"],
      answer: 0,
      explain: "The clue is 'keeping it safe from anyone who wanted to break in' — PROTECT means to keep something or someone safe."
    },
    {
      text: "The park is PUBLIC, so anyone in the city is allowed to visit and use it.",
      word: "PUBLIC",
      choices: ["private and locked", "open to everyone", "very expensive", "closed forever"],
      answer: 1,
      explain: "The clue is 'anyone in the city is allowed to visit' — PUBLIC means open and available to everyone, not just a few people."
    },
    {
      text: "Taking out the trash was Jake's DUTY, a job he had to do every single week.",
      word: "DUTY",
      choices: ["a job you must do", "a fun game", "a vacation", "a type of food"],
      answer: 0,
      explain: "The clue is 'a job he had to do' — a DUTY is a responsibility or task someone is required to do."
    },
    {
      text: "Both friends AGREE about the movie — they both think it was the best one this year.",
      word: "AGREE",
      choices: ["disagree", "have the same opinion", "forget", "argue"],
      answer: 1,
      explain: "The clue is 'they both think it was the best' — to AGREE means to share the same opinion as someone else."
    },
    {
      text: "After the cage door opened, the bird had FREEDOM to fly wherever it wanted.",
      word: "FREEDOM",
      choices: ["being trapped", "being tired", "the ability to act without being controlled", "being hungry"],
      answer: 2,
      explain: "The clue is 'fly wherever it wanted' — FREEDOM means being able to act, move, or choose without being controlled by something else."
    },
    {
      text: "As a CITIZEN of the town, Maria was allowed to vote in the local election.",
      word: "CITIZEN",
      choices: ["a visitor passing through", "an official member of a place who has rights there", "a stranger", "a store"],
      answer: 1,
      explain: "The clue is 'allowed to vote in the local election' — a CITIZEN is an official member of a country or place who has rights there, like voting."
    },
    {
      text: "The king had so much POWER that he could make new laws all by himself.",
      word: "POWER",
      choices: ["weakness", "the ability to control or decide things", "sadness", "a small amount of money"],
      answer: 1,
      explain: "The clue is 'could make new laws all by himself' — POWER is the ability to control or decide what happens."
    },
    {
      text: "The GROUP of five students worked together on the same project.",
      word: "GROUP",
      choices: ["a single person alone", "a number of people together", "an empty room", "a type of food"],
      answer: 1,
      explain: "The clue is 'five students worked together' — a GROUP is a number of people or things gathered together."
    }
  ],
  applyIt: {
    intro: "Now try it yourself. Below are sentences using the words you just practiced. Click a sentence, then tag it as USED CORRECTLY or USED INCORRECTLY based on whether the word actually fits what the sentence describes.",
    tagPositive: { value: "correct", label: "USED CORRECTLY" },
    tagNegative: { value: "incorrect", label: "USED INCORRECTLY" },
    sentences: [
      { text: "The LEADER of the team sat silently in the back and let everyone else make all the decisions.", answer: "incorrect", explain: "USED INCORRECTLY — a LEADER guides and directs others. Sitting silently and letting everyone else decide is the opposite of leading." },
      { text: "The rules were FAIR because every player got the exact same number of turns.", answer: "correct", explain: "USED CORRECTLY — 'the exact same number of turns' is exactly what fair means: equal treatment for everyone." },
      { text: "The lifeguard's job was to PROTECT swimmers by watching the water and helping anyone in danger.", answer: "correct", explain: "USED CORRECTLY — 'watching the water and helping anyone in danger' is exactly what it means to protect someone." },
      { text: "The library is PUBLIC, but only three specific families are allowed to enter it.", answer: "incorrect", explain: "USED INCORRECTLY — PUBLIC means open to everyone. Only allowing three specific families in is the opposite of public." },
      { text: "Watering the plants every morning was Sam's DUTY, a job he did faithfully every single day.", answer: "correct", explain: "USED CORRECTLY — a task someone does faithfully because it's required is exactly what a duty is." },
      { text: "The two sisters could not AGREE on anything, arguing about every small decision.", answer: "incorrect", explain: "USED INCORRECTLY — AGREE means to share the same opinion. Arguing about everything is the opposite of agreeing." }
    ]
  }
};

var SKILLS_VOCAB_LEVEL1 = {
  learnTitle: "READING CONTEXT CLUES",
  learnBig: "You don't need a dictionary. The sentence tells you.",
  learnSub: "When you hit a word you don't know, don't skip it — look at the words around it. The rest of the sentence almost always gives you a clue about what the unknown word means. This skill works for every class, every test, for the rest of your life.",
  goodExample: "The senator tried to OPPOSE the bill, voting against it and urging others to reject it.",
  goodLabel: "CONTEXT CLUE: 'voting against it' tells you OPPOSE means to be against something",
  badExample: "The senator tried to OPPOSE the bill.",
  badLabel: "NO CONTEXT: without more information, you'd have to guess",
  guidedPassage: "The President tried to ASSERT his authority by reminding Congress that the Constitution gave the executive branch power to conduct foreign policy.",
  guidedAnswer: "Look at what comes after ASSERT: 'reminding Congress that the Constitution gave him power.' He is making a strong statement — claiming something is true. ASSERT means to state something firmly or declare something confidently.",
  questions: [
    {
      text: "The new law was designed to RESTRICT access to certain weapons, making it harder for people to obtain them.",
      word: "RESTRICT",
      choices: ["make easier", "limit or reduce", "promote", "ignore"],
      answer: 1,
      explain: "The clue is 'making it harder for people to obtain them' — that tells you RESTRICT means to limit or reduce access."
    },
    {
      text: "Congress voted to ABOLISH the outdated regulation, ending it completely after decades of debate.",
      word: "ABOLISH",
      choices: ["create", "modify slightly", "end completely", "study"],
      answer: 2,
      explain: "The clue is 'ending it completely' — ABOLISH means to officially end or get rid of something."
    },
    {
      text: "The governor chose to VETO the bill, refusing to sign it into law and sending it back to the legislature.",
      word: "VETO",
      choices: ["support enthusiastically", "study carefully", "refuse to approve", "rewrite completely"],
      answer: 2,
      explain: "The clue is 'refusing to sign it into law and sending it back' — a VETO is when an executive rejects a bill passed by the legislature."
    },
    {
      text: "Many citizens choose to ABSTAIN from voting, neither supporting nor opposing any candidate.",
      word: "ABSTAIN",
      choices: ["vote enthusiastically", "choose not to participate", "campaign for a candidate", "protest loudly"],
      answer: 1,
      explain: "The clue is 'neither supporting nor opposing' — to ABSTAIN means to deliberately choose not to participate."
    },
    {
      text: "The two senators decided to COMPROMISE, with each side giving up something they wanted in order to reach an agreement.",
      word: "COMPROMISE",
      choices: ["fight until one side wins", "give up completely", "reach agreement by both sides giving something up", "ignore the disagreement"],
      answer: 2,
      explain: "The clue is 'each side giving up something they wanted in order to reach an agreement' — that IS the definition of COMPROMISE."
    },
    {
      text: "The court ruled the search was ILLEGAL because police had no warrant, meaning the evidence could not be used.",
      word: "ILLEGAL",
      choices: ["against the law", "very surprising", "carefully planned", "widely supported"],
      answer: 0,
      explain: "The clue is 'police had no warrant' and 'evidence could not be used' — ILLEGAL means against the law."
    },
    {
      text: "The amendment was RATIFIED when three-fourths of the states voted to approve it, making it officially part of the Constitution.",
      word: "RATIFIED",
      choices: ["rejected by the states", "formally approved", "argued about for years", "written by Congress"],
      answer: 1,
      explain: "The clue is 'voted to approve it, making it officially part of the Constitution' — RATIFIED means formally approved."
    },
    {
      text: "The senator was known for being BIPARTISAN, regularly working with members of the other party to pass legislation.",
      word: "BIPARTISAN",
      choices: ["extremely aggressive", "involving only one party", "involving both political parties", "very popular"],
      answer: 2,
      explain: "The clue is 'working with members of the other party' — BIPARTISAN means involving both political parties."
    },
    {
      text: "The law was CONTROVERSIAL — supporters praised it as necessary reform while opponents called it dangerous overreach.",
      word: "CONTROVERSIAL",
      choices: ["widely popular", "causing strong disagreement", "very expensive", "quickly forgotten"],
      answer: 1,
      explain: "The clue is the dash followed by 'supporters praised it... while opponents called it' — when a topic has strong arguments on both sides, it's CONTROVERSIAL."
    },
    {
      text: "The President tried to PERSUADE Congress by giving a speech laying out all the reasons why his proposal was the best option.",
      word: "PERSUADE",
      choices: ["threaten", "confuse", "convince someone to agree", "ignore"],
      answer: 2,
      explain: "The clue is 'laying out all the reasons why' — when you try to get someone to agree with you by giving reasons, you are trying to PERSUADE them."
    },
    {
      text: "The judge found the law to be UNCONSTITUTIONAL, ruling that it violated rights protected in the Constitution.",
      word: "UNCONSTITUTIONAL",
      choices: ["very popular", "against the Constitution", "supported by most states", "expensive to enforce"],
      answer: 1,
      explain: "The clue is 'violated rights protected in the Constitution' — UNCONSTITUTIONAL means going against what the Constitution allows."
    },
    {
      text: "After the scandal, the politician's reputation was severely DAMAGED, and many former supporters chose to ABANDON him.",
      word: "ABANDON",
      choices: ["support more strongly", "study carefully", "leave or give up on", "publicly defend"],
      answer: 2,
      explain: "The clue is 'former supporters' — they used to support him but no longer do. To ABANDON means to leave or give up on someone or something."
    },
    {
      text: "The Constitution DELEGATES specific powers to Congress, such as the power to declare war and collect taxes.",
      word: "DELEGATES",
      choices: ["removes", "assigns or gives authority to", "argues against", "hides"],
      answer: 1,
      explain: "The clue is 'specific powers to Congress' followed by examples of those powers — to DELEGATE means to officially assign or give authority or responsibility to someone."
    },
    {
      text: "The candidate promised to REFORM the tax system, arguing that the current system was unfair and needed significant changes.",
      word: "REFORM",
      choices: ["eliminate entirely", "make changes to improve", "ignore completely", "make more strict"],
      answer: 1,
      explain: "The clue is 'needed significant changes' and the word 'improve' is implied by 'unfair' — to REFORM means to change something to make it better."
    },
    {
      text: "The governor IMPLEMENTED the new policy immediately, putting it into effect the same day it was signed.",
      word: "IMPLEMENTED",
      choices: ["canceled", "put into action", "studied for years", "argued against"],
      answer: 1,
      explain: "The clue is 'putting it into effect the same day' — to IMPLEMENT means to put a plan or decision into action."
    }
  ],
  applyIt: {
    intro: "You've learned to use context clues to figure out word meanings. Now apply it. Below are 7 sentences, each using one of the words you just practiced. Click a sentence, then tag it as USED CORRECTLY (the word fits the context) or USED INCORRECTLY (the word doesn't match what the sentence is describing). When you're done, click Check My Work.",
    tagPositive: { value: "correct", label: "USED CORRECTLY" },
    tagNegative: { value: "incorrect", label: "USED INCORRECTLY" },
    sentences: [
      { text: "The senator decided to ABSTAIN from the vote, casting an enthusiastic yes and rallying others to join her.", answer: "incorrect", explain: "USED INCORRECTLY — ABSTAIN means to choose not to participate. 'Casting an enthusiastic yes and rallying others' is the opposite of abstaining." },
      { text: "After months of gridlock, the two parties reached a COMPROMISE, with each side giving up part of what it wanted in the final bill.", answer: "correct", explain: "USED CORRECTLY — 'each side giving up part of what it wanted' is exactly what a compromise is." },
      { text: "The new speed limit law was UNCONSTITUTIONAL because it was extremely unpopular with drivers in the state.", answer: "incorrect", explain: "USED INCORRECTLY — being unpopular doesn't make a law unconstitutional. UNCONSTITUTIONAL means it violates the Constitution, which has nothing to do with a law's popularity." },
      { text: "The committee was BIPARTISAN, made up entirely of members from a single political party who agreed on every issue.", answer: "incorrect", explain: "USED INCORRECTLY — BIPARTISAN means involving both parties. A committee made up of only one party is the opposite of bipartisan." },
      { text: "The amendment was finally RATIFIED after three-fourths of the states voted to approve it.", answer: "correct", explain: "USED CORRECTLY — being approved by three-fourths of the states is exactly what it means for an amendment to be ratified." },
      { text: "The proposal was CONTROVERSIAL, with strong majorities in every poll showing near-total agreement and no public debate at all.", answer: "incorrect", explain: "USED INCORRECTLY — CONTROVERSIAL means causing strong disagreement. Near-total agreement and no debate describes something uncontroversial." },
      { text: "Congress voted to ABOLISH the outdated rule, ending it completely after years of criticism.", answer: "correct", explain: "USED CORRECTLY — 'ending it completely' is precisely what it means to abolish something." }
    ]
  }
};

var SKILLS_VOCAB_LEVEL2 = {
  learnTitle: "ACADEMIC WORDS IN CONTEXT",
  learnBig: "These words show up in textbooks, tests, and AP exams — everywhere.",
  learnSub: "Level 2 uses harder academic words — the kind you see in AP Gov readings, standardized tests, and college essays. The strategy is the same: use the context around the word to figure out what it means. Look for definitions, examples, contrasts, and explanations nearby.",
  goodExample: "Madison sought to ENUMERATE the powers of Congress clearly, listing each one explicitly in Article I, Section 8 to prevent disputes about federal authority.",
  goodLabel: "CONTEXT CLUE: 'listing each one explicitly' tells you ENUMERATE means to list one by one",
  badExample: "Madison sought to ENUMERATE the powers of Congress.",
  badLabel: "WITHOUT CONTEXT: the word is too specific to guess from sentence alone",
  guidedPassage: "The Supreme Court has historically been RELUCTANT to SUPERSEDE acts of Congress, preferring to defer to the legislative branch unless a law clearly violates a constitutional provision.",
  guidedAnswer: "For RELUCTANT: 'preferring to defer to' tells you the Court doesn't WANT to do something — RELUCTANT means unwilling or hesitant. For SUPERSEDE: 'to defer to the legislative branch unless...' tells you SUPERSEDE means to replace or override something — here, to override acts of Congress.",
  questions: [
    {
      text: "The ruling was seen as ARBITRARY because the justices offered no consistent legal reasoning — the outcome seemed to depend entirely on personal preference rather than principle.",
      word: "ARBITRARY",
      choices: ["carefully researched", "based on clear rules", "random or without clear reason", "very expensive"],
      answer: 2,
      explain: "The clue is 'no consistent legal reasoning' and 'seemed to depend entirely on personal preference rather than principle' — ARBITRARY means based on random choice rather than a clear rule."
    },
    {
      text: "The senator was known for her ELOQUENCE — her speeches were powerful and persuasive, with carefully chosen words that moved even political opponents.",
      word: "ELOQUENCE",
      choices: ["poor communication skills", "the ability to speak powerfully and effectively", "very loud voice", "dishonesty"],
      answer: 1,
      explain: "The clue is 'powerful and persuasive, with carefully chosen words that moved even political opponents' — ELOQUENCE is the skill of using language effectively and persuasively."
    },
    {
      text: "The two laws were CONTRADICTORY — one required states to enforce a federal standard while the other explicitly allowed states to set their own rules.",
      word: "CONTRADICTORY",
      choices: ["supportive of each other", "directly opposite or conflicting", "difficult to understand", "widely popular"],
      answer: 1,
      explain: "The clue is the dash followed by the explanation: one law required X while the other allowed the opposite. CONTRADICTORY means directly opposing or conflicting."
    },
    {
      text: "Critics argued that the new regulation was EXCESSIVE, going far beyond what was necessary to address the problem and placing an unreasonable burden on businesses.",
      word: "EXCESSIVE",
      choices: ["carefully measured", "too much, beyond what is needed", "very popular", "legally required"],
      answer: 1,
      explain: "The clue is 'far beyond what was necessary' — EXCESSIVE means more than what is appropriate or needed."
    },
    {
      text: "The treaty was designed to be RECIPROCAL — if the U.S. reduced tariffs on foreign goods, those countries would equally reduce tariffs on American goods.",
      word: "RECIPROCAL",
      choices: ["one-sided, favoring one country", "mutual, where both sides give and receive equally", "secret", "temporary"],
      answer: 1,
      explain: "The clue is 'equally reduce tariffs on American goods' — if one side does something and the other does the same in return, it's RECIPROCAL."
    },
    {
      text: "The court's decision was UNPRECEDENTED — no previous ruling had ever granted this level of protection to digital communications.",
      word: "UNPRECEDENTED",
      choices: ["widely expected", "never done or seen before", "very controversial", "overturned quickly"],
      answer: 1,
      explain: "The clue is 'no previous ruling had ever' — UNPRECEDENTED means something that has never happened before."
    },
    {
      text: "Some critics felt the new regulations were too AMBIGUOUS, arguing that businesses could not comply because the rules were so unclear and open to interpretation.",
      word: "AMBIGUOUS",
      choices: ["perfectly clear", "too strict", "unclear or open to multiple interpretations", "very expensive"],
      answer: 2,
      explain: "The clue is 'so unclear and open to interpretation' — AMBIGUOUS means unclear, with multiple possible meanings."
    },
    {
      text: "Congress passed the law to MITIGATE the effects of the economic crisis, hoping that targeted relief would reduce the worst of the damage without solving the entire problem.",
      word: "MITIGATE",
      choices: ["make worse", "ignore completely", "reduce or lessen the impact of something", "permanently fix"],
      answer: 2,
      explain: "The clue is 'reduce the worst of the damage' — to MITIGATE means to make something less severe or harmful."
    },
    {
      text: "The senator's RHETORIC was powerful but misleading — her speeches were filled with emotional appeals that obscured the actual substance of the policy.",
      word: "RHETORIC",
      choices: ["voting record", "use of language to persuade, especially in speaking", "budget proposals", "committee assignments"],
      answer: 1,
      explain: "The clue is 'speeches' and 'emotional appeals' — RHETORIC is the art of using language persuasively, especially in political speech."
    },
    {
      text: "The constitutional amendment was intended to be PERMANENT, not subject to repeal or modification by future legislatures.",
      word: "PERMANENT",
      choices: ["temporary", "lasting forever, not changing", "controversial", "expensive"],
      answer: 1,
      explain: "The clue is 'not subject to repeal or modification' — PERMANENT means lasting indefinitely, not temporary."
    },
    {
      text: "The court found that the police had acted within their JURISDICTION — the city where the arrest occurred was entirely within their legal authority to operate.",
      word: "JURISDICTION",
      choices: ["budget", "the area or scope of legal authority", "personal opinion", "time limit"],
      answer: 1,
      explain: "The clue is 'legal authority to operate' — JURISDICTION is the official power or authority to make legal decisions within a defined area."
    },
    {
      text: "The law was RETROACTIVE — it applied not just to future actions but also to conduct that had occurred before the law was passed.",
      word: "RETROACTIVE",
      choices: ["applying only to future events", "applying to events that already happened in the past", "very controversial", "quickly repealed"],
      answer: 1,
      explain: "The clue is 'not just to future actions but also to conduct that had occurred before' — RETROACTIVE means applying backward to past events."
    },
    {
      text: "The Founders were wary of CONSOLIDATING too much power in one place, fearing that a government where power was combined would inevitably lead to tyranny.",
      word: "CONSOLIDATING",
      choices: ["spreading out", "combining into one, concentrating", "reducing", "hiding"],
      answer: 1,
      explain: "The clue is 'too much power in one place' and 'power was combined' — to CONSOLIDATE means to combine or concentrate things together."
    },
    {
      text: "The legislation was designed to be COMPREHENSIVE, covering every aspect of immigration from border security to citizenship pathways rather than addressing only one part of the issue.",
      word: "COMPREHENSIVE",
      choices: ["focused on one narrow area", "covering everything completely", "very short", "unpopular"],
      answer: 1,
      explain: "The clue is 'covering every aspect' and 'rather than addressing only one part' — COMPREHENSIVE means complete and including everything."
    },
    {
      text: "The interest group tried to CIRCUMVENT campaign finance laws by funneling money through organizations not subject to contribution limits.",
      word: "CIRCUMVENT",
      choices: ["follow carefully", "find a way around", "study thoroughly", "publicly criticize"],
      answer: 1,
      explain: "The clue is 'funneling money through organizations not subject to contribution limits' — this is a way of AVOIDING the law without technically breaking it. To CIRCUMVENT means to find a way around a rule or obstacle."
    }
  ],
  applyIt: {
    intro: "Now apply these harder academic words to new sentences. Click a sentence, then tag it as USED CORRECTLY or USED INCORRECTLY based on whether the bolded word actually fits what the sentence describes.",
    tagPositive: { value: "correct", label: "USED CORRECTLY" },
    tagNegative: { value: "incorrect", label: "USED INCORRECTLY" },
    sentences: [
      { text: "The new immigration bill was COMPREHENSIVE, addressing only visa processing fees and leaving every other part of the system untouched.", answer: "incorrect", explain: "USED INCORRECTLY — COMPREHENSIVE means covering everything completely. Addressing only one narrow piece and leaving everything else untouched is the opposite." },
      { text: "The judge ruled the search was outside the department's JURISDICTION, since the arrest happened in a city where those officers had no legal authority.", answer: "correct", explain: "USED CORRECTLY — having no legal authority in that city is exactly a jurisdiction problem." },
      { text: "The law was RETROACTIVE, applying only to actions that would happen in future years and never touching anything from the past.", answer: "incorrect", explain: "USED INCORRECTLY — RETROACTIVE means applying backward to events that already happened. A law that applies 'only to the future' is the opposite of retroactive." },
      { text: "Her testimony was full of AMBIGUOUS statements, each one so vague that senators on both sides interpreted it differently.", answer: "correct", explain: "USED CORRECTLY — being open to multiple interpretations is exactly what ambiguous means." },
      { text: "The two witnesses gave CONTRADICTORY accounts that lined up perfectly, confirming each other's version of events in every detail.", answer: "incorrect", explain: "USED INCORRECTLY — CONTRADICTORY means conflicting or opposing. Accounts that 'lined up perfectly' and confirm each other are not contradictory." },
      { text: "The relief package was meant to MITIGATE the damage from the flood, softening the worst effects even though it couldn't fix everything.", answer: "correct", explain: "USED CORRECTLY — softening the worst effects without fully fixing the problem is exactly what mitigate means." },
      { text: "The senator's ELOQUENCE was obvious — his mumbled, disorganized remarks left the audience confused about what he was even trying to say.", answer: "incorrect", explain: "USED INCORRECTLY — ELOQUENCE means speaking powerfully and effectively. Mumbled, disorganized, and confusing remarks describe the opposite of eloquence." }
    ]
  }
};

var SKILLS_VOCAB_LEVEL3 = {
  learnTitle: "PRIMARY SOURCE VOCABULARY",
  learnBig: "Real words from real documents. This is what the AP exam actually asks.",
  learnSub: "Level 3 pulls vocabulary directly from SCOTUS opinions, the Federalist Papers, and other primary sources. These sentences are genuinely difficult — they are written the way legal and political writers wrote in 1788 or in SCOTUS opinions. Use every context clue available: what comes before AND after the word, what the overall argument is, and any contrast or comparison nearby.",
  goodExample: "Hamilton: 'The circumstances that endanger the safety of nations are INFINITE in their variety' — meaning he is saying dangers are INFINITE, too many to fully count or predict.",
  goodLabel: "PRIMARY SOURCE CLUE: the phrase 'variety' and the context of listing dangers helps clarify the meaning",
  badExample: "Reading a primary source word with no surrounding context at all",
  badLabel: "The harder the text, the MORE context you need — read the whole sentence, not just the word",
  guidedPassage: "Federalist No. 51: 'In framing a government which is to be administered by men over men, the great difficulty lies in this: you must first enable the government to GOVERN the GOVERNED; and in the next place OBLIGE it to CONTROL ITSELF.'",
  guidedAnswer: "Even in dense 18th-century writing, context saves you. OBLIGE here means 'force' or 'require' — you can tell because it's paired with 'must' earlier and 'control itself' after. The whole sentence is about the problem of a government needing to both control others AND control its own power. If you slow down and read the whole sentence, the meaning surfaces.",
  questions: [
    {
      text: "Federalist No. 10: 'By a faction, I understand a number of citizens... who are united and ACTUATED by some common impulse of passion, or of interest, ADVERSE to the rights of other citizens.'",
      word: "ACTUATED",
      choices: ["calmed or slowed down", "driven or motivated", "confused or misled", "elected or appointed"],
      answer: 1,
      explain: "The clue is 'united by some common impulse of passion' — something is driving them together. ACTUATED means motivated or driven into action."
    },
    {
      text: "Brutus No. 1: 'This government is to possess absolute and UNCONTROULABLE power, legislative, executive and judicial, with respect to every object to which it extends.'",
      word: "UNCONTROULABLE",
      choices: ["carefully limited", "unable to be checked or restrained", "very complicated", "democratically elected"],
      answer: 1,
      explain: "The clue is 'absolute' immediately before it — UNCONTROULABLE (the old spelling of uncontrollable) means unable to be limited or checked. Brutus is warning that federal power cannot be restrained."
    },
    {
      text: "McCulloch v. Maryland (1819): 'Let the end be LEGITIMATE, let it be within the scope of the constitution, and all means which are appropriate, which are plainly ADAPTED to that end... are constitutional.'",
      word: "LEGITIMATE",
      choices: ["unpopular or contested", "allowed by law, valid and proper", "very expensive", "passed by Congress"],
      answer: 1,
      explain: "The clue is 'within the scope of the constitution' — something is LEGITIMATE if it is valid, proper, and allowed by law."
    },
    {
      text: "Federalist No. 78: 'The judiciary... will always be the least dangerous to the political rights of the Constitution; it can never attack with success either of the other two... it has no influence over either the sword or the PURSE.'",
      word: "PURSE",
      choices: ["military power", "control of money and finances", "power to make laws", "ability to appoint judges"],
      answer: 1,
      explain: "The clue is 'the sword' is paired with 'the PURSE' as two types of power the courts lack. The sword = military power. The purse = financial power/control of money. This is a classic metaphor Hamilton uses."
    },
    {
      text: "Marbury v. Madison (1803): 'It is EMPHATICALLY the province and duty of the judicial department to say what the law is.'",
      word: "EMPHATICALLY",
      choices: ["probably", "with great force and certainty", "reluctantly", "temporarily"],
      answer: 1,
      explain: "The word EMPHATICALLY is used to stress that something is absolutely, without question, true. Marshall is declaring this with great confidence and authority — EMPHATICALLY means strongly and forcefully."
    },
    {
      text: "Federalist No. 51: 'Ambition must be made to COUNTERACT ambition. The interest of the man must be connected with the constitutional rights of the place.'",
      word: "COUNTERACT",
      choices: ["support and strengthen", "work against and neutralize", "replace entirely", "study carefully"],
      answer: 1,
      explain: "The clue is that Madison is describing a system where one person's ambition prevents another's from dominating — they work AGAINST each other. COUNTERACT means to work against something to reduce or cancel its effect."
    },
    {
      text: "Letter from Birmingham Jail: 'An unjust law is a code that a numerical or power majority group COMPELS a minority group to obey but does not make binding on itself.'",
      word: "COMPELS",
      choices: ["asks politely", "forces or requires", "teaches or explains", "ignores"],
      answer: 1,
      explain: "The clue is contrast — the majority forces the minority to obey something but doesn't follow it themselves. COMPELS means forces or requires."
    },
    {
      text: "Tinker v. Des Moines (1969): 'It can hardly be argued that either students or teachers shed their constitutional rights to freedom of speech or expression at the SCHOOLHOUSE GATE.'",
      word: "SHED",
      choices: ["strengthen or gain", "lose or give up", "rediscover", "argue about"],
      answer: 1,
      explain: "The clue is the overall argument — Justice Fortas is saying students do NOT give up their rights at school. SHED here means to lose or give up, and the sentence says they DON'T shed their rights."
    },
    {
      text: "Federalist No. 10: 'The regulation of these various and INTERFERING interests forms the principal task of modern legislation, and involves the spirit of party and faction in the necessary and ordinary operations of the government.'",
      word: "INTERFERING",
      choices: ["supporting each other", "conflicting or getting in each other's way", "growing over time", "independently formed"],
      answer: 1,
      explain: "The clue is 'various' interests that form problems — they conflict with each other. INTERFERING here means competing or conflicting, getting in each other's way."
    },
    {
      text: "Brown v. Board of Education (1954): 'Separate educational facilities are INHERENTLY unequal. Therefore, we hold that the plaintiffs... are... deprived of the equal protection of the laws.'",
      word: "INHERENTLY",
      choices: ["possibly, under some circumstances", "by their very nature, fundamentally", "only sometimes", "according to state law"],
      answer: 1,
      explain: "INHERENTLY means by its very nature — Warren is saying segregated schools are NOT just unequal in practice but are unequal at their core, by definition. The word 'therefore' after it shows this is a strong, absolute conclusion."
    }
  ],
  applyIt: {
    intro: "Apply these primary-source words to new sentences written in the same dense, formal style. Click a sentence, then tag it as USED CORRECTLY or USED INCORRECTLY based on whether the bolded word fits the meaning the sentence is building toward.",
    tagPositive: { value: "correct", label: "USED CORRECTLY" },
    tagNegative: { value: "incorrect", label: "USED INCORRECTLY" },
    sentences: [
      { text: "The Court held that an unjust statute COMPELS obedience from the minority while leaving the majority free to ignore it — a classic sign of an unjust law.", answer: "correct", explain: "USED CORRECTLY — this matches the exact pattern from the Letter from Birmingham Jail: an unjust law forces the minority to obey while the majority group isn't bound by it." },
      { text: "The opinion noted that Congress INHERENTLY lacks authority over the courts, since that power was deliberately withheld by Article III.", answer: "correct", explain: "USED CORRECTLY — 'deliberately withheld' shows the lack of authority is fundamental and by design, which is exactly what inherently signals here." },
      { text: "Federalist No. 78 explains that the judiciary controls neither the sword nor the PURSE, meaning it has no command over military force or public funds.", answer: "correct", explain: "USED CORRECTLY — 'no command over military force or public funds' is precisely what purse means in this famous pairing." },
      { text: "The dissent argued the ruling was LEGITIMATE because it directly contradicted the text of the Constitution and ignored established precedent.", answer: "incorrect", explain: "USED INCORRECTLY — LEGITIMATE means valid and proper under the law. A ruling that contradicts the Constitution and ignores precedent would be described as illegitimate, not legitimate." },
      { text: "The majority opinion stated EMPHATICALLY that the law was unconstitutional, using unusually forceful and unqualified language to make the point.", answer: "correct", explain: "USED CORRECTLY — 'unusually forceful and unqualified language' is exactly what emphatically describes." },
      { text: "Madison warned that unchecked ambition in one branch would COUNTERACT the ambition of the others, causing all three branches to grow in power together with no resistance.", answer: "incorrect", explain: "USED INCORRECTLY — COUNTERACT means to work against and neutralize. Branches 'growing in power together with no resistance' describes the opposite of one ambition counteracting another." },
      { text: "The Court found that the state's interest in regulating commerce was INTERFERING with federal law, creating a direct conflict the Supremacy Clause was designed to resolve.", answer: "correct", explain: "USED CORRECTLY — 'a direct conflict' between state and federal law is exactly what interfering describes here." },
      { text: "The plaintiffs argued that the new policy would cause them to SHED additional legal protections, gaining several new rights they had not previously held.", answer: "incorrect", explain: "USED INCORRECTLY — SHED means to lose or give up. 'Gaining several new rights' is the opposite of shedding protections." }
    ]
  }
};

// ══════════════════════════════════════════════════════════════
// CLOSE READING (AVID) — 3-PASS PROTOCOL
// ══════════════════════════════════════════════════════════════
// Each passage: chunks[] are the clickable spans. modelYellow/Blue/Pink
// are arrays of chunk INDEXES (0-based) that represent the "correct"
// annotation for that pass, used to score the student's tagging.
//
// COPYRIGHT NOTE: passages 1 and 5 in Level 1 (and several in Levels
// 2-3, to be added) are under active copyright and are left as
// TEACHER-SUPPLIED placeholders. Paste the real text into the
// `chunks` array (break it into 5-10 short clickable pieces), then
// fill in pass1Model/pass2Model/pass3Model and the matching
// modelYellow/modelBlue/modelPink index arrays based on your own
// reading of the passage. Everything else (the engine, scoring,
// Simplify Text, Sheets export) works automatically once the data
// is filled in — no code changes needed.
// ══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// CLOSE READING LEVEL 0 — true floor level. Short passages (5-6
// sentences), plain everyday language, still government-themed but
// far simpler than Level 1's real primary sources. The 3-pass
// structure stays the same (yellow/blue/pink, same engine), but each
// pass targets pure literal skills instead of analysis: find the
// main event, find a specific stated fact, find a feeling or
// order-word — the "explicit detail retrieval" skill that sits below
// even basic-level reading, before Level 1 asks students to judge
// WHY a sentence matters. Positioned first in the levels array (see
// SKILLS_ACTIVITY_DATA), so it displays as "LEVEL 1" in the UI, same
// convention as the Vocabulary Level 0 addition.
// ══════════════════════════════════════════════════════════════
var CLOSEREADING_LEVEL0 = {
  passages: [
    {
      title: "A New School Lunch Bill",
      source: "Example passage (simplified, for practice)",
      simplify: "A senator's bill about free school breakfast passed the Senate after a committee vote and two days of debate.",
      chunks: [
        "A senator wrote a new bill about school lunches.",
        "She wanted every public school to offer a free breakfast.",
        "The bill went to a committee first.",
        "The committee voted yes, 8 to 3.",
        "Then the whole Senate debated the bill for two days.",
        "In the end, the Senate passed the bill by a vote of 61 to 39."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentence that tells you the MAIN thing that happens in this passage.",
      pass1NoteLabel: "In your own words, what is this passage mainly about?",
      pass1Model: "The main thing happening is that a senator wrote a bill to give every public school a free breakfast. Everything else in the passage is about what happened to that bill next.",
      modelYellow: [0, 1],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentence(s) with a SPECIFIC FACT — a number, date, or exact detail stated directly in the text.",
      pass2NoteLabel: "What specific number or fact did you find?",
      pass2Model: "Two sentences give exact numbers: the committee vote was 8 to 3, and the final Senate vote was 61 to 39. These are facts stated directly — you don't have to guess or figure them out.",
      modelBlue: [3, 5],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentence(s) that show the ORDER events happened in — look for words like first or then.",
      pass3NoteLabel: "What word helped you see the order of events?",
      pass3Model: "\"First\" tells you the bill went to committee before anything else happened. \"Then\" tells you the Senate debate came after that. Words like these are signposts that tell you what order things happened in.",
      modelPink: [2, 4]
    },
    {
      title: "Lowering the Voting Age",
      source: "Example passage (simplified, for practice)",
      simplify: "The voting age used to be 21. People thought this was unfair to young men fighting in the Vietnam War, so in 1971 the 26th Amendment lowered the voting age to 18.",
      chunks: [
        "For a long time, Americans had to be 21 years old to vote.",
        "Many young men fought in the Vietnam War even though they could not vote yet.",
        "People said this was not fair.",
        "In 1971, the country passed the 26th Amendment.",
        "This amendment lowered the voting age to 18 for every state."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentence(s) that tell you the MAIN thing that happens in this passage.",
      pass1NoteLabel: "In your own words, what is this passage mainly about?",
      pass1Model: "The main thing that happens is that the voting age gets lowered to 18. The 26th Amendment is what actually changed the rule — that's the key event of the whole passage.",
      modelYellow: [3, 4],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentence with a SPECIFIC FACT — a number or date stated directly in the text.",
      pass2NoteLabel: "What specific number or date did you find?",
      pass2Model: "The passage states directly that the voting age used to be 21. That's a specific, exact fact you can point to in the text.",
      modelBlue: [0],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentence(s) that tell you HOW people felt about something.",
      pass3NoteLabel: "How did the highlighted sentence show a feeling?",
      pass3Model: "The passage explains that young men were fighting in a war without being able to vote, and then says directly that people felt this \"was not fair.\" That's the passage telling you how people felt, not just what happened.",
      modelPink: [1, 2]
    },
    {
      title: "A New Mayor for Springfield",
      source: "Example passage (simplified, for practice)",
      simplify: "Springfield elected a new mayor, Maria Torres, who promised to fix roads and build a park, and residents were excited about her plans.",
      chunks: [
        "Every city has a mayor.",
        "The mayor is the leader of the city government.",
        "Voters in Springfield elected a new mayor last November.",
        "Her name is Maria Torres.",
        "She promised to fix the roads and build a new park.",
        "Many residents were excited about her plans."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentence(s) that tell you the MAIN thing that happens in this passage.",
      pass1NoteLabel: "In your own words, what is this passage mainly about?",
      pass1Model: "The main idea is about the mayor's job and her plans: she is the leader of the city government, and she promised to fix roads and build a park. Those two sentences carry the real content of the passage.",
      modelYellow: [1, 4],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentence(s) with a SPECIFIC FACT — a name, place, or date stated directly.",
      pass2NoteLabel: "What specific name, place, or date did you find?",
      pass2Model: "Two exact facts are stated directly: the election happened in Springfield last November, and the new mayor's name is Maria Torres.",
      modelBlue: [2, 3],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentence that tells you HOW people felt.",
      pass3NoteLabel: "How did the highlighted sentence show a feeling?",
      pass3Model: "The last sentence tells you directly that residents were \"excited\" about her plans — that's the passage stating a feeling, not something you have to guess.",
      modelPink: [5]
    },
    {
      title: "Alex and the School Newspaper",
      source: "Example passage (simplified, for practice)",
      simplify: "Alex wrote an article criticizing his school's cafeteria food, and his teacher confirmed this was protected under free speech, which made Alex feel relieved and proud.",
      chunks: [
        "The First Amendment gives Americans the right to free speech.",
        "This means people can share their opinions without the government stopping them.",
        "A student named Alex wanted to write an article criticizing his school's cafeteria food.",
        "His teacher said this was allowed under free speech.",
        "Alex felt relieved and proud of his article."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentence(s) that tell you the MAIN thing this passage explains.",
      pass1NoteLabel: "In your own words, what does free speech mean based on this passage?",
      pass1Model: "The main idea is explained right at the start: free speech means people can share their opinions without the government stopping them. Everything after that is an example of this rule in action.",
      modelYellow: [0, 1],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentence(s) with a SPECIFIC FACT or example — a name or exact detail stated directly.",
      pass2NoteLabel: "What specific example did the passage give?",
      pass2Model: "The passage gives one specific, named example: a student named Alex wrote an article criticizing his school's cafeteria food, and his teacher confirmed this was allowed.",
      modelBlue: [2, 3],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentence that tells you HOW Alex felt.",
      pass3NoteLabel: "How did the highlighted sentence show a feeling?",
      pass3Model: "The last sentence states directly that Alex felt \"relieved and proud\" — two specific feeling words the passage gives you, not something you have to infer on your own.",
      modelPink: [4]
    },
    {
      title: "Mr. Chen's Jury Duty",
      source: "Example passage (simplified, for practice)",
      simplify: "Mr. Chen was called for jury duty, felt nervous at first, and felt confident by the end of the trial after the jury decided the case.",
      chunks: [
        "When someone is chosen for jury duty, they must go to court.",
        "A jury listens to both sides of a case.",
        "Then the jury decides if a person is guilty or not guilty.",
        "Mr. Chen was called for jury duty last week.",
        "At first, he felt nervous about the responsibility.",
        "By the end of the trial, he felt confident in the jury's decision."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentence(s) that tell you the MAIN thing a jury does.",
      pass1NoteLabel: "In your own words, what is a jury's job?",
      pass1Model: "The main idea is a jury's job: it listens to both sides of a case, then decides if a person is guilty or not guilty. Those two sentences explain what the passage is really about.",
      modelYellow: [1, 2],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentence with a SPECIFIC FACT — a name or time stated directly.",
      pass2NoteLabel: "What specific name or time did you find?",
      pass2Model: "The passage states directly that Mr. Chen was called for jury duty last week — an exact name and an exact time frame.",
      modelBlue: [3],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentence(s) that show HOW Mr. Chen's feelings changed.",
      pass3NoteLabel: "How did Mr. Chen's feelings change from the start to the end?",
      pass3Model: "His feelings change over the course of the passage: \"at first\" he felt nervous, but \"by the end\" he felt confident. Noticing words like \"at first\" and \"by the end\" helps you see that a feeling changed, not just what the feeling was.",
      modelPink: [4, 5]
    }
  ]
};

var CLOSEREADING_LEVEL1 = {
  passages: [
    // ---- PASSAGE 1: REAL CONTENT — official presidential address (public domain) ----
    {
      title: "Reagan's Challenger Address",
      source: "President Ronald Reagan, Address to the Nation on the Explosion of the Space Shuttle Challenger, January 28, 1986. Published in Public Papers of the Presidents of the United States (Ronald Reagan Presidential Library archive).",
      simplify: "After the Challenger space shuttle exploded, Reagan speaks directly to the schoolchildren who watched it happen live. He tells them that painful things sometimes happen even when people are doing something brave and worthwhile, and that giving up isn't the answer. He closes with a famous line borrowed from a poem, describing the astronauts as having 'slipped the surly bonds of earth to touch the face of God.'",
      chunks: [
        "And I want to say something to the schoolchildren of America who were watching the live coverage of the shuttle's takeoff.",
        "I know it is hard to understand, but sometimes painful things like this happen.",
        "It's all part of the process of exploration and discovery. It's all part of taking a chance and expanding man's horizons.",
        "The future doesn't belong to the fainthearted; it belongs to the brave.",
        "The Challenger crew was pulling us into the future, and we'll continue to follow them.",
        "We will never forget them, nor the last time we saw them, this morning, as they prepared for their journey and waved goodbye and \"slipped the surly bonds of earth\" to \"touch the face of God.\""
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that carry the main idea or the most important facts.",
      pass1NoteLabel: "In one sentence, what is Reagan's core message to the children?",
      pass1Model: "Reagan's core reassurance to the children is that painful things sometimes happen even in worthwhile pursuits, and that the future belongs to \"the brave,\" not those who give up trying. This frames tragedy as a normal (if painful) part of exploration, not a reason to stop.",
      modelYellow: [1, 3],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the parts that reveal the passage's structure — how the speaker moves from one idea to the next.",
      pass2NoteLabel: "How does Reagan shift his audience over the course of this passage?",
      pass2Model: "Reagan structures this moment by first explicitly shifting his address to a new audience (schoolchildren specifically, not the nation broadly), then closing by shifting back — from talking to children about the future to talking about the crew pulling \"us\" (everyone) into that future. The passage is bookended by these audience shifts.",
      modelBlue: [0, 4],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the specific words or phrases where the speaker made a deliberate, powerful language choice.",
      pass3NoteLabel: "Pick one word or phrase you tagged pink. Why do you think Reagan chose it?",
      pass3Model: "Notice the repeated \"It's all part of...\" construction — this repetition normalizes tragedy as an expected, survivable part of a larger process, rather than a devastating rupture. And the closing line borrows directly from the poem \"High Flight\" by John Gillespie Magee Jr. — a deliberate literary allusion that elevates the astronauts' deaths into something almost mythic, using someone else's exact, memorized words rather than his own to make the moment feel timeless.",
      modelPink: [2, 5]
    },

    // ---- PASSAGE 2: REAL CONTENT — public congressional testimony ----
    {
      title: "Testimony on the Uvalde Shooting",
      source: "Zeneta Everhart, testimony before the House Committee on Oversight and Reform, \"The Urgent Need to Address the Gun Violence Epidemic,\" June 8, 2022",
      simplify: "A mother whose son was shot and wounded in the Buffalo supermarket shooting tells Congress exactly what his injuries look like, in graphic detail, and then challenges lawmakers to come see the damage in person if her testimony isn't enough to convince them to act on gun laws.",
      chunks: [
        "To the lawmakers who feel that we do not need stricter gun laws, let me paint a picture for you.",
        "My son Zaire has a hole in the right side of his neck, two on his back, and another on his left leg, caused by an exploding bullet from an AR-15.",
        "As I clean his wounds, I can feel pieces of that bullet in his back.",
        "Shrapnel will be left inside of his body for the rest of his life.",
        "Now, I want you to picture that exact scenario for one of your children.",
        "If after hearing from me and the other people testifying here today does not move you to act on gun laws, I invite you to my home to help me clean Zaire's wounds so that you may see, up close, the damage that has been caused to my son and to my community."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that carry the main idea or the most important facts.",
      pass1NoteLabel: "In one sentence, what is Everhart's main argument?",
      pass1Model: "The key content is the graphic description of Zaire's wounds and the direct challenge asking lawmakers to picture that same injury happening to their own child. Together, these two sentences carry Everhart's central argument: gun violence causes real, permanent physical harm, and the people with power to act should be forced to imagine it happening to someone they love.",
      modelYellow: [1, 4],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the parts that reveal the passage's structure — how the speaker moves from one idea to the next.",
      pass2NoteLabel: "How does Everhart build her argument from the first sentence to the last?",
      pass2Model: "Everhart bookends her testimony with a clear structural frame: she opens by promising to make the harm vivid and concrete (\"let me paint a picture\"), and closes with a conditional invitation (\"if...this does not move you...I invite you to my home\") that turns her opening promise into a literal, real offer. Everything in between builds toward that final challenge.",
      modelBlue: [0, 5],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the specific words or phrases where the speaker made a deliberate, powerful language choice.",
      pass3NoteLabel: "Pick one word or phrase you tagged pink. Why do you think Everhart chose that exact word?",
      pass3Model: "Notice the specific physical, sensory language: \"I can feel pieces of that bullet in his back\" makes the harm tactile and immediate rather than abstract. \"Shrapnel will be left inside of his body for the rest of his life\" uses permanence to argue this isn't a wound that simply heals — it's a lifelong injury.",
      modelPink: [2, 3]
    },

    // ---- PASSAGE 3: REAL CONTENT — public Senate confirmation hearing ----
    {
      title: "KBJ Confirmation Hearing: Judicial Philosophy",
      source: "Senate Judiciary Committee confirmation hearing for Judge Ketanji Brown Jackson, March 22, 2022",
      simplify: "A senator asks Judge Jackson why judges should avoid making big, sudden changes to legal rules. Jackson explains that if judges keep dramatically shifting the law, people will stop trusting that judges are following the law at all — they'll start suspecting judges are just doing whatever they personally want.",
      chunks: [
        "During her Senate confirmation hearing, Judge Ketanji Brown Jackson was asked by senators to explain her judicial philosophy — the approach she uses to decide cases.",
        "Senator Amy Klobuchar asked her directly: \"What role do you think narrow rulings play in helping to maintain the legitimacy of the court?\"",
        "Judge Jackson answered: \"If there were big shifts in terms of legal principles and doctrines, it could lead to people not understanding that judges are ruling on legal principles.\"",
        "\"It could lead to undermining public confidence, thinking that judges are interjecting their own policy preferences rather than following the law in terms of their rulings.\"",
        "Jackson consistently declined to attach a specific label — like \"originalist\" or \"living constitutionalist\" — to her approach, instead describing a step-by-step methodology she said she applies to every case."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that carry the main idea or the most important facts.",
      pass1NoteLabel: "In one sentence, what is Jackson's answer actually saying?",
      pass1Model: "The heart of this passage is Jackson's actual answer: sudden shifts in legal doctrine damage public confidence because people start to suspect judges are imposing personal policy views rather than following the law.",
      modelYellow: [2, 3],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the parts that reveal the passage's structure — how it moves from one idea to the next.",
      pass2NoteLabel: "How is this passage organized — what's the setup, and what's the takeaway?",
      pass2Model: "The passage opens with context (what's being tested — her judicial philosophy) before presenting the specific question that triggered her answer. This context-then-question structure sets up why her answer matters before you even read it.",
      modelBlue: [0, 1],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the specific words or phrases where the speaker made a deliberate, powerful language choice.",
      pass3NoteLabel: "Pick one word or phrase you tagged pink. What is it doing rhetorically?",
      pass3Model: "Notice the deliberate rhetorical choice described here: Jackson consistently refused to attach a specific philosophical label to herself. Avoiding labels is itself a strategic choice — it lets her describe a process without giving critics a single word (\"originalist,\" \"living constitutionalist\") to attack.",
      modelPink: [4]
    },

    // ---- PASSAGE 4: REAL CONTENT — official government form (generic placeholder name used) ----
    {
      title: "Notice to Appear (Form I-862)",
      source: "U.S. Department of Homeland Security, Form I-862 (Notice to Appear) — official boilerplate language. \"Jane Doe\" is used as a generic placeholder name for classroom purposes; this is not a real case.",
      simplify: "This is the official government form that starts the legal process to remove someone from the country. It says: the government believes you're not a citizen, it's charging you with being removable, and it's ordering you to show up in immigration court. It also warns you that anything you say can be used against you, and that you can hire your own lawyer — but the government won't provide or pay for one.",
      chunks: [
        "NOTICE TO APPEAR — In removal proceedings under section 240 of the Immigration and Nationality Act.",
        "TO: Respondent Jane Doe — You are an alien present in the United States who has not been admitted or paroled.",
        "The Department of Homeland Security alleges that you are not a citizen or national of the United States.",
        "On the basis of the foregoing, it is charged that you are subject to removal from the United States.",
        "YOU ARE ORDERED to appear before an immigration judge of the United States Department of Justice at the address listed above, on a date and time to be set.",
        "Warning: Any statement you make may be used against you in removal proceedings.",
        "Representation: If you so choose, you may be represented in this proceeding, at no expense to the Government, by an attorney or other individual authorized and qualified to represent persons before the Executive Office for Immigration Review.",
        "Failure to appear: If you fail to attend the hearing at the time and place designated on this notice, a removal order may be made by the immigration judge in your absence."
      ],
      pass1Prompt: "FIRST READ: Read the whole document once without marking anything. Then go back and highlight YELLOW the sentences that carry the core legal facts.",
      pass1NoteLabel: "In one sentence, what is this document actually doing to the person who receives it?",
      pass1Model: "The core of this document is simple even though the language is formal: DHS claims you're not a citizen (the allegation), charges you as removable on that basis (the charge), and orders you to appear before a judge (the consequence). Everything else supports or qualifies these three moves.",
      modelYellow: [2, 3, 4],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the parts that show the document's legal structure.",
      pass2NoteLabel: "What order does this document follow, and why might a legal document be organized this way?",
      pass2Model: "Notice how the document is structurally bookended: it opens with the title and legal authority establishing why this document has power over you, and closes with the failure-to-appear warning establishing what happens if you ignore it. Everything in between — the allegation, charge, and order — is sandwiched between these two structural anchors.",
      modelBlue: [0, 1, 7],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK specific words where the legal language is doing careful, deliberate work.",
      pass3NoteLabel: "Pick one word or phrase you tagged pink. What is it precisely designed to do or avoid saying?",
      pass3Model: "The warning is written in passive voice (\"may be used against you\") — legal documents often state consequences without naming who's responsible for what comes next. And \"at no expense to the Government\" carefully signals: you can have a lawyer, but the government will not pay for one — this is different from the right to a public defender guaranteed in criminal court (see Gideon v. Wainwright), which is a common point of confusion.",
      modelPink: [5, 6]
    },

    // ---- PASSAGE 5: REAL CONTENT — official presidential address (public domain) ----
    {
      title: "Bush's Address to Congress After 9/11",
      source: "President George W. Bush, Address Before a Joint Session of Congress on the United States Response to the Terrorist Attacks of September 11, September 20, 2001. Published in Public Papers of the Presidents of the United States (govinfo.gov).",
      simplify: "Nine days after 9/11, Bush tells Congress that even though people are calling this an 'age of terror,' he refuses to accept that label. He says America itself gets to decide what this era will be called, and insists it will be an 'age of liberty' instead — closing with the blunt line 'Freedom and fear are at war.'",
      chunks: [
        "After all that has just passed — all the lives taken, and all the possibilities and hopes that died with them — it is natural to wonder if America's future is one of fear.",
        "Some speak of an age of terror.",
        "I know there are struggles ahead, and dangers to face.",
        "But this country will define our times, not be defined by them.",
        "As long as the United States of America is determined and strong, this will not be an age of terror; this will be an age of liberty, here and across the world.",
        "Great harm has been done to us. We have suffered great loss.",
        "And in our grief and anger we have found our mission and our moment.",
        "Freedom and fear are at war."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that carry Bush's central claim.",
      pass1NoteLabel: "In one sentence, what is Bush's core argument about how this era should be defined?",
      pass1Model: "Bush's central move is reframing: rather than accept the label \"age of terror,\" he insists the country itself gets to define its era, and declares — as a statement of will rather than fact — that this will be \"an age of liberty\" instead. This is an argument about narrative control as much as policy.",
      modelYellow: [3, 4],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentences that set up the fear and uncertainty before Bush pivots against it.",
      pass2NoteLabel: "How does Bush build toward his reframing — what does he acknowledge first?",
      pass2Model: "Notice how Bush builds toward his reframing by first acknowledging the fear and uncertainty directly — naming the \"age of terror\" framing that others were already using, and admitting real dangers lie ahead — before pivoting against it. He doesn't dismiss the fear; he validates it first, which makes his subsequent rejection of that framing more persuasive.",
      modelBlue: [0, 1, 2],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentences with the most deliberate rhetorical craft.",
      pass3NoteLabel: "What effect does the sentence length and rhythm create here?",
      pass3Model: "The passage builds through a series of short, blunt declarative sentences — \"Great harm has been done to us. We have suffered great loss.\" — before landing on the four-word sentence that closes the passage: \"Freedom and fear are at war.\" The brevity and parallel structure of these final sentences creates a rhythm that builds toward that closing line, turning an abstract policy stance into something that sounds almost like verse.",
      modelPink: [5, 6, 7]
    }
  ]
};

// ══════════════════════════════════════════════════════════════
// LEVEL 2 and LEVEL 3 — STRUCTURAL STUBS
// These prevent the site from crashing (see note above the Level 1
// block) but do not yet contain real passages. Coming in the next
// content pass: Level 2 (Jackson SFFA dissent, LBJ "We Shall
// Overcome," Coates excerpt [teacher-supplied], Korematsu dissent,
// federal plea agreement) and Level 3 (Korematsu majority, Birmingham
// Jail "Wait" section [teacher-supplied], Youngstown/Jackson
// concurrence, Pentagon Papers opening, Bakke dissent).
// ══════════════════════════════════════════════════════════════

var CLOSEREADING_LEVEL2 = {
  passages: [
    // ---- PASSAGE 1: REAL CONTENT — SCOTUS dissent (public domain) ----
    {
      title: "Jackson's Dissent in SFFA v. UNC",
      source: "Justice Ketanji Brown Jackson, dissenting opinion, Students for Fair Admissions v. University of North Carolina, 600 U.S. ___ (2023)",
      simplify: "Jackson imagines two North Carolina college applicants, John and James, who are alike in almost every way — same roots, same love of their state, same family legacy they want to honor. The one difference: John would be the 7th generation in his family to graduate from UNC and is White; James would be the first in his family and is Black. Jackson uses this comparison to ask whether that racial difference should be allowed to factor into the admissions decision.",
      chunks: [
        "Imagine two college applicants from North Carolina, John and James.",
        "Both trace their family's North Carolina roots to the year of UNC's founding in 1789.",
        "Both love their State and want great things for its people.",
        "Both want to honor their family's legacy by attending the State's flagship educational institution.",
        "John, however, would be the seventh generation to graduate from UNC. He is White.",
        "James would be the first; he is Black.",
        "Does the race of these applicants properly play a role in UNC's holistic merits-based admissions process?"
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentence that carries the main idea.",
      pass1NoteLabel: "In one sentence, what is Jackson actually asking here?",
      pass1Model: "Everything in this hypothetical builds toward one sentence: the central question Jackson poses about whether race should matter in the admissions decision. All the other details about John and James exist to make you feel the weight of that single question before you answer it.",
      modelYellow: [6],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentences that set up the comparison before the key difference is revealed.",
      pass2NoteLabel: "What does Jackson establish as shared between John and James before introducing the difference?",
      pass2Model: "Jackson spends four sentences establishing what John and James have in common — same state roots dating to UNC's founding, the same love of their state, the same desire to honor family legacy by attending the flagship university. This structural buildup of similarity is deliberate: she wants you to see them as equals in every way that matters before she introduces the one difference the rest of the passage turns on.",
      modelBlue: [0, 1, 2, 3],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentences where Jackson uses a deliberate rhetorical technique.",
      pass3NoteLabel: "What rhetorical technique do you notice in these two sentences, and why is it effective?",
      pass3Model: "Notice the parallel sentence structure Jackson uses: \"John...would be the seventh generation to graduate from UNC. He is White\" mirrored by \"James would be the first; he is Black.\" The identical grammatical pattern makes the racial contrast land harder — it's not just telling you they're different races, it's showing you the same sentence producing two very different outcomes depending on which race is plugged in.",
      modelPink: [4, 5]
    },

    // ---- PASSAGE 2: REAL CONTENT — official presidential address (public domain government work) ----
    {
      title: "LBJ, \"We Shall Overcome\"",
      source: "President Lyndon B. Johnson, address to a joint session of Congress, March 15, 1965. Published in Public Papers of the Presidents of the United States: Lyndon B. Johnson, 1965 (Washington, D.C.: Government Printing Office, 1966).",
      simplify: "Johnson says the violence in Selma isn't just a local or Black issue — it's part of a much bigger national struggle. He argues that ending racial injustice is everyone's job, not just the job of the people directly affected by it, and closes by borrowing the title of the civil rights movement's own protest song as his final line.",
      chunks: [
        "What happened in Selma is part of a far larger movement which reaches into every section and State of America.",
        "It is the effort of American Negroes to secure for themselves the full blessings of American life.",
        "Their cause must be our cause too.",
        "Because it is not just Negroes, but really it is all of us, who must overcome the crippling legacy of bigotry and injustice.",
        "And we shall overcome."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that carry the main argument.",
      pass1NoteLabel: "In one sentence, what is Johnson's core claim about whose responsibility this is?",
      pass1Model: "The core claim is that this isn't a Black issue or a Southern issue — Johnson insists that ending racial injustice is everyone's responsibility (\"our cause too\"), and generalizes \"overcoming\" from a phrase used by civil rights activists into something \"all of us\" must do together.",
      modelYellow: [2, 3],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentences that set up context before the main claim.",
      pass2NoteLabel: "How does Johnson frame Selma before making his argument about shared responsibility?",
      pass2Model: "Johnson opens by placing Selma within a bigger picture — not an isolated local event, but part of a national movement to secure \"the full blessings of American life.\" This context-setting move is structural: he's positioning what comes next (his argument that it's everyone's cause) as building logically from what Selma represents.",
      modelBlue: [0, 1],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentence with the most deliberate rhetorical choice.",
      pass3NoteLabel: "Why is this final line such a significant rhetorical choice for a sitting president to make?",
      pass3Model: "The final line — \"And we shall overcome\" — deliberately borrows the title and refrain of the civil rights movement's own anthem, \"We Shall Overcome.\" For a sitting president to adopt the movement's own language, in a formal address to Congress, was a striking and controversial rhetorical choice at the time — it signaled that he was aligning the federal government with the protesters' cause rather than treating them as outside agitators.",
      modelPink: [4]
    },

    // ---- PASSAGE 3: REAL CONTENT — SCOTUS opinion (public domain) ----
    {
      title: "Shelley v. Kraemer",
      source: "Chief Justice Fred Vinson, opinion of the Court, Shelley v. Kraemer, 334 U.S. 1 (1948)",
      simplify: "Black families bought homes with racist rules attached to the property saying only white people could live there. The Supreme Court says the government can't just claim it's \"staying out of it\" — when courts actually enforce those racist rules, the government itself becomes responsible for the discrimination, and that violates the Fourteenth Amendment.",
      chunks: [
        "These are not cases, as has been suggested, in which the States have merely abstained from action, leaving private individuals free to impose such discriminations as they see fit.",
        "Rather, these are cases in which the States have made available to such individuals the full coercive power of government to deny to petitioners, on the grounds of race or color, the enjoyment of property rights in premises which petitioners are willing and financially able to acquire and which the grantors are willing to sell.",
        "The difference between judicial enforcement and nonenforcement of the restrictive covenants is the difference to petitioners between being denied rights of property available to other members of the community and being accorded full enjoyment of those rights on an equal footing.",
        "The rights created by the first section of the Fourteenth Amendment are, by its terms, guaranteed to the individual.",
        "The rights established are personal rights.",
        "It is, therefore, no answer to these petitioners to say that the courts may also be induced to deny white persons rights of ownership and occupancy on grounds of race or color."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that carry the Court's key holding.",
      pass1NoteLabel: "In one sentence, what does the Court actually decide here?",
      pass1Model: "The Court's key holding is here: it's not that the state simply stayed out of the way (state inaction), but that courts actively used the government's coercive power to enforce racial exclusion — and the practical result is that some residents get full property rights while others, denied that enforcement, don't.",
      modelYellow: [1, 2],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentences that show the Court's argumentative structure.",
      pass2NoteLabel: "How does the Court set up its argument, and where does it pivot to a new supporting idea?",
      pass2Model: "Notice the \"not X, rather Y\" structure that opens the passage — the Court explicitly rejects one framing (states just standing aside) before asserting the real one (states actively enabling discrimination). Later, the Court pivots to a new supporting idea: that Fourteenth Amendment rights belong to individuals personally, not groups — setting up the argument that follows.",
      modelBlue: [0, 3],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentences doing the most deliberate rhetorical work.",
      pass3NoteLabel: "What effect does the short sentence have here? What is the final sentence doing?",
      pass3Model: "After the long, technical sentence about coercive power, the Court drops in a short, blunt sentence: \"The rights established are personal rights.\" The brevity after a dense sentence gives it emphasis — it reads almost like a thesis statement dropped into the middle of the argument. And the final sentence directly anticipates and knocks down a counterargument (that covenants against white people could also be enforced), which is a common move in judicial opinions: naming the other side's best argument before dismantling it.",
      modelPink: [4, 5]
    },

    // ---- PASSAGE 4: REAL CONTENT — SCOTUS dissent (public domain) ----
    {
      title: "Murphy's Dissent in Korematsu v. United States",
      source: "Justice Frank Murphy, dissenting opinion, Korematsu v. United States, 323 U.S. 214 (1944)",
      simplify: "Justice Murphy argues that excluding Japanese Americans from the West Coast during WWII was simply racism dressed up in legal language. He argues that since every American traces their family back to somewhere else, but everyone is still fully American, everyone deserves the same constitutional rights — including Japanese Americans, who were being denied theirs.",
      chunks: [
        "I dissent, therefore, from this legalization of racism.",
        "Racial discrimination in any form and in any degree has no justifiable part whatever in our democratic way of life.",
        "It is unattractive in any setting, but it is utterly revolting among a free people who have embraced the principles set forth in the Constitution of the United States.",
        "All residents of this nation are kin in some way by blood or culture to a foreign land.",
        "Yet they are primarily and necessarily a part of the new and distinct civilization of the United States.",
        "They must, accordingly, be treated at all times as the heirs of the American experiment, and as entitled to all the rights and freedoms guaranteed by the Constitution."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that carry Murphy's central claim.",
      pass1NoteLabel: "In one sentence, what is Murphy's core argument?",
      pass1Model: "Murphy's central claim is stated as bluntly as possible: he's not just disagreeing with the ruling, he's calling it a \"legalization of racism,\" and asserting as an absolute principle that racial discrimination has zero justification in a democracy — no exceptions, \"in any form and in any degree.\"",
      modelYellow: [0, 1],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentences that build a logical, step-by-step argument.",
      pass2NoteLabel: "Walk through the logical steps Murphy takes to reach his conclusion.",
      pass2Model: "Notice the logical structure Murphy builds here — almost like a syllogism: everyone in America traces their roots to somewhere else (premise), yet everyone is nonetheless fully part of American civilization (second premise), therefore everyone must be treated as equal heirs to the same constitutional rights (conclusion). This structure is doing real argumentative work: it's designed to make the exclusion of Japanese Americans specifically feel like a violation of a principle that would apply to literally every American.",
      modelBlue: [3, 4, 5],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentence with the most deliberate escalation in word choice.",
      pass3NoteLabel: "Track the word choice in this sentence — how does the language escalate?",
      pass3Model: "Watch the escalating word choice: \"unattractive\" is a mild, almost understated word — then Murphy immediately intensifies it to \"utterly revolting.\" This escalation mirrors the moral outrage building throughout the passage, and \"utterly revolting\" is about as strong as judicial language gets in a Supreme Court opinion.",
      modelPink: [2]
    },

    // ---- PASSAGE 5: REAL CONTENT — generic federal legal template ----
    {
      title: "Federal Plea Agreement",
      source: "Generic federal plea agreement structure, based on standard language required under Rule 11 of the Federal Rules of Criminal Procedure. \"John Smith\" is a placeholder name for classroom purposes; this is not a real case.",
      simplify: "This document is the deal between a defendant and the federal government: the defendant agrees to plead guilty instead of going to trial, and in exchange, the government agrees to recommend a lighter sentence. The document also spells out exactly what rights the defendant is giving up, and warns that the judge doesn't have to accept the deal's sentencing recommendation.",
      chunks: [
        "UNITED STATES OF AMERICA v. JOHN SMITH — PLEA AGREEMENT (pursuant to Rule 11, Federal Rules of Criminal Procedure)",
        "The defendant agrees to plead guilty to Count One of the Information, charging a violation of federal law.",
        "By pleading guilty, the defendant knowingly and voluntarily waives the right to a trial by jury, the right to confront and cross-examine witnesses, and the right to remain silent at trial.",
        "The defendant agrees to cooperate fully and truthfully with the government in any ongoing investigation, including providing testimony if requested.",
        "In exchange for the defendant's guilty plea and cooperation, the government agrees to recommend a reduced sentence at sentencing.",
        "The defendant understands that the sentencing judge is not bound by this agreement and may impose any sentence up to the statutory maximum.",
        "The defendant waives the right to appeal the conviction and sentence, except on grounds of ineffective assistance of counsel or prosecutorial misconduct."
      ],
      pass1Prompt: "FIRST READ: Read the whole document once without marking anything. Then go back and highlight YELLOW the sentences that carry the actual deal being made.",
      pass1NoteLabel: "In one sentence, what is the core exchange this agreement describes?",
      pass1Model: "The actual deal here is simple: the defendant agrees to plead guilty (rather than go to trial) in exchange for the government recommending a reduced sentence. Everything else in the document exists to spell out the details and limits of that basic exchange.",
      modelYellow: [1, 4],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentences that structurally bookend the document.",
      pass2NoteLabel: "How does the document open and close, and why might it be organized that way?",
      pass2Model: "The document is structurally bookended: it opens by establishing its legal authority (Rule 11 of the Federal Rules of Criminal Procedure) and who the parties are, and closes by defining the limits of what the defendant gave up — specifically, the right to appeal. Between these two anchors sits the substance of the deal itself.",
      modelBlue: [0, 6],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentences where the legal language is doing careful, protective work.",
      pass3NoteLabel: "Pick one of these clauses. What is it protecting against, or what expectation is it managing?",
      pass3Model: "Notice how carefully each clause manages expectations and protects the government: the rights-waiver clause spells out precisely what's being given up (jury trial, confrontation, silence) rather than using vague language; the cooperation clause requires \"full and truthful\" cooperation, not just any cooperation; and the sentencing clause explicitly warns that the judge isn't bound by the agreement — protecting the government from a claim that it promised something it couldn't actually guarantee.",
      modelPink: [2, 3, 5]
    }
  ]

};

var CLOSEREADING_LEVEL3 = {
  passages: [
    // ---- PASSAGE 1: REAL CONTENT — SCOTUS majority opinion (public domain) ----
    {
      title: "Korematsu v. United States — Majority Opinion",
      source: "Justice Hugo Black, majority opinion, Korematsu v. United States, 323 U.S. 214 (1944)",
      simplify: "The Court says any law that targets one racial group is automatically suspicious and must pass the toughest legal test — but it can still be allowed if there's a genuine emergency need, though never just because of racism. The Court then argues Korematsu wasn't excluded from the West Coast because of hostility toward his race, but because military leaders feared invasion.",
      chunks: [
        "It should be noted, to begin with, that all legal restrictions which curtail the civil rights of a single racial group are immediately suspect.",
        "That is not to say that all such restrictions are unconstitutional.",
        "It is to say that courts must subject them to the most rigid scrutiny.",
        "Pressing public necessity may sometimes justify the existence of such restrictions; racial antagonism never can.",
        "Korematsu was not excluded from the Military Area because of hostility to him or his race.",
        "He was excluded because we are at war with the Japanese Empire, because the properly constituted military authorities feared an invasion of our West Coast."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that state the Court's core legal standard.",
      pass1NoteLabel: "In one sentence, what test does the Court say racial restrictions must pass?",
      pass1Model: "The core standard is set in the first and fourth sentences: restrictions targeting a racial group are automatically suspect and must survive the toughest judicial test, but that test can theoretically be passed by \"pressing public necessity\" — never by \"racial antagonism.\" This is the famous strict scrutiny standard, stated here for the first time in Supreme Court history.",
      modelYellow: [0, 3],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentence where the Court immediately qualifies or limits the claim it just made.",
      pass2NoteLabel: "How does the Court narrow its own opening statement?",
      pass2Model: "Notice how Black immediately qualifies his opening claim: right after saying racial restrictions are \"immediately suspect,\" he clarifies that this does NOT mean they're automatically unconstitutional — only that courts must scrutinize them heavily. State a strong principle, then immediately narrow it before it can be misread — that's a common move in judicial writing.",
      modelBlue: [1, 2],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentences where the Court applies its general standard to Korematsu's specific case.",
      pass3NoteLabel: "What specific justification does the Court give for excluding Korematsu?",
      pass3Model: "After establishing the abstract legal test, Black pivots to apply it to Korematsu specifically — and notice the word choice: he insists Korematsu wasn't excluded because of \"hostility to him or his race,\" but because of a specific military judgment about invasion risk. That distinction between motive and justification is the entire crux of why the dissents rejected the majority's reasoning.",
      modelPink: [4, 5]
    },

    // ---- PASSAGE 2: REAL CONTENT — SCOTUS concurrence (public domain) ----
    {
      title: "Jackson's Concurrence in Youngstown v. Sawyer",
      source: "Justice Robert H. Jackson, concurring opinion, Youngstown Sheet & Tube Co. v. Sawyer, 343 U.S. 579 (1952)",
      simplify: "Jackson lays out a framework still used today: presidential power is strongest when Congress backs the president, uncertain (a \"zone of twilight\") when Congress says nothing, and weakest when the president acts against Congress's wishes. He used this to conclude Truman's seizure of the steel mills fell into the weakest category.",
      chunks: [
        "In his concurring opinion in the Steel Seizure Case, Justice Robert Jackson set out a framework for evaluating presidential power that courts still use today.",
        "When the President acts pursuant to an express or implied authorization of Congress, his authority is at its maximum, for it includes all that he possesses in his own right plus all that Congress can delegate.",
        "When the President acts in absence of either a congressional grant or denial of authority, he can only rely upon his own independent powers, but there is a zone of twilight in which he and Congress may have concurrent authority, or in which its distribution is uncertain.",
        "When the President takes measures incompatible with the expressed or implied will of Congress, his power is at its lowest ebb, for then he can rely only upon his own constitutional powers minus any constitutional powers of Congress over the matter.",
        "Jackson applied this framework to conclude that President Truman's seizure of the steel mills fell into the third and weakest category, since Congress had already established a different process for handling labor disputes like this one."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that tell you what this framework is for and how it gets used.",
      pass1NoteLabel: "In one sentence, what is Jackson's three-part framework used to decide?",
      pass1Model: "This passage exists to set up a tool: the intro tells you Jackson created a framework still used today, and the final sentence shows the framework being applied to reach a real conclusion — Truman's seizure fell into the weakest category. Everything between is the framework itself.",
      modelYellow: [0, 4],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the two sentences that describe the clearest, most opposite ends of Jackson's spectrum.",
      pass2NoteLabel: "How are these two sentences structured to mirror each other?",
      pass2Model: "Jackson structures presidential power as a spectrum with two clear endpoints: when Congress explicitly backs the President (maximum power) and when Congress explicitly opposes the President (weakest power, \"lowest ebb\"). These two sentences use parallel construction — both open with \"When the President...\" and both explain why the power level follows logically from Congress's position.",
      modelBlue: [1, 3],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentence with the most deliberately vivid, non-legal language.",
      pass3NoteLabel: "What image or metaphor stands out, and why might Jackson have chosen it?",
      pass3Model: "The middle category is the one Jackson had to invent language for, since there's no simple label for \"Congress hasn't said anything.\" Notice the specific phrase he chose: \"zone of twilight\" — not a legal term at all, but a vivid metaphor suggesting something between clear day and clear night. That deliberate imprecision reflects the actual uncertainty of this middle category, where the outcome depends on circumstances rather than clear rules.",
      modelPink: [2]
    },

    // ---- PASSAGE 3: REAL CONTENT — declassified government document (public domain) ----
    {
      title: "The Pentagon Papers — Early U.S. Policy in Asia",
      source: "United States – Vietnam Relations, 1945–1967: A Study Prepared by the Department of Defense (\"The Pentagon Papers\"), Section I.A., U.S. Policy 1940-50",
      simplify: "The Pentagon Papers were a secret government history of U.S. involvement in Vietnam, leaked to the press in 1971. One section quotes a 1949 law in which Congress said it wanted to help \"free countries\" in Asia organize for mutual cooperation, tying the plan to the United Nations Charter and framing it as protecting rights and security.",
      chunks: [
        "The Pentagon Papers were a secret government history of U.S. involvement in Vietnam, later leaked to the press in 1971.",
        "One section of the study describes the reasoning behind a 1949 law that created America's first military assistance program in the Far East.",
        "Congress, in the opening paragraphs of that law, expressed itself as favoring the creation by the free countries and the free peoples of the Far East of a joint organization, consistent with the Charter of the United Nations.",
        "to establish a program of self-help and mutual cooperation designed to develop their economic and social well-being,",
        "to safeguard basic rights and liberties,",
        "and to protect their security and independence."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that tell you what document this is and what this section covers.",
      pass1NoteLabel: "In one sentence, what does this section of the Pentagon Papers describe?",
      pass1Model: "This passage first tells you what the Pentagon Papers are (a secret government history of Vietnam policy, later leaked) and what this specific section covers: the reasoning behind a 1949 law creating America's first military assistance program in the Far East. Everything after that is the actual language of that reasoning.",
      modelYellow: [0, 1],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the three phrases that form a parallel list within the same sentence.",
      pass2NoteLabel: "What three goals does the parallel list describe?",
      pass2Model: "Notice the three-part parallel structure embedded in the middle of this single sentence: \"to develop... to safeguard... to protect...\" Each phrase starts the same grammatical way (an infinitive verb) and lists a different goal. This kind of list of three parallel items is a common device in formal government writing — it makes a broad, vague goal sound like a precise, three-part plan.",
      modelBlue: [3, 4, 5],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentence with the most careful, hedged legal language.",
      pass3NoteLabel: "What word or phrase shows Congress being deliberately cautious?",
      pass3Model: "Read the specific formal language carefully: \"expressed itself as favoring the creation... consistent with the Charter of the United Nations.\" This is deliberately cautious, hedged language — Congress didn't commit to CREATING the organization, just to \"favoring\" its creation, and carefully tied it to an existing international framework rather than inventing new unilateral authority. This kind of careful hedging is typical of how governments write commitments that sound firm but leave room to maneuver.",
      modelPink: [2]
    },

    // ---- PASSAGE 4: REAL CONTENT — SCOTUS dissent (public domain) ----
    {
      title: "Marshall's Dissent in Regents of UC v. Bakke",
      source: "Justice Thurgood Marshall, separate opinion, Regents of the University of California v. Bakke, 438 U.S. 265 (1978)",
      simplify: "Marshall argues no individual Black American should have to prove they personally suffered discrimination, because racism has been so pervasive in American history that no one escaped its impact. He says this experience was different in kind, not just degree, from other groups' experiences.",
      chunks: [
        "Today's judgment ignores the fact that for several hundred years Negroes have been discriminated against not as individuals, but rather solely because of the color of their skins.",
        "It is unnecessary in 20th-century America to have individual Negroes demonstrate that they have been victims of racial discrimination.",
        "The racism of our society has been so pervasive that none, regardless of wealth or position, has managed to escape its impact.",
        "The experience of Negroes in America has been different in kind, not just in degree, from that of other ethnic groups.",
        "It is not merely the history of slavery alone, but also that a whole people were marked as inferior by the law.",
        "And that mark has endured."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that state Marshall's central claim.",
      pass1NoteLabel: "In one sentence, why does Marshall say individual proof of discrimination is unnecessary?",
      pass1Model: "Marshall's central claim is that no individual Black American should have to PROVE they personally experienced discrimination, because the racism of American society has been so total and pervasive that literally no one has escaped its impact, \"regardless of wealth or position.\" That's his core argument for why race-conscious remedies are justified.",
      modelYellow: [1, 2],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentences that build historical context before Marshall makes his key comparative claim.",
      pass2NoteLabel: "What comparison does Marshall draw between Black Americans' experience and other groups' experiences?",
      pass2Model: "Notice how Marshall builds his case: he first establishes historical context (discrimination based purely on skin color, not individual conduct), then makes a specific comparative claim — that this experience is different \"in kind, not just in degree\" from other ethnic groups' experiences. That distinction matters: he's not just saying Black Americans had it worse, he's saying the type of discrimination was categorically different.",
      modelBlue: [0, 3],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentence(s) where Marshall shifts to short, blunt sentences after longer ones.",
      pass3NoteLabel: "What effect does the sudden shift to short sentences create?",
      pass3Model: "After several longer, complex sentences, Marshall shifts to a short, blunt five-word sentence: \"And that mark has endured.\" The dramatic shortening after longer sentences creates emphasis — it reads almost like a verdict being delivered, landing harder because of how compressed it is compared to everything before it.",
      modelPink: [4, 5]
    },

    // ---- PASSAGE 5: REAL CONTENT — public domain speech (Douglass died 1895) ----
    {
      title: "Douglass, \"What to the Slave is the Fourth of July?\"",
      source: "Frederick Douglass, address to the Rochester Ladies' Anti-Slavery Society, Rochester, New York, July 5, 1852",
      simplify: "Douglass asks what the Fourth of July means to an enslaved person, then answers his own question: it's a painful reminder of injustice, not a celebration. He lists America's proudest ideas — liberty, greatness — and calls each one a sham for someone still enslaved, closing by insisting the holiday belongs to his free audience, not to him.",
      chunks: [
        "What, to the American slave, is your Fourth of July?",
        "I answer: a day that reveals to him, more than all other days in the year, the gross injustice and cruelty to which he is a constant victim.",
        "To him, your celebration is a sham; your boasted liberty, an unholy license; your national greatness, swelling vanity.",
        "This Fourth of July is yours, not mine.",
        "You may rejoice, I must mourn."
      ],
      pass1Prompt: "FIRST READ: Read the whole passage once without marking anything. Then go back and highlight YELLOW the sentences that state Douglass's central question and answer.",
      pass1NoteLabel: "In one sentence, what does Douglass say the Fourth of July means to an enslaved person?",
      pass1Model: "Douglass opens with a rhetorical question — one he already knows the answer to — and then answers it himself immediately: for the enslaved, July 4th isn't a celebration, it's a reminder of injustice. That question-and-immediate-answer structure is the engine of the whole passage.",
      modelYellow: [0, 1],
      pass2Prompt: "SECOND READ: Read again. Highlight BLUE the sentence that contains a list of three parallel accusations.",
      pass2NoteLabel: "What are the three things Douglass redefines, and what pattern do they follow?",
      pass2Model: "Notice the triple structure inside a single sentence: \"your celebration is a sham; your boasted liberty, an unholy license; your national greatness, swelling vanity.\" Three parallel accusations, each following the same pattern — a thing Americans are proud of, redefined as something ugly. This rapid-fire repetition builds momentum and makes the accusation feel relentless rather than like a single complaint.",
      modelBlue: [2],
      pass3Prompt: "THIRD READ: Read a third time. Highlight PINK the sentences built around a sharp \"you\" versus \"I\" contrast.",
      pass3NoteLabel: "How do these sentences use pronouns to draw a line between Douglass and his audience?",
      pass3Model: "The final two sentences are built entirely around the contrast between \"you\" and \"I\" (or \"yours\" and \"mine\"). \"This Fourth of July is yours, not mine\" and \"You may rejoice, I must mourn\" both use short, direct pronouns to draw the sharpest possible line between his audience's experience and his own — refusing to let them imagine he shares their celebration even a little.",
      modelPink: [3, 4]
    }
  ]
};



