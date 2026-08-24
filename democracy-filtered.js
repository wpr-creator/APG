(() => {
  "use strict";
  const key = "apg-democracy-filtered-v1";
  const empty = { opening: "", paths: [], evidence: [], fields: {} };
  let state = load();
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function load() {
    try { return { ...empty, ...JSON.parse(localStorage.getItem(key) || "{}") }; }
    catch { return { ...empty }; }
  }
  function save() { localStorage.setItem(key, JSON.stringify(state)); }
  function uniqueAdd(list, value) { return list.includes(value) ? list : [...list, value]; }

  function selectTab(model, focus = false) {
    $$("[role=tab]").forEach(tab => {
      const selected = tab.dataset.model === model;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    $$("[role=tabpanel]").forEach(panel => { panel.hidden = panel.id !== `panel-${model}`; });
  }

  function updateProgress() {
    const count = state.paths.length;
    $("#path-count").textContent = `${count} OF 3`;
    $("#progress-fill").style.width = `${(count / 3) * 100}%`;
    $$(".path-challenge").forEach(box => {
      if (!state.paths.includes(box.dataset.path)) return;
      $$('button', box).forEach(button => button.disabled = true);
      const feedback = $(".challenge-feedback", box);
      feedback.textContent = "FILTER TESTED ✓";
      feedback.className = "challenge-feedback is-correct";
    });
    const open = count === 3;
    $("#evidence-lock").hidden = open;
    $("#evidence-content").hidden = !open;
  }

  function updateEvidence() {
    $("#evidence-count").textContent = `${state.evidence.length} OF 3`;
    $$(".evidence-card").forEach(card => {
      if (!state.evidence.includes(card.dataset.evidence)) return;
      card.classList.add("solved");
      $$("button", card).forEach(button => button.disabled = true);
      $(":scope > p", card).textContent = "CLASSIFIED ✓";
      $(":scope > p", card).className = "is-correct";
    });
    const open = state.evidence.length === 3;
    $("#report-lock").hidden = open;
    $("#report-content").hidden = !open;
  }

  const fieldIds = ["student-name", "class-period", "best-model", "comparison", "evidence-response", "missing-voice", "transfer-response"];
  const minimums = { "student-name": 2, "class-period": 2, "best-model": 2, comparison: 25, "evidence-response": 35, "missing-voice": 20, "transfer-response": 40 };
  function completeReport() { return fieldIds.every(id => (($(`#${id}`).value || "").trim().length >= minimums[id])); }
  function updatePassport() {
    const value = id => ($(`#${id}`).value || "").trim();
    $("#passport-student").textContent = value("student-name") ? `${value("student-name")} · ${value("class-period")}` : "";
    $("#passport-model").textContent = value("best-model");
    $("#passport-comparison").textContent = value("comparison");
    $("#passport-evidence").textContent = value("evidence-response");
    $("#passport-missing").textContent = value("missing-voice");
    $("#passport-transfer").textContent = value("transfer-response");
    const done = completeReport();
    $("#print-passport").disabled = !done;
    $("#report-status").textContent = done ? "VOICE PASSPORT READY ✓" : "Complete every response to unlock your printable Voice Passport.";
    $("#report-status").className = done ? "report-status is-correct" : "report-status";
  }

  $$("[role=tab]").forEach((tab, index, tabs) => {
    tab.addEventListener("click", () => selectTab(tab.dataset.model));
    tab.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      selectTab(tabs[next].dataset.model, true);
    });
  });
  $$("input[name=opening]").forEach(input => input.addEventListener("change", () => { state.opening = input.value; save(); }));
  $$(".path-challenge button").forEach(button => button.addEventListener("click", () => {
    const box = button.closest(".path-challenge");
    const feedback = $(".challenge-feedback", box);
    if (button.dataset.answer === "correct") {
      state.paths = uniqueAdd(state.paths, box.dataset.path); save(); updateProgress();
      feedback.textContent = "That route matches this democratic filter. ✓"; feedback.className = "challenge-feedback is-correct";
    } else { feedback.textContent = "Not this filter. Compare the route above and try again."; feedback.className = "challenge-feedback is-wrong"; }
  }));
  $$(".classify button").forEach(button => button.addEventListener("click", () => {
    const card = button.closest(".evidence-card");
    const feedback = $(":scope > p", card);
    if (button.dataset.choice === card.dataset.evidence) {
      state.evidence = uniqueAdd(state.evidence, card.dataset.evidence); save(); updateEvidence();
    } else { feedback.textContent = "Look at the argument, not just the topic. Try again."; feedback.className = "is-wrong"; }
  }));
  fieldIds.forEach(id => {
    const field = $(`#${id}`);
    field.value = state.fields[id] || "";
    field.addEventListener("input", () => { state.fields[id] = field.value; save(); updatePassport(); });
    field.addEventListener("change", () => { state.fields[id] = field.value; save(); updatePassport(); });
  });
  $("#preview-passport").addEventListener("click", () => { $("#passport").hidden = false; updatePassport(); $("#passport").scrollIntoView({ behavior: "smooth", block: "start" }); });
  $("#print-passport").addEventListener("click", () => { $("#passport").hidden = false; updatePassport(); window.print(); });
  $("#reset-lesson").addEventListener("click", () => { if (window.confirm("Erase saved progress for this lesson and start over?")) { localStorage.removeItem(key); window.location.reload(); } });

  if (state.opening) { const opening = $(`input[name=opening][value=${state.opening}]`); if (opening) opening.checked = true; }
  updateProgress(); updateEvidence(); updatePassport();
})();
