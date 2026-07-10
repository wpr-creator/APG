// ════════════════════════════════════════════════════
// app-skills.js — AP Gov Site: Foundations Skills Engine
// Identity gate, timer lock, practice engine, Apply It
// ════════════════════════════════════════════════════

var SKILLS_PROGRESS_KEY = "apgov_skills_progress";

function skillsGetProgress() {
  try { return JSON.parse(localStorage.getItem(SKILLS_PROGRESS_KEY) || "{}"); }
  catch (e) { return {}; }
}
function skillsSaveProgress(activityId, level, score, total) {
  var p = skillsGetProgress();
  if (!p[activityId]) p[activityId] = {};
  p[activityId]['level' + level] = { score: score, total: total, completed: score >= Math.ceil(total * 0.7), date: new Date().toISOString() };
  localStorage.setItem(SKILLS_PROGRESS_KEY, JSON.stringify(p));
}
function skillsIsLevelUnlocked(activityId, level) {
  if (level === 1) return true;
  var p = skillsGetProgress();
  var prev = p[activityId] && p[activityId]['level' + (level - 1)];
  return prev && prev.completed;
}


// ════════════════════════════════════════════════════════════════
//  SKILL BUILDERS — STUDENT IDENTITY + ANTI-RUSH MECHANICS
// ════════════════════════════════════════════════════════════════

// ── Student Identity Gate ──
function skillsBuildIdDropdowns() {
  // If contentData not ready yet, retry after a short delay
  if (!contentData || !contentData.periods) {
    setTimeout(skillsBuildIdDropdowns, 300);
    return;
  }
  var periodSel = document.getElementById('skills-period-select');
  var nameSel = document.getElementById('skills-name-select');
  if (!periodSel) return;

  // Only rebuild if periods have actual students (avoid clearing a working dropdown)
  var hasPeriods = contentData.periods.some(function(p) {
    return p.students && p.students.length > 0;
  });
  if (!hasPeriods && periodSel.options.length > 1) return;

  // Clear and rebuild
  periodSel.innerHTML = '<option value="">Select your period...</option>';
  contentData.periods.forEach(function(p) {
    var opt = document.createElement('option');
    opt.value = p.id; opt.textContent = p.label;
    periodSel.appendChild(opt);
  });

  periodSel.addEventListener('change', function() {
    var period = contentData.periods.find(function(p) { return p.id === periodSel.value; });
    nameSel.innerHTML = '<option value="">Select your name...</option>';
    if (period && period.students && period.students.length) {
      period.students.forEach(function(s) {
        var opt = document.createElement('option');
        opt.value = s; opt.textContent = s;
        nameSel.appendChild(opt);
      });
      nameSel.disabled = false;
    } else {
      nameSel.disabled = true;
    }
    skillsCheckIdReady();
  });

  nameSel.addEventListener('change', skillsCheckIdReady);

  // Restore saved identity
  var savedPeriod = localStorage.getItem('skills_period');
  var savedName = localStorage.getItem('skills_name');
  if (savedPeriod && savedName) {
    periodSel.value = savedPeriod;
    periodSel.dispatchEvent(new Event('change'));
    setTimeout(function() {
      nameSel.value = savedName;
      skillsCheckIdReady();
      skillsApplyIdentity(savedPeriod, savedName, true);
    }, 100);
  }
}

function skillsCheckIdReady() {
  var p = document.getElementById('skills-period-select').value;
  var n = document.getElementById('skills-name-select').value;
  var btn = document.getElementById('skills-id-btn');
  if (btn) btn.disabled = !(p && n);
}

function skillsConfirmIdentity() {
  var p = document.getElementById('skills-period-select').value;
  var n = document.getElementById('skills-name-select').value;
  if (!p || !n) return;
  localStorage.setItem('skills_period', p);
  localStorage.setItem('skills_name', n);
  skillsApplyIdentity(p, n, false);
}

function skillsApplyIdentity(period, name, silent) {
  document.getElementById('skills-id-gate').style.display = 'none';
  var welcome = document.getElementById('skills-id-welcome');
  var welcomeText = document.getElementById('skills-id-welcome-text');
  if (welcome && welcomeText) {
    welcomeText.textContent = '✓ Signed in as ' + name + ' — ' + period;
    welcome.style.display = 'block';
  }
  document.getElementById('skills-content-area').style.display = '';
}

function skillsTeacherPreview() {
  var period = 'Teacher';
  var name = 'Teacher Preview';
  localStorage.setItem('skills_period', period);
  localStorage.setItem('skills_name', name);
  skillsApplyIdentity(period, name, false);
}

function skillsChangeIdentity() {
  localStorage.removeItem('skills_period');
  localStorage.removeItem('skills_name');
  document.getElementById('skills-id-gate').style.display = '';
  document.getElementById('skills-id-welcome').style.display = 'none';
  document.getElementById('skills-content-area').style.display = 'none';
  document.getElementById('skills-period-select').value = '';
  document.getElementById('skills-name-select').value = '';
  document.getElementById('skills-name-select').disabled = true;
  document.getElementById('skills-id-btn').disabled = true;
}

// Call this after content loads
function skillsInitIdGate() {
  skillsBuildIdDropdowns();
}

// ── Timer lock on Learn It (3 minutes) ──
var learnItTimerInterval = null;
var learnItSecondsLeft = 180;

function skillsStartLearnTimer(btn) {
  if (!btn) return;
  btn.disabled = true;
  learnItSecondsLeft = 180;

  // Add timer lock UI
  var lockDiv = document.createElement('div');
  lockDiv.className = 'skills-timer-lock';
  lockDiv.id = 'skills-timer-lock';
  lockDiv.innerHTML =
    '<span class="skills-timer-lock-icon">⏳</span>' +
    '<span>Read through everything above before moving on.</span>' +
    '<span class="skills-timer-count" id="learn-timer-count">3:00</span>';
  btn.parentNode.insertBefore(lockDiv, btn);

  clearInterval(learnItTimerInterval);
  learnItTimerInterval = setInterval(function() {
    learnItSecondsLeft--;
    var m = Math.floor(learnItSecondsLeft / 60);
    var s = learnItSecondsLeft % 60;
    var el = document.getElementById('learn-timer-count');
    if (el) el.textContent = m + ':' + (s < 10 ? '0' : '') + s;

    if (learnItSecondsLeft <= 0) {
      clearInterval(learnItTimerInterval);
      btn.disabled = false;
      var lock = document.getElementById('skills-timer-lock');
      if (lock) {
        lock.style.background = '#f0fdf4';
        lock.style.borderColor = '#22c55e';
        lock.style.color = '#166534';
        lock.innerHTML = '<span>✓</span><span>Times up -- you can move on now.</span>';
      }
    }
  }, 1000);
}

