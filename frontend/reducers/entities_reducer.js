import { combineReducers } from 'redux';
import usersReducer from './users_reducer.js';
import tracksReducer from './tracks_reducer.js';
import commentsReducer from './comments_reducer';

export default combineReducers( { users: usersReducer,
                                  tracks: tracksReducer,
                                  comments: commentsReducer });
