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
    }
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

  function renderStimulus(item) {
    const container = $("#question-stimulus");
    container.replaceChildren();
    container.hidden = !item.table && !item.source;
    if (item.table) {
      const table = document.createElement("table");
      const caption = document.createElement("caption");
      caption.textContent = item.table.caption;
      table.append(caption);
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      item.table.headers.forEach(label => {
        const cell = document.createElement("th");
        cell.scope = "col";
        cell.textContent = label;
        headerRow.append(cell);
      });
      thead.append(headerRow);
      table.append(thead);
      const tbody = document.createElement("tbody");
      item.table.rows.forEach(row => {
        const tableRow = document.createElement("tr");
        row.forEach(value => {
          const cell = document.createElement("td");
          cell.textContent = value;
          tableRow.append(cell);
        });
        tbody.append(tableRow);
      });
      table.append(tbody);
      container.append(table);
    }
    if (item.source) {
      const label = document.createElement("p");
      label.textContent = item.source.label;
      const excerpt = document.createElement("blockquote");
      excerpt.textContent = item.source.text;
      container.append(label, excerpt);
    }
  }

  function render() {
    answered = false;
    const item = sessionQuestions[index];
    $("#progress-copy").textContent = `QUESTION ${index + 1} OF ${sessionQuestions.length}`;
    $("#score-copy").textContent = `${score} CORRECT`;
    $(".progress-track").setAttribute("aria-valuenow", String(index));
    $("#progress-fill").style.width = `${(index / sessionQuestions.length) * 100}%`;
    $("#lesson-tag").textContent = item.lesson;
    renderStimulus(item);
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
