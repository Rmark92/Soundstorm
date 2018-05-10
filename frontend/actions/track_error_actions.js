export const ADD_TRACK_ERRORS = 'ADD_TRACK_ERRORS';

export const addTrackErrors = (errors) => {
  return {
    type: ADD_TRACK_ERRORS,
    errors
  };
};
