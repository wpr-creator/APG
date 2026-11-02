# Mr. Rogers — AP United States Government & Politics

Student site: `https://wpr-creator.github.io/APG/`

## Current experience

APG uses the same student-facing shell as the GOV course:

- Home
- Agenda
- Units
- Foundations
- Glossary
- Skill Builders

The visual and interaction system comes from GOV, while the curriculum, required documents, Supreme Court cases, vocabulary, exam weights, and resource links are AP Government content.

Unit 0 · First Bell is shared across the courses. Keep its five lesson titles, questions, descriptions, tasks, and sequence identical. Course-specific Classroom information may differ.

## Daily teacher workflow

1. Open the site.
2. Type `dev` while focus is outside a form field.
3. Use the private editor to update the current unit, unit locks, agenda, upcoming work, exit question, and resource links.
4. Preview the changes.
5. Publish the generated `site-content.json` update to the APG repository.

The editor’s GitHub token remains in that browser only. Never commit a token to this repository.

## Main content files

- `index.html` — GOV-style APG application shell
- `styles.css` — shared visual system and responsive layouts
- `app.js` — routing, rendering, teacher editor, agenda, and interactive tools
- `course-data.js` — Unit 0, AP Units 1–5, lesson maps, resources, and starter glossary terms
- `glossary-data.js` — Full AP Government glossary library
- `foundations-data.js` — foundational documents, amendments, debates, and skill builders
- `site-content.json` — current unit, locks, agenda, upcoming work, and resource availability
- `us-politics-events.json` — complete 366-day source-linked U.S. political-history calendar

The existing standalone unit, document, case, review, and practice files remain in the repository so their established URLs and AP content continue to work.

See `docs/ARCHITECTURE.md` for the canonical/legacy file map, compatibility
routes, and safe teacher-publishing guidance.

## Course settings

- Google Classroom: `https://classroom.google.com/` (join code: `wxe36xms`)
- Initial current unit: `gov-0`
- Initial release: Unit 0 open; AP Units 1–5 locked

Dates, rosters, and assignments may remain preseason placeholders until school starts.

## Validation

Run:

```sh
node scripts/validate-site.js
```

The validator checks JavaScript, JSON, local references, social metadata, the GOV-style APG shell, protected Unit 0 content, shared assets, and the full politics calendar.

The expected calendar result is 366 dates and 514 source-linked entries.

GitHub Actions runs this validation automatically on pull requests and pushes
to `main`.

## Publishing

Pull the latest `main`, make the requested change, run `node scripts/validate-site.js` and any relevant focused tests, then commit and push to `main`. Wait for GitHub Pages to deploy and verify the live page; check desktop and mobile when presentation changes.

## Course entry pages

The active course starts at `index.html`, with `units.html`, `unit2.html`, and `lesson-2-2.html` as the approved editorial layouts. `course-tools.html` retains the interactive glossary, foundations, voter guide, exit-ticket form, and other existing activities. `entry-router.js` preserves old index hash bookmarks and lesson query links. Historical design-preview URLs redirect to their canonical pages. `unit2-reference.html` preserves the older standalone Unit 2 reference.

Use `course-data.js` for lesson titles and resource records, and `site-content.json` for availability, resource URL overrides, and the current unit and lesson. Keep lesson pages focused on finding materials. Essential questions must be copied exactly from the teacher’s guided notes; do not invent lesson explanations or scope. The current shared header uses the Capitol mark and includes the current lesson and Exit Ticket.
