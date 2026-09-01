(function () {
  "use strict";

  const data = window.HEARD_EXPLORER_DATA;
  const search = document.getElementById("organization-search");
  const topics = document.getElementById("topic-buttons");
  const grid = document.getElementById("organization-grid");
  const count = document.getElementById("result-count");
  const empty = document.getElementById("empty-state");
  const surprise = document.getElementById("surprise-button");
  const tray = document.getElementById("compare-tray");
  const compareStatus = document.getElementById("compare-status");
  const compareButton = document.getElementById("open-comparison");
  const clearButton = document.getElementById("clear-comparison");
  const comparison = document.getElementById("comparison");
  const comparisonGrid = document.getElementById("comparison-grid");
  let selectedTopic = data.topics[0].id;
  const selectedOrganizations = new Set();

  function topicFor(id) { return data.topics.find(function (topic) { return topic.id === id; }); }
  function organizationFor(id) { return data.organizations.find(function (organization) { return organization.id === id; }); }
  function normal(value) { return String(value || "").toLowerCase().trim(); }

  function matchesQuery(text, query) {
    if (!query) return true;
    if (query.includes(" ")) return text.includes(query);
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("\\b" + safeQuery + "\\b").test(text);
  }

  function searchableText(organization) {
    const topic = topicFor(organization.topic);
    return normal([organization.name, organization.summary, organization.represents, organization.wants, topic.label].concat(topic.aliases).join(" "));
  }

  function topicButton(topic) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.topic = topic.id;
    button.textContent = topic.label;
    button.setAttribute("aria-pressed", String(topic.id === selectedTopic));
    button.addEventListener("click", function () {
      selectedTopic = topic.id;
      search.value = "";
      renderTopics();
      renderOrganizations();
    });
    return button;
  }

  function renderTopics() {
    topics.replaceChildren.apply(topics, data.topics.map(topicButton));
  }

  function field(title, text) {
    const section = document.createElement("section");
    const heading = document.createElement("h4");
    const copy = document.createElement("p");
    heading.textContent = title;
    copy.textContent = text;
    section.append(heading, copy);
    return section;
  }

  function card(organization) {
    const article = document.createElement("article");
    article.className = "organization-card";
    article.dataset.organization = organization.id;
    const top = document.createElement("div");
    top.className = "card-top";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = organization.badge;
    const identity = document.createElement("div");
    const issue = document.createElement("p");
    issue.className = "issue-label";
    issue.textContent = topicFor(organization.topic).label;
    const title = document.createElement("h3");
    title.textContent = organization.name;
    identity.append(issue, title);
    top.append(badge, identity);
    const summary = document.createElement("p");
    summary.className = "summary";
    summary.textContent = organization.summary;
    const actions = document.createElement("div");
    actions.className = "card-actions";
    const open = document.createElement("button");
    open.type = "button";
    open.className = "open-card";
    open.textContent = "OPEN CARD";
    open.setAttribute("aria-expanded", "false");
    const compare = document.createElement("button");
    compare.type = "button";
    compare.className = "compare-card";
    compare.textContent = selectedOrganizations.has(organization.id) ? "✓ ADDED" : "+ COMPARE";
    compare.setAttribute("aria-pressed", String(selectedOrganizations.has(organization.id)));
    actions.append(open, compare);
    const details = document.createElement("div");
    details.className = "card-details";
    details.hidden = true;
    details.append(
      field("WHO ARE THEY?", organization.who),
      field("WHOSE INTERESTS DO THEY REPRESENT?", organization.represents),
      field("WHAT DO THEY WANT GOVERNMENT TO DO?", organization.wants),
      field("HOW DO THEY TRY TO GET HEARD?", organization.methods),
      field("WHO MIGHT COMPETE WITH THEM?", organization.competes)
    );
    const source = document.createElement("a");
    source.href = organization.url;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.textContent = "VISIT OFFICIAL WEBSITE ↗";
    details.append(source);
    open.addEventListener("click", function () {
      details.hidden = !details.hidden;
      open.setAttribute("aria-expanded", String(!details.hidden));
      open.textContent = details.hidden ? "OPEN CARD" : "CLOSE CARD";
    });
    compare.addEventListener("click", function () { toggleComparison(organization.id); });
    article.append(top, summary, actions, details);
    return article;
  }

  function filteredOrganizations() {
    const query = normal(search.value);
    if (query) return data.organizations.filter(function (organization) { return matchesQuery(searchableText(organization), query); });
    return data.organizations.filter(function (organization) { return organization.topic === selectedTopic; });
  }

  function renderOrganizations() {
    const organizations = filteredOrganizations();
    grid.replaceChildren.apply(grid, organizations.map(card));
    count.textContent = organizations.length + (organizations.length === 1 ? " ORGANIZATION" : " ORGANIZATIONS");
    empty.hidden = organizations.length !== 0;
  }

  function toggleComparison(id) {
    if (selectedOrganizations.has(id)) selectedOrganizations.delete(id);
    else if (selectedOrganizations.size < 3) selectedOrganizations.add(id);
    else {
      compareStatus.textContent = "You can compare up to three cards. Remove one before adding another.";
      tray.hidden = false;
      return;
    }
    renderOrganizations();
    updateCompareTray();
  }

  function updateCompareTray() {
    const size = selectedOrganizations.size;
    tray.hidden = size === 0;
    compareStatus.textContent = size === 1 ? "1 card selected. Add at least one more." : size + " cards selected.";
    compareButton.disabled = size < 2;
    if (!size) {
      comparison.hidden = true;
      comparisonGrid.replaceChildren();
    }
  }

  function compareCard(organization) {
    const article = document.createElement("article");
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = organization.badge;
    const title = document.createElement("h3");
    title.textContent = organization.name;
    article.append(badge, title,
      field("WHOSE INTERESTS?", organization.represents),
      field("WHAT DO THEY WANT?", organization.wants),
      field("HOW DO THEY GET HEARD?", organization.methods)
    );
    return article;
  }

  search.addEventListener("input", function () {
    selectedTopic = "";
    renderTopics();
    renderOrganizations();
  });

  surprise.addEventListener("click", function () {
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    const organization = data.organizations[values[0] % data.organizations.length];
    selectedTopic = organization.topic;
    search.value = organization.name;
    renderTopics();
    renderOrganizations();
    const article = grid.querySelector(".organization-card");
    const open = article && article.querySelector(".open-card");
    if (open) open.click();
    if (article) article.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  });

  compareButton.addEventListener("click", function () {
    const chosen = Array.from(selectedOrganizations).map(organizationFor).filter(Boolean);
    comparisonGrid.replaceChildren.apply(comparisonGrid, chosen.map(compareCard));
    comparison.hidden = false;
    comparison.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });

  clearButton.addEventListener("click", function () {
    selectedOrganizations.clear();
    renderOrganizations();
    updateCompareTray();
  });

  renderTopics();
  renderOrganizations();
  updateCompareTray();
}());
