import { merge } from 'lodash';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions.js';
import { RECEIVE_USER } from '../actions/user_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACK:
      return _.merge({}, state, { [action.track.id]: action.track });
    case RECEIVE_TRACKS:
      return action.tracks;
    case RECEIVE_USER:
      const newTracks = action.payload.tracks;
      return _.merge({}, state, newTracks);
    default:
      return state;
  }
};
