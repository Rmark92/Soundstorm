import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    comment
  };
};

export const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    comment
  };
};

export const createComment = (trackId, commentData) => {
  return (dispatch) => {
    return APIUtil.createComment(trackId, commentData).then( (comment) => dispatch(receiveComment(comment)));
  };
};

export const deleteComment = (trackId, commentId) => {
  return (dispatch) => {
    return APIUtil.deleteComment(trackId, commentId).then( (comment) => dispatch(removeComment(comment)));
  };
};
