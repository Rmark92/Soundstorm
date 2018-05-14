import * as APIUtil from '../util/like_api_util.js';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';

export const receiveLike = (trackId) => {
  return {
    type: RECEIVE_LIKE,
    trackId
  };
};

export const removeLike = (trackId) => {
  return {
    type: REMOVE_LIKE,
    trackId
  };
};

export const createLike = (trackId) => {
  return (dispatch) => {
    APIUtil.createLike(trackId).then( () => dispatch(receiveLike(trackId)));
  };
};

export const destroyLike = (trackId) => {
  return (dispatch) => {
    APIUtil.destroyLike(trackId).then( () => dispatch(removeLike(trackId)));
  };
};
