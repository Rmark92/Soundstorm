import { combineReducers } from 'redux';
import modalReducer from './modal_reducer.js';
import playerReducer from './player_reducer.js';

export default combineReducers({ modal: modalReducer, player: playerReducer });
