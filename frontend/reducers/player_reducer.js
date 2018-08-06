import { merge } from 'lodash';
import { SET_CURRENT_TRACK,
         TOGGLE_PLAYER_STATUS,
         SET_REACT_PLAYER,
         TOGGLE_PLAYER_LOOP,
         PLAYER_SEEK,
         WAVE_FORM_SEEK,
         ADD_TO_QUEUE,
         REMOVE_FROM_QUEUE,
         CONTINUE_QUEUE,
         MOVE_TO_NEXT_TRACK,
         MOVE_TO_PREV_TRACK,
         UPDATE_BUFFER_STATUS } from '../actions/player_actions.js';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions.js';

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
      } else if (!includedInTrackQueue) {
        newState.trackQueue.unshift(action.trackId);
      }
      if (state.currentTrackId) { newState.tracksProgress[state.currentTrackId] = getCurrentProgress(state.reactPlayer); }
      newState.currentTrackId = action.trackId;
      newState.tracksProgress[newState.currentTrackId] = action.progress ||
                                                         newState.tracksProgress[newState.currentTrackId] ||
                                                         0;
      newState.playing = true;
      return newState;
    case RECEIVE_TRACK:
      if (!state.currentTrackId) {
        return _.merge({}, state, { currentTrackId: action.track.id});
      } else {
        return state;
      }
    case RECEIVE_TRACKS:
      if (!state.currentTrackId) {
        return _.merge({}, state, { currentTrackId: selectRandomTrackId(action.tracks) });
      } else {
        return state;
      }
    case TOGGLE_PLAYER_STATUS:
      if (state.playing) {
        return _.merge({}, state, { playing: false,
                                    tracksProgress: { [state.currentTrackId]: getCurrentProgress(state.reactPlayer) } });
      } else {
        return _.merge({}, state, { playing: true });
      }
    case TOGGLE_PLAYER_LOOP:
      newState = _.merge({}, state);
      newState.looping = !state.looping;
      return newState;
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
      newState.tracksProgress[newState.currentTrackId] = getCurrentProgress(newState.reactPlayer);
      currentTrackQueueIdx = state.trackQueue.indexOf(state.currentTrackId);
      newState.currentTrackId = state.trackQueue[currentTrackQueueIdx + 1] || state.trackQueue[0];
      newState.playing = true;
      return newState;
    case MOVE_TO_PREV_TRACK:
      newState = _.merge({}, state);
      newState.tracksProgress[newState.currentTrackId] = getCurrentProgress(newState.reactPlayer);
      currentTrackQueueIdx = state.trackQueue.indexOf(state.currentTrackId);
      newState.currentTrackId = state.trackQueue[currentTrackQueueIdx - 1] ||
                                state.trackQueue[state.trackQueue.length - 1];
      newState.playing = true;
      return newState;
    case CONTINUE_QUEUE:
      newState = _.merge({}, state);
      if (!state.looping) {
        currentTrackQueueIdx = state.trackQueue.indexOf(state.currentTrackId);
        newState.currentTrackId = state.trackQueue[currentTrackQueueIdx + 1] || state.trackQueue[0];
        newState.playing = true;
      }
      newState.tracksProgress[state.currentTrackId] = 0;
      newState.playing = true;
      return newState;
    case PLAYER_SEEK:
      return _.merge({}, state, { lastPlayerSeek: getCurrentProgress(state.reactPlayer) });
    case WAVE_FORM_SEEK:
      return _.merge({}, state, { lastWaveFormSeek: action.progress, playing: true });
    case UPDATE_BUFFER_STATUS:
      return _.merge({}, state, { buffering: action.isBuffering })
    default:
      return state;
  }
};

const getCurrentProgress = (player) => {
  return player.getCurrentTime() / player.getDuration();
};


const selectRandomTrackId = (tracks) => {
  const trackIds = Object.keys(tracks);
  return trackIds[Math.floor(Math.random() * trackIds.length)];
};
