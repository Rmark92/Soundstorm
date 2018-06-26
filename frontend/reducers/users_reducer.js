import { merge, uniq } from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions.js';
import { RECEIVE_TRACK, RECEIVE_TRACKS, REMOVE_TRACK } from '../actions/track_actions.js';
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_COMMENT } from '../actions/comment_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let actionUser;
  let stateUser;
  let user;
  let duppedState;
  let currentTrackIds;
  let duppedTrackIds;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return _.merge({}, state, { [action.user.id]: action.user });
    case RECEIVE_USER:
      const newUser = action.payload.user;
      return _.merge({}, state, { [newUser.id]: newUser });
    case RECEIVE_TRACK:
      stateUser = state[action.user.id];
      let newTrackIds = ((stateUser && stateUser.trackIds) || []).slice(0);
      if (!newTrackIds.includes(action.track.id)) { newTrackIds.push(action.track.id); }
      action.user.trackIds = newTrackIds;
      return _.merge({}, state, { [action.user.id]: action.user });
    case REMOVE_TRACK:
      duppedState = _.merge({}, state);
      actionUser = duppedState[action.userId];
      currentTrackIds = actionUser.trackIds;
      let deleteIdx = currentTrackIds.indexOf(action.trackId);
      actionUser.trackIds = currentTrackIds.slice(0, deleteIdx).concat(currentTrackIds.slice(deleteIdx + 1));
      return duppedState;
    case RECEIVE_TRACKS:
      Object.keys(action.users).forEach( userId => {
        stateUser = state[userId];
        actionUser = action.users[userId];
        if (stateUser && stateUser.trackIds) {
          actionUser.trackIds = _.uniq(stateUser.trackIds.concat(actionUser.trackIds));
        }
      });
      return _.merge({}, state, action.users);
    case RECEIVE_COMMENT:
      const userId = action.comment.user_id;
      user = state[userId] || {};
      const comment = action.comment;
      const commentsArr = user.commentIds || [];
      const newCommentsArr = commentsArr.includes(comment.id) ? commentsArr : commentsArr.concat([comment.id]);
      return _.merge({},
               state,
               { [userId]: { commentIds: newCommentsArr}});
    default:
      return state;
  }
};
