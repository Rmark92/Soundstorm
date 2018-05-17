export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';
export const SET_REACT_PLAYER = 'SET_REACT_PLAYER';
export const TOGGLE_PLAYER_LOOP = 'TOGGLE_PLAYER_LOOP';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

export const setCurrentTrack = (trackId, progress) => {
  return {
    type: SET_CURRENT_TRACK,
    trackId,
    progress
  };
};

export const togglePlayerStatus = (trackId, progress) => {
  return {
    type: TOGGLE_PLAYER_STATUS,
    trackId,
    progress
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
