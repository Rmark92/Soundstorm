import * as APIUtil from '../util/track_api_util.js';
import { addTrackErrors } from './track_error_actions.js';

export const RECEIVE_TRACK = 'RECEIVE_TRACK';

export const receiveTrack = (track) => {
  return {
    type: RECEIVE_TRACK,
    track: track.track,
    user: track.user
  };
};

export const createTrack = (trackData) => {
  return (dispatch) => {
    return APIUtil.createTrack(trackData).then( response => {
      debugger
      dispatch(receiveTrack(response));
      return response.track;
    }).fail( errors => dispatch(addTrackErrors));
  };
};

export const fetchTrack = (trackId) => {
  return (dispatch) => {
    return APIUtil.fetchTrack(trackId).then( track => {
      dispatch(receiveTrack(track));
      return track;
    });
  };
};
