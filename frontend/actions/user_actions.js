export const RECEIVE_USER = 'RECEIVE_USER';
import * as APIUtil from '../util/user_api_util';

export const receiveUser = (payload) => {
  return {
    type: RECEIVE_USER,
    payload
  };
};

export const fetchUser = (userId) => {
  return (dispatch) => {
    return APIUtil.fetchUser(userId).then( (response) => dispatch(receiveUser(response)));
  };
};

export const updateUser = (userId, userData) => {
  return (dispatch) => {
    return APIUtil.updateUser(userId, userData).then( (response) => dispatch(receiveUser(response)));
  };
};
