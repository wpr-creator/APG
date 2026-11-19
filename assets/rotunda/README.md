# Rotunda artwork

`apotheosis.webp` is the Architect of the Capitol's photograph of Constantino Brumidi's 1865 fresco, *The Apotheosis of Washington*. Downloaded November 19, 2026 from the official AOC article:
https://www.aoc.gov/explore-capitol-campus/art/apotheosis-washington

Image URL:
https://www.aoc.gov/sites/default/files/styles/alternative_xl/public/2025-01/20210715_084321_SG-2000w-The-Apotheosis-Washington.jpg.webp?h=84071268&itok=Yhs8YEg3

The architecture, decorative wall illustrations, and floor pattern are original procedural artwork. The room is a stylized setting rather than an architectural survey. No images or code were taken from Krillion. The original release used the course’s existing Three.js dependency; the pixel edition renders directly in Canvas 2D.

The November 19 pixel edition uses original Canvas 2D artwork and nearest-neighbor scaling. The canopy photograph is palette-reduced at runtime to fit that artwork. Pixelify Sans is self-hosted under the SIL Open Font License in `pixelify-OFL.txt`; source: https://github.com/google/fonts/tree/main/ofl/pixelifysans .

The class-competition edition uses a course-owned weekday prompt pool. `rotunda-curriculum.json` controls the current lesson list and AP-topic cutoff. Each `rotunda-data.json` question has lesson/topic tags and a source; `scripts/audits/rotunda-notes.json` records the eight notes revisions reviewed. To add a lesson, author sourced questions, extend the curriculum, and advance its ID so an already-started daily set does not change in place. Synchronize the score-service source with `node scripts/sync-apg.mjs` from `/Users/weston.rogers/Documents/Projects/APG-Rotunda-Scores`, test/deploy that service, then publish APG. Rotunda and the all-five-unit Reflecting Pool have separate banks and game state.

The cinematic edition gives each scored answer a 2.8–4.8 second camera ascent before the result card appears. Rank crossings use the shared score thresholds; reduced-motion mode and Skip ascent settle immediately. Audio is synthesized locally in `rotunda-audio.js` and muted on a first visit. No Krillion art, audio, or source code is included. The final score remains server-controlled.

The arcade pass keeps one full-width pixel-art world for prompts, ascent, and results. The title screen shows the timer and rarity rule, without lesson/topic coverage. Unrecognized nonblank guesses return `retry: true` from the score service without saving a response or extending the deadline; a correct answer, blank pass, or expired deadline ends the prompt. Explanations stay behind Other answers and the end recap.

The rendering refinement uses elapsed-time easing for the eagle and camera, with a 60 fps frame budget that falls back to 30 under sustained draw cost and retries 60 after recovery. Rear stonework, wall details, near pilasters, and motes have separate parallax rates. The motion checkbox follows the device preference until explicitly changed; a saved choice then controls both CSS and canvas effects. The leaderboard returns the completed player's round breakdown in the same snapshot as its total; all result fields refresh together, retaining open recap entries.
