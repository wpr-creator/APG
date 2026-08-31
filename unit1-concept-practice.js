(function () {
  "use strict";
  const questions = [
    { lesson: "1.01 · KNOW THE IDEAS", prompt: "People possess rights simply because they are human. Which idea is this?", choices: ["Natural rights", "Limited government", "Consent of the governed", "Republicanism"], answer: 0, why: "NATURAL RIGHTS include life, liberty, and other rights people possess simply because they are human." },
    { lesson: "1.01 · KNOW THE IDEAS", prompt: "People give government authority in exchange for protection of their rights. Which idea is this?", choices: ["Equality", "Social contract", "Republicanism", "Popular sovereignty"], answer: 1, why: "The SOCIAL CONTRACT is the agreement linking government authority to its duty to protect people’s rights." },
    { lesson: "1.01 · KNOW THE IDEAS", prompt: "The people are the original source of government power. Which idea is this?", choices: ["Consent of the governed", "Popular sovereignty", "Limited government", "Natural rights"], answer: 1, why: "POPULAR SOVEREIGNTY means government power ultimately comes from the people." },
    { lesson: "1.01 · KNOW THE IDEAS", prompt: "Government power is restricted and cannot be absolute. Which idea is this?", choices: ["Limited government", "Social contract", "Equality", "Republicanism"], answer: 0, why: "LIMITED GOVERNMENT means constitutions and laws restrict what government and its officials may do." },
    { lesson: "1.01 · KNOW THE IDEAS", prompt: "Government may rule because the people authorize it. Which idea is this?", choices: ["Natural rights", "Consent of the governed", "Elite democracy", "Limited government"], answer: 1, why: "CONSENT OF THE GOVERNED focuses on the people authorizing government through assent, voting, and elections." },
    { lesson: "1.01 · KNOW THE IDEAS", prompt: "People govern through elected representatives. Which idea is this?", choices: ["Direct democracy", "Equality", "Republicanism", "Social contract"], answer: 2, why: "REPUBLICANISM means citizens elect representatives rather than making every government decision themselves." },
    { lesson: "1.01 · KNOW THE IDEAS", prompt: "No person is naturally entitled to rule another, and people possess equal political rights. Which idea is this?", choices: ["Equality", "Popular sovereignty", "Limited government", "Natural rights"], answer: 0, why: "EQUALITY includes equal political rights, equal citizenship, and extending democratic promises to people who were excluded." },
    { lesson: "1.01 · DECLARATION", prompt: "The Declaration says government exists to secure life and liberty. Which ideal is most direct?", choices: ["Republicanism", "Natural rights", "Limited government", "Equality"], answer: 1, why: "The Declaration connects NATURAL RIGHTS to government’s purpose. If government repeatedly destroys those rights, the people may change or replace it." },
    { lesson: "1.01 · DECLARATION", prompt: "The Declaration says people create government to protect their rights. Which idea describes that relationship?", choices: ["Social contract", "Popular sovereignty", "Equality", "Republicanism"], answer: 0, why: "The SOCIAL CONTRACT gives government a purpose. A government that fails to protect rights loses legitimacy." },
    { lesson: "1.01 · DECLARATION", prompt: "The Declaration says government derives its just powers from the people rather than a monarch. Which ideas are connected?", choices: ["Equality and limited government", "Consent and popular sovereignty", "Rights and republicanism", "Elite and pluralist democracy"], answer: 1, why: "CONSENT OF THE GOVERNED explains the people’s authorization; POPULAR SOVEREIGNTY explains that power originates with the people." },
    { lesson: "1.01 · CONSTITUTION", prompt: "“We the People” establishes the source of the Constitution’s authority. Which ideal is most direct?", choices: ["Popular sovereignty", "Limited government", "Natural rights", "Consent of the governed"], answer: 0, why: "“We the People” points to POPULAR SOVEREIGNTY because the people are the source of constitutional authority." },
    { lesson: "1.01 · CONSTITUTION", prompt: "Separation of powers and checks and balances stop one part of government from gaining unlimited power. Which ideal?", choices: ["Republicanism", "Social contract", "Limited government", "Equality"], answer: 2, why: "The Constitution grants power but also restricts it. That is LIMITED GOVERNMENT." },
    { lesson: "1.01 · CONSTITUTION", prompt: "Citizens elect representatives who exercise government power for them. Which constitutional principle is most direct?", choices: ["Republicanism", "Natural rights", "Equality", "Direct democracy"], answer: 0, why: "The Constitution uses REPUBLICANISM: voters choose representatives who make public decisions." },
    { lesson: "1.01 · GETTYSBURG ADDRESS", prompt: "Lincoln returns to the promise that all people are created equal. Which ideal is he emphasizing?", choices: ["Consent", "Equality", "Limited government", "Social contract"], answer: 1, why: "The Gettysburg Address presents the Civil War as a test of the Declaration’s promise of EQUALITY." },
    { lesson: "1.01 · GETTYSBURG ADDRESS", prompt: "Lincoln describes government as “of the people, by the people, for the people.” Which ideal is most direct?", choices: ["Elite democracy", "Republicanism", "Popular sovereignty", "Limited government"], answer: 2, why: "The phrase says democratic government belongs to and receives authority from the people: POPULAR SOVEREIGNTY." },
    { lesson: "1.01 · APPLY IT", prompt: "A constitution specifically prohibits Congress from exercising certain powers. What ideal is most direct?", choices: ["Popular sovereignty", "Limited government", "Natural rights", "Consent of the governed"], answer: 1, why: "LIMITED GOVERNMENT means government itself is subject to constitutional restrictions." },
    { lesson: "1.01 · APPLY IT", prompt: "Citizens directly elect members of a legislature. Which ideal is most directly demonstrated by authorizing those officials?", choices: ["Consent of the governed", "Popular sovereignty", "Equality", "Natural rights"], answer: 0, why: "The election demonstrates CONSENT OF THE GOVERNED because citizens authorize officials to exercise power." },
    { lesson: "1.01 · APPLY IT", prompt: "A political system claims authority because citizens created and approved it. Which ideal is most direct?", choices: ["Republicanism", "Popular sovereignty", "Limited government", "Equality"], answer: 1, why: "POPULAR SOVEREIGNTY means the people are the source of governmental authority." },
    { lesson: "1.01 · APPLY IT", prompt: "Government protects rights in return for receiving authority from the people. Which concept best describes the full exchange?", choices: ["Consent of the governed", "Natural rights", "Social contract", "Republicanism"], answer: 2, why: "The SOCIAL CONTRACT is the full relationship between government authority and its responsibility to protect rights." },
    { lesson: "1.01 · APPLY IT", prompt: "Citizens elect lawmakers instead of voting personally on every national law. Which principle is most direct?", choices: ["Popular sovereignty", "Direct democracy", "Republicanism", "Equality"], answer: 2, why: "REPUBLICANISM operates through elected lawmakers who make policy for citizens." },
    { lesson: "1.01 · APPLY IT", prompt: "A president can be investigated, impeached, and removed for abusing power. Which ideal is most direct?", choices: ["Natural rights", "Consent of the governed", "Limited government", "Social contract"], answer: 2, why: "LIMITED GOVERNMENT means even elected officials are subject to constitutional rules and consequences." },
    { lesson: "1.01 · APPLY IT", prompt: "A movement argues that people denied voting rights cannot truly authorize laws imposed on them. Which ideal?", choices: ["Consent of the governed", "Republicanism", "Popular sovereignty", "Limited government"], answer: 0, why: "CONSENT OF THE GOVERNED requires political authorization from the people government rules." },
    { lesson: "1.01 · APPLY IT", prompt: "“Governments are instituted…deriving their just powers from the consent of the governed.” Which central idea is the question emphasizing as the source of power?", choices: ["Limited government", "Popular sovereignty", "Equality", "Republicanism"], answer: 1, why: "The central idea is POPULAR SOVEREIGNTY: legitimate government power originates with the people." },
    { lesson: "1.01 · TELL THEM APART", prompt: "Which statement correctly separates popular sovereignty from consent of the governed?", choices: ["Sovereignty limits power; consent creates rights.", "Sovereignty is the source; consent is authorization.", "Sovereignty means elections; consent means courts.", "Sovereignty protects rights; consent divides power."], answer: 1, why: "POPULAR SOVEREIGNTY answers where power comes from: the people. CONSENT OF THE GOVERNED explains how people authorize government." },
    { lesson: "1.01 · TELL THEM APART", prompt: "Which statement correctly separates natural rights from limited government?", choices: ["Rights belong to people; limits restrict government.", "Rights elect officials; limits create representation.", "Rights divide power; limits protect majorities.", "Rights authorize laws; limits create elections."], answer: 0, why: "NATURAL RIGHTS are rights people already possess. LIMITED GOVERNMENT restricts power so government cannot violate them." },
    { lesson: "1.01 · TELL THEM APART", prompt: "Which statement correctly separates social contract from consent of the governed?", choices: ["Contract limits courts; consent protects speech.", "Contract creates equality; consent creates rights.", "Contract is the full agreement; consent is authorization.", "Contract means voting; consent means representation."], answer: 2, why: "The SOCIAL CONTRACT is the larger agreement to authorize government in exchange for protection. CONSENT focuses on authorization." },
    { lesson: "1.01 · BIG PICTURE", prompt: "Which sequence best shows the logic of Topic 1.1?", choices: ["Rights → government → consent → limits → representation", "Government → limits → rights → monarch → consent", "Representation → rights → factions → experts → limits", "Consent → elites → government → groups → rights"], answer: 0, why: "People possess RIGHTS, create GOVERNMENT to protect them, give CONSENT, place LIMITS on power, and govern through REPRESENTATION." },
    { lesson: "1.02 · MODELS OF DEMOCRACY", prompt: "Congress collects comments from thousands of individual social-media users before writing a law. Which model is this?", choices: ["Pluralist democracy", "Participatory democracy", "Elite democracy", "Limited government"], answer: 1, why: "PARTICIPATORY DEMOCRACY emphasizes broad involvement by ordinary people in political decisions." },
    { lesson: "1.02 · MODELS OF DEMOCRACY", prompt: "Technology companies, parents’ organizations, and free-speech groups compete to shape a new law. Which model is this?", choices: ["Participatory democracy", "Elite democracy", "Pluralist democracy", "Popular sovereignty"], answer: 2, why: "PLURALIST DEMOCRACY works through organized groups competing to influence public policy." },
    { lesson: "1.02 · MODELS OF DEMOCRACY", prompt: "Members of Congress rely heavily on committee research and expert testimony before making the final decision. Which model is this?", choices: ["Elite democracy", "Participatory democracy", "Pluralist democracy", "Direct democracy"], answer: 0, why: "ELITE DEMOCRACY gives elected leaders, experts, and other influential people the strongest role in policy decisions." },
    { lesson: "1.02 · KEY CONCEPTS", prompt: "A group is united by a shared interest and tries to influence policy. What does Federalist No. 10 call this kind of group?", choices: ["Institutional filter", "Faction", "Natural right", "Social contract"], answer: 1, why: "A FACTION is a group united by a shared interest that may work against the rights of others or the public good." },
    { lesson: "1.02 · DOCUMENT CONNECTION", prompt: "Which argument from Federalist No. 10 best supports pluralist democracy?", choices: ["Many competing factions make one-group control harder.", "Distant representatives cannot know local needs.", "Experts should decide without political pressure.", "Citizens should vote directly on every law."], answer: 0, why: "FEDERALIST NO. 10 argues that competition among many interests makes it harder for one faction to dominate." },
    { lesson: "1.02 · DOCUMENT CONNECTION", prompt: "Brutus worries that leaders in a large republic may not understand local needs. Which model most directly responds?", choices: ["Elite democracy", "Pluralist democracy", "Participatory democracy", "Limited government"], answer: 2, why: "PARTICIPATORY DEMOCRACY brings ordinary people closer to decisions through speaking, organizing, contacting officials, and voting." }
  ];

  let index = 0;
  let score = 0;
  let answered = false;
  const $ = selector => document.querySelector(selector);

  function render() {
    answered = false;
    const item = questions[index];
    $("#progress-copy").textContent = `QUESTION ${index + 1} OF ${questions.length}`;
    $("#score-copy").textContent = `${score} CORRECT`;
    $("#progress-fill").style.width = `${(index / questions.length) * 100}%`;
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
    const item = questions[index];
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
    $("#next-question").textContent = index === questions.length - 1 ? "SEE RESULTS →" : "NEXT QUESTION →";
    $("#next-question").hidden = false;
    $("#next-question").focus();
  }

  function next() {
    if (index < questions.length - 1) {
      index += 1;
      render();
      $("#question-title").focus?.();
      return;
    }
    $(".practice-card").hidden = true;
    $("#results").hidden = false;
    $("#final-score").textContent = `${score} OF ${questions.length} CORRECT`;
    $("#progress-fill").style.width = "100%";
    $("#results").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function restart() {
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
