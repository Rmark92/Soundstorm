import * as APIUtil from '../util/session_api_util.js';
import { addSessionErrors } from './session_error_actions.js';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

export const receiveLogin = (user) => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};

export const receiveLogout = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

export const login = (credentials) => {
  return (dispatch) => {
    return APIUtil.login(credentials).then( user => dispatch(receiveLogin(user)) ).fail( error => dispatch(addSessionErrors(error.responseJSON)));
  };
};

export const logout = () => {
  return (dispatch) => {
    return APIUtil.logout().then( response => dispatch(receiveLogout())).fail(error => dispatch());
  };
};

export const signup = (credentials) => {
  return (dispatch) => {
    return APIUtil.signup(credentials).then( user => dispatch(receiveLogin(user)) ).fail( error => dispatch(addSessionErrors(error.responseJSON)));
  };
};

export const demoLogin = () => {
  return login({ username: 'demo_user', password: 'password' });
};
