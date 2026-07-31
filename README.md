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

## Course settings

- Google Classroom: `https://classroom.google.com/c/ODcxMDM2NTk5NjI1`
- Join code: `wxe36xms`
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

## Publishing

Make changes on a review branch, validate locally, and open a pull request. Merge only after review. After merging, wait for GitHub Pages and verify the actual live pages on desktop and mobile.
