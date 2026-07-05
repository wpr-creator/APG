// ═══════════════════════════════════════════════════════════════════
// NAV RENDERER — builds the top nav from data instead of copy-paste
// ═══════════════════════════════════════════════════════════════════
// STATUS: Step 2. Depends on data-required.js being loaded first
// (needs REQUIRED_DOCS and REQUIRED_CASES). Not wired into any page
// yet — this is still just the renderer, ready to be dropped into one
// test page next.
//
// STANDARD CHOSEN: "Simple" nav — each unit dropdown shows only
// Overview / Documents / Cases (whichever exist for that unit), never
// a list of individual docs/cases. This matches what unit1.html,
// unit1-docs.html, federalist-70.html, etc. already do. The
// inconsistent "detailed" version (seen on federalist-10.html,
// federalist-51.html, and all case pages, which list every doc/case
// by name) will be replaced by this simple version everywhere once
// this is wired in.
//
// HOW A PAGE USES THIS (once wired in):
//   <div id="app-nav"></div>
//   <script src="data-required.js"></script>      <!-- adjust ../ as needed -->
//   <script src="nav-render.js"></script>
//   <script>renderNav({ mountId: "app-nav", currentFile: "unit2-docs.html", basePath: "" })</script>
//
// `currentFile` should be the file's path relative to the site root
// (e.g. "unit2-docs.html", "docs/federalist-70.html",
// "cases/marbury-v-madison.html", "index.html"). Used only to apply
// the .active / .has-active highlight classes — never changes what
// links appear.
//
// `basePath` lets a page override the leading "/APG/" root if that
// ever needs to change (e.g. local testing without GitHub Pages'
// project-site prefix). Defaults to "/APG/".
// ═══════════════════════════════════════════════════════════════════

const NAV_STATIC_TABS = [
  {
    label: "Review",
    items: [
      { label: "FRQ & Review", href: "#review" },
      { label: "FRQ Archive", href: "#archive" },
      { label: "Diagnostic Quiz", href: "#diagnostic" }
    ]
  },
  {
    label: "Tools",
    items: [
      { label: "Glossary", href: "#glossary" },
      { label: "Amendment Tracker", href: "#amendments" },
      { label: "Cartoon Analyzer", href: "#cartoon" },
      { label: "What Would Madison Say?", href: "#madison" },
      { label: "Stump the Class", href: "#stump" },
      { label: "Exit Ticket", href: "#exit" }
    ]
  }
];

// Which units get an Overview link and what unit numbers exist.
// Unit 4 has no required docs/cases (confirmed by REQUIRED_DOCS /
// REQUIRED_CASES having zero unit:4 entries) but still gets an
// Overview page, so it's listed explicitly here rather than derived.
const NAV_UNIT_NUMBERS = [1, 2, 3, 4, 5];

function _navUnitHasDocs(unitNum) {
  return REQUIRED_DOCS.some(d => d.unit === unitNum);
}
function _navUnitHasCases(unitNum) {
  return REQUIRED_CASES.some(c => c.unit === unitNum);
}

function _navLink(href, label, currentFile, basePath) {
  const fullHref = basePath + href;
  const isActive = currentFile && href.replace(/^\//, "") === currentFile.replace(/^\//, "");
  return `<a class="nav-link${isActive ? " active" : ""}" href="${fullHref}">${label}</a>`;
}

function buildNavHTML(opts) {
  const currentFile = (opts && opts.currentFile) || "";
  const basePath = (opts && opts.basePath) || "/APG/";

  let html = `<a class="nav-link${currentFile === "index.html" || currentFile === "" ? " active" : ""}" href="${basePath}">Home</a>\n`;

  NAV_UNIT_NUMBERS.forEach(unitNum => {
    const overviewFile = `unit${unitNum}.html`;
    const docsFile = `unit${unitNum}-docs.html`;
    const casesFile = `unit${unitNum}-cases.html`;
    const hasDocs = _navUnitHasDocs(unitNum);
    const hasCases = _navUnitHasCases(unitNum);

    // A unit's dropdown is "active" (highlighted group) if the current
    // page is its overview, its docs landing, its cases landing, OR
    // any individual doc/case page that belongs to this unit.
    const belongsToThisUnit =
      currentFile === overviewFile ||
      currentFile === docsFile ||
      currentFile === casesFile ||
      REQUIRED_DOCS.some(d => d.unit === unitNum && currentFile === d.file) ||
      REQUIRED_CASES.some(c => c.unit === unitNum && currentFile === c.file);

    let links = _navLink(overviewFile, "Overview", currentFile, basePath);
    if (hasDocs) links += "\n          " + _navLink(docsFile, "Documents", currentFile, basePath);
    if (hasCases) links += "\n          " + _navLink(casesFile, "Cases", currentFile, basePath);

    html += `      <div class="nav-group${belongsToThisUnit ? " has-active" : ""}">
        <div class="nav-group-label">Unit ${unitNum}</div>
        <div class="nav-dropdown">
          ${links}
        </div>
      </div>\n`;
  });

  NAV_STATIC_TABS.forEach(tab => {
    const items = tab.items
      .map(item => `        <a class="nav-link" href="${basePath}${item.href}">${item.label}</a>`)
      .join("\n");
    html += `      <div class="nav-group">
        <div class="nav-group-label">${tab.label}</div>
        <div class="nav-dropdown">
${items}
        </div>
      </div>\n`;
  });

  html += `      <a class="nav-link nav-link-foundations" href="${basePath}#skills">Foundations</a>\n`;

  return html;
}

function renderNav(opts) {
  const mountId = (opts && opts.mountId) || "app-nav";
  const el = document.getElementById(mountId);
  if (!el) {
    console.error(`renderNav: no element with id="${mountId}" found`);
    return;
  }
  el.className = "nav-inner";
  el.innerHTML = buildNavHTML(opts);
}

// Console self-check: confirms which units will show a Documents
// and/or Cases link, so you can eyeball it against what should exist
// before wiring this into a live page.
function _auditNavStructure() {
  NAV_UNIT_NUMBERS.forEach(u => {
    console.log(`Unit ${u}: Overview` +
      (_navUnitHasDocs(u) ? " + Documents" : "") +
      (_navUnitHasCases(u) ? " + Cases" : ""));
  });
}
