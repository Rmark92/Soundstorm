import * as APIUtil from '../util/track_play_api_util';
export const RECEIVE_TRACK_PLAY = 'RECEIVE_TRACK_PLAY';

export const receiveTrackPlay = (trackId) => {
  return {
    type: RECEIVE_TRACK_PLAY,
    trackId
  };
};

export const createTrackPlay = (trackId) => {
  return (dispatch) => {
    return APIUtil.createTrackPlay(trackId).then( () => dispatch(receiveTrackPlay(trackId)));
  };
};
