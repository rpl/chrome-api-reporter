/*var aFileParts = ['<pre>',JSON.stringify({ chrome: scanAPI(chrome) }, null, 2),'</pre>'];
var aBlob = new Blob(aFileParts, {type : 'text/html'});
var url = URL.createObjectURL(aBlob);
*/
//chrome.downloads.download({ url: url, filename: "backgroundPage_APIs.html" });

export function openReportWizardTab() {
  chrome.tabs.create({
    windowId: window.id,
    url: "reporter-wizard-tab.html"
  }, (tab) => {
    console.log("TAB OPENED: " + JSON.stringify(tab));
  });
}

import { actions, scanAPI } from "./shared";

const {
  CONNECT_BACKGROUND_PAGE_START,
  CONNECT_BACKGROUND_PAGE_SUCCESS,
  CONNECT_BACKGROUND_PAGE_FAILURE
} = actions;

export function listenForTabPorts() {
  chrome.runtime.onConnect.addListener(function(port) {
    console.log("BACKGROUND PAGE - ON CONNECT: " + JSON.stringify(port.sender));

    port.onMessage.addListener(function(msg) {
      if (msg.type === CONNECT_BACKGROUND_PAGE_START) {
        port.postMessage({
          type: CONNECT_BACKGROUND_PAGE_FAILURE,
          message: "Not yet implemented"
        });
      }
    });

    port.onMessage.addListener(function(msg) {
      if (msg.type === "download") {
        var aBlob = new Blob(msg.content, {type: "text/html"});
        var url = URL.createObjectURL(aBlob);

      }
    });
   });
}
