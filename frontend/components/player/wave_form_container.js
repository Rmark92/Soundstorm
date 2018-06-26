import { connect } from 'react-redux';
import { waveFormSeek, setCurrentTrack } from '../../actions/player_actions';
import WaveForm from './wave_form';

const mapStateToProps = (state, ownProps) => {
  return {
    lastProgressStamp: state.ui.player.tracksProgress[ownProps.track.id],
    reactPlayer: state.ui.player.reactPlayer,
    isCurrentTrack: state.ui.player.currentTrackId === ownProps.track.id,
    playing: state.ui.player.playing,
    lastPlayerSeek: state.ui.player.lastPlayerSeek
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    waveFormSeek: (progress) => dispatch(waveFormSeek(progress)),
    setCurrentTrack: (trackId, progress) => dispatch(setCurrentTrack(trackId, progress))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveForm);
