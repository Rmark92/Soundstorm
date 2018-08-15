export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';
export const SET_REACT_PLAYER = 'SET_REACT_PLAYER';
export const TOGGLE_PLAYER_LOOP = 'TOGGLE_PLAYER_LOOP';
export const SET_TRACK_DURATION = 'SET_TRACK_DURATION';
export const PLAYER_SEEK = 'PLAYER_SEEK';
export const WAVE_FORM_SEEK = 'WAVE_FORM_SEEK';
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';
export const CONTINUE_QUEUE = 'CONTINUE_QUEUE';
export const TRACK_ENDED = 'TRACK_ENDED';
export const MOVE_TO_NEXT_TRACK = 'MOVE_TO_NEXT_TRACK';
export const MOVE_TO_PREV_TRACK = 'MOVE_TO_PREV_TRACK';
export const UPDATE_BUFFER_STATUS = 'UPDATE_BUFFER_STATUS';
export const UPDATE_PROGRESS_STAMP = 'UPDATE_PROGRESS_STAMP';

const getCurrentTrackDetails = (state) => {
  const player = state.ui.player.controls.reactPlayer;
  const trackQueueArr = state.ui.player.trackQueue.queue;
  const currentQueueIdx = state.ui.player.trackQueue.currentQueueIdx;
  const currentTrackId = trackQueueArr[currentQueueIdx];
  return {
    currentTrackId,
    currentTrackTimeStamp: (player && player.currentTime) ? (player.currentTime / player.duration) : 0,
    nextTrackId: trackQueueArr[currentQueueIdx + 1],
    prevTrackId: trackQueueArr[currentQueueIdx - 1]
  };
};

export const setCurrentTrack = (trackId, progress) => {
  return (dispatch, getState) => {
    const currentTrackDetails = getCurrentTrackDetails(getState());
    const setTrackAction =  {
      type: SET_CURRENT_TRACK,
      trackId,
      progress
    };
    const mergedAction = Object.assign(setTrackAction, currentTrackDetails);
    return dispatch(mergedAction);
  };
};


export const updateProgressStamp = (trackId, progress) => {
  return {
    type: UPDATE_PROGRESS_STAMP,
    trackId,
    progress
  };
};

export const togglePlayerStatus = (trackId) => {
  return (dispatch, getState) => {
    const currentTrackDetails = getCurrentTrackDetails(getState());
    const toggleAction =  {
      type: TOGGLE_PLAYER_STATUS,
      trackId
    };
    const mergedAction = Object.assign(toggleAction, currentTrackDetails);
    return dispatch(mergedAction);
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

export const trackEnded = () => {
  return (dispatch, getState) => {
    const currentTrackDetails = getCurrentTrackDetails(getState());
    const trackEndedAction = {
      type: TRACK_ENDED
    };
    const mergedAction = Object.assign(trackEndedAction, currentTrackDetails);
    return dispatch(mergedAction);
  };
};

export const moveToNextTrack = () => {
  return (dispatch, getState) => {
    const currentTrackDetails = getCurrentTrackDetails(getState());
    const nextTrackAction = { type: MOVE_TO_NEXT_TRACK };
    const mergedAction = Object.assign(nextTrackAction, currentTrackDetails);
    return dispatch(mergedAction);
  };
};

export const moveToPrevTrack = () => {
  return (dispatch, getState) => {
    const currentTrackDetails = getCurrentTrackDetails(getState());
    const prevTrackAction = { type: MOVE_TO_PREV_TRACK };
    const mergedAction = Object.assign(prevTrackAction, currentTrackDetails);
    return dispatch(mergedAction);
  };
};

export const playerSeek = (progress) => {
  return (dispatch, getState) => {
    const seekTimeStamp = Date.now();
    const currentTrackDetails = getCurrentTrackDetails(getState());
    const seekAction =  {
      type: PLAYER_SEEK,
      seekTimeStamp,
      progress
    };
    const mergedAction = Object.assign(seekAction, currentTrackDetails);
    return dispatch(mergedAction);
  };
};

export const waveFormSeek = (progress) => {
  return (dispatch, getState) =>{
    const seekTimeStamp = Date.now();
    const currentTrackDetails = getCurrentTrackDetails(getState());
    const seekAction = {
      type: WAVE_FORM_SEEK,
      seekTimeStamp,
      progress
    };
    const mergedAction = Object.assign(seekAction, currentTrackDetails);
    return dispatch(mergedAction);
  };
};

export const setTrackDuration = (trackId, duration) => {
  return {
    type: SET_TRACK_DURATION,
    trackId: trackId,
    duration
  };
};

export const updateBufferStatus = (isBuffering) => {
  return {
    type: UPDATE_BUFFER_STATUS,
    isBuffering
  };
};
