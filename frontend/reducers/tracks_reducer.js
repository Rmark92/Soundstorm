import { merge } from 'lodash';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions.js';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACK:
      return _.merge({}, state, { [action.track.id]: action.track });
    case RECEIVE_TRACKS:
      return action.tracks;
    default:
      return state;
  }
};
