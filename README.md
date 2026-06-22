# Mr. Rogers — AP Government & Politics Website
### San Diego · Advanced Placement · College Board

---

## THE SHORT VERSION
**The only file you edit week-to-week is `content.json`.**
Everything else (glossary, SCOTUS cases, FRQ data, units) lives in `index.html` and only needs updating when course content changes — not weekly.

---

## WEEKLY UPDATES — `content.json`

Open `content.json` on GitHub, click the pencil ✏️ icon, make your changes, click **Commit changes**. Site updates in ~60 seconds.

### What to change each week

| Field | What it does | Example |
|---|---|---|
| `current_unit` | Hero banner unit label | `"Unit 3: Civil Liberties & Civil Rights"` |
| `week` | Week label under unit | `"Week of September 8"` |
| `exit_ticket` | The question students see on exit tickets | `"Explain judicial review in your own words."` |
| `materials` | Links to slides, docs, videos | See format below |
| `upcoming` | Due dates (turns red within 72 hours) | See format below |

### Materials format
```json
"materials": [
  { "title": "Unit 3 Slides", "type": "slides", "url": "https://...", "date": "Sep 8" },
  { "title": "Study Guide", "type": "doc", "url": "https://...", "date": "Sep 6" },
  { "title": "Khan Academy Video", "type": "video", "url": "https://...", "date": "Sep 5" }
]
```
Valid types: `slides` `doc` `video` `link`

### Upcoming format
```json
"upcoming": [
  { "title": "Unit 3 Quiz", "date": "Sep 12" },
  { "title": "FRQ Practice Due", "date": "Sep 15" }
]
```
Dates within 72 hours automatically turn red as a warning.

### Adding a student to a period
Find the period under `"periods"` and add their name in `"Last, First"` format:
```json
"periods": [
  { "id": "2A", "label": "Period 2A", "students": ["Adams, Jordan", "Baker, Sam"] },
  { "id": "2B", "label": "Period 2B", "students": ["Chen, Marcus", "Davis, Riley"] }
]
```
Students appear in the exit ticket name dropdown automatically.

---

## SEMESTER/YEAR UPDATES — `index.html`

These only need changing when you start a new unit, add a case, or update course content. Open `index.html` in VS Code or GitHub's editor.

### Adding a SCOTUS Case
Find `const SCOTUS_CASES = [` and add a new object anywhere in the array:
```javascript
{
  name: "Dobbs v. Jackson",
  year: 2022,
  unit: 3,
  topic: "Privacy Rights",
  issue: "Does the Constitution protect a right to abortion?",
  ruling: "No. The Court overturned Roe v. Wade, returning abortion regulation to the states.",
  sig: "Eliminated the federal constitutional right to abortion established in Roe (1973). Major shift in privacy rights jurisprudence.",
  tip: "Know this overturned Roe. AP exam still tests Roe — focus on the 14th Amendment privacy rationale of Roe, then contrast with Dobbs."
},
```
The case automatically appears in the Review tab with the correct unit filter. The Glossary tab will inject related term links into its modal automatically.

**Unit numbers for cases:**
- Unit 1 — Foundations (federalism, constitutional structure)
- Unit 2 — Branches (judicial review, executive/congressional power)
- Unit 3 — Civil Liberties & Civil Rights (1st Amendment, rights of accused, equal protection)
- Unit 4 — Ideology (rare — most ideology cases fit Unit 3)
- Unit 5 — Participation (voting rights, elections, campaign finance)

### Adding a Required Foundational Document
Find `const REQ_DOCS = [` and add a new entry:
```javascript
{ name: "Federalist No. 84", type: "Federalist Paper", year: "1788" },
```

### Updating Unit Topics
Find `"units": [` in `content.json`. Each unit has:
```json
{
  "number": 1,
  "title": "Foundations of American Democracy",
  "weight": "15–22%",
  "topics": [ "Add topics here", "Each as a string" ],
  "key_cases": [ "Marbury v. Madison (1803)" ],
  "key_docs": [ "Federalist No. 10", "Brutus No. 1" ]
}
```

### Updating FRQ Types / Tips
Find `"frq_types": [` in `content.json`. Each type has:
```json
{
  "type": "Concept Application",
  "points": 3,
  "tips": [
    "Describe the scenario in your own words first",
    "Apply the specific concept named in the prompt"
  ]
}
```

### Updating Vocab of the Day
Find `"vocab_of_day": [` in `content.json`. Add terms to the array:
```json
{ "term": "Judicial Review", "definition": "The power of the Supreme Court to declare laws unconstitutional." }
```
The site rotates through terms by day of year automatically. Students can also browse with Prev/Next.

