// ═══════════════════════════════════════════════════════════════════
// CARD RENDERER — builds doc/case landing page grids + hero from data
// ═══════════════════════════════════════════════════════════════════
// STATUS: Step 4. Depends on data-required.js being loaded first.
// Colors below are copied exactly from the live unit1-docs / unit2-docs
// / unit3-docs / unit2-cases / unit3-cases / unit5-cases pages so the
// visual result matches what's already live.
//
// Per teacher direction: the old subtitle line ("X required documents
// · Select one to read with full annotations") is dropped. The hero
// now shows just the unit eyebrow + page title. The count is still
// implicitly correct since the grid always reflects REQUIRED_DOCS /
// REQUIRED_CASES exactly.
//
// USAGE (once wired into a page):
//   <div id="hero"></div>
//   <div id="card-grid"></div>
//   <script src="data-required.js"></script>
//   <script src="card-render.js"></script>
//   <script>
//     renderDocsPage({ unit: 2, heroId: "hero", gridId: "card-grid",
//       eyebrow: "Unit 2 · Interactions Among Branches" });
//   </script>
// or renderCasesPage({...}) for the case-card grid.
// ═══════════════════════════════════════════════════════════════════

const UNIT_THEMES = {
  1: {
    heroGradient: "linear-gradient(135deg,#2c1810 0%,#5c3d2e 100%)",
    eyebrowColor: "#b8952a",
    heroTitleColor: "#f5ead6",
    cardBg: "#fdf6e8", cardBorder: "#d4b896", cardHoverBorder: "#2c1810",
    headerGradient: "linear-gradient(120deg,#2c1810,#5c3d2e)",
    cardTitleColor: "#f5ead6", cardMetaColor: "rgba(184,149,42,0.7)",
    cardBodyColor: "#5c3d2e", linkColor: "#b8952a"
  },
  2: {
    heroGradient: "linear-gradient(135deg,#1a1a2e 0%,#374151 100%)",
    eyebrowColor: "#c8a951",
    heroTitleColor: "white",
    cardBg: "white", cardBorder: "#e5e7eb", cardHoverBorder: "#1a1a2e",
    headerGradient: "linear-gradient(120deg,#1a1a2e,#374151)",
    cardTitleColor: "white", cardMetaColor: "#c8a951",
    cardBodyColor: "#374151", linkColor: "#c8a951",
    caseBadgeBg: "#1a1a2e", caseBadgeDate: "#c8a951", caseTitleColor: "#1a1a2e"
  },
  3: {
    heroGradient: "linear-gradient(135deg,#0a0a0a 0%,#1f1f1f 100%)",
    eyebrowColor: "#b22234",
    heroTitleColor: "white",
    cardBg: "white", cardBorder: "#e0e0e0", cardHoverBorder: "#0a0a0a",
    headerGradient: "linear-gradient(120deg,#0a0a0a,#1f1f1f)",
    cardTitleColor: "white", cardMetaColor: "#b22234",
    cardBodyColor: "#374151", linkColor: "#b22234",
    caseBadgeBg: "#0a0a0a", caseBadgeDate: "#b22234", caseTitleColor: "#0a0a0a"
  },
  5: {
    heroGradient: "linear-gradient(135deg,#14532d 0%,#166534 100%)",
    eyebrowColor: "#86efac",
    heroTitleColor: "white",
    cardBg: "white", cardBorder: "#bbf7d0", cardHoverBorder: "#14532d",
    headerGradient: "linear-gradient(120deg,#14532d,#166534)",
    cardTitleColor: "white", cardMetaColor: "#86efac",
    cardBodyColor: "#374151", linkColor: "#16a34a",
    caseBadgeBg: "#14532d", caseBadgeDate: "#16a34a", caseTitleColor: "#14532d"
  }
};

