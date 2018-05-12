import { connect } from 'react-redux';
import { fetchTracks } from '../actions/track_actions.js';
import TrackIndex from './track_index.jsx';
import { orderByTimestamp } from '../util/sort_tracks.js';

const mapStateToProps = (state, ownProps) => {
  const tracks = state.entities.tracks || {};
  const trackArr = Object.keys(tracks).map( trackId => {
    return tracks[trackId];
  });
  const trackList = orderByTimestamp(trackArr);
  return {
    trackList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTracks: () => dispatch(fetchTracks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndex);
