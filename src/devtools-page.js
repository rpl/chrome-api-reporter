console.log("DEVTOOLS PAGE LOADED");

import { actions, scanAPI } from "./shared";

var port = chrome.runtime.connect();
port.postMessage({
  type: actions.UPDATE_API_DESCRIPTORS,
  apiDescriptors: {
    devtoolsPage: scanAPI(chrome)
  }
});

chrome.devtools.panels.create("Scan DevtoolsPanel APIs", "icon.png", "devtools-panel.html", function(panel) {
        console.log("PANEL", panel);
      });
