console.log("DEVTOOLS PAGE LOADED", chrome);

import scanAPI from "./lib/scan-api";

var aFileParts = ['<pre>',JSON.stringify({ chrome: scanAPI(chrome) }, null, 2),'</pre>'];

var port = chrome.runtime.connect();
port.postMessage({
  type: "download",
  filename: "devtoolsPanelAPIs.html",
  content: aFileParts
});
