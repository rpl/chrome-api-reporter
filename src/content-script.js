console.log("CONTENT SCRIPT LOADED");

import { actions, scanAPI } from "./shared";

var port = chrome.runtime.connect();
port.postMessage({
  type: actions.UPDATE_API_DESCRIPTORS,
  apiDescriptors: {
    contentScript: scanAPI(chrome)
  }
});
