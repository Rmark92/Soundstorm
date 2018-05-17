import { connect } from 'react-redux';
import WaveForm from './wave_form';
const mapStateToProps = (state, ownProps) => {
  return {
    reactPlayer: state.ui.player.reactPlayer,
    currentTrackId: state.ui.player.currentTrackId,
  };
};

export default connect(mapStateToProps)(WaveForm);
