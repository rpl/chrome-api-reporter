import { handleActions } from "redux-actions";

import { ADD_API_DESCRIPTOR } from "./actions";

export const apiDescriptors = handleActions({
  [ ADD_API_DESCRIPTOR ]: (state = {}, action) => {
    const { apiContext, apiDescriptor } = action.payload;

    return {
      ...state,
      [ apiContext ]: apiDescriptor
    }
  }
}, {});
