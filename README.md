# Mr. Rogers — AP Government & Politics Website
## How to update your site each week

### THE ONLY FILE YOU EVER EDIT: content.json

Open content.json on GitHub, click the pencil ✏️ icon, and change:

- "current_unit" → your current unit name
- "week" → the week label
- "exit_ticket" → this week's exit ticket question
- "materials" → add new items at the top, remove old ones from the bottom
- "upcoming" → update due dates

Click "Commit changes" and your site updates in about 60 seconds.

---

### ADDING A STUDENT TO A PERIOD

In content.json, find the period under "periods" and add their name
to the "students" list in "Last, First" format.

---

### FIRST-TIME SETUP CHECKLIST

[ ] 1. Create a Google Sheet (drive.google.com → New → Google Sheets)
[ ] 2. Copy the Sheet URL
[ ] 3. Go to script.google.com → New Project
[ ] 4. Paste everything from exit-ticket-script.gs
[ ] 5. Replace YOUR_GOOGLE_SHEET_URL_HERE with your Sheet URL
[ ] 6. Deploy as Web App (see instructions in the script file)
[ ] 7. Copy the Web App URL
[ ] 8. In index.html, replace YOUR_GOOGLE_APPS_SCRIPT_URL_HERE with that URL
[ ] 9. Upload index.html and content.json to your GitHub repo
[ ] 10. Enable GitHub Pages on the repo (Settings → Pages → main branch)

---

### FILE STRUCTURE

ap-gov/
├── index.html          ← the website (don't edit unless changing design)
├── content.json        ← YOUR WEEKLY UPDATE FILE
├── exit-ticket-script.gs ← paste into Google Apps Script (one time)
└── README.md           ← this file

---

### YOUR GOOGLE SHEET

Submissions appear automatically with these columns:
Date | Period | Student Name | Question | Response | Timestamp

To see a specific period: click the filter button and filter by Period column.
