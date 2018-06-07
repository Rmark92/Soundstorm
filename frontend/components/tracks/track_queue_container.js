import { connect } from 'react-redux';
import { removeFromQueue } from '../../actions/player_actions';
import { selectTracksById } from '../../util/selectors';
import TrackQueue from './track_queue';

const mapStateToProps = (state, ownProps) => {
  const trackIds = state.ui.player.trackQueue;
  return {
    tracks: selectTracksById(state, trackIds)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeFromQueue: (trackId) => dispatch(removeFromQueue(trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackQueue);
