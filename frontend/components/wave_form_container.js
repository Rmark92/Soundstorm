import { connect } from 'react-redux';
// import { updateProgress } from '../actions/player_actions';
import { waveFormSeek, setCurrentTrack } from '../actions/player_actions';
import WaveForm from './wave_form';

const mapStateToProps = (state, ownProps) => {
  return {
    lastProgressStamp: state.ui.player.tracksProgress[ownProps.track.id],
    reactPlayer: state.ui.player.reactPlayer,
    isCurrentTrack: state.ui.player.currentTrackId === ownProps.track.id,
    playing: state.ui.player.playing,
    lastPlayerSeek: state.ui.player.lastPlayerSeek
    // player: state.ui.player
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    waveFormSeek: (progress) => dispatch(waveFormSeek(progress)),
    setCurrentTrack: (trackId, progress) => dispatch(setCurrentTrack(trackId, progress))
    // updateProgress: (trackId, progress) => dispatch(updateProgress(trackId, progress))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveForm);
