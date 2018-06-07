import { connect } from 'react-redux';
import { selectTracksById } from '../../util/selectors';
import TrackIndex from './track_index';

const mapStateToProps = (state, ownProps) => {
  const trackIds = ownProps.trackIds;
  return {
    trackList: selectTracksById(state, trackIds),
  };
};

export default connect(mapStateToProps)(TrackIndex);
