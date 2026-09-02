(() => {
  const key = document.body.dataset.section;
  const data = (window.HISTORY_SECTIONS || {})[key];
  if (!data) return;
  document.title = `${data.title} · The History Lesson`;
  document.getElementById("section-number").textContent = `SECTION ${data.number}`;
  document.getElementById("section-topic").textContent = data.topic;
  document.getElementById("section-years").textContent = data.years;
  document.getElementById("section-title").textContent = data.title;
  document.getElementById("section-subtitle").textContent = data.subtitle;
  const image = document.getElementById("section-image");
  image.src = data.image; image.alt = data.alt;
  document.getElementById("central-claim").textContent = data.claim;
  document.getElementById("background-copy").innerHTML = data.background.map(text => `<p>${text}</p>`).join("");
  document.getElementById("facts-grid").innerHTML = data.facts.map(([title, text]) => `<article><h3>${title}</h3><p>${text}</p></article>`).join("");
  document.getElementById("cause-chain").innerHTML = data.chain.map((text, index) => `<span>${text}</span>${index < data.chain.length - 1 ? '<i aria-hidden="true">→</i>' : ''}`).join("");
  document.getElementById("evidence-list").innerHTML = data.evidence.map(text => `<li>${text}</li>`).join("");
  document.getElementById("vocabulary-list").innerHTML = data.vocabulary.map(text => `<li>${text}</li>`).join("");
  document.getElementById("document-links").innerHTML = data.documents.map(([label, url]) => `<a href="${url}">${label} →</a>`).join("");
  document.getElementById("teach-list").innerHTML = data.teach.map(text => `<li>${text}</li>`).join("");
  document.getElementById("teach-question").textContent = data.question;

  const keys = Object.keys(window.HISTORY_SECTIONS);
  const index = keys.indexOf(key);
  const previous = document.getElementById("previous-section");
  const next = document.getElementById("next-section");
  if (index > 0) previous.href = `history-${keys[index - 1]}.html`;
  else previous.hidden = true;
  if (index < keys.length - 1) next.href = `history-${keys[index + 1]}.html`;
  else next.hidden = true;

  const glossary = new Map();
  (window.APG_GLOSSARY_UNITS || []).forEach(unit => Object.values(unit.groups || {}).flat().forEach(entry => {
    const termKey = entry[0].trim().toLowerCase();
    if (!glossary.has(termKey)) glossary.set(termKey, { term: entry[0], definition: entry[1] });
  }));
  const terms = Array.from(glossary.values()).sort((a, b) => b.term.length - a.term.length);
  const pattern = terms.map(item => item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  if (!pattern) return;
  const matcher = new RegExp(`(^|[^A-Za-z0-9])(${pattern})(?=$|[^A-Za-z0-9])`, "gi");
  const walker = document.createTreeWalker(document.querySelector("main"), NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      return node.data.trim() && parent && !parent.closest("a,script,style,.section-number,.section-years") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    matcher.lastIndex = 0;
    const matches = Array.from(node.data.matchAll(matcher));
    if (!matches.length) return;
    const fragment = document.createDocumentFragment(); let cursor = 0;
    matches.forEach(match => {
      const start = match.index + match[1].length;
      fragment.append(document.createTextNode(node.data.slice(cursor, start)));
      const record = glossary.get(match[2].toLowerCase());
      const link = document.createElement("a");
      link.className = "glossary-term";
      link.href = `./?glossary=${encodeURIComponent(record.term)}#words`;
      link.textContent = match[2]; link.dataset.definition = record.definition;
      link.setAttribute("aria-label", `${record.term}: ${record.definition}. Open glossary entry.`);
      fragment.append(link); cursor = start + match[2].length;
    });
    fragment.append(document.createTextNode(node.data.slice(cursor))); node.replaceWith(fragment);
  });
})();
