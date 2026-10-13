(() => {
  "use strict";

  const cards = Array.from(document.querySelectorAll(".diagram-card[data-flow]"));
  let pinnedFlow = [];

  document.querySelectorAll(".answer-slot[data-answer]").forEach(slot => {
    const answer = slot.dataset.answer;
    const answerText = document.createElement("span");
    answerText.className = "answer-text";
    answerText.textContent = answer.replace(/\\n/g, "\n");
    slot.append(answerText);
  });

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
    card.addEventListener("click", () => {
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
