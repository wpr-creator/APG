window.startConceptPractice = function (questions) {
  "use strict";
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
    if (!answered) return;
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
};
