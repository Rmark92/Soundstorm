import { connect } from 'react-redux';
import { setCurrentTrack, togglePlayerStatus } from '../../actions/player_actions';
import PlayButton from './play_button';

const mapStateToProps = (state, ownProps) => {
  const trackQueue = state.ui.player.trackQueue;
  const controls = state.ui.player.controls;
  const currentTrackId = trackQueue.queue[trackQueue.currentQueueIdx];
  const isCurrentTrack = currentTrackId === ownProps.trackId;
  return {
    isCurrentTrack,
    inputType: isCurrentTrack && controls.playing ? 'pause' : 'play',
    reactPlayer: controls.reactPlayer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentTrack: (trackId) => dispatch(setCurrentTrack(trackId)),
    togglePlayerStatus: (trackId) => dispatch(togglePlayerStatus(trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
