// Telegram Bot Token and URLs
var token = "5434506171:AAHR79rg6v-WZsmqn6DTMGQYfYSxEqmsUI8"; // Your Telegram Bot token
var telegramUrl = "https://api.telegram.org/bot" + token; // Base URL for Telegram Bot API
var webAppUrl = "https://script.google.com/macros/s/AKfycbyJf1hs3tYnQbkT2feu9bxcm9FuL0CBBL5zrlfTdaLit7lOR72soakjcSr8pISBFL88/exec"; // URL for the deployed Google Apps Script

// Google Sheets ID
var ssId = "18P47EVP3fkWeu0mDHQ6vdNwmCMhnKhDil_SAEX8WBbY"; // Google Sheets ID

// Function to get bot information
function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText()); // Log bot info
}

// Function to query Google Sheets
function praying(spreadsheetID, sheetName, queryColumnLetterStart, queryColumnLetterEnd, queryColumnLetterSearch, query) {
  var myQuery = "SELECT * WHERE " + queryColumnLetterSearch + " = '" + query + "'";
  var qvizURL = 'https://docs.google.com/spreadsheets/d/' + spreadsheetID + '/gviz/tq?tqx=out:json&headers=1&sheet=' + sheetName + '&range=' + queryColumnLetterStart + ":" + queryColumnLetterEnd + '&tq=' + encodeURIComponent(myQuery);

  var ret = UrlFetchApp.fetch(qvizURL, {headers: {Authorization: 'Bearer ' + ScriptApp.getOAuthToken()}}).getContentText();
  return JSON.parse(ret.replace("/*O_o*/", "").replace("google.visualization.Query.setResponse(", "").slice(0, -2));
}

// Function to set Telegram webhook
function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText()); // Log webhook response
}

// Function to send a message to a Telegram user
function sendText(id, answer, text) {
  var txt1 = text + "";
  if (txt1.length == 5) {
    var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Enlistment");
    text = txt1.toUpperCase();

    try {
      var ret = praying(ssId, sheet, "A", "N", "A", text);
      var arr = ret.table.rows[0];

      // Extracting data from Google Sheets
      var company = arr.c[1].v;
      var i4d = arr.c[2].v;
      var pes = arr.c[3].v;
      var attendance = arr.c[4].v;
      var fa = arr.c[5].v;
      var stayout = arr.c[6].v;
      var oath = arr.c[11].v;
      var rowNo = arr.c[12].v;
      var bagNo = arr.c[13].v;

      // Formulating response message
      var result = "Enlistment Details%0A%0AYour Company: " + company + "%0AYour 4D: " + i4d + "%0AYour PES: " + pes;
      if (fa == "FA") {
        result += "%0A%0AFood Allergy: Yes%0APlease collect your white band at the counter.";
        var at = arr.c[10].v;
        result += "%0A%0AAllergy to: " + at;
      } else {
        result += "%0A%0AFood Allergy: No";
      }

      result += "%0APlease inform the sergeant at the counter if you have any/additional allergies.";
      if (stayout == "Stayout") {
        result += "%0A%0AStayin/Stayout: Stayout%0APlease collect your green sticker at the counter.";
      } else {
        result += "%0A%0AStayin/Stayout: Stayin";
      }

      result += "%0A%0AOath Form Number: " + oath;
      result += "%0ADouble check your medical statuses and excuses at https://www.ns.sg/nsp/portal/site/mindef/manage-medical-ehealth/info%0APlease wait for further instructions from the commanders.";

      var slack = "%0A%0AParents/Guardians may join the Slack link to connect with the officers in BMTC SCH V! https://go.gov.sg/bmtcschvslack";
      result += slack;

      if (attendance == "No") {
        var range = sheet.getDataRange().getCell(rowNo, 5);
        range.setRichTextValue(SpreadsheetApp.newRichTextValue().setText("Yes").build());

        range = sheet.getDataRange().getCell(rowNo, 9);
        var count = range.getValue() + 1;
        range.setRichTextValue(SpreadsheetApp.newRichTextValue().setText(count).build());
      } else {
        range = sheet.getDataRange().getCell(rowNo, 9);
        var count = range.getValue() + 1;
        range.setRichTextValue(SpreadsheetApp.newRichTextValue().setText(count).build());
      }

      var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + result;
      var response = UrlFetchApp.fetch(url);
      Logger.log(response.getContentText()); // Log send message response
    } catch (error) {
      var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=Unable to find, please re-enter or approach the nearest commander.";
      var response = UrlFetchApp.fetch(url);
      Logger.log(response.getContentText()); // Log error response
      log('# error', JSON.stringify([error, error.stack]));
    }
  } else {
    var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + answer;
    var response = UrlFetchApp.fetch(url);
    Logger.log(response.getContentText()); // Log generic response
  }
}

// Function to handle GET requests
function doGet(e) {
  return HtmlService.createHtmlOutput("Hi there");
}

// Function to log events
function log(event, message) {
  SpreadsheetApp.getActive().getSheetByName('Log').appendRow([new Date(), event, message]);
}

// Function to handle POST requests from Telegram
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  var name = data.message.chat.first_name;
  var answer = "Hi " + name + ", please key in the first letter of your name (per NRIC) and your last 4 characters of NRIC %0A%0Ae.g. if your name is Zaer Bin Zaqy and your NRIC is T0312345B, key in Z345B";
  sendText(id, answer, text);
}
