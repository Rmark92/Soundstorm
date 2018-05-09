import { combineReducers } from 'redux';
import modalReducer from './modal_reducer.js';

export default combineReducers({ modal: modalReducer });
