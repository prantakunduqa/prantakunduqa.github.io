/**
 * Google Apps Script — Contact Form → Google Sheet sync
 *
 * Sheet columns written:  Name | Email | Message | Timestamp
 * Headers are created automatically on the first submission if the sheet is empty.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * SETUP / FIX STEPS  (do these in order)
 * ─────────────────────────────────────────────────────────────────────────
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1YtZBIuxO5rGC1bq0G7P7Ojl4MJw_N3LioY3uDr1KNBU/edit
 * 2. Menu: Extensions ▸ Apps Script.
 * 3. Delete ALL existing code, paste THIS entire file, click Save (disk icon).
 * 4. IMPORTANT — redeploy so the new code goes live:
 *      Deploy ▸ Manage deployments ▸ (pencil / Edit icon)
 *        ▸ Version: "New version" ▸ Deploy
 *    (If you have no deployment yet: Deploy ▸ New deployment ▸ Web app
 *        ▸ Execute as: Me ▸ Who has access: Anyone ▸ Deploy)
 * 5. Authorize when prompted (choose your account ▸ Advanced ▸ Allow).
 * 6. The Web app URL must match the one in assets/js/script.js (ends with /exec).
 *
 * TEST IT WORKS:
 *   In the Apps Script editor, pick the function "testAppend" from the
 *   dropdown and click Run. A test row should appear in your sheet.
 *   If it does, the script + sheet are fine and the form will work too.
 * ─────────────────────────────────────────────────────────────────────────
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Read values whether they arrive as form fields (e.parameter) or JSON.
    var data = (e && e.parameter) ? e.parameter : {};
    if ((!data || Object.keys(data).length === 0) &&
        e && e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch (ignore) {}
    }

    var name = data.Name || data.name || "";
    var email = data.Email || data.email || "";
    var message = data.Message || data.message || "";

    // Add a header row if the sheet is completely empty.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Name", "Email", "Message", "Timestamp"]);
    }

    sheet.appendRow([name, email, message, new Date()]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Open the /exec URL in a browser to confirm the deployment is live.
function doGet() {
  return ContentService.createTextOutput("Contact form endpoint is running.");
}

// Run this manually from the Apps Script editor to verify the sheet works.
function testAppend() {
  doPost({
    parameter: {
      Name: "Test User",
      Email: "test@example.com",
      Message: "This is a test row from testAppend().",
    },
  });
}

