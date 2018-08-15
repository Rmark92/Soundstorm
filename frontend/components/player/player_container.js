import { connect } from 'react-redux';
import { togglePlayerStatus,
         setReactPlayer,
         toggleLoop,
         playerSeek,
         trackEnded,
         moveToNextTrack,
         moveToPrevTrack,
         updateBufferStatus,
         setTrackDuration } from '../../actions/player_actions';
import { createTrackPlay } from '../../actions/track_play_actions.js';
import { selectTrackArtist } from '../../util/selectors';
import Player from './player';

const mapStateToProps = (state, ownProps) => {
  const player = state.ui.player;
  const controls = player.controls;
  const trackQueueArr = player.trackQueue.queue;
  const currentQueueIdx = player.trackQueue.currentQueueIdx;
  const currentTrackId = trackQueueArr[currentQueueIdx];
  const currentTrack = state.entities.tracks[currentTrackId];
  const trackPlayData = player.trackPlayData;
  return {
    controls,
    currentTrack,
    artist: selectTrackArtist(state, currentTrack),
    loggedIn: !!state.session.id,
    duration: trackPlayData.duration[currentTrackId],
    lastProgressStamp: trackPlayData.progress[currentTrackId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    togglePlayerStatus: () => dispatch(togglePlayerStatus()),
    setReactPlayer: playerRef => dispatch(setReactPlayer(playerRef)),
    toggleLoop: () => dispatch(toggleLoop()),
    createTrackPlay: (trackId) => dispatch(createTrackPlay(trackId)),
    playerSeek: (progress) => dispatch(playerSeek(progress)),
    trackEnded: () => dispatch(trackEnded()),
    moveToNextTrack: () => dispatch(moveToNextTrack()),
    moveToPrevTrack: () => dispatch(moveToPrevTrack()),
    updateBufferStatus: (isBuffering) => dispatch(updateBufferStatus(isBuffering)),
    setTrackDuration: (trackId, duration) => dispatch(setTrackDuration(trackId, duration))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
