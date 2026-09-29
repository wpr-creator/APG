// ═══════════════════════════════════════════════════════════════════
// NAV RENDERER — builds the top nav from data instead of copy-paste
// ═══════════════════════════════════════════════════════════════════
// This renderer is used by the standalone unit, document, and case pages.
// It mirrors the five-item navigation on the primary single-page site so
// students always have the same way back to the main course views.
//
// HOW A PAGE USES THIS (once wired in):
//   <div id="app-nav"></div>
//   <script src="nav-render.js"></script>
//   <script>renderNav({ mountId: "app-nav", currentFile: "unit2-docs.html", basePath: "" })</script>
//
// `basePath` lets a page override the leading "/APG/" root if that
// ever needs to change (e.g. local testing without GitHub Pages'
// project-site prefix). Defaults to "/APG/".
// ═══════════════════════════════════════════════════════════════════

function buildNavHTML(opts) {
  const basePath = (opts && opts.basePath) || "/APG/";
  return [
    ["HOME", "#home"],
    ["UNITS", "#units"],
    ["FOUNDATIONS", "#foundations"],
    ["GLOSSARY", "#words"],
    ["EXIT TICKET", "#exit-ticket"]
  ].map(function ([label, hash]) {
    const active = label === "UNITS";
    return `<a class="nav-tab${active ? " active" : ""}" href="${basePath}${hash}"${active ? ' aria-current="page"' : ""}>${label}</a>`;
  }).join("\n");
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
      toggle.innerHTML = '<i class="ti ti-menu-2" aria-hidden="true"></i><span>MENU</span>';
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

  function closeMenu() {
    nav.classList.remove('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      const willOpen = !nav.classList.contains('menu-open');
      closeMenu();
      nav.classList.toggle('menu-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
  }

  items.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });
}
