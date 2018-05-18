import { ADD_TRACK_ERRORS, CLEAR_TRACK_ERRORS } from '../actions/track_error_actions.js';
import { RECEIVE_TRACK } from '../actions/track_actions.js';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_TRACK_ERRORS:
      return action.errors || [];
    case RECEIVE_TRACK:
    case CLEAR_TRACK_ERRORS:
      return [];
    default:
      return state;
  }
};
