(function () {
  "use strict";
  const questions = [
    { lesson: "1.01 · FOUNDING IDEALS", prompt: "People possess rights simply because they are human. Which idea is this?", choices: ["Natural rights", "Limited government", "Consent of the governed", "Republicanism"], answer: 0, why: "NATURAL RIGHTS are rights people already possess. Limited government describes restrictions on government power." },
    { lesson: "1.01 · FOUNDING IDEALS", prompt: "Government receives authority from the people and promises to protect their rights. Which idea best describes this agreement?", choices: ["Equality", "Social contract", "Elite democracy", "Political participation"], answer: 1, why: "The SOCIAL CONTRACT is the larger agreement: people give government authority in exchange for protection of their rights." },
    { lesson: "1.01 · FOUNDING IDEALS", prompt: "A constitution lists powers that Congress may not use. Which idea is most directly shown?", choices: ["Popular sovereignty", "Natural rights", "Limited government", "Pluralist democracy"], answer: 2, why: "LIMITED GOVERNMENT means government power is restricted. The prohibited powers place limits on Congress itself." },
    { lesson: "1.01 · TELL THEM APART", prompt: "“We the People” identifies the people as the original source of government power. Which idea is most direct?", choices: ["Consent of the governed", "Popular sovereignty", "Republicanism", "Social contract"], answer: 1, why: "POPULAR SOVEREIGNTY answers where government power comes from: the people. Consent focuses on how people authorize government." },
    { lesson: "1.01 · TELL THEM APART", prompt: "Citizens choose lawmakers who will make national policy for them. Which idea is most direct?", choices: ["Republicanism", "Equality", "Natural rights", "Direct democracy"], answer: 0, why: "REPUBLICANISM means people govern through elected representatives rather than voting on every national law themselves." },
    { lesson: "1.01 · DOCUMENT CONNECTION", prompt: "Lincoln says government should be “of the people, by the people, for the people.” Which idea does this most clearly support?", choices: ["Limited government", "Elite democracy", "Popular sovereignty", "Faction"], answer: 2, why: "The Gettysburg Address connects democratic government to the people as its source and purpose. That is POPULAR SOVEREIGNTY." },
    { lesson: "1.02 · MODELS OF DEMOCRACY", prompt: "Congress collects comments from thousands of individual social-media users before writing a law. Which model is this?", choices: ["Pluralist democracy", "Participatory democracy", "Elite democracy", "Limited government"], answer: 1, why: "PARTICIPATORY DEMOCRACY emphasizes broad involvement by ordinary people in political decisions." },
    { lesson: "1.02 · MODELS OF DEMOCRACY", prompt: "Technology companies, parents’ organizations, and free-speech groups compete to shape a new law. Which model is this?", choices: ["Participatory democracy", "Elite democracy", "Pluralist democracy", "Popular sovereignty"], answer: 2, why: "PLURALIST DEMOCRACY works through organized groups competing to influence public policy." },
    { lesson: "1.02 · MODELS OF DEMOCRACY", prompt: "Members of Congress rely heavily on committee research and expert testimony before making the final decision. Which model is this?", choices: ["Elite democracy", "Participatory democracy", "Pluralist democracy", "Direct democracy"], answer: 0, why: "ELITE DEMOCRACY gives elected leaders, experts, and other influential people the strongest role in policy decisions." },
    { lesson: "1.02 · KEY CONCEPTS", prompt: "A group of people is united by a shared interest and tries to influence policy. What does Federalist No. 10 call this kind of group?", choices: ["Institutional filter", "Faction", "Natural right", "Social contract"], answer: 1, why: "A FACTION is a group united by a shared interest that may work against the rights of others or the public good." },
    { lesson: "1.02 · DOCUMENT CONNECTION", prompt: "Which argument from Federalist No. 10 best supports pluralist democracy?", choices: ["Many competing factions make one-group control harder.", "Distant representatives cannot know local needs.", "Experts should decide without political pressure.", "Citizens should vote directly on every law."], answer: 0, why: "FEDERALIST NO. 10 argues that a large republic contains many competing interests. Their competition makes it harder for one faction to dominate." },
    { lesson: "1.02 · DOCUMENT CONNECTION", prompt: "Brutus worries that leaders in a large republic may not understand local needs. Which model most directly responds to that concern?", choices: ["Elite democracy", "Pluralist democracy", "Participatory democracy", "Limited government"], answer: 2, why: "PARTICIPATORY DEMOCRACY brings ordinary people closer to decisions by asking them to speak, organize, contact officials, and vote." }
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
