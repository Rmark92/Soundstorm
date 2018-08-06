export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';
export const SET_REACT_PLAYER = 'SET_REACT_PLAYER';
export const TOGGLE_PLAYER_LOOP = 'TOGGLE_PLAYER_LOOP';
export const PLAYER_SEEK = 'PLAYER_SEEK';
export const WAVE_FORM_SEEK = 'WAVE_FORM_SEEK';
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';
export const CONTINUE_QUEUE = 'CONTINUE_QUEUE';
export const MOVE_TO_NEXT_TRACK = 'MOVE_TO_NEXT_TRACK';
export const MOVE_TO_PREV_TRACK = 'MOVE_TO_PREV_TRACK';
export const UPDATE_BUFFER_STATUS = 'UPDATE_BUFFER_STATUS';

export const setCurrentTrack = (trackId, progress) => {
  return {
    type: SET_CURRENT_TRACK,
    trackId,
    progress
  };
};

export const togglePlayerStatus = (trackId) => {
  return {
    type: TOGGLE_PLAYER_STATUS,
    trackId
  };
};

export const setReactPlayer = (player) => {
  return {
    type: SET_REACT_PLAYER,
    reactPlayer: player
  };
};

export const toggleLoop = () => {
  return {
    type: TOGGLE_PLAYER_LOOP
  };
};

export const addToQueue = (trackId) => {
  return {
    type: ADD_TO_QUEUE,
    trackId
  };
};

export const removeFromQueue = (trackId) => {
  return {
    type: REMOVE_FROM_QUEUE,
    trackId
  };
};

export const continueThroughQueue = () => {
  return {
    type: CONTINUE_QUEUE
  };
};

export const moveToNextTrack = () => {
  return {
    type: MOVE_TO_NEXT_TRACK
  };
};

export const moveToPrevTrack = () => {
  return {
    type: MOVE_TO_PREV_TRACK
  };
};

export const playerSeek = () => {
  return {
    type: PLAYER_SEEK
  };
};

export const waveFormSeek = (progress) => {
  return {
    type: WAVE_FORM_SEEK,
    progress
  };
};

export const updateBufferStatus = (isBuffering) => {
  return {
    type: UPDATE_BUFFER_STATUS,
    isBuffering
  };
};
