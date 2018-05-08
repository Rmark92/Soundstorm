import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/root_reducer.js';

export const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
};
