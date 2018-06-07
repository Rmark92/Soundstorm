import { connect } from 'react-redux';
import { fetchTrack, deleteTrack } from '../../actions/track_actions.js';
import { addToQueue, removeFromQueue } from '../../actions/player_actions.js';
import { selectTrackArtist } from '../../util/selectors.js';
import TrackShow from './track_show.jsx';

const mapStateToProps = (state, ownProps) => {
  const trackId = ownProps.match.params.trackId;
  const track = state.entities.tracks[trackId] || {};
  const inQueue = state.ui.player.trackQueue.includes(track.id);
  return {
    trackId,
    track,
    artist: selectTrackArtist(state, track),
    currentUserId: state.session.id,
    inQueue
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
    deleteTrack: (trackId) => dispatch(deleteTrack(trackId)),
    addToQueue: (trackId) => dispatch(addToQueue(trackId)),
    removeFromQueue: (trackId) => dispatch(removeFromQueue(trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackShow);
