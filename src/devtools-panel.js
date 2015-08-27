console.log("DEVTOOLS PANEL LOADED");

import { actions, scanAPI } from "./shared";

var port = chrome.runtime.connect();
port.postMessage({
  type: actions.UPDATE_API_DESCRIPTORS,
  apiDescriptors: {
    devtoolsPanel: scanAPI(chrome)
  }
});
