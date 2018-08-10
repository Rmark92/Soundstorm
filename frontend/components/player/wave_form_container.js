import { connect } from 'react-redux';
import { waveFormSeek,
         setCurrentTrack,
         setTrackDuration } from '../../actions/player_actions';
import { createTrackPlay } from '../../actions/track_play_actions';
import WaveForm from './wave_form';

const mapStateToProps = (state, ownProps) => {
  return {
    lastProgressStamp: state.ui.player.tracksProgress[ownProps.track.id],
    reactPlayer: state.ui.player.reactPlayer,
    isCurrentTrack: state.ui.player.currentTrackId === ownProps.track.id,
    playing: state.ui.player.playing,
    buffering: state.ui.player.buffering,
    lastPlayerSeek: state.ui.player.lastPlayerSeek,
    loggedIn: !!state.session.id,
    duration: state.ui.player.tracksDuration[ownProps.track.id]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    waveFormSeek: (progress) => dispatch(waveFormSeek(progress)),
    setCurrentTrack: (trackId, progress) => dispatch(setCurrentTrack(trackId, progress)),
    createTrackPlay: (trackId) => dispatch(createTrackPlay(trackId)),
    setTrackDuration: (trackId, duration) => dispatch(setTrackDuration(trackId, duration))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveForm);
