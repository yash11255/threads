/**
 * Threads Physio — form backend (Google Apps Script bound to a Google Sheet).
 *
 * Setup:
 *  1. Create a Google Sheet. Extensions > Apps Script. Paste this file.
 *  2. Project Settings > Script properties > add  SECRET = <same value as APPS_SCRIPT_SECRET in .env.local>
 *  3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 *  4. Copy the /exec URL into APPS_SCRIPT_URL in .env.local.
 *  Re-deploy (Manage deployments > Edit > New version) after any change here.
 */
var SHEET_NAME = 'Responses';
var HEADERS = ['ID', 'Timestamp', 'Form', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Page', 'Status', 'Notes'];
var STATUSES = ['New', 'Contacted', 'Booked', 'Closed'];

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || body.secret !== secret) return json_({ ok: false, error: 'Unauthorized' });
    switch (body.action) {
      case 'submit': return json_(submit_(body.data || {}));
      case 'list':   return json_(list_());
      case 'update': return json_(update_(body.id, body.status, body.notes));
      case 'delete': return json_(remove_(body.id));
      default:       return json_({ ok: false, error: 'Unknown action' });
    }
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput('Threads Physio form endpoint is running.');
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#b7410e').setFontColor('#ffffff');
    sh.setFrozenRows(1);
    sh.getRange(2, HEADERS.indexOf('Status') + 1, 999, 1).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build());
  }
  return sh;
}

function clean_(v, max) {
  v = String(v == null ? '' : v).trim().slice(0, max || 500);
  // Prevent spreadsheet formula injection
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function submit_(d) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sh = sheet_();
    var id = Utilities.getUuid().slice(0, 8);
    sh.appendRow([id, new Date(), clean_(d.form, 100), clean_(d.name, 100), clean_(d.email, 150),
      clean_(d.phone, 30), clean_(d.service, 100), clean_(d.message, 2000), clean_(d.page, 200), 'New', '']);
    return { ok: true, id: id };
  } finally { lock.releaseLock(); }
}

function list_() {
  var sh = sheet_();
  var values = sh.getDataRange().getValues();
  var head = values.shift();
  var rows = values.filter(function (r) { return r[0]; }).map(function (r) {
    var o = {};
    head.forEach(function (h, i) { o[h.toLowerCase()] = r[i] instanceof Date ? r[i].toISOString() : r[i]; });
    return o;
  });
  return { ok: true, rows: rows.reverse(), sheetUrl: SpreadsheetApp.getActiveSpreadsheet().getUrl() };
}

function rowIndex_(sh, id) {
  var ids = sh.getRange(2, 1, Math.max(sh.getLastRow() - 1, 1), 1).getValues();
  for (var i = 0; i < ids.length; i++) if (String(ids[i][0]) === String(id)) return i + 2;
  return -1;
}

function update_(id, status, notes) {
  var sh = sheet_(); var r = rowIndex_(sh, id);
  if (r < 0) return { ok: false, error: 'Not found' };
  if (status != null) {
    if (STATUSES.indexOf(status) < 0) return { ok: false, error: 'Bad status' };
    sh.getRange(r, HEADERS.indexOf('Status') + 1).setValue(status);
  }
  if (notes != null) sh.getRange(r, HEADERS.indexOf('Notes') + 1).setValue(clean_(notes, 1000));
  return { ok: true };
}

function remove_(id) {
  var sh = sheet_(); var r = rowIndex_(sh, id);
  if (r < 0) return { ok: false, error: 'Not found' };
  sh.deleteRow(r);
  return { ok: true };
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
