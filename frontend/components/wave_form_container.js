import { connect } from 'react-redux';
import { updateProgress } from '../actions/player_actions';
import WaveForm from './wave_form';

const mapStateToProps = (state, ownProps) => {
  return {
    lastProgressStamp: state.ui.player.tracksProgress[ownProps.track.id],
    reactPlayer: state.ui.player.reactPlayer,
    isCurrentTrack: state.ui.player.currentTrackId === ownProps.track.id,
    playing: state.ui.player.playing
    // player: state.ui.player
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProgress: (trackId, progress) => dispatch(updateProgress(trackId, progress))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveForm);
