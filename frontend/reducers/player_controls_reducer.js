import { merge } from 'lodash';
import { TOGGLE_PLAYER_STATUS,
         SET_CURRENT_TRACK,
         SET_REACT_PLAYER,
         TOGGLE_PLAYER_LOOP,
         MOVE_TO_NEXT_TRACK,
         MOVE_TO_PREV_TRACK,
         TRACK_ENDED,
         PLAYER_SEEK,
         WAVE_FORM_SEEK,
         UPDATE_BUFFER_STATUS } from '../actions/player_actions.js';

export default (state = { playing: false, looping: false, buffering: false }, action) => {
  switch (action.type) {
    case SET_REACT_PLAYER:
      return _.merge({}, state, { reactPlayer: action.reactPlayer });
    case SET_CURRENT_TRACK:
      return _.merge({}, state, { playing: true, buffering: true } );
    case TOGGLE_PLAYER_STATUS:
      return _.merge({}, state, { playing:  !state.playing });
    case TOGGLE_PLAYER_LOOP:
      return _.merge({}, state, { looping: !state.looping });
    case TRACK_ENDED:
      return _.merge({}, state, { buffering: true,
                                  playing: state.looping || !!action.nextTrackId });
    case MOVE_TO_NEXT_TRACK:
      return _.merge({}, state, { playing: true, buffering: true });
    case MOVE_TO_PREV_TRACK:
      return _.merge({}, state, { playing: true, buffering: true });
    case PLAYER_SEEK:
      return _.merge({}, state, { lastPlayerSeek: action.seekTimeStamp });
    case WAVE_FORM_SEEK:
      return _.merge({}, state, { lastWaveFormSeek: action.seekTimeStamp, playing: true });
    case UPDATE_BUFFER_STATUS:
      return _.merge({}, state, { buffering: action.isBuffering })
    default:
      return state;
  }
};
