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
    { text: "\"In 2022, over $4 billion was spent on federal lobbying.\"", answer: "evidence", explain: "This is EVIDENCE -- it's a specific, checkable dollar figure." }
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
    }
  ]
};


// ════════════════════════════════════════════════════════════════
//  SKILL BUILDERS — ACADEMIC VOCABULARY IN CONTEXT
// ════════════════════════════════════════════════════════════════

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
  ]
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
  ]
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
  ]
};