// ── Attempt-first in guided examples ──
var guidedAttempted = false;

function skillsRenderGuidedExamplesWithAttempt(levelData) {
  var examples = levelData.guidedExamples;
  var total = examples.length;
  var i = guidedExampleIdx;
  var ex = examples[i];
  guidedAttempted = false;

  var dots = examples.map(function(_, di) {
    return '<div class="skills-guided-dot' + (di === i ? ' active' : '') + '"></div>';
  }).join('');

  var labels = ex.answer === 'fact'
    ? ['FACT', 'OPINION']
    : (ex.answer === 'claim' ? ['CLAIM', 'EVIDENCE'] : ['FACT', 'OPINION']);

  var attemptHtml =
    '<div class="skills-guided-attempt" id="guided-attempt-row">' +
      labels.map(function(label) {
        var val = label.toLowerCase();
        return '<button class="skills-guided-attempt-btn" onclick="skillsGuidedAttempt(this,&quot;' + val + '&quot;,&quot;' + ex.answer + '&quot;)">' + label + '</button>';
      }).join('') +
    '</div>' +
    '<div class="skills-guided-attempt-result" id="guided-attempt-result"></div>';

  var prevBtn = i > 0
    ? '<button class="skills-guided-nav-btn prev" onclick="skillsGuidedNavNew(-1)">← PREVIOUS</button>'
    : '<span></span>';

  var nextBtn = i < total - 1
    ? '<button class="skills-guided-nav-btn next" id="guided-next-btn" onclick="skillsGuidedNavNew(1)" disabled>NEXT EXAMPLE →</button>'
    : '<button class="skills-guided-nav-btn practice" id="guided-next-btn" onclick="skillsStartPractice()" disabled>START PRACTICE →</button>';

  document.getElementById('skills-guided-body').innerHTML =
    '<div class="skills-guided-step show">' +
      '<div class="skills-guided-step-counter">EXAMPLE ' + (i+1) + ' OF ' + total + ' — TRY IT FIRST</div>' +
      '<div class="skills-guided-passage">' + ex.sentence + '</div>' +
      attemptHtml +
      '<div class="skills-guided-thinking" id="guided-thinking" style="display:none">' +
        '<div class="skills-guided-thinking-label">STEP-BY-STEP THINKING:</div>' +
        '<div class="skills-guided-thinking-text">' + ex.thinking + '</div>' +
      '</div>' +
      '<div class="skills-guided-verdict ' + ex.answer + '" id="guided-verdict" style="display:none">ANSWER: ' + ex.verdict + '</div>' +
      '<div class="skills-guided-nav">' +
        prevBtn +
        '<div class="skills-guided-dots">' + dots + '</div>' +
        nextBtn +
      '</div>' +
    '</div>';
}

function skillsGuidedAttempt(btn, chosen, correct) {
  if (guidedAttempted) return;
  guidedAttempted = true;

  var isCorrect = chosen === correct;
  var btns = document.querySelectorAll('.skills-guided-attempt-btn');
  btns.forEach(function(b) {
    b.disabled = true;
    var bVal = b.textContent.toLowerCase();
    if (bVal === correct) b.classList.add('correct-pick');
    else if (b === btn && !isCorrect) b.classList.add('wrong-pick');
  });

  var result = document.getElementById('guided-attempt-result');
  if (result) {
    result.className = 'skills-guided-attempt-result show ' + (isCorrect ? 'correct' : 'wrong');
    result.textContent = isCorrect
      ? '✓ Correct! Now see the full thinking below.'
      : '✗ Not quite — but that is okay. Read the thinking below to see why.';
  }

  // Reveal thinking + verdict
  var thinking = document.getElementById('guided-thinking');
  var verdict = document.getElementById('guided-verdict');
  if (thinking) thinking.style.display = '';
  if (verdict) verdict.style.display = '';

  // Unlock next button
  var nextBtn = document.getElementById('guided-next-btn');
  if (nextBtn) nextBtn.disabled = false;
}

function skillsGuidedNavNew(dir) {
  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  var levelData = activity.levels[skillsState.level - 1];
  guidedExampleIdx = Math.max(0, Math.min(levelData.guidedExamples.length - 1, guidedExampleIdx + dir));
  skillsRenderGuidedExamplesWithAttempt(levelData);
}

// ── Feedback time lock on practice questions (4 seconds) ──
var feedbackLockInterval = null;

function skillsStartFeedbackLock() {
  var bar = document.getElementById('skills-next-lock-bar');
  var fill = document.getElementById('skills-next-lock-fill');
  var nextBtn = document.getElementById('skills-next-btn');
  if (!bar || !fill || !nextBtn) return;

  nextBtn.disabled = true;
  bar.className = 'skills-next-lock-bar show';
  fill.style.width = '0%';
  fill.style.transition = 'none';

  var elapsed = 0;
  var duration = 4000;
  var interval = 100;

  clearInterval(feedbackLockInterval);
  feedbackLockInterval = setInterval(function() {
    elapsed += interval;
    var pct = Math.min(100, (elapsed / duration) * 100);
    fill.style.transition = 'width 0.1s linear';
    fill.style.width = pct + '%';
    if (elapsed >= duration) {
      clearInterval(feedbackLockInterval);
      nextBtn.disabled = false;
      bar.className = 'skills-next-lock-bar';
    }
  }, interval);
}



