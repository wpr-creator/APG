(() => {
  const params = new URLSearchParams(location.search);
  const stages = window.HISTORY_RESEARCH || [];
  const stage = stages.find(item => item.id === params.get("stage")) || stages[0];
  if (!stage) return;
  document.title = `${stage.title} · The History Lesson`;
  const hero = document.getElementById("research-hero");
  hero.innerHTML = `<div><p class="eyebrow">INVESTIGATION ${stage.number} · ${stage.years}</p><h1>${stage.title}</h1><p>${stage.subtitle}</p><a class="start-link" href="#research-content">START RESEARCH ↓</a></div><figure><img src="${stage.image}" alt="${stage.alt}" width="960" height="720"></figure>`;
  const nav = document.getElementById("stage-nav");
  stages.forEach(item => {
    const link = document.createElement("a");
    link.href = `history-research.html?stage=${item.id}`;
    link.textContent = item.number;
    if (item.id === stage.id) link.setAttribute("aria-current", "page");
    link.title = item.title;
    nav.append(link);
  });
  const cards = [
    ["WHEN", stage.years], ["PROBLEM / FEAR", stage.problem], ["RESPONSE", stage.response],
    ["POWER SHIFT", stage.power], ["TYRANNY CHECK", stage.tyranny], ["HISTORICAL CONSEQUENCE", stage.consequence]
  ];
  const content = document.getElementById("research-content");
  content.innerHTML = cards.map(([label, text], index) => `<article class="research-card card-${index + 1}"><span>${label}</span><p>${text}</p></article>`).join("") +
    `<article class="research-card evidence-card"><span>USE THIS EVIDENCE</span><ul>${stage.evidence.map(item => `<li>${item}</li>`).join("")}</ul></article>` +
    `<article class="research-card task-card"><span>YOUR JOB</span><ol>${stage.tasks.map(item => `<li>${item}</li>`).join("")}</ol></article>` +
    `<article class="research-card document-card"><span>KEY DOCUMENTS</span><div class="research-links">${stage.documents.map(([name, url]) => `<a href="${url}">${name} →</a>`).join("")}</div></article>` +
    `<article class="research-card terms-card"><span>WORD WALL</span><dl>${stage.terms.map(([term, definition]) => `<div><dt>${term}</dt><dd>${definition}</dd></div>`).join("")}</dl><a class="glossary-link" href="./#words">OPEN THE FULL GLOSSARY →</a></article>`;
  const key = `apg-history-research-${stage.id}`;
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || "{}"); } catch {}
  document.querySelectorAll("[data-save]").forEach(field => {
    field.value = saved[field.dataset.save] || "";
    field.addEventListener("input", () => {
      saved[field.dataset.save] = field.value;
      localStorage.setItem(key, JSON.stringify(saved));
      document.getElementById("entry-status").textContent = "Notes saved ✓";
    });
  });
})();
