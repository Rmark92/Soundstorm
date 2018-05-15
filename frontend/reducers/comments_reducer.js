import { merge } from 'lodash';
import { RECEIVE_COMMENT } from '../actions/comment_actions';

export default (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_COMMENT:
      return _.merge({}, state, { [action.comment.id] : action.comment });
    default:
      return state;
  }
};
