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

const getSharedActionVals = (state) => {
  const player = state.ui.player;
  const playerRef = player.controls.reactPlayer;
  const trackQueue = player.trackQueue;
  const currentTrackId = trackQueue.queue[trackQueue.currentQueueIdx];
  const currentTrackTimeStamp = (playerRef && playerRef.currentTime) ? (playerRef.currentTime / playerRef.duration) : 0;
  const looping = player.controls.looping;
  return {
    currentTrackId,
    currentTrackTimeStamp,
    nextTrackId: trackQueue.queue[trackQueue.currentQueueIdx + 1],
    prevTrackId: trackQueue.queue[trackQueue.currentQueueIdx - 1],
    looping
  };
};

export const setCurrentTrack = (trackId, progress) => {
  return (dispatch, getState) => {
    const sharedActionVals = getSharedActionVals(getState());
    const setTrackAction =  {
      type: SET_CURRENT_TRACK,
      trackId,
      progress
    };
    const mergedAction = Object.assign(setTrackAction, sharedActionVals);
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
    const sharedActionVals = getSharedActionVals(getState());
    const toggleAction =  {
      type: TOGGLE_PLAYER_STATUS,
      trackId
    };
    const mergedAction = Object.assign(toggleAction, sharedActionVals);
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
    const sharedActionVals = getSharedActionVals(getState());
    const trackEndedAction = {
      type: TRACK_ENDED
    };
    const mergedAction = Object.assign(trackEndedAction, sharedActionVals);
    return dispatch(mergedAction);
  };
};

export const moveToNextTrack = () => {
  return (dispatch, getState) => {
    const sharedActionVals = getSharedActionVals(getState());
    const nextTrackAction = { type: MOVE_TO_NEXT_TRACK };
    const mergedAction = Object.assign(nextTrackAction, sharedActionVals);
    return dispatch(mergedAction);
  };
};

export const moveToPrevTrack = () => {
  return (dispatch, getState) => {
    const sharedActionVals = getSharedActionVals(getState());
    const prevTrackAction = { type: MOVE_TO_PREV_TRACK };
    const mergedAction = Object.assign(prevTrackAction, sharedActionVals);
    return dispatch(mergedAction);
  };
};

export const playerSeek = (progress) => {
  return (dispatch, getState) => {
    const seekTimeStamp = Date.now();
    const sharedActionVals = getSharedActionVals(getState());
    const seekAction =  {
      type: PLAYER_SEEK,
      seekTimeStamp,
      progress
    };
    const mergedAction = Object.assign(seekAction, sharedActionVals);
    return dispatch(mergedAction);
  };
};

export const waveFormSeek = (progress) => {
  return (dispatch, getState) =>{
    const seekTimeStamp = Date.now();
    const sharedActionVals = getSharedActionVals(getState());
    const seekAction = {
      type: WAVE_FORM_SEEK,
      seekTimeStamp,
      progress
    };
    const mergedAction = Object.assign(seekAction, sharedActionVals);
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
