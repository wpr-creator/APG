# Reflecting Pool

Three.js 0.170.0 is vendored unchanged from its npm build. Its MIT license is in THREE-LICENSE.txt. Reflector.js is also from Three.js 0.170.0; only its import path is changed. The scene, journal, and water animation are APG source files. All assets are self-hosted.

Audio: “Park ambiences” by Thimras (2022), https://opengameart.org/content/park-ambiences — CC0 1.0, https://creativecommons.org/publicdomain/zero/1.0/. The birds recording was converted from WAV to AAC for browser playback. This is an outdoor park recording, not a recording made at the Washington Reflecting Pool.

To refresh the reviewed question bank after course content changes, run:

    node scripts/build-pool-questions.js
    node scripts/test-pool-questions.js

Units 1–2 reuse concept practice without attached passages, tables, or images. All units reuse glossary definitions; case descriptions use data-required.js and document arguments use foundations-data.js. The game generates answer order and distractors locally, not new instructional claims. Progress saves in localStorage; ambient sound begins only with the sound control. The journal works if WebGL is unavailable.

The distant World War II Memorial is modeled as a simplified Rainbow Pool, 56 pillars, and two pavilions. Reference: https://www.nps.gov/articles/ww2memorialguide.htm. The camera looks east along the pool axis from the Lincoln Memorial end; spacing and peripheral landscaping remain stylized.
