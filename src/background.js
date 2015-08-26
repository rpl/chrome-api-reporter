console.log("BACKGROUND PAGE LOADED", chrome);

import scanAPI from "./lib/scan-api"

var aFileParts = ['<pre>',JSON.stringify({ chrome: scanAPI(chrome) }, null, 2),'</pre>'];
var aBlob = new Blob(aFileParts, {type : 'text/html'});
var url = URL.createObjectURL(aBlob);

chrome.downloads.download({ url: url, filename: "backgroundPage_APIs.html" });

chrome.windows.create({type: "normal"}, function (window)  {
  console.log("WINDOW OPENED: " + window.id);
  chrome.tabs.create({windowId: window.id, url: "reporterWizardPanel.html"})
});

chrome.runtime.onConnect.addListener(function(port) {
  console.log("BACKGROUND PAGE - ON CONNECT", JSON.stringify(port.sender));

  port.onMessage.addListener(function(msg) {
    if (msg.type === "download") {
      var aBlob = new Blob(msg.content, {type: "text/html"});
      var url = URL.createObjectURL(aBlob);
      chrome.downloads.download({ url: url, filename: msg.filename });
    }
  });
 });
