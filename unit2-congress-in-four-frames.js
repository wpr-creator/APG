(() => {
  "use strict";

  const answerToggle = document.getElementById("answer-toggle");
  const cards = Array.from(document.querySelectorAll(".diagram-card[data-flow]"));
  let pinnedFlow = [];

  document.querySelectorAll(".answer-slot[data-answer]").forEach(slot => {
    const answer = slot.dataset.answer;
    const answerText = document.createElement("span");
    answerText.className = "answer-text";
    answerText.textContent = answer;
    const field = document.createElement("textarea");
    field.rows = 2;
    field.spellcheck = true;
    field.setAttribute("aria-label", `Your notes: ${slot.closest(".diagram-card").getAttribute("aria-label")}`);
    field.hidden = document.body.classList.contains("answer-key");
    slot.append(answerText, field);
  });

  answerToggle.addEventListener("click", () => {
    const showingKey = document.body.classList.toggle("answer-key");
    answerToggle.setAttribute("aria-pressed", String(showingKey));
    answerToggle.textContent = showingKey ? "SHOW WORKSHEET" : "SHOW ANSWER KEY";
    document.querySelectorAll(".key-stamp").forEach(stamp => {
      stamp.textContent = `${showingKey ? "KEY" : "WORKSHEET"} ${stamp.dataset.number} / 04`;
    });
    document.querySelectorAll(".footer-key").forEach(footer => {
      footer.textContent = showingKey ? "CONGRESSIONAL DIAGRAMS / ANSWER KEY" : "CONGRESSIONAL DIAGRAMS / GUIDED NOTES";
    });
  });

  document.getElementById("print-frames").addEventListener("click", () => window.print());

  function clearHighlights() {
    document.querySelectorAll("[data-flow].is-highlighted").forEach(element => element.classList.remove("is-highlighted"));
  }

  function highlight(flowList) {
    clearHighlights();
    if (!flowList.length) return;
    document.querySelectorAll("[data-flow]").forEach(element => {
      const flows = element.dataset.flow.split(/\s+/);
      if (flowList.some(flow => flows.includes(flow))) element.classList.add("is-highlighted");
    });
  }

  cards.forEach(card => {
    card.addEventListener("pointerenter", () => highlight(card.dataset.flow.split(/\s+/)));
    card.addEventListener("pointerleave", () => highlight(pinnedFlow));
    card.addEventListener("focusin", () => highlight(card.dataset.flow.split(/\s+/)));
    card.addEventListener("focusout", event => {
      if (!card.contains(event.relatedTarget)) highlight(pinnedFlow);
    });
    card.addEventListener("click", event => {
      if (event.target.closest("textarea")) return;
      const selected = card.dataset.flow.split(/\s+/);
      const sameSelection = selected.length === pinnedFlow.length && selected.every(flow => pinnedFlow.includes(flow));
      pinnedFlow = sameSelection ? [] : selected;
      highlight(pinnedFlow.length ? pinnedFlow : selected);
    });
    card.addEventListener("keydown", event => {
      if (event.target !== card || !["Enter", " "].includes(event.key)) return;
      event.preventDefault();
      const selected = card.dataset.flow.split(/\s+/);
      const sameSelection = selected.length === pinnedFlow.length && selected.every(flow => pinnedFlow.includes(flow));
      pinnedFlow = sameSelection ? [] : selected;
      highlight(pinnedFlow.length ? pinnedFlow : selected);
    });
  });

  document.querySelectorAll(".flow-arrow[data-flow]").forEach(arrow => {
    const activate = () => {
      const selected = arrow.dataset.flow.split(/\s+/);
      const sameSelection = selected.length === pinnedFlow.length && selected.every(flow => pinnedFlow.includes(flow));
      pinnedFlow = sameSelection ? [] : selected;
      highlight(pinnedFlow.length ? pinnedFlow : selected);
    };
    arrow.addEventListener("pointerenter", () => highlight(arrow.dataset.flow.split(/\s+/)));
    arrow.addEventListener("pointerleave", () => highlight(pinnedFlow));
    arrow.addEventListener("focus", () => highlight(arrow.dataset.flow.split(/\s+/)));
    arrow.addEventListener("blur", () => highlight(pinnedFlow));
    arrow.addEventListener("click", activate);
    arrow.addEventListener("keydown", event => {
      if (!["Enter", " "].includes(event.key)) return;
      event.preventDefault();
      activate();
    });
  });
})();
