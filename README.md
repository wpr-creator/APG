# Mr. Rogers — AP Government & Politics Website
## How to update your site each week

**THE ONLY FILE YOU EVER EDIT: `content.json`**

Open `content.json` on GitHub, click the pencil ✏️ icon, and change:

- `"current_unit"` → your current unit name
- `"week"` → the week label
- `"exit_ticket"` → this week's exit ticket question
- `"materials"` → add new items at the top, remove old ones from the bottom
- `"upcoming"` → update due dates

Click "Commit changes" and your site updates in about 60 seconds.

---

## ADDING A STUDENT TO A PERIOD
In `content.json`, find the period under `"periods"` and add their name to the `"students"` list in `"Last, First"` format.

---

## FIRST-TIME SETUP CHECKLIST
- [ ] 1. Create a Google Sheet (drive.google.com → New → Google Sheets)
- [ ] 2. Copy the Sheet URL
- [ ] 3. Go to script.google.com → New Project
- [ ] 4. Paste everything from `exit-ticket-script.gs`
- [ ] 5. Replace `YOUR_GOOGLE_SHEET_URL_HERE` with your Sheet URL
- [ ] 6. Deploy as Web App (see instructions in the script file)
- [ ] 7. Copy the Web App URL
- [ ] 8. In `index.html`, replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with that URL
- [ ] 9. Upload `index.html` and `content.json` to your GitHub repo
- [ ] 10. Enable GitHub Pages on the repo (Settings → Pages → main branch)

---

## FILE STRUCTURE
```
ap-gov/
├── index.html              ← the website (don't edit unless changing design)
├── content.json            ← YOUR WEEKLY UPDATE FILE
├── exit-ticket-script.gs   ← paste into Google Apps Script (one time)
└── README.md               ← this file
```

---

## THE GLOSSARY TAB (new)

The **Glossary** tab contains all 392 AP Gov terms, organized by unit and grouped by topic, with AP standard tags (e.g. `1.2`, `2.5`).

### Features
- **Search-as-you-type** — searches term names, definitions, and group names simultaneously
- **Unit filter pills** — click any unit to narrow the view to just those terms
- **Click to expand** — each term card shows the definition when clicked
- **Copy button** — instantly copies "Term: Definition" to clipboard for study cards
- **AP standard tags** — each card shows its standard code (e.g. `2.1`, `3.4`)

### Term tooltips (works everywhere on the site)
Any element with a `data-term="term name"` attribute will show a floating tooltip on hover with the full definition, unit, and standard. This means you can link any word anywhere on the page to the glossary.

**Example** — add to vocab word, news item, FRQ tip, or SCOTUS case:
```html
<span data-term="judicial review">Judicial Review</span>
```

### SCOTUS case modal glossary links
When you click any SCOTUS case, the detail modal automatically shows a **Glossary** row with clickable links to related terms. Clicking any term chip navigates to the Glossary tab and opens that card.

### Navigate to a term from anywhere
Use the global `goToTerm()` function in any button or link:
```html
<button onclick="goToTerm('judicial review')">See Definition</button>
```

### URL hash navigation
Share a direct link to any term:
```
https://yoursite.github.io/#term=judicial-review
```
(Words separated by hyphens, any capitalization)

---

## YOUR GOOGLE SHEET
Submissions appear automatically with these columns:
`Date | Period | Student Name | Question | Response | Timestamp`

To see a specific period: click the filter button and filter by Period column.

---

## ADDING SCOTUS CASES (summer project)
To add new SCOTUS cases, find the `SCOTUS_CASES` array in `index.html` and add a new object:
```javascript
{
  name: 'Case Name (Year)',
  unit: 1,           // 1–5
  topic: 'Topic',
  issue: 'Constitutional question at stake.',
  ruling: 'What the Court decided.',
  sig: 'Why it matters for AP Gov.',
  tip: 'How this appears on the AP exam.'
}
```
The case will automatically appear in the FRQ & Review tab with the correct unit filter, and the Glossary tab will automatically inject related term links into its modal.
