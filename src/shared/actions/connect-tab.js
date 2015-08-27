import scanAPI from "../scan-api"

import {
  UPDATE_API_DESCRIPTORS,

  updateAPIDescriptors
} from "./api-descriptors";

import {
  CONNECT_BACKGROUND_PAGE_START,
  CONNECT_BACKGROUND_PAGE_SUCCESS,
  CONNECT_BACKGROUND_PAGE_FAILURE,

  connectBackgroundPageStart,
  connectBackgroundPageSuccess,
  connectBackgroundPageFailure,
  connectBackgroundPageTimeout
} from "./background-page-connection";

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

          if (!msg.apiDescriptors.tabPage) {
            port.postMessage({
              type: UPDATE_API_DESCRIPTORS,
              apiDescriptors: {
                tabPage: scanAPI(chrome)
              }
            })
          }
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
