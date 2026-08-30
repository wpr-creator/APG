(() => {
  "use strict";
  const key = "apg-democracy-filtered-v1";
  const submissionUrl = "https://script.google.com/macros/s/AKfycbyPbD_iSjdjtKO48jc2QDsMysiGl4j_K0ZzKlJeWlRVGgZJ8LSINO6iFWwPjd6a9gfe6w/exec";
  const empty = { opening: "", paths: [], evidence: [], fields: {}, submission: null };
  let state = load();
  let roster = [];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const termDefinitions = {
    "REPUBLICANISM": "People govern through elected representatives.",
    "REPRESENTATIVE DEMOCRACY": "Citizens elect officials to make public decisions for them.",
    "PUBLIC POLICY": "A decision or action taken by government.",
    "PARTICIPATORY DEMOCRACY": "A model that emphasizes broad and direct citizen involvement in political decisions.",
    "POLITICAL PARTICIPATION": "Actions people take to influence government.",
    "DIRECT DEMOCRACY": "Citizens vote directly on a law or policy.",
    "PLURALIST DEMOCRACY": "A model in which organized groups compete to influence public policy.",
    "FACTION": "A group united by a shared interest that may conflict with the rights or interests of others.",
    "INTEREST GROUP": "An organized group that tries to influence government policy.",
    "LOBBYING": "Contacting public officials to persuade them about a policy.",
    "COALITION": "Several groups working together toward the same goal.",
    "COMPROMISE": "An agreement in which each side gets some, but not all, of what it wants.",
    "ELITE DEMOCRACY": "A model in which elected leaders and influential minorities have substantial policy influence.",
    "POLITICAL ELITES": "A small group of leaders, experts, wealthy people, or well-connected people with strong political influence.",
    "INSTITUTIONAL FILTER": "A part of government that separates immediate public preferences from final policy decisions."
  };

  function addTermDefinitions() {
    const candidates = [$("#concept-title"), ...$$(".pitch strong")].filter(Boolean);
    candidates.forEach(element => {
      const term = element.textContent.trim().toUpperCase();
      const definition = termDefinitions[term];
      if (!definition) return;
      element.classList.add("key-term");
      element.tabIndex = 0;
      element.dataset.definition = definition;
      element.setAttribute("aria-label", `${term}: ${definition}`);
    });
  }

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
    const models = ["brutus", "madison", "hamilton"];
    const completedModels = models.filter(model => {
      const checks = $$(`.path-challenge[data-path="${model}"]`).map(box => box.dataset.check);
      return checks.length === 4 && checks.every(check => state.paths.includes(check));
    });
    const count = completedModels.length;
    $("#path-count").textContent = `${count} OF 3`;
    $("#progress-fill").style.width = `${(count / 3) * 100}%`;
    $$(".path-challenge").forEach(box => {
      if (!state.paths.includes(box.dataset.check)) return;
      $$('button', box).forEach(button => button.disabled = true);
      const feedback = $(".challenge-feedback", box);
      feedback.textContent = "CHECK COMPLETE ✓";
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

  const fieldIds = ["class-period", "student-name", "model-summary-response"];
  const minimums = { "class-period": 2, "student-name": 2, "model-summary-response": 80 };
  function completeReport() { return fieldIds.every(id => (($(`#${id}`).value || "").trim().length >= minimums[id])); }
  function value(id) { return ($(`#${id}`).value || "").trim(); }
  function payload() {
    return {
      type: "exit",
      date: new Date().toLocaleDateString("en-US"),
      period: value("class-period"), name: value("student-name"),
      question: "Democracy, Filtered — In your own words, describe each model and give one strength and one weakness for each.",
      response: value("model-summary-response")
    };
  }
  function fingerprint() { return JSON.stringify(payload()); }
  function showAward() {
    const award = $("#decision-award");
    award.className = "decision-award award-complete";
    $("#award-student").textContent = value("student-name");
    $("#award-period").textContent = `PERIOD ${value("class-period")}`;
    award.hidden = false;
  }
  function updateReport() {
    const done = completeReport();
    const confirmed = Boolean(done && state.submission?.confirmed && state.submission.fingerprint === fingerprint());
    $("#submit-judgment").disabled = !done || confirmed;
    $("#submit-judgment").textContent = confirmed ? "SAVED ✓" : "SUBMIT EXIT TICKET";
    $("#report-status").textContent = confirmed
      ? "YOUR EXIT TICKET IS SAVED."
      : done ? "READY TO SUBMIT." : "Write your response to submit.";
    $("#report-status").className = confirmed ? "report-status is-correct" : "report-status";
    $("#decision-award").hidden = !confirmed;
    if (confirmed) showAward();
  }
  function populatePeriods() {
    const periodField = $("#class-period");
    const savedPeriod = state.fields["class-period"] || "";
    periodField.replaceChildren(new Option("Choose your period", ""));
    roster.forEach(period => periodField.add(new Option(period.label, period.id)));
    if (roster.some(period => period.id === savedPeriod)) periodField.value = savedPeriod;
    populateStudents();
  }
  function populateStudents() {
    const periodId = value("class-period");
    const period = roster.find(item => item.id === periodId);
    const studentField = $("#student-name");
    const savedName = state.fields["student-name"] || "";
    studentField.replaceChildren(new Option(period ? "Choose your name" : "Choose your period first", ""));
    (period?.students || []).forEach(name => studentField.add(new Option(name, name)));
    studentField.disabled = !period;
    if (period?.students.includes(savedName)) studentField.value = savedName;
    else if (savedName) state.fields["student-name"] = "";
    updateReport();
  }
  async function loadRoster() {
    try {
      const response = await fetch("content.json", { cache: "no-store" });
      if (!response.ok) throw new Error("Roster unavailable");
      const content = await response.json();
      roster = Array.isArray(content.periods) ? content.periods : [];
      populatePeriods();
    } catch (error) {
      $("#report-status").textContent = "THE CLASS ROSTER IS TEMPORARILY UNAVAILABLE. SEE MR. ROGERS.";
    }
  }
  function newSubmissionId() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const bytes = new Uint32Array(4); crypto.getRandomValues(bytes);
    return `${Date.now()}-${Array.from(bytes, number => number.toString(36)).join("")}`;
  }
  function verifySubmission(submissionId) {
    return new Promise(resolve => {
      let attempts = 0;
      const callbackName = `apgDemocracyVerify_${submissionId.replace(/-/g, "_")}`;
      const check = () => {
        attempts += 1;
        const script = document.createElement("script");
        const cleanup = () => { script.remove(); delete window[callbackName]; };
        const timeout = window.setTimeout(() => { cleanup(); if (attempts < 6) window.setTimeout(check, 750); else resolve(false); }, 2500);
        window[callbackName] = result => {
          window.clearTimeout(timeout); cleanup();
          if (result?.saved) resolve(true); else if (attempts < 6) window.setTimeout(check, 750); else resolve(false);
        };
        script.onerror = () => { window.clearTimeout(timeout); cleanup(); if (attempts < 6) window.setTimeout(check, 750); else resolve(false); };
        script.src = `${submissionUrl}?type=exit&submissionId=${encodeURIComponent(submissionId)}&callback=${encodeURIComponent(callbackName)}&t=${Date.now()}`;
        document.head.append(script);
      };
      check();
    });
  }
  async function submitJudgment() {
    if (!completeReport()) return;
    const button = $("#submit-judgment");
    const status = $("#report-status");
    const submission = payload();
    const currentFingerprint = JSON.stringify(submission);
    if (!state.submission || state.submission.fingerprint !== currentFingerprint) {
      state.submission = { fingerprint: currentFingerprint, submissionId: newSubmissionId(), confirmed: false };
      save();
    }
    submission.submissionId = state.submission.submissionId;
    button.disabled = true; button.textContent = "SUBMITTING…"; status.textContent = "SENDING YOUR EXIT TICKET TO MR. ROGERS…";
    try {
      await fetch(submissionUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(submission) });
      if (!await verifySubmission(submission.submissionId)) throw new Error("Submission could not be confirmed");
      state.submission.confirmed = true; save(); updateReport(); showAward();
      $("#decision-award").scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      button.disabled = false; button.textContent = "TRY SUBMISSION AGAIN";
      status.textContent = "NOT CONFIRMED—YOUR RESPONSE MAY NOT HAVE SAVED. TRY AGAIN OR SEE MR. ROGERS.";
    }
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
      state.paths = uniqueAdd(state.paths, box.dataset.check); save(); updateProgress();
      feedback.textContent = "Yes—that idea fits this model. ✓"; feedback.className = "challenge-feedback is-correct";
    } else { feedback.textContent = "Not quite. Re-read the explanation and document connection, then try again."; feedback.className = "challenge-feedback is-wrong"; }
  }));
  $$(".classify button").forEach(button => button.addEventListener("click", () => {
    const card = button.closest(".evidence-card");
    const feedback = $(":scope > p", card);
    if (button.dataset.choice === card.dataset.evidence) {
      state.evidence = uniqueAdd(state.evidence, card.dataset.evidence); save(); updateEvidence();
    } else { feedback.textContent = "Look at the argument, not just the topic. Try again."; feedback.className = "is-wrong"; }
  }));
  fieldIds.filter(id => !["class-period", "student-name"].includes(id)).forEach(id => {
    const field = $(`#${id}`);
    field.value = state.fields[id] || "";
    field.addEventListener("input", () => { state.fields[id] = field.value; save(); updateReport(); });
    field.addEventListener("change", () => { state.fields[id] = field.value; save(); updateReport(); });
  });
  $("#class-period").addEventListener("change", () => { state.fields["class-period"] = value("class-period"); state.fields["student-name"] = ""; save(); populateStudents(); });
  $("#student-name").addEventListener("change", () => { state.fields["student-name"] = value("student-name"); save(); updateReport(); });
  $("#submit-judgment").addEventListener("click", submitJudgment);
  $("#reset-lesson").addEventListener("click", () => { if (window.confirm("Erase saved progress for this lesson and start over?")) { localStorage.removeItem(key); window.location.reload(); } });

  if (state.opening) { const opening = $(`input[name=opening][value=${state.opening}]`); if (opening) opening.checked = true; }
  addTermDefinitions(); updateProgress(); updateEvidence(); updateReport(); loadRoster();
})();
