import { merge } from 'lodash';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions.js';
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';

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
    case RECEIVE_LIKE:
      return _.merge({}, state, { [action.trackId]: { isLiked: true } });
    case REMOVE_LIKE:
      return _.merge({}, state, { [action.trackId]: { isLiked: false } });
    default:
      return state;
  }
};
