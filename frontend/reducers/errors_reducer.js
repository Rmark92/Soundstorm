import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer.js';
import trackErrorsReducer from './track_errors_reducer.js';

export default combineReducers({ sessionErrors: sessionErrorsReducer, trackErrors: trackErrorsReducer });
