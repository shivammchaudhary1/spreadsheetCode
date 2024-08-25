// const DATA_ENTRY_SHEET_NAME = "Sheet1";
// var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_ENTRY_SHEET_NAME);

// const doPost = (request = {}) => {
//   const {postData: {contents, type}= {} } = request;
//   var data = parseFormData(contents);
//   appendToGoogleSheet(data);
//   return ContentService.createTextOutput(contents).setMimeType(ContentService.MimeType.JSON);
// };

// function parseFormData(postData){
//   var data = [];
//   var parameters = postData.split("&");
//   for (var i = 0; i < parameters.length; i++){
//     var keyValue = parameters[i].split("=");
//     data[keyValue[0]] = decodeURIComponent(keyValue[1]);
//   }
//   return data;
// }

// function appendToGoogleSheet(data) {
//   var headers = sheet.getRange(1,1,1, sheet.getLastColumn()).getValues()[0];
//   var rowData = headers.map(headerFld => data[headerFld]);
//   sheet.appendRow(rowData);
// }
const DATA_ENTRY_SHEET_NAME = "Sheet1";
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_ENTRY_SHEET_NAME);

const doPost = (request = {}) => {
  const { postData: { contents, type } = {} } = request;
  var data = parseFormData(contents);
  appendToGoogleSheet(data);
  
  // Redirect to home page
  return HtmlService.createHtmlOutput('<script>window.location.href = "http://127.0.0.1:5501/";</script>');
};

// function parseFormData(postData) {
//   var data = [];
//   var parameters = postData.split("&");
//   for (var i = 0; i < parameters.length; i++) {
//     var keyValue = parameters[i].split("=");
//     data[keyValue[0]] = decodeURIComponent(keyValue[1]);
//   }
//   return data;
// }
function parseFormData(postData) {
  var data = [];
  var parameters = postData.split("&");
  for (var i = 0; i < parameters.length; i++) {
    var keyValue = parameters[i].split("=");
    
    // Replace "+" with spaces before decoding
    var key = keyValue[0];
    var value = keyValue[1].replace(/\+/g, " ");
    
    // Decode the value and store it in the data array
    data[key] = decodeURIComponent(value);
  }
  return data;
}

function appendToGoogleSheet(data) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var rowData = headers.map(headerFld => data[headerFld]);
  sheet.appendRow(rowData);
}

