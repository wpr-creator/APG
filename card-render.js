// ═══════════════════════════════════════════════════════════════════
// CARD RENDERER — builds doc/case landing page grids + hero from data
// ═══════════════════════════════════════════════════════════════════
// STATUS: Colors and fonts here mirror styles-pages.css and the
// per-unit visual identity system exactly. If you change a unit's
// palette or heading font in styles-pages.css, update the matching
// entry below too -- these are deliberately kept separate since this
// file generates inline styles (can't read CSS custom properties).
//
// Per teacher direction: the old subtitle line ("X required documents
// · Select one to read with full annotations") is dropped. The hero
// shows just the unit eyebrow + page title.
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
    headingFont: "'Archivo', sans-serif", headingWeight: 900, headingStyle: "normal", headingTransform: "uppercase",
    heroBg: "#2c1810",
    eyebrowColor: "#b8952a",
    heroTitleColor: "#f5ead6",
    cardBg: "#fdf6e8", cardBorder: "#d4b896", cardHoverBorder: "#2c1810",
    headerBg: "#2c1810",
    cardTitleColor: "#f5ead6", cardMetaColor: "rgba(184,149,42,0.7)",
    cardBodyColor: "#5c3d2e", linkColor: "#b8952a"
  },
  2: {
    headingFont: "'Oswald', sans-serif", headingWeight: 600, headingStyle: "normal", headingTransform: "uppercase",
    heroBg: "#f7f5f0",
    eyebrowColor: "#8a6d1f",
    heroTitleColor: "#2d2d30",
    cardBg: "white", cardBorder: "#ded9c7", cardHoverBorder: "#2d2d30",
    headerBg: "#f7f5f0", headerBorderBottom: "3px solid #c8a951",
    cardTitleColor: "#2d2d30", cardMetaColor: "#8a6d1f",
    cardBodyColor: "#3a3a3a", linkColor: "#8a6d1f",
    caseBadgeBg: "#2d2d30", caseBadgeDate: "#c8a951", caseTitleColor: "#2d2d30"
  },
  3: {
    headingFont: "'Anton', sans-serif", headingWeight: 400, headingStyle: "normal", headingTransform: "uppercase",
    heroBg: "#0a0a0a",
    eyebrowColor: "#999999",
    heroTitleColor: "white",
    cardBg: "white", cardBorder: "#d4d4d4", cardHoverBorder: "#0a0a0a",
    headerBg: "#0a0a0a",
    cardTitleColor: "white", cardMetaColor: "#999999",
    cardBodyColor: "#374151", linkColor: "#0a0a0a",
    caseBadgeBg: "#0a0a0a", caseBadgeDate: "#999999", caseTitleColor: "#0a0a0a"
  },
  4: {
    headingFont: "'Barlow Condensed', sans-serif", headingWeight: 700, headingStyle: "normal", headingTransform: "uppercase",
    heroBg: "#1e3a8a",
    eyebrowColor: "#fca5a5",
    heroTitleColor: "white",
    cardBg: "white", cardBorder: "#d1d5db", cardHoverBorder: "#1e3a8a",
    headerBg: "#1e3a8a", headerBorderBottom: "3px solid #b91c1c",
    cardTitleColor: "white", cardMetaColor: "#fca5a5",
    cardBodyColor: "#374151", linkColor: "#b91c1c",
    caseBadgeBg: "#1e3a8a", caseBadgeDate: "#fca5a5", caseTitleColor: "#1e3a8a"
  },
  5: {
    headingFont: "'IBM Plex Mono', monospace", headingWeight: 700, headingStyle: "normal", headingTransform: "uppercase",
    heroBg: "#1a1a1a",
    eyebrowColor: "#9a2323",
    heroTitleColor: "#faf8f3",
    cardBg: "#faf8f3", cardBorder: "#d4d0c5", cardHoverBorder: "#1a1a1a",
    headerBg: "#1a1a1a",
    cardTitleColor: "#faf8f3", cardMetaColor: "#c98888",
    cardBodyColor: "#2b2b2b", linkColor: "#9a2323",
    caseBadgeBg: "#1a1a1a", caseBadgeDate: "#c98888", caseTitleColor: "#1a1a1a"
  }
};

function renderDocsPage(opts) {
  const { unit, heroId, gridId, eyebrow, pageTitle } = opts;
  const theme = UNIT_THEMES[unit];
  const docs = REQUIRED_DOCS.filter(d => d.unit === unit);

  const heroEl = document.getElementById(heroId);
  if (heroEl) {
    heroEl.style.background = theme.heroBg;
    heroEl.style.padding = "24px 1.5rem 28px";
    heroEl.innerHTML = `
      <div style="max-width:1100px;margin:0 auto;">
        <div style="font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${theme.eyebrowColor};margin-bottom:6px;">${eyebrow}</div>
        <div style="font-family:${theme.headingFont};font-size:clamp(24px,3vw,36px);font-weight:${theme.headingWeight};font-style:${theme.headingStyle};text-transform:${theme.headingTransform};color:${theme.heroTitleColor};">${pageTitle || "Foundational Documents"}</div>
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
          <div style="background:${theme.headerBg};${theme.headerBorderBottom ? 'border-bottom:' + theme.headerBorderBottom + ';' : ''}padding:18px 20px;">
            <div style="font-size:26px;margin-bottom:6px;">${d.icon}</div>
            <div style="font-family:${theme.headingFont};font-size:15px;font-weight:${theme.headingWeight};text-transform:${theme.headingTransform};color:${theme.cardTitleColor};margin-bottom:3px;">${d.title}</div>
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
    heroEl.style.background = theme.heroBg;
    heroEl.style.padding = "24px 1.5rem 28px";
    heroEl.innerHTML = `
      <div style="max-width:1100px;margin:0 auto;">
        <div style="font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${theme.eyebrowColor};margin-bottom:6px;">${eyebrow}</div>
        <div style="font-family:${theme.headingFont};font-size:clamp(24px,3vw,36px);font-weight:${theme.headingWeight};font-style:${theme.headingStyle};text-transform:${theme.headingTransform};color:${theme.heroTitleColor};">${pageTitle || "Required SCOTUS Cases"}</div>
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
            <div style="font-size:8px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-top:4px;line-height:1.3;">${c.tag}</div>
          </div>
          <div style="padding:13px 15px;">
            <div style="font-family:${theme.headingFont};font-size:14px;font-weight:${theme.headingWeight};text-transform:${theme.headingTransform};color:${theme.caseTitleColor};margin-bottom:3px;">${c.title}</div>
            <div style="font-size:11px;color:#6b7280;font-style:italic;line-height:1.5;margin-bottom:5px;">${c.question}</div>
            <div style="font-size:11px;color:#374151;line-height:1.6;">${c.holding}</div>
          </div>
        </div>
      </a>`).join("")}
    </div>`;
  }
}
