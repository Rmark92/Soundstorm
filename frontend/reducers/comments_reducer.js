import { merge } from 'lodash';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';

export default (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_COMMENT:
      return _.merge({}, state, { [action.comment.id] : action.comment });
    case REMOVE_COMMENT:
      let allComments = _.merge({}, state);
      delete allComments[action.comment.id];
      return allComments;
    case RECEIVE_USER:
      return _.merge({}, state, action.payload.comments);
    case RECEIVE_TRACK:
      return _.merge({}, state, action.comments);
    default:
      return state;
  }
};
