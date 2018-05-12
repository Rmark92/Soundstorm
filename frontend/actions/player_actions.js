export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';

export const setCurrentTrack = (trackId) => {
  return {
    type: SET_CURRENT_TRACK,
    trackId
  };
};

export const togglePlayerStatus = (status) => {
  return {
    type: TOGGLE_PLAYER_STATUS
  };
};
