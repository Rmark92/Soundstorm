import { connect } from 'react-redux';
import WaveForm from './wave_form';
const mapStateToProps = (state, ownProps) => {
  return {
    player: state.ui.player
  };
};

export default connect(mapStateToProps)(WaveForm);
