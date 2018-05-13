import { merge } from 'lodash';
import { SET_CURRENT_TRACK,
         TOGGLE_PLAYER_STATUS,
         SET_REACT_PLAYER,
         TOGGLE_PLAYER_LOOP } from '../actions/player_actions.js';

export default (state = { playing: false, looping: false }, action) => {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return _.merge({}, state, { currentTrackId: action.trackId, playing: true });
    case TOGGLE_PLAYER_STATUS:
      return _.merge({}, state, { playing: !state.playing });
    case TOGGLE_PLAYER_LOOP:
      return _.merge({}, state, { looping: !state.looping });
    case SET_REACT_PLAYER:
      return _.merge({}, state, { reactPlayer: action.reactPlayer });
    default:
      return state;
  }
};
