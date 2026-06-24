# Mr. Rogers — AP Government & Politics Website
### San Diego · Advanced Placement · College Board

---

## THE SHORT VERSION

**Daily updates** → type `dev` on the site → Admin Panel → Publish to GitHub
**Adding SCOTUS cases / glossary terms** → edit `index.html` in VS Code
**Everything else** → fully automatic

---

## DAILY WORKFLOW — THE ADMIN PANEL

1. Go to your site
2. Click anywhere on the page (not in a text box) and type `d` `e` `v`
3. The admin panel slides in
4. Make your changes
5. Hit **Publish to GitHub** — site updates in ~60 seconds

### First-time GitHub token setup (one time per device)
1. Click **"Generate token ↗"** in the admin panel footer
2. GitHub opens — name it "AP Gov Site", leave `repo` scope checked, click Generate
3. Copy the token (starts with `ghp_`)
4. Paste it into the token field — it saves in your browser automatically

### Admin Panel tabs

| Tab | What you can change |
|---|---|
| **Weekly** | Current unit, week label, exit ticket question |
| **Materials** | Links to slides, docs, videos |
| **Upcoming** | Due dates (auto-turn red within 72 hours) |
| **Roster** | Student names for Period 2A and 2B |
| **Vocab** | Vocab of the day terms |
| **Links** | Quick links on the home tab |

---

## SITE TABS OVERVIEW

### 🏠 Home
- Hero banner — current unit and week
- This Day in Politics — Wikipedia API, fully automatic
- Vocab of the Day — rotates daily
- Recent Materials, Upcoming, Quick Links
- Exit Ticket — submits to Google Sheets

### 📋 Units
- All 5 AP Gov units with exam weights, topics, required cases, foundational docs
- Current unit auto-highlighted

### 📝 FRQ & Review
- FRQ strategy cards — all 4 types with tips
- Required Foundational Documents
- SCOTUS Cases — filterable by unit, click for full detail modal
- SCOTUS Case Quiz — 15-question multiple choice
- FRQ Practice Timer — correct countdown per type, scoring checklist

### 📖 Glossary
- 392 terms, 5 units, 23 topic groups, AP standard tags
- Browse mode — search by term/definition/group
- Flashcard mode — Got It / Still Learning, persists in browser storage
- Hover tooltips — any `data-term="term name"` element shows definition
- URL navigation — `yoursite.github.io/#term=judicial-review`

### 📜 Living Documents *(new)*
- All required foundational documents with interactive clause-by-clause annotations
- Click any clause to expand — see plain English explanation, AP standard tags, linked SCOTUS cases, and AP exam connections
- Documents included: Declaration of Independence, Federalist 10, Federalist 51, Brutus No. 1, Gettysburg Address, Emancipation Proclamation
- Clicking a case tag opens the SCOTUS modal directly

### 🎯 Diagnostic Quiz *(new)*
- 20-question AP-style diagnostic across all 5 units
- Filter by specific units before starting
- Instant feedback with topic labels on every question
- Results page shows performance by unit with color-coded bar chart
- "Focus on these topics" recommendation based on your weak spots
- "Study Weak Units" button navigates directly to Glossary flashcard mode

### 🏆 Stump the Class *(new)*
- Designed for whole-class review projected on the board
- Shows the year and constitutional issue — class has 30 seconds to name the case
- Animated countdown timer turns yellow at 20s, red at 10s
- "Reveal Answer" shows the full case name, ruling, and significance
- Score buttons track "Class Got It" vs "Class Missed It" across rounds
- Running scoreboard with visual progress bars

### 🎫 Exit Ticket
- Period 2A / 2B selector and student name dropdown
- Submits to Google Sheets
- Creates Period 2A, Period 2B, All Responses tabs automatically

---

## LESS FREQUENT UPDATES — `index.html`

### Adding a SCOTUS Case
Find `const SCOTUS_CASES = [` and add:
```javascript
{
  name: "Dobbs v. Jackson",
  year: 2022,
  unit: 3,
  topic: "Privacy Rights",
  issue: "Does the Constitution protect a right to abortion?",
  ruling: "No. The Court overturned Roe v. Wade, returning abortion regulation to the states.",
  sig: "Eliminated the federal constitutional right to abortion established in Roe (1973).",
  tip: "Know this overturned Roe. Focus on the 14th Amendment privacy rationale of Roe, then contrast."
},
```
Unit numbers: 1=Foundations · 2=Branches · 3=Civil Liberties · 4=Ideology · 5=Participation

The case appears in: Review tab (SCOTUS grid), SCOTUS Quiz, Stump the Class, and Glossary modal auto-links.

### Adding a Required Document
Find `const REQ_DOCS = [` and add:
```javascript
{ name: "Federalist No. 84", type: "Federalist Paper", year: "1788" },
```

### Adding a Living Document annotation
Find `var LIVING_DOCS = [` and add a new document object following the existing pattern. Each document has `sections` containing `clauses` with `text`, `plain`, `standards`, `cases`, and `connections` fields.

### Adding Glossary Terms
Find the relevant unit in `const GLOSSARY_UNITS = [` and add to the correct group:
```javascript
['Your Term', 'The definition.', ['1.2']],
```

### Adding Diagnostic Questions
Find `var DIAG_QUESTIONS = [` and add:
```javascript
{ q: 'Question text?', opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 1, unit: 2, topic: 'Topic Name' },
```
`ans` is the zero-indexed position of the correct answer.

---

## GOOGLE SHEETS

Sheet: `https://docs.google.com/spreadsheets/d/16TcskHZ3QmcLsToZuyfCWnd24t5WtB4duTsX8x1tiqg/edit`

Columns: `Date | Period | Student Name | Question | Response | Submitted At`

Apps Script URL: `https://script.google.com/a/macros/ofarrellschool.org/s/AKfycbyPbD_iSjdjtKO48jc2QDsMysiGl4j_K0ZzKlJeWlRVGgZJ8LSINO6iFWwPjd6a9gfe6w/exec`

---

## FILE STRUCTURE

```
APG/
├── index.html              ← full site
├── content.json            ← weekly data (edit via Admin Panel)
├── exit-ticket-script.gs   ← Google Apps Script backup
└── README.md               ← this file
```

---

## FALL 2026 CED UPDATES (already applied)
- Emancipation Proclamation — Unit 3, EK 3.12.A.1
- Federalist No. 39 — Unit 1, EK 1.7.A.1
- The Gettysburg Address — Unit 1, EK 1.1.A.3
- Adam Smith's The Wealth of Nations — Unit 4, EK 4.1.A.1
- Free Enterprise, Adam Smith, Emancipation Proclamation added to glossary
- Popular Sovereignty updated to reference Gettysburg Address

---

## TIPS
- **Daily exit ticket** — Admin Panel → Weekly → change question → Publish (30 seconds)
- **Add students in September** — Admin Panel → Roster → add names → Publish
- **Stump the Class** — open on the projector, hit Start Round, read the issue aloud
- **Diagnostic before each unit** — have students take it on their phones as a pre-assessment
- **Living Documents** — assign specific clauses as reading; students click to see AP connections
- **Token saved per device** — paste the GitHub token once per computer/browser
