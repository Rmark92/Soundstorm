import { connect } from 'react-redux';
import { selectTrackArtist } from '../util/selectors';
import TrackIndexItem from './track_index_item';

const mapStateToProps = (state, ownProps) => {
  const track = ownProps.track;
  return {
    track,
    artist: selectTrackArtist(state, track)
  };
};

export default connect(mapStateToProps)(TrackIndexItem);
