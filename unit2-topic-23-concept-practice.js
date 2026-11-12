(function () {
  "use strict";

  // Original AP-style application questions for Topic 2.3, based on the 2.2 "Whose Congress?" guided notes.
  const questions = [
    {
      lesson: "TOPIC 2.3 · REPRESENTATION",
      prompt: "A representative studies district polling before voting on a housing bill and chooses the position favored by most constituents, even though the representative personally disagrees. Which model of representation best describes this choice?",
      source: { label: "Scenario", text: "In a district survey, 68% of respondents oppose a proposed housing project. The representative has said the project could help address a regional housing shortage but votes against it after reviewing the survey." },
      choices: ["Delegate", "Trustee", "Politico", "Party whip"],
      answer: 0,
      why: "A delegate follows constituents’ expressed preferences. A trustee relies more on independent judgment; a politico may use either approach depending on the issue."
    },
    {
      lesson: "TOPIC 2.3 · REPRESENTATION",
      prompt: "A representative votes for a disaster-relief bill after concluding that it serves the national interest, despite strong opposition from some constituents. Which model best describes the representative’s reasoning?",
      choices: ["Delegate, because the member follows a public poll", "Trustee, because the member uses independent judgment", "Politico, because the member follows a party leader", "Whip, because the member counts votes"],
      answer: 1,
      why: "A trustee uses independent judgment, even when some constituents disagree. The scenario does not say that the member is following a party leader or counting votes."
    },
    {
      lesson: "TOPIC 2.3 · REPRESENTATION",
      prompt: "A senator follows constituent preferences on a widely discussed local issue but relies on personal policy expertise on a technical national-security bill. Which model best fits this combination?",
      choices: ["Delegate in both cases", "Trustee in both cases", "Politico, adjusting the approach by issue", "Partisan, voting with the majority party"],
      answer: 2,
      why: "A politico combines delegate and trustee approaches, changing emphasis with the issue or situation."
    },
    {
      lesson: "TOPIC 2.3 · DISTRICTS AND ELECTIONS",
      prompt: "The census shows that State A gained population relative to other states. After the number of House seats assigned to each state is recalculated, State A redraws the boundaries of its districts. Which statement correctly identifies the two steps?",
      table: { caption: "Changes after a census", headers: ["Step", "What changes"], rows: [["1", "The number of House seats assigned to each state"], ["2", "The boundaries of districts within a state"]] },
      choices: ["Step 1 is redistricting; Step 2 is reapportionment", "Step 1 is reapportionment; Step 2 is redistricting", "Both steps are reapportionment", "Both steps are gerrymandering"],
      answer: 1,
      why: "Reapportionment redistributes House seats among states based on population. Redistricting redraws district boundaries within a state."
    },
    {
      lesson: "TOPIC 2.3 · DISTRICTS AND ELECTIONS",
      prompt: "A mapmaking committee splits a neighborhood whose voters usually support the same party among several districts. What is the most likely purpose and effect of this strategy?",
      choices: ["Packing, concentrating those voters so they win more districts", "Cracking, dividing those voters to weaken their influence", "Reapportionment, shifting seats from one party to another", "Oversight, monitoring how election laws are enforced"],
      answer: 1,
      why: "Cracking divides a group of voters across multiple districts so they are less likely to form a winning majority in any one district. Packing concentrates them in fewer districts."
    },
    {
      lesson: "TOPIC 2.3 · DISTRICTS AND ELECTIONS",
      prompt: "A district’s population is far larger than neighboring districts, so each of its residents has less influence over the choice of a representative. Which constitutional principle is most directly relevant to a challenge based on unequal representation?",
      choices: ["Equal protection under the Fourteenth Amendment", "The First Amendment right to petition Congress", "The Tenth Amendment reservation of state powers", "The Senate’s advice-and-consent power"],
      answer: 0,
      why: "The Equal Protection Clause of the Fourteenth Amendment provides a basis for challenging some district maps that produce unequal representation."
    },
    {
      lesson: "TOPIC 2.3 · REQUIRED CASE · BAKER v. CARR",
      prompt: "Tennessee had not updated its state legislative districts as population shifted. Voters argued that residents of some districts had much less influence than residents elsewhere. Which result followed from Baker v. Carr (1962)?",
      source: { label: "Case summary", text: "Baker v. Carr (1962): The Supreme Court held that federal courts could hear an equal-protection challenge to legislative districting." },
      choices: ["Federal courts may hear certain equal-protection districting claims", "Every state district map must use the same geographic boundaries", "Congress must redraw state legislative districts after each census", "Any districting dispute is reserved exclusively to state lawmakers"],
      answer: 0,
      why: "Baker made federal court review of certain districting challenges possible. It opened the courthouse door; it did not itself establish the one-person, one-vote rule."
    },
    {
      lesson: "TOPIC 2.3 · REQUIRED CASE · BAKER v. CARR",
      prompt: "Which conclusion about Baker v. Carr is best supported by the case summary?",
      source: { label: "Case summary", text: "The Court ruled that federal courts could consider voters’ equal-protection claims about legislative districts. It did not decide that every state map was unconstitutional." },
      choices: ["The Court allowed the type of claim to be heard", "The Court required every district to have identical shape", "The Court declared all state district maps invalid", "The Court transferred redistricting power to Congress"],
      answer: 0,
      why: "Baker addressed whether federal courts could hear an equal-protection districting challenge. It did not automatically invalidate all maps or dictate their shapes."
    },
    {
      lesson: "TOPIC 2.3 · REQUIRED CASE · SHAW v. RENO",
      prompt: "Voters challenged an unusually shaped North Carolina congressional district, arguing that race had been the main factor in drawing its boundaries. Which principle did Shaw v. Reno (1993) apply?",
      source: { label: "Case summary", text: "Shaw v. Reno (1993): The Court allowed voters’ Fourteenth Amendment equal-protection claim about race and district boundaries to proceed." },
      choices: ["Race-based districting may raise an equal-protection question", "Any majority-minority district violates the Constitution", "Federal courts cannot review racial classifications in maps", "Congressional districts must follow county boundaries"],
      answer: 0,
      why: "Shaw allowed the voters’ equal-protection claim to proceed because race had allegedly driven the district’s design. It did not hold that every majority-minority district is unconstitutional."
    },
    {
      lesson: "TOPIC 2.3 · CASE COMPARISON",
      prompt: "Which comparison accurately distinguishes Baker v. Carr from Shaw v. Reno?",
      table: { caption: "Two equal-protection districting cases", headers: ["Case", "Issue highlighted"], rows: [["Baker v. Carr", "Whether federal courts may hear an unequal-representation claim"], ["Shaw v. Reno", "Whether race drove district boundaries in a way that raises an equal-protection claim"]] },
      choices: ["Baker concerns court access; Shaw concerns race in drawing district lines", "Baker bans racial classifications; Shaw sets district population totals", "Baker assigns House seats; Shaw transfers that power to the Senate", "Both cases require states to use independent redistricting commissions"],
      answer: 0,
      why: "Baker established that federal courts can hear certain equal-protection districting claims. Shaw concerned an equal-protection claim about the use of race in drawing a district."
    },
    {
      lesson: "TOPIC 2.3 · DISTRICTS AND ELECTIONS",
      prompt: "A representative in a district where one party is strongly favored faces little competition in the general election. Which effect is most likely?",
      choices: ["The representative may feel less pressure to appeal beyond the party’s base", "The district automatically receives an additional House seat", "The representative becomes accountable to voters in every state", "The district’s map is automatically ruled unconstitutional"],
      answer: 0,
      why: "A safe seat may reduce electoral competition and the incentive to respond to voters outside the member’s strongest base. A safe seat alone does not prove that a map is unconstitutional."
    },
    {
      lesson: "TOPIC 2.3 · ELECTORAL INCENTIVES",
      prompt: "A House member emphasizes constituent service and publicizes district projects shortly before an election. Which factor most directly helps explain this behavior?",
      choices: ["The desire for reelection", "The Senate’s treaty power", "The courts’ power of judicial review", "The census requirement to count residents"],
      answer: 0,
      why: "House members face voters every two years, so reelection incentives can shape their public messages, priorities, and votes."
    },
    {
      lesson: "TOPIC 2.3 · PARTIES AND VOTING",
      prompt: "A party leader urges members to support a bill, while many voters in one member’s district oppose it. What does the disagreement illustrate about congressional behavior?",
      choices: ["Party leaders can direct a member’s vote by constitutional authority", "Members may weigh party goals against constituent views", "Constituent preferences automatically control every vote", "Party affiliation determines a district’s population"],
      answer: 1,
      why: "Members may weigh party goals, constituent preferences, and their own judgment. Party leaders can influence members, but they do not cast members’ votes for them."
    },
    {
      lesson: "TOPIC 2.3 · PARTIES AND VOTING",
      prompt: "A legislator votes with the party on nearly every major bill, even when some district voters prefer a different position. Which concept most directly describes the voting pattern?",
      choices: ["Partisan voting", "Reapportionment", "Trustee representation", "Divided government"],
      answer: 0,
      why: "Partisan voting means voting based on party affiliation. Polarization describes a broader widening ideological gap between parties."
    },
    {
      lesson: "TOPIC 2.3 · PARTIES AND VOTING",
      prompt: "Over time, lawmakers in the two parties become more ideologically distant, and compromise becomes harder. Which concept best describes the broader change?",
      choices: ["Polarization", "Reapportionment", "Constituency service", "Impeachment"],
      answer: 0,
      why: "Polarization is the movement of political attitudes toward ideological extremes and the widening gap between parties. It can make compromise more difficult."
    },
    {
      lesson: "TOPIC 2.3 · FOUNDATIONAL DOCUMENT",
      prompt: "Madison argues that factions arise when people share interests and may pursue them at others’ expense. Which application best fits his concern in the context of Congress?",
      source: { label: "Adapted summary of Federalist No. 10", text: "A faction is a group of citizens united by a shared interest or passion that may conflict with the rights of others or the long-term public good." },
      choices: ["Members may face competing organized interests when making policy", "Every interest group must be represented by one senator", "Factions disappear when representatives serve longer terms", "Congress can prevent disagreement by ending elections"],
      answer: 0,
      why: "Madison’s concern about factions helps explain why representatives weigh competing interests. Terms such as polarization and gerrymandering describe modern political patterns, not Madison’s own wording."
    },
    {
      lesson: "TOPIC 2.3 · DIVIDED GOVERNMENT",
      prompt: "The president’s party does not control either chamber of Congress. Members of the opposing party block several proposals, but lawmakers negotiate and pass a compromise bill. Which conclusion is best supported?",
      choices: ["Divided government can make agreement harder without making gridlock inevitable", "Divided government requires Congress to reject every presidential proposal", "The compromise proves that one party controls all branches", "Gridlock occurs whenever the president and Congress disagree"],
      answer: 0,
      why: "Divided government can intensify disagreement, but members may still negotiate or form coalitions. Gridlock occurs when a lack of consensus prevents Congress from acting."
    },
    {
      lesson: "TOPIC 2.3 · DIVIDED GOVERNMENT",
      prompt: "An outgoing president near the end of the term asks the Senate to confirm a nominee. Senators from the opposing party delay action, and the nominee is not considered. Which pair of concepts best describes the context and possible institutional result?",
      choices: ["Lame-duck presidency and potential gridlock", "Reapportionment and redistricting", "Delegate representation and logrolling", "Federalism and judicial review"],
      answer: 0,
      why: "A lame duck is an outgoing president nearing the end of the term. If disagreement prevents government action, it may contribute to gridlock; opposition alone does not always produce it."
    },
    {
      lesson: "TOPIC 2.3 · BAKER v. CARR",
      prompt: "Each district elects one state representative. Which inference best supports the voters’ claim?",
      choices: [
        "Residents of the smaller district have less influence per person.",
        "Residents of the larger district have less influence per person.",
        "Each resident has equal influence because each district elects one member.",
        "Residents of the larger district are entitled to a second U.S. senator."
      ],
      answer: 1,
      why: "When both districts elect one representative, more residents share that seat in the larger district. That disparity explains the Equal Protection claim in Baker, which the Court allowed federal courts to hear.",
      table: {
        caption: "Hypothetical state legislative districts",
        headers: [
          "District",
          "Residents",
          "Seats"
        ],
        rows: [
          [
            "River",
            "40,000",
            "1"
          ],
          [
            "Harbor",
            "160,000",
            "1"
          ]
        ]
      }
    },
    {
      lesson: "TOPIC 2.3 · BAKER v. CARR",
      prompt: "A judge dismisses a state districting challenge solely because drawing districts is political. Which argument best uses Baker?",
      choices: [
        "Federal judges should draw every map after a census.",
        "State courts must review all maps before an election.",
        "A districting dispute can present a claim federal courts may hear.",
        "Any political dispute automatically belongs in federal court."
      ],
      answer: 2,
      why: "Baker allowed a specific Equal Protection claim to proceed despite its political setting. It neither mandated a new map nor made every political dispute justiciable."
    },
    {
      lesson: "TOPIC 2.3 · DISTRICT BOUNDARIES",
      prompt: "The table describes two versions of a district. Which inference is best supported by the boundary changes alone?",
      choices: [
        "The state gained a House seat through reapportionment.",
        "Race was the main factor in the mapmakers’ decisions.",
        "Federal courts are required to strike down the new map.",
        "The changes may strengthen Party A’s position in the district."
      ],
      answer: 3,
      why: "Replacing a Party B area with a Party A area can make the district safer for Party A. The table does not establish a racial motive or constitutional violation. Baker opened review of certain equal-protection claims, while Rucho limits federal constitutional claims of partisan gerrymandering.",
      table: {
        caption: "Hypothetical before-and-after map, described by precinct",
        headers: [
          "Precinct",
          "Voting tendency",
          "Before",
          "After"
        ],
        rows: [
          [
            "Central",
            "Party A",
            "Inside",
            "Inside"
          ],
          [
            "South",
            "Party B",
            "Inside",
            "Outside"
          ],
          [
            "North",
            "Party A",
            "Outside",
            "Inside"
          ]
        ]
      }
    },
    {
      lesson: "TOPIC 2.3 · SHAW v. RENO",
      prompt: "A district is compact and has a Latino majority. Meeting records show the commission split cities to meet a racial target. Which fact most directly supports a Shaw claim?",
      choices: [
        "Latino residents make up a majority of the district.",
        "The district was redrawn after the latest census.",
        "The commission subordinated ordinary criteria to a racial target.",
        "The district’s overall shape is compact."
      ],
      answer: 2,
      why: "The key inquiry is whether race predominated over ordinary criteria. A majority-minority population or an unusual shape can be evidence in context, but neither automatically determines the result."
    },
    {
      lesson: "TOPIC 2.3 · SHAW v. RENO",
      prompt: "Which issue best distinguishes the North Carolina voters’ allegation in Shaw from the Tennessee voters’ allegation in Baker?",
      choices: [
        "How heavily race influenced the placement of boundaries",
        "How many state residents shared a legislative seat",
        "Whether a state gained seats after reapportionment",
        "Whether a representative followed constituent preferences"
      ],
      answer: 0,
      why: "Shaw concerned race in drawing congressional boundaries. Baker concerned population disparities among state legislative districts and whether courts could hear the claim."
    },
    {
      lesson: "TOPIC 2.3 · CASE COMPARISON",
      prompt: "Which statement best explains how precedent connects the two decisions?",
      choices: [
        "Wesberry applied Baker’s ruling that all districts must have equal populations.",
        "Wesberry followed Baker on court review and separately decided the population issue.",
        "Wesberry overruled Baker by barring federal courts from hearing districting cases.",
        "Wesberry applied Baker’s strict-scrutiny rule to Georgia’s population disparities."
      ],
      answer: 1,
      why: "Stare decisis means following precedent on a legal issue. Wesberry relied on Baker to treat the challenge as justiciable. Its population rule for U.S. House districts rested on Article I, Section 2.",
      source: {
        label: "Supplied case · Wesberry v. Sanders (1964)",
        text: "Georgia voters challenged population disparities among U.S. House districts. The Court decided that courts could hear the claim, then held that House districts must be as equal in population as practicable under Article I, Section 2."
      }
    },
    {
      lesson: "TOPIC 2.3 · CASE COMPARISON",
      prompt: "Which comparison best distinguishes what the Court did in Shaw and Bush?",
      choices: [
        "Both rulings upheld the maps because the Voting Rights Act controlled.",
        "Shaw resolved the map’s validity; Bush ruled only that voters could sue.",
        "Shaw allowed the claim to proceed; Bush upheld invalidation of the challenged districts.",
        "Both rulings required every majority-minority district to be redrawn."
      ],
      answer: 2,
      why: "Both decisions address Equal Protection and race in districting. Shaw let the claim go forward. Bush upheld the judgment that the Texas districts failed strict scrutiny.",
      source: {
        label: "Supplied case · Bush v. Vera (1996)",
        text: "Texas drew congressional districts using detailed racial data and departed from ordinary boundary criteria. The Supreme Court upheld the lower court’s judgment that three districts violated Equal Protection."
      }
    },
    {
      lesson: "TOPIC 2.3 · STRICT SCRUTINY",
      prompt: "A court finds that race predominated in drawing a district. What must the state show for the district to survive strict scrutiny?",
      choices: [
        "A legitimate goal and a rational connection between the goal and the map",
        "An important goal and a substantial connection between the goal and the map",
        "A compelling goal and a map narrowly tailored to achieve that goal",
        "A statewide majority and approval by both chambers of the legislature"
      ],
      answer: 2,
      why: "Strict scrutiny requires a compelling governmental interest and narrow tailoring. A state’s stated goal alone does not establish that its use of race was justified."
    },
    {
      lesson: "TOPIC 2.3 · JUDICIAL REVIEW",
      prompt: "After a federal court agrees to hear an unequal-representation claim, legislators argue judges should leave map disputes to elected officials. What institutional tension does this illustrate?",
      choices: [
        "Federal review versus lawmakers’ discretion in drawing districts",
        "Presidential veto power versus the Senate’s confirmation power",
        "State lawmaking versus the federal power to conduct the census",
        "Party leadership versus a representative’s independent judgment"
      ],
      answer: 0,
      why: "Baker opened a route for judicial review of certain constitutional claims about maps drawn by legislatures. That raised questions about the judicial role without deciding that Tennessee must redraw its map."
    }
  ];

  window.startConceptPractice(questions);
})();
