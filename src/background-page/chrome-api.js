/*var aFileParts = ['<pre>',JSON.stringify({ chrome: scanAPI(chrome) }, null, 2),'</pre>'];
var aBlob = new Blob(aFileParts, {type : 'text/html'});
var url = URL.createObjectURL(aBlob);
*/
//chrome.downloads.download({ url: url, filename: "backgroundPage_APIs.html" });

// open reporter wizard tab helper

export function openContentScriptInjectedTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.create({
      url: "http://www.w3.org"
    }, (tab) => {
      chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
        if (tab && tab.id === tabId && changeInfo.status == "complete") {
          chrome.tabs.remove(tabId);
        }
      });
    });
  });
}

export function openReportWizardTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.create({
      url: "report-wizard-tab.html"
    }, (tab) => {
      resolve(tab);
    });
  })
}

import { actions, scanAPI } from "./shared";

// handle api scans

// actions consts

const { UPDATE_API_DESCRIPTORS } = actions

// actions creators

const { updateAPIDescriptors } = actions

export function listenForAPIScans(store) {
  let prevState = store.getState();

  let routeToConnectedTab = () => {
    let newState = store.getState();
    console.log("STORE UPDATED", prevState, newState);

    // react to state changes
    if (prevState.apiDescriptors !== newState.apiDescriptors) {

      let { port } = newState.backgroundPage;
      if (port) {
        port.postMessage({
          type: UPDATE_API_DESCRIPTORS,
          apiDescriptors: newState.apiDescriptors
        });
      }
    }

    prevState = newState;
  };

  let listenForUpdateAPIDescriptors = (port) => {
    port.onMessage.addListener(function (msg) {
      if (msg.type === UPDATE_API_DESCRIPTORS) {
        store.dispatch(updateAPIDescriptors(msg.apiDescriptors));
      }
    });
  }

  let unsubscribeStore = store.subscribe(routeToConnectedTab);
  chrome.runtime.onConnect.addListener(listenForUpdateAPIDescriptors);
}

// handle tab connections

// actions consts
const {
  CONNECT_BACKGROUND_PAGE_START,
  CONNECT_BACKGROUND_PAGE_SUCCESS,
  CONNECT_BACKGROUND_PAGE_FAILURE
} = actions;

// actions creators
const {
  connectBackgroundPageStart,
  connectBackgroundPageSuccess,
  connectBackgroundPageFailure
} = actions;

export function listenForTabPorts(tab, store) {
  chrome.runtime.onConnect.addListener(function(port) {
    console.log("BACKGROUND PAGE - ON CONNECT: ", port);

    // filter out ports from sender different from our target tab
    if (!port.sender.tab || tab.windowId !== port.sender.tab.windowId ||
        tab.id !== port.sender.tab.id) {
      return;
    }

    // dispatch action to track the new pending connection
    store.dispatch(connectBackgroundPageStart({ port }));

    port.onMessage.addListener(function(msg) {
      // handle start message
      if (msg.type === CONNECT_BACKGROUND_PAGE_START) {

        store.dispatch(connectBackgroundPageSuccess());

        port.postMessage({
          type: CONNECT_BACKGROUND_PAGE_SUCCESS
        });

        port.postMessage({
          type: UPDATE_API_DESCRIPTORS,
          apiDescriptors: store.getState().apiDescriptors
        })
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
