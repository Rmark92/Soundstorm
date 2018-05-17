import { merge } from 'lodash';
import { SET_CURRENT_TRACK,
         TOGGLE_PLAYER_STATUS,
         SET_REACT_PLAYER,
         TOGGLE_PLAYER_LOOP,
         UPDATE_PROGRESS } from '../actions/player_actions.js';

export default (state = { playing: false, looping: false, tracksProgress: {} }, action) => {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      if (state.currentTrackId) {
        return _.merge({}, state, { playing: true,
                                    tracksProgress: { [state.currentTrackId]: action.progress},
                                    currentTrackId: action.trackId });
      } else {
        return _.merge({}, state, { currentTrackId: action.trackId, playing: true });
      }
    case TOGGLE_PLAYER_STATUS:
      if (state.playing) {
        return _.merge({}, state, { playing: false,
                                    tracksProgress: { [action.trackId]: action.progress}});
      } else {
        return _.merge({}, state, { playing: true });
      }
    case TOGGLE_PLAYER_LOOP:
      return _.merge({}, state, { looping: !state.looping });
    case SET_REACT_PLAYER:
      return _.merge({}, state, { reactPlayer: action.reactPlayer });
    case UPDATE_PROGRESS:
      return _.merge({}, state, { tracksProgress: { [action.trackId]: action.progress}})
    default:
      return state;
  }
};
