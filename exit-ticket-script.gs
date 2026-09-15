// ════════════════════════════════════════════════════════════════
//  MR. ROGERS — EXIT TICKET COLLECTOR
//  AP Government & Politics — Periods 1A and 2B
//  O'Farrell High School · 2026–27
// ════════════════════════════════════════════════════════════════

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/16TcskHZ3QmcLsToZuyfCWnd24t5WtB4duTsX8x1tiqg/edit';

const TABS = {
  '1A': true,
  '2B': true
};

const TIME_ZONE = 'America/Los_Angeles';
const ROSTER_TAB = 'Rosters';
const EXIT_HEADERS = ['Student', 'Response', 'Submitted'];
const DEMOCRACY_TAB = 'Democracy Filtered';
const DEMOCRACY_HEADERS = ['Date', 'Period', 'Student Name', 'Participatory — Meaning', 'Participatory — Strength', 'Participatory — Weakness', 'Pluralist — Meaning', 'Pluralist — Strength', 'Pluralist — Weakness', 'Elite — Meaning', 'Elite — Strength', 'Elite — Weakness', 'Submitted At', 'Submission ID'];

// ════════════════════════════════════════════════════════════════
//  doPost — receives each exit ticket submission
// ════════════════════════════════════════════════════════════════
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const type = body.type || 'exit';

    // ── Democracy, Filtered final judgment ──
    if (type === 'democracy-filtered') {
      const requiredFields = ['period', 'name', 'participatoryMeaning', 'participatoryPro', 'participatoryCon', 'pluralistMeaning', 'pluralistPro', 'pluralistCon', 'eliteMeaning', 'elitePro', 'eliteCon', 'submissionId'];
      requiredFields.forEach(function (field) {
        if (!String(body[field] || '').trim()) throw new Error('The Final Judgment is incomplete.');
      });
      if (!TABS[body.period]) throw new Error('Unknown class period.');
      const submissionId = String(body.submissionId).trim();
      if (!/^[a-zA-Z0-9-]{16,80}$/.test(submissionId)) throw new Error('A valid submission ID is required.');

      const ss = SpreadsheetApp.openByUrl(SHEET_URL);
      const timestamp = new Date().toLocaleString('en-US', { timeZone: TIME_ZONE });
      const row = [
        body.date || new Date().toLocaleDateString('en-US'), body.period, body.name,
        body.participatoryMeaning, body.participatoryPro, body.participatoryCon,
        body.pluralistMeaning, body.pluralistPro, body.pluralistCon,
        body.eliteMeaning, body.elitePro, body.eliteCon, timestamp, submissionId
      ];

      const lock = LockService.getScriptLock();
      lock.waitLock(10000);
      try {
        if (!democracySubmissionExists(ss, submissionId)) writeDemocracyTab(ss, row);
      } finally {
        lock.releaseLock();
      }

      return ContentService
        .createTextOutput(JSON.stringify({ result: 'success', type: type }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── Skill Builders submission ──
    if (type === 'skill') {
      const date      = body.date      || new Date().toLocaleDateString('en-US');
      const period    = body.period    || 'Unknown';
      const name      = body.name      || 'Anonymous';
      const activity  = body.activity  || '';
      const level     = body.level     || '';
      const score     = body.score     !== undefined ? body.score : '';
      const total     = body.total     !== undefined ? body.total : '';
      const percent   = body.percent   || '';
      const timestamp = new Date().toLocaleString('en-US', { timeZone: TIME_ZONE });

      const ss = SpreadsheetApp.openByUrl(SHEET_URL);
      const timeSpent = body.timeSpent || 'Unknown';
      const skillRow = [date, period, name, activity, level, score, total, percent, timeSpent, timestamp];
      writeSkillTab(ss, skillRow);

      return ContentService
        .createTextOutput(JSON.stringify({ result: 'success', type: 'skill' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── Exit Ticket submission (default) ──
    const date      = body.date      || new Date().toLocaleDateString('en-US');
    const period    = body.period    || 'Unknown';
    const name      = body.name      || 'Anonymous';
    const question  = body.question  || '';
    const response  = body.response  || '';
    const timestamp = new Date().toLocaleString('en-US', { timeZone: TIME_ZONE });
    const submissionId = String(body.submissionId || '').trim();

    if (!/^[a-zA-Z0-9-]{16,80}$/.test(submissionId)) {
      throw new Error('A valid submission ID is required.');
    }
    if (!TABS[period]) throw new Error('Unknown class period.');
    if (!name || !question || response.length < 5) throw new Error('The exit ticket is incomplete.');

    const ss  = SpreadsheetApp.openByUrl(SHEET_URL);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (!submissionExists(ss, submissionId)) {
        if (!studentIsOnRoster(ss, period, name)) throw new Error('Student is not on the AP Government roster.');
        writeExitTicket(ss, date, period, name, question, response, timestamp);
        rememberSubmission(submissionId);
      }
    } finally {
      lock.releaseLock();
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('doPost error: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ════════════════════════════════════════════════════════════════
//  Exit-ticket tabs — one tab per ticket and class period
// ════════════════════════════════════════════════════════════════
function writeExitTicket(ss, rawDate, period, name, question, response, timestamp) {
  const date = normalizeTicketDate(rawDate);
  const ticketLabel = findOrCreateTicketLabel(ss, date, question);
  const tabName = ticketLabel + ' · ' + period;
  let sheet = ss.getSheetByName(tabName);

  if (!sheet) sheet = createExitTicketTab(ss, tabName, question);

  sheet.appendRow([name, response, timestamp]);
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, EXIT_HEADERS.length).setVerticalAlignment('top');
  sheet.getRange(lastRow, 2).setWrap(true);
}

function submissionExists(ss, submissionId) {
  if (PropertiesService.getScriptProperties().getProperty(submissionKey(submissionId))) return true;

  // Preserve duplicate detection for submissions saved before this version.
  const sheet = ss.getSheetByName('All Responses');
  if (!sheet || sheet.getLastRow() < 2) return false;
  return sheet.getRange(2, 7, sheet.getLastRow() - 1, 1)
    .createTextFinder(submissionId)
    .matchEntireCell(true)
    .findNext() !== null;
}

function rememberSubmission(submissionId) {
  PropertiesService.getScriptProperties().setProperty(submissionKey(submissionId), '1');
}

function submissionKey(submissionId) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, submissionId);
  const compact = Utilities.base64EncodeWebSafe(digest).replace(/=+$/, '').slice(0, 16);
  return 'exit_' + compact;
}

function studentIsOnRoster(ss, period, name) {
  const sheet = ss.getSheetByName(ROSTER_TAB);
  if (!sheet || sheet.getLastRow() < 2) throw new Error('The AP Government roster is unavailable.');
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getDisplayValues();
  return rows.some(function(row) {
    return row[0].trim() === period && row[1].trim() === name;
  });
}

function normalizeTicketDate(rawDate) {
  const value = String(rawDate || '').trim();
  const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    return match[3] + '-' + match[1].padStart(2, '0') + '-' + match[2].padStart(2, '0');
  }
  return Utilities.formatDate(new Date(), TIME_ZONE, 'yyyy-MM-dd');
}

function findOrCreateTicketLabel(ss, date, question) {
  const matchingSheets = ss.getSheets().filter(function(sheet) {
    const prefix = sheet.getName().split(' · ')[0];
    return prefix === date || prefix.indexOf(date + ' ') === 0;
  }).filter(function(sheet) {
    return / · (?:1A|2B)$/.test(sheet.getName());
  });

  for (let i = 0; i < matchingSheets.length; i += 1) {
    if (matchingSheets[i].getRange('A1').getDisplayValue().trim() === question.trim()) {
      return matchingSheets[i].getName().split(' · ')[0];
    }
  }

  const usedLabels = new Set(matchingSheets.map(function(sheet) {
    return sheet.getName().split(' · ')[0];
  }));
  if (!usedLabels.has(date)) return date;

  let sequence = 2;
  while (usedLabels.has(date + ' ' + sequenceLetters(sequence))) sequence += 1;
  return date + ' ' + sequenceLetters(sequence);
}

function sequenceLetters(number) {
  let value = number;
  let letters = '';
  while (value > 0) {
    value -= 1;
    letters = String.fromCharCode(65 + (value % 26)) + letters;
    value = Math.floor(value / 26);
  }
  return letters;
}

function createExitTicketTab(ss, tabName, question) {
  const sheet = ss.insertSheet(tabName, 0);
  sheet.getRange('A1:C1').merge();
  sheet.getRange('A1')
    .setValue(question)
    .setFontWeight('bold')
    .setFontSize(12)
    .setBackground('#e8edf5')
    .setFontColor('#17283a')
    .setWrap(true);
  sheet.getRange('A2:C2')
    .setValues([EXIT_HEADERS])
    .setFontWeight('bold')
    .setBackground('#1a2e5a')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(2);
  sheet.setRowHeight(1, 48);
  sheet.setColumnWidth(1, 210);
  sheet.setColumnWidth(2, 520);
  sheet.setColumnWidth(3, 170);
  return sheet;
}

function democracySubmissionExists(ss, submissionId) {
  const sheet = ss.getSheetByName(DEMOCRACY_TAB);
  if (!sheet || sheet.getLastRow() < 2) return false;
  return sheet.getRange(2, 14, sheet.getLastRow() - 1, 1)
    .createTextFinder(submissionId)
    .matchEntireCell(true)
    .findNext() !== null;
}

function writeDemocracyTab(ss, row) {
  let sheet = ss.getSheetByName(DEMOCRACY_TAB);
  if (!sheet) {
    sheet = ss.insertSheet(DEMOCRACY_TAB);
    sheet.appendRow(DEMOCRACY_HEADERS);
    sheet.getRange(1, 1, 1, DEMOCRACY_HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#075e61')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 90);
    sheet.setColumnWidth(2, 70);
    sheet.setColumnWidth(3, 180);
    sheet.setColumnWidth(4, 150);
    for (let column = 5; column <= 12; column += 1) sheet.setColumnWidth(column, 320);
    sheet.setColumnWidth(13, 160);
  }
  sheet.getRange(1, 1, 1, DEMOCRACY_HEADERS.length).setValues([DEMOCRACY_HEADERS]);
  sheet.appendRow(row);
  sheet.getRange(sheet.getLastRow(), 5, 1, 8).setWrap(true).setVerticalAlignment('top');
}

// ════════════════════════════════════════════════════════════════
//  writeSkillTab — writes skill builder score to its own tab
// ════════════════════════════════════════════════════════════════
function writeSkillTab(ss, row) {
  const tabName = 'Skill Builders';
  const headers = ['Date', 'Period', 'Student Name', 'Activity', 'Level', 'Score', 'Total', 'Percent', 'Time Spent', 'Submitted At'];
  let sheet = ss.getSheetByName(tabName);

  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(headers);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold')
               .setBackground('#0d7d7d')
               .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 90);
    sheet.setColumnWidth(2, 70);
    sheet.setColumnWidth(3, 160);
    sheet.setColumnWidth(4, 220);
    sheet.setColumnWidth(5, 80);
    sheet.setColumnWidth(6, 60);
    sheet.setColumnWidth(7, 60);
    sheet.setColumnWidth(8, 70);
    sheet.setColumnWidth(9, 90);
    sheet.setColumnWidth(10, 150);
  }

  sheet.appendRow(row);

  // Conditional formatting: red if below 70%
  const lastRow = sheet.getLastRow();
  const pctVal = row[7] ? parseInt(row[7]) : 100;
  if (pctVal < 70) {
    sheet.getRange(lastRow, 1, 1, headers.length)
         .setBackground('#fee2e2');
  }
}

// ════════════════════════════════════════════════════════════════
//  doGet — health check
// ════════════════════════════════════════════════════════════════
function doGet(e) {
  const submissionId = String((e && e.parameter && e.parameter.submissionId) || '').trim();
  const type = String((e && e.parameter && e.parameter.type) || 'exit').trim();
  const callback = String((e && e.parameter && e.parameter.callback) || '').trim();
  let payload = { running: true };

  if (submissionId) {
    const ss = SpreadsheetApp.openByUrl(SHEET_URL);
    const saved = type === 'democracy-filtered'
      ? democracySubmissionExists(ss, submissionId)
      : submissionExists(ss, submissionId);
    payload = { saved: saved, submissionId: submissionId, type: type };
  }

  if (/^[a-zA-Z_$][0-9a-zA-Z_$.]*$/.test(callback)) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(payload) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
