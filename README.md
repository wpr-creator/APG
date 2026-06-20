# Mr. Rogers — AP Government & Politics Website
## Comprehensive Edition

---

### THE ONLY FILE YOU EDIT REGULARLY: content.json

Open `content.json` on GitHub, click the pencil ✏️, and update:

| Field | What to change |
|---|---|
| `current_unit` | The current unit name (must start with "Unit N:" so the site highlights it) |
| `week` | "Week of Month Day" |
| `exit_ticket` | This week's question |
| `materials` | Add new items at top, remove old from bottom |
| `upcoming` | Keep 3–5 items; dates within 72 hours turn red automatically |
| `gov_news` | 1–3 curated news items for the week (see format below) |

**Adding a news item:**
```json
{
  "headline": "Your headline here",
  "source": "NPR / Politico / SCOTUSblog / etc.",
  "url": "https://link-to-article.com",
  "date": "Jun 23",
  "tag": "Congress"   ← use: Congress, Supreme Court, Executive, Elections, Civil Rights
}
```

**Adding a student to a period:**
Find the period under `"periods"` and add to the `"students"` list in `"Last, First"` format.

---

### WHAT'S ON EACH TAB

**Home** — Unit banner, This Day in History, curated news, vocab of the day, quick links (AP Classroom + Google Classroom only), recent materials, upcoming deadlines, exit ticket form

**Units** — All 5 AP Gov units with topics, exam weight, required cases, and foundational documents. The current unit is highlighted automatically based on `current_unit` in content.json.

**FRQ & Review** — All 4 FRQ types with scoring strategies, all 15 required SCOTUS cases (click any for full details: issue, ruling, significance, AP exam tip), filterable by unit, required foundational documents list

**Exit Ticket** — Full-page version of the exit ticket form

---

### THIS DAY IN HISTORY

The site pulls government-relevant historical events from Wikipedia's On This Day API, filtered by government keywords. If the API is unavailable, it falls back to 90+ hand-curated events in the code itself. Students can browse up to 5 events per day and copy any event as a "Discussion Starter" with one click.

---

### FIRST-TIME SETUP CHECKLIST

- [ ] Create a Google Sheet (drive.google.com → New → Google Sheets)
- [ ] Copy the Sheet URL
- [ ] Go to script.google.com → New Project
- [ ] Paste everything from `exit-ticket-script.gs`
- [ ] Replace `YOUR_GOOGLE_SHEET_URL_HERE` with your Sheet URL
- [ ] Deploy as Web App (Execute as: Me / Who has access: Anyone)
- [ ] Copy the Web App URL
- [ ] In `index.html`, find `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` and replace it
- [ ] Upload `index.html` and `content.json` to your GitHub repo
- [ ] Enable GitHub Pages (Settings → Pages → main branch → Save)

Site goes live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`

---

### FILE STRUCTURE

```
ap-gov/
├── index.html              ← Full site (edit only the SCRIPT_URL line)
├── content.json            ← YOUR WEEKLY UPDATE FILE
├── exit-ticket-script.gs  ← Paste into Google Apps Script (one time)
└── README.md               ← This file
```

---

### YOUR GOOGLE SHEET

Submissions appear automatically:
`Date | Period | Student Name | Question | Response | Timestamp`

Filter by Period column to see a specific class.

---

### CUSTOMIZING THE VOCAB LIST

The 30 vocab terms live in `content.json` under `"vocab_of_day"`. Add, remove, or reorder them anytime. Each day the site automatically starts on a different word based on the day of the year, so students see variety.

---

### UPDATING SCOTUS CASE DETAILS

The 15 required SCOTUS cases are built into `index.html` with full details (issue, ruling, significance, AP exam tip). To edit a case detail, search for the case name in `index.html` inside the `SCOTUS_CASES` array near the top of the `<script>` section.