function renderDocsPage(opts) {
  const { unit, heroId, gridId, eyebrow, pageTitle } = opts;
  const theme = UNIT_THEMES[unit];
  const docs = REQUIRED_DOCS.filter(d => d.unit === unit);

  const heroEl = document.getElementById(heroId);
  if (heroEl) {
    heroEl.style.background = theme.heroGradient;
    heroEl.style.padding = "24px 1.5rem 28px";
    heroEl.innerHTML = `
      <div style="max-width:1100px;margin:0 auto;">
        <div style="font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${theme.eyebrowColor};margin-bottom:6px;">${eyebrow}</div>
        <div style="font-family:'Playfair Display',serif;font-size:clamp(24px,3vw,36px);font-weight:900;color:${theme.heroTitleColor};font-style:italic;">${pageTitle || "Foundational Documents"}</div>
      </div>`;
  }

  const gridEl = document.getElementById(gridId);
  if (gridEl) {
    gridEl.style.maxWidth = "1100px";
    gridEl.style.margin = "0 auto";
    gridEl.style.padding = "28px 1.5rem 60px";
    gridEl.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;">
      ${docs.map(d => `
      <a href="/APG/${d.file}" style="text-decoration:none;">
        <div style="background:${theme.cardBg};border:1px solid ${theme.cardBorder};border-radius:12px;overflow:hidden;transition:box-shadow 0.15s,border-color 0.15s;" onmouseover="this.style.borderColor='${theme.cardHoverBorder}';this.style.boxShadow='0 4px 16px rgba(0,0,0,0.12)'" onmouseout="this.style.borderColor='${theme.cardBorder}';this.style.boxShadow='none'">
          <div style="background:${theme.headerGradient};padding:18px 20px;">
            <div style="font-size:26px;margin-bottom:6px;">${d.icon}</div>
            <div style="font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:${theme.cardTitleColor};margin-bottom:3px;">${d.title}</div>
            <div style="font-size:10px;color:${theme.cardMetaColor};font-family:'JetBrains Mono',monospace;">${d.author} · ${d.year}${d.tag ? " · " + d.tag : ""}</div>
          </div>
          <div style="padding:14px 16px;">
            <div style="font-size:12px;line-height:1.7;color:${theme.cardBodyColor};margin-bottom:10px;">${d.blurb}</div>
            <div style="font-size:11px;font-weight:700;color:${theme.linkColor};">Read with Annotations →</div>
          </div>
        </div>
      </a>`).join("")}
    </div>`;
  }
}

function renderCasesPage(opts) {
  const { unit, heroId, gridId, eyebrow, pageTitle } = opts;
  const theme = UNIT_THEMES[unit];
  const cases = REQUIRED_CASES.filter(c => c.unit === unit);

  const heroEl = document.getElementById(heroId);
  if (heroEl) {
    heroEl.style.background = theme.heroGradient;
    heroEl.style.padding = "24px 1.5rem 28px";
    heroEl.innerHTML = `
      <div style="max-width:1100px;margin:0 auto;">
        <div style="font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${theme.eyebrowColor};margin-bottom:6px;">${eyebrow}</div>
        <div style="font-family:'Playfair Display',serif;font-size:clamp(24px,3vw,36px);font-weight:900;color:${theme.heroTitleColor};font-style:italic;">${pageTitle || "Required SCOTUS Cases"}</div>
      </div>`;
  }

  const gridEl = document.getElementById(gridId);
  if (gridEl) {
    gridEl.style.maxWidth = "1100px";
    gridEl.style.margin = "0 auto";
    gridEl.style.padding = "28px 1.5rem 60px";
    gridEl.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;">
      ${cases.map(c => `
      <a href="/APG/${c.file}" style="text-decoration:none;">
        <div style="background:${theme.cardBg};border:1px solid ${theme.cardBorder};border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);display:grid;grid-template-columns:72px 1fr;transition:box-shadow 0.15s,border-color 0.15s;" onmouseover="this.style.borderColor='${theme.cardHoverBorder}';this.style.boxShadow='0 4px 16px rgba(0,0,0,0.12)'" onmouseout="this.style.borderColor='${theme.cardBorder}';this.style.boxShadow='0 1px 4px rgba(0,0,0,0.06)'">
          <div style="background:${theme.caseBadgeBg};padding:14px 10px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;color:${theme.caseBadgeDate};">${c.year}</div>
            <div style="font-size:8px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-top:4px;line-height:1.3;">${c.tag}</div>
          </div>
          <div style="padding:13px 15px;">
            <div style="font-size:13px;font-weight:800;color:${theme.caseTitleColor};margin-bottom:3px;">${c.title}</div>
            <div style="font-size:11px;color:#6b7280;font-style:italic;line-height:1.5;margin-bottom:5px;">${c.question}</div>
            <div style="font-size:11px;color:#374151;line-height:1.6;">${c.holding}</div>
          </div>
        </div>
      </a>`).join("")}
    </div>`;
  }
}
