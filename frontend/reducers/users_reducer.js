import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions.js';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return _.merge({}, state, { [action.user.id]: action.user });
    default:
      return state;
  }
};
