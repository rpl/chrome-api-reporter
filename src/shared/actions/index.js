import { createAction } from "redux-actions";

export const UPDATE_API_DESCRIPTORS = "UPDATE_API_DESCRIPTORS";
export const CONNECT_BACKGROUND_PAGE_START = "CONNECT_BACKGROUND_PAGE_START";
export const CONNECT_BACKGROUND_PAGE_SUCCESS = "CONNECT_BACKGROUND_PAGE_SUCCESS";
export const CONNECT_BACKGROUND_PAGE_FAILURE = "CONNECT_BACKGROUND_PAGE_FAILURE";
export const CONNECT_BACKGROUND_PAGE_TIMEOUT = "CONNECT_BACKGROUND_PAGE_TIMEOUT";


export const updateAPIDescriptors = createAction(UPDATE_API_DESCRIPTORS);

/** CONNECT BACKGROUND PAGE **/

export const connectBackgroundPageStart = createAction(CONNECT_BACKGROUND_PAGE_START);
export const connectBackgroundPageSuccess = createAction(CONNECT_BACKGROUND_PAGE_SUCCESS);
export const connectBackgroundPageFailure = createAction(CONNECT_BACKGROUND_PAGE_FAILURE);
export const connectBackgroundPageTimeout = createAction(CONNECT_BACKGROUND_PAGE_TIMEOUT);

const MAX_CONNECT_BACKGROUND_PAGE_TIME = 2000;

export function connectTabToBackgroundPage() {
  return function(dispatch, getState) {
    let port = chrome.runtime.connect();

    let start = () => {
      dispatch(connectBackgroundPageStart({
        port
      }));

      port.postMessage({
        type: CONNECT_BACKGROUND_PAGE_START
      });
    }

    let timeoutId;

    let cleanup = () => {
      clearTimeout(timeoutId);
      port.onMessage.removeListener(onMessageOnce);
    }

    let onTimeout = () => {
      cleanup();
      dispatch(connectBackgroundPageTimeout());
    }

    let onMessageOnce = (msg) => {
      cleanup();

      let { type } = msg;

      switch (type) {
      case CONNECT_BACKGROUND_PAGE_SUCCESS:
        dispatch(connectBackgroundPageSuccess({}))
        port.onMessage.addListener(onBackgroundPageUpdates);
        break;
      case CONNECT_BACKGROUND_PAGE_FAILURE:
        dispatch(connectBackgroundPageFailure({
          message: msg.message
        }));
        break;
      case UPDATE_API_DESCRIPTORS:
        dispatch(updateAPIDescriptors(msg.apiDescriptors));
        break;
      default:
        dispatch(connectBackgroundPageFailure({
          message: "unexpected message received",
          data: msg
        }))
      }
    }

    let onBackgroundPageUpdates = (msg) => {
      let { type } = msg;

      switch(type) {
        case UPDATE_API_DESCRIPTORS:
          dispatch(updateAPIDescriptors(msg.apiDescriptors));
          break;
        default:
          // TODO: log warning messages "unexpected message received",
      }
    }

    port.onMessage.addListener(onMessageOnce);
    timeoutId = setTimeout(onTimeout, MAX_CONNECT_BACKGROUND_PAGE_TIME);
    start();
  };
}
