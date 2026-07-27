(() => {
  const grid = document.querySelector("#president-grid");
  const status = document.querySelector("#president-status");
  const search = document.querySelector("#president-search");
  let presidents = [];

  const addText = (parent, tag, text, className = "") => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    parent.append(node);
    return node;
  };

  const render = () => {
    const query = search.value.trim().toLowerCase();
    const matches = presidents.filter(item =>
      `${item.name} ${item.order} ${item.yearsInOffice}`.toLowerCase().includes(query)
    );
    status.textContent = `${matches.length} ${matches.length === 1 ? "PRESIDENT" : "PRESIDENTS"} SHOWN`;
    grid.replaceChildren();
    matches.forEach(president => {
      const card = document.createElement("article");
      card.className = "president-card";
      const portrait = document.createElement("img");
      portrait.src = president.portrait.replace(/^assets\/presidents\//, "assets/presidents/");
      portrait.alt = `Portrait of ${president.name}`;
      portrait.loading = "lazy";
      card.append(portrait);
      const heading = document.createElement("div");
      heading.className = "president-card-heading";
      addText(heading, "span", `PRESIDENT ${president.order}`);
      addText(heading, "h2", president.name);
      addText(heading, "strong", president.yearsInOffice);
      card.append(heading);
      const details = document.createElement("details");
      addText(details, "summary", "Open profile");
      const facts = document.createElement("div");
      facts.className = "president-facts";
      [["Born in", president.birthplace], ["Religion or tradition", president.religion], ["Education", president.education], ["Work before the presidency", president.careerBeforePresidency]].forEach(([label, value]) => {
        const row = document.createElement("p");
        addText(row, "b", label);
        addText(row, "span", value);
        facts.append(row);
      });
      addText(facts, "h3", "KEY ACCOMPLISHMENTS");
      const list = document.createElement("ul");
      president.keyAccomplishments.forEach(item => addText(list, "li", item));
      facts.append(list);
      addText(facts, "h3", "IN THEIR WORDS");
      (president.importantQuotes || [president.importantQuote]).forEach(quote => {
        const wrap = document.createElement("div");
        wrap.className = "president-quote";
        addText(wrap, "blockquote", `“${quote.text || quote}”`);
        if (quote.sourceUrl) {
          const link = addText(wrap, "a", `${quote.sourceLabel || "Quote source"} ↗`);
          link.href = quote.sourceUrl;
          link.target = "_blank";
          link.rel = "noopener";
        }
        facts.append(wrap);
      });
      const source = addText(facts, "a", "Biography and sources ↗", "president-source");
      source.href = president.sources.biographyAndQuote;
      source.target = "_blank";
      source.rel = "noopener";
      details.append(facts);
      card.append(details);
      grid.append(card);
    });
  };

  fetch("assets/presidents/president-facts.json")
    .then(response => {
      if (!response.ok) throw new Error("President data unavailable");
      return response.json();
    })
    .then(payload => { presidents = payload.presidents || []; render(); })
    .catch(() => { status.textContent = "PRESIDENT FACT CARDS ARE TEMPORARILY UNAVAILABLE."; });
  search.addEventListener("input", render);
})();
