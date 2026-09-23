(function () {
  "use strict";
  const key = "apg-unit1-practice-frqs-v1";
  const cards = Array.from(document.querySelectorAll(".frq"));
  const status = document.querySelector(".save-status");

  function readSaved() {
    try { return JSON.parse(localStorage.getItem(key) || "{}"); }
    catch (_) { return {}; }
  }
  function snapshot() {
    return cards.map(function (card) {
      return {
        response: card.querySelector("textarea").value,
        checks: Array.from(card.querySelectorAll('input[type="checkbox"]')).map(function (box) { return box.checked; }),
        evidence: card.querySelector("select") ? card.querySelector("select").value : null
      };
    });
  }
  function score(card) {
    const boxes = Array.from(card.querySelectorAll('input[type="checkbox"]'));
    const checked = boxes.map(function (box) { return box.checked; });
    let points;
    if (card.dataset.frq === "3") {
      const evidence = Number(card.querySelector("select").value);
      points = Number(checked[0]) + Math.min(evidence, checked[0] ? 3 : 2) + Number(checked[1]);
      points = Math.min(points, 4);
    } else {
      points = card.dataset.frq === "1"
        ? Number(checked[0]) + Number(checked[1] && checked[0]) + Number(checked[2])
        : Number(checked[0]) + Number(checked[1]) + Number(checked[2] && checked[0]);
    }
    card.querySelector(".score").textContent = points + " / " + (card.dataset.frq === "3" ? 4 : 3) + " points";
  }
  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(snapshot()));
      status.textContent = "Saved in this browser. Nothing was submitted.";
    } catch (_) {
      status.textContent = "This browser could not save your draft. Copy your response before leaving.";
    }
  }
  const saved = readSaved();
  cards.forEach(function (card, index) {
    const record = Array.isArray(saved) ? saved[index] : null;
    if (record && typeof record.response === "string") card.querySelector("textarea").value = record.response;
    const boxes = Array.from(card.querySelectorAll('input[type="checkbox"]'));
    boxes.forEach(function (box, boxIndex) { box.checked = Boolean(record && Array.isArray(record.checks) && record.checks[boxIndex]); });
    const evidence = card.querySelector("select");
    if (evidence && record && ["0", "1", "2", "3"].includes(record.evidence)) evidence.value = record.evidence;
    score(card);
    card.querySelector("textarea").addEventListener("input", save);
    boxes.forEach(function (box) { box.addEventListener("change", function () { score(card); save(); }); });
    if (evidence) evidence.addEventListener("change", function () { score(card); save(); });
  });
  document.querySelector("#clear-work").addEventListener("click", function () {
    if (!window.confirm("Clear all three responses and self-review checks from this browser? This cannot be undone.")) return;
    cards.forEach(function (card) {
      card.querySelector("textarea").value = "";
      card.querySelectorAll('input[type="checkbox"]').forEach(function (box) { box.checked = false; });
      if (card.querySelector("select")) card.querySelector("select").value = "0";
      score(card);
    });
    try { localStorage.removeItem(key); } catch (_) { /* Storage may be unavailable. */ }
    status.textContent = "Responses and checks cleared from this browser.";
  });
}());
