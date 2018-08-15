import { connect } from 'react-redux';
import { selectTrackArtist } from '../../util/selectors';
import { setCurrentTrack, togglePlayerStatus, addToQueue, removeFromQueue } from '../../actions/player_actions';
import TrackIndexItem from './track_index_item';

const mapStateToProps = (state, ownProps) => {
  const track = ownProps.track;
  const trackQueue = state.ui.player.trackQueue;
  const inQueue = trackQueue.queue.includes(track.id);
  const isCurrentTrack = trackQueue.queue[trackQueue.currentQueueIdx] === track.id;
  return {
    track,
    artist: selectTrackArtist(state, track),
    isCurrentTrack,
    inQueue
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentTrack: (trackId) => dispatch(setCurrentTrack(trackId)),
    togglePlayerStatus: () => dispatch(togglePlayerStatus()),
    addToQueue: (trackId) => dispatch(addToQueue(trackId)),
    removeFromQueue: (trackId) => dispatch(removeFromQueue(trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndexItem);
