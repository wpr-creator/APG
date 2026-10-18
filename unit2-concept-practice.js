(function () {
  "use strict";

  // Original practice items based on the congressional concepts in the supplied 2.1-2.2 booklet.
  // Items focus on distinct applications; recurring concepts are revisited in new contexts, not repeated prompts.
  const questions = [
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "A senator uses extended debate to delay a bill until its supporters agree to changes. Which Senate procedure is being used?", choices: ["A discharge petition", "A filibuster", "A conference committee", "A veto"], answer: 1, why: "A filibuster uses extended Senate debate to delay or block action. The House limits debate more tightly through its formal rules." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "A senator wants to end debate and move the chamber toward a vote. Which procedure should the senator support?", choices: ["Cloture", "Reapportionment", "A line-item veto", "A discharge petition"], answer: 0, why: "Cloture is the Senate procedure for ending debate, often to overcome a filibuster." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "Which feature best describes a standing committee in Congress?", choices: ["A temporary group formed only to reconcile two bill versions", "A permanent committee focused on a policy area", "A committee made up of members from both chambers that elects the president", "A group of advisers appointed by the president"], answer: 1, why: "Standing committees are continuing, subject-matter committees. They review bills and build expertise in policy areas." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "The House and Senate pass different versions of the same bill. What is the usual next step to resolve the differences?", choices: ["A conference committee works out a compromise", "The Supreme Court selects one version", "The president rewrites the bill", "The House Rules Committee votes for both chambers"], answer: 0, why: "A conference committee, with members from both chambers, negotiates a version that can return to the House and Senate for approval." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "Which House committee most directly determines the terms for floor debate and which amendments may be considered on many bills?", choices: ["Ways and Means", "Rules", "Agriculture", "Appropriations"], answer: 1, why: "The House Rules Committee sets debate conditions, including time limits and amendment rules, giving it substantial influence over the floor process." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "The Speaker’s floor team is coordinating the majority party’s schedule and building support for upcoming House votes. Which leader most directly manages that floor work?", choices: ["The House majority leader", "The Senate president pro tempore", "The vice president", "The House minority whip"], answer: 0, why: "The House majority leader helps shape the majority party’s legislative agenda and coordinates floor work with the Speaker." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "What is a central role of a party whip in either chamber?", choices: ["Preside over impeachment trials", "Count votes and encourage party members to support the party’s position", "Decide whether laws are constitutional", "Appoint committee chairs in the other chamber"], answer: 1, why: "Whips track likely votes and communicate with members to build support for party priorities." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "Why do committees help Congress process legislation?", choices: ["They replace elections as the source of congressional authority", "They let members develop expertise and examine bills in detail", "They prevent the public from learning about proposed laws", "They guarantee that every bill reaches the floor"], answer: 1, why: "The committee system divides a large workload and lets members develop policy expertise. Committees can also hold hearings, revise bills, or decline to advance them." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "A committee investigates whether a federal agency is carrying out a law as Congress intended. This is an example of Congress using its", choices: ["oversight function", "treaty power", "judicial review", "executive privilege"], answer: 0, why: "Congress uses oversight to monitor how the executive branch and federal agencies implement laws." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "Which statement best describes how seniority can affect committee leadership?", choices: ["The Constitution guarantees each chamber’s longest-serving member a chair", "Senior members of the majority party are often considered for chair roles, but the process is not an automatic constitutional rule", "The president appoints committee chairs", "The minority party always chairs the largest committees"], answer: 1, why: "Seniority has often influenced committee leadership, especially among majority-party members, but the Constitution does not require the most senior member to become chair." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "Which member is generally eligible to chair a House committee under the chamber’s party organization?", choices: ["A member of the majority party selected under House rules", "A senator appointed by the president", "The most senior member of the minority party by constitutional requirement", "The House minority whip automatically"], answer: 0, why: "House committee chairs are selected from the majority party under the chamber’s organizational rules. Seniority may matter, but it does not automatically determine the chair." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "Congress creates a national agency to set workplace safety standards, linking the law to its authority over interstate commerce. Which constitutional idea supports this action?", choices: ["Implied powers through the Necessary and Proper Clause", "The Senate’s treaty power", "The House’s impeachment power", "The president’s pardon power"], answer: 0, why: "Congress may use implied powers—authority reasonably connected to enumerated powers—to carry out its constitutional responsibilities. The Necessary and Proper Clause supports laws that implement enumerated powers." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "Which comparison of representation in the House and Senate is accurate?", choices: ["Each state has equal representation in both chambers", "House representation is based on state population, while each state has two senators", "House seats are based on population, while Senate seats are based on land area", "The Senate represents districts and the House represents entire states"], answer: 1, why: "House seats are apportioned among states by population. The Senate gives each state equal representation with two senators." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "Why is a House member’s constituency generally smaller than a senator’s constituency?", choices: ["House members are elected by a state’s entire population", "House seats are divided among a state’s population, while senators represent the whole state", "House members are appointed by local governments", "Senators represent only the largest city in a state"], answer: 1, why: "Each representative serves a congressional district. Each senator represents the whole state." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A bill to raise federal revenue is introduced in Congress. Where must it begin under the Constitution?", choices: ["The Senate", "The House of Representatives", "A conference committee", "The president’s Cabinet"], answer: 1, why: "The Constitution requires bills for raising revenue to originate in the House, though the Senate may propose or concur with amendments." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "Which power belongs specifically to the Senate?", choices: ["Initiating revenue bills", "Confirming many presidential appointments", "Introducing articles of impeachment", "Setting debate rules for the House"], answer: 1, why: "The Senate has a constitutional role in confirming many presidential nominees. The House initiates revenue bills and impeachments." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "The House votes to impeach a federal official. Which chamber conducts the trial?", choices: ["The Senate", "The Supreme Court", "The House Rules Committee", "The Cabinet"], answer: 0, why: "The House has the sole power to impeach; the Senate has the sole power to try impeachments." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "Which chamber is more likely to rely on formal limits on debate because it has many more members?", choices: ["The House", "The Senate", "Both chambers are constitutionally required to use identical debate rules", "Neither chamber may set debate rules"], answer: 0, why: "The House’s larger membership makes structured debate rules important. Senate debate is generally less restricted, which gives individual senators more opportunity to delay action." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A senator argues that a bill should be delayed unless its supporters address the minority’s concerns. Which institutional feature gives the senator more leverage than a House member?", choices: ["The Senate’s tradition of extended debate", "The Senate’s power to originate revenue bills", "The House’s larger constituencies", "The Senate’s power to appoint committee chairs in the House"], answer: 0, why: "The Senate’s extended-debate tradition allows a determined minority to delay action. Cloture can be used to end debate." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "Which pairing correctly matches a chamber with one of its constitutional responsibilities?", choices: ["House — confirms presidential appointments", "Senate — tries impeachments", "House — ratifies treaties", "Senate — originates revenue bills"], answer: 1, why: "The Senate tries impeachments. The Senate also confirms nominees and consents to treaties; revenue bills begin in the House." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A legislator wants to bring a bill out of committee despite opposition from its chair. Which House procedure may help force a bill to the floor?", choices: ["A discharge petition", "Cloture", "A pocket veto", "A conference report"], answer: 0, why: "A discharge petition can bring a measure out of committee when enough House members sign it, bypassing the committee chair’s control." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A representative secures federal funding for a local bridge project and highlights it to district voters. Which concept best describes this strategy?", choices: ["Pork-barrel politics", "Judicial review", "Cloture", "Executive agreement"], answer: 0, why: "Pork-barrel politics directs government spending toward projects intended to benefit a member’s district or state, often helping the member demonstrate service to constituents." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "A representative agrees to support a colleague’s transportation bill after the colleague promises to support a farm bill. Which practice does this illustrate?", choices: ["Logrolling", "Oversight", "Cloture", "Reapportionment"], answer: 0, why: "Logrolling is an exchange of legislative support: members agree to back one another’s proposals, often to build coalitions for measures important to their constituencies." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "A bill would create federal workplace safety standards. Members of which congressional body are most likely to examine the bill’s details and hear from specialists before it reaches the floor?", choices: ["A relevant standing committee or subcommittee", "The Electoral College", "The Cabinet", "A federal court of appeals"], answer: 0, why: "Standing committees and their subcommittees handle policy areas over time. Hearings and detailed review let members gather information and revise proposals." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "The majority party holds more seats on a committee than the minority party. What is the strongest explanation for this arrangement?", choices: ["The majority party organizes the chamber and generally controls committee assignments and proportions", "The Constitution requires equal numbers from every state", "The president appoints a majority of committee members", "The Supreme Court assigns members based on seniority"], answer: 0, why: "Congress organizes its committees through chamber and party rules. The majority party typically has more seats, which helps it shape the legislative agenda and committee decisions." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "After a federal law takes effect, a committee asks agency officials to explain delays in carrying it out. What congressional responsibility is demonstrated?", choices: ["Oversight of implementation", "Ratification of a treaty", "Confirmation of a nominee", "Judicial review"], answer: 0, why: "Congressional oversight monitors how agencies implement laws and can investigate whether administration matches legislative intent." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "A senator from the minority party leads negotiations and communicates the party’s response to the majority’s agenda. Which role is the senator performing?", choices: ["Minority leader", "President pro tempore", "Committee clerk", "House Speaker"], answer: 0, why: "The minority leader coordinates the minority party’s strategy and represents its position in chamber negotiations." },
    { lesson: "TOPIC 2.1 · CONGRESSIONAL STRUCTURE", prompt: "A member of Congress publicly criticizes an agency’s decision and requests documents about how it applied a law. Which explanation best describes how committee work can support this action?", choices: ["Committee oversight can gather information and hold the executive branch accountable", "Committees can reverse court decisions directly", "Committees exercise the president’s appointment power", "Committee membership gives Congress authority to ignore statutes"], answer: 0, why: "Committees use hearings, investigations, and requests for information to oversee agencies and scrutinize how laws are administered." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A state gains population relative to other states after a census. Which change is most directly connected to that shift?", choices: ["Its share of House seats may increase through reapportionment", "It receives an additional Senate seat automatically", "Its senators gain longer terms", "Its House districts are eliminated"], answer: 0, why: "House seats are reapportioned among states according to population after the census. Every state continues to have two senators." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A senator argues that a statewide coalition matters more than the preferences of one district. Which feature of the Senate best explains this perspective?", choices: ["Each senator represents the entire state", "Senators are appointed by state legislatures", "Senators serve without elections", "Each state’s Senate delegation is proportional to its population"], answer: 0, why: "Senators are elected to represent their whole state, while House members represent individual districts." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A bill passes the House, but the Senate does not take it up before the session ends. Which statement best reflects the usual fate of legislation in Congress?", choices: ["Many introduced bills never reach final passage", "The bill automatically becomes law after House passage", "The Supreme Court must schedule a vote", "The president must rewrite and submit it"], answer: 0, why: "The legislative process has many points where proposals can stall. Most introduced bills do not pass both chambers and become law." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A senator opposes a bill that has majority support but wants to delay a final vote. What action could the senator take, and what could supporters do in response?", choices: ["Use extended debate; supporters may seek cloture", "File a discharge petition; supporters may seek a veto", "Request House Rules Committee action; supporters may seek oversight", "Call a conference committee; supporters may seek impeachment"], answer: 0, why: "Extended Senate debate can delay a vote. Supporters may invoke cloture to limit debate and move toward a vote." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "Which statement best explains why the House can usually structure debate more tightly than the Senate?", choices: ["The House uses formal rules and leadership procedures to manage a much larger membership", "The House has fewer members and therefore needs no procedures", "The Constitution requires the Senate to approve every House debate rule", "House members represent whole states"], answer: 0, why: "The House’s size makes formal rules useful for scheduling and structuring debate. Senate procedure generally gives individual senators more room to participate and delay action." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A House member wants to amend a bill during floor debate, but the special rule permits only a narrow set of amendments. Which institution most directly established that limit?", choices: ["The House Rules Committee", "The Senate Finance Committee", "A conference committee", "The vice president"], answer: 0, why: "The House Rules Committee often sets the terms for floor consideration, including time limits and whether amendments are allowed." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A senator votes on a presidential cabinet nominee, while a representative does not vote on that confirmation. Which constitutional arrangement explains the difference?", choices: ["The Senate confirms many presidential appointments", "The House confirms nominees only during election years", "The president shares confirmation votes with the Supreme Court", "Both chambers must confirm every nominee separately"], answer: 0, why: "The Senate has the constitutional advice-and-consent role for many presidential appointments, including cabinet nominees." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "Which sequence correctly describes the chambers’ roles when a federal official is impeached?", choices: ["The House approves articles of impeachment; the Senate conducts the trial", "The Senate approves articles of impeachment; the House conducts the trial", "The House conducts the trial; the Supreme Court approves removal", "The president impeaches; Congress conducts a joint trial"], answer: 0, why: "The House has the power to impeach by approving articles; the Senate tries the impeachment and decides whether to convict." },
    { lesson: "TOPIC 2.2 · HOUSE AND SENATE", prompt: "A proposal would impose a new federal tax. A senator offers an amendment to that proposal after it reaches the Senate. Which statement is accurate?", choices: ["The bill must originate in the House, but the Senate may amend it", "The Senate cannot consider any revenue bill", "The bill must originate in the Senate and be approved by the House unchanged", "The president must introduce the bill"], answer: 0, why: "The Constitution requires revenue bills to originate in the House, while allowing the Senate to propose or concur with amendments." }
  ];

  function shuffle(items) {
    const shuffled = [...items];
    for (let current = shuffled.length - 1; current > 0; current -= 1) {
      const swapIndex = crypto.getRandomValues(new Uint32Array(1))[0] % (current + 1);
      [shuffled[current], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[current]];
    }
    return shuffled;
  }

  function buildSessionQuestions() {
    return shuffle(questions).map(item => {
      const correctChoice = item.choices[item.answer];
      const choices = shuffle(item.choices);
      return { ...item, choices, answer: choices.indexOf(correctChoice) };
    });
  }

  let sessionQuestions = buildSessionQuestions();
  let index = 0;
  let score = 0;
  let answered = false;
  const $ = selector => document.querySelector(selector);

  function render() {
    answered = false;
    const item = sessionQuestions[index];
    $("#progress-copy").textContent = `QUESTION ${index + 1} OF ${sessionQuestions.length}`;
    $("#score-copy").textContent = `${score} CORRECT`;
    $(".progress-track").setAttribute("aria-valuenow", String(index));
    $("#progress-fill").style.width = `${(index / sessionQuestions.length) * 100}%`;
    $("#lesson-tag").textContent = item.lesson;
    $("#question-title").textContent = item.prompt;
    $("#feedback").hidden = true;
    $("#next-question").hidden = true;
    const choices = $("#choices");
    choices.replaceChildren();
    item.choices.forEach((choice, choiceIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = choice;
      button.addEventListener("click", () => answer(choiceIndex));
      choices.append(button);
    });
  }

  function answer(choiceIndex) {
    if (answered) return;
    answered = true;
    const item = sessionQuestions[index];
    const correct = choiceIndex === item.answer;
    if (correct) score += 1;
    Array.from($("#choices").children).forEach((button, buttonIndex) => {
      button.disabled = true;
      if (buttonIndex === item.answer) button.classList.add(choiceIndex === item.answer ? "selected-correct" : "reveal-correct");
      if (buttonIndex === choiceIndex && !correct) button.classList.add("selected-wrong");
    });
    $("#score-copy").textContent = `${score} CORRECT`;
    $("#feedback-result").textContent = correct ? "YES — THAT IS THE BEST ANSWER." : `BEST ANSWER: ${item.choices[item.answer].toUpperCase()}`;
    $("#feedback-copy").textContent = item.why;
    $("#feedback").hidden = false;
    $("#next-question").textContent = index === sessionQuestions.length - 1 ? "SEE RESULTS →" : "NEXT QUESTION →";
    $("#next-question").hidden = false;
    $("#next-question").focus();
  }

  function next() {
    if (index < sessionQuestions.length - 1) {
      index += 1;
      render();
      $("#question-title").focus();
      return;
    }
    $(".practice-card").hidden = true;
    $("#results").hidden = false;
    $("#final-score").textContent = `${score} OF ${sessionQuestions.length} CORRECT`;
    $(".progress-track").setAttribute("aria-valuenow", String(sessionQuestions.length));
    $("#progress-fill").style.width = "100%";
    $("#results").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function restart() {
    sessionQuestions = buildSessionQuestions();
    index = 0;
    score = 0;
    $("#results").hidden = true;
    $(".practice-card").hidden = false;
    render();
    $(".practice-card").scrollIntoView({ behavior: "auto" });
  }

  $("#next-question").addEventListener("click", next);
  $("#restart").addEventListener("click", restart);
  render();
})();
