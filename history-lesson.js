(() => {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;
  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = total > 0 ? Math.min(100, Math.max(0, window.scrollY / total * 100)) : 0;
    bar.style.width = `${percent}%`;
  };
  update();
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);

  const glossary = new Map();
  (window.APG_GLOSSARY_UNITS || []).forEach(unit => {
    Object.values(unit.groups || {}).flat().forEach(entry => {
      const key = entry[0].trim().toLowerCase();
      if (!glossary.has(key)) glossary.set(key, { term: entry[0], definition: entry[1] });
    });
  });

  document.querySelectorAll("a.term-link").forEach(link => link.replaceWith(document.createTextNode(link.textContent)));
  const terms = Array.from(glossary.values()).sort((left, right) => right.term.length - left.term.length);
  const pattern = terms.map(item => item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  if (!pattern) return;
  const matcher = new RegExp(`(^|[^A-Za-z0-9])(${pattern})(?=$|[^A-Za-z0-9])`, "gi");
  const walker = document.createTreeWalker(document.querySelector("main"), NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!node.data.trim() || !parent || parent.closest("a, script, style, textarea, .date")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(node => {
    matcher.lastIndex = 0;
    const matches = Array.from(node.data.matchAll(matcher));
    if (!matches.length) return;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    matches.forEach(match => {
      const termStart = match.index + match[1].length;
      fragment.append(document.createTextNode(node.data.slice(cursor, termStart)));
      const record = glossary.get(match[2].toLowerCase());
      const anchor = document.createElement("a");
      anchor.className = "glossary-term";
      anchor.href = `./?glossary=${encodeURIComponent(record.term)}#words`;
      anchor.textContent = match[2];
      anchor.dataset.definition = record.definition;
      anchor.setAttribute("aria-label", `${record.term}: ${record.definition}. Open glossary entry.`);
      fragment.append(anchor);
      cursor = termStart + match[2].length;
    });
    fragment.append(document.createTextNode(node.data.slice(cursor)));
    node.replaceWith(fragment);
  });
})();
