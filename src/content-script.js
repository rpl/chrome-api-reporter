console.log("CONTENT SCRIPT LOADED", chrome);

import scanAPI from "./lib/scan-api"

var aFileParts = ['<pre>',JSON.stringify({ chrome: scanAPI(chrome) }, null, 2),'</pre>'];

var port = chrome.extension.connect();
port.postMessage({
  type: "download",
  filename: "contentScriptAPIs.html",
  content: aFileParts
});
