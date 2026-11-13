# Reflecting Pool

Three.js 0.170.0 is vendored unchanged from its npm build. Its MIT license is in THREE-LICENSE.txt. The scene, journal, shaders, and synthesized audio are APG source files; the game needs no CDN or audio downloads.

To refresh the reviewed question bank after course content changes, run:

    node scripts/build-pool-questions.js
    node scripts/test-pool-questions.js

Units 1–2 reuse concept practice without attached passages, tables, or images. All units reuse glossary definitions; case descriptions use data-required.js and document arguments use foundations-data.js. The game generates answer order and distractors locally, not new instructional claims. Progress saves in localStorage; ambient sound begins only with the sound control. The journal works if WebGL is unavailable.