// ════════════════════════════════════════════════════════════════
//  SKILL BUILDERS — ACTIVITY GRID UNLOCK REFRESH
// ════════════════════════════════════════════════════════════════
function skillsRefreshActivityGrid() {
  var activities = ['cer', 'vocab', 'closereading'];
  activities.forEach(function(actId) {
    var card = document.getElementById('skills-card-' + actId);
    if (!card) return;

    var unlocked = skillsIsActivityUnlocked(actId);
    card.classList.toggle('locked-by-teacher', !unlocked);

    // Update onclick
    if (!unlocked) {
      card.setAttribute('onclick', 'skillsShowLockedMessage()');
    } else {
      card.setAttribute('onclick', "skillsOpenActivity('" + actId + "')");
    }

    // Update level dots to show which levels are unlocked
    var dotsEl = document.getElementById('skills-dots-' + actId);
    if (!dotsEl) return;

    var act = contentData && contentData.foundations_unlocks && contentData.foundations_unlocks[actId];
    if (!act || !act.levels) return;

    dotsEl.innerHTML = act.levels.map(function(lv) {
      var dotClass = 'skills-level-dot';
      if (lv.level === 1) dotClass += ' l1';
      else if (lv.level === 2) dotClass += ' l2';
      else dotClass += ' l3';
      if (!lv.unlocked) dotClass += ' locked-dot';
      return '<div class="' + dotClass + '" title="Level ' + lv.level + ': ' + (lv.unlocked ? 'UNLOCKED' : 'LOCKED') + '">' +
        (lv.unlocked ? lv.level : '🔒') + '</div>';
    }).join('');

    // Add/remove lock banner
    var existing = card.querySelector('.skills-activity-lock-banner');
    if (!unlocked) {
      if (!existing) {
        var banner = document.createElement('div');
        banner.className = 'skills-activity-lock-banner';
        banner.textContent = '🔒 NOT YET AVAILABLE';
        card.appendChild(banner);
      }
    } else {
      if (existing) existing.remove();
    }
  });
}

function skillsShowLockedMessage() {
  var toastFn = typeof adminToast === 'function' ? adminToast : alert;
  toastFn('This activity has not been unlocked yet. Check back soon!');
}

var skillsState = {
  activity: null,
  level: 1,
  questions: [],
  qIndex: 0,
  score: 0,
  answered: false,
  startTime: null
};

var SKILLS_ACTIVITY_DATA = {
  cer: { name: "CLAIM, EVIDENCE & REASONING", levels: [SKILLS_CER_LEVEL1, SKILLS_CER_LEVEL2, SKILLS_CER_LEVEL3] },
  vocab: { name: "ACADEMIC VOCABULARY IN CONTEXT", levels: [SKILLS_VOCAB_LEVEL0, SKILLS_VOCAB_LEVEL1, SKILLS_VOCAB_LEVEL2, SKILLS_VOCAB_LEVEL3] },
  closereading: { name: "CLOSE READING (AVID)", levels: [CLOSEREADING_LEVEL0, CLOSEREADING_LEVEL1, CLOSEREADING_LEVEL2, CLOSEREADING_LEVEL3] }
};

function skillsIsActivityUnlocked(activityId) {
  if (!contentData || !contentData.foundations_unlocks) return activityId === 'cer';
  var act = contentData.foundations_unlocks[activityId];
  if (!act || !act.levels) return false;
  return act.levels.some(function(lv) { return lv.unlocked; });
}

function skillsIsLevelUnlockedByTeacher(activityId, levelNum) {
  if (!contentData || !contentData.foundations_unlocks) return (activityId === 'cer' && levelNum === 1);
  var act = contentData.foundations_unlocks[activityId];
  if (!act || !act.levels) return false;
  var lv = act.levels.find(function(l) { return l.level === levelNum; });
  return lv ? lv.unlocked : false;
}

function skillsOpenActivity(activityId) {
  if (!skillsIsActivityUnlocked(activityId)) {
    adminToast && adminToast('This activity has not been unlocked yet. Check back soon!');
    return;
  }
  skillsState.activity = activityId;
  document.getElementById('skills-menu').style.display = 'none';
  document.getElementById('skills-detail-area').classList.add('show');
  skillsBuildLevelTabs();
  // Start at the first unlocked level
  var act = contentData && contentData.foundations_unlocks && contentData.foundations_unlocks[activityId];
  var firstUnlocked = 1;
  if (act && act.levels) {
    var found = act.levels.find(function(l) { return l.unlocked; });
    if (found) firstUnlocked = found.level;
  }
  skillsLoadLevel(firstUnlocked);
}

function skillsBackToMenu() {
  document.getElementById('skills-menu').style.display = '';
  document.getElementById('skills-detail-area').classList.remove('show');
  document.getElementById('skills-learn-panel').classList.remove('show');
  document.getElementById('skills-guided-panel').classList.remove('show');
  document.getElementById('skills-practice-panel').classList.remove('show');
  document.getElementById('skills-results').classList.remove('show');
  document.getElementById('skills-apply-panel').classList.remove('show');
  document.getElementById('skills-closereading-panel').classList.remove('show');
  applyItTagged = {};
  applyItSelected = null;
}

function skillsBuildLevelTabs() {
  var wrap = document.getElementById('skills-level-tabs');
  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  wrap.innerHTML = activity.levels.map(function(lvl, i) {
    var levelNum = i + 1;
    // Teacher unlock takes priority; student progress unlock is secondary
    var teacherUnlocked = skillsIsLevelUnlockedByTeacher(skillsState.activity, levelNum);
    var studentUnlocked = skillsIsLevelUnlocked(skillsState.activity, levelNum);
    var canAccess = teacherUnlocked && studentUnlocked;
    var lockedByTeacher = !teacherUnlocked;
    var lockedByProgress = teacherUnlocked && !studentUnlocked;

    var cls = 'skills-level-tab';
    if (canAccess) cls += ' unlocked';
    if (levelNum === skillsState.level && canAccess) cls += ' active';
    if (lockedByTeacher || lockedByProgress) cls += ' locked';

    var lockIcon = lockedByTeacher ? ' 🔒' : (lockedByProgress ? ' ⭐' : '');
    var tooltip = lockedByTeacher ? 'Not available yet' : (lockedByProgress ? 'Complete Level ' + (levelNum-1) + ' first' : '');
    var onclick = canAccess ? 'onclick="skillsLoadLevel(' + levelNum + ')"' : '';

    return '<div class="' + cls + '" ' + onclick + ' title="' + tooltip + '">' +
      'LEVEL ' + levelNum + lockIcon + '</div>';
  }).join('');
}

