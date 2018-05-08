export const ADD_SESSION_ERRORS = 'ADD_SESSION_ERRORS';

export const addSessionErrors = (errors) => {
  return {
    type: ADD_SESSION_ERRORS,
    errors
  };
};
