import { connect } from 'react-redux';
import { togglePlayerStatus,
         setReactPlayer,
         toggleLoop,
         playerSeek,
         continueThroughQueue,
         moveToNextTrack,
         moveToPrevTrack,
         updateBufferStatus,
         setTrackDuration } from '../../actions/player_actions';
import { createTrackPlay } from '../../actions/track_play_actions.js';
import { selectTrackArtist } from '../../util/selectors';
import Player from './player';

const mapStateToProps = (state, ownProps) => {
  const player = state.ui.player;
  const currentTrack = state.entities.tracks[player.currentTrackId];
  return {
    player,
    currentTrack,
    artist: selectTrackArtist(state, currentTrack),
    loggedIn: !!state.session.id,
    duration: state.ui.player.tracksDuration[player.currentTrackId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    togglePlayerStatus: () => dispatch(togglePlayerStatus()),
    setReactPlayer: playerRef => dispatch(setReactPlayer(playerRef)),
    toggleLoop: () => dispatch(toggleLoop()),
    createTrackPlay: (trackId) => dispatch(createTrackPlay(trackId)),
    playerSeek: () => dispatch(playerSeek()),
    continueThroughQueue: () => dispatch(continueThroughQueue()),
    moveToNextTrack: () => dispatch(moveToNextTrack()),
    moveToPrevTrack: () => dispatch(moveToPrevTrack()),
    updateBufferStatus: (isBuffering) => dispatch(updateBufferStatus(isBuffering)),
    setTrackDuration: (trackId, duration) => dispatch(setTrackDuration(trackId, duration))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