function skillsLoadLevel(levelNum) {
  if (!skillsIsLevelUnlocked(skillsState.activity, levelNum)) return;
  if (!skillsIsLevelUnlockedByTeacher(skillsState.activity, levelNum)) {
    skillsShowLockedMessage();
    return;
  }
  skillsState.level = levelNum;
  skillsState.startTime = Date.now();
  skillsBuildLevelTabs();

  if (skillsState.activity === 'closereading') {
    document.getElementById('skills-learn-panel').classList.remove('show');
    document.getElementById('skills-guided-panel').classList.remove('show');
    document.getElementById('skills-practice-panel').classList.remove('show');
    closeReadingLoadLevel(levelNum);
    return;
  }
  document.getElementById('skills-closereading-panel').classList.remove('show');

  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  var levelData = activity.levels[levelNum - 1];

  // Show Learn It panel
  document.getElementById('skills-learn-panel').classList.add('show');
  document.getElementById('skills-guided-panel').classList.remove('show');
  document.getElementById('skills-practice-panel').classList.remove('show');
  document.getElementById('skills-results').classList.remove('show');

  document.getElementById('skills-learn-title').textContent = 'LEARN IT — ' + levelData.learnTitle;

  var signalHtml = '';
  if (levelData.signalWords) {
    signalHtml = '<div class="skills-signal-grid">' +
      '<div class="skills-signal-card fact-card">' +
        '<div class="skills-signal-card-title">✓ FACT SIGNAL WORDS</div>' +
        '<span class="skills-signal-word">in [year]</span>' +
        '<span class="skills-signal-word">according to</span>' +
        '<span class="skills-signal-word">research shows</span>' +
        '<span class="skills-signal-word">studies found</span>' +
        '<span class="skills-signal-word">data shows</span>' +
        '<span class="skills-signal-word">the law states</span>' +
        '<span class="skills-signal-word">it was recorded</span>' +
        '<span class="skills-signal-word">statistics show</span>' +
        '<div class="skills-signal-note">These words point to checkable, verifiable information.</div>' +
      '</div>' +
      '<div class="skills-signal-card opinion-card">' +
        '<div class="skills-signal-card-title">✗ OPINION SIGNAL WORDS</div>' +
        '<span class="skills-signal-word">should</span>' +
        '<span class="skills-signal-word">must</span>' +
        '<span class="skills-signal-word">best / worst</span>' +
        '<span class="skills-signal-word">I believe</span>' +
        '<span class="skills-signal-word">I think</span>' +
        '<span class="skills-signal-word">most important</span>' +
        '<span class="skills-signal-word">too much / too little</span>' +
        '<span class="skills-signal-word">always / never</span>' +
        '<span class="skills-signal-word">clearly / obviously</span>' +
        '<div class="skills-signal-note">These words express judgments, values, or beliefs.</div>' +
      '</div>' +
    '</div>';
  }

  var warningHtml = '';
  if (levelData.warning) {
    warningHtml = '<div class="skills-warning-box">' +
      '<div class="skills-warning-title">⚠️ ' + levelData.warning.title + '</div>' +
      levelData.warning.points.map(function(p) {
        return '<div class="skills-warning-text" style="margin-bottom:8px">' + p + '</div>';
      }).join('') +
    '</div>';
  }

  document.getElementById('skills-learn-body').innerHTML =
    '<div class="skills-big-explainer">' + levelData.learnBig + '</div>' +
    '<div class="skills-explainer-sub">' + levelData.learnSub + '</div>' +
    signalHtml +
    '<div class="skills-example-row">' +
      '<div class="skills-example-box good">' +
        '<div class="skills-example-label">' + levelData.goodLabel + '</div>' +
        '<div class="skills-example-text">' + levelData.goodExample + '</div>' +
      '</div>' +
      '<div class="skills-example-box bad">' +
        '<div class="skills-example-label">' + levelData.badLabel + '</div>' +
        '<div class="skills-example-text">' + levelData.badExample + '</div>' +
      '</div>' +
    '</div>' +
    warningHtml +
    '<button class="skills-continue-btn" id="skills-learn-continue-btn" onclick="skillsShowGuided()">I\'VE GOT IT — SHOW ME EXAMPLES</button>';
  setTimeout(function() {
    var btn = document.getElementById('skills-learn-continue-btn');
    if (btn) skillsStartLearnTimer(btn);
  }, 100);
}

var guidedExampleIdx = 0;

function skillsShowGuided() {
  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  var levelData = activity.levels[skillsState.level - 1];

  document.getElementById('skills-learn-panel').classList.remove('show');
  document.getElementById('skills-guided-panel').classList.add('show');
  guidedExampleIdx = 0;

  if (levelData.guidedExamples && levelData.guidedExamples.length > 0) {
    skillsRenderGuidedExamplesWithAttempt(levelData);
  } else {
    // Legacy single example fallback
    document.getElementById('skills-guided-body').innerHTML =
      '<div class="skills-guided-passage">' + levelData.guidedPassage + '</div>' +
      '<div class="skills-guided-answer">' +
        '<div class="skills-guided-answer-label">HERE\'S THE THINKING</div>' +
        '<div class="skills-guided-answer-text">' + levelData.guidedAnswer + '</div>' +
      '</div>' +
      '<button class="skills-continue-btn" onclick="skillsStartPractice()">READY — MY TURN</button>';
  }
}

function skillsRenderGuidedExamples(levelData) {
  var examples = levelData.guidedExamples;
  var total = examples.length;
  var i = guidedExampleIdx;
  var ex = examples[i];

  var dots = examples.map(function(_, di) {
    return '<div class="skills-guided-dot' + (di === i ? ' active' : '') + '"></div>';
  }).join('');

  var prevBtn = i > 0
    ? '<button class="skills-guided-nav-btn prev" onclick="skillsGuidedNav(-1)">← PREVIOUS</button>'
    : '<span></span>';

  var nextBtn = i < total - 1
    ? '<button class="skills-guided-nav-btn next" onclick="skillsGuidedNav(1)">NEXT EXAMPLE →</button>'
    : '<button class="skills-guided-nav-btn practice" onclick="skillsStartPractice()">START PRACTICE →</button>';

  document.getElementById('skills-guided-body').innerHTML =
    '<div class="skills-guided-step show">' +
      '<div class="skills-guided-step-counter">WORKED EXAMPLE ' + (i+1) + ' OF ' + total + '</div>' +
      '<div class="skills-guided-passage">' + ex.sentence + '</div>' +
      '<div class="skills-guided-thinking">' +
        '<div class="skills-guided-thinking-label">STEP-BY-STEP THINKING:</div>' +
        '<div class="skills-guided-thinking-text">' + ex.thinking + '</div>' +
      '</div>' +
      '<div class="skills-guided-verdict ' + ex.answer + '">ANSWER: ' + ex.verdict + '</div>' +
      '<div class="skills-guided-nav">' +
        prevBtn +
        '<div class="skills-guided-dots">' + dots + '</div>' +
        nextBtn +
      '</div>' +
    '</div>';
}

function skillsGuidedNav(dir) {
  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  var levelData = activity.levels[skillsState.level - 1];
  guidedExampleIdx = Math.max(0, Math.min(levelData.guidedExamples.length - 1, guidedExampleIdx + dir));
  skillsRenderGuidedExamples(levelData);
}

