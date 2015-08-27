import { handleActions } from "redux-actions";

import { UPDATE_API_DESCRIPTORS } from "../actions";

export const apiDescriptors = handleActions({
  [ UPDATE_API_DESCRIPTORS ]: (state = {}, action) => {
    return {
      ...state,
      ...action.payload
    }
  }
}, {});

/** CONNECT BACKGROUND PAGE **/

import {
  CONNECT_BACKGROUND_PAGE_START,
  CONNECT_BACKGROUND_PAGE_SUCCESS,
  CONNECT_BACKGROUND_PAGE_FAILURE,
  CONNECT_BACKGROUND_PAGE_TIMEOUT,
} from "../actions";

export const backgroundPage = handleActions({
  [ CONNECT_BACKGROUND_PAGE_START ]: (state, action) => {
    return {
      ...state,
      connected: false,
      pending: true,
      port: action.payload.port
    }
  },
  [ CONNECT_BACKGROUND_PAGE_SUCCESS ]: (state, action) => {
    return {
      ...state,
      connected: true,
      pending: false
    }
  },
  [ CONNECT_BACKGROUND_PAGE_FAILURE ]: (state, action) => {
    return {
      ...state,
      connected: false,
      pending: false,
      errorMessage: `Unable to connect: ${action.payload.message}`
    }
  },
  [ CONNECT_BACKGROUND_PAGE_TIMEOUT ]: (state, action) => {
    return {
      ...state,
      connected: false,
      pending: false,
      errorMessage: "Unable to connect: Timeout"
    }
  }
}, {
  connected: false,
  pending: false,
  port: null
})
