// ════════════════════════════════════════════════════════════════
//  MR. ROGERS — EXIT TICKET COLLECTOR + AUTO-ARCHIVE
//  AP Government & Politics — Periods 2A and 2B
//  O'Farrell High School · 2026–27
// ════════════════════════════════════════════════════════════════

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/16TcskHZ3QmcLsToZuyfCWnd24t5WtB4duTsX8x1tiqg/edit';

const TABS = {
  '2A':  'Period 2A',
  '2B':  'Period 2B',
  'all': 'All Responses'
};

const ARCHIVE_PREFIX = 'Archive — ';
const HEADERS = ['Date', 'Period', 'Student Name', 'Question', 'Response', 'Submitted At'];

// ════════════════════════════════════════════════════════════════
//  doPost — receives each exit ticket submission
// ════════════════════════════════════════════════════════════════
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const type = body.type || 'exit';

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
      const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

      const ss = SpreadsheetApp.openByUrl(SHEET_URL);
      const skillRow = [date, period, name, activity, level, score, total, percent, timestamp];
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
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

    const ss  = SpreadsheetApp.openByUrl(SHEET_URL);
    const row = [date, period, name, question, response, timestamp];

    writeToTab(ss, TABS[period] || ('Period ' + period), row);
    writeToTab(ss, TABS['all'], row);

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
//  writeToTab — finds or creates a tab, adds header, appends row
// ════════════════════════════════════════════════════════════════
function writeToTab(ss, tabName, row) {
  let sheet = ss.getSheetByName(tabName);

  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight('bold')
               .setBackground('#1a2e5a')
               .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 90);
    sheet.setColumnWidth(2, 70);
    sheet.setColumnWidth(3, 160);
    sheet.setColumnWidth(4, 280);
    sheet.setColumnWidth(5, 380);
    sheet.setColumnWidth(6, 150);
  }

  sheet.appendRow(row);
}

// ════════════════════════════════════════════════════════════════
//  writeSkillTab — writes skill builder score to its own tab
// ════════════════════════════════════════════════════════════════
function writeSkillTab(ss, row) {
  const tabName = 'Skill Builders';
  const headers = ['Date', 'Period', 'Student Name', 'Activity', 'Level', 'Score', 'Total', 'Percent', 'Submitted At'];
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
    sheet.setColumnWidth(9, 150);
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
//  weeklyArchive — runs every Sunday night
//  Moves all rows from Period 2A, Period 2B, All Responses
//  into Archive tabs labeled by week (e.g. "Archive — Sep 8–12")
//
//  TO SET UP THE TRIGGER:
//  1. In Apps Script editor click the clock icon (Triggers)
//  2. Click "+ Add Trigger"
//  3. Function: weeklyArchive
//  4. Event source: Time-driven
//  5. Type: Week timer → Every Sunday → 10pm-11pm
//  6. Save
// ════════════════════════════════════════════════════════════════
function weeklyArchive() {
  const ss = SpreadsheetApp.openByUrl(SHEET_URL);

  // Build week label: "Sep 8–12" style
  const now    = new Date();
  const day    = now.getDay(); // 0=Sun
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const weekLabel = monthNames[monday.getMonth()] + ' ' + monday.getDate() +
    '\u2013' + friday.getDate();
  const archiveName = ARCHIVE_PREFIX + weekLabel;

  const tabsToArchive = [TABS['2A'], TABS['2B'], TABS['all']];
  let totalMoved = 0;

  tabsToArchive.forEach(function(tabName) {
    const sheet = ss.getSheetByName(tabName);
    if (!sheet) return;

    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return; // Only header row — nothing to archive

    // Get all data rows (skip header)
    const dataRange = sheet.getRange(2, 1, lastRow - 1, HEADERS.length);
    const data      = dataRange.getValues();

    // Create or get archive tab
    const archiveTabName = archiveName + ' — ' + tabName;
    let archiveSheet = ss.getSheetByName(archiveTabName);
    if (!archiveSheet) {
      archiveSheet = ss.insertSheet(archiveTabName);
      archiveSheet.appendRow(HEADERS);
      const headerRange = archiveSheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight('bold')
                 .setBackground('#2d4a7a')
                 .setFontColor('#ffffff');
      archiveSheet.setFrozenRows(1);
      archiveSheet.setColumnWidth(1, 90);
      archiveSheet.setColumnWidth(2, 70);
      archiveSheet.setColumnWidth(3, 160);
      archiveSheet.setColumnWidth(4, 280);
      archiveSheet.setColumnWidth(5, 380);
      archiveSheet.setColumnWidth(6, 150);
    }

    // Copy rows to archive
    data.forEach(function(row) {
      if (row.some(function(cell) { return cell !== ''; })) {
        archiveSheet.appendRow(row);
        totalMoved++;
      }
    });

    // Clear data rows from active sheet (keep header)
    dataRange.clearContent();

    Logger.log('Archived ' + data.length + ' rows from ' + tabName + ' to ' + archiveTabName);
  });

  Logger.log('weeklyArchive complete. Total rows moved: ' + totalMoved);

  // Optional: send yourself an email summary
  // MailApp.sendEmail('your@email.com', 'AP Gov Exit Ticket Archive', 
  //   'Archived ' + totalMoved + ' responses for week of ' + weekLabel);
}

// ════════════════════════════════════════════════════════════════
//  doGet — health check
// ════════════════════════════════════════════════════════════════
function doGet() {
  return ContentService
    .createTextOutput("Mr. Rogers Exit Ticket Collector is running. \u2713")
    .setMimeType(ContentService.MimeType.TEXT);
}

// ════════════════════════════════════════════════════════════════
//  testSubmission — run manually to test
// ════════════════════════════════════════════════════════════════
function testSubmission() {
  const fakeData = {
    postData: {
      contents: JSON.stringify({
        date:     new Date().toLocaleDateString('en-US'),
        period:   '2A',
        name:     'Test Student, Sample',
        question: 'What is judicial review?',
        response: 'The power of the Supreme Court to declare laws unconstitutional.',
      })
    }
  };
  const result = doPost(fakeData);
  Logger.log(result.getContent());
}

// ════════════════════════════════════════════════════════════════
//  testArchive — run manually to test the archive function
//  WARNING: this will move real data if your sheets have rows
// ════════════════════════════════════════════════════════════════
function testArchive() {
  weeklyArchive();
  Logger.log('Archive test complete -- check your Sheet for new Archive tabs');
}