function skillsStartPractice() {
  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  var levelData = activity.levels[skillsState.level - 1];

  document.getElementById('skills-guided-panel').classList.remove('show');
  document.getElementById('skills-practice-panel').classList.add('show');
  document.getElementById('skills-results').classList.remove('show');

  // Shuffle questions
  skillsState.questions = levelData.questions.slice();
  for (var i = skillsState.questions.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = skillsState.questions[i]; skillsState.questions[i] = skillsState.questions[j]; skillsState.questions[j] = tmp;
  }
  skillsState.qIndex = 0;
  skillsState.score = 0;
  skillsShowQuestion();
}

function skillsShowQuestion() {
  var q = skillsState.questions[skillsState.qIndex];
  var total = skillsState.questions.length;
  skillsState.answered = false;

  document.getElementById('skills-q-counter').textContent = 'Question ' + (skillsState.qIndex + 1) + ' of ' + total;
  document.getElementById('skills-progress-fill').style.width = (skillsState.qIndex / total * 100) + '%';
  document.getElementById('skills-score-badge').textContent = skillsState.score + ' / ' + total;

  var choiceRow = document.getElementById('skills-choice-row');
  var passage = document.getElementById('skills-q-passage');
  var instruction = document.getElementById('skills-q-instruction');

  if (q.choices) {
    // Level 3 style: multi-choice reasoning question
    instruction.textContent = 'Pick the best answer:';
    passage.textContent = q.text;
    choiceRow.style.gridTemplateColumns = '1fr';
    choiceRow.innerHTML = q.choices.map(function(choice, i) {
      return '<button class="skills-choice-btn" onclick="skillsAnswer(this,' + i + ')" style="text-align:left;">' + choice + '</button>';
    }).join('');
  } else {
    // Level 1/2 style: binary classification
    instruction.textContent = skillsState.level === 1 ? 'Is this a FACT or an OPINION?' : 'Is this a CLAIM or EVIDENCE?';
    passage.textContent = q.text;
    choiceRow.style.gridTemplateColumns = '1fr 1fr';
    var labels = skillsState.level === 1 ? ['FACT', 'OPINION'] : ['CLAIM', 'EVIDENCE'];
    var values = skillsState.level === 1 ? ['fact', 'opinion'] : ['claim', 'evidence'];
    choiceRow.innerHTML = labels.map(function(label, i) {
      return '<button class="skills-choice-btn" onclick="skillsAnswerBinary(this,\'' + values[i] + '\')">' + label + '</button>';
    }).join('');
  }

  document.getElementById('skills-feedback').className = 'skills-feedback';
  document.getElementById('skills-next-btn').className = 'skills-next-btn';
}

function skillsAnswerBinary(btn, value) {
  if (skillsState.answered) return;
  skillsState.answered = true;
  var q = skillsState.questions[skillsState.qIndex];
  var correct = value === q.answer;
  if (correct) skillsState.score++;

  document.querySelectorAll('.skills-choice-btn').forEach(function(b) {
    b.disabled = true;
    var bVal = b === btn ? value : null;
    if ((skillsState.level === 1 ? ['fact','opinion'] : ['claim','evidence']).indexOf(b.textContent.toLowerCase()) === (skillsState.level === 1 ? ['fact','opinion'] : ['claim','evidence']).indexOf(q.answer)) {
      b.classList.add('correct');
    } else if (b === btn && !correct) {
      b.classList.add('wrong');
    }
  });

  skillsShowFeedback(correct, q.explain);
}

function skillsAnswer(btn, idx) {
  if (skillsState.answered) return;
  skillsState.answered = true;
  var q = skillsState.questions[skillsState.qIndex];
  var correct = idx === q.answer;
  if (correct) skillsState.score++;

  document.querySelectorAll('.skills-choice-btn').forEach(function(b, i) {
    b.disabled = true;
    if (i === q.answer) b.classList.add('correct');
    else if (b === btn && !correct) b.classList.add('wrong');
  });

  skillsShowFeedback(correct, q.explain);
}

function skillsShowFeedback(correct, explainText) {
  var fb = document.getElementById('skills-feedback');
  fb.className = 'skills-feedback show ' + (correct ? 'correct' : 'wrong');
  fb.innerHTML = (correct ? '✓ Correct! ' : '✗ Not quite. ') + explainText;
  document.getElementById('skills-next-btn').className = 'skills-next-btn show';
  document.getElementById('skills-score-badge').textContent = skillsState.score + ' / ' + skillsState.questions.length;
  skillsStartFeedbackLock();
}

function skillsNextQuestion() {
  skillsState.qIndex++;
  if (skillsState.qIndex >= skillsState.questions.length) {
    skillsShowResults();
  } else {
    skillsShowQuestion();
  }
}

