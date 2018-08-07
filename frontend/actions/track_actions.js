import * as APIUtil from '../util/track_api_util.js';
import { addTrackErrors } from './track_error_actions.js';

export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const REMOVE_TRACK = 'REMOVE_TRACK';

export const receiveTrack = (payload) => {
  return {
    type: RECEIVE_TRACK,
    track: payload.track,
    users: payload.users,
    comments: payload.comments
  };
};

export const receiveTracks = (payload) => {
  return {
    type: RECEIVE_TRACKS,
    tracks: payload.tracks,
    users: payload.users
  };
};

export const removeTrack = (payload) => {
  return {
    type: REMOVE_TRACK,
    trackId: payload.trackId,
    userId: payload.userId
  };
};

export const createTrack = (trackData) => {
  return (dispatch) => {
    return APIUtil.createTrack(trackData).then( response => {
      dispatch(receiveTrack(response));
      return response.track;
    }).fail( errors => dispatch(addTrackErrors(errors.responseJSON)));
  };
};

export const fetchTrack = (trackId) => {
  return (dispatch) => {
    return APIUtil.fetchTrack(trackId).then( response => {
      dispatch(receiveTrack(response));
    });
  };
};

export const fetchTracks = (filters) => {
  return (dispatch) => {
    return APIUtil.fetchTracks(filters).then( response => {
      dispatch(receiveTracks(response));
    });
  };
};

export const deleteTrack = (trackId) => {
  return (dispatch) => {
    return APIUtil.deleteTrack(trackId).then( response => dispatch(removeTrack(response)));
  };
};
