import * as apiDescriptorsActions from "./api-descriptors";
import * as backgroundPageConnectionActions from "./background-page-connection";

import * as connectTabActions from "./connect-tab"

export default {
  ...apiDescriptorsActions,
  ...backgroundPageConnectionActions,
  ...connectTabActions
}