function skillsShowResults() {
  document.getElementById('skills-practice-panel').querySelector('.skills-progress-bar').style.display = 'none';
  document.getElementById('skills-q-counter').style.display = 'none';
  document.getElementById('skills-q-instruction').style.display = 'none';
  document.getElementById('skills-q-passage').style.display = 'none';
  document.getElementById('skills-choice-row').style.display = 'none';
  document.getElementById('skills-feedback').style.display = 'none';
  document.getElementById('skills-next-btn').style.display = 'none';

  var total = skillsState.questions.length;
  var score = skillsState.score;
  var pct = Math.round(score / total * 100);
  var passed = pct >= 70;

  skillsSaveProgress(skillsState.activity, skillsState.level, score, total);

  document.getElementById('skills-results').classList.add('show');
  document.getElementById('skills-results-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('skills-results-score').textContent = score + ' / ' + total;
  document.getElementById('skills-results-msg').textContent = passed
    ? 'GREAT WORK! You unlocked the next level.'
    : 'Almost there -- review and try again to unlock the next level (need 70%+).';

  var nextLevelBtn = document.getElementById('skills-next-level-btn');
  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  var hasNextLevel = skillsState.level < activity.levels.length;
  nextLevelBtn.style.display = (passed && hasNextLevel) ? '' : 'none';

  skillsSubmitScoreToSheet();
  skillsBuildLevelTabs();

  // Show Apply It button if this level has one
  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  var levelData = activity.levels[skillsState.level - 1];
  if (levelData.applyIt) {
    var applyBtn = document.createElement('button');
    applyBtn.className = 'skills-results-btn next-level';
    applyBtn.style.background = 'var(--skill-teal)';
    applyBtn.textContent = 'APPLY IT →';
    applyBtn.onclick = skillsStartApplyIt;
    var btnsEl = document.querySelector('.skills-results-btns');
    if (btnsEl) btnsEl.insertBefore(applyBtn, btnsEl.firstChild);
  }
}

var applyItTagged = {};

function skillsStartApplyIt() {
  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  var levelData = activity.levels[skillsState.level - 1];
  var applyData = levelData.applyIt;
  if (!applyData) return;

  // Tag pair is configurable per activity so Apply It can be reused for
  // skills other than fact/opinion (e.g. vocabulary correct/incorrect
  // usage). Defaults preserve the original CER fact/opinion behavior.
  var tagPos = applyData.tagPositive || { value: 'fact', label: 'TAG AS FACT' };
  var tagNeg = applyData.tagNegative || { value: 'opinion', label: 'TAG AS OPINION' };

  applyItTagged = {};
  document.getElementById('skills-results').classList.remove('show');
  document.getElementById('skills-apply-panel').classList.add('show');
  document.getElementById('skills-apply-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });

  var sentencesHtml = applyData.sentences.map(function(s, i) {
    return '<span class="skills-apply-sentence" id="apply-s-' + i + '" onclick="applySelectSentence(' + i + ')">' + s.text + '</span> ';
  }).join('');

  document.getElementById('skills-apply-body').innerHTML =
    '<div class="skills-apply-intro">' + applyData.intro + '</div>' +
    '<div class="skills-apply-tag-btns">' +
      '<button class="skills-apply-tag-btn tag-pos-btn" onclick="applyTagSelected(\'' + tagPos.value + '\',\'pos\')">' + tagPos.label + '</button>' +
      '<button class="skills-apply-tag-btn tag-neg-btn" onclick="applyTagSelected(\'' + tagNeg.value + '\',\'neg\')">' + tagNeg.label + '</button>' +
      '<button class="skills-apply-tag-btn clear-btn" onclick="applyTagSelected(\'clear\',\'clear\')">CLEAR TAG</button>' +
    '</div>' +
    '<div class="skills-apply-instructions">Click a sentence to select it, then click a tag button above. Selected sentence will highlight in yellow.</div>' +
    '<div class="skills-apply-passage" id="apply-passage">' + sentencesHtml + '</div>' +
    '<button class="skills-apply-check-btn" onclick="applyCheckWork()">CHECK MY WORK</button>' +
    '<div class="skills-apply-feedback" id="apply-feedback"></div>';

  applyItTagged = {};
  applyItSelected = null;
}

var applyItSelected = null;

function applySelectSentence(idx) {
  // Deselect previous
  if (applyItSelected !== null) {
    var prev = document.getElementById('apply-s-' + applyItSelected);
    if (prev && !prev.classList.contains('tagged-pos') && !prev.classList.contains('tagged-neg')) {
      prev.style.background = '';
    } else if (prev) {
      prev.style.outline = '';
    }
  }
  applyItSelected = idx;
  var el = document.getElementById('apply-s-' + idx);
  if (el) el.style.outline = '3px solid var(--skill-purple)';
}

function applyTagSelected(tag, polarity) {
  if (applyItSelected === null) return;
  var el = document.getElementById('apply-s-' + applyItSelected);
  if (!el) return;

  el.classList.remove('tagged-pos', 'tagged-neg');
  el.style.outline = '';

  if (tag === 'clear') {
    delete applyItTagged[applyItSelected];
  } else {
    el.classList.add('tagged-' + polarity);
    applyItTagged[applyItSelected] = tag;
  }
  applyItSelected = null;
}

function applyCheckWork() {
  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  var levelData = activity.levels[skillsState.level - 1];
  var sentences = levelData.applyIt.sentences;

  var correct = 0;
  var resultsHtml = '<div class="skills-apply-score" style="margin-bottom:16px">';

  var breakdown = sentences.map(function(s, i) {
    var tagged = applyItTagged[i];
    var isCorrect = tagged === s.answer;
    if (isCorrect) correct++;
    var status = !tagged ? 'untagged' : (isCorrect ? 'correct' : 'wrong');
    var icon = !tagged ? '⚠' : (isCorrect ? '✓' : '✗');
    var tagLabel = tagged ? tagged.toUpperCase() : 'NOT TAGGED';
    return '<div class="skills-apply-sentence-result ' + status + '">' +
      icon + ' <strong>' + tagLabel + ':</strong> "' + s.text + '"<br>' +
      '<span style="font-size:12px">' + s.explain + '</span>' +
    '</div>';
  }).join('');

  var pct = Math.round(correct / sentences.length * 100);
  var fb = document.getElementById('apply-feedback');
  fb.className = 'skills-apply-feedback show';
  fb.innerHTML =
    '<div class="skills-apply-score">' + correct + ' / ' + sentences.length + ' CORRECT</div>' +
    '<div style="text-align:center;color:#555;margin-bottom:16px;font-size:13px">' +
      (pct >= 70 ? 'Great work applying this skill to a real paragraph!' : 'Review the explanations below and try this passage again.') +
    '</div>' +
    breakdown +
    '<button class="skills-apply-check-btn" style="margin-top:16px" onclick="skillsBackToMenu()">BACK TO MENU</button>';

  document.getElementById('apply-feedback').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function skillsRetryLevel() {
  document.getElementById('skills-practice-panel').querySelector('.skills-progress-bar').style.display = '';
  document.getElementById('skills-q-counter').style.display = '';
  document.getElementById('skills-q-instruction').style.display = '';
  document.getElementById('skills-q-passage').style.display = '';
  document.getElementById('skills-choice-row').style.display = '';
  document.getElementById('skills-feedback').style.display = '';
  document.getElementById('skills-next-btn').style.display = '';
  skillsStartPractice();
}

function skillsNextLevel() {
  document.getElementById('skills-practice-panel').querySelector('.skills-progress-bar').style.display = '';
  document.getElementById('skills-q-counter').style.display = '';
  document.getElementById('skills-q-instruction').style.display = '';
  document.getElementById('skills-q-passage').style.display = '';
  document.getElementById('skills-choice-row').style.display = '';
  document.getElementById('skills-feedback').style.display = '';
  document.getElementById('skills-next-btn').style.display = '';
  skillsLoadLevel(skillsState.level + 1);
}

// Placeholder for Sheets submission -- wired in a later pass
function skillsSubmitScoreToSheet() {
  var period = localStorage.getItem('skills_period') || '';
  var name = localStorage.getItem('skills_name') || '';
  if (!period || !name) return;

  var activity = SKILLS_ACTIVITY_DATA[skillsState.activity];
  var activityName = activity ? activity.name : skillsState.activity;
  var total = skillsState.questions.length;
  var score = skillsState.score;
  var pct = total > 0 ? Math.round(score / total * 100) : 0;
  var today = new Date().toLocaleDateString('en-US');
  var timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

  // Calculate time spent
  var timeSpent = 'Unknown';
  if (skillsState.startTime) {
    var elapsed = Math.round((Date.now() - skillsState.startTime) / 1000);
    var mins = Math.floor(elapsed / 60);
    var secs = elapsed % 60;
    timeSpent = mins + 'm ' + secs + 's';
  }

  fetch(SCRIPT_URL, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'skill',
      date: today,
      period: period,
      name: name,
      activity: activityName,
      level: 'Level ' + skillsState.level,
      score: score,
      total: total,
      percent: pct + '%',
      timeSpent: timeSpent,
      timestamp: timestamp
    })
  }).catch(function(e) {
    console.log('Skill score submission failed (non-critical):', e);
  });
}


