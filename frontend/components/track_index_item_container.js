import { connect } from 'react-redux';
import { selectTrackArtist } from '../util/selectors';
import { setCurrentTrack, togglePlayerStatus } from '../actions/player_actions';
import TrackIndexItem from './track_index_item';

const mapStateToProps = (state, ownProps) => {
  const track = ownProps.track;
  const isCurrentTrack = state.ui.player.currentTrackId === track.id;
  return {
    track,
    artist: selectTrackArtist(state, track),
    isCurrentTrack
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentTrack: (trackId) => dispatch(setCurrentTrack(trackId)),
    togglePlayerStatus: () => dispatch(togglePlayerStatus())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndexItem);
