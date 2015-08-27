import { createAction } from "redux-actions";

export const ADD_API_DESCRIPTOR = "ADD_API_DESCRIPTOR";
export const CONNECT_BACKGROUND_PAGE_START = "CONNECT_BACKGROUND_PAGE_START";
export const CONNECT_BACKGROUND_PAGE_SUCCESS = "CONNECT_BACKGROUND_PAGE_SUCCESS";
export const CONNECT_BACKGROUND_PAGE_FAILURE = "CONNECT_BACKGROUND_PAGE_FAILURE";
export const CONNECT_BACKGROUND_PAGE_TIMEOUT = "CONNECT_BACKGROUND_PAGE_TIMEOUT";


export const addAPIDescriptor = createAction(ADD_API_DESCRIPTOR);

/** CONNECT BACKGROUND PAGE **/

const connectBackgroundPageStart = createAction(CONNECT_BACKGROUND_PAGE_START);
const connectBackgroundPageSuccess = createAction(CONNECT_BACKGROUND_PAGE_SUCCESS);
const connectBackgroundPageFailure = createAction(CONNECT_BACKGROUND_PAGE_FAILURE);
const connectBackgroundPageTimeout = createAction(CONNECT_BACKGROUND_PAGE_TIMEOUT);

const MAX_CONNECT_BACKGROUND_PAGE_TIME = 2000;

export function connectBackgroundPage() {
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
        break;
      case CONNECT_BACKGROUND_PAGE_FAILURE:
        dispatch(connectBackgroundPageFailure({
          message: msg.message
        }));
        break;
      default:
        dispatch(connectBackgroundPageFailure({
          message: "unexpected message received",
          data: msg
        }))
      }
    }

    port.onMessage.addListener(onMessageOnce);
    timeoutId = setTimeout(onTimeout, MAX_CONNECT_BACKGROUND_PAGE_TIME);
    start();
  };
}
