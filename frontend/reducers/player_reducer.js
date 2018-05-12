import { merge } from 'lodash';
import { SET_CURRENT_TRACK, TOGGLE_PLAYER_STATUS } from '../actions/player_actions.js';

export default (state = { playing: false }, action) => {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return _.merge({}, state, { currentTrackId: action.trackId, playing: true });
    case TOGGLE_PLAYER_STATUS:
      return _.merge({}, state, { playing: !state.playing });
    default:
      return state;
  }
};
