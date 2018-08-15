import { merge } from 'lodash';
import { SET_CURRENT_TRACK,
         SET_TRACK_DURATION,
         ADD_TO_QUEUE,
         REMOVE_FROM_QUEUE,
         TRACK_ENDED,
         MOVE_TO_NEXT_TRACK,
         MOVE_TO_PREV_TRACK } from '../actions/player_actions.js';
import { RECEIVE_TRACK,
         RECEIVE_TRACKS,
         REMOVE_TRACK } from '../actions/track_actions.js';

export default (state = { queue: [], currentQueueIdx: -1 }, action) => {
  let newQueueIdx;
  let newQueue;
  let trackIdIdx;
  switch (action.type) {
    case SET_CURRENT_TRACK:
      trackIdIdx = state.queue.indexOf(action.trackId);
      if (trackIdIdx !== -1) {
        return _.merge({}, state, { currentQueueIdx: trackIdIdx });
      } else {
        newQueueIdx = state.currentQueueIdx + 1;
        newQueue = state.queue.slice(0);
        newQueue.splice(newQueueIdx, 0, action.trackId);
        return _.merge({}, state, { queue: newQueue, currentQueueIdx: newQueueIdx });
      }
    case ADD_TO_QUEUE:
      return _.merge({}, state, { queue: state.queue.concat([action.trackId])});
    case REMOVE_FROM_QUEUE:
    case REMOVE_TRACK:
      trackIdIdx = state.queue.indexOf(action.trackId);
      newQueue = state.queue.slice(0);
      newQueue.splice(trackIdIdx, 1);
      newQueueIdx = state.currentQueueIdx > trackIdIdx ? state.currentQueueIdx - 1 : state.currentQueueIdx;
      return _.merge({}, state, { queue: state.queue.slice(0).splice(trackIdIdx, 1),
                                  currentQueueIdx: newQueueIdx });
    case RECEIVE_TRACK:
      if (!state.queue[state.currentQueueIdx]) {
        return _.merge({}, state, { queue: [action.track.id], currentQueueIdx: 0 });
      } else {
        return state;
      }
    case RECEIVE_TRACKS:
      if (!state.queue[state.currentQueueIdx]) {
        return _.merge({}, state, { queue: [selectRandomTrackId(action.tracks)], currentQueueIdx: 0 });
      } else {
        return state;
      }
    case TRACK_ENDED:
    case MOVE_TO_NEXT_TRACK:
      newQueueIdx = state.queue[state.currentQueueIdx + 1] ? state.currentQueueIdx + 1 : 0
      return _.merge({}, state, { currentQueueIdx: newQueueIdx });
    case MOVE_TO_PREV_TRACK:
      newQueueIdx = state.currentQueueIdx <= 0 ? state.currentQueueIdx : state.currentQueueIdx - 1;
      return _.merge({}, state, { currentQueueIdx: newQueueIdx });
    default:
      return state;
  }
};

const selectRandomTrackId = (tracks) => {
  const trackIds = Object.keys(tracks);
  return parseInt(trackIds[Math.floor(Math.random() * trackIds.length)]);
};
