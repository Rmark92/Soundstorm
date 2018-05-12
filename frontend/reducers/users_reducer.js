import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions.js';
import { RECEIVE_TRACK, RECEIVE_TRACKS } from '../actions/track_actions.js';

// Do we have to worry about overwriting a user's trackIds,
// since merge will overwrite our trackIds array?
// ex: oldUser = { trackIds: [1,2,3,4] }, newUser = { trackIds: [5] }
//  merge({}, oldUser, newUser) returns { trackIds: [5] }
// instead of { trackIds: [1,2,3,4,5] }

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return _.merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_TRACK:
      action.user.trackIds = mergeTrackIds(state[action.user.id], [action.track.id]);
      return _.merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_TRACKS:
      let newUser;
      Object.keys(action.users).forEach( userKey => {
        newUser = action.users[userKey];
        newUser.trackIds = mergeTrackIds(state[userKey], newUser.trackIds);
      });
      return _.merge({}, state, action.users);
    default:
      return state;
  }
};

const mergeTrackIds = (oldUser, newTrackIds) => {
  if (oldUser && oldUser.trackIds) {
    const oldTrackIds = oldUser.trackIds;
    return uniqMerge(oldTrackIds, newTrackIds);
  } else {
    return newTrackIds;
  }
};

const uniqMerge = (arr1, arr2) => {
  let idx;
  const arr1Uniqs = [];
  for ( idx = 0; idx < arr1.length; idx++ ) {
    if (!(arr2.includes(arr1[idx]))) {
      arr1Uniqs.push(arr1[idx]);
    }
  }
  return arr1Uniqs.concat(arr2);
};

// const user = state[action.user.id];
// if (user && user.trackIds) {
//   const currentTrackIds = user.trackIds;
//   action.user.trackIds = currentTrackIds.concat([action.track.id]);
// }
// else {
//   action.user.trackIds = [action.track.id];
// }
// return _.merge({}, state, { [action.user.id]: action.user });