// ════════════════════════════════════════════════════════════════
//  CLOSE READING (AVID) ENGINE
// ════════════════════════════════════════════════════════════════
// A passage is read three times, each pass adding one highlight
// color (yellow=gist, blue=structure, pink=craft), cumulative on
// the same text. After each pass the student compares their
// highlighting + a short written response against a model
// annotation, then moves on. After all 3 passes on a passage, the
// student advances to the next passage (5 per level). Scoring
// compares which chunks the student tagged against each passage's
// model target chunks, and plugs into the same 70%-to-unlock and
// Google Sheets pipeline used by CER/Vocab.

var closeReadingState = {
  levelData: null,
  passageIdx: 0,
  pass: 1,
  maxPassReached: 1,
  tagged: {},
  notes: {},
  chunkNotes: {},
  passageScores: []
};

var CR_PASS_COLORS = { 1: 'yellow', 2: 'blue', 3: 'pink' };

function closeReadingSetPanelVisible(showPassageUI) {
  document.querySelector('#skills-closereading-panel .cr-passage-header').style.display = showPassageUI ? '' : 'none';
  document.getElementById('cr-pass-tabs').style.display = showPassageUI ? '' : 'none';
  document.getElementById('cr-pass-instruction').style.display = showPassageUI ? '' : 'none';
  document.getElementById('cr-legend').style.display = showPassageUI ? '' : 'none';
  document.getElementById('cr-passage-text').style.display = showPassageUI ? '' : 'none';
  document.getElementById('cr-chunk-notes-panel').style.display = showPassageUI ? '' : 'none';
  if (!showPassageUI) document.getElementById('cr-simplify-box').classList.remove('show');
  document.querySelector('#skills-closereading-panel .cr-note-box').style.display = showPassageUI ? '' : 'none';
  document.querySelector('#skills-closereading-panel .cr-nav-row').style.display = showPassageUI ? '' : 'none';
}

function closeReadingLoadLevel(levelNum) {
  var activity = SKILLS_ACTIVITY_DATA['closereading'];
  var levelData = activity.levels[levelNum - 1];
  closeReadingState.levelData = levelData;
  closeReadingState.passageIdx = 0;
  closeReadingState.passageScores = [];
  document.getElementById('skills-closereading-panel').classList.add('show');
  document.getElementById('cr-results').classList.remove('show');
  closeReadingLoadPassage(0);
}

function closeReadingLoadPassage(idx) {
  var levelData = closeReadingState.levelData;
  var passage = levelData.passages[idx];
  closeReadingState.passageIdx = idx;
  closeReadingState.tagged = {};
  closeReadingState.notes = {};
  closeReadingState.chunkNotes = {};
  closeReadingState.pass = 1;
  closeReadingState.maxPassReached = 1;
  closeReadingState.simplifyOn = false;

  document.getElementById('cr-passage-counter').textContent = 'Passage ' + (idx + 1) + ' of ' + levelData.passages.length;
  document.getElementById('cr-passage-title').textContent = passage.title;
  document.getElementById('cr-passage-source').textContent = passage.source;
  document.getElementById('cr-results').classList.remove('show');
  document.getElementById('cr-model-panel').classList.remove('show');
  document.getElementById('cr-simplify-box').classList.remove('show');
  document.getElementById('cr-simplify-btn').classList.remove('active');
  closeReadingSetPanelVisible(true);

  closeReadingSetPass(1);
}

function closeReadingToggleSimplify() {
  var passage = closeReadingState.levelData.passages[closeReadingState.passageIdx];
  closeReadingState.simplifyOn = !closeReadingState.simplifyOn;
  var box = document.getElementById('cr-simplify-box');
  var btn = document.getElementById('cr-simplify-btn');
  box.classList.toggle('show', closeReadingState.simplifyOn);
  btn.classList.toggle('active', closeReadingState.simplifyOn);
  if (closeReadingState.simplifyOn) {
    document.getElementById('cr-simplify-body').textContent =
      passage.simplify || 'No plain-English version available for this passage.';
  }
}

function closeReadingSetPass(passNum) {
  if (passNum > closeReadingState.maxPassReached) return;
  closeReadingState.pass = passNum;
  document.getElementById('cr-model-panel').classList.remove('show');
  closeReadingSetPanelVisible(true);

  for (var i = 1; i <= 3; i++) {
    var tab = document.getElementById('cr-pass-tab-' + i);
    tab.classList.toggle('active', i === passNum);
    tab.classList.toggle('unlocked', i <= closeReadingState.maxPassReached);
  }

  var passage = closeReadingState.levelData.passages[closeReadingState.passageIdx];
  var promptKey = 'pass' + passNum + 'Prompt';
  var labelKey = 'pass' + passNum + 'NoteLabel';
  document.getElementById('cr-pass-instruction').textContent = passage[promptKey] || '';
  document.getElementById('cr-note-label').textContent = passage[labelKey] || 'Reflection';
  document.getElementById('cr-note-input').value = closeReadingState.notes[passNum] || '';

  document.getElementById('cr-back-pass-btn').style.display = passNum > 1 ? '' : 'none';
  document.getElementById('cr-next-pass-btn').textContent = passNum < 3 ? 'NEXT →' : 'FINISH PASSAGE →';

  closeReadingRenderPassageText();
}

