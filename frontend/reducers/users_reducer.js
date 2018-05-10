import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions.js';
import { RECEIVE_TRACK } from '../actions/track_actions.js';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return _.merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_TRACK:
      const user = state[action.user.id];
      if (user && user.trackIds) {
        const currentTrackIds = user.trackIds;
        action.user.trackIds = currentTrackIds.concat([action.track.id]);
      }
      else {
        action.user.trackIds = [action.track.id];
      }
      return _.merge({}, state, { [action.user.id]: action.user });
    default:
      return state;
  }
};
