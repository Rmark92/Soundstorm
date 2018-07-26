import { merge } from 'lodash';
import { RECEIVE_TRACK, RECEIVE_TRACKS, REMOVE_TRACK } from '../actions/track_actions.js';
import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { RECEIVE_TRACK_PLAY } from '../actions/track_play_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let newLikeCount;
  let trackId;
  switch (action.type) {
    case RECEIVE_TRACK:
      return _.merge({}, state, { [action.track.id]: action.track });
    case REMOVE_TRACK:
      const newState = _.merge({}, state);
      delete newState[action.trackId];
      return newState;
    case RECEIVE_TRACKS:
      return _.merge({}, state, action.tracks);
    case RECEIVE_USER:
      return _.merge({}, state, action.payload.tracks);
    case RECEIVE_LIKE:
      newLikeCount = (state[action.trackId].numLikes || 0 ) + 1;
      return _.merge({}, state, { [action.trackId]: { isLiked: true,
                                                      numLikes: newLikeCount } });
    case REMOVE_LIKE:
      newLikeCount = (state[action.trackId].numLikes || 1 ) - 1;
      return _.merge({}, state, { [action.trackId]: { isLiked: false,
                                                      numLikes: newLikeCount } });
    case RECEIVE_TRACK_PLAY:
      const newPlayCount = (state[action.trackId].numPlays || 0 ) + 1;
      return _.merge({}, state, { [action.trackId]: { numPlays: newPlayCount }});
    case RECEIVE_COMMENT:
      trackId = action.comment.track_id;
      const track = state[trackId];
      const comment = action.comment;
      return _.merge({},
                     state,
                     { [trackId]: { commentIds: [comment.id].concat(track.commentIds || []),
                                    numComments: (track.numComments || 0) + 1
                                  }
                     });
   case REMOVE_COMMENT:
     trackId = action.comment.track_id;
     const trackComments = state[trackId].commentIds.slice(0) || [];
     const trackCommentIndex = trackComments.indexOf(action.comment.id);
     const trackCommentsArr = trackComments.slice(0, trackCommentIndex).concat(trackComments.slice(trackCommentIndex + 1));
     const currentNumComments = state[trackId].numComments || 0;
     const duppedState = _.merge({}, state);
     duppedState[trackId].commentIds = trackCommentsArr;
     duppedState[trackId].numComments = currentNumComments - 1;
     return duppedState;
    default:
      return state;
  }
};
