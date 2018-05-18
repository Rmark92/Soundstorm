import { connect } from 'react-redux';
import { selectTrackArtist } from '../util/selectors';
import { setCurrentTrack, togglePlayerStatus, removeFromQueue } from '../actions/player_actions';
import TrackQueueItem from './track_queue_item';

const mapStateToProps = (state, ownProps) => {
  const track = ownProps.track;
  const isCurrentTrack = state.ui.player.currentTrackId === track.id;
  return {
    track,
    artist: selectTrackArtist(state, track),
    isCurrentTrack,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentTrack: (trackId) => dispatch(setCurrentTrack(trackId)),
    togglePlayerStatus: () => dispatch(togglePlayerStatus()),
    removeFromQueue: (trackId) => dispatch(removeFromQueue(trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackQueueItem);
