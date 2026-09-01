(function () {
  "use strict";
  const questions = [
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "A government exists mainly to protect life and liberty. Which ideal explains the rights being protected?", choices: ["Natural rights", "Limited government", "Republicanism", "Popular sovereignty"], answer: 0, why: "NATURAL RIGHTS belong to people before government exists. Life and liberty are the clearest clues." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "People authorize a government, and the government promises to protect their rights. Which concept describes the whole agreement?", choices: ["Consent of the governed", "Social contract", "Equality", "Republicanism"], answer: 1, why: "The SOCIAL CONTRACT is the full exchange: authority from the people for protection of their rights." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "A constitution begins by announcing that its authority comes from the people. Which ideal is most direct?", choices: ["Popular sovereignty", "Limited government", "Natural rights", "Elite democracy"], answer: 0, why: "POPULAR SOVEREIGNTY answers where government power originates: with the people." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "The law places firm restrictions on what public officials may do. Which ideal is most direct?", choices: ["Equality", "Republicanism", "Limited government", "Social contract"], answer: 2, why: "LIMITED GOVERNMENT means public power is restricted rather than absolute." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "Voters choose the officials who will exercise government power. Which ideal focuses on that authorization?", choices: ["Consent of the governed", "Popular sovereignty", "Natural rights", "Equality"], answer: 0, why: "CONSENT OF THE GOVERNED is demonstrated when people authorize officials through elections." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "Citizens elect lawmakers to make policy instead of voting on every national law themselves. Which principle?", choices: ["Direct democracy", "Republicanism", "Social contract", "Limited government"], answer: 1, why: "REPUBLICANISM means people govern through elected representatives." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "A movement demands that a group excluded from voting receive the same political rights as other citizens. Which ideal?", choices: ["Equality", "Elite democracy", "Federalism", "Pluralism"], answer: 0, why: "EQUALITY includes equal political rights and extending democratic participation to people who were excluded." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "Which description best fits a representative republic?", choices: ["Citizens vote personally on every law.", "A monarch selects government leaders.", "Voters choose officials to govern for them.", "Experts govern without public elections."], answer: 2, why: "A REPRESENTATIVE REPUBLIC uses elected officials to make public decisions on behalf of citizens." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "Which feature is expected in a liberal democracy?", choices: ["Guaranteed income equality", "Competitive elections and protected rights", "Rule by one permanent political party", "Unlimited power for elected majorities"], answer: 1, why: "A LIBERAL DEMOCRACY combines competitive elections with civil liberties, minority rights, political equality, and a free press." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "The Declaration lists abuses committed without the people’s approval. Which idea do those complaints most directly challenge?", choices: ["Consent of the governed", "Elite democracy", "Judicial review", "Federalism"], answer: 0, why: "Government actions imposed without public authorization violate CONSENT OF THE GOVERNED." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "The Constitution grants powers but divides them among branches that can check one another. Which ideal does that design protect?", choices: ["Natural rights", "Limited government", "Participatory democracy", "Equality"], answer: 1, why: "Divided power and checks make it harder for any official or institution to exercise unlimited authority." },
    { lesson: "CLUSTER 1 · FOUNDING IDEALS", prompt: "Which sequence best captures the logic behind the founding ideals?", choices: ["Rights → government → consent → limits → representation", "Government → elites → rights → factions → voting", "Representation → monarchy → consent → unlimited power", "Equality → courts → groups → government → rights"], answer: 0, why: "People possess RIGHTS, create GOVERNMENT, give CONSENT, place LIMITS on power, and use REPRESENTATION." },

    { lesson: "CLUSTER 2 · THREE MODELS", prompt: "Voters approve or reject a proposed state law themselves through a referendum. Which model is most direct?", choices: ["Elite democracy", "Pluralist democracy", "Participatory democracy", "Representative republic"], answer: 2, why: "A REFERENDUM is a strong clue for PARTICIPATORY DEMOCRACY because citizens decide policy directly." },
    { lesson: "CLUSTER 2 · THREE MODELS", prompt: "A city invites thousands of residents to speak, organize, and help shape a new public-safety plan. Which model?", choices: ["Participatory democracy", "Elite democracy", "Pluralist democracy", "Limited government"], answer: 0, why: "PARTICIPATORY DEMOCRACY emphasizes broad citizen involvement in political decisions." },
    { lesson: "CLUSTER 2 · THREE MODELS", prompt: "Business, labor, environmental, and consumer organizations compete to influence the same bill. Which model?", choices: ["Participatory democracy", "Elite democracy", "Pluralist democracy", "Direct democracy"], answer: 2, why: "PLURALIST DEMOCRACY features organized groups competing to influence public policy." },
    { lesson: "CLUSTER 2 · THREE MODELS", prompt: "A policy emerges from bargaining and compromise among several organized interests. Which model best explains the result?", choices: ["Elite democracy", "Pluralist democracy", "Participatory democracy", "Popular sovereignty"], answer: 1, why: "PLURALISM expects competing groups to bargain, form coalitions, and produce compromise." },
    { lesson: "CLUSTER 2 · THREE MODELS", prompt: "A small number of wealthy, connected people have much more access to policymakers than ordinary citizens. Which model describes this concentration?", choices: ["Participatory democracy", "Elite democracy", "Pluralist democracy", "Direct democracy"], answer: 1, why: "ELITE DEMOCRACY emphasizes the disproportionate influence of people with wealth, status, expertise, or connections." },
    { lesson: "CLUSTER 2 · THREE MODELS", prompt: "Elected officials and specialists study technical evidence and make the final policy choice. Which model is most direct?", choices: ["Elite democracy", "Participatory democracy", "Pluralist democracy", "Consent of the governed"], answer: 0, why: "ELITE DEMOCRACY gives leaders and experts the strongest role in making policy." },
    { lesson: "CLUSTER 2 · THREE MODELS", prompt: "A critic says group competition has an “upper-class accent” because many people lack money or organization. What is being criticized?", choices: ["Participatory democracy", "Pluralist democracy", "Popular sovereignty", "Republicanism"], answer: 1, why: "This is a criticism of PLURALISM: group competition may exist, but access and resources are not distributed equally." },
    { lesson: "CLUSTER 2 · THREE MODELS", prompt: "What is the main difference between pluralist and elite theories?", choices: ["Pluralism stresses many competing groups; elite theory stresses concentrated influence.", "Pluralism rejects elections; elite theory requires referendums.", "Pluralism protects rights; elite theory creates natural rights.", "Pluralism uses experts; elite theory uses only voters."], answer: 0, why: "PLURALISM distributes influence among many competing groups; ELITE THEORY sees influence concentrated among relatively few people." },
    { lesson: "CLUSTER 2 · THREE MODELS", prompt: "Which comparison of participatory and pluralist democracy is accurate?", choices: ["Participation centers on citizens; pluralism centers on organized groups.", "Participation centers on experts; pluralism centers on judges.", "Participation limits voting; pluralism eliminates lobbying.", "Participation requires a republic; pluralism requires monarchy."], answer: 0, why: "PARTICIPATORY DEMOCRACY emphasizes citizen involvement. PLURALIST DEMOCRACY emphasizes competition among organized groups." },
    { lesson: "CLUSTER 2 · THREE MODELS", prompt: "Which clue points most clearly to elite democracy rather than pluralist democracy?", choices: ["Many organizations present competing plans.", "Several coalitions negotiate a compromise.", "A small network dominates access and decisions.", "Interest groups lobby members of Congress."], answer: 2, why: "Concentrated access and decision-making are ELITE clues. Competition among many groups is the pluralist clue." },

    { lesson: "CLUSTER 3 · DOCUMENT EVIDENCE", prompt: "What is Brutus No. 1’s central worry about a very large republic?", choices: ["Citizens will vote too frequently.", "Representatives may not know or express local views.", "States will control too much foreign policy.", "Factions will disappear completely."], answer: 1, why: "BRUTUS worries that a large republic creates distant representation that cannot accurately express the people’s views." },
    { lesson: "CLUSTER 3 · DOCUMENT EVIDENCE", prompt: "Why does Brutus care about the number and character of representatives?", choices: ["They must accurately express the people’s views.", "They must remain wealthy enough to avoid voting.", "They must eliminate every organized interest.", "They must serve without facing elections."], answer: 0, why: "For Brutus, people do not truly govern if their representatives do not know and speak their sentiments." },
    { lesson: "CLUSTER 3 · DOCUMENT EVIDENCE", prompt: "Brutus’s warning most directly highlights tension between which two models?", choices: ["Pluralist and direct democracy", "Participatory and elite democracy", "Federal and unitary government", "Natural rights and equality"], answer: 1, why: "Brutus fears rule drifting toward a small, distant set of representatives instead of meaningful participation by the people." },
    { lesson: "CLUSTER 3 · DOCUMENT EVIDENCE", prompt: "In Federalist No. 10, what is a faction?", choices: ["A branch checking another branch", "A group united by a shared interest", "A court rejecting a precedent", "A state refusing a national law"], answer: 1, why: "In FEDERALIST NO. 10, a FACTION is a group united by a shared interest that may work against others’ rights or the public good." },
    { lesson: "CLUSTER 3 · DOCUMENT EVIDENCE", prompt: "Why does Madison prefer a large republic for controlling factions?", choices: ["It removes disagreement among citizens.", "It creates many interests that compete.", "It allows citizens to vote on every law.", "It gives one group permanent control."], answer: 1, why: "A larger political sphere contains more interests, making it harder for one faction to form a lasting majority and dominate." },
    { lesson: "CLUSTER 3 · DOCUMENT EVIDENCE", prompt: "Why does Federalist No. 10 favor representation over pure democracy?", choices: ["Representatives may refine public views toward the common good.", "Representatives guarantee that factions disappear.", "Representatives prevent citizens from voting in elections.", "Representatives return power to a monarch."], answer: 0, why: "Madison argues that elected representatives can REFINE public views, though he admits corrupt representatives remain a risk." },
    { lesson: "CLUSTER 3 · DOCUMENT EVIDENCE", prompt: "Which constitutional feature most directly reflects Madison’s representative solution?", choices: ["Voters choose House members at regular elections.", "Judges receive compensation while serving.", "States may conduct property inspections.", "Presidents must meet an age requirement."], answer: 0, why: "Regular election of House members connects public views to a representative institution." },
    { lesson: "CLUSTER 3 · DOCUMENT EVIDENCE", prompt: "How does the Constitution filter public preferences?", choices: ["It requires every law to pass a national referendum.", "It divides decisions among elected offices and institutions.", "It prevents organized groups from contacting Congress.", "It gives all policy decisions to state voters."], answer: 1, why: "The Constitution uses REPRESENTATION and INSTITUTIONAL FILTERS: public wishes pass through elected officials, branches, and procedures." },

    { lesson: "CLUSTER 4 · APPLY & COMPARE", prompt: "Which statement correctly separates popular sovereignty from consent of the governed?", choices: ["Sovereignty is the source; consent is authorization.", "Sovereignty limits power; consent creates rights.", "Sovereignty means courts; consent means federalism.", "Sovereignty protects speech; consent divides branches."], answer: 0, why: "POPULAR SOVEREIGNTY identifies the people as the source of power. CONSENT explains how people authorize government." },
    { lesson: "CLUSTER 4 · APPLY & COMPARE", prompt: "Which statement correctly separates natural rights from limited government?", choices: ["Rights belong to people; limits restrict government.", "Rights choose officials; limits create elections.", "Rights divide branches; limits create equality.", "Rights come from law; limits come from factions."], answer: 0, why: "NATURAL RIGHTS belong to people. LIMITED GOVERNMENT restricts public power so those rights are not violated." },
    { lesson: "CLUSTER 4 · APPLY & COMPARE", prompt: "Which statement correctly separates social contract from consent of the governed?", choices: ["The contract is the full agreement; consent is authorization.", "The contract means elections; consent means courts.", "The contract divides power; consent protects property.", "The contract creates factions; consent creates experts."], answer: 0, why: "The SOCIAL CONTRACT is the larger exchange of authority for protection. CONSENT focuses on the people’s authorization." },
    { lesson: "CLUSTER 4 · APPLY & COMPARE", prompt: "Which statement correctly separates direct from representative democracy?", choices: ["Direct uses citizen policy votes; representative uses elected lawmakers.", "Direct uses courts; representative uses interest groups.", "Direct protects rights; representative limits government.", "Direct uses experts; representative uses monarchs."], answer: 0, why: "In DIRECT DEMOCRACY citizens decide policy themselves. In REPRESENTATIVE DEMOCRACY elected officials decide for them." },
    { lesson: "CLUSTER 4 · APPLY & COMPARE", prompt: "The Constitution forbids Congress from using several named powers. Which ideal is most direct?", choices: ["Natural rights", "Popular sovereignty", "Social contract", "Limited government"], answer: 3, why: "A list of powers government may not use is direct evidence of LIMITED GOVERNMENT." },
    { lesson: "CLUSTER 4 · APPLY & COMPARE", prompt: "House members are chosen by voters in regular elections. Which ideal is most directly demonstrated?", choices: ["Consent of the governed", "Elite democracy", "Federalism", "Natural rights"], answer: 0, why: "Elections allow citizens to authorize representatives, demonstrating CONSENT OF THE GOVERNED." },
    { lesson: "CLUSTER 4 · APPLY & COMPARE", prompt: "A president can be investigated and removed for abusing office. Which ideal does this demonstrate?", choices: ["Popular sovereignty", "Limited government", "Pluralism", "Direct democracy"], answer: 1, why: "Even the president is subject to constitutional rules and consequences under LIMITED GOVERNMENT." },
    { lesson: "CLUSTER 4 · APPLY & COMPARE", prompt: "A movement argues that people denied the vote cannot truly approve laws imposed on them. Which ideal is being applied?", choices: ["Consent of the governed", "Elite democracy", "Judicial review", "Federalism"], answer: 0, why: "Without political participation, the excluded group cannot give meaningful CONSENT to government authority." },
    { lesson: "CLUSTER 4 · APPLY & COMPARE", prompt: "An argument says government should rarely direct how private people use their property or businesses. Which ideal is most relevant?", choices: ["Popular sovereignty", "Limited government", "Pluralist democracy", "Republicanism"], answer: 1, why: "The argument calls for restricting government interference, which most directly supports LIMITED GOVERNMENT." },
    { lesson: "CLUSTER 4 · APPLY & COMPARE", prompt: "Which comparison correctly matches the policy process to the democratic model?", choices: ["Referendum—participatory; group lobbying—pluralist", "Referendum—elite; group lobbying—participatory", "Expert panel—pluralist; public vote—elite", "Group competition—direct; elections—pluralist"], answer: 0, why: "Direct citizen decisions are PARTICIPATORY; competition among organized groups is PLURALIST." },
    { lesson: "CLUSTER 4 · BUILD AN ARGUMENT", prompt: "Which evidence best supports a claim that participatory democracy keeps government responsive to ordinary people?", choices: ["Brutus warns distant representatives may not know local views.", "Federalist No. 10 praises a larger political sphere.", "The Constitution gives senators six-year terms.", "Pluralism allows organizations to form coalitions."], answer: 0, why: "Brutus supplies evidence that distance can weaken representation, supporting a claim for stronger public participation." },
    { lesson: "CLUSTER 4 · BUILD AN ARGUMENT", prompt: "Which evidence best supports a claim that pluralist democracy can limit domination by one interest?", choices: ["Brutus says a large republic cannot represent local views.", "Federalist No. 10 says many interests make one-faction control harder.", "The Constitution gives judges life tenure.", "Elite theory emphasizes unequal political resources."], answer: 1, why: "Federalist No. 10 supports the reasoning that a large, diverse sphere makes lasting control by one faction more difficult." }
  ];

  function shuffle(items) {
    const shuffled = [...items];
    for (let current = shuffled.length - 1; current > 0; current -= 1) {
      const randomValue = crypto.getRandomValues(new Uint32Array(1))[0];
      const swapIndex = randomValue % (current + 1);
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
      $("#question-title").focus?.();
      return;
    }
    $(".practice-card").hidden = true;
    $("#results").hidden = false;
    $("#final-score").textContent = `${score} OF ${sessionQuestions.length} CORRECT`;
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
