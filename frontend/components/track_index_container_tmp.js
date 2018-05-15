import { connect } from 'react-redux';
import { selectTracksById } from '../util/selectors';
import TrackIndexTmp from './track_index_tmp';

const mapStateToProps = (state, ownProps) => {
  const trackIds = ownProps.trackIds;
  return {
    trackList: selectTracksById(state, trackIds),
  };
};

export default connect(mapStateToProps)(TrackIndexTmp);
