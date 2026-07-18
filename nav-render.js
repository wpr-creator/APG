// ═══════════════════════════════════════════════════════════════════
// NAV RENDERER — builds the top nav from data instead of copy-paste
// ═══════════════════════════════════════════════════════════════════
// Depends on data-required.js being loaded first (needs REQUIRED_DOCS and
// REQUIRED_CASES). This renderer is used by the standalone unit, document,
// and case pages.
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
      { label: "FRQ Guide & Cases", href: "#review" },
      { label: "FRQ Archive", href: "#archive" },
      { label: "Glossary", href: "#glossary" },
      { label: "Amendment Tracker", href: "#amendments" }
    ]
  },
  {
    label: "Practice",
    items: [
      { label: "FRQ Practice", href: "#frqpractice" },
      { label: "Diagnostic Quiz", href: "#diagnostic" },
      { label: "Cartoon Analyzer", href: "#cartoons" },
      { label: "Stump the Class", href: "#stump" },
      { label: "What Would Madison Say?", href: "#madison" }
    ]
  }
];

// Which units get an Overview link and what unit numbers exist.
// Every unit has an overview page. Documents and cases are derived from the
// canonical required-content arrays, including The Wealth of Nations in Unit 4.
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
  return `<a class="nav-link${isActive ? " active" : ""}" href="${fullHref}"${isActive ? ' aria-current="page"' : ""}>${label}</a>`;
}

function buildNavHTML(opts) {
  const currentFile = (opts && opts.currentFile) || "";
  const basePath = (opts && opts.basePath) || "/APG/";

  const homeActive = currentFile === "index.html" || currentFile === "";
  let html = `<a class="nav-link${homeActive ? " active" : ""}" href="${basePath}"${homeActive ? ' aria-current="page"' : ""}>Home</a>\n`;

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
        <button class="nav-group-label" type="button" aria-expanded="false">Unit ${unitNum}</button>
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
        <button class="nav-group-label" type="button" aria-expanded="false">${tab.label}</button>
        <div class="nav-dropdown">
${items}
        </div>
      </div>\n`;
  });

  html += `      <a class="nav-link" href="${basePath}#exit">Exit Ticket</a>\n`;
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
  const nav = el.closest('nav');
  if (nav) nav.setAttribute('aria-label', 'Course navigation');

  el.className = "nav-inner";
  el.id = el.id || 'course-nav-items';
  el.innerHTML = buildNavHTML(opts);

  if (nav && !nav.querySelector('.nav-menu-toggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'nav-menu-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', el.id);
    toggle.innerHTML = '<i class="ti ti-menu-2" aria-hidden="true"></i><span>Menu</span>';
    nav.insertBefore(toggle, el);
  }

  addStandaloneSkipLink();
  wireStandaloneNavigation(nav, el);
}

function addStandaloneSkipLink() {
  if (document.querySelector('.skip-link')) return;
  const target = document.querySelector('main, .unit-hero, .doc-page, .case-page, .page-main, .docs-bento, .unit-main, #hero');
  if (!target) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addStandaloneSkipLink, { once: true });
    }
    return;
  }
  target.id = target.id || 'main-content';
  target.setAttribute('tabindex', '-1');
  const skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = '#' + target.id;
  skip.textContent = 'Skip to main content';
  document.body.insertBefore(skip, document.body.firstChild);
}

function wireStandaloneNavigation(nav, items) {
  if (!nav || nav.dataset.navigationReady === 'true') return;
  nav.dataset.navigationReady = 'true';
  const toggle = nav.querySelector('.nav-menu-toggle');

  function closeGroups(except) {
    items.querySelectorAll('.nav-group').forEach(function (group) {
      if (group === except) return;
      group.classList.remove('open');
      const label = group.querySelector('.nav-group-label');
      if (label) label.setAttribute('aria-expanded', 'false');
    });
  }

  function closeMenu() {
    nav.classList.remove('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    closeGroups();
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      const willOpen = !nav.classList.contains('menu-open');
      closeMenu();
      nav.classList.toggle('menu-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
  }

  items.querySelectorAll('.nav-group-label').forEach(function (label) {
    label.addEventListener('click', function () {
      const group = label.closest('.nav-group');
      const willOpen = !group.classList.contains('open');
      closeGroups(group);
      group.classList.toggle('open', willOpen);
      label.setAttribute('aria-expanded', String(willOpen));
    });
  });

  items.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target)) closeGroups();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });
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
