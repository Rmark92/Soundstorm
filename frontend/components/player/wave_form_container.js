import { connect } from 'react-redux';
import { waveFormSeek,
         setCurrentTrack,
         setTrackDuration } from '../../actions/player_actions';
import { createTrackPlay } from '../../actions/track_play_actions';
import WaveForm from './wave_form';

const mapStateToProps = (state, ownProps) => {
  const player = state.ui.player;
  const trackQueue = player.trackQueue;
  const currentTrackId = trackQueue.queue[trackQueue.currentQueueIdx];
  const trackPlayData = player.trackPlayData;
  const controls = player.controls;
  return {
    reactPlayer: controls.reactPlayer,
    isCurrentTrack: currentTrackId === ownProps.track.id,
    playing: controls.playing,
    buffering: controls.buffering,
    lastPlayerSeek: controls.lastPlayerSeek,
    loggedIn: !!state.session.id,
    duration: trackPlayData.duration[ownProps.track.id],
    lastProgressStamp: trackPlayData.progress[ownProps.track.id]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    waveFormSeek: (progress) => dispatch(waveFormSeek(progress)),
    setCurrentTrack: (trackId, progress) => dispatch(setCurrentTrack(trackId, progress)),
    createTrackPlay: (trackId) => dispatch(createTrackPlay(trackId)),
    setTrackDuration: (trackId, duration) => dispatch(setTrackDuration(trackId, duration))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveForm);
