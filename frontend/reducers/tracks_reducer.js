import { merge } from 'lodash';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions.js';
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { RECEIVE_TRACK_PLAY } from '../actions/track_play_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACK:
      return _.merge({}, state, { [action.track.id]: action.track });
    case RECEIVE_TRACKS:
      return _.merge({}, state, action.tracks);
    case RECEIVE_USER:
      return _.merge({}, state, action.payload.tracks);
    case RECEIVE_LIKE:
      return _.merge({}, state, { [action.trackId]: { isLiked: true } });
    case REMOVE_LIKE:
      return _.merge({}, state, { [action.trackId]: { isLiked: false } });
    case RECEIVE_TRACK_PLAY:
      const newPlayCount = (state[action.trackId].plays || 0 ) + 1;
      return _.merge({}, state, { [action.trackId]: { plays: newPlayCount }});
    default:
      return state;
  }
};
