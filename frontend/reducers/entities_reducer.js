import { combineReducers } from 'redux';
import usersReducer from './users_reducer.js';

export default combineReducers( { users: usersReducer });
