import { connect } from 'react-redux';
import { setCurrentTrack, togglePlayerStatus } from '../actions/player_actions';
import PlayButton from './play_button';

const mapStateToProps = (state, ownProps) => {
  const isCurrentTrack = state.ui.player.currentTrackId === ownProps.trackId;
  return {
    isCurrentTrack,
    inputType: isCurrentTrack && state.ui.player.playing ? 'pause' : 'play',
    reactPlayer: state.ui.player.reactPlayer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentTrack: (trackId, progress) => dispatch(setCurrentTrack(trackId, progress)),
    togglePlayerStatus: (trackId, progress) => dispatch(togglePlayerStatus(trackId, progress))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
