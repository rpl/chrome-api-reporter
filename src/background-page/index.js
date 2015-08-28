console.log("BACKGROUND PAGE LOADED", chrome);

import { createAppStore, actions, scanAPI } from "./shared";

import {
  openReportWizardTab, openContentScriptInjectedTab,
  listenForTabPorts, listenForAPIScans
} from "./chrome-api";

let store = createAppStore();

// NOTE: exposed for debugging purpose
window.STORE = store;
window.ACTIONS = actions;

listenForAPIScans(store);
openContentScriptInjectedTab();

openReportWizardTab().then((tab) => {
  listenForTabPorts(tab, store);

  store.dispatch(actions.updateAPIDescriptors({
    backgroundPage: scanAPI(chrome)
  }))
});