### Updating Quick Links
Find `"key_links": [` in `content.json`:
```json
"key_links": [
  { "title": "AP Classroom", "url": "https://myap.collegeboard.org", "icon": "ti-school" },
  { "title": "Google Classroom", "url": "https://classroom.google.com", "icon": "ti-brand-google" }
]
```

---

## FEATURES OVERVIEW

### Home Tab
- **Hero banner** — current unit and week from `content.json`
- **This Day in American Government** — pulls from Wikipedia API automatically; falls back to 90+ curated government history events. No editing needed ever.
- **Vocab of the Day** — rotates daily from your vocab list; students can browse with Prev/Next
- **Recent Materials** — links to your Google Drive slides, docs, and videos
- **Upcoming** — due dates; turns red within 72 hours automatically
- **Quick Links** — AP Classroom and Google Classroom
- **Exit Ticket** — submits to Google Sheets (see setup below)

### Units Tab
- All 5 AP Gov units with exam weights, topics, required cases, and foundational docs
- Current unit is auto-highlighted based on `current_unit` in `content.json`

### FRQ & Review Tab
- **FRQ Strategy Cards** — all 4 types with point values and tips from `content.json`
- **Required Foundational Documents** — all 13 required docs
- **SCOTUS Cases** — all 15 required cases, filterable by unit, click for full detail modal
- **SCOTUS Case Quiz** — 15-question multiple choice quiz, randomized, with instant feedback
- **FRQ Practice Timer** — pick FRQ type, get correct time limit, scoring checklist alongside

### Glossary Tab
- **392 terms** across all 5 units, organized into 23 topic groups, tagged by AP standard
- **Browse mode** — search by term/definition/group; filter by unit
- **Flashcard mode** — flip cards, mark "Got It / Still Learning," tracks progress in browser storage
- **Tooltips** — any element with `data-term="term name"` shows a floating definition on hover
- **URL navigation** — link directly to any term: `yoursite.github.io/#term=judicial-review`

### Exit Ticket Tab
- Full-page exit ticket with period selector and name dropdown
- Submits to Google Sheets via Apps Script
- Creates separate tabs: Period 2A, Period 2B, All Responses

---

## GOOGLE SHEETS SETUP (one-time)

Your exit tickets go to: `https://docs.google.com/spreadsheets/d/16TcskHZ3QmcLsToZuyfCWnd24t5WtB4duTsX8x1tiqg/edit`

The Apps Script is already deployed and wired into the site. If you ever need to redo it:

1. Go to [script.google.com](https://script.google.com) → open your project
2. Make sure `SHEET_URL` points to your Google Sheet
3. Deploy → New Deployment → Web App → Execute as Me → Anyone
4. Copy the `/exec` URL
5. In `index.html`, find `const SCRIPT_URL =` and update the URL

**Sheet structure:** Each submission creates a row with `Date | Period | Student Name | Question | Response | Submitted At` in both the period-specific tab and the All Responses tab.

---

## FILE STRUCTURE

```
APG/
├── index.html              ← full site (edit for SCOTUS cases, glossary, design)
├── content.json            ← YOUR WEEKLY UPDATE FILE
├── exit-ticket-script.gs   ← Google Apps Script (already deployed, keep as backup)
└── README.md               ← this file
```

---

## FALL 2026 CED UPDATES (already applied)

The following changes from the AP College Board CED clarifications are already in the site:

**4 new Required Foundational Documents added:**
- Emancipation Proclamation (Unit 3, EK 3.12.A.1)
- Federalist No. 39 (Unit 1, EK 1.7.A.1)
- The Gettysburg Address (Unit 1, EK 1.1.A.3)
- Core Principles from Adam Smith's *The Wealth of Nations* (Unit 4, EK 4.1.A.1)

**New/updated glossary terms:**
- Free Enterprise (Unit 1, standard 1.1)
- Adam Smith / The Wealth of Nations (Unit 4, standard 4.4)
- Emancipation Proclamation (Unit 3, standard 3.12)
- Popular Sovereignty — updated to include Gettysburg Address reference

---

## TIPS

- **Adding students in September** — just edit the `students` arrays in `content.json` on GitHub directly. No coding needed.
- **Changing the exit ticket question** — update `exit_ticket` in `content.json`. Takes effect immediately on next page load.
- **Linking a term from anywhere** — add `data-term="term name"` to any HTML element and students get a hover tooltip with the full definition.
- **Direct link to a glossary term** — use `yoursite.github.io/#term=judicial-review` (hyphens between words).
- **AP exam countdown** — the site doesn't have one yet but it's easy to add. Open an issue or ask Claude to add it.
