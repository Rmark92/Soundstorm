import { merge } from 'lodash';
import { SET_TRACK_DURATION,
         UPDATE_PROGRESS_STAMP,
         SET_CURRENT_TRACK,
         TOGGLE_PLAYER_STATUS,
         MOVE_TO_NEXT_TRACK,
         MOVE_TO_PREV_TRACK,
         TRACK_ENDED } from '../actions/player_actions.js';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions.js';

export default (state = { progress: {}, duration: {} }, action) => {
  switch (action.type) {
    case RECEIVE_TRACK:
      return _.merge({},
                     state,
                     { progress: mergeWithDefault(state.progress, [action.track.id], 0) });
    case RECEIVE_TRACKS:
      return _.merge({},
                     state,
                     { progress: mergeWithDefault(state.progress, Object.keys(action.tracks), 0) });
    case SET_CURRENT_TRACK:
      return _.merge({}, state, { progress: { [action.currentTrackId]: action.currentTrackTimeStamp,
                                              [action.trackId]: action.progress }});
    case TOGGLE_PLAYER_STATUS:
      return _.merge({}, state, { progress: { [action.currentTrackId]: action.currentTrackTimeStamp }});
    case MOVE_TO_PREV_TRACK:
    return _.merge({}, state, { progress: { [action.currentTrackId]: 0,
                                            [action.prevTrackId]: 0}});
    case MOVE_TO_NEXT_TRACK:
    case TRACK_ENDED:
      console.log('hit the reducer action');
      return _.merge({}, state, { progress: { [action.currentTrackId]: 0,
                                              [action.nextTrackId]: 0}});
    case SET_TRACK_DURATION:
      return _.merge({}, state, { duration: { [action.trackId]: action.duration }});
    case UPDATE_PROGRESS_STAMP:
      return _.merge({}, state, { progress: { [action.trackId]: action.progress }});
    default:
      return state;
  }
};

const mergeWithDefault = (originalObj, keys, defaultVal) => {
  const defaultObj = {};
  keys.forEach( function (key) {
    if (!originalObj[key] || originalObj[key] !== 0) {
      defaultObj[key] = defaultVal;
    }
  });
  return Object.assign(defaultObj, originalObj);
};
