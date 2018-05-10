import * as APIUtil from '../util/track_api_util.js';

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
    return APIUtil.createTrack(trackData).then( response => dispatch(receiveTrack(response)));
  };
};