function closeReadingRenderPassageText() {
  var passage = closeReadingState.levelData.passages[closeReadingState.passageIdx];
  var html = passage.chunks.map(function(chunkText, i) {
    var color = closeReadingState.tagged[i];
    var cls = 'cr-chunk' + (color ? ' cr-' + color : '');
    return '<span class="' + cls + '" onclick="closeReadingToggleChunk(' + i + ')">' + chunkText + '</span> ';
  }).join('');
  document.getElementById('cr-passage-text').innerHTML = html;
  closeReadingRenderChunkNotesPanel();
}

function closeReadingToggleChunk(idx) {
  var activeColor = CR_PASS_COLORS[closeReadingState.pass];
  if (closeReadingState.tagged[idx] === activeColor) {
    delete closeReadingState.tagged[idx];
  } else {
    closeReadingState.tagged[idx] = activeColor;
  }
  closeReadingRenderPassageText();
}

// Renders one small note field per currently-tagged chunk, right below
// the passage -- this is the actual AVID "margin note next to what you
// highlighted" move. Notes are keyed by chunk index and persist across
// passes (a chunk only ever holds one final color, so one note per
// chunk is enough), but the panel only shows chunks tagged in the
// CURRENT pass so students aren't overwhelmed by every prior pass's
// tags while they're focused on the current one.
function closeReadingRenderChunkNotesPanel() {
  var passage = closeReadingState.levelData.passages[closeReadingState.passageIdx];
  var activeColor = CR_PASS_COLORS[closeReadingState.pass];
  var panel = document.getElementById('cr-chunk-notes-panel');
  if (!panel) return;

  var taggedThisPass = Object.keys(closeReadingState.tagged)
    .map(Number)
    .filter(function(idx) { return closeReadingState.tagged[idx] === activeColor; })
    .sort(function(a, b) { return a - b; });

  if (taggedThisPass.length === 0) {
    panel.innerHTML = '';
    panel.classList.remove('show');
    return;
  }

  panel.classList.add('show');
  panel.innerHTML =
    '<div class="cr-chunk-notes-label">MARGIN NOTES — why did you tag each ' + activeColor + ' sentence?</div>' +
    taggedThisPass.map(function(idx) {
      var preview = passage.chunks[idx].length > 70 ? passage.chunks[idx].slice(0, 70) + '…' : passage.chunks[idx];
      var savedNote = closeReadingState.chunkNotes[idx] || '';
      return '<div class="cr-chunk-note-row">' +
        '<div class="cr-chunk-note-preview"><span class="cr-swatch ' + activeColor + '"></span>"' + preview + '"</div>' +
        '<textarea class="cr-chunk-note-input" rows="2" placeholder="Explain why this sentence belongs here..." ' +
        'oninput="closeReadingSaveChunkNote(' + idx + ', this.value)">' + savedNote + '</textarea>' +
      '</div>';
    }).join('');
}

function closeReadingSaveChunkNote(idx, text) {
  closeReadingState.chunkNotes[idx] = text;
}

function closeReadingSaveNote(text) {
  closeReadingState.notes[closeReadingState.pass] = text;
}

function closeReadingNextPass() {
  var passage = closeReadingState.levelData.passages[closeReadingState.passageIdx];
  var modelKey = 'pass' + closeReadingState.pass + 'Model';
  var modelText = passage[modelKey];

  closeReadingSetPanelVisible(false);
  document.getElementById('cr-model-body').innerHTML = modelText || '<em>No model annotation for this pass.</em>';
  document.getElementById('cr-model-panel').classList.add('show');
}

function closeReadingBackPass() {
  closeReadingSetPass(closeReadingState.pass - 1);
}

function closeReadingContinueAfterModel() {
  document.getElementById('cr-model-panel').classList.remove('show');
  if (closeReadingState.pass < 3) {
    closeReadingState.maxPassReached = Math.max(closeReadingState.maxPassReached, closeReadingState.pass + 1);
    closeReadingSetPass(closeReadingState.pass + 1);
  } else {
    closeReadingFinishPassage();
  }
}

function closeReadingFinishPassage() {
  var passage = closeReadingState.levelData.passages[closeReadingState.passageIdx];
  var correct = 0, total = 0;
  ['yellow', 'blue', 'pink'].forEach(function(color) {
    var key = 'model' + color.charAt(0).toUpperCase() + color.slice(1);
    var targets = passage[key] || [];
    targets.forEach(function(chunkIdx) {
      total++;
      if (closeReadingState.tagged[chunkIdx] === color) correct++;
    });
  });
  closeReadingState.passageScores.push({ correct: correct, total: total });

  var levelData = closeReadingState.levelData;
  if (closeReadingState.passageIdx < levelData.passages.length - 1) {
    closeReadingLoadPassage(closeReadingState.passageIdx + 1);
  } else {
    closeReadingShowResults();
  }
}

function closeReadingShowResults() {
  closeReadingSetPanelVisible(false);
  document.getElementById('cr-model-panel').classList.remove('show');

  var totalCorrect = closeReadingState.passageScores.reduce(function(s, p) { return s + p.correct; }, 0);
  var totalPossible = closeReadingState.passageScores.reduce(function(s, p) { return s + p.total; }, 0);
  var pct = totalPossible > 0 ? Math.round(totalCorrect / totalPossible * 100) : 100;
  var passed = pct >= 70;

  // Plug into the shared unlock + Google Sheets pipeline
  skillsState.score = totalCorrect;
  skillsState.questions = new Array(totalPossible);
  skillsSaveProgress('closereading', skillsState.level, totalCorrect, totalPossible);

  var numPassages = closeReadingState.levelData.passages.length;
  document.getElementById('cr-results-score').textContent = numPassages + ' / ' + numPassages + ' passages complete (' + pct + '% annotation match)';
  document.getElementById('cr-results-msg').textContent = passed
    ? 'Great close reading! You unlocked the next level.'
    : 'Good effort -- review the model annotations and try again to unlock the next level (need 70%+ match).';

  var nextLevelBtn = document.getElementById('cr-next-level-btn');
  var activity = SKILLS_ACTIVITY_DATA['closereading'];
  var hasNextLevel = skillsState.level < activity.levels.length;
  nextLevelBtn.style.display = (passed && hasNextLevel) ? '' : 'none';

  skillsSubmitScoreToSheet();
  skillsBuildLevelTabs();
  document.getElementById('cr-results').classList.add('show');
}

function closeReadingRetryLevel() {
  closeReadingLoadLevel(skillsState.level);
}

function closeReadingNextLevel() {
  skillsLoadLevel(skillsState.level + 1);
}


