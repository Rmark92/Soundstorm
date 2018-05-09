import { ADD_SESSION_ERRORS } from '../actions/session_error_actions';
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions' ;
import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case ADD_SESSION_ERRORS:
      return action.errors;
    case OPEN_MODAL:
    case CLOSE_MODAL:
    case RECEIVE_CURRENT_USER:
    case LOGOUT_CURRENT_USER:
      return [];
    default:
      return state;
  }
};
