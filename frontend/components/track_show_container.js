import { connect } from 'react-redux';
import { fetchTrack } from '../actions/track_actions.js';
import { selectTrackArtist } from '../util/selectors.js';
import TrackShow from './track_show.jsx';

const mapStateToProps = (state, ownProps) => {
  const trackId = ownProps.match.params.trackId;
  const track = state.entities.tracks[trackId] || {};
  return {
    trackId,
    track,
    artist: selectTrackArtist(state, track)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
