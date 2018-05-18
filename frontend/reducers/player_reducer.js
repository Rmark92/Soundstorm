import { merge } from 'lodash';
import { SET_CURRENT_TRACK,
         TOGGLE_PLAYER_STATUS,
         SET_REACT_PLAYER,
         TOGGLE_PLAYER_LOOP,
         UPDATE_PROGRESS,
         ADD_TO_QUEUE,
         REMOVE_FROM_QUEUE,
         CONTINUE_QUEUE,
         MOVE_TO_NEXT_TRACK,
         MOVE_TO_PREV_TRACK} from '../actions/player_actions.js';

export default (state = { playing: false, looping: false, tracksProgress: {}, trackQueue: [] }, action) => {
  let newState;
  let currentTrackQueueIdx;
  let includedInTrackQueue;
  switch (action.type) {
    case SET_CURRENT_TRACK:
      newState = _.merge({}, state);
      includedInTrackQueue = state.trackQueue.includes(action.trackId);
      if (state.currentTrackId && !includedInTrackQueue) {
        currentTrackQueueIdx = state.trackQueue.indexOf(state.currentTrackId);
        newState.trackQueue = newState.trackQueue.slice(0, currentTrackQueueIdx + 1)
                                                 .concat([action.trackId])
                                                 .concat(newState.trackQueue.slice(currentTrackQueueIdx + 1));
        newState.tracksProgress[state.currentTrackId] = action.progress;
      } else if (!includedInTrackQueue) {
        newState.trackQueue.unshift(action.trackId);
      }
      newState.currentTrackId = action.trackId;
      newState.playing = true;
      return newState;
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
    case ADD_TO_QUEUE:
      newState = _.merge({}, state);
      newState.trackQueue.push(action.trackId);
      return newState;
    case REMOVE_FROM_QUEUE:
      newState = _.merge({}, state);
      const toRemoveIdx = newState.trackQueue.indexOf(action.trackId);
      const newTrackQueue = newState.trackQueue.slice(0, toRemoveIdx).concat(newState.trackQueue.slice(toRemoveIdx + 1));
      newState.trackQueue = newTrackQueue;
      return newState;
    case MOVE_TO_NEXT_TRACK:
      newState = _.merge({}, state);
      currentTrackQueueIdx = state.trackQueue.indexOf(state.currentTrackId);
      newState.currentTrackId = state.trackQueue[currentTrackQueueIdx + 1] || state.trackQueue[0];
      newState.playing = true;
      return newState;
    case MOVE_TO_PREV_TRACK:
      newState = _.merge({}, state);
      currentTrackQueueIdx = state.trackQueue.indexOf(state.currentTrackId);
      newState.currentTrackId = state.trackQueue[currentTrackQueueIdx - 1] ||
                                state.trackQueue[state.trackQueue.length - 1];
      return newState;
    case CONTINUE_QUEUE:
      newState = _.merge({}, state);
      if (!state.looping) {
        newState.tracksProgress[state.currentTrackId] = 0;
        currentTrackQueueIdx = state.trackQueue.indexOf(state.currentTrackId);
        newState.currentTrackId = state.trackQueue[currentTrackQueueIdx + 1] || state.trackQueue[0];
        newState.playing = true;
      }
      newState.tracksProgress[state.currentTrackId] = 0;
      newState.playing = true;
      return newState;
    case UPDATE_PROGRESS:
      return _.merge({}, state, { tracksProgress: { [action.trackId]: action.progress}})
    default:
      return state;
  }
};
