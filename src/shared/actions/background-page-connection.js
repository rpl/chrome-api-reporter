import { createAction } from "redux-actions";

export const CONNECT_BACKGROUND_PAGE_START = "CONNECT_BACKGROUND_PAGE_START";
export const CONNECT_BACKGROUND_PAGE_SUCCESS = "CONNECT_BACKGROUND_PAGE_SUCCESS";
export const CONNECT_BACKGROUND_PAGE_FAILURE = "CONNECT_BACKGROUND_PAGE_FAILURE";
export const CONNECT_BACKGROUND_PAGE_TIMEOUT = "CONNECT_BACKGROUND_PAGE_TIMEOUT";

export const connectBackgroundPageStart = createAction(CONNECT_BACKGROUND_PAGE_START);
export const connectBackgroundPageSuccess = createAction(CONNECT_BACKGROUND_PAGE_SUCCESS);
export const connectBackgroundPageFailure = createAction(CONNECT_BACKGROUND_PAGE_FAILURE);
export const connectBackgroundPageTimeout = createAction(CONNECT_BACKGROUND_PAGE_TIMEOUT);
