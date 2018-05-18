import { connect } from 'react-redux';
import { updateProgress } from '../actions/player_actions';
import WaveForm from './wave_form';

const mapStateToProps = (state, ownProps) => {
  return {
    player: state.ui.player
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateProgress: (trackId, progress) => dispatch(updateProgress(trackId, progress))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveForm);
