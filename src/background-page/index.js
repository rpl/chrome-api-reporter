console.log("BACKGROUND PAGE LOADED", chrome);

import { openReportWizardTab, listenForTabPorts } from "./chrome-api";

openReportWizardTab();
listenForTabPorts();
