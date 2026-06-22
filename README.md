# Mr. Rogers — AP Government & Politics Website
### San Diego · Advanced Placement · College Board

---

## THE SHORT VERSION

**Daily updates** → use the built-in Admin Panel (type `dev` on the site, then hit **Publish to GitHub**)
**Adding SCOTUS cases / glossary terms** → edit `index.html` in VS Code
**Everything else** → fully automatic

---

## DAILY WORKFLOW — THE ADMIN PANEL

1. Go to your site
2. Click anywhere on the page (not in a text box) and type `d` `e` `v`
3. The admin panel slides in
4. Make your changes — exit ticket question, materials, upcoming dates, etc.
5. Hit **Publish to GitHub** — site updates in ~60 seconds

No JSON, no code, no file dragging.

### First-time setup (one time only)
The Publish button needs a GitHub token to push changes directly:

1. Click the **"Generate token ↗"** link in the admin panel footer
2. GitHub opens — name it "AP Gov Site", leave the `repo` scope checked, click **Generate**
3. Copy the token (starts with `ghp_`)
4. Paste it into the token field in the admin panel
5. It saves automatically in your browser — you won't need to paste it again on this device

### What you can edit in the Admin Panel

| Tab | What you can change |
|---|---|
| **Weekly** | Current unit, week label, exit ticket question |
| **Materials** | Links to slides, docs, videos — add/remove/reorder |
| **Upcoming** | Due dates (auto-turn red within 72 hours) |
| **Roster** | Student names for Period 2A and 2B |
| **Vocab** | Vocab of the day terms |
| **Links** | Quick links on the home tab |

---

## LESS FREQUENT UPDATES — `index.html`

Open `index.html` in VS Code. These only change when course content changes, not daily.

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

**Unit numbers:** 1 = Foundations · 2 = Branches · 3 = Civil Liberties · 4 = Ideology · 5 = Participation

The case automatically appears in the Review tab with the correct unit filter, and the Glossary tab auto-injects related term links into its modal.

### Adding a Required Foundational Document

Find `const REQ_DOCS = [` and add:

```javascript
{ name: "Federalist No. 84", type: "Federalist Paper", year: "1788" },
```

### Adding Glossary Terms

Find the relevant unit in `const GLOSSARY_UNITS = [` and add to the correct group array:

```javascript
['Your Term', 'The definition of the term.', ['1.2']],
```

The third element is the AP standard tag (e.g. `'1.2'`, `'3.4'`).

### Updating Unit Content

Find `"units": [` in `content.json` (or edit via Admin Panel → not available yet for units). Each unit has topics, key_cases, and key_docs arrays you can edit directly.

---

## FEATURES OVERVIEW

### Home Tab
- **Hero banner** — current unit and week
- **This Day in Politics** — Wikipedia API, fully automatic, 90+ curated fallbacks. No editing needed.
- **Vocab of the Day** — rotates daily, students browse with Prev/Next
- **Recent Materials** — links to Google Drive slides, docs, videos
- **Upcoming** — due dates, turns red within 72 hours automatically
- **Quick Links** — AP Classroom and Google Classroom
- **Exit Ticket** — period selector + name dropdown, submits to Google Sheets

### Units Tab
- All 5 AP Gov units with exam weights, topics, required cases, and foundational docs
- Current unit auto-highlighted

### FRQ & Review Tab
- FRQ strategy cards — all 4 types with point values and tips
- Required Foundational Documents — all 13 required docs
- SCOTUS Cases — all 15 required cases, filterable by unit, click for full detail modal
- **SCOTUS Case Quiz** — 15-question multiple choice, randomized, instant feedback
- **FRQ Practice Timer** — pick type, correct countdown, scoring checklist alongside

### Glossary Tab
- 392 terms, 5 units, 23 topic groups, AP standard tags
- **Browse mode** — search by term/definition/group, filter by unit
- **Flashcard mode** — flip cards, Got It / Still Learning, persists in browser storage
- **Tooltips** — any `data-term="term name"` element shows hover definition
- **URL navigation** — `yoursite.github.io/#term=judicial-review`

### Exit Ticket Tab
- Period 2A / 2B selector and student name dropdown
- Submits to Google Sheets automatically
- Creates Period 2A, Period 2B, and All Responses tabs

---

## GOOGLE SHEETS

Your sheet: `https://docs.google.com/spreadsheets/d/16TcskHZ3QmcLsToZuyfCWnd24t5WtB4duTsX8x1tiqg/edit`

Columns: `Date | Period | Student Name | Question | Response | Submitted At`

Apps Script is deployed at:
`https://script.google.com/a/macros/ofarrellschool.org/s/AKfycbyPbD_iSjdjtKO48jc2QDsMysiGl4j_K0ZzKlJeWlRVGgZJ8LSINO6iFWwPjd6a9gfe6w/exec`

---

## FILE STRUCTURE

```
APG/
├── index.html              ← full site (edit for SCOTUS cases, glossary, design)
├── content.json            ← weekly data (edit via Admin Panel — no manual editing needed)
├── exit-ticket-script.gs   ← Google Apps Script backup
└── README.md               ← this file
```

---

## FALL 2026 CED UPDATES (already applied)

- Emancipation Proclamation — Unit 3, EK 3.12.A.1
- Federalist No. 39 — Unit 1, EK 1.7.A.1
- The Gettysburg Address — Unit 1, EK 1.1.A.3
- Core Principles from Adam Smith's *The Wealth of Nations* — Unit 4, EK 4.1.A.1
- Free Enterprise, Adam Smith, Emancipation Proclamation added to glossary
- Popular Sovereignty updated to reference Gettysburg Address

---

## TIPS

- **Change exit ticket daily** — Admin Panel → Weekly tab → change question → Publish
- **Add students in September** — Admin Panel → Roster tab → add names → Publish
- **Token saved in browser** — you only paste the GitHub token once per device
- **Direct link to glossary term** — `yoursite.github.io/#term=judicial-review`
- **Hover tooltips** — add `data-term="term name"` to any HTML element
