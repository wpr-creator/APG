# Mr. Rogers — AP Government & Politics Website
### San Diego · Advanced Placement · College Board

---

## THE SHORT VERSION

**Weekly updates** → use the built-in Admin Panel (type `dev` on the site)
**Adding SCOTUS cases / glossary terms** → edit `index.html` directly
**Everything else** → handled automatically

---

## THE ADMIN PANEL (no JSON editing needed)

Type `d` `e` `v` anywhere on the site (not in a text box). A panel slides in with clean form fields for everything you update regularly. When done, click **Download content.json**, then drag the file into your GitHub repo. Site updates in ~60 seconds.

### What you can edit in the Admin Panel

| Tab | What you can change |
|---|---|
| **Weekly** | Current unit, week label, exit ticket question |
| **Materials** | Add/remove/reorder links to slides, docs, videos |
| **Upcoming** | Due dates (auto-turn red within 72 hours) |
| **Roster** | Student names for Period 2A and 2B |
| **Vocab** | Add/remove vocab of the day terms |
| **Links** | Quick links shown on the home tab |

---

## LESS FREQUENT UPDATES — `index.html`

These only need changing when course content changes, not weekly. Open `index.html` in VS Code or GitHub's editor and find the relevant section.

### Adding a SCOTUS Case

Find `const SCOTUS_CASES = [` and add a new object:

```javascript
{
  name: "Dobbs v. Jackson",
  year: 2022,
  unit: 3,
  topic: "Privacy Rights",
  issue: "Does the Constitution protect a right to abortion?",
  ruling: "No. The Court overturned Roe v. Wade, returning abortion regulation to the states.",
  sig: "Eliminated the federal constitutional right to abortion established in Roe (1973).",
  tip: "Know this overturned Roe. AP exam still tests Roe — focus on the 14th Amendment privacy rationale."
},
```

Unit numbers: 1 = Foundations · 2 = Branches · 3 = Civil Liberties · 4 = Ideology · 5 = Participation

The case automatically appears in the Review tab with the correct unit filter, and the Glossary tab auto-injects related term links into its modal.

### Adding a Required Foundational Document

Find `const REQ_DOCS = [` and add:

```javascript
{ name: "Federalist No. 84", type: "Federalist Paper", year: "1788" },
```

### Adding Glossary Terms

Find the relevant unit in `const GLOSSARY_UNITS = [` and add to the correct group:

```javascript
['Your Term', 'The definition of the term.', ['1.2']],
```

The third element is the AP standard tag (e.g. `'1.2'`, `'3.4'`).

---

## FEATURES OVERVIEW

### Home Tab
- **Hero banner** — current unit and week
- **This Day in American Government** — Wikipedia API, fully automatic, 90+ curated fallbacks
- **Vocab of the Day** — rotates daily, students can browse Prev/Next
- **Recent Materials** — links to Google Drive slides, docs, videos
- **Upcoming** — due dates, turns red within 72 hours
- **Quick Links** — AP Classroom and Google Classroom
- **Exit Ticket** — submits to Google Sheets, period + name dropdowns

### Units Tab
- All 5 AP Gov units with exam weights, topics, required cases, and foundational docs
- Current unit auto-highlighted

### FRQ & Review Tab
- FRQ strategy cards — all 4 types with point values and tips
- Required Foundational Documents — all 13 required docs
- SCOTUS Cases — all 15 required cases, filterable by unit, click for full detail modal
- **SCOTUS Case Quiz** — 15-question multiple choice, randomized, instant feedback with scoring
- **FRQ Practice Timer** — pick type, correct countdown, scoring checklist alongside

### Glossary Tab
- 392 terms, 5 units, 23 topic groups, AP standard tags
- **Browse mode** — search by term/definition/group, filter by unit
- **Flashcard mode** — flip cards, Got It / Still Learning tracker, persists in browser storage
- **Tooltips** — `data-term="term name"` on any element shows hover definition
- **URL navigation** — `yoursite.github.io/#term=judicial-review`

### Exit Ticket Tab
- Period selector (2A / 2B) and student name dropdown
- Submits to Google Sheets
- Creates Period 2A, Period 2B, and All Responses tabs automatically

---

## GOOGLE SHEETS

Your sheet: `https://docs.google.com/spreadsheets/d/16TcskHZ3QmcLsToZuyfCWnd24t5WtB4duTsX8x1tiqg/edit`

Columns: `Date | Period | Student Name | Question | Response | Submitted At`

The Apps Script is already deployed. If you ever need to redeploy:
1. Go to [script.google.com](https://script.google.com) → your project
2. Deploy → New Deployment → Web App → Execute as Me → Anyone
3. Copy the `/exec` URL
4. In `index.html` find `const SCRIPT_URL =` and update it

---

## FILE STRUCTURE

```
APG/
├── index.html              ← full site (edit for SCOTUS cases, glossary, design)
├── content.json            ← weekly data (edit via Admin Panel or directly)
├── exit-ticket-script.gs   ← Google Apps Script backup (already deployed)
└── README.md               ← this file
```

---

## FALL 2026 CED UPDATES (already applied)

- Emancipation Proclamation added (Unit 3, EK 3.12.A.1)
- Federalist No. 39 added (Unit 1, EK 1.7.A.1)
- The Gettysburg Address added (Unit 1, EK 1.1.A.3)
- Core Principles from Adam Smith's *The Wealth of Nations* added (Unit 4, EK 4.1.A.1)
- Free Enterprise, Adam Smith/Wealth of Nations, Emancipation Proclamation added to glossary
- Popular Sovereignty updated to reference Gettysburg Address

---

## TIPS

- **Add students in September** — open Admin Panel → Roster tab, add names, download, upload to GitHub
- **Change exit ticket question** — Admin Panel → Weekly tab, takes effect immediately
- **Link any word to glossary** — add `data-term="term name"` to any HTML element for hover tooltips
- **Direct link to a term** — `yoursite.github.io/#term=judicial-review`
- **Test exit ticket** — open your Google Sheet and check for new rows after submitting
