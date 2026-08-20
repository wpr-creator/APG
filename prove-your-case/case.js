(() => {
  const id = document.body.dataset.case;
  const item = window.PROVE_CASES.find(entry => entry.id === id);
  if (!item) return;
  const $ = selector => document.querySelector(selector);
  document.title = `${item.name} · Prove Your Case`;
  $("#case-topic").textContent = item.topic;
  $("#case-name").textContent = item.name;
  $("#case-year").textContent = `${item.year} · ${item.amendments}`;
  $("#case-image").src = item.image;
  $("#case-image").alt = item.alt;
  $("#case-question").textContent = item.question;
  const answerBox = (title, rows) => {
    const box = document.createElement("aside"); box.className = "worksheet-answer";
    const heading = document.createElement("h3"); heading.textContent = title;
    box.append(heading);
    rows.forEach(([label, id, copyClass = ""]) => {
      const row = document.createElement("div"); row.className = "worksheet-row";
      const strong = document.createElement("strong"); strong.textContent = label;
      const content = document.createElement(id === "worksheet-terms" ? "ul" : "p"); content.id = id;
      if (copyClass) content.className = copyClass;
      row.append(strong, content); box.append(row);
    });
    return box;
  };
  $("#story-step").append(answerBox("COPY THESE ANSWERS TO SITE STEP 1", [["WHO TOOK THE GOVERNMENT ACTION?","worksheet-actor"],["WHAT DID THE GOVERNMENT DO?","worksheet-action"]]));
  $("#question-step").append(answerBox("COPY THIS COMPLETE QUESTION TO SITE STEP 2", [["DOES THE CONSTITUTION ALLOW THE GOVERNMENT TO…","worksheet-question","worksheet-copy"]]));
  $("#constitution-step").append(answerBox("USE THESE FOR SITE STEP 3", [["AMENDMENT","worksheet-amendment"],["COPY THE MOST IMPORTANT WORDS","worksheet-words","worksheet-copy"],["WHAT THOSE WORDS MEAN","worksheet-meaning"],["TWO LEGAL WORDS TO USE","worksheet-terms"]]));
  const rulingMap = document.createElement("div"); rulingMap.className = "ruling-map";
  rulingMap.innerHTML = "<h3>WORKSHEET MAP FOR SITE STEP 4</h3><p><strong>MY RULING IS…</strong>State which choice you made and answer the complete Step 2 question.</p><p><strong>FACTS 1 + 2</strong>Choose two specific facts from Facts That Matter that support your choice.</p><p><strong>THE AMENDMENT SAYS OR MEANS…</strong>Use the amendment words and plain-language explanation from Step 3.</p><p><strong>THIS RULE FITS BECAUSE…</strong>Explain how your two facts connect to the amendment.</p><p><strong>THE OTHER SIDE / MY RESPONSE</strong>Use the optional argument ideas only if you need help identifying the strongest opposing point.</p><p><strong>CREATE A FAIR RULE</strong>Complete both blanks: what government may do, and the condition that must be met first.</p>";
  $("#case-prompts").before(rulingMap);
  $("#worksheet-actor").textContent = item.worksheet.actor;
  $("#worksheet-action").textContent = item.worksheet.action;
  $("#worksheet-question").textContent = item.worksheet.question;
  $("#worksheet-amendment").textContent = item.constitution.map(part => part.label).join(" + ");
  $("#worksheet-words").textContent = item.constitution.map(part => part.text).join(" ");
  $("#worksheet-meaning").textContent = item.constitution.map(part => part.explain).join(" ");
  const list = (target, values) => values.forEach(value => { const li = document.createElement("li"); li.textContent = value; $(target).append(li); });
  list("#case-story", item.story); list("#case-notice", item.notice); list("#side-a", item.sideA.points); list("#side-b", item.sideB.points); list("#case-prompts", item.prompts);
  $("#side-a-title").textContent = item.sideA.title; $("#side-b-title").textContent = item.sideB.title;
  item.constitution.forEach(part => {
    const section = document.createElement("section"); section.className = "constitution-part";
    const heading = document.createElement("h3"); heading.textContent = part.label;
    const quote = document.createElement("blockquote"); quote.textContent = part.text;
    const explain = document.createElement("p"); explain.textContent = part.explain;
    section.append(heading, quote, explain); $("#constitution").append(section);
  });
  $("#toolbox-rule").textContent = item.toolbox.rule;
  $("#toolbox-decide").textContent = item.toolbox.decide;
  $("#toolbox-remember").textContent = item.toolbox.remember;
  item.toolbox.terms.forEach(([term, meaning]) => {
    const name = document.createElement("dt"); name.textContent = term;
    const definition = document.createElement("dd"); definition.textContent = meaning;
    $("#toolbox-terms").append(name, definition);
  });
  item.worksheet.terms.forEach(term => {
    const definition = item.toolbox.terms.find(([name]) => name === term)?.[1] || "";
    const li = document.createElement("li");
    const strong = document.createElement("strong"); strong.textContent = term;
    li.append(strong, document.createTextNode(` — ${definition}`));
    $("#worksheet-terms").append(li);
  });
  const choiceKey = `prove-case-choice-${id}`;
  let choice = localStorage.getItem(choiceKey) || "";
  const choiceStatus = $("#choice-status");
  function renderChoice() {
    document.querySelectorAll("[data-ruling-choice]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.rulingChoice === choice)));
    choiceStatus.textContent = choice ? `YOUR QUICK RULING: THE RIGHT ${choice === "violated" ? "WAS" : "WAS NOT"} VIOLATED. RECORD YOUR EVIDENCE ON THE WORKSHEET.` : "CHOOSE A QUICK RULING, THEN RECORD YOUR EVIDENCE ON THE WORKSHEET.";
    renderComparison();
  }
  document.querySelectorAll("[data-ruling-choice]").forEach(button => button.addEventListener("click", () => { choice = button.dataset.rulingChoice; localStorage.setItem(choiceKey, choice); renderChoice(); }));
  let isUnlocked = false;
  function renderComparison() {
    const comparison = $("#comparison");
    if (!isUnlocked || !choice) { comparison.hidden = true; return; }
    comparison.hidden = false;
    const agreed = (choice === "violated") === item.ruling.violated;
    comparison.textContent = agreed ? "YOU RULED WITH THE COURT." : "YOU DISSENTED FROM THE COURT. A DISSENT IS A REASONED DISAGREEMENT—NOT AN AUTOMATICALLY WRONG ANSWER.";
  }
  async function loadUnlock() {
    try {
      const response = await fetch("../site-content.json", {cache:"no-store"});
      if (!response.ok) throw new Error();
      let config = await response.json();
      const preview = JSON.parse(localStorage.getItem("apg-site-content-v1") || "null");
      if (preview?.proveCaseUnlocks) config.proveCaseUnlocks = {...(config.proveCaseUnlocks || {}), ...preview.proveCaseUnlocks};
      isUnlocked = Boolean(config.proveCaseUnlocks?.[id]);
    } catch { isUnlocked = false; }
    if (!isUnlocked) return;
    $("#decision-locked").hidden = true; $("#decision-open").hidden = false;
    $("#decision-vote").textContent = `${item.ruling.vote} DECISION`;
    $("#decision-holding").textContent = item.ruling.holding;
    $("#decision-reason").textContent = item.ruling.reason;
    $("#decision-nuance").textContent = item.ruling.nuance;
    $("#decision-source").href = item.ruling.source;
    renderComparison();
  }
  renderChoice(); loadUnlock();
})();
