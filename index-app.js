  // ══════════════════════════════════════════════════════════
  //  DATA: SCOTUS CASES
  // ══════════════════════════════════════════════════════════
  //  BUILD GLOSSARY UI
  // ══════════════════════════════════════════════════════════
  let glossaryBuilt = false;

  function buildGlossary() {
    if (glossaryBuilt) return;
    glossaryBuilt = true;

    const total = TERM_INDEX.size;
    const groupCount = GLOSSARY_UNITS.reduce((a, u) => a + Object.keys(u.groups).length, 0);
    const statsEl = document.getElementById('glossary-stats');
    const titleEl = document.getElementById('glossary-count-title');
    if (statsEl) statsEl.textContent = total + ' terms across ' + groupCount + ' topic groups';
    if (titleEl) titleEl.textContent = '— ' + total + ' terms across all 5 units';

    const pillContainer = document.getElementById('glossary-unit-pills');
    const allPill = pillContainer.querySelector('[data-filter="all"]');
    const allCount = pillContainer.querySelector('#pill-count-all');
    if (allCount) allCount.textContent = total;
    if (allPill) {
      allPill.addEventListener('click', function() {
        document.querySelectorAll('.glossary-unit-pill').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        filterGlossary('all');
      });
    }

    GLOSSARY_UNITS.forEach(u => {
      const count = Object.values(u.groups).reduce((a, g) => a + g.length, 0);
      const pill = document.createElement('div');
      pill.className = 'glossary-unit-pill';
      pill.dataset.filter = u.key;
      pill.innerHTML = '<span class="gpu-label">Unit ' + u.key.replace('unit','') + ': ' + u.label.split(':')[1].trim() + '</span><span class="gpu-count">' + count + '</span>';
      pillContainer.appendChild(pill);
      pill.addEventListener('click', () => {
        document.querySelectorAll('.glossary-unit-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        filterGlossary(u.key);
      });
    });

    const container = document.getElementById('glossary-units-container');
    GLOSSARY_UNITS.forEach(u => {
      const unitCount = Object.values(u.groups).reduce((a, g) => a + g.length, 0);
      const section = document.createElement('div');
      section.className = 'glossary-unit-section';
      section.id = 'glossary-' + u.key;

      section.innerHTML = '<div class="glossary-unit-header"><div class="guh-left"><div class="guh-num">UNIT ' + u.key.replace('unit','') + '</div><div class="guh-title">' + u.label.split(':')[1].trim() + '</div></div><div class="guh-right"><span class="guh-count">' + unitCount + ' terms</span><span class="guh-weight">' + u.weight + '</span></div></div>';

      Object.entries(u.groups).forEach(([groupName, terms]) => {
        const group = document.createElement('div');
        group.className = 'glossary-group';
        const label = document.createElement('div');
        label.className = 'glossary-group-label';
        label.textContent = groupName;
        group.appendChild(label);

        const grid = document.createElement('div');
        grid.className = 'glossary-terms-grid';

        terms.forEach(function(termArr) {
          const term = termArr[0], def = termArr[1], standards = termArr[2] || [];
          const card = document.createElement('div');
          card.className = 'gloss-term';
          card.dataset.term = term.toLowerCase();
          card.dataset.unit = u.key;
          card.innerHTML = '<div class="gloss-term-head"><div class="gloss-term-name">' + term + '</div><span class="gloss-term-standard">' + (standards[0] || '') + '</span><i class="ti ti-chevron-down gloss-term-toggle" aria-hidden="true"></i></div><div class="gloss-term-body">' + def + '<div class="gloss-term-links"><span class="gloss-link copy-link" data-copy="' + term.replace(/"/g,'&quot;') + '"><i class="ti ti-clipboard"></i> Copy</span></div></div>';

          card.querySelector('.gloss-term-head').addEventListener('click', function() { card.classList.toggle('open'); });
          card.querySelector('.copy-link').addEventListener('click', function(e) {
            e.stopPropagation();
            var btn = this;
            navigator.clipboard.writeText(term + ': ' + def).then(function() {
              btn.textContent = 'Copied!';
              setTimeout(function() { btn.innerHTML = '<i class="ti ti-clipboard"></i> Copy'; }, 1800);
            });
          });
          grid.appendChild(card);
        });

        group.appendChild(grid);
        section.appendChild(group);
      });
      container.appendChild(section);
    });

    // Search
    var searchInput = document.getElementById('glossary-search');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        var q = this.value.trim().toLowerCase();
        if (!q) {
          document.getElementById('glossary-search-results').classList.remove('visible');
          showAllGlossaryCards();
          return;
        }
        searchGlossary(q);
      });
    }
  }

  function filterGlossary(unitKey) {
    document.querySelectorAll('.glossary-unit-section').forEach(function(s) {
      s.style.display = (unitKey === 'all' || s.id === 'glossary-' + unitKey) ? '' : 'none';
    });
    var sr = document.getElementById('glossary-search-results');
    if (sr) sr.classList.remove('visible');
    var si = document.getElementById('glossary-search');
    if (si) si.value = '';
    showAllGlossaryCards();
  }

  function showAllGlossaryCards() {
    document.querySelectorAll('.gloss-term').forEach(function(c) { c.style.display = ''; c.classList.remove('open'); });
    document.querySelectorAll('.glossary-terms-grid, .glossary-group').forEach(function(g) { g.style.display = ''; });
  }

  function searchGlossary(q) {
    var results = [];
    TERM_INDEX.forEach(function(data) {
      if (data.term.toLowerCase().includes(q) || data.def.toLowerCase().includes(q) || data.group.toLowerCase().includes(q)) {
        results.push(data);
      }
    });
    results.sort(function(a, b) {
      var aScore = a.term.toLowerCase().startsWith(q) ? 0 : 1;
      var bScore = b.term.toLowerCase().startsWith(q) ? 0 : 1;
      return aScore - bScore || a.term.localeCompare(b.term);
    });

    var resultsEl = document.getElementById('glossary-search-results');
    var list = document.getElementById('search-result-list');
    var label = document.getElementById('search-result-label');
    if (!resultsEl || !list || !label) return;

    label.textContent = results.length + ' result' + (results.length !== 1 ? 's' : '') + ' for "' + q + '"';
    list.innerHTML = results.map(function(d) {
      var hi = d.term.replace(new RegExp(q, 'gi'), function(m) { return '<mark>' + m + '</mark>'; });
      return '<div class="search-result-item" data-term="' + d.term.toLowerCase().replace(/"/g,'&quot;') + '"><div class="sri-term">' + hi + '</div><div class="sri-unit">Unit ' + d.unitNum + ' · ' + d.group + ' · ' + (d.standards[0] || '') + '</div></div>';
    }).join('') || '<div style="padding:12px 1rem;font-size:13px;color:var(--gray-400);">No terms found for &ldquo;' + q + '&rdquo;</div>';

    list.querySelectorAll('.search-result-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var termKey = this.dataset.term;
        var data = TERM_INDEX.get(termKey);
        if (!data) return;
        filterGlossary(data.unit);
        document.querySelectorAll('.glossary-unit-pill').forEach(function(p) { p.classList.remove('active'); });
        var pill = document.querySelector('.glossary-unit-pill[data-filter="' + data.unit + '"]');
        if (pill) pill.classList.add('active');
        setTimeout(function() {
          var card = document.querySelector('.gloss-term[data-term="' + termKey.replace(/"/g,'\\"') + '"]');
          if (card) {
            card.classList.add('open');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.borderColor = 'var(--crimson)';
            setTimeout(function() { card.style.borderColor = ''; }, 2200);
          }
        }, 60);
        document.getElementById('glossary-search').value = '';
        resultsEl.classList.remove('visible');
      });
    });
    resultsEl.classList.add('visible');
  }

  // ══════════════════════════════════════════════════════════
  //  TERM TOOLTIP
  // ══════════════════════════════════════════════════════════
  var tooltip = document.createElement('div');
  tooltip.id = 'term-tooltip';
  document.body.appendChild(tooltip);
  var tooltipTimeout;

  function showTooltip(e, termKey) {
    clearTimeout(tooltipTimeout);
    var data = TERM_INDEX.get(termKey.toLowerCase());
    if (!data) return;
    tooltip.innerHTML = '<div class="tt-term">' + data.term + '</div><span class="tt-standard">Unit ' + data.unitNum + ' · ' + (data.standards[0] || '') + ' · ' + data.group + '</span><div class="tt-def">' + data.def + '</div>';
    tooltip.classList.add('visible');
    positionTooltip(e);
  }
  function positionTooltip(e) {
    var x = Math.min(e.clientX + 12, window.innerWidth - 340);
    var y = e.clientY + 16;
    var over = y + 180 > window.innerHeight;
    tooltip.style.left = x + 'px';
    tooltip.style.top = (over ? e.clientY - 180 : y) + 'px';
  }
  function hideTooltip() { tooltipTimeout = setTimeout(function() { tooltip.classList.remove('visible'); }, 200); }

  document.addEventListener('mouseover', function(e) {
    var el = e.target.closest('[data-term]');
    if (el && !el.classList.contains('gloss-term')) showTooltip(e, el.dataset.term);
  });
  document.addEventListener('mousemove', function(e) { if (tooltip.classList.contains('visible')) positionTooltip(e); });
  document.addEventListener('mouseout', function(e) { if (e.target.closest('[data-term]')) hideTooltip(); });

  // ══════════════════════════════════════════════════════════
  //  GLOBAL: GO TO TERM (navigate to glossary + open card)
  // ══════════════════════════════════════════════════════════
  function goToTerm(termName) {
    var termKey = termName.toLowerCase();
    var data = TERM_INDEX.get(termKey);
    if (!data) return;
    // Switch to glossary tab
    switchToTab('glossary');
    buildGlossary();
    filterGlossary(data.unit);
    document.querySelectorAll('.glossary-unit-pill').forEach(function(p) { p.classList.remove('active'); });
    var pill = document.querySelector('.glossary-unit-pill[data-filter="' + data.unit + '"]');
    if (pill) pill.classList.add('active');
    setTimeout(function() {
      var card = document.querySelector('.gloss-term[data-term="' + termKey.replace(/"/g,'\\"') + '"]');
      if (card) {
        card.classList.add('open');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.borderColor = 'var(--crimson)';
        setTimeout(function() { card.style.borderColor = ''; }, 2500);
      }
    }, 80);
  }

  // Build glossary when tab is clicked
  const glossaryTab=document.querySelector('.nav-tab[data-tab="glossary"]');if(glossaryTab)glossaryTab.addEventListener('click', function() {
    setTimeout(buildGlossary, 30);
  });

  // Hash navigation: #term=judicial-review
  function handleHash() {
    var hash = window.location.hash;
    if (hash.startsWith('#term=')) {
      var termName = decodeURIComponent(hash.slice(6)).replace(/-/g,' ');
      setTimeout(function() { goToTerm(termName); }, 200);
    }
  }
  window.addEventListener('hashchange', handleHash);

  // Wire SCOTUS modal to add glossary links
  function addGlossaryLinksToModal() {
    var existing = document.getElementById('modal-glossary-links');
    if (existing) existing.remove();
    var caseName = document.getElementById('modal-case-name').textContent;
    var caseData = SCOTUS_CASES.find(function(c) { return caseName.startsWith(c.name); });
    if (!caseData) return;
    var allText = (caseData.issue + ' ' + caseData.ruling + ' ' + caseData.sig + ' ' + caseData.tip).toLowerCase();
    var relatedTerms = [];
    TERM_INDEX.forEach(function(data, key) {
      if (key.length > 5 && allText.includes(key)) relatedTerms.push(data.term);
    });
    var topTerms = relatedTerms.slice(0, 5);
    if (!topTerms.length) return;
    var row = document.createElement('div');
    row.id = 'modal-glossary-links';
    row.className = 'case-detail-row';
    row.style.marginTop = '8px';
    row.innerHTML = '<div class="case-detail-label">Glossary</div><div class="case-detail-value" style="display:flex;flex-wrap:wrap;gap:6px;">' +
      topTerms.map(function(t) { return '<span class="gloss-link case-link" style="cursor:pointer;" onclick="goToTerm(\'' + t.replace(/'/g,"\\'") + '\')">' + t + '</span>'; }).join('') + '</div>';
    document.querySelector('.case-modal-body').appendChild(row);
  }

  // Intercept case modal open
  var _origOpenCase = openCaseModal;
  openCaseModal = function(name) {
    _origOpenCase(name);
    setTimeout(addGlossaryLinksToModal, 40);
  };

  // ══════════════════════════════════════════════════════════
  //  FLASHCARD ENGINE
  // ══════════════════════════════════════════════════════════
  var fcDeck = [];
  var fcIndex = 0;
  var fcMode = 'browse';
  var FC_STORAGE_KEY = 'apgov_fc_progress';

  function fcGetProgress() {
    try { return JSON.parse(localStorage.getItem(FC_STORAGE_KEY) || '{}'); } catch(e) { return {}; }
  }
  function fcSetProgress(key, val) {
    var p = fcGetProgress(); p[key] = val;
    localStorage.setItem(FC_STORAGE_KEY, JSON.stringify(p));
  }

  function setGlossaryMode(mode) {
    fcMode = mode;
    var browseBtn = document.getElementById('fc-browse-btn');
    var flashBtn = document.getElementById('fc-flash-btn');
    var browseArea = document.querySelector('.glossary-layout');
    var flashArea = document.getElementById('flashcard-area');
    if (mode === 'browse') {
      browseBtn.classList.add('active'); flashBtn.classList.remove('active');
      browseArea.style.display = ''; flashArea.classList.remove('visible');
      document.getElementById('fc-progress-label').textContent = '';
    } else {
      flashBtn.classList.add('active'); browseBtn.classList.remove('active');
      browseArea.style.display = 'none'; flashArea.classList.add('visible');
      buildGlossary();
      fcBuildDeck();
      fcShowCard();
    }
  }

  function fcBuildDeck() {
    var unitFilter = document.getElementById('fc-unit-filter').value;
    fcDeck = [];
    GLOSSARY_UNITS.forEach(function(u) {
      if (unitFilter !== 'all' && u.key !== unitFilter) return;
      Object.entries(u.groups).forEach(function(entry) {
        var group = entry[0], terms = entry[1];
        terms.forEach(function(t) {
          fcDeck.push({
            term: t[0], def: t[1], standards: t[2] || [],
            unit: u.key, unitNum: u.key.replace('unit',''), group: group,
            unitLabel: u.label.split(':')[1].trim()
          });
        });
      });
    });
    // Shuffle
    for (var i = fcDeck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = fcDeck[i]; fcDeck[i] = fcDeck[j]; fcDeck[j] = tmp;
    }
    fcIndex = 0;
    document.getElementById('fc-complete').classList.remove('visible');
    document.getElementById('fc-card').style.display = '';
    document.querySelector('.fc-nav').style.display = '';
    document.querySelector('.fc-response-btns').style.display = '';
    updateFcStats();
  }

  function fcUnitChanged() {
    if (fcMode === 'flashcard') { fcBuildDeck(); fcShowCard(); }
  }

  function fcShowCard() {
    if (fcDeck.length === 0) return;
    var card = fcDeck[fcIndex];
    // Unflip
    document.getElementById('fc-card').classList.remove('flipped');
    document.getElementById('fc-unit-label').textContent = 'UNIT ' + card.unitNum + ' · ' + card.unitLabel;
    document.getElementById('fc-term-text').textContent = card.term;
    document.getElementById('fc-standard-text').textContent = card.standards[0] || '';
    document.getElementById('fc-group-text').textContent = card.group;
    document.getElementById('fc-def-text').textContent = card.def;
    document.getElementById('fc-counter').textContent = (fcIndex + 1) + ' / ' + fcDeck.length;
    document.getElementById('fc-prev-btn').disabled = fcIndex === 0;
    document.getElementById('fc-next-btn').disabled = fcIndex === fcDeck.length - 1;
    var progress = fcGetProgress();
    var status = progress[card.term.toLowerCase()];
    document.getElementById('fc-progress-label').textContent =
      status === 'got' ? '✓ Got it' : status === 'learning' ? '✗ Still learning' : '';
    updateFcStats();
  }

  function flipCard() {
    document.getElementById('fc-card').classList.toggle('flipped');
  }

  function fcNavigate(dir) {
    fcIndex = Math.max(0, Math.min(fcDeck.length - 1, fcIndex + dir));
    fcShowCard();
  }

  function fcRespond(status) {
    if (fcDeck.length === 0) return;
    var card = fcDeck[fcIndex];
    fcSetProgress(card.term.toLowerCase(), status);
    // Auto-advance
    if (fcIndex < fcDeck.length - 1) {
      fcIndex++;
      fcShowCard();
    } else {
      // End of deck
      var progress = fcGetProgress();
      var got = fcDeck.filter(function(c) { return progress[c.term.toLowerCase()] === 'got'; }).length;
      var learning = fcDeck.filter(function(c) { return progress[c.term.toLowerCase()] === 'learning'; }).length;
      document.getElementById('fc-card').style.display = 'none';
      document.querySelector('.fc-nav').style.display = 'none';
      document.querySelector('.fc-response-btns').style.display = 'none';
      var complete = document.getElementById('fc-complete');
      complete.classList.add('visible');
      document.getElementById('fc-complete-sub').textContent =
        got + ' got it · ' + learning + ' still learning out of ' + fcDeck.length + ' cards';
    }
    updateFcStats();
  }

  function fcRestart(which) {
    var progress = fcGetProgress();
    if (which === 'learning') {
      fcDeck = fcDeck.filter(function(c) {
        return progress[c.term.toLowerCase()] === 'learning' || !progress[c.term.toLowerCase()];
      });
    }
    fcIndex = 0;
    // Shuffle again
    for (var i = fcDeck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = fcDeck[i]; fcDeck[i] = fcDeck[j]; fcDeck[j] = tmp;
    }
    document.getElementById('fc-complete').classList.remove('visible');
    document.getElementById('fc-card').style.display = '';
    document.querySelector('.fc-nav').style.display = '';
    document.querySelector('.fc-response-btns').style.display = '';
    fcShowCard();
  }

  function updateFcStats() {
    var progress = fcGetProgress();
    var got = 0, learning = 0, unseen = 0;
    fcDeck.forEach(function(c) {
      var s = progress[c.term.toLowerCase()];
      if (s === 'got') got++;
      else if (s === 'learning') learning++;
      else unseen++;
    });
    document.getElementById('fc-stats-bar').innerHTML =
      '<div class="fc-stat"><div class="fc-stat-dot got"></div>' + got + ' got it</div>' +
      '<div class="fc-stat"><div class="fc-stat-dot learning"></div>' + learning + ' still learning</div>' +
      '<div class="fc-stat"><div class="fc-stat-dot unseen"></div>' + unseen + ' unseen</div>';
  }

  // Initialize browse mode button as active
  document.getElementById('fc-browse-btn').classList.add('active');

  // ══════════════════════════════════════════════════════════
  //  SCOTUS QUIZ ENGINE
  // ══════════════════════════════════════════════════════════
  var quizQuestions = [];
  var quizIndex = 0;
  var quizScore = 0;
  var quizAnswered = false;

  function launchQuiz() {
    // Build questions from SCOTUS_CASES
    var cases = SCOTUS_CASES.slice();
    // Shuffle
    for (var i = cases.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = cases[i]; cases[i] = cases[j]; cases[j] = tmp;
    }
    quizQuestions = cases.map(function(c) {
      // Generate 3 wrong answers from other cases
      var others = SCOTUS_CASES.filter(function(x) { return x.name !== c.name; });
      // Shuffle others
      for (var i = others.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = others[i]; others[i] = others[j]; others[j] = tmp;
      }
      var wrongs = others.slice(0, 3).map(function(x) { return x.issue; });
      var options = [c.issue].concat(wrongs);
      // Shuffle options
      for (var i = options.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = options[i]; options[i] = options[j]; options[j] = tmp;
      }
      return { c: c, options: options, correct: c.issue };
    });
    quizIndex = 0;
    quizScore = 0;
    document.getElementById('quiz-score-screen').classList.remove('show');
    document.getElementById('quiz-game').style.display = '';
    document.getElementById('quiz-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    quizShowQuestion();
  }

  function quizShowQuestion() {
    if (quizIndex >= quizQuestions.length) { quizShowScore(); return; }
    var q = quizQuestions[quizIndex];
    quizAnswered = false;
    var pct = (quizIndex / quizQuestions.length * 100).toFixed(0);
    document.getElementById('quiz-progress-fill').style.width = pct + '%';
    document.getElementById('quiz-q-counter').textContent = 'Question ' + (quizIndex+1) + ' of ' + quizQuestions.length;
    document.getElementById('quiz-case-name').textContent = q.c.name + ' (' + q.c.year + ')';
    document.getElementById('quiz-unit-badge').textContent = 'Unit ' + q.c.unit;
    document.getElementById('quiz-prompt').textContent = 'What was the central constitutional issue?';
    var optionsEl = document.getElementById('quiz-options');
    optionsEl.innerHTML = q.options.map(function(opt) {
      var safe = String(opt)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return '<button class="quiz-option" data-answer="' + safe + '">' + safe + '</button>';
    }).join('');
    optionsEl.querySelectorAll('.quiz-option').forEach(function(btn) {
      btn.addEventListener('click', function() { quizAnswer(btn, btn.dataset.answer); });
    });
    var fb = document.getElementById('quiz-feedback');
    fb.className = 'quiz-feedback';
    fb.textContent = '';
    document.getElementById('quiz-next-btn').className = 'quiz-next-btn';
  }

  function quizAnswer(btn, chosen) {
    if (quizAnswered) return;
    quizAnswered = true;
    var q = quizQuestions[quizIndex];
    var correct = chosen === q.correct;
    if (correct) quizScore++;
    // Mark options
    document.querySelectorAll('.quiz-option').forEach(function(b) {
      b.disabled = true;
      if (b.textContent === q.correct) b.classList.add('correct');
      else if (b === btn && !correct) b.classList.add('wrong');
    });
    // Feedback
    var fb = document.getElementById('quiz-feedback');
    fb.className = 'quiz-feedback show ' + (correct ? 'correct' : 'wrong');
    fb.innerHTML = correct
      ? '<strong>Correct!</strong> ' + q.c.sig
      : '<strong>Not quite.</strong> The issue was: <em>' + q.correct + '</em><br>' + q.c.sig;
    document.getElementById('quiz-next-btn').className = 'quiz-next-btn show';
  }

  function quizNext() {
    quizIndex++;
    quizShowQuestion();
  }

  function quizShowScore() {
    document.getElementById('quiz-game').style.display = 'none';
    var screen = document.getElementById('quiz-score-screen');
    screen.classList.add('show');
    document.getElementById('quiz-score-num').textContent = quizScore + '/' + quizQuestions.length;
    var pct = Math.round(quizScore / quizQuestions.length * 100);
    var msg = pct >= 80 ? '🎉 Excellent — you know these cases!' :
              pct >= 60 ? '👍 Good work — review the ones you missed.' :
              '📚 Keep studying — try the flashcards too!';
    document.getElementById('quiz-score-msg').textContent = msg;
    document.getElementById('quiz-progress-fill').style.width = '100%';
  }

  function closeQuiz() {
    document.getElementById('quiz-modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ══════════════════════════════════════════════════════════
  //  FRQ TIMER ENGINE
  // ══════════════════════════════════════════════════════════
  var frqTimerInterval = null;
  var frqTimeLeft = 1500; // 25 min default
  var frqRunning = false;
  var frqSelectedType = null;

  function openAdmin() {
    if (!contentData) { adminToast('Content not loaded yet — wait a moment and try again.'); return; }
    adminLoadData();
    document.getElementById('admin-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeAdmin() {
    document.getElementById('admin-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('admin-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeAdmin();
  });

  function adminTab(name, el) {
    document.querySelectorAll('.admin-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.admin-section').forEach(function(s) { s.classList.remove('active'); });
    if (el) el.classList.add('active');
    document.getElementById('admin-sec-' + name).classList.add('active');
  }

  function adminToast(msg) {
    var t = document.getElementById('admin-toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(function() { t.classList.remove('show'); }, 2800);
  }

  // ── Load current contentData into admin fields ──
  function adminLoadData() {
    if (!contentData) return;

    // Weekly
    document.getElementById('ad-current-unit').value = contentData.current_unit || '';
    document.getElementById('ad-week').value = contentData.week || '';
    document.getElementById('ad-exit-ticket').value = contentData.exit_ticket || '';

    // Materials
    var matList = document.getElementById('ad-materials-list');
    matList.innerHTML = '';
    (contentData.materials || []).forEach(function(m) { adminAddMaterial(m); });

    // Upcoming
    var upList = document.getElementById('ad-upcoming-list');
    upList.innerHTML = '';
    (contentData.upcoming || []).forEach(function(u) { adminAddUpcoming(u); });

    // Roster
    var rosterDiv = document.getElementById('ad-roster-blocks');
    rosterDiv.innerHTML = '';
    (contentData.periods || []).forEach(function(p) {
      var block = document.createElement('div');
      block.className = 'admin-period-block';
      block.dataset.period = p.id;
      var studentRows = (p.students || []).map(function(s) {
        return '<div class="admin-student-row"><input class="admin-input student-name-input" value="' +
          s.replace(/"/g, '&quot;') + '" placeholder="Last, First" />' +
          '<button class="admin-remove-btn" onclick="this.parentElement.remove()">✕</button></div>';
      }).join('');
      block.innerHTML = '<div class="admin-period-head"><span>Period ' + p.id +
        '</span><button class="admin-add-btn" style="width:auto;padding:4px 12px;border-style:solid;" ' +
        'onclick="adminAddStudent(this.parentElement.parentElement)">+ Add Student</button></div>' +
        '<div class="admin-student-list" id="roster-' + p.id + '">' + studentRows + '</div>';
      rosterDiv.appendChild(block);
    });

    // Vocab
    var vocabList = document.getElementById('ad-vocab-list');
    vocabList.innerHTML = '';
    (contentData.vocab_of_day || []).forEach(function(v) { adminAddVocab(v); });

    // Links
    var linksList = document.getElementById('ad-links-list');
    linksList.innerHTML = '';
    (contentData.key_links || []).forEach(function(l) { adminAddLink(l); });

    // Foundations unlocks
    adminLoadFoundations();
  }

  function adminLoadFoundations() {
    var container = document.getElementById('ad-foundations-list');
    if (!container) return;
    container.innerHTML = '';

    var unlocks = (contentData && contentData.foundations_unlocks) || {};
    var activityOrder = ['cer', 'vocab', 'closereading'];
    var activityLabels = {
      cer: 'CLAIM, EVIDENCE & REASONING',
      vocab: 'ACADEMIC VOCABULARY IN CONTEXT',
      closereading: 'CLOSE READING (AVID)'
    };

    activityOrder.forEach(function(actId) {
      var actData = unlocks[actId] || { levels: [] };
      var div = document.createElement('div');
      div.className = 'admin-foundations-activity';

      var levelsHtml = (actData.levels || []).map(function(lv) {
        var isOn = lv.unlocked === true;
        return '<div class="admin-foundations-level-row" data-activity="' + actId + '" data-level="' + lv.level + '">' +
          '<div class="admin-foundations-level-info">' +
            '<div class="admin-foundations-level-num">LEVEL ' + lv.level + '</div>' +
            '<div class="admin-foundations-level-name">' + lv.name + '</div>' +
          '</div>' +
          '<div class="admin-foundations-toggle" onclick="adminToggleFoundation(this)">' +
            '<div class="admin-toggle-switch' + (isOn ? ' on' : '') + '" data-unlocked="' + isOn + '"></div>' +
            '<span class="admin-toggle-label">' + (isOn ? 'UNLOCKED' : 'LOCKED') + '</span>' +
          '</div>' +
        '</div>';
      }).join('');

      div.innerHTML =
        '<div class="admin-foundations-activity-head">' +
          '<div class="admin-foundations-activity-name">' + (activityLabels[actId] || actId) + '</div>' +
        '</div>' +
        levelsHtml;

      container.appendChild(div);
    });
  }

  function adminToggleFoundation(toggleEl) {
    var sw = toggleEl.querySelector('.admin-toggle-switch');
    var label = toggleEl.querySelector('.admin-toggle-label');
    var isOn = sw.dataset.unlocked === 'true';
    var newState = !isOn;
    sw.dataset.unlocked = newState;
    sw.classList.toggle('on', newState);
    label.textContent = newState ? 'UNLOCKED' : 'LOCKED';
  }

  // ── Add row helpers ──
  function adminAddMaterial(m) {
    m = m || {};
    var row = document.createElement('div');
    row.className = 'admin-list-item';
    row.innerHTML = '<div class="admin-list-item-fields cols4">' +
      '<input class="admin-input" placeholder="Title" value="' + (m.title || '').replace(/"/g,'&quot;') + '" data-field="title" />' +
      '<select class="admin-select" data-field="type">' +
        ['slides','doc','video','link'].map(function(t) {
          return '<option value="' + t + '"' + (m.type === t ? ' selected' : '') + '>' + t + '</option>';
        }).join('') +
      '</select>' +
      '<input class="admin-input" placeholder="URL" value="' + (m.url || '').replace(/"/g,'&quot;') + '" data-field="url" />' +
      '<input class="admin-input" placeholder="Date e.g. Sep 8" value="' + (m.date || '') + '" data-field="date" />' +
      '</div><button class="admin-remove-btn" onclick="this.parentElement.remove()">✕</button>';
    document.getElementById('ad-materials-list').appendChild(row);
  }

  function adminAddUpcoming(u) {
    u = u || {};
    var row = document.createElement('div');
    row.className = 'admin-list-item';
    row.innerHTML = '<div class="admin-list-item-fields cols2">' +
      '<input class="admin-input" placeholder="Title e.g. Unit 3 Quiz" value="' + (u.title || '').replace(/"/g,'&quot;') + '" data-field="title" />' +
      '<input class="admin-input" placeholder="Date e.g. Sep 12" value="' + (u.date || '') + '" data-field="date" />' +
      '</div><button class="admin-remove-btn" onclick="this.parentElement.remove()">✕</button>';
    document.getElementById('ad-upcoming-list').appendChild(row);
  }

  function adminAddStudent(block) {
    var list = block.querySelector('.admin-student-list');
    var row = document.createElement('div');
    row.className = 'admin-student-row';
    row.innerHTML = '<input class="admin-input student-name-input" placeholder="Last, First" />' +
      '<button class="admin-remove-btn" onclick="this.parentElement.remove()">✕</button>';
    list.appendChild(row);
    row.querySelector('input').focus();
  }

  function adminAddVocab(v) {
    v = v || {};
    var item = document.createElement('div');
    item.className = 'admin-vocab-item';
    item.innerHTML = '<div class="admin-vocab-fields">' +
      '<input class="admin-input" placeholder="Term" value="' + (v.term || '').replace(/"/g,'&quot;') + '" data-field="term" />' +
      '<textarea class="admin-textarea" placeholder="Definition" data-field="definition" style="min-height:56px;">' + (v.definition || '') + '</textarea>' +
      '</div><button class="admin-remove-btn" style="margin-top:4px;" onclick="this.parentElement.remove()">✕</button>';
    document.getElementById('ad-vocab-list').appendChild(item);
  }

  function adminAddLink(l) {
    l = l || {};
    var row = document.createElement('div');
    row.className = 'admin-list-item';
    row.innerHTML = '<div class="admin-list-item-fields cols3">' +
      '<input class="admin-input" placeholder="Label e.g. AP Classroom" value="' + (l.title || '').replace(/"/g,'&quot;') + '" data-field="title" />' +
      '<input class="admin-input" placeholder="URL" value="' + (l.url || '').replace(/"/g,'&quot;') + '" data-field="url" />' +
      '<input class="admin-input" placeholder="Icon e.g. ti-school" value="' + (l.icon || '') + '" data-field="icon" />' +
      '</div><button class="admin-remove-btn" onclick="this.parentElement.remove()">✕</button>';
    document.getElementById('ad-links-list').appendChild(row);
  }

  // ── Build JSON from current form state ──
  function adminBuildJSON() {
    // Weekly
    var out = {};
    out.current_unit = document.getElementById('ad-current-unit').value.trim();
    out.week = document.getElementById('ad-week').value.trim();

    // Periods / roster
    out.periods = [];
    document.querySelectorAll('.admin-period-block').forEach(function(block) {
      var id = block.dataset.period;
      var students = [];
      block.querySelectorAll('.student-name-input').forEach(function(inp) {
        var v = inp.value.trim();
        if (v) students.push(v);
      });
      out.periods.push({ id: id, label: 'Period ' + id, students: students });
    });

    out.exit_ticket = document.getElementById('ad-exit-ticket').value.trim();

    // Materials
    out.materials = [];
    document.querySelectorAll('#ad-materials-list .admin-list-item').forEach(function(row) {
      var fields = {};
      row.querySelectorAll('[data-field]').forEach(function(el) {
        fields[el.dataset.field] = el.value.trim();
      });
      if (fields.title) out.materials.push(fields);
    });

    // Upcoming
    out.upcoming = [];
    document.querySelectorAll('#ad-upcoming-list .admin-list-item').forEach(function(row) {
      var fields = {};
      row.querySelectorAll('[data-field]').forEach(function(el) {
        fields[el.dataset.field] = el.value.trim();
      });
      if (fields.title) out.upcoming.push(fields);
    });

    // Key links
    out.key_links = [];
    document.querySelectorAll('#ad-links-list .admin-list-item').forEach(function(row) {
      var fields = {};
      row.querySelectorAll('[data-field]').forEach(function(el) {
        fields[el.dataset.field] = el.value.trim();
      });
      if (fields.title) out.key_links.push(fields);
    });

    // Vocab
    out.vocab_of_day = [];
    document.querySelectorAll('.admin-vocab-item').forEach(function(item) {
      var term = item.querySelector('[data-field="term"]').value.trim();
      var def = item.querySelector('[data-field="definition"]').value.trim();
      if (term) out.vocab_of_day.push({ term: term, definition: def });
    });

    // Preserve unchanged arrays from contentData
    out.units = contentData.units || [];
    out.frq_types = contentData.frq_types || [];

    // Foundations unlocks — read from toggles
    var currentUnlocks = (contentData && contentData.foundations_unlocks) ? JSON.parse(JSON.stringify(contentData.foundations_unlocks)) : {};
    document.querySelectorAll('.admin-foundations-level-row').forEach(function(row) {
      var actId = row.dataset.activity;
      var levelNum = parseInt(row.dataset.level);
      var sw = row.querySelector('.admin-toggle-switch');
      if (!sw || !actId) return;
      var isOn = sw.dataset.unlocked === 'true';
      if (currentUnlocks[actId] && currentUnlocks[actId].levels) {
        var lv = currentUnlocks[actId].levels.find(function(l) { return l.level === levelNum; });
        if (lv) lv.unlocked = isOn;
      }
    });
    out.foundations_unlocks = currentUnlocks;

    return out;
  }

  function adminDownload() {
    var json = adminBuildJSON();
    var blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content.json';
    a.click();
    adminToast('✓ content.json downloaded — drag it into your GitHub repo to publish');
  }

  function adminPreview() {
    var json = adminBuildJSON();
    var w = window.open('', '_blank');
    w.document.write('<pre style="font-family:monospace;font-size:13px;padding:20px;background:#f5f0e8;">' +
      JSON.stringify(json, null, 2).replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</pre>');
    w.document.title = 'content.json preview';
  }

  // ── GitHub token persistence ──
  var GH_TOKEN_KEY = 'apgov_gh_token';
  function adminGetToken() {
    var inp = document.getElementById('ad-github-token');
    if (inp && inp.value.trim()) {
      localStorage.setItem(GH_TOKEN_KEY, inp.value.trim());
      return inp.value.trim();
    }
    return localStorage.getItem(GH_TOKEN_KEY) || '';
  }

  // Load saved token into field when admin opens
  var _origOpenAdmin = openAdmin;
  openAdmin = function() {
    _origOpenAdmin();
    var saved = localStorage.getItem(GH_TOKEN_KEY);
    if (saved) {
      var inp = document.getElementById('ad-github-token');
      if (inp) inp.value = saved;
    }
  };

  // ── Publish directly to GitHub ──
  async function adminPublish() {
    var token = adminGetToken();
    if (!token) {
      adminToast('Paste your GitHub token first — click "Generate token" link');
      return;
    }

    var json = adminBuildJSON();
    var jsonStr = JSON.stringify(json, null, 2);
    var b64 = btoa(unescape(encodeURIComponent(jsonStr)));

    // GitHub repo details — update if repo changes
    var OWNER = 'wpr-creator';
    var REPO  = 'APG';
    var PATH  = 'content.json';
    var API   = 'https://api.github.com/repos/' + OWNER + '/' + REPO + '/contents/' + PATH;

    var publishBtn = document.querySelector('.admin-dl-btn[onclick="adminPublish()"]');
    publishBtn.textContent = 'Publishing...';
    publishBtn.disabled = true;

    try {
      // Get current file SHA (required by GitHub API to update a file)
      var getRes = await fetch(API, {
        headers: {
          'Authorization': 'token ' + token,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      var getData = await getRes.json();
      var sha = getData.sha;

      if (!sha) {
        adminToast('Could not get file SHA — check your token has repo access');
        publishBtn.innerHTML = '<i class="ti ti-brand-github"></i> Publish to GitHub';
        publishBtn.disabled = false;
        return;
      }

      // Push the update
      var putRes = await fetch(API, {
        method: 'PUT',
        headers: {
          'Authorization': 'token ' + token,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Update content.json via admin panel',
          content: b64,
          sha: sha
        })
      });

      if (putRes.ok) {
        adminToast('✓ Published! Site will update in ~60 seconds');
        publishBtn.innerHTML = '✓ Published!';
        setTimeout(function() {
          publishBtn.innerHTML = '<i class="ti ti-brand-github"></i> Publish to GitHub';
          publishBtn.disabled = false;
        }, 3000);
        // Reload contentData so the site reflects changes immediately
        contentData = json;
        loadContent && typeof loadContent === 'function' && loadContent();
      } else {
        var err = await putRes.json();
        adminToast('Error: ' + (err.message || 'Check token permissions'));
        publishBtn.innerHTML = '<i class="ti ti-brand-github"></i> Publish to GitHub';
        publishBtn.disabled = false;
      }
    } catch(e) {
      adminToast('Network error — check connection');
      publishBtn.innerHTML = '<i class="ti ti-brand-github"></i> Publish to GitHub';
      publishBtn.disabled = false;
    }
  }


  // ══════════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  //  LIVING DOCUMENTS ENGINE
  // ══════════════════════════════════════════════════════════
  // Document type icons -- simple inline SVGs keyed by category
  var DOC_TYPE_ICONS = {
    founding: '<svg class="docs-doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>',
    federalist: '<svg class="docs-doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    speech: '<svg class="docs-doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    order: '<svg class="docs-doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    letter: '<svg class="docs-doc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>'
  };

  function getDocIcon(doc) {
    if (doc.id === 'articles' || doc.id === 'constitution') return DOC_TYPE_ICONS.founding;
    if (doc.id && doc.id.indexOf('fed') === 0 || doc.id === 'brutus1') return DOC_TYPE_ICONS.federalist;
    if (doc.id === 'gettysburg' || doc.id === 'birmingham') return DOC_TYPE_ICONS.speech;
    if (doc.id === 'emancipation') return DOC_TYPE_ICONS.order;
    return DOC_TYPE_ICONS.letter;
  }

  function buildDocsTab() {
    if (docsBuilt) return;
    docsBuilt = true;
    var list = document.getElementById('docs-doc-list');
    var main = document.getElementById('docs-main');
    if (!list || !main) return;

    LIVING_DOCS.forEach(function(doc, idx) {
      var item = document.createElement('div');
      item.className = 'docs-doc-item' + (idx === 0 ? ' active' : '');
      item.dataset.id = doc.id;
      item.innerHTML = '<div class="docs-doc-item-row">' + getDocIcon(doc) +
        '<div class="docs-doc-item-text">' + doc.title +
        '<span class="doc-year">' + doc.year + ' \u00b7 ' + doc.author + '</span></div></div>';
      item.addEventListener('click', function() {
        document.querySelectorAll('.docs-doc-item').forEach(function(d) { d.classList.remove('active'); });
        item.classList.add('active');
        renderDoc(doc);
      });
      list.appendChild(item);
    });

    renderDoc(LIVING_DOCS[0]);
  }

  function renderDoc(doc) {
    var main = document.getElementById('docs-main');
    var sectionsHtml = doc.sections.map(function(sec) {
      var clausesHtml = sec.clauses.map(function(c) {
        var tags = c.standards.map(function(s) {
          return '<span class="docs-tag standard">EK ' + s + '</span>';
        }).join('');
        var caseTags = c.cases.map(function(name) {
          return '<span class="docs-tag case" onclick="openCaseModal(\'' + name.replace(/'/g,"\\'") + '\')">' + name + ' ↗</span>';
        }).join('');
        return '<div class="docs-clause" onclick="this.classList.toggle(\'open\')">' +
          '<div class="docs-clause-head">' +
            '<span class="docs-clause-num">' + c.num + '</span>' +
            '<span class="docs-clause-text">' + c.text.substring(0,120) + (c.text.length > 120 ? '...' : '') + '</span>' +
            '<span class="docs-clause-arrow">▾</span>' +
          '</div>' +
          '<div class="docs-clause-body">' +
            '<div class="docs-plain">' + c.plain + '</div>' +
            '<div class="docs-tags">' + tags + caseTags + '</div>' +
            (c.connections ? '<div class="docs-connections">🔗 AP Connection: ' + c.connections + '</div>' : '') +
          '</div>' +
        '</div>';
      }).join('');
      return '<div class="docs-section"><div class="docs-section-title">' + sec.title + '</div>' + clausesHtml + '</div>';
    }).join('');

    main.innerHTML =
      '<div class="docs-header">' +
        '<div class="docs-header-label">Required Foundational Document</div>' +
        '<div class="docs-header-title">' + doc.title + '</div>' +
        '<div class="docs-header-meta">' + doc.year + ' · ' + doc.author + '</div>' +
      '</div>' +
      '<div class="docs-intro">' + doc.intro + '</div>' +
      sectionsHtml;
  }

  const docsTab = document.querySelector('.nav-tab[data-tab="docs"]'); if(docsTab) docsTab.addEventListener('click', function() {
    setTimeout(buildDocsTab, 30);
  });

  // ══════════════════════════════════════════════════════════
  //  DIAGNOSTIC QUIZ ENGINE
  // ══════════════════════════════════════════════════════════
  function stumpStart() {
    // Shuffle SCOTUS_CASES
    stumpState.deck = SCOTUS_CASES.slice();
    for (var i = stumpState.deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = stumpState.deck[i]; stumpState.deck[i] = stumpState.deck[j]; stumpState.deck[j] = tmp;
    }
    stumpState.index = 0;
    stumpState.got = 0;
    stumpState.missed = 0;
    stumpUpdateScore();
    stumpShowCase();
  }

  function stumpShowCase() {
    var c = stumpState.deck[stumpState.index];
    if (!c) return;
    stumpState.phase = 'question';

    document.getElementById('stump-reveal-card').classList.remove('show');
    document.getElementById('stump-mode-badge').textContent = 'CASE ' + (stumpState.index + 1) + ' OF ' + stumpState.deck.length;
    document.getElementById('stump-case-display').textContent = c.year;
    document.getElementById('stump-year-display').textContent = 'Unit ' + c.unit + ' · ' + (c.topic || '');
    document.getElementById('stump-issue-display').textContent = c.issue;

    // Buttons
    document.getElementById('stump-start-btn').style.display = 'none';
    document.getElementById('stump-reveal-btn').style.display = '';
    document.getElementById('stump-got-btn').style.display = 'none';
    document.getElementById('stump-missed-btn').style.display = 'none';
    document.getElementById('stump-next-btn').style.display = 'none';

    // Start timer
    stumpState.timeLeft = 30;
    document.getElementById('stump-timer-wrap').style.display = '';
    stumpUpdateTimer();
    clearInterval(stumpState.timerInterval);
    stumpState.timerInterval = setInterval(function() {
      stumpState.timeLeft--;
      stumpUpdateTimer();
      if (stumpState.timeLeft <= 0) {
        clearInterval(stumpState.timerInterval);
        stumpReveal();
      }
    }, 1000);
  }

  function stumpUpdateTimer() {
    var t = stumpState.timeLeft;
    var circumference = 220;
    var offset = circumference - (t / 30) * circumference;
    var circle = document.getElementById('stump-timer-circle');
    var numEl = document.getElementById('stump-timer-num');
    if (circle) circle.style.strokeDashoffset = offset;
    if (numEl) numEl.textContent = t;
    if (circle) circle.style.stroke = t <= 10 ? '#ef4444' : t <= 20 ? '#f59e0b' : '#c8922a';
  }

  function stumpReveal() {
    clearInterval(stumpState.timerInterval);
    stumpState.phase = 'revealed';
    var c = stumpState.deck[stumpState.index];

    document.getElementById('stump-case-display').textContent = c.name;
    document.getElementById('stump-reveal-name').textContent = c.name + ' (' + c.year + ')';
    document.getElementById('stump-reveal-ruling').textContent = c.ruling;
    document.getElementById('stump-reveal-sig').textContent = c.sig;
    document.getElementById('stump-reveal-card').classList.add('show');

    document.getElementById('stump-reveal-btn').style.display = 'none';
    document.getElementById('stump-got-btn').style.display = '';
    document.getElementById('stump-missed-btn').style.display = '';
  }

  function stumpScore(got) {
    if (got) stumpState.got++; else stumpState.missed++;
    stumpUpdateScore();
    stumpState.phase = 'scored';
    document.getElementById('stump-got-btn').style.display = 'none';
    document.getElementById('stump-missed-btn').style.display = 'none';
    document.getElementById('stump-next-btn').style.display = '';
    if (stumpState.index >= stumpState.deck.length - 1) {
      document.getElementById('stump-next-btn').textContent = 'Play Again';
    }
  }

  function stumpNext() {
    stumpState.index++;
    if (stumpState.index >= stumpState.deck.length) {
      stumpStart();
    } else {
      stumpShowCase();
    }
    document.getElementById('stump-next-btn').style.display = 'none';
  }

  function stumpUpdateScore() {
    var total = stumpState.got + stumpState.missed;
    var max = Math.max(total, 1);
    document.getElementById('stump-got-num').textContent = stumpState.got;
    document.getElementById('stump-missed-num').textContent = stumpState.missed;
    document.getElementById('stump-got-bar').style.width = (stumpState.got / max * 100) + '%';
    document.getElementById('stump-missed-bar').style.width = (stumpState.missed / max * 100) + '%';
    document.getElementById('stump-round-info').textContent = 'Cases played: ' + total + ' of ' + (stumpState.deck.length || SCOTUS_CASES.length);
  }

  function stumpResetScore() {
    stumpState.got = 0; stumpState.missed = 0;
    stumpUpdateScore();
  }


  // ══════════════════════════════════════════════════════════
  //  FRQ PRACTICE ENGINE
  // ══════════════════════════════════════════════════════════

  // ── Build the prompt selector (called when review tab opens) ──
  function buildFrqPracticeUI() {
    var filterBtns = document.getElementById('frq-type-filter-btns');
    var promptList = document.getElementById('frq-prompt-list');
    if (!filterBtns || !promptList) return;

    var types = ['All', 'Concept Application', 'Quantitative Analysis', 'SCOTUS Comparison', 'Argumentative Essay'];
    filterBtns.innerHTML = types.map(function(t, i) {
      return '<button class="frq-type-select-btn' + (i === 0 ? ' active' : '') +
        '" onclick="frqFilterType(\'' + t + '\', this)">' + t + '</button>';
    }).join('');

    frqRenderPromptList('All');
  }

  function frqFilterType(type, btn) {
    document.querySelectorAll('.frq-type-select-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    frqPracticeState.activeType = type;
    frqRenderPromptList(type);
  }

  function frqRenderPromptList(type) {
    var list = document.getElementById('frq-prompt-list');
    if (!list) return;
    var filtered = type === 'All' ? FRQ_PROMPTS : FRQ_PROMPTS.filter(function(p) { return p.typeName === type; });
    list.innerHTML = filtered.map(function(p, i) {
      var realIdx = FRQ_PROMPTS.indexOf(p);
      return '<div class="frq-prompt-card" onclick="frqLaunchPrompt(' + realIdx + ')">' +
        '<div class="frq-prompt-card-unit">' + p.unitLabel + '</div>' +
        '<div class="frq-prompt-card-text">' + p.title + '</div>' +
        '<div class="frq-prompt-card-type">' + p.typeName + ' · ' + p.pts + ' pts · ' + p.minutes + ' min</div>' +
      '</div>';
    }).join('');
  }

  function frqLaunchRandom() {
    var type = frqPracticeState.activeType;
    var pool = type === 'All' ? FRQ_PROMPTS : FRQ_PROMPTS.filter(function(p) { return p.typeName === type; });
    var idx = Math.floor(Math.random() * pool.length);
    frqLaunchPrompt(FRQ_PROMPTS.indexOf(pool[idx]));
  }

  function frqLaunchPrompt(idx) {
    var p = FRQ_PROMPTS[idx];
    frqPracticeState.currentPrompt = p;
    frqPracticeState.timeLeft = p.minutes * 60;
    frqPracticeState.running = false;

    // Switch views
    document.getElementById('frq-selector-view').classList.remove('visible');
    document.getElementById('frq-selector-view').style.display = 'none';
    document.getElementById('frq-practice-view').classList.add('visible');

    // Header
    document.getElementById('frq-practice-type-badge').textContent =
      p.typeName.toUpperCase() + ' · ' + p.pts + ' PTS';
    document.getElementById('frq-practice-title').textContent = p.unitLabel + ' · ' + p.title;

    // Clock
    frqPracticeUpdateClock();
    document.getElementById('frq-practice-start-btn').textContent = 'Start';
    document.getElementById('frq-practice-clock').classList.remove('warning');

    // Chart
    var chartArea = document.getElementById('frq-chart-area');
    if (p.chart && FRQ_CHARTS[p.chart]) {
      var chart = FRQ_CHARTS[p.chart];
      document.getElementById('frq-chart-title').textContent = chart.title;
      document.getElementById('frq-chart-svg').innerHTML = chart.svg;
      chartArea.classList.add('visible');
    } else {
      chartArea.classList.remove('visible');
    }

    // Prompt
    document.getElementById('frq-prompt-display').innerHTML =
      p.prompt.split('\n').map(function(line) {
        return line.trim() ? '<p style="margin:0 0 8px">' + line + '</p>' : '<p style="margin:0 0 4px">&nbsp;</p>';
      }).join('');

    // Clear response
    var resp = document.getElementById('frq-response-area');
    resp.value = '';
    document.getElementById('frq-word-count').textContent = '0 words';
    resp.oninput = function() {
      var words = resp.value.trim().split(/\s+/).filter(function(w) { return w.length > 0; }).length;
      document.getElementById('frq-word-count').textContent = words + ' word' + (words !== 1 ? 's' : '');
    };

    // Side panel
    var typeData = FRQ_TIMER_DATA.find(function(t) { return t.type === p.typeName; });
    if (typeData) {
      document.getElementById('frq-side-pts').innerHTML =
        '<span class="frq-side-pts-badge">' + p.pts + ' pts</span>' +
        '<span class="frq-side-pts-label">' + p.typeName + '</span>';
      document.getElementById('frq-side-checklist').innerHTML =
        typeData.checklist.map(function(item) {
          return '<div class="frq-side-check-item" onclick="this.classList.toggle(\'checked\')">' +
            '<div class="frq-side-check-box"></div>' +
            '<div class="frq-side-check-text">' + item + '</div>' +
          '</div>';
        }).join('');
    }

    clearInterval(frqPracticeState.timerInterval);
  }

  function frqPracticeToggle() {
    if (frqPracticeState.running) {
      clearInterval(frqPracticeState.timerInterval);
      frqPracticeState.running = false;
      document.getElementById('frq-practice-start-btn').textContent = 'Resume';
    } else {
      frqPracticeState.running = true;
      document.getElementById('frq-practice-start-btn').textContent = 'Pause';
      frqPracticeState.timerInterval = setInterval(function() {
        frqPracticeState.timeLeft--;
        frqPracticeUpdateClock();
        if (frqPracticeState.timeLeft <= 0) {
          clearInterval(frqPracticeState.timerInterval);
          frqPracticeState.running = false;
          document.getElementById('frq-practice-start-btn').textContent = 'Start';
          document.getElementById('frq-practice-clock').textContent = 'TIME!';
          document.getElementById('frq-practice-clock').classList.add('warning');
        }
      }, 1000);
    }
  }

  function frqPracticeReset() {
    clearInterval(frqPracticeState.timerInterval);
    frqPracticeState.running = false;
    frqPracticeState.timeLeft = frqPracticeState.currentPrompt
      ? frqPracticeState.currentPrompt.minutes * 60 : 600;
    document.getElementById('frq-practice-start-btn').textContent = 'Start';
    document.getElementById('frq-practice-clock').classList.remove('warning');
    frqPracticeUpdateClock();
    document.querySelectorAll('.frq-side-check-item').forEach(function(i) { i.classList.remove('checked'); });
  }

  function frqPracticeUpdateClock() {
    var t = frqPracticeState.timeLeft;
    var m = Math.floor(t / 60);
    var s = t % 60;
    var clock = document.getElementById('frq-practice-clock');
    clock.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    if (t <= 120 && t > 0) clock.classList.add('warning');
    else clock.classList.remove('warning');
  }

  function frqBackToSelector() {
    clearInterval(frqPracticeState.timerInterval);
    frqPracticeState.running = false;
    document.getElementById('frq-practice-view').classList.remove('visible');
    document.getElementById('frq-selector-view').style.display = '';
    document.getElementById('frq-selector-view').classList.add('visible');
  }

  function frqCopyResponse() {
    var text = document.getElementById('frq-response-area').value;
    var p = frqPracticeState.currentPrompt;
    var full = (p ? p.typeName + ' — ' + p.title + '\n\n' : '') + text;
    navigator.clipboard.writeText(full).then(function() {
      var btn = document.querySelector('.frq-practice-action-btn.copy');
      if (btn) { btn.innerHTML = '<i class="ti ti-check"></i> Copied!'; setTimeout(function() { btn.innerHTML = '<i class="ti ti-clipboard"></i> Copy Response'; }, 2000); }
    });
  }

  function frqPrintResponse() {
    var p = frqPracticeState.currentPrompt;
    var response = document.getElementById('frq-response-area').value;
    var prompt = p ? p.prompt : '';
    var w = window.open('', '_blank');
    w.document.write('<html><head><title>FRQ Practice — ' + (p ? p.title : '') + '</title>' +
      '<style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;padding:20px;font-size:14px;line-height:1.7}' +
      'h2{font-size:18px;margin-bottom:4px}' +
      '.meta{font-size:12px;color:#666;margin-bottom:20px}' +
      '.prompt{background:#f5f5f5;padding:16px;border-left:4px solid #1a2e5a;margin-bottom:20px;font-size:13px;white-space:pre-wrap}' +
      '.response{border-top:2px solid #333;padding-top:16px;white-space:pre-wrap}' +
      '.response-label{font-weight:bold;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px}' +
      '</style></head><body>' +
      '<h2>' + (p ? p.title : 'FRQ Practice') + '</h2>' +
      '<div class="meta">' + (p ? p.typeName + ' · ' + p.pts + ' pts · ' + p.unitLabel : '') + ' · O\'Farrell High School AP Gov</div>' +
      '<div class="prompt">' + prompt + '</div>' +
      '<div class="response"><div class="response-label">Student Response</div>' + response.replace(/\n/g, '<br>') + '</div>' +
      '</body></html>');
    w.document.close();
    w.print();
  }

  // Wire up FRQ practice when review tab opens
  var frqPracticeBuilt = false;
  const reviewTab=document.querySelector('.nav-tab[data-tab="review"]');if(reviewTab)reviewTab.addEventListener('click', function() {
    if (!frqPracticeBuilt) {
      setTimeout(function() { buildFrqPracticeUI(); }, 50);
      frqPracticeBuilt = true;
    }
  });


  // ══════════════════════════════════════════════════════════
  //  AMENDMENT TRACKER ENGINE
  // ══════════════════════════════════════════════════════════
  var amendCurrentIdx = 0;
  var amendBuilt = false;

  var AMEND_ERAS = [
    { era: 'Bill of Rights', nums: [1,2,3,4,5,6,7,8,9,10] },
    { era: 'Post-Founding', nums: [11,12] },
    { era: 'Reconstruction', nums: [13,14,15] },
    { era: 'Progressive Era', nums: [16,17,18,19] },
    { era: 'New Deal Era', nums: [20,21] },
    { era: 'Cold War Era', nums: [22,23,25] },
    { era: 'Civil Rights Era', nums: [24,26] },
    { era: 'Modern Era', nums: [27] }
  ];

  function buildAmendmentTracker() {
    if (amendBuilt) return;
    amendBuilt = true;
    var sidebar = document.getElementById('amend-sidebar');
    if (!sidebar) return;

    AMEND_ERAS.forEach(function(eraGroup) {
      var group = document.createElement('div');
      group.className = 'amend-era-group';
      group.innerHTML = '<div class="amend-era-label">' + eraGroup.era + '</div>';

      eraGroup.nums.forEach(function(num) {
        var amend = AMENDMENTS.find(function(a) { return a.num === num; });
        if (!amend) return;
        var pill = document.createElement('div');
        pill.className = 'amend-pill' + (num === 1 ? ' active' : '');
        pill.dataset.num = num;
        var shortTitle = amend.title.length > 30 ? amend.title.substring(0,28) + '...' : amend.title;
        pill.innerHTML = '<span class="amend-pill-num">' + num + '</span>' +
          '<span class="amend-pill-title">' + shortTitle + '</span>';
        pill.addEventListener('click', function() {
          var idx = AMENDMENTS.findIndex(function(a) { return a.num === num; });
          if (idx >= 0) showAmendment(idx);
        });
        group.appendChild(pill);
      });
      sidebar.appendChild(group);
    });
    showAmendment(0);
  }

  function showAmendment(idx) {
    amendCurrentIdx = idx;
    var a = AMENDMENTS[idx];
    if (!a) return;

    // Update sidebar
    document.querySelectorAll('.amend-pill').forEach(function(p) { p.classList.remove('active'); });
    var activePill = document.querySelector('.amend-pill[data-num="' + a.num + '"]');
    if (activePill) {
      activePill.classList.add('active');
      activePill.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    // Build card
    var card = document.getElementById('amend-card');
    if (!card) return;

    var caseTags = a.cases.map(function(c) {
      return '<span class="amend-tag case" onclick="openCaseModal(\'' + c.replace(/'/g,"\\'") + '\')">' + c + ' ↗</span>';
    }).join('');

    var stdTags = a.standards.map(function(s) {
      return '<span class="amend-tag standard">EK ' + s + '</span>';
    }).join('');

    card.innerHTML =
      '<div class="amend-card-header">' +
        '<div class="amend-card-num">AMENDMENT ' + a.num + ' · ' + a.year + ' · ' + a.era + '</div>' +
        '<div class="amend-card-title">' + a.title + '</div>' +
        '<div class="amend-card-meta">Ratified ' + a.year + '</div>' +
      '</div>' +
      '<div class="amend-card-body">' +
        '<div class="amend-plain">' + a.plain + '</div>' +
        (stdTags ? '<div class="amend-section-label">AP Standards</div><div class="amend-tags">' + stdTags + '</div>' : '') +
        (caseTags ? '<div class="amend-section-label">Required SCOTUS Cases</div><div class="amend-tags">' + caseTags + '</div>' : '') +
        '<div class="amend-section-label">Historical Significance</div>' +
        '<div class="amend-sig">' + a.significance + '</div>' +
        '<div class="amend-section-label">⭐ AP Exam Tip</div>' +
        '<div class="amend-frq">' + a.frqs[0] + '</div>' +
      '</div>' +
      '<div class="amend-nav-btns">' +
        '<button class="amend-nav-btn" onclick="showAmendment(' + (idx-1) + ')"' + (idx === 0 ? ' disabled' : '') + '>← Amendment ' + (idx > 0 ? AMENDMENTS[idx-1].num : '') + '</button>' +
        '<button class="amend-nav-btn" onclick="showAmendment(' + (idx+1) + ')"' + (idx === AMENDMENTS.length-1 ? ' disabled' : '') + '>Amendment ' + (idx < AMENDMENTS.length-1 ? AMENDMENTS[idx+1].num : '') + ' →</button>' +
      '</div>';
  }

  const amendTab=document.querySelector('.nav-tab[data-tab="amendments"]');if(amendTab)amendTab.addEventListener('click', function() {
    setTimeout(buildAmendmentTracker, 30);
  });

  // ══════════════════════════════════════════════════════════
  //  FRQ ARCHIVE ENGINE
  // ══════════════════════════════════════════════════════════
  var archiveState = { type: 'all', unit: 'all', search: '' };
  var archiveBuilt = false;

  function buildArchive() {
    if (archiveBuilt) return;
    archiveBuilt = true;
    renderArchive();
  }

  function archiveFilter(dimension, value, btn) {
    archiveState[dimension] = value;
    var group = btn.closest('.archive-filter-group');
    group.querySelectorAll('.archive-filter-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    renderArchive();
  }

  function archiveSearch(q) {
    archiveState.search = q.toLowerCase().trim();
    renderArchive();
  }

  var TYPE_CLASS = {
    'Concept Application': 'ca',
    'Quantitative Analysis': 'qa',
    'SCOTUS Comparison': 'sc',
    'Argumentative Essay': 'ae'
  };

  function renderArchive() {
    var grid = document.getElementById('archive-grid');
    var countEl = document.getElementById('archive-count');
    if (!grid) return;

    var filtered = FRQ_ARCHIVE.filter(function(q) {
      if (archiveState.type !== 'all' && q.type !== archiveState.type) return false;
      if (archiveState.unit !== 'all' && String(q.unit) !== archiveState.unit) return false;
      if (archiveState.search) {
        var haystack = (q.title + ' ' + q.prompt + ' ' + q.type).toLowerCase();
        if (!haystack.includes(archiveState.search)) return false;
      }
      return true;
    });

    if (countEl) countEl.textContent = filtered.length + ' question' + (filtered.length !== 1 ? 's' : '');

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="archive-empty">No questions match your filters.<br>Try broadening your search.</div>';
      return;
    }

    grid.innerHTML = filtered.map(function(q, i) {
      var realIdx = FRQ_ARCHIVE.indexOf(q);
      var tc = TYPE_CLASS[q.type] || 'ca';
      return '<div class="archive-card" id="arch-card-' + realIdx + '">' +
        '<div class="archive-card-head" onclick="archiveToggle(' + realIdx + ')">' +
          '<span class="archive-card-year">' + q.year + '</span>' +
          '<div class="archive-card-info">' +
            '<div class="archive-card-type ' + tc + '">' + q.type + '</div>' +
            '<div class="archive-card-title">' + q.title + '</div>' +
            '<div class="archive-card-meta">Unit ' + q.unit + ' · Standard ' + q.standard + '</div>' +
          '</div>' +
          '<span class="archive-card-toggle">▾</span>' +
        '</div>' +
        '<div class="archive-card-body">' + q.prompt +
          '<div class="archive-card-actions">' +
            '<button class="archive-action-btn practice" onclick="archivePractice(' + realIdx + ');event.stopPropagation()">⏱ Practice with Timer</button>' +
            '<button class="archive-action-btn copy" onclick="archiveCopy(' + realIdx + ');event.stopPropagation()">Copy Prompt</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function archiveToggle(idx) {
    var card = document.getElementById('arch-card-' + idx);
    if (card) card.classList.toggle('open');
  }

  function archiveCopy(idx) {
    var q = FRQ_ARCHIVE[idx];
    navigator.clipboard.writeText(q.year + ' AP Gov FRQ — ' + q.title + '\n\n' + q.prompt).then(function() {
      adminToast('✓ Prompt copied to clipboard');
    });
  }

  function archivePractice(idx) {
    var q = FRQ_ARCHIVE[idx];
    // Switch to review tab and pre-load this prompt in the practice area
    switchToTab('review');
    // Build a temporary prompt object from archive entry
    setTimeout(function() {
      if (!frqPracticeBuilt) { buildFrqPracticeUI(); frqPracticeBuilt = true; }
      var tempPrompt = {
        type: ['Concept Application','Quantitative Analysis','SCOTUS Comparison','Argumentative Essay'].indexOf(q.type),
        typeName: q.type,
        pts: q.type === 'Argumentative Essay' ? 6 : (q.type === 'Concept Application' ? 3 : 4),
        minutes: q.type === 'Argumentative Essay' ? 25 : (q.type === 'Concept Application' ? 10 : 15),
        unit: q.unit, unitLabel: 'Unit ' + q.unit,
        title: q.year + ' AP Exam — ' + q.title,
        chart: null,
        prompt: q.prompt
      };
      FRQ_PROMPTS.push(tempPrompt);
      frqLaunchPrompt(FRQ_PROMPTS.length - 1);
    }, 60);
  }

  const archiveTab=document.querySelector('.nav-tab[data-tab="archive"]');if(archiveTab)archiveTab.addEventListener('click', function() {
    setTimeout(buildArchive, 30);
  });


  // ══════════════════════════════════════════════════════════
  //  BOOT
  // ══════════════════════════════════════════════════════════
  function bootSite() {
    init()
      .then(function() { setupSubmitButtons(); })
      .catch(function(e) {
        console.error('APG site boot failed', e);
        try {
          contentData = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
          loadContent().then(function(){ setupSubmitButtons(); });
        } catch (fallbackErr) {
          console.error('APG fallback boot failed', fallbackErr);
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSite);
  } else {
    bootSite();
  }

