import { connect } from 'react-redux';
import { setCurrentTrack, togglePlayerStatus } from '../actions/player_actions';
import PlayButton from './play_button';

const mapStateToProps = (state, ownProps) => {
  const isCurrentTrack = state.ui.player.currentTrackId === ownProps.trackId;
  return {
    isCurrentTrack,
    inputType: isCurrentTrack && state.ui.player.playing ? 'pause' : 'play'
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentTrack: (trackId) => dispatch(setCurrentTrack(trackId)),
    togglePlayerStatus: () => dispatch(togglePlayerStatus())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
