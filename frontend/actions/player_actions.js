export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';
export const SET_REACT_PLAYER = 'SET_REACT_PLAYER';
export const TOGGLE_PLAYER_LOOP = 'TOGGLE_PLAYER_LOOP';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';
export const CONTINUE_QUEUE = 'CONTINUE_QUEUE';
export const MOVE_TO_NEXT_TRACK = 'MOVE_TO_NEXT_TRACK';
export const MOVE_TO_PREV_TRACK = 'MOVE_TO_PREV_TRACK';

export const setCurrentTrack = (trackId) => {
  return {
    type: SET_CURRENT_TRACK,
    trackId
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

export const updateProgress = (trackId, progress) => {
  return {
    type: UPDATE_PROGRESS,
    trackId,
    progress
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
