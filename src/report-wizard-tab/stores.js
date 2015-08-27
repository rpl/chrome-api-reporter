import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

const combinedReducers = combineReducers(reducers);

export function createAppStore(initialState) {
  return createStoreWithMiddleware(combinedReducers, initialState);
}
