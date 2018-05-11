export const ADD_TRACK_ERRORS = 'ADD_TRACK_ERRORS';
export const CLEAR_TRACK_ERRORS = 'CLEAR_TRACK_ERRORS';

export const addTrackErrors = (errors) => {
  return {
    type: ADD_TRACK_ERRORS,
    errors
  };
};

export const clearTrackErrors = () => {
  return {
    type: CLEAR_TRACK_ERRORS
  };
};
